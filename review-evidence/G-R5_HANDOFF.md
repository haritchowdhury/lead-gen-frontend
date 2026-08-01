# G-R5 handoff — Complete and truthful presentation and export

Status: **COMPLETE**

Date: 2026-08-01

## Outcome

G-R5 restores corrective invariant C9. Successful backend payloads are now
runtime-validated before any result, run, audit, diagnostic, continuation, or CSV
consumer trusts them. The expanded lead view renders the complete durable G-R4
contract, v2 not-scored rows are distinct from historical legacy rows, expansion
cannot attach to a replaced result set, and both CSV implementations neutralize
spreadsheet formulas while preserving append-only compatibility.

No database schema, qualification decision, score weight, authentication model,
endpoint, deployment, or G-R6 worker behavior changed.

## Starting reproductions

The bounded source/runtime review confirmed the G-R5 findings before correction:

- `apiRequest<T>` returned `payload as T`; malformed successful responses could
  reach every frontend consumer without shape validation.
- `ScoreSemantics` omitted the stable G-R4 `not_scored_v2` value and the frontend
  export omitted G-R4's appended `original_shop_type` field.
- The expanded view did not render per-page store-fit terms/signals/type/strength/
  text length, contact kind/validation reason, exact occurrence input/reason/final
  URL, or identity display hostname.
- Expansion was remounted only by the result query string and was not guarded
  directly against a replaced result set.
- Backend CSV escaping handled RFC quoting but did not neutralize formulas.
- The development seed created legacy-shaped leads through a v2 run.
- Existing frontend tests exercised presentation helpers rather than the actual
  expanded TSX component.

## Contracts established

### Runtime response validation

`lib/api-validation.ts` contains dependency-free parsers for every successful
response family consumed by the frontend:

- start/claim responses and anonymous run intents;
- run status and run history;
- result pages and every nested lead evidence shape;
- query-audit pages; and
- diagnostic pages.

Required fields, enums, numbers, nullability, pagination, arrays, and nested
evidence are validated. One malformed lead or nested item rejects the entire
response. Parsers reconstruct only documented fields, so additive fields are
allowed but are not cast into trusted data. `apiRequest` now requires a parser,
and the anonymous run-intent Route Handler validates its backend response before
using it to set continuation state.

On result filter/page changes, old results are hidden until the current query is
validated. A malformed response displays the existing safe retry error and no
result row from that response.

### Truthful evidence and score presentation

The frontend contract now includes `original_shop_type`, `not_scored_v2`, full
category intent/occurrence provenance, store-fit page evidence, contact-page
decisions, and complete identity evidence.

The extracted `LeadDetails` component renders:

- every validated email, phone, contact page, and social profile together with
  kind, value, source, method, confidence, and validation reason;
- contact-page acceptance, route, same-store, HTTP/page usability, and positive
  signals;
- exact original category input, normalized category, qualifier, vocabulary,
  accepted-match status, matched terms, aggregate signals, breadth evidence, and
  every page URL/type/strength/text length;
- generated/search queries and each occurrence's exact input, qualifier,
  vocabulary, generation reason, source URLs, rank, score, requested result URL,
  observed final URL, and domains;
- display/stable/resolved/MyShopify/observed hostnames, merge count, method,
  confidence, and canonical URL/hostname/trust/reason; and
- pipeline/scoring/breakdown versions, every score component, and exact score
  semantics.

Unsafe URLs never become links, missing URLs do not produce blank anchors, and an
unverified canonical is labeled as evidence rather than an equivalent identity.
`evidence_rank_v2`, `not_scored_v2`, and `legacy_v1` have separate presentations;
a null v2 score is never displayed as zero or legacy.

### Expansion safety and actual component evidence

`ResultsTable` normalizes expanded state against the current lead IDs before
rendering. The table remount identity includes run ID, page/filter query, and the
ordered result IDs, covering run, page, filter, and result-set replacement.

The repository has no browser/component harness. Following the checklist's
preferred bounded approach, `test/lead-details-component.test.ts` compiles the
real TSX components into a unique temporary directory with the installed
TypeScript compiler, renders them with the installed React server renderer, and
adds no dependency. Three controlled component tests prove:

- one full-evidence row visibly contains all evidence families and all four
  contact channels;
- null/unsafe optional URLs create neither unsafe nor blank links; and
- replacing the lead collection cannot retain the previously expanded row or its
  evidence.

No user development server was started, stopped, or replaced. No browser evidence
was added because no Playwright, Cypress, Jest, Vitest, DOM, or authenticated
browser harness exists.

### CSV parity

The frontend export now has 38 columns. Columns 1-25 remain unchanged, the prior
12 evidence fields remain in their existing order, and `original_shop_type` is
appended as column 38 to match the G-R4 backend output.

Backend and frontend serializers neutralize string cells beginning with `=`, `+`,
`-`, `@`, tab, carriage return, or whitespace followed by a formula marker.
Numeric cells remain numeric. Tests retain commas, quotes, JSON arrays/objects,
Unicode, and embedded line breaks, and the export-all test retrieves all three
fixture pages exactly once in backend order.

### Development fixtures

`src/seed-frontend.js` now prepares a complete scored-v2 row, a consistent
not-scored-v2 rejected row, and a separate explicitly unversioned historical run
with a true legacy row. The full-evidence v2 fixture includes every evidence
family used by the component proof. Existing production refusal, explicit
non-production confirmation, and owner requirements remain in place.

The seed was syntax-checked but not executed because no database mutation was
required or authorized for G-R5.

## Changed files

Backend CSV and fixtures:

- `email_scraper/src/csv.js`
- `email_scraper/src/seed-frontend.js`
- `email_scraper/test/csv.test.js`

Frontend boundary, contract, presentation, state, and export:

- `frontend/app/api/runs/route.ts`
- `frontend/components/export-csv-button.tsx`
- `frontend/components/lead-details.tsx`
- `frontend/components/results-table.tsx`
- `frontend/components/run-continuation.tsx`
- `frontend/components/run-evidence.tsx`
- `frontend/components/run-form.tsx`
- `frontend/components/run-history.tsx`
- `frontend/components/run-workspace.tsx`
- `frontend/lib/api-types.ts`
- `frontend/lib/api-validation.ts`
- `frontend/lib/client-api.ts`
- `frontend/lib/csv-export.ts`
- `frontend/lib/lead-presentation.ts`
- `frontend/README.md`

Frontend tests:

- `frontend/test/api-validation.test.ts`
- `frontend/test/csv-export.test.ts`
- `frontend/test/fixtures.ts`
- `frontend/test/lead-details-component.test.ts`
- `frontend/test/lead-presentation.test.ts`

Tracking:

- `frontend/review-evidence/G-R5_HANDOFF.md`
- `PIPELINE_QUALITY_REMEDIATION_EXECUTION_CHECKLIST.md` (G-R5 status/evidence only)

## Next.js documents read

The mandatory local guidance and relevant installed Next.js 16.2.12 documents
were read completely during G-R5:

- `frontend/AGENTS.md`
- `01-app/01-getting-started/05-server-and-client-components.md`
- `01-app/01-getting-started/06-fetching-data.md`
- `01-app/01-getting-started/10-error-handling.md`
- `01-app/01-getting-started/15-route-handlers.md`
- `01-app/02-guides/backend-for-frontend.md`
- `01-app/02-guides/testing/index.md`
- `01-app/03-api-reference/01-directives/use-client.md`

The interactive polling/table boundary remains a Client Component; the extracted
details renderer is pure and serializable. Route Handler authentication,
server-derived ownership, private token handling, no-store behavior, and bounded
timeouts remain unchanged.

## Verification

Executed from `/home/harit/Email Scrapper/email_scraper`:

```text
node --test test/csv.test.js test/api-serializer.test.js test/server.test.js
PASS — 16 passed, 0 failed, 0 skipped

npm test
PASS — 103 tests: 101 passed, 0 failed, 2 database-gated skips

node --check src/seed-frontend.js
PASS
```

The two full-suite skips are the pre-existing G-R4 disposable-database files;
G-R4 executed and passed both separately. G-R5 has no database migration or
database-test dependency.

Executed from `/home/harit/Email Scrapper/frontend`:

```text
npm run lint
PASS

npm test
PASS — 5 test files, 0 failed

node --experimental-strip-types test/lead-details-component.test.ts
PASS — 3 actual rendered-component tests, 0 failed

npx tsc --noEmit
PASS

npm run build
PASS — Next.js 16.2.12 production compile, TypeScript, page generation, and all
dynamic routes completed
```

The first sandboxed backend server run and Next build could not bind ephemeral
localhost helper ports. They were rerun with the required port permission and
passed. The successful production build emitted the pre-existing Neon Auth
dynamic-cookie diagnostics for `/_not-found`, `/`, `/sign-in`, and `/sign-up`;
these were reported separately from failures and did not prevent exit 0.

Final repository checks:

```text
git diff --check
PASS

git status --short
EXECUTED — the pre-existing renamed-project dirty worktree remains preserved;
only the bounded G-R5 files listed above were changed by this window.
```

No live backend, database, Google, OpenAI, Browserless, storefront, deployment,
credential, or production operation was performed.

## Residual risks and stop confirmation

- There is still no authenticated browser automation harness, so pixel-level
  layout, keyboard behavior, expired-session navigation, and foreign-run browser
  flows were not replayed. Runtime parsers, the actual component renderer,
  production compilation, and unchanged owner-scoped backend tests cover the G-R5
  contract without adding a broad test dependency.
- Historical stored JSON outside the documented nullable contract will fail
  closed rather than being partially displayed. This is intentional.
- G-R6 still owns cross-instance worker leases, restart recovery, fencing, and
  repository/configuration hygiene.

G-R6 was not started. No live migration, deployment, provider call, database seed,
credential rotation, or running user server action was performed.
