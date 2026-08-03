# Ready-to-paste fix prompts

Generated from the QA run. Work top-to-bottom — blocking issues first.

## Fix 1: [major] MISSING_PIXEL

Paste into Claude Code (or Lovable chat):

```
Add the missing marketing pixel base code to the <head> of this site and confirm it fires on page load. Pixel/partner ID: <fill in>.
```

## Fix 2: [critical] NO_REGISTRATION_CTA

Paste into Claude Code (or Lovable chat):

```
Add a prominent primary registration CTA button in the hero, above the fold, using the brand accent color, linking to the registration URL: <fill in>. It must be a real <a> element with a valid href.
```

## Fix 3: [critical] Accessibility: aria-valid-attr-value

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "aria-valid-attr-value" (Ensure all ARIA attributes have valid values) affecting 3 element(s), e.g. selector: #tier-6994e6cc50cb2108c7583cfb-tab. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 4: [serious] Accessibility: color-contrast

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "color-contrast" (Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds) affecting 12 element(s), e.g. selector: a[role="button"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 5: [critical] Accessibility: image-alt

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "image-alt" (Ensure <img> elements have alternative text or a role of none or presentation) affecting 1 element(s), e.g. selector: a[href$="www.iqpc.com"] > .d-block. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 6: [serious] Accessibility: link-name

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "link-name" (Ensure links have discernible text) affecting 1 element(s), e.g. selector: a[href$="www.iqpc.com"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 7: [serious] Accessibility: listitem

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "listitem" (Ensure <li> elements are used semantically) affecting 3 element(s), e.g. selector: .px-2.nav-link:nth-child(1). Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 8: [major] Design QA — Layout & grid · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
In the hero section, wrap the eyebrow, h1, date/location line, and all three CTA buttons inside a single flex column div with a consistent left padding (e.g., padding-left: 48px) that matches the site container's gutter. Ensure all child elements align to the same left edge.
```

## Fix 9: [major] Design QA — Layout & grid · Pricing / registration section, desktop

Paste into Claude Code (or Lovable chat):

```
Add class='container' (or the same container class used for the sponsors and speakers sections) to the outer div wrapping .iqpc-srs-widget-container so its left and right edges align with all other page sections.
```

## Fix 10: [major] Design QA — Typography · Throughout page, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Remove all @import entries from the Google Fonts URL that are not 'Archivo' or 'Inter'. Then add a global CSS rule: h1, h2, h3, h4, h5, h6 { font-family: 'Archivo', sans-serif; } and p, li, span, a { font-family: 'Inter', sans-serif; } to enforce brand typography across all sections.
```

## Fix 11: [major] Design QA — Typography · Section eyebrow labels (e.g., 'WHO YOU'LL HEAR FROM', 'INSIGHTS FROM YOUR PEERS'), desktop

Paste into Claude Code (or Lovable chat):

```
Find all elements with the eyebrow/label style (the small all-caps text above section headings like 'WHO YOU'LL HEAR FROM') and set their CSS to: font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;
```

## Fix 12: [major] Design QA — Spacing & rhythm · Cookie consent banner, desktop (appears at page load)

Paste into Claude Code (or Lovable chat):

```
In the .cookie-consent CSS rule, change padding: 10px 0 to padding: 16px 24px and update the button inside it to have min-height: 44px; padding: 8px 16px; so it meets touch-target requirements.
```

## Fix 13: [major] Design QA — Spacing & rhythm · What You'll Explore section, desktop

Paste into Claude Code (or Lovable chat):

```
Wrap the four 'What You'll Explore' cards in a flex container with display: flex; flex-wrap: wrap; align-items: stretch; gap: 24px; and set each card to display: flex; flex-direction: column; so the card body description div can use flex-grow: 1 to equalize card heights.
```

## Fix 14: [critical] Design QA — Visual hierarchy · Hero section, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
In the hero section, change the 'Book Online Now' button to style='background-color: #FF5A36; color: #FFFFFF; font-weight: 700; padding: 14px 28px; border: none; border-radius: 4px; font-size: 16px;' and change the other two hero buttons ('View Event Guide', 'Sponsorship Opportunities') to ghost style with style='background: transparent; border: 2px solid #0A2540; color: #0A2540; padding: 10px 20px; border-radius: 4px;' so the primary CTA is visually dominant.
```

## Fix 15: [major] Design QA — Visual hierarchy · Testimonial section, desktop

Paste into Claude Code (or Lovable chat):

```
In the testimonial card, set the TDECU logo img to max-height: 32px; width: auto; and increase the blockquote or testimonial text element to font-size: 18px; font-style: italic; so the quote is the primary visual element and the logo is a supporting attribution.
```

## Fix 16: [major] Design QA — Visual hierarchy · Navigation bar, desktop

Paste into Claude Code (or Lovable chat):

```
In the navigation bar, confirm the 'Book Online Now' button has background-color: #FF5A36; color: #FFFFFF; font-weight: 600; border-radius: 4px; padding: 8px 16px; and no other nav element uses a filled button style, so this CTA stands out as the sole primary action in the nav.
```

## Fix 17: [major] Design QA — Consistency · CTA buttons, throughout page

Paste into Claude Code (or Lovable chat):

```
Add a global CSS rule: .btn-primary-brand { background-color: #FF5A36; color: #FFFFFF; border: none; border-radius: 4px; padding: 12px 24px; font-weight: 600; font-family: 'Inter', sans-serif; } and .btn-secondary-brand { background-color: transparent; color: #0A2540; border: 2px solid #0A2540; border-radius: 4px; padding: 10px 22px; font-weight: 600; } then replace all existing button classes on non-widget buttons with these two classes.
```

## Fix 18: [major] Design QA — Consistency · Speaker cards vs. topic cards vs. testimonial card, desktop

Paste into Claude Code (or Lovable chat):

```
For all images inside the 'What You'll Explore' topic cards, add style='width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block;' to ensure all four card images are the same height and aspect ratio.
```

## Fix 19: [major] Design QA — Responsive integrity · Sponsors section, mobile (390px)

Paste into Claude Code (or Lovable chat):

```
In the sponsors section, add a media query: @media (max-width: 600px) { .sponsors-logo-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; justify-items: center; align-items: center; } .sponsors-logo-row img { max-height: 36px; width: auto; } } to create an orderly two-column sponsor grid on mobile.
```

## Fix 20: [major] Design QA — Responsive integrity · Hero section, mobile (390px)

Paste into Claude Code (or Lovable chat):

```
Add a mobile media query: @media (max-width: 600px) { .hero-cta-buttons a, .hero-cta-buttons button { width: 100%; display: block; margin-bottom: 8px; text-align: center; } } to make all hero CTA buttons full-width on mobile.
```

## Fix 21: [critical] Design QA — Visual accessibility · Multiple interactive elements, throughout page

Paste into Claude Code (or Lovable chat):

```
For all ghost/outline buttons on the page, set border-color: #0A2540; color: #0A2540; and ensure background is #FFFFFF so the contrast ratio meets WCAG AA. For all .section-eyebrow elements, set color: #0A2540; to ensure sufficient contrast against white backgrounds.
```

## Fix 22: [critical] Design QA — Visual accessibility · IQPC logo link, footer area

Paste into Claude Code (or Lovable chat):

```
Find the anchor tag wrapping the IQPC logo image (a[href$='www.iqpc.com']) and add aria-label='Visit IQPC website' to the anchor, then add alt='IQPC — Event Organizer' to the img element inside it.
```

## Fix 23: [major] Design QA — Visual accessibility · Speaker photos, desktop

Paste into Claude Code (or Lovable chat):

```
Add to the speaker card image CSS: .speaker-card img { border-radius: 50%; border: 1px solid #E0E0E0; box-shadow: 0 1px 4px rgba(0,0,0,0.12); } to ensure all speaker photos have a visible boundary.
```

## Fix 24: [major] Design QA — Visual accessibility · Cookie consent banner, page load (desktop and mobile)

Paste into Claude Code (or Lovable chat):

```
In the .cookie-consent button CSS rule, change background: #595959 to background: #FF5A36; color: #FFFFFF; border-radius: 5px; padding: 6px 16px; font-weight: 600; so the dismiss button is clearly visible against the dark banner background.
```

## Fix 25: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 26: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #590167 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 27: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack "Roboto, sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 28: [critical] Brand Compliance — Footer

Paste into Claude Code (or Lovable chat):

```
In the site footer HTML, add an anchor tag: <a href='/privacy-policy'>Privacy Policy</a> inside the existing footer nav or legal text row, ensuring it is visible at all viewport widths and not hidden behind a collapsed element.
```

## Fix 29: [major] Brand Compliance — Page-wide — section dividers, speaker names, inline text links, decorative rules, 'WHO YOU'LL HEAR FROM' / 'WHY ATTEND WORKX?' label lines

Paste into Claude Code (or Lovable chat):

```
Search CSS for all instances of color: #FF5A36 and background-color: #FF5A36 (and equivalents: rgb(255,90,54), var(--accent)). Remove the accent color from: .section-label, .section-rule hr, .divider-line, speaker .name a, and any inline <span> or <small> category tags. Replace with color: #0A2540. Retain accent only on .btn-primary, .cta-button, and highlight callout badges.
```

## Fix 30: [major] Brand Compliance — Hero section — mobile (390px)

Paste into Claude Code (or Lovable chat):

```
In the mobile hero CSS (max-width: 390px), add padding-top to the .hero-logo or .event-logo container equal to the logo's rendered height. For example: .hero .event-logo-wrapper { margin-top: calc(var(--logo-height, 32px)); } and ensure the eyebrow/tagline text element above the logo has margin-bottom at minimum equal to the logo height.
```

## Fix 31: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 32: [critical] SEO Audit — <meta name="description">

Paste into Claude Code (or Lovable chat):

```
Replace the existing meta description content with: 'WorkX 2026 | Aug 10–12 · San Francisco. Peer-led strategies, benchmarks, and cost-justification tools for workplace, facilities, and corporate real estate leaders.' (157 chars)
```

## Fix 33: [critical] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Change the <title> to: 'WorkX 2026 | Workplace & Facilities Conference | San Francisco' (60 chars)
```

## Fix 34: [major] SEO Audit — <h1> — 'WorkX Conference'

Paste into Claude Code (or Lovable chat):

```
Change the H1 text to: 'WorkX 2026: The Workplace, Facilities & Corporate Real Estate Conference' or a close variant approved by the brand team.
```

## Fix 35: [major] SEO Audit — schema.org Event JSON-LD — location.name / address

Paste into Claude Code (or Lovable chat):

```
In the existing JSON-LD Event block, update the location object: set streetAddress, postalCode, and telephone to null (not empty strings). When the venue is confirmed, populate 'name' with the venue name (e.g. 'Marriott Marquis San Francisco') and fill in streetAddress and postalCode.
```

## Fix 36: [major] SEO Audit — schema.org Event JSON-LD — offers.validFrom / offer.availability

Paste into Claude Code (or Lovable chat):

```
In the existing JSON-LD Event block, change: "validFrom": "2026-08-10" to the actual on-sale date (e.g. "2025-07-01"), and change "availability": "https://www.ssonetwork.com/events-workx/InStock" to "availability": "https://schema.org/InStock".
```

## Fix 37: [major] SEO Audit — schema.org Event JSON-LD — @id

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD block, change "@id": "https://www.iqpc.com#event" to "@id": "https://www.ssonetwork.com/events-workx#event".
```
