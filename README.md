# StoreSignal frontend — development record

Last reconciled with the source: **11 August 2026**

This is the maintained frontend development record and current-state guide. The
older plans and handoffs are retained under `docs/` and `review-evidence/`, but
the current routes, types, runtime validators, and components are authoritative.

Current AWS backend-transfer plans are maintained separately at the repository
root. This frontend record remains authoritative for the existing UI/BFF
contract that the Lambda–SQS–S3–Neon migration must preserve.

## Current state

StoreSignal is a Next.js 16.2.12 App Router application on React 19.2.4 and
TypeScript. It is both the user interface and the only browser-facing BFF for the
private lead service.

| Area | Implemented state |
|---|---|
| Rendering | Next.js App Router with server pages, client workspaces, and Node.js Route Handlers |
| Styling | Tailwind 4 build pipeline plus a large custom semantic/global CSS system |
| Authentication | Neon Auth 0.4.2-beta email/password, server sessions, auth proxy for `/runs`, and per-route session validation |
| Backend boundary | Same-origin Route Handlers add the private bearer token and trusted session user ID |
| Run flow | Category submission, auth continuation, query review/edit/start, progress polling, results, diagnostics, and history |
| Lead views | Immutable completed-run results plus current deduplicated `/leads` master workspace |
| Traffic | Cumulative and per-lead market globes, source detail, country selection, and query treemap |
| Filtering/export | Search, status, sort, pagination, repeated discovery-query filters, and all-page CSV export |
| Validation | Strict runtime parsing of backend payloads, including score-state and traffic cross-field invariants |
| Design fixtures | Environment-gated real-component fixture route and browser regression scripts |

## Repository map

```text
frontend/
├── app/
│   ├── api/                       same-origin BFF and Neon Auth handlers
│   ├── leads/                     current master lead workspace
│   ├── runs/                      run history, continuation, and run workspace
│   ├── sign-in/ and sign-up/      email/password authentication
│   └── design-fixture/            guarded deterministic visual harness
├── components/
│   ├── leads/                     master workspace and export
│   ├── ui/primitives.tsx          shared visual primitives
│   ├── run-*.tsx                  submission, review, progress, and history
│   ├── results-*.tsx              filters/table/expanded evidence
│   └── *traffic*.tsx              globe, treemap, source and aggregate views
├── lib/
│   ├── auth/                      server/client Neon Auth boundaries
│   ├── api-types.ts               TypeScript contract
│   ├── api-validation.ts          fail-closed runtime parsers
│   ├── backend-proxy.ts           private service proxy
│   └── presentation/export helpers
├── test/                          Node-based unit and source/component contract tests
├── scripts/                       deterministic browser regression flows
├── review-evidence/               migration and browser handoffs
└── docs/                          historical and open-work records
```

## Development history

### 31 July — first frontend, JSON workspace, and authentication

- Built the initial Next.js application against the durable backend JSON API.
- Added category submission, run polling, results filters/table, pagination,
  expanded evidence, and complete-dataset CSV export.
- Added Neon Auth email/password screens, sign-out/header state, anonymous pending
  search continuation, authenticated direct submission, and owner-scoped BFF
  routes.
- Added `/runs` history and protected run pages without exposing the backend URL,
  bearer token, cookie secret, or database credentials to client code.

### 1 August — query review and truthful pipeline v2 presentation

- Added durable query editor states: load revision, edit/add/remove/reorder,
  replace, confirm, row-level validation, revision-conflict recovery, and polling.
- Expanded results to show contact evidence, category intent/vocabulary, store-fit
  evidence, identity provenance, discovery occurrences, diagnostics, and score
  semantics.
- Added strict payload validation and spreadsheet-formula-safe CSV export.

### 2 August — traffic enrichment presentation

- Added strict DataForSEO and CrUX parsing with safe unavailable, no-coverage,
  partial, and contract-mismatch states.
- Added individual and cumulative traffic presentation, attribution, market
  selection, and traffic-aware result details without changing qualification.

### 3–4 August — visual system, master leads, globes, and score v3

- Implemented the G1–G12 visual-system component/style artifacts, compact result
  hierarchy, landing composition, loaders, expanded evidence, traffic views, and
  responsive treatments.
- Added `/leads`, backed by current user-owned master shop/profile/traffic data,
  while leaving historical run pages on immutable snapshots.
- Shared table/detail presentation between historical and live lead surfaces where
  their contracts overlap.
- Added run and master aggregate traffic globes and current profile/discovery
  history presentation.
- Added strict v3 score parsing and distinct display for measured v3,
  insufficient-traffic v3, unscored rejected/failed outcomes, v2, and legacy data.
- Replaced the equal-cell query traffic grid with a Recharts squarified treemap,
  proportional area, a fixed square plot, zero-traffic separation, top-30/Other
  grouping, URL-backed multi-query selection, pagination reset, and export parity.

## User-facing routes

| Route | Purpose |
|---|---|
| `/` | Public landing page and category submission |
| `/sign-up` | Neon Auth registration |
| `/sign-in` | Neon Auth login |
| `/runs/continue` | Claim an anonymous pending intent after authentication |
| `/runs` | Authenticated paginated run history |
| `/runs/{runId}` | Query review, live progress, completed results, evidence, and traffic |
| `/leads` | Current deduplicated user master lead workspace |
| `/design-fixture` | Non-production deterministic visual/browser fixture when explicitly enabled |

The run page is a single phase-aware workspace. It moves through query planning,
query review, confirmed discovery, progressive results, optional traffic, and
terminal states without changing the run ID.

## BFF and trust boundary

The browser calls only same-origin `/api/*` routes. Route Handlers:

1. validate the Neon Auth session for protected data;
2. validate route IDs and allowed query parameters;
3. forward only explicit headers and bodies;
4. attach `Authorization: Bearer <BACKEND_API_TOKEN>` server-side;
5. attach `X-User-Id` from the trusted session, never browser input;
6. enforce bounded fetch timeouts and `cache: "no-store"`;
7. convert unreadable, unavailable, timeout, auth, and configuration failures to
   safe JSON errors.

The active BFF routes mirror the backend:

```text
/api/health
/api/auth/[...path]
/api/run-intents/claim
/api/runs
/api/runs/{runId}
/api/runs/{runId}/queries
/api/runs/{runId}/start
/api/runs/{runId}/results
/api/runs/{runId}/traffic-overview
/api/runs/{runId}/query-audits
/api/runs/{runId}/diagnostics
/api/leads
/api/leads/traffic-overview
```

`BACKEND_API_BASE_URL`, `BACKEND_API_TOKEN`, and `NEON_AUTH_COOKIE_SECRET` are
server-only. There are no `NEXT_PUBLIC_` copies of those values.

## Authentication and run continuation

Three implemented paths converge on one owned run:

```text
signed in -> submit categories -> owned run -> /runs/{runId}
signed out, new -> pending intent -> sign up -> claim -> /runs/{runId}
signed out, returning -> pending intent -> sign in -> claim -> /runs/{runId}
```

The pending intent identifier is held in an HTTP-only same-origin cookie. Claim is
idempotent in the backend, the cookie is cleared after success, and no scraper or
paid provider work begins while the intent is unowned.

Route middleware redirects `/runs/*` navigation when no auth session is available.
Authorization does not rely on middleware: every protected BFF handler checks the
session before it forwards a request. `/leads` data is likewise protected at its
API boundary.

## Run workspace behavior

### Query preparation

- Accepts up to 100 normalized category lines.
- Polls while the backend generates and probes its exact target query count.
- Loads durable query revision 1 only after the backend declares it ready.
- Allows complete-list replacement with add/edit/remove/reorder operations.
- Sends the last loaded revision; a stale revision cannot overwrite newer data.
- Surfaces row-level invalid-query feedback and remains in review when final
  validation fails.

### Progress and recovery

- Maps backend stages to stable user-facing labels and progress percentages.
- Handles queued, running, awaiting confirmation, completed, failed, cancelled,
  reconnecting, and unavailable states.
- Continues polling through progressive store, lead, and traffic checkpoints.
- Surfaces only backend-safe terminal messages and offers a new-run action.

### Results and evidence

- Server-side search, status, sorting, and pagination stay aligned with the
  backend result summary.
- Expanded state is keyed by stable lead identity and is cleared when the visible
  page/filter/run no longer contains that lead.
- Detail presentation includes all validated contact, identity, category,
  store-fit, occurrence, score, diagnostic, and traffic material.
- External URLs are normalized and rejected unless safely renderable.
- CSV export fetches all filtered pages, preserves the contract header order, and
  neutralizes spreadsheet formulas.

## Current master leads

`/leads` is a different data product from a historical run:

- The list is authorized by user-to-shop grants, deduplicated across the user's
  runs, and reads current global shop/profile/traffic material.
- Every distinct discovering run is retained as user-specific history.
- Historical `/runs/{runId}` pages continue to show the snapshot captured in that
  run.
- Search, sort, pagination, discovery-query filtering, aggregate traffic, expanded
  detail, run links, and CSV export operate on the current master dataset.
- A user cannot see a global shop until one of their own runs creates the grant.

Notes/tags/archive fields exist in the backend model, but the current frontend
does not expose editing endpoints or CRM controls for them.

## Traffic visualizations

### Market globe

- Uses `world-atlas`, `d3-geo`, and `topojson-client` for the interactive world
  map.
- Supports worldwide and country views, drag/rotation, reset, per-lead traffic,
  current aggregate traffic, and unavailable/partial states.
- Keeps provider attribution and source semantics separate from qualification.

### Query traffic treemap

- Uses Recharts 3 `Treemap` inside `ResponsiveContainer`.
- Tile area is linear in selected-scope estimated Google search traffic; color is
  a secondary rank cue.
- The plot stays square at every breakpoint.
- Zero-traffic queries appear outside the area encoding.
- More than 30 positive queries are represented by the largest 30 plus an
  explicit `Other queries` aggregate.
- Repeated `discoveryQuery` URL parameters are the filter source of truth for
  both run and master views, including traffic, counts, pagination, navigation,
  and export.
- `__unattributed__` is a stable internal filter token, not a fake query label.

## API types and fail-closed validation

`lib/api-types.ts` defines the consumed TypeScript surface.
`lib/api-validation.ts` validates unknown JSON before it reaches presentation.
The validators enforce:

- run state/phase/stage and complete progress structure;
- pagination and safe error shapes;
- lead status, version pairs, score totals/components/evidence, and score semantics;
- contact/category/identity/store-fit/discovery evidence shapes;
- strict DataForSEO/CrUX states, normalized payloads, attribution, dates, and
  metric relationships;
- master lead grants and discovery history;
- aggregate traffic totals, markets, query summaries, and coverage counts.

Malformed result material fails the response as a whole; the UI does not render a
partially trusted lead or export it.

## Local setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Required server-only environment:

```text
BACKEND_API_BASE_URL=http://127.0.0.1:3000
BACKEND_API_TOKEN=<same private token as backend>
NEON_AUTH_BASE_URL=<enabled Neon Auth endpoint>
NEON_AUTH_COOKIE_SECRET=<at least 32 random characters>
```

Commands:

```bash
npm run lint
npm test
npm run build
npm run check
```

## Verification snapshot — 11 August 2026

Verified against the current source:

- `npm test`: **18 test files passed, 0 failed**.
- `npm run lint`: **0 errors**; one existing React hook dependency warning in
  `components/traffic-globe.tsx`.
- `npm run build`: production compilation and TypeScript pass; all pages and BFF
  routes are emitted as dynamic server routes.
- The build logs Neon Auth cookie/static-render notices for cookie-using pages but
  completes successfully and classifies the routes as dynamic.
- The source-level and real-component fixture harnesses are present. A fresh live
  browser/auth/provider acceptance run was not performed during documentation
  consolidation.

The backend's schema-independent user-master grant integration failure is tracked
in the backend development record; it affects complete end-to-end database
verification of the `/leads` grant path.

## Open frontend work

The design implementation is present, but the authoritative checklist explicitly
did not accept final completion. It records G1–G12 artifacts and the G-R1
real-component harness, then requires G-R2 responsive expanded-row verification,
G-R3 stylesheet/token consolidation, and G-R4 execution-ledger/final parent review.

That unchanged record is retained at
[`docs/open-work/DESIGN_SYSTEM_EXECUTION_CHECKLIST.md`](./docs/open-work/DESIGN_SYSTEM_EXECUTION_CHECKLIST.md).
Do not rewrite its unchecked historical gates or claim the visual migration fully
accepted until its append-only corrective sequence is completed.

Live authentication acceptance also depends on valid Neon Auth configuration and
at least a two-user owner-isolation walkthrough in the target environment.

## Documentation archive

- [`docs/history/AUTH_FRONTEND_AGENT_HANDOFF.md`](./docs/history/AUTH_FRONTEND_AGENT_HANDOFF.md)
  — implemented auth/continuation handoff.
- [`docs/history/DESIGN_SYSTEM_MIGRATION_PLAN.md`](./docs/history/DESIGN_SYSTEM_MIGRATION_PLAN.md)
  — original design research and phase model.
- [`docs/history/USER_MASTER_LEADS_IMPLEMENTATION_PLAN.md`](./docs/history/USER_MASTER_LEADS_IMPLEMENTATION_PLAN.md)
  — retained architecture for the now-present master lead feature.
- [`docs/history/HEATMAP_TREEMAP_REPLACEMENT_PLAN.md`](./docs/history/HEATMAP_TREEMAP_REPLACEMENT_PLAN.md)
  — retained rationale for the now-present treemap and query filtering.
- [`review-evidence/`](./review-evidence/) — pipeline, traffic, and visual-system
  implementation handoffs and browser evidence.

Historical plan wording is preserved for traceability. This README records what
the current frontend actually implements and what remains unverified.
