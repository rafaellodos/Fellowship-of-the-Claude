#!/usr/bin/env node
/**
 * fellowship-hook.js
 * Lightweight session automation for the Fellowship.
 * No external dependencies — pure Node.js built-ins only.
 *
 * Events: session_start | stop | heartbeat
 *
 * session_start: surfaces open threads from Aragorn, flags stale agents
 * stop:          appends session entry to Aragorn
 * heartbeat:     no-op (reserved for future use)
 *
 * Installed via setup.sh into ~/.claude/settings.json hooks.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────────────────────

const EVENT          = process.argv[2] || '';
const HOOK_DIR       = path.dirname(__filename);
const FELLOWSHIP_DIR = path.dirname(HOOK_DIR);
const ARAGORN        = path.join(FELLOWSHIP_DIR, 'memory', 'Aragorn', 'active.md');
const IDENTITIES_DIR = path.join(FELLOWSHIP_DIR, 'identities');
const STATE_FILE     = path.join(FELLOWSHIP_DIR, '.session-state.json');
const STALE_DAYS     = 14;

const AGENTS = [
  'Gandalf', 'Harvey', 'Rick', 'Chinaski', 'Archer',
  'The Wolf', 'Mr. Robot', 'Morty', 'Socrates', 'Donna',
  'Killua', 'Merry', 'Pippin', 'Pablo', 'Meeseeks',
];

// Never crash Claude Code
process.on('uncaughtException', () => process.exit(0));
process.on('unhandledRejection', () => process.exit(0));

// ── Utilities ────────────────────────────────────────────────────────────────

function read(p)         { try { return fs.readFileSync(p, 'utf8'); } catch { return ''; } }
function write(p, s)     { try { fs.writeFileSync(p, s, 'utf8'); } catch {} }
function append(p, s)    { try { fs.appendFileSync(p, s, 'utf8'); } catch {} }
function readState()     { try { return JSON.parse(read(STATE_FILE)); } catch { return {}; } }
function saveState(obj)  { write(STATE_FILE, JSON.stringify(obj, null, 2)); }

function today() {
  return new Date().toISOString().split('T')[0];
}

function timeNow() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

// ── Aragorn helpers ──────────────────────────────────────────────────────────

/**
 * Extract the most recent "Open threads:" block from Aragorn.
 */
function getOpenThreads(aragorn) {
  const blocks = [...aragorn.matchAll(/## SESSION[^\n]*\n([\s\S]*?)(?=\n## SESSION|\n---\s*$|$)/g)];
  if (!blocks.length) return null;

  const lastBlock = blocks[blocks.length - 1][1];
  const match = lastBlock.match(/Open threads?:\s*\n([\s\S]*?)(?=\n[A-Z][a-z]|\n##|$)/i);
  if (!match) return null;

  const threads = match[1].trim();
  if (!threads || threads.toLowerCase().includes('none') || threads === '-') return null;
  return threads;
}

/**
 * Find agents that haven't appeared in Aragorn for STALE_DAYS.
 */
function getStaleAgents(aragorn) {
  const cutoff  = new Date();
  cutoff.setDate(cutoff.getDate() - STALE_DAYS);

  // Get the content from sessions in the last STALE_DAYS
  const recentContent = getRecentSessionContent(aragorn, STALE_DAYS);
  if (!recentContent) return []; // no sessions yet — nothing to flag

  return AGENTS.filter(agent => !recentContent.includes(agent));
}

/**
 * Return concatenated content of SESSION blocks from the last N days.
 */
function getRecentSessionContent(aragorn, days) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const datePattern = /(\d{4}-\d{2}-\d{2})/;
  const blocks = aragorn.split(/(?=## SESSION)/);

  const recent = blocks.filter(block => {
    const m = block.match(datePattern);
    if (!m) return false;
    return new Date(m[1]) >= cutoff;
  });

  if (!recent.length) return null;
  return recent.join('\n');
}

// ── Event handlers ───────────────────────────────────────────────────────────

function onSessionStart() {
  const state = readState();
  state.startTime = Date.now();
  state.cwd       = process.cwd();
  saveState(state);

  const aragorn = read(ARAGORN);
  if (!aragorn) return;

  // Surface open threads
  const threads = getOpenThreads(aragorn);
  if (threads) {
    process.stdout.write(
      `\n[Fellowship] Open threads:\n${threads}\n\n`
    );
  }

  // Staleness check
  const stale = getStaleAgents(aragorn);
  if (stale.length > 0) {
    process.stdout.write(
      `[Fellowship] ⚠  Agents not deployed in ${STALE_DAYS}+ days: ${stale.join(', ')}\n\n`
    );
  }
}

function onStop() {
  const state       = readState();
  const startTime   = state.startTime || Date.now();
  const durationMin = Math.round((Date.now() - startTime) / 60_000);
  const cwd         = state.cwd || process.cwd();

  // Try to infer workspace from cwd path
  const wsMatch = cwd.match(/workspace[/\\]([^/\\]+)/);
  const workspace = wsMatch ? wsMatch[1] : path.basename(cwd);

  const entry = [
    ``,
    `## SESSION-CLOSE ${today()}`,
    `Workspace: ${workspace}`,
    `Duration: ${durationMin}m`,
    `Closed: ${timeNow()}`,
    `cwd: ${cwd}`,
    `Open threads:`,
    `- `,
    ``,
  ].join('\n');

  append(ARAGORN, entry);
  saveState({});
}

// ── Dispatch ─────────────────────────────────────────────────────────────────

switch (EVENT) {
  case 'session_start': onSessionStart(); break;
  case 'stop':          onStop();         break;
  case 'heartbeat':                       break; // reserved
  default:                                break;
}
