# roadmap.md — AICTE Security Deposit / FDR Portal
## Frontend-Only Demonstration Roadmap

## 1. Purpose

Build an impressive, cohesive, end-to-end **frontend demonstration** of an AICTE Security Deposit / Fixed Deposit Receipt (FDR) management portal.

The goal is to make the prototype feel like a complete, believable operational product: a reviewer can navigate from the landing page into role-based workspaces, inspect an FDR, see evidence and discrepancies, simulate bank verification, track maturity and clearances, and follow a release case through its stages.

**This phase is frontend only.** Do not build a real backend, connect to real banks or AICTE systems, use real institution/banking data, or claim that any real verification has occurred. Use deterministic synthetic demo data and clearly labelled simulations. The UI must demonstrate the intended workflow and product logic, not pretend that integrations already exist.

The frontend should be visually polished and specific to FDR scrutiny—not a generic AI dashboard. Follow `design.md` as the authoritative visual and interaction specification, including the user-provided CSS theme. Do not introduce a different palette.

---

## 2. Product story the demo must communicate

The product supports the security-deposit lifecycle:

1. An institution submits an FDR and supporting documents.
2. The portal extracts and displays key fields.
3. Rule-based checks compare declared fields, extracted values, and supporting evidence.
4. A reviewer inspects explainable discrepancies.
5. A bank-verification request can be simulated and answered in the demo.
6. The instrument is monitored for maturity, renewal, and replacement.
7. A release case moves through required clearances and an official-review stage.
8. Each change appears in an evidence-linked activity/audit timeline.

The central differentiator is **evidence-linked, bank-aware lifecycle management**—not just uploading a PDF or displaying expiry dates.

### Truth and demo boundaries

- Add a persistent, unobtrusive `DEMO ENVIRONMENT · SYNTHETIC DATA` indicator in the application shell.
- Use fictional institution names, bank responses, officer identities, instrument references, amounts, dates, and documents.
- Any bank response must be explicitly labelled `Simulated bank response`.
- Distinguish `Institution-submitted`, `OCR-extracted`, `Reviewer-confirmed`, `Simulated bank-confirmed`, and `System-derived` data.
- Do not label a record `Bank verified` unless the UI clearly says this is simulated demo state.
- A SHA-256 fingerprint demonstrates integrity of the received file in the demo; it does not prove that the bank issued it.
- Do not claim blockchain, real-time monitoring, live APIs, digital-signature validation, or live AICTE integration.
- Do not use invented success percentages, savings figures, fake customer logos, or fake live activity.

---

## 3. Scope and implementation rules

### In scope

- Responsive frontend screens and navigation
- Role-switching demo experience
- Deterministic mock data
- Client-side workflow state and persistence suitable for a demo
- Search, filters, sorting, tabs, dialogs, forms, and status transitions
- Simulated document upload/extraction and verification steps
- Explainable rule findings
- FDR relationship and event timeline visualization
- Release clearance workflow
- Clear loading, empty, error, success, and confirmation states
- A guided demo path for judges

### Out of scope for this phase

- Backend/API/database implementation
- Actual bank API integrations
- Actual bank-manager or officer authentication
- Real SMS/email delivery
- Real OCR/LLM calls
- Real cryptographic audit service or external hash anchoring
- Live regulatory-system integration
- Actual bank-side lien placement, modification, or release
- Production authentication/authorization
- Real legal or regulatory decision-making

Represent out-of-scope behavior through well-labelled simulation only. Do not create fake integration settings that imply live connectivity.

### Agent workflow

Before implementation:
1. Inspect the repository, existing routes, framework, package scripts, design tokens, and components.
2. Read `design.md` and this roadmap fully.
3. Preserve useful existing functionality; do not replace the application wholesale without a reason.
4. Map the roadmap to current routes and note what already exists.
5. Propose a short sequence of implementation milestones, then implement them.
6. Use the existing stack and libraries where possible. Avoid dependency churn.

During implementation:
- Use shared components and a coherent type/model layer for records and status enums.
- Keep mock data separate from page components.
- Make interactions work; no dead buttons or fake controls.
- Prefer client-side state for the prototype. Use local storage only if it materially helps preserve a judge's demo state; never store sensitive real data.
- Include a `Reset demo data` action to restore the deterministic initial state.
- Seed dates relative to a fixed demo date or use an explicit demo date so the interface remains reproducible. Do not let records silently become nonsensical over time.
- Do not build backend abstractions or complex architecture that the frontend demo does not need.

After implementation:
- Run lint, typecheck, tests, and build commands available in the repository.
- Fix issues introduced by the work.
- Test primary flows at desktop and mobile widths.
- Report completed screens, working interactions, tests actually run, and all simulated behavior.

---

## 4. User roles and demo navigation

Provide a clear role switcher in the demo shell. It changes the visible workspace and permissions for demonstration purposes only.

### Institution user
Can:
- View its own submitted instruments
- Start an FDR submission
- Upload/select synthetic documents
- Review extracted fields
- Correct declared fields
- See validation findings and requested corrections
- Track verification and case status
- View maturity dates and notices

Cannot:
- Mark an instrument bank-confirmed
- Approve regulatory clearances
- Approve or execute release

### AICTE reviewer
Can:
- View the cross-institution FDR register
- Triage scrutiny and verification queues
- Inspect document evidence and discrepancies
- Request or inspect simulated bank confirmation
- Record a reviewer disposition with a reason
- Track maturity, renewals, replacements, and release clearances
- View the audit timeline
- Move cases through permitted demo workflow stages

Cannot:
- Bypass required clearance stages without an explicit, reasoned demo override
- Claim a real bank action occurred

### Simulated bank officer
Can:
- View assigned simulated verification requests
- Compare requested FDR fields against synthetic bank-side record data
- Return one of: `Confirmed in demo data`, `Mismatch found`, `Unable to confirm`, or `More information required`
- Add a note and submit the simulated response
- View prior responses in the demo

Must always see a visible simulated-role / demo label. Do not present the role as a real registered bank employee.

---

## 5. Route and screen inventory

Implement every screen below, reusing existing routes if appropriate. Keep navigation labels concise and consistent.

### Route A — Public landing page (`/`)

Purpose: establish the product's identity and guide the user into the demo.

Required:
- Product name/mark and restrained navigation
- Hero composition based on the reference in `design.md`: left-side headline and copy; large geometric artwork aligned to the right
- Product-specific headline and supporting copy from `design.md`
- Primary CTA enters the demo
- Secondary CTA jumps to or opens a workflow explanation
- A concise “How it works” sequence showing Submit → Scrutinize → Confirm → Monitor → Release review
- A short feature section for evidence-linked scrutiny, bank confirmation workflow, lifecycle monitoring, and accountable release
- A clear disclaimer that the demo uses synthetic data and simulated bank responses
- Footer with project context and demo boundary

Do not create a generic pricing page, fake customer logos, fake testimonials, or unsupported performance claims. Keep the hero visually strong and the rest of the page concise.

### Route B — Demo entry / role selection (`/demo` or equivalent)

Purpose: get judges into the product without a long onboarding flow.

Required:
- Select Institution, AICTE Reviewer, or Simulated Bank Officer
- Briefly explain what each role can demonstrate
- A one-click `Enter demo` action
- Keep the synthetic-data disclaimer visible
- Support switching roles later without losing the current demo state

### Route C — Operations overview (`/app/overview`)

Purpose: answer “what needs attention now?”

Required:
- Page heading and current role
- Action-focused queue summary: pending verification, discrepancies, upcoming maturities, blocked release cases
- A “Needs attention” list ordered by urgency, each item with reason, age/date, and next action
- Recent activity timeline with actor, event, time, and case reference
- Shortcuts into the relevant queue/detail
- Small charts only if they answer a meaningful operational question and use labelled synthetic data
- No fabricated percentage deltas or arbitrary AI scores

### Route D — FDR register (`/app/fdrs`)

Purpose: find and compare instruments.

Required table columns:
- FDR reference
- Institution
- Bank / branch
- Amount
- Issue date
- Maturity date
- Declared lien status
- Evidence/verification state
- Next action

Required interactions:
- Search by FDR reference, institution, or bank
- Filter by status, maturity window, and discrepancy
- Sort relevant columns
- Pagination or a clear bounded list
- Reset filters
- Click a row to open the FDR detail
- Useful empty state

Use realistic Indian number/date formatting (e.g. `₹25,00,000`, `25 Oct 2026`) but synthetic records only.

### Route E — FDR detail / verification passport (`/app/fdrs/:id`)

This is a core differentiator and should receive substantial design attention.

Required hierarchy:
1. FDR reference, institution, current state, amount, and next action
2. A provenance-aware status strip: Submitted / Extracted / Reviewer checked / Simulated bank response / Reconciliation freshness
3. Document preview area with a realistic fictional FDR certificate
4. Structured extracted fields next to the source document
5. Supporting certificate section, including Bank Manager Certificate only when the demo record includes one
6. Comparison view for FDR vs declared data vs certificate vs simulated bank record
7. Explainable rule findings with severity, reason, source, and suggested next action
8. Replacement/predecessor relationship, if present
9. Event timeline and audit evidence
10. Related release case and clearances

The document preview must be a synthetic illustrative document marked `SAMPLE / DEMO`. Do not copy a real person's bank details, signatures, seals, or an actual bank's exact document in a way that could be mistaken for genuine evidence.

Every mismatch should be concrete, for example:
- Declared amount differs from extracted FDR amount
- Maturity date differs between the FDR and supporting certificate
- Lien declaration is absent or unclear
- Instrument reference may duplicate another demo record
- Confirmation is stale or unavailable

A finding means `Needs review`, not automatically fraud.

### Route F — Submission wizard (`/app/submit`)

Purpose: demonstrate the institution-side intake process.

Use a clear stepper:
1. Institution and programme details
2. FDR details
3. Document upload / choose synthetic sample
4. Review extracted data and correct declared fields
5. Validation summary
6. Submit to demo scrutiny queue

Required:
- Inline validation and helpful errors
- File upload UI that accepts files in the browser or offers a sample document path
- If real OCR is not implemented, simulate extraction with a deterministic sample and clearly label it `Illustrative extraction`
- Side-by-side declared vs extracted fields
- Explainable pre-submission checks
- Save draft / cancel confirmation where practical
- Confirmation page with case reference and next step

Do not claim an uploaded document was genuinely verified. A browser-only file selection can be demonstrated without sending it to a server.

### Route G — Scrutiny and exceptions (`/app/scrutiny`)

Purpose: enable a reviewer to resolve issues based on evidence.

Required:
- Queue with priority, institution, FDR reference, issue, age, and owner
- Filters for severity, issue type, and assigned state
- Exception detail drawer or page
- Source evidence and conflicting values shown side by side
- Actions such as `Request correction`, `Mark reviewed`, `Request bank confirmation`, and `Record disposition`
- Require a reason for rejection/override
- Record each action in the local demo event history
- Clearly distinguish system flags from reviewer decisions

### Route H — Bank verification queue (`/app/verification`)

Purpose: demonstrate controlled bank-side confirmation without live integration.

Reviewer view:
- List pending, responded, expired, and needs-attention requests
- Each request shows requested fields, response status, time submitted, and next action
- Action to create a simulated verification request
- Use a clearly labelled demo verification token/link state, not a real email/link dispatch

Simulated bank officer view:
- Open assigned request
- Compare synthetic bank-side data to requested FDR details
- Select response outcome and add a note
- Submit response and update the linked FDR's simulated evidence state
- Append a timestamped event to the demo audit timeline

The UI must say `Simulated bank response — no live bank connection`.

### Route I — Maturity and renewals (`/app/maturities`)

Purpose: show that maturity is monitored separately from regulatory release eligibility.

Required:
- Upcoming, due, overdue, and renewed instruments
- Date range filter and list/agenda view
- Days until maturity or days overdue, derived from the fixed demo date
- Assigned owner and next action
- Renewal / replacement workflow that links a new FDR to its predecessor
- Explicit distinction between bank maturity date, policy holding/eligibility date, and release decision
- No automatic release on maturity
- A warning state when confirmation is stale or renewal evidence is missing

### Route J — Release workflow (`/app/releases` and `/app/releases/:id`)

Purpose: make controlled release the culmination of the demo.

Required:
- Queue of release cases and current blocking stage
- Case detail with the applicable policy reference (synthetic policy fixture linked to a provided handbook section, not a fabricated regulation)
- Required clearances such as PGRC, Vigilance, relevant bureau/cell review, and applicable NOC/sanction-order route where relevant to the scenario
- Clearance owner, state, timestamp, evidence attachment/reference, and note
- Maker/checker demonstration: one role initiates/recommends; another authorized demo role reviews/approves
- Explain exactly why the case is blocked
- Distinguish `Ready for official review`, `Recommended`, `Approved in demo`, `Instruction prepared`, and `Bank release confirmed in demo`
- No automatic release or claim of actual lien release
- Append all transitions to the event timeline

Do not hard-code one universal clearance sequence for all instruments. Represent the applicable path as scenario/configuration data and label demo rules accordingly.

### Route K — Audit trail (`/app/audit`)

Purpose: make accountability visible and inspectable.

Required:
- Searchable/filterable event table or timeline
- Timestamp, actor/role, action, affected record, prior/new state, reason, and evidence reference
- Event details drawer
- Show document SHA-256 only if it is computed in the browser or deterministically provided by mock fixtures; label its scope accurately
- If hash linking is implemented in the frontend, show it as a demo tamper-evident chain, not a secure production audit system
- A clear sequence for a chosen FDR from submission through scrutiny and release review

### Route L — Policy and rules (`/app/policy`)

Purpose: show how policy-driven checks are represented.

Required:
- Versioned sample rule list with rule name, source/section, effective date, and plain-language summary
- Clearly distinguish handbook-derived requirements from prototype operational rules
- Open a source excerpt or source link when one is supplied in the project fixtures
- A rule detail explaining what field it checks and what it does when data is missing
- Do not invent regulatory requirements or pretend to provide legal advice
- Restrict editing controls to the relevant demo role, if editing is demonstrated

### Route M — Settings / demo controls (`/app/settings`)

Purpose: make the demo controllable and reproducible.

Required:
- Current demo role
- Demo environment explanation
- `Reset demo data` button with confirmation
- Optional switch for `Show provenance labels` if useful, default on
- List of simulated capabilities and non-integrated services
- No fake API keys, fake bank connection status, or decorative integration toggles

---

## 6. Core mock data model

Create a typed, deterministic mock data layer, separate from UI components. Use fictional but coherent data and a fixed demo date.

### Suggested entities

**Institution**
- `id`, `name`, `institutionCode`, `programme`, `region`, `contactRole`

**FDRInstrument**
- `id`, `reference`, `institutionId`, `bankName`, `branchName`, `ifsc` (synthetic format/value), `holderName`, `amount`, `issueDate`, `maturityDate`, `declaredLienHolder`, `status`, `lastSimulatedBankConfirmationAt`, `predecessorFdrId`, `successorFdrId`, `releaseCaseId`

**Document**
- `id`, `fdrId`, `type`, `filename`, `receivedAt`, `sourceKind`, `extractedFields`, `documentHash`, `version`, `previewKind`, `isSynthetic`

**VerificationRequest**
- `id`, `fdrId`, `createdAt`, `expiresAt`, `status`, `assignedDemoRole`, `requestedFields`, `responseOutcome`, `responseNote`, `respondedAt`

**ScrutinyFinding**
- `id`, `fdrId`, `type`, `severity`, `title`, `description`, `evidenceRefs`, `expectedValue`, `observedValue`, `recommendedAction`, `status`, `reviewerNote`

**ReleaseCase**
- `id`, `fdrId`, `createdAt`, `status`, `applicablePath`, `clearances`, `decisionNote`, `instructionStatus`, `bankReleaseState`

**AuditEvent**
- `id`, `timestamp`, `actorId`, `actorRole`, `action`, `entityType`, `entityId`, `previousState`, `newState`, `reason`, `evidenceRefs`, `previousEventHash` (only if the demo chain is actually implemented)

Keep relationships internally consistent. Use explicit enums for statuses instead of arbitrary display strings. Derive overview counts from the mock records rather than hard-coding disconnected numbers.

### Seed scenarios

Seed a compact but rich set of records that demonstrate the main workflows:
1. **Clean case:** data fields align; bank response is simulated and clearly labelled; no outstanding discrepancy.
2. **Amount mismatch:** submitted amount differs from extracted/documented amount and requires review.
3. **Lien wording issue:** lien holder is missing or ambiguous.
4. **Upcoming maturity:** renewal action is due soon.
5. **Overdue / stale evidence:** no fresh simulated bank confirmation or renewal evidence.
6. **Replacement chain:** old and replacement FDRs are linked; replacement is not treated as valid until its required evidence is present.
7. **Release blocked:** at least one clearance is outstanding, and the UI explains exactly which one.
8. **Release review ready:** all demo prerequisites are met, but final state remains an official-review simulation rather than a real-world release.

Avoid flooding the UI with dozens of meaningless records. A small number of carefully designed, interconnected scenarios is better for a polished demonstration.

---

## 7. End-to-end demo journeys

All main flows must work with deterministic mock data.

### Journey 1 — Institution submits an FDR
Landing page → Enter demo as Institution → Start submission → Enter/select details → Choose synthetic document → View illustrative extraction → Review validation findings → Submit → See case reference and status → Switch to Reviewer → Find the new case in the scrutiny queue.

### Journey 2 — Reviewer investigates a discrepancy
Overview → Open `Needs attention` item → FDR detail → Compare submitted/extracted/simulated bank values → Open finding → Record reviewer note → Request correction or bank confirmation → Verify event appears in audit history.

### Journey 3 — Simulated bank confirmation
Reviewer creates request → Request appears in verification queue → Switch to Simulated Bank Officer → Open request → Compare bank-side demo fixture → Choose outcome and note → Submit → Return to reviewer → See response on FDR detail → Review discrepancies and freshness state.

### Journey 4 — Maturity and replacement
Open upcoming/overdue instrument → Inspect maturity and policy clocks separately → Start renewal/replacement demo action → Create successor FDR → Link predecessor/successor → Verify timeline shows both records → Old instrument remains unresolved until required successor evidence is present.

### Journey 5 — Controlled release review
Open release queue → Select case → Inspect applicable path and supporting evidence → Identify missing clearance → Complete an allowed demo clearance → Switch to second authorized demo role for maker/checker → Move to `Ready for official review` or `Approved in demo` as allowed → Verify timeline entry → Do not claim a real bank release.

### Journey 6 — Trace a decision
Open FDR detail → Navigate to an exception or status change → Inspect evidence source and rule → Open audit event → Follow event sequence → Understand who changed what, when, why, and based on which evidence.

---

## 8. Visual and interaction quality bar

Follow `design.md` exactly for visual styling and anti-AI-slop constraints.

The app should feel finished because the flows are coherent and detailed, not because it has excessive decoration.

- Make the landing page visually distinctive using the supplied geometric composition and the exact user-provided theme tokens.
- Give the FDR detail screen a clear evidence-first layout with document preview, field comparison, findings, and timeline.
- Use consistent tables, filters, status labels, dialogs, drawers, tabs, and form patterns.
- Make primary actions obvious; keep secondary actions quieter.
- Use purposeful whitespace but do not leave large empty areas where the workflow needs information.
- Use realistic fictional document previews, not generic document illustrations.
- Use subtle linework or security-print motifs only where they reinforce the financial-instrument context.
- Use meaningful empty states and helpful microcopy.
- All visible controls must work or be explicitly disabled with a reason.
- All state-changing actions must update relevant views and append an audit event.
- No fake loading spinner that never resolves; no toast that claims an action succeeded if state did not change.
- Ensure keyboard access, visible focus, responsive behavior, and reduced-motion support.

---

## 9. Suggested implementation milestones

### Milestone 0 — Repository audit and foundation
- Inspect stack, routes, theme variables, component library, and existing functionality.
- Read `design.md`.
- Define route map, shared shell, role switcher, mock model types, status enums, and deterministic seed data.
- Confirm theme tokens match the user's CSS exactly.
- **Exit criteria:** application builds; route map and mock data plan are clear; existing working features are preserved.

### Milestone 1 — Design system and app shell
- Implement reusable typography, spacing, buttons, fields, status labels, cards, tables, dialogs, drawers, and navigation.
- Implement responsive shell and persistent demo-environment label.
- Implement role switching and reset demo data.
- **Exit criteria:** shell is consistent in all roles and both light/dark modes; controls and responsive navigation work.

### Milestone 2 — Landing page and demo entry
- Implement reference-based geometric hero using the user-supplied palette.
- Add product copy, workflow explanation, role selection, and entry CTA.
- **Exit criteria:** landing page is visually distinctive and connects to the working demo.

### Milestone 3 — Mock data and overview/register
- Implement deterministic entities and seed scenarios.
- Build overview, attention queue, recent events, FDR register, search, filters, sorting, and detail navigation.
- **Exit criteria:** overview metrics derive from data; every visible register row opens a coherent record.

### Milestone 4 — FDR detail and submission
- Build document preview, provenance labels, extracted fields, comparisons, findings, and event timeline.
- Implement the multi-step submission wizard and validation summary.
- **Exit criteria:** submitted demo case appears in the register/queue and its fields and events are coherent.

### Milestone 5 — Scrutiny and simulated bank verification
- Implement reviewer exception queue and actions.
- Implement verification request creation and simulated bank officer response.
- Update linked FDR state and audit events when response is submitted.
- **Exit criteria:** the complete simulated verification journey works across role switches.

### Milestone 6 — Maturity, replacement, and release
- Implement maturity views, renewal/replacement links, release queues, clearance stages, and maker/checker demo.
- Ensure maturity never automatically releases an instrument.
- **Exit criteria:** users can follow the maturity and controlled-release journeys end to end.

### Milestone 7 — Audit, policy, and polish
- Implement searchable audit history, policy/rule explanations, source links, settings, and demo reset.
- Improve responsive layouts, accessibility, empty/loading/error states, and microcopy.
- **Exit criteria:** all key actions are inspectable and all demo boundaries are clear.

### Milestone 8 — Validation and judge-ready demo
- Run available lint, typecheck, tests, and production build.
- Test each end-to-end journey from a fresh reset.
- Test desktop, tablet, and mobile layouts.
- Check no fake data is presented as real and no dead controls remain.
- Prepare a concise 3–5 minute demo sequence using the seeded scenarios.
- **Exit criteria:** build passes where supported; the six demo journeys work; limitations are documented honestly.

---

## 10. Judge demo script (3–5 minutes)

1. **Landing (15–20 sec):** introduce the portal and its purpose.
2. **Overview (20–30 sec):** show pending verification, discrepancies, upcoming maturities, and blocked releases.
3. **FDR detail (45–60 sec):** open a mismatch case; compare submitted, extracted, and simulated bank-side fields; explain the finding and provenance.
4. **Bank verification (45–60 sec):** create a simulated request, switch to the simulated bank role, respond, and return to see the linked evidence update.
5. **Maturity/replacement (30–45 sec):** show a due instrument and how a successor FDR is linked without auto-releasing the old one.
6. **Release/audit (45–60 sec):** show a missing clearance, resolve a demo step, and inspect the audit trail.
7. **Close (10–15 sec):** summarize the differentiator: evidence-linked scrutiny, bank-aware verification workflow, continuous lifecycle visibility, and accountable release review.

Do not claim any real integration or measured performance gain during the demo.

---

## 11. Definition of done

The frontend demo is complete when:
- All routes in the agreed route map are implemented or intentionally consolidated with equivalent navigation.
- The landing page matches the supplied composition and theme.
- Role switching works and demonstrates different permissions/actions.
- Mock data is coherent, deterministic, and resettable.
- The FDR register supports working search/filter/sort and opens detailed records.
- Submission, scrutiny, simulated bank verification, maturity/replacement, release review, and audit journeys work end to end.
- Every state change updates the relevant UI and creates an audit event.
- The UI clearly distinguishes submitted, extracted, reviewer-checked, simulated bank-confirmed, and system-derived data.
- No live integrations, real verifications, blockchain, or production security are falsely claimed.
- Responsive layouts, accessibility basics, and loading/error/empty states are implemented.
- Existing working functionality is preserved.
- Build/test results and remaining limitations are reported honestly.
