// content-gen.js — Content Generation Agent (ASSISTIVE tool, not a gate).
// Lives upstream of the QA gate: content generated here is brand- and
// SEO-compliant by construction, shrinking what the gate has to catch.
//
// Usage: node content-gen.js brief/example-event.json [--brand brand/example-portal.json]
//
// Input:  an event brief (facts only — the agent never invents dates,
//         speakers, or prices).
// Output: content/<slug>/content-pack.md and content-pack.json containing
//         headlines, descriptions, SEO metadata, social posts, and email
//         subject lines — all length-validated in code.

import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';
import path from 'node:path';
import { callClaudeJSON } from './lib.js';

const args = process.argv.slice(2);
const briefPath = args.find((a) => !a.startsWith('--'));
if (!briefPath) {
  console.error('Usage: node content-gen.js <brief.json> [--brand path/to/brand.json]');
  process.exit(1);
}
const flag = (name) => { const i = args.indexOf(name); return i > -1 ? args[i + 1] : undefined; };
const brandPath = flag('--brand') ?? 'brand/example-portal.json';

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Set ANTHROPIC_API_KEY first: export ANTHROPIC_API_KEY=sk-ant-...');
  process.exit(1);
}

const brief = JSON.parse(fs.readFileSync(briefPath, 'utf8'));
const brandRaw = fs.readFileSync(brandPath, 'utf8');

const system = `You are a senior B2B events copywriter producing launch content for an event
microsite. Follow the brand tone exactly. Use ONLY facts from the event brief —
never invent dates, venues, prices, speaker names, statistics, or attendee
counts. If the brief lacks a fact, write around it. Every piece must be
benefit-led: what the attendee gains, not what the event contains.

## Brand configuration (tone is binding)
${brandRaw}

## Hard length limits (enforced after generation — violations are rejected)
- seo.title: ≤60 characters
- seo.meta_description: 140–160 characters
- social.x_posts: each ≤270 characters including hashtags
- email_subject_lines: each ≤55 characters

## Output format
Respond with ONLY a raw JSON object — no markdown fences, no preamble:
{
  "headlines": ["<5 hero headline options, ≤10 words each, varied angles: outcome, urgency, community, authority, curiosity>"],
  "subheadlines": ["<3 supporting subheadline options, ≤20 words>"],
  "event_description_short": "<50-70 words, for listings and previews>",
  "event_description_long": "<180-250 words, for the microsite about section>",
  "seo": { "title": "<≤60 chars>", "meta_description": "<140-160 chars>" },
  "social": {
    "linkedin_posts": ["<3 posts, 80-150 words each, professional, one clear CTA, 3-5 relevant hashtags>"],
    "x_posts": ["<3 posts, ≤270 chars each>"]
  },
  "email_subject_lines": ["<5 options ≤55 chars, varied: benefit, curiosity, urgency, social proof, direct>"],
  "cta_labels": ["<4 registration button label options, 2-4 words>"]
}`;

const content = [{ type: 'text', text: `Event brief:\n${JSON.stringify(brief, null, 2)}\n\nGenerate the content pack now.` }];

// ---------- length validation (CODE enforces, not the LLM) ----------

function validate(pack) {
  const warnings = [];
  if (pack.seo?.title?.length > 60) warnings.push(`seo.title is ${pack.seo.title.length} chars (limit 60)`);
  const md = pack.seo?.meta_description?.length ?? 0;
  if (md > 160 || md < 120) warnings.push(`seo.meta_description is ${md} chars (target 140-160)`);
  (pack.social?.x_posts ?? []).forEach((p, i) => {
    if (p.length > 280) warnings.push(`x_posts[${i}] is ${p.length} chars (hard limit 280)`);
  });
  (pack.email_subject_lines ?? []).forEach((s, i) => {
    if (s.length > 60) warnings.push(`email_subject_lines[${i}] is ${s.length} chars (target ≤55)`);
  });
  return warnings;
}

// ---------- run ----------

const client = new Anthropic();
console.log('[1/2] Generating content pack...');
const { json: pack } = await callClaudeJSON(client, { system, content, maxTokens: 4000 });

const warnings = validate(pack);
if (warnings.length) {
  console.warn('Length warnings (edit before use):');
  for (const w of warnings) console.warn(`  ⚠ ${w}`);
}

console.log('[2/2] Writing files...');
const slug = (brief.event_name ?? 'event').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const outDir = path.join('content', slug);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'content-pack.json'), JSON.stringify({ brief: briefPath, generated: new Date().toISOString(), warnings, ...pack }, null, 2));

const L = [];
L.push(`# Content Pack — ${brief.event_name ?? 'Event'}`);
L.push(`Generated ${new Date().toISOString()} · Brief: ${briefPath}`);
if (warnings.length) L.push('', `> ⚠ ${warnings.length} length warning(s) — see content-pack.json`);
L.push('', '## Hero headlines');
pack.headlines?.forEach((h, i) => L.push(`${i + 1}. ${h}`));
L.push('', '## Subheadlines');
pack.subheadlines?.forEach((h, i) => L.push(`${i + 1}. ${h}`));
L.push('', '## Event description (short)', pack.event_description_short ?? '');
L.push('', '## Event description (long)', pack.event_description_long ?? '');
L.push('', '## SEO metadata');
L.push(`- Title (${pack.seo?.title?.length ?? 0} chars): ${pack.seo?.title ?? ''}`);
L.push(`- Meta description (${pack.seo?.meta_description?.length ?? 0} chars): ${pack.seo?.meta_description ?? ''}`);
L.push('', '## LinkedIn posts');
pack.social?.linkedin_posts?.forEach((p, i) => L.push(`### Post ${i + 1}`, p, ''));
L.push('## X posts');
pack.social?.x_posts?.forEach((p, i) => L.push(`${i + 1}. (${p.length} chars) ${p}`));
L.push('', '## Email subject lines');
pack.email_subject_lines?.forEach((s, i) => L.push(`${i + 1}. (${s.length} chars) ${s}`));
L.push('', '## CTA button labels');
pack.cta_labels?.forEach((c, i) => L.push(`${i + 1}. ${c}`));

fs.writeFileSync(path.join(outDir, 'content-pack.md'), L.join('\n'));
console.log(`Done → ${outDir}/content-pack.md`);
