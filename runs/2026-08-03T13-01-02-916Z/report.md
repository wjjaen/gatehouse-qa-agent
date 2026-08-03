# Microsite QA Report
**URL:** https://jamesportfolio.site/
**Date:** 2026-08-03T13:01:13.591Z
**Verdict:** BLOCK — 1 critical conversion issue(s): MISSING_ANALYTICS
**Weighted score:** n/a/100  (Design QA: err · Brand Compliance: err · SEO Audit: err)
**vs. previous run (2026-08-02T20:10:20.174Z):** -36 points — ⚠ REGRESSION

## Conversion instrumentation (deterministic)
- Analytics detected: none
- Missing: GA4 / Google Tag Manager, Meta Pixel, LinkedIn Insight Tag
- Registration CTAs found: 1
  - "→UX/UI Design2024Taking IQPC Conference Registration From Phone and Email to Onl" → /work/iqpc-conference-registration-checkout [HTTP 200] 
- UTM propagation: not_tested
- **[critical]** MISSING_ANALYTICS: GA4 / Google Tag Manager not detected — conversions from this page cannot be measured/attributed for that channel.
- **[major]** MISSING_PIXEL: Meta Pixel not detected — conversions from this page cannot be measured/attributed for that channel.
- **[major]** MISSING_PIXEL: LinkedIn Insight Tag not detected — conversions from this page cannot be measured/attributed for that channel.

## Performance
- Skipped via --skip-perf

## Design QA — error/100




## Brand Compliance — error/100




## SEO Audit — error/100




## Accessibility (axe-core, deterministic)
- No violations detected.