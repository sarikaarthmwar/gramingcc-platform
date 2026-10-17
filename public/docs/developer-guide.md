# Developer Guide

## 1. Before coding

Every developer or coding agent must:
1. Read `README.md` and the relevant documents in `docs/`.
2. Inspect the current code, scripts, dependencies, and patterns before changing them.
3. Identify the GitHub Issue and its acceptance criteria.
4. Confirm the files/modules they own and list likely shared-file changes.
5. Ask before expanding scope or introducing a new service/dependency.

## 2. Work in small increments

- One issue or cohesive task per branch/PR.
- Prefer small, reviewable commits.
- Do not rewrite unrelated files or perform broad refactors during a feature task.
- Do not overwrite another developer's in-progress work.
- If shared types or APIs need to change, coordinate with the technical lead first.
- Keep documentation in sync with approved behavior changes.

## 3. Coding expectations

- Use TypeScript types for shared domain data.
- Reuse approved components and patterns.
- Keep persona-specific behavior inside the corresponding feature area.
- Avoid duplicating shared candidate, role, and assessment data structures.
- Use fictional mock data only until real data is approved.
- Include meaningful loading, empty, validation, and error states where applicable.
- Never hard-code secrets or place credentials in client-side code.

## 4. Git workflow

1. Update local `main`.
2. Create a focused branch, e.g. `feature/gcc-role-dashboard` or `fix/talent-mobile-nav`.
3. Implement only the scoped task.
4. Run relevant checks available in the repository.
5. Review the diff for unrelated changes, secrets, debug code, and accessibility issues.
6. Open a pull request linked to the issue.
7. Explain the change, tests, mock-only behavior, and known limitations.
8. Address review comments and merge only after approval and required checks.

Do not push directly to `main` unless the repository owner has explicitly established a different policy.

## 5. Coding-agent instructions

When using Claude Code or another coding agent, give it one issue at a time. Ask it to:
- Read this guide and the relevant product/architecture documents first.
- Inspect before editing.
- Propose a concise plan before making broad or risky changes.
- Restrict changes to the assigned scope.
- Run available checks and report actual results, not assumed results.
- List changed files, tests run, failures, limitations, and any manual UAT needed.
- Never claim a deployment, test, or integration succeeded unless it was actually verified.

## 6. Pull request template

Include:
- **Issue:** link or ID
- **Purpose:** user problem addressed
- **Changes:** key files and behavior
- **Validation:** commands run and actual outcome
- **Mocked/deferred:** anything not connected to a real service
- **Screenshots:** desktop and mobile for UI changes
- **Risks/limitations:** known gaps and follow-up issues

## 7. Environment and security

- Keep `.env.local` out of version control.
- Maintain `.env.example` with variable names and safe descriptions only.
- Do not put API keys in browser-visible variables unless the value is intentionally public.
- Use least-privilege access to repositories and services.
- Do not use real candidate personal data in development fixtures or screenshots.
