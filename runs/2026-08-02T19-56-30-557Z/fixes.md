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
In the Key Themes section, change all theme card wrapper divs to use class 'col-12 col-md-6 col-lg-3' and add 'g-4' to their parent row so all four cards render at equal width with consistent gutters on desktop.
```

## Fix 5: [major] Design QA — Layout & grid · Sponsors logo grid, desktop

Paste into Claude Code (or Lovable chat):

```
For every <img> inside the 2026 Sponsors section, set style='height:40px; width:auto; object-fit:contain;' and wrap each in a flex container with align-items:center; justify-content:center so all logos appear at equal visual height.
```

## Fix 6: [critical] Design QA — Typography · Entire page

Paste into Claude Code (or Lovable chat):

```
In the <style data-dynamic> block, replace the Google Fonts import URL to include 'Archivo:wght@400;600;700;800' and 'Inter:wght@400;500;600', then update :root to set --primary-font: 'Archivo', sans-serif and --secondary-font: 'Inter', sans-serif.
```

## Fix 7: [major] Design QA — Typography · Hero section subheadline, desktop

Paste into Claude Code (or Lovable chat):

```
In the hero section, set the event name heading to font-size:64px; font-weight:800; and the tagline subtitle to font-size:32px; font-weight:400; so they occupy distinct levels of the type scale.
```

## Fix 8: [major] Design QA — Typography · Statistics row (75 / 22 / 194 / 27), desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Find the CSS class styling the stat description text beneath the large numerals in the statistics row and set font-size: 14px; line-height: 1.4; to bring it within the brand type scale.
```

## Fix 9: [major] Design QA — Spacing & rhythm · Hero section, desktop — between date/location line and CTA buttons

Paste into Claude Code (or Lovable chat):

```
Add margin-top: 24px to the div or flex container holding the hero CTA buttons so there is a clear breathing gap between the event date metadata line and the call-to-action group.
```

## Fix 10: [major] Design QA — Spacing & rhythm · Sponsorship Opportunities section, desktop

Paste into Claude Code (or Lovable chat):

```
In the Sponsorship Opportunities section, add padding: 0 32px to both the text column and image column children of the row so both sides have symmetric horizontal spacing.
```

## Fix 11: [major] Design QA — Visual hierarchy · Hero section, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
In the hero section, change the primary registration button to background-color:#FF5A36; color:#FFFFFF; font-weight:700; padding:14px 32px; and change the secondary sponsorship button to background:transparent; border:2px solid #FFFFFF; color:#FFFFFF; padding:12px 28px; so the primary action is visually dominant.
```

## Fix 12: [major] Design QA — Visual hierarchy · Primary color usage, entire page

Paste into Claude Code (or Lovable chat):

```
In the :root CSS block, change --primary-color to #FF5A36 and --primary-color-hover to #e04a28 so that all .btn-primary elements render in the brand-specified accent color for CTAs. Update --secondary-color to #0A2540 for background applications.
```

## Fix 13: [major] Design QA — Consistency · CTA buttons, multiple sections (hero vs. 'Secure Your Place' banner vs. Sponsors section)

Paste into Claude Code (or Lovable chat):

```
Create a single .btn-primary rule with border-radius:4px; padding:13px 24px; font-size:14px; font-weight:700; background-color:#FF5A36; color:#FFFFFF; and remove any conflicting button styles in section-specific CSS overrides so all primary CTAs look identical.
```

## Fix 14: [major] Design QA — Consistency · Theme cards vs. speaker cards, desktop

Paste into Claude Code (or Lovable chat):

```
Add a shared CSS class .content-card with border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08); and apply it to all non-speaker card components. Add a shared .person-card class with border-radius:8px; text-align:center; and apply to all speaker-type cards to unify the card system.
```

## Fix 15: [major] Design QA — Responsive integrity · Key Themes section, mobile (390px)

Paste into Claude Code (or Lovable chat):

```
In the theme cards CSS, add aspect-ratio: 16/9; overflow:hidden; to the card image container, and add padding-bottom:16px to the overlay text container within each card so text is never clipped on any viewport size.
```

## Fix 16: [major] Design QA — Responsive integrity · Statistics row (75 / 22 / 194 / 27), mobile

Paste into Claude Code (or Lovable chat):

```
In the responsive CSS for screens below 576px, set the stat descriptor text elements to white-space:normal; overflow:visible; text-overflow:clip; font-size:12px; so stat labels wrap and remain fully readable on narrow screens.
```

## Fix 17: [major] Design QA — Responsive integrity · Past Leaders logo grid, mobile

Paste into Claude Code (or Lovable chat):

```
Add the CSS rule .past-leaders-section img { height: 32px; width: auto; max-width: 100px; object-fit: contain; } and ensure the wrapping flex container has flex-wrap:wrap; justify-content:center; gap:16px; so logos lay out consistently on mobile.
```

## Fix 18: [critical] Design QA — Visual accessibility · Hero section — text over background image, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
On the hero section's background image container, add a ::after pseudo-element with content:''; position:absolute; inset:0; background:rgba(10,37,64,0.6); z-index:0; and set the hero text container to position:relative; z-index:1; to ensure all hero text has a consistent dark backing that meets WCAG AA contrast.
```

## Fix 19: [major] Design QA — Visual accessibility · Theme cards — text over imagery, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Add background: linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%); as the background of the overlay div inside each theme card, positioned absolutely to cover the full card image area, so all white text on images meets WCAG AA contrast requirements.
```

## Fix 20: [major] Design QA — Visual accessibility · CTA buttons (primary), entire page

Paste into Claude Code (or Lovable chat):

```
Update .btn-primary to set color: #0A2540 (dark navy) instead of white when background-color is #FF5A36, and verify the combination achieves at least 4.5:1 contrast. If the primary CTAs remain blue, ensure the blue used achieves a 4.5:1 ratio with white — replace #0081ff with #0053c2 or darker if needed.
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

## Fix 24: [critical] Brand Compliance — Entire page — CSS custom properties / design system

Paste into Claude Code (or Lovable chat):

```
In the <style data-dynamic> block, update the :root CSS variables as follows: set --primary-color to #0A2540, remove --secondary-color (#ffd230) and replace accent usage with #FF5A36, set --primary-font to 'Archivo, sans-serif', set --secondary-font (body) to 'Inter, sans-serif'. Remove the Raleway @import and add @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=Inter:wght@400;600;700&display=swap');. Update all button background-color references from var(--primary-color) (#0081ff) to #0A2540 for primary actions and #FF5A36 for CTAs.
```

## Fix 25: [critical] Brand Compliance — Hero section — event name and brand config alignment

Paste into Claude Code (or Lovable chat):

```
Resolve the brand config / event mismatch before any further styling work. Either: (a) request the correct brand-config JSON for 'Corporate Counsel & Compliance Exchange USA' from the portal admin and rerun this review, or (b) replace all hero and page content with WorkX 2026 event details if this page is intended for that event.
```

## Fix 26: [critical] Brand Compliance — Hero — primary CTA button

Paste into Claude Code (or Lovable chat):

```
Find all elements with class .btn-primary used for registration/invite CTAs and set their background-color to #FF5A36 and border-color to #FF5A36. Set hover state to background-color: #E04A2A. Remove the --primary-color variable reference from CTA button rules and hardcode or remap to the accent token.
```

## Fix 27: [major] Brand Compliance — Hero — secondary CTA 'Explore Our Next-Gen Brand Event'

Paste into Claude Code (or Lovable chat):

```
In the hero section HTML, locate the secondary CTA button whose visible label is 'Explore Our Next-Gen Brand Event' and replace the label text with 'Explore Sponsorship Packages' or a comparably specific, benefit-led phrase that removes the unverifiable 'Next-Gen' claim.
```

## Fix 28: [major] Brand Compliance — Meta description and OG description

Paste into Claude Code (or Lovable chat):

```
In the <head> section, locate the <meta name='description'> and <meta property='og:description'> tags. Replace the phrase 'The Premier Exchange for Legal Leaders' with a specific, benefit-led description such as 'An exclusive gathering for senior legal and compliance leaders to exchange strategies on governance, regulatory change, and legal technology.'
```

## Fix 29: [major] Brand Compliance — Hero — logo placement over full-bleed background image

Paste into Claude Code (or Lovable chat):

```
Wrap the hero logo element in a container with CSS: background: rgba(10, 37, 64, 0.5); border-radius: 50%; padding: equal to logomark height; to create a scrim. Alternatively, switch the logo src to the white/reversed variant designed for dark backgrounds.
```

## Fix 30: [major] Brand Compliance — Theme cards section ('Key Themes for 2026 Included') — accent color on decorative card backgrounds

Paste into Claude Code (or Lovable chat):

```
In the theme cards component, find all elements using background-color: var(--secondary-color) or background-color: #ffd230 and replace with background-color: #0A2540 (with white text) or background-color: #FFFFFF (with #1A1A1A text). Remove #ffd230 from all decorative uses.
```

## Fix 31: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 32: [critical] SEO Audit — <meta name='description'>

Paste into Claude Code (or Lovable chat):

```
Rewrite the meta description for 'Corporate Counsel & Compliance Exchange USA' to exactly 150–160 characters. Lead with the event name, state it is a peer exchange for in-house legal and compliance leaders, mention legal tech and regulatory strategy, and close with a soft CTA. No exclamation marks. No unverifiable superlatives.
```

## Fix 33: [critical] SEO Audit — <h1>

Paste into Claude Code (or Lovable chat):

```
Replace the current H1 'Checkmate, Chaos - Turning Volatility Into Your Next Strategic Advantage' with 'Corporate Counsel & Compliance Exchange USA' or a variant such as 'Corporate Counsel & Compliance Exchange USA 2026 | New York'. Demote the existing tagline to an H2 or styled subheading immediately below the H1.
```

## Fix 34: [major] SEO Audit — Event JSON-LD — @id field

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD block, change the value of '@id' from 'https://www.iqpc.com#event' to 'https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa#event'.
```

## Fix 35: [major] SEO Audit — Event JSON-LD — performer array

Paste into Claude Code (or Lovable chat):

```
Scan the Event JSON-LD performer array and delete any entry where 'name' equals 'test test' or is otherwise a placeholder. Also remove any performer entries with blank 'url' values if a real profile URL is available, or leave url as null rather than an empty string.
```

## Fix 36: [major] SEO Audit — Event JSON-LD — sponsor array

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD sponsor array, remove all duplicate organization entries so each named sponsor appears exactly once. Where the same name has two different URL values, keep the more complete/canonical URL.
```

## Fix 37: [major] SEO Audit — Event JSON-LD — offers.availability

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD offers block, replace the availability value 'https://www.iqpc.com/events-corporate-counsel-and-compliance-exchange-usa/InStock' with the valid schema.org enumeration 'https://schema.org/InStock'.
```

## Fix 38: [major] SEO Audit — <meta name='keywords'>

Paste into Claude Code (or Lovable chat):

```
Replace the content of <meta name='keywords'> with a comma-separated list of 5–8 relevant keyphrases for this event, such as: 'corporate counsel conference, compliance exchange USA, in-house legal leaders, legal tech conference, regulatory strategy event, New York legal summit'. Or remove the tag if keyword meta is not part of your SEO strategy.
```

## Fix 39: [major] SEO Audit — Event JSON-LD — location.address

Paste into Claude Code (or Lovable chat):

```
In the Event JSON-LD location address block, either populate 'streetAddress' and 'postalCode' with the confirmed venue details, or remove those keys entirely rather than leaving them as empty strings.
```
