// agents/brand-compliance.js — Two layers:
// 1. DETERMINISTIC token scan: diffs the colors and font stacks actually
//    rendered on the page against the portal's brand config. No LLM opinion.
// 2. LLM review: logo usage, tone of voice, accent discipline, and the
//    required-elements checklist — judged from screenshots.

import { b64, callClaudeJSON } from '../lib.js';

export const id = 'brand';
export const label = 'Brand Compliance';

// Elements-used threshold before an off-palette color/font becomes a finding.
// Tune after calibration runs — templates often inject minor utility colors.
const OFF_PALETTE_THRESHOLD = 25;

function normalizeHex(h) {
  return (h || '').toUpperCase();
}

function firstFamily(stack) {
  return (stack || '').split(',')[0].replace(/["']/g, '').trim().toLowerCase();
}

function tokenScan(styleAudit, brandObj) {
  const findings = [];
  const palette = new Set(
    [
      brandObj.colors?.primary,
      brandObj.colors?.accent,
      brandObj.colors?.background,
      brandObj.colors?.text,
      '#FFFFFF',
      '#000000',
    ]
      .filter(Boolean)
      .map(normalizeHex)
  );

  const offPalette = (styleAudit.colors || []).filter(
    (c) => !palette.has(normalizeHex(c.value)) && c.elements >= OFF_PALETTE_THRESHOLD
  );
  for (const c of offPalette) {
    findings.push({
      severity: c.elements >= 100 ? 'major' : 'minor',
      location: 'Rendered CSS (computed styles)',
      issue: `Off-palette color ${c.value} is used on ${c.elements} elements. Approved palette: ${[...palette].join(', ')}.`,
      recommendation: `Replace ${c.value} with the nearest approved brand token.`,
      fix_prompt: `Find every use of the color ${c.value} in this site's styles and replace it with the closest approved brand color from this palette: ${[...palette].join(', ')}. Keep contrast WCAG AA compliant.`,
      deterministic: true,
    });
  }

  const brandFamilies = [
    firstFamily(brandObj.typography?.headings),
    firstFamily(brandObj.typography?.body),
  ].filter(Boolean);
  const roguefonts = (styleAudit.fonts || []).filter((f) => {
    const stack = f.value.toLowerCase();
    return (
      f.elements >= OFF_PALETTE_THRESHOLD &&
      !brandFamilies.some((fam) => stack.includes(fam))
    );
  });
  for (const f of roguefonts) {
    findings.push({
      severity: 'major',
      location: 'Rendered CSS (computed styles)',
      issue: `Non-brand font stack "${f.value}" is used on ${f.elements} elements. Brand fonts: ${brandObj.typography?.headings} (headings), ${brandObj.typography?.body} (body).`,
      recommendation: 'Load and apply the brand font families.',
      fix_prompt: `Replace the font stack "${f.value}" across this site with the brand fonts: "${brandObj.typography?.headings}" for headings and "${brandObj.typography?.body}" for body text. Add the necessary font imports.`,
      deterministic: true,
    });
  }

  return findings;
}

export async function run(ctx) {
  // Layer 1: deterministic
  const detFindings = tokenScan(ctx.styleAudit, ctx.brandObj);

  // Layer 2: LLM visual/verbal review
  const system = `You are a brand guardian performing pre-publish brand-compliance review of an
event microsite against the portal's brand configuration below. Judge from the
screenshots and page copy. Be specific and evidence-based; do not invent
issues you cannot see. Deterministic color/font token scanning has already
run — do NOT re-report palette or font-stack violations. Focus on what only
human-style judgment reveals: logo usage and clear space, accent-color
discipline (accent reserved for CTAs/highlights), imagery style, tone of
voice of the copy, messaging alignment, and the required-elements checklist.

## Brand configuration (source of truth)
${ctx.brandRaw}

## Output format
Respond with ONLY a raw JSON object — no markdown fences, no preamble:
{
  "score": <0-100 brand fidelity score>,
  "summary": "<2-3 sentence assessment>",
  "required_elements": [
    { "element": "<from the brand config list>", "present": true|false, "note": "<where found / what's missing>" }
  ],
  "findings": [
    {
      "severity": "critical" | "major" | "minor",
      "location": "<where on the page>",
      "issue": "<what violates the brand>",
      "recommendation": "<concrete fix>",
      "fix_prompt": "<paste-ready instruction for an AI coding tool>"
    }
  ]
}
Severity "critical" is reserved for brand violations that would embarrass the
organization if published (wrong/distorted logo, off-brand messaging that
misrepresents the event, missing legally required elements).`;

  const content = [
    { type: 'text', text: 'Desktop screenshot (1440px viewport, full page):' },
    { type: 'image', source: { type: 'base64', media_type: 'image/png', data: b64(ctx.desktopShot) } },
    { type: 'text', text: 'Mobile screenshot (390px viewport, full page):' },
    { type: 'image', source: { type: 'base64', media_type: 'image/png', data: b64(ctx.mobileShot) } },
    {
      type: 'text',
      text: `Page HTML for copy/tone review (truncated):\n\n${ctx.htmlExcerpt}\n\nPerform the brand compliance review now.`,
    },
  ];

  const { json } = await callClaudeJSON(ctx.client, { system, content, maxTokens: 3500 });

  // Deterministic findings drag the score: -5 per major, -2 per minor.
  const detPenalty = detFindings.reduce(
    (s, f) => s + (f.severity === 'major' ? 5 : 2),
    0
  );
  const score = Math.max(0, Math.min(100, json.score - detPenalty));

  const findings = [...detFindings, ...(json.findings || [])];
  const missing = (json.required_elements || []).filter((e) => !e.present);

  const md = [];
  md.push(`**Required elements**`);
  for (const e of json.required_elements || [])
    md.push(`- ${e.present ? '✓' : '✗ MISSING'} ${e.element}${e.note ? ` — ${e.note}` : ''}`);
  md.push('', `**Token scan (deterministic)**`);
  md.push(
    detFindings.length
      ? detFindings.map((f) => `- [${f.severity}] ${f.issue}`).join('\n')
      : '- Rendered colors and fonts match the brand palette. ✓'
  );
  md.push('', `**Findings**`);
  for (const f of json.findings || []) {
    md.push(`- [${f.severity}] ${f.location}: ${f.issue}`);
    md.push(`  - Fix: ${f.recommendation}`);
  }
  if (!json.findings?.length) md.push('- No issues found.');

  return {
    id,
    label,
    score,
    summary:
      json.summary +
      (missing.length ? ` Missing required elements: ${missing.map((m) => m.element).join('; ')}.` : ''),
    findings,
    report_md: md.join('\n'),
    extra: { required_elements: json.required_elements, token_scan: detFindings },
  };
}
