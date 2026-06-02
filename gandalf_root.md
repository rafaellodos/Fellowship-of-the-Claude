# GANDALF_ROOT.MD
## The Map — The Fellowship

Read this file first. Every session. No exceptions.

---

## WHAT THIS IS

This is the floor plan. You are operating inside a personal AI operating system — The Fellowship. This file tells you what exists, where it lives, how it's named, and where things go.

---

## TOP-LEVEL FOLDER STRUCTURE

```
fellowship-os/
│
├── CLAUDE.md                    ← Entry point. Read first, every session.
├── gandalf_root.md              ← YOU ARE HERE — the map
├── README.md                    ← User-facing explanation
│
├── identities/                  ← Agent identity files
│   ├── gandalf.id.md
│   ├── harvey.id.md
│   ├── rick.id.md
│   ├── chinaski.id.md
│   ├── archer.id.md
│   ├── mr.robot.id.md
│   ├── socrates.id.md
│   ├── morty.id.md
│   ├── meeseeks.id.md
│   ├── merry.id.md
│   ├── pippin.id.md
│   ├── pablo.id.md
│   ├── the-wolf.id.md
│   ├── donna.id.md
│   └── killua.id.md
│
├── workspace/                   ← Operator's domain folders (created at setup)
│   └── _example/               ← Template showing workspace structure
│       ├── context.md
│       ├── Oblivion/
│       │   ├── Raw/
│       │   ├── Wiki/
│       │   └── Output/
│       └── Projects/
│
├── core/                        ← System files
│   ├── fellowship.md            ← Master operations reference
│   ├── project_schema.md        ← Brief and plan file definitions
│   ├── evolution_log.md         ← Agent development record
│   ├── architecture_v2.md       ← Context system specification
│   ├── model_router.md          ← Model selection protocol
│   ├── model_registry.md        ← Environment model mapping
│   ├── modes.md                 ← SOLO / SQUAD / FELLOWSHIP modes
│   ├── update.md                ← Runbook for fellowship structure changes
│   └── para-memory-architecture.md ← Memory classification decision
│
├── skills/                      ← Pluggable capabilities
│   ├── web_search.md
│   ├── web_fetch.md
│   ├── voice_transcription.md
│   ├── document_generation.md
│   ├── email_drafting_send.md
│   ├── image_visual_analysis.md
│   ├── structured_reflection.md
│   ├── code_execution.md
│   ├── calendar_scheduling.md
│   └── qwen_self_host.md
│
├── memory/
│   ├── Aragorn/
│   │   └── active.md            ← Active session memory — write here at close
│   ├── Frodo/                   ← Episodic archive — past project history
│   └── Legolas/                 ← Semantic knowledge — durable expertise
│
└── reflections/
    ├── weekly/
    └── monthly/
```

---

## NAMING CONVENTIONS

**Workspaces:** kebab-case, descriptive. `my-agency/` not `MyAgency/`

**Projects:** kebab-case, dated where relevant. `2026-03-client-website`

**Context files:** always named `context.md` — one per workspace, one per project.

**Agent identity files:** `[name].id.md` — lowercase, dot notation. `rick.id.md`

**Skill files:** `snake_case.md`. `web_search.md`

**Deliverables:** `[YYYY-MM-DD]_[descriptor]_[type].[ext]`

---

## PROJECT FOLDER STRUCTURE

Every project follows this structure:

```
[workspace]/Projects/[project-name]/
  context.md          ← What this project is, current status, key decisions
  intake/             ← Brief, raw inputs, voice notes, research
  deliverables/       ← Final outputs
  communications/     ← Emails, messages, meeting notes (client projects only)
```

---

## WHERE THINGS GO — QUICK REFERENCE

| Thing | Where it goes |
|---|---|
| New project | `/workspace/[domain]/Projects/[project-name]/` |
| Unprocessed notes, voice dumps | `/workspace/[domain]/Oblivion/Raw/` |
| Stable knowledge, durable decisions | `/workspace/[domain]/Oblivion/Wiki/` |
| Final deliverables, close summaries | `/workspace/[domain]/Oblivion/Output/` |
| Active session state | `/memory/Aragorn/active.md` |
| Past project history | `/memory/Frodo/` |
| Durable domain knowledge | `/memory/Legolas/` |
| Agent identity update | `/identities/[agent].id.md` — bump version |
| Fellowship structure change | Read `/core/update.md` — follow the relevant procedure |

---

## MEMORY CLASSIFICATION — PARA

Information goes to the right layer based on actionability:

| How actionable? | Layer | Location |
|---|---|---|
| Active — open decisions, in motion | Project | `memory/Aragorn/active.md` |
| Ongoing — no end date, continuing | Area | `workspace/[domain]/context.md` |
| Stable — worth keeping, not active | Resource | `Oblivion/Wiki/` + Legolas |
| Done — closed, superseded, processed | Archive | `Frodo/` + `Oblivion/Raw/[PROCESSED]` |

Full decision at: `/core/para-memory-architecture.md`

---

## HOW TO ORIENT AT SESSION START

1. Read `CLAUDE.md` — done when CLAUDE.md is loaded.
2. Identify which workspace the current task belongs to.
3. Read that workspace's `context.md`.
4. Check `memory/Aragorn/active.md` for open threads.
5. If working on a specific project, read that project's `context.md`.
6. Identify which agents and skills are needed.
7. Proceed.

---

## THE FELLOWSHIP

Fifteen agents. Each has an identity file in `/identities/`. Gandalf orchestrates. Full protocol: `/core/fellowship.md`

---

_gandalf_root.md — The Map_
_The Fellowship — Personal AI Operating System_
