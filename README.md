# Praman · AICTE Security Deposit Demo

Dependency-free frontend prototype for demo FDR scrutiny, simulated bank confirmation, maturity monitoring, and release review.

## Run locally

From this folder, start the static-only preview server (it serves files and falls back to the app shell for client-side routes):

```powershell
py serve.py
```

Then open <http://localhost:4173>. Stop the server with `Ctrl+C`. The server exposes no application API or mutable server data; browser `localStorage` is used when available and malformed/unavailable storage falls back to the deterministic seed.

## Demo sequence

1. Open `/` and select **Open sample workspace** to enter the AICTE Officer control room immediately. No login or sign-up step is used in the prototype.
2. Inspect **FDR/26/1043** in the register, compare the declared and illustrative amount, and create a simulated confirmation request.
3. Switch to **Bank Verifier**, open Verification, and return a match, mismatch, unable-to-confirm, or more-information response with a note. Only assigned requests appear in this workspace.
4. Switch back to **AICTE Officer** and inspect the linked passport, scrutiny finding, and audit event.
5. Open Maturities and record a linked successor. The predecessor stays unresolved.
6. Open Reconciliation, run the local ledger comparison and the Overview daily sweep; inspect the evidence graph and document version fingerprint on an FDR detail.
7. Inspect a blocked Release case, record demo clearances, make a recommendation, switch the simulated reviewer identity for checker review, then switch to **Bank Verifier** and record the separate execution confirmation. Inspect the Audit Trail.
8. Use the bottom-right **Ask PRAMAN** button from any workspace screen. Its three deterministic prompts explain the attention queue, the FDR/26/1043 mismatch, and the FDR/24/0610 release blocker. The full Policy Copilot remains available under **Policy & rules**.

The **Regional Officer** workspace is scoped to Maharashtra. The **Institution User** workspace is scoped to Aarohan Institute of Technology. These demo scopes are enforced by the client-side mock service layer for workflow consistency; they are not production authorization controls.

Use the sidebar reset control to restore the fixed sample seed. Role selection is a presentation convenience, not authentication or production authorization. All operations are local simulations; no data leaves the browser. The former `/login` URL now routes directly to the sample workspace.

## Checks

- JavaScript syntax: `node --check app.js`
- Frontend state-transition smoke test: `node smoke_test.js`
- No package manifest or dedicated lint, typecheck, or build scripts exist in the supplied repository. The frontend adds no runtime dependencies or backend.

The smoke test uses browser API stubs and exercises the four role scopes, required route rendering, institution correction and release requests, reconciliation flags, monitoring sweep, one-use expiring verification, fingerprint binding, document versions, maker/checker separation, simulated bank execution, mismatch handling, audit updates, reset, and malformed/unavailable storage fallback.
