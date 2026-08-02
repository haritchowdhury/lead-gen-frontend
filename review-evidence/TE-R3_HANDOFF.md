# TE-R3 Handoff — Normalized Semantic Integrity and Truthful Rendering

**Window:** TE-R3  
**Status:** implementation and verification complete; ready for TE-R4  
**Completed:** 2026-08-02  
**Production enablement:** not claimed; both enrichment flags remain false

## Outcome

Backend storage, public serialization, backend CSV, frontend validation, client
CSV, and traffic rendering now enforce one semantic traffic contract. The
backend reuses the exact provider canonicalizers at cache and publication
boundaries. The frontend independently mirrors the public cross-field rules.
Malformed optional enrichment fails closed without changing core lead fields or
creating source attribution.

Date-only CrUX collection periods are formatted as UTC calendar dates, while
observation timestamps retain locale-aware timestamp behavior. This removes the
west-of-UTC previous-day display defect.

## Changed files

Backend repository (`email_scraper`):

- `src/api-serializer.js`
- `src/output.js`
- `test/api-serializer.test.js`
- `test/csv.test.js`
- `test/prisma-run-repository.test.js`

Frontend repository (`frontend`):

- `lib/api-validation.ts`
- `components/traffic-enrichment.tsx`
- `test/api-validation.test.ts`
- `test/csv-export.test.ts`
- `test/lead-details-component.test.ts`
- `review-evidence/TE-R3_HANDOFF.md`

No provider adapter, provider request/response contract, database schema,
migration, orchestration, authentication, ownership, feature flag, production
gate, or unrelated visual design was changed. `lib/api-types.ts` and
`lib/csv-export.ts` required no source change because their existing types and
validated projection seam already represent the tightened contract.

## Locked behavior proved

- DataForSEO targets use the adapter's canonical ASCII hostname rules.
- DataForSEO scopes use only the exact nine ISO/location-code pairs plus
  worldwide, with one target, unique scopes, and at most ten records.
- Complete/partial DataForSEO states agree with complete/partial scope material.
- CrUX origins use the adapter's exact canonical HTTPS-origin rules.
- CrUX dataset months and collection dates are real; collection periods are
  ordered.
- REST form-factor and monthly device fractions remain in `[0,1]` and sum to
  one within the inclusive `0.01` rounding tolerance.
- Available CrUX REST material contains at least one metric or a complete
  form-factor object.
- REST and popularity material for one public lead use the same exact origin.
- Cache and publication source, identity, scope, contract, state, fetch time,
  and coverage time are checked together before persistence.
- Legacy repository test doubles that omit database-guaranteed metadata remain
  compatible, while explicit conflicting metadata fails closed.
- Unsupported, duplicate, dropped, or cross-origin material cannot create
  `traffic_sources`, attribution, or provenance CSV columns.
- Numeric provider zero remains visible; missing material remains absent.
- Backend CSV validates the public traffic object before choosing headers or
  writing any output.
- Frontend parsing independently rejects every consumed semantic conflict while
  continuing to ignore documented unknown additive fields.
- Client CSV reuses the strict frontend parser, preserving backend-equivalent
  columns, values, attribution, zero handling, and formula protection.
- Historical/off-off and all four source combinations remain compatible.

## Adversarial regressions

The fixed regressions cover duplicate scopes, different targets, noncanonical
targets, unsupported `ZZ`, wrong country/location pairs, invalid `202613`
month, HTTP/path CrUX origins, different component origins, empty available
REST material, fraction sums of three and other invalid sums, reversed dates,
stored timestamp/coverage mismatch, unsupported material attribution, and
mapper rejection before a transaction begins.

## Verification

From `email_scraper/`:

```text
node --test test/api-serializer.test.js test/csv.test.js test/prisma-run-repository.test.js test/server.test.js
PASS — focused mapper, public, CSV, repository, and server/API regressions

npm test
PASS — 219 tests; 214 passed, 0 failed, 5 database-gated skips

npm run check:secrets
PASS — no credential-shaped assignments found

git diff --check
PASS
```

The server tests were run with permission to bind their temporary localhost
servers. No database change was made in TE-R3; the five existing PostgreSQL
tests remained explicitly gated, and their TE-R1/TE-R2 evidence is unchanged.

From `frontend/`:

```text
npm test
PASS — 34 tests, 0 failed across 5 test entrypoints

npm run lint
PASS

npx tsc --noEmit
PASS

npm run build
PASS — Next.js 16.2.12 production compile, TypeScript, page collection, and generation

git diff --check
PASS
```

The production build emitted the pre-existing Neon Auth dynamic-cookie
diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`. They did not
prevent a successful build and are unrelated to TE-R3.

## Browser and timezone evidence

The actual component regression changed `process.env.TZ` between
`America/Los_Angeles` and `Asia/Kolkata`; `formattedCalendarDate("2026-07-01")`
returned the same calendar date in both cases.

A separate headless Google Chrome probe ran the same browser-side `Intl`
calendar-date operation under both timezones. Both DOM captures contained:

```text
<output id="result">Jul 1, 2026</output>
```

Both Chrome processes exited zero. The temporary probe file was removed. No
layout or visual-design change was made, so the existing TE6 desktop and narrow
layout screenshots remain representative.

## Residual risks and production gates

- Written DataForSEO customer display/export permission remains required.
- Approved short-lived AWS-to-Google credentials remain required.
- Final legal review of CrUX CC BY attribution wording remains required.
- Current provider price, quota, location, and BigQuery byte-cap review remains
  required.
- The parent repository tracking/rename finding `TE8-F7` remains a TE-R5
  release gate and was not modified in this window.
- No live provider, production database, deployment, or customer-data operation
  was performed.

## Stop confirmation

TE-R4 was not started. Both `ENABLE_DATAFORSEO_ENRICHMENT` and
`ENABLE_CRUX_ENRICHMENT` remain disabled by default.
