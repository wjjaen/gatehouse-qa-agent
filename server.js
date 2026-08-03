// server.js — Express API server for the Gatehouse QA Dashboard.
// Runs locally (node server.js) or on Railway for live scan/delete support.
//
//   Local:   node server.js           → http://localhost:3000
//   Railway: starts via "npm start"   → https://<your-app>.up.railway.app

import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { reviewSite } from './core.js';
import { buildDashboard } from './build-dashboard.js';

const app = express();
const PORT = process.env.PORT || 3000;

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

// ── POST /api/scan ────────────────────────────────────────────────────────────
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

// ── POST /api/delete ──────────────────────────────────────────────────────────
app.post('/api/delete', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL is required' });

  try {
    console.log(`[Server] Request to delete site: ${url}`);
    const RUNS_DIR = 'runs';
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
