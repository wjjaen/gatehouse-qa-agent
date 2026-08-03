// lib.js — Shared helpers used by the orchestrator and all agents.

import fs from 'node:fs';

export const MODEL = 'claude-sonnet-4-6';

export const b64 = (file) => fs.readFileSync(file).toString('base64');

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
