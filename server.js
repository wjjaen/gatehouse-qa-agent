// server.js — Express API server for the Gatehouse QA Dashboard.
// Runs locally (node server.js) or on Railway for live scan/delete support.
//
//   Local:   node server.js           → http://localhost:3000
//   Railway: starts via "npm start"   → https://<your-app>.up.railway.app

import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import Anthropic from '@anthropic-ai/sdk';
import { reviewSite } from './core.js';
import { buildDashboard } from './build-dashboard.js';
import { loadRunContext, buildSystem, streamReply, CHAT_MODEL } from './chat.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ── Persistent data dir ─────────────────────────────────────────────────────
// On Render, DATA_DIR points at a mounted disk so runs/ and history/ survive
// restarts instead of resetting to whatever's committed in git. The first
// time the disk is used it's empty, so seed it from the repo's own committed
// runs/history once — after that the disk is the source of truth and this
// is a no-op.
const DATA_DIR = process.env.DATA_DIR || '.';
if (DATA_DIR !== '.') {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const seedRuns = path.join(DATA_DIR, 'runs');
  const seedHistoryDir = path.join(DATA_DIR, 'history');
  if (!fs.existsSync(seedRuns) && fs.existsSync('runs')) {
    console.log(`[Server] Seeding ${seedRuns} from committed runs/`);
    fs.cpSync('runs', seedRuns, { recursive: true });
  }
  if (!fs.existsSync(seedHistoryDir) && fs.existsSync('history')) {
    console.log(`[Server] Seeding ${seedHistoryDir} from committed history/`);
    fs.cpSync('history', seedHistoryDir, { recursive: true });
  }
}

// ── CORS ─────────────────────────────────────────────────────────────────────
// Allow requests from the Bluehost static site and local dev environments.
const ALLOWED_ORIGINS = [
  'https://jamesportfolio.site',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || ALLOWED_ORIGINS.includes(origin) || origin?.startsWith('file://')) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());

// Serve the static dashboard (when accessing via localhost:3000 directly)
app.use(express.static('dashboard'));

// ── GET /api/data ─────────────────────────────────────────────────────────────
// Returns the latest dashboard data as JSON so the static Bluehost page can
// always display fresh scan results without needing an FTP re-upload.
app.get('/api/data', async (req, res) => {
  try {
    const data = await buildDashboard();
    res.json(data);
  } catch (err) {
    console.error('[Server] Failed to build dashboard data:', err);
    res.status(500).json({ message: err.message });
  }
});

// ── Background scan jobs ──────────────────────────────────────────────────────
// A scan takes minutes, which is far too long to hold an HTTP connection open —
// the browser sat on one fetch with no progress and no way to recover if the
// connection dropped. Instead POST /api/scan/start returns a job id straight
// away and the client polls /api/scan/status/:jobId for the current stage.
//
// Jobs live in memory on purpose: there is one instance, and a scan does not
// outlive it. A restart mid-scan loses the job, and polling then 404s — which
// the client reports rather than hanging forever.
const jobs = new Map();
const JOB_TTL_MS = 30 * 60 * 1000;

function runScanJob(jobId, url, portal) {
  const job = jobs.get(jobId);
  const setStage = (stage) => {
    const j = jobs.get(jobId);
    if (j) j.stage = stage;
  };

  (async () => {
    try {
      console.log(`[Server] Job ${jobId}: QA scan for ${url} (Portal: ${portal || 'None'})`);
      await reviewSite(url, {
        brandPath: 'brand/example-portal.json',
        portal: portal || null,
        agents: ['design', 'brand', 'seo'],
        skipPerf: true,
        onProgress: setStage,
      });

      setStage('Rebuilding leaderboard');
      job.result = await buildDashboard();
      job.status = 'done';
      job.stage = 'Complete';
      console.log(`[Server] Job ${jobId}: complete`);
    } catch (err) {
      console.error(`[Server] Job ${jobId} failed:`, err);
      job.status = 'error';
      job.message = err.message;
    } finally {
      job.finishedAt = Date.now();
      setTimeout(() => jobs.delete(jobId), JOB_TTL_MS).unref?.();
    }
  })();
}

// ── POST /api/scan/start ──────────────────────────────────────────────────────
app.post('/api/scan/start', (req, res) => {
  const { url, portal } = req.body;
  if (!url) return res.status(400).json({ message: 'URL is required' });

  const jobId = randomUUID();
  jobs.set(jobId, { status: 'running', stage: 'Starting scan', startedAt: Date.now() });
  runScanJob(jobId, url, portal);
  res.status(202).json({ jobId });
});

// ── GET /api/scan/status/:jobId ───────────────────────────────────────────────
app.get('/api/scan/status/:jobId', (req, res) => {
  const job = jobs.get(req.params.jobId);
  if (!job) return res.status(404).json({ message: 'Unknown or expired job' });

  res.json({
    status: job.status,
    stage: job.stage,
    elapsedMs: (job.finishedAt ?? Date.now()) - job.startedAt,
    ...(job.status === 'done' ? { result: job.result } : {}),
    ...(job.status === 'error' ? { message: job.message } : {}),
  });
});

// ── POST /api/scan ────────────────────────────────────────────────────────────
// Legacy blocking scan, kept so an un-updated dashboard build keeps working.
// Safe to delete once every client is on /api/scan/start.
app.post('/api/scan', async (req, res) => {
  const { url, portal } = req.body;
  if (!url) return res.status(400).json({ message: 'URL is required' });

  try {
    console.log(`[Server] Triggering QA scan for: ${url} (Portal: ${portal || 'None'})`);
    await reviewSite(url, {
      brandPath: 'brand/example-portal.json',
      portal: portal || null,
      agents: ['design', 'brand', 'seo'],
      skipPerf: true,
    });

    console.log('[Server] Scan complete. Rebuilding dashboard data...');
    const newData = await buildDashboard();
    res.json(newData);
  } catch (err) {
    console.error('[Server] Audit scan failed:', err);
    res.status(500).json({ message: err.message });
  }
});

// ── POST /api/chat ────────────────────────────────────────────────────────────
// Grounded chat over one scan. Streams over SSE rather than using the job/poll
// pattern the scans use: a reply takes seconds, not minutes, and text appearing
// as it generates is the whole point.
//
// Stateless by design — the client sends the full message history each turn
// along with the run id, and the server rebuilds the grounding from disk. No
// session store, nothing to expire, and it survives a restart mid-conversation.
app.post('/api/chat', async (req, res) => {
  const { run, messages, mode } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ message: 'Chat unavailable — no API key configured on the server.' });
  }
  if (!run) return res.status(400).json({ message: 'run is required' });
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ message: 'messages is required' });
  }

  let ctx;
  try {
    ctx = loadRunContext(run);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }

  // Headers must go out before the first token, and nothing may buffer in
  // between, or the stream arrives as one lump at the end.
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  const send = (payload) => res.write(`data: ${JSON.stringify(payload)}\n\n`);

  try {
    const client = new Anthropic();
    const { usage, followups } = await streamReply(client, {
      system: buildSystem(ctx, mode),
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      onDelta: (text) => send({ type: 'delta', text }),
    });

    if (followups.length) send({ type: 'followups', items: followups });

    console.log(
      `[Server] Chat (${mode || 'chat'}) on ${ctx.url} — ` +
      `in ${usage.input_tokens} / cached ${usage.cache_read_input_tokens ?? 0} / out ${usage.output_tokens}`
    );
    send({ type: 'done' });
  } catch (err) {
    console.error('[Server] Chat failed:', err);
    // The stream is already open, so the error has to travel as an event —
    // an HTTP status code is no longer available to us here. Send something a
    // marketer can act on and keep the provider's raw JSON in the server log.
    const friendly = err.status === 401
      ? 'The server\'s API key was rejected — it may have expired.'
      : err.status === 429
        ? 'Rate limited by the API. Wait a moment and try again.'
        : 'The assistant failed to respond. Check the service logs.';
    send({ type: 'error', message: friendly });
  } finally {
    res.end();
  }
});

// ── POST /api/delete ──────────────────────────────────────────────────────────
app.post('/api/delete', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL is required' });

  try {
    console.log(`[Server] Request to delete site: ${url}`);
    const RUNS_DIR = path.join(DATA_DIR, 'runs');
    if (fs.existsSync(RUNS_DIR)) {
      for (const d of fs.readdirSync(RUNS_DIR)) {
        const reportPath = path.join(RUNS_DIR, d, 'report.json');
        if (fs.existsSync(reportPath)) {
          const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
          if (report.url === url) {
            console.log(`[Server] Deleting run: ${path.join(RUNS_DIR, d)}`);
            fs.rmSync(path.join(RUNS_DIR, d), { recursive: true, force: true });
          }
        }
      }
    }

    console.log('[Server] Deletion complete. Rebuilding dashboard data...');
    const newData = await buildDashboard();
    res.json(newData);
  } catch (err) {
    console.error('[Server] Deletion failed:', err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n===============================================================`);
  console.log(`Gatehouse QA Dashboard running at http://localhost:${PORT}`);
  console.log(`===============================================================\n`);
});
