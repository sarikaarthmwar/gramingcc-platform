# GraminGCC MVP — Product Requirements

**Status:** Initial working baseline  
**Audience:** Product owner, design, engineering, QA  
**Scope:** Mock-ready GCC, Talent, and System Integrator (SI) portals

## 1. Product intent

GraminGCC connects rural and semi-urban talent with GCC work through a journey of sourcing, assessment, preparation, opportunity, deployment, and continued growth. It is a talent creation and deployment model, not a CSR-only initiative.

## 2. MVP outcome

A stakeholder should be able to navigate the three persona experiences and understand how demand, talent readiness, and sourcing/deployment activities connect. Mock data is acceptable; broken navigation and misleading claims are not.

## 3. Personas and capabilities

### GCC
**Primary need:** Express workforce demand and identify suitable talent.

MVP screens:
- Overview dashboard
- Role/skill demand list and role detail
- Candidate shortlist or matched talent list
- Candidate profile with skills, assessment summary, and readiness
- Requirement status

### Talent
**Primary need:** Understand current capability, improve readiness, and discover relevant opportunities.

MVP screens:
- Profile and skills
- Assessment result with score, strengths, and improvement areas
- Preparation/learning recommendations (clearly marked as sample content)
- Opportunities and application/readiness status
- Growth pathway or future skills view

### System Integrator (SI)
**Primary need:** Source, prepare, and track talent against GCC demand.

MVP screens:
- SI overview
- GCC requirements assigned or available
- Candidate sourcing and shortlist
- Candidate pipeline
- Training/assessment readiness and deployment status

## 4. Demonstration journey

1. GCC reviews or creates a sample role requirement.
2. SI opens the requirement and shortlists sample candidates.
3. Talent profile displays skills and a sample assessment outcome.
4. SI updates the candidate's mock pipeline status.
5. GCC reviews the candidate and readiness summary.
6. Talent can see a sample opportunity or growth pathway.

Use a consistent candidate and role identity across the portals wherever possible.

## 5. MVP functional requirements

- Each persona is accessible from a clear entry point.
- Each portal has navigation appropriate to its role.
- Primary buttons and links perform a meaningful demo action or are visibly marked as unavailable/future scope.
- Lists, detail views, empty states, and basic validation are included where relevant.
- Mock actions must not imply that data was saved to a production system.
- The UI is usable on mobile, tablet, and desktop.
- All sample data is fictional.

## 6. Non-functional requirements

- Shared components and shared types are preferred over duplicated implementations.
- Use semantic HTML, keyboard-accessible controls, visible focus states, and readable contrast.
- Handle loading, empty, and error states where data operations are represented.
- Avoid logging sensitive information.
- No secrets or real candidate information in the repository.
- Keep routes and modules organized so real services can be introduced later.

## 7. Explicitly deferred

Unless approved in a new issue, the MVP does not require:
- Production identity management or role-based access control
- Real candidate import, job-board APIs, or ATS integrations
- Live assessment engines or proctoring
- Real AI-generated assessment, learning, or matching
- Production database persistence
- Email/SMS/WhatsApp notifications
- Payments, contracts, or placement transactions
- Analytics beyond seeded demo summaries

## 8. Acceptance criteria

The MVP is demo-ready when:
- All three portals are reachable and responsive.
- The key journey in section 4 can be demonstrated without broken links.
- Sample roles, candidate profiles, assessment results, and statuses are consistent.
- No primary action is misleading or inert without explanation.
- No obvious console errors or build failures remain.
- Mock-only behavior is documented.
- Product owner has reviewed the preview and accepted or recorded remaining gaps.

## 9. Change control

A scope change must be recorded in a GitHub Issue with:
- User problem and expected outcome
- Persona affected
- Acceptance criteria
- Priority and owner
- Whether it is MVP or post-MVP
- Dependencies and data/security implications
