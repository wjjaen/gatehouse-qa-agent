# Microsite QA Report
**URL:** https://www.idga.org/events-veteransaffairshealthcare
**Date:** 2026-07-22T17:20:30.670Z
**Verdict:** BLOCK — 1 critical conversion issue(s): DEAD_CTA
**Weighted score:** 34/100  (Design QA: 42 · Brand Compliance: 9 · SEO Audit: 55)

## Conversion instrumentation (deterministic)
- Analytics detected: GA4 / Google Tag Manager, LinkedIn Insight Tag
- Missing: Meta Pixel
- Registration CTAs found: 4
  - "Register" → # ✗ BROKEN
  - "Book Online Now" → https://www.idga.org/events-veteransaffairshealthcare/srspricing [HTTP 200] 
  - "2026 Registration" → https://www.idga.org/events-veteransaffairshealthcare/srspricing [HTTP 200] 
  - "Register Now" → https://www.idga.org/events-veteransaffairshealthcare/srspricing [HTTP 200] 
- UTM propagation: not_tested
- **[major]** MISSING_PIXEL: Meta Pixel not detected — conversions from this page cannot be measured/attributed for that channel.
- **[critical]** DEAD_CTA: CTA "Register" has no destination (href="#").

## Performance
- Skipped via --skip-perf

## Design QA — 42/100
The Veterans Healthcare 2026 microsite is a content-rich, functionally complete event page but reads as a platform-generated template with limited design intentionality. Brand configuration mismatches (wrong font families, wrong accent color, no privacy policy link visible), a dead registration CTA, and a heavily degraded mobile experience combine to make this page not publish-ready without remediation. Several structural and typographic decisions would embarrass a professional brand if left unaddressed.

**Layout & grid — 3/7**
- [major] Hero section, desktop: The hero splits into a left text column and a right promotional banner image, but the two halves are not vertically aligned at the same baseline. The CTA button group ('2026 Agenda', 'GET YOUR COMPLIMENTARY COPY') sits outside the primary event name/date block, creating an unanchored cluster with no clear grid relationship to the heading above it.
  - Fix: Constrain the hero to a clear two-column grid (e.g., 7/5 split) with text block, date/location, and CTA all within the left column, flush to the same left edge. Remove the secondary content-download CTA from the hero area entirely.
- [major] Speaker roster section, desktop: The second row of speaker cards (row of 5) does not align to the same column grid as the first row (row of 4). Card widths appear inconsistent, causing uneven right-edge alignment and an orphaned card at the end of the second row that is narrower than its siblings.
  - Fix: Standardize speaker cards to a 4-per-row Bootstrap grid (col-md-3) across all rows, or 5-per-row (col-md-2-4) consistently. Never mix column counts between rows of the same component.
- [minor] Sponsorship section, desktop: The sponsorship copy block and the accompanying event photo are vertically misaligned — the image top sits roughly 24px lower than the text block top, breaking the expected two-column symmetry.
  - Fix: Add align-items: flex-start (or center) to the parent flex container to enforce consistent vertical alignment between the two columns.
**Typography — 2/7**
- [critical] Global / all sections: The brand configuration mandates 'Archivo' for headings and 'Inter' for body text. The rendered CSS declares '--primary-font: Nunito Sans' and '--secondary-font: Nunito Sans' for both roles. No Archivo or Inter is loaded. This is a full brand typography non-compliance.
  - Fix: Replace the Google Fonts import with Archivo (headings) and Inter (body). Update CSS variables: --primary-font: 'Archivo', sans-serif; --secondary-font: 'Inter', sans-serif; and apply them to heading and body selectors respectively.
- [major] Body copy sections (intro paragraph, speaker bios), desktop: Body text runs full-width across the content area at desktop, visually spanning approximately 110–120 characters per line, well beyond the 45–90 character maximum for comfortable reading.
  - Fix: Constrain body text columns to max-width: 720px or use Bootstrap's col-10 / col-8 offset grid to cap line length.
- [major] Multiple sections (speaker section heading, CTA banner, sponsor section heading): Heading sizes appear to use at least 6–7 arbitrary sizes (visible in the screenshot as very large hero title, medium section headings, small speaker-name text, tiny caption text, etc.) that do not correspond to the defined type scale of [12, 14, 16, 20, 24, 32, 48, 64]px. Several intermediate heading sizes appear to fall between scale steps.
  - Fix: Audit all heading and label elements and map each to the nearest defined scale value. Eliminate any font-size not in the scale.
**Spacing & rhythm — 3/7**
- [major] Intro text block below hero, desktop: The long introductory editorial section (three dense paragraphs about VA healthcare) has no visible top margin separating it from the email capture bar above it, and the paragraph spacing within it is less than 8px — well below comfortable reading rhythm.
  - Fix: Apply margin-top: 48px to the editorial section container. Set p + p margin-top to at least 16px.
- [major] Speaker section and CTA banner, desktop: The green 'Secure your pass before places run out' CTA banner immediately abuts the speaker cards below it with no section break — there is no vertical breathing room between the last speaker card row and the banner top edge.
  - Fix: Add padding-top: 64px and padding-bottom: 64px to the CTA banner section, and margin-top: 48px above the banner container.
- [minor] 2026 Event Sponsors section, desktop: Sponsor logos are packed with uneven horizontal gaps — some logo pairs appear separated by ~8px and others by ~32px, breaking the expected uniform grid rhythm.
  - Fix: Use a CSS flexbox container with justify-content: center and a consistent gap: 32px to normalize spacing between all sponsor logos.
**Visual hierarchy — 3/7**
- [critical] Hero section, desktop and mobile: The primary registration CTA button in the navigation bar links to href='#' (confirmed by conversion instrumentation — dead CTA). Visitors clicking 'Register Now' in the sticky nav go nowhere. This is the most prominent interactive element on the page and it is non-functional.
  - Fix: Replace href='#' on all Register/Register Now buttons with the actual registration URL (e.g., /events-veteransaffairshealthcare/srspricing or the external registration system URL).
- [major] Hero section, desktop: Visual hierarchy in the hero is diluted by the presence of three competing CTAs at the same visual weight: 'Register Now' (nav), '2026 Agenda', and 'GET YOUR COMPLIMENTARY COPY'. No single button reads as the primary action. The green '2026 Agenda' button and 'GET YOUR COMPLIMENTARY COPY' button are the same size and color as the register button.
  - Fix: Apply the accent color (#FF5A36) exclusively to the 'Register Now' CTA. Demote agenda and download buttons to outlined/ghost style in a secondary color.
- [major] Below-the-fold content sections, desktop: Five different section types (speaker roster, knowledge download tiles, event guide promo, photo gallery, sponsorship) follow each other with nearly identical visual treatment — same background color, same heading size, same card style — making it impossible to scan and prioritize the page. There is no secondary hierarchy guiding the eye after the hero.
  - Fix: Alternate section backgrounds (white / light grey #F5F5F5) and reserve the dark (#0A2540) background for the highest-priority secondary CTA (e.g., the registration urgency banner). This creates visual cadence and reduces flatness.
**Consistency — 3/7**
- [critical] Global — accent color usage: The brand config specifies accent #FF5A36 reserved for CTAs and key highlights only. The site uses green (#489945 per CSS variables) as the primary action color throughout — buttons, links, section accents, and the CTA banner are all green. Orange (#FF5A36) appears nowhere. This is a complete color system violation.
  - Fix: Replace all instances of #489945 (and its hover variant #1c511b) used on CTAs, links, and highlight elements with #FF5A36 (accent) or #0A2540 (primary), following the brand config. Confirm with the event owner whether green is a deliberate IDGA/Veterans Healthcare brand extension — if so, update the brand config; if not, switch to spec.
- [major] Speaker cards, desktop: Speaker headshots use circular crops for the top row and appear to use a different (larger, non-circular or inconsistently sized) treatment for the second row, breaking card uniformity. Some speaker names appear in bold, others in regular weight.
  - Fix: Standardize all speaker headshots to the same circular crop, fixed pixel dimensions (e.g., 120×120px), and enforce a single name style (Archivo Semi-Bold, 16px) across every card.
- [major] CTA buttons across page: At least three different button styles appear across the page: the green rounded nav button ('Register Now'), a green flat button in the speaker section ('View More Speakers'), a darker green flat button in the CTA banner ('Register Here'), and a teal-outlined button in the event guide section. These look like four separate components rather than one consistent button system.
  - Fix: Define a single button component with two variants only: primary (filled, accent color) and secondary (outlined, primary color). Apply these consistently and remove all one-off button styles.
- [minor] Knowledge download tile section, desktop: The four download tiles use different image aspect ratios — two appear roughly 4:3 and two appear 3:2 — causing uneven card heights within the same row.
  - Fix: Enforce a fixed aspect ratio on all tile images using aspect-ratio: 4/3 and object-fit: cover.
**Responsive integrity — 3/7**
- [critical] Hero section, mobile (390px): On mobile, the hero text ('VeteransH…') is visibly truncated — the event name clips at the right edge of the viewport. The full event name 'Veterans Healthcare 2026' is not readable on a narrow screen.
  - Fix: Set the hero heading to word-wrap: break-word; overflow-wrap: break-word; and reduce font-size to at most 32px on mobile via a media query.
- [major] Sponsor logo section, mobile: On mobile, sponsor logos appear in a single-column stack with very large sizes, and only 2–3 logos are visible before requiring significant scrolling. Two logos (Pfizer, 91LOVELL) appear at different sizes, suggesting absent responsive scaling.
  - Fix: Switch sponsor logos to a 3-column flexbox grid on mobile (3 per row) with consistent max-height: 48px per logo.
- [major] Testimonials section, mobile: On mobile, the testimonials section renders as a horizontal row of four quote blocks that appears to require horizontal scrolling rather than stacking vertically. The text in each block is extremely small and likely below 12px legibility threshold.
  - Fix: Convert the testimonials to a single-column vertical stack on mobile. Each testimonial card should be full-width with font-size: 14px minimum.
- [major] Knowledge download tiles, mobile: The four download tile images stack vertically on mobile but the tile text labels appear to be cut off at the right edge, suggesting horizontal overflow from a fixed pixel width on the text container.
  - Fix: Ensure text containers inside tiles use width: 100% or max-width: 100% and remove any fixed pixel widths.
**Visual accessibility — 3/7**
- [major] Hero section — event name text over background image, desktop: The event name and subtitle text appear over a photographic background without a scrim or overlay, making contrast unpredictable. Portions of the white text sit over light-coloured image areas, likely failing WCAG AA 4.5:1 for normal text. (Automated check confirms 34 color-contrast failures site-wide.)
  - Fix: Add a semi-transparent dark overlay (rgba(10, 37, 64, 0.6)) behind the hero text column, or place text over the solid #0A2540 portion of the hero only.
- [major] Green CTA banner — 'Register Here' button: The 'Register Here' button uses a green background (#489945) with white text on a dark green banner background. Depending on exact shades, the button may not provide sufficient contrast against the banner to be distinguishable as a button, and the contrast ratio of white on #489945 is approximately 2.8:1 — below WCAG AA 3:1 minimum for large text and 4.5:1 for normal text.
  - Fix: Change the button to the brand accent (#FF5A36) on the dark banner background, which will provide strong visual contrast and color-brand compliance simultaneously.
- [major] Footer area, desktop: The brand config requires a privacy policy link in the footer. The footer is visible in the desktop screenshot but a privacy policy link is not clearly discernible at the rendered scale. The HTML footer text is very small (visually sub-12px) and low contrast against a dark background, making any links inaccessible regardless of their presence.
  - Fix: Ensure the privacy policy link exists in the footer (confirm against HTML), set footer link font-size to at least 12px, and ensure sufficient contrast (light text on dark background must meet 4.5:1). If the link is missing, add it immediately as it is a required element per brand config.
- [minor] Speaker section — speaker name and title text: Speaker title/affiliation text below speaker names appears in a very light grey at a small size (visually approximately 11–12px). This combination likely fails contrast thresholds for that text size.
  - Fix: Increase speaker affiliation text to font-size: 13px minimum and darken the color to at least #555555 to improve contrast.

## Brand Compliance — 9/100
This microsite is for 'Veterans Healthcare 2026' published under the IDGA portal, but it is being reviewed against the WorkX 2026 / Example Portal brand configuration. The page's visual identity — green primary color (#489945), Nunito Sans typeface, IDGA logo — is entirely misaligned with the specified primary (#0A2540), accent (#FF5A36), and Archivo/Inter typography. Beyond the wholesale identity mismatch, several required elements are present (event name, dates, venue, registration CTA, portal logo, privacy policy link) but the accent-color discipline, tone, and logo clear-space rules show additional violations worth flagging under human-judgment review.

**Required elements**
- ✓ Event name and dates in the hero — Hero reads 'Veterans Healthcare 2026' with dates 'July 28–29, 2026' visible in the hero band.
- ✓ Venue / location — MGM Hotel and Casino, National Harbor, MD is stated in the hero area.
- ✓ Primary registration CTA above the fold — A green 'Book Now' / registration button is visible in the top-right navigation above the fold on desktop.
- ✓ IQPC or portal brand logo — IDGA logo appears top-left on both desktop and mobile; IQPC branding appears in the footer ('In Partnership With IDGA / Defense').
- ✓ Privacy policy link in footer — Footer contains a 'Privacy Policy' link visible in the desktop screenshot footer bar.

**Token scan (deterministic)**
- [major] Off-palette color #212529 is used on 278 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #333333 is used on 172 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #008641 is used on 64 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #489945 is used on 63 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #212121 is used on 62 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #999999 is used on 49 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack ""Nunito Sans", sans-serif" is used on 1212 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Global — entire page: The page is built on the IDGA portal identity (green #489945 primary, Nunito Sans typeface, IDGA logo) and has no relationship to the WorkX 2026 / Example Portal brand configuration (primary #0A2540, accent #FF5A36, Archivo/Inter). The event name, content, and sponsorship are all for 'Veterans Healthcare 2026', not 'WorkX 2026'. This microsite appears to have been submitted to the wrong brand review queue.
  - Fix: Confirm the correct brand configuration for this event (IDGA / Veterans Healthcare) and re-run the review against that portal's brand config, OR pull the page from review until the correct config is supplied. Do not publish under a WorkX 2026 brand approval.
- [critical] Hero section — event title lockup: The event title 'VeteransH…' (truncated in the hero) appears to be cut off on both desktop and mobile viewports, making the full event name unreadable above the fold. The hero headline is partially obscured by the overlapping hero image and the yellow/orange newsletter promo bar.
  - Fix: Ensure the full event name 'Veterans Healthcare Summit 2026' is fully legible in the hero without truncation or overlap. Increase z-index or adjust the layout so no promo bar or image crops the headline.
- [major] Hero and throughout — accent color usage: Under the WorkX 2026 config the accent (#FF5A36) is reserved for CTAs and key highlights only. The site instead uses green (#489945) as the dominant interactive and decorative color across section backgrounds, CTA buttons, dividers, speaker card borders, and testimonial blocks — not just on CTAs. This means accent-color discipline is entirely absent relative to the specified config.
  - Fix: Audit every element using the green color token. Restrict accent application to primary CTA buttons and no more than one or two highlight elements per section. Replace decorative green backgrounds with the specified primary (#0A2540) or background (#FFFFFF).
- [major] Top navigation bar — logo placement: On both desktop and mobile, the IDGA logo is placed directly adjacent to navigation links and the 'Book Now' CTA button with no visible clear space. The logo minimum clear space rule (equal to the height of the logomark on all sides) is not respected; on mobile the logo appears immediately flush against the hamburger menu icon.
  - Fix: Add padding around the logo container equal to the logomark height on all four sides. On mobile, ensure at least equivalent spacing between the logo and any adjacent UI element.
- [major] Hero banner — logo over busy imagery: The IDGA logo and event title appear directly over a photographic hero background image with no scrim or overlay. The brand config requires a scrim when a logo is placed over busy imagery. The current hero has no visible semi-transparent overlay between the background photo and the logo/text.
  - Fix: Add a dark semi-transparent scrim (e.g., `background: rgba(10,37,64,0.55)`) over the hero image layer, beneath the logo and headline text.
- [major] Hero — newsletter/promo bar: A yellow/orange promotional bar with copy 'WIN YOU CAN USE OUR LATEST FREE DRUGS TELEHEALTH? A complete analysis of the US healthcare ecosystem...' (visible in desktop screenshot) contains an unverifiable superlative ('latest free drugs telehealth') and is stylistically inconsistent. The tone veers into promotional clickbait rather than the required 'professional, energetic, benefit-led' voice.
  - Fix: Rewrite the promo bar copy to be specific and benefit-led, e.g. 'New: 2026 VA Telehealth Policy Analysis — Download Your Copy'. Remove vague superlatives and ensure the claim is verifiable.
- [minor] Section headers — 'Secure your pass before places run out!': The CTA section uses urgency language 'before places run out!' which verges on pressure-selling and is not consistent with 'professional, energetic, benefit-led' tone. It also risks implying scarcity that may not be verifiable.
  - Fix: Replace with benefit-led copy: e.g. 'Register Early to Secure Your Place and Access Preferred Rates.'
- [minor] Sponsor logo grid — mobile: On the 390px mobile viewport, the 2026 sponsor logos are extremely small and some appear to overflow or be cut off at the right edge of the screen, creating a broken layout impression that reflects poorly on sponsor partners.
  - Fix: Implement a responsive sponsor grid that wraps logos into 2–3 columns on mobile, ensuring no logo is clipped and each has sufficient padding for legibility.

## SEO Audit — 55/100
The page has a solid content foundation — confirmed dates, venue, speakers, sponsors, pricing, and a rich description — but the title and meta description are generic placeholders that fail basic search-intent alignment for anyone looking for a VA healthcare conference. Critically, the deterministic check flagged 'has_event_schema: false', yet the rendered HTML clearly contains a populated Event JSON-LD block; the schema itself has several quality issues (wrong @id domain, duplicate performer entries, missing street address, availability URL malformed) that need fixing regardless. Keyword coherence between the H1 ('Nation's Heroes'), page copy (VA, veterans healthcare, telehealth, EHR), and metadata ('Veterans Healthcare | IDGA') is weak — the title and meta description carry none of the high-value terms a searcher or algorithm would expect.

**Structural checks (deterministic)**
- Title: "Veterans Healthcare | IDGA" (26 chars)
- Meta description: 104 chars
- Open Graph: ✓ complete enough for share cards
- Canonical: ✓ · Viewport: ✓ · Robots: —
- H1 count: 1 · Image alt coverage: 98% of 122
- Event structured data (JSON-LD): ✗ MISSING — generated below

**Findings**
- [major] No schema.org Event structured data (JSON-LD) — the page cannot earn event rich results in Google.
  - Fix: Add Event JSON-LD with name, dates, location, organizer, and offers.
- [critical] Title is only 26 characters and contains no event-differentiating keywords: no year, no location, no topic signals (VA, veterans affairs, healthcare conference). A searcher querying 'VA healthcare conference 2026' or 'veterans affairs health summit' will not recognise this result as relevant.
  - Fix: Rewrite to ~55 chars including primary keyword phrase, year, and brand: e.g. 'Veterans Affairs Healthcare Conference 2026 | IDGA'.
- [critical] At 104 characters the description is under the optimal 150–160 char range, and the copy ('Welcome to Veterans Healthcare. Find all you need to know...') is a boilerplate filler with zero keyword signal, no value proposition, no date, no location, and no call to action. It will not drive clicks from SERP.
  - Fix: Rewrite to 150–160 chars with primary keywords, dates, venue, and a benefit-led CTA.
- [critical] The Event @id is set to 'https://www.iqpc.com#event' but the canonical URL is on idga.org. This creates a domain mismatch that undermines entity disambiguation for Google's Knowledge Graph and rich-result eligibility.
  - Fix: Set @id to the canonical page URL: 'https://www.idga.org/events-veteransaffairshealthcare#event'.
- [critical] The availability value is set to 'https://www.idga.org/events-veteransaffairshealthcare/InStock' which is not a valid schema.org URL. This will cause structured data validation errors and may disqualify the listing from rich results.
  - Fix: Replace with the correct schema.org enumeration: 'https://schema.org/InStock'.
- [major] H1 reads 'Delivering the Highest-Quality Care to our Nation's Heroes' — emotionally resonant but contains no searchable keywords. 'Nation's Heroes', 'Highest-Quality Care' are not terms searchers or crawlers associate with a professional conference. The H1 and title/meta share zero keyword overlap.
  - Fix: Retain the emotive phrase as a sub-headline or hero tagline but introduce a keyword-bearing H1 or visually prominent heading such as 'Veterans Affairs Healthcare Conference 2026'. Alternatively, add a keyword-rich subtitle immediately below the H1.
- [major] Multiple speakers appear two, three, or more times in the performer array (e.g. Neil Evans x3, Jennifer Murphy x3, ProMedTek x3 in sponsor). Duplicate entries bloat the payload, reduce parsing reliability, and signal low data quality to Google's structured data parser.
  - Fix: De-duplicate all performer and sponsor entries so each individual or organisation appears exactly once.
- [major] streetAddress and postalCode are empty strings. MGM National Harbor's address is publicly known and stated on the page. Missing address fields reduce rich-result eligibility for location-based SERP features.
  - Fix: Populate streetAddress with '101 MGM National Ave' and postalCode with '20745' based on venue name if confirmed in page copy; if not explicitly stated on-page, leave as null rather than empty string to avoid validation warnings.
- [major] Both social share images point to a small logo PNG (BcYWfsRxbavGNZtW5P6XeG7tHfHZLQl6INbkQlqp.png). OG images should be at least 1200×630px hero images, not logos, to maximise click-through on social shares. A logo renders as a small, unrecognisable thumbnail in LinkedIn and Facebook previews.
  - Fix: Replace og:image and twitter:image with a branded event hero image at 1200×630px minimum. Use twitter:card 'summary_large_image' for maximum visual impact.
- [major] The keywords meta tag is empty. While Google ignores this tag, Bing and other crawlers still reference it, and its population is a signal of metadata completeness during pre-publish QA.
  - Fix: Populate with 5–10 relevant phrases: veterans healthcare conference, VA healthcare summit 2026, veterans affairs health, military healthcare, telehealth veterans, EHR modernization VA, IDGA healthcare event.
- [minor] robots_meta is null — no explicit robots directive is set. While this defaults to index/follow, best practice for a published event microsite is to declare it explicitly to prevent any upstream CMS default from accidentally suppressing indexing.
  - Fix: Add '<meta name="robots" content="index, follow">' to the <head>.
- [minor] The WebSite JSON-LD block sets url to 'https://www.iqpc.com' and @id to 'https://www.iqpc.com#website' while the canonical page is on idga.org. This domain mismatch will confuse entity association.
  - Fix: Update the WebSite JSON-LD url and @id to reference 'https://www.idga.org'.
- [minor] The body description uses 'veterans' and 'VA' well, but high-value conference-intent terms — 'summit', 'conference', 'agenda', 'registration', '2026' — appear to be absent from or underrepresented in the meta layer. Keyword coherence between the rich on-page description and the metadata is broken.
  - Fix: Ensure the words 'conference' or 'summit', '2026', and at least one topical term (telehealth, EHR, mental health) appear in both the title and meta description to create coherent keyword signals across the page.

**Improved metadata (ready to apply)**
- Title: Veterans Affairs Healthcare Conference 2026 | IDGA
- Meta description: Join VA and DoD senior leaders at the Veterans Affairs Healthcare Conference 2026, July 28–29, National Harbor MD. Agenda covers telehealth, EHR, AI and mental health. Register today.

## Accessibility (axe-core, deterministic)
- **[serious]** aria-dialog-name: Ensure every ARIA dialog and alertdialog node has an accessible name (1 element(s), e.g. `.ju_wrapper`)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (34 element(s), e.g. `.btn-sm`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (6 element(s), e.g. `.template-8-two-column-img-container.aos-animate.template-8:nth-child(10) > .template-8-two-column-img-inner-container.position-relative > .template-8-two-column-img-column > .w-100[data-component="heading"][data-content="true"]:nth-child(1) > h6[name="H6"]`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[serious]** link-name: Ensure links have discernible text (1 element(s), e.g. `.font-weight-normal > a[target="_blank"]`)
- **[moderate]** region: Ensure all page content is contained by landmarks (35 element(s), e.g. `.template-8-two-column-img-inner-container.position-relative > .template-8-two-column-img-column.position-relative > .w-100[data-component="heading"][data-content="true"]:nth-child(1)`)
- **[serious]** tabindex: Ensure tabindex attribute values are not greater than 0 (2 element(s), e.g. `#ju_iframe_1006722 div[data-offset-left="0"]`)