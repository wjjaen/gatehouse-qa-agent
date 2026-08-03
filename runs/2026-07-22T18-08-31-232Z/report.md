# Microsite QA Report
**URL:** https://www.ssonetwork.com/events-workx
**Date:** 2026-07-22T18:12:00.977Z
**Verdict:** BLOCK — 5 critical/serious accessibility violation(s) (axe-core)
**Weighted score:** 56/100  (Design QA: 58 · Brand Compliance: 49 · SEO Audit: 62)
**vs. previous run (2026-07-22T16:24:59.697Z):** +0 points

## Conversion instrumentation (deterministic)
- Analytics detected: GA4 / Google Tag Manager, LinkedIn Insight Tag
- Missing: Meta Pixel
- Registration CTAs found: 2
  - "Book Online Now" → https://www.ssonetwork.com/events-workx/srspricing [HTTP 200] 
  - "Book Online Now" → https://www.ssonetwork.com/events-workx/srspricing [HTTP 200] 
- UTM propagation: not_tested
- **[major]** MISSING_PIXEL: Meta Pixel not detected — conversions from this page cannot be measured/attributed for that channel.

## Performance
- Skipped via --skip-perf

## Design QA — 58/100
The WorkX 2026 microsite is functionally complete — all required elements are present above the fold and the page communicates the event clearly — but it reads as a platform-template output rather than a polished designer build. The most visible gaps are inconsistent button styling across sections, a cookie-consent banner that obscures the hero on first load, and a mobile layout that stacks content adequately but loses visual hierarchy in the speaker and pricing sections. With targeted polish on typography scale, button consistency, and mobile spacing, this page would be publish-ready.

**Layout & grid — 4/7**
- [major] Hero section, desktop: The hero splits into two asymmetric columns (text left, event photo right) but the text column content — eyebrow, h1, date, location, and three CTA buttons — has inconsistent left-edge alignment. The 'Book Online Now' button is visually disconnected from the other two buttons, sitting on a separate implicit row with no apparent spacing-scale relationship.
  - Fix: Constrain all hero text content to a single left-aligned column within the grid and use a consistent spacing-scale gap (24px or 32px) between the three CTA buttons.
- [major] Statistics bar between hero and 'No Budget, No Excuses' section, desktop: The '100+ attendees, 40 speakers, 30+ sessions, 1 unique networking experience' stat bar appears as a narrow band that is not vertically centered and uses a noticeably different background treatment from any other section. It floats visually between two content blocks without a clear grid anchor.
  - Fix: Give the stat bar a defined minimum height (e.g. 80px), center-align its content vertically, and ensure it spans the full content-width container used by other sections.
- [minor] Pricing section, desktop: The pricing card on the left and the event photo on the right are not vertically aligned at their tops — the photo appears to start lower than the text block, creating an unanchored gap.
  - Fix: Align both columns to align-items: flex-start within the same flex or grid row.
**Typography — 4/7**
- [major] Throughout page, desktop and mobile: The page uses a mix of font families that does not match the brand config. The eyebrow labels (e.g. 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?') appear in a condensed or different sans-serif than the body text, and the hero heading appears to use a bold weight of a different face than Archivo. The brand config specifies Archivo for headings and Inter for body — the HTML imports Advent Pro, Anton, Josefin Sans and many others, indicating font discipline is absent.
  - Fix: Audit all typographic elements and restrict headings to Archivo (with correct weight) and body text to Inter. Remove unused Google Fonts imports.
- [major] Body copy, 'No Budget No Excuses' section and 'What You'll Explore' cards, desktop: Body text in the two-column layout section appears at approximately 13–14px — below the brand scale minimum of 14px and too small for comfortable reading at typical viewing distance on desktop. Line height appears tight (approximately 1.3), compressing dense paragraph blocks.
  - Fix: Set body paragraph font-size to 16px and line-height to 1.6 throughout.
- [minor] Section eyebrow labels throughout page: Eyebrow labels like 'WHO YOU'LL HEAR FROM' and 'WHY ATTEND WORKX?' include decorative horizontal rules inline. These are not in the brand config type scale and their tracking and sizing are inconsistent between sections (some appear larger, some smaller).
  - Fix: Standardize eyebrow labels to font-size: 12px, letter-spacing: 0.1em, and a consistent decorative rule treatment across all instances.
**Spacing & rhythm — 4/7**
- [major] Speakers section, desktop: The gap between speaker photo cards and the speaker name/title/company text beneath them is inconsistent — some speakers appear to have tighter top margins on their name than others, producing an uneven baseline rhythm across the row.
  - Fix: Apply a consistent padding-top of 12px (from the spacing scale) to all speaker name elements beneath their photos.
- [major] Cookie consent banner, desktop and mobile — visible on first load: The dark cookie consent bar renders at the very bottom overlapping the footer, but its positioning and the OK button layout introduce an unexpected padding inconsistency. On the screenshot it appears to partially obscure content.
  - Fix: Ensure the cookie banner is fully sticky to the bottom viewport edge with z-index above content, with symmetric internal padding of 16px vertical.
- [minor] Sponsors section, desktop: Sponsor logos have unequal vertical and horizontal gaps between them — the row of five logos (Bevi, Bubl, DoorDash, Embrava, Envoy) appears to have inconsistent spacing, with some logos appearing closer together than others.
  - Fix: Use a flex container with a fixed gap from the spacing scale (e.g. gap: 32px) and align all logos to the center vertical axis.
**Visual hierarchy — 5/7**
- [major] Hero section, desktop: Three CTA buttons of equal visual weight appear in the hero: 'View Event Guide', 'Sponsorship Opportunities', and 'Book Online Now'. The primary registration CTA ('Book Online Now') is styled with the accent color (#FF5A36) and is above the fold, which is correct, but its size and visual weight are nearly identical to the secondary CTAs. A visitor's eye does not clearly distinguish the primary action.
  - Fix: Make 'Book Online Now' the dominant CTA by increasing its horizontal padding or width, and render the secondary CTAs as outline/ghost buttons so the hierarchy is unambiguous.
- [minor] 'What You'll Explore at WorkX' section, desktop: The four topic cards (Lead Through Financial Correction, Workplace Performance, Make Irreversible Decisions, Influence the C-Suite) have three to four lines of body text each that are nearly the same visual weight as the card titles, making it harder to scan which card is which topic.
  - Fix: Increase the card title font weight to 700 and reduce body text inside the card to 14px to create a clear title-to-description hierarchy.
**Consistency — 3/7**
- [major] CTA buttons — hero vs. mid-page ('View Event Guide', 'View New Rates', 'View All Speakers', 'Book Online Now'): Buttons throughout the page use at least four distinct visual treatments: filled accent, filled dark navy, ghost/outline dark, and a teal/blue color (#5696CB used in the SRS widget CSS) that does not appear in the brand config at all. There is no consistent button component — each section appears to have been styled independently.
  - Fix: Define exactly two button styles (primary: accent fill; secondary: outline dark) and apply them consistently. Remove the #5696CB blue entirely.
- [major] Speaker cards (featured 4) vs. What You'll Explore image cards: Speaker photos use circular or lightly rounded crops, while event/session photos in the 'What You'll Explore' section use square crops with no visible border radius. Image treatment is inconsistent between sections.
  - Fix: Decide on one border-radius value for all non-portrait event images (suggest 8px) and apply it uniformly to the explore section images. Keep speaker photos with their own consistent treatment (either all circular or all 8px radius).
- [minor] Testimonial section, desktop: The TDECU logo appears as a large color image inside the testimonial card while the attendee testimonial text is set in a dark navy card. This is the only section with this card style, making it look disconnected from every other content card on the page.
  - Fix: Style the testimonial card using the same card container pattern (white background, 1px border, 8px radius) used elsewhere, and place the TDECU logo at a consistent smaller size.
**Responsive integrity — 5/7**
- [major] Speaker section, mobile: On mobile, featured speakers stack to a single column but each speaker card occupies very little horizontal space, leaving the speaker name and title text uncomfortably narrow (appears under 200px wide) with awkward line breaks in company names and titles.
  - Fix: On mobile, use a 2-column grid for speaker cards (2 per row) so each card has adequate width for the text content.
- [major] Registration/pricing widget, mobile: The attendee-type tab selector ('Practitioner/CRE/Workplace/Facilities | Designer/Architect/Broker | Vendors') overflows or wraps awkwardly on mobile — the tab labels are long and appear to crowd or truncate at the 390px viewport width.
  - Fix: On mobile, switch the tab row to a vertical stacked list or a select dropdown to prevent overflow.
- [minor] Sponsors section, mobile: The five sponsor logos on mobile appear at varying sizes — some noticeably larger than others — because they are not constrained to a uniform max-height, causing an uneven row.
  - Fix: Set all sponsor logo images to max-height: 40px; width: auto; on mobile.
**Visual accessibility — 3/7**
- [critical] Hero section — text over imagery, desktop and mobile: The hero text (event name, date, location) appears over or adjacent to a conference photo with no scrim or overlay. On mobile the background imagery bleeds behind text without a sufficient dark overlay, making white or dark text potentially unreadable depending on the image region behind it. The axe-core audit confirms 12 color-contrast failures across the page.
  - Fix: Add a semi-transparent overlay (e.g. rgba(10, 37, 64, 0.55)) on the hero image behind all text, or place all text on a solid-color panel with sufficient contrast.
- [major] Secondary CTAs and nav links, desktop: Multiple links styled as buttons or inline text use mid-gray or muted colors that the axe-core audit flags as failing WCAG AA contrast (12 affected nodes). Visually, the 'Sponsorship Opportunities' and 'View Event Guide' ghost buttons appear in a muted teal/navy that against a white background may not reach 4.5:1.
  - Fix: Ensure all text elements and button labels meet 4.5:1 contrast against their background. Replace any mid-gray or muted-teal text buttons with #0A2540 (brand primary) text to guarantee compliance.
- [major] IQPC logo in footer, desktop: The IQPC logo in the footer links to iqpc.com but has no alt text (confirmed by axe-core: image-alt critical, link-name serious). This means the logo image and its link are completely invisible to screen reader users.
  - Fix: Add descriptive alt text to the IQPC logo image and an aria-label to its wrapping anchor.
- [minor] Attendee-type tab selector in registration widget: The tab buttons use aria-selected or active states that axe-core flags as having invalid ARIA attribute values (aria-valid-attr-value, 3 nodes). Visually, the active tab is indicated only by a text-decoration underline and border change — low-visibility for users with contrast sensitivities.
  - Fix: Fix ARIA attribute values on tab buttons and add a visible color fill (e.g. #0A2540 background with white text) on the active tab so the selected state is unambiguous visually.

## Brand Compliance — 49/100
The WorkX 2026 microsite satisfies most required elements and maintains a generally professional tone. However, the accent color (#FF5A36) is deployed beyond CTAs and highlights into decorative dividers and section labels throughout the page, diluting its reserved-CTA function. A privacy policy link is not visibly present in the footer from either screenshot, which is a legally required element under the brand config. Missing required elements: Privacy policy link in footer.

**Required elements**
- ✓ Event name and dates in the hero — Hero clearly shows 'WorkX Conference' and 'August 10–12, 2026' in the desktop and mobile hero sections.
- ✓ Venue / location — 'San Francisco, CA' is visible in the hero on both desktop and mobile.
- ✓ Primary registration CTA above the fold — 'Book Online Now' button is present in the hero navigation bar area on desktop; 'Sponsorship Opportunities' and a registration CTA are visible above the fold on mobile as well.
- ✓ IQPC or portal brand logo — SSON logo appears in the top-left of the navigation on both desktop and mobile. IQPC copyright mark is visible in the footer ('©2026 IQPC. All rights reserved.').
- ✗ MISSING Privacy policy link in footer — Neither desktop nor mobile screenshot shows a visible privacy policy link in the footer. The footer contains contact information and partner branding but no privacy policy or cookie policy hyperlink is discernible. A cookie consent banner references a Cookie Policy but that is not a substitute for a persistent footer link.

**Token scan (deterministic)**
- [major] Off-palette color #212529 is used on 448 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #590167 is used on 150 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #0C2341 is used on 31 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #191E52 is used on 29 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #006496 is used on 25 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Roboto, sans-serif" is used on 947 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Footer (both desktop and mobile): Privacy policy link is absent from the footer. A cookie-consent banner references a Cookie Policy inline, but no persistent, accessible footer link to a privacy policy is present. This is both a brand-config required element and a legal/regulatory obligation (GDPR, CCPA).
  - Fix: Add a clearly labelled 'Privacy Policy' hyperlink to the footer, alongside any existing legal links. It should be present on every page load, not only within a dismissible cookie banner.
- [major] Section dividers and labels throughout the page (e.g., 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?', 'NEW PRICING AVAILABLE', 'INSIGHTS FROM YOUR PEERS', 'PARTNERING FOR TOMORROW'): The accent color (#FF5A36) is used for decorative horizontal rule dividers flanking every section label across the full page. The brand config explicitly states accent is reserved for CTAs and key highlights only. This widespread decorative use saturates the accent and undermines its ability to draw attention to actual CTAs.
  - Fix: Replace the accent-colored decorative dividers flanking section labels with the primary color (#0A2540) or a neutral rule. Reserve #FF5A36 exclusively for CTA buttons and genuinely critical highlight text.
- [major] Hero section — 'Book Online Now' CTA button (desktop nav bar): The primary registration CTA button in the top navigation appears styled with a muted/light fill rather than the brand accent #FF5A36 at the viewport scale shown. On mobile the hero CTA buttons ('View Event Guide', 'Sponsorship Opportunities') are rendered in the primary dark color without accent differentiation, making the single most important CTA — registration — visually indistinct from secondary actions.
  - Fix: Ensure the primary registration CTA ('Book Online Now') uses the accent color #FF5A36 as its background fill on all viewports, with white label text. Secondary CTAs such as 'View Event Guide' and 'Sponsorship Opportunities' should use an outlined or primary-color style to maintain visual hierarchy.
- [major] Testimonial / social proof section — TDECU logo treatment: The TDECU 'YOUR CREDIT UNION' logo is rendered in large red brand colors inside a white card that also sits within the SSON-branded page. A third-party brand mark rendered at this scale and prominence without a scrim or size constraint risks appearing as an endorsement or co-branding rather than an attendee quote attribution. Per logo usage rules, third-party logos placed over or beside brand content should not visually compete with the portal brand mark.
  - Fix: Reduce the TDECU logo to a small attribution size (approximately the same height as the speaker title text) and render it in grayscale or constrained to a small badge, consistent with standard testimonial attribution treatment.
- [minor] Hero headline / subheadline copy: The kicker line 'NO BUDGET, NO EXCUSES: HOW THE OFFICE STILL DELIVERS' uses a confrontational, provocative framing that borders on an unverifiable superlative claim ('still delivers' without qualification). While energetic, it risks alienating senior CRE/Facilities decision-makers who are the stated audience, and is more tabloid in register than the 'professional, benefit-led' tone the brand config requires.
  - Fix: Soften the kicker to remain energetic but benefit-led, e.g., 'CONSTRAINED BUDGETS. HIGHER EXPECTATIONS. HERE'S HOW LEADERS RESPOND.' This retains urgency without the adversarial register.
- [minor] Pricing section headline: The label 'NEW PRICING AVAILABLE' used as a section kicker above 'Reimagined Passes Starting at $799' is vague and does not communicate a clear attendee benefit. 'New pricing' alone implies instability or previous higher pricing without context, which may cause hesitation rather than conversion.
  - Fix: Replace with a benefit-framing kicker such as 'FLEXIBLE PASS OPTIONS' or 'ACCESS BUILT FOR PRACTITIONERS', which aligns with the benefit-led tone requirement.
- [minor] Mobile hero — logo clear space: On the mobile viewport, the SSON wordmark in the top navigation appears to have minimal padding between itself and the adjacent WorkX event logo/wordmark to its right, potentially falling below the required clear space of one logomark-height on all sides.
  - Fix: Increase the margin-right on the SSON logo container in the mobile navigation to at least the full height of the SSON logomark, ensuring the minimum clear space rule is met.

## SEO Audit — 62/100
WorkX 2026 has a solid structural foundation — Event JSON-LD is already present and reasonably complete, image alt coverage is strong, and the meta description conveys genuine value. However, the page title and H1 underperform on search-intent alignment: they omit the event's core topic keywords (workplace strategy, facilities management, corporate real estate) that practitioners would actually search, the meta description is nearly 3× the recommended length and will be truncated arbitrarily by Google, and keyword coherence between the H1 ('WorkX Conference') and the title/metadata is loose. The missing robots meta tag is a minor risk, and the has_event_schema flag appears to have been evaluated before the rendered JSON-LD was parsed — schema is actually present in the HTML.

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
- [critical] Meta description is 446 characters — nearly 3× the 150–160 character recommended limit. Google will truncate at ~155 characters, cutting off mid-sentence and likely dropping the most compelling benefit copy entirely.
  - Fix: Condense to a single punchy sentence (150–160 chars) that leads with the primary audience benefit and includes core keywords: workplace strategy, facilities management, corporate real estate, San Francisco, August 2026.
- [critical] 'WorkX August 2026 | San Francisco' contains no topic keywords. A facilities or workplace leader searching 'workplace strategy conference 2026 San Francisco' or 'corporate real estate conference 2026' will not see relevance signals in the title. The brand name 'WorkX' alone carries no organic keyword weight for uninitiated searchers.
  - Fix: Rewrite the title to lead with the primary topic keywords before the brand, staying within 60 characters. Format: '[Topic] Conference 2026 | WorkX | San Francisco'.
- [major] H1 reads 'WorkX Conference' — 15 characters with zero topic or audience signal. It does not match any plausible search query a target attendee (CRE, Facilities, or Workplace leader) would type, weakening keyword coherence between the heading and metadata.
  - Fix: Expand the H1 to describe what the event is about and who it is for, e.g. 'WorkX: The Workplace Strategy & Facilities Conference' or 'Workplace Strategy Conference for CRE & Facilities Leaders'.
- [major] og:description and twitter:description mirror the full 446-character meta description verbatim. Social platforms truncate at ~200 characters (LinkedIn) and ~200 characters (Twitter/X), so the share card will be cut mid-sentence. og:image points to a logo PNG — a logo-only share image performs significantly worse than an event-branded visual.
  - Fix: Write a dedicated og:description of ≤200 characters with a clear hook. Replace or supplement the og:image with a properly sized event hero image (1200×630 px) rather than a logo.
- [major] The title uses 'San Francisco' and date; the H1 uses only the brand name; the meta description uses 'workplace, facilities, and corporate real estate' but not in the title or H1. There is no consistent primary keyword phrase threading through all four layers, which weakens topical relevance signals to crawlers.
  - Fix: Align on a single primary keyword phrase — recommended: 'workplace strategy conference' — and ensure it appears in the title, H1, meta description, and prominently in the first 100 words of body copy.
- [minor] robots meta tag is null — no explicit indexing directive is set. While Googlebot defaults to index/follow, the absence is a missed opportunity to signal intent and could cause issues if a staging version of the page is ever mistakenly crawled.
  - Fix: Add <meta name='robots' content='index, follow'> to the <head>.
- [minor] The keywords meta tag is present but empty. While Google ignores this tag, Bing and other secondary engines still reference it. More importantly, the empty tag is a signal that keyword strategy has not been applied at the metadata level.
  - Fix: Populate with 6–10 relevant keywords: workplace strategy conference, facilities management conference, corporate real estate summit, workplace conference 2026, San Francisco workplace event, WorkX 2026, CRE conference, employee experience conference.
- [minor] The venue street address fields are empty strings in the Event schema. Without a full address, Google cannot generate rich results with map/venue details in SERPs, which are particularly valuable for in-person event discovery.
  - Fix: Add the full venue street address to the JSON-LD location.address object once the venue is confirmed. Do not populate with placeholder data.
- [minor] The Event @id is set to 'https://www.iqpc.com#event' while the page canonical is on ssonetwork.com. The WebSite schema also points to iqpc.com rather than ssonetwork.com. These cross-domain @id mismatches can confuse the knowledge graph and misattribute entity authority.
  - Fix: Set the Event @id to 'https://www.ssonetwork.com/events-workx#event' to match the canonical URL domain.

**Improved metadata (ready to apply)**
- Title: Workplace Strategy Conference 2026 | WorkX | San Francisco
- Meta description: WorkX 2026 brings CRE, Facilities & Workplace leaders together in San Francisco, Aug 10–12, for peer-tested strategies, benchmarks & cost-justification tools.

## Accessibility (axe-core, deterministic)
- **[critical]** aria-valid-attr-value: Ensure all ARIA attributes have valid values (3 element(s), e.g. `#tier-6994e6cc50cb2108c7583cfb-tab`)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (12 element(s), e.g. `a[role="button"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (7 element(s), e.g. `#wlxOz > h6`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `a[href$="www.iqpc.com"] > .d-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[serious]** link-name: Ensure links have discernible text (1 element(s), e.g. `a[href$="www.iqpc.com"]`)
- **[serious]** listitem: Ensure <li> elements are used semantically (3 element(s), e.g. `.px-2.nav-link:nth-child(1)`)
- **[moderate]** region: Ensure all page content is contained by landmarks (26 element(s), e.g. `.template-6-header-container`)