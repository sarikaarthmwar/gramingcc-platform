# Architecture and Engineering Boundaries

**Status:** Proposed baseline — verify against the repository before implementation.

## 1. Guiding principles

- One repository and one deployable web application for the MVP.
- Separate persona experiences while reusing common UI and data contracts.
- Mock-first implementation; real integrations are introduced deliberately.
- Keep modules small and ownership clear so multiple developers can work in parallel.
- Avoid premature microservices and unnecessary infrastructure.

## 2. Proposed structure

```text
app/                    # Routes and page composition
components/layout/      # Shared app shell, navigation, headers
components/ui/           # Reusable low-level UI components
features/gcc/            # GCC UI and persona-specific behavior
features/talent/         # Talent UI and persona-specific behavior
features/si/             # SI UI and persona-specific behavior
features/assessment/     # Assessment display and future service boundary
features/learning/       # Learning/preparation experience
features/opportunities/  # Opportunity discovery and matching UI
features/growth/         # Growth pathway UI
lib/mock-data/           # Fictional seed/demo data
lib/types/               # Shared TypeScript domain types
lib/utils/               # Generic helpers
docs/                    # Product, engineering, QA, and workflow guidance
```

Follow existing framework conventions if the repository already has a valid structure. Do not move or rename large areas without an issue and review.

## 3. Shared domain concepts

Initial concepts likely include:
- `TalentProfile`: stable ID, display name, location region (sample only), skills, experience/education summary, readiness status
- `RoleRequirement`: stable ID, role title, required skills, level, demand owner, status
- `AssessmentSummary`: assessment ID, score or level, strengths, improvement areas, completion status
- `Opportunity`: stable ID, role/requirement reference, status, next step
- `CandidatePipelineItem`: candidate ID, requirement ID, SI owner, stage, updated timestamp

These are conceptual contracts, not finalized schemas. The technical lead should define and review actual TypeScript types before persona developers build against them. Use stable IDs rather than matching records by display name.

## 4. Mock-data rules

- Keep demo data in a clearly named mock-data module.
- Use fictional names and non-sensitive sample information.
- Use the same IDs and shared objects across portals.
- Do not copy real resumes, contact details, or candidate records into source control.
- Keep mock behavior behind small functions or service interfaces where practical so persistence can replace it later.
- Label sample scores, recommendations, and status updates as demo data where needed.

## 5. Future integrations

Supabase/PostgreSQL, authentication, AI services, job-board imports, and notification services are future integration candidates. Before adding one:
1. Open an issue describing the user outcome.
2. Define ownership, data contracts, security/privacy requirements, and failure behavior.
3. Review cost and operational implications.
4. Add environment variables only through the approved secret-management mechanism.
5. Update this document and `.env.example` without real secret values.

## 6. Dependency and shared-file ownership

Coordinate changes to:
- `package.json` and lockfiles
- Root configuration and build settings
- Global styles and design tokens
- Shared app shell/navigation
- Shared TypeScript contracts
- Mock data consumed by multiple personas

Avoid having multiple branches independently redefine the same shared contract. Agree on it first, merge it, and then build in parallel.

## 7. Architecture decisions

Record significant decisions in issues or a short decision record under `docs/project/decisions/`. Include context, decision, alternatives considered, and consequences. Mark proposed decisions as proposed until approved.
