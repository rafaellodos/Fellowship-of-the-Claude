#!/usr/bin/env bash
# setup.sh — Fellowship one-time setup
# Run once from the fellowship root: bash setup.sh
set -euo pipefail

FELLOWSHIP_DIR="$(cd "$(dirname "$0")" && pwd)"
SETTINGS="$HOME/.claude/settings.json"
MCP_FILE="$HOME/.claude/.mcp.json"
LOG_DIR="$FELLOWSHIP_DIR/hooks/logs"

# ── Colours ───────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
ok()   { echo -e "${GREEN}✓${NC} $*"; }
warn() { echo -e "${YELLOW}⚠${NC}  $*"; }
fail() { echo -e "${RED}✗${NC} $*"; }

echo ""
echo "Fellowship — Setup"
echo "=================="
echo ""

# ── 0. Prerequisites check ────────────────────────────────────────────────────
echo "Checking prerequisites..."

has_node=false; has_npm=false; has_uv=false; has_python=false; has_claude=false

command -v node    &>/dev/null && has_node=true    && ok "node $(node --version)"    || warn "node not found — some features disabled"
command -v npm     &>/dev/null && has_npm=true     && ok "npm $(npm --version)"      || warn "npm not found"
command -v uv      &>/dev/null && has_uv=true      && ok "uv $(uv --version 2>&1 | head -1)"   || warn "uv not found — graphify install skipped"
command -v python3 &>/dev/null && has_python=true  && ok "python3 $(python3 --version 2>&1)"   || warn "python3 not found"
command -v claude  &>/dev/null && has_claude=true  && ok "claude code detected"     || warn "claude CLI not found — reflections disabled"
echo ""

# ── 1. Create directories ─────────────────────────────────────────────────────
mkdir -p "$LOG_DIR"
ok "logs directory: $LOG_DIR"
mkdir -p "$FELLOWSHIP_DIR/workspace/inbox"
ok "inbox directory: $FELLOWSHIP_DIR/workspace/inbox"
echo ""

# ── 2. qmd semantic search ────────────────────────────────────────────────────
echo "── qmd semantic search ──────────────────"
if $has_npm; then
  echo "  Installing @tobilu/qmd..."
  npm install -g @tobilu/qmd 2>&1 | tail -2
  ok "qmd installed"

  echo "  Indexing fellowship files..."
  qmd collection add "$FELLOWSHIP_DIR" --name fellowship --mask "**/*.md" 2>&1 | tail -3 || warn "qmd indexing failed — run manually: qmd collection add . --name fellowship"
  qmd context add qmd://fellowship/ "The Fellowship — agent identities, workspace contexts, core system docs, skill specs, and memory" 2>/dev/null || true
  ok "fellowship collection indexed"

  # Register qmd MCP server
  if [ -f "$MCP_FILE" ]; then
    python3 - <<PYEOF
import json, sys
try:
    with open('$MCP_FILE') as f:
        config = json.load(f)
    config.setdefault('mcpServers', {})['qmd'] = {'command': 'qmd', 'args': ['mcp']}
    with open('$MCP_FILE', 'w') as f:
        json.dump(config, f, indent=2)
    print("  Updated existing .mcp.json")
except Exception as e:
    print(f"  Warning: could not update .mcp.json: {e}")
PYEOF
  else
    mkdir -p "$HOME/.claude"
    echo '{"mcpServers":{"qmd":{"command":"qmd","args":["mcp"]}}}' > "$MCP_FILE"
  fi
  ok "qmd MCP server registered at ~/.claude/.mcp.json"

  echo ""
  warn "Run 'qmd embed' to generate semantic vectors (downloads ~500MB, one-time)"
else
  warn "Skipping qmd — npm not found"
fi
echo ""

# ── 3. graphify knowledge graph ───────────────────────────────────────────────
echo "── graphify knowledge graph ─────────────"
if $has_uv; then
  echo "  Installing graphifyy..."
  uv tool install graphifyy --with openai 2>&1 | tail -3 || { warn "graphify install failed — try: uv tool install graphifyy --with openai"; }
  graphify install 2>&1 | tail -3 || true
  ok "graphify installed and registered as /graphify skill"
elif $has_python; then
  echo "  Installing graphifyy via pip..."
  pip3 install graphifyy openai -q 2>&1 | tail -3 || warn "graphify pip install failed"
  graphify install 2>&1 | tail -3 || true
  ok "graphify installed"
else
  warn "Skipping graphify — neither uv nor python3 found"
fi
echo ""

# ── 4. Obsidian skills ────────────────────────────────────────────────────────
echo "── Obsidian skills ──────────────────────"
SKILLS_DIR="$HOME/.claude/skills"
mkdir -p "$SKILLS_DIR"

TMP_SKILLS=$(mktemp -d)
echo "  Cloning kepano/obsidian-skills..."
git clone --depth=1 --quiet https://github.com/kepano/obsidian-skills "$TMP_SKILLS" 2>&1 || {
  warn "Could not clone obsidian-skills — skipping"
}

if [ -d "$TMP_SKILLS/skills" ]; then
  for skill in obsidian-markdown obsidian-cli obsidian-bases json-canvas defuddle; do
    if [ -d "$TMP_SKILLS/skills/$skill" ]; then
      mkdir -p "$SKILLS_DIR/$skill"
      cp -r "$TMP_SKILLS/skills/$skill/." "$SKILLS_DIR/$skill/"
    fi
  done
  ok "5 Obsidian skills installed to ~/.claude/skills/"
fi
rm -rf "$TMP_SKILLS"
echo ""

# ── 5. Fellowship session hooks ───────────────────────────────────────────────
echo "── Session hooks ────────────────────────"
HOOK_CMD="node $FELLOWSHIP_DIR/hooks/fellowship-hook.js"

RAW_HOOK_CMD="node $FELLOWSHIP_DIR/hooks/raw-detector-hook.js"

if $has_node && [ -f "$SETTINGS" ] && $has_python; then
  python3 - <<PYEOF
import json

settings_path = '$SETTINGS'
hook_cmd      = '$HOOK_CMD'
raw_hook_cmd  = '$RAW_HOOK_CMD'

try:
    with open(settings_path) as f:
        s = json.load(f)

    # Standard hooks (session_start / stop / heartbeat)
    events = {
        'SessionStart': f'{hook_cmd} session_start',
        'Stop':         f'{hook_cmd} stop',
        'PostToolUse':  f'{hook_cmd} heartbeat',
    }

    s.setdefault('hooks', {})
    installed = []
    skipped   = []

    for event, cmd in events.items():
        entries = s['hooks'].setdefault(event, [])
        already = any(
            h.get('command', '').strip() == cmd.strip()
            for entry in entries
            for h in entry.get('hooks', [])
        )
        if already:
            skipped.append(event)
            continue
        if not entries:
            entries.append({'hooks': []})
        entries[0].setdefault('hooks', []).append({'type': 'command', 'command': cmd})
        installed.append(event)

    # UserPromptSubmit — raw paste detector (async, never blocks)
    event   = 'UserPromptSubmit'
    entries = s['hooks'].setdefault(event, [])
    already = any(
        h.get('command', '').strip() == raw_hook_cmd.strip()
        for entry in entries
        for h in entry.get('hooks', [])
    )
    if not already:
        if not entries:
            entries.append({'hooks': []})
        entries[0].setdefault('hooks', []).append({
            'type':    'command',
            'command': raw_hook_cmd,
            'async':   True,
        })
        installed.append(event)
    else:
        skipped.append(event)

    with open(settings_path, 'w') as f:
        json.dump(s, f, indent=2)

    if installed:
        print(f"  Hooks registered: {', '.join(installed)}")
    if skipped:
        print(f"  Already present: {', '.join(skipped)}")

except Exception as e:
    print(f"  Warning: could not update settings.json: {e}")
    print(f"  Add hooks manually — see SETUP.md")
PYEOF
  ok "Fellowship hooks registered in ~/.claude/settings.json"
elif ! $has_node; then
  warn "Skipping hooks — node not found"
elif [ ! -f "$SETTINGS" ]; then
  warn "~/.claude/settings.json not found — open Claude Code first, then re-run setup.sh"
else
  warn "Skipping hooks — python3 needed to update settings.json safely"
fi
echo ""

# ── 6. Automated reflections (macOS only) ─────────────────────────────────────
echo "── Automated reflections ────────────────"
if [[ "$(uname -s)" == "Darwin" ]] && $has_claude; then
  LAUNCHD_SRC="$FELLOWSHIP_DIR/hooks/launchd"
  LAUNCHD_DST="$HOME/Library/LaunchAgents"
  mkdir -p "$LAUNCHD_DST"

  for plist_template in "$LAUNCHD_SRC"/*.plist; do
    name=$(basename "$plist_template")
    dest="$LAUNCHD_DST/$name"
    sed "s|FELLOWSHIP_DIR|$FELLOWSHIP_DIR|g" "$plist_template" > "$dest"
    launchctl unload "$dest" 2>/dev/null || true
    launchctl load   "$dest" 2>/dev/null && ok "$name loaded" || warn "Could not load $name — check launchd permissions"
  done
elif [[ "$(uname -s)" != "Darwin" ]]; then
  warn "Automated reflections: macOS only (launchd). Linux users: add a crontab entry:"
  echo "        0 7 * * 1 cd $FELLOWSHIP_DIR && cat hooks/prompts/weekly-reflection.md | claude --print"
  echo "        0 7 1 * * cd $FELLOWSHIP_DIR && cat hooks/prompts/monthly-reflection.md | claude --print"
elif ! $has_claude; then
  warn "claude CLI not found — skipping automated reflections"
fi
echo ""

# ── Done ──────────────────────────────────────────────────────────────────────
echo "================================================"
echo -e "${GREEN}Fellowship setup complete.${NC}"
echo ""
echo "Next steps:"
echo "  1. Run 'qmd embed' to enable semantic search"
echo "     (downloads ~500MB of models, one-time)"
echo ""
echo "  2. Open Claude Code in this folder:"
echo "     cd $FELLOWSHIP_DIR && claude"
echo ""
echo "  3. If this is your first time, Gandalf will run"
echo "     the intake session automatically."
echo "================================================"
echo ""
