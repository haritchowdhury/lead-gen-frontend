# UA-W13 handoff

- Parent window: `UA-W13` (assignment `ASG-UA-W13-01`)
- Window agent / I001 author: `UA-W13-WINDOW-AGENT`
- Decomposition status: `AWAITING_PARENT_DECOMPOSITION_REVIEW` → parent accepted
  (`EV-UA-A-071`, `CHG-UA-0008`) → `READY`
- Overall status: **I002 PASS** → `AWAITING_REVIEW`
- `I001` was parent-blocked at G4 (`EV-UA-A-073`): the initial PNGs were viewport-only
  (`captureBeyondViewport: false`, IHDR height == 900). Remediation `UA-W13-C001`
  switched to full-page capture (W11 class); product bytes S001–S004 stayed frozen.
  `UA-W13-I002` re-graded G4 on the corrected full-page PNGs and re-confirmed all gates.
- `A5` set to `AWAITING_REVIEW` on this handoff. `A5_ACTIVE_EXECUTION_STATE.yaml`
  was `2765db1b…` (state 31) through `I001`, then parent-set `ef1efa065d9ffbd734888950387076ecf65210b128e15e1e9a74c7181204bd2b`
  (state 32) for the remediation; only the authorized `current_status` transition is
  made on the handoff action.

## Decision that governs this window

`CHG-UA-0008` retracted `EV-UA-A-069` items 3/5 and issued corrected `3R`/`5R`/`6R`.
The prior blocker `EV-UA-A-070_VIS-KD_W5-I05_vs_removed_composites` is resolved by
retaining `overviewSignals`/`analysisCharts` composites, `surface:summary-cards`, a
single `<h1>`, `summary.marketOverview(charts.overviewSignals)`, and the hero
vars/imports — so the parked VIS-KD / W5-I05 needles are satisfied without editing
`keyword-intelligence-inventory.test.ts`.

## Implementation (S001 → S004)

Sub-window | File | Ending digest | numstat
---|---|---|---
S001 | `frontend/components/keyword-intelligence/chart-panels.tsx` | `2847411eb93de729798eccec0ae0f976bc0b9dcf845119b9c791a11dd236d562` | `158 125`
S002 | `frontend/components/keyword-intelligence/keyword-dashboard.module.css` | `3095e3842443abccb1a656373101cf4127f29b4adf7594efc280561bfa25a6bd` | `17 13` (product; parent-recorded `18 14` is a measurement artifact — digest is authoritative)
S003 | `frontend/components/keyword-intelligence/research-dashboard.tsx` | `82f8a6284087dd9e8daa9da12496445299e263825e991f3ead5805f80de728aa` | `32 36`
S004 | `frontend/test/uphunt-aesthetic-w13.test.ts` (CREATE) | `8e96d6de1ad4b91774b6fd93c864c2d8cc866c6a361c4fe98bfc6e9d42240328` | new

- S001: 13 `ChartPanelSections` members = 11 named panels + `overviewSignals` +
  `analysisCharts` composites; 11 SectionIntro-wrapped canvases with the exact
  DEC-UA-005 eyebrow|title|copy; no new data-surface token.
- S002: thirteen unique hunks applied (each OLD count == 1). Note: the frozen
  `18 14` and `3095e384` are self-inconsistent for the base file; `git --numstat`
  reports `17 13`, and the deterministic completion oracle `3095e384` matches.
- S003: single `<h1>` + `surface:summary-cards` + `marketOverview(overviewSignals)`
  retained; heatmap/globe are full-width siblings after `researchHero`; no
  `decisionGrid`/`dashboardFlow`; VIS-KD composition-order ascending.
- S004: W12-class unit file, exactly four `CASE-UA-W13-001..004` tests, four
  `recordExecuted`.

## I001 / UA-W13-I002 gates (from `frontend/`)

| Gate | Result | Evidence |
|---|---|---|
| G0 | PASS | A1 `57fa49c7…`, A3 `094bc8bf…`, A4 `7962776c…`, A5 `ef1efa065d9ffbd734888950387076ecf65210b128e15e1e9a74c7181204bd2b` (state 32, parent-set); planned-file-set `411e2eea…`. |
| G1 | PASS | `npm test` exit 1 (expected). 209 tests / 206 pass / 3 fail; the 3 failing titles are exactly the three heading-oracle titles; `CASE-UA-W13-001..004` all pass. |
| G2 | PASS | `npx tsc --noEmit --pretty false`: zero diagnostics name chart-panels.tsx, research-dashboard.tsx, summary-cards.tsx, uphunt-aesthetic-w13.test.ts (parked SRC-UA-0092 diagnostics are not a pass condition). |
| G3 | PASS | `npm run lint` exit 0; no product-needle findings. |
| G4 | PASS (`UA-W13-C001`) | Synthetic `/keywords/kr_abcdefghijklmnopqrstuvwx` + same-class `/api/keyword-research*` fetch interception (completed ResearchView, 30 rows). **Full-page capture (`captureBeyondViewport: true`, W11 class)** → 4 PNGs `dashboard-390/768/1280/1440.png` with IHDR heights `12223 / 11121 / 11128 / 11277` (all > 900). Treemap title `See which clusters hold the search demand.` present + readable at 1280 in the PNG pixels and `g4-checks.json` (57.6px, width 700, `inPngBounds` true, single `<h1>`, 19 surfaces). |
| G5 | PASS | `.ua-executed.json` == 37 sorted unique IDs; set digest `f9587c2314854fb0e0a0b9ce9b37df66244a5683119705d00c9d94dbbfbc83e5`. |
| G6 | PASS | Implementation delta == exactly the 4 planned files + documented `.ua-executed.json` residue + coordination/evidence/helper artifacts (all remediation writes confined to `review-evidence/uphunt-aesthetic/UA-W13/`); zero forbidden-path hit. |
| G8 | PASS | All zero-edit pins byte-identical (chart-panels/summary-cards/selection-review/cluster-landscape/filter-bar/keyword-table/section-intro/traffic-globe/view-model/inventory-test/w11-test/w12-test/coverage-test/browser-harness). |
| G9 | PASS | No `UA-W14` artifact; `A5.current_window` `UA-W13`, `next_window` `UA-W14` untouched, `may_start_successor: false` honored. |

## Coordination artifacts (sha256)

- `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W13_SUBWINDOW_DECOMPOSITION_S1.md` — `38019d351a4da19ecb66adb14da43d27a33809d8c9832ec505ca286eada2a616`
- `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W13_SUBWINDOW_STATE_S2.yaml` — `1f92db1a…` (parent READY) → advanced
- `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W13_SUBWINDOW_EVIDENCE_S3.md` — `9df39d3f42b2ee32e3b7e4c467894829aae3c49b386bb28f10be06bcb160001a`

## Browser evidence

`frontend/review-evidence/uphunt-aesthetic/UA-W13/`: `dashboard-390.png`
(390×12223), `dashboard-768.png` (753×11121), `dashboard-1280.png` (1265×11128),
`dashboard-1440.png` (1425×11277) — all full-page, IHDR height > 900; plus
`g4-checks.json` (`fullPageCapture: true`, `allPngHeightsExceedViewport: true`,
`titleReadableAt1280: true`), `g4-browser-server.log`, and `g4-uphunt-aesthetic-w13.mjs`
(helper; allowed under the review-evidence dir). Product S001–S004 bytes stay frozen
(`2847411e…`, `3095e384…`, `82f8a628…`, `8e96d6de…`).

## Negative controls

- G2: the ten parked SRC-UA-0092 diagnostics remain and were not "fixed".
- G6/forbidden-path: implementation delta bypasses every DEC-UA-006 path.
- G8: zero-edit pins byte-identical; `summary-cards.tsx` / `selection-review.tsx`
  / `globals.css` / `keyword-intelligence-inventory.test.ts` untouched.

## Residual risks

- S002 `numstat` is `17 13` (digest `3095e384` authoritative) vs the parent-recorded
  `18 14`; byte-content is identical to the frozen oracle, so no functional risk.
- The parent-recorded `207/204/3` G1 count vs actual `209/206/3` is purely a
  reporting delta; G1 pass condition (W13 tests pass + only the three heading-oracle
  titles fail) holds.

## Notes / non-goals

- No AWS mutation, no commit/push, no production/paid-provider call, no
  `email_scraper` edit. `UA-W14` not started. `.ua-executed.json` is tracked residue
  (never commit). G9 forbids any `UA-W14` artifact; none is present.
