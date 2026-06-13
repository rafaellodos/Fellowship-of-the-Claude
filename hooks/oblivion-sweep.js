#!/usr/bin/env node
/**
 * oblivion-sweep.js
 * Identifies Raw files older than AGE_DAYS across all workspaces.
 * Also checks workspace/inbox for unprocessed pastes.
 *
 * Prints a structured report for Gandalf to read and act on.
 * Does NOT modify files — Gandalf decides what to do with each.
 *
 * Usage:
 *   node oblivion-sweep.js [--age 7]
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const HOOK_DIR       = path.dirname(__filename);
const FELLOWSHIP_DIR = path.dirname(HOOK_DIR);
const WORKSPACE_DIR  = path.join(FELLOWSHIP_DIR, 'workspace');
const INBOX          = path.join(WORKSPACE_DIR, 'inbox');

const AGE_ARG = process.argv.includes('--age')
  ? parseInt(process.argv[process.argv.indexOf('--age') + 1]) || 7
  : 7;

process.on('uncaughtException', e => {
  console.log(`[oblivion-sweep] error: ${e.message}`);
  process.exit(0);
});

function getFilesOlderThan(dir, days) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith('.') || f.endsWith('.gitkeep')) continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isFile()) {
      const ageDays = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60 * 24);
      if (ageDays >= days) {
        let preview = '';
        try { preview = fs.readFileSync(full, 'utf8').slice(0, 200).replace(/\n/g, ' '); } catch {}
        results.push({
          file:    full,
          name:    f,
          ageDays: Math.round(ageDays),
          sizeKb:  Math.round(stat.size / 1024),
          preview,
        });
      }
    }
  }
  return results;
}

// Discover workspaces dynamically
function getWorkspaces() {
  if (!fs.existsSync(WORKSPACE_DIR)) return [];
  return fs.readdirSync(WORKSPACE_DIR).filter(d => {
    if (d.startsWith('.') || d === 'inbox') return false;
    const full = path.join(WORKSPACE_DIR, d);
    return fs.statSync(full).isDirectory();
  });
}

const workspaces = getWorkspaces();
const report = { date: new Date().toISOString().split('T')[0], ageThreshold: AGE_ARG, raw: {}, inbox: [], total: 0 };

for (const ws of workspaces) {
  const rawDir = path.join(WORKSPACE_DIR, ws, 'Oblivion', 'Raw');
  const files  = getFilesOlderThan(rawDir, AGE_ARG);
  if (files.length > 0) {
    report.raw[ws] = files;
    report.total  += files.length;
  }
}

const inboxFiles = getFilesOlderThan(INBOX, 0);
if (inboxFiles.length > 0) {
  report.inbox = inboxFiles;
  report.total += inboxFiles.length;
}

console.log(`\n== OBLIVION SWEEP REPORT (${report.date}, threshold: ${AGE_ARG} days) ==\n`);

if (report.total === 0) {
  console.log('Nothing to process. All Oblivion/Raw folders and inbox are empty or within threshold.\n');
  process.exit(0);
}

for (const [ws, files] of Object.entries(report.raw)) {
  console.log(`${ws}/Oblivion/Raw — ${files.length} file(s):`);
  for (const f of files) {
    console.log(`  [${f.ageDays}d] ${f.name} (${f.sizeKb}kb)`);
    if (f.preview) console.log(`    "${f.preview.slice(0, 120)}..."`);
  }
  console.log('');
}

if (report.inbox.length > 0) {
  console.log(`workspace/inbox — ${report.inbox.length} unprocessed paste(s):`);
  for (const f of report.inbox) {
    console.log(`  ${f.name} (${f.sizeKb}kb)`);
    if (f.preview) console.log(`    "${f.preview.slice(0, 120)}..."`);
  }
  console.log('');
}

console.log(`Total: ${report.total} items need processing.`);
console.log(`\nFor each item, determine:`);
console.log(`  → Stable knowledge → move to workspace/[ws]/Oblivion/Wiki/`);
console.log(`  → Project output   → move to workspace/[ws]/Oblivion/Output/`);
console.log(`  → Inbox paste      → classify workspace, move to Oblivion/Raw/, then Wiki/Output`);
console.log(`  → Outdated         → delete or archive\n`);
console.log('== END SWEEP REPORT ==\n');
