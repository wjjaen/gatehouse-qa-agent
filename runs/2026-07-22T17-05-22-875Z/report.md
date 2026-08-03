# Microsite QA Report
**URL:** https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa/index
**Date:** 2026-07-22T17:09:50.686Z
**Verdict:** BLOCK — 1 critical conversion issue(s): NO_REGISTRATION_CTA
**Weighted score:** 47/100  (Design QA: 52 · Brand Compliance: 31 · SEO Audit: 62)

## Conversion instrumentation (deterministic)
- Analytics detected: GA4 / Google Tag Manager, LinkedIn Insight Tag
- Missing: Meta Pixel
- Registration CTAs found: 0
- UTM propagation: not_tested
- **[major]** MISSING_PIXEL: Meta Pixel not detected — conversions from this page cannot be measured/attributed for that channel.
- **[critical]** NO_REGISTRATION_CTA: No registration/booking call-to-action was found on the page. The primary conversion path is missing.

## Performance
- Skipped via --skip-perf

## Design QA — 52/100
The Corporate Counsel & Compliance Exchange USA microsite communicates the core event proposition and contains most required elements, but suffers from systemic brand-config drift (Raleway instead of Archivo/Inter, blue/yellow palette instead of #0A2540/#FF5A36), inconsistent component styling across sections, and a visually overloaded mid-page that dilutes the primary CTA. Mobile stacking is functional but rough, and several spacing and hierarchy issues reduce the professional impression below what the target C-suite audience would expect.

**Layout & grid — 4/7**
- [major] Key Themes section, desktop — four theme cards: The four dark-background theme cards appear to use unequal widths and inconsistent bottom-edge alignment; the rightmost card sits noticeably lower than its siblings, breaking grid cohesion.
  - Fix: Force all four cards to equal height using CSS flexbox (align-items: stretch) and ensure they share a common bottom edge within the row.
- [major] Past Leaders logo grid, desktop: Sponsor/past-leader logos are displayed at highly variable sizes with no consistent bounding box; some logos appear roughly 3× taller than others, producing a chaotic grid that looks unfinished.
  - Fix: Constrain each logo cell to a fixed height (e.g. 48px) with max-width and object-fit: contain so all marks are optically comparable in weight.
- [minor] Benefits of Attending / Benefits of Sponsoring section, desktop: The two column headers appear at the correct level but the content beneath them is invisible or nearly empty in the screenshot — the section reads as an unintentional void, suggesting content failed to render or was left as a placeholder.
  - Fix: Verify that the benefits copy is published and visible before launch; if the section is intentionally empty, remove it from the page.
- [minor] Footer, desktop: The 'In Partnership With: LegalQ' logo and QUESTIONS block appear misaligned relative to the central footer columns — the left element sits noticeably lower than the right-hand links.
  - Fix: Align footer columns to the same vertical baseline using flexbox align-items: flex-start on the footer row container.
**Typography — 3/7**
- [critical] Global — all headings and body text: The page loads Raleway (declared in the dynamic CSS :root) for both heading and body roles. The brand config specifies Archivo for headings and Inter for body. This is a complete brand font mismatch affecting the entire page.
  - Fix: Replace `--primary-font` and `--secondary-font` with 'Archivo, sans-serif' and 'Inter, sans-serif' respectively in the :root CSS block, and import both families from Google Fonts.
- [major] Stat bar (75 / 22 / 194 / 27), desktop: The large numeral size and the label text beneath each stat appear to use two sizes that are inconsistent with the declared type scale; labels are very small and nearly unreadable at the rendered zoom level, suggesting a size below 12px.
  - Fix: Set stat labels to at minimum 14px (brand scale) and ensure numerals use a scale step (32px or 24px) that is proportional and legible.
- [major] Key Themes cards, desktop: Card body text over dark backgrounds appears to be rendered in a very small size (visually below 12px at the rendered width), making it illegible without zooming.
  - Fix: Set card body text to a minimum of 14px and verify line-height is at least 1.5 for readability over dark backgrounds.
- [minor] Navigation bar, desktop: Nav link text appears to use a heavier weight than body text but a smaller size than expected for a nav, resulting in an indistinct visual treatment that does not clearly signal interactivity.
  - Fix: Set nav links to 14px / font-weight 600 with sufficient letter-spacing (0.02em) to distinguish them from paragraph text.
**Spacing & rhythm — 4/7**
- [major] Sponsorship Opportunities section, desktop: The 'SPONSORSHIP OPPORTUNITIES SOLD OUT' banner and the Sponsorship Opportunities copy block immediately below it have no visible vertical separation, causing them to read as a single undifferentiated block. The proximity principle is violated — two distinct messages appear as one.
  - Fix: Add a minimum 32px top margin to the Sponsorship Opportunities copy block to visually separate it from the sold-out banner.
- [major] 2026 Sponsors section, desktop: Sponsor logo rows have inconsistent vertical gaps between logo rows — some rows are tightly packed while others have large gaps — creating an uneven rhythm.
  - Fix: Apply a uniform gap (e.g. 24px row gap) to the sponsor logo flex/grid container.
- [minor] Hero section CTA button row, desktop: The three hero CTAs ('Request Your Invite', 'Join Our Email Registry', 'Sponsorship Opportunities') are spaced with unequal horizontal gaps, and the middle button appears to have a different top padding making it sit slightly lower.
  - Fix: Wrap all three CTAs in a flex container with gap: 16px and align-items: center to normalize spacing and vertical alignment.
**Visual hierarchy — 3/7**
- [critical] Hero section, desktop and mobile: Per the automated conversion instrumentation report, no registration/booking CTA was detected by the instrumentation layer. Visually, the hero contains three similarly-weighted buttons ('Request Your Invite', 'Join Our Email Registry', 'Sponsorship Opportunities') with no single dominant primary action — all three appear at near-equal visual weight, making it unclear which is the conversion CTA. The brand accent color (#FF5A36) is not used; instead, all CTAs render in the site's blue (#0081ff), further reducing differentiation.
  - Fix: Designate 'Request Your Invite' as the single primary CTA, style it with the brand accent (#FF5A36) at a larger size, and demote the other two to ghost/secondary button style.
- [major] Mid-page — multiple competing section headers, desktop: Section headings throughout the page ('2026 Expert Speakers', 'Key Themes for 2026 Include', 'Past Leaders on the Board', 'What Our Players Say', 'Sponsorship Opportunities', '2026 Sponsors') all render at similar visual weights with similar styling, creating a flat hierarchy where no section feels more important than another and the eye has no clear path.
  - Fix: Establish a visible typographic tier: primary sections use the full 48px heading, secondary sections use 32px, with color or spacing cues to distinguish tier levels.
- [major] 'Secure Your Place' CTA band, desktop: The mid-page 'Secure Your Place at the 2026 Exchange' CTA band contains a 'Request an Invite' button, but it uses the same visual style as informational buttons elsewhere — no accent color, no elevated padding — so it does not read as a conversion moment.
  - Fix: Apply the accent color (#FF5A36) to this button and increase its padding to 14px 28px to signal it is actionable.
- [minor] Stat bar section, desktop: The CLE credit accreditation badge (Corporate Counsel and Compliance Exchange logo + 'Approved for 10.25 CLE Credit Hours') is placed inline with the stats at equal prominence, competing with and visually diluting the key numerical proof points.
  - Fix: Move the CLE badge to a separate sub-row below the stats or reduce its visual footprint (smaller font, lighter weight) so the four stats read as primary.
**Consistency — 3/7**
- [critical] Global — brand color usage: The page uses #0081ff (primary) and #ffd230 (secondary) throughout — buttons, accents, and highlights — instead of the brand-specified #0A2540 (primary) and #FF5A36 (accent). This is a complete palette mismatch affecting every interactive and highlight element on the page.
  - Fix: Update the CSS :root variables to match brand config: --primary-color: #0A2540; --accent-color: #FF5A36; and replace all button accent uses with #FF5A36.
- [major] Button styles — hero vs. mid-page vs. sponsor section: Buttons appear in at least three distinct visual treatments: filled blue (hero), filled yellow-gold (mid-page 'View All Speakers'), and outlined white (hero secondary). There is no consistent button system — the same action type (secondary CTA) is rendered differently in different sections.
  - Fix: Define and enforce two button classes: .btn-primary (accent fill) and .btn-secondary (outlined, dark stroke) and apply them consistently across all sections.
- [major] Speaker cards vs. theme cards vs. sponsor logos — corner radius treatment: Speaker headshots appear to use a circular crop, theme card images have no visible radius, and sponsor logos have varying treatments. Image corner radius is not unified across components.
  - Fix: Establish a single corner radius token (e.g. 8px for rectangular images, 50% only for deliberate avatar/headshot contexts) and apply it consistently.
- [minor] Section background alternation, desktop: Background colors alternate inconsistently: white, light grey, dark blue, white, grey, dark blue, white — without a clear pattern, making the page feel visually restless rather than intentionally rhythmic.
  - Fix: Reduce to two alternating backgrounds (white and a single light grey, e.g. #F5F7FA) with dark-background used only for one deliberate hero or CTA moment.
**Responsive integrity — 4/7**
- [major] Key Themes section, mobile (390px): On mobile, the four theme cards stack vertically but each card shows a large image followed by dense small text — the cards are very tall individually and the section requires excessive scrolling without a 'show more' affordance or condensed layout.
  - Fix: On mobile, collapse theme cards to show only the image and title by default, with an expand toggle, or limit to two visible cards with a horizontal scroll.
- [major] Past Leaders logo grid, mobile: On mobile the logo grid becomes a narrow multi-row grid where logos at different scales appear even more inconsistent than on desktop, and some logos appear to overflow their cells or nearly touch neighboring logos.
  - Fix: On mobile, limit the logo grid to 3 columns with consistent cell size and increased cell padding.
- [major] Hero section, mobile: On mobile, the hero text ('Corporate Counsel and Compliance Exchange USA' and subtitle) stacks above the chess-piece background image, but the headline font size appears very large relative to the 390px viewport — the event name likely wraps to 5–6 lines, pushing date/location and CTAs well below the fold with no visible CTA above fold.
  - Fix: Reduce hero headline to 28–32px on mobile and ensure at least one CTA button is visible without scrolling.
- [minor] Navigation bar, mobile: The mobile navigation hamburger icon is visible but the logo and IQPC wordmark appear very small (below 24px height) making the brand mark nearly invisible on the narrow viewport.
  - Fix: Ensure the mobile nav logo renders at a minimum height of 32px.
**Visual accessibility — 3/7**
- [critical] Hero section — text over background image: The event name and subtitle text in the hero are rendered over a photographic/illustrative background (chess pieces and dark overlay). While a dark overlay is partially visible, the automated axe-core scan flagged 13 nodes with color-contrast failures including .btn-primary elements. Visually, the yellow-gold secondary CTA text on a mid-tone background appears below the 4.5:1 AA threshold.
  - Fix: Add a semi-transparent scrim (rgba(10,37,64,0.65)) behind the hero text block and ensure all CTA buttons meet 4.5:1 contrast. Specifically test the yellow/white button treatment.
- [major] Key Themes cards — body text on dark background: Card body text on the dark-background theme cards appears at very small size over a dark navy/black background. Even if color contrast is technically passing, the combination of small size and low visual weight reduces effective readability significantly.
  - Fix: Increase card body text to 14px minimum and ensure it is pure white (#FFFFFF) over the dark card background.
- [major] Global — interactive element affordances: Links styled in #ffd230 (yellow-gold) on a white background do not meet the 4.5:1 contrast ratio for normal text (estimated ratio approximately 1.9:1 against white). This affects inline links throughout body copy sections.
  - Fix: Change the --link-color to a darker accessible value. On white backgrounds, use #0A2540 or the brand accent #FF5A36 (which achieves approximately 3.4:1 — acceptable for large/bold text) or darken the link to #C44400 for AA compliance on normal text.
- [major] Images — missing alt text (axe-core: image-alt, 1 node): At least one image element (.d-md-block) has no alt text, which fails WCAG 1.1.1 and was flagged as critical by the automated scan. Visually this is a desktop-only image, likely decorative or the event venue photo.
  - Fix: Add descriptive alt text to all meaningful images; add alt='' to purely decorative images.
- [minor] Stat bar section — information conveyed by color only: The four statistics use color (blue numerals) to draw attention, with no secondary visual treatment (size, weight, or enclosure) that would communicate the same distinction to a color-blind user. The icon treatment above each stat is small and may not compensate.
  - Fix: Ensure the numeral size (32px+) and font-weight (800) alone communicate emphasis without relying solely on the blue color.

## Brand Compliance — 31/100
The Corporate Counsel & Compliance Exchange USA microsite is for a real IQPC event but is being reviewed against the WorkX 2026 brand configuration. As a result, virtually every brand token — primary color, accent color, font stack, logo, and tone conventions — diverges from the configured standard. The required-elements checklist is mostly satisfied at a functional level, but the privacy policy link in the footer could not be confirmed visible, and the page's tone contains at least one unverifiable superlative ('Premier Exchange'). The accent-color discipline and logo placement rules from the brand config are not being followed. Missing required elements: Privacy policy link in footer.

**Required elements**
- ✓ Event name and dates in the hero — Hero displays 'Corporate Counsel and Compliance Exchange USA' and 'July 21-22, 2026' clearly above the fold on both desktop and mobile.
- ✓ Venue / location — Hero copy reads 'Hyatt Regency, Jersey City' and this is confirmed in the structured data as well.
- ✓ Primary registration CTA above the fold — A 'Request Your Invite' button and a gold 'Join Our Waitlist' button are both visible in the hero area above the fold on desktop. On mobile the CTA is present but sits below a large text block, reducing above-the-fold visibility.
- ✓ IQPC or portal brand logo — IQPC logo appears in the top navigation bar and in the footer 'In Partnership With' section on desktop. Confirmed via favicon and structured data logo references.
- ✗ MISSING Privacy policy link in footer — The footer area shows 'IQPC Terms Privacy Policy' text in the far bottom strip at very small size on desktop, but on the mobile screenshot this area is not legibly visible and cannot be confirmed as a functional link. Requires verification that it is a live anchor tag and not plain text.

**Token scan (deterministic)**
- [major] Off-palette color #212121 is used on 370 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #212529 is used on 282 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #222222 is used on 94 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #FFD230 is used on 50 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Raleway, sans-serif" is used on 1090 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Entire page — CSS variables and button styles: The page's primary color is set to #0081ff (CSS variable --primary-color) and secondary/accent to #ffd230, neither of which matches the brand config primary (#0A2540) or accent (#FF5A36). The event microsite is entirely styled in a blue/gold scheme unrelated to the configured WorkX 2026 brand.
  - Fix: Update CSS root variables --primary-color to #0A2540 and --secondary-color / accent to #FF5A36. Audit all hard-coded hex values in inline styles and component CSS to align with the brand palette.
- [critical] Entire page — font stack: The page loads Raleway as both primary and secondary font (--primary-font and --secondary-font both set to 'Raleway'). The brand config mandates Archivo for headings and Inter for body copy. Raleway is not a permitted typeface.
  - Fix: Replace the Google Fonts import for Raleway with imports for Archivo and Inter. Update --primary-font to 'Archivo' and --secondary-font to 'Inter'.
- [critical] Page meta description and hero subheading: The copy uses 'The Premier Exchange for Legal Leaders' — an unverifiable superlative ('Premier') that directly violates the brand tone rule prohibiting unverifiable superlatives.
  - Fix: Replace 'The Premier Exchange' with a specific, verifiable benefit-led descriptor, for example: 'The Invitation-Only Exchange for Senior Legal Leaders' or 'A Curated Exchange for Corporate Counsel and Compliance Officers'.
- [major] Hero section — accent color usage: The gold/yellow color (#ffd230) is used as a CTA button background ('Join Our Waitlist') and as decorative heading highlights. Under the brand config, accent (#FF5A36) is reserved for CTAs and key highlights only — non-CTA decorative use of any accent-class color dilutes the visual hierarchy. Additionally the wrong accent hue is in use.
  - Fix: Limit accent color use strictly to primary CTA buttons and one or two key stat highlights. Remove gold from decorative text treatments and section dividers. Switch hue to #FF5A36.
- [major] Hero — primary logo on dark background: The Corporate Counsel & Compliance Exchange USA event logo (white circular mark with white text) is placed directly over a dark photographic hero image without a scrim or sufficient clear space padding. The IQPC logo in the nav bar appears to be a dark version on a dark navy bar, which may not meet the 'reversed logo on dark' rule if the reversed variant is not being used correctly.
  - Fix: Add a semi-transparent dark scrim (minimum 40% opacity overlay) behind the event logo in the hero if it must sit over photography. Confirm the nav bar logo is the official reversed (white) variant, not a recolored version. Verify clear space equal to the logomark height exists on all four sides.
- [major] Key Themes section — image cards: The four theme cards use dark navy image overlays with yellow/gold text labels on top of photographic imagery. Text is placed directly over unscrimmed or minimally scrimmed photography, making the logo/text legibility inconsistent and violating the brand rule against placing brand elements over busy imagery without a scrim.
  - Fix: Apply a consistent gradient scrim (e.g. linear-gradient from rgba(10,37,64,0.7) to transparent) over each card image before rendering text, ensuring WCAG AA contrast for all overlaid copy.
- [major] Mobile hero — registration CTA placement: On the 390px mobile viewport, the primary 'Request Your Invite' CTA button is pushed below a dense text block and the event logo, meaning it is not above the fold on most mobile devices. The brand config requires the primary registration CTA above the fold.
  - Fix: On mobile breakpoints, move the primary CTA button immediately below the event name and date line, before the body copy paragraph, so it is visible without scrolling.
- [minor] Footer — privacy policy link: The privacy policy text in the footer is rendered at very small size (approximately 11–12px based on visual inspection) and appears in a low-contrast grey-on-dark strip. It may not be a functional hyperlink in all rendered states, and its discoverability is very low.
  - Fix: Ensure the privacy policy is a clearly styled anchor tag with sufficient contrast (WCAG AA minimum 4.5:1), sized at minimum 14px, and labelled explicitly as 'Privacy Policy'.
- [minor] Sponsorship section heading: '2026 SPONSORSHIP OPPORTUNITIES SOLD OUT' is rendered in all-caps with a yellow/gold background band. All-caps shouting combined with a high-contrast color band edges toward exclamation-mark-stacking energy that the brand tone prohibits ('professional, energetic — no exclamation-mark stacking').
  - Fix: Convert to sentence case or title case: '2026 Sponsorship Opportunities — Sold Out'. Retain the color band but reduce visual aggression with softer weight or a neutral container.

## SEO Audit — 62/100
The page has substantial structural assets — event schema is actually present in the HTML (contrary to the deterministic flag), dates, venue, speakers, and sponsors are populated — but the metadata strategy undermines discoverability. The meta description wildly exceeds the 160-character limit at 703 characters, meaning Google will truncate and rewrite it arbitrarily. The title tag is generically descriptive but misses date/year signals that high-intent searchers use, and the H1 ('Checkmate, Chaos - Turning Volatility Into Your Next Strategic Advantage') is a themed marketing tagline with zero keyword overlap with the title, meta, or likely search queries — creating a three-way coherence gap between the page's primary SEO signals. The keywords meta tag contains only 'Submission Form', which is meaningless and potentially harmful to topical clarity.

**Structural checks (deterministic)**
- Title: "Corporate Counsel & Compliance Exchange USA" (43 chars)
- Meta description: 703 chars
- Open Graph: ✓ complete enough for share cards
- Canonical: ✓ · Viewport: ✓ · Robots: —
- H1 count: 1 · Image alt coverage: 97% of 116
- Event structured data (JSON-LD): ✗ MISSING — generated below

**Findings**
- [minor] Meta description is 703 chars (will truncate).
  - Fix: Trim to ≤160 characters.
- [major] No schema.org Event structured data (JSON-LD) — the page cannot earn event rich results in Google.
  - Fix: Add Event JSON-LD with name, dates, location, organizer, and offers.
- [critical] Meta description is 703 characters — more than 4× the recommended 150–160 character limit. Google will truncate it to an arbitrary snippet, destroying click-through messaging. The opening line 'The Premier Exchange for Legal Leaders' is an unverifiable superlative that conflicts with the portal brand tone guide.
  - Fix: Rewrite to a single sentence of 150–160 characters that leads with the primary keyword, states the event name, dates, location, and a concrete benefit. Remove the superlative opener.
- [critical] H1 reads 'Checkmate, Chaos - Turning Volatility Into Your Next Strategic Advantage' — a thematic tagline with no keyword overlap with the page title, meta description, or any likely search query (e.g. 'corporate counsel conference 2026', 'compliance exchange USA', 'legal leaders event'). Crawlers weight H1 heavily; this disconnect suppresses topical relevance signals.
  - Fix: Either (a) make the H1 the event name with year appended — 'Corporate Counsel & Compliance Exchange USA 2026' — and demote the tagline to an H2 or styled subhead, or (b) retain the tagline as a visual hero element rendered in non-heading markup and inject a visually hidden or above-fold H1 containing the event name.
- [critical] The keywords meta tag contains only 'Submission Form', which is the name of an internal form module — not a topical keyword. While Google ignores keywords meta, Bing and other crawlers may read it, and it reveals a data-pipeline error where a CMS field defaulted to a system value.
  - Fix: Populate with 5–8 relevant keywords or remove the tag entirely. Suggested values: corporate counsel conference, compliance exchange USA, legal leaders summit, legal tech, GC conference 2026, corporate governance event, ALSPs, outside counsel strategy.
- [major] Title 'Corporate Counsel & Compliance Exchange USA' (43 chars) lacks the year (2026) and any geo qualifier. Users searching for the specific edition of this annual event will include '2026' in their query; omitting it reduces relevance matching and makes the title indistinguishable from previous years' pages.
  - Fix: Append year and optionally a short location signal: 'Corporate Counsel & Compliance Exchange USA 2026' (49 chars) or 'Corporate Counsel & Compliance Exchange USA 2026 | IQPC' (55 chars).
- [major] OG and Twitter titles mirror the bare page title without year or a social engagement hook. Social shares that surface via news aggregators or LinkedIn will not communicate when the event is.
  - Fix: Update to match improved title or use a short benefit-led variant: 'Corporate Counsel & Compliance Exchange USA — July 2026, Jersey City'.
- [major] og:site_name is set to 'Corporate Counsel & Compliance Exchange USA' (the event name) rather than the portal brand 'IQPC'. This incorrectly identifies the owning site and breaks brand consistency across social previews and knowledge panels.
  - Fix: Set og:site_name to 'IQPC' to correctly represent the publishing portal.
- [major] Multiple sponsors appear duplicated in the schema (e.g. Ivo, LexisNexis, Axiom, Novus Law, Mitratech, GC AI, Erskine Law, Checkbox, DocJuris, Eudia, Spellbook each appear twice). Duplicate nodes bloat the schema payload and may trigger Google's structured data quality filters.
  - Fix: De-duplicate the sponsor array so each organisation appears exactly once. Also, two Axiom entries have an empty 'url' string — replace with null or a valid URL.
- [major] The performers array contains {"@type":"Person","name":"test test","url":""} — an obvious QA artefact that will be visible to Google's Rich Results crawler and could trigger a manual quality review of the structured data.
  - Fix: Remove the 'test test' Person entry from the performers array before publishing.
- [major] The nested Offer's 'availability' property is set to 'https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa/InStock' — a constructed URL that does not resolve and is not a schema.org Availability enumeration value.
  - Fix: Replace with the correct schema.org enumeration: 'https://schema.org/InStock'.
- [minor] The Place address has empty strings for streetAddress, postalCode, and telephone. Empty strings are noisier than omitting the properties and may cause validation warnings in Google's Rich Results Test.
  - Fix: Remove empty-string address sub-properties or populate them with real values. The Hyatt Regency Jersey City's street address is publicly available.
- [minor] The Event @id is 'https://www.iqpc.com#event' — a site-level fragment rather than a page-specific IRI. If IQPC hosts multiple events, this @id will collide across pages, breaking graph disambiguation.
  - Fix: Use the canonical event URL as the @id: 'https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa#event'.
- [minor] No robots meta tag is present (deterministic check confirmed null). While the canonical is set correctly, an explicit 'index, follow' robots directive is best practice for a public event page.
  - Fix: Add <meta name='robots' content='index, follow'> to the <head>.
- [minor] The body copy visible in metadata references 'legal tech', 'outside counsel', and 'ALSPs' as topics but does not surface specific session themes, agenda tracks, or learning outcomes in indexable above-fold text. Searchers with informational intent (e.g. 'what topics are covered at corporate counsel conferences') will not find keyword-rich content to validate relevance before clicking.
  - Fix: Ensure that at least one above-fold text block (not gated behind JavaScript rendering) lists 3–5 specific agenda themes using natural language that mirrors search queries (e.g. 'AI in legal operations', 'outside counsel management', 'regulatory compliance strategy 2026').

**Improved metadata (ready to apply)**
- Title: Corporate Counsel & Compliance Exchange USA 2026 | IQPC
- Meta description: Join GCs and compliance leaders at the Corporate Counsel & Compliance Exchange USA, July 21–22 2026, Jersey City NJ. Case studies on legal tech, ALSPs, and regulatory strategy.

## Accessibility (axe-core, deterministic)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (13 element(s), e.g. `.aos-animate.btn-primary[role="button"]`)
- **[minor]** empty-heading: Ensure headings have discernible text (4 element(s), e.g. `.home-content-1 > .container[name="Container"][data-nodelete=""] > .row > .column.col-12[name="Column"] > div[data-component="heading"][data-content="true"] > h2[name="H2"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (3 element(s), e.g. `.cta-event-date`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `.d-md-block`)
- **[moderate]** landmark-no-duplicate-contentinfo: Ensure the document has at most one contentinfo landmark (1 element(s), e.g. `.active[data-testimonial-item=""][data-interval="6000"] > .content.w-100.flex-column > footer`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (2 element(s), e.g. `.portal-navigation`)
- **[moderate]** region: Ensure all page content is contained by landmarks (31 element(s), e.g. `.header-container`)