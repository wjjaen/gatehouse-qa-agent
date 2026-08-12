// agents/design-qa.js — Visual design review against the rubric.
// Judges what only screenshots reveal: layout, typography, spacing,
// hierarchy, consistency, responsive integrity.

import fs from 'node:fs';
import { callClaudeJSON, screenshotBlocks } from '../lib.js';

export const id = 'design';
export const label = 'Design QA';

export async function run(ctx) {
  const rubric = fs.readFileSync('prompts/rubric.md', 'utf8');

  const system = `${rubric}

## Brand configuration for this portal (source of truth)
${ctx.brandRaw}

## Output format
Respond with ONLY a raw JSON object — no markdown fences, no preamble — matching:
{
  "overall_score": <0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "axes": [
    {
      "name": "<axis name from the rubric>",
      "score": <1-7>,
      "findings": [
        {
          "severity": "critical" | "major" | "minor",
          "location": "<where on the page, e.g. 'Hero section, desktop'>",
          "issue": "<what is wrong, specifically>",
          "recommendation": "<concrete fix>",
          "fix_prompt": "<a single self-contained instruction a marketer could paste into an AI coding tool to apply the fix>"
        }
      ]
    }
  ]
}
Include all 7 axes even when a score is high and findings are empty.`;

  const content = [
    ...screenshotBlocks('Desktop screenshot (1440px viewport)', ctx.desktopTiles, ctx.desktopShot),
    ...screenshotBlocks('Mobile screenshot (390px viewport)', ctx.mobileTiles, ctx.mobileShot),
    {
      type: 'text',
      text: `Rendered page HTML (scripts removed, truncated):\n\n${ctx.htmlExcerpt}\n\nDeterministic results for context — do NOT re-report these; focus on what only visual review reveals.\nAccessibility (axe-core):\n${JSON.stringify(ctx.axeSummary, null, 2)}\nConversion instrumentation issues:\n${JSON.stringify(ctx.conversion.issues, null, 2)}\n\nPerform the design QA review now.`,
    },
  ];

  const { json } = await callClaudeJSON(ctx.client, { system, content, maxTokens: 12000 });

  // Standardize: flatten axis findings, prefix location with axis name.
  const findings = json.axes.flatMap((a) =>
    (a.findings || []).map((f) => ({ ...f, location: `${a.name} · ${f.location}` }))
  );

  const md = [];
  for (const a of json.axes) {
    md.push(`**${a.name} — ${a.score}/7**`);
    for (const f of a.findings || []) {
      md.push(`- [${f.severity}] ${f.location}: ${f.issue}`);
      md.push(`  - Fix: ${f.recommendation}`);
    }
    if (!a.findings?.length) md.push('- No issues found.');
  }

  return {
    id,
    label,
    score: json.overall_score,
    summary: json.summary,
    findings,
    report_md: md.join('\n'),
    extra: { axes: json.axes },
  };
}
