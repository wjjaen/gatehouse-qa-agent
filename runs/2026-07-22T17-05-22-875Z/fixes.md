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

## Fix 3: [serious] Accessibility: color-contrast

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "color-contrast" (Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds) affecting 13 element(s), e.g. selector: .aos-animate.btn-primary[role="button"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 4: [critical] Accessibility: image-alt

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "image-alt" (Ensure <img> elements have alternative text or a role of none or presentation) affecting 1 element(s), e.g. selector: .d-md-block. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 5: [major] Design QA — Layout & grid · Key Themes section, desktop — four theme cards

Paste into Claude Code (or Lovable chat):

```
In the Key Themes section, add `display: flex; align-items: stretch;` to the row wrapper and `display: flex; flex-direction: column; justify-content: space-between;` to each card element so all four cards reach the same height regardless of content length.
```

## Fix 6: [major] Design QA — Layout & grid · Past Leaders logo grid, desktop

Paste into Claude Code (or Lovable chat):

```
Add the following CSS rule targeting the past-leaders logo grid: `.past-leaders-logo-grid img { height: 48px; max-width: 140px; object-fit: contain; margin: auto; }` to normalize logo sizing across the row.
```

## Fix 7: [critical] Design QA — Typography · Global — all headings and body text

Paste into Claude Code (or Lovable chat):

```
In the dynamic styles block, replace the @import for Raleway with `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');` and update `:root { --primary-font: 'Archivo', sans-serif; --secondary-font: 'Inter', sans-serif; }`.
```

## Fix 8: [major] Design QA — Typography · Stat bar (75 / 22 / 194 / 27), desktop

Paste into Claude Code (or Lovable chat):

```
Target the stat section label elements with `.stat-label { font-size: 14px; line-height: 1.4; }` and the numerals with `.stat-number { font-size: 32px; font-weight: 800; }`.
```

## Fix 9: [major] Design QA — Typography · Key Themes cards, desktop

Paste into Claude Code (or Lovable chat):

```
Add `.theme-card p, .theme-card .card-body { font-size: 14px; line-height: 1.5; color: #ffffff; }` to the theme card CSS.
```

## Fix 10: [major] Design QA — Spacing & rhythm · Sponsorship Opportunities section, desktop

Paste into Claude Code (or Lovable chat):

```
Add `margin-top: 32px;` to the Sponsorship Opportunities descriptive text container that follows the sold-out banner element.
```

## Fix 11: [major] Design QA — Spacing & rhythm · 2026 Sponsors section, desktop

Paste into Claude Code (or Lovable chat):

```
On the sponsors grid container, set `display: flex; flex-wrap: wrap; gap: 24px; align-items: center; justify-content: center;` to enforce consistent spacing between all sponsor logos.
```

## Fix 12: [critical] Design QA — Visual hierarchy · Hero section, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Change the 'Request Your Invite' button class to use `background-color: #FF5A36; color: #ffffff; font-size: 16px; padding: 16px 32px;` and change the other two hero buttons to `background-color: transparent; border: 2px solid #ffffff; color: #ffffff;` to establish a clear primary/secondary CTA hierarchy.
```

## Fix 13: [major] Design QA — Visual hierarchy · Mid-page — multiple competing section headers, desktop

Paste into Claude Code (or Lovable chat):

```
Define two heading tiers in CSS: `.section-heading-primary { font-size: 48px; font-weight: 800; }` for the most important sections (e.g. Speakers, Key Themes) and `.section-heading-secondary { font-size: 32px; font-weight: 700; }` for supporting sections (sponsors, testimonials), and apply these classes to the respective section `<h2>` elements.
```

## Fix 14: [major] Design QA — Visual hierarchy · 'Secure Your Place' CTA band, desktop

Paste into Claude Code (or Lovable chat):

```
Find the button inside the 'Secure Your Place' CTA band and update its inline style or CSS class to `background-color: #FF5A36; color: #ffffff; padding: 14px 28px; font-weight: 700; border: none;`.
```

## Fix 15: [critical] Design QA — Consistency · Global — brand color usage

Paste into Claude Code (or Lovable chat):

```
In the dynamic styles :root block, change `--primary-color: #0081ff;` to `--primary-color: #0A2540;` and `--secondary-color: #ffd230;` to `--secondary-color: #FF5A36;`, then verify all buttons and highlight elements update accordingly.
```

## Fix 16: [major] Design QA — Consistency · Button styles — hero vs. mid-page vs. sponsor section

Paste into Claude Code (or Lovable chat):

```
Audit all `<a class='btn'>` elements on the page and replace inconsistent color/padding overrides with one of two standardized classes: `.btn-primary { background:#FF5A36; color:#fff; padding:13px 24px; border-radius:4px; }` or `.btn-secondary { background:transparent; border:2px solid #0A2540; color:#0A2540; padding:11px 24px; border-radius:4px; }`.
```

## Fix 17: [major] Design QA — Consistency · Speaker cards vs. theme cards vs. sponsor logos — corner radius treatment

Paste into Claude Code (or Lovable chat):

```
Add a global rule: `.card img:not(.speaker-headshot) { border-radius: 8px; }` and `.speaker-headshot { border-radius: 50%; }` so all card imagery follows a single intentional system.
```

## Fix 18: [major] Design QA — Responsive integrity · Key Themes section, mobile (390px)

Paste into Claude Code (or Lovable chat):

```
Add a media query: `@media (max-width: 768px) { .theme-card .card-body p { display: none; } .theme-card .card-title { font-size: 16px; font-weight: 700; margin: 8px 0 0; } }` to collapse card body text on mobile and reduce scroll length.
```

## Fix 19: [major] Design QA — Responsive integrity · Past Leaders logo grid, mobile

Paste into Claude Code (or Lovable chat):

```
Add `@media (max-width: 768px) { .past-leaders-logo-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 16px; } .past-leaders-logo-grid img { height: 36px; max-width: 100%; object-fit: contain; } }` to the stylesheet.
```

## Fix 20: [major] Design QA — Responsive integrity · Hero section, mobile

Paste into Claude Code (or Lovable chat):

```
Add `@media (max-width: 768px) { .hero-title, .hero h1 { font-size: 28px; line-height: 1.2; } .hero-subtitle { font-size: 16px; } .hero .btn-primary { margin-top: 16px; } }` to push the primary CTA closer to the top of the mobile viewport.
```

## Fix 21: [critical] Design QA — Visual accessibility · Hero section — text over background image

Paste into Claude Code (or Lovable chat):

```
Add a scrim to the hero text container: `.hero-text-container { background: rgba(10, 37, 64, 0.65); padding: 24px 32px; border-radius: 4px; }` and change any yellow-background buttons with white text to use a darker label color: `.btn-secondary { color: #0A2540 !important; }` to improve contrast.
```

## Fix 22: [major] Design QA — Visual accessibility · Key Themes cards — body text on dark background

Paste into Claude Code (or Lovable chat):

```
Add `.theme-card .card-body, .theme-card p { font-size: 14px; color: #ffffff; line-height: 1.6; }` to ensure readable text over the dark card backgrounds.
```

## Fix 23: [major] Design QA — Visual accessibility · Global — interactive element affordances

Paste into Claude Code (or Lovable chat):

```
In the :root CSS block, change `--link-color: #ffd230;` to `--link-color: #0A2540;` and `--link-hover-color: #FF5A36;` so inline body links meet WCAG AA contrast on white backgrounds.
```

## Fix 24: [major] Design QA — Visual accessibility · Images — missing alt text (axe-core: image-alt, 1 node)

Paste into Claude Code (or Lovable chat):

```
Locate the `<img class='d-md-block'>` element and add `alt='Hyatt Regency Jersey City, venue for Corporate Counsel and Compliance Exchange USA 2026'` if it shows the venue, or `alt=''` and `role='presentation'` if it is purely decorative.
```

## Fix 25: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212121 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 26: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 27: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack "Raleway, sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 28: [critical] Brand Compliance — Entire page — CSS variables and button styles

Paste into Claude Code (or Lovable chat):

```
In the :root block of the dynamic styles, change --primary-color to #0A2540, --primary-color-hover to #0d3360, --secondary-color to #FF5A36, --secondary-color-hover to #e04a2a, --link-color to #FF5A36, and --link-hover-color to #0A2540. Remove all remaining references to #0081ff, #ffd230, and #00B7B0.
```

## Fix 29: [critical] Brand Compliance — Entire page — font stack

Paste into Claude Code (or Lovable chat):

```
In the @import block, add: @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=Inter:wght@400;600;700&display=swap'); then set --primary-font: 'Archivo', sans-serif; and --secondary-font: 'Inter', sans-serif; Remove the Raleway import lines.
```

## Fix 30: [critical] Brand Compliance — Page meta description and hero subheading

Paste into Claude Code (or Lovable chat):

```
Find all instances of 'The Premier Exchange' in page copy, meta description, and og:description. Replace each with 'An Invitation-Only Exchange for Senior Legal and Compliance Leaders' or similar verifiable phrasing per brand tone guidelines.
```

## Fix 31: [major] Brand Compliance — Hero section — accent color usage

Paste into Claude Code (or Lovable chat):

```
Search the stylesheet and HTML for all occurrences of #ffd230 and --secondary-color used in non-CTA contexts (borders, decorative text, dividers, background bands). Remove or replace those with neutral or primary-color values. Ensure only the primary registration CTA button and up to two key metric highlights use the accent #FF5A36.
```

## Fix 32: [major] Brand Compliance — Hero — primary logo on dark background

Paste into Claude Code (or Lovable chat):

```
Wrap the hero logo <img> in a <div> with style='background: rgba(0,0,0,0.45); padding: [logomark-height]px; display:inline-block;' to satisfy scrim and clear-space requirements. Confirm the src attribute of the nav logo points to the white/reversed logo asset, not the standard dark logo.
```

## Fix 33: [major] Brand Compliance — Key Themes section — image cards

Paste into Claude Code (or Lovable chat):

```
On each .theme-card or equivalent selector, add a ::before pseudo-element: content:''; position:absolute; inset:0; background:linear-gradient(to top, rgba(10,37,64,0.85) 50%, rgba(10,37,64,0.2) 100%); z-index:1; and ensure card text has position:relative; z-index:2.
```

## Fix 34: [major] Brand Compliance — Mobile hero — registration CTA placement

Paste into Claude Code (or Lovable chat):

```
In the responsive CSS (max-width: 768px), add order:-1 or restructure the hero flex/grid so the .btn-register or equivalent CTA element appears immediately after the h1/date element and before the description paragraph.
```

## Fix 35: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 36: [critical] SEO Audit — meta description

Paste into Claude Code (or Lovable chat):

```
Rewrite the meta description for this event page to exactly 150–160 characters. Include: event name 'Corporate Counsel & Compliance Exchange USA', dates July 21–22 2026, location Jersey City NJ, and one concrete benefit (e.g. peer case studies on legal tech, ALSPs, and regulatory strategy). No exclamation marks, no superlatives like 'premier' or 'exclusive'.
```

## Fix 37: [critical] SEO Audit — H1 tag

Paste into Claude Code (or Lovable chat):

```
Change the H1 element on this page to 'Corporate Counsel & Compliance Exchange USA 2026'. Move the existing tagline 'Checkmate, Chaos — Turning Volatility Into Your Next Strategic Advantage' to an H2 or a styled paragraph immediately below the H1 so it remains visible as a brand message without cannibalising the primary keyword signal.
```

## Fix 38: [critical] SEO Audit — <meta name='keywords'>

Paste into Claude Code (or Lovable chat):

```
Replace the content of <meta name='keywords'> with: 'corporate counsel conference, compliance exchange USA, GC summit 2026, legal tech event, corporate governance, ALSPs, outside counsel strategy, legal leaders'. If the CMS does not support keyword meta editing, remove the tag entirely.
```

## Fix 39: [major] SEO Audit — Page title tag

Paste into Claude Code (or Lovable chat):

```
Update the HTML <title> tag to: 'Corporate Counsel & Compliance Exchange USA 2026 | IQPC' — this is 55 characters, within the 60-character limit, adds the year for temporal query matching, and appends the organiser brand for recognition in SERPs.
```

## Fix 40: [major] SEO Audit — og:title and twitter:title

Paste into Claude Code (or Lovable chat):

```
Set og:title and twitter:title to: 'Corporate Counsel & Compliance Exchange USA | July 21–22 2026, Jersey City NJ'. This gives social platforms and preview cards the date and location context without exceeding typical truncation limits.
```

## Fix 41: [major] SEO Audit — og:site_name

Paste into Claude Code (or Lovable chat):

```
Change <meta property='og:site_name' content='Corporate Counsel & Compliance Exchange USA'> to <meta property='og:site_name' content='IQPC'>.
```

## Fix 42: [major] SEO Audit — Event JSON-LD — sponsor array

Paste into Claude Code (or Lovable chat):

```
Audit the 'sponsor' array in the Event JSON-LD and remove all duplicate organisation entries so each sponsor name appears exactly once. For any sponsor where the URL is an empty string, replace it with null (JSON null, not the string 'null').
```

## Fix 43: [major] SEO Audit — Event JSON-LD — 'test test' performer

Paste into Claude Code (or Lovable chat):

```
Delete the entry {"@type":"Person","name":"test test","url":""} from the 'performer' array in the Event JSON-LD script block.
```

## Fix 44: [major] SEO Audit — Event JSON-LD — offer availability URL

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD 'offers.offers[0].availability', change the value from 'https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa/InStock' to 'https://schema.org/InStock'.
```
