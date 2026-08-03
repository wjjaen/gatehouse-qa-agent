// perf.js — Lighthouse performance scoring (optional).
// Slow microsites raise bounce rates on paid traffic and drag ad Quality
// Scores — performance debt is media-budget waste. Gracefully skips if
// Lighthouse isn't installed.

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';

const pexec = promisify(execFile);

export async function runLighthouse(url, outDir) {
  const outPath = path.join(outDir, 'lighthouse.json');
  try {
    await pexec(
      'npx',
      [
        '--yes', 'lighthouse', url,
        '--output=json',
        `--output-path=${outPath}`,
        '--quiet',
        '--only-categories=performance,accessibility,best-practices,seo',
        '--chrome-flags=--headless=new --no-sandbox',
      ],
      { timeout: 240_000 }
    );
    const report = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    const pct = (c) => Math.round((report.categories[c]?.score ?? 0) * 100);
    return {
      available: true,
      performance: pct('performance'),
      accessibility: pct('accessibility'),
      best_practices: pct('best-practices'),
      seo: pct('seo'),
      lcp: report.audits['largest-contentful-paint']?.displayValue ?? null,
      cls: report.audits['cumulative-layout-shift']?.displayValue ?? null,
      tbt: report.audits['total-blocking-time']?.displayValue ?? null,
    };
  } catch (err) {
    return {
      available: false,
      note: `Lighthouse skipped (${err.message.split('\n')[0]}). Install with: npm i -D lighthouse`,
    };
  }
}
