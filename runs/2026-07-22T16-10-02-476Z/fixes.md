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

## Fix 8: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 9: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #590167 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 10: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack "Roboto, sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 11: [critical] Brand Compliance — Footer

Paste into Claude Code (or Lovable chat):

```
In the site footer, after the copyright text '©2026 IQPC. All rights reserved.', add the following HTML: <a href='https://www.iqpc.com/privacy-policy' style='color:#FFFFFF; text-decoration:underline; margin-left:16px; font-size:12px;'>Privacy Policy</a>. Ensure the link is visible on both light and dark footer backgrounds.
```

## Fix 12: [major] Brand Compliance — Section divider labels throughout the page (e.g., 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?', 'INSIGHTS FROM YOUR PEERS', 'PARTNERING FOR TOMORROW', 'NEW PRICING AVAILABLE')

Paste into Claude Code (or Lovable chat):

```
Search the CSS and inline styles for any rule applying color:#FF5A36 or background-color:#FF5A36 to hr, ::before, or ::after pseudo-elements used as decorative dividers around section label text. Change those values to #0A2540 or #CCCCCC. Do not alter the accent color on button elements with class 'btn-primary' or equivalent CTA classes.
```

## Fix 13: [major] Brand Compliance — Mobile hero — primary registration CTA

Paste into Claude Code (or Lovable chat):

```
In the hero section's button group, reorder the anchor/button elements so that the registration CTA (e.g., <a class='btn btn-primary'>Book Online Now</a>) is the first child element. In the responsive CSS for max-width:390px, ensure the button group uses flex-direction:column and the primary CTA has order:1, with secondary CTAs at order:2 and order:3.
```

## Fix 14: [major] Brand Compliance — Testimonials / 'Hear from Past Attendees' section

Paste into Claude Code (or Lovable chat):

```
In the testimonial card component, apply a max-height:40px and width:auto style to any third-party <img> logo. Add object-fit:contain. If the logo renders in a brand color that dominates, consider adding a CSS filter:grayscale(100%) with opacity:0.7 to maintain attribution without brand conflict, or request a monochrome logo asset from the testimonial contributor.
```

## Fix 15: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 16: [critical] SEO Audit — <meta name="description">

Paste into Claude Code (or Lovable chat):

```
Rewrite the meta description for the WorkX 2026 event page. It must be 150–160 characters, open with 'workplace conference San Francisco 2026', include one concrete attendee benefit (e.g., benchmarks, peer strategies), and end with a soft CTA. No exclamation marks.
```

## Fix 17: [critical] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Rewrite the HTML <title> for the WorkX 2026 microsite. Requirements: ≤60 characters; lead with a descriptive keyword phrase ('Workplace & Facilities Conference'); include brand name 'WorkX 2026'; include 'San Francisco'. No pipes at the start.
```

## Fix 18: [critical] SEO Audit — <h1>

Paste into Claude Code (or Lovable chat):

```
Rewrite the H1 for the WorkX 2026 event page. It should name the event, the year, and its three core disciplines (workplace, facilities, corporate real estate). Tone: professional and benefit-led per IQPC brand guidelines. Target 8–12 words.
```

## Fix 19: [major] SEO Audit — Event schema JSON-LD — 'location' object

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD schema on the WorkX 2026 page, remove the 'streetAddress', 'postalCode', and 'telephone' properties from the PostalAddress object if their values are empty strings. Do not invent values.
```

## Fix 20: [major] SEO Audit — Event schema JSON-LD — 'offers.validFrom'

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD offers block, change 'validFrom' from '2026-08-10' to the actual date registration became available. If unknown, use the current ISO date. Do not use the event start date.
```

## Fix 21: [major] SEO Audit — <meta name="keywords">

Paste into Claude Code (or Lovable chat):

```
Populate the <meta name='keywords'> tag on the WorkX 2026 page with 8–10 relevant phrases covering: workplace conference, facilities management, corporate real estate, hybrid work, San Francisco 2026, WorkX. Separate by commas.
```

## Fix 22: [major] SEO Audit — robots meta

Paste into Claude Code (or Lovable chat):

```
Add <meta name='robots' content='index, follow'> inside the <head> of the WorkX 2026 event page.
```
