# G-R10 handoff — One score-state contract across backend and frontend

Status: **COMPLETE**

Date: 2026-08-01

## Outcome

The two F5 contradiction directions now fail closed at every publishing boundary.
A qualified v2 lead cannot be persisted, serialized, parsed, or exported without
a valid integer evidence rank and matching v2 breakdown. A rejected or failed v2
lead cannot carry a score or breakdown. Only genuinely unversioned historical
rows use `legacy_v1`.

The final disposable-database regression also closed the distinction between
historical reads and new writes: `serializeLead` can still publish a valid
unversioned historical row as `legacy_v1`, but `leadRecordToCreate` rejects every
new unversioned write with `new_persistence_requires_v2`. A historical row with
split versions fails closed during serialization.

## Shared contract fixture

Both projects execute:

- `contracts/lead-score-state-v2.fixtures.json`

The table covers valid qualified/rejected/failed v2 rows, scored and unscored
legacy rows, and invalid null/missing/fractional/negative/out-of-range scores,
version splits, mismatched totals/components, wrong breakdown versions/semantics,
status contradictions, and score-semantics contradictions. Non-finite values are
added programmatically because JSON cannot represent them.

## Changed files

Backend runtime:

- `email_scraper/src/lead-state.js` (new)
- `email_scraper/src/api-serializer.js`
- `email_scraper/src/pipeline.js`
- `email_scraper/src/output.js`
- `email_scraper/src/seed-frontend.js`

Backend tests:

- `email_scraper/test/api-serializer.test.js`
- `email_scraper/test/csv.test.js`
- `email_scraper/test/server.test.js`

Frontend runtime:

- `frontend/lib/api-validation.ts`
- `frontend/lib/csv-export.ts`

Frontend tests/fixtures:

- `frontend/test/api-validation.test.ts`
- `frontend/test/csv-export.test.ts`
- `frontend/test/fixtures.ts`

No schema, migration, scoring weight, auth, styling, deployment, provider,
production data, or running server was changed.

## Locked state machine

- Version identity is exact: both pipeline and scoring versions are `2`, or both
  are null/unversioned. Split or unknown versions fail closed.
- Qualified v2:
  - score is a finite safe integer from 0 through 100;
  - breakdown is required, version 2, and has the four documented components;
  - each component is a non-negative integer, component sum equals total, and
    total equals the published score;
  - breakdown semantics are
    `deterministic_evidence_rank_not_probability`; and
  - API semantics are `evidence_rank_v2`.
- Rejected/failed v2 have null score, null breakdown, and
  `not_scored_v2` semantics.
- Historical rows are legacy only when both versions are absent; their historical
  score/null and breakdown combinations are preserved without reclassification.

## Enforcement boundaries

- Pipeline record construction validates every terminal row.
- `leadRecordToCreate` validates before persistence/fingerprinting and permits
  only complete v2 state for new rows.
- `serializeLead` revalidates stored rows before API publication and derives
  semantics only from a valid state while retaining true unversioned legacy
  read compatibility.
- Backend CSV writing rejects invalid rows before creating the output file.
- Frontend `parseLead` mirrors the complete cross-field contract; because result
  page parsing maps all leads atomically, one malformed nested row rejects the
  whole response and the existing workspace error state shows no partial result.
- Frontend CSV serialization revalidates every typed row before producing bytes.
- The actual expanded/table components remain downstream of that mandatory
  whole-response parser; malformed response rows cannot reach them.

The existing append-only CSV columns remain unchanged. Score semantics are
unambiguously derivable from status, exact versions, score, and breakdown, so no
new CSV column was required.

## Next.js instructions read

Before frontend edits, these installed instructions were read completely:

- `frontend/AGENTS.md`
- `01-app/01-getting-started/05-server-and-client-components.md`
- `01-app/01-getting-started/06-fetching-data.md`
- `01-app/01-getting-started/10-error-handling.md`

The implementation preserves the existing Client Component polling/error model:
successful response data is parsed as one unit before state publication, and a
contract violation uses the existing safe request error path.

## Verification

Backend, from `email_scraper`:

```text
node --test test/pipeline.test.js test/api-serializer.test.js \
  test/prisma-run-repository.test.js test/server.test.js test/csv.test.js
45 passed, 0 failed, 0 skipped (exit 0)

npm test
124 tests: 121 passed, 0 failed, 3 database-gated skipped (exit 0)

ALLOW_DATABASE_TESTS=true npm run test:integration
3 passed, 0 failed, 0 skipped (exit 0)

The integration suite used only the configured `TEST_DATABASE_URL` with unique,
disposable schemas. It covered migration replay and preservation, rejection of a
historical split-version row at publication, fractional query-score persistence,
five transactional rollback stages, terminal replay/idempotency, concurrent
lease claiming, expiry recovery, stale-token fencing, and an ordinary atomic
repository write/read.

npx prisma validate
PASS (exit 0)

node --check src/seed-frontend.js
PASS (exit 0)
```

The focused and full backend suites used temporary loopback permission for the
server test.

Frontend, from `frontend`:

```text
npm test
5 test entrypoints passed, 0 failed (exit 0)

npm run lint
PASS (exit 0)

npx tsc --noEmit
PASS (exit 0)

npm run build
PASS — Next.js 16.2.12 production compile/type/page generation (exit 0)
```

The first sandboxed build hit Turbopack's temporary-port restriction. The
permitted rerun passed. It emitted the existing Neon Auth dynamic-cookie
diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`; these did not
prevent a successful build and are unrelated to this gate.

Repository:

```text
git diff --check
PASS (exit 0)
```

No live provider/storefront, primary/production database, migration, deployment,
credential action, database seed, or server stop/restart occurred.

## Stop boundary

G-R11 was not started until G-R10's backend and frontend verification passed.
