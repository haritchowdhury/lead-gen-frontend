# G1 handoff — baseline, behavior inventory, and regression harness

**Status:** implementation complete with an explicit authenticated-browser gap; ready for parent review  
**Completed:** 2026-08-03  
**Window boundary:** G1 only; G2 was not started

## Outcome

G1 established deterministic synthetic fixtures and regression assertions for the densest result/evidence and traffic boundaries without changing production behavior or presentation. A reusable direct-Chrome harness captures public, authentication, and not-found states and records layout measurements. It also proves and records the current blocker for protected states: the real Next.js proxy redirects an unauthenticated synthetic browser session to `/sign-in` before client fixtures execute.

No authentication bypass was added and no screenshot of that redirect is labeled as protected-page proof. Query review, loaders, history, completed results, expanded disclosures, and traffic interactions remain explicit browser-evidence gaps until a deterministic Neon-compatible session fixture is available.

## Baseline

- Commit: `8aa4bed597b4d056cf85e2e1eea892c1f9b22ff3`
- Branch: `main`
- Initial `git status --short --untracked-files=all`: empty (clean)
- Node `v24.14.1`; npm `11.11.0`; Chrome `146.0.7680.164`
- The checklist's observed dirty-worktree warning did not match the state at G1 start. The clean state above is the recorded baseline; nothing was cleaned or reverted.

## Changed files

- `test/fixtures.ts` — composable dense lead, all-market, and query-review fixtures.
- `test/design-system-baseline.test.ts` — G1 fixture, state-distinction, parser, link, and market regressions.
- `scripts/g1-browser-baseline.mjs` — dependency-free Chrome DevTools Protocol harness with isolated processes and fail-closed protected-route detection.
- `review-evidence/design-system/G1/*` — inventory, artifact index, checks, log, and screenshots.
- `review-evidence/design-system/G1_HANDOFF.md` — this handoff.

No production component, stylesheet, API route, proxy, parser, authentication, polling, data model, dependency, or lockfile was changed.

## Fixture provenance and coverage

All new data is deterministic and synthetic. Storefront, source, and research identities use `.example`; no credential or customer material is present.

`denseLead()` covers a long store name, unbroken domain/URLs, 18 long vocabulary tokens, six contacts, three store-fit records with three pages each, four discovery occurrences, outcome evidence, resolved storefront, measured worldwide zero, partial/available traffic semantics, and all tracked markets in `US, GB, CA, AU, NZ, DE, FR, IN, AE` order. Separate fixtures assert absent resolved domain and missing traffic. `querySet()` covers two categories and five editable generated queries.

## Tests added

- Dense fixture remains parser-valid and retains all repeated evidence/counts.
- Resolved domain, absent domain, measured zero, and missing traffic remain distinct.
- Query review fixture is deterministic and parser-valid.
- Traffic controls derive only from the nine tracked markets; unsupported shapes have no fallback control path.

Existing regressions continue to prove exact resolved-storefront targeting, safe external links, evidence rendering, score semantics, expansion clearing on result replacement, traffic zero/missing behavior, CSV compatibility, and parser integrity.

## Browser evidence

Reproduce with:

```text
node --experimental-strip-types scripts/g1-browser-baseline.mjs
```

The command starts Next.js on isolated localhost port `4317`, launches `/usr/bin/google-chrome` with an isolated temporary profile, installs deterministic browser fetch fixtures, captures evidence, terminates both process groups, and removes the profile. The successful run exited zero. It made no Neon, backend, storefront, DataForSEO, CrUX, or customer-data request for fixture states. The existing landing health probe may reach the configured local `/api/health` path; it is not used as fixture proof.

Artifacts are indexed in `G1/artifact-index.json`; machine results are in `G1/browser-checks.json`. Captured public states at 390/768/1280 as applicable report no body overflow. Authentication and not-found shells report no body overflow at captured widths.

## Invariant status

- **V1:** source diff contains no production/API/parser/auth changes; existing validation tests pass.
- **V2:** category validation remains covered; query fixture is parser-valid. Browser query editing is a recorded gap.
- **V3:** polling source was not changed. Deterministic browser state sequencing remains a gap due authentication.
- **V4:** existing CSV and result-replacement tests pass. Browser filter/sort/search/pagination interaction remains a gap.
- **V5:** dense fixture retains every populated evidence family and repeated items through parsing; existing static rendering tests pass.
- **V6:** measured zero, absent enrichment, partial, no-coverage, and unavailable remain separately covered across fixtures/existing tests.
- **V7:** existing component test proves resolved storefront `https://fixture.example/`, not the product URL; G1 adds present/absent fixture coverage. Browser link inspection remains a gap.
- **V8:** all nine tracked markets and absence of an unsupported fallback control are asserted. Browser selection/reset remains a gap.
- **V9:** public screenshots prove no body overflow; existing TE6 evidence remains historical. Current dense protected-row browser proof remains a gap.
- **V10–V12:** preserved for later owners. No production motion/focus behavior or user-owned baseline changes were altered.

## Verification

```text
node --experimental-strip-types --test test/design-system-baseline.test.ts
PASS

npm run lint
PASS

npm test
PASS — 6 test entrypoints, 0 failed

npx tsc --noEmit
PASS

git diff --check
PASS

npm run build
PASS after permission to bind Turbopack's internal helper port
```

The first sandboxed build failed only with the documented Turbopack `binding to a port / Operation not permitted` restriction. The permitted rerun passed. It emitted the existing Neon Auth dynamic-cookie diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`; these were recorded separately and did not fail the build.

## Residual risks and prerequisite

To close the protected-state browser gap, provide or approve a deterministic local authentication service/session that is compatible with the existing Neon middleware. The fixture must not contain production credentials or customer data. Client-only fetch interception cannot establish this session because the proxy redirects the document request before React mounts.

The parent should not treat historical TE6 screenshots as current G1 proof and should not check G1 complete if authenticated browser coverage is mandatory before G2. The checklist explicitly permits recording an exact blocker; this handoff does so without fabricating evidence.

G2 tokens and visual implementation were not started.
