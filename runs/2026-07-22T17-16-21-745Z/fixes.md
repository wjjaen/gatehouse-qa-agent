# Ready-to-paste fix prompts

Generated from the QA run. Work top-to-bottom — blocking issues first.

## Fix 1: [major] MISSING_PIXEL

Paste into Claude Code (or Lovable chat):

```
Add the missing marketing pixel base code to the <head> of this site and confirm it fires on page load. Pixel/partner ID: <fill in>.
```

## Fix 2: [critical] DEAD_CTA

Paste into Claude Code (or Lovable chat):

```
Fix this broken call-to-action: CTA "Register" has no destination (href="#"). Point it at the correct registration URL and verify the link resolves.
```

## Fix 3: [serious] Accessibility: aria-dialog-name

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "aria-dialog-name" (Ensure every ARIA dialog and alertdialog node has an accessible name) affecting 1 element(s), e.g. selector: .ju_wrapper. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 4: [serious] Accessibility: color-contrast

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "color-contrast" (Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds) affecting 34 element(s), e.g. selector: .btn-sm. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 5: [serious] Accessibility: link-name

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "link-name" (Ensure links have discernible text) affecting 1 element(s), e.g. selector: .font-weight-normal > a[target="_blank"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 6: [serious] Accessibility: tabindex

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "tabindex" (Ensure tabindex attribute values are not greater than 0) affecting 2 element(s), e.g. selector: #ju_iframe_1006722 div[data-offset-left="0"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 7: [major] Design QA — Layout & grid · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
In the hero section HTML, wrap the event name, subtitle, date/location line, and primary Register button in a single div with class 'col-lg-7'. Move the '2026 Agenda' and 'GET YOUR COMPLIMENTARY COPY' buttons to a section below the hero. Ensure all left-column text elements share the same left padding value (e.g., padding-left: 48px).
```

## Fix 8: [major] Design QA — Layout & grid · Speaker roster section, desktop

Paste into Claude Code (or Lovable chat):

```
Find the speaker roster section. Change all speaker card wrapper divs to use the same Bootstrap column class, e.g. 'class="col-6 col-md-3"', so every row contains exactly 4 cards on desktop and 2 on mobile. Remove any inline width or flex-basis overrides on individual cards.
```

## Fix 9: [critical] Design QA — Typography · Global / all sections

Paste into Claude Code (or Lovable chat):

```
In the <style data-dynamic> block, replace the @import for Google Fonts with: @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap'); Then change --primary-font to 'Archivo', sans-serif and --secondary-font to 'Inter', sans-serif.
```

## Fix 10: [major] Design QA — Typography · Body copy sections (intro paragraph, speaker bios), desktop

Paste into Claude Code (or Lovable chat):

```
Wrap all long-form body text <p> elements in a div with style 'max-width: 720px; margin: 0 auto;' so that no paragraph exceeds approximately 80 characters per line at 1440px viewport width.
```

## Fix 11: [major] Design QA — Typography · Multiple sections (speaker section heading, CTA banner, sponsor section heading)

Paste into Claude Code (or Lovable chat):

```
Add a CSS rule block that enforces the type scale: h1 { font-size: 48px; } h2 { font-size: 32px; } h3 { font-size: 24px; } h4 { font-size: 20px; } h5, h6 { font-size: 16px; } p, li { font-size: 16px; } .caption, .label { font-size: 14px; } Remove all inline font-size styles that override these values.
```

## Fix 12: [major] Design QA — Spacing & rhythm · Intro text block below hero, desktop

Paste into Claude Code (or Lovable chat):

```
Add CSS: .intro-editorial-section { margin-top: 48px; } .intro-editorial-section p + p { margin-top: 16px; } replacing '.intro-editorial-section' with the actual class or ID of that container element.
```

## Fix 13: [major] Design QA — Spacing & rhythm · Speaker section and CTA banner, desktop

Paste into Claude Code (or Lovable chat):

```
Find the green CTA banner section element (the one containing 'Secure your pass before places run out') and add inline style 'margin-top: 64px; padding-top: 48px; padding-bottom: 48px;' or apply Bootstrap utility classes 'mt-5 py-5' to its outermost div.
```

## Fix 14: [critical] Design QA — Visual hierarchy · Hero section, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Search the HTML for all <a> elements with text containing 'Register' and replace href="#" with the correct registration page URL, e.g. href="https://www.idga.org/events-veteransaffairshealthcare/srspricing". Ensure the link opens in the same tab unless it is a third-party registration system, in which case add target="_blank" rel="noopener".
```

## Fix 15: [major] Design QA — Visual hierarchy · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
Set the 'Register Now' button to background-color: #FF5A36; color: #FFFFFF; border: none; and change the '2026 Agenda' and 'GET YOUR COMPLIMENTARY COPY' buttons to background-color: transparent; color: #0A2540; border: 2px solid #0A2540; so the registration action is visually dominant.
```

## Fix 16: [major] Design QA — Visual hierarchy · Below-the-fold content sections, desktop

Paste into Claude Code (or Lovable chat):

```
Alternate section background colors: set even-numbered section containers to background-color: #F7F8FA and odd-numbered ones to background-color: #FFFFFF. Keep the 'Secure your pass' CTA banner at background-color: #0A2540 with white text. Add this CSS: .page-section:nth-child(even) { background-color: #F7F8FA; }
```

## Fix 17: [critical] Design QA — Consistency · Global — accent color usage

Paste into Claude Code (or Lovable chat):

```
In the CSS :root block, change --primary-color to #FF5A36 and --primary-color-hover to #CC4A2B. Change --link-color to #0A2540 and --link-hover-color to #FF5A36. This will cascade the correct accent color to all buttons, links, and highlighted elements site-wide.
```

## Fix 18: [major] Design QA — Consistency · Speaker cards, desktop

Paste into Claude Code (or Lovable chat):

```
Add CSS: .speaker-card img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; } .speaker-card .speaker-name { font-family: 'Archivo', sans-serif; font-weight: 600; font-size: 16px; } replacing '.speaker-card' with the actual card class used in the markup.
```

## Fix 19: [major] Design QA — Consistency · CTA buttons across page

Paste into Claude Code (or Lovable chat):

```
Define two button classes in CSS: .btn-primary-cta { background-color: #FF5A36; color: #fff; border: none; border-radius: 4px; padding: 12px 24px; font-family: 'Archivo', sans-serif; font-weight: 600; } and .btn-secondary-cta { background-color: transparent; color: #0A2540; border: 2px solid #0A2540; border-radius: 4px; padding: 12px 24px; font-family: 'Archivo', sans-serif; font-weight: 600; } Then replace all existing button classes across the page with one of these two variants.
```

## Fix 20: [critical] Design QA — Responsive integrity · Hero section, mobile (390px)

Paste into Claude Code (or Lovable chat):

```
Add to your CSS: @media (max-width: 576px) { .hero-event-title { font-size: 32px; line-height: 1.2; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; } } replacing '.hero-event-title' with the actual class of the hero heading element.
```

## Fix 21: [major] Design QA — Responsive integrity · Sponsor logo section, mobile

Paste into Claude Code (or Lovable chat):

```
Add CSS: @media (max-width: 576px) { .sponsor-logo-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; } .sponsor-logo-grid img { max-height: 48px; width: auto; flex: 0 0 calc(33.33% - 16px); object-fit: contain; } } replacing '.sponsor-logo-grid' and '.sponsor-logo-grid img' with the actual selectors for the sponsor section.
```

## Fix 22: [major] Design QA — Responsive integrity · Testimonials section, mobile

Paste into Claude Code (or Lovable chat):

```
Add CSS: @media (max-width: 576px) { .testimonials-row { flex-direction: column; } .testimonial-card { width: 100%; margin-bottom: 24px; font-size: 14px; line-height: 1.6; } } replacing '.testimonials-row' and '.testimonial-card' with the actual class names used in the testimonials section markup.
```

## Fix 23: [major] Design QA — Responsive integrity · Knowledge download tiles, mobile

Paste into Claude Code (or Lovable chat):

```
Add CSS: @media (max-width: 576px) { .download-tile, .download-tile * { max-width: 100%; width: 100%; box-sizing: border-box; overflow: hidden; } } replacing '.download-tile' with the actual tile component class.
```

## Fix 24: [major] Design QA — Visual accessibility · Hero section — event name text over background image, desktop

Paste into Claude Code (or Lovable chat):

```
Add a pseudo-element overlay to the hero background: .hero-section::before { content: ''; position: absolute; inset: 0; background: rgba(10, 37, 64, 0.55); z-index: 0; } and set .hero-text-column { position: relative; z-index: 1; } to ensure text is layered above the scrim.
```

## Fix 25: [major] Design QA — Visual accessibility · Green CTA banner — 'Register Here' button

Paste into Claude Code (or Lovable chat):

```
Find the 'Register Here' button inside the green CTA banner and change its style to: background-color: #FF5A36; color: #FFFFFF; border: none; This will ensure the button is both brand-compliant and accessible against the dark background.
```

## Fix 26: [major] Design QA — Visual accessibility · Footer area, desktop

Paste into Claude Code (or Lovable chat):

```
In the footer HTML, add the following if not present: <a href='/privacy-policy' style='color: #CCCCCC; font-size: 13px;'>Privacy Policy</a> and add CSS: .site-footer a { font-size: 13px; color: #CCCCCC; } .site-footer a:hover { color: #FFFFFF; } to ensure footer links are legible.
```

## Fix 27: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 28: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #333333 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 29: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack ""Nunito Sans", sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 30: [critical] Brand Compliance — Global — entire page

Paste into Claude Code (or Lovable chat):

```
Before any code changes, confirm with the project owner whether this page should be reviewed against the IDGA Veterans Healthcare brand config or the WorkX 2026 config. The two are entirely different identities and no code fix is appropriate until the correct config is identified.
```

## Fix 31: [critical] Brand Compliance — Hero section — event title lockup

Paste into Claude Code (or Lovable chat):

```
In the hero section CSS, set `overflow: visible` on the event title container, reduce the promo banner height or reposition it below the title, and ensure the h1 text is never clipped. Test at 1440px and 390px viewports.
```

## Fix 32: [major] Brand Compliance — Hero and throughout — accent color usage

Paste into Claude Code (or Lovable chat):

```
In the CSS, replace all instances of `background: #489945` and `color: #489945` used on non-CTA decorative elements (section backgrounds, dividers, icon fills) with `#0A2540` (primary) or `#FFFFFF` (background). Retain `#FF5A36` only on `.btn-primary`, `.cta-highlight`, and key stat callouts.
```

## Fix 33: [major] Brand Compliance — Top navigation bar — logo placement

Paste into Claude Code (or Lovable chat):

```
In the navbar CSS, set `.navbar-brand { padding: [logomark-height]px; }` and add `margin-right: [logomark-height]px` between the logo and the first nav item. Calculate logomark height from the rendered img height. On mobile media queries, apply the same minimum padding.
```

## Fix 34: [major] Brand Compliance — Hero banner — logo over busy imagery

Paste into Claude Code (or Lovable chat):

```
Add a pseudo-element to the hero: `.hero::before { content: ''; position: absolute; inset: 0; background: rgba(10,37,64,0.55); z-index: 1; }` and ensure `.hero-content { position: relative; z-index: 2; }`.
```

## Fix 35: [major] Brand Compliance — Hero — newsletter/promo bar

Paste into Claude Code (or Lovable chat):

```
Replace the promo bar innerHTML with factual, benefit-led copy: e.g. `<p>New Report: 2026 VA Digital Health Landscape — <a href='#'>Download your free copy</a></p>`. Avoid phrases like 'latest free' without qualification.
```

## Fix 36: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 37: [critical] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Rewrite the HTML <title> tag to: 'Veterans Affairs Healthcare Conference 2026 | IDGA'. This is 51 characters, includes the primary keyword cluster, event year, and brand identifier.
```

## Fix 38: [critical] SEO Audit — <meta name='description'>

Paste into Claude Code (or Lovable chat):

```
Replace the meta description content attribute with: 'Join senior VA and DoD health leaders at the Veterans Affairs Healthcare Conference 2026, July 28–29, National Harbor MD. Explore telehealth, EHR modernisation, AI and veteran mental health. Register now.'
```

## Fix 39: [critical] SEO Audit — Event JSON-LD — @id field

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD block, change: '"@id": "https://www.iqpc.com#event"' to '"@id": "https://www.idga.org/events-veteransaffairshealthcare#event"'.
```

## Fix 40: [critical] SEO Audit — Event JSON-LD — offers.availability

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD offers block, change '"availability": "https://www.idga.org/events-veteransaffairshealthcare/InStock"' to '"availability": "https://schema.org/InStock"'.
```

## Fix 41: [major] SEO Audit — <h1>

Paste into Claude Code (or Lovable chat):

```
Add a visually subordinate but semantically prominent subtitle directly below the H1: '<p class="hero-subtitle">Veterans Affairs Healthcare Summit | July 28–29, 2026 | National Harbor, MD</p>'. Alternatively, restructure so the H1 reads: 'Veterans Affairs Healthcare Conference 2026' and demote the current H1 to a styled <p> tagline.
```

## Fix 42: [major] SEO Audit — Event JSON-LD — performer array

Paste into Claude Code (or Lovable chat):

```
Audit the 'performer' and 'sponsor' arrays in the Event JSON-LD and remove all duplicate @type/name entries, ensuring each person and organisation is listed only once.
```

## Fix 43: [major] SEO Audit — Event JSON-LD — location.address.streetAddress

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD location address object, change empty string values to null: '"streetAddress": null, "postalCode": null, "telephone": null'. Only populate them if the exact values appear in the rendered page content.
```

## Fix 44: [major] SEO Audit — og:image / twitter:image

Paste into Claude Code (or Lovable chat):

```
Update '<meta property="og:image">' and '<meta name="twitter:image">' to reference a 1200×630px event hero banner image. Also change '<meta name="twitter:card" content="summary">' to '<meta name="twitter:card" content="summary_large_image">'.
```

## Fix 45: [major] SEO Audit — <meta name='keywords'>

Paste into Claude Code (or Lovable chat):

```
Set the keywords meta content attribute to: 'veterans healthcare conference 2026, VA healthcare summit, veterans affairs health, military healthcare conference, telehealth veterans, EHR modernization, IDGA events, National Harbor MD conference'.
```
