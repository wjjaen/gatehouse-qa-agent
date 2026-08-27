// chat.js — Grounded chat over a single QA run.
//
// Two jobs, one context: answering questions about a scan ("why did this
// fail?", "does this actually matter?") and turning its findings into the
// thing the workflow is actually missing — a brief the marketer can send to
// whoever owns the site.
//
// Everything the model says must come from the run's own report.json. The
// scan already produces plenty of prose; the value here is translation and
// prioritisation, not more opinions about web design.

import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = process.env.DATA_DIR || '.';

// Sonnet by default because the vendor brief is customer-facing output. Set
// CHAT_MODEL=claude-haiku-4-5 to cut per-turn cost by roughly 3x if the
// quality difference doesn't show for your use.
export const CHAT_MODEL = process.env.CHAT_MODEL || 'claude-sonnet-5';

// Trim the run down to what a conversation actually needs. report.json carries
// ~100KB — most of it report_md (a prose restatement of findings) and
// extra.axes (per-axis scores) that would be resent on every single turn.
// Dropping those plus fix_prompt (developer-facing, and already in fixes.md)
// takes the grounding to roughly a fifth of the size with nothing lost for
// this purpose.
export function loadRunContext(runId) {
  if (!runId || runId.includes('..') || runId.includes('/')) {
    throw new Error('Invalid run id');
  }
  const reportPath = path.join(DATA_DIR, 'runs', runId, 'report.json');
  if (!fs.existsSync(reportPath)) {
    throw new Error(`No scan found for run ${runId}`);
  }
  const r = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

  return {
    url: r.url,
    portal: r.portal,
    scanned_at: r.run,
    verdict: r.verdict,
    verdict_reason: r.reason,
    weighted_score: r.score,
    score_weights: { design: '40%', brand: '35%', seo: '25%' },
    agents: (r.agents || []).map((a) => ({
      id: a.id,
      label: a.label,
      score: a.score,
      summary: a.summary,
      error: a.error ?? undefined,
      findings: (a.findings || []).map((f) => ({
        severity: f.severity,
        location: f.location,
        issue: f.issue,
        recommendation: f.recommendation,
      })),
    })),
    accessibility_violations: r.axe || [],
    conversion: {
      analytics_found: r.conversion?.analytics_found || [],
      analytics_missing: r.conversion?.analytics_missing || [],
      registration_ctas: (r.conversion?.ctas || []).map((c) => ({
        text: c.text, href: c.href, http_status: c.status, ok: c.ok,
      })),
      utm_propagation: r.conversion?.utm_propagation,
      issues: r.conversion?.issues || [],
    },
    performance: r.perf?.available ? r.perf : { available: false },
    regression: r.regression,
  };
}

const SHARED_RULES = `
## What you are working from
You have the complete results of one automated pre-publish QA scan of an event
microsite, as JSON. It is the ONLY source of truth available to you.

## Hard rules
- Answer only from the scan data. Never invent a finding, a score, a severity,
  or a page element that is not in the JSON.
- If the scan does not cover something you are asked about, say so plainly and
  say what would answer it (e.g. "the scan doesn't test form submission — that
  needs a manual check").
- Never restate a severity as worse or milder than the data says.
- Accessibility violations and conversion issues are deterministic: they were
  measured by axe-core and by instrumenting the live page, not judged by a
  model. Treat them as fact. Findings from the design, brand, and SEO agents
  are model review — reliable but interpretive, and worth saying so when a
  reader is deciding how much to trust one.

## Who you are talking to
An event marketer, not an engineer. They own whether this page ships, and they
brief an agency or an internal web team to make changes — they do not write
code. Explain in plain language, translate jargon, and lead with what a
finding means for the event: registrations lost, brand embarrassment,
accessibility risk, wasted ad spend.

## The verdict system
BLOCK means a critical conversion or accessibility issue was found — the page
should not go live as-is. NEEDS_HUMAN_REVIEW means a review agent flagged
something critical, or the weighted score fell below 60. PASS means no
blocking issues. The weighted score is design 40%, brand 35%, SEO 25%.
`.trim();

const CHAT_INSTRUCTIONS = `
You are the QA assistant inside the Gatehouse dashboard, answering questions
about one scan.

${SHARED_RULES}

## How to answer
- Lead with the answer. Supporting detail after.
- Be brief by default — a couple of short paragraphs. Expand only when the
  question genuinely needs it.
- Reference findings by their location so the reader can find them in the
  report (e.g. "in the hero on mobile").
- When asked what matters most, rank by real consequence, not by the order the
  findings happen to be listed in. A dead registration CTA outranks a
  typographic inconsistency every time.
- Prose, not bullet walls, unless the answer is genuinely a list.
- Never output a code block of fixes; the report already generates those.
`.trim();

const BRIEF_INSTRUCTIONS = `
You are writing the email that an event marketer will send to the agency or
web team that owns this microsite.

${SHARED_RULES}

## What to produce
A ready-to-send email. Nothing else — no preamble to the marketer, no notes
about what you did, no markdown headings.

Structure it as:
- A subject line, on the first line, prefixed "Subject: ".
- One short opening sentence: what page, what state it's in, what you need.
- The blocking issues first, each as its own short paragraph: what is wrong,
  where on the page, and what needs to happen. Plain language — no severity
  labels, no tool names, no jargon like "axe-core" or "WCAG 2.2 AA" unless you
  explain it in the same breath.
- Then the issues worth fixing but not blocking, kept tight — a single grouped
  paragraph is usually right.
- A closing line asking for confirmation once the blocking items are done.

## Judgement
- Include every critical issue. Be selective below that: a list of thirty
  items gets ignored, and the marketer's credibility with this vendor is
  spent on what actually matters.
- Group related findings rather than listing them separately — five spacing
  inconsistencies are one request about spacing consistency.
- Never assign blame or speculate about why something is wrong.
- If the scan found nothing blocking, say so and keep the email short.
`.trim();

export function buildSystem(ctx, mode) {
  const instructions = mode === 'brief' ? BRIEF_INSTRUCTIONS : CHAT_INSTRUCTIONS;
  return [
    { type: 'text', text: instructions },
    {
      type: 'text',
      text: `## Scan results\n\n${JSON.stringify(ctx, null, 2)}`,
      // The scan data is identical on every turn of a conversation, so cache
      // it: follow-up questions then re-read it at a fraction of the cost
      // instead of paying full input price each time.
      cache_control: { type: 'ephemeral' },
    },
  ];
}

// Stream a reply, invoking onDelta with each chunk of text as it arrives.
// Returns the accumulated text plus usage, for logging.
export async function streamReply(client, { system, messages, onDelta }) {
  const stream = client.messages.stream({
    model: CHAT_MODEL,
    max_tokens: 4000,
    system,
    messages,
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      onDelta(event.delta.text);
    }
  }

  const final = await stream.finalMessage();
  return {
    text: final.content.filter((b) => b.type === 'text').map((b) => b.text).join(''),
    usage: final.usage,
  };
}
