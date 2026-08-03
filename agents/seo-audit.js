// agents/seo-audit.js — Two layers:
// 1. DETERMINISTIC checks: title/meta lengths, Open Graph, canonical,
//    heading structure, image alt coverage, schema.org JSON-LD presence.
// 2. LLM review: search-intent quality of titles/copy, improved metadata,
//    and — the power move — GENERATES the schema.org/Event JSON-LD if
//    missing. Event structured data is what earns rich results in Google.

import { parse } from 'node-html-parser';
import { callClaudeJSON } from '../lib.js';

export const id = 'seo';
export const label = 'SEO Audit';

function deterministicChecks(html) {
  const root = parse(html);
  const attr = (sel, a) => root.querySelector(sel)?.getAttribute(a) ?? null;

  const title = root.querySelector('title')?.text.trim() ?? null;
  const metaDesc = attr('meta[name="description"]', 'content');
  const canonical = attr('link[rel="canonical"]', 'href');
  const ogTitle = attr('meta[property="og:title"]', 'content');
  const ogDesc = attr('meta[property="og:description"]', 'content');
  const ogImage = attr('meta[property="og:image"]', 'content');
  const viewport = attr('meta[name="viewport"]', 'content');
  const robots = attr('meta[name="robots"]', 'content');

  const h1s = root.querySelectorAll('h1').map((h) => h.text.trim().slice(0, 120));
  const imgs = root.querySelectorAll('img');
  const imgsWithAlt = imgs.filter((i) => (i.getAttribute('alt') ?? '').trim().length > 0);
  const altCoverage = imgs.length ? Math.round((imgsWithAlt.length / imgs.length) * 100) : 100;

  let hasEventSchema = false;
  const jsonLdBlocks = root.querySelectorAll('script[type="application/ld+json"]');
  for (const s of jsonLdBlocks) {
    try {
      const data = JSON.parse(s.text);
      const types = JSON.stringify(data);
      if (/"@type"\s*:\s*"(Event|BusinessEvent|EducationEvent)"/.test(types)) hasEventSchema = true;
    } catch { /* malformed JSON-LD — leave hasEventSchema false */ }
  }

  const checks = {
    title,
    title_length: title?.length ?? 0,
    meta_description: metaDesc,
    meta_description_length: metaDesc?.length ?? 0,
    canonical,
    og: { title: ogTitle, description: ogDesc, image: ogImage },
    viewport_meta: !!viewport,
    robots_meta: robots,
    h1_count: h1s.length,
    h1s,
    image_alt_coverage_pct: altCoverage,
    images_total: imgs.length,
    has_event_schema: hasEventSchema,
  };

  const findings = [];
  const add = (severity, issue, recommendation, fix_prompt) =>
    findings.push({ severity, location: 'Document <head> / structure', issue, recommendation, fix_prompt, deterministic: true });

  if (!title) add('major', 'Missing <title> tag.', 'Add a descriptive title (≤60 chars) with event name, year, and location.', 'Add a <title> tag to this page: concise (max 60 characters), containing the event name, year, and city.');
  else if (title.length > 60) add('minor', `Title is ${title.length} chars (recommended ≤60; it will truncate in results).`, 'Shorten the title to ≤60 characters.', `Shorten this page's <title> ("${title}") to 60 characters or fewer while keeping event name, year, and location.`);
  if (!metaDesc) add('major', 'Missing meta description.', 'Add a compelling 150–160 char meta description with a registration hook.', 'Add a meta description tag (150-160 characters) summarizing the event value proposition and ending with a registration call to action.');
  else if (metaDesc.length > 165) add('minor', `Meta description is ${metaDesc.length} chars (will truncate).`, 'Trim to ≤160 characters.', `Trim this page's meta description to 160 characters or fewer without losing the value proposition.`);
  if (!ogImage) add('major', 'Missing og:image — link shares on LinkedIn/social render without a preview card image.', 'Add og:image (1200×630) plus og:title and og:description.', 'Add Open Graph tags to this page: og:title, og:description, and og:image pointing to a 1200x630 share image.');
  if (!canonical) add('minor', 'Missing canonical URL.', 'Add <link rel="canonical"> to prevent duplicate-content dilution.', 'Add a <link rel="canonical"> tag pointing to this page\'s primary URL.');
  if (checks.h1_count === 0) add('major', 'No <h1> on the page.', 'Add exactly one h1 containing the event name.', 'Add a single <h1> element containing the event name to the hero section, keeping the visual styling consistent.');
  if (checks.h1_count > 1) add('minor', `${checks.h1_count} <h1> elements found (should be exactly one).`, 'Demote extra h1s to h2.', 'This page has multiple <h1> elements. Keep the event name as the only <h1> and demote the others to <h2>, preserving visual styles.');
  if (altCoverage < 80 && imgs.length > 0) add('major', `Only ${altCoverage}% of images have alt text.`, 'Add descriptive alt text to all meaningful images.', 'Add descriptive alt text to every meaningful <img> on this page; use empty alt="" only for purely decorative images.');
  if (!hasEventSchema) add('major', 'No schema.org Event structured data (JSON-LD) — the page cannot earn event rich results in Google.', 'Add Event JSON-LD with name, dates, location, organizer, and offers.', 'Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.');

  return { checks, findings };
}

export async function run(ctx) {
  const { checks, findings: detFindings } = deterministicChecks(ctx.html);

  const system = `You are an SEO specialist reviewing an event microsite pre-publish. The
deterministic structural checks below have already run — do NOT re-report
them. Your job is qualitative: search-intent alignment of the title, meta
description, and h1 (would someone searching for this event's topic find and
click this?); keyword coherence between headline, copy, and metadata; and
content depth signals. Then produce improved metadata and, if
"has_event_schema" is false, generate complete schema.org Event JSON-LD
using ONLY facts visible in the page content — never invent dates, venues,
prices, or speakers. Use null for anything not stated on the page.

## Portal brand configuration (for tone)
${ctx.brandRaw}

## Deterministic check results
${JSON.stringify(checks, null, 2)}

## Output format
Respond with ONLY a raw JSON object — no markdown fences, no preamble:
{
  "score": <0-100 overall SEO readiness, weighing the deterministic results above AND your qualitative review>,
  "summary": "<2-3 sentence assessment>",
  "findings": [
    { "severity": "critical"|"major"|"minor", "location": "<where>", "issue": "<what>", "recommendation": "<fix>", "fix_prompt": "<paste-ready instruction>" }
  ],
  "improved_meta": {
    "title": "<≤60 chars>",
    "meta_description": "<150-160 chars>",
    "og_title": "<share-optimized>",
    "og_description": "<share-optimized>"
  },
  "event_schema_jsonld": <the complete JSON-LD object if has_event_schema is false, otherwise null>
}`;

  const content = [
    {
      type: 'text',
      text: `Page URL: ${ctx.url}\n\nRendered page HTML (JSON-LD preserved, truncated):\n\n${ctx.htmlExcerpt}\n\nPerform the SEO review now.`,
    },
  ];

  const { json } = await callClaudeJSON(ctx.client, { system, content, maxTokens: 4000 });

  const findings = [...detFindings, ...(json.findings || [])];

  const md = [];
  md.push(`**Structural checks (deterministic)**`);
  md.push(`- Title: ${checks.title ? `"${checks.title}" (${checks.title_length} chars)` : '✗ missing'}`);
  md.push(`- Meta description: ${checks.meta_description ? `${checks.meta_description_length} chars` : '✗ missing'}`);
  md.push(`- Open Graph: ${checks.og.image ? '✓ complete enough for share cards' : '✗ og:image missing'}`);
  md.push(`- Canonical: ${checks.canonical ? '✓' : '✗ missing'} · Viewport: ${checks.viewport_meta ? '✓' : '✗'} · Robots: ${checks.robots_meta ?? '—'}`);
  md.push(`- H1 count: ${checks.h1_count} · Image alt coverage: ${checks.image_alt_coverage_pct}% of ${checks.images_total}`);
  md.push(`- Event structured data (JSON-LD): ${checks.has_event_schema ? '✓ present' : '✗ MISSING — generated below'}`);
  md.push('', `**Findings**`);
  for (const f of findings) {
    md.push(`- [${f.severity}] ${f.issue}`);
    md.push(`  - Fix: ${f.recommendation}`);
  }
  if (!findings.length) md.push('- No issues found.');
  md.push('', `**Improved metadata (ready to apply)**`);
  md.push(`- Title: ${json.improved_meta?.title ?? '—'}`);
  md.push(`- Meta description: ${json.improved_meta?.meta_description ?? '—'}`);
  if (json.event_schema_jsonld) {
    md.push('', '**Generated schema.org Event JSON-LD (paste into <head>)**');
    md.push('```json');
    md.push(JSON.stringify(json.event_schema_jsonld, null, 2));
    md.push('```');
  }

  return {
    id,
    label,
    score: json.score,
    summary: json.summary,
    findings,
    report_md: md.join('\n'),
    extra: {
      checks,
      improved_meta: json.improved_meta,
      event_schema_jsonld: json.event_schema_jsonld ?? null,
    },
  };
}
