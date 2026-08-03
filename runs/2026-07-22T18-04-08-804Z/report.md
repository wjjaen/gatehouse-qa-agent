# Microsite QA Report
**URL:** https://www.idga.org/events-veteransaffairshealthcare
**Date:** 2026-07-22T18:08:18.902Z
**Verdict:** BLOCK — 4 critical/serious accessibility violation(s) (axe-core)
**Weighted score:** 34/100  (Design QA: 42 · Brand Compliance: 9 · SEO Audit: 57)
**vs. previous run (2026-07-22T17:20:30.666Z):** +0 points

## Conversion instrumentation (deterministic)
- Analytics detected: GA4 / Google Tag Manager, LinkedIn Insight Tag
- Missing: Meta Pixel
- Registration CTAs found: 3
  - "Book Online Now" → https://www.idga.org/events-veteransaffairshealthcare/srspricing [HTTP 200] 
  - "2026 Registration" → https://www.idga.org/events-veteransaffairshealthcare/srspricing [HTTP 200] 
  - "Register Now" → https://www.idga.org/events-veteransaffairshealthcare/srspricing [HTTP 200] 
- UTM propagation: not_tested
- **[major]** MISSING_PIXEL: Meta Pixel not detected — conversions from this page cannot be measured/attributed for that channel.

## Performance
- Skipped via --skip-perf

## Design QA — 42/100
The Veterans Healthcare 2026 microsite functions as a navigable page and contains most required content elements, but it reads as a lightly customized platform template rather than a designed event property. The hero is visually cluttered and brand-inconsistent (green/Nunito Sans instead of the specified navy/Archivo/Inter palette), the type scale is arbitrary, and the mobile experience suffers from stacked content that loses all hierarchy. Multiple sections feel bolted together without rhythmic spacing or a unifying grid.

**Layout & grid — 3/7**
- [major] Hero section, desktop: The hero splits into a left text column and a right image, but the text block does not align to a discernible grid column edge — it appears to have inconsistent left padding relative to the navigation logo and the body copy sections below it. The overlapping 'GET YOUR COMPLIMENTARY COPY HERE' banner also floats mid-hero with no clear positional anchor.
  - Fix: Lock all hero content to a 12-column grid with a consistent gutter. The secondary CTA banner should sit below or clearly within a defined layout zone, not overlapping the primary hero image.
- [major] Speaker Roster section, desktop: The speaker grid shows 4 cards in the first row and 3 in the second, with the second row left-aligned, leaving a large empty right void. Orphaned cards without a centering rule break the grid.
  - Fix: Center-justify the last row of speaker cards or use CSS Grid auto-fill with a consistent column width so partial rows center gracefully.
- [major] 'Expand Your Knowledge' / content cards section, desktop: The four resource cards (Post-Show Report, VA Telehealth, VA Affairs FY2027, Confirmed Federal) have inconsistent widths and the card images are different heights, resulting in a visually jagged row with no baseline alignment.
  - Fix: Set all cards to the same fixed height container with a uniform image aspect ratio (e.g. 16:9) using object-fit: cover.
- [minor] 2026 Event Sponsors section, desktop: Sponsor logos are not aligned to a consistent vertical center line — some logos appear taller than others with no optical centering applied, making the row look unbalanced.
  - Fix: Wrap all sponsor logos in flex containers with `align-items: center` and constrain each logo to a max-height (e.g. 48px) with `object-fit: contain`.
**Typography — 2/7**
- [critical] Entire page: The page uses Nunito Sans throughout (defined in CSS --primary-font and --secondary-font), which conflicts directly with the brand configuration mandating Archivo for headings and Inter for body text. No Archivo or Inter font is loaded or applied anywhere on the page.
  - Fix: Replace the font stack in the dynamic styles CSS variables: set --primary-font to 'Archivo, sans-serif' and --secondary-font to 'Inter, sans-serif', and import both from Google Fonts.
- [major] Hero headline, desktop: The hero headline 'Delivering the Highest-Quality Healthcare to our Nation's Heroes' renders at a size that appears to be approximately 28–32px — well below the brand scale's 48px or 64px intended for a primary event headline. It does not command the hero visually.
  - Fix: Set the hero H1 to at least 48px (brand scale) on desktop, with a line height of 1.1–1.2.
- [major] Body copy sections (About section, Sponsorship section), desktop: Body text in the main content columns runs full container width on desktop, producing line lengths visibly exceeding 90 characters — well beyond readable measure. The 'About' paragraphs in particular appear to span nearly 800px.
  - Fix: Cap body copy containers at 70ch or 720px max-width and center them within their section.
- [minor] Speaker cards, desktop: Speaker name, title, and organization are rendered at sizes that appear almost identical, providing insufficient hierarchy between the person's name and their role/org.
  - Fix: Distinguish speaker name (16px semibold) from title (14px regular) from organization (12px muted) using the brand type scale.
**Spacing & rhythm — 3/7**
- [major] Between 'Secure your pass' CTA band and 'Expand Your Knowledge' section, desktop: There is almost no vertical breathing room between the green CTA band and the resource cards section that follows — the sections feel collided rather than sequenced.
  - Fix: Add 48px or 64px of top margin to the 'Expand Your Knowledge' section to create visual separation.
- [major] Photo Gallery section, desktop: The 'Explore Our Photo Gallery' section shows a single photo on the left with a 'Check Out Our Gallery' call-to-action block on the right, but the two halves are vertically misaligned — the CTA block appears to sit lower than the image, creating an unbalanced void above the CTA text.
  - Fix: Vertically center-align the right-side CTA block relative to the photo using flexbox align-items: center.
- [minor] Testimonials section, desktop: Testimonial quote cards have inconsistent internal padding — some quotes with shorter text appear to have more bottom padding than longer ones, creating uneven card heights in the row.
  - Fix: Use CSS Grid with `align-items: stretch` and ensure testimonial card content is flex-column with the attribution pushed to the bottom via `margin-top: auto`.
**Visual hierarchy — 3/7**
- [critical] Hero section, desktop and mobile: The primary registration CTA button ('Book Online Now' in the nav) is small and located in the top navigation bar, not in the hero body. The hero CTA button ('VIEW AGENDA' and 'WHATS INCLUDED') are secondary actions. There is no prominent 'Register Now' CTA visually anchored within the hero section itself above the fold. The brand config requires a primary registration CTA above the fold.
  - Fix: Add a high-contrast, accent-colored (#FF5A36) 'Register Now' button prominently within the hero section, visually larger than the agenda/included buttons, placed immediately below the event date and location.
- [major] Hero section, desktop: The eye is pulled in multiple competing directions simultaneously: the 'GET YOUR COMPLIMENTARY COPY HERE' orange banner overlapping the hero image, the social icons row, the 'VIEW AGENDA' / 'WHATS INCLUDED' buttons, and the top-nav 'Book Online Now' button all compete at similar visual weights. There is no single dominant element.
  - Fix: Reduce the hero to: event name (largest), date/location (medium), one primary CTA (accent color), one secondary CTA (outline). Remove the complimentary copy banner from the hero and relocate it to its own section below.
- [major] Event dates and location, hero, desktop: The event date (July 28–29, 2026) and venue (MGM Hotel and Casino, National Harbor) are present but styled in small text that is not visually distinguished from surrounding body copy. For event microsites, date and location are tier-2 hierarchy elements and should be significantly more prominent.
  - Fix: Style the date and location at 20px semibold in the brand primary color (#0A2540) with an icon prefix, placed directly below the H1.
**Consistency — 3/7**
- [critical] Entire page — color palette: The page is themed in a mid-green (#489945, per the CSS --primary-color) used for buttons, links, section backgrounds, and the nav bar. The brand configuration specifies #0A2540 (navy) as primary and #FF5A36 (coral) as accent. The green palette is entirely off-brand and would misrepresent the event if published against IQPC brand standards.
  - Fix: Update all CSS custom property values: --primary-color to #0A2540, --link-color to #0A2540, --link-hover-color to #FF5A36, and replace all green section backgrounds with #0A2540 or #FFFFFF as appropriate.
- [major] CTA buttons across page: Button styles vary across the page: the nav 'Book Online Now' button has one style, the hero 'VIEW AGENDA' button has a different style, the 'Register Now' band uses a different green shade, and the 'View More Speakers' button is yet another variant. There is no unified button component.
  - Fix: Define two button classes: .btn-primary (filled, #FF5A36 background, white text, 4px radius) and .btn-secondary (outlined, #0A2540 border and text). Apply consistently everywhere.
- [minor] Speaker cards vs. Resource cards, desktop: Speaker cards use circular portrait images with a drop shadow, while resource cards use rectangular images with no shadow and a different corner radius treatment. These are different card patterns within the same page without clear semantic reason for the divergence.
  - Fix: Standardize non-portrait cards (resources, reports) to use the same corner radius (4px) and shadow style as a unified card component.
**Responsive integrity — 3/7**
- [critical] Hero section, mobile (390px): On mobile, the hero text and image stack, but the event name appears truncated and the headline is very small relative to the viewport. The 'GET YOUR COMPLIMENTARY COPY HERE' banner overlaps the stacked content, partially obscuring the headline text and making it unreadable at this viewport width.
  - Fix: On mobile, hide or relocate the promotional overlay banner. Ensure the hero headline is at least 28px and that all hero text is fully visible without overlap.
- [major] Speaker Roster section, mobile: On mobile the speaker cards appear to display two per row at a very small size, making names, titles, and organizations nearly illegible (approximately 10–11px rendered size).
  - Fix: Switch to a single-column speaker card layout on mobile, or at minimum 1 card per row below 480px.
- [major] Resource / Knowledge cards section, mobile: The four resource cards appear to stack vertically on mobile but each card's internal text is extremely small and the card images appear compressed to non-square aspect ratios, distorting the document preview thumbnails.
  - Fix: Enforce aspect-ratio: 16/9 on card images with object-fit: cover on mobile, and increase the card text minimum font-size to 14px.
- [minor] Sponsor logos section, mobile: On mobile, the sponsor logo grid shows logos at very small sizes (some appear to be under 60px wide), making several logos unrecognizable, particularly text-based logos like 'INTERSURGICAL' and 'LOVELL'.
  - Fix: On mobile, reduce the number of logos per row to 2 or 3 with a larger minimum logo width of 100px.
**Visual accessibility — 2/7**
- [critical] Multiple green CTA buttons across page (desktop and mobile): The mid-green (#489945) buttons with white text are flagged by axe-core for failing WCAG AA contrast (confirmed: 34 affected nodes including .btn-sm). Visually this is apparent in the screenshot — the 'Register Now' and 'View More Speakers' buttons appear as a light-medium green that clearly lacks sufficient contrast against white text.
  - Fix: Replace the green (#489945) button background with the brand primary (#0A2540, which achieves >7:1 against white) or the accent (#FF5A36, which achieves >3:1 — sufficient for large/bold text). Do not use mid-green for buttons.
- [major] Hero section — text over image, desktop: Portions of the hero headline sit adjacent to (and partially over) the hero photograph. No scrim or overlay is applied to the image side. While the text is mostly on a white-background left column, the boundary between the text column and image is abrupt and on mobile the text may render over the image without a protective overlay.
  - Fix: Add a semi-transparent dark scrim (rgba(10,37,64,0.55)) over the hero image wherever text could overlap it at any viewport width.
- [major] Green section backgrounds with body text (About section, Sponsorship section), desktop: The dark green (#489945 or similar) section backgrounds are used in the 'Secure your pass' band and possibly other sections. Body text in these sections appears to be in a shade that may not meet AA contrast against the green. Visually the text reads as slightly washed out.
  - Fix: Use only #FFFFFF text on dark green or navy backgrounds, and verify contrast ratios. Avoid placing body-weight text on mid-saturation green backgrounds.
- [minor] Resource card section — color-coded document thumbnail images: The four resource card thumbnails (Post-Show Report, VA Telehealth, etc.) use color-coded cover images where the document category is distinguished primarily by background color. No text labels differentiate the document type beyond what is in the color field.
  - Fix: Add a text badge or label to each card that identifies the resource type (e.g. 'Report', 'Analysis') without relying on color alone.

## Brand Compliance — 9/100
This microsite is built for the IDGA 'Veterans Healthcare 2026' event and carries IDGA/green branding throughout, not the WorkX 2026 / Example Portal brand configuration supplied. The primary color in use is #489945 (green), CTAs and accents are green, the logo is IDGA, and the typography stack is Nunito Sans — none of which match the mandated #0A2540 primary, #FF5A36 accent, Archivo/Inter typefaces, or the portal identity. Several required elements are present, but the event name displayed ('Veterans Healthcare') does not match the configured event name ('WorkX 2026'), and the overall brand expression is entirely misaligned with the supplied configuration. Missing required elements: IQPC or portal brand logo.

**Required elements**
- ✓ Event name and dates in the hero — Hero shows 'Veterans Healthcare' with dates July 28–29, 2026, but the configured event name is 'WorkX 2026'. Dates are present and correct in format.
- ✓ Venue / location — MGM Hotel and Casino, National Harbor, MD is visible in the hero area and confirmed in schema markup.
- ✓ Primary registration CTA above the fold — A 'Book Online Now' button appears in the top navigation bar within the viewport; a secondary 'Get Your Complimentary Copy Here' CTA also appears in the hero, though it promotes a report rather than registration.
- ✗ MISSING IQPC or portal brand logo — The logo displayed is the IDGA logo (top-left, white/green). No IQPC logo or 'Example Portal' logo is visible anywhere on the page. 'IQPC' text appears only in the footer in very small type as an organizational link.
- ✓ Privacy policy link in footer — A 'Cookie Policy' link is visible in the footer; however a clearly labeled 'Privacy Policy' link is not distinctly visible in the screenshot. The footer shows 'IQPC Home | Cookie Policy | Help | Terms | Privacy' — Privacy appears present but is very small and low contrast.

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
- [critical] Entire page — global brand identity: The microsite is branded as an IDGA event using IDGA's green (#489945) color system, IDGA logo, and Nunito Sans typeface. The brand configuration mandates the 'Example Portal' identity with primary #0A2540, accent #FF5A36, and Archivo/Inter typefaces. The page does not reflect the configured brand at any level.
  - Fix: Re-skin the entire microsite to the configured brand: replace the IDGA green system with #0A2540 primary and #FF5A36 accent, replace Nunito Sans with Archivo (headings) and Inter (body), and replace the IDGA logo with the correct portal logo in its appropriate primary or reversed variant.
- [critical] Hero section — event name: The event name displayed is 'Veterans Healthcare 2026'. The brand configuration specifies the event name as 'WorkX 2026'. This is a fundamental misidentification of the event.
  - Fix: Confirm whether this page is intentionally for Veterans Healthcare 2026 on the IDGA portal, in which case the brand configuration must be corrected to match, or update all event name references on the page to 'WorkX 2026' if this is the intended event.
- [critical] Header — logo: The IDGA logo is placed in the top-left on a dark green navigation bar. No portal brand logo ('Example Portal' / IQPC) is present. Per brand config, the IQPC or portal brand logo is a required element and the logo must be the primary logo on light backgrounds or reversed on dark; the IDGA logo does not satisfy the requirement.
  - Fix: Add the correct portal/IQPC logo to the header. If the dark nav bar is retained, use the reversed (white) variant of the logo. Ensure minimum clear space equal to the logomark height is maintained on all sides.
- [major] Hero and mid-page CTA sections — accent color usage: The accent color in use site-wide is #489945 (green), applied to navigation highlights, CTA buttons ('Book Online Now', 'Register Now', 'View More Speakers'), section backgrounds, and decorative elements. The brand config mandates #FF5A36 as the accent, reserved for CTAs and key highlights only. The green accent is off-brand and appears on non-CTA elements (section backgrounds, dividers, icon blocks), violating the 'reserved for CTAs/highlights only' rule.
  - Fix: Replace all CTA button backgrounds and key highlight uses of #489945 with #FF5A36. Remove the accent color from non-CTA decorative elements (large green background sections, horizontal rules, icon containers) — use #0A2540 or #FFFFFF for those instead.
- [major] Mid-page — 'Secure your pass before places run out!' CTA section: The copy 'Secure your pass before places run out!' uses urgency-scarcity language ('before places run out') that functions as an unverifiable superlative/pressure claim. The brand tone requires professional, benefit-led copy with no unverifiable superlatives.
  - Fix: Rewrite to a benefit-led, non-scarcity-pressure statement, e.g., 'Reserve your place at Veterans Healthcare 2026 — register today.'
- [major] Hero — yellow/orange alert banner: A bright yellow/orange banner overlay appears in the hero reading promotional copy about a 'LATE PRICE INCREASE.' This introduces a third color (yellow/amber) not present in the brand palette and applies urgency/scarcity copy that conflicts with the professional, non-superlative tone of voice requirement.
  - Fix: Remove the off-palette alert banner. If a deadline communication is genuinely needed, embed it in body copy using the approved #FF5A36 accent on a white background, with factual, non-pressure language.
- [major] Logo — clear space (header, desktop and mobile): On mobile (390px), the IDGA logo in the top-left appears with minimal padding and is adjacent to the navigation toggle, with clear space well below the required minimum of one logomark height on all sides.
  - Fix: Add padding around the logo container equal to the rendered height of the IDGA logomark (approximately 28–32px based on visible size) on all sides, verified on both desktop and mobile breakpoints.
- [minor] Speaker roster section — imagery style: Speaker headshots are a mix of circular crop portrait photos with some appearing in military dress uniforms, professional attire, and informal settings. While appropriate for a government/defense healthcare event, several appear low-resolution or inconsistently lit, creating an uneven imagery style across the grid.
  - Fix: Standardize all speaker headshots to a consistent circular or square crop, minimum 300×300px, with neutral or dark backgrounds where possible. Reject or professionally retouch submissions that appear pixelated or harshly lit.
- [minor] Footer — privacy policy link: The privacy policy link in the footer is very small (approximately 12px) and low-contrast against the dark footer background, making it difficult to read. While it appears present, its legibility is borderline non-compliant for a legally required element.
  - Fix: Increase the footer link font size to at least 14px and ensure the link color meets WCAG AA contrast ratio (4.5:1 minimum) against the footer background color.

## SEO Audit — 57/100
The page actually contains a full schema.org Event JSON-LD block (contrary to the deterministic flag), but the visible metadata is severely under-optimised: the title wastes 34 of 60 available characters on a generic label, the meta description is a filler placeholder with zero keyword substance, and the H1 — while emotionally resonant — is entirely disconnected from the search queries a VA healthcare professional or vendor would type. Keyword coherence between the rich on-page content (VA telehealth, electronic health records, veterans mental health, DoD healthcare conference) and the metadata is effectively zero, representing a significant missed ranking and click-through opportunity.

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
- [critical] Title 'Veterans Healthcare | IDGA' is only 26 characters, generic, and omits the year, event type, location, and any differentiating keyword signal. It does not match the intent of someone searching for a veterans affairs healthcare conference, VA summit, or DoD health event.
  - Fix: Expand to include the event year, type ('Summit' or 'Conference'), and location signal to reach the 55–60 character sweet spot and match navigational + informational queries.
- [critical] The description is a boilerplate filler ('Welcome to Veterans Healthcare. Find all you need to know about the latest agenda, key speakers and more') with no keywords, no benefit statement, no dates, no location, and no call to action. It will generate poor click-through rates in SERPs.
  - Fix: Replace with a 150–160 character description that includes primary keywords (veterans affairs healthcare, VA conference, telehealth, EHR, 2026), dates, location, and a CTA.
- [critical] 'Delivering the Highest-Quality Care to our Nation's Heroes' is emotive and brand-appropriate but contains zero searchable keywords. A user scanning the SERP snippet or landing cold on the page cannot immediately confirm this is a conference/summit event about veterans affairs healthcare in 2026.
  - Fix: Either replace the H1 with a keyword-rich event title and move the current phrasing to a supporting subheading (H2), or append a visible event name and date line directly beneath it in a styled subtitle element.
- [major] The Event @id is 'https://www.iqpc.com#event' and the WebSite @id/@url points to 'https://www.iqpc.com', both mismatched from the canonical URL 'https://www.idga.org/events-veteransaffairshealthcare'. This creates entity confusion and may cause Google to associate the structured data with the wrong domain.
  - Fix: Update Event @id to 'https://www.idga.org/events-veteransaffairshealthcare#event' and WebSite url/id to 'https://www.idga.org'.
- [major] The Offer availability is set to 'https://www.idga.org/events-veteransaffairshealthcare/InStock' which is not a valid schema.org ItemAvailability URL. This will trigger a structured data warning or error in Google Search Console.
  - Fix: Replace with the correct schema.org enum value 'https://schema.org/InStock'.
- [major] eventAttendanceMode value 'OfflineEventAttendanceMode' is missing the required schema.org namespace prefix, making it an unresolvable string rather than a valid enum.
  - Fix: Prefix with the schema.org URL: 'https://schema.org/OfflineEventAttendanceMode'.
- [major] The OG and Twitter card images point to what appears to be a small logo PNG ('BcYWfsRxbavGNZtW5P6XeG7tHfHZLQl6INbkQlqp.png'). Social platforms require a minimum 1200×630px image for og:image to render correctly in link previews; a logo asset is unlikely to meet this requirement.
  - Fix: Replace with a dedicated event social share image at 1200×630px featuring the event name, dates, and venue.
- [major] Multiple speakers (e.g. Neil Evans, Jennifer Murphy, Alison Cormier, ProMedTek, Topcon Healthcare, Snowflake) appear two or three times in their respective arrays. Duplicate entries bloat page weight and may cause parsing issues.
  - Fix: Deduplicate all performer and sponsor arrays so each entity appears exactly once.
- [minor] robots_meta is null — no explicit robots directive is present. While Googlebot defaults to index/follow, the absence of an explicit tag is a missed control point, particularly important for event microsites with time-sensitive indexing needs.
  - Fix: Add '<meta name="robots" content="index, follow">'. Consider adding 'max-snippet:-1, max-image-preview:large, max-video-preview:-1' to maximise SERP feature eligibility.
- [minor] The keywords meta tag is present but empty (content=""). While Google ignores this tag, it signals that no keyword strategy has been applied to this page at all, and some other crawlers and internal tools still reference it.
  - Fix: Populate with 8–10 relevant terms or remove the tag entirely.
- [minor] streetAddress and postalCode are empty strings for the MGM Hotel and Casino, National Harbor, MD location. While the venue name is present, complete address data improves local search signals and structured data quality scores.
  - Fix: Add the full street address and ZIP code for MGM National Harbor.

**Improved metadata (ready to apply)**
- Title: Veterans Healthcare Summit 2026 | VA & DoD | IDGA
- Meta description: Join VA and DoD health leaders at the Veterans Healthcare Summit 2026, July 28–29, National Harbor MD. Agenda covers telehealth, EHR, AI, and mental health. Register today.

## Accessibility (axe-core, deterministic)
- **[serious]** aria-dialog-name: Ensure every ARIA dialog and alertdialog node has an accessible name (1 element(s), e.g. `.ju_wrapper`)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (34 element(s), e.g. `.btn-sm`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (6 element(s), e.g. `.template-8-two-column-img-container.aos-animate.template-8:nth-child(10) > .template-8-two-column-img-inner-container.position-relative > .template-8-two-column-img-column > .w-100[data-component="heading"][data-content="true"]:nth-child(1) > h6[name="H6"]`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[serious]** link-name: Ensure links have discernible text (1 element(s), e.g. `.font-weight-normal > a[target="_blank"]`)
- **[moderate]** region: Ensure all page content is contained by landmarks (35 element(s), e.g. `.template-8-two-column-img-inner-container.position-relative > .template-8-two-column-img-column.position-relative > .w-100[data-component="heading"][data-content="true"]:nth-child(1)`)
- **[serious]** tabindex: Ensure tabindex attribute values are not greater than 0 (2 element(s), e.g. `#ju_iframe_1006722 div[data-offset-left="0"]`)