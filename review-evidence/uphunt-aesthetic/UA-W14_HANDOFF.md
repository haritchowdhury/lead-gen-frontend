# UA-W14 handoff

- Parent window: `UA-W14` (assignment `ASG-UA-W14-01`)
- Window agent / I001 author: `UA-W14-WINDOW-AGENT`
- Decomposition status: `AWAITING_PARENT_DECOMPOSITION_REVIEW` → parent accepted
  (`EV-UA-A-079`) → `READY`
- Overall status: **I001 PASS** → `AWAITING_REVIEW`
- `I001` PASSED on the first attempt (no `UA-W14-C00n` correction was required).
  `A5` set to `AWAITING_REVIEW` on this handoff. `A5_ACTIVE_EXECUTION_STATE.yaml`
  was byte-identical `f13324222a6eb426d42b33983956a30fff8ab3da9fe94690567769206cb2e6ec`
  (state 35) through `I001`; only the authorized `current_status` transition is
  made on the handoff action.

## Decision that governs this window

The parent rejection `EV-UA-A-077` (`3V`) amended `EV-UA-A-075` item 3's V1c
oracle: S001 must keep `aria-label="Cluster landscape"` exactly once and MUST NOT
require the raw `Cluster landscape` string to be 0. This was transcribed into S1
§0 and satisfied. No other parent-level ambiguity was encountered.

## Implementation (S001 → S004)

Sub-window | File | Ending digest | numstat
---|---|---|---
S001 | `frontend/components/keyword-intelligence/cluster-landscape.tsx` | `d1ed9ad4d8a1148f2e8b7deedf5c0bc9e39c682793cc19d55dce3f68cdcfcd53` | `6 11`
S002 | `frontend/components/keyword-intelligence/summary-cards.tsx` | `c60d6bad700060134d8f4fcf2ef57aa1f1fb133a428a5f5e3c5d20ebaa1711f0` | `6 5`
S003 | `frontend/components/keyword-intelligence/keyword-table.tsx` | `96ce5e0e198f398b8ab6f9884c6ecd26c45bf8cd9b7b26ec4f851366ca2134ee` | `6 6`
S004 | `frontend/test/uphunt-aesthetic-w14.test.ts` (CREATE) | `2436f2c88d7e3a5aacc7cca64f179c510cf1e8b12ad440930852b347ae09dbe9` | new

- S001: SectionIntro import + `clusterHeroTitle` replaced with the cluster
  SectionIntro (`Clusters | Related phrases, grouped so you can choose a lane. |
  Select a cluster to inspect its volume, CPC, and mix.`); `data-surface="surface:cluster-landscape"`,
  `data-surface="landscape:cluster-scene"`, and `aria-label="Cluster landscape"`
  all preserved (count 1 each); no new data-surface token.
- S002: SectionIntro import + `overlapPanel` h2/panelNote replaced with the overlap
  SectionIntro (`Overlap | Phrases that may be counting the same demand twice. |
  Variants that share metrics and monthly history.`); `marketOverview`/`overlapPanel`
  word-boundary retained; discovery-mix math unchanged.
- S003: SectionIntro import + `Keyword workspace` h2 replaced with the table
  SectionIntro (`Shortlist | Every active phrase, ready to inspect and keep. |
  Sort, filter, and select without leaving the evidence above.`); `tableMeta`
  row-count kept; `styles.kiDashboard`/`<th>Action</th>`/`styles.rowEdit` absent.
- S004: W13-class unit file, exactly three `CASE-UA-W14-001..003` tests, three
  `recordExecuted`.

## I001 gates (from `frontend/`)

| Gate | Result | Evidence |
|---|---|---|
| G0 | PASS | A1 `57fa49c7…`, A3 `094bc8bf…`, A4 `9d2bb23a…`, A5 `f1332422…` (state 35, byte-identical through I001), subwindow standard `842c2955…`. |
| G1 | PASS | `npm test` exit 1 (expected). 214 tests / 211 pass / 3 fail; the 3 failing titles are exactly the three heading-oracle titles; `CASE-UA-W14-001..003` all pass. (214 vs predicted 212 = +2 W1 re-registration from the w14 test importing the coverage module.) |
| G2 | PASS | `npx tsc --noEmit --pretty false`: zero diagnostics name cluster-landscape.tsx, summary-cards.tsx, keyword-table.tsx, filter-bar.tsx, uphunt-aesthetic-w14.test.ts (13 parked lines are pre-existing, not a pass condition). |
| G3 | PASS | `npm run lint` (eslint) exit 0 on the four needles. |
| G4 | PASS | Synthetic `/keywords/kr_abcdefghijklmnopqrstuvwx` + same-class `/api/keyword-research*` fetch interception (completed ResearchView, 30 rows). **Full-page capture (`captureBeyondViewport: true`)** → 4 PNGs `dashboard-390/768/1280/1440.png` with IHDR heights `12431 / 11308 / 11332 / 11481` (all > 900). Table SectionIntro title `Every active phrase, ready to inspect and keep.` present + readable at 1280 (16px, width 407, `inPngBounds` true); cluster title `Related phrases, grouped so you can choose a lane.` present at 1280 (16px, width 371). Surfaces list identical to W13 (no new data-surface token). |
| G5 | PASS | `.ua-executed.json` == 40 sorted unique IDs (W1–W14); set digest `2c31828460d630208cbee7ae9875298058412258efc81682bba597ea5109a875`. |
| G6 | PASS | Implementation delta == exactly the 4 planned files + documented `.ua-executed.json` residue + subwindow docs + `review-evidence/uphunt-aesthetic/UA-W14/` helper; zero forbidden-path hit; all zero-edit pins byte-identical. |
| G7 | PASS | Changed product files are presentation-only; no network/DB import; 0 network/0 DB. |
| G8 | PASS | (a) CASE-UA-W14-001/002 assert the SectionIntro titles; (b) CASE-UA-W14-003 asserts `data-filter="market"` (count 1); (c) G6 forbids any forbidden path; (d) surfaces list identical to W13 (no new data-surface token). |
| G9 | PASS | No `UA-W14-C00n`, no `UA-W15` artifact; `A5.current_window` `UA-W14`, `next_window` `UA-W15` untouched, `may_start_successor: false` honored; HEAD `a457ad0` (W13) unchanged — nothing committed. |

## Coordination artifacts (sha256)

- `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W14_SUBWINDOW_DECOMPOSITION_S1.md` — `81715b8688b9e97a7d9522177852d396d9fd80215bc9872f4c3cfeeeabd43684`
- `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W14_SUBWINDOW_STATE_S2.yaml` — parent READY `d3f5d4c4…` → advanced to terminal STOP / `integration_status: PASS`
- `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W14_SUBWINDOW_EVIDENCE_S3.md` — execution + I001 evidence appended (D-007..D-011)

## Browser evidence

`frontend/review-evidence/uphunt-aesthetic/UA-W14/`: `dashboard-390.png`
(390×12431), `dashboard-768.png` (753×11308), `dashboard-1280.png` (1265×11332),
`dashboard-1440.png` (1425×11481) — all full-page, IHDR height > 900; plus
`g4-checks.json` (`fullPageCapture: true`, `allPngHeightsExceedViewport: true`,
`tableTitleReadableAt1280: true`, `clusterTitlePresentAt1280: true`),
`g4-browser-server.log`, and `g4-uphunt-aesthetic-w14.mjs` (helper; allowed under
the review-evidence dir). Product S001–S004 bytes stay frozen.

## Negative controls

- G2: the 13 pre-existing parked diagnostics remain and were not "fixed".
- G6/forbidden-path: implementation delta bypasses every DEC-UA-006 path.
- G8: zero-edit pins byte-identical; `filter-bar.tsx` / `keyword-dashboard.module.css`
  / `research-dashboard.tsx` / `chart-panels.tsx` / `globals.css` /
  `keyword-intelligence-inventory.test.ts` / `test/browser/keyword-intelligence-dashboard.mjs`
  untouched.

## Residual risks

- G1 count is `214/211/3` vs the predicted `212/209/3`; the +2 is the W1
  re-registration from the w14 test importing the coverage module. G1 pass
  condition (W14 cases pass + only the three heading-oracle titles fail) holds.
- `.ua-executed.json` is tracked residue (never commit). Under heavy concurrency
  the recordExecuted read-modify-write is racy (observed only when a manual
  `next dev` was also running); a clean `npm test` run yields the correct 40-ID set.

## Notes / non-goals

- No AWS mutation, no commit/push, no production/paid-provider call, no
  `email_scraper` edit. `UA-W15` not started. `.ua-executed.json` is tracked
  residue (never commit). No `UA-W14-C00n` was required.
