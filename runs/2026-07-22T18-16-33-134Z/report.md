# Microsite QA Report
**URL:** https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa/index
**Date:** 2026-07-22T18:20:49.144Z
**Verdict:** BLOCK — 2 critical/serious accessibility violation(s) (axe-core)
**Weighted score:** 47/100  (Design QA: 52 · Brand Compliance: 31 · SEO Audit: 61)
**vs. previous run (2026-07-22T17:29:01.771Z):** +0 points

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
The Corporate Counsel & Compliance Exchange USA microsite communicates the essential event information and has a recognisable brand identity, but falls short of professional standards across several axes. The most pressing issues are inconsistent button colours that deviate from brand config, a fragmented mobile experience with stacking and contrast problems, and a lack of typographic discipline (Raleway is used instead of the specified Archivo/Inter pair). With targeted fixes the page could reach a publishable standard, but as-is it reads as marketer-built rather than designer-built.

**Layout & grid — 4/7**
- [major] Stats row (desktop, between hero and speakers section): The four stat blocks (75, 22, 194, 27) appear to use unequal column widths, with the fourth stat visually narrower and its label wrapping differently to the others, breaking the grid rhythm.
  - Fix: Constrain all four stat items to equal Bootstrap col-3 (or CSS grid fr) columns with a shared max-width so numbers, labels, and supporting text align on the same baseline.
- [major] Sponsorship Opportunities section, desktop: The 'Sponsorship Opportunities' text block and the adjacent image sit at different vertical baselines with visible unequal left/right padding, making the two-column layout look misaligned rather than intentional.
  - Fix: Use a Bootstrap row with align-items-center on the parent and equal col-md-6 children, ensuring both columns share the same vertical midpoint.
- [minor] Past Leaders logo cloud, desktop: Sponsor/past-leader logos wrap onto multiple rows but rows are not evenly filled — the final row has only 3 logos left-aligned against 6 on earlier rows, creating an orphaned cluster.
  - Fix: Use CSS flexbox with justify-content: center on the logo container so partial final rows are centred rather than left-hanging.
**Typography — 3/7**
- [critical] Site-wide: The rendered page loads 'Raleway' as both primary and secondary font (confirmed in CSS :root variables). The brand config mandates Archivo for headings and Inter for body. No Archivo or Inter import is present in the dynamic styles block.
  - Fix: Add Google Fonts imports for Archivo and Inter, then update --primary-font to 'Archivo' and --secondary-font to 'Inter' in the :root CSS block.
- [major] Body copy throughout page (desktop and mobile): Multiple body text paragraphs (e.g. the event description below the hero, the testimonial quote, the sponsorship copy) render at what appears to be 13–14 px in a full-width container with no max-width constraint, producing line lengths well over 100 characters on desktop — far outside the 45–90 character target.
  - Fix: Constrain all body-text columns to max-width: 720px (or equivalent ~75 ch) and centre within their container.
- [major] Section headings across page (e.g. '2026 Expert Speakers', 'Key Themes for 2026 Include:', 'Past Leaders on the Board'): Heading sizes appear inconsistent — some section titles render noticeably larger than others at the same semantic H2 level, suggesting inline font-size overrides rather than a consistent type scale.
  - Fix: Audit all H2/H3 elements and remove inline font-size overrides; instead rely on the CSS type scale definitions (32px for H2, 24px for H3) from the brand config scale.
- [minor] Hero subtitle ('Checkmate, Chaos – Turning Volatility into Your Next Strategic Advantage'), desktop: The subtitle appears in a yellow/gold colour (#ffd230 link colour) applied as a heading, making it look like a hyperlink rather than a thematic subtitle.
  - Fix: Set the hero subtitle to white or the brand accent (#FF5A36) to distinguish it from the event name without mimicking a link state.
**Spacing & rhythm — 4/7**
- [major] 'Benefits of Attending / Benefits of Sponsoring' section, desktop: This section appears nearly empty — two tab labels are visible but the content area below them renders with an enormous unexplained void, suggesting hidden or failed-to-load content, leaving a jarring blank band in the page.
  - Fix: Audit whether the Benefits content is gated behind a failed API call or CMS entry. If content is not ready, remove the section entirely rather than leaving a visible empty band.
- [major] Photo Gallery section, desktop: The photo gallery images are cramped with near-zero visible gap between thumbnails while the section heading above has excessive top padding (~80px), creating unbalanced rhythm within the section.
  - Fix: Add a consistent 16px gap between gallery images and reduce the section heading top-padding to 48px to match the spacing scale.
- [minor] CLE Credit badge / Approved for 10.25 CLE Credit Hours row, desktop: The CLE badge and text sit with noticeably less vertical padding than surrounding content bands, making it feel pinched relative to adjacent sections.
  - Fix: Add padding: 24px 0 to the CLE row container to match the spacing scale.
**Visual hierarchy — 4/7**
- [major] Hero section, desktop: Three CTAs appear in the hero bar at near-equal visual weight ('Request Your Invite', 'Download Agenda', 'Sponsorship Opportunities'). All three are similar-sized buttons, so the primary registration CTA does not clearly dominate. The registration CTA should be visually singular.
  - Fix: Style 'Request Your Invite' as a filled accent-colour (#FF5A36) button at full weight, and demote 'Download Agenda' and 'Sponsorship Opportunities' to ghost/outline style so hierarchy is unambiguous.
- [major] '2026 Sponsorship Opportunities SOLD OUT' banner, desktop: A large high-contrast yellow/orange band announces sponsorship is sold out, which draws significant visual attention mid-page and competes with the registration CTA as a primary call-to-action signal, despite not being actionable for most visitors.
  - Fix: Reduce the visual weight of this sold-out announcement — use a smaller inline badge or muted text rather than a full-width accent banner.
- [minor] Speakers section, desktop: The 'VIEW ALL 2026 SPEAKERS' button appears in yellow (#ffd230) against a white background, matching the link colour variable, which gives it secondary-link rather than CTA energy.
  - Fix: Use the primary brand colour (#0A2540) as button background or the accent (#FF5A36) so it reads as an actionable button rather than a styled link.
**Consistency — 3/7**
- [critical] CTAs site-wide (hero, speakers, themes, sponsorship, footer): Button colours are inconsistent across the page: some buttons are blue (#0081ff, the CSS primary-color), some are yellow (#ffd230), and the hero registration button appears in yet another shade. None of these match the brand-config accent (#FF5A36) reserved for CTAs. At least four distinct button colour treatments are visible.
  - Fix: Standardise all primary CTAs to background #FF5A36 with white text, all secondary/ghost CTAs to #0A2540 outline, and remove all yellow (#ffd230) button instances.
- [major] Theme cards (Key Themes section) vs Speaker cards, desktop: Theme cards have a yellow top border accent and dark overlay with white text; speaker cards have no border accent and use a different overlay opacity. The card treatment is inconsistent between the two card types, which appear in adjacent sections.
  - Fix: Define a single card component spec: consistent corner radius (4px), consistent image overlay style, and consistent heading/body text treatment, then apply uniformly to both speaker and theme cards.
- [major] Sponsor logo grid, desktop: Sponsor logos are displayed at varying sizes and with inconsistent vertical alignment — some logos appear roughly twice the height of others in the same row, making the grid look unorganised.
  - Fix: Constrain all sponsor logo images to a fixed container height (e.g. 48px) with object-fit: contain and vertical-align: middle so all logos sit at the same optical baseline.
- [minor] Navigation bar, desktop: The top navigation 'Request an Invite' button uses a different visual style (appears as a blue pill/rounded button) compared to the hero CTA buttons below, which use a different shape and colour, breaking button consistency from the first visible element.
  - Fix: Apply the same button component class and colour (#FF5A36 fill, white text, 4px radius) to the nav CTA as used for the hero primary CTA.
**Responsive integrity — 4/7**
- [major] Key Themes cards, mobile (390px): The four theme cards appear to stack but each card's overlay text (session title and description) is very small and partially cut off at the card bottom edge, suggesting the card has a fixed pixel height that is too short for wrapped text on narrow screens.
  - Fix: Remove fixed height on theme cards for mobile and use min-height: 280px with the card expanding to fit content, ensuring overlay text is always fully visible.
- [major] Stats row, mobile: On mobile the four stat blocks appear to render 2×2 but the text within each block wraps tightly with minimal padding, making the numbers hard to read and the label text truncating on the second line.
  - Fix: On mobile, increase internal cell padding to 16px and ensure stat number font-size reduces gracefully (e.g. 28px on mobile vs 40px desktop).
- [major] Hero section, mobile: On mobile the hero retains the dark background with the chess imagery but the event name 'Corporate Counsel and Compliance Exchange USA' wraps to 5+ lines at a large size, pushing the date and CTA buttons partially below the fold on a 390px screen. The primary CTA is not above the fold.
  - Fix: Reduce the hero heading font-size on mobile to 24–28px and tighten line-height so the event name, date, location, and CTA all fit within the first screen height.
- [minor] Navigation, mobile: The mobile navigation appears to compress the logo and nav items into the same row, making the logo very small (potentially below the brand minimum clear-space requirement) without a clear hamburger menu visible in the screenshot.
  - Fix: Ensure the mobile nav uses a hamburger/drawer pattern with the logo at full min-clear-space and the nav collapsed into a drawer.
**Visual accessibility — 3/7**
- [critical] Primary CTA buttons site-wide (confirmed by axe-core: .aos-animate.btn-primary): Primary call-to-action buttons (blue #0081ff background with white text) fail WCAG 2 AA contrast ratio — the contrast of white on #0081ff is approximately 3.0:1, below the 4.5:1 minimum for normal text. This affects the most important interactive element on the page.
  - Fix: Change button background to a darker blue (#0053c2 or the brand primary #0A2540) which passes AA contrast with white text, or change to the brand accent #FF5A36 (contrast with white ≈ 3.7:1 — also marginal; prefer #0A2540 which exceeds 4.5:1).
- [major] Hero section — event name and subtitle over background image, desktop and mobile: The hero background image shows chess pieces and people. In areas where the image is lighter (right side), the white event title text may have insufficient contrast. No full-width scrim overlay is visible in the screenshot — the image gradient appears partial.
  - Fix: Add a full-coverage dark scrim (e.g. linear-gradient from rgba(10,37,64,0.75) to rgba(10,37,64,0.55)) over the entire hero image to guarantee text contrast across all viewport widths.
- [major] Theme cards — white text over image overlays, mobile: On mobile the theme card images are smaller and the gradient overlay compresses, making white text labels on some cards (particularly the lighter-background 'The Rookies' card) appear with insufficient contrast against the underlying image.
  - Fix: Ensure the card overlay gradient provides at least rgba(0,0,0,0.65) coverage behind all text, or add a solid text-shadow to all card headings as a fallback.
- [major] Yellow (#ffd230) links and buttons throughout page: Links styled in the --link-color (#ffd230 yellow) appear on white backgrounds throughout the page (e.g. in the speakers section, navigation links). Yellow on white has a contrast ratio of approximately 1.6:1, which critically fails WCAG AA for both normal and large text.
  - Fix: Change --link-color to a dark value that passes contrast on white, such as #0A2540 (brand primary) or #0053c2, reserving yellow only for use on dark backgrounds.
- [minor] Photo Gallery section, desktop: Gallery images (confirmed by axe-core image-alt finding) include at least one image missing descriptive alt text, meaning screen reader users receive no information about gallery content.
  - Fix: Add descriptive alt attributes to all gallery images (e.g. alt='Attendees networking at Corporate Counsel Exchange 2025').

## Brand Compliance — 31/100
The microsite is for the Corporate Counsel & Compliance Exchange USA, not the configured 'WorkX 2026' event, indicating this page is either mis-configured against the wrong brand spec or the brand config supplied is a placeholder. Setting that fundamental mismatch aside and judging against the structural and tonal rules in the config, the page satisfies most required-element checks but carries significant brand-discipline violations: the CSS confirms the active font stack is Raleway (not Archivo/Inter), the primary/accent color tokens are #0081ff/#ffd230 (not #0A2540/#FF5A36), accent color is used broadly as a decorative background rather than reserved for CTAs/highlights, and several tone-of-voice issues appear in the copy. The privacy policy link is present in the footer but is small and easily missed.

**Required elements**
- ✓ Event name and dates in the hero — Hero displays 'Corporate Counsel and Compliance Exchange USA' with 'July 21–22, 2026' visible in the hero band on both desktop and mobile.
- ✓ Venue / location — Hero sub-line reads 'Hyatt Regency, Jersey City'; also confirmed in schema.org markup.
- ✓ Primary registration CTA above the fold — A 'Request Your Invite' button appears in the hero on both desktop and mobile viewports.
- ✓ IQPC or portal brand logo — IQPC logo is visible in the top-left of the navigation bar on desktop; also present in footer 'In Partnership With' area.
- ✓ Privacy policy link in footer — A 'Privacy Policy' link is visible in the footer link row at the bottom of the page, though it is rendered at very small size (~11–12px) and low contrast against the dark footer background.

**Token scan (deterministic)**
- [major] Off-palette color #212121 is used on 370 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #212529 is used on 282 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #222222 is used on 94 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #FFD230 is used on 50 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Raleway, sans-serif" is used on 1090 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Brand config vs. page identity: The brand configuration specifies the event as 'WorkX 2026' on the 'Example Portal', but the microsite is for 'Corporate Counsel & Compliance Exchange USA 2026'. The CSS token --primary-color is #0081ff and --secondary-color is #ffd230, neither of which matches the configured #0A2540 primary or #FF5A36 accent. The font stack is Raleway, not Archivo/Inter. The entire token system is misaligned with the supplied brand config.
  - Fix: Confirm the correct brand config is loaded for this event. If this is intentionally a separate community config, update the portal brand configuration to reflect the actual primary (#0081ff), accent (#ffd230), and font (Raleway) in use — or re-skin the microsite to match the WorkX 2026 spec.
- [critical] Hero section — sub-headline copy: The sub-headline reads 'Checkmate, Chaos – Turning Volatility into Your Next Strategic Advantage'. The em-dash construction is acceptable, but 'Checkmate, Chaos' as a rhetorical opener is an unverifiable superlative framing that implies the event definitively resolves chaos — this crosses into unverifiable benefit territory the brand config prohibits ('no unverifiable superlatives').
  - Fix: Revise to a benefit-led but verifiable framing, e.g., 'Navigating Volatility: Strategic Insights for Legal & Compliance Leaders'.
- [major] Accent color usage — throughout page (yellow #ffd230): The yellow/gold accent (#ffd230 mapped as --secondary-color) is used as a full section-background fill for the 'Key Themes for 2026' cards, as decorative borders, and as general highlight blocks throughout the page — not reserved exclusively for CTAs and key highlights as required by the brand config rule 'Accent is reserved for CTAs and key highlights only.'
  - Fix: Restrict the accent color to button backgrounds, CTA elements, and single key-stat callouts. Replace accent-background section fills with the primary dark color (#0A2540) or white (#FFFFFF) as appropriate.
- [major] Logo — top-left navigation bar: At the desktop viewport the IQPC/event logo in the top nav appears to have minimal clear space: the navigation links begin immediately to the right of the logomark with spacing that appears less than the height of the logomark, violating the required minimum clear space of 'equal to the height of the logomark on all sides'. On mobile the logo is further compressed.
  - Fix: Add horizontal padding/margin around the logo container equal to at least the full height of the logomark (approximately 32–40px based on visible mark size) before the first nav link.
- [major] Hero — logo placed over busy photography: The event logo and event name text are rendered directly over a dark photographic background in the hero without a visible scrim or semi-transparent overlay, violating the brand rule 'Never … placed over busy imagery without a scrim'.
  - Fix: Add a linear-gradient scrim (e.g., rgba(10,37,64,0.65) to transparent) over the hero image behind the logo and headline text to ensure legibility and brand compliance.
- [major] Meta description and page copy — 'The Premier Exchange': The meta description opens with 'The Premier Exchange for Legal Leaders' and this phrasing is repeated on-page. 'Premier' is an unverifiable superlative explicitly prohibited by the brand tone rules.
  - Fix: Replace 'The Premier Exchange' with a factual descriptor such as 'A Senior-Level Exchange' or 'An Invitation-Only Exchange'.
- [minor] Footer — Privacy Policy link: The Privacy Policy link is present but rendered at approximately 11–12px in a low-contrast gray-on-dark-footer treatment. This makes it difficult to locate, which is a minor compliance risk for a legally required element.
  - Fix: Increase the footer link size to at minimum 14px (matching the body type scale) and ensure contrast ratio meets WCAG AA (4.5:1) against the footer background.
- [minor] '2026 Sponsorship Opportunities Sold Out' banner: The banner text '2026 SPONSORSHIP OPPORTUNITIES SOLD OUT' uses the accent yellow as a full-width background fill for an informational status banner — this is a non-CTA, non-highlight use of the accent color that violates the accent-reservation rule.
  - Fix: Use the primary dark color (#0A2540) with white text for this status banner instead of the accent yellow.
- [minor] Imagery style — 'Key Themes' section and photo gallery: The 'Key Themes' section uses stock/conference photography with strong yellow color-grading overlays that do not reflect a consistent, professional imagery style. Mixed image treatments (ungraded candid shots in the photo gallery vs. heavily color-graded theme cards) create an inconsistent visual tone.
  - Fix: Standardize image treatment across the page: either apply a consistent primary-color (#0A2540 at ~40% opacity) overlay to all editorial photography, or use clean ungraded images throughout. Avoid accent-color photo overlays.

## SEO Audit — 61/100
The page has a solid structural foundation — Event JSON-LD is actually present in the rendered HTML (the deterministic check flagged has_event_schema: false, but the markup exists and is reasonably complete), sponsors and speakers are well-populated, and canonical/OG tags are in place. However, the meta description massively exceeds the 160-character limit at 703 characters (search engines will truncate and rewrite it), the H1 is a thematic tagline ('Checkmate, Chaos…') that shares zero lexical overlap with the event's core search queries, and the title tag — while accurate — misses date, location, and year signals that high-intent searchers typically include. Keyword coherence between the H1, page copy, and metadata is weak because the H1 operates as brand-voice creative rather than a search-oriented descriptor.

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
- [critical] Meta description is 703 characters — more than 4× the ~155-character display limit. Google will truncate or auto-generate a snippet, losing control of the SERP click message. It also opens with an unverifiable superlative ('The Premier Exchange') which violates brand tone guidance.
  - Fix: Rewrite to 150–160 characters that lead with the event name, dates (July 21–22, 2026), location (Jersey City, NJ), and a concrete benefit. Remove the superlative opener.
- [critical] H1 reads 'Checkmate, Chaos - Turning Volatility Into Your Next Strategic Advantage' — a creative tagline with zero keyword overlap with the event name, audience role (corporate counsel, general counsel, compliance officer), or topic terms (legal tech, regulatory compliance, ALSPs). A searcher scanning the SERP or landing on the page cannot confirm within one second that they are in the right place.
  - Fix: The H1 should identify the event by name and primary audience. Move the tagline to an H2 or hero sub-headline. Example H1: 'Corporate Counsel & Compliance Exchange USA 2026'. The tagline can follow immediately as a styled sub-head.
- [major] Title is 'Corporate Counsel & Compliance Exchange USA' (43 chars) — accurate but missing the year (2026) and location (Jersey City / New Jersey), which are strong intent qualifiers for event searches. Adding them would disambiguate from past editions and match queries like 'corporate counsel compliance event 2026'.
  - Fix: Append year and a brief location indicator within the 60-character budget.
- [major] The Event @id is set to 'https://www.iqpc.com#event' — a generic fragment that will collide with any other event on the same domain. The location object has an empty 'url' string and empty streetAddress/postalCode fields. Additionally, the sponsor array contains two duplicate entries each for Ivo, LexisNexis, Axiom, Novus Law, Mitratech, GC AI, Erskine Law, Checkbox, DocJuris, Eudia, and Spellbook, and one performer entry is 'test test' — a clear staging artefact.
  - Fix: Set @id to the canonical event URL ('https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa'). Remove duplicate sponsor entries. Remove the 'test test' performer entry. Populate streetAddress if the Hyatt Regency Jersey City address is publicly known (2 Exchange Place, Jersey City, NJ 07302) — only if confirmed on the page.
- [major] OG description mirrors the overlong meta description (703 chars). Social platforms truncate at ~200 characters, so the share card will be cut off mid-sentence and the first line 'The Premier Exchange for Legal Leaders' — without event name or date — is a weak hook for click-through on LinkedIn or Twitter where the target audience lives.
  - Fix: Write a dedicated OG description (≤200 chars) that leads with event name, date, and a single sharp benefit statement.
- [major] robots_meta is null — no explicit robots directive is set. While Googlebot will index by default, the absence of an explicit tag is a risk flag for compliance-focused CMS environments and makes it impossible to confirm intentional indexing policy at a glance.
  - Fix: Add <meta name='robots' content='index, follow'> to the <head> to make the indexing intent explicit.
- [minor] The keywords meta tag contains only 'Submission Form' — almost certainly a CMS default or form-page leftover. While Google ignores this tag, it signals a content management process gap and may be parsed by secondary crawlers.
  - Fix: Either remove the keywords meta tag entirely or replace its content with 5–8 relevant terms such as 'corporate counsel, compliance conference, legal tech, general counsel, regulatory strategy, ALSPs, in-house legal, 2026'.
- [minor] The WebSite schema block sets 'name' to 'Corporate Counsel & Compliance Exchange USA' but 'url' to 'https://www.iqpc.com' — the root IQPC domain. This creates a mismatch: the named entity is the event microsite but the URL points to the parent domain, which already has its own WebSite schema. This can confuse entity disambiguation.
  - Fix: Either remove the WebSite schema block from the event microsite (it is correctly owned by the root domain) or update the url to the canonical event page URL.
- [minor] The canonical href points to 'https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa' (no trailing slash, no /index) but the rendered page URL is '.../index'. This is a minor inconsistency — the canonical correctly canonicalises away the /index variant — but OG url and schema:url both include /index, creating three URL variants in the same document head.
  - Fix: Ensure og:url and schema:url property values match the canonical (without /index suffix) for full consistency.

**Improved metadata (ready to apply)**
- Title: Corporate Counsel & Compliance Exchange USA 2026
- Meta description: Join 100+ corporate counsel and compliance leaders July 21–22, 2026 in Jersey City, NJ. Expert panels on legal tech, regulatory strategy, ALSPs, and outside counsel management.

## Accessibility (axe-core, deterministic)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (13 element(s), e.g. `.aos-animate.btn-primary[role="button"]`)
- **[minor]** empty-heading: Ensure headings have discernible text (4 element(s), e.g. `.home-content-1 > .container[name="Container"][data-nodelete=""] > .row > .column.col-12[name="Column"] > div[data-component="heading"][data-content="true"] > h2[name="H2"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (3 element(s), e.g. `.cta-event-date`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `.d-md-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[moderate]** region: Ensure all page content is contained by landmarks (30 element(s), e.g. `.header-container`)