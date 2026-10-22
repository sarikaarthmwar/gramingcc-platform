# GraminGCC Platform

**Rural Talent. Global Impact.**

GraminGCC is a talent-to-work platform designed to connect rural and semi-urban talent with Global Capability Centre (GCC) opportunities through sourcing, assessment, preparation, deployment, and continuous development.

This repository contains the initial GraminGCC platform MVP. The first milestone is a **mock-ready, interactive experience for three user personas**:

- **GCC** — defines talent demand and reviews candidate readiness.
- **Talent** — builds a profile, understands skill gaps, and explores preparation and opportunities.
- **System Integrator (SI)** — supports sourcing, shortlisting, preparation, and deployment tracking.

The MVP is intended to demonstrate a believable end-to-end journey. It is not yet a production recruitment, assessment, learning, or placement system.

## MVP goals

1. Deliver navigable, responsive GCC, Talent, and SI portal screens.
2. Use consistent shared components, types, and mock data.
3. Demonstrate how a role requirement, candidate profile, assessment result, and readiness status connect across personas.
4. Allow developers to build independent modules without destabilizing the shared application.
5. Establish a reviewed Git workflow and clear acceptance/testing rules.

## Initial technology direction

The initial web app uses Next.js App Router, React, TypeScript, and custom CSS. Vercel is the intended preview/deployment option. The first screens use mock content only; Supabase/PostgreSQL, authentication, live AI services, and enterprise integrations remain future decisions.

Do not introduce a backend or external service solely because it appears in a proposed direction.

## Start here

Before implementing a task, read:

1. [`docs/product-requirements.md`](docs/product-requirements.md)
2. [`docs/architecture.md`](docs/architecture.md)
3. [`docs/design-system.md`](docs/design-system.md)
4. [`docs/developer-guide.md`](docs/developer-guide.md)
5. [`docs/qa/testing-strategy.md`](docs/qa/testing-strategy.md)
6. [`docs/project/workflow.md`](docs/project/workflow.md)

If a document conflicts with an approved issue or a newer decision recorded by the project owner, stop and clarify rather than guessing. Update the relevant documentation when an approved decision changes.

## Local setup

The initial Next.js application is scaffolded in this repository.

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js, normally `http://localhost:3000`.

Available checks:

```bash
npm run typecheck
npm run build
```

The homepage is at `/`. The `/gcc`, `/talent`, and `/si` routes are clearly labelled persona-workspace previews, not production portals.

## Suggested repository layout

```text
gramingcc-platform/
├── app/
│   ├── page.tsx
│   ├── gcc/
│   ├── talent/
│   └── si/
├── components/
│   ├── layout/
│   └── ui/
├── features/
│   ├── gcc/
│   ├── talent/
│   ├── si/
│   ├── assessment/
│   ├── learning/
│   ├── opportunities/
│   └── growth/
├── lib/
│   ├── mock-data/
│   ├── types/
│   └── utils/
├── public/
├── docs/
│   ├── qa/
│   └── project/
├── .env.example
└── README.md
```

This is a recommended starting structure, not a mandate to reorganize a working repository without review.

## Collaboration rules

- `main` must remain stable and deployable.
- Work on a focused feature branch and open a pull request.
- One pull request should represent one logical change or issue.
- Obtain at least one review before merging where repository settings allow.
- Keep shared types, navigation, global styles, and dependencies coordinated.
- Do not commit secrets, credentials, personal candidate data, or production exports.
- Use mock/sample data until real data handling is explicitly approved.
- Record meaningful product or architecture decisions in `docs/`.

## MVP status and non-goals

### In scope
- Mock-ready persona portals
- Responsive navigation and shared design components
- Seeded example roles, talent profiles, assessments, and pipeline statuses
- Demonstrable cross-persona journey
- Clear placeholders for future integrations

### Not required for the first demo
- Production authentication or authorization
- Live candidate sourcing integrations
- Real AI assessments or AI-generated recommendations
- Production learning-management functionality
- Payments, contracts, or placement transactions
- Production database and notification integrations

Do not present simulated functionality as live or production-ready.

## Contributing

See [`docs/developer-guide.md`](docs/developer-guide.md) and [`docs/project/workflow.md`](docs/project/workflow.md). Every change should state what changed, how it was tested, what remains mocked, and any known limitations.

## Product ownership

The product owner approves scope, user journeys, priorities, and material product decisions. The technical lead coordinates architecture, shared contracts, code quality, and integration. Developers own their assigned modules and must raise conflicts early.


## Interview simulator

The Talent interview simulator is available at `/talent/interview`. It supports three entry-level GCC role tracks (Junior Data Analyst, QA / Test Automation Associate, and AI Operations Associate), with mixed, technical, and behavioural/situational practice formats.

- **Demo mode:** uses prepared role-specific questions and transparent heuristic feedback; it does not call an AI model.
- **Live AI mode:** generates questions and returns rubric-based practice feedback through the server-side `/api/interview` route.
- **Configuration:** set `OPENAI_API_KEY` as a server-side environment variable in Vercel. Optionally set `OPENAI_MODEL`; the route defaults to `gpt-4.1-mini`. Never expose the key in browser code.
- **Privacy:** the prototype does not persist answers. Learners should not enter personal or confidential information.
- **Limitations:** the simulator is for learning, not hiring decisions or validated psychometric assessment. Validate practical ability with work samples and mentor review. Live AI feedback may be wrong or incomplete.

For local development, add the variables in `.env.example` to `.env.local`, then run `npm run dev`. Run `npm run typecheck` and `npm run build` before merging.
