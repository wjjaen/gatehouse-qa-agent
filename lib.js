// lib.js — Shared helpers used by the orchestrator and all agents.

import fs from 'node:fs';

export const MODEL = 'claude-sonnet-4-6';

export const b64 = (file) => fs.readFileSync(file).toString('base64');

// Build the labelled image blocks for one viewport. capture.js slices each
// full-page screenshot into top-to-bottom tiles so the API's 1568px long-edge
// resize doesn't squash a 7600px-tall page into an unreadable sliver; label
// each tile with its position so the agent knows what it's looking at.
// Falls back to the single full-page shot if no tiles were produced.
export function screenshotBlocks(label, tiles, fallbackShot) {
  const paths = tiles?.length ? tiles : [fallbackShot];
  return paths.flatMap((file, i) => [
    {
      type: 'text',
      text: paths.length > 1
        ? `${label} — section ${i + 1} of ${paths.length}, top to bottom:`
        : `${label}:`,
    },
    { type: 'image', source: { type: 'base64', media_type: 'image/png', data: b64(file) } },
  ]);
}

export function parseJsonResponse(text) {
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/, '')
    .trim();
  return JSON.parse(cleaned);
}

// Calls Claude and expects a raw-JSON reply. Returns { raw, json }.
// Throws with .raw attached if the reply is not parseable JSON.
export async function callClaudeJSON(client, { system, content, maxTokens = 4000 }) {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content }],
  });
  const raw = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n');
  try {
    return { raw, json: parseJsonResponse(raw) };
  } catch (err) {
    const e = new Error('Model response was not valid JSON');
    e.raw = raw;
    throw e;
  }
}

export function summarizeAxe(axe) {
  return axe.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    affected_nodes: v.nodes.length,
    example_target: v.nodes[0]?.target?.join(' ') ?? null,
  }));
}
