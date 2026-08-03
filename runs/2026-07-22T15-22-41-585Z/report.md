# Microsite QA Report
**URL:** https://www.ssonetwork.com/events-workx
**Date:** 2026-07-22T15:22:45.022Z
**Mode:** Deterministic checks only — no ANTHROPIC_API_KEY set, so Design QA / Brand Compliance / SEO gate agents were skipped. Accessibility, conversion, and performance checks below are unaffected.
**Verdict:** BLOCK — 2 critical conversion issue(s): MISSING_ANALYTICS, NO_REGISTRATION_CTA
**Weighted score:** n/a/100  (no gate agents ran)

## Conversion instrumentation (deterministic)
- Analytics detected: none
- Missing: GA4 / Google Tag Manager, Meta Pixel, LinkedIn Insight Tag
- Registration CTAs found: 0
- UTM propagation: not_tested
- **[critical]** MISSING_ANALYTICS: GA4 / Google Tag Manager not detected — conversions from this page cannot be measured/attributed for that channel.
- **[major]** MISSING_PIXEL: Meta Pixel not detected — conversions from this page cannot be measured/attributed for that channel.
- **[major]** MISSING_PIXEL: LinkedIn Insight Tag not detected — conversions from this page cannot be measured/attributed for that channel.
- **[critical]** NO_REGISTRATION_CTA: No registration/booking call-to-action was found on the page. The primary conversion path is missing.

## Performance
- Skipped via --skip-perf

## Accessibility (axe-core, deterministic)
- **[serious]** html-has-lang: Ensure every HTML document has a lang attribute (1 element(s), e.g. `html`)
- **[moderate]** landmark-one-main: Ensure the document has a main landmark (1 element(s), e.g. `html`)
- **[moderate]** region: Ensure all page content is contained by landmarks (1 element(s), e.g. `center`)