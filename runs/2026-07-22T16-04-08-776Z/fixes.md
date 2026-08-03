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

## Fix 6: [critical] Design QA — Layout & grid · Entire page, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Check your hosting provider's access control settings and ensure the event microsite's root directory and all asset paths are publicly readable. Remove or correct any IP allowlist, HTTP auth, or CDN rule that is returning a 403 status to unauthenticated visitors.
```

## Fix 7: [critical] Design QA — Typography · Entire page, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Fix the 403 server error so the actual event microsite HTML is served; the page's existing Archivo/Inter font stack and type scale will then render correctly.
```

## Fix 8: [critical] Design QA — Spacing & rhythm · Entire page, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Fix the 403 server error so the actual event microsite HTML is served; the spacing scale will then be evaluable.
```

## Fix 9: [critical] Design QA — Visual hierarchy · Entire page, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Fix the 403 server error so the actual event microsite HTML is served. Then ensure the hero section contains: (1) event name 'WorkX 2026' as the largest heading, (2) a value proposition subheading, (3) date and venue, and (4) a high-contrast '#FF5A36' registration CTA button — all visible without scrolling on a 1440px desktop viewport.
```

## Fix 10: [critical] Design QA — Consistency · Entire page, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Fix the 403 server error so the actual event microsite HTML is served; component consistency can then be audited.
```

## Fix 11: [critical] Design QA — Responsive integrity · Entire page, desktop (1440px) and mobile (390px)

Paste into Claude Code (or Lovable chat):

```
Fix the 403 server error so the actual event microsite HTML is served on both desktop and mobile viewports.
```

## Fix 12: [critical] Design QA — Visual accessibility · Entire page, desktop and mobile

Paste into Claude Code (or Lovable chat):

```
Fix the 403 server error so the actual event microsite HTML is served. Then add lang="en" to the <html> tag, wrap all page content in a <main> landmark, and verify that all text-over-image elements have a dark overlay or scrim achieving at least 4.5:1 contrast ratio against overlaid text.
```

## Fix 13: [critical] Brand Compliance — Entire page / server response

Paste into Claude Code (or Lovable chat):

```
The deployment target is returning a 403 Forbidden error. Check your web server configuration: ensure the document root points to the correct build output directory, that directory index files (index.html) exist and are readable by the server process, and that no IP allowlist or auth guard is blocking public access. Re-deploy the WorkX 2026 microsite build and confirm a 200 OK response with the full page HTML before re-running brand compliance review.
```

## Fix 14: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add a meta description tag (150-160 characters) summarizing the event value proposition and ending with a registration call to action.
```

## Fix 15: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add Open Graph tags to this page: og:title, og:description, and og:image pointing to a 1200x630 share image.
```

## Fix 16: [major] SEO Audit — Document <head> / structure

Paste into Claude Code (or Lovable chat):

```
Add the schema.org Event JSON-LD provided in the QA report to this page inside a <script type="application/ld+json"> tag in the <head>.
```

## Fix 17: [critical] SEO Audit — Server / hosting configuration

Paste into Claude Code (or Lovable chat):

```
Investigate the web server and CDN configuration for https://www.ssonetwork.com/events-workx. Remove or adjust any rule that returns a 403 status for unauthenticated or crawler requests. Verify the fix by requesting the URL with curl -I and confirming a 200 OK response before re-running SEO checks.
```

## Fix 18: [critical] SEO Audit — <title> tag

Paste into Claude Code (or Lovable chat):

```
Replace <title>403 Forbidden</title> with <title>WorkX 2026 | Future of Work Summit – SSO Network</title> once the page is publicly accessible.
```

## Fix 19: [critical] SEO Audit — <meta name='description'>

Paste into Claude Code (or Lovable chat):

```
Add <meta name='description' content='[Insert 150-160 char description matching live page facts]'> inside <head>. Use the improved_meta.meta_description value below as a placeholder template, updating with real event details from the live page.
```

## Fix 20: [critical] SEO Audit — <link rel='canonical'>

Paste into Claude Code (or Lovable chat):

```
Insert <link rel='canonical' href='https://www.ssonetwork.com/events-workx'> as the first link element inside <head>.
```

## Fix 21: [critical] SEO Audit — <meta name='viewport'>

Paste into Claude Code (or Lovable chat):

```
Insert <meta name='viewport' content='width=device-width, initial-scale=1'> inside <head> as part of the standard HTML template.
```

## Fix 22: [critical] SEO Audit — Open Graph tags

Paste into Claude Code (or Lovable chat):

```
Add the following inside <head> once live page content is confirmed:
<meta property='og:type' content='event'>
<meta property='og:title' content='WorkX 2026 | Future of Work Summit – SSO Network'>
<meta property='og:description' content='[Match improved meta description]'>
<meta property='og:image' content='[Absolute URL to 1200x630 event image]'>
<meta property='og:url' content='https://www.ssonetwork.com/events-workx'>
```

## Fix 23: [critical] SEO Audit — H1 / page body

Paste into Claude Code (or Lovable chat):

```
Once the 403 is resolved, ensure the H1 reads something like 'WorkX 2026: Advancing the Future of Shared Services & Operations' and that below-the-fold content includes agenda highlights, confirmed speakers, event date/location, and a prominent registration CTA above the fold per brand configuration.
```

## Fix 24: [critical] SEO Audit — schema.org Event JSON-LD

Paste into Claude Code (or Lovable chat):

```
Insert the JSON-LD block from the event_schema_jsonld field in this response as a <script type='application/ld+json'> element inside <head>, replacing all null values with confirmed facts from the live page before deployment.
```

## Fix 25: [major] SEO Audit — robots meta / robots.txt

Paste into Claude Code (or Lovable chat):

```
Add <meta name='robots' content='index, follow'> inside <head>. Fetch https://www.ssonetwork.com/robots.txt and confirm no Disallow rule matches /events-workx or /events-*.
```
