#!/usr/bin/env node
/**
 * raw-detector-hook.js
 * UserPromptSubmit hook — detects pasted raw data and saves to workspace/inbox.
 *
 * Fires on every user message. If the message looks like a paste
 * (long, structured, not an instruction), saves to workspace/inbox/
 * as a safety net. The CLAUDE.md Pippin trigger handles in-session
 * classification and workspace routing.
 *
 * Installed via setup.sh into ~/.claude/settings.json hooks.
 * Always outputs {"continue": true} — never blocks the user's prompt.
 */

'use strict';

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const HOOK_DIR       = path.dirname(__filename);
const FELLOWSHIP_DIR = path.dirname(HOOK_DIR);
const INBOX          = path.join(FELLOWSHIP_DIR, 'workspace', 'inbox');

process.on('uncaughtException', () => {
  process.stdout.write(JSON.stringify({ continue: true }) + '\n');
  process.exit(0);
});

// Read hook input from stdin
let input = '';
try { input = fs.readFileSync('/dev/stdin', 'utf8'); } catch {}

let prompt = '';
try {
  const data = JSON.parse(input || '{}');
  prompt = data.message || data.prompt || data.user_message || data.content || '';
  if (typeof prompt !== 'string') prompt = String(prompt || '');
} catch {
  prompt = input || '';
}

// ── Detection heuristics ─────────────────────────────────────────────────────

const INSTRUCTION_STARTERS = /^(what|how|why|can you|could you|should|is |are |do |did |will |would |please|help|i want|i need|i'd like|let's|let me|show me|tell me|explain|write|build|create|make|fix|update|check|run|search|find|generate)/i;

const isLong        = prompt.length > 900;
const isInstruction = INSTRUCTION_STARTERS.test(prompt.trim());
const hasStructure  = /^#+\s|\n---\n|^\|.*\||^```|\n\n.{100}/m.test(prompt) ||
                      (prompt.match(/\n\n/g) || []).length >= 3;
const isPaste       = isLong && !isInstruction && hasStructure;

if (isPaste) {
  try {
    fs.mkdirSync(INBOX, { recursive: true });
    const date  = new Date().toISOString().split('T')[0];
    const hash  = crypto.createHash('md5').update(prompt).digest('hex').slice(0, 6);
    const title = prompt.split('\n')[0].slice(0, 50)
      .replace(/^#+\s*/, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase() || 'raw-paste';
    const filename = `${date}-${title}-${hash}.md`;
    fs.writeFileSync(path.join(INBOX, filename), prompt, 'utf8');
  } catch {}
}

// Always continue
process.stdout.write(JSON.stringify({ continue: true }) + '\n');
