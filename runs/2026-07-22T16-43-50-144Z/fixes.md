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

## Fix 5: [major] Design QA — Layout & grid · Past Sponsors row, desktop

Paste into Claude Code (or Lovable chat):

```
In the 'Our Past Sponsors' section, wrap all sponsor logo images in a div with style='display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:24px; max-width:1200px; margin:0 auto; padding:0 32px;' so no logo is clipped at the container edge.
```

## Fix 6: [major] Design QA — Layout & grid · Photo Gallery section, desktop

Paste into Claude Code (or Lovable chat):

```
In the Photo Gallery section, add 'align-items: stretch;' to the parent flex/grid container so the CTA card on the right matches the combined height of the photo tiles on the left, eliminating the floating appearance.
```

## Fix 7: [major] Design QA — Typography · Entire page

Paste into Claude Code (or Lovable chat):

```
In the <style data-dynamic> block, change '--primary-font: Raleway, sans-serif' to '--primary-font: Archivo, sans-serif' and '--secondary-font: Raleway, sans-serif' to '--secondary-font: Inter, sans-serif'. Add @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=Inter:wght@400;600;700&display=swap'); at the top of the style block.
```

## Fix 8: [major] Design QA — Typography · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
In the CSS rule 'h1 { font-size: 55px; }', change the value to '48px' to align with the brand-defined type scale of [12,14,16,20,24,32,48,64].
```

## Fix 9: [major] Design QA — Spacing & rhythm · Secure Your Place / invitation CTA banner, desktop

Paste into Claude Code (or Lovable chat):

```
On the 'Secure Your Place at the CX Retail Exchange UK' banner element, set padding to '48px 32px' (padding-top and padding-bottom both 48px) to match the vertical rhythm of other full-width section banners.
```

## Fix 10: [major] Design QA — Visual hierarchy · Hero section, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
In the hero buttons row, style the 'Request Your Invite' button with 'background-color: #FF5A36; color: #FFFFFF; font-size: 16px; padding: 16px 32px; border: none;' and style 'Download Post Event Report' and 'Become a Sponsor' as outline buttons with 'background: transparent; border: 2px solid #FFFFFF; color: #FFFFFF; font-size: 14px; padding: 12px 24px;' so the primary CTA is visually dominant.
```

## Fix 11: [major] Design QA — Consistency · CTA buttons, page-wide

Paste into Claude Code (or Lovable chat):

```
In the CSS :root block, change '--primary-color: #00c9ff' to '--primary-color: #FF5A36' and '--primary-color-hover: #ffbb00' to '--primary-color-hover: #cc4828'. Change '--secondary-color: #ff3fb1' to '--secondary-color: #0A2540'. This will propagate corrected brand colors to all btn-primary and btn-secondary instances site-wide.
```

## Fix 12: [major] Design QA — Consistency · Article/content cards (bottom third of page), desktop

Paste into Claude Code (or Lovable chat):

```
Apply 'display: flex; flex-direction: column; justify-content: space-between; min-height: 320px;' to each article card container, and ensure all 'Read More' links use the identical class (e.g., class='btn btn-primary') with the same styling across all three cards.
```

## Fix 13: [major] Design QA — Responsive integrity · Sponsor logos section, mobile (390px)

Paste into Claude Code (or Lovable chat):

```
Add a CSS rule: '@media (max-width: 576px) { .past-sponsors img { max-height: 40px; width: auto; object-fit: contain; } .past-sponsors .row { justify-content: center; gap: 16px; } }' to normalize sponsor logo presentation on mobile.
```

## Fix 14: [major] Design QA — Responsive integrity · Hero section, mobile

Paste into Claude Code (or Lovable chat):

```
Add '@media (max-width: 768px) { .hero-secondary-ctas { display: none; } }' to hide the Download Report and Become a Sponsor buttons from the mobile hero, then insert a single visible instance of those CTAs in a dedicated section below the hero text block.
```

## Fix 15: [critical] Design QA — Visual accessibility · Hero CTA buttons and multiple section buttons, page-wide

Paste into Claude Code (or Lovable chat):

```
Change the .btn-primary background to '#CC4520' (a darker variant of the brand accent that passes WCAG AA contrast with white text at all font sizes), update '--primary-color: #CC4520' and '--primary-color-hover: #A8391A' in the CSS :root block.
```

## Fix 16: [major] Design QA — Visual accessibility · Hero section, desktop — event subtitle text over background image

Paste into Claude Code (or Lovable chat):

```
On the hero section's overlay element, set its background to 'linear-gradient(to right, rgba(10,37,64,0.75) 0%, rgba(10,37,64,0.45) 60%, rgba(10,37,64,0.20) 100%)' to ensure white text reads clearly across the full hero width while keeping the right-side image visible.
```

## Fix 17: [major] Design QA — Visual accessibility · Testimonial/quote section — large quotation mark and text on pink/magenta gradient

Paste into Claude Code (or Lovable chat):

```
Change the testimonial section background from the pink-cyan gradient to 'background-color: #0A2540;' and set the text color to '#FFFFFF' to guarantee contrast compliance and eliminate the readability issue from mid-gradient lighter tones.
```

## Fix 18: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 19: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212121 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 20: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack "Raleway, sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 21: [critical] Brand Compliance — Entire page

Paste into Claude Code (or Lovable chat):

```
Replace all instances of 'CX Retail Exchange UK' with 'WorkX 2026' in hero headings, page title, meta tags, and structured data. Update event dates to match WorkX 2026 confirmed dates. Update the portal branding throughout to match the WorkX 2026 / Example Portal identity.
```

## Fix 22: [critical] Brand Compliance — Global — primary brand color and CTA buttons

Paste into Claude Code (or Lovable chat):

```
In the :root CSS block, set --primary-color: #FF5A36; --primary-color-hover: #cc3a20; --secondary-color: #0A2540; --secondary-color-hover: #0d3a60;. Re-test all .btn-primary and .btn-secondary elements to confirm they now render in the correct brand colors.
```

## Fix 23: [critical] Brand Compliance — Global — typography

Paste into Claude Code (or Lovable chat):

```
Update the @import URL to: @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=Inter:wght@400;600&display=swap'); Then set --primary-font: 'Archivo', sans-serif; and --secondary-font: 'Inter', sans-serif; in :root. Ensure all h1–h6 and div[data-component=heading] inherit Archivo, and body/p elements inherit Inter.
```

## Fix 24: [major] Brand Compliance — Hero section — logo placement

Paste into Claude Code (or Lovable chat):

```
On the hero section's background image container, add a ::before pseudo-element with background: rgba(10,37,64,0.55); position: absolute; inset: 0; z-index: 1; to create a scrim. Ensure the logo element has position: relative; z-index: 2; so it renders above the scrim.
```

## Fix 25: [major] Brand Compliance — Mid-page — accent color overuse

Paste into Claude Code (or Lovable chat):

```
Audit all section elements with background-color set to the pink/magenta value. Replace decorative band backgrounds with #0A2540 (for dark sections) or #FFFFFF (for light sections). Retain the accent color only on .btn-primary CTA elements and inline highlight spans.
```

## Fix 26: [major] Brand Compliance — Hero — date discrepancy

Paste into Claude Code (or Lovable chat):

```
Search for all instances of '2027' in both the HTML copy and the JSON-LD script blocks. Update to the verified correct event year. In the hero heading, update the date string and confirm the JSON-LD startDate and endDate properties match.
```

## Fix 27: [major] Brand Compliance — Sponsor logo grid — 'Our Past Sponsors' section

Paste into Claude Code (or Lovable chat):

```
In the sponsors data source, deduplicate entries for 'Equal Experts' and any other repeated sponsor names. In CSS, apply .sponsor-logo img { max-height: 40px; width: auto; object-fit: contain; } to normalize sizing across the grid.
```

## Fix 28: [critical] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Rewrite the HTML <title> tag to: 'CX Retail Exchange UK 2027 | Retail CX Conference London' (55 chars). Ensure the same string is used in og:title and twitter:title.
```

## Fix 29: [critical] SEO Audit — <meta name='description'>

Paste into Claude Code (or Lovable chat):

```
Replace the content attribute of <meta name='description'> with a string of 150–160 characters that includes: the event name, year (2027), location (London), format (invitation-only), and top two benefit keywords (AI-driven CX innovation, loyalty & personalisation). Example: 'CX Retail Exchange UK 2027 — London's invitation-only forum for senior retail CX leaders. Gain AI-driven insights on loyalty, personalisation, and customer engagement.' (167 chars — trim to fit within 160).
```

## Fix 30: [major] SEO Audit — H1: 'The Exclusive, Invitation-only Event for CX, CS, & Digital Retail Leaders in the UK'

Paste into Claude Code (or Lovable chat):

```
Change the single <h1> element text to: 'The UK's Premier Retail Customer Experience Conference — London, 2027'. Remove the unexpanded abbreviation 'CS' or spell it out as 'Customer Service' within the subheading copy instead.
```

## Fix 31: [major] SEO Audit — og:title and twitter:title

Paste into Claude Code (or Lovable chat):

```
Update <meta property='og:title'> and <meta name='twitter:title'> content attributes to: 'CX Retail Exchange UK 2027 | London Retail CX Conference'.
```

## Fix 32: [major] SEO Audit — Event JSON-LD — offers object

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD <script> block, either: (a) populate 'highPrice' and 'lowPrice' with actual numeric values, or (b) delete both properties and set 'offerCount' to null or remove it. Do not leave price fields as empty strings.
```

## Fix 33: [major] SEO Audit — Event JSON-LD — location.address

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD location array, update the PostalAddress object: set 'streetAddress' to the venue street address as shown on the page, 'postalCode' to its postcode, and remove the empty 'telephone' property. If the venue is not yet confirmed, remove the empty streetAddress and postalCode keys entirely rather than leaving them as empty strings.
```

## Fix 34: [major] SEO Audit — Event JSON-LD — @id value

Paste into Claude Code (or Lovable chat):

```
Change the '@id' property in the Event JSON-LD block from 'https://www.iqpc.com#event' to 'https://www.cxnetwork.com/events-customer-experience-exchange-retail-uk#event'.
```

## Fix 35: [major] SEO Audit — WebSite JSON-LD block

Paste into Claude Code (or Lovable chat):

```
In the WebSite JSON-LD <script> block, change 'url' to 'https://www.cxnetwork.com' and 'name' to 'CX Network' to correctly represent the portal, not the individual event.
```
