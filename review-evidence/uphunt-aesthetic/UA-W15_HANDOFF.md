# UA-W15 window handoff (`UA-W15_HANDOFF.md`)

Parent window: `UA-W15` (Site-wide polish and executed-coverage gate).
Assignment: `ASG-UA-W15-01`. Window agent identity: `UA-W15-WINDOW-AGENT`.
Predecessor: `UA-W14` (parent-accepted, `EV-UA-A-081`). Successor: `STOP`
(no `UA-W16` exists).

## Objective

Leftover a11y/reduced-motion and lead type-floor preservation, executed coverage
equality (`CASE-UA-W15-003`), and the frozen UA-W15 gates (G1/G2/G3/G4/G5/G6/G8/G10/V3).

## Status

`READY_FOR_PARENT_REVIEW`: all FILE leaves executed and personally reviewed in one
turn (DEC-UA-015), `UA-W15-I001` PASS. `A5` set to `AWAITING_REVIEW`
(`current_status: AWAITING_REVIEW`, state_version 39). No `UA-W15-C00n`; nothing
committed.

## Changed-file set (implementation)

| Path | Operation | Starting | Ending |
|---|---|---|---|
| `frontend/test/uphunt-aesthetic-w15.test.ts` | CREATE | ABSENT | `0a34acf1e5a168a19c8db534f41c1ac934e27a2bdc79285e9a4f325bd21431d7` |
| `frontend/test/ua-coverage-equality.mjs` | CREATE | ABSENT | `921d5df708348fe141b0ecffa19c7bce664a68be6d43ffc364e78bebf479a0eb` |

Planned/actual implementation set digest:
`16ed1b8b21e6e6278b66a601789e83bd4a8b7d63dbfdad70ddb381cfe47df74a`.
`frontend/app/globals.css` in-scope **zero-edit** (`4cf7a1fc…`); no FILE leaf, no
new selector, `.shell` width unchanged.

Non-implementation changes (not product files): `UA-W15_SUBWINDOW_*` S1/S2/S3,
`A6` (EV-UA-A-083/085), review-evidence `UA-W15/` (4 PNGs + g4-checks.json +
g4-browser-server.log + `g4-uphunt-aesthetic-w15.mjs`), and `test/.ua-executed.json`
(DEC-UA-011 runtime residue; tracked, never committed).

## Coverage

- required: 43, registered: 43, executed: 43, skipped: 0, duplicate: 0, unexpected: 0.
- Final executed-set digest: `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05`.
- Pre-frozen equality (after `npm test`, before the equality script): 42-ID digest
  `434a1f5eb42ce7e8640ba1ab8d80e54c2d0225c9f155a4f781d9f2ef76418cbd`.
- `CASE-UA-W15-001`, `CASE-UA-W15-002` (in `uphunt-aesthetic-w15.test.ts`),
  `CASE-UA-W15-003` (in `ua-coverage-equality.mjs`, not matched by `test/*.test.ts`).

## Gates / commands

From `frontend/`:

| Gate | Command | Outcome |
|---|---|---|
| G1 (DEC-UA-016) | `npm test` | exit 1 (expected); 218 tests / 215 pass / 3 fail; the 3 failing titles are exactly the three heading-oracle titles; CASE-UA-W15-001/002 pass. (218 vs 216 = +2 W1 coverage re-registration, same class as W14.) |
| G2 (DEC-UA-014) | `npx tsc --noEmit --pretty false` | exit 2 (repo-wide parked); zero diagnostics name `uphunt-aesthetic-w15.test.ts` or `ua-coverage-equality.mjs` |
| G3 | `npm run lint` | exit 0; 0 errors, 4 warnings (all outside write scope) |
| G4 | `node review-evidence/uphunt-aesthetic/UA-W15/g4-uphunt-aesthetic-w15.mjs` | PASS; 4 full-page PNGs of `/`, captureBeyondViewport true (390/768/1280/1440); `.site-header` present at 1280; no `/design-fixture`; no live `/keywords/{id}` |
| G5 | `rm -f test/.ua-executed.json`; `npm test`; `node --experimental-strip-types test/ua-coverage-equality.mjs` | PASS; 42-ID `434a1f5e…` then 43-ID `0d14982c…` |
| G6 | `git status --short` / diff scope | PASS; implementation delta = exactly the 2 CREATE paths + documented residue; zero forbidden-path hit; zero-edit pins intact |
| G8 | negative controls NT-UA-001/003/005/006 (structural) | 4 expected, 0 falsified |
| G10 | `npm run build` | exit 0 |
| V3 | read `keyword-dashboard.module.css` 520/420/360/380 + globals.css h3 | 1.375rem present, 0.5rem absent; pins intact |

Sandbox recoveries: none (no environment-invalidated attempt).

## NC results

- NC-UA-001 (reduced-motion / transition-duration): satisfied — `CASE-UA-W15-001` passes on the present rule.
- NC-UA-003 (owned lead h3 type floor): satisfied — `CASE-UA-W15-002` passes on `1.375rem`, not `0.5rem`.
- NC-UA-005 (forbidden paths): satisfied — G6 shows no forbidden-path hit.
- NC-UA-006 (coverage digest): satisfied — the 43-ID equality script asserts the pinned digest; any missing/duplicate/unexpected ID changes it and fails.

## Forbidden-path negative search

No `globals.css`, `lead-details.tsx`, `app-header.tsx`, product/API/auth file,
parked `SRC-UA-0092` file, or `design-system-shell.test.ts` was changed. No new
`data-surface` token. `REQUIRED_CASE_IDS`, `listRequiredCaseIds`, `coverageDigest`,
`PINNED_REQUIRED_SET_DIGEST`, `getFiltered`, `saveKeywordSelection`, Chart.js
registration/dataset/tooltip math untouched.

## Successor confirmation

`may_start_successor` remains `false`. `UA-W16` does not exist and was not begun.
No commit, no push, no AWS, no production, no paid-provider action, no
`email_scraper` edit, root `ACTIVE_EXECUTION_STATE.md` not mutated.

## Subordinate artifacts

- S1 `frontend/docs/open-work/uphunt-aesthetic/UA-W15_SUBWINDOW_DECOMPOSITION_S1.md` — `9dc3f93caf7af3ea2321f6f29217d106f9c295d59a5698f7cff35a35cd6fb925`
- S2 `frontend/docs/open-work/uphunt-aesthetic/UA-W15_SUBWINDOW_STATE_S2.yaml` — `ff2ae38ff01ec94e494db3baf745d46bc9796a362012837fb292bd2d4de0ab59`
- S3 `frontend/docs/open-work/uphunt-aesthetic/UA-W15_SUBWINDOW_EVIDENCE_S3.md` — `81adec39fca34b27b4a29e84753403ad6c22cd683d050b8b12b9f17d9931a6f6`
