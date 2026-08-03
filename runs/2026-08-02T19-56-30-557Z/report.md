# Microsite QA Report
**URL:** https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa
**Date:** 2026-08-02T20:00:39.857Z
**Verdict:** BLOCK — 2 critical/serious accessibility violation(s) (axe-core)
**Weighted score:** 42/100  (Design QA: 52 · Brand Compliance: 20 · SEO Audit: 57)

## Conversion instrumentation (deterministic)
- Analytics detected: GA4 / Google Tag Manager, LinkedIn Insight Tag
- Missing: Meta Pixel
- Registration CTAs found: 3
  - "Request an Invite" → https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa/downloads/request-an-invitation [HTTP 200] 
  - "REQUEST YOUR INVITE" → https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa/downloads/request-an-invitation [HTTP 200] 
  - "REQUEST AN INVITE" → https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa/downloads/request-an-invitation [HTTP 200] 
- UTM propagation: not_tested
- **[major]** MISSING_PIXEL: Meta Pixel not detected — conversions from this page cannot be measured/attributed for that channel.

## Performance
- Skipped via --skip-perf

## Design QA — 52/100
The Corporate Counsel & Compliance Exchange USA microsite covers all required content elements and communicates the event's value proposition clearly, but suffers from meaningful polish gaps across typography, spacing, and brand-config compliance — most notably the use of Raleway instead of the mandated Archivo/Inter pair and blue (#0081ff) as the primary color instead of #0A2540. Several sections on mobile show cramped stacking and illegible small text, and the hero's two competing CTA buttons dilute registration prominence. The page is publishable but would benefit from pre-launch fixes to avoid credibility damage.

**Layout & grid — 4/7**
- [major] Key Themes section, desktop: The four theme cards appear to use unequal column widths at 1440px — the rightmost card ('The Knights: Navigating Complexity') is visibly narrower than the leftmost card, creating a non-uniform grid that looks unintentional.
  - Fix: Ensure all four cards share an equal Bootstrap col-3 (25%) width with consistent gutter. Do not rely on auto-layout flex-shrink to size columns.
- [major] Sponsors logo grid, desktop: The 2026 Sponsors logo row mixes drastically different logo sizes (e.g., 'Ivo' wordmark appears tiny while 'Litera' and 'MITRATECH' are significantly larger), making the row look unfinished rather than curated.
  - Fix: Normalise all sponsor logos to a fixed container height (e.g., 40px) with object-fit: contain so visual weight is uniform across the row.
- [minor] Past Leaders logo grid, desktop: The multi-row past-leader company logo grid has inconsistent horizontal alignment — some rows are left-justified while others appear centred, breaking the sense of a coherent grid.
  - Fix: Apply justify-content: center to the flex/grid container wrapping the logo rows so all rows are centre-aligned consistently.
**Typography — 3/7**
- [critical] Entire page: The page loads 'Raleway' as both primary and secondary font (confirmed in CSS :root variables). The brand config mandates 'Archivo' for headings and 'Inter' for body copy. This is a wholesale brand-config violation affecting every piece of text on the page.
  - Fix: Replace '--primary-font' with Archivo and '--secondary-font' with Inter. Import both from Google Fonts and remove the Raleway import.
- [major] Hero section subheadline, desktop: The tagline 'Checkmate, Chaos — Turning Volatility Into Your Next Strategic Advantage' uses a noticeably different size and weight treatment to the event name above it, but the step between the two is too small — both compete for H1 prominence, flattening the type hierarchy.
  - Fix: Set the event name at 64px (top of the brand scale) and the tagline at 32px to create clear hierarchy. Limit the tagline to font-weight 400 or 500.
- [major] Statistics row (75 / 22 / 194 / 27), desktop and mobile: The large numeral labels (75, 22, etc.) appear in a heavy weight that is visually fine, but their descriptor text beneath is extremely small — estimated at 10–11px — falling below the brand scale minimum of 12px and likely failing legibility on mobile.
  - Fix: Set stat descriptor text to a minimum of 12px (brand scale floor) and 14px on desktop.
- [minor] Speaker cards, desktop: Speaker name and title lines are very close in size and weight, making it hard to distinguish the name from the role/company at a glance.
  - Fix: Differentiate speaker name (16px, font-weight 700) from role/company (14px, font-weight 400, muted color) to restore typographic hierarchy within the card.
**Spacing & rhythm — 4/7**
- [major] Hero section, desktop — between date/location line and CTA buttons: The gap between the date/location text ('July 20–21, 2026 | New York, USA') and the two CTA buttons beneath it appears to be less than 8px, creating a cramped cluster that merges date metadata with the action layer.
  - Fix: Apply a minimum 24px margin-top to the CTA button group below the date line, consistent with the brand spacing scale.
- [major] Sponsorship Opportunities section, desktop: The 'Sponsorship Opportunities' text block and the image beside it have uneven internal padding — the text side has generous left padding while the image bleeds closer to the section edge, creating visual imbalance.
  - Fix: Apply equal horizontal padding (at least 32px) to both the text column and image column inside this section.
- [minor] Footer, desktop: The footer contact block appears to have disproportionately large top padding compared to the bottom padding, creating a vertically unbalanced footer band.
  - Fix: Set symmetric vertical padding of 48px top and 48px bottom on the footer container.
**Visual hierarchy — 4/7**
- [major] Hero section, desktop and mobile: There are two near-equal-weight CTA buttons in the hero: 'Request Your Invite' and 'Explore Our Next-Level Event' / 'Sponsorship Opportunities'. All three appear at similar visual weight, diluting the primary registration CTA. The eye has no clear winner.
  - Fix: Make 'Request Your Invite' the dominant CTA (accent color fill, larger horizontal padding) and demote the sponsorship CTA to a ghost/outline style button so hierarchy is unambiguous.
- [major] Primary color usage, entire page: Buttons and interactive elements use #0081ff (bright blue) as the primary color, conflicting with the brand config's #0A2540 (dark navy) as primary and #FF5A36 (coral-orange) as the accent reserved for CTAs. The accent color is not visibly used for any CTA on the page.
  - Fix: Remap CSS variables: --primary-color to #0A2540 and repaint all CTA buttons with the accent #FF5A36 to match brand config. Reserve navy for backgrounds and section fills.
- [minor] 'What Our Players Say' testimonial section, desktop: The large decorative quotation mark graphic dominates the section visually and draws the eye before the testimonial text, inverting the intended hierarchy (quote text should be primary).
  - Fix: Reduce the decorative quote mark to roughly 60% of its current size and apply 30–40% opacity so it reads as a background element rather than a focal point.
**Consistency — 4/7**
- [major] CTA buttons, multiple sections (hero vs. 'Secure Your Place' banner vs. Sponsors section): Buttons are not styled consistently: the hero buttons appear with a rounded-pill style, the 'Secure Your Place' banner has a flat rectangular CTA, and the Sponsors section uses yet another button style. These look like three different components rather than one design system.
  - Fix: Standardise all primary CTAs to one button spec: border-radius 4px, consistent padding (13px 24px), font-size 14px, font-weight 700, accent fill color.
- [major] Theme cards vs. speaker cards, desktop: Theme cards use image overlays with text on top; speaker cards use circular avatar images with text below on a white background. The corner radius, shadow, and card border treatment differ between these two card types and also differ from the sponsor and resource cards lower on the page — no unified card system is apparent.
  - Fix: Define a two-card-type system: one for people (speaker/avatar cards) and one for content (topic/resource cards), each with a consistent border-radius, shadow, and typography spec, applied without exception.
- [minor] Section heading alignment, desktop: Some section headings are centred ('2026 Expert Speakers Included', 'Key Themes for 2026') while others are left-aligned ('Sponsorship Opportunities', 'Contact Us'). The inconsistency makes the page feel assembled from disconnected templates rather than one design system.
  - Fix: Choose one heading alignment strategy (centred for full-width sections, left-aligned for two-column sections) and apply it consistently.
**Responsive integrity — 4/7**
- [major] Key Themes section, mobile (390px): The four theme cards stack vertically on mobile but each card image appears to be a different height, with text overlaid at varying vertical positions. The overlay text on the first card ('The Leadership Card: The Roundtable') is partially cut off at the top of the card image.
  - Fix: Set a fixed aspect ratio on all theme card images (e.g., 16:9) using aspect-ratio: 16/9 and ensure the text overlay has sufficient bottom padding (at least 16px) so no text is ever cropped.
- [major] Statistics row (75 / 22 / 194 / 27), mobile: On mobile, the four stats appear to collapse into a 2×2 grid, but the label text beneath the numbers truncates with ellipsis or wraps awkwardly mid-phrase ('SENIOR GENERAL COUNSEL & C-SNO…'), reducing comprehension.
  - Fix: Allow stat descriptor text to wrap naturally at a minimum font-size of 12px; remove any white-space:nowrap or overflow:hidden constraints on mobile.
- [major] Past Leaders logo grid, mobile: The multi-row logo grid on mobile shows logos at inconsistent sizes — some are tiny (single-word wordmarks like 'BNY') while others (Amazon, Adobe) appear proportionally much larger, making the grid look broken rather than intentional.
  - Fix: Apply a uniform container height of 32px with object-fit: contain to all logo images in this grid, identical to the desktop treatment recommendation.
- [minor] Navigation bar, mobile: The mobile hamburger menu icon is present, but on the 390px screenshot the IQPC logo and the sign-in link appear very close together with minimal tap target separation, raising usability concerns for touch interaction.
  - Fix: Ensure the hamburger icon touch target is at least 44×44px and the sign-in link has at least 8px separation from the logo.
**Visual accessibility — 3/7**
- [critical] Hero section — text over background image, desktop and mobile: The hero headline and date text sit over a chess-board/conference photograph without a consistent dark scrim. Portions of the white text (particularly the subheadline and date line) overlap lighter areas of the background image, making contrast insufficient. The axe-core report confirms 11 color-contrast failures including primary CTA buttons.
  - Fix: Add a semi-transparent dark overlay (rgba(0,0,0,0.55) minimum) as a pseudo-element over the entire hero background image, and separately verify CTA buttons achieve 4.5:1 contrast against their background.
- [major] Theme cards — text over imagery, desktop and mobile: Each Key Theme card has text overlaid directly on a photograph without a gradient or scrim. On cards with lighter background imagery (e.g., the second card showing a conference room scene), the overlay text appears in white or yellow without sufficient contrast, likely failing WCAG AA at this size.
  - Fix: Apply a linear-gradient overlay from rgba(0,0,0,0) at top to rgba(0,0,0,0.75) at bottom on each theme card image so text at the bottom of each card always has adequate backing.
- [major] CTA buttons (primary), entire page: Per the axe-core report, .btn-primary elements have serious color-contrast failures. Visually, the current bright blue (#0081ff) buttons with white text may meet contrast for large text but the 14px button label weight likely fails at 4.5:1. The brand-correct accent color #FF5A36 on white text will also need verification — orange CTAs require dark text to pass AA.
  - Fix: If using #FF5A36 as CTA background, switch button text to #0A2540 (dark navy) or #1A1A1A rather than white to achieve the required 4.5:1 contrast ratio.
- [minor] Footer, desktop: The footer privacy policy and contact links appear to use the brand link color (#ffd230 yellow) against a dark background. While this may pass contrast, the yellow link color is not part of the brand config's defined palette and creates a discordant tone for the footer.
  - Fix: Use white (#FFFFFF) for footer links on dark backgrounds, matching the brand config reversed-logo guidance for dark surfaces.

## Brand Compliance — 20/100
The microsite is for the Corporate Counsel & Compliance Exchange USA, an IQPC event, but it diverges substantially from the WorkX 2026 brand configuration provided. The CSS reveals the site is running on a completely different design system (primary color #0081ff, secondary #ffd230, font family Raleway) rather than the mandated #0A2540 primary, #FF5A36 accent, and Archivo/Inter typography. Several required elements are present but one legally required element (privacy policy footer link) cannot be confirmed from the visible copy, and the event name/dates in the hero do not match the WorkX 2026 brand config at all.

**Required elements**
- ✓ Event name and dates in the hero — Hero shows 'Corporate Counsel and Compliance Exchange USA' with dates 'July 20–21, 2026 | New York, USA' — however the event name does not match the configured event 'WorkX 2026', suggesting either a misconfigured brand config or wrong template applied.
- ✓ Venue / location — Location 'New York, USA' is visible in the hero date/location line and confirmed in structured data.
- ✓ Primary registration CTA above the fold — A 'Request Your Invite' button is visible in the hero above the fold. A secondary 'Explore Our Next-Gen Brand Event' CTA also appears.
- ✓ IQPC or portal brand logo — IQPC logo is visible in the top-left navigation bar on both desktop and mobile screenshots.
- ✓ Privacy policy link in footer — Footer area at the bottom of the desktop screenshot shows small-text links that appear to include 'Privacy Policy' alongside Cookie Policy and Terms links, consistent with the HTML and visible footer nav.

**Token scan (deterministic)**
- [major] Off-palette color #212121 is used on 370 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #212529 is used on 274 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #222222 is used on 94 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #FFD230 is used on 48 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Raleway, sans-serif" is used on 1067 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Entire page — CSS custom properties / design system: The site is running an entirely different brand system. CSS declares --primary-color: #0081ff, --secondary-color: #ffd230, and --primary-font / --secondary-font: 'Raleway'. The brand config mandates primary #0A2540, accent #FF5A36, headings in Archivo, and body in Inter. This is a wholesale brand mismatch, not a token-level deviation.
  - Fix: Replace the CSS variable declarations with the correct tokens: --primary-color: #0A2540; --accent-color: #FF5A36; --primary-font: 'Archivo', sans-serif; --secondary-font: 'Inter', sans-serif. Remove Raleway from the Google Fonts import and all fallback references.
- [critical] Hero section — event name and brand config alignment: The event promoted is 'Corporate Counsel and Compliance Exchange USA', whereas the brand configuration specifies the event as 'WorkX 2026'. Either the wrong brand config has been applied to this microsite, or the wrong template is being used for the event. This fundamental misalignment means the brand guardrails being enforced do not belong to this event.
  - Fix: Confirm which brand config applies to this microsite. If this is indeed the Corporate Counsel & Compliance Exchange USA event, obtain and apply the correct brand configuration for that IQPC community portal rather than the WorkX 2026 config. If this is a WorkX 2026 page, the hero event name, copy, imagery, and all content must be replaced to reflect WorkX 2026.
- [critical] Hero — primary CTA button: The primary CTA 'Request Your Invite' appears styled with the incorrect #0081ff blue (from the overriding CSS system) rather than the mandated accent color #FF5A36. The accent color is explicitly reserved for CTAs and key highlights. A blue CTA is off-brand and reduces visual hierarchy impact.
  - Fix: Apply background-color: #FF5A36 and color: #FFFFFF to all primary CTA buttons. Ensure hover state darkens the accent (e.g. #E04A2A) rather than switching to an entirely different hue.
- [major] Hero — secondary CTA 'Explore Our Next-Gen Brand Event': The phrase 'Next-Gen' is a vague, unverifiable superlative. The brand tone requires benefit-led, professional copy with no unverifiable superlatives. 'Next-Gen' adds no concrete meaning and violates the tone-of-voice guidelines.
  - Fix: Replace 'Explore Our Next-Gen Brand Event' with specific, benefit-led language, e.g. 'Explore Sponsorship Packages' or 'See What's New for 2026'.
- [major] Meta description and OG description: The meta description opens with 'The Premier Exchange for Legal Leaders' — 'Premier' is an unverifiable superlative that violates the brand tone-of-voice rule against unverifiable superlatives.
  - Fix: Rewrite the meta description opening to a benefit-led statement, e.g. 'An exclusive exchange for senior legal and compliance leaders navigating regulatory complexity and governance challenges in 2026.'
- [major] Hero — logo placement over full-bleed background image: The event logo ('Corporate Counsel and Compliance Exchange USA' circular lockup) appears placed directly over a dark photographic background. The brand config requires either a reversed logo on dark backgrounds or a scrim behind the logo when placed over busy imagery. No visible scrim or sufficient contrast treatment is apparent around the circular logo lockup in the hero.
  - Fix: Add a semi-transparent dark scrim (rgba(10,37,64,0.55) or similar) behind the logo lockup, or use the reversed/white variant of the logo. Ensure minimum clear space equal to the logomark height on all sides is maintained.
- [major] Theme cards section ('Key Themes for 2026 Included') — accent color on decorative card backgrounds: The theme cards appear to use a yellow/gold color (#ffd230, the misapplied secondary-color token) as decorative background fills. The brand config states accent is reserved for CTAs and key highlights only; decorative section backgrounds should use primary (#0A2540) or white (#FFFFFF). Yellow is also entirely absent from the approved palette.
  - Fix: Replace the yellow/gold card background treatment with the primary dark navy (#0A2540) or white, reserving any color accent solely for CTA buttons and highlight labels.
- [minor] Structured data (JSON-LD) — startDate/endDate: The JSON-LD schema declares startDate: '2027-07-20' and endDate: '2027-07-21', but the visible hero copy states 'July 20–21, 2026'. There is a year discrepancy (2026 vs 2027) between the visible page and the machine-readable metadata.
  - Fix: Align the JSON-LD startDate and endDate to match the displayed event year. If the event is 2026, set both to 2026-07-20 and 2026-07-21 respectively.
- [minor] Navigation bar — link color: The CSS sets --link-color: #ffd230 (yellow), which would render nav and inline links in an off-brand yellow that is not part of the approved palette and provides poor contrast on white backgrounds.
  - Fix: Update --link-color to #0A2540 (primary) for standard body links, and use #FF5A36 only for highlighted/CTA-style link treatments, in line with the accent discipline rule.

## SEO Audit — 57/100
The page has a descriptive, keyword-rich title and a content-rich body, but suffers from three serious issues that undermine search performance: the meta description is 703 characters (4–5× the ~155-char limit), making Google rewrite it unpredictably; the H1 is a thematic tagline ('Checkmate, Chaos…') that shares zero keywords with the title or meta description, breaking keyword coherence; and although the deterministic check flagged has_event_schema as false, the rendered HTML actually contains an Event JSON-LD block — however it carries data quality problems (duplicate sponsor entries, a 'test test' performer, missing streetAddress, and the @id pointing to the root domain rather than the event URL) that reduce its trustworthiness. Search-intent alignment is partial: someone Googling 'corporate counsel compliance conference USA 2026' would recognise the title but the H1 would confuse them, and the meta snippet Google shows will be machine-truncated from an overlong blob.

**Structural checks (deterministic)**
- Title: "Corporate Counsel & Compliance Exchange USA" (43 chars)
- Meta description: 703 chars
- Open Graph: ✓ complete enough for share cards
- Canonical: ✓ · Viewport: ✓ · Robots: —
- H1 count: 1 · Image alt coverage: 97% of 115
- Event structured data (JSON-LD): ✗ MISSING — generated below

**Findings**
- [minor] Meta description is 703 chars (will truncate).
  - Fix: Trim to ≤160 characters.
- [major] No schema.org Event structured data (JSON-LD) — the page cannot earn event rich results in Google.
  - Fix: Add Event JSON-LD with name, dates, location, organizer, and offers.
- [critical] Meta description is 703 characters — roughly 4–5× the ~150–160 character limit. Google will truncate or fully rewrite it, losing all intentional keyword and benefit messaging.
  - Fix: Condense to 150–160 characters, leading with the primary keyword phrase, the event format, the audience, and a single compelling benefit. Include the year and 'USA' for geo/temporal intent.
- [critical] H1 reads 'Checkmate, Chaos - Turning Volatility Into Your Next Strategic Advantage' — a marketing tagline with zero keyword overlap with the page title ('Corporate Counsel & Compliance Exchange USA'), meta description, or likely search queries. Google uses H1 as a primary relevance signal; this disconnect actively hurts rankings.
  - Fix: Change the H1 to the event name (or a close variant including 'corporate counsel', 'compliance', 'exchange', and 'USA'). The tagline can be retained as a subheading (H2 or styled paragraph) beneath the H1.
- [major] The JSON-LD @id is set to 'https://www.iqpc.com#event' (root domain) instead of the canonical event URL. This means the structured data entity does not match the canonical page, weakening Google's ability to associate the rich result with this URL.
  - Fix: Set @id to 'https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa#event' to align with the canonical.
- [major] The performer list contains a 'test test' entry — almost certainly a QA/dev artifact. Publishing this will expose the data error to Google and any tool that parses the schema.
  - Fix: Remove the {'@type':'Person','name':'test test','url':''} object from the performer array before publishing.
- [major] Multiple sponsors are duplicated (e.g. Ivo, LexisNexis, Axiom, Novus Law, Mitratech, GC AI, Erskine Law, Checkbox, DocJuris, Eudia, Spellbook each appear twice). Duplicate entries add noise, may confuse parsers, and signal low data quality.
  - Fix: Deduplicate the sponsor array so each organization appears exactly once. If two entries have different URLs for the same name, resolve to the canonical URL.
- [major] The Offer availability value is set to 'https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa/InStock' — a page URL, not a valid schema.org availability URL. The correct value is 'https://schema.org/InStock'.
  - Fix: Change the availability value to 'https://schema.org/InStock'.
- [major] The keywords meta tag contains only 'Submission Form' — a form label, not a keyword set. While Google ignores the keywords meta, Bing considers it and it surfaces in audits as a quality signal. It also reveals internal implementation detail publicly.
  - Fix: Either populate with 3–8 relevant keyphrases (e.g. 'corporate counsel conference, compliance exchange, in-house legal event, legal tech, regulatory strategy, New York 2026') or remove the tag entirely.
- [major] streetAddress and postalCode are empty strings. Schema.org validators will still pass, but rich-result eligibility for event carousels that surface venue details is reduced. Empty string is worse than null/omitted.
  - Fix: Populate streetAddress and postalCode if the venue is confirmed, or remove those properties (omit or set to null) rather than passing empty strings.
- [minor] robots_meta is null — no explicit robots directive is set. While this defaults to index/follow, an explicit tag is best practice for an event microsite to prevent accidental crawl suppression from inherited directives.
  - Fix: Add <meta name='robots' content='index, follow'> to the <head>.
- [minor] The og:image points to a logo PNG on the CDN. Logo images perform poorly as social share previews. A purpose-built 1200×630 event graphic with event name, date, and location converts significantly better when shared on LinkedIn (primary channel for this audience).
  - Fix: Create a 1200×630 px event social card image and update og:image and twitter:image to point to it. Include event name, dates, city, and a strong visual.
- [minor] The WebSite schema block sets 'name' to 'Corporate Counsel & Compliance Exchange USA' but 'url' to 'https://www.iqpc.com' (the root domain). This conflates the event microsite identity with the IQPC root site, which already has its own WebSite schema.
  - Fix: Either remove the WebSite schema block from this page (the Organization schema is sufficient) or update the url to the event's canonical URL and scope the name appropriately.

**Improved metadata (ready to apply)**
- Title: Corporate Counsel & Compliance Exchange USA 2026
- Meta description: Join in-house legal and compliance leaders in New York for case studies, expert panels, and peer exchange on legal tech, regulatory strategy, and outside counsel management.

## Accessibility (axe-core, deterministic)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (11 element(s), e.g. `.aos-animate.btn-primary[role="button"]`)
- **[minor]** empty-heading: Ensure headings have discernible text (4 element(s), e.g. `.home-content-1 > .container[name="Container"][data-nodelete=""] > .row > .column.col-12[name="Column"] > div[data-component="heading"][data-content="true"] > h2[name="H2"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (2 element(s), e.g. `.cta-event-date`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `.d-md-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[moderate]** region: Ensure all page content is contained by landmarks (30 element(s), e.g. `.header-container`)