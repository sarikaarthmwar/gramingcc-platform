# Design System and UX Rules

**Status:** Initial guidance; align final visual tokens with the approved GraminGCC brand assets.

## 1. Brand and product presentation

- Product name: **GraminGCC**
- Tagline: **RURAL TALENT GLOBAL IMPACT**
- The platform should feel credible, inclusive, professional, and accessible to rural/semi-urban talent and enterprise users.
- Use the official GraminGCC logo and approved assets from `public/` when available. Do not redraw or replace the official mark without approval.
- Do not add unrelated brand signatures or third-party company branding to GraminGCC screens.

## 2. Shared layout

- Provide a consistent app shell and responsive navigation.
- Make the active persona and current section clear.
- Keep global navigation and reusable UI components in shared folders.
- Persona-specific menus and content belong in their own feature modules.
- Use consistent page titles, section headings, buttons, forms, cards, tables, status labels, and spacing.

## 3. UX principles

- Prefer plain, direct language; explain acronyms when first used.
- Design for mobile-first usability and varied levels of digital confidence.
- Make the next action obvious.
- Use progress and readiness indicators with explanatory labels, not color alone.
- Avoid unnecessary jargon and dense enterprise tables on small screens.
- Provide empty, loading, success, validation, and error states when relevant.
- Do not imply that simulated scores, matches, or status updates are real evaluations or live integrations.

## 4. Accessibility

- Use semantic headings and form labels.
- Ensure keyboard navigation and visible focus states.
- Maintain readable contrast and text sizing.
- Do not communicate status by color alone.
- Give icon-only controls accessible names.
- Avoid relying on hover as the only way to reveal important information.

## 5. Components

Build reusable components in `components/ui/` only when they are generic enough to serve multiple features. Put persona-specific compositions in `features/<persona>/`. Avoid one-off global styles for a single screen.

## 6. Responsive acceptance

At minimum, manually check:
- Narrow mobile width
- Tablet width
- Desktop width

Navigation, forms, candidate cards, tables, and dashboards must remain usable without accidental horizontal overflow.
