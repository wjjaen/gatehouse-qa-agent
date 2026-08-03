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

## Fix 4: [major] Design QA — Layout & grid · Key Themes section, desktop

Paste into Claude Code (or Lovable chat):

```
In the Key Themes section, set the card container to `display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;` and remove any inline width overrides on individual cards so all four columns are equal.
```

## Fix 5: [major] Design QA — Layout & grid · Benefits of Attending / Benefits of Sponsoring section, desktop

Paste into Claude Code (or Lovable chat):

```
Check the Benefits of Attending and Benefits of Sponsoring sections for missing or hidden content. If content is present but not rendering, remove `display: none` or `visibility: hidden` from child elements. If content is missing, add at least 3–5 benefit bullet points to each section before publishing.
```

## Fix 6: [major] Design QA — Typography · Global — all headings and body text

Paste into Claude Code (or Lovable chat):

```
In the dynamic styles block, replace the Raleway Google Fonts import with `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');` and update the CSS variables to `--primary-font: 'Archivo', sans-serif;` and `--secondary-font: 'Inter', sans-serif;`.
```

## Fix 7: [major] Design QA — Typography · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
In the hero section CSS, set the event name heading to `font-size: 64px; font-weight: 800; line-height: 1.1;` and change the tagline element from an h2 to a `<p class='hero-tagline'>` with `font-size: 20px; font-weight: 600;` so the hierarchy is visually distinct.
```

## Fix 8: [major] Design QA — Spacing & rhythm · CLE Credit badge / approval bar, desktop

Paste into Claude Code (or Lovable chat):

```
Add `padding-top: 32px; padding-bottom: 32px;` to the CLE credit approval bar container so it has adequate breathing room from the stats section above and the speakers section below.
```

## Fix 9: [major] Design QA — Spacing & rhythm · Photo Gallery section, desktop

Paste into Claude Code (or Lovable chat):

```
Set the photo gallery grid container to `display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;` so images have consistent gutters.
```

## Fix 10: [major] Design QA — Visual hierarchy · Hero section, desktop — CTA row

Paste into Claude Code (or Lovable chat):

```
In the hero CTA row, apply `background-color: #FF5A36; color: #FFFFFF; border: none;` to the 'REQUEST YOUR INVITE' button only. Change the other two buttons to `background-color: transparent; border: 2px solid #FFFFFF; color: #FFFFFF;` so the primary action is visually dominant.
```

## Fix 11: [major] Design QA — Visual hierarchy · Navigation bar, desktop

Paste into Claude Code (or Lovable chat):

```
Find the nav bar 'Register Now' or 'Request to Enlist' button and set its style to `background-color: #FF5A36; color: #FFFFFF; border-radius: 4px; padding: 10px 20px; font-weight: 700;` to match the primary CTA colour from the brand config.
```

## Fix 12: [major] Design QA — Consistency · Buttons — global

Paste into Claude Code (or Lovable chat):

```
Search for all `.btn-primary`, `.btn-secondary`, and `.btn-terciary` instances on the page. Set `.btn-primary` background to `#FF5A36` and text to `#FFFFFF`. Set `.btn-secondary` to `background: transparent; border: 2px solid #0A2540; color: #0A2540;`. Remove all yellow and teal button overrides not specified in the brand config.
```

## Fix 13: [major] Design QA — Consistency · Theme cards vs. speaker cards — corner radius

Paste into Claude Code (or Lovable chat):

```
Apply `border-radius: 8px; overflow: hidden;` to all rectangular card components (theme cards, resource cards, sponsor cards). Keep `border-radius: 50%` only for speaker headshot images. Remove any other border-radius values that deviate from these two.
```

## Fix 14: [major] Design QA — Responsive integrity · Hero section, mobile (390px)

Paste into Claude Code (or Lovable chat):

```
In the mobile CSS (max-width: 600px), add: `.hero-cta-row { flex-direction: column; align-items: stretch; gap: 12px; } .hero-cta-row .btn { width: 100%; min-width: unset; }` so all hero buttons stack vertically and are full-width on small screens.
```

## Fix 15: [major] Design QA — Responsive integrity · Key Themes cards, mobile

Paste into Claude Code (or Lovable chat):

```
In the mobile stylesheet, find any `max-height`, `overflow: hidden`, or `-webkit-line-clamp` on theme card body text and either remove it or add a `<button class='read-more'>Read more</button>` toggle beneath each card.
```

## Fix 16: [major] Design QA — Responsive integrity · Past Leaders sponsor logo grid, mobile

Paste into Claude Code (or Lovable chat):

```
In the mobile CSS, add: `.past-leaders-logos { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; } .past-leaders-logos img { max-width: 100px; height: auto; }` to prevent horizontal overflow and ensure logos wrap cleanly.
```

## Fix 17: [critical] Design QA — Visual accessibility · Hero section — text over background image

Paste into Claude Code (or Lovable chat):

```
Add a pseudo-element overlay to the hero section: `.hero-section::after { content: ''; position: absolute; inset: 0; background: rgba(10, 37, 64, 0.6); z-index: 0; }` and ensure all hero text children have `position: relative; z-index: 1;` so they render above the scrim.
```

## Fix 18: [major] Design QA — Visual accessibility · Primary CTA buttons — global

Paste into Claude Code (or Lovable chat):

```
For CTA buttons appearing on white or light backgrounds, set `background-color: #0A2540; color: #FFFFFF;`. For CTA buttons on dark backgrounds (hero, dark section bands), set `background-color: #FF5A36; color: #FFFFFF;`. This ensures contrast compliance in both contexts.
```

## Fix 19: [major] Design QA — Visual accessibility · Secure Your Place / dark CTA band, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
In the dark CTA band section, add `.cta-band, .cta-band p, .cta-band h2, .cta-band h3 { color: #FFFFFF !important; }` to ensure all text meets contrast requirements against the dark background.
```

## Fix 20: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212121 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 21: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 22: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack "Raleway, sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 23: [critical] Brand Compliance — Global CSS — :root variables, entire page

Paste into Claude Code (or Lovable chat):

```
In the dynamic <style> block, replace: --primary-font: 'Raleway', sans-serif; with --primary-font: 'Archivo', sans-serif; replace --secondary-font: 'Raleway', sans-serif; with --secondary-font: 'Inter', sans-serif; replace --primary-color: #0081ff; with --primary-color: #0A2540; replace --primary-color-hover: #0053c2; with --primary-color-hover: #081d30; replace --secondary-color: #ffd230; with --secondary-color: #FF5A36; replace --secondary-color-hover: #0053c2; with --secondary-color-hover: #cc3a1f; Then update the @import to fetch Archivo (weights 400,700,800) and Inter (weights 400,600) from Google Fonts and remove the Raleway imports.
```

## Fix 24: [critical] Brand Compliance — Hero section — event name / portal alignment

Paste into Claude Code (or Lovable chat):

```
Add a co-branding element to the navbar: insert an <img> tag referencing the WorkX 2026 portal logo (SVG preferred) immediately to the right of the IQPC logo, separated by a 1px vertical rule, with a minimum clear-space wrapper of padding equal to the logomark height. Ensure the logo is the reversed (white) variant since the nav background is dark (#0A2540).
```

## Fix 25: [major] Brand Compliance — Section headings throughout the page (e.g., '2026 Expert Speakers', 'Key Themes for 2026', sponsors section)

Paste into Claude Code (or Lovable chat):

```
Search the CSS and inline styles for color: #ffd230 and border-color: #ffd230 applied to h2, h3, .dashed-subtitle, section title elements, and horizontal rules. Replace those values with color: #0A2540 for headings and remove the colored underline rules entirely, or replace with a 2px solid #FF5A36 rule used only under a single primary CTA heading if a highlight is needed.
```

## Fix 26: [major] Brand Compliance — Hero — logo placement over imagery

Paste into Claude Code (or Lovable chat):

```
Wrap the hero logomark <img> in a container with padding: [logo-height]px on all sides. On mobile (max-width: 390px), reduce the logo size to 80px and set padding: 80px around it before adjacent text nodes begin, ensuring the headline 'Corporate Counsel and Compliance Exchange USA' starts below the logo's clear-space boundary.
```

## Fix 27: [major] Brand Compliance — Meta description and OG description — 'The Premier Exchange for Legal Leaders'

Paste into Claude Code (or Lovable chat):

```
In the <meta name='description'> and <meta property='og:description'> and <meta name='twitter:description'> tags, replace the string 'The Premier Exchange for Legal Leaders' with 'An Invitation-Only Exchange for Senior Legal and Compliance Leaders'. Apply the same change to any on-page copy that uses this phrase.
```

## Fix 28: [major] Brand Compliance — Sponsorship section — 'SPONSORSHIP OPPORTUNITIES SOLD OUT'

Paste into Claude Code (or Lovable chat):

```
Locate the section with id or class containing 'sponsorship-opportunities'. Add a conditional check: if the sold-out flag is active, hide the benefits description paragraphs and replace the 'FIND OUT MORE' CTA with a single line reading 'Join our sponsorship waitlist for 2027' linking to a waitlist form. Alternatively, wrap the entire sponsorship block in a display:none when sold_out === true.
```

## Fix 29: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 30: [critical] SEO Audit — H1 tag

Paste into Claude Code (or Lovable chat):

```
Replace the existing H1 element with: <h1>Corporate Counsel &amp; Compliance Exchange USA 2026</h1> and demote 'Checkmate, Chaos – Turning Volatility Into Your Next Strategic Advantage' to an <h2> or styled <p> immediately below it.
```

## Fix 31: [critical] SEO Audit — meta description

Paste into Claude Code (or Lovable chat):

```
Set the meta description to: 'Join senior corporate counsel and compliance leaders in Jersey City, July 21–22 2026, for case studies, expert panels, and legal tech sessions at this practitioner-led exchange.' (156 chars)
```

## Fix 32: [major] SEO Audit — og:description and twitter:description

Paste into Claude Code (or Lovable chat):

```
Set og:description and twitter:description to: 'Corporate Counsel & Compliance Exchange USA | July 21–22 2026, Jersey City NJ. Expert panels, case studies, and legal tech sessions for in-house legal and compliance leaders.'
```

## Fix 33: [major] SEO Audit — Page <title>

Paste into Claude Code (or Lovable chat):

```
Change the <title> to: Corporate Counsel & Compliance Exchange USA 2026 — this is 50 characters and stays within the limit while adding the year signal. If space allows, append '| NJ' (53 chars total).
```

## Fix 34: [major] SEO Audit — schema.org Event JSON-LD — location.address

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD location object, set: "streetAddress": "2 Exchange Place", "postalCode": "07302", and "url": "https://www.hyatt.com/hyatt-regency/en-US/ewrjc-hyatt-regency-jersey-city"
```

## Fix 35: [major] SEO Audit — schema.org Event JSON-LD — duplicate sponsor/performer entries

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD generation logic, apply array deduplication (by 'name' key) before serialising the sponsor and performer arrays. Delete the {"@type":"Person","name":"test test","url":""} object entirely.
```
