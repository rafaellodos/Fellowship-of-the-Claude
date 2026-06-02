# HIVE-MIND PROTOCOL
## Multi-Agent Coordination — The Fellowship
### /core/hive-mind.md
### Version 1.0

---

## WHAT THIS IS

The hive-mind is the coordination layer for FELLOWSHIP mode — when three or more agents need to work on the same problem simultaneously, not sequentially.

**Without hive-mind:** Gandalf spawns agents, each reports back independently, Gandalf synthesises manually.

**With hive-mind:** Gandalf initialises a shared blackboard file, agents write their findings to it as they work, Gandalf reads the aggregate at the end. Rick's security flag is visible to Morty in real time. Harvey's commercial assessment informs Archer's angle search before either reports back.

---

## WHEN TO USE IT

Use hive-mind when ALL of these are true:
- Three or more agents needed on the same problem
- Agents benefit from seeing each other's work while it happens
- The operation will take more than one exchange to complete
- Mode is FELLOWSHIP (not SQUAD — SQUAD runs sequentially, doesn't need hive)

Do NOT use hive-mind for:
- SOLO tasks (one agent, no coordination needed)
- SQUAD sequential tasks (2–3 agents, each completes before next starts)
- Quick research tasks (Agent() subagents are sufficient)

---

## THE PROTOCOL

### Step 1 — Initialise the blackboard

Gandalf creates a shared context file at `memory/.hive-active.md`:

```markdown
# HIVE-MIND — Active Session
## Task: [what we're working on]
## Mode: FELLOWSHIP
## Agents: [list]
## Goal: [what success looks like]
## Constraints: [what must be true in the output]

---

## PROJECT CONTEXT
[Paste relevant context from Aragorn and workspace context.md]

---

## AGENT OUTPUTS

### Rick
*pending*

### Harvey
*pending*

### Morty
*pending*

[add sections for each deployed agent]
```

### Step 2 — Spawn agents with hive instructions

Each agent is spawned via Claude Code's `Agent()` tool with instructions to:
1. Read `memory/.hive-active.md` for shared context and other agents' work
2. Complete their specific task
3. Write their findings to their section in `memory/.hive-active.md`
4. Check other agents' sections before finalising if relevant

Example spawn instruction:

```
You are Harvey from the Fellowship.

Read memory/.hive-active.md — it contains the task context and what other agents have found so far.

Your task: [Harvey-specific instructions]

When complete, open memory/.hive-active.md and replace "### Harvey / *pending*"
with your structured findings. Check Rick's findings before finalising if they're available.
```

### Step 3 — Gandalf reads aggregate

After agents complete, Gandalf reads `memory/.hive-active.md` in full and synthesises the final deliverable from all agent sections.

### Step 4 — Archive and clear

Write the synthesised output to the appropriate Oblivion/Output location.

Append a summary to `memory/Aragorn/active.md`:
```
FELLOWSHIP run [date] — [project] — agents: [list] — output: [one line]
```

Delete `memory/.hive-active.md`.

---

## AGENT HIVE KEYS

Standard section names in `.hive-active.md`:

| Agent | Section | Contains |
|---|---|---|
| Gandalf | `### Gandalf` | Context set, synthesis thread |
| Rick | `### Rick` | Technical findings, build objections |
| Harvey | `### Harvey` | Commercial assessment, positioning angle |
| Mr. Robot | `### Mr. Robot` | Security flags, clearance status |
| Morty | `### Morty` | Ethics assessment, hold/proceed |
| Socrates | `### Socrates` | Unresolved questions, reframed problem |
| Archer | `### Archer` | Intelligence, non-obvious angles |
| Chinaski | `### Chinaski` | Draft output, voice notes |

---

## EVOLUTION LOG

At the end of any FELLOWSHIP mode hive-mind operation:

1. Check if any agent's behaviour warranted a calibration note
2. If yes: append to `core/evolution_log.md`
3. If no: write one line: `[date] FELLOWSHIP run on [project] — no calibration warranted`

---

*Hive-Mind Protocol — The Fellowship*
*Version 1.0*
*Lives at: /core/hive-mind.md*
