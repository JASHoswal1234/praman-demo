# prompt.md — Master Coding-Agent Instructions
## AICTE Security Deposit / FDR Portal — Frontend Demo

## 1. Mission

Build a polished, cohesive, end-to-end **frontend demonstration** of an AICTE Security Deposit / Fixed Deposit Receipt (FDR) management portal.

The result must feel like a complete operational product rather than a collection of disconnected mockup screens. Users should be able to move through institution submission, scrutiny, simulated bank verification, maturity/renewal tracking, release review, and evidence/audit history.

This phase is frontend-only. Use deterministic synthetic data and clearly labelled simulations. Do not connect to real AICTE systems or banks, and do not imply that live verification, real fund monitoring, or actual lien release is happening.

## 2. Read the project instructions first

Before editing any code, read these files in full:

1. `design.md` — authoritative visual design, theme, typography, layout, anti-AI-slop constraints, accessibility, and component styling.
2. `roadmap.md` — authoritative product scope, route/screen inventory, mock-data scenarios, user roles, end-to-end demo journeys, milestones, and definition of done.
3. `prompt.md` — this file; authoritative agent execution and engineering process.

If a conflict exists:
- `design.md` governs visual design and theme.
- `roadmap.md` governs product behavior, scope, and workflows.
- `prompt.md` governs how work is executed and validated.
- Preserve existing working application behavior unless it directly conflicts with an explicit requirement in these files. If a genuine conflict cannot be resolved, explain it rather than silently guessing.

Do not duplicate these documents by inventing an alternative design system or a different product scope.

## 3. Inspect before changing

First inspect the existing repository:
- Framework, package manager, scripts, folder structure, routes, and current entry points
- Existing pages, shared components, styling conventions, CSS variables, and theme switching
- Existing dependencies and component libraries
- Existing data models, mock data, state management, and working user flows
- Current build/test/lint/typecheck status where feasible

Do not assume the repository is empty. Do not replace the application wholesale, delete working functionality, or change frameworks simply to match a preferred architecture.

After inspection:
1. Summarize the current implementation briefly.
2. Map existing functionality to `roadmap.md`.
3. Identify missing or incomplete areas and any blockers.
4. Produce a concise milestone plan.
5. Begin implementation immediately after the plan. Do not stop after analysis or wait for approval unless a real ambiguity, destructive change, missing credential, or other blocker makes proceeding unsafe or impossible.

## 4. Implementation approach

Implement the product incrementally in the milestone order defined by `roadmap.md`. Adapt the sequence to the repository where necessary, but preserve the intended dependencies between features.

Recommended order:
1. Shared design tokens, typography, reusable components, responsive app shell, demo indicator, role switcher, and reset control
2. Landing page and demo entry
3. Typed synthetic data and core overview/register
4. FDR detail / verification passport and submission wizard
5. Scrutiny and simulated bank verification
6. Maturity, replacement FDRs, and release workflow
7. Audit trail, policy/rules, settings, accessibility, and visual polish
8. End-to-end validation and judge-demo preparation

Keep changes scoped and incremental. Prefer small, coherent components over one enormous page component. Use the existing framework and libraries where reasonable; add dependencies only when a clear need exists.

## 5. Visual quality is a requirement

Follow `design.md` precisely. In particular:
- Use the exact CSS theme tokens supplied by the user, including the existing light and dark theme values and `@theme inline` mappings.
- Do not reintroduce the previously proposed forest-green/sage/gold palette.
- Preserve the supplied coral-red primary/accent, neutral surfaces, typography, chart colors, radius, spacing, and shadow tokens.
- Recreate the landing-page composition from the supplied reference: spacious two-column hero, clear left-side copy and CTAs, and large right-aligned geometric artwork.
- Keep the design distinctive through layout, typography, geometric composition, realistic document previews, evidence comparisons, and carefully managed information density—not decorative effects.
- Avoid generic SaaS templates, random gradients, glassmorphism, neon/glow effects, stock AI illustrations, meaningless metric cards, fake charts, and decorative elements unrelated to the workflow.
- Do not fill space with arbitrary illustrations. Every visual element should clarify product identity, evidence, status, risk, or next action.
- Maintain consistent spacing, alignment, table density, button sizing, status treatments, and responsive behavior across all routes.
- Use the existing design tokens in components rather than scattering hardcoded colors.

Do not redesign unrelated screens just because the landing-page reference is visually distinctive. Apply the same theme consistently while preserving each screen's workflow-specific hierarchy.

## 6. Build real interactions, not clickable-looking mockups

Every visible control must do what it claims, or be explicitly disabled with a reason.

Implement and test, as applicable:
- Navigation and active states
- Role switching
- Search, filters, sorting, pagination, and reset controls
- Forms, validation, stepper navigation, upload selection, and confirmation dialogs
- Tabs, drawers, modals, expandable evidence, and event details
- Workflow actions such as requesting confirmation, recording reviewer disposition, submitting a simulated bank response, adding a clearance, and advancing a release case
- Demo reset to restore the initial deterministic seed state

A state-changing action must update the underlying demo state and every relevant view. For example, a simulated bank response should update the verification request, FDR detail, related queue counts/status, and audit history. Do not update only a label or show a success toast without changing the actual state.

Do not add fake interactions solely to make a screen look complete. If a feature is outside this phase, label it as unavailable or simulated and explain why.

## 7. Keep data and workflow logic coherent

- Keep synthetic fixtures separate from UI components.
- Use typed entities and explicit status enums when supported by the existing stack.
- Maintain consistent references between institutions, FDRs, documents, verification requests, scrutiny findings, release cases, and audit events.
- Derive overview counts and queue contents from the shared data rather than hardcoding unrelated numbers.
- Use a fixed demo date or a clearly defined demo clock so seeded maturity dates and “days remaining” values remain reproducible.
- Provide a reliable reset mechanism.
- Preserve old document versions and record changes as events rather than silently overwriting evidence.
- Show provenance for important fields: institution-submitted, OCR-extracted/illustrative extraction, reviewer-confirmed, simulated bank response, or system-derived.
- Make discrepancies explainable by showing the compared values, evidence source, rule or reason, and next action.
- A discrepancy is a review flag, not automatic proof of fraud.
- A file fingerprint shows whether the received copy has changed within the demo's defined scope; it does not prove bank issuance or authenticity.
- Do not treat OCR output, metadata, a matching document, or an anomaly score as bank confirmation.

## 8. Demo truthfulness and safety boundaries

The demo must use fictional records and clearly identify simulation:
- Persistent `DEMO ENVIRONMENT · SYNTHETIC DATA` indicator in the application shell
- Synthetic institution names, FDR references, bank-side records, officer identities, amounts, and documents
- `Simulated bank response` labels wherever relevant
- No real personal banking data, real signatures, or realistic copied bank seals
- No fake customer logos, testimonials, performance statistics, or unsupported impact claims
- No claim of real-time monitoring or actual bank-side lien control
- No claim of blockchain anchoring, production-grade tamper-proof audit, live OCR/LLM processing, or live API integration unless genuinely implemented—and none is in scope for this frontend-only phase
- No fabricated regulatory rules. Clearly distinguish policy references supplied by the project from illustrative operational rules.

Use a synthetic FDR document preview marked `SAMPLE / DEMO`. The document should look realistic enough to explain the workflow but must not be mistaken for a genuine financial instrument.

For policy or copilot content, display source references only when present in the project's supplied materials. If the source does not support a claim, mark the example as illustrative or omit the claim.

## 9. Frontend architecture and code quality

- Follow existing project conventions and naming patterns.
- Separate presentation components, mock fixtures, status/config definitions, and workflow helpers.
- Use reusable components for status labels, evidence provenance, field comparisons, timelines, tables, filters, and dialogs.
- Keep business rules out of purely presentational components.
- Avoid unnecessary abstractions, duplicated components, and oversized files.
- Handle loading, empty, error, success, validation, and disabled states.
- Use semantic HTML, labelled form controls, keyboard navigation, and visible focus states.
- Respect reduced-motion preferences.
- Ensure responsive behavior on desktop, tablet, and mobile.
- Avoid introducing secrets or credentials into source code.
- Do not add a backend, database, external service, or API integration during this phase.

Do not claim a dependency or feature is implemented unless it exists in the code.

## 10. Work management and communication

- Keep a small checklist of roadmap milestones and update it as work progresses.
- Work through the full roadmap rather than polishing only the landing page.
- Do not stop after producing a plan, a screenshot, or a single route.
- Do not ask the user to approve routine implementation decisions already covered by `design.md` and `roadmap.md`.
- If a choice is reversible and the instructions provide enough context, make a reasonable decision and continue.
- Ask for clarification only when a missing requirement materially changes the product, a required input is unavailable, or proceeding would risk destructive or misleading behavior.
- Do not silently remove existing features to make implementation easier.
- Do not claim completion when significant routes or journeys are still placeholders.
- When reporting progress, distinguish implemented, partially implemented, simulated, and not implemented.

## 11. Validation requirements

Before declaring the frontend demo complete:
1. Run the repository's available lint command.
2. Run typechecking if configured.
3. Run relevant tests if configured.
4. Run the production build.
5. Fix errors introduced by the changes.
6. Test each end-to-end journey in `roadmap.md` from a fresh demo reset.
7. Verify that state changes propagate to all relevant screens.
8. Inspect desktop, tablet, and mobile layouts.
9. Check for horizontal overflow, clipped content, unreadable tables, inaccessible controls, and broken theme switching.
10. Confirm that all simulated behavior is visibly labelled and no unsupported live-integration claim remains.

If a command cannot run, report the exact command and the reason. Never say tests or builds passed unless they actually ran successfully.

## 12. Final handoff

When the implementation is ready, provide a concise handoff with:
- Main screens and workflows completed
- Important interactions that were tested
- Commands run and their actual outcomes
- Any known bugs or incomplete routes
- Which features are simulated and why
- A short suggested sequence for presenting the demo to judges

Do not claim a feature is complete solely because its screen exists. Completion means the relevant user journey works end to end.

---

## Final operating principle

**Build a coherent product, not a collection of pages.** Follow `design.md` for the visual system, `roadmap.md` for what must be built, and this file for how to execute the work. Prioritize operational clarity, evidence provenance, working interactions, and visual precision. The interface should feel complete because its workflows are connected and its details are credible—not because it is overloaded with decoration.
