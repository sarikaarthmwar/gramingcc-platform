# QA and Testing Strategy

## 1. Purpose

Ensure the mock-ready MVP is reliable enough for stakeholder demonstrations and can evolve safely as developers add modules.

## 2. Minimum checks for each PR

- Application starts using the documented command.
- Relevant lint/type-check/build scripts are run if available.
- Changed routes render without runtime errors.
- Primary buttons and links work or are clearly marked as future scope.
- Responsive layout is checked on mobile and desktop.
- Keyboard navigation and visible focus are checked for new controls.
- No secrets or real personal data are introduced.
- Screenshots are attached for material UI changes.

Report commands and actual outcomes. If a check cannot be run, say why; do not claim it passed.

## 3. MVP journey smoke test

1. Open the platform landing page.
2. Enter the GCC portal.
3. View a role requirement and candidate shortlist.
4. Open a candidate profile and review sample skills/readiness.
5. Enter the SI portal and view the same requirement/candidate IDs.
6. Change a mock pipeline stage if that interaction is implemented.
7. Enter the Talent portal and view the matching sample profile and assessment.
8. Navigate to sample preparation/opportunity/growth screens.
9. Verify responsive navigation at narrow and desktop widths.
10. Confirm the UI makes clear that data is simulated.

## 4. Test data

Use deterministic fictional fixtures. Avoid random values that make screenshots and tests unstable. Keep shared IDs consistent across persona screens.

## 5. Bug reporting

Every bug issue should include:
- Expected behavior
- Actual behavior
- Reproduction steps
- Persona and route
- Device/browser where relevant
- Screenshot or console/build output when useful
- Severity and acceptance criteria for the fix

## 6. Definition of Done

A task is done only when:
- Acceptance criteria are met.
- Relevant checks have been run and results reported.
- Responsive and accessibility basics are checked for UI changes.
- No unrelated changes or secrets are present.
- Known limitations and mocked behavior are disclosed.
- A preview is available when the change is UI-facing and preview deployment is configured.
- Product owner completes UAT for milestone-level work.
