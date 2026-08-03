# Ready-to-paste fix prompts

Generated from the QA run. Work top-to-bottom — blocking issues first.

## Fix 1: [major] MISSING_PIXEL

Paste into Claude Code (or Lovable chat):

```
Add the missing marketing pixel base code to the <head> of this site and confirm it fires on page load. Pixel/partner ID: <fill in>.
```

## Fix 2: [serious] Accessibility: aria-dialog-name

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "aria-dialog-name" (Ensure every ARIA dialog and alertdialog node has an accessible name) affecting 1 element(s), e.g. selector: .ju_wrapper. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 3: [serious] Accessibility: color-contrast

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "color-contrast" (Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds) affecting 34 element(s), e.g. selector: .btn-sm. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 4: [serious] Accessibility: link-name

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "link-name" (Ensure links have discernible text) affecting 1 element(s), e.g. selector: .font-weight-normal > a[target="_blank"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 5: [serious] Accessibility: tabindex

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "tabindex" (Ensure tabindex attribute values are not greater than 0) affecting 2 element(s), e.g. selector: #ju_iframe_1006722 div[data-offset-left="0"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 6: [major] Design QA — Layout & grid · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
Refactor the hero section to use a strict 12-column CSS Grid or Bootstrap grid row. Ensure the left text column spans 6 columns and the image spans 6 columns with no absolute-positioned elements overlapping the image. Remove or repositon the floating 'GET YOUR COMPLIMENTARY COPY HERE' element so it sits inside a defined grid row below the main headline.
```

## Fix 7: [major] Design QA — Layout & grid · Speaker Roster section, desktop

Paste into Claude Code (or Lovable chat):

```
On the speaker roster grid container, set `justify-content: center` (if using flexbox) or `justify-items: center` (if using CSS Grid) so that the final incomplete row of cards is centered rather than left-aligned.
```

## Fix 8: [major] Design QA — Layout & grid · 'Expand Your Knowledge' / content cards section, desktop

Paste into Claude Code (or Lovable chat):

```
In the resource cards section, set each card wrapper to the same width (e.g. `width: 23%` or Bootstrap `col-3`) and enforce a fixed image height of 160px with `object-fit: cover` so all card images align to the same baseline.
```

## Fix 9: [critical] Design QA — Typography · Entire page

Paste into Claude Code (or Lovable chat):

```
In the <style data-dynamic> block, replace `--primary-font: 'Nunito Sans', sans-serif;` with `--primary-font: 'Archivo', sans-serif;` and `--secondary-font: 'Inter', sans-serif;`. Add `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');` at the top of that style block.
```

## Fix 10: [major] Design QA — Typography · Hero headline, desktop

Paste into Claude Code (or Lovable chat):

```
Add a CSS rule targeting the hero section's H1 element: `.hero-section h1 { font-size: 48px; line-height: 1.15; font-family: 'Archivo', sans-serif; font-weight: 700; }` and adjust for mobile with `@media (max-width: 768px) { .hero-section h1 { font-size: 32px; } }`.
```

## Fix 11: [major] Design QA — Typography · Body copy sections (About section, Sponsorship section), desktop

Paste into Claude Code (or Lovable chat):

```
For all body text paragraphs in content sections, add a CSS rule: `.content-section p, .about-section p { max-width: 70ch; margin-left: auto; margin-right: auto; }` to constrain line length to readable measure.
```

## Fix 12: [major] Design QA — Spacing & rhythm · Between 'Secure your pass' CTA band and 'Expand Your Knowledge' section, desktop

Paste into Claude Code (or Lovable chat):

```
Add `padding-top: 64px;` to the 'Expand Your Knowledge' section container element so it has consistent separation from the CTA band above it.
```

## Fix 13: [major] Design QA — Spacing & rhythm · Photo Gallery section, desktop

Paste into Claude Code (or Lovable chat):

```
Set the parent row of the Photo Gallery two-column section to `display: flex; align-items: center;` so the 'Check Out Our Gallery' content is vertically centered alongside the photo.
```

## Fix 14: [critical] Design QA — Visual hierarchy · Hero section, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Inside the hero section's text column, after the event date/location line, add: `<a href='/events-veteransaffairshealthcare/srspricing' class='btn btn-primary-cta' style='background-color:#FF5A36; color:#ffffff; font-size:18px; font-weight:700; padding:16px 40px; border:none; border-radius:4px; display:inline-block; margin-top:24px;'>Register Now</a>` and ensure it is visible without scrolling on a 1440px viewport.
```

## Fix 15: [major] Design QA — Visual hierarchy · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
Remove the floating 'GET YOUR COMPLIMENTARY COPY HERE' overlay banner from the hero image area and move it to a dedicated section row below the hero. In the hero, retain only two buttons: a primary 'Register Now' (filled, #FF5A36) and a secondary 'View Agenda' (outline, border #0A2540, text #0A2540).
```

## Fix 16: [major] Design QA — Visual hierarchy · Event dates and location, hero, desktop

Paste into Claude Code (or Lovable chat):

```
Wrap the date and location text in a dedicated div below the H1: `<div class='event-meta' style='font-size:20px; font-weight:600; color:#0A2540; margin-top:16px;'>📅 July 28–29, 2026 &nbsp;|&nbsp; 📍 MGM Hotel and Casino, National Harbor, MD</div>`
```

## Fix 17: [critical] Design QA — Consistency · Entire page — color palette

Paste into Claude Code (or Lovable chat):

```
In the <style data-dynamic> block, make the following replacements: `--link-color: #489945` → `--link-color: #0A2540`; `--primary-color: #489945` → `--primary-color: #0A2540`; `--primary-color-hover: #1c511b` → `--primary-color-hover: #FF5A36`. Then find all hardcoded `background-color: #489945` or `background: green` declarations and replace with `#0A2540` for section backgrounds and `#FF5A36` for CTA buttons only.
```

## Fix 18: [major] Design QA — Consistency · CTA buttons across page

Paste into Claude Code (or Lovable chat):

```
Add to the global stylesheet: `.btn-primary-cta { background-color: #FF5A36; color: #ffffff; border: none; border-radius: 4px; padding: 12px 32px; font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 16px; } .btn-secondary-cta { background-color: transparent; color: #0A2540; border: 2px solid #0A2540; border-radius: 4px; padding: 12px 32px; font-family: 'Archivo', sans-serif; font-weight: 600; font-size: 16px; }` and replace all existing button inline styles with these classes.
```

## Fix 19: [critical] Design QA — Responsive integrity · Hero section, mobile (390px)

Paste into Claude Code (or Lovable chat):

```
Add a media query: `@media (max-width: 768px) { .complimentary-copy-banner { display: none; } .hero-section h1 { font-size: 28px; line-height: 1.2; } }` to hide the overlapping banner and scale up the mobile headline.
```

## Fix 20: [major] Design QA — Responsive integrity · Speaker Roster section, mobile

Paste into Claude Code (or Lovable chat):

```
Add `@media (max-width: 576px) { .speaker-card-col { flex: 0 0 100%; max-width: 100%; } }` to force speaker cards to full-width single column on small screens.
```

## Fix 21: [major] Design QA — Responsive integrity · Resource / Knowledge cards section, mobile

Paste into Claude Code (or Lovable chat):

```
Add `@media (max-width: 768px) { .resource-card img { aspect-ratio: 16/9; object-fit: cover; width: 100%; } .resource-card p, .resource-card h5 { font-size: 14px; } }` to fix image distortion and improve legibility on mobile.
```

## Fix 22: [critical] Design QA — Visual accessibility · Multiple green CTA buttons across page (desktop and mobile)

Paste into Claude Code (or Lovable chat):

```
Replace all instances of `background-color: #489945` on button elements with `background-color: #FF5A36` for primary CTAs (accent) or `background-color: #0A2540` for secondary actions, and ensure button text is `color: #ffffff` in both cases.
```

## Fix 23: [major] Design QA — Visual accessibility · Hero section — text over image, desktop

Paste into Claude Code (or Lovable chat):

```
On the hero image container, add a pseudo-element overlay: `.hero-image-container { position: relative; } .hero-image-container::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,37,64,0.6) 0%, rgba(10,37,64,0.1) 60%, transparent 100%); pointer-events: none; }`
```

## Fix 24: [major] Design QA — Visual accessibility · Green section backgrounds with body text (About section, Sponsorship section), desktop

Paste into Claude Code (or Lovable chat):

```
For all sections with a green background (class containing 'bg-primary' or background-color: #489945), explicitly set `color: #ffffff;` on all child text elements and verify that no gray or muted text classes are applied within these sections.
```

## Fix 25: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 26: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #333333 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 27: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack ""Nunito Sans", sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 28: [critical] Brand Compliance — Entire page — global brand identity

Paste into Claude Code (or Lovable chat):

```
Replace all instances of --primary-color: #489945 with #0A2540 and accent usage with #FF5A36 in the CSS. Replace @import for Nunito Sans with Archivo and Inter from Google Fonts and update --primary-font and --secondary-font CSS variables accordingly. Replace the IDGA logo asset in the header with the configured portal logo asset.
```

## Fix 29: [critical] Brand Compliance — Hero section — event name

Paste into Claude Code (or Lovable chat):

```
Search and replace all instances of 'Veterans Healthcare 2026' and 'Veterans Healthcare' (as an event title) with 'WorkX 2026' in all visible headings, meta tags (og:title, twitter:title, page title, og:site_name), and schema markup (name field).
```

## Fix 30: [critical] Brand Compliance — Header — logo

Paste into Claude Code (or Lovable chat):

```
In the header HTML, replace the <img> src pointing to the IDGA logo with the portal's approved logo asset URL. If the navbar background is dark (#0A2540 or equivalent), use the reversed white logo variant. Add CSS padding or margin around the logo element equal to the logomark's rendered height to enforce minimum clear space.
```

## Fix 31: [major] Brand Compliance — Hero and mid-page CTA sections — accent color usage

Paste into Claude Code (or Lovable chat):

```
In the CSS, update --primary-color: #489945 to #0A2540 for structural/primary elements and create a separate --accent-color: #FF5A36 variable. Apply --accent-color only to .btn-primary, .btn-cta, and key highlight text spans. Remove background-color: var(--primary-color) from section wrappers and replace with background-color: #0A2540 or background-color: #FFFFFF as appropriate.
```

## Fix 32: [major] Brand Compliance — Mid-page — 'Secure your pass before places run out!' CTA section

Paste into Claude Code (or Lovable chat):

```
Locate the HTML element containing the text 'Secure your pass before places run out!' and replace it with 'Reserve your place at WorkX 2026 — register today.' Update the sub-label 'MAKE SURE TO REGISTER YOUR PLACE' to 'Register now to secure your seat'.
```

## Fix 33: [major] Brand Compliance — Hero — yellow/orange alert banner

Paste into Claude Code (or Lovable chat):

```
Remove the HTML element containing the yellow/amber alert banner from the hero section. If a price deadline must be communicated, add a single-line <p> element in the hero body copy using color: #FF5A36 and font-family: Inter, stating the deadline factually, e.g., 'Standard pricing ends [date]'.
```

## Fix 34: [major] Brand Compliance — Logo — clear space (header, desktop and mobile)

Paste into Claude Code (or Lovable chat):

```
In the CSS for .navbar-brand or the logo container element, add padding: [logomark-height]px on all sides. At mobile breakpoints (max-width: 576px), ensure the logo wrapper retains at minimum 28px clearance from adjacent nav elements. Test at 390px viewport width.
```

## Fix 35: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 36: [critical] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Rewrite the <title> tag to: 'Veterans Healthcare Summit 2026 | VA & DoD | IDGA' (49 chars). This incorporates event type, year, primary audience abbreviations, and brand.
```

## Fix 37: [critical] SEO Audit — <meta name="description">

Paste into Claude Code (or Lovable chat):

```
Replace meta description with: 'Join 200+ VA and DoD health leaders at the Veterans Healthcare Summit 2026, July 28–29, National Harbor MD. Explore telehealth, EHR modernisation, AI, and veteran mental health. Register now.' (197 chars — trim slightly to fit 160.)
```

## Fix 38: [critical] SEO Audit — <h1>

Paste into Claude Code (or Lovable chat):

```
Keep the current H1 as a hero tagline but insert an H2 immediately beneath it reading: 'Veterans Healthcare Summit 2026 — July 28–29 | National Harbor, MD' to provide keyword context and event identity above the fold.
```

## Fix 39: [major] SEO Audit — schema.org Event JSON-LD — @id and WebSite @id

Paste into Claude Code (or Lovable chat):

```
In the existing Event JSON-LD block, change '"@id": "https://www.iqpc.com#event"' to '"@id": "https://www.idga.org/events-veteransaffairshealthcare#event"'. In the WebSite JSON-LD block change both '"@id"' and '"url"' values from 'https://www.iqpc.com' to 'https://www.idga.org'.
```

## Fix 40: [major] SEO Audit — schema.org Event JSON-LD — offers.availability

Paste into Claude Code (or Lovable chat):

```
In the offers object, change '"availability": "https://www.idga.org/events-veteransaffairshealthcare/InStock"' to '"availability": "https://schema.org/InStock"'.
```

## Fix 41: [major] SEO Audit — schema.org Event JSON-LD — eventAttendanceMode

Paste into Claude Code (or Lovable chat):

```
Change '"eventAttendanceMode": "OfflineEventAttendanceMode"' to '"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"'.
```

## Fix 42: [major] SEO Audit — og:image / twitter:image

Paste into Claude Code (or Lovable chat):

```
Update og:image and twitter:image meta tags to reference a purpose-built 1200×630px event banner image, e.g. 'https://eco-cdn.iqpc.com/eco/images/events/veterans-healthcare-2026-social.jpg'. Update twitter:card from 'summary' to 'summary_large_image' to enable the large card format.
```

## Fix 43: [major] SEO Audit — schema.org — duplicate performer and sponsor entries

Paste into Claude Code (or Lovable chat):

```
Audit the 'performer' and 'sponsor' arrays in the Event JSON-LD and remove all duplicate entries so each person or organisation is listed only once.
```
