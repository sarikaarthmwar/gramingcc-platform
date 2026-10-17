# Project Workflow and Collaboration Rules

## 1. Roles

- **Product owner:** approves scope, priorities, user journeys, and product acceptance.
- **Technical lead:** owns shared contracts, architecture, code review coordination, and integration quality.
- **Feature developer:** owns the assigned module and its tests/documentation.
- **QA/UAT owner:** validates acceptance criteria and records defects.

One person may hold multiple roles in an early-stage team.

## 2. Issue-first development

Each task should include:
- Title and problem statement
- Persona/user affected
- Expected outcome
- Acceptance criteria
- Priority: P0 (MVP blocker), P1 (important), P2 (later)
- Owner
- Dependencies and affected shared files
- Test/UAT notes

Do not begin a large, ambiguous feature without agreeing on the expected outcome.

## 3. Branch and PR policy

- `main` is the stable integration branch.
- Use descriptive branches: `feature/<short-name>`, `fix/<short-name>`, `docs/<short-name>`.
- Use pull requests for integration and review.
- Require one review and passing required checks where repository settings permit.
- Keep pull requests focused.
- Do not merge unresolved conflicts in shared contracts or styling.

## 4. Parallel development rules

- Assign clear ownership of each persona/module.
- Agree on shared types and mock-data contracts before parallel UI implementation.
- The platform-shell owner coordinates navigation, global styles, and shared components.
- Developers must notify the team before changing shared contracts, dependencies, root configuration, or global layout.
- Integrate frequently; avoid long-lived branches.
- Raise blockers early and record decisions in the issue or decision log.

## 5. Priority definitions

- **P0:** required to complete the three-persona mock-ready MVP or blocks other P0 work.
- **P1:** improves demo quality or enables the next integration phase.
- **P2:** post-MVP enhancement.

## 6. Preview and release

- Use pull-request preview deployments when configured.
- Validate the key journey on the preview before merging milestone work.
- Production deployment requires explicit approval from the authorized owner.
- A successful local build does not by itself prove that deployment or production behavior works.

## 7. Decision log

Store significant product or technical decisions under `docs/project/decisions/`. Each decision should include:
- Date and status (proposed/approved/superseded)
- Context/problem
- Decision
- Alternatives considered
- Consequences and follow-up actions
