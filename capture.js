// capture.js — One capture pass shared by ALL gate agents.
// Produces: desktop + mobile screenshots, rendered HTML (JSON-LD preserved),
// axe-core results, conversion instrumentation, and a computed-style audit
// (colors + fonts actually rendered) for deterministic brand checks.

import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';
import { checkConversion } from './conversion.js';

// Anthropic rejects any image whose longest edge exceeds 8000px. Long marketing
// pages easily exceed that when captured full-page, so downscale in place using
// the already-open browser (a blank tab + canvas) — no extra image dependency.
async function capImageDimensions(context, filePath, maxEdge = 7600) {
  const b64 = fs.readFileSync(filePath).toString('base64');
  const tmp = await context.newPage();
  try {
    const dataUrl = await tmp.evaluate(async ({ b64, maxEdge }) => {
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = 'data:image/png;base64,' + b64;
      });
      const w = img.naturalWidth, h = img.naturalHeight;
      if (Math.max(w, h) <= maxEdge) return null; // already within limit
      const scale = maxEdge / Math.max(w, h);
      const cw = Math.max(1, Math.round(w * scale));
      const ch = Math.max(1, Math.round(h * scale));
      const canvas = document.createElement('canvas');
      canvas.width = cw;
      canvas.height = ch;
      canvas.getContext('2d').drawImage(img, 0, 0, cw, ch);
      return canvas.toDataURL('image/png');
    }, { b64, maxEdge });
    if (dataUrl) {
      fs.writeFileSync(filePath, Buffer.from(dataUrl.split(',')[1], 'base64'));
      return true;
    }
    return false;
  } finally {
    await tmp.close();
  }
}

export async function capture(url, outDir) {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    // Present as a normal desktop Chrome. Playwright's default headless UA
    // contains "HeadlessChrome", which crude bot filters 403. These are public
    // marketing pages, so a realistic UA just lets the QA capture through.
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US',
  });
  const page = await context.newPage();

  console.log(`  → Loading ${url}`);
  // Load the DOM, then give the network a chance to settle — but don't REQUIRE
  // it: marketing pages run trackers/chat/ad scripts that keep the connection
  // busy forever, so 'networkidle' can never fire. Wait for it opportunistically
  // (capped), then a short settle for late-rendered content.
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(2_000);

  const desktopShot = path.join(outDir, 'desktop.png');
  await page.screenshot({ path: desktopShot, fullPage: true, timeout: 60_000 });
  if (await capImageDimensions(context, desktopShot))
    console.log('  → Desktop screenshot captured (downscaled to fit 8000px API limit)');
  else
    console.log('  → Desktop screenshot captured');

  // Raw rendered HTML (scripts intact for analytics detection).
  const rawHtml = await page.content();

  console.log('  → Running conversion instrumentation checks');
  const conversion = await checkConversion(page, rawHtml, url);
  fs.writeFileSync(path.join(outDir, 'conversion.json'), JSON.stringify(conversion, null, 2));

  // Computed-style audit: which colors and font stacks are ACTUALLY rendered.
  // This powers the deterministic brand-token scan — no LLM opinion involved.
  console.log('  → Auditing rendered colors and fonts');
  const styleAudit = await page.evaluate(() => {
    const colorCount = {};
    const fontCount = {};
    const els = Array.from(document.querySelectorAll('body *')).slice(0, 3000);
    const toHex = (rgb) => {
      const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(rgb);
      if (!m) return null;
      if (m[4] !== undefined && parseFloat(m[4]) === 0) return null; // transparent
      return (
        '#' + [m[1], m[2], m[3]].map((n) => (+n).toString(16).padStart(2, '0')).join('')
      ).toUpperCase();
    };
    for (const el of els) {
      const cs = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor']) {
        const h = toHex(cs[prop]);
        if (h) colorCount[h] = (colorCount[h] || 0) + 1;
      }
      if (cs.fontFamily) fontCount[cs.fontFamily] = (fontCount[cs.fontFamily] || 0) + 1;
    }
    const top = (o, n) =>
      Object.entries(o)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([value, elements]) => ({ value, elements }));
    return { colors: top(colorCount, 20), fonts: top(fontCount, 10) };
  });
  fs.writeFileSync(path.join(outDir, 'styles.json'), JSON.stringify(styleAudit, null, 2));

  // Strip scripts for the review prompt — but PRESERVE JSON-LD structured
  // data, which the SEO agent needs to audit.
  const html = rawHtml.replace(
    /<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi,
    ''
  );
  fs.writeFileSync(path.join(outDir, 'page.html'), html);

  console.log('  → Running axe-core accessibility scan');
  const axeResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag22aa', 'best-practice'])
    .analyze();
  fs.writeFileSync(path.join(outDir, 'axe.json'), JSON.stringify(axeResults, null, 2));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(750);
  const mobileShot = path.join(outDir, 'mobile.png');
  await page.screenshot({ path: mobileShot, fullPage: true, timeout: 60_000 });
  if (await capImageDimensions(context, mobileShot))
    console.log('  → Mobile screenshot captured (downscaled to fit 8000px API limit)');
  else
    console.log('  → Mobile screenshot captured');

  await browser.close();
  return { desktopShot, mobileShot, html, axeResults, conversion, styleAudit };
}
