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
In the hero section CSS, find the flex or grid container that holds the headline text column and the event photo. Set `align-items: flex-start` on that container and add `margin-top: 0` to the image wrapper so both columns start at the same vertical position.
```

## Fix 8: [major] Design QA — Layout & grid · 'What You'll Explore at WorkX' section, desktop

Paste into Claude Code (or Lovable chat):

```
In the 'What You'll Explore' card grid, set each card image to `height: 200px; width: 100%; object-fit: cover;` and wrap the cards in a CSS grid with `grid-template-columns: repeat(4, 1fr); gap: 24px;` so all cards are equal width and their text starts at the same vertical position.
```

## Fix 9: [major] Design QA — Typography · Entire page

Paste into Claude Code (or Lovable chat):

```
Add the following to your global CSS, after all existing rules, to enforce brand fonts: `h1, h2, h3, h4, h5, h6 { font-family: 'Archivo', sans-serif !important; } body, p, li, td, span { font-family: 'Inter', sans-serif !important; }` and remove the unused Google Fonts families from the @import list.
```

## Fix 10: [major] Design QA — Typography · Section label overlines (e.g. 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?'), desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Create a CSS class `.section-overline { font-family: 'Archivo', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #0A2540; }` and apply it to every section label element, replacing any inline font-size or text-transform styles already on those elements.
```

## Fix 11: [major] Design QA — Spacing & rhythm · Cookie consent banner, desktop and mobile on load

Paste into Claude Code (or Lovable chat):

```
In the cookie consent JavaScript, after the banner is injected, add `document.querySelector('.hero-section').style.paddingBottom = document.querySelector('.cookie-consent').offsetHeight + 'px';` and remove that padding when the user clicks OK.
```

## Fix 12: [major] Design QA — Spacing & rhythm · 'Hear from Past Attendees' section, desktop

Paste into Claude Code (or Lovable chat):

```
Find the testimonial card container and set `padding: 32px;` on it. For the logo column, add `display: flex; align-items: center; justify-content: center;` so the TDECU logo is vertically centred alongside the quote text.
```

## Fix 13: [major] Design QA — Visual hierarchy · Hero section, desktop

Paste into Claude Code (or Lovable chat):

```
Find the 'Book Online Now' button element in the hero and apply: `background-color: #FF5A36; color: #ffffff; border: none; font-weight: 700; padding: 14px 28px; border-radius: 4px;`. Find the 'View Event Guide' and 'Sponsorship Opportunities' buttons and apply: `background-color: transparent; border: 2px solid #0A2540; color: #0A2540;` to visually subordinate them.
```

## Fix 14: [major] Design QA — Consistency · Buttons across entire page

Paste into Claude Code (or Lovable chat):

```
Add to your global CSS: `.btn-primary-brand { background-color: #FF5A36; color: #ffffff; border: none; border-radius: 4px; padding: 12px 24px; font-family: 'Archivo', sans-serif; font-weight: 700; } .btn-secondary-brand { background-color: transparent; color: #0A2540; border: 2px solid #0A2540; border-radius: 4px; padding: 12px 24px; font-family: 'Archivo', sans-serif; font-weight: 600; }` then replace the class on every button element on the page with either `btn-primary-brand` or `btn-secondary-brand`.
```

## Fix 15: [major] Design QA — Consistency · Speaker cards vs. 'What You'll Explore' cards, desktop

Paste into Claude Code (or Lovable chat):

```
For speaker portrait images, add CSS: `.speaker-card img { border-radius: 50%; width: 120px; height: 120px; object-fit: cover; }`. For topic/explore card images, add: `.explore-card img { border-radius: 8px; width: 100%; aspect-ratio: 16/9; object-fit: cover; }`. Ensure all card containers use `border-radius: 8px;`.
```

## Fix 16: [major] Design QA — Responsive integrity · 'What You'll Explore at WorkX' section, mobile

Paste into Claude Code (or Lovable chat):

```
Add the following CSS to your mobile breakpoint (max-width: 768px): `.explore-card .card-body p { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }` to limit body text to 3 lines on mobile, and add a 'Show more' button using JavaScript to toggle the `overflow: hidden` off when tapped.
```

## Fix 17: [major] Design QA — Responsive integrity · Registration / pricing widget, mobile

Paste into Claude Code (or Lovable chat):

```
In your mobile CSS (max-width: 768px), add: `.iqpc-srs-nav-pills { flex-direction: column; width: 100%; } .iqpc-srs-nav-pills .nav-item { width: 100%; } .iqpc-srs-nav-pills .nav-item button { width: 100%; border-radius: 8px !important; margin: 4px 0; height: auto; min-height: 44px; white-space: normal; text-align: center; }` to make tabs stack vertically and wrap text on narrow screens.
```

## Fix 18: [critical] Design QA — Visual accessibility · Multiple buttons and interactive elements, entire page

Paste into Claude Code (or Lovable chat):

```
Find every button or link styled with a light purple or lavender background and apply: `background-color: #0A2540; color: #ffffff;` to ensure sufficient contrast. For grey overline label text, set `color: #0A2540;` or `color: #555555;` to meet WCAG AA contrast requirements at small type sizes.
```

## Fix 19: [critical] Design QA — Visual accessibility · Hero section, desktop — text over event photo

Paste into Claude Code (or Lovable chat):

```
On the hero image container, add a pseudo-element overlay: `.hero-image-container { position: relative; } .hero-image-container::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 60%, rgba(10,37,64,0.55) 100%); pointer-events: none; }` to ensure any overlapping text has sufficient contrast.
```

## Fix 20: [major] Design QA — Visual accessibility · Section overline labels (e.g. 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?'), desktop

Paste into Claude Code (or Lovable chat):

```
Find all section overline/label elements (typically styled with text-transform: uppercase and a small font-size) and add or update their color to `color: #555555;` in your CSS, or use `color: #0A2540;` for stronger brand alignment.
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

## Fix 24: [critical] Brand Compliance — Footer

Paste into Claude Code (or Lovable chat):

```
In the footer HTML, add an anchor tag immediately after the copyright text: <a href='/privacy-policy' style='color:#FFFFFF; text-decoration:underline; font-size:12px;'>Privacy Policy</a>. Ensure the link is visible against the dark footer background.
```

## Fix 25: [critical] Brand Compliance — Mobile hero — above the fold

Paste into Claude Code (or Lovable chat):

```
In the hero section's responsive CSS/HTML, move the registration CTA button element before the 'View Event Guide' and 'Sponsorship Opportunities' buttons. Apply order:0 or restructure the flex/grid order for mobile breakpoints (max-width: 480px) so the registration button renders first.
```

## Fix 26: [major] Brand Compliance — Section divider labels and decorative rules throughout the page (e.g., 'WHO YOU'LL HEAR FROM', 'WHY ATTEND WORKX?', 'NEW PRICING AVAILABLE', 'INSIGHTS FROM YOUR PEERS', 'PARTNERING FOR TOMORROW')

Paste into Claude Code (or Lovable chat):

```
Search the CSS for any rule applying color #FF5A36 or border-color #FF5A36 to hr, ::before/::after pseudo-elements, or decorative divider components that are not CTA buttons or key highlight badges. Replace those color values with #0A2540 or #CCCCCC.
```

## Fix 27: [major] Brand Compliance — Testimonial / 'Hear from Past Attendees' section — TDECU logo

Paste into Claude Code (or Lovable chat):

```
In the testimonial card component, constrain the third-party logo image with: max-width: 100px; height: auto; ensuring it renders as a compact attribution mark rather than a feature graphic.
```

## Fix 28: [major] Brand Compliance — Stats bar / hero sub-banner copy: '100+ ATTENDEES, 40 SPEAKERS, 30+ SESSIONS, 1 UNIQUE NETWORKING EXPERIENCE'

Paste into Claude Code (or Lovable chat):

```
Edit the stats bar text node containing '1 UNIQUE NETWORKING EXPERIENCE' to replace it with a concrete, verifiable statistic (e.g., '5 Networking Formats' or '3 Dedicated Networking Sessions'). Update the attendee count to reflect actual or expected verified attendance.
```

## Fix 29: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 30: [critical] SEO Audit — meta description

Paste into Claude Code (or Lovable chat):

```
Rewrite the meta description tag to exactly 150–160 characters. Include 'WorkX 2026', 'San Francisco', 'August 2026', and one specific benefit such as 'real-world benchmarks and cost-justification playbooks'. Tone: professional, benefit-led, no exclamation marks.
```

## Fix 31: [critical] SEO Audit — <h1>

Paste into Claude Code (or Lovable chat):

```
Update the single H1 on the page to include the event year (2026), city (San Francisco), and a primary keyword phrase such as 'workplace strategy conference' or 'facilities and corporate real estate conference'. Keep it under 70 characters if possible, or use a subtitle element visually beneath it.
```

## Fix 32: [major] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Update the page <title> to 'WorkX 2026 | Workplace Conference, San Francisco' (49 characters). This adds the target keyword 'Workplace Conference' without exceeding 60 characters.
```

## Fix 33: [major] SEO Audit — robots meta

Paste into Claude Code (or Lovable chat):

```
Add the following tag inside <head>: <meta name="robots" content="index, follow">
```

## Fix 34: [major] SEO Audit — meta keywords tag

Paste into Claude Code (or Lovable chat):

```
Either delete the <meta name='keywords'> tag or populate it with: content='workplace conference, facilities management, corporate real estate, workplace strategy, San Francisco, August 2026, WorkX'
```

## Fix 35: [major] SEO Audit — OG / Twitter description

Paste into Claude Code (or Lovable chat):

```
Update og:description and twitter:description to a single 180–200 character string such as: 'WorkX 2026 brings CRE, Facilities & Workplace leaders together in San Francisco, Aug 10–12, for peer benchmarking, cost-justification playbooks, and actionable workplace strategy.'
```

## Fix 36: [major] SEO Audit — Existing Event JSON-LD (in-page)

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD block: (1) Remove all properties whose value is an empty string rather than passing ''. (2) If the specific venue street address is not yet confirmed, remove streetAddress and postalCode entirely. (3) Set offers.validFrom to the date the registration opened, not the event start date.
```
