// agent.js — Single-site CLI over the orchestrator.
// Usage:
//   node agent.js <staging-url> [--brand brand/x.json] [--portal "Name"]
//                 [--agents design,brand,seo] [--skip-perf]
// Default runs all three gate agents on one shared capture pass.

import { reviewSite } from './core.js';

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
if (!url) {
  console.error('Usage: node agent.js <staging-url> [--brand path.json] [--portal "Name"] [--agents design,brand,seo] [--skip-perf]');
  process.exit(1);
}
const flag = (name) => {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : undefined;
};

reviewSite(url, {
  brandPath: flag('--brand') ?? 'brand/example-portal.json',
  portal: flag('--portal') ?? null,
  agents: (flag('--agents') ?? 'design,brand,seo').split(',').map((s) => s.trim()),
  skipPerf: args.includes('--skip-perf'),
}).catch((err) => {
  console.error('Agent failed:', err.message);
  process.exit(1);
});
