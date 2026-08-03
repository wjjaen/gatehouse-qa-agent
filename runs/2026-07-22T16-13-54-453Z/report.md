# Microsite QA Report
**URL:** https://www.ssonetwork.com/events-workx
**Date:** 2026-07-22T16:17:42.712Z
**Verdict:** BLOCK — 1 critical conversion issue(s): NO_REGISTRATION_CTA
**Weighted score:** 53/100  (Design QA: 52 · Brand Compliance: 48 · SEO Audit: 62)
**vs. previous run (2026-07-22T16:13:27.116Z):** -1 points

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
The WorkX 2026 microsite has a recognizable event structure and communicates key facts (dates, location, speakers, pricing) reasonably well, but suffers from a fragmented visual hierarchy in the hero, inconsistent component styling across sections, and several mobile layout problems that would undermine credibility at launch. The most pressing issue is the conversion instrumentation flag indicating no registration CTA is being detected, which — combined with visible hero CTA crowding and a cookie-consent banner overlapping body content at load — creates friction on the primary conversion path.

**Layout & grid — 4/7**
- [major] Hero section, desktop: The hero splits into a narrow left text column and a right image, but the text column width is not constrained to the grid — the eyebrow label ('No Budget, No Excuses: How the Office Still Delivers'), event title, date, and CTA buttons are left-aligned to different implicit left edges, breaking column coherence. The three CTA buttons ('View Event Guide', 'Sponsorship Opportunities', 'Book Online Now') sit at different horizontal weights and are not anchored to a shared left rail.
  - Fix: Set all hero text content to a single consistent left-gutter (matching the site's max-width container padding) and align all three buttons to the same left edge on one row or in a deliberate stacked group.
- [major] Pricing / registration section, desktop: The registration widget (package selector, quantity, order total) does not sit inside the same max-width container as all other sections — it appears to use a different, slightly narrower width, making it look detached from the page grid.
  - Fix: Wrap the SRS widget container in the same max-width class used for all other content sections (e.g., container or container-xl) so column edges align with the rest of the page.
- [minor] Sponsors section, desktop: Sponsor logos are displayed in a single horizontal row that is not visually balanced — logos vary significantly in optical size and are not vertically centered relative to each other, creating an unanchored floating look.
  - Fix: Normalize all sponsor logos to the same bounding-box height (e.g., 40px) and use align-items: center on the flex row so logos read as a cohesive tier.
**Typography — 4/7**
- [major] Throughout page, desktop and mobile: The brand config specifies Archivo for headings and Inter for body, but the HTML imports a large Google Fonts stack including Oswald, Open Sans, Nunito, and others. Visually, section labels such as 'WHO YOU'LL HEAR FROM' and 'WHY ATTEND WORKX?' appear to use a condensed sans (possibly Oswald) rather than Archivo, while body copy in the value-prop section appears to use a different weight/family than the speaker card body copy. This suggests multiple font families are active on the page simultaneously.
  - Fix: Audit computed font-family on all heading and body elements. Remove all Google Fonts imports not matching Archivo and Inter. Apply font-family: 'Archivo', sans-serif to all h1–h4 and font-family: 'Inter', sans-serif to all p, li, span.
- [major] Section eyebrow labels (e.g., 'WHO YOU'LL HEAR FROM', 'INSIGHTS FROM YOUR PEERS'), desktop: Eyebrow labels use a small all-caps style with decorative rules on either side — a reasonable pattern — but the font size appears to be below 12px on desktop (possibly 10–11px) making them uncomfortably small relative to the section headings below and straining legibility.
  - Fix: Set eyebrow label font-size to at least 12px (per the brand scale minimum) and ensure letter-spacing is no more than 0.15em to maintain readability.
- [minor] Speaker cards, desktop: Speaker name, title, and company are shown in three separate text sizes but the distinction between title and company is too subtle — both appear to use roughly 13–14px in similar weights, making the hierarchy within each card unclear.
  - Fix: Differentiate speaker title (e.g., 13px regular, #555) from speaker company (e.g., 12px medium, #1A1A1A or brand primary) so the information hierarchy within each card is scannable.
**Spacing & rhythm — 4/7**
- [major] Cookie consent banner, desktop (appears at page load): The cookie consent banner at the bottom of the screen uses a dark background and overlaps the footer content, but more critically its vertical padding appears to be only 10px (per the inline CSS), making it cramped and difficult to read the consent text and dismiss button at a glance.
  - Fix: Increase cookie banner padding to at least 16px top and bottom (matching the spacing scale) and ensure the dismiss button has a minimum touch target of 44×44px.
- [major] What You'll Explore section, desktop: The four topic cards have inconsistent bottom spacing — the text descriptions under each card run to different lengths without a fixed card height, causing the bottom edges of adjacent cards to be misaligned and creating an uneven baseline rhythm across the row.
  - Fix: Use CSS flexbox with align-items: stretch on the card row, and ensure each card uses flex-direction: column with the description div set to flex-grow: 1 so all cards reach the same height.
- [minor] Pricing section, desktop: The vertical space between the 'Reimagined Passes Starting at $799' section and the registration widget below it is inconsistent — there is a visible gap that is larger than the 96px maximum in the spacing scale, creating an unexplained void.
  - Fix: Set margin-top on the registration widget section to 64px (one spacing-scale step down from 96px) to tighten the relationship between the pricing callout and the registration form.
**Visual hierarchy — 3/7**
- [critical] Hero section, desktop and mobile: The primary registration CTA ('Book Online Now') is the third of three buttons in the hero and is visually the smallest and least prominent — it renders at a smaller apparent size than the 'View Event Guide' and 'Sponsorship Opportunities' buttons. The accent color (#FF5A36 per brand config) does not appear to be applied to the 'Book Online Now' button in the hero, meaning the primary conversion action is not the most visually dominant element above the fold. This aligns with the conversion instrumentation finding of no detectable registration CTA.
  - Fix: Make 'Book Online Now' the sole primary button in the hero: apply the accent color (#FF5A36) as its background, increase its padding and font-weight relative to the secondary buttons, and ensure it is the largest button in the hero. Demote 'View Event Guide' and 'Sponsorship Opportunities' to text links or ghost buttons.
- [major] Testimonial section, desktop: The 'Hear from Past Attendees' section features a large TDECU logo (red, high contrast) and a testimonial card, but the logo dominates the visual weight of the section more than the testimonial quote itself. The attendee attribution ('VP Corporate Real Estate') is visually subordinate to the sponsor logo, inverting the intended hierarchy of peer endorsement over brand recognition.
  - Fix: Reduce the TDECU logo to a secondary size (e.g., max-height: 32px) within the attribution line, and increase the font size of the testimonial quote to be the visual anchor of the section.
- [major] Navigation bar, desktop: The nav bar 'Book Online Now' button (top right) uses what appears to be the accent color but is rendered very small within the navbar, while the hero has three competing CTA buttons. There is no clear single dominant CTA that a first-time visitor's eye would land on immediately.
  - Fix: Ensure the sticky nav CTA and hero CTA are visually consistent — both using #FF5A36 fill — and remove competing secondary CTAs from the hero fold so the registration action is unambiguous.
**Consistency — 4/7**
- [major] CTA buttons, throughout page: Button styling is inconsistent across sections: the hero has three different button visual weights, the pricing section uses a purple/indigo 'View New Rates' button that does not match the brand color palette (#FF5A36 accent, #0A2540 primary), the 'View All Speakers' and 'View All Sponsors' buttons appear to use a third style (outlined with a different border color), and the SRS widget 'Continue' button uses yet another color (#5696CB from the widget CSS). At least four distinct button treatments are visible.
  - Fix: Standardize to two button treatments site-wide: primary (fill #FF5A36, white text) for registration and key CTAs, and secondary (outline #0A2540, dark text) for supplementary actions. Update the pricing section 'View New Rates' button and SRS widget 'Continue' button to use the primary treatment.
- [major] Speaker cards vs. topic cards vs. testimonial card, desktop: Three different card styles are used across the page: speaker cards have circular image crops, no border, and centered text; topic cards have rectangular images with no radius and left-aligned text; the testimonial card has a full colored background with a quotation mark icon. While visual variety between section types is acceptable, within each section the card treatment is not fully consistent — for example topic cards appear to have slightly different image aspect ratios from card to card.
  - Fix: Lock topic card images to a consistent aspect ratio (e.g., 16:9) using aspect-ratio: 16/9; object-fit: cover; on the img element so all four cards present identical image frames.
- [minor] Section divider labels, throughout page: Some section eyebrow labels use a rule-line on both sides of the text (e.g., '— WHO YOU'LL HEAR FROM —') while at least one section ('PARTNERING FOR TOMORROW') uses a slightly different decorative treatment. The inconsistency is subtle but visible on close inspection.
  - Fix: Standardize the eyebrow/divider label component to a single CSS class used in all sections.
**Responsive integrity — 4/7**
- [major] Sponsors section, mobile (390px): On mobile the sponsor logos appear to wrap onto multiple lines with inconsistent sizing — some logos are noticeably larger than others and the layout does not appear to use a uniform grid, resulting in a ragged multi-row arrangement that looks unfinished.
  - Fix: Use a CSS grid with a fixed number of columns (e.g., 2 or 3 per row) on mobile with all logos normalized to the same max-height and aligned to center, so the sponsor block looks intentional on narrow screens.
- [major] Hero section, mobile (390px): On mobile, the hero shows the event tagline, title, dates, and three CTA buttons stacked, but the three buttons appear to each take different widths and are not full-width on mobile, making touch targets small and the visual weight of the CTA hierarchy unclear. The hero image appears to be hidden or pushed below the fold on mobile, reducing the visual impact of the hero significantly.
  - Fix: On mobile, set all hero buttons to width: 100% for consistency and touch usability. Surface the hero image as a background or stacked element above the text so the hero still communicates visually on narrow screens.
- [minor] Registration widget, mobile (390px): The package selection tabs ('Practitioner/CRE/Workplace/Facilities', 'Designer/Architect/Broker', 'Vendors') overflow their container on mobile — the tab labels appear truncated or the tab bar requires horizontal scrolling, which is not visually indicated.
  - Fix: On mobile, convert the horizontal tab pills to a stacked vertical list or a select/dropdown element so all category options are accessible without horizontal scrolling.
**Visual accessibility — 3/7**
- [critical] Multiple interactive elements, throughout page: The axe-core scan confirms 12 nodes with insufficient color contrast (WCAG 2 AA failures). Visually, the most apparent instance is the ghost/outline secondary CTA buttons which use a light stroke on a white background with body-weight text — these are likely failing the 4.5:1 minimum ratio for normal text. Additionally, section eyebrow labels in a pale color over white background appear low-contrast.
  - Fix: Audit all button text, link text, and label text against their backgrounds using a contrast checker. Ensure all text meets 4.5:1 (normal text) or 3:1 (large text/UI components). Darken ghost button strokes to #0A2540 at full opacity and increase eyebrow label color contrast.
- [critical] IQPC logo link, footer area: The axe-core scan flags the IQPC logo anchor as having no discernible text (link-name failure) and the logo image has no alt text (image-alt failure). This means screen reader users cannot determine what the link is or where it goes.
  - Fix: Add descriptive alt text to the IQPC logo image (e.g., alt='IQPC — Event Organizer') and add an aria-label to the anchor element (e.g., aria-label='Visit IQPC website').
- [major] Speaker photos, desktop: Speaker profile images are circular crops placed over their natural photograph backgrounds. Where the photograph background is light-toned and the circular crop bleeds to white, there is no border or shadow to distinguish the image boundary, causing the card to appear to have a missing or clipped image at a glance.
  - Fix: Add a subtle 1px border (e.g., border: 1px solid #E0E0E0) or a 4px box-shadow to all circular speaker images to provide a clear visual boundary regardless of photo background color.
- [major] Cookie consent banner, page load (desktop and mobile): The cookie consent banner uses a dark (#252525) background with white text, which is good for contrast, but the dismiss button uses background: #595959 — dark grey on dark grey — giving it very low contrast against the banner background. The button may fail the 3:1 UI component contrast ratio.
  - Fix: Change the cookie consent dismiss button to use a white or accent-colored background with dark text to ensure it is visually distinguishable from the banner background.

## Brand Compliance — 48/100
The WorkX 2026 microsite satisfies all five required elements and presents a generally professional, benefit-led tone. However, the accent color (#FF5A36 / orange) is applied well beyond CTAs and key highlights — it bleeds into section dividers, inline text links, speaker name labels, and decorative rule lines throughout the page, diluting its intended role as a high-priority signal. Additionally, the footer area lacks a clearly visible privacy policy link at the viewport level reviewed, and the logo placement on the dark hero section requires closer scrutiny for adequate clear space on mobile. Missing required elements: Privacy policy link in footer.

**Required elements**
- ✓ Event name and dates in the hero — Hero clearly shows 'WorkX Conference' and 'August 10–12, 2026' in the top-left of the hero block on both desktop and mobile.
- ✓ Venue / location — 'San Francisco, CA' is displayed in the hero beneath the dates on both breakpoints.
- ✓ Primary registration CTA above the fold — 'Book Online Now' button appears in the hero on desktop; a CTA button is visible above the fold on mobile as well.
- ✓ IQPC or portal brand logo — SSON logo appears in the top-left of the global nav and in the footer 'In Partnership With: SSON' block. IQPC copyright mark is visible in the footer.
- ✗ MISSING Privacy policy link in footer — The footer contains contact details and partner logos but no visible 'Privacy Policy' hyperlink is discernible in either the desktop or mobile screenshot. The cookie consent banner references a Cookie Policy but a standalone Privacy Policy footer link is not confirmed visible.

**Token scan (deterministic)**
- [major] Off-palette color #212529 is used on 446 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #590167 is used on 150 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #0C2341 is used on 31 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #191E52 is used on 29 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #006496 is used on 25 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Roboto, sans-serif" is used on 945 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Footer: No Privacy Policy link is visible in the footer on either desktop or mobile screenshots. A cookie consent bar references cookie policy inline but a standalone, persistently accessible Privacy Policy link — a legally required element per brand config — is absent.
  - Fix: Add a clearly labeled 'Privacy Policy' hyperlink in the footer, ideally alongside any Terms of Use or Cookie Policy links, in a consistent and accessible location.
- [major] Page-wide — section dividers, speaker names, inline text links, decorative rules, 'WHO YOU'LL HEAR FROM' / 'WHY ATTEND WORKX?' label lines: The accent color (#FF5A36 / orange) is used as a decorative color for section-header rule lines, small caps category labels (e.g. 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?', 'NEW PRICING AVAILABLE', 'INSIGHTS FROM YOUR PEERS'), speaker name hyperlinks, and inline body-copy links throughout the page. Brand config explicitly reserves accent for CTAs and key highlights only. This widespread decorative use dilutes accent-color hierarchy and reduces the visual prominence of actual CTAs.
  - Fix: Restrict accent color to: (1) primary CTA buttons ('Book Online Now', 'View New Rates', 'Continue'), (2) no more than one or two genuinely critical highlights per section. Replace accent on decorative rule lines and section labels with the primary color (#0A2540) or a neutral. Replace accent on speaker name links with the primary color or a standard link color.
- [major] Hero section — mobile (390px): On mobile, the SSON/WorkX logo appears very small in the global nav bar and the WorkX event wordmark in the hero has minimal clear space above it — the supergraphic/tagline text ('NO BUDGET, NO EXCUSES: HOW THE OFFICE STILL DELIVERS') sits immediately above the logomark with apparent clearance less than the height of the logomark itself, violating the minimum clear-space rule.
  - Fix: Increase top padding/margin above the WorkX event logo in the hero on mobile to at least equal the height of the logomark. Ensure the tagline text does not encroach within the protected clear-space zone.
- [minor] Hero — desktop and mobile, tagline text: The hero sub-headline reads 'NO BUDGET, NO EXCUSES: HOW THE OFFICE STILL DELIVERS' in all-caps small text above the event name. While energetic, the phrase 'No Excuses' is edgy and could read as confrontational rather than benefit-led. Brand tone requires 'Professional, energetic, benefit-led' and prohibits unverifiable superlatives. While not a superlative, the confrontational framing risks misrepresenting the event's constructive positioning.
  - Fix: Consider softening or reframing to a benefit-led statement, e.g., 'NO BUDGET, NO PROBLEM: HOW THE OFFICE DELIVERS ROI' or keeping it as a section header rather than the primary hero tagline, to better align with the professional, benefit-led tone.
- [minor] Testimonial / 'Hear from Past Attendees' section: The testimonial block prominently features the TDECU logo ('TDECU — YOUR CREDIT UNION') in large red brand typography, which introduces a third-party brand color (strong red) as a dominant visual element in a large card. This creates an off-brand accent that competes with the site's own color system and could confuse visitors about whose brand they are on.
  - Fix: Display sponsor/attendee logos in a neutral, monochrome or grayscale rendering within testimonial cards to prevent third-party brand colors from visually overriding the portal's own palette. Alternatively, reduce the logo size so it is clearly subordinate to the quote text.
- [minor] Pricing / registration section — 'Reimagined Passes Starting at $799' block: The section label 'NEW PRICING AVAILABLE' uses the accent color as a decorative tag, and the CTA button 'View New Rates' appears in the accent color correctly, but the surrounding body copy uses the phrase 'making it easier for practitioners to attend' which is passive and vague. Additionally, 'Reimagined Passes' is a mildly unverifiable marketing claim (what was 'reimagined' is not substantiated on the page).
  - Fix: Replace 'Reimagined Passes' with a specific, verifiable claim such as 'Flexible Passes' or 'Tiered Passes for Every Budget'. Tighten body copy to be more active and benefit-specific.

## SEO Audit — 62/100
WorkX 2026 has a solid content foundation and — contrary to the deterministic check flag — already contains a well-populated schema.org Event JSON-LD block in the rendered HTML. The primary SEO weaknesses are an over-long, unfocused meta description that will be truncated by every search engine, a title tag that omits the most searchable topic keywords (workplace conference, facilities, CRE), and an H1 that is too generic to reinforce keyword relevance for mid-funnel queries. Keyword coherence between the on-page copy and metadata is reasonable but underdeveloped: terms like 'workplace strategy', 'facilities management', and 'corporate real estate conference' appear in body content but are absent from title and meta description.

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
- [critical] Meta description is 446 characters — nearly 3× the ~155-character display limit. Google will truncate it unpredictably, cutting off the benefit-led copy and wasting the click-through opportunity. The opening line ('leading workplace conference that covers all things workplace') also uses an unverifiable superlative ('leading') and a vague phrase ('all things workplace').
  - Fix: Rewrite to 150–160 characters. Lead with the specific audience and value proposition; include primary keywords (workplace conference, facilities, corporate real estate) and the location/date hook.
- [critical] Title 'WorkX August 2026 | San Francisco' is only 33 characters and contains no descriptive keyword beyond the brand name. Users searching for 'workplace strategy conference 2026', 'facilities management conference San Francisco', or 'corporate real estate event 2026' will not see this result as relevant. The brand name 'WorkX' is not yet widely recognised, making a keyword-lean title a significant missed opportunity.
  - Fix: Expand title to include primary topic keywords while staying ≤60 characters. Format: [Brand] [Descriptor] [Year] | [Location].
- [major] The H1 is a bare brand label with no topical signal. It does not match likely search queries ('workplace strategy conference', 'corporate real estate summit', 'facilities management event') and creates a disconnect between what crawlers infer as the page's primary topic and the richer copy below.
  - Fix: Expand the H1 to incorporate the event's core audience and value descriptor without keyword stuffing. This also improves accessibility as a meaningful landmark heading.
- [major] The Event schema location has name 'San Francisco, CA' but streetAddress, postalCode, and telephone are all empty strings. The venue name itself (the specific hotel or convention centre) is missing. Google's Event rich-result eligibility requires a populated, specific location; empty address fields reduce eligibility and may suppress the rich result.
  - Fix: Add the specific venue name and full postal address once confirmed. Until confirmed, set streetAddress and postalCode to null rather than empty strings to avoid malformed output.
- [major] offers.validFrom is set to '2026-08-10' (the event start date), which implies tickets only become available on the day of the event — illogical and potentially misleading to Google. The offer availability URL ('https://www.ssonetwork.com/events-workx/InStock') is non-standard; schema.org Offer availability should use a schema.org enumeration value, not a custom URL.
  - Fix: Set offers.validFrom to today's publish date or the date early-bird pricing opened. Set offer.availability to 'https://schema.org/InStock'.
- [major] '@id' is set to 'https://www.iqpc.com#event' but the event page lives on ssonetwork.com. The @id should be unique and dereferenceable to this specific event, not the parent domain's generic event anchor.
  - Fix: Set @id to the canonical URL of this event page with a meaningful fragment, e.g. 'https://www.ssonetwork.com/events-workx#event'.
- [minor] The OG and Twitter card image points to what appears to be a small logo PNG. Social platforms recommend 1200×630 px images for optimal unfurl display. A logo-only image produces poor share previews and reduces click-through from social.
  - Fix: Replace with a purpose-built event social share image at 1200×630 px featuring the event name, date, and location against a brand-appropriate background.
- [minor] The keywords meta tag is present but empty. While Google ignores this tag for ranking, Bing still indexes it lightly, and an empty tag is a missed low-cost signal for secondary engines. More importantly, the empty tag suggests no formal keyword strategy has been documented for this page.
  - Fix: Populate with 8–10 relevant terms: 'workplace conference 2026, facilities management conference, corporate real estate summit, workplace strategy, CRE conference San Francisco, hybrid work conference, workplace design, facilities leaders'.
- [minor] No robots meta tag is present. While this defaults to index/follow, explicitly declaring it is a best-practice signal and guards against accidental CMS changes that might leave the page in a noindex state without clear auditability.
  - Fix: Add <meta name="robots" content="index, follow"> to the <head>.
- [minor] The WebSite schema block has name 'WorkX' but url 'https://www.iqpc.com' — the event microsite URL (ssonetwork.com/events-workx) is not represented. This creates a confusing entity signal where the 'WorkX' brand is associated with the IQPC root domain rather than the event page.
  - Fix: Either remove this WebSite block from the event microsite (it belongs on the root domain) or update url to 'https://www.ssonetwork.com/events-workx' and align name accordingly.

**Improved metadata (ready to apply)**
- Title: WorkX 2026 | Workplace & Facilities Conference | San Francisco
- Meta description: WorkX 2026 · Aug 10–12, San Francisco. Benchmarks, cost-justification playbooks, and peer-led strategies for workplace, facilities, and corporate real estate leaders.

## Accessibility (axe-core, deterministic)
- **[critical]** aria-valid-attr-value: Ensure all ARIA attributes have valid values (3 element(s), e.g. `#tier-6994e6cc50cb2108c7583cfb-tab`)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (12 element(s), e.g. `a[role="button"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (7 element(s), e.g. `#wlxOz > h6`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `a[href$="www.iqpc.com"] > .d-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[serious]** link-name: Ensure links have discernible text (1 element(s), e.g. `a[href$="www.iqpc.com"]`)
- **[serious]** listitem: Ensure <li> elements are used semantically (3 element(s), e.g. `.px-2.nav-link:nth-child(1)`)
- **[moderate]** region: Ensure all page content is contained by landmarks (26 element(s), e.g. `.template-6-header-container`)