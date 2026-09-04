# UA-W13 Sub-window decomposition checklist (`UA-W13_S1`)

Frozen decomposition for parent window `UA-W13` under assignment `ASG-UA-W13-01`.
Author: window agent identity `UA-W13-WINDOW-AGENT`.

Status: `AWAITING_PARENT_DECOMPOSITION_REVIEW`. Parent has not accepted this
decomposition. No FILE leaf is assigned, no implementation file is edited, and
`UA-W13-S001` is NOT executed by this decomposition. `A5_ACTIVE_EXECUTION_STATE.yaml`
remains byte-identical through decomposition.

This is the revised decomposition after the parent rejection in `A6` `EV-UA-A-070`
(`CHG-UA-0008`). Consequences `3R`/`5R`/`6R` replace `EV-UA-A-069` items 3, 5, and
6; items 1, 2, 4, 7, 8, 9 remain.

Other subordinate artifacts:

- `S2` — `frontend/docs/open-work/uphunt-aesthetic/UA-W13_SUBWINDOW_STATE_S2.yaml`
- `S3` — `frontend/docs/open-work/uphunt-aesthetic/UA-W13_SUBWINDOW_EVIDENCE_S3.md`

Inherited parent package (`A5` state_version 31, digest
`2765db1bbea5e0fe3e33a7ab8ba27a7e8a083e3343c529622a4689bf9da2322a`, blocker
`EV-UA-A-070_VIS-KD_W5-I05_vs_removed_composites`):

- `A1` — `frontend/docs/open-work/uphunt-aesthetic/A1_LOCKED_PRODUCT_CONTRACT.md`
  revision `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827`
- `A3` — `frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md`
  revision `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3`
- `A4` — `frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md`
  revision `7962776cb55e8228dab77f9f09826a6db0a297880d25d1ed772d3d686c362385`
- `A5` — `frontend/docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml`
  state_version 31, `current_window UA-W13`, `assigned_agent UA-W13-WINDOW-AGENT`,
  `current_status IN_PROGRESS`, blocker
  `EV-UA-A-070_VIS-KD_W5-I05_vs_removed_composites`, `accepted_through UA-W12`,
  `next_window UA-W14`, `may_start_successor: false`
- `A6` — `frontend/docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md`
  (`EV-UA-A-069` is the assignment record that froze the original mechanical
  consequences; `EV-UA-A-070` is the review record with the corrected consequences
  `3R`/`5R`/`6R` transcribed in §0)
- `A7` — `frontend/docs/open-work/uphunt-aesthetic/A7_SPECIFICATION_CHANGELOG.md`
  (`CHG-UA-0008`)

Standards:

- Parent standard:
  `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md`
  revision `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848`
- Sub-window standard:
  `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md`
  revision `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0`

---

## 0. Parent-frozen mechanical consequences (encoded verbatim)

The following is transcribed verbatim from `A6` evidence `EV-UA-A-069`
(`parent_frozen_mechanical_consequences`, items 1, 2, 4, 7, 8, 9) and
`EV-UA-A-070` (`parent_frozen_mechanical_consequences`, items `3R`, `5R`, `6R`,
which replace `EV-UA-A-069` items 3, 5, and 6 per `CHG-UA-0008`). The parent
authority is NOT reopened by this decomposition; any phrase or choice here that
would contradict these lines is void and the consequence lines win. The two
retracted grep-zero oracles of `EV-UA-A-069` items 3 and 5 (S001 V1d
`grep overviewSignals/analysisCharts => 0`; S003 V1d
`grep marketOverview/researchHero/heroCopy => 0`) are superseded by `3R`/`5R` and
must NOT be transcribed as operative checks.

> 1. FILE sub-window IDs start at UA-W13-S001. A zero-edit in-scope file gets no
>    FILE sub-window and does not consume an S-number. Do not retire S001 unused.
>    Sequential DAG, no parallel waves: S001
>    `frontend/components/keyword-intelligence/chart-panels.tsx` → S002
>    `frontend/components/keyword-intelligence/keyword-dashboard.module.css` →
>    S003 `frontend/components/keyword-intelligence/research-dashboard.tsx` →
>    S004 `frontend/test/uphunt-aesthetic-w13.test.ts` CREATE → UA-W13-I001.
>    `frontend/components/keyword-intelligence/summary-cards.tsx` is in-scope but
>    zero-edit (`19fbd558703a8e97560ec2c36c6b2e0db5d81f27774cf2ff961f4fd752815b51`);
>    it consumes no S-number. Do not add a SectionIntro to overlap, cluster
>    landscape, filter-bar, or keyword table (UA-W14 owns DEC-UA-005 items 5, 10,
>    and 16 titles).
> 2. Zero-edit preserved (G6 pins, no FILE leaf): summary-cards.tsx `19fbd558…`;
>    selection-review.tsx `5550dffa…`; keywords/[researchId]/page.tsx `a46b89bc…`;
>    section-intro.tsx `159096f3…`; cluster-landscape.tsx
>    `2304b0c8c9d40b89a364a2ad1badd6ba871767a7bad49fdf30f2257675409e6a`;
>    filter-bar.tsx `17edbde0e27e3df688f0f2e88fc8c2a342980458d58144ad2bbb5890562d7f23`;
>    keyword-table.tsx `91480058fbda5c0942c8a7abe07ed9267ad52c63400d6050769b63246e32ed61`;
>    lib/keyword-intelligence-view-model.ts
>    `8328b023ed85c3851cc42ea5a344a3631a33267ed7be834c6631cc5620328cc3`;
>    test/keyword-intelligence-inventory.test.ts
>    `2a6e6b24214aa8a0d1a321ddbe32c2aceaa3eab1f973857a1815dad64ae0d053`;
>    test/browser/keyword-intelligence-dashboard.mjs
>    `317d3fa1f0f8f970f0cb0cdaec4972ce217d7645e790ceb4924b4707df853ae6`;
>    globals.css `4cf7a1fc…`; traffic-enrichment.tsx `1a903788…`;
>    traffic-globe.tsx `7d9567b5…`; uphunt-aesthetic-w12.test.ts `41711cc5…`;
>    uphunt-aesthetic-w11.test.ts `40e31788…`;
>    uphunt-aesthetic-coverage.test.ts `f5137be4…`; fixtures.ts `9ea26525…`.
>    Do not edit Chart.js Chart.register, dataset math, tooltip callbacks, or
>    empty-state copy except as required to keep those nodes beside the same
>    canvas. Do not edit REQUIRED_CASE_IDS.
> 3R. T2 JSX, starting chart-panels.tsx
>    `5bf17d06…`. S1 MUST freeze a new ending digest and numstat via disposable
>    unique-hunk simulation (3dab75d4… is void). Keep eleven named
>    SectionIntro-wrapped panels with the exact DEC-UA-005 eyebrow|title|copy table
>    already in the rejected S1. ALSO keep ChartPanelSections members
>    overviewSignals and analysisCharts: overviewSignals is a fragment of
>    intentPanel+recommendedPanel+histogramPanel+flagsPanel (already wrapped);
>    analysisCharts is a fragment of
>    topKeywordsPanel+clusterVolumePanel+bubblePanel+scatterPanel (already
>    wrapped). children() must pass both the eleven named panels and the two
>    composites. Word-boundary names seedPerformance, heatmapPanel,
>    overviewSignals, historyPanel, analysisCharts MUST remain (VIS-KD). grep
>    overviewSignals and analysisCharts MUST be >= 1, not 0. Do not add a new
>    data-surface token. Keep every data-surface="chart:…" string byte-identical.
>    Same canvas/empty/toolbar/note/historyChart/bubbleChart/scatterChart/tall
>    rules as EV-UA-A-069 item 3.
> 4. T1 CSS, starting keyword-dashboard.module.css
>    `d416ece7de0407e81c95e415841b29759e95f765cfcccaadd2ed3c49fe51d460`. Ending
>    digest `3095e3842443abccb1a656373101cf4127f29b4adf7594efc280561bfa25a6bd`.
>    Numstat 18 14. Thirteen unique hunks (each OLD count == 1): (a)
>    `.overviewSignals { display: grid; grid-template-columns: repeat(4,
>    minmax(0, 1fr)); gap: 18px; }` → `grid-template-columns: 1fr`; (b)
>    `.overviewSignals .chartWrap { height: 220px; }` → `height: 360px`; (c)
>    `.charts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
>    gap: 34px 28px; margin-bottom: 34px; }` → `grid-template-columns: 1fr`; (d)
>    `.chartPair { display: contents; }` → `display: block`; (e) `.chartWrap {
>    position: relative; height: 255px; }` → `height: 360px`; (f)
>    `.seedPerformanceChart { height: 285px; }` plus following `.warningList {
>    display: grid; gap: 9px; }` → `.seedPerformanceChart { height: 420px; }` then
>    `.historyChart, .bubbleChart, .scatterChart { height: 420px; }` then the same
>    warningList rule; (g) `.topKeywordsChart` height 300px → 420px (keep
>    width/min-width/overflow); (h) `.keywordHeatmap` min-height 360px → 520px;
>    (i) `.marketGlobe` min-height 360px → 520px; (j) `.keywordHeatmapChart`
>    min-height 330px → 520px (keep margin-top 14px); (k) `.marketGlobeStage`
>    min-height 330px → 520px; (l) `@media` `.overviewSignals {
>    grid-template-columns: repeat(2, minmax(0, 1fr)); }` → `1fr`; (m) `@media`
>    `.keywordHeatmap, .marketGlobe { min-height: 370px; }` → `520px`. Do not leave
>    `min-height: 330px`. Do not leave desktop `.charts {` with `repeat(2`. Do not
>    change `.chartWrap.tall { height: 380px; }`. Do not change `.decisionGrid`
>    (S003 simply must not wrap overlap+history in it).
> 5R. T2 dashboard, starting research-dashboard.tsx
>    `39367648…`. S1 MUST freeze a new ending digest and numstat (3a527dae… is
>    void). KEEP the existing heroCopy block, its single <h1>, and
>    data-surface="surface:summary-cards" (W5-I05 + VIS-KD). KEEP
>    styles.researchHero wrapping ONLY heroCopy + the existing
>    selectionStep/SelectionReview wrapper (do not keep heatmap or globe inside
>    researchHero; those must be full-width siblings after it). KEEP the W12 result
>    SectionIntro, filterDock, banners, marketContext, handlers, and SummaryCards.
>    After researchHero, stack: charts.heatmapPanel; KeywordMarketGlobe with
>    SectionIntro eyebrow="Market lens" title="The same keywords, nine markets."
>    copy="Move between worldwide and country views without leaving this research."
>    (replace kicker/p; keep All markets + TrafficMarketExplorer);
>    charts.seedPerformance; ClusterLandscape;
>    summary.marketOverview(charts.overviewSignals) as that exact substring;
>    summary.overlapPanel not inside styles.decisionGrid; {charts.historyPanel};
>    {charts.analysisCharts}; existing KeywordTable wrapper. VIS-KD compositionOrder
>    needles must all be present and in that source-index order (overlap may sit
>    between marketOverview and historyPanel). Do not remove
>    heroRows/heroActiveRows/heroCpcValues/heroAverageCpc/heroMarket/heroMarketLabel
>    or the fmtNum/fmtCpc/projectMarketRow imports they need. Do not add a new
>    data-surface token.
> 6R. S004 still four CASE tests. §7.3 applies versus parent sample a1a4527a….
>    Revised S1 MUST include a complete ```js fence of the CREATE file (W12 class)
>    whose sha256 is the completion oracle. Digest-only without bytes is not
>    independently recomputable.
> 7. Last FILE leaf (S004) from ABSENT test/.ua-executed.json expects exactly 6
>    IDs (2 × W1 + CASE-UA-W13-001..004), set digest
>    `8ebdca0f62ea547296df576f38ce56f39b361d1d5980b3520ca3665f59c10b87`. The 37-ID
>    set {2 × W1} ∪ {4 × W2} ∪ {4 × W3} ∪ {2 × W4} ∪ {2 × W5} ∪ {3 × W6} ∪ {2 × W7}
>    ∪ {3 × W8} ∪ {4 × W9} ∪ {3 × W10} ∪ {2 × W11} ∪ {2 × W12} ∪ {4 × W13} is
>    asserted only at I001 G5 after `npm test`, digest
>    `f9587c2314854fb0e0a0b9ce9b37df66244a5683119705d00c9d94dbbfbc83e5`.
>    Window-local 4-ID digest
>    `c4bbdedb61d2eb4c680569b5d78171b5d1254830d8da4342d44435b40e5b6cb2`.
>    Planned-file-set digest
>    `411e2eeaca13cd3c07f5bee879666477697197420e13783d63d5a1b427d5823f` over the
>    four planned paths (summary-cards excluded as zero-edit). Do not require
>    W2–W12 IDs at the w13-only test command. test/.ua-executed.json is TRACKED at
>    HEAD (never commit).
> 8. I001 G1 is DEC-UA-016: from `frontend/`, `npm test`. Parent-measured
>    predecessor after W12 is 203 tests / 200 pass / 3 fail; expected after W13 is
>    207 / 204 / 3. PASS iff allocated UA CASE tests (including
>    CASE-UA-W13-001..004) pass and every failing title, if any, is exactly the
>    three named heading-oracle titles; process exit 1 is expected and is not G1
>    FAIL when that holds. G2 DEC-UA-014 needles are chart-panels.tsx,
>    research-dashboard.tsx, summary-cards.tsx, uphunt-aesthetic-w13.test.ts
>    (keyword-dashboard.module.css is not a tsc input). G3 npm run lint on those
>    JSX/TS needles. G4 browser_evidence true: do not screenshot `/design-fixture`
>    (it mounts RunWorkspace, not this dashboard) and do not screenshot a live
>    `/keywords/{id}` against production. Do not edit
>    test/browser/keyword-intelligence-dashboard.mjs. I001 records four full-page
>    PNGs under frontend/review-evidence/uphunt-aesthetic/UA-W13/ at widths 390,
>    768, 1280, 1440 (height 900) of synthetic
>    `/keywords/kr_abcdefghijklmnopqrstuvwx` with same-class fetch interception of
>    `/api/keyword-research*` completed payloads (copy interception, do not mutate
>    the KI-W5 harness). Assert the treemap SectionIntro title `See which clusters
>    hold the search demand.` is present and readable at 1280. Helper scripts and
>    g4-checks.json may live only under that review-evidence directory (not a
>    planned product file; G9 still forbids UA-W14 artifacts).
> 9. Do not start UA-W14. Do not add surface:selection-review-panel or any new
>    data-surface token. Do not edit view-model inventories, keyword-table,
>    filter-bar, cluster-landscape, globals.css, section-intro.tsx, W2–W12 test
>    files, REQUIRED_CASE_IDS, parked files, or design-system-shell.test.ts. After
>    parent accepts this decomposition, identity UA-W13-WINDOW-AGENT executes then
>    personally reviews each FILE leaf in the same turn, then itself assigns the
>    next S-number, then personally runs I001, then hands off (DEC-UA-015). This
>    assignment does not execute S001. Do not write into S1 §0 any of: "parent
>    issues the next leaf", "stop at AWAITING_WINDOW_REVIEW before S00n", "stop
>    for parent after this leaf".

Residual prescription (EV-UA-A-070, `Residual vs DEC-UA-005`, retained): items 6–9
remain inside the existing `marketOverview` package (discovery mix chrome stays
because `summary-cards.tsx` is zero-edit); items 12–15 remain grouped as
`analysisCharts`; the keyword-count `<h1>` stays as VIS-KD/W5-I05 compatibility
chrome, not a 17th chart. Titled SectionIntros and S002 heights still apply.

---

## 1. Authority and revision pins

| Pin | Value | Verified |
|---|---|---|
| parent_window_id | `UA-W13` | A5 |
| parent_assignment_id | `ASG-UA-W13-01` | A5 `current_assignment_id`; EV-UA-A-069 |
| window_agent_identity | `UA-W13-WINDOW-AGENT` | A5 `assigned_agent` |
| delegated_authority | decompose UA-W13; write S1/S2/S3; append S3 and A6 | A5 `authorized_actions` |
| FILE-leaf execution authority | none at decomposition time | A5 `prohibited_actions: execute_UA-W13_FILE_leaves` |
| parent-standard revision | `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` | recomputed MATCH |
| subwindow-standard revision | `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` | recomputed MATCH |
| A1 revision | `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827` | recomputed MATCH |
| A3 revision | `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3` | recomputed MATCH |
| A4 revision | `7962776cb55e8228dab77f9f09826a6db0a297880d25d1ed772d3d686c362385` | recomputed MATCH |
| A5 state_version / digest | 31 / `2765db1bbea5e0fe3e33a7ab8ba27a7e8a083e3343c529622a4689bf9da2322a` | recomputed MATCH |
| A5 blocker | `EV-UA-A-070_VIS-KD_W5-I05_vs_removed_composites` | A5 |
| may_start_successor | false | A5 |
| next window | `UA-W14` (reserved for parent) | A5 |
| stop_after | `UA-W15` | A5 |

Evidence: `S3` `EV-UA-W13-D-001`.

## 2. Parent-window scope and exclusions

`authorized_write_scope` (A5; in-scope):

- `frontend/components/keyword-intelligence/chart-panels.tsx` — S001.
- `frontend/components/keyword-intelligence/keyword-dashboard.module.css` — S002.
- `frontend/components/keyword-intelligence/research-dashboard.tsx` — S003.
- `frontend/components/keyword-intelligence/summary-cards.tsx` — in-scope but
  **zero-edit** (`19fbd558…`); no FILE leaf, consumes no S-number.
- `frontend/test/uphunt-aesthetic-w13.test.ts` — S004.

`read_only_scope` (A5 / A4 F1): `frontend/components/section-intro.tsx`,
`frontend/components/keyword-intelligence/summary-cards.tsx`,
`frontend/components/keyword-intelligence/cluster-landscape.tsx`,
`frontend/components/keyword-intelligence/filter-bar.tsx`,
`frontend/components/keyword-intelligence/keyword-table.tsx`,
`frontend/components/keyword-intelligence/selection-review.tsx`,
`frontend/components/traffic-globe.tsx`,
`frontend/test/uphunt-aesthetic-coverage.test.ts`.

Exclusions / prohibited (A5 `prohibited_actions` + consequence 9):

- do not start UA-W14;
- do not add `surface:selection-review-panel` or any new data-surface token;
- do not edit view-model inventories, `keyword-table.tsx`, `filter-bar.tsx`,
  `cluster-landscape.tsx`, `globals.css`, `section-intro.tsx`, `summary-cards.tsx`,
  `selection-review.tsx`, W2–W12 test files, `REQUIRED_CASE_IDS`, parked files,
  `keyword-intelligence-inventory.test.ts`,
  `test/browser/keyword-intelligence-dashboard.mjs`, or
  `design-system-shell.test.ts`;
- no AWS, commit, push, production, paid provider, `email_scraper` edit, or root
  `ACTIVE_EXECUTION_STATE.md` edit;
- do not edit Chart.js `Chart.register`, dataset math, tooltip callbacks, or
  empty-state copy except as required to keep those nodes beside the same canvas.

Scope-locked decisions governing UA-W13 (from A3): DEC-UA-005 (stacked order
1–16 and DEC-UA-005 eyebrow/title/copy strings), DEC-UA-009 (keep `data-surface`
values and Chart.js datasets byte-for-byte), DEC-UA-015 (window agent executes and
reviews its own FILE leaves; movement between FILE leaves is internal), DEC-UA-016
(npm test oracle from UA-W6 onward), REQ-UA-003 (keyword result is not a
dashboard), INV-UA-010 (keep `data-surface` values and Chart.js datasets; only
layout/type/wrap-height change).

## 3. Starting working-tree inventory

Recording does not modify the tree. From `frontend/`, `git status --short` at
window start (window-agent capture, `S3` `EV-UA-W13-D-001`):

```
 M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml
 M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md
 M docs/open-work/uphunt-aesthetic/A7_SPECIFICATION_CHANGELOG.md
```

Coordination root (`/home/harit/Email Scrapper`) `git status --short`: clean (no
output). Protected pre-existing changed set (parent-owned A5/A6/A7) set digest
`d76978decc4c7859467167095f1f78e5b2828bb2d9eb870b73ff7b831b301739`.

Planned implementation files:

- `frontend/components/keyword-intelligence/chart-panels.tsx`: exists, digest
  `5bf17d06389a9163080f080dffa2257e83ae9db017bdfff1cd90b32d317db8ac`, not dirty at
  window start (MODIFY by S001).
- `frontend/components/keyword-intelligence/keyword-dashboard.module.css`: exists,
  digest `d416ece7de0407e81c95e415841b29759e95f765cfcccaadd2ed3c49fe51d460`, not
  dirty at window start (MODIFY by S002).
- `frontend/components/keyword-intelligence/research-dashboard.tsx`: exists,
  digest `3936764824ed80346be54fac256a0b7c6dbc78bb9fd8235a2d3705c3869f9e63`, not
  dirty at window start (MODIFY by S003).
- `frontend/test/uphunt-aesthetic-w13.test.ts`: **ABSENT** (CREATE by S004).

Zero-edit / preserved pins (must remain byte-identical; verified in `S3`
`EV-UA-W13-D-001`): `summary-cards.tsx 19fbd558…`, `selection-review.tsx
5550dffa…`, `keywords/[researchId]/page.tsx a46b89bc…`, `section-intro.tsx
159096f3…`, `cluster-landscape.tsx 2304b0c8…`, `filter-bar.tsx 17edbde0…`,
`keyword-table.tsx 91480058…`, `view-model.ts 8328b023…`,
`keyword-intelligence-inventory.test.ts 2a6e6b24…`,
`test/browser/keyword-intelligence-dashboard.mjs 317d3fa1…`, `globals.css
4cf7a1fc…`, `traffic-enrichment.tsx 1a903788…`, `traffic-globe.tsx 7d9567b5…`,
`uphunt-aesthetic-w12.test.ts 41711cc5…`, `uphunt-aesthetic-w11.test.ts
40e31788…`, `uphunt-aesthetic-coverage.test.ts f5137be4…`, `fixtures.ts
9ea26525…`.

## 4. Initial single-file dependency DAG

```text
UA-W13-S001 (chart-panels.tsx)
  -> UA-W13-S002 (keyword-dashboard.module.css)
    -> UA-W13-S003 (research-dashboard.tsx)
      -> UA-W13-S004 (uphunt-aesthetic-w13.test.ts CREATE)
        -> UA-W13-I001 (window-agent integration assessment)
```

Sequential, no parallel wave (parent-frozen, consequence 1). Edges justified by
named outputs: S001 must expose the thirteen `ChartPanelSections` members (eleven
named panels + `overviewSignals` + `analysisCharts` composites) and the
SectionIntro-wrapped sections before S003 stacks them; S002 must provide the
single-column `.charts`/`.overviewSignals`, `display:block` `.chartPair`, and the
`historyChart`/`bubbleChart`/`scatterChart`/`tall`/`min-height:520px` wrap rules
that S001's JSX class names consume and S004 asserts; S003 consumes the wired
panels and the CSS classes. S004 reads all three producer files as source text and
therefore depends on S001/S002/S003. I001 is the operator of G0–G9.

Zero-edit `summary-cards.tsx` does not appear in the DAG.

## 5. Initial sub-window blocks

### UA-W13-S001

```yaml
subwindow_id: UA-W13-S001
type: FILE
parent_window_id: UA-W13
parent_assignment_id: ASG-UA-W13-01
assigned_agent: UA-W13-WINDOW-AGENT
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/keyword-intelligence/chart-panels.tsx
file_operation: MODIFY
starting_file_digest: 5bf17d06389a9163080f080dffa2257e83ae9db017bdfff1cd90b32d317db8ac
starting_repository_change_set_digest: d76978decc4c7859467167095f1f78e5b2828bb2d9eb870b73ff7b831b301739
read_only_scope:
  - frontend/components/section-intro.tsx
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/components/keyword-intelligence/keyword-dashboard.module.css
authorized_actions:
  - modify_chart_panels_jsx
  - split_charts_into_seven_named_panels
  - add_overviewSignals_and_analysisCharts_composites
  - wrap_each_chart_canvas_in_SectionIntro_section
  - keep_data_surface_values_byte_identical
prohibited_actions:
  - add_new_data_surface_attribute
  - edit_Chart_register_dataset_math_tooltip_callbacks
  - edit_empty_state_copy_unless_needed_for_same_canvas
  - wrap_cluster_table_overlap
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: REQ-UA-003 (stacked, not dashboard; one section per chart),
DEC-UA-005 items 2/4/6–9/11–15 (wrap heights are CSS S002; the SectionIntro
eyebrow|title|copy and section order are here), DEC-UA-009 + INV-UA-010 (keep
`data-surface="chart:…"` byte-identical; do not add a new data-surface token),
REQ-UA-005 (presentation-only), VIS-KD (word-boundary members
`seedPerformance`, `heatmapPanel`, `overviewSignals`, `historyPanel`,
`analysisCharts` remain), W5-I05 (no new data-surface token).

Exact file transformation (parent-frozen consequence 3R). The five members of
`ChartPanelSections` (`seedPerformance`, `heatmapPanel`, `overviewSignals`,
`historyPanel`, `analysisCharts`) become thirteen members: the eleven named panels
(`heatmapPanel`, `seedPerformance`, `intentPanel`, `recommendedPanel`,
`histogramPanel`, `flagsPanel`, `historyPanel`, `topKeywordsPanel`,
`clusterVolumePanel`, `bubblePanel`, `scatterPanel`) plus the two composites
`overviewSignals` and `analysisCharts`. A single local `import { SectionIntro }
from "@/components/section-intro";` is inserted once; the `overviewSignals` and
`analysisCharts` render-props are split into the named panels: `overviewSignals`
is a fragment of `intentPanel` + `recommendedPanel` + `histogramPanel` +
`flagsPanel`, and `analysisCharts` is a fragment of `topKeywordsPanel` +
`clusterVolumePanel` + `bubblePanel` + `scatterPanel`. Each of the eleven
`chart:*` canvases is wrapped in a `<section>` whose first child is a
`<SectionIntro>` carrying the exact DEC-UA-005 eyebrow|title|copy; the duplicated
inner h2/h3 titles and the heatmapHead kicker/p are removed; `data-surface` values
are byte-identical; canvas refs, `emptyCls` nodes, the history toolbar/select, and
the four retained notes (`histogramNote`, `topKeywordNote`, `historyNote`,
cluster-count `chartSub`) are kept; `styles.historyChart` is added to the history
chartWrap, `styles.bubbleChart` to the bubble wrap, `styles.scatterChart` to the
scatter wrap, and `styles.tall` to the cluster-volume chartWrap. The composites are
`<>...</>` fragments, so no `.overviewSignals`/`.charts`/`.chartPair` wrapper
remains (the S002 CSS selectors for those become unused but are unchanged by this
leaf).

The exact SectionIntro copy per panel (DEC-UA-005):

| Panel | canvas | eyebrow | title | copy |
|---|---|---|---|---|
| heatmapPanel | chart:treemap | Demand map | See which clusters hold the search demand. | Cluster size is the share of filtered volume, not a ranking of quality. |
| seedPerformance | chart:seeds | Seed phrases | Which starting phrases actually pulled weight. | Volume split into recommended, declining, and remaining keywords. |
| intentPanel | chart:intent | Intent | What people mean when they search these phrases. | Share of active keywords by search-intent label. |
| recommendedPanel | chart:recommended | Recommendation | What the pipeline would keep, and what it would drop. | Recommendation status for the active set, not a new score. |
| histogramPanel | chart:histogram | Opportunity | Where the scores actually sit. | Active keywords in 10-point buckets from 0–10 through 90–100. |
| flagsPanel | chart:flags | Quality flags | The warnings attached to this set. | Declining traffic, too-broad phrases, and too-little traffic. |
| historyPanel | chart:history | History | How volume moved, month by month. | Combined history for the filtered set, or one keyword at a time. |
| topKeywordsPanel | chart:top-keywords | Volume and trend | The phrases, their volume, and whether they are rising. | Columns are volume. The line is seasonality-adjusted momentum. |
| clusterVolumePanel | chart:cluster-volume | Cluster volume | Combined search volume, cluster by cluster. | Sorted by volume. Color is share of the filtered total. |
| bubblePanel | chart:bubble | Difficulty | High demand is not the same as an easy phrase. | Each bubble is a keyword: volume, difficulty, CPC, commercial intent. |
| scatterPanel | chart:scatter | Competition | Low competition, high opportunity — if that quadrant exists here. | Each point is a keyword on competition versus opportunity score. |

Expected result / completion oracle (frozen from disposable unique-hunk
simulation — `S3` `EV-UA-W13-D-003`):

- ending file digest
  `2847411eb93de729798eccec0ae0f976bc0b9dcf845119b9c791a11dd236d562`
- `git diff --numstat` on the writable file `158 125`
- the eleven `data-surface="chart:…"` strings each appear exactly once;
  `overviewSignals` and `analysisCharts` each appear at least once (type member,
  const declaration, `children()` argument) and are still word-boundary
  identifiers; eleven `<canvas>` and eleven `<SectionIntro` nodes; two `<>`/`</>`
  fragment pairs; balanced `<section>`/`</section>` (11) and `<div>`/`</div>`.

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 of `frontend/components/keyword-intelligence/chart-panels.tsx`
  equals `2847411eb93de729798eccec0ae0f976bc0b9dcf845119b9c791a11dd236d562`.
- `V1b` `git diff --numstat -- frontend/components/keyword-intelligence/chart-panels.tsx`
  reports `158 125`.
- `V1c` the file parses as JSX/TSX (balanced section/div/fragment, valid braces).
- `V1d` invariant checks: `grep -c "data-surface=\"chart:seeds\""` => 1; similar
  for `chart:intent|recommended|histogram|flags|history|treemap|top-keywords|
  cluster-volume|bubble|scatter` => 1 each; `grep -c "import { SectionIntro } from
  \"@/components/section-intro\";"` => 1; `grep -c "See which clusters hold the
  search demand\."` => 1; `grep -c "overviewSignals"` => >= 1 (NOT 0);
  `grep -c "analysisCharts"` => >= 1 (NOT 0); VIS-KD word-boundary members
  `seedPerformance|heatmapPanel|overviewSignals|historyPanel|analysisCharts` all
  present.
- `V2` attributable changed-file set is exactly
  `{frontend/components/keyword-intelligence/chart-panels.tsx}`.
- `V3` required local coverage IDs = registered = executed = `[]` (no ownership
  case; CASE-UA-W13-001..004 belong to S004, which reads this file). Zero
  skips/duplicates/unexpected.
- `V4` protected zero-edit pins remain byte-identical (consequence 2 list).

Check classification: `V1a`–`V1d`, `V2`–`V4` LOCAL_NOW. G1/G2/G3/G5/G6/G8 are
DEFERRED_TO_INTEGRATION (I001). **§7.3 non-behavioral formatting freedom**: the
JSX structure, exact strings, and anchor placement above are authoritative; only
whitespace/line-wrap may vary, and any variance MUST still produce the pinned
ending digest. The frozen ending digest is the deterministic completion oracle.

Completed-file checklist evidence: `S3` `EV-UA-W13-D-003`.

### UA-W13-S002

```yaml
subwindow_id: UA-W13-S002
type: FILE
parent_window_id: UA-W13
parent_assignment_id: ASG-UA-W13-01
assigned_agent: UA-W13-WINDOW-AGENT
predecessors: [UA-W13-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/keyword-intelligence/keyword-dashboard.module.css
file_operation: MODIFY
starting_file_digest: d416ece7de0407e81c95e415841b29759e95f765cfcccaadd2ed3c49fe51d460
starting_repository_change_set_digest: d76978decc4c7859467167095f1f78e5b2828bb2d9eb870b73ff7b831b301739
read_only_scope:
  - frontend/components/keyword-intelligence/chart-panels.tsx
authorized_actions:
  - apply_thirteen_unique_css_hunks
prohibited_actions:
  - leave_min_height_330px
  - leave_desktop_charts_repeat_2
  - change_chartWrap_tall_380px
  - change_decisionGrid
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: REQ-UA-003 (single-column stacks; wrap heights), DEC-UA-005
(items 2/4/6–9/11–15 heights; `.overviewSignals`/`.charts` 1fr; `.chartPair`
block; heatmap/globe min-height 520px), DEC-UA-009/REQ-UA-005 (layout only).

Exact file transformation (parent-frozen consequence 4). Thirteen unique hunks,
each OLD count == 1, applied in the parent-frozen order `(a)`–`(m)`, producing the
parent-simulated ending digest and numstat.

Expected result / completion oracle (parent-simulated — `S3` `EV-UA-W13-D-004`):

- ending file digest
  `3095e3842443abccb1a656373101cf4127f29b4adf7594efc280561bfa25a6bd`
- `git diff --numstat` on the writable file `18 14`
- no `min-height: 330px`, no desktop `.charts {` with `repeat(2`, `.chartWrap.tall
  { height: 380px; }` unchanged, `.decisionGrid` unchanged.

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 equals `3095e3842443abccb1a656373101cf4127f29b4adf7594efc280561bfa25a6bd`.
- `V1b` numstat `18 14`.
- `V1c` invariant grep: `grep -c "min-height: 520px;"` >= 3;
  `grep -c "min-height: 330px;"` => 0; `grep -c "repeat(2, minmax(0, 1fr))"` => 0;
  `grep -c ".chartPair { display: block; }"` => 1; `grep -c ".chartWrap.tall {
  height: 380px; }"` => 1; `grep -c ".decisionGrid"` >= 1.
- `V2` attributable changed-file set is exactly
  `{frontend/components/keyword-intelligence/keyword-dashboard.module.css}`.
- `V3` required local coverage IDs = registered = executed = `[]`.
- `V4` zero-edit pins unchanged.

Classification: V1–V4 LOCAL_NOW; G1/G2/G3/G5/G6/G8 DEFERRED_TO_INTEGRATION. The
ending digest and numstat are parent-simulated and are the deterministic
completion oracle (consequence 4); the executor must reproduce them.

### UA-W13-S003

```yaml
subwindow_id: UA-W13-S003
type: FILE
parent_window_id: UA-W13
parent_assignment_id: ASG-UA-W13-01
assigned_agent: UA-W13-WINDOW-AGENT
predecessors: [UA-W13-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/keyword-intelligence/research-dashboard.tsx
file_operation: MODIFY
starting_file_digest: 3936764824ed80346be54fac256a0b7c6dbc78bb9fd8235a2d3705c3869f9e63
starting_repository_change_set_digest: d76978decc4c7859467167095f1f78e5b2828bb2d9eb870b73ff7b831b301739
read_only_scope:
  - frontend/components/section-intro.tsx
  - frontend/components/keyword-intelligence/chart-panels.tsx
  - frontend/components/keyword-intelligence/summary-cards.tsx
authorized_actions:
  - keep_heroCopy_and_single_h1_and_summary_cards_surface
  - wrap_researchHero_around_heroCopy_and_selectionStep_only
  - stack_market_block_after_researchHero_in_5R_order
  - wrap_keyword_market_globe_in_SectionIntro
  - keep_filter_save_finalize_export_handlers
prohibited_actions:
  - add_new_data_surface_attribute
  - keep_heatmap_or_globe_inside_researchHero
  - remove_hero_vars_or_fmtNum_fmtCpc_projectMarketRow_imports
  - wrap_overlap_history_in_decisionGrid
  - edit_filter_save_finalize_export_handlers
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: REQ-UA-003 (stacked, not dashboard), DEC-UA-005 items 1–16
order, DEC-UA-009 + INV-UA-010 (no new data-surface token; `data-surface`
preserved), DEC-UA-003 (the W12 result SectionIntro strings stay),
REQ-UA-005 (presentation-only; handlers byte-identical), VIS-KD (single `<h1>`,
`surface:summary-cards`, `styles.selectionStep`, `charts.heatmapPanel`,
`<KeywordMarketGlobe`, `charts.seedPerformance`, `<ClusterLandscape`,
`summary.marketOverview(charts.overviewSignals)`, `charts.historyPanel`,
`charts.analysisCharts`, `surface:keyword-table` in that source-index order),
W5-I05 (`surface:summary-cards` + `marketOverview(charts.overviewSignals)`).

Exact file transformation (parent-frozen consequence 5R). Keep `filterDock`, the
W12 result SectionIntro (DEC-UA-003 strings), banners, `marketContext`, the
SelectionReview wrapper including `data-surface="surface:selection-review"`, the
existing heroCopy block with its single `<h1>` and
`data-surface="surface:summary-cards"`, and the existing KeywordTable wrapper
`data-surface="surface:keyword-table"`. Keep `styles.researchHero` wrapping ONLY
heroCopy + the `styles.selectionStep`/SelectionReview wrapper; move `heatmapPanel`
and `KeywordMarketGlobe` to full-width siblings after `researchHero`. Replace the
`KeywordMarketGlobe` head kicker/p with
`<SectionIntro eyebrow="Market lens" title="The same keywords, nine markets."
copy="Move between worldwide and country views without leaving this research." />`
while keeping the All markets button and `TrafficMarketExplorer`. After
`researchHero`, stack in order: `{charts.heatmapPanel}`; `KeywordMarketGlobe`;
`{charts.seedPerformance}`; `ClusterLandscape`;
`{summary.marketOverview(charts.overviewSignals)}`; `{summary.overlapPanel}`
(not inside `styles.decisionGrid`); `{charts.historyPanel}`;
`{charts.analysisCharts}`; KeywordTable wrapper. Keep
`heroRows`/`heroActiveRows`/`heroCpcValues`/`heroAverageCpc`/`heroMarket`/
`heroMarketLabel` and the `fmtNum`/`fmtCpc`/`projectMarketRow` imports they need.
Keep `SummaryCards` as the overlapPanel source. Remove the `dashboardFlow` div and
the `styles.decisionGrid` wrapper.

The stacked order (DEC-UA-005 items 1–16 as realized by 5R) that S003 produces:

```jsx
<section className={styles.researchHero} aria-label="Keyword research workspace">
  <div className={styles.heroCopy} data-surface="surface:summary-cards">
    {/* single <h1> kept; keyword-count chrome for VIS-KD/W5-I05 */}
  </div>
  <div ref={reviewRef} className={styles.selectionStep} data-surface="surface:selection-review">
    <SelectionReview … />
  </div>
</section>
{charts.heatmapPanel}
<KeywordMarketGlobe … />   // SectionIntro wrap, kicker/p replaced
{charts.seedPerformance}
<ClusterLandscape … />
{summary.marketOverview(charts.overviewSignals)}
{summary.overlapPanel}
{charts.historyPanel}
{charts.analysisCharts}
<div data-surface="surface:keyword-table">
  <KeywordTable … />
</div>
```

Expected result / completion oracle (frozen from disposable unique-hunk
simulation — `S3` `EV-UA-W13-D-005`):

- ending file digest
  `82f8a6284087dd9e8daa9da12496445299e263825e991f3ead5805f80de728aa`
- `git diff --numstat` on the writable file `32 36`
- exactly one `<h1>`; `data-surface="surface:summary-cards"` present once;
  `summary.marketOverview(charts.overviewSignals)` present; `{charts.analysisCharts}`
  present; `styles.researchHero` present and wraps only heroCopy + selectionStep;
  `surface:selection-review` and `surface:keyword-table` present; no
  `decisionGrid`, no `dashboardFlow`; the W12 intro string and the globe title
  `The same keywords, nine markets.` present.

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 equals `82f8a6284087dd9e8daa9da12496445299e263825e991f3ead5805f80de728aa`.
- `V1b` numstat `32 36`.
- `V1c` the file parses as JSX/TSX (balanced section/div, one fragment).
- `V1d` invariant checks: `grep -c "<h1"` => 1; `grep -c "data-surface=\"surface:summary-cards\""` => 1; `grep -c "summary.marketOverview(charts.overviewSignals)"` => 1; `grep -c "data-surface=\"surface:selection-review\""` => 1; `grep -c "data-surface=\"surface:keyword-table\""` => 1; `grep -c "The landscape behind this market\."` => 1; `grep -c "The same keywords, nine markets\."` => 1; `grep -c "decisionGrid"` => 0; VIS-KD composition-order needles appear in ascending source index (surface:summary-cards → styles.selectionStep → charts.heatmapPanel → <KeywordMarketGlobe → charts.seedPerformance → <ClusterLandscape → marketOverview(charts.overviewSignals) → charts.historyPanel → charts.analysisCharts → surface:keyword-table).
- `V2` attributable changed-file set is exactly
  `{frontend/components/keyword-intelligence/research-dashboard.tsx}`.
- `V3` required local coverage IDs = registered = executed = `[]`.
- `V4` zero-edit pins unchanged.

Classification: `V1a`–`V1d`, `V2`–`V4` LOCAL_NOW. G1/G2/G3/G5/G6/G8
DEFERRED_TO_INTEGRATION. **§7.3 formatting freedom**: anchors/strings/order
authoritative; variance must still yield the pinned ending digest.

### UA-W13-S004

```yaml
subwindow_id: UA-W13-S004
type: FILE
parent_window_id: UA-W13
parent_assignment_id: ASG-UA-W13-01
assigned_agent: UA-W13-WINDOW-AGENT
predecessors: [UA-W13-S003]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w13.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: d76978decc4c7859467167095f1f78e5b2828bb2d9eb870b73ff7b831b301739
read_only_scope:
  - frontend/components/keyword-intelligence/keyword-dashboard.module.css
  - frontend/components/keyword-intelligence/chart-panels.tsx
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/test/uphunt-aesthetic-coverage.test.ts
  - frontend/test/uphunt-aesthetic-w12.test.ts
authorized_actions:
  - create_w13_test
  - run_coverage_and_w13_tests
prohibited_actions:
  - add_fifth_test
  - edit_revisions_or_REQUIRED_CASE_IDS
  - edit_producer_files
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: DEC-UA-011 (recordExecuted contract; one test() per allocated
CASE ID; recordExecuted after the activation witness and oracle).
CASE-UA-W13-001 (SCN-UA-004: `.charts` single column, no `repeat(2`), 002
(SCN-UA-004: wrap heights + `min-height:520px` + `.chartWrap.tall`), 003
(SCN-UA-004: all eleven `data-surface` chart ids preserved), 004 (SCN-UA-004:
DEC-UA-005 title/copy strings). No fifth test.

Exact file transformation (CREATE, W12 class, `node:test` unit). A unit file that
reads `keyword-dashboard.module.css`, `chart-panels.tsx`, and
`research-dashboard.tsx` source (not rendered), modelled on
`test/uphunt-aesthetic-w12.test.ts`, and defines exactly four `test()` blocks with
`recordExecuted` after each oracle.

The complete deterministic bytes are frozen here (consequence 6R). The byte
content of `frontend/test/uphunt-aesthetic-w13.test.ts` (verbatim, W12 class;
recompute SHA-256 to confirm):

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const keywordDashboardModuleCss = await readFile(
  new URL("../components/keyword-intelligence/keyword-dashboard.module.css", import.meta.url),
  "utf8",
);

const chartPanels = await readFile(
  new URL("../components/keyword-intelligence/chart-panels.tsx", import.meta.url),
  "utf8",
);

const researchDashboard = await readFile(
  new URL("../components/keyword-intelligence/research-dashboard.tsx", import.meta.url),
  "utf8",
);

test("CASE-UA-W13-001 keyword dashboard charts grid is single column", () => {
  assert.match(keywordDashboardModuleCss, /\.charts \{[\s\S]*?grid-template-columns: 1fr;/u);
  assert.doesNotMatch(keywordDashboardModuleCss, /\.charts \{[\s\S]{0,240}repeat\(2/u);
  recordExecuted("CASE-UA-W13-001");
});

test("CASE-UA-W13-002 chart wrap heights and tall rule stay locked", () => {
  assert.match(keywordDashboardModuleCss, /min-height: 520px;/u);
  assert.match(keywordDashboardModuleCss, /\.seedPerformanceChart \{ height: 420px; \}/u);
  assert.match(keywordDashboardModuleCss, /\.chartWrap \{ position: relative; height: 360px; \}/u);
  assert.match(keywordDashboardModuleCss, /\.chartWrap\.tall \{ height: 380px; \}/u);
  recordExecuted("CASE-UA-W13-002");
});

test("CASE-UA-W13-003 all eleven chart data-surface values preserved", () => {
  for (const surface of [
    "chart:seeds",
    "chart:intent",
    "chart:recommended",
    "chart:histogram",
    "chart:flags",
    "chart:history",
    "chart:treemap",
    "chart:top-keywords",
    "chart:cluster-volume",
    "chart:bubble",
    "chart:scatter",
  ]) {
    assert.ok(chartPanels.includes(`data-surface="${surface}"`), `missing ${surface}`);
  }
  recordExecuted("CASE-UA-W13-003");
});

test("CASE-UA-W13-004 SectionIntro copy strings present", () => {
  assert.match(chartPanels, /See which clusters hold the search demand\./u);
  assert.match(chartPanels, /Which starting phrases actually pulled weight\./u);
  assert.match(chartPanels, /What people mean when they search these phrases\./u);
  assert.match(researchDashboard, /The same keywords, nine markets\./u);
  recordExecuted("CASE-UA-W13-004");
});
```

Expected result / completion oracle (deterministic bytes frozen above — `S3`
`EV-UA-W13-D-006`):

- ending file digest
  `8e96d6de1ad4b91774b6fd93c864c2d8cc866c6a361c4fe98bfc6e9d42240328`
- exactly four `test(` blocks; `grep -c "recordExecuted("` => 4; the frozen bytes
  satisfy every assertion above. The parent sample fence digest `a1a4527a…`
  (`a1a4527a29fdc2707bfd3e2c85f2e9e972484f201513cfc84600775f0450fd89`) is the
  parent's reference; §7.3 non-behavioral formatting freedom applies, and the
  frozen bytes above (sha256 `8e96d6de…`) are the authoritative, independently
  recomputable completion oracle.

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 equals `8e96d6de1ad4b91774b6fd93c864c2d8cc866c6a361c4fe98bfc6e9d42240328`.
- `V1b` exactly four `test(` blocks; `grep -c "recordExecuted("` => 4.
- `V1c` assertion greps: `grep -c "See which clusters hold the search demand\."`
  >= 1; `grep -c "Which starting phrases actually pulled weight\."` >= 1;
  `grep -c "What people mean when they search these phrases\."` >= 1;
  `grep -c "The same keywords, nine markets\."` >= 1; `grep -c "grid-template-columns:
  1fr"` >= 1.
- `V1d` isolated execution from ABSENT executed-set:
  `rm -f test/.ua-executed.json && node --experimental-strip-types --test test/uphunt-aesthetic-coverage.test.ts test/uphunt-aesthetic-w13.test.ts`
  → exits 0; `test/.ua-executed.json` contains exactly the 6 IDs
  `{CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W13-001, CASE-UA-W13-002,
  CASE-UA-W13-003, CASE-UA-W13-004}`; set digest
  `8ebdca0f62ea547296df576f38ce56f39b361d1d5980b3520ca3665f59c10b87`.
  Do NOT require W2–W12 IDs here.
- `V1e` `V1d` violation check: the four CASE-UA-W13 tests each pass (no skipped,
  filtered, or duplicated case); the only executing case set is the 6 IDs above.
- `V2` attributable implementation-file set is exactly
  `{frontend/test/uphunt-aesthetic-w13.test.ts}`. The `test/.ua-executed.json`
  mutation is the DEC-UA-011-registered runtime residue (tracked at HEAD, never
  commit) and is reported as documented residual, not an implementation edit.
- `V3` required local coverage IDs = registered = executed =
  `{CASE-UA-W13-001, CASE-UA-W13-002, CASE-UA-W13-003, CASE-UA-W13-004}`, zero
  skips/duplicates/unexpected, plus the two W1 registry re-executions.
- `V4` zero-edit pins unchanged.

Classification: V1a–V1e, V2, V3, V4 LOCAL_NOW. G1/G5 (37-ID) and G2/G3/G6/G8
DEFERRED_TO_INTEGRATION. After `V1d`, `npm test` is NOT part of this leaf (it
belongs to I001 G1); G5's 37-ID assertion is explicitly I001-only.

## 6. Allocation of requirements, decisions, interfaces, and coverage cases

| Requirement | Decision | File / sub-window | Assertion (executable) |
|---|---|---|---|
| REQ-UA-003, DEC-UA-005 items 2/4/6–9/11–15 | DEC-UA-005, DEC-UA-009 | S001 `chart-panels.tsx` | one `<section>` per chart with exact SectionIntro; eleven `data-surface` preserved; `overviewSignals`/`analysisCharts` retained as fragments (>= 1 each) |
| REQ-UA-003, DEC-UA-005 items 1–16 | DEC-UA-005, DEC-UA-009 | S003 `research-dashboard.tsx` | item order 1–16; globe SectionIntro; heroCopy + single h1 + surface:summary-cards retained; marketOverview(overviewSignals) present; no decisionGrid |
| REQ-UA-003, DEC-UA-005 heights/layout | DEC-UA-005 | S002 `keyword-dashboard.module.css` | `.overviewSignals`/`.charts` 1fr; `.chartPair` block; wrap heights; `min-height:520px` |
| INV-UA-010 | DEC-UA-009 | S001 + S003 | `data-surface` chart ids and selection-review/summary-cards/keyword-table preserved; no new token |
| VIS-KD / W5-I05 | DEC-UA-009, INV-UA-010 | S001 + S003 | word-boundary members present (S001); single h1, surface:summary-cards, marketOverview(overviewSignals), composition-order needles in source-index order (S003) |
| REQ-UA-005 | DEC-UA-006, DEC-UA-015 | all | forbidden-path negative search at I001 G6 |
| CASE-UA-W13-001 | SCN-UA-004 | S004 (reads S002) | `.charts` 1fr, no `repeat(2` |
| CASE-UA-W13-002 | SCN-UA-004 | S004 (reads S002) | wrap heights + `min-height:520px` + `.chartWrap.tall` |
| CASE-UA-W13-003 | SCN-UA-004 | S004 (reads S001) | all eleven `data-surface` chart ids |
| CASE-UA-W13-004 | SCN-UA-004 | S004 (reads S001/S003) | DEC-UA-005 strings + globe title |

Cross-file interfaces: no new public interface is introduced. The thirteen
`ChartPanelSections` panel/composite members are the only cross-file surface; they
are frozen in S001 before S003 consumes them (interface freeze §6.2 of the
sub-window standard). The data-surface attributes and the SectionIntro copy are
presentation-only and are consumed by S004's source-text assertions. No
imported/exported name changes.

Coverage allocation: CASE-UA-W13-001..004 →
`uphunt-aesthetic-w13.test.ts` (S004). No other window-local case.
REQUIRED_CASE_IDS is never edited.

## 7. Verification gates

### 7.1 File-local gates (LOCAL_NOW per sub-window)

Enumerated in each sub-window block above (`V1a`–`V4`). Each FILE leaf's local
gate proves its own file digest, numstat, attributable single-file change set,
and (for S004) the isolated 6-ID executed-set.

### 7.2 Whole-window integration assessment `UA-W13-I001`

Author of assessment: `UA-W13-WINDOW-AGENT` (personally; not delegated).
`authorized_write_file: NONE` for implementation files during I001. Initial
assessment block is fully authored here; frozen source revision and executed
evidence refs are filled from the completed sub-windows at I001 run time.

```yaml
subwindow_id: UA-W13-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W13
parent_assignment_id: ASG-UA-W13-01
assigned_agent: WINDOW-AGENT
authorized_write_file: NONE
read_only_scope:
  - frontend/components/keyword-intelligence/chart-panels.tsx
  - frontend/components/keyword-intelligence/keyword-dashboard.module.css
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/test/uphunt-aesthetic-w13.test.ts
may_start_successor: false
```

Expected assembled changed-file set (parent-authorized scope):

- `frontend/components/keyword-intelligence/chart-panels.tsx` (S001)
- `frontend/components/keyword-intelligence/keyword-dashboard.module.css` (S002)
- `frontend/components/keyword-intelligence/research-dashboard.tsx` (S003)
- `frontend/test/uphunt-aesthetic-w13.test.ts` (S004)

Planned-file-set digest `411e2eeaca13cd3c07f5bee879666477697197420e13783d63d5a1b427d5823f`
(verified in this decomposition, `S3` `EV-UA-W13-D-002`). `summary-cards.tsx` is
excluded as zero-edit.

Frozen gates (from `frontend/`):

- **G0** Recompute and confirm parent-visible pins: A1 `57fa49c7…`, A3
  `094bc8bf…`, A4 `7962776c…`, A5 state_version 31 `2765db1b…`, subwindow
  standard `842c2955…`. Confirm predecessor UA-W12 pins (research-dashboard/W12
  into, w12 test `41711cc5…`) present.
- **G1** `npm test` per DEC-UA-016. Expected `207` tests, `204` pass, `3` fail.
  PASS iff the allocated UA CASE tests (CASE-UA-W13-001..004) pass AND every
  failing title is exactly a member of the three heading-oracle titles (`My
  searches presents keyword research and identifiable run dossiers without
  rendering IDs`, `MRR-FE-01 exact research payload and two-section surface`,
  `MRR-W2 frontend unit certificate`). Process exit 1 is expected and is NOT G1
  FAIL when those conditions hold.
- **G2** DEC-UA-014: from `frontend/`, `npx tsc --noEmit --pretty false`. PASS iff
  zero diagnostics name a path in the UA-W13 `authorized_write_scope` needles:
  `chart-panels.tsx`, `research-dashboard.tsx`, `summary-cards.tsx`,
  `uphunt-aesthetic-w13.test.ts` (`keyword-dashboard.module.css` is not a tsc
  input). The ten parked SRC-UA-0092 diagnostics are not a PASS condition and are
  not to be "fixed".
- **G3** `npm run lint` when CSS/JSX is owned (JSX/TS owned here). PASS: exit 0 on
  the changed needles.
- **G4** `browser_evidence` true. Four full-page PNGs under
  `frontend/review-evidence/uphunt-aesthetic/UA-W13/` at widths `390`, `768`,
  `1280`, `1440` (height `900`) of synthetic
  `/keywords/kr_abcdefghijklmnopqrstuvwx` with same-class fetch interception of
  `/api/keyword-research*` completed payloads (copy interception; do not mutate
  the KI-W5 harness). Do not screenshot `/design-fixture` or a live
  `/keywords/{id}` against production. Assert the treemap SectionIntro title
  `See which clusters hold the search demand.` is present and readable at 1280.
  Helper scripts and `g4-checks.json` may live only under that review-evidence
  directory.
- **G5** Coverage: window-local 4-ID case set digest
  `c4bbdedb61d2eb4c680569b5d78171b5d1254830d8da4342d44435b40e5b6cb2`
  (CASE-UA-W13-001..004). After `npm test`, `test/.ua-executed.json` must equal
  the 37-ID set (digest
  `f9587c2314854fb0e0a0b9ce9b37df66244a5683119705d00c9d94dbbfbc83e5`) with
  required = registered = executed, zero skips/duplicates/unexpected IDs, and no
  missing activation witnesses. Full 43-set equality remains UA-W15-V5.
- **G6** Forbidden-path negative search: `git diff --name-only HEAD` scope of the
  UA-W13 delta ⊂ UA-W13 `authorized_write_scope` plus the documented
  `.ua-executed.json` residue; zero hits among DEC-UA-006 paths (`app/api`,
  `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`,
  `email_scraper`), root `ACTIVE_EXECUTION_STATE.md`, `selection-review.tsx`,
  `summary-cards.tsx`, `globals.css`, traffic/crux files, W2–W12 test files,
  `REQUIRED_CASE_IDS`, `keyword-intelligence-inventory.test.ts`, parked files.
  All zero-edit pins byte-identical.
- **G7** No new network/DB operation: imports of the changed product files and
  the new test are source-read only; 0 network, 0 DB.
- **G8** Negative controls: (a) weakening CASE-UA-W13-001 by accepting `repeat(2`
  must fail the case (NC-UA-004); (b) removing one `data-surface="chart:…"`
  string must fail CASE-UA-W13-003 (NC-UA-004); (c) a forbidden path in the diff
  must fail G6 (NC-UA-005); (d) deleting a headline string must fail
  CASE-UA-W13-004. Record falsification.
- **G9** Negative search: no UA-W14 artifact, no `run`/`keyword`-dashboard
  `keyword-dashboard.module.css`/`chart-panels.tsx` out-of-scope edit, no
  article/helper outside `review-evidence/uphunt-aesthetic/UA-W13/`, no successor
  parent window, no commit/push/AWS/paid-provider/production action, `A5`
  unchanged until the authorized handoff action.

Oracle outcomes: PASS, CORRECTION_REQUIRED, or PARENT_BLOCKED. A correction
requires a new single-file `UA-W13-C00n` and a new `UA-W13-I002`; no direct file
repair by the window agent.

**Parent-review resolution (CHG-UA-0008).** The prior rejection (`EV-UA-A-070`)
objected that the original consequence 3/5 removed `overviewSignals`,
`analysisCharts`, `summary.marketOverview(...)`, and `data-surface="surface:summary-cards"`,
colliding with the parked `test/keyword-intelligence-inventory.test.ts` VIS-KD and
W5-I05 tests. The parent resolved this by retracting EV-UA-A-069 items 3 and 5 and
issuing corrected `3R`/`5R` (transcribed in §0), which retain `overviewSignals` and
`analysisCharts` as composites of the named panels, retain `surface:summary-cards`
and the single `<h1>`, and keep `summary.marketOverview(charts.overviewSignals)`
and the `fmtNum`/`fmtCpc`/`projectMarketRow` hero imports. The submitted S001 V1d
(grep `overviewSignals`/`analysisCharts` => 0) and S003 V1d (grep
`marketOverview`/`researchHero`/`heroCopy` => 0) greps are voided and replaced by
the `>= 1` checks in §5. The corrected decomposition therefore satisfies VIS-KD
word-boundary members and the W5-I05 data-surface scan without editing the parked
inventory test. No remaining parent-level integration risk is flagged for this
revision; the only substantive execution risk is that the frozen S001/S003 ending
digests must be reproduced exactly (§7.3), enforced by a new corrective sub-window
if violated.

## 8. Correction and re-assessment rules

- Corrections are append-only `UA-W13-C001`, `UA-W13-C002`, …; never reuse an
  initial/assessment/assignment/evidence ID.
- A correction owns exactly one file and cites the failed evidence, root cause,
  governing requirement/decision, the sub-window it corrects, and the checks it
  invalidates.
- The window agent never edits an implementation file during review; every fix is
  a new corrective sub-window (standard §8 item 2).
- After the last correction, a new whole-window assessment `UA-W13-I002` is
  required; leaf test results cannot substitute.
- Do not weaken an accepted oracle; do not repair a parent-level ambiguity by
  guessing (escalate as PARENT_BLOCKED).
- If the correction needs a new parent decision or expands parent scope, do not
  author a corrective sub-window; escalate.

## 9. Intermediate-state contracts

| Edge | After producer | Local checks that must pass | Expected temporary result | Safety | Resolver | Prohibited while state exists |
|---|---|---|---|---|---|---|
| S001 → S002 | S001 edits `chart-panels.tsx` only | G1 `npm test` (no test change) under DEC-UA-016: 203/200/3 exit 1 (three heading-oracle only); G2 0 needles on `chart-panels.tsx`; numstat 158/125; digest 2847411e; S001 V1d (`overviewSignals`/`analysisCharts` >= 1) | G1 passes with exactly the three heading-oracle fails; no unexpected failure | No suite test reads the chart render-prop names except the parked inventory test, which is not part of the allowed G1 set; presentation-only JSX; `overviewSignals`/`analysisCharts` composites retained | S003 (which references the thirteen panel/composite members) | do not reorder; do not edit module css; do not begin S002 before the S001 review |
| S002 → S003 | S002 edits `keyword-dashboard.module.css` only | G1 203/200/3 exit 1; G2 module.css is not a tsc input; numstat 18/14; digest 3095e384 | G1 unchanged except heading-oracle | CSS-only, not externally visible to the suite | S003 | do not leave `min-height:330px`; do not begin S003 before the S002 review |
| S003 → S004 | S003 edits `research-dashboard.tsx` only | G1 203/200/3 exit 1; G2 0 needles on `research-dashboard.tsx`; numstat 32/36; digest 82f8a628; S003 V1d (single h1, surface:summary-cards, marketOverview(overviewSignals)) | G1 unchanged except heading-oracle | The w12 test reads the still-present intro strings/import; `surface:summary-cards`, `marketOverview(overviewSignals)`, and hero vars are retained per 5R, so the parked inventory tests stay satisfiable | S004 | do not begin S004 before the S003 review; do not start UA-W14 |
| S004 → I001 | S004 creates the w13 test | V1d isolated 6-ID run exits 0; 6-ID digest 8ebdca0f; digest 8e96d6de | G1 now 207/204/3; the four CASE-UA-W13 tests pass | w13 test is source-text-only; no navigation, no network | I001 runs G1/G2/G3/G4/G5/G6/G8 | do not begin UA-W14; do not run a whole-window assessment from leaf summaries alone |

## 10. Mandatory decomposition-readiness checkboxes

Evidence references resolve to `S3` evidence IDs. `N/A` rows cite a verified
non-applicability. Marked `[x]` by the window agent after verification in this
decomposition; `AWAITING_PARENT_DECOMPOSITION_REVIEW` is set in `S2`.

### 10.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA-W13-D-001
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA-W13-D-001
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA-W13-D-001 (§2)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA-W13-D-001 (§3)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA-W13-D-001 (§top/S2/S3)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA-W13-D-001 (identity UA-W13-WINDOW-AGENT executes + reviews; no lower subagent)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: A5 `execution_environment_policy`; EV-UA-W13-D-001

### 10.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA-W13-D-001, §6
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA-W13-D-001, §0 (consequences `3R`/`5R`/`6R` transcribe EV-UA-A-070 and replace EV-UA-A-069 items 3/5/6; no reopened consequence; the resolved CHG-UA-0008 parent decision is recorded in §7.2)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA-W13-D-002 (4-file digest 411e2eea matches parent frozen)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: §5 (S001/S002/S003/S004 one file each)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: §5 blocks; EV-UA-W13-D-003/004/005/006
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: §4 (§9); no parallel wave (parent-frozen)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: §6 (thirteen ChartPanelSections members frozen in S001 before S003; presentation-only data-surface/aria consumed by S004 source-text assertions)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: §9
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: S001/S002/S003 (production) and S004 (test) are separate sub-windows; no fixture/schema/config edit
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: only per-file `node --test`/`sha256sum`/`git diff` runs; S004's isolated run mutates only `.ua-executed.json` (DEC-UA-011 runtime residue) plus the test file

### 10.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7. Evidence: §5 blocks
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: §5 exact hunks/bytes
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: §5 checks
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: §5 V2
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: §5, §11.6
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: §11.6; DEC-UA-015 (single identity)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: §5 (each file-local acceptance is self-contained; G1-with-heading-oracle is a predecessor baseline, not successor work)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: §5 (G1/G2/G3/G5/G6/G8 → UA-W13-I001)

### 10.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: §6, EV-UA-W13-D-006
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: §5 V3 + §7.2 G5 (digests c4bbdedb / 8ebdca0f / f9587c23)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: §7.2 G8 + EV-UA-W13-D-007 (NC-UA-004 / NC-UA-002 / NC-UA-005)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: SUB-UA-001 (source-text read; not computed px); EV-UA-W13-D-007
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: §7.2 (authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: §7.2 (G1/G2/G3/G5/G6/G8 = I001 only)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: §8
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: §11.6, DEC-UA-015
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: §7.2 G1/G5/G8 oracles
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: §11.6
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: A5 `execution_environment_policy`; EV-UA-W13-D-001

### 10.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA-W13-D-002/S1 IDs (S001/S002/S003/S004/I001; CASE-UA-W13-001..004; no reuse)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA-W13-D-001 (§5 all digests pinned; S004 frozen bytes fully embedded plus sha256; only I001 executed-evidence refs are deliberately TO_BE_FILLED, allowed by §9.1)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA-W13-D-007/each §5 V2
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: §5 (each file maps a distinct REQ/DEC; removing any yields an unmapped requirement)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: §7.2 G5 (required=registered=executed; zero skips)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: §7.2 G1/DEC-UA-016; G5 digests; G6 negative search
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: §11.6 (single writable file per sub-window; strict adjacency)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: §8
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: §12 certificate + `S2.decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`; S1 not executed
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA-W13-D-007
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: A5 policy; EV-UA-W13-D-001 (no environment invalidation observed in decomposition; policy copied unchanged)

## 11. Handoff, stop, and successor rules

- The window agent is `UA-W13-WINDOW-AGENT`, DEC-UA-015 identity. After the
  parent accepts this decomposition, that identity executes each FILE leaf, then
  personally reviews it, then assigns the next S-number, then personally runs
  `UA-W13-I001`, then performs the consolidated parent handoff. `may_start_successor: false`
  means do not start `UA-W14` (the next parent window); it is not a FILE-leaf
  brake, and **no** FILE leaf halts at `AWAITING_WINDOW_REVIEW` for a parent turn.
- A FILE leaf stops at `AWAITING_WINDOW_REVIEW`; the window agent (same identity)
  reviews it and advances without a parent round trip.
- Communication is strictly adjacent: no implementation subagent talks to the
  parent; no parent talks to a subagent. Here the executor and reviewer are the
  same identity, so strict adjacency is trivially enforced.
- `S2` is live status; `S3` is append-only evidence. Only the window agent
  updates `S2`.

## 12. Authoring-readiness certificate

Appended below in `S3` (`EV-UA-W13-D-008`, `certificate: SUBWINDOW-DECOMPOSITION-READY`),
and `S2.decomposition_status` is set to `AWAITING_PARENT_DECOMPOSITION_REVIEW`.

---

## 13. Corrective sub-window (append-only)

No corrective sub-window has been authored at decomposition time. Any future
corrective is appended here as `UA-W13-C001`, `UA-W13-C002`, …; none of the
initial blocks above is rewritten.

---

*End of S1.* This decomposition does not edit any implementation file, does not
assign FILE leaves, does not execute `UA-W13-S001`, and does not begin `UA-W14`.
