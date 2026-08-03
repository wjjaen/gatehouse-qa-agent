# Ready-to-paste fix prompts

Generated from the QA run. Work top-to-bottom — blocking issues first.

## Fix 1: [critical] MISSING_ANALYTICS

Paste into Claude Code (or Lovable chat):

```
Add the Google Tag Manager container snippet to this site: the GTM script in <head> and the noscript iframe after the opening <body> tag. Container ID: GTM-XXXXXXX. Verify window.dataLayer initializes.
```

## Fix 2: [major] MISSING_PIXEL

Paste into Claude Code (or Lovable chat):

```
Add the missing marketing pixel base code to the <head> of this site and confirm it fires on page load. Pixel/partner ID: <fill in>.
```

## Fix 3: [major] MISSING_PIXEL

Paste into Claude Code (or Lovable chat):

```
Add the missing marketing pixel base code to the <head> of this site and confirm it fires on page load. Pixel/partner ID: <fill in>.
```

## Fix 4: [critical] NO_REGISTRATION_CTA

Paste into Claude Code (or Lovable chat):

```
Add a prominent primary registration CTA button in the hero, above the fold, using the brand accent color, linking to the registration URL: <fill in>. It must be a real <a> element with a valid href.
```

## Fix 5: [serious] Accessibility: html-has-lang

Paste into Claude Code (or Lovable chat):

```
Fix the axe-core accessibility violation "html-has-lang" (Ensure every HTML document has a lang attribute) affecting 1 element(s), e.g. selector: html. Follow WCAG 2.2 AA. Confirm the violation no longer appears in an axe scan.
```
