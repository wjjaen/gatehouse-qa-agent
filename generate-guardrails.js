// generate-guardrails.js — Prevention over detection.
// Converts a per-portal brand config into files marketers drop into their
// AI coding tools BEFORE building, so sites are compliant from the start:
//   - CLAUDE.md            → goes in the project root for Claude Code
//   - lovable-knowledge.md → paste into Lovable's Knowledge / custom instructions
//
// Usage: node generate-guardrails.js brand/example-portal.json

import fs from 'node:fs';
import path from 'node:path';

const brandPath = process.argv[2] ?? 'brand/example-portal.json';
const b = JSON.parse(fs.readFileSync(brandPath, 'utf8'));
const slug = (b.portal ?? 'portal').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const outDir = path.join('guardrails', slug);
fs.mkdirSync(outDir, { recursive: true });

const rules = `# ${b.portal} — Microsite Build Guardrails

You are building an event microsite for **${b.portal}**${b.event ? ` (event: ${b.event})` : ''}.
These rules are non-negotiable. An automated QA gate enforces them before publish —
violations will block or delay the launch.

## Colors
- Primary: ${b.colors.primary}
- Accent: ${b.colors.accent} — ${b.colors.notes ?? 'reserved for CTAs and key highlights only'}
- Background: ${b.colors.background} · Text: ${b.colors.text}
- Use ONLY these values. Do not invent additional colors.

## Typography
- Headings: ${b.typography.headings}
- Body: ${b.typography.body}
- Use only sizes from this scale (px): ${b.typography.scale.join(', ')}
- Maintain a clear heading hierarchy (one h1, logical h2/h3 nesting).

## Spacing
- Use only these spacing values (px): ${b.spacing_scale_px.join(', ')}
- Apply them consistently for margins, padding, and gaps.

## Logo
- ${b.logo.usage}
- Minimum clear space: ${b.logo.min_clear_space}

## Required page elements (all must be present)
${b.required_elements.map((e) => `- ${e}`).join('\n')}

## Tone of voice
${b.tone}

## Quality bar (enforced by the automated pre-publish gate)
- A prominent registration CTA above the fold as a real \`<a>\` with a working href
- Google Tag Manager / GA4 installed and initializing (window.dataLayer)
- Registration links preserve utm_* parameters from the page URL
- WCAG 2.2 AA: alt text on all meaningful images, 4.5:1 text contrast,
  keyboard-operable interactive elements, visible focus states
- Fully responsive at 390px width: no horizontal overflow, no overlapping
  or truncated content
- Fast: optimize images, avoid render-blocking scripts (Lighthouse
  performance is scored)
`;

fs.writeFileSync(path.join(outDir, 'CLAUDE.md'), rules);
fs.writeFileSync(
  path.join(outDir, 'lovable-knowledge.md'),
  rules.replace('# ', '# [Paste into Lovable → Knowledge] ')
);

console.log(`Guardrails written to ${outDir}/`);
console.log('  CLAUDE.md            → put in the project root when building with Claude Code');
console.log("  lovable-knowledge.md → paste into Lovable's Knowledge settings");
