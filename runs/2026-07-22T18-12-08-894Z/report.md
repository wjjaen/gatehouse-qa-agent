# Microsite QA Report
**URL:** https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk
**Date:** 2026-07-22T18:16:27.770Z
**Verdict:** BLOCK — 3 critical/serious accessibility violation(s) (axe-core)
**Weighted score:** 43/100  (Design QA: 52 · Brand Compliance: 20 · SEO Audit: 62)
**vs. previous run (2026-07-22T16:47:55.900Z):** -1 points

## Conversion instrumentation (deterministic)
- Analytics detected: GA4 / Google Tag Manager, LinkedIn Insight Tag
- Missing: Meta Pixel
- Registration CTAs found: 6
  - "JOIN US IN LONDON" → https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk/downloads/request-an-invitation [HTTP 200] 
  - "REQUEST YOUR INVITE" → https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk/downloads/request-an-invitation [HTTP 200] 
  - "REQUEST AN INVITATION" → https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk/downloads/request-an-invitation [HTTP 200] 
  - "JOIN US IN EUROPE" → https://www.cxnetwork.com/events-customer-experience-exchange-retail-europe [HTTP 200] 
  - "JOIN US IN ATLANTA" → https://www.cxnetwork.com/events-customer-experience-exchange-retail-us [HTTP 200] 
  - "REQUEST YOUR INVITE" → https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk/downloads/request-an-invitation [HTTP 200] 
- UTM propagation: not_tested
- **[major]** MISSING_PIXEL: Meta Pixel not detected — conversions from this page cannot be measured/attributed for that channel.

## Performance
- Skipped via --skip-perf

## Design QA — 52/100
The CX Retail Exchange UK microsite is functional and contains most required elements, but presents as a template-assembled page rather than a designed one. Brand color inconsistencies (cyan/pink CTAs instead of the configured accent #FF5A36), an uncontrolled type scale mixing Raleway with no evidence of Archivo/Inter, and visibly uneven spacing throughout the page all undercut the professional tone the event warrants. Mobile stacking is broadly intact but several sections lose hierarchy and touch targets feel cramped.

**Layout & grid — 3/7**
- [major] Featured article / two-column split section, desktop (~400px from top): The left image column and right text column are not vertically aligned at their tops — the image bleeds lower than the text block, and the two halves sit at different vertical anchors, breaking the grid row.
  - Fix: Apply `align-items: stretch` or `align-items: start` consistently to the flex/grid row container so both columns share the same top edge.
- [major] Past Sponsors grid, desktop: Sponsor logos are sized inconsistently — some logos (e.g. 'Labs', 'Profound') render at very large text sizes while others (e.g. 'SIERRA', 'Simple AI') use actual image assets, creating a visually jagged, non-grid-aligned row.
  - Fix: Constrain all sponsor logos to a uniform container height (e.g. 48px) with object-fit: contain and center-align them vertically within a consistent grid column.
- [minor] Photo Gallery section, desktop (near bottom): The photo grid mixes a wide left image with a narrow right column of two stacked images, and the 'Request your invite' CTA card floats without clear grid anchoring — its right edge does not align to the section container boundary.
  - Fix: Define a 3 or 4-column CSS grid for the gallery and place the CTA card as a proper grid cell so all edges align to the grid tracks.
**Typography — 3/7**
- [major] Global / entire page: The brand config specifies Archivo for headings and Inter for body text. The page CSS loads and applies Raleway for both headings and body copy. No evidence of Archivo or Inter is present in the stylesheet.
  - Fix: Import Archivo and Inter from Google Fonts and update the CSS custom properties: `--primary-font: 'Archivo', sans-serif` and `--secondary-font: 'Inter', sans-serif`.
- [major] Hero section, desktop — event date/location line: The date and location text ('30 June – 1 July 2027, London, UK') renders at a size that appears nearly equal to the value-proposition subheadline below it, flattening the heading hierarchy in the most critical section of the page.
  - Fix: Differentiate the date/location line by using a smaller weight or size (e.g. 14–16px, regular weight) relative to the event name (48px) and subheadline (20–24px).
- [major] Body content sections (e.g. 'Secure Your Place' banner, 'Wondering what's in store?' section): Heading sizes throughout the mid-page sections appear to use 4–5 different arbitrary sizes that do not map to the defined type scale [12,14,16,20,24,32,48,64]px — several section headings look visually equivalent to body text, destroying hierarchy.
  - Fix: Audit all heading elements and assign sizes strictly from the brand type scale: H1=48px, H2=32px, H3=24px, H4=20px, body=16px, captions=14px.
- [minor] Speaker cards, desktop: Speaker name and job title are rendered in nearly the same font size and weight, making it hard to distinguish name from title at a glance.
  - Fix: Set speaker name to 16px/700 weight and title to 13px/400 weight in a muted colour (#555) to create clear name-to-title separation.
**Spacing & rhythm — 3/7**
- [major] Mid-page sections (Benefits, Sponsorship, Article rows), desktop: Vertical spacing between sections is inconsistent — some sections feel tightly packed (the 'Benefits of Attending' and 'Benefits of Sponsoring' headings have almost no top margin from the preceding video strip), while others have large unexplained voids (the quote/testimonial pink section).
  - Fix: Apply a consistent inter-section gap of 64px or 96px (from the brand spacing scale) using section padding, and remove ad-hoc margins that create irregular rhythm.
- [major] 'Secure Your Place' pink CTA banner, desktop: The banner text is cramped against the left edge with insufficient left padding, while the CTA button on the right has excessive surrounding whitespace — padding is asymmetric and not drawn from the spacing scale.
  - Fix: Set symmetric horizontal padding of 48px on both sides of the banner container and ensure the button has equal top/bottom padding (13px per the existing btn rule).
- [minor] Speaker grid, desktop: The gap between speaker cards is noticeably smaller than the gap between the speaker grid and the 'View Past Speakers' CTA button below it — proximity grouping is inconsistent.
  - Fix: Set card-to-card gap to 24px and card-grid-to-CTA gap to 32px so the CTA reads as belonging to the section but with a clear hierarchical separation.
**Visual hierarchy — 4/7**
- [major] Hero section, desktop: There are three CTA buttons in the hero ('Request Your Invite', 'Download Post Event Report', 'Become a Sponsor') rendered at similar visual weights. The primary registration CTA should be dominant; the secondary and tertiary CTAs compete with it equally.
  - Fix: Style 'Request Your Invite' as the filled accent button (#FF5A36 background, white text), 'Download Post Event Report' as a ghost/outline button, and 'Become a Sponsor' as a text link or tertiary ghost to establish clear CTA priority.
- [major] Mid-page CTA buttons (multiple sections): CTAs throughout the page use cyan (#00c9ff), pink (#ff3fb1), and magenta colours that are not in the brand palette. These arbitrary colours create a fairground effect and dilute the visual weight hierarchy.
  - Fix: Replace all CTA button colours with the brand accent #FF5A36 for primary actions and #0A2540 for secondary actions, removing the cyan and pink values from the CSS variables.
- [minor] Article/blog card row near bottom, desktop: 'READ NOW' links on the three article cards are styled identically to section headings in weight, making it ambiguous which text is a heading and which is a CTA.
  - Fix: Style 'READ NOW' as a small caps or underlined link at 13–14px rather than a bold block that matches heading weight.
**Consistency — 3/7**
- [major] CTA buttons, global: Buttons across the page use at least five different background colours (cyan, pink, magenta, dark navy, white/outline) with no apparent rule governing which colour is used where. This is not a consistent component system.
  - Fix: Define a maximum of three button variants (primary, secondary, ghost) and enforce them globally, as noted in the Visual Hierarchy axis.
- [major] Section background treatments, global: The page alternates between white, light grey, dark gradient, pink/magenta, and a gradient purple-to-pink background — at least 6 distinct background treatments with no discernible system. This creates a garish patchwork appearance.
  - Fix: Limit background treatments to three: white (#FFFFFF), light grey (#F5F6F7), and brand dark (#0A2540). Reserve gradient or accent backgrounds for one hero section only.
- [minor] Speaker cards vs. article cards, desktop: Speaker cards use circular portrait crops while article cards use rectangular image crops — this is acceptable — but the card container border-radius, shadow, and padding differ between speaker cards and sponsor cards in a way that makes them look like they came from different component libraries.
  - Fix: Define a single card token (e.g. border-radius: 8px, box-shadow: 0 2px 8px rgba(0,0,0,0.08), padding: 16px) and apply it uniformly to all card-type components.
**Responsive integrity — 4/7**
- [major] Past Sponsors grid, mobile: On mobile, sponsor logos that are rendered as large text strings ('Labs', 'Profound') wrap awkwardly and appear disproportionately large relative to the image-based logos beside them, disrupting the sponsor row layout.
  - Fix: Ensure all sponsor entries are image assets at a consistent container height (40px) so they stack cleanly in a 2- or 3-column grid on mobile.
- [major] 'Benefits of Attending' and 'Benefits of Sponsoring' sections, mobile: On mobile these two sections stack vertically as expected, but both heading texts ('Benefits of Attending a CX Retail Exchange' and 'Benefits of Sponsoring a CX Retail Exchange') are cut to approximately the same visual weight as the body text below — there is no mobile-specific heading size reduction, causing both to feel like the same level.
  - Fix: Ensure H2/H3 elements in these sections still render visibly larger than body text on mobile — a minimum of 24px for section headings vs. 15-16px for body text.
- [minor] Hero, mobile: On mobile the hero CTA buttons stack vertically which is correct, but the 'Download Post Event Report' button text appears to be close to wrapping or is slightly cut at the right edge at 390px width.
  - Fix: Ensure hero buttons on mobile have a max-width of 100% and padding that allows the longest button label to fit on one line, or allow the label to wrap gracefully to two lines.
**Visual accessibility — 3/7**
- [critical] Hero section — text over background image, desktop and mobile: The event name and supporting text in the hero are rendered over a photographic background image without a sufficiently dark scrim. In areas where the image is light (faces, bright clothing), the white text becomes difficult to read. The axe-core report confirms 17 nodes with contrast failures, and `.btn-primary` elements are among them.
  - Fix: Add a semi-transparent dark overlay to the hero image container: `background: linear-gradient(to bottom, rgba(10,37,64,0.65) 0%, rgba(10,37,64,0.45) 100%)` so all text achieves minimum 4.5:1 contrast against the image.
- [critical] Primary CTA buttons, global (e.g. 'Request Your Invite', 'Find Out More'): The cyan (#00c9ff) primary button colour on a white background and white text on cyan both fail WCAG AA contrast (the axe-core report confirms .btn-primary contrast failures). This makes CTA text unreadable for users with low vision.
  - Fix: Change button background to brand accent #FF5A36 with white text — this pairing achieves approximately 3.8:1 which is borderline; alternatively use #0A2540 (dark navy) background with white text which achieves >10:1.
- [major] Testimonial / quote section — pink/magenta gradient background, desktop: The quote text and attribution are rendered in white over a bright pink-to-magenta gradient. The lighter magenta areas of the gradient likely fall below 4.5:1 contrast ratio for normal-weight body text.
  - Fix: Darken the gradient stops so the lightest point is no lighter than #C2185B equivalent, or add a semi-transparent dark overlay, or change text to a dark colour (#1A1A1A) if the background is lightened.
- [major] Footer — small print and links: Footer text (Privacy Policy, Cookie Policy, T&Cs links and contact details) appears to be rendered at approximately 11–12px in a mid-grey colour over a dark background. At this size WCAG requires enhanced contrast (7:1 for AAA, or ensure at least 4.5:1 at AA for small text).
  - Fix: Increase footer small text to a minimum of 14px and ensure colour contrast of footer links against the footer background is at least 4.5:1.

## Brand Compliance — 20/100
The CX Retail Exchange UK microsite is built for the CXNetwork/IQPC portal and bears no meaningful relationship to the WorkX 2026 brand configuration supplied — it uses a completely different event identity, color palette (cyan/magenta/pink instead of #0A2540/#FF5A36), and font stack (Raleway instead of Archivo/Inter). Beyond the brand-identity mismatch, several required elements are either missing or ambiguous, and tone-of-voice issues are present. The score reflects that this page, as submitted, cannot be considered compliant with the provided brand configuration.

**Required elements**
- ✓ Event name and dates in the hero — Hero shows 'CX Retail Exchange' and '30 June – 1 July 2027, London, UK'. However the event name does not match the configured event 'WorkX 2026', and the structured data startDate is '2027-06-30' while the hero copy reads '30 June – 1 July 2027' — neither matches the brand config year of 2026.
- ✓ Venue / location — Hero states 'London, UK' but no specific venue name or address is given on the visible page. Structured data lists only 'London, UK' with no street address.
- ✓ Primary registration CTA above the fold — 'Request Your Invite' CTA button is visible in the hero area above the fold on both desktop and mobile.
- ✓ IQPC or portal brand logo — IQPC logo appears in the footer ('In Partnership With' area) and the favicon references iqpc_favicon.ico. However the IQPC logo is very small and subordinate; the dominant logo is CX Retail Exchange, not the configured portal brand.
- ✓ Privacy policy link in footer — Footer HTML includes a 'Privacy Policy' link visible in the footer navigation row ('CX Home | Privacy Policy | About | Cookie Policy | Terms').

**Token scan (deterministic)**
- [major] Off-palette color #212529 is used on 247 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Off-palette color #212121 is used on 182 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #222222 is used on 89 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #696969 is used on 32 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [minor] Off-palette color #0D6EFD is used on 28 elements. Approved palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000.
- [major] Non-brand font stack "Raleway, sans-serif" is used on 835 elements. Brand fonts: Archivo, sans-serif (headings), Inter, sans-serif (body).

**Findings**
- [critical] Entire page: The microsite is for 'CX Retail Exchange UK' — a completely different event from the configured event 'WorkX 2026'. The event name, branding, color palette, and typography are all misaligned with the supplied brand configuration. This is not a cosmetic issue; the wrong event identity has been applied to the template.
  - Fix: Confirm whether this page was submitted against the correct brand configuration. If the intent is WorkX 2026, the entire event identity, copy, hero imagery, and color tokens must be replaced with WorkX 2026 assets and the #0A2540/#FF5A36 palette.
- [critical] Global CSS / :root variables: The primary color token is set to '#00c9ff' (cyan) and secondary to '#ff3fb1' (magenta/pink). These are not the configured brand colors (#0A2540 primary, #FF5A36 accent). The entire page renders in the wrong palette, including hero backgrounds, section strips, and CTAs.
  - Fix: Update CSS custom properties: set --primary-color to #0A2540, --accent-color to #FF5A36, and --background to #FFFFFF. Replace all cyan and magenta/pink background sections with the correct palette.
- [critical] Global typography / :root variables: The font stack is set to 'Raleway' for both --primary-font and --secondary-font. The brand configuration requires Archivo (headings) and Inter (body). Raleway is not in the approved type scale.
  - Fix: Replace Raleway with Archivo for headings and Inter for body copy across all CSS declarations.
- [major] Hero section — CTA buttons: The hero contains three CTA buttons side by side: 'Request Your Invite', 'Download Post Event Report', and 'Become a Sponsor'. The accent color is being applied to all three equally, conflating primary registration action with secondary actions. Accent (#FF5A36 equivalent here, though wrongly colored) should be reserved for the single primary CTA only.
  - Fix: Style only the primary registration CTA ('Request Your Invite') with the accent color. Render 'Download Post Event Report' and 'Become a Sponsor' as secondary/ghost-style buttons in the primary brand color.
- [major] Mid-page banner — 'Secure Your Place at the CX Retail Exchange UK': This full-width pink/magenta banner section uses the off-brand secondary color as a prominent background, not as a CTA highlight. This is accent-color overuse; large background fills violate the rule that accent is reserved for CTAs and key highlights only.
  - Fix: Replace the pink banner background with the primary dark color (#0A2540) or white, and limit any accent-color use to the CTA button within it.
- [major] Community testimonial strip — 'A Five Star Event!': The phrase 'A Five Star Event!' is an unverifiable superlative and uses an exclamation mark in a heading. The brand tone prohibits exclamation-mark stacking and unverifiable superlatives.
  - Fix: Replace with a specific, verifiable testimonial attribution or a neutral descriptor. If it is a direct attendee quote, attribute it clearly with name and title. Remove the exclamation mark from the section heading itself.
- [major] Hero — date/year discrepancy: The hero copy states '30 June – 1 July 2027' but the brand config event is WorkX 2026, and even within this page the schema startDate is '2027-06-30'. The year shown (2027) conflicts with the configured event year (2026) in the brand config.
  - Fix: Reconcile the event year across all surfaces: hero copy, page title, schema JSON-LD startDate/endDate, and meta description.
- [major] Logo — navbar and hero area: The CX Retail Exchange logo is placed directly over the hero photographic background without a visible scrim or sufficient contrast buffer. Brand rules require a scrim when placing any logo over busy imagery.
  - Fix: Add a semi-transparent dark overlay (scrim) behind the logo in the hero, or reposition the logo to a clear dark bar area where sufficient contrast is guaranteed.
- [major] Footer — venue detail: The footer contact block shows an address ('1st Floor, 129 Wilton Road, SW1V 1JZ, London') which is IQPC's office address, not the event venue. No specific event venue name is stated anywhere on the page beyond 'London, UK', which is insufficient for attendee planning.
  - Fix: Add the specific event venue name and address in the hero or a dedicated location section, clearly distinguished from the IQPC office contact address.
- [minor] Sponsor logo grid — 'Our Past Sponsors': The section heading 'Our Past Sponsors' labels these as past sponsors, which may undermine the event's forward-looking, benefit-led tone if the listed companies are not confirmed for the upcoming edition. This could also be misleading to prospective sponsors.
  - Fix: If these sponsors are confirmed for WorkX 2026/the upcoming event, relabel to 'Our Sponsors' or 'Partnering Organisations'. If historical only, add a brief qualifying line: 'Selected organisations from previous editions'.
- [minor] Meta description and OG description: The meta description uses 'UK's leading invitation-only event' — 'UK's leading' is an unverifiable superlative that violates the brand tone rule against unverifiable superlatives.
  - Fix: Replace 'UK's leading' with a specific, verifiable descriptor such as 'The UK's senior-level, invitation-only' or simply remove the superlative.

## SEO Audit — 62/100
The page has a functioning Event schema and reasonable meta description copy, but the title tag is critically short and keyword-thin (21 chars, no year, no location signal), which hurts click-through for intent-specific queries. The meta description is nearly three times the safe length at 449 characters, meaning Google will truncate it unpredictably and the opening value proposition is buried. The H1 avoids the event name entirely, creating a keyword coherence gap between headline, title, and metadata that dilutes topical relevance signals.

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
- [critical] Title is only 21 characters and omits the event year (2027), city (London), and primary topic keywords ('retail CX conference'). It provides no differentiation from a brand name lookup and will not match high-value discovery queries such as 'retail customer experience conference UK 2027' or 'CX event London 2027'.
  - Fix: Expand to 50–60 characters, include the year, location, and a descriptive keyword. Example: 'CX Retail Exchange UK 2027 | Retail CX Conference London'.
- [critical] The meta description is 449 characters — approximately three times the ~155-character display limit. Google will auto-truncate at a sentence boundary that may exclude the most compelling differentiators (AI-driven CX, invitation-only, roundtables). The same oversized text is also used for og:description, which will truncate poorly on social cards.
  - Fix: Reduce to 150–160 characters. Lead with the strongest differentiator (invitation-only, London, 2027), include 'retail CX' and one unique benefit to drive the click.
- [major] The H1 ('The Exclusive, Invitation-only Event for CX, CS, & Digital Retail Leaders in the UK') does not contain the event name 'CX Retail Exchange UK' or the year/city. This breaks keyword coherence between the title tag, schema name field, and on-page headline, weakening topical authority signals and making it harder for Google to confirm what the page is definitively about.
  - Fix: Revise the H1 to include the event name and, if design permits, the year and location. The descriptor phrase can follow as a subheading. Example H1: 'CX Retail Exchange UK 2027' with an H2 subhead describing the audience.
- [major] Both highPrice and lowPrice are empty strings in the AggregateOffer block. An empty string is not a valid schema value; it can cause Google's Rich Results validator to flag a price-related warning and suppress price display in event rich results.
  - Fix: If pricing is not yet confirmed, remove the highPrice and lowPrice properties entirely rather than publishing empty strings. Set offerCount to the correct number of offer types or remove it if unknown.
- [major] The offer availability value is set to 'https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk/InStock', which is a page URL rather than the required schema.org vocabulary value (e.g., 'https://schema.org/InStock'). This will fail structured data validation.
  - Fix: Replace the availability value with the correct schema.org URI: 'https://schema.org/InStock'.
- [major] The event @id is 'https://www.iqpc.com#event', which points to the IQPC corporate domain rather than the canonical URL of this specific event page. This breaks entity disambiguation and prevents Google from correctly associating structured data with this URL.
  - Fix: Set @id to the canonical event URL with a fragment: 'https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk#event'.
- [major] The venue URL, streetAddress, and postalCode are all empty strings. While the city is provided, absence of a full address and venue name (beyond 'London, UK') reduces the richness of event rich results and may cause a venue-related warning in Search Console.
  - Fix: Add the specific venue name and address if available on the page. If not stated on the page, remove the empty string fields rather than publishing blank properties.
- [major] The WebSite schema block sets 'url' to 'https://www.iqpc.com' but the page lives on 'https://www.cxnetwork.com'. This cross-domain mismatch can confuse Google's entity graph and incorrectly associates the website entity with IQPC rather than CX Network.
  - Fix: Update the WebSite JSON-LD 'url' and '@id' to 'https://www.cxnetwork.com' and rename the entity 'name' to 'CX Network' consistently.
- [minor] No robots meta tag is present (value is null in the deterministic check). While the site is presumably indexable via default behaviour, the absence of an explicit 'index, follow' directive is a minor hygiene gap, especially for a high-value event landing page.
  - Fix: Add <meta name='robots' content='index, follow'> to the <head> to make crawl intent explicit.
- [minor] og:type is set to 'website' rather than a more specific type. While Open Graph does not have a native 'event' type, using 'website' misses an opportunity; for social sharing of event pages some platforms recognise custom namespaced types.
  - Fix: This is low priority; if the platform supports it, consider switching to og:type 'event' using the events Open Graph namespace. Otherwise, retain 'website' as a safe fallback.
- [minor] Several performer entries contain duplicate names (e.g., Richard Lim appears five times, Jonathan George three times, Lee Lobb twice) and many have empty URL strings. Duplicates add unnecessary payload and empty URL strings are noise in the schema graph.
  - Fix: Deduplicate the performer array programmatically so each person appears only once. Remove the 'url' key from any performer object where the value is an empty string.

**Improved metadata (ready to apply)**
- Title: CX Retail Exchange UK 2027 | Retail CX Conference London
- Meta description: Join 200+ senior retail CX leaders in London, June 2027. Invitation-only sessions on loyalty, personalisation & AI-driven CX. Request your place today.

## Accessibility (axe-core, deterministic)
- **[serious]** color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (17 element(s), e.g. `.aos-animate.btn-primary[role="button"]`)
- **[moderate]** heading-order: Ensure the order of headings is semantically correct (5 element(s), e.g. `.cta-event-date`)
- **[critical]** image-alt: Ensure <img> elements have alternative text or a role of none or presentation (1 element(s), e.g. `.d-md-block`)
- **[moderate]** landmark-unique: Ensure landmarks are unique (1 element(s), e.g. `.portal-navigation`)
- **[serious]** link-name: Ensure links have discernible text (3 element(s), e.g. `a:nth-child(4)`)
- **[moderate]** region: Ensure all page content is contained by landmarks (29 element(s), e.g. `.header-container`)