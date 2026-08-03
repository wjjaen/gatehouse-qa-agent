# Microsite QA Agent System (v0.3)

A multi-agent pre-publish QA gate + content tools for event microsites.
One shared browser capture pass feeds three gate agents; an orchestrator
merges their results into a weighted scorecard with a single tiered verdict.

## The agents

**Gate agents** (run by the orchestrator on every review):

| Agent | Deterministic layer | LLM judgment layer |
|---|---|---|
| Design QA | axe-core WCAG 2.2 scan | Layout, typography, spacing, hierarchy, consistency, responsive integrity (7-axis rubric) |
| Brand Compliance | Rendered-CSS token scan: off-palette colors and rogue fonts, counted per element | Logo usage, accent discipline, tone of voice, required-elements checklist |
| SEO Audit | Title/meta lengths, Open Graph, canonical, h1 structure, alt coverage, JSON-LD presence | Search-intent quality, improved metadata, **generates schema.org Event JSON-LD if missing** (earns Google event rich results) |

Plus, on every run: **conversion instrumentation** (analytics tags, CTA
link validation, UTM propagation) and optional **Lighthouse** performance.

**Assistive tools** (upstream of the gate):

- `content-gen.js` — turns an event brief into a brand-constrained content
  pack: headlines, descriptions, SEO metadata, LinkedIn/X posts, email
  subject lines. Facts-only (never invents dates/speakers/prices); length
  limits enforced in code. Content made here is pre-compliant, shrinking
  what the gate has to catch.
- `generate-guardrails.js` — converts a brand config into CLAUDE.md /
  Lovable knowledge files so marketers build compliant sites from the start.

## Verdict tiers

- **BLOCK** — deterministic failures only: critical conversion issues
  (no/dead registration CTA, missing GA4/GTM) or critical/serious WCAG
  violations. Nobody argues with axe-core.
- **NEEDS_HUMAN_REVIEW** — any agent flagged a critical judgment finding,
  or the weighted score is below 60.
- **PASS** — publishable, with advisory score and fix list.

LLM judgment alone never blocks; it escalates to a human. Weighted score:
Design 40% · Brand 35% · SEO 25% (edit `WEIGHTS` in core.js).

## Setup (one time)

Node.js 18+, Anthropic API key (https://console.anthropic.com → API Keys).

```bash
cd design-qa-agent
npm install
npx playwright install chromium
export ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## Commands

```bash
# Full gate review (all three agents, one capture pass)
node agent.js https://staging.yourcms.com/event-x --brand brand/example-portal.json --portal "WorkX"

# Single agent only, skip Lighthouse
node agent.js https://... --agents design --skip-perf

# Portfolio crawl → Brand Health Index dashboard
cp brand/sites.example.json brand/sites.json   # edit with real URLs
node batch.js brand/sites.json

# Generate a content pack from an event brief
node content-gen.js brief/example-event.json --brand brand/example-portal.json

# Generate upstream guardrail files from a brand config
node generate-guardrails.js brand/example-portal.json
```

## Outputs per review (`runs/<timestamp>/`)

- `report.md` — unified report: verdict, weighted + per-agent scores,
  conversion checks, performance, each agent's section, improved SEO
  metadata, generated Event JSON-LD
- `fixes.md` — ready-to-paste Claude Code / Lovable prompts, one per issue,
  blocking-first
- `report.json` — machine-readable scorecard for dashboards/CI/Slack
- Evidence: `desktop.png`, `mobile.png`, `page.html`, `axe.json`,
  `conversion.json`, `styles.json`, `lighthouse.json`

## Batch dashboard (`dashboard/index-<date>.md|json`)

Per-portal table: overall + per-agent averages, pass/review/block counts,
and an overall **Brand Health Index**. All runs append to
`history/scores.jsonl`; every review is diffed against the previous run of
the same URL and flags **⚠ REGRESSION** on a >5-point drop or a lost PASS.

## Calibrate before you trust it

1. Run against 3 good and 3 bad microsites; compare to your own judgment.
2. Edit `prompts/rubric.md` (design) and severity thresholds where it
   disagrees. Brand token scan threshold: `OFF_PALETTE_THRESHOLD` in
   `agents/brand-compliance.js`.
3. Run twice on the same page — scores should land within ±5 points, or
   the rubric language is too vague.

## Architecture

```
agent.js / batch.js  →  core.js (orchestrator)
                          ├─ capture.js (one pass: screenshots, HTML,
                          │              axe, conversion.js, style audit)
                          ├─ perf.js (Lighthouse, optional)
                          ├─ agents/design-qa.js
                          ├─ agents/brand-compliance.js
                          └─ agents/seo-audit.js
content-gen.js  (assistive, upstream)
generate-guardrails.js  (prevention, upstream)
```

Each agent exports `{ id, label, run(ctx) }` and returns
`{ score, summary, findings, report_md }`. Adding an agent = one file in
`agents/` + one line in the `AGENTS` map in core.js.

## Costs

A full three-agent review ≈ three model calls sharing one capture — roughly
10-20 cents per site. Nightly batch across dozens of sites: a few dollars.

## Roadmap (v0.4+)

- Analytics/CRO agent (post-publish loop on live conversion data)
- Section-by-section screenshots for very tall pages
- CMS webhook trigger + Slack report delivery
- Trend charts from history/scores.jsonl
