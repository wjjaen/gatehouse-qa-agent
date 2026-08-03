// core.js — The ORCHESTRATOR. One capture pass feeds every gate agent;
// results merge into a weighted scorecard with a single tiered verdict.
//
// Pipeline: capture (shared) → conversion → Lighthouse → gate agents
// (design, brand, seo) → weighted score + verdict → history + regression
// → unified report + fix prompts.

import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';
import path from 'node:path';
import { capture } from './capture.js';
import { runLighthouse } from './perf.js';
import { summarizeAxe } from './lib.js';
import * as designQA from './agents/design-qa.js';
import * as brandCompliance from './agents/brand-compliance.js';
import * as seoAudit from './agents/seo-audit.js';

const AGENTS = { design: designQA, brand: brandCompliance, seo: seoAudit };
const WEIGHTS = { design: 0.4, brand: 0.35, seo: 0.25 };
const HTML_CHAR_LIMIT = 25_000;
const SCORE_REVIEW_THRESHOLD = 60;
const HISTORY_FILE = path.join('history', 'scores.jsonl');

// ---------- verdict (CODE decides, never the LLM alone) ----------

function computeVerdict(axe, conversion, agentResults) {
  const convBlockers = conversion.issues.filter((i) => i.severity === 'critical');
  const axeBlockers = axe.violations.filter((v) => ['critical', 'serious'].includes(v.impact));
  const llmCritical = agentResults
    .flatMap((r) => r.findings || [])
    .filter((f) => f.severity === 'critical' && !f.deterministic);

  if (convBlockers.length > 0)
    return { verdict: 'BLOCK', reason: `${convBlockers.length} critical conversion issue(s): ${[...new Set(convBlockers.map((i) => i.code))].join(', ')}` };
  if (axeBlockers.length > 0)
    return { verdict: 'BLOCK', reason: `${axeBlockers.length} critical/serious accessibility violation(s) (axe-core)` };
  if (llmCritical.length > 0)
    return { verdict: 'NEEDS_HUMAN_REVIEW', reason: `${llmCritical.length} critical finding(s) flagged by review agents` };
  return null; // score threshold checked by caller once weighted score exists
}

function weightedScore(agentResults) {
  const scored = agentResults.filter((r) => typeof r.score === 'number');
  if (!scored.length) return null;
  const totalW = scored.reduce((s, r) => s + (WEIGHTS[r.id] ?? 0.25), 0);
  return Math.round(scored.reduce((s, r) => s + r.score * (WEIGHTS[r.id] ?? 0.25), 0) / totalW);
}

// ---------- history + regression ----------

function appendHistory(entry) {
  fs.mkdirSync(path.dirname(HISTORY_FILE), { recursive: true });
  fs.appendFileSync(HISTORY_FILE, JSON.stringify(entry) + '\n');
}

function previousRun(url) {
  if (!fs.existsSync(HISTORY_FILE)) return null;
  const runs = fs.readFileSync(HISTORY_FILE, 'utf8').split('\n').filter(Boolean)
    .map((l) => JSON.parse(l)).filter((r) => r.url === url);
  return runs.length ? runs[runs.length - 1] : null;
}

function computeRegression(prev, current) {
  if (!prev) return { first_run: true };
  return {
    first_run: false,
    previous_date: prev.ts,
    previous_score: prev.score,
    score_delta: (current.score ?? 0) - (prev.score ?? 0),
    previous_verdict: prev.verdict,
    verdict_changed: prev.verdict !== current.verdict,
    regressed: (current.score ?? 0) < (prev.score ?? 0) - 5 ||
      (prev.verdict === 'PASS' && current.verdict !== 'PASS'),
  };
}

// ---------- fixes ----------

function writeFixPrompts(outDir, agentResults, conversion, axeSummary) {
  const blocks = [];
  let n = 0;
  const add = (title, prompt) => {
    n += 1;
    blocks.push(`## Fix ${n}: ${title}\n\nPaste into Claude Code (or Lovable chat):\n\n\`\`\`\n${prompt}\n\`\`\`\n`);
  };

  for (const issue of conversion.issues.filter((i) => i.severity !== 'minor')) {
    const prompts = {
      MISSING_ANALYTICS: 'Add the Google Tag Manager container snippet to this site: the GTM script in <head> and the noscript iframe after the opening <body> tag. Container ID: GTM-XXXXXXX. Verify window.dataLayer initializes.',
      MISSING_PIXEL: 'Add the missing marketing pixel base code to the <head> of this site and confirm it fires on page load. Pixel/partner ID: <fill in>.',
      NO_REGISTRATION_CTA: 'Add a prominent primary registration CTA button in the hero, above the fold, using the brand accent color, linking to the registration URL: <fill in>. It must be a real <a> element with a valid href.',
      DEAD_CTA: `Fix this broken call-to-action: ${issue.detail} Point it at the correct registration URL and verify the link resolves.`,
      UTM_NOT_PROPAGATED: 'Update all registration links so any utm_* query parameters on the current page URL are appended to the outbound registration link. Preserve existing query params on the destination.',
    };
    add(`[${issue.severity}] ${issue.code}`, prompts[issue.code] ?? issue.detail);
  }

  for (const v of axeSummary.filter((v) => ['critical', 'serious'].includes(v.impact))) {
    add(`[${v.impact}] Accessibility: ${v.id}`,
      `Fix the axe-core accessibility violation "${v.id}" (${v.description}) affecting ${v.affected_nodes} element(s), e.g. selector: ${v.example_target}. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.`);
  }

  for (const r of agentResults) {
    for (const f of (r.findings || []).filter((f) => f.severity !== 'minor')) {
      add(`[${f.severity}] ${r.label} — ${f.location}`,
        f.fix_prompt ?? `In the ${f.location}: ${f.issue} Fix it as follows: ${f.recommendation}`);
    }
  }

  const fixPath = path.join(outDir, 'fixes.md');
  fs.writeFileSync(fixPath,
    `# Ready-to-paste fix prompts\n\nGenerated from the QA run. Work top-to-bottom — blocking issues first.\n\n${blocks.join('\n') || 'No critical or major issues. Nothing to fix.\n'}`);
  return fixPath;
}

// ---------- report ----------

function writeMarkdownReport(outDir, url, agentResults, score, verdictInfo, axeSummary, conversion, perf, regression, hasApiKey) {
  const L = [];
  L.push(`# Microsite QA Report`);
  L.push(`**URL:** ${url}`);
  L.push(`**Date:** ${new Date().toISOString()}`);
  if (!hasApiKey) L.push(`**Mode:** Deterministic checks only — no ANTHROPIC_API_KEY set, so Design QA / Brand Compliance / SEO gate agents were skipped. Accessibility, conversion, and performance checks below are unaffected.`);
  L.push(`**Verdict:** ${verdictInfo.verdict} — ${verdictInfo.reason}`);
  L.push(`**Weighted score:** ${score ?? 'n/a'}/100  (${agentResults.map((r) => `${r.label}: ${r.score ?? 'err'}`).join(' · ') || 'no gate agents ran'})`);
  if (!regression.first_run) {
    const d = regression.score_delta;
    L.push(`**vs. previous run (${regression.previous_date}):** ${d >= 0 ? '+' : ''}${d} points${regression.regressed ? ' — ⚠ REGRESSION' : ''}${regression.verdict_changed ? ` (verdict changed from ${regression.previous_verdict})` : ''}`);
  }
  L.push('');

  L.push(`## Conversion instrumentation (deterministic)`);
  L.push(`- Analytics detected: ${conversion.analytics_found.join(', ') || 'none'}`);
  if (conversion.analytics_missing.length) L.push(`- Missing: ${conversion.analytics_missing.join(', ')}`);
  L.push(`- Registration CTAs found: ${conversion.ctas.length}`);
  for (const c of conversion.ctas)
    L.push(`  - "${c.text}" → ${c.href ?? '(button)'}${c.status ? ` [HTTP ${c.status}]` : ''} ${c.ok === false ? '✗ BROKEN' : ''}`);
  L.push(`- UTM propagation: ${conversion.utm_propagation}`);
  for (const i of conversion.issues) L.push(`- **[${i.severity}]** ${i.code}: ${i.detail}`);
  L.push('');

  if (perf.available) {
    L.push(`## Performance (Lighthouse)`);
    L.push(`- Performance: ${perf.performance}/100 · SEO: ${perf.seo}/100 · Best practices: ${perf.best_practices}/100 · A11y: ${perf.accessibility}/100`);
    L.push(`- LCP: ${perf.lcp} · CLS: ${perf.cls} · TBT: ${perf.tbt}`);
    if (perf.performance < 50) L.push(`- ⚠ Performance under 50 raises bounce on paid traffic and hurts ad Quality Score — treat as media-budget waste.`);
    L.push('');
  } else {
    L.push(`## Performance`, `- ${perf.note}`, '');
  }

  for (const r of agentResults) {
    L.push(`## ${r.label} — ${r.score ?? 'error'}/100`);
    L.push(r.summary ?? '');
    L.push('');
    L.push(r.report_md ?? (r.error ? `Agent failed: ${r.error}` : ''));
    L.push('');
  }

  L.push(`## Accessibility (axe-core, deterministic)`);
  if (axeSummary.length === 0) L.push('- No violations detected.');
  for (const v of axeSummary)
    L.push(`- **[${v.impact}]** ${v.id}: ${v.description} (${v.affected_nodes} element(s), e.g. \`${v.example_target}\`)`);

  const reportPath = path.join(outDir, 'report.md');
  fs.writeFileSync(reportPath, L.join('\n'));
  return reportPath;
}

// ---------- main pipeline ----------

export async function reviewSite(url, {
  brandPath = 'brand/example-portal.json',
  portal = null,
  skipPerf = false,
  agents = ['design', 'brand', 'seo'],
} = {}) {
  const hasApiKey = Boolean(process.env.ANTHROPIC_API_KEY);
  if (!hasApiKey) {
    console.warn('No ANTHROPIC_API_KEY set — running deterministic checks only (accessibility, conversion, performance). Skipping LLM gate agents: ' + agents.join(', '));
  }

  const runId = new Date().toISOString().replace(/[:.]/g, '-');
  const outDir = path.join('runs', runId);

  console.log('[1/5] Capturing page evidence + conversion checks...');
  const cap = await capture(url, outDir);
  const axeSummary = summarizeAxe(cap.axeResults);

  console.log(skipPerf ? '[2/5] Skipping Lighthouse (--skip-perf)' : '[2/5] Running Lighthouse...');
  const perf = skipPerf
    ? { available: false, note: 'Skipped via --skip-perf' }
    : await runLighthouse(url, outDir);

  const brandRaw = fs.readFileSync(brandPath, 'utf8');
  const brandObj = JSON.parse(brandRaw);
  const client = hasApiKey ? new Anthropic() : null;
  const ctx = {
    client, url, brandRaw, brandObj,
    desktopShot: cap.desktopShot,
    mobileShot: cap.mobileShot,
    html: cap.html,
    htmlExcerpt: cap.html.slice(0, HTML_CHAR_LIMIT),
    axeSummary,
    conversion: cap.conversion,
    styleAudit: cap.styleAudit,
  };

  const agentResults = [];
  if (!hasApiKey) {
    console.log('[3/5] Skipping gate agents (no API key)...');
  } else {
    console.log(`[3/5] Running gate agents: ${agents.join(', ')}...`);
    for (const key of agents) {
      const mod = AGENTS[key];
      if (!mod) { console.warn(`  ! Unknown agent "${key}" — skipping`); continue; }
      try {
        console.log(`  → ${mod.label}`);
        agentResults.push(await mod.run(ctx));
      } catch (err) {
        if (err.raw) fs.writeFileSync(path.join(outDir, `${key}-raw-response.txt`), err.raw);
        console.error(`  ✗ ${mod.label} failed: ${err.message}`);
        agentResults.push({ id: key, label: mod.label, score: null, summary: null, findings: [], report_md: '', error: err.message });
      }
    }
  }

  console.log('[4/5] Verdict, regression check...');
  const score = weightedScore(agentResults);
  let verdictInfo = computeVerdict(cap.axeResults, cap.conversion, agentResults);
  if (!verdictInfo) {
    verdictInfo = score !== null && score < SCORE_REVIEW_THRESHOLD
      ? { verdict: 'NEEDS_HUMAN_REVIEW', reason: `Weighted score ${score} is below the ${SCORE_REVIEW_THRESHOLD} threshold` }
      : { verdict: 'PASS', reason: 'No blocking issues found' };
  }

  const historyEntry = {
    ts: new Date().toISOString(),
    url, portal,
    verdict: verdictInfo.verdict,
    score,
    scores: Object.fromEntries(agentResults.map((r) => [r.id, r.score])),
    critical_findings:
      cap.conversion.issues.filter((i) => i.severity === 'critical').length +
      axeSummary.filter((v) => ['critical', 'serious'].includes(v.impact)).length,
    perf_score: perf.available ? perf.performance : null,
  };
  const regression = computeRegression(previousRun(url), historyEntry);
  appendHistory(historyEntry);

  console.log('[5/5] Writing reports + fix prompts...');
  const result = { url, portal, run: runId, outDir, ...verdictInfo, score, agents: agentResults, conversion: cap.conversion, perf, regression, axe: axeSummary, hasApiKey };
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(result, null, 2));
  const reportPath = writeMarkdownReport(outDir, url, agentResults, score, verdictInfo, axeSummary, cap.conversion, perf, regression, hasApiKey);
  const fixPath = writeFixPrompts(outDir, agentResults, cap.conversion, axeSummary);

  console.log('');
  console.log(`VERDICT: ${verdictInfo.verdict} — ${verdictInfo.reason}`);
  console.log(`Score:   ${score ?? 'n/a'}/100 (${agentResults.map((r) => `${r.id}: ${r.score ?? 'err'}`).join(', ')})${regression.first_run ? '' : ` · ${regression.score_delta >= 0 ? '+' : ''}${regression.score_delta} vs previous`}`);
  console.log(`Report:  ${reportPath}`);
  console.log(`Fixes:   ${fixPath}`);

  return result;
}
