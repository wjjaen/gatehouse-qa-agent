# Ready-to-paste fix prompts

Generated from the QA run. Work top-to-bottom — blocking issues first.

## Fix 1: [major] MISSING_PIXEL

Paste into Claude Code (or Lovable chat):

```
Add the missing marketing pixel base code to the <head> of this site and confirm it fires on page load. Pixel/partner ID: <fill in>.
```

## Fix 2: [critical] Accessibility: aria-valid-attr-value

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "aria-valid-attr-value" (Ensure all ARIA attributes have valid values) affecting 3 element(s), e.g. selector: #tier-6994e6cc50cb2108c7583cfb-tab. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 3: [serious] Accessibility: color-contrast

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "color-contrast" (Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds) affecting 12 element(s), e.g. selector: a[role="button"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 4: [critical] Accessibility: image-alt

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "image-alt" (Ensure <img> elements have alternative text or a role of none or presentation) affecting 1 element(s), e.g. selector: a[href$="www.iqpc.com"] > .d-block. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 5: [serious] Accessibility: link-name

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "link-name" (Ensure links have discernible text) affecting 1 element(s), e.g. selector: a[href$="www.iqpc.com"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 6: [serious] Accessibility: listitem

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "listitem" (Ensure <li> elements are used semantically) affecting 3 element(s), e.g. selector: .px-2.nav-link:nth-child(1). Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 7: [major] Design QA — Layout & grid · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
In the hero section, wrap all three CTA buttons ('View Event Guide', 'Sponsorship Opportunities', 'Book Online Now') in a single flex-row container with gap: 16px and align them to the same baseline. Remove any margin-top override on the 'Book Online Now' button so all three share one horizontal row.
```

## Fix 8: [major] Design QA — Layout & grid · Statistics bar between hero and 'No Budget, No Excuses' section, desktop

Paste into Claude Code (or Lovable chat):

```
Set the statistics strip element to min-height: 80px; display: flex; align-items: center; justify-content: center; and ensure its max-width matches the site-wide content container (e.g. max-width: 1200px; margin: 0 auto).
```

## Fix 9: [major] Design QA — Typography · Throughout page, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
In the site's CSS, add: h1, h2, h3, h4, h5, h6 { font-family: 'Archivo', sans-serif !important; } and p, li, td, label, input, button { font-family: 'Inter', sans-serif !important; } then verify the Google Fonts import includes only Archivo and Inter.
```

## Fix 10: [major] Design QA — Typography · Body copy, 'No Budget No Excuses' section and 'What You'll Explore' cards, desktop

Paste into Claude Code (or Lovable chat):

```
Add to global styles: p { font-size: 16px; line-height: 1.6; } and verify no section-level overrides reduce paragraph size below 16px.
```

## Fix 11: [major] Design QA — Spacing & rhythm · Speakers section, desktop

Paste into Claude Code (or Lovable chat):

```
In the speakers grid, set .speaker-card .speaker-info { padding-top: 12px; } uniformly so all four visible featured speakers have identical spacing between photo and name.
```

## Fix 12: [major] Design QA — Spacing & rhythm · Cookie consent banner, desktop and mobile — visible on first load

Paste into Claude Code (or Lovable chat):

```
Set .cookie-consent { position: fixed; bottom: 0; left: 0; width: 100%; padding: 16px 24px; z-index: 9999; display: flex; align-items: center; justify-content: center; gap: 16px; } to ensure it doesn't overlap non-footer content and remains properly anchored.
```

## Fix 13: [major] Design QA — Visual hierarchy · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
Style the 'Book Online Now' button as: background: #FF5A36; color: #fff; padding: 14px 32px; font-weight: 700; border: none; and the secondary CTA buttons as: background: transparent; border: 2px solid #0A2540; color: #0A2540; padding: 12px 24px; so primary action is visually dominant.
```

## Fix 14: [major] Design QA — Consistency · CTA buttons — hero vs. mid-page ('View Event Guide', 'View New Rates', 'View All Speakers', 'Book Online Now')

Paste into Claude Code (or Lovable chat):

```
Add global button classes: .btn-primary-cta { background: #FF5A36; color: #fff; border: none; border-radius: 4px; padding: 12px 28px; font-family: 'Archivo', sans-serif; font-weight: 700; } .btn-secondary-cta { background: transparent; border: 2px solid #0A2540; color: #0A2540; border-radius: 4px; padding: 10px 24px; font-family: 'Archivo', sans-serif; } Then replace all existing button classes with these two variants.
```

## Fix 15: [major] Design QA — Consistency · Speaker cards (featured 4) vs. What You'll Explore image cards

Paste into Claude Code (or Lovable chat):

```
Set .explore-card img { border-radius: 8px; object-fit: cover; aspect-ratio: 16/9; } and .speaker-card img { border-radius: 8px; object-fit: cover; aspect-ratio: 1/1; } to unify image treatment across sections.
```

## Fix 16: [major] Design QA — Responsive integrity · Speaker section, mobile

Paste into Claude Code (or Lovable chat):

```
In your responsive CSS, add: @media (max-width: 767px) { .speakers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; } } to show two speaker cards per row on mobile.
```

## Fix 17: [major] Design QA — Responsive integrity · Registration/pricing widget, mobile

Paste into Claude Code (or Lovable chat):

```
Add: @media (max-width: 767px) { .iqpc-srs-nav-pills { flex-direction: column; } .iqpc-srs-nav-pills .nav-item button { width: 100%; border-radius: 8px !important; margin-right: 0; margin-bottom: 8px; } } to the responsive CSS.
```

## Fix 18: [critical] Design QA — Visual accessibility · Hero section — text over imagery, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
On the hero image container, add a pseudo-element overlay: .hero-image-container { position: relative; } .hero-image-container::before { content: ''; position: absolute; inset: 0; background: rgba(10,37,64,0.55); z-index: 1; } and ensure all hero text elements have position: relative; z-index: 2; so text sits above the scrim.
```

## Fix 19: [major] Design QA — Visual accessibility · Secondary CTAs and nav links, desktop

Paste into Claude Code (or Lovable chat):

```
Audit all .btn and anchor elements with computed color values. For any button with light text on a medium-saturation background, set color: #0A2540 and background: transparent, or color: #fff and background: #0A2540, and verify contrast ratio exceeds 4.5:1 using a contrast checker before publishing.
```

## Fix 20: [major] Design QA — Visual accessibility · IQPC logo in footer, desktop

Paste into Claude Code (or Lovable chat):

```
Find the IQPC footer logo element and update it to: <a href='https://www.iqpc.com' aria-label='IQPC — event organizer website'><img src='[existing-src]' alt='IQPC logo' class='d-block'></a>
```

## Fix 21: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 22: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #590167 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 23: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack "Roboto, sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 24: [critical] Brand Compliance — Footer (both desktop and mobile)

Paste into Claude Code (or Lovable chat):

```
In the site footer template, add an anchor tag: <a href='/privacy-policy'>Privacy Policy</a> styled with the existing footer link styles. Ensure it persists after the cookie banner is dismissed.
```

## Fix 25: [major] Brand Compliance — Section dividers and labels throughout the page (e.g., 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?', 'NEW PRICING AVAILABLE', 'INSIGHTS FROM YOUR PEERS', 'PARTNERING FOR TOMORROW')

Paste into Claude Code (or Lovable chat):

```
Search the stylesheet and inline styles for `color: #FF5A36` and `background-color: #FF5A36` applied to `<hr>`, pseudo-elements (::before / ::after), and section-label decorative lines. Change those instances to `#0A2540` or `#CCCCCC`. Leave only CTA buttons and their hover states using the accent color.
```

## Fix 26: [major] Brand Compliance — Hero section — 'Book Online Now' CTA button (desktop nav bar)

Paste into Claude Code (or Lovable chat):

```
In the hero CTA button CSS, set `.btn-register-primary { background-color: #FF5A36; color: #FFFFFF; border: none; }` and `.btn-secondary-cta { background-color: transparent; border: 2px solid #0A2540; color: #0A2540; }`. Apply the primary class exclusively to the registration/book-now button.
```

## Fix 27: [major] Brand Compliance — Testimonial / social proof section — TDECU logo treatment

Paste into Claude Code (or Lovable chat):

```
In the testimonial card component, constrain the attributing company logo: `.testimonial-company-logo { max-height: 32px; filter: grayscale(100%); opacity: 0.75; }` to reduce visual competition with the SSON/WorkX brand.
```

## Fix 28: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 29: [critical] SEO Audit — <meta name='description'>

Paste into Claude Code (or Lovable chat):

```
Rewrite the meta description for the WorkX 2026 event page to exactly 150–160 characters. Lead with the audience benefit. Include the keywords: workplace strategy, facilities management, corporate real estate, San Francisco, 2026. Tone: professional, benefit-led, no superlatives.
```

## Fix 30: [critical] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Rewrite the page title for WorkX 2026 to ≤60 characters. It must include at least one of: 'Workplace Strategy', 'Facilities Management', or 'Corporate Real Estate', plus 'Conference 2026' and 'San Francisco'. Keep 'WorkX' as the brand anchor. Prioritise search-intent alignment over brand prominence.
```

## Fix 31: [major] SEO Audit — <h1>

Paste into Claude Code (or Lovable chat):

```
Rewrite the H1 for the WorkX 2026 event microsite. It must communicate the event topic (workplace strategy, facilities, or corporate real estate) and imply the target audience (CRE/Facilities/Workplace leaders). Keep it under 70 characters. Do not use exclamation marks or unverifiable superlatives.
```

## Fix 32: [major] SEO Audit — OG / Twitter metadata

Paste into Claude Code (or Lovable chat):

```
Write an og:description for WorkX 2026 that is ≤200 characters, benefit-led, and includes the keywords workplace strategy, San Francisco, and August 2026. Separately, flag that og:image should be updated to a 1200×630 px event hero image rather than a logo.
```

## Fix 33: [major] SEO Audit — Page keyword coherence (title → H1 → body copy → metadata)

Paste into Claude Code (or Lovable chat):

```
Audit the WorkX 2026 page copy and ensure the phrase 'workplace strategy conference' (or an agreed primary keyphrase) appears in the <title>, <h1>, <meta description>, and within the first 100 words of the hero/intro body copy. Adjust surrounding copy to read naturally.
```
