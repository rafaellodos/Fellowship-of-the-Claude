# MODEL REGISTRY
## Environment-Specific Model Mapping
### /core/model_registry.md
### Read by: Gandalf at session start
### UPDATE THIS FILE when models change — not the router

---

## CURRENT ENVIRONMENT

**Platform:** Claude Code (claude.ai/code + VSCode extension)
**Plan:** Claude Pro (BYOK)
**Last verified:** 2026-05-29

---

## TIER MAPPINGS

```
FRONTIER → claude-opus-4-7       (Claude Pro BYOK)
           Best available reasoning. Client-facing, high-stakes,
           irreversible decisions. Use deliberately.
           Cost: Claude Pro allowance

MID      → claude-sonnet-4-6     (Claude Pro BYOK)  [PRIMARY]
           Workhorse. Most fellowship tasks land here.
           Good reasoning, voice fidelity, structured output.
           Cost: Claude Pro allowance

FAST     → claude-haiku-4-5      (Claude Pro BYOK)
           Classification, extraction, routing, atomic tasks.
           Excellent for Meeseeks, Merry/Pippin basic work.
           Cost: Claude Pro allowance (low cost per token)
```

---

## AVAILABLE ALTERNATES

```
MID alternate    → qwen2.5-32b-instruct (SELF-HOSTED)
                   Strong reasoning and coding capabilities.
                   Local deployment, privacy-focused, zero API costs.
                   Use for MID-tier tasks when offline or privacy required.
                   Requires local GPU/resources. Good for Rick, Mr. Robot.

FAST alternate   → qwen2.5-7b-instruct (SELF-HOSTED)
                   Lightweight local model for classification,
                   extraction, routing tasks. Zero cost, offline.
                   Use for Meeseeks, Merry/Pippin basic tasks.
```

---

## ROUTING DECISION TREE FOR THIS ENVIRONMENT

```
Task requires FAST tier?
  ├─ Self-hosted Qwen available? → qwen2.5-7b-instruct (offline, zero cost)
  └─ Otherwise → claude-haiku-4-5 (low cost, fast)

Task requires MID tier?
  ├─ Is it primarily a coding / build task? (Rick, Mr. Robot)
  │   ├─ Privacy/offline needed? → qwen2.5-32b-instruct (self-hosted)
  │   └─ Otherwise → claude-sonnet-4-6 (BYOK)
  └─ Is it writing, strategy, voice, or reasoning? (Harvey, Chinaski, Archer, Morty)
      └─ claude-sonnet-4-6 (BYOK) — voice and reasoning quality matters

Task requires FRONTIER tier?
  └─ claude-opus-4-7 (BYOK)
     Only when router assigns FRONTIER. Gandalf, Socrates,
     Mr. Robot on high-stakes audits, client-facing final deliverables.
```

---

## AGENT-SPECIFIC NOTES FOR THIS ENVIRONMENT

**Rick:** claude-sonnet-4-6 for all MID-tier build tasks. Strong coding performance. Use haiku only for simple extraction tasks.

**Mr. Robot:** claude-sonnet-4-6 for code-level security reviews. claude-opus-4-7 for legal/compliance reasoning — deep reasoning quality matters here.

**Chinaski:** Always claude-sonnet-4-6 at minimum. Voice fidelity requires a model trained on rich language data. Do not route Chinaski tasks to haiku.

**Meeseeks:** claude-haiku-4-5 for all atomic tasks. Fully-specified execution — reasoning overhead unnecessary.

**Merry / Pippin:** claude-haiku-4-5 for classification and ingestion. Push to claude-sonnet-4-6 only when Pippin is interpreting complex unstructured content.

---

## COST AWARENESS

All models bill against Claude Pro allowance in the Claude Code environment. No separate credit system.

```
Higher cost:   claude-opus-4-7   — use deliberately, FRONTIER only
Mid cost:      claude-sonnet-4-6 — workhorse, most tasks
Lower cost:    claude-haiku-4-5  — classification, extraction, atomic tasks
```

**When allowance runs low mid-project:**
- Downgrade MID coding tasks from claude-sonnet-4-6 to claude-haiku-4-5
- Do not downgrade voice/reasoning tasks — quality impact is real
- Log the constraint in Aragorn
- Escalate to the operator if FRONTIER tasks are queued and allowance is near limit

---

---

## HOW TO UPDATE THIS FILE

When any of the following change, update this file only:
- A model is deprecated or renamed
- A new model becomes available in your environment
- The SWE-1.5 free period ends
- You add API keys for additional providers
- You change environments (e.g. move from Windsurf to Claude Code)

Do not update `/core/model_router.md` — the router logic is environment-agnostic.
Do not update agent identity files — they reference tiers, not model names.
This file is the only place model names live.

---

## VERSION HISTORY

| Date | Change |
|---|---|
| 2026-03-16 | Initial registry. Windsurf free + Claude Pro BYOK. |
| 2026-03-29 | Added Qwen self-hosted models (qwen2.5-7b-instruct, qwen2.5-32b-instruct) for offline/privacy operations. |
| 2026-05-29 | Updated for Claude Code environment. Removed all Windsurf/SWE models. FRONTIER updated to claude-opus-4-7. FAST updated to claude-haiku-4-5. |

---

*Model Registry — Fellowship Infrastructure*
*Version 1.0 — 2026-03-16*
*Lives at /core/model_registry.md*
*Update this file when models change. Never update the router.*
