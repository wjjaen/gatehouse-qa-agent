# Microsite QA Report
**URL:** https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa
**Date:** 2026-08-02T20:10:03.888Z
**Verdict:** BLOCK — 2 critical/serious accessibility violation(s) (axe-core)
**Weighted score:** 41/100  (Design QA: 52 · Brand Compliance: 20 · SEO Audit: 52)
**vs. previous run (2026-08-02T20:00:39.848Z):** -1 points

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
The Corporate Counsel & Compliance Exchange USA microsite communicates the essential event information and has a reasonable structural skeleton, but suffers from consistent brand misalignment (Raleway instead of Archivo/Inter, blue/yellow instead of #0A2540/#FF5A36), unrefined spacing rhythm, and several mobile stacking issues that would be visible to any professional reviewer. The hierarchy works at a macro level but the registration CTA competes with secondary actions and the overall finish reads as a template-default rather than a deliberate design decision.

**Layout & grid — 4/7**
- [major] Key Themes section, desktop: The four theme cards appear to use a 4-column layout but the chess-board imagery bleeds into a dark background that creates an uncontrolled full-bleed zone; card edges do not align to the same horizontal baseline as the surrounding content columns, breaking grid continuity.
  - Fix: Constrain all card content to the same max-width container (e.g. 1200px) used by all other sections, and ensure card bottom-edges align on the same row baseline.
- [major] Speakers section, desktop: Only one speaker card is visible in the speakers row before the 'View all speakers' button, leaving the row mostly empty and creating a large unexplained void on the right side.
  - Fix: Show at least 4–6 speaker cards in a grid before the CTA, or explicitly communicate 'Featuring our first announced speaker' to avoid the appearance of broken content.
- [minor] Sponsors grid, desktop: Sponsor logos are arranged in uneven rows with varying vertical gaps; the last row has 3 logos left-aligned while all other rows are center-aligned, creating a ragged bottom edge.
  - Fix: Use a CSS flexbox row with justify-content: center and a consistent gap value so all rows center-align regardless of count.
**Typography — 3/7**
- [critical] Global / all sections: The page uses Raleway as both primary and secondary font (confirmed in CSS: --primary-font and --secondary-font are both 'Raleway'). The brand configuration requires Archivo for headings and Inter for body text. This is a complete brand typography mismatch.
  - Fix: Replace the font imports and CSS variables to use Archivo for all headings and Inter for all body text, per brand config.
- [major] Statistics row (75 / 22 / 194 / 27 numbers), desktop: The large numerals appear at an arbitrary size that is not in the brand type scale (12, 14, 16, 20, 24, 32, 48, 64px); they appear to be ~40px, sitting between defined scale steps.
  - Fix: Set stat numerals to exactly 48px (next scale step up) or 32px, and labels to 14px, both from the defined scale.
- [major] Hero subheadline, desktop: The tagline 'Checkmate, Chaos – Turning Volatility Into Your Next Strategic Advantage' appears in a size between the h1 and h2, suggesting an intermediate heading level that is not part of the defined scale, and the line-height appears tight for a multi-line display headline.
  - Fix: Set the tagline to 32px (scale step) with line-height: 1.25 for display use, or promote to h2 at 48px with adequate line-height.
- [minor] Body copy paragraphs, multiple sections (About section, Sponsorship section): Body text line length on desktop appears to exceed 90 characters per line in full-width sections, reducing readability.
  - Fix: Cap body text containers at max-width: 720px or use a narrower column within the grid for prose content.
**Spacing & rhythm — 4/7**
- [major] Between 'Key Themes' and 'Secure Your Place' CTA strip, desktop: The dark themed-cards section transitions immediately into the CTA strip with no visible vertical breathing room; the two sections appear merged, reducing scanability.
  - Fix: Add 48px top/bottom padding to the CTA strip to create a clear visual break between the sections.
- [major] Benefits of Attending / Benefits of Sponsoring tabs, desktop: The section heading 'Benefits of Attending' and 'Benefits of Sponsoring' have no visible content below them in the screenshot — the region appears empty with a large void below the tab labels before the next section begins.
  - Fix: Verify content is rendering inside the tabs. If content exists but is hidden, ensure the active tab has sufficient padding (min 48px) so the section does not look broken.
- [minor] Statistics row, desktop: The four stat blocks have inconsistent horizontal gutters — the gaps between blocks appear wider between the 2nd and 3rd items than between the 1st and 2nd, suggesting margin rather than gap-based spacing.
  - Fix: Use CSS gap on a flexbox or grid container to ensure equal spacing between all stat blocks.
**Visual hierarchy — 4/7**
- [major] Hero section, desktop: Two CTA buttons are present in the hero ('Request Your Invite' and 'Explore Our Networking Event Format') at visually equal weight and similar size. The secondary action competes directly with the primary registration CTA, diluting conversion focus. A third 'Sponsorship Opportunities' button also appears in the nav bar area.
  - Fix: Differentiate the primary CTA ('Request Your Invite') with the brand accent color (#FF5A36, filled) and reduce the secondary CTA to an outline or ghost button style. Remove or relocate the sponsorship CTA to a dedicated section.
- [major] Hero section, desktop: The event name 'Corporate Counsel and Compliance Exchange USA' is rendered in a large circular logo lockup but the h1 text treatment is not clearly the most dominant typographic element on screen — the chess imagery and the dark background compete with it visually.
  - Fix: Ensure the event name as a text h1 (not just as part of the logo) appears prominently below or beside the logo at the top of the hero with maximum visual weight.
- [minor] 2026 Sponsors section, desktop: The 'Discover All Sponsors' CTA button in the sponsors section uses a color and style that is visually similar to the primary registration CTA, creating hierarchy confusion — a secondary action should not match the primary CTA visually.
  - Fix: Style the 'Discover All Sponsors' button as a secondary/outline button (border only, no fill) to keep the registration CTA as the sole filled-accent-color element.
**Consistency — 4/7**
- [major] CTA buttons, site-wide: Button colors observed across the page include blue (#0081ff per CSS --primary-color), yellow (#ffd230 per --secondary-color), and what appears to be a darker navy in some sections. The brand config specifies #FF5A36 as the sole accent for CTAs. None of the visible buttons use the specified accent color.
  - Fix: Audit every button on the page and unify all primary CTAs to #FF5A36 background with #FFFFFF text. Secondary/ghost CTAs should use #0A2540 outline only.
- [major] Card components — Key Themes cards vs. resource/report cards at bottom of page: The Key Themes cards use a dark background with image overlays and bold title text, while the resource/report cards at the bottom use a light card with image thumbnails and smaller text. Corner radius treatment also differs (themes cards appear rounded, report cards appear square). These are different component designs for what should be a consistent card pattern.
  - Fix: Standardize card corner-radius to a single value (e.g. 8px) and define one image overlay approach (either all use gradient overlays or none do) across all card types.
- [minor] Section headings throughout page: Some section headings appear centered (Speakers, Sponsors) while others are left-aligned (Sponsorship Opportunities description text), and at least one uses an underline decoration not seen elsewhere. Alignment is inconsistent without apparent structural reason.
  - Fix: Decide on one alignment convention for section headings (recommended: centered for full-width sections, left-aligned for two-column layouts) and apply it consistently.
**Responsive integrity — 3/7**
- [critical] Key Themes cards, mobile (390px): On mobile, the Key Themes cards appear to stack but retain the chess-board dark background in a way that makes body text inside the cards very difficult to read — the cards appear to overflow or overlap their containing dark section, and card text is not clearly legible against the busy background.
  - Fix: On mobile, switch the Key Themes section to a single-column card stack with a solid dark background (#0A2540) per card and white text, removing the imagery overlay entirely at narrow viewports.
- [major] Sponsor logos grid, mobile: On mobile, sponsor logos appear at varying sizes with some appearing very small (barely legible at thumbnail size) and others larger, suggesting logos are not being normalized to a consistent display size in the responsive grid.
  - Fix: Set all sponsor logo images to a consistent height (e.g. height: 40px; width: auto; object-fit: contain) within a flex-wrap container on mobile.
- [major] Statistics row, mobile: The four stat numbers (75, 22, 194, 27) appear to stack into a 2x2 grid on mobile but the layout looks misaligned in the screenshot — the numbers and labels do not appear to be vertically centered within their cells, and there is uneven spacing between the two rows.
  - Fix: Use a CSS grid with grid-template-columns: repeat(2, 1fr); gap: 24px; on mobile to enforce equal cell sizes and alignment.
- [minor] Navigation / header, mobile: The mobile header appears to show a hamburger menu but the logo and sign-in link are very small and cramped against the navigation elements, with inadequate spacing between them.
  - Fix: Ensure the mobile header has min-height: 56px and all interactive elements (logo, hamburger) have at least 44px touch target size with 8px minimum padding between them.
**Visual accessibility — 3/7**
- [critical] Hero section — text over background image, desktop and mobile: The hero places white/light text directly over a busy chess-board photographic background. While there appears to be some darkening, the contrast of the tagline and date text against the mid-tone imagery areas is insufficient — there is no clear full-width scrim or gradient overlay visible behind the body text lines, only behind portions of the layout.
  - Fix: Add a linear-gradient overlay (e.g. rgba(10,37,64,0.75) to rgba(10,37,64,0.55)) across the full hero background image to ensure all text meets 4.5:1 contrast against the darkened image.
- [major] Yellow/gold secondary CTA buttons, desktop (hero and elsewhere): The secondary buttons use --secondary-color: #ffd230 (yellow) with white text. Yellow (#ffd230) against white (#ffffff) text fails WCAG AA contrast (ratio well below 4.5:1). This is also confirmed by the axe-core contrast finding on .btn-primary elements using the current color variables.
  - Fix: Change secondary button text to #0A2540 (dark navy) instead of white, which will pass contrast against the yellow background. Alternatively change the button color to a darker hue.
- [major] Key Themes cards, desktop — text over image overlays: The four Key Themes cards show text overlaid on photographic images with what appears to be a partial color overlay. The body text inside each card (the paragraph description text below the card title) appears in a small size over imagery where contrast cannot be guaranteed.
  - Fix: Add a solid semi-transparent dark panel (background: rgba(10,37,64,0.85)) behind the text content area of each card, separate from the image, to guarantee contrast regardless of image content.
- [minor] Footer area, desktop: Footer link text appears in a small size (visually appears below 12px in the screenshot) against a dark background. While the color may pass contrast, the text size makes it difficult to read for users with moderate visual impairment.
  - Fix: Set footer body text and links to a minimum of 12px (brand scale minimum) and ensure all footer links are at least 14px.

## Brand Compliance — 20/100
This microsite is for 'Corporate Counsel & Compliance Exchange USA,' not 'WorkX 2026,' and uses a completely different visual identity (Raleway font, blue/yellow/gold palette, chess-themed imagery) rather than the configured brand system. While several required elements are present on-page, the event identity, color system, typography, and tone all diverge significantly from the brand configuration provided. The page appears to be a legitimate IQPC community event, but it does not conform to the WorkX 2026 brand configuration against which it is being reviewed.

**Required elements**
- ✓ Event name and dates in the hero — Hero displays 'Corporate Counsel and Compliance Exchange USA' and 'July 20–21, 2025 | New York, USA' — event name does not match configured event 'WorkX 2026'; schema markup shows startDate 2027-07-20 which conflicts with hero copy date of 2025.
- ✓ Venue / location — Hero states 'New York, USA' but no specific venue name or address is visible on the page, only city-level location.
- ✓ Primary registration CTA above the fold — 'REQUEST YOUR INVITE' and 'EXPLORE OUR INVITATION-ONLY EVENT' buttons visible in the hero above the fold.
- ✓ IQPC or portal brand logo — IQPC logo visible in top navigation bar and in the footer area on both desktop and mobile.
- ✓ Privacy policy link in footer — Footer contains a 'Privacy Policy' link visible in the footer navigation strip on desktop screenshot.

**Token scan (deterministic)**
- [major] Off-palette color #212121 is used on 370 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #212529 is used on 274 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #222222 is used on 94 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #FFD230 is used on 48 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Raleway, sans-serif" is used on 1067 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Entire page: The microsite is for 'Corporate Counsel & Compliance Exchange USA,' not the configured event 'WorkX 2026.' The entire event identity — name, theme, audience, and messaging — is misaligned with the brand configuration. This is either the wrong brand config being applied or the wrong page being reviewed, and publishing without resolution would misrepresent the event.
  - Fix: Confirm which brand configuration applies to this microsite. If this is a WorkX 2026 review, replace all event copy, theming, and assets with WorkX 2026 content. If this is a Corporate Counsel & Compliance Exchange USA review, apply the correct brand configuration for that event.
- [critical] Structured data / schema markup in <head>: The schema.org Event startDate is '2027-07-20' while the hero displays 'July 20–21, 2025.' This date conflict is a factual error that could mislead attendees and damage organizational credibility if published.
  - Fix: Reconcile the event date across all surfaces: hero display copy, page metadata, and the JSON-LD schema block must all show the same confirmed date.
- [critical] Global CSS / :root variables: The site's primary color is set to #0081ff (blue) and secondary to #ffd230 (yellow/gold) via CSS custom properties. The brand configuration specifies primary #0A2540 and accent #FF5A36. The configured accent color (#FF5A36) is not used anywhere on the page; instead a yellow/gold (#ffd230) is used for CTAs and highlights. This is a systemic palette violation across all CTAs, section backgrounds, and highlight elements.
  - Fix: Update --primary-color to #0A2540, remove --secondary-color #ffd230, and implement #FF5A36 as the accent reserved exclusively for CTA buttons and key highlights. Audit all button, badge, and highlight instances to apply these tokens consistently.
- [critical] Global CSS / font stack: The site loads and uses 'Raleway' as both --primary-font and --secondary-font. The brand configuration requires 'Archivo' for headings and 'Inter' for body copy. Raleway is not part of the approved type system.
  - Fix: Replace the Google Fonts import for Raleway with Archivo and Inter. Update --primary-font to 'Archivo, sans-serif' and --secondary-font to 'Inter, sans-serif'.
- [major] Hero section — CTA buttons: The two hero CTAs ('REQUEST YOUR INVITE' and the gold exploration button) appear to use the yellow/gold secondary color (#ffd230) for at least one button, and blue (#0081ff) for the other. Neither matches the brand-specified accent #FF5A36 for CTAs. Both CTAs should use the accent color exclusively.
  - Fix: Apply #FF5A36 as the background for all primary CTA buttons. Reserve the primary dark color #0A2540 for secondary/outline button variants. Remove yellow/gold from all CTA treatments.
- [major] Hero section — logo placement over busy imagery: The event logo (Corporate Counsel & Compliance Exchange circular badge) is placed directly over the hero background photograph with a chess-themed scene. Although there appears to be some dark overlay, the logo sits over complex imagery without a clearly defined solid or consistent scrim behind the logomark specifically, risking legibility.
  - Fix: Add a dedicated semi-transparent scrim or solid color block with sufficient opacity (minimum 60% opacity dark overlay) directly behind the logo to guarantee full legibility across all viewport sizes and display conditions.
- [major] Hero section — clear space around logo: On mobile (390px viewport), the event logo appears cramped against adjacent text elements — the subtitle copy begins immediately beside or below the logo with insufficient clear space. Brand config requires clear space equal to the height of the logomark on all sides.
  - Fix: Measure the rendered height of the logomark and apply that value as minimum margin on all four sides in the mobile layout. At minimum, ensure 16–24px margin on mobile.
- [major] Key Themes section — card accent colors: The themed content cards ('The Rooks,' 'The Knights,' etc.) use yellow/gold (#ffd230) header bands as decorative section color, not as CTA or highlight accent. This is an unapproved use of a non-brand color as a structural/decorative element rather than using the approved accent #FF5A36.
  - Fix: Replace the yellow/gold card header bands with either the primary dark color (#0A2540) or the accent color (#FF5A36). If #FF5A36 is used here, confirm it reads as a 'key highlight' contextually, not a decorative pattern.
- [major] Venue — hero and throughout page: Location is stated only as 'New York, USA' with no specific venue name. The brand configuration requires 'Venue / location' as a required element, which implies a named venue, not just a city.
  - Fix: Add the specific venue name (hotel, conference center) to the hero location line and to any dedicated logistics/venue section of the page.
- [minor] Meta description and OG tags: The meta description opens with 'The Premier Exchange for Legal Leaders' — 'Premier' is an unverifiable superlative. The brand tone guidelines explicitly prohibit unverifiable superlatives.
  - Fix: Replace 'The Premier Exchange' with a benefit-led, specific descriptor such as 'An exclusive invitation-only Exchange for senior legal and compliance leaders.'
- [minor] 2026 Sponsorship Opportunities section heading: Section heading reads '2026 SPONSORSHIP OPPORTUNITIES SOLD OUT' — this creates a potential confusion signal for prospects (why feature sold-out sponsorship prominently?) and may deter registration interest without providing a clear next-step benefit. The subheading area does offer a discovery button, but the bold 'SOLD OUT' label dominates and works against the benefit-led tone.
  - Fix: If sponsorships are genuinely sold out, reframe the heading to be forward-looking and benefit-led: e.g., 'Sponsorship for 2026 Is Now Closed — Register Interest for 2027.' If not sold out, remove the 'SOLD OUT' label.
- [minor] Footer — 'In Partnership With' section: The footer displays a 'In Partnership With LegalQ' logo treatment. There is no mention of this partnership in the brand configuration. While co-branding partners are common, the partner logo should not visually compete with or overshadow the IQPC brand logo, and clear space rules should apply to both logos.
  - Fix: Verify the LegalQ partnership is approved for this event. Ensure the IQPC logo is displayed at equal or greater visual prominence than the partner logo, with both meeting the minimum clear space requirement.

## SEO Audit — 52/100
The page has solid structural bones — a canonical, OG tags, high image-alt coverage, and event schema already present in the HTML (contradicting the deterministic flag of has_event_schema: false, but the schema contains meaningful issues). The critical gaps are a wildly over-length meta description (703 chars vs. the 150–160 ideal), a disconnected H1 that reads as a tagline rather than an event identifier, and a page title that omits dates and location, leaving searchers uncertain whether they've found the right edition. Keyword coherence is partial: 'legal tech,' 'ALSPs,' and 'corporate governance' appear in copy and metadata, but 'corporate counsel conference,' 'compliance conference USA,' and year/location signals are absent from all visible metadata.

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
- [critical] Meta description is 703 characters — roughly 4–5× the recommended 150–160 character limit. Search engines will truncate it unpredictably, the actual snippet shown in SERPs will likely be auto-generated from page copy, and the opening phrase 'The Premier Exchange for Legal Leaders' is an unverifiable superlative that conflicts with the portal tone guide.
  - Fix: Rewrite to 150–160 characters, lead with the event name and a concrete benefit, include year and location signals, and drop the superlative opener.
- [critical] H1 reads 'Checkmate, Chaos - Turning Volatility Into Your Next Strategic Advantage' — a creative tagline that contains zero event-identifying keywords. A user scanning search results or landing on this page cold cannot confirm they're on a corporate counsel or compliance event page from the H1 alone. This also creates a keyword disconnect between the H1, title tag, and meta description.
  - Fix: Place the event name or a keyword-rich variant as the H1 (e.g., 'Corporate Counsel & Compliance Exchange USA 2027 | New York'), and demote the tagline to an H2 or hero subheadline.
- [major] Title tag 'Corporate Counsel & Compliance Exchange USA' (43 chars) is within length limits but omits the year (2027) and city (New York), which are critical disambiguation signals for event searches. Users searching 'corporate counsel compliance conference New York 2027' will see no date/location match in the SERP title, reducing click-through.
  - Fix: Append year and city to the title: 'Corporate Counsel & Compliance Exchange USA 2027 | New York' (58 chars — within the 60-char limit).
- [major] The existing Event schema has several quality issues: (1) '@id' resolves to 'https://www.iqpc.com#event' rather than the canonical page URL, creating ambiguity; (2) 'startDate' and 'endDate' are '2027-07-20' / '2027-07-21' but the 'offers.validFrom' is also '2027-07-20', which implies pricing only becomes valid on the event start date — likely a data entry error; (3) duplicate sponsor and performer entries are present (e.g., Ivo, LexisNexis, Axiom, Novus Law, Mitratech, GC AI, Erskine Law, Checkbox, DocJuris, Eudia appear twice); (4) the Offer 'availability' URL points to a non-standard path instead of the schema.org InStock URI; (5) 'eventAttendanceMode' value is missing the schema.org namespace prefix ('https://schema.org/OfflineEventAttendanceMode').
  - Fix: Fix @id to match the canonical URL, correct the offers.validFrom to today's or publication date, deduplicate sponsor/performer arrays, replace the availability value with 'https://schema.org/InStock', and fully qualify the eventAttendanceMode value.
- [major] The meta keywords tag contains only 'Submission Form' — this is meaningless for SEO and suggests a template placeholder was never updated. While Google ignores meta keywords, Bing does reference them, and the value actively misleads any crawler or tool that reads it.
  - Fix: Replace the meta keywords content with a concise, comma-separated list of relevant terms: 'corporate counsel, compliance conference, legal leaders, legal tech, corporate governance, GC exchange, USA 2027'.
- [major] The OG and Twitter descriptions are identical to the overlong meta description (703 chars). Social platforms truncate OG descriptions at approximately 200 characters; the current value will be cut mid-sentence, likely at an unimpressive point in the copy.
  - Fix: Write a dedicated OG/Twitter description of 100–200 characters that leads with event identity, date, and location, suitable for social sharing cards.
- [minor] robots_meta is null — no explicit robots directive is set. While Googlebot defaults to index/follow, explicitly setting this tag is a best practice for confirming indexation intent and preventing misconfiguration during CMS template changes.
  - Fix: Add <meta name='robots' content='index, follow'> to the <head>.
- [minor] The WebSite schema block sets 'name' to 'Corporate Counsel & Compliance Exchange USA' but 'url' to 'https://www.iqpc.com' — this conflates the event microsite with the IQPC root domain, which could create entity confusion for Google's Knowledge Graph.
  - Fix: Either remove this WebSite schema block (it belongs on the root domain homepage, not an event subpage) or correct 'url' to the canonical event page URL and update 'name' to 'IQPC'.
- [minor] The body copy mentions 'legal tech,' 'outside counsel,' and 'ALSPs' as topic areas but the metadata does not reflect these terms. High-intent queries like 'legal operations conference 2027,' 'ALSP conference USA,' or 'GC compliance summit New York' would find no match in title, meta description, or H1.
  - Fix: Weave 'legal operations,' 'general counsel,' and 'ALSP' into the improved meta description and/or OG tags to align metadata with the page's actual topic depth.

**Improved metadata (ready to apply)**
- Title: Corporate Counsel & Compliance Exchange USA 2027 | New York
- Meta description: Join senior GCs and compliance leaders in New York, July 2027 for peer case studies, expert panels, and strategies on legal tech, ALSPs, and regulatory change.

## Accessibility (axe-core, deterministic)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (11 element(s), e.g. `.aos-animate.btn-primary[role="button"]`)
- **[minor]** empty-heading: Ensure headings have discernible text (4 element(s), e.g. `.home-content-1 > .container[name="Container"][data-nodelete=""] > .row > .column.col-12[name="Column"] > div[data-component="heading"][data-content="true"] > h2[name="H2"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (2 element(s), e.g. `.cta-event-date`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `.d-md-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[moderate]** region: Ensure all page content is contained by landmarks (29 element(s), e.g. `.header-container`)