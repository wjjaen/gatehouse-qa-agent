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
Fix the axe-core accessibility violation "color-contrast" (Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds) affecting 11 element(s), e.g. selector: .aos-animate.btn-primary[role="button"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 3: [critical] Accessibility: image-alt

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "image-alt" (Ensure <img> elements have alternative text or a role of none or presentation) affecting 1 element(s), e.g. selector: .d-md-block. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 4: [major] Design QA — Layout & grid · Key Themes section, desktop

Paste into Claude Code (or Lovable chat):

```
In the Key Themes section, wrap all four theme cards in a container with max-width: 1200px; margin: 0 auto; and set each card to the same min-height so their bottom edges align. Remove any negative margin or full-bleed class applied only to this section.
```

## Fix 5: [major] Design QA — Layout & grid · Speakers section, desktop

Paste into Claude Code (or Lovable chat):

```
In the speakers section, change the speaker grid to display a minimum of 4 placeholder/confirmed speaker cards in a 4-column CSS grid (grid-template-columns: repeat(4, 1fr)) before showing the 'View all speakers' CTA button.
```

## Fix 6: [critical] Design QA — Typography · Global / all sections

Paste into Claude Code (or Lovable chat):

```
In the <style data-dynamic> block, replace the @import with @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap'); then update --primary-font to 'Archivo', sans-serif and --secondary-font to 'Inter', sans-serif.
```

## Fix 7: [major] Design QA — Typography · Statistics row (75 / 22 / 194 / 27 numbers), desktop

Paste into Claude Code (or Lovable chat):

```
Find the statistics counter elements and set the numeral font-size to 48px and font-weight to 800 (Archivo), and the descriptor label below to font-size: 14px; font-weight: 400 (Inter).
```

## Fix 8: [major] Design QA — Typography · Hero subheadline, desktop

Paste into Claude Code (or Lovable chat):

```
Set the hero tagline element's CSS to font-size: 32px; line-height: 1.25; font-family: 'Archivo', sans-serif; font-weight: 700; to align with the brand type scale.
```

## Fix 9: [major] Design QA — Spacing & rhythm · Between 'Key Themes' and 'Secure Your Place' CTA strip, desktop

Paste into Claude Code (or Lovable chat):

```
Add padding-top: 48px; padding-bottom: 48px; to the .secure-your-place or equivalent CTA strip section class to create separation from the Key Themes cards above.
```

## Fix 10: [major] Design QA — Spacing & rhythm · Benefits of Attending / Benefits of Sponsoring tabs, desktop

Paste into Claude Code (or Lovable chat):

```
Inspect the Benefits tabs section; ensure the active tab panel has padding: 32px 0; and that its child content elements are not hidden by a CSS display:none or zero-height collapse. Add min-height: 200px to the tab panel container as a safeguard.
```

## Fix 11: [major] Design QA — Visual hierarchy · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
In the hero CTA row, apply background-color: #FF5A36; color: #ffffff; border: none; to the primary 'Request Your Invite' button, and change the secondary button to background-color: transparent; border: 2px solid #ffffff; color: #ffffff; to visually subordinate it.
```

## Fix 12: [major] Design QA — Visual hierarchy · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
In the hero section, add an explicit h1 element with text 'Corporate Counsel & Compliance Exchange USA' styled at font-size: 48px; font-weight: 800; color: #ffffff; placed visually above the tagline and dates, separate from the circular logo badge.
```

## Fix 13: [major] Design QA — Consistency · CTA buttons, site-wide

Paste into Claude Code (or Lovable chat):

```
In the CSS, change --primary-color to #FF5A36 and --primary-color-hover to #e04020, then change --secondary-color to #0A2540 and update .btn-primary background-color accordingly. This will propagate the brand accent color to all buttons using those variables.
```

## Fix 14: [major] Design QA — Consistency · Card components — Key Themes cards vs. resource/report cards at bottom of page

Paste into Claude Code (or Lovable chat):

```
Set border-radius: 8px on all .card, .theme-card, and .resource-card elements site-wide. For cards with image backgrounds, add a consistent linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)) overlay using a ::after pseudo-element.
```

## Fix 15: [critical] Design QA — Responsive integrity · Key Themes cards, mobile (390px)

Paste into Claude Code (or Lovable chat):

```
Add a media query: @media (max-width: 768px) { .key-themes-section .card { background-color: #0A2540; background-image: none; color: #ffffff; padding: 24px; margin-bottom: 16px; } } to override the image background on mobile.
```

## Fix 16: [major] Design QA — Responsive integrity · Sponsor logos grid, mobile

Paste into Claude Code (or Lovable chat):

```
Add @media (max-width: 768px) { .sponsors-grid img { height: 36px; width: auto; max-width: 120px; object-fit: contain; } .sponsors-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; } } to normalize sponsor logo sizes on mobile.
```

## Fix 17: [major] Design QA — Responsive integrity · Statistics row, mobile

Paste into Claude Code (or Lovable chat):

```
Add @media (max-width: 768px) { .stats-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; text-align: center; } .stats-row .stat-item { display: flex; flex-direction: column; align-items: center; } } to the stylesheet.
```

## Fix 18: [critical] Design QA — Visual accessibility · Hero section — text over background image, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
In the hero section CSS, change the background to: background-image: linear-gradient(rgba(10,37,64,0.75), rgba(10,37,64,0.65)), url('YOUR_HERO_IMAGE_URL'); background-size: cover; background-position: center; to add a consistent dark scrim over the entire hero.
```

## Fix 19: [major] Design QA — Visual accessibility · Yellow/gold secondary CTA buttons, desktop (hero and elsewhere)

Paste into Claude Code (or Lovable chat):

```
In the CSS, change .btn-secondary { color: #0A2540 !important; } to replace the white text on yellow buttons with dark text that meets WCAG AA contrast requirements.
```

## Fix 20: [major] Design QA — Visual accessibility · Key Themes cards, desktop — text over image overlays

Paste into Claude Code (or Lovable chat):

```
Add to each theme card's text container: background: rgba(10, 37, 64, 0.85); padding: 16px; border-radius: 0 0 8px 8px; color: #ffffff; to create a legible text band at the bottom of each image card.
```

## Fix 21: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212121 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 22: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Find every use of the color #212529 in this site's styles and replace it with the closest approved brand color from this palette: #0A2540, #FF5A36, #FFFFFF, #1A1A1A, #000000. Keep contrast WCAG AA compliant.
```

## Fix 23: [major] Brand Compliance — Rendered CSS (computed styles)

Paste into Claude Code (or Lovable chat):

```
Replace the font stack "Raleway, sans-serif" across this site with the brand fonts: "Archivo, sans-serif" for headings and "Inter, sans-serif" for body text. Add the necessary font imports.
```

## Fix 24: [critical] Brand Compliance — Entire page

Paste into Claude Code (or Lovable chat):

```
Replace all instances of 'Corporate Counsel and Compliance Exchange USA' in hero, metadata, page title, structured data, and section headings with 'WorkX 2026'. Update event dates, location, and all event-specific copy to match WorkX 2026 brand configuration.
```

## Fix 25: [critical] Brand Compliance — Structured data / schema markup in <head>

Paste into Claude Code (or Lovable chat):

```
In the application/ld+json Event schema block, update 'startDate' and 'endDate' to match the hero-displayed dates exactly (e.g., '2025-07-20' and '2025-07-21'). Also verify the offers.validFrom date matches.
```

## Fix 26: [critical] Brand Compliance — Global CSS / :root variables

Paste into Claude Code (or Lovable chat):

```
In the :root CSS block, set --primary-color to #0A2540 and --primary-color-hover to a darkened variant such as #061828. Replace all uses of #ffd230 and --secondary-color with #FF5A36 for CTA buttons and key highlight elements only. Remove or remap the gold/yellow color from all non-CTA elements.
```

## Fix 27: [critical] Brand Compliance — Global CSS / font stack

Paste into Claude Code (or Lovable chat):

```
Replace the @import url for Raleway in the dynamic styles block with: @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=Inter:wght@400;600;700&display=swap'); Then set --primary-font: 'Archivo', sans-serif; and --secondary-font: 'Inter', sans-serif; in the :root block.
```

## Fix 28: [major] Brand Compliance — Hero section — CTA buttons

Paste into Claude Code (or Lovable chat):

```
Set .btn-primary { background-color: #FF5A36; border-color: #FF5A36; } and .btn-primary:hover { background-color: #cc3d22; } across all CTA button instances. Remove background-color: #ffd230 from all button elements.
```

## Fix 29: [major] Brand Compliance — Hero section — logo placement over busy imagery

Paste into Claude Code (or Lovable chat):

```
Add a CSS rule targeting the logo container in the hero: .hero-logo-wrapper { background: rgba(10, 37, 64, 0.7); border-radius: 4px; padding: 12px; } to ensure the logo is never rendered directly against busy photographic content.
```

## Fix 30: [major] Brand Compliance — Hero section — clear space around logo

Paste into Claude Code (or Lovable chat):

```
Add to the mobile CSS breakpoint (max-width: 768px): .hero-logo { margin: 24px auto; display: block; } and ensure no adjacent text or UI elements intrude within the logomark's height distance from the logo boundary.
```

## Fix 31: [major] Brand Compliance — Key Themes section — card accent colors

Paste into Claude Code (or Lovable chat):

```
Find all .theme-card-header or equivalent selectors using background-color: #ffd230 and replace with background-color: #0A2540. If accent highlight treatment is desired for active/featured cards only, apply #FF5A36 to a maximum of one card to maintain accent discipline.
```

## Fix 32: [major] Brand Compliance — Venue — hero and throughout page

Paste into Claude Code (or Lovable chat):

```
Update the hero date/location string from 'July 20–21, 2025 | New York, USA' to include the venue name, e.g., 'July 20–21, 2025 | [Venue Name], New York, USA'. Add a dedicated venue block in the logistics section with the full address.
```

## Fix 33: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 34: [critical] SEO Audit — <meta name='description'>

Paste into Claude Code (or Lovable chat):

```
Rewrite the meta description for the Corporate Counsel & Compliance Exchange USA event page. Requirements: 150–160 characters, include 'corporate counsel,' 'compliance,' 'USA,' a year or date signal, and one concrete attendee benefit (e.g., case studies, peer exchange). No exclamation marks, no unverifiable superlatives like 'premier' or 'exclusive.' Benefit-led, professional tone.
```

## Fix 35: [critical] SEO Audit — <h1>

Paste into Claude Code (or Lovable chat):

```
Revise the H1 of the Corporate Counsel & Compliance Exchange USA event page so it contains the event name and at minimum one location or date signal. The current tagline 'Checkmate, Chaos - Turning Volatility Into Your Next Strategic Advantage' should be repurposed as an H2 or hero subheading immediately beneath the H1. The H1 must include the keywords 'corporate counsel,' 'compliance,' and 'USA' and should be under 70 characters where possible.
```

## Fix 36: [major] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Update the HTML <title> tag for the Corporate Counsel & Compliance Exchange USA event page to: 'Corporate Counsel & Compliance Exchange USA 2027 | New York' — 58 characters, within the 60-character SEO limit. Do not change the canonical URL.
```

## Fix 37: [major] SEO Audit — Event JSON-LD (existing schema)

Paste into Claude Code (or Lovable chat):

```
Audit and fix the existing Event JSON-LD on the Corporate Counsel & Compliance Exchange USA page: (1) Change '@id' from 'https://www.iqpc.com#event' to 'https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa'; (2) Set 'eventAttendanceMode' to 'https://schema.org/OfflineEventAttendanceMode'; (3) Set 'offers.availability' to 'https://schema.org/InStock'; (4) Set 'offers.validFrom' to the current date or page publication date, not the event start date; (5) Remove all duplicate entries from the 'sponsor' and 'performer' arrays, keeping only unique organizations and persons.
```

## Fix 38: [major] SEO Audit — meta keywords tag

Paste into Claude Code (or Lovable chat):

```
Update the <meta name='keywords'> tag on the Corporate Counsel & Compliance Exchange USA event page. Replace the placeholder value 'Submission Form' with: 'corporate counsel conference, compliance exchange USA, general counsel, legal tech, corporate governance, legal operations, New York 2027'. Ensure the property='schema:keywords' attribute is also updated to match.
```

## Fix 39: [major] SEO Audit — OG / Twitter meta description

Paste into Claude Code (or Lovable chat):

```
Write a new og:description and twitter:description for the Corporate Counsel & Compliance Exchange USA event page. Target 150–200 characters. Must include: event name, 'New York,' '2027,' and one action-oriented benefit. No superlatives. Example structure: '[Event Name] | New York, 2027 — [benefit statement for GCs and compliance leaders].'
```
