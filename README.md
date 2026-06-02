# The Fellowship
### A personal AI operating system for Claude Code, Codex CLI, and OpenCode

> **GitHub description:** *Personal AI OS for Claude Code, Codex CLI, and OpenCode. 15 specialist agents coordinated by a single orchestrator. 5-minute onboarding. No app, no server. Your filesystem is the brain.*

---

Most AI assistants give you one voice for every problem. The Fellowship gives you a team.

Fifteen specialists — each with a distinct mandate, a governing principle, and a documented fatal flaw — coordinated by Gandalf, a single orchestrator who knows the whole picture. You tell Gandalf what you're working on. He routes it to the right agents, manages the run, and returns something you can actually use.

The whole system lives on your local filesystem. No cloud. No database. No app. Claude Code is the runtime — the fellowship gives it structure, memory, and a team that gets more useful the longer you work with it.

**Read [EXPLAINER.md](EXPLAINER.md) first if you want to understand what this actually is before diving in.**

---

## What you get

**15 specialist agents**, each with a defined mandate, governing principle, and fatal flaw:

| Agent | What they do |
|---|---|
| Gandalf | Orchestration — routes tasks, synthesises outputs, manages the run |
| Harvey | Commercial intelligence — deals, positioning, clients, competitive |
| Rick | Builder — code, architecture, systems |
| Chinaski | Writer — copy, voice, narrative |
| Archer | Researcher — opportunity scanning, cross-domain intelligence |
| The Wolf | Financial — pricing, unit economics, whether the math works |
| Mr. Robot | Security and legal — audits, risk flags |
| Morty | Ethics gate — reviews plans before they go out |
| Socrates | Assumption interrogator — stress-tests frames before high-stakes decisions |
| Donna | Client relationships — account health, relationship risk |
| Killua | Intelligence synthesis — turns conflicting signals into decision-grade models |
| Merry | Structured input — email, calendar, CRM |
| Pippin | Unstructured input — voice notes, URLs, brain dumps |
| Pablo | Design and perception — brand, UX, visual experience |
| Meeseeks | Atomic execution — fully specified tasks, no ambiguity |

**A workspace architecture** that maps to how you actually work — each domain in your life or business gets its own folder with a three-layer memory system (Raw → Wiki → Output).

**Session memory** so Gandalf always knows where things stand when you come back.

**A skills library** covering web search, web fetch, document generation, calendar scheduling, email drafting, voice transcription, image analysis, structured reflection, and code execution.

---

## Requirements

- An AI coding assistant: [Claude Code](https://claude.ai/code), [Codex CLI](https://github.com/openai/codex), or [OpenCode](https://opencode.ai)
- A subscription or API key for your chosen assistant

That's it. No app, no server, no database. Everything runs on your local filesystem.

> **Platform note:** The entry point is named `CLAUDE.md` for Claude Code. Codex CLI users: rename it `AGENTS.md`. OpenCode users: follow your platform's project instruction convention.

---

## Setup

**1. Clone the repo**

```bash
git clone https://github.com/rafaellodos/Fellowship-of-the-Claude.git my-fellowship
cd my-fellowship
```

**2. Run setup** *(optional but recommended)*

```bash
bash setup.sh
```

This installs semantic search (qmd), the knowledge graph skill (graphify), Obsidian skills, session hooks, and automated weekly/monthly reflections. Takes a few minutes. Safe to skip and come back to later.

**3. Open your AI coding assistant**

```bash
claude        # Claude Code
codex         # Codex CLI (rename CLAUDE.md → AGENTS.md first)
opencode      # OpenCode
```

**4. Let Gandalf do the rest**

On first run, Gandalf detects the system is uninitialised and walks you through five questions. From your answers, he builds your workspace — one folder per domain, your profile, your priorities. About ten minutes.

**5. After setup**

Every session, tell Gandalf what you're working on. He routes it to the right agents.

---

## How it works

### First session — intake

Gandalf asks you five questions:

1. **Who are you?** — Name, role, what you're building
2. **Your domains** — The different areas of your life/work (2-6)
3. **What happens in each** — The kinds of work per domain
4. **Your tools** — Obsidian, Notion, GitHub, whatever you use
5. **How you work** — Style, rhythm, solo vs. collaborative

From your answers, he creates your workspace structure and marks the system as initialized. You never do setup again.

### Ongoing sessions

Tell Gandalf what you need. Examples:

> "I need to figure out how to price my consulting retainer"
> → Harvey assesses the commercial frame. The Wolf checks the math.

> "I want to write a proposal for this client"
> → Harvey frames the deal. Chinaski writes it. Morty reviews before it goes out.

> "Help me figure out what to build next on my product"
> → Socrates interrogates the assumptions. Rick scopes the build. Gandalf synthesises.

> "I had a call with a client and need to capture what happened"
> → Pippin ingests the notes. Merry structures them. Aragorn stores the session state.

### Memory

Three layers:

- **Aragorn** (`memory/Aragorn/active.md`) — active working memory, written at session close
- **Frodo** (`memory/Frodo/`) — episodic archive, past project history
- **Legolas** (`memory/Legolas/`) — semantic knowledge, durable domain expertise

In practice: Aragorn is the one you write to most. The others build up over time.

---

## Folder structure

```
fellowship-os/
├── CLAUDE.md              ← entry point — onboarding + ongoing dispatch
├── GETTING_STARTED.md     ← Gandalf's briefing — read before first session
├── EXPLAINER.md           ← what this is and why it exists
├── README.md              ← this file
├── gandalf_root.md        ← the map — structure, naming, how to orient
├── setup.sh               ← one-command install of all tooling
├── identities/            ← all 15 agent character files
├── core/                  ← system docs — modes, schema, architecture, hive-mind
├── skills/                ← pluggable capabilities (11 skills)
├── hooks/
│   ├── fellowship-hook.js ← session automation (start/stop/staleness)
│   ├── launchd/           ← macOS scheduled reflection jobs
│   └── prompts/           ← weekly and monthly reflection prompts
├── workspace/             ← your domain folders (created by onboarding)
│   └── _example/          ← template showing workspace structure
├── memory/
│   ├── Aragorn/           ← active session memory (auto-written by hook)
│   ├── Frodo/             ← episodic archive — past project history
│   └── Legolas/           ← semantic knowledge — durable expertise
└── reflections/           ← weekly and monthly (auto-generated)
```

---

## Working with agents

Agents are not called by name — they're routed automatically based on task type. Gandalf reads the task signal and deploys the right agent (or agents). When an agent speaks, they label their response:

```
**[Harvey]**
The pricing structure has a structural problem...
```

You can explicitly request an agent:

> "I want Socrates to interrogate this assumption before we move forward"
> "Have The Wolf review the economics before we commit to this"

---

## Customising your fellowship

After setup, you can:

- **Edit agent identity files** (`identities/`) — adjust mandates, add domain knowledge, change how they speak
- **Add skills** (`skills/`) — write a new skill file describing a capability you want agents to use
- **Update workspace context** — as your focus shifts, update `workspace/[name]/context.md`
- **Add agents** — follow the pattern in `core/update.md` — Procedure B

---

## Credits

Built on the Fellowship of the Raf architecture. Agent system design by Rafael Lodos.

---

*The Fellowship — Personal AI Operating System*
*Compatible with Claude Code, Codex CLI, and OpenCode*
