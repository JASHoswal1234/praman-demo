# Design System & UI Implementation Brief — AICTE Security Deposit / FDR Portal

> **Purpose:** Build a modern, credible, production-minded interface for an AICTE Security Deposit / Fixed Deposit Receipt (FDR) management prototype. The interface must feel designed by an experienced product design team—not generated from a generic SaaS dashboard template.
>
> **Product boundary:** This is a prototype. Use clearly labelled synthetic records and simulated bank-side responses unless real, authorized integrations are provided. Never imply that live AICTE systems, bank APIs, or real-time bank verification are connected when they are not.

---

## 1. Product and design intent

Design a serious regulatory-financial operations product used by AICTE reviewers, institution users, and—within the prototype—simulated bank verification officers.

The product manages the **security-deposit lifecycle**, not just document uploads:
- Institution submission and document intake
- FDR data extraction and validation
- Bank confirmation and evidence review
- Discrepancy handling and scrutiny
- Maturity, renewal, and replacement tracking
- Multi-stage clearance and controlled release
- Evidence-linked decisions and audit history

The UI should communicate trust, clarity under high information density, accountability, traceability, calm institutional confidence, and a modern Indian public-sector digital service—without copying dated government portals.

### Core design principle

Every important status must answer:
1. **What is the current state?**
2. **What evidence supports it?**
3. **What action is needed next, and who owns it?**

Do not use “Verified” as a decorative green badge. Distinguish states such as Submitted, Extraction complete, Desk-checked, Bank confirmation requested, Bank-confirmed, Reconciliation current/stale, Discrepancy detected, Awaiting clearance, Ready for official review, and Released/discharged. Never infer that an FDR is genuine from OCR confidence, matching documents, a SHA-256 fingerprint, or a simulated response alone.

---

## 2. Anti-AI-slop requirements (non-negotiable)

Do **not** produce:
- Generic SaaS layouts with giant gradient blobs, floating cards, random glowing orbs, or decorative 3D objects.
- Dashboards made entirely of identical white cards with rounded corners and drop shadows.
- Unnecessary glassmorphism, neon gradients, blurred backgrounds, glow effects, or excessive pill badges.
- Random abstract SVG illustrations, AI-brain imagery, robot imagery, stock illustrations of people holding documents, or unrelated finance imagery.
- Vague headlines such as “Revolutionizing trust with AI” or unsupported claims such as “100% fraud-proof.”
- Arbitrary charts with invented data, fake live activity, fake banks, fabricated testimonials, or unsupported performance percentages.
- Excessive icons, emoji, gradients, decorative lines, or animation used to compensate for weak information architecture.
- Tiny low-contrast text, overly wide paragraphs, overly dense tables without hierarchy, or huge empty areas.
- Fake clickable controls, dead buttons, nonfunctional filters, or interactions that look real but do nothing.
- Generic labels like “Total Users,” “AI Score,” or “Efficiency +38%” unless genuinely relevant and backed by data.

**No invented facts.** Use only supplied product requirements and clearly labelled synthetic demo data. Never claim a bank has confirmed a record unless the current record state actually reflects a bank response. In a prototype, label simulated records and responses clearly.

Before adding any visual element, ask: **Does it clarify status, evidence, risk, next action, or navigation?** If not, remove it.

---

## 3. Visual direction

### Overall aesthetic

A contemporary financial-instrument interface inspired by high-quality financial operations software, archival financial documents and security printing, carefully typeset institutional reports, and modern editorial layout.

The UI should feel **quiet, deliberate, engineered, and trustworthy**. Use the banknote/security-print reference as a restrained visual signature—not as a full-screen texture.

### Color system — authoritative user-supplied theme

**Use the exact CSS variables in Section 3A as the only palette specification.** The `:root` and `.dark` blocks there are authoritative. Do not invent or substitute any other palette, including forest green, sage, or gold.

- Primary and accent: `oklch(0.637 0.237 25.331)` (coral red).
- Light background: `oklch(0.985 0 0)`; light cards: `oklch(99.5% 0 0)`.
- Dark background: `oklch(0.145 0 0)`; dark cards: `oklch(0.21 0.006 285.885)`.
- Border, input, muted, sidebar, ring, foreground, and chart colors: exactly as specified in Section 3A.
- Typography: Inter, Noto Serif Georgian, and JetBrains Mono, as specified in the CSS.
- Radius: `0.5rem`; spacing: `0.25rem`; preserve the provided shadow tokens.

Rules:
- Reference theme variables in all components; do not hardcode an alternative brand palette.
- Distinguish primary actions from destructive actions even though both use red hues.
- Use semantic status labels and accessible text contrast, not color alone.
- Avoid unnecessary gradients, glows, and decorative visual effects.
- Preserve light/dark mode behavior.

### Typography

Choose a restrained, modern type system. Good options:
- Primary UI: Inter
- Optional serif accent: Noto Serif Georgian, used sparingly
- Instrument IDs / technical values: JetBrains Mono

Do not use three or more font families. Avoid futuristic display fonts for body text. Use tabular numerals for amounts, counts, dates, and durations when available.

Suggested hierarchy:
- Page title: 26–32 px, semibold
- Section heading: 17–20 px, semibold
- Card heading: 13–15 px, medium
- Body: 14–16 px
- Supporting metadata: 12–13 px, with adequate contrast
- Table content: 13–14 px, with comfortable row height

Use consistent line heights and avoid all-caps for long labels. Reserve uppercase micro-labels for short metadata such as `INSTRUMENT ID` or `LAST CONFIRMED`.

### Texture and imagery

Prefer custom CSS/SVG details over generic stock illustrations:
- Very subtle guilloché/security-print pattern in a hero or selected document surface
- Fine-line rosette as a small watermark, cropped edge detail, or section marker
- Document previews and evidence comparisons as the main visual content
- Small, consistent line icons only when they aid recognition

Rules for security-print patterns:
- Use only in limited areas such as the overview header, instrument detail cover, or document preview.
- Keep opacity low enough that text remains effortless to read.
- Never use texture behind dense tables or long body copy.
- Do not make the entire dashboard look like a banknote.
- Do not imitate an official seal, bank logo, or AICTE emblem without authorization.

If no suitable asset is available, create a minimal SVG guilloché motif or use CSS linework. Do not invent a decorative illustration just to fill space.

---

## 3A. Approved Landing-Page Reference: Composition and Theme

The user has provided a landing-page screenshot as a **layout reference** and a CSS token system as the **current theme reference**. Incorporate both into the design system. This section supplements the visual direction above; it does not authorize an unrequested redesign of unrelated screens.

### Landing-page composition to preserve

Recreate the reference's layout and visual balance:
- Spacious, full-height hero section.
- Two-column composition on desktop.
- Left column contains the product headline, short supporting copy, and two calls to action.
- Right column contains large, crisp, abstract geometric artwork.
- Artwork occupies roughly 40–45% of the desktop viewport, is aligned to the right edge, and is intentionally cropped beyond the viewport.
- Content is vertically balanced with generous whitespace.
- Avoid a centered, conventional SaaS hero, giant rounded cards, or a dashboard-like first screen.
- Keep the geometric composition asymmetric and editorial: circles, semicircles, quarter-circles, arches, and four-petal rosette forms.
- On mobile, stack the text and artwork deliberately; do not allow the cropped desktop artwork to create horizontal overflow.

### Theme direction — use the user's supplied CSS theme unchanged

**Important:** The user's latest supplied CSS tokens are the source of truth. Do not replace them with the previously suggested forest-green, sage, warm-white, or muted-gold palette. Preserve the existing coral-red primary/accent and the chart colors shown below.

Use the following token values for both light and dark themes. Keep the existing `@theme inline` mappings as supplied by the user.

#### Light theme (`:root`)

```css
:root {
  --card: oklch(99.5% 0 0);
  --ring: oklch(0.637 0.237 25.331);
  --input: oklch(0.929 0.013 255.508);
  --muted: oklch(0.968 0.007 247.896);
  --accent: oklch(0.637 0.237 25.331);
  --border: oklch(0.929 0.013 255.508);
  --radius: 0.5rem;
  --chart-1: oklch(0.637 0.237 25.331);
  --chart-2: oklch(0.70 0.20 60);
  --chart-3: oklch(0.62 0.18 200);
  --chart-4: oklch(0.58 0.22 140);
  --chart-5: oklch(0.65 0.15 280);
  --popover: oklch(99.5% 0 0);
  --primary: oklch(0.637 0.237 25.331);
  --sidebar: oklch(0.97 0 0);
  --spacing: 0.25rem;
  --font-mono: JetBrains Mono, ui-monospace, monospace;
  --font-sans: Inter, ui-sans-serif, sans-serif, system-ui;
  --secondary: oklch(0.97 0 0);
  --background: oklch(0.985 0 0);
  --font-serif: Noto Serif Georgian, ui-serif, serif;
  --foreground: oklch(0.145 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --shadow-blur: 4px;
  --shadow-color: oklch(0 0 0);
  --shadow-spread: 0px;
  --letter-spacing: 0em;
  --shadow-opacity: 0.1;
  --sidebar-ring: oklch(0.637 0.237 25.331);
  --sidebar-accent: oklch(0.929 0.013 255.508);
  --sidebar-border: oklch(0.929 0.013 255.508);
  --card-foreground: oklch(0.145 0 0);
  --shadow-offset-x: 0;
  --shadow-offset-y: 1px;
  --sidebar-primary: oklch(0.637 0.237 25.331);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent-foreground: oklch(0.985 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --secondary-foreground: oklch(0.269 0 0);
  --destructive-foreground: #FFFFFF;
  --sidebar-accent-foreground: oklch(0.145 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
}
```

#### Dark theme (`.dark`)

```css
.dark {
  --card: oklch(0.21 0.006 285.885);
  --ring: oklch(0.637 0.237 25.331);
  --input: oklch(0.371 0 0);
  --muted: oklch(0.274 0.006 286.033);
  --accent: oklch(0.637 0.237 25.331);
  --border: oklch(0.371 0 0);
  --radius: 0.5rem;
  --chart-1: oklch(0.75 0.22 25);
  --chart-2: oklch(0.78 0.18 60);
  --chart-3: oklch(0.70 0.17 200);
  --chart-4: oklch(0.68 0.19 140);
  --chart-5: oklch(0.72 0.14 280);
  --popover: oklch(0.269 0 0);
  --primary: oklch(0.637 0.237 25.331);
  --sidebar: oklch(0.205 0 0);
  --spacing: 0.25rem;
  --font-mono: JetBrains Mono, ui-monospace, monospace;
  --font-sans: Inter, ui-sans-serif, sans-serif, system-ui;
  --secondary: oklch(0.269 0 0);
  --background: oklch(0.145 0 0);
  --font-serif: Noto Serif Georgian, ui-serif, serif;
  --foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --shadow-blur: 4px;
  --shadow-color: oklch(0 0 0);
  --shadow-spread: 0px;
  --letter-spacing: 0em;
  --shadow-opacity: 0.1;
  --sidebar-ring: oklch(0.704 0.191 22.216);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-border: oklch(0.371 0 0);
  --card-foreground: oklch(0.985 0 0);
  --shadow-offset-x: 0;
  --shadow-offset-y: 1px;
  --sidebar-primary: oklch(0.704 0.191 22.216);
  --muted-foreground: oklch(0.923 0.003 48.717);
  --accent-foreground: oklch(0.985 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --destructive-foreground: oklch(0.985 0 0);
  --sidebar-accent-foreground: oklch(0.922 0.003 48.717);
  --sidebar-primary-foreground: oklch(0.985 0 0);
}
```

#### Theme mapping

Keep the supplied `@theme inline` mapping exactly as provided in the project. It maps each `--color-*` token to the corresponding CSS variable, including card, ring, input, muted, accent, border, charts, popover, primary, sidebar, spacing, fonts, secondary, background, foreground, destructive, and shadow tokens.

Theme rules:
- **Do not change the palette.** The bright coral-red primary/accent, neutral light surfaces, near-black foreground, dark theme, and five chart colors are intentional user-supplied values.
- Use the CSS variables in components instead of hardcoded colors (e.g. Tailwind utilities based on `bg-primary`, `text-foreground`, `border-border`, and `ring-ring`).
- Keep the destructive token semantically distinct even though it is also red; use `--destructive` for destructive/error actions and `--primary` for brand actions.
- Preserve Inter for sans-serif, JetBrains Mono for technical identifiers, and Noto Serif Georgian for serif usage.
- Keep the existing radius, spacing, and shadow tokens unchanged unless the user explicitly requests a change.
- Apply the same tokens consistently to the landing page and application. The geometric artwork should use the existing coral-red, neutral, and coordinated chart/theme colors; do not switch it to forest green and gold.
- Maintain readable contrast in both light and dark modes. If a supplied combination fails contrast in a specific component, solve that locally without silently replacing the global theme.

### Landing-page copy

Use this copy unless the user provides revised wording:

**Eyebrow:** `AICTE · SECURITY DEPOSIT MANAGEMENT`

**Headline:**  
`Security deposits.`  
`Verified with evidence.`

**Supporting copy:**  
`A unified platform for FDR scrutiny, bank verification, maturity monitoring, and accountable release workflows.`

**Primary CTA:** `Explore the platform`

**Secondary CTA:** `View verification workflow`

Do not imply that live bank integrations are operational. If the page leads into a demo with synthetic records, identify the demo environment clearly in the product experience.

### Geometric artwork rules

- Preserve the reference's abstract geometric style, not its original blue-purple color palette.
- Use the user's supplied palette: coral-red primary/accent, near-white/white surfaces, dark ink text, and the supplied chart colors as restrained secondary accents.
- Prefer SVG geometry for crisp edges, responsive sizing, and low payload.
- Reuse simple primitives and consistent geometry; avoid random placement.
- The artwork should feel architectural and precise. It may subtly evoke security-print engraving, but must not literally depict currency, banknotes, coins, or official seals. Keep the colors aligned with the supplied coral-red and neutral theme rather than introducing a separate forest-green/gold brand palette.
- Do not copy or imitate an AICTE emblem, bank logo, or official seal without authorization.
- No neon, blur, glow, 3D effects, or decorative gradients.
- Keep the artwork secondary to the headline and CTAs, despite its large visual area.

### Landing-page typography and CTA styling

- Use Inter as the main interface family.
- Desktop headline: approximately 44–52 px, semibold, with tight but readable line height.
- Supporting copy: 17–19 px, readable line height, and a restrained maximum width.
- Primary CTA: `var(--primary)` fill with `var(--primary-foreground)` text.
- Secondary CTA: transparent or `var(--card)` fill, a subtle `var(--border)` outline, and `var(--foreground)` text.
- Use consistent button heights and padding, restrained corner radii, and minimal shadows.
- Include keyboard focus states and restrained hover transitions.

### Theme integration rules

- Treat the supplied token system as the theme API. Update the CSS variables and existing `@theme inline` mappings consistently.
- Preserve light/dark theme switching; do not hardcode the palette into components.
- Do not change unrelated screens solely to make them match the landing-page screenshot. Apply the same token system consistently across the app, but preserve each screen's information hierarchy and workflow.
- Do not start implementing the landing page or changing the existing application until the coding agent has inspected the current repository and mapped the screenshot to the relevant route.
- The screenshot is a reference for composition, not permission to copy its original text, brand, or blue-purple colors.


---

## 4. Layout and spacing

Use a consistent spacing scale, for example: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64 px`.

### Application shell
- Persistent left navigation on desktop, with clear active state and compact icons.
- Top bar contains page context, environment label if demo data is used, and account/actions.
- Main content should have a clear max-width or grid alignment; avoid stretching edge-to-edge on very wide screens.
- Mobile/tablet layouts must remain usable: collapse navigation, preserve primary actions, allow tables to become stacked rows or controlled horizontal scrolling.

### Page structure
- Page title + one-line explanation + primary action.
- Optional compact summary strip for critical counts or work queues.
- Main content prioritized by next action, exception, and evidence.
- Secondary metadata and historical activity lower on the page or in a detail panel.

### Cards
Do not put every element in a card. Use cards only when grouping content meaningfully.
- Use subtle borders and restrained radius (8–12 px).
- Avoid heavy shadows. Prefer border, spacing, and surface contrast.
- Metric cards need a meaningful label, value, context if relevant, and optional supporting text.
- Avoid four giant KPI cards as the default top of every page. Choose the layout that suits the workflow.
- Avoid decorative icons in every card header.

### Data density
This is an operations tool. Prefer readable, sortable tables and structured details over oversized dashboard graphics.
- Align monetary amounts right and use consistent currency formatting (e.g. `₹25,00,000`).
- Keep instrument IDs, dates, status, institution, bank, and next action visible where relevant.
- Use sticky table headers for long lists.
- Support search, filtering, sorting, pagination, empty states, loading states, and clear filter reset where appropriate.
- Do not add a chart unless it answers a real operational question.

---

## 5. Information architecture

Adapt to the existing codebase, but prefer:
1. Overview
2. FDR Register
3. Verification Queue
4. Scrutiny & Exceptions
5. Maturity & Renewals
6. Release Workflow
7. Audit Trail
8. Policy & Rules (authorized roles only)
9. Administration (authorized roles only)

Role-aware navigation:
- **Institution user:** own submissions, correction requests, document status, maturity information, and notices.
- **AICTE reviewer:** scrutiny queue, evidence, discrepancies, clearance tracking, release readiness, and audit history.
- **Simulated bank officer:** assigned verification requests and response history, only within the demo workflow.

Do not show every role the same actions. Enforce permissions in application logic, not only by hiding UI controls.

---

## 6. Key screen requirements

### A. Overview / operations dashboard

Answer:
- What needs attention today?
- Which FDRs have upcoming maturity dates?
- Which verification requests are pending or stale?
- Which cases have discrepancies?
- Which release cases are blocked by missing clearances?

Recommended layout:
- Heading such as **Security Deposit Overview**
- Compact “Needs attention” section with actionable items
- Small set of meaningful metrics, e.g. active FDRs, pending verification, upcoming maturity, cases with discrepancies
- Recent activity list with actor, action, timestamp, and case reference
- Optional trend only if real or clearly labelled synthetic data supports it

All sample metrics must be labelled **Demo data** or **Illustrative records**. Never invent performance improvements.

### B. FDR register

A useful table may include:
- FDR / instrument reference
- Institution
- Bank / branch
- Amount
- Issue date
- Maturity date
- Lien status / declared lien holder
- Evidence state
- Last bank confirmation date
- Current owner / next action

Features:
- Search by institution, FDR reference, or bank
- Filters for status, maturity window, discrepancy, and verification freshness
- Sorting and pagination
- Clear status labels and concise next action
- Row click opens a dedicated detail page or side panel
- Empty state explains how to add or import a record

Do not display a single “Verified” state without showing its basis and recency.

### C. FDR detail / verification passport

This is a key differentiating screen.

Evidence hierarchy:
1. Current status and next action
2. Instrument summary
3. Submitted FDR document
4. Extracted fields and source locations
5. Bank Manager Certificate, if supplied
6. Bank-side confirmation response (real or explicitly simulated)
7. Cross-document comparison
8. Event timeline and audit trail
9. Related/replacement FDRs
10. Release decisions and supporting clearances

Each field should carry provenance:
- `Institution-submitted`
- `OCR-extracted`
- `Reviewer-confirmed`
- `Bank-confirmed`
- `System-derived`

Include source timestamp and source document/response where possible. If sources disagree, show conflicting values side by side. Do not silently choose one.

### D. Verification queue

Each request should show:
- FDR reference and institution
- Request date and link expiry, if applicable
- Current response state
- Assigned reviewer / authorized bank contact where applicable
- Time waiting
- Next action

Use clear states such as `Awaiting bank response`, `Response received`, `Expired link`, `Needs reviewer attention`, and `Closed`. The demo must not imply that a simulated officer is a real registered bank employee.

### E. Scrutiny & exceptions

Show issues as explainable findings, not an opaque AI score. Each exception should include:
- Finding title
- Severity / priority
- Values or evidence that caused the flag
- Source documents and page/field references
- Why the rule was triggered
- Recommended next action
- Reviewer disposition and reason

Examples:
- Amount mismatch between FDR and certificate
- Instrument number mismatch
- Maturity date discrepancy
- Missing required declaration
- Potential duplicate FDR reference
- Missing or unclear lien declaration
- Bank confirmation stale or absent
- Unreadable or incomplete evidence

A flag means **needs review**, not fraud. Never auto-label a document fraudulent based solely on OCR, metadata, or anomaly scoring.

### F. Maturity & renewal

Separate:
- Bank maturity date
- Regulatory holding / eligibility date (as defined by applicable policy)
- Release eligibility and official decision

Maturity does not automatically imply release eligibility. Make this distinction explicit in UI and logic.
- Use an agenda/list view first; calendar is secondary.
- Highlight upcoming dates and overdue actions with reason and owner.
- Link replacement FDRs to their predecessors.
- Do not claim the old lien has been released or replacement lien is active without evidence.

### G. Release workflow

Show release as a sequence of required stages and approvals.
- Identify each required clearance and its state.
- State exactly why a case is blocked.
- Display supporting evidence and applicable policy version.
- Distinguish `Ready for official review` from `Approved`, `Instruction sent`, and `Bank release confirmed`.
- Use maker–checker separation for sensitive actions.
- Never auto-release based solely on maturity, eligibility calculations, or an AI recommendation.

### H. Audit trail

Provide a readable timeline and structured event table:
- Timestamp
- Actor / role
- Action
- Record affected
- Previous and new state
- Reason / comment
- Evidence reference
- Event hash / previous-event hash, if implemented

If using a hash chain, describe it as **tamper-evident**, not impossible to alter. A database administrator able to rewrite the entire chain may defeat a basic hash chain; independently protected checkpoints are a future enhancement unless implemented.

### I. Policy & scrutiny copilot

The copilot is an assistant, not an authority.
- Answers cite the specific policy section and case evidence.
- Distinguish a handbook requirement from a suggested operational control.
- If the source does not answer, say it is unclear and route to authorized review.
- Do not fabricate rules, deadlines, clearances, or citations.
- Keep generated summaries concise and actionable.
- Let users inspect the source passage.
- Mark generated scrutiny notes as drafts.

### J. Document upload and extraction

Use a focused upload workflow:
- Accepted file types and size limits
- Upload progress and retry
- Document classification
- OCR extraction preview
- Field-level confidence or warning, where supported
- Side-by-side source and extracted data
- User correction with preserved original extraction
- Clear handling of unreadable, unsupported, or incomplete documents

Never make OCR extraction look like bank verification. Show fields as `OCR-extracted` until independently reviewed or confirmed.

---

## 7. Status, evidence, and wording rules

**Prefer**
- “Bank confirmation received — source response attached”
- “Certificate uploaded; issuer not independently confirmed”
- “Amount mismatch: FDR ₹25,00,000 vs certificate ₹20,00,000”
- “Verification stale — last confirmation 42 days ago” (only if date calculation is real)
- “Awaiting Vigilance clearance”
- “Ready for authorized review”
- “Simulated bank response — demo environment”

**Avoid**
- “Fraud detected” when only an anomaly is present
- “100% secure”
- “Blockchain verified” unless an actual blockchain workflow exists
- “Bank verified” for OCR-only or user-uploaded evidence
- “Real-time monitoring” when updates are periodic or simulated
- “Approved” when the system only recommends approval
- “AI validated” without explaining the check performed

Use human-readable explanations for all rules and flags.

---

## 8. Interaction and motion

Motion should clarify state transitions, not decorate the screen.
- Brief transitions for opening panels, switching tabs, and status changes.
- Avoid parallax, bouncing cards, animated gradients, scroll-triggered spectacle, and perpetual motion.
- Respect reduced-motion preferences.
- Use visible focus states and keyboard-accessible interactions.
- Use confirmation dialogs for irreversible or high-impact actions.
- Require a reason for sensitive overrides, rejection, or manual status changes.
- Show loading, success, failure, retry, and empty states for real interactions.

Every visible control must work. If an integration is simulated, explain that before the user initiates the action.

---

## 9. Accessibility and responsive behavior

- Target WCAG 2.2 AA where practical.
- Do not rely on color alone for status.
- Support keyboard navigation, focus visibility, meaningful labels, and screen-reader-friendly controls.
- Keep tables usable at narrow widths; prioritize key fields and expose remaining details in row expansion or detail view.
- Use suitable touch targets on mobile.
- Avoid text below 12 px except rare nonessential metadata; critical status and policy text must remain readable.
- Ensure charts have text equivalents.
- Validate contrast for semantic colors and interactive states.

---

## 10. Data and trust requirements

- Use synthetic institutions, bank names, FDR references, amounts, and responses unless approved real data is available.
- Add a persistent but unobtrusive `DEMO DATA` label when the environment contains synthetic data.
- Never use real personal banking data in screenshots or seed fixtures.
- Do not put sensitive fields into client-side logs or analytics.
- Keep uploaded originals immutable; store corrections and versions as separate events.
- Store document hashes and audit events server-side.
- Use least-privilege permissions and validate every sensitive action server-side.
- Keep secrets and API credentials out of source code.
- Never represent a bank API, digital-signature validation, external anchoring, or MFA as implemented unless it actually is.

---

## 11. Technical implementation instructions for the coding agent

Before changing the UI:
1. Inspect the repository, framework, routes, components, design tokens, and current flows.
2. Identify working features and preserve them. Do not rewrite the application from scratch unless asked.
3. Map requested screens to current routes and data models.
4. Reuse the existing stack and component library where appropriate; avoid dependencies without a concrete need.
5. Identify which data is real, synthetic, or simulated.
6. Make a concise implementation plan, then implement it.

During implementation:
- Build reusable components for status labels, evidence provenance, document fields, timelines, tables, filters, and confirmation dialogs.
- Centralize status definitions and policy logic.
- Use semantic HTML and accessible form controls.
- Add loading, error, empty, and success states.
- Make buttons, tabs, filters, sorting, search, forms, and navigation functional.
- Do not fake functionality by changing only a label or showing a success toast without performing the action.
- Use deterministic seed data for reproducible demos.
- Keep business rules out of presentational components.
- Add tests for critical validation rules, permissions, and release-state transitions where supported.

After implementation:
1. Run lint, typecheck, tests, and build commands where available.
2. Fix errors introduced by the change.
3. Inspect main screens at desktop and mobile widths.
4. Check overflow, clipping, contrast, spacing, and inaccessible controls.
5. Test main flows end-to-end: upload, extraction, discrepancy review, bank-response simulation, maturity handling, and release review.
6. Report what was implemented, what was tested, and which integrations remain simulated or future scope.

Do not claim checks passed unless actually run.

---

## 12. Definition of done

The work is complete only when:
- The interface has a coherent visual system and consistent typography/spacing.
- The UI is specific to FDR scrutiny and evidence management, not a generic AI dashboard.
- The main task is visually obvious on every workflow screen.
- Status labels communicate the real evidence state and next action.
- Synthetic data and simulated integrations are clearly identified.
- There are no invented performance metrics, fake live activity, or unsupported verification claims.
- Every visible control works or is clearly disabled with an explanation.
- Responsive layouts, accessibility basics, and error/empty/loading states are handled.
- Existing working functionality is preserved.
- Build/test outcomes and remaining limitations are reported honestly.

**Final instruction:** Prioritize information hierarchy, evidence provenance, and operational clarity over visual effects. The UI should earn trust through what it shows and how precisely it explains each state—not through decorative “AI” styling.
