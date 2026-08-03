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
Fix the axe-core accessibility violation "color-contrast" (Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds) affecting 13 element(s), e.g. selector: .aos-animate.btn-primary[role="button"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 3: [critical] Accessibility: image-alt

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "image-alt" (Ensure <img> elements have alternative text or a role of none or presentation) affecting 1 element(s), e.g. selector: .d-md-block. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 4: [major] Design QA — Layout & grid · Stats row (desktop, between hero and speakers section)

Paste into Claude Code (or Lovable chat):

```
In the stats row section, set all four stat columns to `col-3` in Bootstrap (or `grid-template-columns: repeat(4, 1fr)` in CSS) and add `text-align: center` and equal horizontal padding (e.g. `px-3`) to each cell so all four items share identical widths and internal spacing.
```

## Fix 5: [major] Design QA — Layout & grid · Sponsorship Opportunities section, desktop

Paste into Claude Code (or Lovable chat):

```
Wrap the sponsorship image and copy in `<div class='row align-items-center'>` with each child as `<div class='col-md-6 px-4'>`. Remove any inline margin or padding overrides on the individual columns so Bootstrap's gutter handles spacing uniformly.
```

## Fix 6: [critical] Design QA — Typography · Site-wide

Paste into Claude Code (or Lovable chat):

```
At the top of the dynamic <style> block, replace the existing @import for Raleway with: `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');` Then in :root set `--primary-font: 'Archivo', sans-serif;` and `--secondary-font: 'Inter', sans-serif;`.
```

## Fix 7: [major] Design QA — Typography · Body copy throughout page (desktop and mobile)

Paste into Claude Code (or Lovable chat):

```
Add a CSS rule: `.body-text-column, .event-description, .testimonial-copy, .sponsorship-copy { max-width: 720px; margin-left: auto; margin-right: auto; }` Adjust the selector list to match the actual class names used for prose text blocks across the page.
```

## Fix 8: [major] Design QA — Typography · Section headings across page (e.g. '2026 Expert Speakers', 'Key Themes for 2026 Include:', 'Past Leaders on the Board')

Paste into Claude Code (or Lovable chat):

```
In the dynamic stylesheet, add: `h2 { font-size: 32px !important; line-height: 1.2; } h3 { font-size: 24px !important; line-height: 1.3; }` and remove any conflicting inline `style='font-size:...'` attributes from heading elements in the HTML.
```

## Fix 9: [major] Design QA — Spacing & rhythm · 'Benefits of Attending / Benefits of Sponsoring' section, desktop

Paste into Claude Code (or Lovable chat):

```
In the HTML for the Benefits of Attending / Sponsoring section, add `style='display:none'` to the section wrapper element until content is populated, to prevent an empty white band from displaying to visitors.
```

## Fix 10: [major] Design QA — Spacing & rhythm · Photo Gallery section, desktop

Paste into Claude Code (or Lovable chat):

```
On the photo gallery image container, add `gap: 16px; display: flex; flex-wrap: wrap;` and on the gallery section heading, set `padding-top: 48px;` replacing any larger value currently applied.
```

## Fix 11: [major] Design QA — Visual hierarchy · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
In the hero button group, give the 'Request Your Invite' button `style='background-color:#FF5A36; color:#FFFFFF; border:none; font-weight:700; padding: 14px 28px;'` and give the other two buttons `style='background-color:transparent; border: 2px solid #FFFFFF; color:#FFFFFF; padding: 12px 24px;'` so the primary CTA is visually dominant.
```

## Fix 12: [major] Design QA — Visual hierarchy · '2026 Sponsorship Opportunities SOLD OUT' banner, desktop

Paste into Claude Code (or Lovable chat):

```
Replace the full-width coloured sold-out banner with an inline `<span class='badge' style='background-color:#6c757d; color:#fff; font-size:12px; padding:4px 8px; border-radius:4px;'>Sponsorship Sold Out</span>` placed next to the section heading, removing the large background-colour block entirely.
```

## Fix 13: [critical] Design QA — Consistency · CTAs site-wide (hero, speakers, themes, sponsorship, footer)

Paste into Claude Code (or Lovable chat):

```
In the dynamic stylesheet :root block, change `--primary-color: #FF5A36;` and `--primary-color-hover: #cc3a20;` and `--secondary-color: #0A2540;`. Then do a find-and-replace in the HTML for any inline `style` attributes with background-color:#0081ff or background-color:#ffd230 on button elements, replacing them with the correct token values.
```

## Fix 14: [major] Design QA — Consistency · Theme cards (Key Themes section) vs Speaker cards, desktop

Paste into Claude Code (or Lovable chat):

```
Add a shared CSS class `.event-card { border-radius: 4px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.12); }` and apply it to both the speaker card elements and the theme card elements. Ensure image overlays on both use `background: linear-gradient(to top, rgba(10,37,64,0.85) 0%, rgba(10,37,64,0) 60%);` for consistency.
```

## Fix 15: [major] Design QA — Consistency · Sponsor logo grid, desktop

Paste into Claude Code (or Lovable chat):

```
Add CSS: `.sponsor-logo-grid img { height: 48px; width: auto; max-width: 140px; object-fit: contain; display: inline-block; vertical-align: middle; }` — adjust the selector to match the actual class wrapping sponsor logo img elements.
```

## Fix 16: [major] Design QA — Responsive integrity · Key Themes cards, mobile (390px)

Paste into Claude Code (or Lovable chat):

```
Add a media query: `@media (max-width: 576px) { .theme-card { height: auto !important; min-height: 280px; } .theme-card .overlay-text { position: relative; background: rgba(10,37,64,0.85); padding: 12px; } }` — adjust selectors to match actual theme card class names.
```

## Fix 17: [major] Design QA — Responsive integrity · Stats row, mobile

Paste into Claude Code (or Lovable chat):

```
Add `@media (max-width: 576px) { .stats-item { padding: 16px 8px; text-align: center; } .stats-number { font-size: 28px; } .stats-label { font-size: 12px; line-height: 1.4; } }` — update selectors to match actual stat element class names.
```

## Fix 18: [major] Design QA — Responsive integrity · Hero section, mobile

Paste into Claude Code (or Lovable chat):

```
Add: `@media (max-width: 576px) { .hero-event-title { font-size: 26px !important; line-height: 1.2; } .hero-section { padding-top: 24px; padding-bottom: 24px; } }` so the hero content compresses to keep the CTA button visible without scrolling on a 390px viewport.
```

## Fix 19: [critical] Design QA — Visual accessibility · Primary CTA buttons site-wide (confirmed by axe-core: .aos-animate.btn-primary)

Paste into Claude Code (or Lovable chat):

```
In the dynamic stylesheet :root, set `--primary-color: #0A2540;` and `--primary-color-hover: #061829;`. This ensures all .btn-primary elements inherit a background colour that achieves approximately 16:1 contrast with white text, passing WCAG AA and AAA.
```

## Fix 20: [major] Design QA — Visual accessibility · Hero section — event name and subtitle over background image, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
On the hero section's background image container, add a pseudo-element or overlay div: `.hero-section::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(10,37,64,0.80) 0%, rgba(10,37,64,0.50) 100%); z-index: 1; }` and ensure all hero text elements have `position: relative; z-index: 2;`.
```

## Fix 21: [major] Design QA — Visual accessibility · Theme cards — white text over image overlays, mobile

Paste into Claude Code (or Lovable chat):

```
Add CSS: `.theme-card .card-text-overlay { background: linear-gradient(to top, rgba(10,37,64,0.85) 0%, rgba(10,37,64,0.4) 70%, transparent 100%); } .theme-card h3, .theme-card p { text-shadow: 0 1px 3px rgba(0,0,0,0.8); }` — update selectors to match actual card class names.
```

## Fix 22: [major] Design QA — Visual accessibility · Yellow (#ffd230) links and buttons throughout page

Paste into Claude Code (or Lovable chat):

```
In the dynamic stylesheet :root, change `--link-color: #0A2540;` and `--link-hover-color: #FF5A36;`. This ensures all `a:not(.btn)` links on white backgrounds have sufficient contrast while maintaining brand colour usage.
```

## Fix 23: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212121 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 24: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 25: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack "Raleway, sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 26: [critical] Brand Compliance — Brand config vs. page identity

Paste into Claude Code (or Lovable chat):

```
In the site's CSS :root block, update --primary-color to #0A2540, --secondary-color (accent) to #FF5A36, --primary-font and --secondary-font to 'Archivo, sans-serif' and 'Inter, sans-serif' respectively, then audit all hardcoded hex values in template CSS files to replace #0081ff and #ffd230 with the correct tokens.
```

## Fix 27: [critical] Brand Compliance — Hero section — sub-headline copy

Paste into Claude Code (or Lovable chat):

```
Locate the hero headline element (h1 or hero heading component) and replace the text 'Checkmate, Chaos – Turning Volatility into Your Next Strategic Advantage' with a factual, benefit-led alternative such as 'Navigating Volatility: Practical Strategies for Legal & Compliance Leaders in 2026'.
```

## Fix 28: [major] Brand Compliance — Accent color usage — throughout page (yellow #ffd230)

Paste into Claude Code (or Lovable chat):

```
Search all CSS classes and inline styles using var(--secondary-color) or #ffd230 as a background-color. Remove it from section wrappers, card backgrounds, and decorative dividers. Retain it only on .btn-secondary, .btn-primary CTA elements, and individual highlight tags. Replace removed accent backgrounds with background: #0A2540 (dark sections) or background: #FFFFFF (light sections).
```

## Fix 29: [major] Brand Compliance — Logo — top-left navigation bar

Paste into Claude Code (or Lovable chat):

```
In the navbar CSS, add padding-right: 40px (or the equivalent spacing-scale value of 32–48px) to the .navbar-brand element that wraps the logo image, and ensure margin: 0 32px is applied on the logo's parent container so no nav link or decorative element intrudes within one logomark-height on any side.
```

## Fix 30: [major] Brand Compliance — Hero — logo placed over busy photography

Paste into Claude Code (or Lovable chat):

```
On the hero section's background container, add a CSS pseudo-element or overlay div: .hero-section::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,37,64,0.72) 60%, rgba(10,37,64,0.3) 100%); z-index: 1; } and ensure the logo and text sit above z-index: 2.
```

## Fix 31: [major] Brand Compliance — Meta description and page copy — 'The Premier Exchange'

Paste into Claude Code (or Lovable chat):

```
Search the page HTML and meta description content for the string 'The Premier Exchange' and replace all instances with 'An Invitation-Only Exchange for Legal Leaders' to comply with the no-unverifiable-superlatives tone rule.
```

## Fix 32: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 33: [critical] SEO Audit — meta description

Paste into Claude Code (or Lovable chat):

```
Rewrite the meta description for the Corporate Counsel & Compliance Exchange USA event page. Requirements: 150–160 characters, include 'July 21–22, 2026' and 'Jersey City, NJ', mention corporate counsel / compliance leaders as audience, reference legal tech and regulatory strategy as topics, no exclamation marks, no unverifiable superlatives like 'premier' or 'exclusive'.
```

## Fix 34: [critical] SEO Audit — H1 tag

Paste into Claude Code (or Lovable chat):

```
Change the page H1 from 'Checkmate, Chaos - Turning Volatility Into Your Next Strategic Advantage' to 'Corporate Counsel & Compliance Exchange USA 2026'. Demote the existing tagline to an H2 or visually prominent paragraph directly beneath the H1 in the hero section to preserve brand voice without sacrificing keyword relevance.
```

## Fix 35: [major] SEO Audit — title tag

Paste into Claude Code (or Lovable chat):

```
Update the HTML <title> tag to: 'Corporate Counsel & Compliance Exchange USA 2026' (48 chars). If space allows without exceeding 60 chars, consider 'Corporate Counsel & Compliance Exchange USA | July 2026'.
```

## Fix 36: [major] SEO Audit — Event JSON-LD — @id and location.url

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD block: (1) Change @id to 'https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa'. (2) Deduplicate the sponsor array — remove repeated entries for Ivo, LexisNexis, Axiom, Novus Law, Mitratech, GC AI, Erskine Law, Checkbox, DocJuris, Eudia, and Spellbook. (3) Remove the performer object where name is 'test test'. (4) Set location[0].url to '' only if no venue URL appears on the page; otherwise populate from page content.
```

## Fix 37: [major] SEO Audit — OG description

Paste into Claude Code (or Lovable chat):

```
Set the og:description to a dedicated 180–200 character social-share copy for the Corporate Counsel & Compliance Exchange USA. Lead with the event name and dates (July 21–22, 2026, Jersey City NJ), then one benefit line for in-house legal and compliance leaders. Avoid duplicating the meta description verbatim.
```

## Fix 38: [major] SEO Audit — robots meta tag

Paste into Claude Code (or Lovable chat):

```
Add the following tag inside the <head> element of the page: <meta name='robots' content='index, follow'>
```
