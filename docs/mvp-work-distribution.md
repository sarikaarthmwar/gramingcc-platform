# GraminGCC MVP — Scope, Work Distribution & Delivery Plan

**Status:** Initial working baseline  
**Product positioning:** Rural Talent. Global Impact.

## 1. MVP objective

Build a mock-ready, interactive GraminGCC platform that demonstrates a connected journey across three personas:

- **GCC:** defines capability/role demand and reviews talent readiness.
- **Talent:** builds a profile, views skill gaps, explores training, practises interviews and tracks opportunities.
- **System Integrator (SI):** supports sourcing, shortlisting, preparation and deployment pipeline tracking.

The MVP also establishes reusable AI capability boundaries and an integration-ready foundation for future enterprise talent systems such as Workday and SAP SuccessFactors.

**MVP principle:** use realistic fictional data first. Do not imply AI, external integrations, authentication or persistence are live until implemented and verified.

## 2. Work distribution

| Workstream | Owner(s) | Responsibility | Expected deliverables |
|---|---|---|---|
| Coding-agent instructions and skills | Phani | Create/maintain `CLAUDE.md` and the agreed skills setup (confirm whether the team wants `SKILLS.md` or a skills directory). | Agent instructions, reusable development guidance and team usage notes. |
| GCC persona | Senthil | Build the GCC-facing portal and demand workflow. | Dashboard, role/skill requirements, candidate shortlist/profile review and readiness view. |
| System Integrator persona | Kanamani | Build the SI-facing portal and candidate pipeline. | Dashboard, requirements list, sourcing/shortlisting mock flow, pipeline and readiness status. |
| Talent screens | Shiva / Sajeesh | Build the Talent-facing experience. | Profile, Skill Map/gap view, training recommendations, Interview Simulator, opportunities and growth view. |
| Shared integration and acceptance | Product owner / technical lead to confirm | Coordinate shared contracts, mock data, app shell, cross-portal journey and demo acceptance. | Shared types, consistent IDs, integrated demo and recorded acceptance. |

## 3. End-to-end demo journey

1. GCC views or creates a sample role/capability requirement.
2. The requirement specifies skills and target proficiency.
3. SI views the requirement and shortlists fictional candidates.
4. Talent views a Skill Map, current evidence and development gaps.
5. Talent explores recommended training and an interview practice experience.
6. A mock practice outcome updates displayed skill/readiness evidence.
7. SI tracks the candidate through a sample pipeline stage.
8. GCC reviews the candidate profile and readiness summary.

Use the same fictional role and talent IDs across all portals so the demo feels like one connected platform.

## 4. Persona scope and acceptance criteria

### GCC — Senthil
**Scope:** dashboard; view/create a mock role requirement; required skills and target proficiency; candidate shortlist; candidate profile and readiness summary; requirement status.

**Acceptance:** GCC can inspect a role's skills and open a candidate from the shortlist; the same candidate data is consistent across portals; primary navigation/actions work; mock data is clearly labelled.

### System Integrator — Kanamani
**Scope:** SI dashboard; assigned/available requirements; candidate sourcing and shortlisting mock flow; pipeline stages and readiness status.

**Acceptance:** SI can find a sample requirement and shortlist a candidate; a mock stage update works if included; GCC and Talent show consistent records; no action falsely claims a production update or external sync.

### Talent — Shiva / Sajeesh
**Scope:** talent profile and skills; Skill Map with current/target skills, evidence and gaps; sample training recommendations; Interview Simulator with mock questions and sample feedback or clearly simulated prototype; opportunities, readiness and growth pathway.

**Acceptance:** talent can understand gaps against a target role; training recommendations relate to those gaps; simulated feedback is labelled; sample scores do not imply a verified credential.

### Coding-agent instructions and skills — Phani
**Scope:** create the agreed coding-agent instruction file (such as `CLAUDE.md` if Claude Code is intended); create `SKILLS.md` or the team's agreed skills directory/format; document rules for reading project docs, inspecting before editing, staying in scope, coordinating shared files and reporting real test results.

**Acceptance:** developers can find the instructions at the repository root; instructions reference actual project docs/scripts; the team confirms filenames and format.

## 5. Integration-ready foundation

The first demo does **not** require live Workday or SAP SuccessFactors connections.

MVP foundations:
- Define shared domain concepts: `TalentProfile`, `RoleRequirement`, `Skill`, `AssessmentSummary`, `LearningProgress`, `Opportunity` and `CandidatePipelineItem`.
- Define a conceptual connector contract and integration status model.
- If time permits, include an Integrations screen with mock connector status and sample sync logs, clearly labelled as simulated.
- Decide the system of record for each object before enabling outbound writes.

Post-MVP connector work must validate customer authorization, API support, object mappings, tenant-specific credentials, retries, idempotency, sync monitoring and audit history. Never commit real credentials or customer data.

## 6. AI capability boundaries

Skill Map, Interview Simulator and Training should be reusable modules, not independently reimplemented in each persona portal. The AI layer should use controlled services and validated inputs/outputs; business data and permissions remain owned by the core platform.

For the MVP, mock AI responses are acceptable if clearly labelled. Production AI quality evaluation, model selection, cost monitoring and long-running background processing can be added when requirements are confirmed.

## 7. Proposed technical direction

Subject to verifying the actual repository:
- Next.js + TypeScript + Tailwind CSS.
- One repository and one deployable application (modular monolith) for the MVP.
- Shared UI components, shared TypeScript contracts and deterministic fictional mock data.
- Vercel for preview/deployment if suitable.
- Supabase/PostgreSQL in a later persistence phase, with tenant-aware data design and server-side authorization/RLS where appropriate.
- Logical AI and integration service boundaries; no microservices until justified by scale or operational requirements.

Do not reorganize a working codebase or add dependencies without reviewing existing conventions and agreeing the change.

## 8. Repository and collaboration rules

Suggested areas:

```text
app/ (gcc/, talent/, si/, optional integrations/)
components/ (layout/, ui/)
features/ (gcc/, talent/, si/, skill-map/, interview-simulator/, training/, opportunities/, readiness/)
services/ (ai/, integrations/)
lib/ (mock-data/, types/, utils/)
docs/ (product requirements, architecture, AI/integration guidance, QA and workflow)
README.md
CLAUDE.md      # if confirmed
SKILLS.md      # if confirmed
```

- Keep `main` stable and deployable.
- Use focused branches, e.g. `feature/gcc-persona`, `feature/si-persona`, `feature/talent-screens`, `docs/claude-skills`.
- Open a pull request per logical change; link the relevant issue.
- Require review and passing checks where repository settings support them.
- Coordinate shared types, navigation, global styles, root configuration, dependencies and mock data.
- Never commit secrets, `.env.local`, real candidate information or production exports.
- Coding agents must inspect before editing and must not claim unverified tests or deployments succeeded.

## 9. Definition of Done

- Acceptance criteria are met; changes stay within the assigned scope.
- Shared types and mock records are consistent across portals.
- Available lint/type-check/build checks are run and actual outcomes reported.
- UI changes are checked on mobile and desktop; accessibility basics are checked.
- Primary actions work or are clearly marked as future scope.
- Mocked behavior and known limitations are disclosed.
- No secrets or real personal data are included.
- Preview link/screenshots are provided when available.
- Documentation is updated when an approved behavior or decision changes.

## 10. MVP exclusions

Unless separately approved, the first milestone excludes production authentication/authorization, live AI evaluation, live Workday/SAP/job-board integrations, production candidate data imports, production LMS/credential verification, production database persistence, notifications and placement transactions.

## 11. Suggested implementation sequence

1. **Foundation:** confirm framework/scripts and branch rules; agree shared types and mock IDs; confirm app shell and coding-agent instructions.
2. **Parallel build:** Senthil—GCC; Kanamani—SI; Shiva/Sajeesh—Talent; Phani—coding-agent instructions/skills.
3. **Integration:** connect screens using the same mock records and verify the end-to-end journey.
4. **Demo readiness:** run available checks, validate mobile/desktop, record gaps and obtain product-owner UAT.

## 12. Decisions to confirm

- Name the technical lead/repository owner.
- Confirm “Claude.dmg and Skills.dmg” means `CLAUDE.md` and a skills file/directory.
- Confirm whether the Integrations screen is required in the first visual demo.
- Choose the first target role/capability for the demo.
- Confirm the demo date and UAT owner.
