# UA-W7 parent handoff — `READY_FOR_PARENT_REVIEW`

Parent window: **UA-W7** (Query editor and run progress use landing headlines;
polling code unchanged). Window agent: `UA-W7-WINDOW-AGENT`. Assignment:
`ASG-UA-W7-01` (decomposition + S001–S003 leaves) closed; the FILE sequence was
executed and personally reviewed in-window (`DEC-UA-015`), integration
assessment **`UA-W7-I001` PASS** (`G1–G9` all PASS, personally executed by the
window agent, never delegated).

## Changed-file set (starting SHA-256 → ending SHA-256)

| File | Operation | Starting | Ending |
|---|---|---|---|
| `frontend/components/query-editor.tsx` | MODIFY | `ce09064c490a17a4ba93209438b545504d9ab928a12b13edb604931a3d5e6e12` | `92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c` |
| `frontend/components/run-progress.tsx` | MODIFY | `e12b8c5ba6f8835c9d2215ed985651b97b720fe7d47303ca236d3dc2c1ae6697` | `15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38` |
| `frontend/test/uphunt-aesthetic-w7.test.ts` | CREATE | ABSENT | `92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842` |

Planned implementation set digest `b0421156aac24cb62a33ed3695e2f87a04c3210e97ea26c0f2d1a47a8ba254cb`.
Migrations: none.

Preserved zero-edit (byte-verified at I001 G6): `app/globals.css` `b5c79578…`,
`components/run-workspace.tsx` `9472450d…`, `app/runs/[runId]/page.tsx`
`719e05ea…`; read-only `components/section-intro.tsx` `159096f3…`; unchanged
predecessors `app/page.tsx` `3460751e…`, `components/run-form.tsx` `72576044…`,
`components/landing-sections.tsx` `914c61e5…`, coverage `f5137be4…`, w2
`f65ba0c5…`, w3 `635e2802…`, w4 `8008501d…`, w5 `ee6425e9…`, w6 `f78b8da2…`,
`app/runs/page.tsx` `86392720…`, `app/keywords/page.tsx` `8376447d…`,
`components/run-continuation.tsx` `d57edbe3…`. Parked SRC-UA-0092 files and
`test/design-system-shell.test.ts` untouched per `DEC-UA-016`.

## Symbols / behavior

- `query-editor.tsx`: inner heading `<div>` (unique `<span className="eyebrow">Query
  review · revision {querySet.revision}</span>` + `<h2>Review your searches</h2>`)
  replaced with `<SectionIntro eyebrow="Search plan" title="Shape the searches
  before discovery starts." copy="Review, edit, or add queries, then start when
  the direction feels right." />` (DEC-UA-003 exact, periods included).
  `querySet.revision` preserved as `<span>revision {querySet.revision}</span>`
  beside the kept `step-badge 02`. `section#query-review`, `form-heading-row
  query-editor-heading`, query list/footer, `void save()`/`void start()`,
  loading-card branch, save/start handlers — byte-identical. numstat `7 4`.
- `run-progress.tsx`: `.progress-stage` inner `<div>` children (unique
  conditional eyebrow `Preparing your search plan`/`Current stage` + `<h2>{stageLabel(run.stage)}</h2>`)
  replaced with `<SectionIntro eyebrow="Discovery" title="StoreSignal is looking
  for matching stores." copy="The stages and counts below are the existing run
  status." />` (DEC-UA-003 exact), followed by `<p>{stageLabel(run.stage)}</p>`
  (not a second marketing h2). `progress-card`/`progress-head`/`progress-stage`
  wrappers, `state-indicator` span, `progress-state` badge+duration,
  `progress-track`, both `ProgressCount` branches, `RunLoadingSkeleton`,
  `stagePercent`/`stageLabel`/`formatDuration` — byte-identical. numstat `7 6`.
- New registry suite `uphunt-aesthetic-w7.test.ts`: exactly two tests
  CASE-UA-W7-001/002, `recordExecuted` after each oracle; source-text oracles
  only (UTF-8 reads of the post-leaf jsx + the read-only run-workspace
  `RETRY_DELAYS` needle). No third test, no full-set equality, no
  `REQUIRED_CASE_IDS` edit.

## Coverage (window-local)

required = registered = executed = {CASE-UA-W7-001, CASE-UA-W7-002}; skipped 0;
duplicate 0; unexpected 0. Two additional registry IDs (CASE-UA-W1-001/002)
re-executed via the coverage import (w7-only run 4-ID set digest
`3ae216075ca80627b76f559b880ac0d7270b646832e70543300989957d07e52e`, parent
consequence 6). After `npm test`, `test/.ua-executed.json` = exactly the 19
expected IDs, canonical digest `3bf626bfcd753aa30685f57a4285c441bfd3b68a2a5fb7ada03ad85218532ffb`
(G5). Required-set digest `0d14982c…` (registry, CASE-UA-W1-002). Window-local
set digest `a8c74516b3979e433aa07e11262d4504f3935076b3d7e70a8a5629872bf70394`.
Full 43-set equality deferred to UA-W15-V5.

## Commands and outcomes

| Gate | Command | Outcome |
|---|---|---|
| G1 | `npm test` (DEC-UA-016 oracle) | 179 tests, 176 pass, 3 fail (exit 1, expected): exactly the three DEC-UA-016 heading-oracle titles; CASE-UA-W7-001/002 pass → **PASS** |
| G2 | `npx tsc --noEmit --incremental false --pretty false` | 13 physical lines, 0 owned-path needles, 10 parked SRC-UA-0092 diagnostics → **PASS** |
| G3 | `npm run lint` | exit 0 (0 errors, 2 warnings from non-owned files) → **PASS** |
| G4 | headless Chrome + `next dev` (`STORESIGNAL_DESIGN_FIXTURES=1`), pre-hydration synthetic `.example` interception | 8/8 PNGs at exact sizes under `review-evidence/uphunt-aesthetic/UA-W7/` → **PASS** |
| G5 | canonical `coverageDigest` over `test/.ua-executed.json` | 19 IDs == pin `3bf626bf…` → **PASS** |
| G6 | 19 byte pins + forbidden-path negative search | all match; implementation delta = 3 planned files + tracked json residue + coordination artifacts + browser evidence → **PASS** |
| G7 | static test import/suite inspection | 0 network / 0 DB operations → **PASS** |
| G8 | fresh in-memory NC probes N1/N2/N3 | all three falsified → **PASS** |
| G9 | successor negative search | no UA-W8 artifacts; A5 `current_window: UA-W7`; `may_start_successor: false` → **PASS** |

Leaf-level commands: exact-match replacement runners (anchor count 1 each),
numstat inspections (`7 4`, `7 6`), V-B/V-D sha256 pins, V-C in-memory NC
probes, and the prescribed backup/run/restore `.ua-executed.json` cycle —
per-leaf evidence in `UA-W7_SUBWINDOW_EVIDENCE_S3.md` `EV-UA-W7-X-002..004`.

## Browser evidence (G4)

`frontend/review-evidence/uphunt-aesthetic/UA-W7/`:
`query-review-390.png` (390×900), `query-review-768.png` (768×900),
`query-review-1280.png` (1280×900), `query-review-1440.png` (1440×900),
`runtime-390.png` (390×900), `runtime-768.png` (768×900), `runtime-1280.png`
(1280×900), `runtime-1440.png` (1440×900). Routes frozen to the two
`/design-fixture?scenario=…` values (`query-review`, `runtime`); live
`/runs/[runId]` not screenshotted. The fixture routes resolve
`run_fixture_query_review`/`run_fixture_runtime` through `RunWorkspace`, which
proxies authenticated `/api/runs/*`; those synthetic ids are not backend rows and
the data route is auth-gated, so G4 used the G-R1-style pre-hydration synthetic
`.example` fetch interception to render the W7 components (no live run, no
credentials). Local_e2e evidence, not a CASE oracle (SUB-UA-001).

## Negative controls

N1 (delete query-editor title in-memory) → CASE-UA-W7-001 title assertion
falsified. N2 (delete run-progress SectionIntro import in-memory) →
CASE-UA-W7-002 import assertion falsified. N3 (alter `RETRY_DELAYS` byte
in-memory) → run-workspace needle assertion falsified. Re-executed fresh at
S003 V-C and again at I001 G8.

## Sandbox recoveries and races

No sandbox escalation was required by any gate (browser capture and all commands
ran on first attempt). No DEC-UA-016 W1 empty-JSON race was observed this run
(the code path rendered the full registry set on the first `npm test`).

## Coordination artifacts

- `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W7_SUBWINDOW_DECOMPOSITION_S1.md`
  `cd335578dd6b831fa553e0f3b02f73c40bb43e16f354756ea4411cf52150261e`
- `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W7_SUBWINDOW_STATE_S2.yaml`
  `5ba147fecd863714cf3f8e23dc3e3aa4edddbf94a8e539bef422bb27d391631c` (advanced by
  the window agent through S001/S002/S003 → I001)
- `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W7_SUBWINDOW_EVIDENCE_S3.md`
  `e1c48d47ca381906f100e1d0dab323ea65b052ee79003af5dc4d09deb8861496` (append-only;
  `EV-UA-W7-D-001..003`, `EV-UA-W7-X-001..004`, `EV-UA-W7-I001`)

## Residue and disclosure

`test/.ua-executed.json` is TRACKED at HEAD (`d6121aa` residue, 17-ID content
`f136c564…` at start) and is now the modified 19-ID runtime output. It is an
uncommitted tracked runtime artifact, never staged/committed, byte-restored
during S003 V-D and left in the post-G1 19-ID state for I001 G5. `UA-W8` was
**not** started.

## Stop

Per the frozen DAG and `DEC-UA-015`, execution stops at `AWAITING_REVIEW`
(`UA-W7-H6`). No successor was assigned or begun. `A5.current_status` is set to
`AWAITING_REVIEW` by the authorized post-I001 handoff action.
