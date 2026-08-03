# Microsite QA Report
**URL:** https://www.ssonetwork.com/events-workx
**Date:** 2026-07-22T16:13:27.118Z
**Verdict:** BLOCK — 1 critical conversion issue(s): NO_REGISTRATION_CTA
**Weighted score:** 54/100  (Design QA: err · Brand Compliance: 48 · SEO Audit: 62)
**vs. previous run (2026-07-22T16:07:45.147Z):** -17 points — ⚠ REGRESSION

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




## Brand Compliance — 48/100
The WorkX 2026 microsite satisfies most required-elements checks and maintains a generally professional, benefit-led tone. However, the accent color (#FF5A36 / orange-red) is applied well beyond CTAs and highlights — it bleeds into section-label dividers, link text, and decorative ruled lines throughout the page. Additionally, no privacy policy link is visibly present in the footer, which is a legally required element. A third-party testimonial logo (TDECU) dominates the social-proof section in a way that competes with the portal brand identity. Missing required elements: Privacy policy link in footer.

**Required elements**
- ✓ Event name and dates in the hero — Hero displays 'WorkX Conference' and 'August 10–12, 2026' clearly above the fold on both desktop and mobile.
- ✓ Venue / location — 'San Francisco, CA' is present in the hero on both breakpoints.
- ✓ Primary registration CTA above the fold — 'Book Online Now' button is visible in the hero on desktop; on mobile only 'View Event Guide' and 'Sponsorship Opportunities' are immediately visible above fold — 'Book Online Now' appears to be clipped or deprioritized. Minor concern on mobile.
- ✓ IQPC or portal brand logo — SSON logo appears in the top navigation bar on both desktop and mobile; IQPC copyright mark appears in the footer.
- ✗ MISSING Privacy policy link in footer — The footer contains contact information and copyright ('©2026 IQPC. All rights reserved.') but no visible privacy policy link can be confirmed in either screenshot or the provided HTML excerpt. This is a legally required element and is missing.

**Token scan (deterministic)**
- [major] Off-palette color #212529 is used on 446 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #590167 is used on 150 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #0C2341 is used on 31 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #191E52 is used on 29 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #006496 is used on 25 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Roboto, sans-serif" is used on 945 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Footer: Privacy policy link is absent from the footer. This is a legally required element per the brand configuration and a regulatory obligation (GDPR/CCPA given the cookie consent banner present on the page).
  - Fix: Add a clearly labeled 'Privacy Policy' hyperlink in the footer, adjacent to the copyright line, linking to the IQPC/SSON privacy policy URL.
- [major] Section divider labels throughout the page (e.g., 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?', 'INSIGHTS FROM YOUR PEERS', 'PARTNERING FOR TOMORROW', 'NEW PRICING AVAILABLE'): The accent color (#FF5A36) is used for decorative horizontal rules flanking section labels on every content section. The brand config states accent is reserved for CTAs and key highlights only. Widespread decorative use dilutes the accent's signaling power and violates the reservation rule.
  - Fix: Replace accent-colored decorative divider lines with the primary color (#0A2540) or a neutral gray. Reserve the accent exclusively for CTA buttons and genuinely critical highlight callouts (e.g., pricing badge).
- [major] Mobile hero — primary registration CTA: On the 390px mobile viewport, the 'Book Online Now' (primary registration) CTA is not visible above the fold. Only secondary CTAs ('View Event Guide', 'Sponsorship Opportunities') are shown. The brand configuration requires the primary registration CTA above the fold.
  - Fix: Reorder the mobile hero CTA buttons so 'Book Online Now' (accent-styled primary button) appears first, before secondary links, and ensure it renders within the initial viewport without scrolling.
- [major] Testimonials / 'Hear from Past Attendees' section: The TDECU logo ('TDECU YOUR CREDIT UNION') is rendered at a very large size — significantly larger than the SSON/IQPC portal logo anywhere on the page — and appears in high-contrast red against a white card. A third-party sponsor/attendee brand is visually dominating over the event's own brand identity.
  - Fix: Constrain the third-party testimonial logo to a maximum height of 40px and desaturate or apply a neutral treatment if the logo color conflicts with brand hierarchy. Ensure the portal logo (SSON) is at least as prominent as any third-party logo on the page.
- [minor] Hero — event subtitle/tagline: The tagline 'NO BUDGET, NO EXCUSES: HOW THE OFFICE STILL DELIVERS' uses all-caps formatting that borders on exclamatory and declarative framing inconsistent with the 'professional, energetic, benefit-led' tone. While no literal exclamation marks are stacked, the confrontational negation ('NO BUDGET, NO EXCUSES') is close to unverifiable superlative territory.
  - Fix: Soften to a benefit-led frame, e.g., 'Delivering Office Value Under Financial Pressure' or 'Making the Office Work — Even Without a Budget Safety Net'. This preserves the energetic tone while leading with benefit rather than negation.
- [minor] Pricing section — 'NEW PRICING AVAILABLE' label and 'Reimagined Passes Starting at $799' heading: The phrase 'Reimagined Passes' is vague marketing language that does not clearly communicate what changed or what the attendee gains. 'Reimagined' functions as an unverifiable superlative adjective with no substantive claim behind it in the visible copy.
  - Fix: Replace 'Reimagined Passes' with specific, verifiable copy such as 'Updated Pass Options' or 'New Tiered Passes' and follow with a concrete benefit statement (e.g., 'including full-day workshop access').
- [minor] Sponsors section — sponsor logo grid: Sponsor logos (Bevi, Bubl, DoorDash, Embrava, Envoy) appear to be rendered at inconsistent sizes and with their original brand colors directly on the white background, with no visual normalization. While not a critical issue, it creates a cluttered visual impression that undermines the clean, professional brand aesthetic.
  - Fix: Apply a consistent max-height (e.g., 36px) and optional grayscale filter to all sponsor logos in the grid to create visual consistency and subordinate third-party brands to the event brand.

## SEO Audit — 62/100
WorkX 2026 has a solid structural foundation — Event schema is already present in the page (contradicting the deterministic flag), dates and location are declared, and speaker/sponsor data is rich. However, the title tag wastes its 33-character budget on vague branding with no primary keyword, the meta description wildly exceeds the 160-character limit at 446 characters (guaranteeing Google rewrites it), the H1 is a bare brand name with zero keyword signal, and the robots meta is null which, while not harmful, leaves indexing intent ambiguous. Keyword coherence between the headline, copy, and metadata is weak: terms like 'workplace conference', 'facilities management', 'corporate real estate conference', and 'hybrid work' appear in body copy but are absent from the title and H1.

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
- [critical] Meta description is 446 characters — nearly 3× the ~155-character threshold. Google will truncate or rewrite it entirely, losing controlled messaging in SERPs.
  - Fix: Condense to 150–160 characters, leading with the highest-value keyword phrase ('workplace conference San Francisco 2026') and a clear benefit hook. Save the extended copy for the page body.
- [critical] Title 'WorkX August 2026 | San Francisco' contains no descriptive keyword. A user searching 'workplace conference San Francisco 2026' or 'facilities management conference 2026' would not recognise this result as relevant.
  - Fix: Prepend a primary keyword phrase before the brand name, e.g. 'Workplace & Facilities Conference | WorkX 2026 – San Francisco'. Keep under 60 characters.
- [critical] H1 reads 'WorkX Conference' — a pure brand label with no keyword signal. It neither reinforces the title/meta keywords nor tells a first-time visitor what the event covers.
  - Fix: Expand to something like 'WorkX 2026: Workplace, Facilities & Corporate Real Estate Conference' to surface the three core topic pillars in the page's most authoritative on-page signal.
- [major] The Place schema has empty streetAddress and postalCode fields. While San Francisco, CA is present, the incomplete address reduces confidence scoring for rich-result eligibility.
  - Fix: Populate streetAddress and postalCode once the venue is confirmed, or remove the empty fields rather than passing empty strings, which can trigger validation warnings in Google's Rich Results Test.
- [major] 'validFrom' is set to '2026-08-10', which is the event start date — not when registration opens. This signals to Google that offers are not yet valid until the event itself begins, which may suppress early rich-result display.
  - Fix: Set validFrom to the date registration opened (or today's date if unknown), not the event start date.
- [major] The keywords meta tag is present but completely empty (content=""). While Google ignores keywords meta for ranking, Bing still reads it, and leaving it blank is a missed low-effort signal opportunity.
  - Fix: Populate with 8–10 comma-separated phrases: 'workplace conference 2026, facilities management conference, corporate real estate conference, hybrid work strategy, San Francisco conference 2026, CRE conference, workplace strategy, IWMS conference'.
- [major] robots_meta is null — no explicit robots directive is set. While Googlebot defaults to index/follow, the absence of an explicit tag is an oversight for a tracked event microsite.
  - Fix: Add <meta name='robots' content='index, follow'> to assert intent and prevent accidental suppression if a CMS default ever changes.
- [minor] The og:image points to a logo PNG (approx. logo dimensions), not a 1200×630 social-share image. LinkedIn and Facebook will render a small, uncropped logo card, reducing click-through from social shares.
  - Fix: Create a branded 1200×630 event hero image featuring event name, dates, and city and replace the og:image URL with it.
- [minor] Several speaker names appear 2–3 times in the 'performer' array (e.g., 'Dalton Viggers' ×3, 'Lily Yuan' ×2, 'Gerard Visser' ×2). Duplicate structured data entries may cause validation warnings.
  - Fix: Deduplicate the performer array so each person appears only once.
- [minor] The Event @id is 'https://www.iqpc.com#event' but the canonical URL is 'https://www.ssonetwork.com/events-workx'. The @id should match the canonical page URL to avoid entity disambiguation issues.
  - Fix: Change @id to 'https://www.ssonetwork.com/events-workx#event'.

**Improved metadata (ready to apply)**
- Title: Workplace & Facilities Conference | WorkX 2026 San Francisco
- Meta description: WorkX 2026 | Aug 10–12, San Francisco. Peer-led strategies, real benchmarks, and cost-justification playbooks for CRE, Facilities & Workplace leaders. Register now.

## Accessibility (axe-core, deterministic)
- **[critical]** aria-valid-attr-value: Ensure all ARIA attributes have valid values (3 element(s), e.g. `#tier-6994e6cc50cb2108c7583cfb-tab`)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (12 element(s), e.g. `a[role="button"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (7 element(s), e.g. `#wlxOz > h6`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `a[href$="www.iqpc.com"] > .d-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[serious]** link-name: Ensure links have discernible text (1 element(s), e.g. `a[href$="www.iqpc.com"]`)
- **[serious]** listitem: Ensure <li> elements are used semantically (3 element(s), e.g. `.px-2.nav-link:nth-child(1)`)
- **[moderate]** region: Ensure all page content is contained by landmarks (26 element(s), e.g. `.template-6-header-container`)