# GraminGCC Six-Month Product Roadmap

**Planning window:** November 2026 – April 2027  
**Cadence:** 12 two-week sprints  
**Product promise:** Rural Talent. Global Impact.

> This is a proposed delivery plan, not a statement that the listed capabilities already exist. Sprint 1 begins with a baseline audit of the current repository and deployed experience. Adjust scope after that audit.

## Release map

| Month | Sprint | Release name | Intended Git tag | Objective |
|---|---:|---|---|---|
| November 2026 | 1 | 🌱 Seed | v0.1.0-seed (planned) | Foundation, candidate registration and profiles |
| November 2026 | 2 | 🌿 Sprout | v0.2.0-sprout (planned) | Assess skills and identify gaps |
| December 2026 | 3–4 | 🌳 Roots | v0.3.0-roots (planned) | Learning paths and AI-assisted preparation |
| January 2027 | 5–6 | 🌷 Blossom | v0.4.0-blossom (planned) | Employer onboarding and opportunity matching |
| February 2027 | 7–8 | 🌸 Bloom | v0.5.0-bloom (planned) | Operate and measure the 25-intern pilot |
| March 2027 | 9 | 🌳 Canopy | v0.6.0-canopy (planned) | Talent and pilot intelligence |
| March 2027 | 10 | 🌲 Grove | v0.7.0-grove (planned) | Partner onboarding and repeatable sourcing |
| April 2027 | 11–12 | 🌍 Evergreen | v1.0.0-evergreen (planned) | Security, reliability, UAT and production readiness |

**Tagging policy:** These are proposed tag names only. Create an actual Git tag/GitHub Release only after the corresponding release is implemented, reviewed, tested, and tied to the exact approved commit. The final v1.0.0 should only be used if production-readiness criteria pass.

## Sprint plan

### Sprint 1 — 🌱 Seed: Platform foundation (November)
**Objective:** Confirm the baseline and establish the core candidate journey.
- Audit current app, routes, mock data, architecture, deployment and test coverage.
- Confirm MVP scope, roles, data ownership, and architecture decisions.
- Build or refine candidate registration/profile flow and shared navigation.
- Define core entities and TypeScript contracts for talent, skills, assessments, employers and roles.
- Confirm role boundaries and avoid adding a backend or external service without an approved decision.

**Acceptance criteria**
- Baseline audit and prioritized gaps documented.
- Candidate profile flow works on mobile and desktop.
- Shared types and navigation are reviewed.
- npm run typecheck and npm run build pass, or existing failures are documented.

### Sprint 2 — 🌿 Sprout: Talent assessment (November)
**Objective:** Capture a consistent skills baseline.
- Create assessment questionnaire and scoring model.
- Capture education, skills, experience and career interests.
- Show assessment results, skill gaps and readiness indicators.
- Provide an admin/reviewer view of assessment results.

**Acceptance criteria**
- Assessment can be completed end to end.
- Scoring is deterministic and explainable.
- Results and gaps are visible to the intended persona.
- Validation, empty states and error states are tested.

### Sprint 3 — 🌳 Roots: Learning paths (December)
**Objective:** Turn assessment gaps into structured preparation.
- Define one or two pilot capability tracks.
- Map gaps to learning resources, exercises and completion criteria.
- Build learning-path and progress views.
- Allow an authorized trainer/admin to manage the pilot learning content.

**Acceptance criteria**
- Candidate can see a relevant learning path and update progress.
- Track content and completion rules are documented.
- Scope remains lean; do not build a full LMS.

### Sprint 4 — 🌳 Roots: AI-assisted preparation (December)
**Objective:** Help candidates practise and measure improvement.
- Add AI learning assistance behind a configurable integration boundary.
- Add mock interview workflow and structured feedback.
- Add communication/workplace-readiness exercises.
- Reassess candidates and compare against baseline.
- Clearly label simulated or mocked behaviour until a live service is approved.

**Acceptance criteria**
- AI/mock workflow is usable and errors are handled.
- Feedback is stored or reviewable in the current architecture.
- Candidate improvement can be compared against baseline.
- No simulated feature is presented as a live production integration.

### Sprint 5 — 🌷 Blossom: Employer and role onboarding (January)
**Objective:** Represent genuine GCC demand.
- Create employer/GCC organization profiles.
- Define job roles, required skills and opportunity details.
- Build role listing and candidate application/interest flow.
- Add candidate consent and access boundaries for profile sharing.

**Acceptance criteria**
- Authorized employer can create and manage a role.
- Candidate can view relevant role details and express interest.
- Consent and access behaviour is clear and tested.

### Sprint 6 — 🌷 Blossom: Matching and shortlisting (January)
**Objective:** Connect candidate readiness to role requirements.
- Match candidate skills/readiness to role requirements.
- Explain match rationale and highlight gaps.
- Add shortlist, interview-status and employer-feedback workflow.
- Capture outcome data for later reporting.

**Acceptance criteria**
- Matching is understandable and testable, not a black-box decision.
- Employer can review and progress candidates.
- Candidate and employer views remain consistent.

### Sprint 7 — 🌸 Bloom: Cohort operations (February)
**Objective:** Run the planned pilot cohort.
- Create cohorts and enrol up to 25 interns.
- Assign mentors/trainers and learning tracks.
- Track attendance, assessments and learning completion.
- Build an operations dashboard for cohort progress.

**Acceptance criteria**
- Admin can manage cohort membership and progress.
- Data supports the planned 25-intern pilot.
- Critical cohort workflows are tested with sample users.

### Sprint 8 — 🌸 Bloom: Pilot outcomes (February)
**Objective:** Measure whether the model is working.
- Track completion, readiness, certifications, interviews and placement outcomes where available.
- Capture candidate, mentor and employer feedback.
- Run end-to-end pilot user acceptance testing.
- Fix critical workflow issues and document pilot learnings.

**Acceptance criteria**
- Pilot metrics are defined and visible.
- Outcomes are based on recorded data, not assumed values.
- Critical defects are resolved or explicitly accepted with a mitigation plan.

### Sprint 9 — 🌳 Canopy: Talent intelligence (March)
**Objective:** Make supply, readiness and pilot performance visible.
- Build dashboards for candidate supply, skills and readiness.
- Compare baseline and post-preparation results.
- Track cohort completion and employer engagement/conversion.
- Add useful filters by skill, cohort, location and readiness.

**Acceptance criteria**
- Dashboard figures reconcile with source records.
- Metric definitions are documented.
- Empty and low-data states are handled.

### Sprint 10 — 🌲 Grove: Partner sourcing (March)
**Objective:** Add repeatable candidate sourcing channels.
- Onboard colleges and training partners.
- Support controlled CSV candidate imports.
- Validate fields, flag duplicates and report import errors.
- Track referral/source channel and partner contribution.

**Acceptance criteria**
- Valid records import successfully and invalid rows are explained.
- Duplicate handling is predictable.
- Imported candidates use the same governed workflow as other candidates.
- Defer external job-board APIs until access and business value are confirmed.

### Sprint 11 — 🌍 Evergreen: Reliability and security (April)
**Objective:** Prepare the integrated platform for real-world use.
- Review authorization and candidate-data protection.
- Test core workflows, API validation and failure handling.
- Configure monitoring, error reporting, backup and recovery appropriate to the chosen stack.
- Improve mobile usability, accessibility and performance.

**Acceptance criteria**
- No unresolved critical security or workflow defects.
- Backup/recovery and monitoring approach is documented and verified where applicable.
- Key journeys pass regression tests.

### Sprint 12 — 🌍 Evergreen: UAT and launch readiness (April)
**Objective:** Validate the release and make a go/no-go decision.
- Run end-to-end regression and user acceptance tests.
- Resolve critical/high-priority defects.
- Document deployment, rollback, admin and support procedures.
- Verify environment configuration and secrets handling.
- Publish release notes and record known limitations.

**Acceptance criteria**
- Product owner signs off on UAT.
- Build/type checks and critical journeys pass.
- Rollback/support notes exist.
- Production launch is approved only if security, reliability and data-handling gates pass.

## Working agreements
- Keep main stable; use focused feature branches and pull requests.
- One issue should represent one logical deliverable.
- Every PR states what changed, how it was tested, what remains mocked, and known limitations.
- Do not commit credentials, secrets, or real candidate personal data.
- Review existing product/architecture documentation before changing core contracts.
- Use a demo and acceptance review at the end of each sprint.
- Replan scope after Sprint 1 baseline audit rather than rebuilding existing work.

## Suggested release notes format
- What changed
- Who benefits
- How to try it
- Tests/checks performed
- Known limitations
- Next release
