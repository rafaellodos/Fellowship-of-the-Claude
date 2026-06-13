#!/usr/bin/env node
/**
 * neural-learning.js
 * Reads Aragorn session history and agent signal entries.
 * Surfaces calibration candidates and inactive agents.
 *
 * Aragorn-only — no external database required.
 *
 * Usage:
 *   node hooks/neural-learning.js [--period week|month]
 *
 * Output goes to stdout. Intended to be read by Gandalf during
 * session close or weekly reflection.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const HOOK_DIR       = path.dirname(__filename);
const FELLOWSHIP_DIR = path.dirname(HOOK_DIR);
const ARAGORN        = path.join(FELLOWSHIP_DIR, 'memory', 'Aragorn', 'active.md');

const PERIOD_ARG = process.argv.includes('--period')
  ? process.argv[process.argv.indexOf('--period') + 1]
  : 'week';

const DAYS = PERIOD_ARG === 'month' ? 30 : 7;

const AGENTS = [
  'Gandalf', 'Harvey', 'Rick', 'Chinaski', 'Archer',
  'The Wolf', 'Mr. Robot', 'Morty', 'Socrates', 'Donna',
  'Killua', 'Merry', 'Pippin', 'Pablo', 'Meeseeks',
];

process.on('uncaughtException', e => {
  console.log(`[neural-learning] error: ${e.message}`);
  process.exit(0);
});

function read(p) { try { return fs.readFileSync(p, 'utf8'); } catch { return ''; } }

const aragorn = read(ARAGORN);
if (!aragorn) {
  console.log('[neural-learning] Aragorn file not found — no data to analyse.');
  process.exit(0);
}

const cutoff = new Date();
cutoff.setDate(cutoff.getDate() - DAYS);

// ── Parse signal entries ─────────────────────────────────────────────────────

const signalPattern = /^## SIGNAL (\d{4}-\d{2}-\d{2}) (\w[\w\s]*?)\s*\n([\s\S]*?)(?=\n## |\n---\s*$|$)/gm;
const signals = [];
let m;
while ((m = signalPattern.exec(aragorn)) !== null) {
  const date = new Date(m[1]);
  if (date >= cutoff) {
    const agentName = m[2].trim();
    const body      = m[3].trim();
    const outcome   = body.match(/Outcome:\s*(\w+)/i)?.[1]?.toLowerCase() || 'unknown';
    signals.push({ date: m[1], agent: agentName, outcome, body });
  }
}

// ── Parse session entries for agent mentions ─────────────────────────────────

const sessionPattern = /^## SESSION[^\n]*(\d{4}-\d{2}-\d{2})[^\n]*\n([\s\S]*?)(?=\n## SESSION|\n---\s*$|$)/gm;
const agentSessions = {};

while ((m = sessionPattern.exec(aragorn)) !== null) {
  const date = new Date(m[1]);
  if (date < cutoff) continue;
  const body = m[2];
  for (const agent of AGENTS) {
    if (body.includes(agent)) {
      agentSessions[agent] = (agentSessions[agent] || 0) + 1;
    }
  }
}

// ── Analysis ─────────────────────────────────────────────────────────────────

const agentSignals = {};
for (const sig of signals) {
  if (!agentSignals[sig.agent]) agentSignals[sig.agent] = { total: 0, corrections: 0, accepted: 0 };
  agentSignals[sig.agent].total++;
  if (sig.outcome === 'corrected') agentSignals[sig.agent].corrections++;
  if (sig.outcome === 'accepted')  agentSignals[sig.agent].accepted++;
}

const calibrationCandidates = Object.entries(agentSignals)
  .filter(([, s]) => s.corrections >= 2 || s.total >= 3)
  .sort((a, b) => b[1].corrections - a[1].corrections);

const activeAgents   = new Set([...Object.keys(agentSignals), ...Object.keys(agentSessions)]);
const inactiveAgents = AGENTS.filter(a => !activeAgents.has(a));

// ── Report ───────────────────────────────────────────────────────────────────

const period = PERIOD_ARG === 'month' ? 'last 30 days' : 'last 7 days';
console.log(`\n== NEURAL LEARNING REPORT (${period}) ==\n`);

console.log(`Signals parsed: ${signals.length}`);
console.log(`Agent sessions: ${Object.keys(agentSessions).length} agents active\n`);

if (calibrationCandidates.length > 0) {
  console.log('CALIBRATION CANDIDATES:');
  for (const [agent, s] of calibrationCandidates) {
    console.log(`  ${agent}: ${s.total} signal(s), ${s.corrections} correction(s), ${s.accepted} accepted`);
  }
  console.log('  → Review these agents\' recent outputs. Consider updating their identities file.\n');
} else {
  console.log('Calibration: no agents flagged (threshold: 2+ corrections OR 3+ signals)\n');
}

if (Object.keys(agentSessions).length > 0) {
  console.log('AGENT ACTIVITY:');
  for (const [agent, count] of Object.entries(agentSessions).sort((a, b) => b[1] - a[1])) {
    const sigs = agentSignals[agent];
    const sigStr = sigs ? ` | ${sigs.total} signal(s)` : '';
    console.log(`  ${agent}: ${count} session(s)${sigStr}`);
  }
  console.log('');
}

if (inactiveAgents.length > 0) {
  console.log(`INACTIVE AGENTS (no ${period} activity):`);
  console.log(`  ${inactiveAgents.join(', ')}\n`);
}

// Open threads
const lastSession = aragorn.match(/## SESSION[\s\S]*?Open threads?:\s*\n([\s\S]*?)(?=\n## |\n---\s*$|$)/g);
if (lastSession) {
  const last = lastSession[lastSession.length - 1];
  const threads = last.match(/Open threads?:\s*\n([\s\S]*?)(?=\n[A-Z][a-z]|\n##|$)/i)?.[1]?.trim();
  if (threads && threads !== '-' && !threads.toLowerCase().includes('none')) {
    console.log('OPEN THREADS (from last session):');
    console.log(threads.split('\n').map(l => `  ${l}`).join('\n'));
    console.log('');
  }
}

console.log('== END NEURAL REPORT ==\n');
