# G4 handoff — Truthful frontend evidence and end-to-end compatibility

Status: **COMPLETE**

Date: 2026-07-31

## Outcome

The frontend now consumes the complete nullable G3 contract, presents every
validated contact channel without precedence loss, distinguishes score-v1 legacy
rows from evidence-rank v2, exposes full store/category/contact/identity/discovery
evidence, and keeps query audits and run diagnostics outside the lead collection.

Controlled regressions prove:

- email, phone, contact-page, and social channels remain independently visible;
- unsafe, credential-bearing, invalid, and missing URLs are not rendered as
  external links;
- indirect, research-only, and no-contact states use distinct truthful labels;
- rejected v2 rows cannot retain positive score styling, while legacy v1 scores
  remain readable with neutral, non-comparable semantics;
- changing the result query remounts the lead table so expanded evidence cannot
  remain attached to another page or filter result; and
- export retrieves each results page once, preserves row order, retains the exact
  25-column legacy prefix, and appends all 12 G3 evidence columns.

## Frontend contract

New nullable types cover run pipeline/scoring versions, separate progress failure
counters, business qualifier, store fit/evidence, contactability/evidence, identity
evidence, score breakdown/semantics, discovery occurrences, matched categories,
query audits, and diagnostics. Unversioned rows remain `legacy_v1` and do not need
synthetic v2 evidence.

Compact rows show the contactability tier plus every available channel kind.
Expanded rows show actual email/phone values, their sources when present, validated
contact pages, safe social profiles, contact evidence confidence/method/source,
category and store fit, matched category intents, identity domains and canonical
trust, score components/version/semantics, every discovery occurrence, and explicit
outcome notes.

Evidence-rank v2 is labeled as a deterministic evidence rank, not a probability.
Rejected and failed v2 rows show `Not scored`. A numeric legacy score is shown only
with neutral `Legacy v1` semantics and no high-score styling.

## BFF and ownership

New Next.js Route Handlers:

- `GET /api/runs/[runId]/query-audits?page=1&pageSize=10`
- `GET /api/runs/[runId]/diagnostics?page=1&pageSize=10`

They reuse the existing verified Neon session, server-derived `X-User-Id`, private
service token, run-ID validation, no-store behavior, bounded timeout, and backend
response status. Only `page` and `pageSize` are accepted; unknown or duplicate
parameters are rejected. Browser clients still cannot choose an owner ID or read
the service token.

## CSV compatibility

The export has 37 columns. Columns 1-25 are unchanged. These fields are appended
in the same order as the backend output contract:

```text
business_qualifier
pipeline_version
scoring_version
store_fit_state
store_fit_evidence
contactability_tier
contact_evidence
identity_confidence
identity_evidence
score_breakdown
discovery_occurrences
matched_categories
```

Structured fields use one JSON cell, nulls remain empty, and formula-like scalar
text retains the existing spreadsheet-injection protection. Export-all continues
to fetch every page at a page size of 200.

## Changed files

Frontend contract and behavior:

- `lib/api-types.ts`
- `lib/lead-presentation.ts`
- `lib/csv-export.ts`
- `components/results-table.tsx`
- `components/run-evidence.tsx`
- `components/run-workspace.tsx`
- `components/export-csv-button.tsx`
- `app/api/runs/[runId]/query-audits/route.ts`
- `app/api/runs/[runId]/diagnostics/route.ts`
- `app/globals.css`
- `README.md`

Tests and tracking:

- `test/lead-presentation.test.ts`
- `test/csv-export.test.ts`
- `review-evidence/G4_HANDOFF.md`
- `../PIPELINE_QUALITY_REMEDIATION_EXECUTION_CHECKLIST.md` (G4 status/evidence only)

No backend algorithm, Prisma schema, migration, authentication provider, or
deployment file was changed.

## Next.js documents read

The mandatory local guidance and relevant installed Next.js 16.2.12 documentation
were read before source edits:

- `frontend/AGENTS.md`
- `01-app/01-getting-started/05-server-and-client-components.md`
- `01-app/01-getting-started/15-route-handlers.md`
- `01-app/02-guides/backend-for-frontend.md`
- `01-app/02-guides/testing/index.md`
- `01-app/03-api-reference/01-directives/use-client.md`
- `01-app/03-api-reference/03-file-conventions/route.md`

The implementation retains the existing client boundary for interactive polling,
uses dynamic Node.js Route Handlers, awaits promised dynamic parameters, validates
forwarded input, and leaves service credentials in server-only modules.

## Verification

Executed from `/home/harit/Email Scrapper/frontend`:

```text
npm run lint
PASS

npm test
PASS — 3 test files

node --experimental-strip-types test/category-validation.test.ts
PASS — 3 cases

node --experimental-strip-types test/lead-presentation.test.ts
PASS — 6 cases

node --experimental-strip-types test/csv-export.test.ts
PASS — 5 cases

npx tsc --noEmit
PASS

npm run build
PASS — Next.js production compilation, TypeScript, page generation, and both new
dynamic Route Handlers completed

git diff --check
PASS

changed-file trailing-whitespace scan
PASS
```

The production build required permission to bind a local Turbopack helper port.
It emitted the pre-existing Neon Auth dynamic-render diagnostic for pages that use
cookies, then completed successfully with all routes dynamic.

No live backend, Neon database, provider, storefront, deployment, or production
call was made.

## Controlled render evidence and residual risks

The repository has no Playwright, Cypress, Vitest, Jest component, or other browser
harness. No user's development server was started or terminated. Instead, the
presentation matrix exercises both/all/single contact channels, indirect,
research-only, none, rejected v2, high-score legacy v1, unsafe URLs, score
components, and stale expansion behavior as pure controlled frontend inputs; the
production build verifies the TSX and responsive CSS compile together.

Because no authenticated browser fixture exists, pixel-level responsive layout,
live keyboard interaction, expired sessions, and foreign-run behavior were not
replayed in a browser. The new routes use the unchanged authenticated Route Handler
and backend ownership path, but a future parent reliability review may choose to
add browser automation as an append-only corrective window.

The parent reliability review and any later corrective window were not started.
