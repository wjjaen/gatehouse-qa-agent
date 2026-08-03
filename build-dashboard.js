// build-dashboard.js — Generates the IQPC Event Microsite QA dashboard from REAL
// run data. Reads every runs/<ts>/report.json (deduped to the latest per URL),
// embeds the data into a single self-contained dashboard/index.html.
//
//   node build-dashboard.js
//
// Design: the "Gatehouse" leaderboard layout (navy #0A2540, vermilion #FF5A36,
// Archivo/Inter, IBM Plex Mono), wired to live data. Tabs: Leaderboard, Review
// Queue, Site Report, Methodology.

import fs from 'node:fs';
import path from 'node:path';

const RUNS_DIR = 'runs';
const OUT_DIR = 'dashboard';
const OUT_FILE = path.join(OUT_DIR, 'index.html');
const HISTORY_FILE = path.join('history', 'scores.jsonl');

// Scoring constants — kept in sync with core.js (WEIGHTS, SCORE_REVIEW_THRESHOLD).
const WEIGHTS = { design: 40, brand: 35, seo: 25 };
const SCORE_REVIEW_THRESHOLD = 60;

// IQPC portal each event domain belongs to.
const PORTAL_BY_HOST = {
  'ssonetwork.com': 'SSON',
  'cxnetwork.com': 'CX Network',
  'iqpc.com': 'IQPC',
  'idga.org': 'IDGA',
};

function portalOf(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '');
    return PORTAL_BY_HOST[h] || h;
  } catch {
    return 'Unknown';
  }
}

function shortName(url) {
  try {
    const u = new URL(url);
    const segs = u.pathname.split('/').filter(Boolean).filter((s) => s.toLowerCase() !== 'index');
    const slug = segs.sort((a, b) => b.length - a.length)[0] || u.hostname;
    return slug
      .replace(/^events?-/i, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase()) || u.hostname;
  } catch {
    return url;
  }
}

// ---- collect the latest run per URL ---------------------------------------
function loadRuns() {
  if (!fs.existsSync(RUNS_DIR)) return [];
  const dirs = fs.readdirSync(RUNS_DIR).filter((d) =>
    fs.existsSync(path.join(RUNS_DIR, d, 'report.json'))
  );
  const byUrl = new Map();
  for (const d of dirs.sort()) {
    const report = JSON.parse(fs.readFileSync(path.join(RUNS_DIR, d, 'report.json'), 'utf8'));
    let styles = { colors: [], fonts: [] };
    const stylePath = path.join(RUNS_DIR, d, 'styles.json');
    if (fs.existsSync(stylePath)) styles = JSON.parse(fs.readFileSync(stylePath, 'utf8'));
    byUrl.set(report.url, { report, styles });
  }
  return [...byUrl.values()];
}

// Trend: mean BHI per calendar day from history (only real if >1 distinct day).
function loadTrend() {
  if (!fs.existsSync(HISTORY_FILE)) return [];
  const rows = fs.readFileSync(HISTORY_FILE, 'utf8').split('\n').filter(Boolean).map((l) => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);
  const byDay = new Map();
  for (const r of rows) {
    if (typeof r.score !== 'number') continue;
    const day = (r.ts || '').slice(0, 10);
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day).push(r.score);
  }
  return [...byDay.entries()].sort().map(([day, arr]) => ({
    day, value: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length),
  }));
}

export async function buildDashboard(brandPath = 'brand/example-portal.json') {
  const brand = JSON.parse(fs.readFileSync(brandPath, 'utf8'));
  const approved = [
    brand.colors.primary,
    brand.colors.accent,
    brand.colors.background,
    brand.colors.text,
    '#000000',
  ].map((c) => c.toUpperCase());

  const sites = loadRuns().map(({ report, styles }) => {
    const palette = (styles.colors || []).slice(0, 4).map((c) => ({
      value: c.value,
      elements: c.elements,
      offBrand: !approved.includes(c.value.toUpperCase()),
    }));
    const seoAgent = report.agents.find((a) => a.id === 'seo');
    const agentScore = (id) => report.agents.find((a) => a.id === id)?.score ?? null;
    return {
      url: report.url,
      name: shortName(report.url),
      portal: portalOf(report.url),
      run: report.run,
      verdict: report.verdict,
      reason: report.reason,
      score: report.score,
      d: agentScore('design'),
      b: agentScore('brand'),
      s: agentScore('seo'),
      agents: report.agents.map((a) => ({
        id: a.id, label: a.label, score: a.score, summary: a.summary,
        findings: (a.findings || []).map((f) => ({
          severity: f.severity, location: f.location, issue: f.issue,
          recommendation: f.recommendation, fix_prompt: f.fix_prompt,
        })),
      })),
      conversion: {
        analytics_found: report.conversion.analytics_found,
        analytics_missing: report.conversion.analytics_missing,
        ctas: report.conversion.ctas,
        issues: report.conversion.issues,
      },
      axe: report.axe,
      palette,
      seo: seoAgent?.extra ? { checks: seoAgent.extra.checks, improved: seoAgent.extra.improved_meta } : null,
      regression: report.regression,
    };
  });

  // Brand Health Index = mean weighted score; delta = mean regression delta.
  const scored = sites.filter((s) => typeof s.score === 'number');
  const bhiValue = scored.length ? Math.round(scored.reduce((a, x) => a + x.score, 0) / scored.length) : null;
  const deltas = sites.map((s) => (s.regression && !s.regression.first_run ? s.regression.score_delta : null)).filter((d) => d !== null);
  const bhiDelta = deltas.length ? Math.round(deltas.reduce((a, b) => a + b, 0) / deltas.length) : null;

  const trend = loadTrend();

  const outcomes = {
    pass: sites.filter((s) => s.verdict === 'PASS').length,
    review: sites.filter((s) => s.verdict === 'NEEDS_HUMAN_REVIEW').length,
    block: sites.filter((s) => s.verdict === 'BLOCK').length,
  };

  const data = {
    generatedAt: new Date().toISOString(),
    brand: { palette: { primary: brand.colors.primary, accent: brand.colors.accent, background: brand.colors.background, text: brand.colors.text }, approved, fonts: brand.typography },
    method: { weights: WEIGHTS, reviewThreshold: SCORE_REVIEW_THRESHOLD },
    bhi: { value: bhiValue, delta: bhiDelta },
    trend,
    outcomes,
    portalCount: new Set(sites.map((s) => s.portal)).size,
    sites,
  };

  const RAILWAY_URL = process.env.RAILWAY_URL || '';
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, renderHtml(data, RAILWAY_URL));
  const legacy = path.join(OUT_DIR, 'gatehouse.html');
  if (fs.existsSync(legacy)) fs.rmSync(legacy);
  console.log(`IQPC Event Microsite QA dashboard written: ${OUT_FILE}`);
  console.log(`  Sites: ${sites.length} · Portals: ${data.portalCount} · Brand Health Index: ${bhiValue ?? 'n/a'} · Generated ${data.generatedAt}`);

  return data;
}

// ---------------------------------------------------------------------------
function renderHtml(data, RAILWAY_URL = '') {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>IQPC Event Microsite QA</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --ink:#0A2540; --ink-soft:#33475E; --muted:#5B6B7F; --faint:#8C99A8;
    --paper:#F6F8FA; --card:#FFFFFF; --line:#E3E8EF; --navy-tint:#EDF2F7;
    --accent:#FF5A36; --pass:#0E9F6E; --review:#D97706; --block:#DC2626;
    --pass-bg:#E7F6EF; --review-bg:#FCF1E3; --block-bg:#FCE9E9;
    --display:'Archivo',system-ui,sans-serif; --body:'Inter',system-ui,sans-serif;
    --mono:'IBM Plex Mono',ui-monospace,monospace;
  }
  * { box-sizing:border-box; margin:0; }
  body { background:var(--paper); font-family:var(--body); color:var(--ink); }
  button { font:inherit; cursor:pointer; background:none; border:none; }
  a { color:inherit; }
  :focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
  @media (prefers-reduced-motion: reduce) { * { transition:none !important; } }

  .wrap { max-width:1120px; margin:0 auto; padding:0 20px; }
  header.top { background:var(--ink); }
  .brandrow { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; padding:16px 0 12px; }
  .brand { display:flex; align-items:center; gap:12px; }
  .logo { width:36px; height:36px; border-radius:10px; background:var(--accent); display:grid; place-items:center; color:#fff; font-family:var(--display); font-weight:800; font-size:16px; }
  .brand h1 { color:#fff; font-family:var(--display); font-size:17px; letter-spacing:-.01em; }
  .brand .sub { color:#9FB0C2; font-size:11px; font-weight:500; }
  .live-chip { border:1px solid rgba(14,159,110,.5); background:rgba(14,159,110,.16); color:#8FE3C0; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; padding:5px 12px; border-radius:999px; }
  .meta { color:#9FB0C2; font-family:var(--mono); font-size:12px; }

  nav.tabs { display:flex; gap:4px; flex-wrap:wrap; }
  .tab { padding:10px 16px; border-radius:10px 10px 0 0; font-weight:600; font-size:14px; color:#B9C6D4; transition:background .15s,color .15s; }
  .tab[aria-selected="true"] { background:var(--paper); color:var(--ink); }

  main.wrap { padding:50px 20px 40px; }
  .view { display:none; }
  .view.active { display:block; }
  .stack > * + * { margin-top:18px; }

  .card { background:var(--card); border:1px solid var(--line); border-radius:14px; }
  .pad { padding:20px; }
  .label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:var(--faint); margin-bottom:8px; }
  .grid { display:grid; gap:18px; }
  @media (min-width:900px) { .g3 { grid-template-columns:1fr 2fr; } .g2 { grid-template-columns:1fr 1fr; } .gagents { grid-template-columns:repeat(3,1fr); } }

  .bignum { font-family:var(--mono); font-weight:600; font-size:54px; line-height:1; }
  .chip { display:inline-flex; align-items:center; gap:6px; border-radius:999px; font-weight:700; font-size:12px; padding:3px 10px; white-space:nowrap; }
  .chip.lg { font-size:13px; padding:6px 12px; }
  .chip.pass { background:var(--pass-bg); color:var(--pass); }
  .chip.review { background:var(--review-bg); color:var(--review); }
  .chip.block { background:var(--block-bg); color:var(--block); }
  .up { color:var(--pass); } .down { color:var(--block); }
  .mono { font-family:var(--mono); }
  .mutetext { color:var(--muted); font-size:14px; line-height:1.55; }

  .outcome-strip { display:flex; height:12px; border-radius:999px; overflow:hidden; flex:1; min-width:200px; max-width:440px; }
  .legend { display:flex; gap:18px; font-size:13px; flex-wrap:wrap; }
  .legend b { font-family:var(--mono); }

  table { border-collapse:separate; border-spacing:0 3px; width:100%; min-width:760px; }
  thead th { text-align:left; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:var(--faint); padding:8px 12px; }
  tbody td { background:var(--paper); padding:11px 12px; font-size:14px; }
  tbody td:first-child { border-radius:10px 0 0 10px; font-weight:600; }
  tbody td:last-child { border-radius:0 10px 10px 0; }
  .tablewrap { overflow-x:auto; padding:0 8px 8px; }
  .subtle { color:var(--muted); font-size:11px; font-weight:400; }
  .score { font-family:var(--mono); font-weight:600; }
  .s-good { color:var(--pass); } .s-mid { color:var(--review); } .s-bad { color:var(--block); }
  .bar { position:relative; display:inline-block; vertical-align:middle; width:62px; height:6px; border-radius:999px; background:var(--navy-tint); margin-left:8px; overflow:hidden; }
  .bar i { position:absolute; inset:0 auto 0 0; border-radius:999px; }
  .swatches { display:inline-flex; gap:4px; }
  .sw { width:14px; height:14px; border-radius:4px; border:1px solid var(--line); }
  .sw.off { border:2px solid var(--accent); }
  .delta { font-family:var(--mono); font-size:12px; font-weight:700; }

  .qrow { width:100%; display:flex; align-items:center; gap:18px; flex-wrap:wrap; text-align:left; padding:16px 20px; border-radius:14px; background:var(--card); border:1px solid var(--line); transition:box-shadow .15s; }
  .qrow:hover { box-shadow:0 4px 14px rgba(10,37,64,.08); }
  .qrow .site { font-weight:700; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .qrow .why { color:var(--muted); font-size:12px; margin-top:2px; }
  .qmain { flex:1; min-width:220px; }
  .qscores { display:flex; gap:16px; font-size:11px; color:var(--muted); text-align:center; }
  .qscores span { display:flex; flex-direction:column; gap:2px; }
  .regress { background:var(--block-bg); color:var(--block); font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.06em; padding:2px 7px; border-radius:6px; }

  .banner-bar { height:6px; border-radius:14px 14px 0 0; }
  .reportrow { display:flex; justify-content:space-between; gap:18px; flex-wrap:wrap; }
  h2.site-title { font-family:var(--display); font-size:21px; }
  .picker { font-family:var(--mono); font-size:12px; padding:8px 10px; border:1px solid var(--line); border-radius:8px; background:var(--card); }
  .checklist { list-style:none; display:grid; gap:10px; font-size:14px; }
  .checklist .ok::before { content:"✓"; color:var(--pass); font-weight:800; margin-right:10px; }
  .checklist .fail::before { content:"✕"; color:var(--block); font-weight:800; margin-right:10px; }
  .finding { background:var(--paper); border-radius:10px; padding:10px 12px; margin-top:10px; font-size:12.5px; line-height:1.5; color:var(--ink-soft); }
  .finding .fhead { display:flex; justify-content:space-between; gap:8px; margin-bottom:4px; }
  .sev { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; }
  .sev::before { content:"●"; margin-right:5px; font-size:9px; }
  .sev.critical, .sev.serious { color:var(--block); } .sev.major { color:var(--review); } .sev.minor { color:var(--faint); }
  .floc { color:var(--faint); font-size:11px; }

  .fix { display:flex; justify-content:space-between; gap:14px; flex-wrap:wrap; background:var(--paper); border-left:3px solid var(--review); border-radius:10px; padding:14px; margin-top:12px; }
  .fix.critical, .fix.serious { border-left-color:var(--accent); }
  .fix .prompt { font-family:var(--mono); font-size:11.5px; color:var(--muted); line-height:1.6; margin-top:4px; white-space:pre-wrap; word-break:break-word; }
  .fixmain { flex:1; min-width:240px; }
  .copybtn { display:inline-flex; align-items:center; gap:6px; background:var(--ink); color:#fff; font-size:12px; font-weight:700; padding:8px 12px; border-radius:8px; height:fit-content; transition:background .15s; }
  .copybtn.done { background:var(--pass-bg); color:var(--pass); }
  .delbtn { display:inline-flex; background:none; border:none; color:var(--muted); font-size:14px; cursor:pointer; padding:6px 10px; border-radius:6px; align-items:center; justify-content:center; transition:background .15s,color .15s; }
  .delbtn:hover { background:var(--block-bg); color:var(--block); }
  #scanner-form { display:flex; }


  .method-h { font-family:var(--display); font-size:20px; color:var(--ink); }
  .wcard { border:1px solid var(--line); border-radius:12px; padding:16px; }
  .wpct { font-family:var(--display); font-weight:800; font-size:30px; color:var(--ink); }

  footer.note { text-align:center; color:var(--faint); font-size:11px; margin-top:32px; }
  .hint { text-align:center; color:var(--faint); font-size:12px; margin-top:14px; }
</style>
</head>
<body>
<header class="top">
  <div class="wrap">
    <div class="brandrow">
      <div class="brand">
        <div class="logo">Q</div>
        <div>
          <h1>IQPC Event Microsite QA</h1>
          <div class="sub">Microsite quality governance · IQPC</div>
        </div>
      </div>
      
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <span class="live-chip">● Live data</span>
        <form id="scanner-form" style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);padding:4px 8px;border-radius:10px;">
          <input type="url" id="scanner-url" placeholder="Enter staging/event URL..." required style="background:none;border:none;color:#fff;font-family:var(--body);font-size:13px;width:260px;outline:none;" />
          <button type="submit" id="scanner-btn" style="background:var(--accent);color:#fff;font-weight:700;font-size:12px;padding:5px 12px;border-radius:6px;transition:opacity 0.15s;cursor:pointer;">Scan Site</button>
        </form>
      </div>

      <div class="meta" id="metaline"></div>
    </div>
    <nav class="tabs" role="tablist" aria-label="Dashboard views">
      <button class="tab" role="tab" aria-selected="true" data-view="leadership">Leaderboard</button>
      <button class="tab" role="tab" aria-selected="false" data-view="queue">Review Queue</button>
      <button class="tab" role="tab" aria-selected="false" data-view="report">Site Report</button>
      <button class="tab" role="tab" aria-selected="false" data-view="method">Methodology</button>
    </nav>
  </div>
</header>

<main class="wrap">
  <section id="view-leadership" class="view stack active" role="tabpanel"></section>
  <section id="view-queue" class="view stack" role="tabpanel" hidden></section>
  <section id="view-report" class="view stack" role="tabpanel" hidden></section>
  <section id="view-method" class="view stack" role="tabpanel" hidden></section>
  <footer class="note" id="foot"></footer>
</main>

<div id="scanner-status" style="display:none;position:fixed;top:20px;right:20px;background:var(--ink);border:1px solid var(--line);border-radius:12px;padding:16px 20px;box-shadow:0 10px 30px rgba(10,37,64,0.16);z-index:99999;align-items:center;gap:12px;">
  <div style="width:18px;height:18px;border:3px solid var(--accent);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
  <span id="scanner-status-text" style="font-size:13.5px;color:#fff;font-weight:600;font-family:var(--body);">Running QA agents...</span>
</div>
<style>
  @keyframes spin { to { transform: rotate(360deg); } }
</style>

<script id="gh-data" type="application/json">${json}</script>
<script>
// API_URL is baked in at build time. When RAILWAY_URL env var is set,
// all requests (scan, delete, data) go to that Railway deployment.
const API_URL = '${RAILWAY_URL}';

function getApiUrl(endpoint) {
  if (API_URL) return API_URL + endpoint;
  if (window.location.protocol === 'file:') return 'http://localhost:3000' + endpoint;
  return endpoint;
}

let DATA = JSON.parse(document.getElementById('gh-data').textContent);
let current = DATA.sites[0] || null;

// Fetch fresh data from Railway on page load so Bluehost always shows
// the latest scans without needing an FTP re-upload after each scan.
(async () => {
  if (!API_URL) return; // local dev: use the embedded JSON
  try {
    const res = await fetch(API_URL + '/api/data');
    if (res.ok) {
      DATA = await res.json();
      current = DATA.sites[0] || null;
      initDashboard();
      show('leadership');
    }
  } catch (_) { /* network unavailable — fall back to embedded snapshot */ }
})();

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sevOrder = { critical:0, serious:1, major:2, minor:3 };
const scoreClass = (v) => v>=75 ? 's-good' : v>=60 ? 's-mid' : 's-bad';
const scoreColor = (v) => v>=75 ? 'var(--pass)' : v>=60 ? 'var(--review)' : 'var(--block)';
const vClass = (verdict) => verdict==='BLOCK' ? 'block' : verdict==='PASS' ? 'pass' : 'review';
const vChip = (verdict, lg) => {
  const map = { PASS:['pass','✔ Pass'], NEEDS_HUMAN_REVIEW:['review','▲ Needs review'], BLOCK:['block','⛔ Blocked'] };
  const [cls, txt] = map[verdict] || ['review', verdict];
  return '<span class="chip '+cls+(lg?' lg':'')+'">'+txt+'</span>';
};

function initDashboard() {
  // Always show dev controls — they route to Railway in production, localhost locally.
  document.body.classList.add('dev-mode');
  document.getElementById('metaline').textContent =
    DATA.sites.length + ' site' + (DATA.sites.length===1?'':'s') + ' · ' + DATA.portalCount + ' portal' + (DATA.portalCount===1?'':'s') + ' · ' + new Date(DATA.generatedAt).toLocaleString();
  document.getElementById('foot').textContent =
    'Live data from the IQPC Microsite QA agent system — every score is a real measurement. Run a scan above or re-run node agent.js <url> then node build-dashboard.js to refresh.';
}
initDashboard();

/* ---------------- Leaderboard ---------------- */
function trendChart(){
  const t = DATA.trend;
  if (!t || t.length < 2) {
    return '<p class="mutetext">The trend line builds as the nightly batch accumulates run-days — '+ (t.length||0) +' day of history so far. Each night\\u2019s crawl adds a point here, turning brand drift into a line leadership can watch.</p>';
  }
  const W=620,H=150,L=34,R=10,Tm=12,B=26;
  const vals=t.map(p=>p.value);
  let lo=Math.min(...vals), hi=Math.max(...vals);
  lo=Math.max(0,Math.floor((lo-6)/10)*10); hi=Math.min(100,Math.ceil((hi+6)/10)*10);
  const x=i=>L+i*(W-L-R)/(t.length-1);
  const y=v=>Tm+(hi-v)*(H-Tm-B)/(hi-lo);
  const pts=t.map((p,i)=>x(i)+','+y(p.value)).join(' ');
  const dots=t.map((p,i)=>"<circle cx=\\""+x(i)+"\\" cy=\\""+y(p.value)+"\\" r=\\"3.4\\" fill=\\"var(--ink)\\"><title>"+p.day+": "+p.value+"</title></circle>").join('');
  const labels=t.map((p,i)=> i%2===0||i===t.length-1 ? "<text x=\\""+x(i)+"\\" y=\\""+(H-8)+"\\" font-size=\\"10\\" fill=\\"var(--faint)\\" text-anchor=\\"middle\\" font-family=\\"Inter\\">"+p.day.slice(5)+"</text>" : "").join('');
  const gy=[lo,Math.round((lo+hi)/2),hi].map(v=>"<text x=\\""+(L-8)+"\\" y=\\""+(y(v)+3)+"\\" font-size=\\"10\\" fill=\\"var(--faint)\\" text-anchor=\\"end\\" font-family=\\"IBM Plex Mono\\">"+v+"</text>");
  const thr=DATA.method.reviewThreshold;
  const thrLine = (thr>=lo&&thr<=hi) ? '<line x1="'+L+'" y1="'+y(thr)+'" x2="'+(W-R)+'" y2="'+y(thr)+'" stroke="var(--review)" stroke-dasharray="4 4" stroke-width="1"/><text x="'+(W-R)+'" y="'+(y(thr)-5)+'" font-size="9.5" fill="var(--review)" text-anchor="end" font-family="Inter">review threshold</text>' : '';
  return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="Brand Health Index trend">'+gy.join('')+thrLine+'<polyline points="'+pts+'" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>'+dots+labels+'</svg>';
}

function renderLeadership(){
  const b=DATA.bhi, o=DATA.outcomes, total=o.pass+o.review+o.block||1;
  const deltaChip = b.delta===null ? '<span class="chip review mono" style="margin-bottom:6px;">first run</span>'
    : '<span class="chip '+(b.delta>=0?'pass':'block')+' mono" style="margin-bottom:6px;">'+(b.delta>=0?'▲ +':'▼ ')+b.delta+' vs previous</span>';
  const rows = DATA.sites.slice().sort((a,c)=>(a.score??0)-(c.score??0)).map(s=>{
    const sw = s.palette.map(p=>'<span class="sw'+(p.offBrand?' off':'')+'" style="background:'+esc(p.value)+';" title="'+esc(p.value)+(p.offBrand?' (off-brand)':'')+'"></span>').join('');
    const d = s.regression && !s.regression.first_run ? s.regression.score_delta : null;
    const deltaCell = d===null ? '<span class="delta">—</span>' : '<span class="delta '+(d>0?'up':d<0?'down':'')+'">'+(d===0?'±0':(d>0?'▲ +':'▼ ')+d)+'</span>';
    return '<tr onclick="openReport(\\''+esc(s.url)+'\\')" style="cursor:pointer;">'
      +'<td>'+esc(s.portal)+'<div class="subtle">'+esc(s.name)+'</div></td>'
      +'<td class="mono" style="color:var(--muted);">1</td>'
      +'<td><span class="score '+scoreClass(s.score)+'">'+(s.score??'—')+'</span><span class="bar"><i style="width:'+(s.score??0)+'%;background:'+scoreColor(s.score)+';"></i></span></td>'
      +'<td class="score '+scoreClass(s.d)+'" style="font-size:13px;">'+(s.d??'—')+'</td>'
      +'<td class="score '+scoreClass(s.b)+'" style="font-size:13px;">'+(s.b??'—')+'</td>'
      +'<td class="score '+scoreClass(s.s)+'" style="font-size:13px;">'+(s.s??'—')+'</td>'
      +'<td><span class="swatches">'+sw+'</span></td>'
      +'<td>'+deltaCell+'</td>'
      +'<td>'+vChip(s.verdict)+'</td>'
      +'<td style="text-align:center;"><button type="button" class="delbtn" title="Delete site" onclick="event.stopPropagation(); event.preventDefault(); deleteSite(\''+esc(s.url)+'\')">🗑</button></td></tr>';
  }).join('');
  return '<div class="grid g3">'
    +'<div class="card pad"><div class="label">Brand Health Index</div>'
      +'<div style="display:flex;align-items:flex-end;gap:12px;"><span class="bignum">'+(b.value??'—')+'</span>'+deltaChip+'</div>'
      +'<p class="mutetext" style="margin-top:12px;">Mean weighted quality across <span class="mono">'+DATA.sites.length+'</span> reviewed microsites on <span class="mono">'+DATA.portalCount+'</span> IQPC portals.</p></div>'
    +'<div class="card pad"><div class="label">Brand Health Index · trend</div>'+trendChart()+'</div></div>'

    +'<div class="card pad" style="display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;">'
      +'<div class="label" style="margin:0;">At the gate</div>'
      +'<div class="outcome-strip" role="img" aria-label="'+o.pass+' passed, '+o.review+' review, '+o.block+' blocked">'
        +'<i style="flex:'+(o.pass||0.0001)+';background:var(--pass);"></i><i style="flex:'+(o.review||0.0001)+';background:var(--review);"></i><i style="flex:'+(o.block||0.0001)+';background:var(--block);"></i></div>'
      +'<div class="legend"><span style="color:var(--pass);"><b>'+o.pass+'</b> passed</span>'
        +'<span style="color:var(--review);"><b>'+o.review+'</b> in review</span>'
        +'<span style="color:var(--block);"><b>'+o.block+'</b> blocked</span></div></div>'

    +'<div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;padding:20px 20px 0;">'
      +'<div class="label" style="margin:0;">Portfolio · ranked worst-first</div>'
      +'<span style="font-size:11px;color:var(--faint);">swatches = rendered palette · <span class="sw off" style="display:inline-block;vertical-align:-2px;width:10px;height:10px;"></span> off-brand token</span></div>'
      +'<div class="tablewrap"><table><thead><tr><th>Portal / Event</th><th>Sites</th><th>Overall</th><th>Design</th><th>Brand</th><th>SEO</th><th>Rendered palette</th><th>Δ</th><th>Status</th><th style="width:50px;"></th></tr></thead><tbody>'+rows+'</tbody></table></div></div>';
}

/* ---------------- Review Queue ---------------- */
function renderQueue(){
  const list = DATA.sites.slice().sort((a,c)=>(a.score??0)-(c.score??0));
  const rows = list.map(s=>{
    const reg = s.regression && !s.regression.first_run && s.regression.regressed ? '<span class="regress">▼ regression</span>' : '';
    return '<button class="qrow" onclick="openReport(\\''+esc(s.url)+'\\')" style="margin-top:10px;">'
      +vChip(s.verdict)
      +'<span class="qmain"><span class="site">'+esc(s.name)+' '+reg+'</span>'
      +'<span class="why">'+esc(s.portal)+' · '+esc(s.reason)+'</span></span>'
      +'<span class="qscores">'
        +'<span>Overall<b class="score '+scoreClass(s.score)+'" style="font-size:15px;">'+(s.score??'—')+'</b></span>'
        +'<span>D<b class="score '+scoreClass(s.d)+'" style="font-size:13px;">'+(s.d??'—')+'</b></span>'
        +'<span>B<b class="score '+scoreClass(s.b)+'" style="font-size:13px;">'+(s.b??'—')+'</b></span>'
        +'<span>S<b class="score '+scoreClass(s.s)+'" style="font-size:13px;">'+(s.s??'—')+'</b></span></span>'
      +'<span style="color:var(--faint);">›</span></button>';
  }).join('');
  return '<div class="card pad"><div class="label">Review queue · worst first</div>'
    +'<p class="mutetext">'+list.length+' microsite'+(list.length===1?'':'s')+' reviewed · '+DATA.outcomes.block+' blocked at the gate, '+DATA.outcomes.review+' escalated to review.</p></div>'
    +'<div class="stack">'+rows+'</div><p class="hint">Tap any row to open its full site report →</p>';
}

/* ---------------- Site Report ---------------- */
function buildFixes(s){
  const out=[];
  for (const i of s.conversion.issues.filter(i=>i.severity!=='minor')){
    out.push({ sev:i.severity, title:i.code, prompt:i.detail });
  }
  for (const a of s.agents){
    for (const f of (a.findings||[]).filter(f=>f.severity==='critical'||f.severity==='serious'||f.severity==='major')){
      out.push({ sev:f.severity, title:a.label+' — '+(f.location||''), prompt:f.fix_prompt || ((f.issue||'')+' Fix: '+(f.recommendation||'')) });
    }
  }
  return out.sort((a,b)=>sevOrder[a.sev]-sevOrder[b.sev]).slice(0,12);
}
function renderReport(){
  const s=current;
  if(!s) return '<div class="card pad">No site selected.</div>';
  const conv=s.conversion;
  const picker = DATA.sites.length>1 ? '<select class="picker" onchange="openReport(this.value)">'+DATA.sites.map(x=>'<option value="'+esc(x.url)+'"'+(x.url===s.url?' selected':'')+'>'+esc(x.portal)+' — '+esc(x.name)+'</option>').join('')+'</select>' : '';
  const ctaItems = conv.ctas.length
    ? conv.ctas.map(c=>'<li class="'+(c.ok===false?'fail':'ok')+'"><b>'+esc(c.text)+'</b> <span class="mutetext">— '+esc(c.href||'(button)')+(c.status?' [HTTP '+c.status+']':'')+'</span></li>').join('')
    : '<li class="fail"><b>Registration CTA</b> <span class="mutetext">— none detected</span></li>';
  const anaItems = s.conversion.analytics_found.map(a=>'<li class="ok"><b>'+esc(a)+'</b> <span class="mutetext">— detected</span></li>').join('')
    + s.conversion.analytics_missing.map(a=>'<li class="fail"><b>'+esc(a)+'</b> <span class="mutetext">— not detected</span></li>').join('');

  const getAgentCard = (id, label) => {
    const a = s.agents.find(x => x.id === id);
    if (!a) {
      return '<div class="card pad" style="opacity:0.55;"><div style="display:flex;justify-content:space-between;align-items:baseline;"><b style="font-family:var(--display);color:var(--muted);">' + esc(label) + '</b><span class="score" style="font-size:19px;color:var(--muted);">—</span></div><p class="mutetext" style="font-size:12.5px;margin-top:4px;">No scan data collected for this agent.</p></div>';
    }
    const fs = (a.findings || []).slice().sort((x, y) => sevOrder[x.severity] - sevOrder[y.severity]).slice(0, 5);
    return '<div class="card pad"><div style="display:flex;justify-content:space-between;align-items:baseline;"><b style="font-family:var(--display);">' + esc(a.label) + '</b><span class="score ' + scoreClass(a.score) + '" style="font-size:19px;">' + (a.score ?? '—') + '</span></div>'
      + '<p class="mutetext" style="font-size:12.5px;margin-top:4px;">' + esc(a.summary || '') + '</p>'
      + fs.map(f => '<div class="finding"><div class="fhead"><span class="sev ' + f.severity + '">' + f.severity + '</span><span class="floc">' + esc(f.location) + '</span></div>' + esc(f.issue) + '</div>').join('')
      + '</div>';
  };

  const agentCardsHtml = '<div class="grid gagents">'
    + getAgentCard('design', 'Design QA')
    + getAgentCard('brand', 'Brand Compliance')
    + getAgentCard('seo', 'SEO Audit')
    + '</div>';

  const fixList = buildFixes(s);
  const fixHtml = fixList.length
    ? '<div id="fixlist">'+fixList.map((f,i)=>'<div class="fix '+f.sev+'"><div class="fixmain"><span class="sev '+f.sev+'">'+f.sev+'</span> <b style="font-size:14px;">'+esc(f.title)+'</b><p class="prompt">'+esc(f.prompt)+'</p></div><button class="copybtn" onclick="copyFix('+i+',this)">⧉ Copy prompt</button></div>').join('')+'</div>'
    : '<p class="mutetext" style="padding:10px 0;">No active issues or blocking fixes. This site is pass-ready. 🎉</p>';
  window.__fixes = fixList;

  const delta = s.regression && !s.regression.first_run ? s.regression.score_delta : null;
  const deltaLine = delta===null ? '' : '<div class="mono '+(delta>0?'s-good':'s-bad')+'" style="font-size:12px;font-weight:700;margin-top:4px;">'+(delta===0?'±0':(delta>0?'▲ +':'▼ ')+delta)+' vs previous</div>';

  const seo = s.seo ? '<div class="card pad"><div class="label">SEO Audit Details</div>'
    +'<div style="display:flex;flex-direction:column;gap:12px;">'
      +'<div><b>Page Title:</b> <span class="mono" style="font-size:13px;color:var(--ink-soft);">'+esc(s.seo.checks.title)+'</span> <span class="subtle">('+s.seo.checks.title_length+' chars)</span></div>'
      +'<div><b>Meta Description:</b> <p class="mutetext" style="font-size:13.5px;margin-top:4px;white-space:pre-wrap;">'+esc(s.seo.checks.meta_description)+'</p> <span class="subtle">('+s.seo.checks.meta_description_length+' chars)</span></div>'
      +'<div style="border-top:1px dashed var(--line);padding-top:12px;margin-top:4px;">'
        +'<div class="label" style="margin-bottom:6px;color:var(--pass);">Improved metadata suggestions</div>'
        +'<div><b>Suggested Title:</b> <span class="mono" style="font-size:13px;color:var(--pass);font-weight:600;">'+esc(s.seo.improved.title)+'</span></div>'
        +'<div style="margin-top:6px;"><b>Suggested Description:</b> <p class="mutetext" style="font-size:13.5px;margin-top:4px;color:var(--pass);white-space:pre-wrap;">'+esc(s.seo.improved.meta_description)+'</p></div>'
      +'</div></div></div>' : '';

  const axe = s.axe && s.axe.length ? '<div class="card pad"><div class="label">axe-core accessibility issues ('+s.axe.length+')</div>'
    +'<div style="display:grid;gap:8px;font-size:13px;">'+s.axe.map(v=>'<div style="background:var(--paper);padding:8px 12px;border-radius:8px;"><b>'+esc(v.id)+'</b> ('+v.impact+')<div class="mutetext" style="margin-top:2px;">'+esc(v.description)+' — '+v.affected_nodes+' element(s)</div></div>').join('')+'</div></div>' : '';

  return '<div class="card"><div class="banner-bar" style="background:'+scoreColor(s.score)+';"></div>'
    +'<div class="pad reportrow"><div><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;"><h2 class="site-title">'+esc(s.name)+'</h2>'+vChip(s.verdict,true)+'</div>'
      +'<div class="mutetext" style="font-size:13px;margin-top:4px;">'+esc(s.portal)+' · <a class="mono" style="font-size:12px;" href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.url)+'</a></div>'
      +'<div style="color:'+scoreColor(s.score)+';font-weight:600;font-size:14px;margin-top:8px;">'+esc(s.reason)+'</div></div>'
      +'<div style="text-align:right;">'+picker+'<div class="label" style="margin:10px 0 2px;">Weighted score</div><span class="bignum '+scoreClass(s.score)+'" style="font-size:44px;">'+(s.score??'—')+'</span>'+deltaLine+'</div></div></div>'
    +'<div class="grid g2"><div class="card pad"><div class="label">Conversion · registration path</div><ul class="checklist">'+ctaItems+'</ul></div>'
      +'<div class="card pad"><div class="label">Conversion · analytics &amp; tracking</div><ul class="checklist">'+anaItems+'</ul></div></div>'
    +agentCardsHtml
    +'<div class="card pad"><div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px;"><div class="label" style="margin:0;">Ready-to-paste fixes · blocking first</div><span style="font-size:12px;color:var(--faint);">paste into Claude Code or Lovable</span></div>'+fixHtml+'</div>'
    +seo+axe;
}
function copyFix(i,btn){
  const text=(window.__fixes[i]||{}).prompt||'';
  const done=()=>{btn.classList.add('done');btn.textContent='✓ Copied';setTimeout(()=>{btn.classList.remove('done');btn.textContent='⧉ Copy prompt';},1600);};
  navigator.clipboard.writeText(text).then(done).catch(()=>{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();done();});
}
async function deleteSite(url){
  if(!confirm('Delete all run data for '+url+'?')) return;
  try {
    const res = await fetch(getApiUrl('/api/delete'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if(!res.ok){
      const err = await res.json();
      throw new Error(err.message || 'Deletion failed');
    }
    DATA = await res.json();
    current = DATA.sites[0] || null;
    initDashboard();
    show('leadership');
  } catch(err){
    alert('Error: '+err.message);
  }
}

/* ---------------- Methodology ---------------- */
function renderMethod(){
  const w=DATA.method.weights, t=DATA.method.reviewThreshold;
  const wcard=(pct,label,desc)=>'<div class="wcard"><div class="wpct">'+pct+'%</div><div style="font-family:var(--display);font-weight:600;margin:2px 0 6px;">'+label+'</div><div class="mutetext" style="font-size:12px;">'+desc+'</div></div>';
  return '<h2 class="method-h">How the scorecard works</h2>'
    +'<p class="mutetext" style="max-width:760px;">Every microsite runs through one shared browser capture that feeds three review agents plus a set of deterministic business checks. The principle throughout: <b>machine-checkable facts can block a launch; opinions cannot.</b> Anything a human could reasonably disagree with is advisory or escalates to review — it never blocks automatically.</p>'
    +'<div class="card pad"><div class="label">The weighted score</div><p class="mutetext" style="margin-bottom:14px;">Each agent returns a 0–100 score. The headline number is their weighted average:</p>'
      +'<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));">'
      +wcard(w.design,'Design QA','Layout, typography, spacing, hierarchy, consistency, responsive integrity, visual accessibility')
      +wcard(w.brand,'Brand Compliance','Palette &amp; font adherence, logo usage, accent discipline, required elements, tone of voice')
      +wcard(w.seo,'SEO Audit','Title/meta quality, structured data, headings, alt coverage, search-intent alignment')
      +'</div><p class="mutetext" style="margin-top:14px;font-size:13px;">Design carries the most weight because layout and hierarchy problems are what a visitor notices first and what most undermines a premium B2B impression. Brand is weighted close behind — brand drift across portals is the governance problem this system exists to measure. SEO is weighted lowest because its issues are real but rarely launch-blocking.</p></div>'

    +'<div class="card pad"><div class="label">Verdict tiers</div>'
      +'<div style="display:grid;gap:12px;">'
      +'<div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;">'+vChip('BLOCK')+'<div class="mutetext" style="flex:1;min-width:240px;font-size:13px;"><b>Deterministic failures only.</b> A critical conversion issue (no registration/invite CTA, a dead CTA, or missing GA4/GTM) or a critical/serious axe-core accessibility violation. Nobody argues with axe-core or a 404 — that is why only these block.</div></div>'
      +'<div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;">'+vChip('NEEDS_HUMAN_REVIEW')+'<div class="mutetext" style="flex:1;min-width:240px;font-size:13px;">An agent flagged a critical <i>judgment</i> finding, or the weighted score is below '+t+'. Escalates to a person rather than blocking automatically.</div></div>'
      +'<div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;">'+vChip('PASS')+'<div class="mutetext" style="flex:1;min-width:240px;font-size:13px;">No blocking issues and score at or above '+t+'. Ships with an advisory score and fix list.</div></div>'
      +'</div><p class="mutetext" style="margin-top:12px;font-size:13px;">An LLM judgment on its own <b>never</b> blocks a deploy — the first time it is wrong on a launch, trust in the whole gate is gone. That authority is reserved for checks that are binary and reproducible.</p></div>'

    +'<div class="grid gagents">'
      +'<div class="card pad"><div class="label">Blocks (deterministic)</div><ul class="checklist" style="font-size:13px;">'
        +['No registration / invite CTA found','Dead CTA (empty href, "#", or 4xx/5xx)','Missing GA4 / Google Tag Manager','axe-core critical or serious WCAG failure'].map(x=>'<li class="fail">'+x+'</li>').join('')+'</ul></div>'
      +'<div class="card pad"><div class="label">Advisory (never blocks)</div><ul class="checklist" style="font-size:13px;">'
        +['Off-palette colours &amp; non-brand fonts','Any LLM "critical" opinion → human review','Weighted score below '+t+' → human review','Lighthouse performance, however low','Tone-of-voice &amp; messaging'].map(x=>'<li style="color:var(--muted);">• '+x+'</li>').join('')+'</ul></div>'
      +'<div class="card pad"><div class="label">Two layers per agent</div><p class="mutetext" style="font-size:13px;"><b>Deterministic</b> — measured facts: axe-core scan, rendered-CSS token counts, meta-tag lengths, tag detection.</p><p class="mutetext" style="font-size:13px;margin-top:8px;"><b>Judgment</b> — an LLM reviews screenshots and HTML for what only a designer\\u2019s eye catches. Advisory only.</p></div>'
      +'</div>'

    +'<div class="grid gagents">'
      +'<div class="card pad"><div class="label">Brand Health Index</div><p class="mutetext" style="font-size:13px;">The mean weighted score across every reviewed microsite, tracked over time — turning brand drift from an opinion into a number with a trend line.</p></div>'
      +'<div class="card pad"><div class="label">Conversion instrumentation</div><p class="mutetext" style="font-size:13px;">The revenue layer. A dead CTA or missing tag silently wastes a campaign\\u2019s ad spend and breaks attribution — invisible to the eye, so it is automated and ranks above accessibility in the block order.</p></div>'
      +'<div class="card pad"><div class="label">Regression tracking</div><p class="mutetext" style="font-size:13px;">Every review is diffed against the previous run of the same URL; a drop over 5 points or a lost PASS is flagged as a <span class="regress">▼ regression</span>.</p></div>'
      +'</div>'
    +'<p class="mutetext" style="font-size:12px;color:var(--faint);">Weights and the review threshold are configurable in core.js. Scores should be calibrated against known-good and known-bad sites before the numbers are trusted for decisions.</p>';
}

/* ---------------- tabs ---------------- */
const renderers = { leadership:renderLeadership, queue:renderQueue, report:renderReport, method:renderMethod };
function show(view){
  document.querySelectorAll('.view').forEach(v=>{ v.classList.remove('active'); v.hidden=true; });
  const el=document.getElementById('view-'+view);
  el.innerHTML = renderers[view]();
  el.classList.add('active'); el.hidden=false;
  document.querySelectorAll('.tab').forEach(t=>t.setAttribute('aria-selected', t.dataset.view===view ? 'true':'false'));
  window.scrollTo({top:0});
}
function openReport(url){ current = DATA.sites.find(s=>s.url===url) || current; show('report'); }
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>show(t.dataset.view)));
show('leadership');

document.getElementById('scanner-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const urlEl = document.getElementById('scanner-url');
  const btnEl = document.getElementById('scanner-btn');
  const statusEl = document.getElementById('scanner-status');
  const statusTextEl = document.getElementById('scanner-status-text');

  const url = urlEl.value;

  btnEl.disabled = true;
  urlEl.disabled = true;
  statusEl.style.display = 'flex';
  statusTextEl.textContent = 'Launching Playwright capture...';

  try {
    const res = await fetch(getApiUrl('/api/scan'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Scan failed');
    }

    statusTextEl.textContent = 'Updating leaderboard data...';
    const newData = await res.json();
    
    // Update data locally in DOM
    DATA = newData;
    current = DATA.sites.find(s => s.url === url) || DATA.sites[0];
    
    // Refresh DOM
    initDashboard();
    const activeTab = document.querySelector('.tab[aria-selected="true"]').dataset.view;
    show(activeTab);
    
    statusTextEl.textContent = 'Refreshed!';
    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 1500);
    urlEl.value = '';
  } catch (err) {
    statusTextEl.textContent = 'Error: ' + err.message;
    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 5000);
  } finally {
    btnEl.disabled = false;
    urlEl.disabled = false;
  }
});
</script>
</body>
</html>`;
}

// ------------------- Direct command line execution check -------------------
if (process.argv[1]?.endsWith('build-dashboard.js')) {
  buildDashboard();
}
