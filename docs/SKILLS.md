# GraminGCC — Skills

A skill is a little folder with a `SKILL.md` file: a one-line `description`
(this is what makes the AI reach for it on its own), then your instructions.

- **Yours only:** `~/.claude/skills/<name>/SKILL.md`
- **Shared with the team:** `.claude/skills/<name>/SKILL.md` in the repo

Run `/skills` to list every skill you have.

**Rule of thumb:** if the AI should reach for it on its own → make it a skill.
If you always trigger it yourself → make it a command.

---

## On the GraminGCC platform

### `add-table` — the backend move, done our way

`~/.claude/skills/add-table/SKILL.md`

```markdown
---
description: Add a new kind of data to GraminGCC. Use when I ask to store
or track something new.
---
Create the Supabase table (good types, foreign keys); turn ON Row Level
Security with policies for the candidate, GCC and SI roles separately;
if the table holds KYC or PII, encrypt at rest and keep it out of logs;
update the 'readiness_scores' view if needed; regenerate the types;
show me the SQL and confirm RLS is on for all three roles.
```

**What it does:** Bottles the exact database move. Now "let a candidate add a
second language certification" does the whole thing our way, from one
sentence — including the three-role RLS that is easy to forget.

---

### `feature` — the WHOLE build loop (the powerful one)

`~/.claude/skills/feature/SKILL.md`

```markdown
---
description: Add a whole feature to GraminGCC, our way, end to end.
---
When I ask for a feature: (1) show a SHORT plan first; (2) say which of the
three personas it serves — candidate, GCC or SI; (3) create any tables the
right way (RLS on per role, update 'readiness_scores', regenerate types);
(4) build the screen in our design system — deep teal dominant, numbered
step cards, Cambria headings, money in rupees; (5) check it works in
vernacular on a low-end phone; (6) respect the invariants, especially that
candidates are never charged and identity stays masked until shortlist;
(7) run the 'review' skill before we call it done.
```

**What it does:** Captures the entire method. "Let a GCC bulk-shortlist from a
cohort" becomes one sentence, and the AI plans, builds and checks it all our
way.

---

### `review` — the pre-flight checklist

`~/.claude/skills/review/SKILL.md`

```markdown
---
description: Sanity-check a change before I ship. Use when I ask you to
review or check my changes.
---
Flag anything off: RLS still ON for candidate, GCC and SI roles? keys out of
code and .env gitignored? KYC and PII encrypted and absent from logs?
candidate identity masked until shortlist? no charge of any kind reaching a
candidate? money stored as integer paise, shown as rupees? placement fee
still 12.5%, with readiness funded by the cohort fee? every skill claim
traced to a certificate or assessment? GCC feedback field non-nullable?
readiness scores versioned, not overwritten? works in vernacular on a phone?
design system colours and fonts unchanged? Report each PASS/FAIL with a
one-line fix.
```

**What it does:** A standard the AI holds you to. It never forgets a check and
never gets bored — so a rule you set once is enforced forever.

---

### `skill-map` — the heart of the platform

`~/.claude/skills/skill-map/SKILL.md`

```markdown
---
description: Map a GCC job family to NSQF codes and score a candidate
against it. Use when I ask about skill matching, gaps or readiness.
---
Given a job family: (1) resolve it to its NSQF/NCVET qualification packs;
(2) list the required skills with proficiency levels; (3) for a candidate,
show each skill as HELD (with the certificate or assessment that evidences
it), PARTIAL, or MISSING; (4) compute the readiness score against the 72%
floor; (5) name the shortest path to close the gap and the weeks it takes.
Never mark a skill HELD on a self-declaration alone. If a job family has no
NSQF mapping, say so plainly — that candidate cannot be routed to
government-funded training.
```

**What it does:** The one capability that survived the repositioning intact.
Required skills in, certified skills matched, gap named precisely — in our
format, every time.

---

### `pilot-metrics` — judge the pilot honestly

`~/.claude/skills/pilot-metrics/SKILL.md`

```markdown
---
description: Report pilot results against our success criteria. Use when I
ask how the pilot or a cohort is doing.
---
Lead with the two primary measures: interview-to-offer conversion against
the GCC's OWN baseline, and time-to-ready. Then secondary: time-to-fill,
90-day retention, cost-per-hire, manager CSAT, drop-off by stage. State
plainly whether the decision gate is met — conversion beats baseline AND a
GCC or SI has committed to a second cohort. If the gate is not met, say so
in the first line. Never bury a disconfirming result. Flag any metric with
a sample too small to be meaningful.
```

**What it does:** Stops us from grading our own homework. A capstone that
reports a disconfirming result honestly is stronger than one that doesn't.

---

### `unit-economics` — check the money still works

`~/.claude/skills/unit-economics/SKILL.md`

```markdown
---
description: Check the unit economics of a placement, cohort or pricing
change. Use when I ask about pricing, margin or cost per hire.
---
For the role and CTC given: compute the placement fee at 12.5%; compute
readiness cost per placement as (cost per trainee / conversion rate);
confirm the cohort fee covers readiness IN FULL — the placement fee must
never subsidise training; show margin per placement and the break-even
conversion rate. If any figure breaks the funding rule, say so in the first
line and show what the cohort fee would have to be. Show the arithmetic,
not just the answer.
```

**What it does:** Catches the error we already made once — pricing at a
staffing-agency rate while carrying a training cost that staffing agencies
don't have.

---

## On your own work

### `weekly-status` — your reporting

`~/.claude/skills/weekly-status/SKILL.md`

```markdown
---
description: Turn my rough notes into our weekly status. Use when I paste
updates and ask for a status.
---
Format: 1) headline; 2) RAG per workstream with a one-line reason;
3) risks & owners; 4) asks (decision/help, from whom); 5) next week's
top 3. Tight, factual, British English. No hype.
```

**What it does:** Paste any mess of updates, get back your exact report
format. This is the one that saves you an hour every Friday.

---

### `rca` — incident write-up

`~/.claude/skills/rca/SKILL.md`

```markdown
---
description: Write up an incident RCA in our template.
---
Produce: summary & impact; timeline (detect -> mitigate -> resolve); root
cause + contributing factors (5-whys); corrective actions with owners and
dates; how we'll detect it earlier. Blameless tone.
```

**What it does:** Every incident write-up in your format, in seconds — so the
quality doesn't depend on how tired you are at the time.

---

### `gcc-interview` — capture what a GCC leader actually told us

`~/.claude/skills/gcc-interview/SKILL.md`

```markdown
---
description: Structure notes from a GCC or SI leader interview. Use when I
paste interview notes or ask to write one up.
---
Produce: who and when; the role they hold and the GCC's size; their stated
constraint in THEIR words, quoted; what they have already tried and why it
stopped; what would have to be true for them to run a pilot; who signs off
and what kills it. Then a separate section: WHAT THIS DISCONFIRMS — anything
they said that contradicts our current positioning. Never soften that
section. End with the single most useful follow-up question for next time.
```

**What it does:** The repositioning came out of these interviews. This forces
the disconfirming evidence to the surface instead of letting it get lost in
enthusiasm.
