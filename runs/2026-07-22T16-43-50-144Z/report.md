# Microsite QA Report
**URL:** https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk
**Date:** 2026-07-22T16:47:55.905Z
**Verdict:** BLOCK — 3 critical/serious accessibility violation(s) (axe-core)
**Weighted score:** 44/100  (Design QA: 52 · Brand Compliance: 21 · SEO Audit: 62)

## Conversion instrumentation (deterministic)
- Analytics detected: GA4 / Google Tag Manager, LinkedIn Insight Tag
- Missing: Meta Pixel
- Registration CTAs found: 3
  - "JOIN US IN LONDON" → https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk/downloads/request-an-invitation [HTTP 200] 
  - "JOIN US IN EUROPE" → https://www.cxnetwork.com/events-customer-experience-exchange-retail-europe [HTTP 200] 
  - "JOIN US IN ATLANTA" → https://www.cxnetwork.com/events-customer-experience-exchange-retail-us [HTTP 200] 
- UTM propagation: not_tested
- **[major]** MISSING_PIXEL: Meta Pixel not detected — conversions from this page cannot be measured/attributed for that channel.

## Performance
- Skipped via --skip-perf

## Design QA — 52/100
The CX Retail Exchange UK microsite is functional and contains most required elements, but exhibits several visible quality issues that would concern a professional designer before publication: inconsistent button colors that deviate from brand config, a sponsor logo row with clipped/broken alignment, and a hero that—while present—uses a font stack (Raleway) inconsistent with the brand-specified Archivo/Inter. The page communicates the event well at a glance but carries enough rough edges to reduce credibility for an invitation-only, premium-positioned event.

**Layout & grid — 4/7**
- [major] Past Sponsors row, desktop: Sponsor logos in the first row appear left-aligned and clipped at the left edge ('nLabs', 'rofound'), suggesting the logo grid overflows its container or the first column is partially hidden behind a section edge. The row reads as broken rather than intentional.
  - Fix: Ensure the sponsor logo grid is wrapped in a centered, max-width container with equal left/right padding (minimum 32px). Use CSS grid or flexbox with wrap and center justification so no logo is clipped.
- [major] Photo Gallery section, desktop: The 'Request your invite to join us in London' CTA box appears to float at the right of the photo gallery grid without matching the height of the photo tiles, creating an unanchored, asymmetric layout.
  - Fix: Either make the CTA box span the full height of the gallery row using align-items:stretch on the flex parent, or place it below the gallery as a centered standalone CTA block.
- [minor] Two-column content section (Powering Personalisation), desktop: The image on the left and the text block on the right do not appear to share a common baseline or top alignment — the text block starts noticeably lower than the image top edge.
  - Fix: Add align-items:flex-start (or center) to the row container so both columns share the same vertical origin.
**Typography — 3/7**
- [major] Entire page: The brand config specifies Archivo for headings and Inter for body text. The rendered CSS instead loads and applies Raleway for both primary and secondary font families. This is a direct brand deviation that will be caught by anyone comparing the page to brand guidelines.
  - Fix: Replace the CSS custom property --primary-font and --secondary-font values with 'Archivo, sans-serif' and 'Inter, sans-serif' respectively, and add both Google Fonts imports.
- [major] Hero section, desktop: The H1 is set to 55px in CSS but the brand type scale specifies 48px and 64px as the largest two steps. 55px sits between two defined scale steps and is off-scale.
  - Fix: Change the h1 font-size to 48px or 64px to align with the defined type scale.
- [minor] Body copy sections (Powering Personalisation, Sponsorship Opportunities), desktop: At the current container width, several body text paragraphs appear to run close to the full section width, potentially exceeding 90 characters per line, which reduces readability.
  - Fix: Constrain body text columns to max-width:65ch to keep line length within the 45–90 character guideline.
**Spacing & rhythm — 4/7**
- [major] Secure Your Place / invitation CTA banner, desktop: The pink CTA banner between the article section and 'Past Expert Speakers' appears to have substantially less top and bottom padding than other section banners on the page, making it look cramped relative to its neighbors.
  - Fix: Apply consistent vertical padding of at least 48px top and bottom to this banner, matching the spacing rhythm of other full-width CTA strips on the page.
- [minor] Past Expert Speakers section, desktop: The gap between the speaker avatar circles and their name/title labels below appears tighter than the gap between the speaker cards themselves, violating the proximity principle by making labels feel disconnected.
  - Fix: Increase margin-top on speaker name labels to at least 12px and reduce inter-card gap if needed to maintain a clear label-to-card relationship.
- [minor] The CX Retail Exchange Series section, desktop: The gradient background section containing 'JOIN US IN EUROPE' and 'JOIN US IN IRELAND' buttons has noticeably more bottom padding than top padding, creating uneven internal rhythm.
  - Fix: Set symmetric vertical padding (e.g., padding: 64px 32px) on this section container.
**Visual hierarchy — 4/7**
- [major] Hero section, desktop and mobile: There are three CTA buttons in the hero: 'Request Your Invite', 'Download Post Event Report', and 'Become a Sponsor'. All three are rendered at the same visual weight (similar size and prominence). The primary registration action ('Request Your Invite') does not read as clearly dominant — it competes equally with secondary actions.
  - Fix: Give 'Request Your Invite' the accent fill (#FF5A36 per brand config), make it slightly larger, and render the secondary CTAs as outline/ghost buttons or place them in secondary positions below.
- [minor] Sponsorship Opportunities section, desktop: The 'Find Out More' CTA button in the Sponsorship section uses what appears to be a magenta/pink color identical to the invitation CTA strip above, causing two competing accent colors to appear without hierarchy differentiation.
  - Fix: Use the brand accent (#FF5A36) for all primary CTAs consistently, reserving other colors for decorative or category-labeling purposes only.
**Consistency — 3/7**
- [major] CTA buttons, page-wide: Buttons across the page appear in at least four distinct color treatments: cyan/teal (primary-color: #00c9ff per CSS), magenta/pink (secondary-color: #ff3fb1), a green/teal in some sections, and what appears to be orange-red in others. None of these map to the brand config accent (#FF5A36). The button color system is incoherent and contradicts brand guidelines.
  - Fix: Audit all button instances and standardize: primary CTAs use #FF5A36 (brand accent), secondary CTAs use #0A2540 (brand primary) or outlined variant. Remove all use of #00c9ff and #ff3fb1.
- [major] Article/content cards (bottom third of page), desktop: The three article cards ('When Points Stop Working', 'CX Retail Exchange Post Event Report 2025', '5 Signs your Retail Strategy is Truly Omnichannel') have inconsistent card heights and the 'READ MORE' label styling differs across cards — some appear as plain text links, others as button-styled elements.
  - Fix: Standardize the article card component: equal min-height, consistent padding, and a single 'Read More' link style applied uniformly.
- [minor] Section headings throughout page: Some section headings use all-caps styling ('PAST EXPERT SPEAKERS INCLUDE...', 'OUR PAST SPONSORS') while others use title case ('Benefits of Attending a CX Retail Exchange', 'Sponsorship Opportunities'). The mixed capitalization convention reads as inconsistency rather than intentional hierarchy.
  - Fix: Choose one capitalization convention for same-level section headings and apply it uniformly. Title case is recommended per the professional/benefit-led tone.
**Responsive integrity — 4/7**
- [major] Sponsor logos section, mobile (390px): On mobile, the sponsor logo grid shows only one or two logos per row with large logos (e.g., 'Contentsquare') occupying disproportionate space, while smaller logos appear visually inconsistent in scale. The grid does not normalize logo sizes to a uniform display height.
  - Fix: On mobile, set all sponsor logo images to max-height: 40px; width: auto; and ensure the flex grid shows 2–3 per row with consistent spacing.
- [major] Hero section, mobile: On mobile the hero still communicates the event name and date, but the three stacked CTA buttons (Request Invite, Download Report, Become a Sponsor) take up a significant portion of the visible viewport, pushing the date/location tagline partially below the fold before the user has read it.
  - Fix: On mobile, show only the primary CTA ('Request Your Invite') above the fold in the hero. Move secondary CTAs below the hero intro text or collapse them.
- [minor] Two-column 'Wondering what's in store?' section, mobile: On mobile, the image (Post Event Report cover) and the text block appear to stack correctly, but the image appears very large relative to the text that follows, creating a disproportionate visual weight before the copy.
  - Fix: Constrain the stacked image to max-height: 220px on mobile so the CTA text and button are closer to the visible viewport.
**Visual accessibility — 3/7**
- [critical] Hero CTA buttons and multiple section buttons, page-wide: The axe-core scan confirms 17 affected nodes with failing color contrast on .btn-primary elements. Visually, cyan (#00c9ff) text or buttons on white/light backgrounds, and white text on the cyan button background, are both likely to fail WCAG AA 4.5:1 for normal text. This is compounded by the brand deviation — the correct accent (#FF5A36 on white) also needs verification but is not currently in use.
  - Fix: Correct button colors to brand-specified #FF5A36 with white text (#FFFFFF), which provides approximately 3.1:1 — still below AA for small text. Use a darker shade (#CC4520) if needed to reach 4.5:1, or ensure button text is at least 18px bold (large text threshold of 3:1 applies).
- [major] Hero section, desktop — event subtitle text over background image: The tagline text ('The Exclusive, Invitation-only Event for CX, CS, & Digital Retail Leaders in the UK') appears over a photographic background. While there is a dark overlay, the text in some regions where the image is lighter (right side) may not maintain adequate contrast, particularly for the white body text against lighter image areas.
  - Fix: Ensure the hero image overlay is at least rgba(0,0,0,0.55) across the full hero width, or add a gradient scrim that is darkest where the text sits.
- [major] Testimonial/quote section — large quotation mark and text on pink/magenta gradient: The community testimonial section uses a bright pink-to-cyan gradient background with white quote text. The transition through mid-gradient tones reduces contrast for the white text, and the oversized decorative quotation mark may obscure portions of the actual quote copy.
  - Fix: Use a solid dark background (#0A2540) for this section or ensure the gradient stays dark enough (minimum contrast 4.5:1) throughout. Move the decorative quote mark entirely behind the text as a low-opacity watermark.
- [minor] Footer, desktop: The footer contains small-print text (address, telephone, links) that appears to be rendered at approximately 11–12px on a dark background. Text at this size requires a higher contrast ratio and is at risk of failing WCAG AA for normal text.
  - Fix: Increase footer small text to minimum 13px and verify contrast ratio meets 4.5:1 against the footer background.

## Brand Compliance — 21/100
This microsite is for 'CX Retail Exchange UK' on the CX Network portal and does not align with the WorkX 2026 brand configuration provided. The event name, branding palette (cyan/pink vs. #0A2540/#FF5A36), typography (Raleway vs. Archivo/Inter), and portal identity are all mismatched against the supplied brand config. Assessed purely on adherence to the provided brand configuration, most structural elements fail; however, the page is internally coherent as a CX Network event page and does contain several of the required structural elements in its own right.

**Required elements**
- ✓ Event name and dates in the hero — Hero displays 'CX Retail Exchange' with dates '30 June – 1 July 2027, London, UK' — event name is present but does not match the configured event 'WorkX 2026'.
- ✓ Venue / location — Hero and footer both state 'London, UK'; a specific venue name is not visible in the hero copy or footer address block beyond 'London, UK'.
- ✓ Primary registration CTA above the fold — 'Request Your Invite' button is visible in the hero above the fold on both desktop and mobile.
- ✓ IQPC or portal brand logo — IQPC logo appears in the footer ('In Partnership With' section). The CX Network logo appears in the nav. Neither is the configured portal logo for 'Example Portal / WorkX 2026'.
- ✓ Privacy policy link in footer — Footer contains a 'Privacy Policy' link visible in the footer navigation bar on desktop screenshot.

**Token scan (deterministic)**
- [major] Off-palette color #212529 is used on 247 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #212121 is used on 182 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #222222 is used on 89 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #0D6EFD is used on 28 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Raleway, sans-serif" is used on 835 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Entire page: The microsite is for 'CX Retail Exchange UK', not the configured event 'WorkX 2026'. The event name, branding, and portal identity do not match the brand configuration under review. Publishing this page as a WorkX 2026 microsite would fundamentally misrepresent the event.
  - Fix: Confirm whether the correct brand configuration was supplied. If this page is intended to be the WorkX 2026 microsite, all event naming, hero copy, and metadata must be updated. If this is a CX Retail Exchange page, it should be reviewed against the CX Network brand config, not WorkX 2026.
- [critical] Global — primary brand color and CTA buttons: The site uses cyan (#00c9ff) and hot pink (#ff3fb1) as primary and secondary button/accent colors (defined in CSS custom properties --primary-color and --secondary-color). These are entirely absent from the brand config which requires primary #0A2540 and accent #FF5A36. CTAs such as 'Request Your Invite', 'Download Post Event Report', and 'Become a Sponsor' render in cyan/pink rather than the mandated accent #FF5A36.
  - Fix: Replace --primary-color with #FF5A36 and --secondary-color with #0A2540 (or white on dark) in the CSS custom properties. Audit all CTA buttons to ensure they use only #FF5A36 for accent actions.
- [critical] Global — typography: The page loads Raleway as both --primary-font and --secondary-font. The brand configuration mandates Archivo for headings and Inter for body copy. Raleway is not in the approved type stack.
  - Fix: Replace the Google Fonts import and CSS custom properties to load Archivo (headings) and Inter (body). Update --primary-font to 'Archivo' and --secondary-font to 'Inter'.
- [major] Hero section — logo placement: The CX Retail Exchange logo in the hero is placed directly over a busy photographic background without a visible scrim or sufficient contrast treatment. The brand config states logos must never be placed over busy imagery without a scrim.
  - Fix: Add a semi-transparent dark overlay (e.g., rgba(10,37,64,0.55)) behind the logo in the hero, or reposition the logo to a clean area of the image. Alternatively apply the reversed (white) logo variant on the dark scrim.
- [major] Mid-page — accent color overuse: The bright pink/magenta (#ff3fb1 equivalent) accent color is used extensively across non-CTA elements: section background bands, pull-quote blocks, decorative dividers, and the 'A Five Star Event!' testimonial section background. The brand config reserves the accent color exclusively for CTAs and key highlights.
  - Fix: Restrict pink/accent usage to CTA buttons and a maximum of one or two key callout highlights per page. Replace decorative section backgrounds with the brand primary (#0A2540) or white (#FFFFFF).
- [major] Hero — date discrepancy: The hero displays dates '30 June – 1 July 2027' while the structured data JSON-LD specifies startDate: '2027-06-30'. The brand config event is 'WorkX 2026', implying a 2026 date. The displayed year (2027) may be incorrect or this is the wrong event entirely.
  - Fix: Verify the correct event year with the event owner and update both the visible hero dates and all JSON-LD structured data to match. Ensure consistency between displayed copy and machine-readable metadata.
- [major] Sponsor logo grid — 'Our Past Sponsors' section: The sponsor logo grid appears to show some logos with inconsistent sizing, and at least one logo ('Equal Experts') appears duplicated in two separate rows. Duplicate sponsor logo display can create an impression of error or low production quality.
  - Fix: Audit the sponsor logo list for duplicates and remove any repeated entries. Standardize all sponsor logo heights to a consistent value (e.g., 40px max-height) with object-fit: contain.
- [minor] Hero — tone of voice: The hero subheadline reads 'The Exclusive, Invitation-only Event for CX, CS, & Digital Retail Leaders in the UK'. The comma after 'Exclusive' is grammatically nonstandard and the phrase 'Invitation-only' hyphenation is inconsistent with the title-case styling. More substantively, 'The UK's leading' (used in meta description) is an unverifiable superlative that the brand config prohibits.
  - Fix: Remove or qualify 'The UK's leading' from the meta description. Tighten the hero subheadline to remove the awkward comma: 'The exclusive invitation-only event for CX, CS & Digital Retail Leaders in the UK'.
- [minor] Testimonial / pull-quote section — 'A Five Star Event!': The section heading 'A Five Star Event! Hear From The CX Retail Community:' uses an exclamation mark. The brand config explicitly prohibits exclamation-mark stacking and the tone guidance discourages this pattern in headings.
  - Fix: Rewrite the section heading to remove the exclamation mark: 'A Five-Star Event: Hear From The CX Retail Community' or 'What Attendees Say About CX Retail Exchange'.
- [minor] Footer — logo clear space: The IQPC logo in the footer 'In Partnership With' section appears tightly constrained with minimal padding relative to adjacent text and border elements, potentially violating the minimum clear-space rule (equal to the height of the logomark on all sides).
  - Fix: Increase padding around the IQPC logo in the footer to ensure clear space on all four sides equals at least the height of the logomark itself.

## SEO Audit — 62/100
The page has solid technical foundations — existing Event schema, canonical, and near-complete image alt coverage — but the title tag is critically short and keyword-thin (21 chars, no year or date signal), the meta description is nearly three times the recommended length at 449 characters (Google will truncate ~70% of it), and the H1 uses vague filler language ('Exclusive, Invitation-only') that displaces high-value search terms like 'retail CX conference UK 2027'. Keyword coherence between the title, H1, and on-page copy is weak because the primary event year and format descriptors appear inconsistently across metadata layers. The schema itself has meaningful gaps: blank highPrice/lowPrice fields and an empty streetAddress for the venue undermine rich-result eligibility.

**Structural checks (deterministic)**
- Title: "CX Retail Exchange UK" (21 chars)
- Meta description: 449 chars
- Open Graph: ✓ complete enough for share cards
- Canonical: ✓ · Viewport: ✓ · Robots: —
- H1 count: 1 · Image alt coverage: 96% of 84
- Event structured data (JSON-LD): ✓ present

**Findings**
- [minor] Meta description is 449 chars (will truncate).
  - Fix: Trim to ≤160 characters.
- [critical] Title is only 21 characters and contains no year, no event format signal ('conference', 'summit', 'exchange'), and no location qualifier beyond 'UK'. A user searching 'retail customer experience conference UK 2027' will see nothing in the SERP title that confirms date relevance.
  - Fix: Expand to 50–60 characters including the event year and a primary keyword. Example: 'CX Retail Exchange UK 2027 | Retail CX Conference London'.
- [critical] At 449 characters the meta description is nearly three times the 150–160 character limit. Google will truncate it after roughly the first 155 characters, cutting off every concrete benefit claim. The surviving snippet ends at '…this exclusive forum offers strategic insights into loyalty, per—' — losing AI-CX, roundtables, and the registration intent hook entirely.
  - Fix: Condense to 150–160 characters, front-loading the year, location, and the two strongest benefit signals (AI-driven CX, invitation-only) to survive truncation.
- [major] The H1 prioritises exclusivity framing over search-intent keywords. Phrases like 'The Exclusive, Invitation-only Event' consume character budget without matching how a target attendee searches. Core terms 'retail CX conference', '2027', and 'London' are absent. 'CS' is unexplained (customer service? computer science?) and adds ambiguity for both crawlers and users.
  - Fix: Rewrite the H1 to open with the primary keyword phrase and include the year and city. Expand 'CS' to 'Customer Service' or remove if redundant. Example: 'The UK's Premier Retail Customer Experience Conference — London, 2027'.
- [major] Both social titles mirror the bare 21-character page title, wasting the social card headline slot. Social shares are a click-through and indirect ranking signal; a richer title increases CTR from LinkedIn and Twitter where the audience (senior retail CX professionals) is concentrated.
  - Fix: Set og:title and twitter:title to a slightly more conversational variant of the improved title, e.g., 'CX Retail Exchange UK 2027 | London Retail CX Conference'.
- [major] The AggregateOffer has blank highPrice and lowPrice strings (""). This causes a schema validation warning and prevents Google from rendering price information in Event rich results. offerCount is also '0', which signals no available tickets.
  - Fix: If pricing is not yet confirmed, remove the highPrice and lowPrice properties entirely rather than leaving them as empty strings. Set offerCount to a realistic number or remove it. If the event is invitation-only and free-to-attend for delegates, set price to '0' and priceCurrency to 'GBP' on the nested Offer.
- [major] The venue streetAddress and postalCode are empty strings. The schema validates a Place but Google cannot surface a map pin or venue detail in the Event rich result without a complete address. The page copy likely references a specific London venue — that address should be reflected here.
  - Fix: Populate streetAddress and postalCode with the actual venue details visible on the page, or at minimum confirm 'London, UK' is sufficient and remove the empty nested fields to avoid validation noise.
- [major] The Event @id is set to 'https://www.iqpc.com#event' — a generic IQPC root domain identifier — rather than a unique URI for this specific event. Multiple events sharing the same @id will cause entity collision in Google's Knowledge Graph.
  - Fix: Set the Event @id to the canonical URL of this page with a fragment, e.g., 'https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk#event'.
- [major] The WebSite schema has url set to 'https://www.iqpc.com' but the page lives on cxnetwork.com. The name is 'CX Retail Exchange UK' (an event name) rather than the site/portal name 'CX Network'. This misconfiguration could confuse entity association and site-name display in SERPs.
  - Fix: Update the WebSite schema: set 'url' to 'https://www.cxnetwork.com' and 'name' to 'CX Network'.
- [minor] robots_meta is null — no explicit robots directive is present. While Googlebot defaults to index/follow, the absence of a robots meta tag means any accidental staging deployment or CMS misconfiguration could go unchecked. It also prevents explicit nosnippet or max-snippet controls that could protect the meta description from AI-generated overrides.
  - Fix: Add <meta name='robots' content='index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'> to the <head>.
- [minor] Several sponsor entries have empty or invalid 'url' values (e.g., Procera: '', Zoom: '', Treasure Data: 'www.treasuredata.com' without https://, Genesys: 'www.genesys.com' without https://). Malformed URLs can trigger schema validation errors.
  - Fix: Ensure all sponsor URL values either use a fully-qualified https:// URL or are omitted. Remove entries with empty strings from the url property.
- [minor] og:type is set to 'website' rather than a more specific type. While no standard OGP type exists for 'event', using 'website' loses the opportunity to signal event content to platforms that support richer previews (e.g., Facebook Events via og:type='event.public' — non-standard but recognised by Facebook).
  - Fix: Consider setting og:type to 'event.public' for Facebook audiences, or retain 'website' as the safe default. Lower priority than structural fixes.

**Improved metadata (ready to apply)**
- Title: CX Retail Exchange UK 2027 | Retail CX Conference London
- Meta description: Join 200+ senior retail CX leaders at the UK's invitation-only CX Retail Exchange, London 2027. Expert sessions on AI, loyalty, personalisation & digital retail.

## Accessibility (axe-core, deterministic)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (17 element(s), e.g. `.aos-animate.btn-primary[role="button"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (5 element(s), e.g. `.cta-event-date`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `.d-md-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[serious]** link-name: Ensure links have discernible text (3 element(s), e.g. `a:nth-child(4)`)
- **[moderate]** region: Ensure all page content is contained by landmarks (28 element(s), e.g. `.header-container`)