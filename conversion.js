// conversion.js — Deterministic business/conversion checks.
// These protect revenue: a microsite with broken tracking or a dead
// registration CTA wastes campaign spend silently. Runs inside the live
// Playwright page during capture.

const ANALYTICS_PATTERNS = [
  { name: 'GA4 / Google Tag Manager', critical: true,  re: /googletagmanager\.com|gtag\/js|google-analytics\.com/i },
  { name: 'Meta Pixel',               critical: false, re: /connect\.facebook\.net|fbevents\.js/i },
  { name: 'LinkedIn Insight Tag',     critical: false, re: /snap\.licdn\.com/i },
];

// Registration-intent CTA wording. Only ever tested against <a>/<button> text
// and aria-labels (not body copy), so broad verbs are safe. Covers both IQPC
// event models: open registration ("Book Online Now", "Register") AND
// invitation-only Exchanges ("Request an Invite", "Apply to Attend"). "book"
// must be followed by a booking word so "Download the eBook" doesn't match, and
// "request …invite/invitation" is required so lead-gen ("Request List of
// Attendees", "Download Event Guide") is correctly excluded.
const CTA_REGEX =
  'regist|enroll|enrol|book\\s*(online|now|your|a\\s|my\\s|tickets?|seats?|place|pass)|get\\s+tickets?|buy\\s+tickets?|sign[\\s-]?up|save\\s+(my|your)\\s+(seat|spot|place)|reserve\\s+(my|your|a)\\s*(seat|spot|place)?|request\\s+(an?\\s+|your\\s+)?(invite|invitation)|apply\\s+(to\\s+attend|now|for\\s+(a\\s+)?(place|pass|invite))|express\\s+interest|join\\s+us|get\\s+(my|your)\\s+pass|purchase\\s+(a\\s+)?(pass|ticket)|attend\\b';

export async function checkConversion(page, rawHtml, pageUrl) {
  const result = {
    analytics_found: [],
    analytics_missing: [],
    ctas: [],
    utm_propagation: 'not_tested',
    issues: [], // { severity, code, detail }
  };

  // --- 1. Analytics / pixel presence -------------------------------------
  const scriptSrcs = await page.$$eval('script', (els) =>
    els.map((e) => e.src || '').filter(Boolean)
  );
  const haystack = scriptSrcs.join('\n') + '\n' + rawHtml;
  const hasDataLayer = await page
    .evaluate(() => Array.isArray(window.dataLayer))
    .catch(() => false);

  for (const p of ANALYTICS_PATTERNS) {
    const found = p.re.test(haystack) || (p.name.startsWith('GA4') && hasDataLayer);
    if (found) result.analytics_found.push(p.name);
    else {
      result.analytics_missing.push(p.name);
      result.issues.push({
        severity: p.critical ? 'critical' : 'major',
        code: p.critical ? 'MISSING_ANALYTICS' : 'MISSING_PIXEL',
        detail: `${p.name} not detected — conversions from this page cannot be measured/attributed for that channel.`,
      });
    }
  }

  // --- 2. Registration CTA detection + link validation --------------------
  const ctaCandidates = await page.$$eval(
    'a, button',
    (els, reSrc) => {
      const re = new RegExp(reSrc, 'i');
      // A menu/disclosure toggle (Bootstrap dropdown, modal, collapse, etc.)
      // legitimately uses href="#" to OPEN UI, not to navigate — its real
      // links live inside the menu it reveals. These must not be mistaken for
      // dead CTAs, so exclude them from candidate detection entirely.
      const isToggle = (e) =>
        e.classList.contains('dropdown-toggle') ||
        !!e.getAttribute('data-bs-toggle') ||
        !!e.getAttribute('data-toggle') ||
        ['menu', 'true'].includes((e.getAttribute('aria-haspopup') || '').toLowerCase()) ||
        e.hasAttribute('aria-expanded') ||
        (e.getAttribute('role') === 'button' &&
          ['#', '', null].includes(e.getAttribute('href')));
      return els
        .filter(
          (e) =>
            (re.test(e.textContent || '') ||
              re.test(e.getAttribute('aria-label') || '')) &&
            !isToggle(e)
        )
        .map((e) => ({
          tag: e.tagName.toLowerCase(),
          text: (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
          href: e.getAttribute('href'),
        }));
    },
    CTA_REGEX
  );

  if (ctaCandidates.length === 0) {
    result.issues.push({
      severity: 'critical',
      code: 'NO_REGISTRATION_CTA',
      detail:
        'No registration/booking call-to-action was found on the page. The primary conversion path is missing.',
    });
  }

  for (const cta of ctaCandidates) {
    const record = { ...cta, status: null, ok: null };
    if (cta.tag === 'a') {
      if (!cta.href || cta.href === '#' || cta.href.startsWith('javascript:')) {
        record.ok = false;
        result.issues.push({
          severity: 'critical',
          code: 'DEAD_CTA',
          detail: `CTA "${cta.text}" has no destination (href="${cta.href}").`,
        });
      } else if (/^(mailto:|tel:)/i.test(cta.href)) {
        record.ok = true; // valid, just not fetchable
      } else {
        try {
          const target = new URL(cta.href, pageUrl).toString();
          const resp = await page.request.get(target, { timeout: 15_000 });
          record.status = resp.status();
          record.ok = resp.status() < 400;
          if (!record.ok) {
            result.issues.push({
              severity: 'critical',
              code: 'DEAD_CTA',
              detail: `CTA "${cta.text}" points to ${target} which returned HTTP ${resp.status()}.`,
            });
          }
        } catch (err) {
          record.ok = false;
          result.issues.push({
            severity: 'critical',
            code: 'DEAD_CTA',
            detail: `CTA "${cta.text}" destination could not be reached (${err.message}).`,
          });
        }
      }
    } else {
      record.ok = 'button-js'; // JS-driven button; validated only by human/LLM review
    }
    result.ctas.push(record);
  }

  // --- 3. UTM propagation (heuristic) -------------------------------------
  // If the page itself was loaded with utm_ params, outbound registration
  // links should carry them (or the site relies on JS/session handoff — flag
  // for human confirmation rather than block).
  const pageParams = new URL(pageUrl).searchParams;
  const utms = [...pageParams.keys()].filter((k) => k.startsWith('utm_'));
  if (utms.length > 0) {
    const httpCtas = result.ctas.filter((c) => c.href && /^https?:|^\//.test(c.href));
    const carrying = httpCtas.filter((c) => {
      try {
        const p = new URL(c.href, pageUrl).searchParams;
        return utms.every((k) => p.has(k));
      } catch { return false; }
    });
    if (httpCtas.length > 0 && carrying.length === 0) {
      result.utm_propagation = 'not_propagated';
      result.issues.push({
        severity: 'major',
        code: 'UTM_NOT_PROPAGATED',
        detail:
          'Page was loaded with UTM parameters but registration links do not carry them. Campaign attribution may break at the handoff — confirm the reg platform captures source another way.',
      });
    } else if (httpCtas.length > 0) {
      result.utm_propagation = 'propagated';
    }
  }

  return result;
}
