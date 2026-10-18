# GraminGCC — Commands

A command is the quickest saved instruction: one file, run by typing `/name`.

- **Yours only:** `~/.claude/commands/<name>.md`
- **Shared with the team:** `.claude/commands/<name>.md` in the repo

Whatever you type after the command lands in `$ARGUMENTS`.

**Rule of thumb:** if you always trigger it yourself → make it a command.
If the AI should reach for it on its own → make it a skill.

---

## Three commands worth knowing

| Command | What it does |
|---|---|
| `/context` | What loaded this session |
| `/memory` | Edit your `CLAUDE.md` |
| `/skills` | List every skill you have |

Plus `/init` — let Claude read the project and draft your `CLAUDE.md` for the
first time.

---

## On the GraminGCC platform

### `/ship` — deploy SAFELY (the safety net)

`~/.claude/commands/ship.md`

```markdown
Ship the current changes - and don't ship if it's broken:
1. Run the 'review' skill. If ANYTHING fails, STOP and tell me.
2. If it passes: check .env is gitignored (no Supabase keys),
   and confirm no KYC or PII appears in any log statement.
3. commit and push to GitHub with this message: $ARGUMENTS
4. deploy to Vercel; give me the live URL.
```

**What it does:** One word ships a good change and refuses a broken one.
Run it with: `/ship added SI bench upload`

---

### `/qa` — does every placement still trace to a requisition?

`~/.claude/commands/qa.md`

```markdown
Check the live GraminGCC data. For EVERY candidate in a cohort: is there a
signed requisition behind them? For EVERY skill marked HELD: is there a
certificate or assessment row evidencing it? For EVERY candidate record:
is identity masked for GCC and SI users who have not shortlisted them?
Has any charge of any kind been applied to a candidate? List every breach
with the IDs and numbers, so I can fix it.
```

**What it does:** The four things that must always be true about the platform,
checked on demand with one word: `/qa`

---

### `/skillgap` — map a role to the pool in one line

`~/.claude/commands/skillgap.md`

```markdown
Run the 'skill-map' skill for this job family. Show required skills against
what the certified pool already holds, how many candidates are within one
module of the 72% readiness floor, and the shortest path to a deployable
cohort. Job family: $ARGUMENTS
```

**What it does:** The question a GCC asks first, answered in one word:
`/skillgap data operations analyst, 2-5 years`

---

### `/pricing` — sanity-check the money

`~/.claude/commands/pricing.md`

```markdown
Run the 'unit-economics' skill for this role. Show the 12.5% placement fee,
readiness cost per placement at the stated conversion, the cohort fee needed
to fund readiness in full, and margin per placement. Flag it immediately if
the placement fee would end up subsidising training.
Role and CTC: $ARGUMENTS
```

**What it does:** Stops the pricing error before it reaches a slide:
`/pricing data ops analyst, CTC 7,00,000, conversion 60%`

---

### `/seed` and `/reset` — fill and clean test data

`~/.claude/commands/` (two files)

```markdown
seed.md: Add realistic sample data - a few GCC orgs with open requisitions,
one SI partner with a bench, and a cohort of candidates spread across
readiness bands with linked certifications. Keep names and districts
plausible for Telangana and Andhra Pradesh. How much: $ARGUMENTS

reset.md: Delete all demo/test data; leave a clean, empty platform
(keep the tables, RLS policies, NSQF mappings and rules intact).
```

**What it does:** The tedious test-setup dance, now two words:
`/seed 3 GCCs, 25 candidates` … test … `/reset`

---

## On your own work

### `/minutes` — meeting notes into your format

`~/.claude/commands/minutes.md`

```markdown
Turn these notes into our meeting minutes: (1) decisions, (2) brief
discussion, (3) an action table with owner and due date. Keep it tight.
Notes: $ARGUMENTS
```

**What it does:** The job you do after every meeting, now one word:
`/minutes [paste your scrawl]`

---

### `/summarise` — exec TL;DR of anything

`~/.claude/commands/summarise.md`

```markdown
Summarise the text below for a busy executive: a one-paragraph TL;DR,
then the 3 things they actually need to decide or know. Plain English.
$ARGUMENTS
```

**What it does:** Turn a long doc or thread into a decision-ready summary:
`/summarise [paste it]`

---

### `/escalate` — a calm escalation note

`~/.claude/commands/escalate.md`

```markdown
Draft an escalation note in our style: what's happening, business impact,
what's been tried, and the specific ask (decision / resource / by when).
Calm and factual. Situation: $ARGUMENTS
```

**What it does:** The note you dread writing under pressure, drafted clearly
in seconds: `/escalate [situation]`

---

### `/gccprep` — prep for a GCC leader conversation

`~/.claude/commands/gccprep.md`

```markdown
Prepare me for this GCC or SI conversation. Give me: five questions that ask
what they have actually DONE, not what they would do; the one question most
likely to disconfirm our current positioning; and the two numbers from our
model I should be ready to defend. Do not let me pitch in the first forty
minutes. Who I'm meeting: $ARGUMENTS
```

**What it does:** Keeps the interview an interview rather than a pitch:
`/gccprep Head of GCC, BFSI, Hyderabad, ~1,200 people`

---

## The powerful part — the three lock together

They stop being three separate tricks.

**Memory** holds the rules that must never break — candidates are never
charged, identity stays masked until shortlist, the cohort fee funds
readiness. **The `review` skill** checks them. **The `/ship` command** runs
that review first and refuses to deploy if anything fails.

Three tiny files, and it is genuinely hard to break the platform or the
promise we made to candidates. Memory sets the rules, skills enforce them,
commands act on them — the same pattern protects any project or process you
own.

---

## Share it with your team

Everything here is just files. Put `CLAUDE.md` and the `.claude/` folder in
the team's shared space or git repo, and every teammate inherits the whole
toolkit — the memory, the skills, the shortcuts — automatically. One person
sets up "how we work" once; nobody does the same work twice.
