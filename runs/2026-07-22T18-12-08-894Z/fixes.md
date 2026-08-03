# Ready-to-paste fix prompts

Generated from the QA run. Work top-to-bottom — blocking issues first.

## Fix 1: [major] MISSING_PIXEL

Paste into Claude Code (or Lovable chat):

```
Add the missing marketing pixel base code to the <head> of this site and confirm it fires on page load. Pixel/partner ID: <fill in>.
```

## Fix 2: [serious] Accessibility: color-contrast

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "color-contrast" (Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds) affecting 17 element(s), e.g. selector: .aos-animate.btn-primary[role="button"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 3: [critical] Accessibility: image-alt

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "image-alt" (Ensure <img> elements have alternative text or a role of none or presentation) affecting 1 element(s), e.g. selector: .d-md-block. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 4: [serious] Accessibility: link-name

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "link-name" (Ensure links have discernible text) affecting 3 element(s), e.g. selector: a:nth-child(4). Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 5: [major] Design QA — Layout & grid · Featured article / two-column split section, desktop (~400px from top)

Paste into Claude Code (or Lovable chat):

```
In the two-column section that contains the event photo on the left and 'Powering Personalisation' body text on the right, add `align-items: start` to the parent row container and ensure both columns use the same top padding value (e.g. 48px) so they share a common top edge.
```

## Fix 6: [major] Design QA — Layout & grid · Past Sponsors grid, desktop

Paste into Claude Code (or Lovable chat):

```
In the 'Our Past Sponsors' section, set a fixed height of 48px and width of auto on every sponsor logo `<img>` element, add `object-fit: contain` and `display: block; margin: auto` so all logos are uniformly sized and vertically centered within their grid cells.
```

## Fix 7: [major] Design QA — Typography · Global / entire page

Paste into Claude Code (or Lovable chat):

```
In the `<style data-dynamic>` block, replace the @import for Raleway with `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=Inter:wght@400;600&display=swap')` and update `--primary-font: 'Archivo', sans-serif` and `--secondary-font: 'Inter', sans-serif`.
```

## Fix 8: [major] Design QA — Typography · Hero section, desktop — event date/location line

Paste into Claude Code (or Lovable chat):

```
For the element with class `.cta-event-date` inside the hero, set `font-size: 15px; font-weight: 400; letter-spacing: 0.05em; text-transform: uppercase` to visually subordinate it to the event name and value proposition headlines.
```

## Fix 9: [major] Design QA — Typography · Body content sections (e.g. 'Secure Your Place' banner, 'Wondering what's in store?' section)

Paste into Claude Code (or Lovable chat):

```
Add a global style rule: `h1 { font-size: 48px } h2 { font-size: 32px } h3 { font-size: 24px } h4 { font-size: 20px } p, li { font-size: 16px; line-height: 1.6 } .caption, small { font-size: 14px }` and remove all inline font-size overrides that deviate from these values.
```

## Fix 10: [major] Design QA — Spacing & rhythm · Mid-page sections (Benefits, Sponsorship, Article rows), desktop

Paste into Claude Code (or Lovable chat):

```
Add a global CSS rule: `.page-section { padding-top: 64px; padding-bottom: 64px; }` and apply the class `page-section` to every major section container, removing existing inconsistent inline padding/margin overrides.
```

## Fix 11: [major] Design QA — Spacing & rhythm · 'Secure Your Place' pink CTA banner, desktop

Paste into Claude Code (or Lovable chat):

```
On the 'Secure Your Place' banner container element, set `padding: 32px 48px` and ensure the inner flexbox has `align-items: center; justify-content: space-between` so text and button are evenly distributed with consistent padding on both sides.
```

## Fix 12: [major] Design QA — Visual hierarchy · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
In the hero CTA row, add class `btn-primary` only to the 'Request Your Invite' button with `background-color: #FF5A36; color: #ffffff; border: none`, change 'Download Post Event Report' to `btn-outline` with `border: 2px solid #ffffff; background: transparent; color: #ffffff`, and change 'Become a Sponsor' to a plain text link styled `color: #ffffff; text-decoration: underline; font-weight: 600`.
```

## Fix 13: [major] Design QA — Visual hierarchy · Mid-page CTA buttons (multiple sections)

Paste into Claude Code (or Lovable chat):

```
In the `:root` CSS block, change `--primary-color: #FF5A36`, `--primary-color-hover: #e04a28`, `--secondary-color: #0A2540`, `--secondary-color-hover: #0d3360`. Remove the cyan and pink values entirely so all buttons inherit the correct brand palette.
```

## Fix 14: [major] Design QA — Consistency · CTA buttons, global

Paste into Claude Code (or Lovable chat):

```
Audit every `<a class='btn'>` and `<button>` element on the page and replace colour-specific inline styles or ad-hoc classes with one of three canonical classes: `btn-primary` (accent fill), `btn-secondary` (dark fill), or `btn-ghost` (transparent with border). Delete any CSS classes not mapping to these three variants.
```

## Fix 15: [major] Design QA — Consistency · Section background treatments, global

Paste into Claude Code (or Lovable chat):

```
Replace all section `background` declarations that use pink, magenta, cyan, or purple gradient values with either `background: #ffffff`, `background: #F5F6F7`, or `background: #0A2540` depending on whether the section needs light, subtle, or dark treatment. Remove the pink and gradient background values entirely.
```

## Fix 16: [major] Design QA — Responsive integrity · Past Sponsors grid, mobile

Paste into Claude Code (or Lovable chat):

```
In the sponsors section, wrap each sponsor in a `<div style='width:50%; padding:12px; display:flex; align-items:center; justify-content:center;'>` for mobile (using a 2-column flex-wrap layout) and enforce `max-height: 40px; width: auto; object-fit: contain` on every sponsor `<img>`, converting any text-only sponsors to logo image assets.
```

## Fix 17: [major] Design QA — Responsive integrity · 'Benefits of Attending' and 'Benefits of Sponsoring' sections, mobile

Paste into Claude Code (or Lovable chat):

```
Add a responsive rule: `@media (max-width: 768px) { .benefits-section h2 { font-size: 24px; line-height: 1.3; margin-bottom: 16px; } .benefits-section p { font-size: 15px; line-height: 1.6; } }` replacing `.benefits-section` with the actual section class name.
```

## Fix 18: [critical] Design QA — Visual accessibility · Hero section — text over background image, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
On the hero section's image container, add a pseudo-element or overlay div: `.hero-overlay { position: absolute; inset: 0; background: rgba(10, 37, 64, 0.60); z-index: 1; }` and ensure all hero text and button elements have `position: relative; z-index: 2` so they render above the scrim.
```

## Fix 19: [critical] Design QA — Visual accessibility · Primary CTA buttons, global (e.g. 'Request Your Invite', 'Find Out More')

Paste into Claude Code (or Lovable chat):

```
In the CSS `:root` block, set `--primary-color: #0A2540` and `--primary-color-hover: #FF5A36`. Update `.btn-primary { background-color: var(--primary-color); color: #ffffff; }` and `.btn-primary:hover { background-color: var(--primary-color-hover); color: #ffffff; }` to ensure all primary buttons meet WCAG AA contrast.
```

## Fix 20: [major] Design QA — Visual accessibility · Testimonial / quote section — pink/magenta gradient background, desktop

Paste into Claude Code (or Lovable chat):

```
On the testimonial section, change the background to `background: linear-gradient(135deg, #8B0057 0%, #B0003A 100%)` so the gradient stays dark enough for white text to achieve at least 4.5:1 contrast throughout. Then verify with a contrast checker before publishing.
```

## Fix 21: [major] Design QA — Visual accessibility · Footer — small print and links

Paste into Claude Code (or Lovable chat):

```
In the footer CSS, set `footer .footer-links a, footer .footer-small-text { font-size: 14px; color: #d0d0d0; }` and `footer { background-color: #0A2540; }` to ensure the #d0d0d0-on-#0A2540 pairing meets WCAG AA contrast for small text.
```

## Fix 22: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 23: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212121 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 24: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack "Raleway, sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 25: [critical] Brand Compliance — Entire page

Paste into Claude Code (or Lovable chat):

```
Replace all instances of 'CX Retail Exchange' and related sub-branding with 'WorkX 2026'. Update hero headline, page title, meta og:title, og:description, and schema 'name' fields to 'WorkX 2026'. Update startDate/endDate in JSON-LD to match the correct 2026 event dates.
```

## Fix 26: [critical] Brand Compliance — Global CSS / :root variables

Paste into Claude Code (or Lovable chat):

```
In the :root block of the dynamic styles, change --primary-color to #0A2540, add --accent-color: #FF5A36, set --secondary-color to #0A2540, and update --primary-color-hover and --secondary-color-hover accordingly. Find all inline background-color, background, and color declarations that reference #00c9ff, #ff3fb1, #00B7B0, and replace them with the correct tokens.
```

## Fix 27: [critical] Brand Compliance — Global typography / :root variables

Paste into Claude Code (or Lovable chat):

```
In the Google Fonts @import URL, add 'Archivo:wght@400;700;800' and 'Inter:wght@400;600' to the families list. In the :root block, set --primary-font: 'Archivo', sans-serif and --secondary-font: 'Inter', sans-serif. Remove the standalone Raleway @import lines.
```

## Fix 28: [major] Brand Compliance — Hero section — CTA buttons

Paste into Claude Code (or Lovable chat):

```
In the hero button group, add class btn-primary (accent-styled) only to the 'Request Your Invite' anchor. Change 'Download Post Event Report' and 'Become a Sponsor' to btn-outline or btn-secondary styling using the primary dark color (#0A2540) with a white border, so the accent CTA reads as the clear primary action.
```

## Fix 29: [major] Brand Compliance — Mid-page banner — 'Secure Your Place at the CX Retail Exchange UK'

Paste into Claude Code (or Lovable chat):

```
Find the section element containing 'Secure Your Place at the CX Retail Exchange UK'. Remove the pink/magenta background-color style and replace with background-color: #0A2540; color: #FFFFFF. Ensure the CTA button inside retains the accent color (#FF5A36).
```

## Fix 30: [major] Brand Compliance — Community testimonial strip — 'A Five Star Event!'

Paste into Claude Code (or Lovable chat):

```
Change the section heading 'A Five Star Event!' to 'What Attendees Say' or quote the testimonial directly with attribution (e.g., '"Insightful and practical" — [Name], [Title], [Company]'). Remove the standalone exclamation-mark headline.
```

## Fix 31: [major] Brand Compliance — Hero — date/year discrepancy

Paste into Claude Code (or Lovable chat):

```
Perform a find-and-replace for '2027' across the HTML and JSON-LD blocks. Update hero date string, schema 'startDate', 'endDate', and 'validFrom' fields to the correct event year and dates as confirmed by the event team.
```

## Fix 32: [major] Brand Compliance — Logo — navbar and hero area

Paste into Claude Code (or Lovable chat):

```
On the hero container, add a pseudo-element or overlay div: position: absolute; top: 0; left: 0; width: 100%; height: 80px; background: rgba(10,37,64,0.65); z-index: 1; and ensure the nav/logo sits above it at z-index: 2.
```

## Fix 33: [major] Brand Compliance — Footer — venue detail

Paste into Claude Code (or Lovable chat):

```
In the hero subheading or below the event date line, add a venue line: '<span class="event-venue">Venue Name, Street, London, UK</span>' styled in the body font at 16px. Ensure it is not the IQPC office address.
```

## Fix 34: [critical] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Rewrite the <title> tag to be between 50 and 60 characters. Include the event name 'CX Retail Exchange UK', the year '2027', the city 'London', and a secondary keyword such as 'Retail CX Conference'. Do not use exclamation marks or unverifiable superlatives.
```

## Fix 35: [critical] SEO Audit — <meta name='description'> and og:description

Paste into Claude Code (or Lovable chat):

```
Rewrite the meta description to between 150 and 160 characters. Open with the event's clearest differentiator (invitation-only, senior retail CX leaders, London 2027), include the keywords 'retail CX', 'loyalty', and 'AI', and end with an implicit CTA. No exclamation marks or unverifiable superlatives.
```

## Fix 36: [major] SEO Audit — H1 tag

Paste into Claude Code (or Lovable chat):

```
Update the H1 so it contains the exact event name 'CX Retail Exchange UK' and the year '2027'. Move the current H1 text ('The Exclusive, Invitation-only Event for CX, CS, & Digital Retail Leaders in the UK') to an H2 or a styled paragraph directly beneath the H1. Keep the tone professional and benefit-led.
```

## Fix 37: [major] SEO Audit — Event JSON-LD — offers.highPrice / offers.lowPrice

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD, remove the 'highPrice' and 'lowPrice' keys from the AggregateOffer object if their values are empty strings. Also correct 'offerCount' to reflect the actual number of offer tiers, or remove it. Do not add invented prices.
```

## Fix 38: [major] SEO Audit — Event JSON-LD — offers.availability URL

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD offers block, change the 'availability' value from 'https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk/InStock' to 'https://schema.org/InStock'.
```

## Fix 39: [major] SEO Audit — Event JSON-LD — @id

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD, change the '@id' value to 'https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk#event' to match the canonical page URL.
```

## Fix 40: [major] SEO Audit — Event JSON-LD — location.url and location address fields

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD location block, remove any keys whose values are empty strings ('url', 'streetAddress', 'postalCode', 'telephone'). If the venue name and address are visible anywhere in the page content, populate them accurately; do not invent values.
```

## Fix 41: [major] SEO Audit — WebSite JSON-LD

Paste into Claude Code (or Lovable chat):

```
In the WebSite JSON-LD block, change 'url' to 'https://www.cxnetwork.com' and '@id' to 'https://www.cxnetwork.com#website'. Ensure 'name' reads 'CX Network' (not 'CX Retail Exchange UK') to reflect the site-level entity rather than the individual event.
```
