# Microsite QA Report
**URL:** https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa/index
**Date:** 2026-07-22T17:29:01.774Z
**Verdict:** BLOCK — 2 critical/serious accessibility violation(s) (axe-core)
**Weighted score:** 47/100  (Design QA: 52 · Brand Compliance: 31 · SEO Audit: 62)
**vs. previous run (2026-07-22T17:09:50.682Z):** +0 points

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
The Corporate Counsel & Compliance Exchange USA microsite delivers a functionally complete event page with all required brand elements present, but exhibits a range of polish issues that collectively read as marketer-built rather than designer-built. The most pressing concerns are inconsistent button styling (brand config specifies #FF5A36 accent but rendered buttons use #0081ff), a hero CTA hierarchy that competes with itself, and notable mobile stacking breakdowns. Typography deviates from the specified Archivo/Inter stack in favour of Raleway throughout.

**Layout & grid — 4/7**
- [major] Key Themes section, desktop: The four theme cards appear at unequal widths and the rightmost card is visibly narrower than its siblings, breaking the implied grid column structure.
  - Fix: Set all four cards to equal flex or grid column widths (e.g. 25% each with consistent gap) so they form a uniform 4-column row.
- [major] Benefits of Attending / Benefits of Sponsoring section, desktop: Both benefit sections appear to render as near-empty blocks with very little visible content — they look like placeholder tombstones rather than finished components, creating an unexplained void of whitespace.
  - Fix: Ensure benefit content (bullet points or icons) is fully populated and visible; if content is intentionally hidden, collapse the section rather than leaving white space.
- [minor] Past Leaders / sponsor logo grid, desktop: Sponsor logos in the 'Past Leaders on the Board' section are arranged in rows with inconsistent horizontal alignment — some rows have 6 logos and others 5, leaving ragged right edges rather than a justified grid.
  - Fix: Use a CSS grid with auto-fill and a fixed minimum column width (e.g. `grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))`) so logos fill each row consistently.
- [minor] 2026 Sponsors section, desktop: The sponsor logos in the lower Sponsors section are split across two rows with noticeably different vertical rhythms and inconsistent vertical centering between logo sizes.
  - Fix: Normalise all sponsor logos to a fixed container height (e.g. 48px) with `object-fit: contain` and vertically center them within the row.
**Typography — 3/7**
- [major] Global — all headings and body text: The brand config specifies Archivo (headings) and Inter (body), but the CSS loads Raleway for both `--primary-font` and `--secondary-font`. No Archivo or Inter import is present in the rendered stylesheet.
  - Fix: Replace the Raleway import with Archivo for headings and Inter for body text. Update the CSS variables: `--primary-font: 'Archivo', sans-serif; --secondary-font: 'Inter', sans-serif;`.
- [major] Hero section, desktop: The subtitle/tagline text ('Checkmate, Chaos – Turning Volatility Into Your Next Strategic Advantage') appears at a size very close to the event name, reducing perceived heading hierarchy. The h1 is set to 55px and h2 to 42px — a 13px difference is insufficient to establish clear priority at these sizes.
  - Fix: Increase h1 to at least 64px (top of the brand scale) and reduce the tagline to 24px or treat it as a styled paragraph rather than a heading.
- [minor] Body copy throughout (event description, speaker bios, theme cards): Body text line-height appears to be the browser default (~1.2) in several sections, making dense paragraphs hard to read. Brand Inter body at 16px should use line-height 1.5–1.6.
  - Fix: Add a global rule `body { line-height: 1.55; }` and verify it isn't overridden in section-specific styles.
- [minor] Stats row (75 / 22 / 194 / 27 figures), desktop: The large numeral labels use an apparently different weight than their descriptor text below, but the descriptor text is extremely small (appears ~10–11px) and may fall below the 12px minimum in the brand scale.
  - Fix: Set stat descriptor text to at least 12px (the brand scale minimum) and verify rendered pixel size.
**Spacing & rhythm — 4/7**
- [major] CLE Credit badge / approval bar, desktop: The 'Approved for 10.25 CLE Credit Hours by the State Bar of New Jersey' banner sits very close to the stats row above it with less than 8px visible clearance, violating the spacing scale minimum between distinct content blocks.
  - Fix: Add at least 32px top and bottom padding to this banner to separate it from adjacent sections.
- [major] Photo Gallery section, desktop: Gallery thumbnails appear to have no visible gutter between images — they are flush or nearly flush with each other, making the grid feel compressed.
  - Fix: Add a consistent gap of 16px between gallery images, matching the brand spacing scale.
- [minor] Sponsorship Opportunities section, desktop: The 'SPONSORSHIP OPPORTUNITIES SOLD OUT' banner and the Sponsorship Opportunities description block below it share inconsistent vertical spacing — the gap above the sold-out banner is roughly double the gap below it, creating uneven rhythm.
  - Fix: Standardise vertical margins to 32px above and below each sub-section within this area.
**Visual hierarchy — 4/7**
- [major] Hero section, desktop — CTA row: Three buttons appear side-by-side in the hero ('REQUEST YOUR INVITE', 'DOWNLOAD THE GUIDE', 'SPONSORSHIP OPPORTUNITIES'), all at similar visual weight. The primary registration CTA does not stand out as the dominant action — all three compete equally for attention.
  - Fix: Make 'REQUEST YOUR INVITE' the sole high-contrast accent-colour button (#FF5A36 per brand config). Style the other two as ghost/outline buttons or secondary links so the primary CTA is unambiguously the most prominent element.
- [major] Navigation bar, desktop: The 'Register Now' button in the nav uses a blue fill (#0081ff) that does not match the brand accent (#FF5A36) and is similar in visual weight to body links, making it easy to overlook as the persistent CTA.
  - Fix: Apply the brand accent colour (#FF5A36) to the nav registration button to create consistent CTA identity across the page.
- [minor] Secure Your Place CTA band, desktop: The mid-page CTA banner ('Secure Your Place at the 2026 Exchange') uses a dark background but the button within it ('REQUEST AN INVITE') blends into the dark section rather than standing out as a strong contrast element.
  - Fix: Use the #FF5A36 accent on this button for consistency with the hero primary CTA and to ensure it reads clearly against the dark background.
**Consistency — 3/7**
- [major] Buttons — global: At least three distinct button colours are visible across the page: blue (#0081ff) in the nav and some sections, yellow/gold in the speakers area ('VIEW ALL OUR SPEAKERS'), and teal/dark in other CTAs. The brand config specifies #FF5A36 for CTAs — none of the visible buttons match this.
  - Fix: Audit all button instances and standardise: primary CTAs to #FF5A36, secondary actions to outlined/ghost style. Remove yellow and teal button variants that are not in the brand palette.
- [major] Theme cards vs. speaker cards — corner radius: The Key Themes section uses cards with visible rounded corners while the speaker headshots appear in circular crops, and the photo gallery uses square crops with no radius. Three different image treatments coexist with no apparent system.
  - Fix: Establish one corner radius token (e.g. 8px) for rectangular cards and apply it consistently. Reserve circular crops for headshots only.
- [minor] Section headings — capitalisation: Heading capitalisation is inconsistent: '2026 EXPERT SPEAKERS' is all-caps, 'Key Themes for 2026 Include:' is title case, and 'What Our Players Say' is sentence case. This reads as three different design decisions applied to equivalent-level section titles.
  - Fix: Standardise all section-level h2 headings to title case (or all-caps if preferred) and apply the style via CSS `text-transform` rather than in the HTML content.
**Responsive integrity — 4/7**
- [major] Hero section, mobile (390px): On mobile the hero text ('Corporate Counsel and Compliance Exchange USA') stacks correctly but the three CTA buttons are not stacked vertically — they appear to remain in a horizontal row that forces each button label to wrap mid-word, making them difficult to read and tap.
  - Fix: At breakpoints below 600px, stack all hero buttons vertically with `flex-direction: column` and full width (`width: 100%`) with at least 12px gap between them.
- [major] Key Themes cards, mobile: On mobile the theme cards appear to stack but each card shows truncated body text that is cut off mid-sentence, suggesting a `max-height` or `-webkit-line-clamp` is applied without a 'read more' affordance.
  - Fix: Either remove the height constraint on mobile so all body text is visible, or add an explicit 'Read more' toggle.
- [major] Past Leaders sponsor logo grid, mobile: On mobile the sponsor logos in the Past Leaders section overflow their container — some logos appear clipped at the right edge, suggesting horizontal overflow rather than proper wrapping.
  - Fix: Ensure the logo grid wraps on mobile: set `flex-wrap: wrap` or switch to a 3-column grid at mobile breakpoints.
- [minor] Navigation bar, mobile: The mobile navigation hamburger menu icon appears very small (visually estimated under 32×32px touch target) relative to the overall nav height.
  - Fix: Ensure the hamburger button has a minimum touch target of 44×44px as per iOS HIG / Material guidelines.
**Visual accessibility — 3/7**
- [critical] Hero section — text over background image: The hero features white and light-coloured text overlaid on a photographic/illustrated background (chess pieces on dark blue). While the dark background helps, the subtitle tagline text in a lighter weight at smaller size may not meet 4.5:1 contrast ratio. The axe-core report confirms 13 nodes fail contrast checks, including `.btn-primary` elements in this region.
  - Fix: Add a semi-transparent dark scrim (e.g. `background: rgba(10,37,64,0.65)`) to the hero image container to guarantee text contrast, and verify the accent-coloured CTA buttons meet 4.5:1 against their backgrounds.
- [major] Primary CTA buttons — global: The axe-core report identifies `.btn-primary` as a contrast failure. The current blue (#0081ff) on white produces approximately 3.0:1, below the WCAG AA 4.5:1 threshold for normal text. The brand-specified accent #FF5A36 on white is also borderline (~3.0:1) and would need white text only on a dark or tinted background.
  - Fix: Use #FF5A36 buttons on dark backgrounds (hero, dark bands) where the surrounding area provides implicit contrast framing. For buttons on white backgrounds, use #0A2540 (brand primary) as the button fill, which provides sufficient contrast with white text.
- [major] Secure Your Place / dark CTA band, desktop and mobile: The text inside the dark mid-page CTA band appears in a medium-grey rather than white, which at small sizes may not meet contrast requirements against the dark navy background.
  - Fix: Set all text within dark-background sections to #FFFFFF or at minimum ensure the hex value used passes 4.5:1 against the background.
- [minor] Speaker card section — speaker name links: Speaker names appear to use the `--link-color: #ffd230` (yellow) on a white card background. Yellow on white provides very low contrast (estimated ~1.5:1), making names potentially unreadable for low-vision users.
  - Fix: Change speaker name link colour on white card backgrounds to the brand primary #0A2540 or a dark enough shade to pass 4.5:1.

## Brand Compliance — 31/100
The Corporate Counsel & Compliance Exchange USA microsite serves the correct event with valid dates and location, and the required structural elements are mostly present. However, the page is built on a Raleway-based theme (--primary-font / --secondary-font: Raleway) rather than the mandated Archivo/Inter stack, and the CSS token set reveals a primary color of #0081ff and accent of #ffd230 — neither matching the brand config's #0A2540 / #FF5A36 — meaning the entire color and type system is misaligned with the brand configuration. Additionally, accent color discipline is violated with yellow (#ffd230) used broadly for section headers and decorative elements, not just CTAs, and several tone-of-voice and required-element issues exist. Missing required elements: Privacy policy link in footer.

**Required elements**
- ✓ Event name and dates in the hero — Hero clearly shows 'Corporate Counsel and Compliance Exchange USA' and 'July 21–22, 2026' in the hero band.
- ✓ Venue / location — Hero sub-line reads 'Hyatt Regency, Jersey City'; also confirmed in schema.org JSON-LD.
- ✓ Primary registration CTA above the fold — A 'REQUEST YOUR INVITE' button is visible in the hero area on both desktop and mobile screenshots.
- ✓ IQPC or portal brand logo — IQPC favicon and 'In Partnership With: Legal' logo visible in footer; IQPC logo appears in the top-left nav on desktop. However the portal-level brand identity (WorkX 2026 / Example Portal) is absent — this site appears to be a live IQPC community event rather than a WorkX portal event, which itself is a misalignment.
- ✗ MISSING Privacy policy link in footer — The footer shows 'Privacy Policy' text in the nav link strip at the very bottom of the desktop screenshot; on mobile it is too small to confirm. The link appears to exist but is rendered in extremely small type (~10–11px) well below the spacing scale minimum and is easy to miss. Treat as at-risk; verify the href is not a dead link.

**Token scan (deterministic)**
- [major] Off-palette color #212121 is used on 370 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #212529 is used on 282 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #222222 is used on 94 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #FFD230 is used on 50 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Raleway, sans-serif" is used on 1090 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Global CSS — :root variables, entire page: The site's design-token set uses --primary-color: #0081ff and --secondary-color: #ffd230, with --primary-font / --secondary-font both set to 'Raleway'. None of these match the brand config (primary #0A2540, accent #FF5A36, headings Archivo, body Inter). Every button, heading highlight, and themed UI element on the page therefore renders in off-brand colors and typefaces.
  - Fix: Update the CSS :root variables to --primary-color: #0A2540, --secondary-color / accent usage: #FF5A36, --primary-font: 'Archivo', --secondary-font: 'Inter', and add the corresponding Google Fonts import for Archivo and Inter while removing the Raleway import.
- [critical] Hero section — event name / portal alignment: The brand configuration names this portal 'WorkX 2026', but the entire microsite is branded as 'Corporate Counsel & Compliance Exchange USA' with no WorkX portal identity present. If the brand config is the authoritative source of truth, the portal wrapper identity is completely missing.
  - Fix: Confirm with the brand owner whether this event lives under the WorkX 2026 portal. If so, add the WorkX 2026 portal logo to the nav and co-brand the hero. If this is a standalone IQPC community event, update the brand configuration to reflect the correct portal.
- [major] Section headings throughout the page (e.g., '2026 Expert Speakers', 'Key Themes for 2026', sponsors section): The yellow/gold accent color (#ffd230) is used on multiple section headings and decorative underlines as a general styling device, not restricted to CTAs and key highlights as required by the brand config. This dilutes accent-color discipline across the entire page.
  - Fix: Remove the yellow accent from section headings and decorative rules. Use the primary color (#0A2540) for headings on light backgrounds. Reserve #FF5A36 (corrected accent) exclusively for CTA buttons and one or two critical stat highlights.
- [major] Hero — logo placement over imagery: The event logo / circular emblem in the hero is placed directly over the dark-blue chess-piece background image. While a dark scrim exists, the event logomark appears without a clear-space buffer — other content (tagline text, date, CTA buttons) crowds into the logo's minimum clear-space zone (should equal the height of the logomark on all sides).
  - Fix: Add padding or margin around the event logomark equal to its own height on all four sides before any adjacent text or buttons begin. On mobile the logo and headline text appear to overlap; this must be resolved.
- [major] Meta description and OG description — 'The Premier Exchange for Legal Leaders': The phrase 'The Premier Exchange' is an unverifiable superlative. The brand config explicitly forbids unverifiable superlatives in copy. This appears in the meta description, OG description, and Twitter description tags.
  - Fix: Replace 'The Premier Exchange for Legal Leaders' with a specific, verifiable benefit statement such as 'An Invitation-Only Exchange for Senior Legal and Compliance Leaders' or similar.
- [major] Sponsorship section — 'SPONSORSHIP OPPORTUNITIES SOLD OUT': Immediately below the sold-out banner, a 'Sponsorship Opportunities' content block continues to describe sponsorship benefits as if they are available. This creates a contradictory message that is confusing and undermines credibility. The brand tone requirement is benefit-led and professional; contradictory calls-to-action are not coherent.
  - Fix: If sponsorship is genuinely sold out, remove the descriptive sponsorship benefits copy and CTA below the banner, or replace with a waitlist prompt. If future editions are being solicited, clearly label it 'Sponsorship for Future Events'.
- [minor] Footer — Privacy Policy link: The Privacy Policy link is present but rendered at approximately 10–11px, below the brand typography scale minimum of 12px and difficult to read, particularly on mobile. Legal links must be legible.
  - Fix: Set the footer legal link font-size to a minimum of 12px (the smallest value in the brand scale) and ensure sufficient contrast against the footer background.
- [minor] Key Themes section — theme card imagery: The four theme cards use event photography with yellow color-overlay tints applied. The yellow tint is a secondary color misuse (should be reserved for accents/CTAs) and the overlay does not provide sufficient contrast for the white text labels on some cards, creating a readability concern.
  - Fix: Replace the yellow tint overlay with the primary color (#0A2540) at 60–70% opacity, which provides better contrast for white text and aligns with brand color usage.
- [minor] Speakers section — 'VIEW ALL 2026 SPEAKERS' CTA button: This secondary CTA button uses the yellow/gold fill color, which per brand config should be reserved for the accent (#FF5A36) and applied to primary CTAs only. Secondary CTAs should be outlined or use the primary color.
  - Fix: Change the 'View All Speakers' button to either a primary-outlined style (border: 2px solid #0A2540, transparent background, #0A2540 text) or use the corrected accent #FF5A36 only if this is considered a key highlight CTA.

## SEO Audit — 62/100
The deterministic check flagged 'has_event_schema: false', but the rendered HTML confirms a well-formed schema.org Event JSON-LD block is actually present and populated with dates (2026-07-21/22), venue (Hyatt Regency, Jersey City, NJ), pricing ($499), organizer, sponsors, and performers — so the schema gap is resolved. The more pressing qualitative issues are: (1) the H1 ('Checkmate, Chaos - Turning Volatility Into Your Next Strategic Advantage') is a creative tagline with zero keyword signal for someone searching for a corporate counsel or compliance conference, creating a hard disconnect from the title/meta; (2) the meta description is 703 characters — roughly 4× the rendered snippet limit — meaning Google will truncate it arbitrarily and the crafted value proposition is lost; (3) keyword coherence is weak because 'legal tech', 'ALSPs', 'outside counsel', 'corporate governance', and 'regulatory compliance conference' appear in the meta but not in or around the H1, so crawlers see misaligned intent signals across the page's most authoritative text nodes.

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
- [critical] H1 reads 'Checkmate, Chaos - Turning Volatility Into Your Next Strategic Advantage' — a creative tagline that contains none of the event's primary keywords (corporate counsel, compliance, legal leaders, exchange, USA). A user searching 'corporate counsel compliance conference 2026' or 'legal compliance exchange USA' sees no topical match in the most authoritative on-page signal.
  - Fix: Rewrite the H1 to lead with the event name or a close keyword variant, then optionally append the tagline as a styled subheading (H2/P). Example: 'Corporate Counsel & Compliance Exchange USA 2026 | July 21–22, Jersey City'. The tagline can live directly beneath as a visual subhead without carrying H1 weight.
- [critical] The meta description is 703 characters — well above the ~155-character rendered-snippet threshold. Google will truncate after roughly the first sentence, cutting off all specifics about legal tech, ALSPs, case studies, and regulatory focus. The opening phrase 'The Premier Exchange for Legal Leaders' also uses an unverifiable superlative ('Premier') inconsistent with the portal's tone guidelines.
  - Fix: Condense to 150–160 characters, front-loading the most searchable facts: event name, audience, topic, date, and location. Drop the superlative or replace with a factual qualifier.
- [major] Both social tags mirror the overlong meta description verbatim. Social platforms also truncate long descriptions, and the wall of text will not render well in link previews on LinkedIn (the primary channel for this audience).
  - Fix: Write a dedicated OG/Twitter description capped at ~200 characters that leads with audience benefit, event dates, and location — distinct from but consistent with the trimmed meta description.
- [major] Title tag 'Corporate Counsel & Compliance Exchange USA' (43 chars) omits the year and location, both of which are primary search qualifiers for event queries. Users searching '2026' or 'New Jersey' cannot confirm relevance from the SERP title alone.
  - Fix: Append the year and abbreviated location within the 60-character limit.
- [major] The Event schema location block has empty streetAddress and postalCode fields for Hyatt Regency Jersey City, and the venue URL is also empty. Incomplete address data reduces eligibility for Google's rich event results (which require at minimum addressLocality and addressRegion, ideally streetAddress).
  - Fix: Populate streetAddress (2 Exchange Place, Jersey City) and postalCode (07302) from publicly available venue data, and add the venue URL (e.g. https://www.hyatt.com/hyatt-regency/en-US/ewrjc-hyatt-regency-jersey-city).
- [major] Several sponsors (Ivo, LexisNexis, Axiom, Novus Law, Mitratech, GC AI, Erskine Law, Checkbox, DocJuris, Eudia, Spellbook) and at least one performer ('test test') appear twice in their respective arrays. The 'test test' performer entry is almost certainly a data artefact that should be removed before publish.
  - Fix: De-duplicate all sponsor and performer arrays programmatically before rendering the JSON-LD. Remove the 'test test' performer entry immediately.
- [minor] The keywords meta tag value is 'Submission Form' — a form label, not topical keywords. While Google ignores this tag for ranking, Bing gives it marginal weight and it creates a confusing signal if audited.
  - Fix: Either remove the keywords meta tag entirely or populate it with 3–5 relevant terms: e.g. 'corporate counsel conference, compliance exchange, legal tech, in-house legal leaders, regulatory compliance 2026'.
- [minor] robots_meta is null — no explicit robots directive is set. For a pre-publish page this is ambiguous; if the page is live it should have 'index, follow' declared explicitly to signal intent and avoid any upstream default misconfigurations.
  - Fix: Add <meta name='robots' content='index, follow'> to the head.
- [minor] The WebSite schema block sets 'name' to 'Corporate Counsel & Compliance Exchange USA' but 'url' to 'https://www.iqpc.com' — the root IQPC domain, not the event URL. This conflates the event brand with the parent site and will confuse structured-data parsers.
  - Fix: Either remove this WebSite block (the Organisation schema already covers the IQPC brand) or correct the 'url' to match the canonical event URL and use the IQPC root only in the Organisation block.

**Improved metadata (ready to apply)**
- Title: Corporate Counsel & Compliance Exchange USA 2026 | NJ
- Meta description: Join senior corporate counsel and compliance leaders in Jersey City, July 21–22 2026, for case studies, expert panels, and legal tech sessions at this practitioner-led exchange.

## Accessibility (axe-core, deterministic)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (13 element(s), e.g. `.aos-animate.btn-primary[role="button"]`)
- **[minor]** empty-heading: Ensure headings have discernible text (4 element(s), e.g. `.home-content-1 > .container[name="Container"][data-nodelete=""] > .row > .column.col-12[name="Column"] > div[data-component="heading"][data-content="true"] > h2[name="H2"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (3 element(s), e.g. `.cta-event-date`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `.d-md-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[moderate]** region: Ensure all page content is contained by landmarks (31 element(s), e.g. `.header-container`)