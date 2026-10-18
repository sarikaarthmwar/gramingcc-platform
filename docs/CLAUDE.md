# GraminGCC — the GCC Readiness Platform

An AI-led, demand-driven platform that makes tier-2, rural and metro talent
deployment-ready for Global Capability Centres. We do not sell access to
candidates — access is not scarce. We sell **readiness**: a certified, scored,
supervised person a GCC will actually hire.

Group 5 · IIM Visakhapatnam · Leadership with AI
Members: Sarika · Kanmani · Phani · Senthil · Shiva · Yogesh · Sajeesh

---

## What this product is

Three parties meet on one platform:

| Persona | Who they are | What they do here |
|---|---|---|
| **Talent** | Freshers and 3–7 year professionals, tier-2 and rural first but not only | Register, complete KYC, link certifications, see the skill map, close the gap, certify |
| **GCC** | Head of GCC, TA lead, hiring manager | Post a requirement, review the skill map, receive a ready shortlist, interview, hire |
| **System Integrator** | TCS, Infosys, Wipro and similar partners holding GCC delivery contracts | Share demand pipeline, map the bench, co-sponsor cohorts, deploy, redeploy |

Six platform layers: Talent Sourcing · Skill Ontology Engine ·
Assessment & Certification · AI Training · Distributed Delivery Wrapper ·
Workforce Intelligence & Continuous Learning.

---

## Stack

Vite + React + TypeScript, Tailwind, Supabase, Vercel.
Tables: `candidates`, `certifications`, `skills`, `job_families`,
`nsqf_codes`, `skill_map`, `requisitions`, `cohorts`, `assessments`,
`placements`, `gcc_orgs`, `si_partners`, plus a `readiness_scores` view.

---

## Invariants — NEVER break these

- **Candidates are never charged.** No fee, no subscription, no deduction from
  stipend or salary. Ever. This is the ethical spine of the product.
- **Demand-triggered only.** No candidate is sourced or enrolled without a
  confirmed, signed GCC or SI requisition. A warm pool with no demand is a
  liability.
- **The cohort fee funds readiness in full.** The placement fee never
  subsidises training. If a change makes placement revenue carry training
  cost, the unit economics break — stop and warn me.
- **Candidate identity stays masked until shortlist.** Name, photo, college,
  district and caste-indicative fields are hidden from GCC and SI users until
  a candidate is explicitly shortlisted.
- **Every skill claim traces to a certificate or an assessment.** No
  self-declared skill ever reaches a GCC shortlist unverified.
- **GCC feedback after interview is mandatory, not optional.** The feedback
  loop is what improves the next cohort; a nullable feedback field breaks it.
- **Row Level Security stays ON on every table.** A GCC sees only its own
  requisitions; an SI sees only its own bench; a candidate sees only their own
  record.
- **KYC and PII are encrypted at rest and never logged.** Aadhaar reference
  numbers are stored hashed, never in plaintext, never in a log line, never
  in an error message.
- **Supabase keys never appear in code or in git.**
- **Readiness scores are never silently overwritten.** Re-scoring creates a
  new versioned row; history is preserved.

---

## Rules & workflow

- Show money as rupees; store money as **integer paise**, never decimals.
- Placement fee is **12.5% of first-year CTC** (1.5 months) — the mid-level
  and specialised-role tier. Never 8.33%: that is one month of CTC, the
  entry-level bulk-hiring rate for agencies that only source and screen, and
  it cannot carry our readiness cost. Say "one and a half months of CTC" in
  writing where a reader might confuse 8.33% with the EPS rate or the
  statutory minimum bonus.
- Readiness floor for internship or deployment is **72%** on graded output.
- Target: readiness cost under **35% of placement revenue** at a 60%
  interview-to-offer conversion rate.
- Primary metrics are **interview-to-offer conversion against the GCC's own
  baseline** and **time-to-ready**. Time-to-fill, retention, cost-per-hire and
  CSAT are secondary — report them, but never lead with them.
- Vernacular first: every candidate-facing screen must work in 7 languages on
  a shared low-end Android phone.
- British English throughout.
- After any change, run the `review` skill.
- **WARN me before anything that could break an invariant.**

---

## Design system — every screen uses this

Derived from the GraminGCC logo and the Group 5 capstone deck. Do not
introduce new colours, fonts or radii without asking.

### Colour palette

```css
:root {
  /* Core brand — from the logo */
  --teal-deep:    #16433C;  /* primary surface, dark panels, headings */
  --forest:       #196237;  /* primary accent, step 1, charts */
  --leaf:         #458A39;  /* secondary accent, step 2 */
  --olive:        #65962B;  /* tertiary accent, step 3 */
  --terracotta:   #92460C;  /* brand counterpoint, CTAs, final step */
  --terracotta-l: #B5641E;  /* hover, lighter accent */
  --amber:        #E0A05C;  /* emphasis on dark surfaces only */

  /* Surfaces */
  --bg:           #FFFFFF;
  --surface-tint: #F4F8F3;  /* card fill on light */
  --surface-alt:  #F1F5F0;  /* zebra rows, subtle panels */
  --panel-dark:   #16433C;  /* dark card / sidebar */
  --panel-darker: #0F332E;  /* nested dark block */
  --panel-raised: #1E5047;  /* card on a dark background */

  /* Borders */
  --border:       #DCE7DA;
  --border-dark:  #2C6358;

  /* Text */
  --text-1:       #16433C;  /* headings on light */
  --text-2:       #3C5A4E;  /* body on light */
  --text-3:       #7A8C83;  /* muted, captions */
  --on-dark-1:    #FFFFFF;
  --on-dark-2:    #C9DCD2;
  --on-dark-3:    #8FBFA3;  /* eyebrow labels on dark */

  /* Status */
  --ok:           #3ECF82;
  --warn:         #F0B744;
  --danger:       #E05757;
}
```

**Rules of use.** Deep teal dominates (60–70% of visual weight). Greens carry
sequence and progress. Terracotta is the counterpoint — use it for the final
step, a CTA, or a single point of emphasis, never as a fill across a region.
Amber appears only on dark surfaces. Never put terracotta text on a green
fill, or green text on terracotta.

### Typography

| Role | Face | Size | Weight |
|---|---|---|---|
| Page / slide title | Cambria (serif) | 32–42px | 600 |
| Section heading | Cambria | 20–24px | 600 |
| Card title | Cambria | 15–17px | 600 |
| Body | Calibri | 14–16px | 400 |
| Eyebrow / label | Calibri | 10px, 2.2px letter-spacing, uppercase | 600 |
| Caption, footer | Calibri | 10–12px | 400 muted |

In web screens, Cambria falls back to `Georgia, 'Times New Roman', serif` and
Calibri to `system-ui, -apple-system, 'Segoe UI', sans-serif`.

### Layout and components

- Page gutter 0.5in / 24px minimum. Card gap 0.3in / 16px, used consistently.
- Cards: `border-radius: 10px`, 1px `--border`, fill `--surface-tint`.
- **Numbered step cards** are the signature pattern: a filled circle carrying
  the step number, title below, body below that, colour advancing
  forest → leaf → olive → terracotta across the sequence.
- **Takeaway bar**: a full-width `--panel-dark` block at the foot of a
  content screen, with an amber bold lead-in and light body — used to state
  what the persona on that screen actually gets.
- Icon dots: 0.2in / 8px filled circles in an accent colour, never outlined.
- **Never** use accent stripes, underlines beneath titles, or edge bars on
  cards. Set a card apart with a background tint or a shadow instead.
- Left-align body text. Centre only titles inside a pill or badge.
- Every screen needs a visual element — a chart, icon, map or step sequence.
  No screen is plain title plus bullets.

### Accessibility

- Body text contrast ≥ 4.5:1; large text ≥ 3:1. `--text-3` on white is for
  captions only, never for body copy.
- Never encode meaning in colour alone — a readiness band needs a label and a
  number, not just a green or amber dot.
- Every interactive element has a visible keyboard focus ring in `--forest`.
- Respect `prefers-reduced-motion`.
- Target size 44×44px minimum — a lot of our users are on a shared phone with
  a cracked screen.

---

## Vocabulary — use these words, not their synonyms

| Say | Not |
|---|---|
| Readiness | Training, upskilling |
| Candidate | Resource, headcount |
| Requisition | Opening, vacancy, demand (as a noun for one role) |
| Cohort | Batch |
| Skill map | Gap analysis, matching |
| Placement | Deployment (reserve "deployment" for SI engagements) |
| Tier-2 and rural | Non-urban, Bharat, hinterland |
| System Integrator / SI | Vendor, partner (ambiguous) |

Never describe this platform as a "rural talent marketplace". That was the
earlier GraminGCC framing and we repositioned away from it deliberately —
it invites CSR framing and it misstates the problem.
