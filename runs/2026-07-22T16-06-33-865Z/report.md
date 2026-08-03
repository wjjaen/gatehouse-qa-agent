# Microsite QA Report
**URL:** https://www.ssonetwork.com/events-workx
**Date:** 2026-07-22T16:07:45.149Z
**Verdict:** BLOCK — 1 critical conversion issue(s): NO_REGISTRATION_CTA
**Weighted score:** 71/100  (Design QA: err · Brand Compliance: err · SEO Audit: 71)
**vs. previous run (2026-07-22T16:05:34.561Z):** +71 points

## Conversion instrumentation (deterministic)
- Analytics detected: GA4 / Google Tag Manager, LinkedIn Insight Tag
- Missing: Meta Pixel
- Registration CTAs found: 0
- UTM propagation: not_tested
- **[major]** MISSING_PIXEL: Meta Pixel not detected — conversions from this page cannot be measured/attributed for that channel.
- **[critical]** NO_REGISTRATION_CTA: No registration/booking call-to-action was found on the page. The primary conversion path is missing.

## Performance
- Skipped via --skip-perf

## Design QA — error/100




## Brand Compliance — error/100




## SEO Audit — 71/100
The page already has a valid Event JSON-LD block in the HTML (contrary to the deterministic flag 'has_event_schema: false'), complete with dates, location, pricing, performers, and sponsors — a meaningful structural asset. However, the title tag wastes its 33 characters on a generic pattern rather than communicating the event's core value proposition, the meta description is 446 characters (nearly 3× the 160-char SERP limit) and leads with an unverifiable superlative ('the leading'), the H1 'WorkX Conference' is too thin to carry keyword weight, and the canonical domain (ssonetwork.com) mismatches the schema @id pointing to iqpc.com, creating brand-authority fragmentation. Keyword coherence is moderate — 'workplace conference', 'facilities', and 'corporate real estate' appear in metadata but 'hybrid work', 'workplace strategy', and 'return to office' — the highest-volume adjacent queries driving this audience — are absent from all crawlable metadata fields.

**Structural checks (deterministic)**
- Title: "WorkX August 2026 | San Francisco" (33 chars)
- Meta description: 446 chars
- Open Graph: ✓ complete enough for share cards
- Canonical: ✓ · Viewport: ✓ · Robots: —
- H1 count: 1 · Image alt coverage: 95% of 66
- Event structured data (JSON-LD): ✗ MISSING — generated below

**Findings**
- [minor] Meta description is 446 chars (will truncate).
  - Fix: Trim to ≤160 characters.
- [major] No schema.org Event structured data (JSON-LD) — the page cannot earn event rich results in Google.
  - Fix: Add Event JSON-LD with name, dates, location, organizer, and offers.
- [critical] Meta description is 446 characters — nearly three times the ~160-character SERP display limit. Google will truncate and rewrite it, losing control of the snippet. It also opens with the unverifiable superlative 'the leading workplace conference', which Google's quality guidelines flag and which fails the brand tone rule ('no unverifiable superlatives').
  - Fix: Rewrite to 150–160 characters. Lead with the audience pain point and primary keyword ('workplace strategy conference'), include the date, city, and one concrete benefit. Remove 'the leading'.
- [critical] Title 'WorkX August 2026 | San Francisco' (33 chars) contains zero descriptive keywords about what the event covers. A user searching 'workplace strategy conference 2026' or 'corporate real estate conference San Francisco' will not recognise relevance from the title alone. The brand name 'WorkX' has low standalone recognition outside existing audiences.
  - Fix: Expand the title to 55–60 characters by adding a short descriptor of the event's topic. Format: '[Brand] | [Descriptor] | [City] [Year]' or '[Descriptor] – WorkX Conference San Francisco 2026'.
- [major] The H1 contains only the brand name plus the generic word 'Conference' — no audience signal, no topic keyword, no year or location. It provides no additional keyword surface beyond the title tag and misses the opportunity to reinforce search-intent terms like 'workplace strategy', 'facilities management', or 'corporate real estate'.
  - Fix: Expand the H1 to include the core topic and qualifier, e.g. 'WorkX: The Workplace Strategy & Facilities Conference | San Francisco 2026'. This should mirror the revised title while being allowed to be slightly longer.
- [major] High-intent adjacent queries driving this audience — 'hybrid work conference', 'return to office strategy', 'workplace optimization conference', 'corporate real estate summit' — appear nowhere in the metadata. The body copy addresses these themes (RTO as a financial conversation, utilization targets, portfolio strategy) but none of this surfaces to crawlers via metadata.
  - Fix: Integrate at least two of the following phrases naturally into the revised meta description and/or title: 'hybrid work', 'return-to-office strategy', 'workplace optimization', 'facilities management conference'. Ensure the H1 and first paragraph of body copy also reflect these terms.
- [major] The Event schema uses '@id': 'https://www.iqpc.com#event' while the canonical URL and page URL are on ssonetwork.com. The WebSite schema also points 'url' to iqpc.com. This domain mismatch can confuse Google's entity reconciliation and dilute PageRank signals between the two domains.
  - Fix: Change the Event '@id' to 'https://www.ssonetwork.com/events-workx#event' to match the canonical. Update the WebSite schema 'url' to 'https://www.ssonetwork.com' or add a sameAs linking the two domains explicitly.
- [major] robots_meta is null — no explicit robots directive is set. While this defaults to index/follow, the absence of an explicit tag is a missed hygiene opportunity and could be risky if a staging/preview version of this page exists without a block.
  - Fix: Add <meta name='robots' content='index, follow'> explicitly to the <head>.
- [minor] The OG and Twitter descriptions are identical to the oversized meta description (446 chars). Social platforms truncate at ~200 characters for OG and ~200 for Twitter cards, so the key benefit messaging is cut off on shares.
  - Fix: Write a dedicated OG/Twitter description of ~200 characters that leads with the event name, date, city, and the single most compelling benefit, then ends with a CTA.
- [minor] og:type is set to 'website' rather than 'event'. While the Open Graph protocol does not have a native 'event' type, setting type to 'website' means platforms like Facebook cannot surface date/location rich previews that are available via custom og:event properties.
  - Fix: Consider supplementing with Facebook-specific event meta tags (og:type = 'event.public', event:start_time, event:end_time, event:location) alongside the existing og:type='website' to unlock richer social previews.
- [minor] The meta keywords tag is present but empty (content=''). While major search engines ignore this tag for ranking, an empty tag is dead weight and signals incomplete template hygiene.
  - Fix: Either populate it with 5–8 relevant terms ('workplace conference, facilities management, corporate real estate, return to office, workplace strategy, San Francisco 2026') or remove the tag entirely.

**Improved metadata (ready to apply)**
- Title: WorkX 2026 | Workplace Strategy & Facilities Conference | San Francisco
- Meta description: Join 500+ workplace, facilities, and CRE leaders at WorkX, 10–12 August 2026, San Francisco. Leave with real benchmarks, cost-justification playbooks, and proven strategies to drive performance.

## Accessibility (axe-core, deterministic)
- **[critical]** aria-valid-attr-value: Ensure all ARIA attributes have valid values (3 element(s), e.g. `#tier-6994e6cc50cb2108c7583cfb-tab`)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (12 element(s), e.g. `a[role="button"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (7 element(s), e.g. `#wlxOz > h6`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `a[href$="www.iqpc.com"] > .d-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[serious]** link-name: Ensure links have discernible text (1 element(s), e.g. `a[href$="www.iqpc.com"]`)
- **[serious]** listitem: Ensure <li> elements are used semantically (3 element(s), e.g. `.px-2.nav-link:nth-child(1)`)
- **[moderate]** region: Ensure all page content is contained by landmarks (26 element(s), e.g. `.template-6-header-container`)