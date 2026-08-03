// batch.js — Portfolio crawl + Brand Health Index.
// Usage: node batch.js [sites.json] [--agents design,brand,seo] [--skip-perf]
//
// Reviews every site with the full orchestrator, then rolls results into a
// per-portal Brand Health Index with per-agent averages. Run nightly and
// brand drift becomes a trend line instead of an opinion.

import fs from 'node:fs';
import path from 'node:path';
import { reviewSite } from './core.js';

const args = process.argv.slice(2);
const sitesFile = args.find((a) => !a.startsWith('--')) ?? 'brand/sites.example.json';
const skipPerf = args.includes('--skip-perf');
const flag = (name) => { const i = args.indexOf(name); return i > -1 ? args[i + 1] : undefined; };
const agents = (flag('--agents') ?? 'design,brand,seo').split(',').map((s) => s.trim());

const sites = JSON.parse(fs.readFileSync(sitesFile, 'utf8'));
const results = [];

console.log(`Batch review: ${sites.length} site(s) from ${sitesFile} · agents: ${agents.join(', ')}\n`);

for (const [i, site] of sites.entries()) {
  console.log(`━━━ [${i + 1}/${sites.length}] ${site.portal ?? '—'} · ${site.url}`);
  try {
    const r = await reviewSite(site.url, {
      brandPath: site.brand ?? 'brand/example-portal.json',
      portal: site.portal ?? null,
      agents,
      skipPerf,
    });
    results.push(r);
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
    results.push({ url: site.url, portal: site.portal ?? null, verdict: 'ERROR', reason: err.message, score: null, agents: [] });
  }
  console.log('');
}

// ---------- Brand Health Index ----------

const byPortal = new Map();
for (const r of results) {
  const key = r.portal ?? '(unassigned)';
  if (!byPortal.has(key)) byPortal.set(key, []);
  byPortal.get(key).push(r);
}

const avgOf = (rs, pick) => {
  const vals = rs.map(pick).filter((v) => typeof v === 'number');
  return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
};
const agentScore = (r, id) => r.agents?.find((a) => a.id === id)?.score ?? null;

const indexRows = [...byPortal.entries()].map(([portal, rs]) => ({
  portal,
  sites: rs.length,
  avg_score: avgOf(rs, (r) => r.score),
  avg_design: avgOf(rs, (r) => agentScore(r, 'design')),
  avg_brand: avgOf(rs, (r) => agentScore(r, 'brand')),
  avg_seo: avgOf(rs, (r) => agentScore(r, 'seo')),
  blocked: rs.filter((r) => r.verdict === 'BLOCK').length,
  needs_review: rs.filter((r) => r.verdict === 'NEEDS_HUMAN_REVIEW').length,
  passed: rs.filter((r) => r.verdict === 'PASS').length,
  errors: rs.filter((r) => r.verdict === 'ERROR').length,
}));

const brandHealthIndex = avgOf(results, (r) => r.score);

const stamp = new Date().toISOString().slice(0, 10);
fs.mkdirSync('dashboard', { recursive: true });
fs.writeFileSync(
  path.join('dashboard', `index-${stamp}.json`),
  JSON.stringify({
    date: stamp,
    brand_health_index: brandHealthIndex,
    portals: indexRows,
    sites: results.map((r) => ({ url: r.url, portal: r.portal, verdict: r.verdict, score: r.score ?? null })),
  }, null, 2)
);

const md = [];
md.push(`# Brand Health Index — ${stamp}`);
md.push('');
md.push(`**Overall index:** ${brandHealthIndex ?? 'n/a'}/100 across ${results.length} site(s)`);
md.push('');
md.push('| Portal | Sites | Overall | Design | Brand | SEO | Pass | Review | Block | Errors |');
md.push('|---|---|---|---|---|---|---|---|---|---|');
for (const row of indexRows.sort((a, b) => (a.avg_score ?? 0) - (b.avg_score ?? 0))) {
  md.push(`| ${row.portal} | ${row.sites} | ${row.avg_score ?? '—'} | ${row.avg_design ?? '—'} | ${row.avg_brand ?? '—'} | ${row.avg_seo ?? '—'} | ${row.passed} | ${row.needs_review} | ${row.blocked} | ${row.errors} |`);
}
md.push('');
md.push('## Sites needing attention');
for (const r of results.filter((r) => r.verdict !== 'PASS')) {
  md.push(`- **${r.verdict}** — ${r.url}${r.portal ? ` (${r.portal})` : ''}: ${r.reason ?? ''}`);
}
if (results.every((r) => r.verdict === 'PASS')) md.push('- None. 🎉');
fs.writeFileSync(path.join('dashboard', `index-${stamp}.md`), md.join('\n'));

console.log('━━━ Batch complete');
console.log(`Brand Health Index: ${brandHealthIndex ?? 'n/a'}/100`);
console.log(`Dashboard: dashboard/index-${stamp}.md`);
