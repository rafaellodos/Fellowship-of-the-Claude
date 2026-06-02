# PARA MEMORY ARCHITECTURE
## Fellowship of the Raf — Core Decision
### Lives at: /fellowship/core/para-memory-architecture.md

---

## THE DECISION

The fellowship memory system is reclassified using PARA's actionability-first principle. This document is the authoritative mapping. Agents should use it to determine where information belongs and where to look for it.

PARA: **P**rojects · **A**reas · **R**esources · **A**rchives

The core principle: organise by actionability, not subject. Something that is "about your clients" is not a useful classification. Something that is "a decision made during the your clients website build" is actionable — it tells you what to do with it and when you might need it again.

---

## THE MAPPING

| PARA Layer | Fellowship Equivalent | Lives In | Read When |
|---|---|---|---|
| **Projects** | Active work with a defined end state | `Aragorn/active.md` | Every session that touches that project |
| **Areas** | Ongoing responsibilities with no end date | `workspace/[Workspace]/context.md` | When orienting in a workspace |
| **Resources** | Stable knowledge worth preserving | `[Workspace]/Oblivion/Wiki/` + Legolas | When building on prior knowledge |
| **Archives** | Inactive items — closed projects, superseded decisions | `[Workspace]/Oblivion/Raw/` (processed) + Frodo | When historical context is needed |

---

## WHAT GOES WHERE — CONCRETE RULES

### PROJECTS → Aragorn

Aragorn holds the active project window. A project entry belongs in Aragorn if:
- It has a defined end state (website launched, client onboarded, feature shipped)
- It is currently being worked on or will be within 2 weeks
- It has open decisions that agents need to know right now

When a project closes: strip the Aragorn entry, write a close note to Oblivion/Output, store episodic record in Frodo.

### AREAS → Workspace context.md files

Areas are ongoing responsibilities that have no end date. your primary business is an area. your consulting work is an area. the operator's personal development is an area. These live in `workspace/[Workspace]/context.md` — updated when the area's focus shifts, not on every session.

The distinction that matters: your clients website is a **Project** (it ends). your primary business client relationships is an **Area** (it continues).

### RESOURCES → Oblivion/Wiki + Legolas

Stable, reusable knowledge. Things an agent would want in a future session that has nothing to do with the project they're currently working on. Patterns, decisions, domain knowledge, templates.

**Write to Oblivion/Wiki when:** The knowledge is durable, workspace-specific, and likely to be useful in a future session.

**Write to Legolas (AgentDB) when:** The knowledge is semantic, cross-workspace, and useful for retrieval without knowing where to look.

qmd now indexes both layers. Agents can query: `qmd query "[question]"` instead of loading full files.

### ARCHIVES → Oblivion/Raw (processed) + Frodo

Inactive items. Closed projects. Superseded decisions. Voice notes that have been processed. Raw research that's been synthesised into Wiki entries.

**Frodo** (episodic): past project records, decision history, session memory from closed projects.
**Oblivion/Raw (processed)**: source material that has been converted to Wiki entries. Label with `[PROCESSED: YYYY-MM-DD]` frontmatter rather than deleting — the original is the audit trail.

---

## THE OBLIVION LAYER CLARIFIED

Raw → Wiki → Output was always the right instinct. PARA maps onto it cleanly:

| Oblivion Layer | PARA equivalent | What goes here |
|---|---|---|
| Raw | Archives (unprocessed) | Unprocessed voice notes, raw research, source dumps, meeting transcripts |
| Wiki | Resources | Processed, stable, reusable knowledge |
| Output | Projects (delivered) | Final deliverables — proposals, reports, built things, close summaries |

**The processing trigger:** When something in Raw is referenced twice in separate sessions, it belongs in Wiki. The second reference is evidence of stable value.

---

## WHAT CHANGED

Before this decision: everything landed in Oblivion/Raw by default. The Wiki was under-used. Aragorn accumulated noise. Legolas was barely populated.

After this decision:
- Aragorn = active projects only (max 30 days, meaningful entries only)
- Wiki = the knowledge base agents build on
- Legolas = the semantic index (qmd queries this now)
- Raw = staging area, not a destination

---

## AGENT COMPLIANCE

When writing memory at session close, agents use this decision to classify their output before writing. The question is not "what workspace is this about?" — it is "how actionable is this, and for how long?"

- Still in motion, decisions open → **Aragorn** (Project)
- Ongoing responsibility, no end date → **workspace context.md** (Area)
- Knowledge worth keeping, project-independent → **Wiki + Legolas** (Resource)
- Done, superseded, or processed → **Frodo / Raw[PROCESSED]** (Archive)

---

*PARA Memory Architecture — Core Decision*
*Fellowship of the Raf — /fellowship/core/para-memory-architecture.md*
*Decided: 2026-06-02*
*Relates to: architecture_v2.md, fellowship.md, memory-bridge.md*
