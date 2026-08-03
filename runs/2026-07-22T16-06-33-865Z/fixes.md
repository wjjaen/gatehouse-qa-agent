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

## Fix 3: [critical] Accessibility: aria-valid-attr-value

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "aria-valid-attr-value" (Ensure all ARIA attributes have valid values) affecting 3 element(s), e.g. selector: #tier-6994e6cc50cb2108c7583cfb-tab. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 4: [serious] Accessibility: color-contrast

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "color-contrast" (Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds) affecting 12 element(s), e.g. selector: a[role="button"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 5: [critical] Accessibility: image-alt

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "image-alt" (Ensure <img> elements have alternative text or a role of none or presentation) affecting 1 element(s), e.g. selector: a[href$="www.iqpc.com"] > .d-block. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 6: [serious] Accessibility: link-name

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "link-name" (Ensure links have discernible text) affecting 1 element(s), e.g. selector: a[href$="www.iqpc.com"]. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 7: [serious] Accessibility: listitem

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "listitem" (Ensure <li> elements are used semantically) affecting 3 element(s), e.g. selector: .px-2.nav-link:nth-child(1). Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```

## Fix 8: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 9: [critical] SEO Audit — <meta name='description'>

Paste into Claude Code (or Lovable chat):

```
Rewrite the meta description for the WorkX 2026 conference page to exactly 150–160 characters. Requirements: (1) include the primary keyword 'workplace strategy conference'; (2) include 'San Francisco, August 2026'; (3) mention one concrete attendee benefit (benchmarks, cost-justification, or ROI); (4) end with a soft CTA; (5) no exclamation marks, no superlatives like 'leading' or 'best'. Tone: professional and benefit-led.
```

## Fix 10: [critical] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Rewrite the HTML title tag for the WorkX 2026 conference microsite. Keep 'WorkX' and 'San Francisco 2026'. Add a 3–5 word topic descriptor that includes 'Workplace Strategy' or 'Workplace & Facilities'. Final title must be 55–60 characters. No exclamation marks. No unverifiable superlatives.
```

## Fix 11: [major] SEO Audit — H1: 'WorkX Conference'

Paste into Claude Code (or Lovable chat):

```
Rewrite the H1 for the WorkX 2026 conference page. It must: (1) retain 'WorkX'; (2) include a topic descriptor using 'workplace strategy' and/or 'facilities'; (3) include 'San Francisco' and '2026'; (4) read naturally as a headline; (5) be under 90 characters. Tone: professional and energetic, no exclamation marks.
```

## Fix 12: [major] SEO Audit — Keyword coverage — title, meta description, H1

Paste into Claude Code (or Lovable chat):

```
Review the metadata (title, meta description, H1) for the WorkX 2026 conference page and ensure the following high-intent keywords appear at least once across those three elements, used naturally: 'workplace strategy', 'facilities management', 'return-to-office', 'corporate real estate'. Do not keyword-stuff; each phrase should fit the surrounding sentence context.
```

## Fix 13: [major] SEO Audit — Event JSON-LD — schema @id and WebSite schema

Paste into Claude Code (or Lovable chat):

```
In the existing Event JSON-LD block on the WorkX page, change the value of '@id' from 'https://www.iqpc.com#event' to 'https://www.ssonetwork.com/events-workx#event'. In the WebSite JSON-LD block, change the 'url' field from 'https://www.iqpc.com' to 'https://www.ssonetwork.com'. Add a 'sameAs' array to the Organization schema containing both 'https://www.ssonetwork.com' and 'https://www.iqpc.com'.
```

## Fix 14: [major] SEO Audit — robots meta tag

Paste into Claude Code (or Lovable chat):

```
Add the following tag inside the <head> of the WorkX 2026 microsite HTML, immediately after the existing viewport meta tag: <meta name='robots' content='index, follow'>.
```
