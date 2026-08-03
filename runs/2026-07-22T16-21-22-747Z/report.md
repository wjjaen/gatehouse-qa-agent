# Microsite QA Report
**URL:** https://www.ssonetwork.com/events-workx
**Date:** 2026-07-22T16:24:59.700Z
**Verdict:** BLOCK — 5 critical/serious accessibility violation(s) (axe-core)
**Weighted score:** 56/100  (Design QA: 58 · Brand Compliance: 49 · SEO Audit: 62)
**vs. previous run (2026-07-22T16:17:42.709Z):** +3 points

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
WorkX 2026 meets the basic functional bar — all required elements are present above the fold, the registration widget is reachable, and the content hierarchy is broadly readable. However, the page reads as a platform-generated template rather than a designed event microsite: inconsistent button colours that deviate from the brand accent, a cookie-consent bar that obscures hero copy on load, mixed typography that does not honour the Archivo/Inter scale, and a mobile layout that collapses some sections into unrefined single-column stacks with cramped spacing. Polish across spacing rhythm, visual hierarchy, and consistency would be needed before this could be considered launch-ready for a premium B2B audience.

**Layout & grid — 4/7**
- [major] Hero section, desktop: The hero splits into a text-left / image-right layout but the two halves are not vertically aligned at the top — the conference image floats visibly lower than the headline text block, creating an unanchored gap above the photo.
  - Fix: Apply `align-items: flex-start` (or `stretch`) to the hero flex row and ensure the image container starts at the same vertical baseline as the text column.
- [major] 'What You'll Explore at WorkX' section, desktop: The four topic cards are laid out in an uneven grid — card images have inconsistent heights and the text beneath them does not align to a common baseline, so the section reads as a loose collage rather than a structured grid.
  - Fix: Force all card images to the same fixed height (e.g. 200px) with `object-fit: cover`, and use CSS Grid with `align-items: start` on card text so titles and body copy align across columns.
- [minor] Pricing / registration widget, desktop: The reCAPTCHA badge and Amazon trust logo in the order total row are left-aligned while the price and CTA button are right-aligned, but the two groups do not sit on a shared horizontal axis — the reCAPTCHA appears to float lower.
  - Fix: Apply `align-items: center` to the flex row containing the trust badges and order total so all elements share a common midline.
**Typography — 4/7**
- [major] Entire page: The brand config specifies Archivo for headings and Inter for body. The loaded CSS imports an extensive Google Fonts list (Oswald, Nunito, Open Sans, Josefin Sans, etc.) and visual inspection of the headings — particularly section labels like 'WHO YOU'LL HEAR FROM' — suggests a sans-serif that is not Archivo is being applied. Body text also appears to use a system fallback in places rather than Inter.
  - Fix: Audit the computed font-family on h1–h4 and body paragraphs and explicitly set `font-family: 'Archivo', sans-serif` on headings and `font-family: 'Inter', sans-serif` on body, removing unused font imports.
- [major] Section label overlines (e.g. 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?'), desktop and mobile: These all-caps overline labels appear at an arbitrary small size that is not on the defined type scale (12, 14, 16, 20, 24, 32, 48, 64 px). They also use a decorative dash–text–dash pattern that is inconsistently applied — some sections have it, others do not.
  - Fix: Set all section overlines to 12px tracked uppercase Archivo, and apply the dash–text–dash separator consistently to every section that uses an overline, or remove it everywhere.
- [minor] 'Reimagined Passes Starting at $799' section, desktop: The section heading 'Reimagined Passes Starting at $799' renders at a noticeably larger size than other H2-equivalent headings on the page (e.g. '2026 Visionary Speakers Include'), breaking the heading scale consistency.
  - Fix: Normalise all second-level headings to the same font-size token (32px per the scale) and use font-weight or colour accent for emphasis rather than size variation.
**Spacing & rhythm — 4/7**
- [major] Cookie consent banner, desktop and mobile on load: The fixed-position cookie consent bar is rendered over the bottom portion of the hero section without pushing content down, cutting off the lower CTA buttons ('View Event Guide', 'Sponsorship Opportunities', 'Book Online Now') until the user dismisses it.
  - Fix: Add a `padding-bottom` to the hero section equal to the cookie bar's height (~50px) when the banner is visible, or ensure the banner appears below the fold so it does not obscure above-the-fold CTAs.
- [major] 'Hear from Past Attendees' section, desktop: The testimonial card has excessive internal padding on the left text side (~48px or more) while the TDECU logo block on the right has very little vertical breathing room, creating an asymmetric and cramped feel within the same card.
  - Fix: Apply uniform padding of 32px on all four sides of the testimonial card and ensure the logo is vertically centred relative to the quote text.
- [minor] Between 'What You'll Explore' section and 'Reimagined Passes' section, desktop: The vertical gap between these two sections appears to be roughly double the spacing used between other adjacent sections (~96px vs ~48px), creating an unexplained void that disrupts page rhythm.
  - Fix: Standardise inter-section vertical spacing to 64px or 96px and apply it consistently via a single CSS class on all top-level section wrappers.
**Visual hierarchy — 5/7**
- [major] Hero section, desktop: There are three CTA buttons in the hero ('View Event Guide', 'Sponsorship Opportunities', 'Book Online Now') but all three are rendered at similar visual weight. 'Book Online Now' is the primary registration CTA and should be distinctly more prominent — it currently appears as the same height and approximate colour intensity as the secondary/tertiary CTAs.
  - Fix: Style 'Book Online Now' in the brand accent (#FF5A36) at full solid fill with white text. Demote 'View Event Guide' to a ghost/outline style and 'Sponsorship Opportunities' to a text link or low-contrast secondary style.
- [minor] Stats bar ('100+ Attendees, 40 Speakers…'), desktop: The stats bar sits between the hero and the 'No Budget, No Excuses' section but has a background colour and type weight that makes it compete visually with the hero headline above it. It is secondary information but reads at near-primary weight.
  - Fix: Reduce the stat labels to 14px, keep the stat values at 20–24px bold, and use a lighter background (e.g. #F5F7FA) to signal that this is supporting rather than primary content.
**Consistency — 3/7**
- [major] Buttons across entire page: Button styles are inconsistent throughout: the hero has a dark navy fill, a purple-tinted fill, and a coral fill across three buttons. The 'View Event Guide' button in the body section uses a teal/green fill. The 'View All Speakers' and 'View New Rates' buttons use yet another shade. None map cleanly to the brand accent #FF5A36 or primary #0A2540 system. The registration widget's 'Continue' button appears in a system-default blue.
  - Fix: Establish two button variants — primary (#FF5A36 fill, white text) and secondary (#0A2540 outline, #0A2540 text) — and apply them consistently to every button on the page. No other fill colours should appear.
- [major] Speaker cards vs. 'What You'll Explore' cards, desktop: Speaker cards use circular portrait crops with no border-radius on the card container, while the topic/explore cards use rectangular images with visible border-radius on the card container. Image treatment is inconsistent across card families — corner radius and aspect ratio differ without apparent rationale.
  - Fix: Decide on a single image treatment for editorial photography: either circular crops (for people) and 16:9 rectangular (for topic imagery) — and apply those rules strictly. Ensure all card containers share the same border-radius value (e.g. 8px).
- [minor] Sponsor logos row, desktop: Sponsor logos are displayed at visibly different heights — the Bevi and Bubl logos appear taller than the Embrava and Envoy logos — suggesting no enforced max-height constraint on the logo container.
  - Fix: Constrain all sponsor logos to a fixed height (e.g. 40px) with `object-fit: contain` and transparent padding so they appear visually balanced regardless of source dimensions.
**Responsive integrity — 4/7**
- [major] 'What You'll Explore at WorkX' section, mobile: On mobile the four topic cards stack into a single column but their descriptive body text is very long relative to the narrow viewport, pushing the section to an extremely tall scroll distance. Each card's body copy is not truncated or abbreviated for mobile, making scanning impractical.
  - Fix: On mobile, limit card body copy to 2–3 lines with a 'Read more' toggle, or reduce copy length to 40–50 words per card. Alternatively switch to a horizontal scroll carousel on mobile.
- [major] Registration / pricing widget, mobile: The audience-type selector tabs ('Practitioner/CRE/Workplace/Facilities', 'Designer/Architect/Broker', 'Vendors') are displayed as a segmented button group on desktop but on mobile the tab labels overflow their containers — the long label text is not wrapping gracefully and the tabs look cramped and partially obscured.
  - Fix: On mobile, convert the tab group to a full-width dropdown `<select>` element or stack the tabs vertically with full width and adequate touch target height (min 44px).
- [minor] Footer, mobile: The footer 'In Partnership With: SSON' logo and the IQPC copyright/logo are arranged in a row on mobile that is very tight — the SSON logo and IQPC logo nearly touch with minimal clear space between them, violating the logo clear-space rule in the brand config.
  - Fix: On mobile, stack the footer logo group vertically with at least 16px gap, or increase the horizontal gap between logos to at least the height of the smaller logomark.
**Visual accessibility — 3/7**
- [critical] Multiple buttons and interactive elements, entire page: Automated audit (excluded from scoring but informing visual review) flags 12 nodes with contrast failures. Visually, the light-purple/lavender 'Sponsorship Opportunities' button in the hero has white or near-white text on a light-coloured fill that is clearly below 4.5:1. Similarly the grey section overline text on white background appears near the minimum threshold.
  - Fix: Change the 'Sponsorship Opportunities' button to a dark navy fill (#0A2540) with white text, or an outlined style with #0A2540 border and text. Ensure all overline text uses #0A2540 or #555555 at minimum 12px.
- [critical] Hero section, desktop — text over event photo: The right-hand conference room photography in the hero is displayed without any scrim or overlay. While the primary headline is on the left over a white background, the stats bar ('100+ Attendees…') overlaps the bottom of the image area. If any text is rendered over the photo without a scrim, readability and contrast cannot be guaranteed per brand logo/image rules.
  - Fix: Add a semi-transparent dark gradient scrim (e.g. `linear-gradient(to right, transparent, rgba(10,37,64,0.5))`) over the event photo wherever any text or stat overlays it.
- [major] Section overline labels (e.g. 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?'), desktop: These overline labels appear in a very light grey or low-saturation colour against a white background. At their small size (~11–12px) the contrast ratio is likely below 4.5:1 required by WCAG AA for normal text.
  - Fix: Change overline label colour to #555555 minimum, or preferably #0A2540, to ensure readability at small sizes.

## Brand Compliance — 49/100
The WorkX 2026 microsite covers most required elements and maintains a generally professional, benefit-led tone. However, the accent color (#FF5A36 / orange-red) appears to be used on non-CTA decorative elements and section dividers beyond its reserved scope, the TDECU sponsor logo in the testimonial section is displayed at a very large, dominant size that competes with the portal brand hierarchy, and a privacy policy link is not visibly present in the footer. The copy is largely on-brand but contains one instance of an unverifiable superlative. Missing required elements: Privacy policy link in footer.

**Required elements**
- ✓ Event name and dates in the hero — Hero clearly shows 'WorkX Conference' and 'August 10–12, 2026' in the desktop and mobile hero sections.
- ✓ Venue / location — 'San Francisco, CA' is displayed in the hero below the event name on both breakpoints.
- ✓ Primary registration CTA above the fold — 'Book Online Now' button appears in the hero on desktop; mobile shows 'View Event Guide' and 'Sponsorship Opportunities' above fold but the registration CTA ('Book Online Now') appears to be below the fold on mobile — only partially satisfied.
- ✓ IQPC or portal brand logo — SSON logo appears in the top-left of the navigation bar and in the footer 'In Partnership With' section on both breakpoints. IQPC copyright mark visible in footer.
- ✗ MISSING Privacy policy link in footer — The footer contains contact details (phone, email) and a copyright line but no visible privacy policy link is discernible in either screenshot or the truncated HTML. This is a legally required element.

**Token scan (deterministic)**
- [major] Off-palette color #212529 is used on 448 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #590167 is used on 150 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #0C2341 is used on 31 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #191E52 is used on 29 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #006496 is used on 25 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Roboto, sans-serif" is used on 947 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Footer: No privacy policy link is visible in the footer on either desktop or mobile. This is a legally required element per brand configuration and a regulatory obligation (GDPR/CCPA given the cookie consent banner present on the page).
  - Fix: Add a 'Privacy Policy' hyperlink in the footer, adjacent to the copyright line. Ensure it links to the live IQPC/SSON privacy policy URL.
- [critical] Mobile hero — above the fold: The primary registration CTA ('Book Online Now') is not present above the fold on mobile (390px viewport). Only 'View Event Guide' and 'Sponsorship Opportunities' appear above the fold. The brand config explicitly requires 'Primary registration CTA above the fold.'
  - Fix: Reorder the mobile hero CTA buttons so that the 'Book Online Now' (register) button appears first/topmost, ensuring it is visible without scrolling on a 390px viewport.
- [major] Section divider labels and decorative rules throughout the page (e.g., 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?', 'NEW PRICING AVAILABLE', 'INSIGHTS FROM YOUR PEERS', 'PARTNERING FOR TOMORROW'): The accent color (#FF5A36) is used on small decorative horizontal rules flanking section label text throughout the page. The brand config states accent is 'reserved for CTAs and key highlights only.' Using it as a repeated decorative divider pattern dilutes its CTA signaling function and violates the reservation rule.
  - Fix: Replace the accent-colored decorative rules with the primary color (#0A2540) or a neutral gray. Reserve the #FF5A36 accent exclusively for CTA buttons and genuinely critical highlight elements.
- [major] Testimonial / 'Hear from Past Attendees' section — TDECU logo: The TDECU 'YOUR CREDIT UNION' logo is rendered at a very large size (approximately 200px wide based on the screenshot), dominating the testimonial card. A third-party sponsor/attendee brand is displayed more prominently than the event's own brand marks, distorting the brand hierarchy. Additionally, this organization is an attendee/sponsor, not a portal brand, so its scale relative to the event brand is disproportionate.
  - Fix: Reduce the TDECU logo to a modest inline attribution size (no wider than 80–100px), consistent with a testimonial attribution. It should identify the source without overpowering the page branding.
- [major] Stats bar / hero sub-banner copy: '100+ ATTENDEES, 40 SPEAKERS, 30+ SESSIONS, 1 UNIQUE NETWORKING EXPERIENCE': '1 UNIQUE NETWORKING EXPERIENCE' is an unverifiable superlative in the sense that 'unique' as a marketing claim is a vague boast. More concretely, '100+ ATTENDEES' appears low for a conference of this profile and may understate actual attendance, potentially misleading prospects. The brand config prohibits 'unverifiable superlatives.'
  - Fix: Replace vague claim language with specific, verifiable metrics. If attendance is higher, update the figure. Replace '1 UNIQUE NETWORKING EXPERIENCE' with a concrete descriptor such as '5 Networking Formats' or a specific session count.
- [minor] Hero headline / kicker text: 'NO BUDGET, NO EXCUSES: HOW THE OFFICE STILL DELIVERS': The kicker uses 'NO EXCUSES' which is edgy and confrontational in tone. While energetic, it risks alienating prospects who are dealing with genuine budget constraints (a pain point the body copy acknowledges sensitively). This is a borderline tone-of-voice issue against the 'professional, energetic, benefit-led' standard.
  - Fix: Consider softening to a benefit-led framing, e.g., 'LIMITED BUDGETS, REAL RESULTS: HOW THE OFFICE STILL DELIVERS' to remain energetic without implying blame toward the target audience.
- [minor] Pricing section headline: 'Reimagined Passes Starting at $799': 'Reimagined' is a vague marketing superlative with no substantiation on the page. The brand config disallows unverifiable superlatives.
  - Fix: Replace 'Reimagined' with a specific, factual descriptor, e.g., 'New Tiered Passes Starting at $799' or 'Flexible Passes Starting at $799.'
- [minor] Navigation bar — SSON logo clear space (desktop): The SSON logo in the top-left navigation appears to have very tight spacing between it and the navigation menu items ('Home Agenda Speakers…'). At this viewport the clear space appears less than the height of the logomark, which the brand config requires on all sides.
  - Fix: Add horizontal padding/margin to the logo container in the navbar so that clear space on the right side of the logo equals at least the logomark height before the first nav item begins.

## SEO Audit — 62/100
The page has a solid content foundation and the deterministic checks reveal a pre-existing Event schema (has_event_schema was reported false but a complete JSON-LD block is present in the HTML), so no new schema needs to be generated. The primary SEO weaknesses are an over-long meta description (446 chars vs 150–160 target), a vague H1 that wastes keyword real estate, a title tag that omits the core audience keyword ('workplace conference'), missing robots meta, and keyword gaps between the headline copy and the metadata — reducing both SERP click-through and topical coherence signals.

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
- [critical] Meta description is 446 characters — nearly 3× the recommended 150–160 character limit. Search engines will truncate aggressively, hiding the benefit-led copy and reducing CTR.
  - Fix: Trim to 150–160 characters, front-loading the event name, date, location, and one concrete attendee benefit. Remove the second paragraph entirely from the tag (keep it in on-page copy).
- [critical] H1 reads 'WorkX Conference' — it contains no date, no location, and no audience or topic keyword (e.g. 'workplace strategy', 'facilities', 'corporate real estate'). Someone searching 'workplace conference San Francisco 2026' sees zero reinforcement in the primary heading.
  - Fix: Expand H1 to include the year, location, and a core topic keyword. Example: 'WorkX 2026 — Workplace Strategy Conference | San Francisco, August 2026'.
- [major] Title 'WorkX August 2026 | San Francisco' (33 chars) is well within the 60-char limit but misses the highest-value descriptive keyword. A user scanning SERPs for 'workplace conference 2026' or 'facilities conference San Francisco' gets no topical signal.
  - Fix: Add a short topic descriptor to the title, e.g. 'WorkX 2026 | Workplace Conference, San Francisco' (49 chars). This preserves brevity while adding the primary keyword.
- [major] robots_meta is null — no robots directive is declared. While Googlebot defaults to index/follow, the absence of an explicit tag is a hygiene gap and prevents precise control over crawl behavior.
  - Fix: Add <meta name='robots' content='index, follow'> to the <head> to make indexing intent explicit.
- [major] The keywords meta tag is present but empty (content=''). While Google ignores keywords meta, Bing still uses it as a weak signal, and an empty tag is wasted markup.
  - Fix: Either populate with 5–8 relevant terms ('workplace conference, facilities management, corporate real estate, workplace strategy, San Francisco, 2026') or remove the tag entirely.
- [major] The OG and Twitter description mirrors the oversized meta description (446 chars). Social platforms truncate at ~200 characters, so the opening sentence — which ends with 'corporate real estate.' — becomes the entire visible share snippet, dropping the differentiating benefit language.
  - Fix: Write a dedicated OG/Twitter description of 180–200 characters that leads with the clearest differentiator and includes date and location.
- [major] The schema's 'location' object has empty streetAddress, postalCode, and telephone fields, and the organizer 'address' is an empty string. Additionally, 'validFrom' on the AggregateOffer equals the event start date rather than today (or the date tickets went on sale), which is semantically incorrect. Several sponsor and performer entries have empty 'url' values.
  - Fix: Populate streetAddress and postalCode if the venue address is known (or remove blank fields rather than passing empty strings). Set offer validFrom to the date pricing opened. Remove or omit empty url fields on sponsors and performers — empty strings are worse than omitting the property.
- [minor] The meta description uses 'leading workplace conference' but the body copy emphasises 'CRE, Facilities, and Workplace leaders' — these audience terms never appear in the title, H1, or meta description, creating a coherence gap that dilutes topical authority for those higher-specificity searches.
  - Fix: Mirror at least one of 'facilities management', 'corporate real estate', or 'workplace strategy' in the title or meta description so keyword signals are consistent end-to-end.
- [minor] og:type is set to 'website' rather than 'event'. While Open Graph does not have a native 'event' type in the core spec, using a more specific type or supplementing with Facebook Event markup would improve social sharing context.
  - Fix: Consider setting og:type to 'event' for platforms that support it, or at minimum ensure the og:title and og:description clearly communicate event context (date, location, CTA).
- [minor] The WebSite schema has name='WorkX' and url='https://www.iqpc.com' but the canonical URL is 'https://www.ssonetwork.com/events-workx'. The @id also points to iqpc.com. This creates a mismatch between the schema URL and the actual page domain.
  - Fix: Update the WebSite JSON-LD url and @id to match the ssonetwork.com domain, or remove this schema block if it is auto-generated and cannot be edited per-event.

**Improved metadata (ready to apply)**
- Title: WorkX 2026 | Workplace Conference, San Francisco
- Meta description: WorkX 2026, Aug 10–12 in San Francisco: benchmarks, cost-justification playbooks & peer-tested strategies for CRE, Facilities & Workplace leaders. Register now.

## Accessibility (axe-core, deterministic)
- **[critical]** aria-valid-attr-value: Ensure all ARIA attributes have valid values (3 element(s), e.g. `#tier-6994e6cc50cb2108c7583cfb-tab`)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (12 element(s), e.g. `a[role="button"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (7 element(s), e.g. `#wlxOz > h6`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `a[href$="www.iqpc.com"] > .d-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[serious]** link-name: Ensure links have discernible text (1 element(s), e.g. `a[href$="www.iqpc.com"]`)
- **[serious]** listitem: Ensure <li> elements are used semantically (3 element(s), e.g. `.px-2.nav-link:nth-child(1)`)
- **[moderate]** region: Ensure all page content is contained by landmarks (28 element(s), e.g. `.template-6-header-container`)