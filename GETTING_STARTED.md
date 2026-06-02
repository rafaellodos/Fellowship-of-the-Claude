# A Briefing from Gandalf

*Read this before your first session. It will save you time later.*

---

You've just cloned the fellowship. Before the system can do anything useful, I need to understand who you are and what you're building. That happens in your first session — five questions, ten minutes, and you won't need to do it again.

But before that, let me tell you what you've actually got here.

---

## What this is

Think of it as a team you can brief.

Not a single assistant you point at problems. A team. Fifteen people, each with a specific function, a governing principle, and a fatal flaw I've documented so neither of us forgets it. You tell me what you need. I figure out who the job requires, deploy them, and bring you back something useful. You deal with me. I deal with everyone else.

The reason this works better than talking to a single AI is the same reason a good team works better than one person doing everything. Harvey thinks about deals and positioning. Rick thinks about systems and builds. Chinaski thinks about voice and what will actually land with a human reader. When they work the same problem from different angles, you get outputs that are harder to achieve by asking one thing one question.

I am the one who carries the whole picture. They carry their domain.

---

## The people you'll be working with

You don't need to know all of them immediately. You'll encounter them as you use the system. But you should know what's available.

**Harvey** handles anything commercial — markets, positioning, deals, competitive intelligence, pricing strategy. Before you walk into any significant conversation with a client or partner, brief Harvey. He is very good at reframing problems so the criteria by which you're being evaluated become criteria on which you can't lose. His fatal flaw: he can win you the wrong thing. Watch for it.

**Rick** builds. Code, systems, architecture, technical scope. If you're shipping something, Rick is on the critical path. He will refuse to build a structurally wrong spec — this is correct behaviour, not insubordination. If you're in a hurry, that will frustrate you. It shouldn't.

**Chinaski** owns voice. Writing, copy, narrative — anything that goes out into the world under your name. Give him direction, audience, goal, and tone range. Do not give him word-by-word instructions. Over-specification kills voice, and voice is the only thing that makes writing work.

**Archer** scans for what you didn't know to look for. Cross-domain connections, non-obvious opportunities, the path that isn't on the map yet. His findings arrive casual, sometimes irrelevant, occasionally extraordinary. He separates the most relevant from the most interesting when they diverge. I decide which to act on.

**Morty** reviews every plan before it goes out. No exceptions. He is not trying to slow you down — he is trying to make sure you're not building something you'll regret. His flags are addressed or overridden with a logged reason. They are never ignored.

**Socrates** interrogates assumptions. He cannot be silenced once deployed, and he returns questions, not recommendations. Deploy him on anything high-stakes or fast-moving where you suspect the frame might be wrong. He is uncomfortable to work with. That's the point.

**The Wolf** owns whether the math works. Before any significant pricing decision, hiring decision, or major resource commitment — run it through The Wolf. Harvey brings the deals; The Wolf tells you which ones make sense to take.

**Mr. Robot** audits what Rick builds before it touches anything real. He also reviews plans for security and legal exposure. He has a verification model, not a trust model. Listen to his flags.

**Killua** synthesises intelligence when the picture is complex, conflicting, or high-stakes. Not for simple research — for the moments when you have six contradictory signals and need to know which ones are load-bearing.

**Donna** owns client relationships — from close to referral. She surfaces relationship risk early, before it becomes a crisis.

**Pablo** owns perception — how everything built, written, or sold is experienced. Deploy him when brand, design, or pitch structure is being shaped.

**Merry** handles structured input — email, calendar, CRM, anything that arrives in an organised format and needs to be processed accurately.

**Pippin** handles unstructured input — voice notes, brain dumps, URLs you've sent yourself, half-formed ideas. He's the front door for your own thinking entering the system.

**Meeseeks** executes atomic tasks. Fully specified, no ambiguity, clear success criteria. The workhorse. Never consulted on plans.

---

## How I route things

You don't call agents by name. You tell me what you need, and I figure out who to deploy.

*"I need to figure out how to price my consulting work"* → Harvey reads the commercial frame. The Wolf checks whether the number works.

*"Help me write a proposal"* → Harvey frames the deal. Chinaski writes it. Morty reviews before it goes out.

*"I want to think through whether I'm building the right thing"* → Socrates interrogates the frame. I synthesise what he surfaces.

*"Build this feature"* → Rick confirms he's understood the problem, scopes it, and builds.

When an agent speaks, you'll see their name at the top of the response. That's not decoration — it tells you whose reasoning you're reading and what its limits are.

---

## Memory

The fellowship has three memory layers.

**Aragorn** is active working memory. At the end of each session, a brief note gets written there — what happened, what decisions were made, what's unresolved. At the start of the next session, I read it to know where we stand. This is the layer you'll interact with most directly.

**Frodo** is episodic memory — past project history, closed work, decisions made on things that are finished.

**Legolas** is semantic memory — stable knowledge that's useful across sessions and projects. Domain expertise you've built up. Patterns that recur.

You don't need to manage these manually. The system writes to Aragorn at session close. Frodo and Legolas accumulate over time as you work.

---

## What to expect from your first session

When you open Claude Code in this folder for the first time, I'll run intake. Five questions. I'll ask them one at a time, conversationally, and I'll build your workspace from the answers.

**What I'm going to ask:**

1. *Who are you* — your name, what you do, what you're building or trying to accomplish.

2. *Your domains* — the different areas of your life or work that need their own space. Each one becomes a folder. Give me two to six.

3. *What happens in each* — the kinds of work that live in each domain. This helps me know which agents to route most work to.

4. *Your tools* — Obsidian, Notion, GitHub, Airtable, whatever you use regularly. Doesn't need to be exhaustive.

5. *How you work* — your rhythm, your style, whether you think best by talking or by sitting quietly, whether you work alone or with others.

Before I write anything, I'll summarise back to you what I've understood and ask if I've got it right. Then I build.

When it's done, I'll print the map so you can see exactly what was created.

---

## How to work well with the fellowship

A few things worth knowing before you begin.

**Direction over delegation.** Tell me what outcome you need, not just what task you want done. "Write me a proposal" is less useful than "I need a proposal that gets this client to yes without them feeling sold to." The second version lets me make better decisions about who to deploy and how.

**Trust the routing.** You'll be tempted to ask for specific agents — "ask Harvey about this." You can do that. But if you just describe the problem, the routing usually produces better work. I can deploy three agents on the same problem and synthesise the result. You asking for one agent gets you one angle.

**Use the memory.** If you ran `setup.sh`, a session entry is written to Aragorn automatically when you close Claude Code. If not, write it yourself — one paragraph, what happened, what's open. The system is only as good as what you put in.

**Push back.** Agents have mandates. Those mandates produce biases. Harvey is biased toward the deal. Rick is biased toward technical elegance. Chinaski is biased toward his own voice. If an output doesn't feel right, say so. The system learns from your corrections — but only if you make them.

---

## One last thing

The fellowship is not a tool you use. It's a system you operate.

The difference is that a tool waits to be picked up. A system runs. The more you put into it — the more context you give it, the more corrections you make, the more you write to memory at session close — the more useful it becomes.

Most people who try AI systems give them one session and decide they don't work. The fellowship takes three sessions before it starts to feel like something, and six before you stop noticing the mechanism.

I've seen enough projects fail to know that the failure almost always happens at the beginning, not the execution. Bad framing. Untested assumptions. Starting before the picture is clear.

So: do the intake properly. Answer the questions honestly. Let me build your workspace from what you actually tell me, not from what you think I want to hear.

After that, tell me what's on your mind.

— Gandalf

---

*GETTING_STARTED.md — The Fellowship*
*Read once. Then forget it's here.*
