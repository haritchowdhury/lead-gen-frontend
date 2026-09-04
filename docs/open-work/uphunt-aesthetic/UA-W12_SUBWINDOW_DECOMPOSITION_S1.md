# UA-W12 Sub-window decomposition checklist (`UA-W12_S1`)

Frozen decomposition for parent window `UA-W12` under assignment `ASG-UA-W12-01`.
Author: window agent identity `UA-W12-WINDOW-AGENT`.

Status: `AWAITING_PARENT_DECOMPOSITION_REVIEW`. Parent has not accepted this
decomposition. No FILE leaf is assigned, no implementation file is edited, and
`UA-W12-S001` is NOT executed by this decomposition. `A5_ACTIVE_EXECUTION_STATE.yaml`
remains byte-identical through decomposition.

Other subordinate artifacts:

- `S2` — `frontend/docs/open-work/uphunt-aesthetic/UA-W12_SUBWINDOW_STATE_S2.yaml`
- `S3` — `frontend/docs/open-work/uphunt-aesthetic/UA-W12_SUBWINDOW_EVIDENCE_S3.md`

Inherited parent package (`A5` state_version 27, digest
`6ccc1ce226145c7e016e0bddb97fe4a7f76a42feabc0d323f59fb302b032a229`):

- `A1` — `frontend/docs/open-work/uphunt-aesthetic/A1_LOCKED_PRODUCT_CONTRACT.md`
  revision `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827`
- `A3` — `frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md`
  revision `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3`
- `A4` — `frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md`
  revision `1edc1bc7a9d7f46a62a4f88ec74e5e468e1c1d17395b9b1aa0b810ce308e8aab`
- `A5` — `frontend/docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml`
  state_version 27, `current_window UA-W12`, `assigned_agent UA-W12-WINDOW-AGENT`,
  `current_status IN_PROGRESS`, `accepted_through UA-W11`, `next_window UA-W13`,
  `may_start_successor: false`
- `A6` — `frontend/docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` (EV-UA-A-065
  is the assignment record that froze the mechanical consequences transcribed in §0)

Standards:

- Parent standard:
  `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md`
  revision `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848`
- Sub-window standard:
  `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md`
  revision `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0`

---

## 0. Parent-frozen mechanical consequences (encoded verbatim)

The following is transcribed verbatim from `A6` evidence `EV-UA-A-065`
(`parent_frozen_mechanical_consequences`), written by the parent at assignment
`ASG-UA-W12-01`. It is authoritative and is NOT reopened by this decomposition.
Any phrase or choice in this decomposition that would contradict these lines is
void; the consequence lines win.

> 1. FILE sub-window IDs start at UA-W12-S001. A zero-edit in-scope file gets no
>    FILE sub-window and does not consume an S-number. Do not retire S001/S002
>    unused. Sequential DAG, no parallel waves: S001
>    `frontend/components/keyword-intelligence/research-dashboard.tsx` → S002
>    `frontend/components/keyword-intelligence/selection-review.tsx` → S003
>    `frontend/test/uphunt-aesthetic-w12.test.ts` → UA-W12-I001.
>    `frontend/app/keywords/[researchId]/page.tsx` is in-scope but zero-edit
>    (`a46b89bc…`); it consumes no S-number.
> 2. Zero-edit preserved (G6 pins, no FILE leaf): `frontend/app/keywords/[researchId]/page.tsx`
>    `a46b89bc…`; `frontend/components/section-intro.tsx` `159096f3…`;
>    `frontend/components/keyword-intelligence/chart-panels.tsx` `5bf17d06…`;
>    `frontend/components/keyword-intelligence/keyword-dashboard.module.css`
>    `d416ece7…`; `frontend/app/globals.css` `4cf7a1fc…`;
>    `frontend/components/traffic-enrichment.tsx` `1a903788…`;
>    `frontend/components/lead-details.tsx` `9431f71b…`;
>    `frontend/test/lead-details-component.test.ts` `ca1d02c3…`;
>    `frontend/test/uphunt-aesthetic-w11.test.ts` `40e31788…`;
>    `frontend/test/uphunt-aesthetic-w10.test.ts` `0a2b34e6…`;
>    `frontend/test/uphunt-aesthetic-w9.test.ts` `baee1b2e…`;
>    `frontend/test/uphunt-aesthetic-w8.test.ts` `cab15f7f…`;
>    `frontend/test/uphunt-aesthetic-w7.test.ts` `92201c35…`;
>    `frontend/test/uphunt-aesthetic-w6.test.ts` `f78b8da2…`;
>    `frontend/test/uphunt-aesthetic-w5.test.ts` `ee6425e9…`;
>    `frontend/test/uphunt-aesthetic-w4.test.ts` `8008501d…`;
>    `frontend/test/uphunt-aesthetic-w3.test.ts` `635e2802…`;
>    `frontend/test/uphunt-aesthetic-w2.test.ts` `f65ba0c5…`;
>    `frontend/test/fixtures.ts` `9ea26525…`;
>    `frontend/test/uphunt-aesthetic-coverage.test.ts` `f5137be4…`. Do not edit
>    chart child order, ChartPanels wiring, filter/save/finalize handlers, or W11
>    traffic/crux product files.
> 3. S001 JSX (starting `806eaf59…` → ending `39367648…`, numstat 17/4):
>    Hunk 1 insert `import { SectionIntro } from "@/components/section-intro";`
>    immediately after `import { SummaryCards } from "./summary-cards";`.
>    Hunk 2 after the closing `</div>` of `{phase !== "empty" && (` filterDock
>    block and before `{saveError && (`, insert `{result && (` LF
>    `  <section aria-label="Keyword research introduction">` LF
>    `    <SectionIntro` LF `      eyebrow="Keyword intelligence"` LF
>    `      title="The landscape behind this market."` LF
>    `      copy="Active phrases, recommended targets, and the clusters that hold the demand."`
>    LF `    />` LF `  </section>` LF `)}` (DEC-UA-003 exact strings including
>    periods). Keep filterDock sticky position and all filter/save/finalize/export
>    handlers byte-identical. Hunk 3 replace the non-empty branch opener `) : (`
>    LF `        <>` LF `          <div className={styles.marketContext}` with
>    `) : (` LF `        <section aria-label="Keyword research results">` LF
>    `          <div className={styles.marketContext}` and replace the matching
>    closer `</SummaryCards>` LF `        </>` LF `      )}` with
>    `</SummaryCards>` LF `        </section>` LF `      )}` (stacked section
>    wrapper; chart/grid child order inside SummaryCards/ChartPanels unchanged).
>    Hunk 4 wrap the existing `dashboardFlow` div: replace
>    `<div className={styles.dashboardFlow}>` with
>    `<section aria-label="Keyword charts and table">` LF
>    `                      <div className={styles.dashboardFlow}>` and replace
>    the matching `</div>` LF `                    </div>` LF `                  </>`
>    before `)}` LF `              </ChartPanels>` with `</div>` LF
>    `                    </section>` LF `                  </>` (one additional
>    stacked section around the chart/table flow only; do not reorder
>    `charts.seedPerformance`, `ClusterLandscape`, `decisionGrid`,
>    `analysisCharts`, or `KeywordTable` siblings).
> 4. S002 attribute only, one unique hunk, starting `selection-review.tsx`
>    `5550dffa…`. Ending digest `87b7232b…`. Numstat 1 0. On the outer
>    `<section className={`${styles.seedCard} ${styles.selectionPanel}`} aria-label="Selection review">`,
>    add `data-surface="surface:selection-review-panel"` before the closing `>`.
>    Do not change the h2 `Recommended keywords, ready for your final edit.`,
>    finalize/save handlers, or chip UI.
> 5. CREATE `test/uphunt-aesthetic-w12.test.ts` with exactly two tests
>    CASE-UA-W12-001/002. Import `recordExecuted` from
>    `./uphunt-aesthetic-coverage.test.ts` the same way as the w6 test file. Read
>    `research-dashboard.tsx` source only (unit tests, not render). 001: file
>    contains `The landscape behind this market.`, `Keyword intelligence`, and
>    `Active phrases, recommended targets, and the clusters that hold the demand.`
>    002: file contains `import { SectionIntro } from "@/components/section-intro";`.
>    `recordExecuted` after assertions. No third test. Parent fence digest
>    `83eca3de…` (§7.3 non-behavioral formatting freedom applies; S1 must freeze
>    deterministic bytes).
> 6. Last FILE leaf (S003) from ABSENT `test/.ua-executed.json` expects exactly 4
>    IDs (2 × W1 re-executions + CASE-UA-W12-001/002), set digest
>    `8bc38aad…`. The 33-ID set `{2 × W1} ∪ {4 × W2} ∪ {4 × W3} ∪ {2 × W4} ∪
>    {2 × W5} ∪ {3 × W6} ∪ {2 × W7} ∪ {3 × W8} ∪ {4 × W9} ∪ {3 × W10} ∪ {2 × W11}
>    ∪ {2 × W12}` is asserted only at I001 G5 after `npm test`, digest
>    `cf0e61ac…`. Do not require W2–W11 IDs at the w12-only test command.
>    `test/.ua-executed.json` is TRACKED at HEAD (31-ID content
>    `7f4bd402…`, set digest `aa120e83…`); never commit it.
> 7. I001 G1 is DEC-UA-016: from `frontend/`, `npm test`. Expected 201 tests /
>    198 pass / 3 fail (199 predecessor + 2 W12 cases). PASS iff allocated UA
>    CASE tests pass and every failing title, if any, is exactly the three named
>    heading-oracle titles; process exit 1 is expected and is not G1 FAIL when
>    that holds. G2 DEC-UA-014 needles are `research-dashboard.tsx`,
>    `selection-review.tsx`, `uphunt-aesthetic-w12.test.ts` (`globals.css` and
>    `keyword-dashboard.module.css` are not in write scope). G3 `npm run lint`
>    when JSX owned. G4 `browser_evidence` false for UA-W12 (no screenshots).
>    Window-local case set digest `2956f820…`. Planned-file-set digest
>    `49cff36a…`.
> 8. Do not start UA-W13. Do not edit `chart-panels.tsx`,
>    `keyword-dashboard.module.css`, `summary-cards.tsx`, `filter-bar.tsx`,
>    `keyword-table.tsx`, `cluster-landscape.tsx`, `globals.css`,
>    `section-intro.tsx`, `lead-details.tsx`, `traffic-enrichment.tsx`, W2–W11
>    test files, `lead-details-component.test.ts`, REQUIRED_CASE_IDS, parked
>    files, or `design-system-shell.test.ts`. After parent accepts this
>    decomposition, identity UA-W12-WINDOW-AGENT executes then personally reviews
>    each FILE leaf in the same turn, then itself assigns the next S-number, then
>    personally runs I001, then hands off (DEC-UA-015). This assignment does not
>    execute S001. Do not write into S1 §0 any of: "parent issues the next leaf",
>    "stop at AWAITING_WINDOW_REVIEW before S00n", "stop for parent after this
>    leaf".

---

## 1. Authority and revision pins

| Pin | Value | Verified |
|---|---|---|
| parent_window_id | `UA-W12` | A5 |
| parent_assignment_id | `ASG-UA-W12-01` | A5 `current_assignment_id`; EV-UA-A-065 |
| window_agent_identity | `UA-W12-WINDOW-AGENT` | A5 `assigned_agent` |
| delegated_authority | decompose UA-W12; write S1/S2/S3; append S3 and A6 | A5 `authorized_actions` |
| FILE-leaf execution authority | none at decomposition time | A5 `prohibited_actions: execute_UA-W12_FILE_leaves` |
| parent-standard revision | `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` | recomputed MATCH |
| subwindow-standard revision | `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` | recomputed MATCH |
| A1 revision | `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827` | recomputed MATCH |
| A3 revision | `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3` | recomputed MATCH |
| A4 revision | `1edc1bc7a9d7f46a62a4f88ec74e5e468e1c1d17395b9b1aa0b810ce308e8aab` | recomputed MATCH |
| A5 state_version / digest | 27 / `6ccc1ce226145c7e016e0bddb97fe4a7f76a42feabc0d323f59fb302b032a229` | recomputed MATCH |
| may_start_successor | false | A5 |
| next window | `UA-W13` (reserved for parent) | A5 |
| stop_after | `UA-W15` | A5 |

Evidence: `S3` `EV-UA-W12-D-001`.

## 2. Parent-window scope and exclusions

`authorized_write_scope` (A5; in-scope):

- `frontend/app/keywords/[researchId]/page.tsx` — in-scope but **zero-edit**
  (`a46b89bc…`); no FILE leaf, consumes no S-number.
- `frontend/components/keyword-intelligence/research-dashboard.tsx` — S001.
- `frontend/components/keyword-intelligence/selection-review.tsx` — S002.
- `frontend/test/uphunt-aesthetic-w12.test.ts` — S003.

`read_only_scope` (A5 / A4 F1): `frontend/components/section-intro.tsx`,
`frontend/components/keyword-intelligence/chart-panels.tsx`.

Exclusions / prohibited (A5 `prohibited_actions` + consequence 8):

- do not start UA-W13;
- do not edit `chart-panels.tsx`, `keyword-dashboard.module.css`,
  `summary-cards.tsx`, `filter-bar.tsx`, `keyword-table.tsx`,
  `cluster-landscape.tsx`, `globals.css`, `section-intro.tsx`,
  `lead-details.tsx`, `traffic-enrichment.tsx`, W2–W11 test files,
  `lead-details-component.test.ts`, `REQUIRED_CASE_IDS`, parked files, or
  `design-system-shell.test.ts`;
- no AWS, commit, push, production, paid provider, `email_scraper` edit, or root
  `ACTIVE_EXECUTION_STATE.md` edit;
- no chart child reorder, ChartPanels wiring change, filter/save/finalize handler
  change, copy paraphrase, or Chart.js dataset edit.

Scope-locked decisions governing UA-W12 (from A3): DEC-UA-003 (headline copy,
`/keywords/[researchId] result` string set), DEC-UA-005 item 1 (page SectionIntro
only; chart reorder is deferred to UA-W13), DEC-UA-015 (window agent executes and
reviews its own FILE leaves; movement between FILE leaves is internal), DEC-UA-016
(npm test oracle from UA-W6 onward), REQ-UA-003 (keyword result is not a
dashboard), INV-UA-010 (keep `data-surface` values and Chart.js datasets; only
layout/type/wrap-height change).

## 3. Starting working-tree inventory

Recording does not modify the tree. From `frontend/`, `git status --short` at
window start (window-agent capture, `S3` `EV-UA-W12-D-001`):

```
 M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml
 M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md
```

Coordination root (`/home/harit/Email Scrapper`) `git status --short`: clean (no
output). Protected pre-existing changed set (parent-owned A5/A6) set digest
`be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a`.

Planned implementation files:

- `frontend/components/keyword-intelligence/research-dashboard.tsx`: exists,
  digest `806eaf59032d99b81e621cd77bfedd0e3dd9f1483ecd2df40d80d5ac4427fee9`, not
  dirty at window start (MODIFY by S001).
- `frontend/components/keyword-intelligence/selection-review.tsx`: exists,
  digest `5550dffa70db24bc923c2ba405cefaa568e29a7bbb281bac261429cf049a3ae2`, not
  dirty at window start (MODIFY by S002).
- `frontend/test/uphunt-aesthetic-w12.test.ts`: **ABSENT** (CREATE by S003).

Zero-edit / preserved pins (must remain byte-identical; verified in `S3`
`EV-UA-W12-D-001`): `page.tsx a46b89bc…`, `section-intro.tsx 159096f3…`,
`chart-panels.tsx 5bf17d06…`, `keyword-dashboard.module.css d416ece7…`,
`globals.css 4cf7a1fc…`, `traffic-enrichment.tsx 1a903788…`,
`lead-details.tsx 9431f71b…`, `lead-details-component.test.ts ca1d02c3…`,
w2–w11 test files and `fixtures.ts`, `uphunt-aesthetic-coverage.test.ts
f5137be4…`.

Runtime artifact: `frontend/test/.ua-executed.json` is TRACKED at HEAD, digested
`7f4bd402bbe152f799ef376042e0dd8d71828d3d8885b5fc85113f2cfd967714` (31-ID,
set digest `aa120e83587fd9792542c07dc606b0dcc50f66e8f8c45d3857ec8a0c162c671f`).
It is a DEC-UA-011 runtime residue; never commit it. It is not an implementation
file and is excluded from the single-file attribution (documented residue).

## 4. Initial single-file dependency DAG

```text
UA-W12-S001 (research-dashboard.tsx)
    └──> UA-W12-S002 (selection-review.tsx)
            └──> UA-W12-S003 (uphunt-aesthetic-w12.test.ts)
                    └──> UA-W12-I001 (whole-window integration assessment, window agent)
```

Sequential only. No parallel wave (parent froze: "no parallel waves"). Acyclic.

Edge justification:

- `S001 -> S002`: S002 writes a different file and reads nothing from S001. The
  edge exists solely because the parent froze the order (consequence 1). No
  interface is consumed across the edge — both are independent single-file JSX
  edits; ordering is parent-mandated, not data-dependency.
- `S002 -> S003`: S003 is the test that reads `research-dashboard.tsx`
  (produced by S001) but does not read `selection-review.tsx`. Ordering is
  parent-mandated; no mutable resource overlap. S003 must be last so the isolated
  ABSENT-json run (4-ID) and the post-G1 33-ID set are measured only after both
  product files exist.
- `S003 -> I001`: I001 consumes all three files and cannot begin before S003.

## 5. Initial implementation sub-windows

### UA-W12-S001

```yaml
subwindow_id: UA-W12-S001
type: FILE
parent_window_id: UA-W12
parent_assignment_id: ASG-UA-W12-01
assigned_agent: UA-W12-WINDOW-AGENT
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/keyword-intelligence/research-dashboard.tsx
file_operation: MODIFY
starting_file_digest: 806eaf59032d99b81e621cd77bfedd0e3dd9f1483ecd2df40d80d5ac4427fee9
starting_repository_change_set_digest: be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a
read_only_scope:
  - frontend/components/section-intro.tsx
  - frontend/components/keyword-intelligence/chart-panels.tsx
  - frontend/components/keyword-intelligence/summary-cards.tsx
authorized_actions:
  - modify_research_dashboard_jsx
  - run_frontend_test
prohibited_actions:
  - reorder_chart_children
  - edit_filter_save_finalize_handlers
  - edit_chart_panels
  - edit_chart_dataset_math
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: REQ-UA-002 + REQ-UA-003 (page/result headline recipe and stacked
document wrapper), DEC-UA-003 (copy strings), DEC-UA-005 item 1 (intro only; no
reorder), INV-UA-010 (no dataset/data-surface change beyond the added
`data-surface="surface:selection-review-panel"` is S002, not here). Allocate
CASE-UA-W12-001 / CASE-UA-W12-002 to S003 (their producing code lives here).

Exact file transformation (four ordered hunks, parent-frozen):

1. **Hunk 1 (import).** Insert the single line
   `import { SectionIntro } from "@/components/section-intro";` immediately after
   the existing line `import { SummaryCards } from "./summary-cards";` and before
   `import { TrafficMarketExplorer } from "../traffic-globe";`. No other import
   changes.

2. **Hunk 2 (page intro).** After the closing `</div>` of the
   `{phase !== "empty" && (` filterDock block and before `{saveError && (`,
   insert, at 6-space base indentation matching the sibling
   `{saveError && (`:

   ```jsx
      {result && (
        <section aria-label="Keyword research introduction">
          <SectionIntro
            eyebrow="Keyword intelligence"
            title="The landscape behind this market."
            copy="Active phrases, recommended targets, and the clusters that hold the demand."
          />
        </section>
      )}
   ```

   Keep filterDock's sticky position and every filter/save/finalize/export
   handler byte-identical. The strings are DEC-UA-003 exact (trailing periods
   included).

3. **Hunk 3 (results section wrapper).** Replace the non-empty branch opener
   `) : (` / `        <>` / `          <div className={styles.marketContext}`
   with `) : (` / `        <section aria-label="Keyword research results">` /
   `          <div className={styles.marketContext}`. Replace the matching closer
   `          </SummaryCards>` / `        </>` / `      )}` with
   `          </SummaryCards>` / `        </section>` / `      )}`. This wraps
   `marketContext` through `SummaryCards` in one stacked section. Chart/grid
   child order inside `SummaryCards`/`ChartPanels` is unchanged.

4. **Hunk 4 (charts section wrapper).** Wrap the existing `dashboardFlow` div in
   one additional stacked section. Replace
   `                    <div className={styles.dashboardFlow}>` with
   `                    <section aria-label="Keyword charts and table">` +
   `                      <div className={styles.dashboardFlow}>`, and add a
   closing `                    </section>` after the `dashboardFlow` div close
   and before the fragment `</>` that precedes `)}` / `</ChartPanels>`.

   The resulting nested structure (semantically authoritative) is:

   ```jsx
   <section aria-label="Keyword charts and table">
     <div className={styles.dashboardFlow}>
       {charts.seedPerformance}
       <ClusterLandscape … />
       {summary.marketOverview(charts.overviewSignals)}
       <section className={styles.decisionGrid} aria-label="Decision summary">
         {summary.overlapPanel}
         {charts.historyPanel}
       </section>
       {charts.analysisCharts}
       <div data-surface="surface:keyword-table">
         <KeywordTable … />
       </div>
     </div>
   </section>
   ```

   Do not reorder `charts.seedPerformance`, `ClusterLandscape`, `decisionGrid`,
   `analysisCharts`, or `KeywordTable` siblings.

Expected result / completion oracle (parent-frozen, conclusive):

- ending file digest `3936764824ed80346be54fac256a0b7c6dbc78bb9fd8235a2d3705c3869f9e63`
- `git diff --numstat` on the writable file `17 4`
- balances hold: `<section` count `====` `</section>` count, `<div` count `====`
  `</div>` count, fragment `<>`/`</>` count 1 each (JSX valid).

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 of `frontend/components/keyword-intelligence/research-dashboard.tsx`
  equals `3936764824ed80346be54fac256a0b7c6dbc78bb9fd8235a2d3705c3869f9e63`.
- `V1b` `git diff --numstat -- frontend/components/keyword-intelligence/research-dashboard.tsx`
  reports `17 4`.
- `V1c` the file parses as JSX/TSX (no syntax error; balanced section/div).
- `V1d` invariant checks: `grep -c "aria-label=\"Keyword research introduction\""`
  => 1; `grep -c "aria-label=\"Keyword research results\""` => 1;
  `grep -c "aria-label=\"Keyword charts and table\""` => 1;
  `grep -c "The landscape behind this market\."` => 1; `grep -c
  "import { SectionIntro } from \"@/components/section-intro\";"` => 1.
- `V2` attributable changed-file set is exactly `{frontend/components/keyword-intelligence/research-dashboard.tsx}`.
- `V3` required local coverage IDs = registered = executed = `[]` (no ownership
  case; CASE-UA-W12-001/002 belong to S003). Zero skips/duplicates/unexpected.
- `V4` protected zero-edit pins remain byte-identical (page.tsx, section-intro,
  chart-panels, module.css, globals, traffic-enrichment, lead-details,
  lead-details-component.test.ts, w2–w11 tests, fixtures, coverage file).

Check classification: `V1a`–`V1d`, `V2`–`V4` LOCAL_NOW. G1/G2/G3/G5/G6 are
DEFERRED_TO_INTEGRATION (I001). **§7.3 non-behavioral formatting freedom**: the
JSX structure, exact strings, and anchor placement above are authoritative; only
whitespace/line-wrap may vary, and any variance MUST still produce the pinned
ending digest. The frozen ending digest is the deterministic completion oracle.

Completed-file checklist evidence: `S3` `EV-UA-W12-D-004`.

### UA-W12-S002

```yaml
subwindow_id: UA-W12-S002
type: FILE
parent_window_id: UA-W12
parent_assignment_id: ASG-UA-W12-01
assigned_agent: UA-W12-WINDOW-AGENT
predecessors: [UA-W12-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/keyword-intelligence/selection-review.tsx
file_operation: MODIFY
starting_file_digest: 5550dffa70db24bc923c2ba405cefaa568e29a7bbb281bac261429cf049a3ae2
starting_repository_change_set_digest: be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a
read_only_scope:
  - frontend/components/keyword-intelligence/research-dashboard.tsx
authorized_actions:
  - modify_selection_review_attribute
prohibited_actions:
  - edit_h2_title
  - edit_finalize_save_handlers
  - edit_chip_ui
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: INV-UA-010 (keep `data-surface` values; add the specific new
value), DEC-UA-005 item 1 (selection review stays, H2 unchanged), REQ-UA-005
(presentation-only). No coverage case is owned by S002 (CASE-UA-W12-001/002 read
`research-dashboard.tsx`, not `selection-review.tsx`).

Exact file transformation (one hunk, parent-frozen): on the outer
`<section className={`${styles.seedCard} ${styles.selectionPanel}`} aria-label="Selection review">`,
add `data-surface="surface:selection-review-panel"` before the closing `>`. The
same-line form is a single logical addition producing numstat 1 0: a new
attribute line between `aria-label="Selection review"` and the closing `>`:

```jsx
    <section
      className={`${styles.seedCard} ${styles.selectionPanel}`}
      aria-label="Selection review"
      data-surface="surface:selection-review-panel"
    >
```

Expected result / completion oracle (parent-frozen, verified in this
decomposition — see `S3` `EV-UA-W12-D-003`):

- ending file digest `87b7232ba7cbe77a2378107ab63cffc2ff7d89007d8f108d44e9e1048fc99807`
- `git diff --numstat` on the writable file `1 0`
- h2 `Recommended keywords, ready for your final edit.` unchanged; finalize/save
  handlers and chip UI unchanged.

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 equals `87b7232ba7cbe77a2378107ab63cffc2ff7d89007d8f108d44e9e1048fc99807`.
- `V1b` numstat `1 0`.
- `V1c` `grep -c "data-surface=\"surface:selection-review-panel\""` => 1;
  `grep -c "Recommended keywords, ready for your final edit\."` => 1.
- `V2` attributable changed-file set is exactly `{frontend/components/keyword-intelligence/selection-review.tsx}`.
- `V3` required local coverage IDs = registered = executed = `[]`.
- `V4` zero-edit pins unchanged.

Classification: V1–V4 LOCAL_NOW; G1/G2/G3/G5/G6 DEFERRED_TO_INTEGRATION.

### UA-W12-S003

```yaml
subwindow_id: UA-W12-S003
type: FILE
parent_window_id: UA-W12
parent_assignment_id: ASG-UA-W12-01
assigned_agent: UA-W12-WINDOW-AGENT
predecessors: [UA-W12-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w12.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a
read_only_scope:
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/test/uphunt-aesthetic-coverage.test.ts
  - frontend/test/uphunt-aesthetic-w6.test.ts
authorized_actions:
  - create_w12_test
  - run_coverage_and_w12_tests
  - run_frontend_test
prohibited_actions:
  - add_third_test
  - edit_revisions_or_REQUIRED_CASE_IDS
  - edit_research_dashboard
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: DEC-UA-011 (recordExecuted contract; one test() per allocated
CASE ID; recordExecuted after the activation witness and oracle), CASE-UA-W12-001
(SCN-UA-004, activation witness `research-dashboard.tsx` title string,
expected result `The landscape behind this market.`, parity unit), CASE-UA-W12-002
(SCN-UA-004, activation witness `research-dashboard.tsx` SectionIntro import,
parity unit). No third test.

Exact file transformation (CREATE, parent-frozen semantics): a `node:test` unit
file that reads `research-dashboard.tsx` source only (not rendered) and defines
exactly two `test()` blocks, modelled on `test/uphunt-aesthetic-w6.test.ts`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const researchDashboard = await readFile(
  new URL("../components/keyword-intelligence/research-dashboard.tsx", import.meta.url),
  "utf8",
);

test("CASE-UA-W12-001 research dashboard result page intro", () => {
  assert.match(researchDashboard, /Keyword intelligence/u);
  assert.match(researchDashboard, /The landscape behind this market\./u);
  assert.match(
    researchDashboard,
    /Active phrases, recommended targets, and the clusters that hold the demand\./u,
  );
  recordExecuted("CASE-UA-W12-001");
});

test("CASE-UA-W12-002 research dashboard SectionIntro import", () => {
  assert.match(
    researchDashboard,
    /import \{ SectionIntro \} from "@\/components\/section-intro";/u,
  );
  recordExecuted("CASE-UA-W12-002");
});
```

Expected result / completion oracle (parent-frozen):

- the file byte-hashes to `83eca3de54c7def4321aa4722928b791038d98449f72a6cb5e568d7f68c0f30d0`
  (parent fence digest). The exact test titles and whitespace are non-behavioral
  formatting freedom (§7.3), but the frozen digest is the deterministic
  completion oracle; the executor reproduces the frozen bytes (any aesthetic
  variance must still hash to this value and must contain exactly two `test()`
  blocks with the exact assertions and `recordExecuted` calls above).

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 equals `83eca3de54c7def4321aa4722928b791038d98449f72a6cb5e568d7f68c0f30d0`.
- `V1b` exactly two `test(` blocks; `grep -c "recordExecuted("` => 2.
- `V1c` assertions: `grep -c "The landscape behind this market\."` >= 1;
  `grep -c "Keyword intelligence"` >= 1;
  `grep -c "Active phrases, recommended targets, and the clusters that hold the demand\."` >= 1;
  `grep -c "import { SectionIntro } from \"@/components/section-intro\";"` >= 1.
- `V1d` isolated execution from ABSENT executed-set:
  `rm -f test/.ua-executed.json && node --experimental-strip-types --test test/uphunt-aesthetic-coverage.test.ts test/uphunt-aesthetic-w12.test.ts`
  → exits 0; `test/.ua-executed.json` contains exactly the 4 IDs
  `{CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W12-001, CASE-UA-W12-002}`; set
  digest `8bc38aad6abdde959247deb61e19e8d99fa0887879d65ea5daf15cfad1677f2f`.
  Do NOT require W2–W11 IDs here.
- `V1e` `V1d` violation check: the two CASE-UA-W12 tests each pass (no skipped,
  filtered, or duplicated case); the only executing case set is the 4 IDs above.
- `V2` attributable implementation-file set is exactly
  `{frontend/test/uphunt-aesthetic-w12.test.ts}`. The `test/.ua-executed.json`
  mutation is the DEC-UA-011-registered runtime residue (tracked at HEAD, never
  commit) and is reported as documented residual, not an implementation edit.
- `V3` required local coverage IDs = registered = executed = `{CASE-UA-W12-001, CASE-UA-W12-002}`,
  zero skips/duplicates/unexpected, plus the two W1 registry re-executions.
- `V4` zero-edit pins unchanged.

Classification: V1a–V1e, V2, V3, V4 LOCAL_NOW; G1/G5 (33-ID) and G2/G3/G6
DEFERRED_TO_INTEGRATION. After `V1d`, run `npm test` is NOT part of this leaf
(it belongs to I001 G1); but G5's 33-ID assertion is explicitly I001-only.

## 6. Allocation of requirements, decisions, interfaces, and coverage cases

| Requirement | Decision | File / sub-window | Assertion (executable) |
|---|---|---|---|
| REQ-UA-002, REQ-UA-003 | DEC-UA-003, DEC-UA-005 item 1 | S001 `research-dashboard.tsx` | CASE-UA-W12-001 (`The landscape behind this market.` + `Keyword intelligence` + copy) via S003; JSX structure |
| REQ-UA-003 (stacked, not dashboard) | DEC-UA-005 item 1 | S001 `research-dashboard.tsx` | results and charts section wrappers present |
| INV-UA-010 (data-surface preserved) | DEC-UA-009 | S002 `selection-review.tsx` | `data-surface="surface:selection-review-panel"` present; existing `data-surface` values unchanged |
| REQ-UA-005 (presentation-only) | DEC-UA-006, DEC-UA-015 | all | forbidden-path negative search at I001 G6 |
| CASE-UA-W12-001 | SCN-UA-004 | S003 (reads S001 output) | digest-complete test |
| CASE-UA-W12-002 | SCN-UA-004 | S003 (reads S001 output) | digest-complete test |

Cross-file interfaces: no new public interface is introduced by UA-W12. The
`data-surface="surface:selection-review-panel"` attribute and the
`<section aria-label="Keyword research introduction|results|charts and table">`
wrappers are presentation-only and are consumed solely by S003's source-text
assertions. No imported/exported name changes.

Coverage allocation: CASE-UA-W12-001/002 → `uphunt-aesthetic-w12.test.ts`
(S003). No other window-local case. REQUIRED_CASE_IDS is never edited.

## 7. Verification gates

### 7.1 File-local gates (LOCAL_NOW per sub-window)

Enumerated in each sub-window block above (`V1a`–`V4`). Each FILE leaf's local
gate proves its own file digest, numstat, attributable single-file change set,
and (for S003) the isolated 4-ID executed-set.

### 7.2 Whole-window integration assessment `UA-W12-I001`

Author of assessment: `UA-W12-WINDOW-AGENT` (personally; not delegated).
`authorized_write_file: NONE` for implementation files during I001. Initial
assessment block is fully authored here; frozen source revision and executed
evidence refs are filled from the completed sub-windows at I001 run time.

```yaml
subwindow_id: UA-W12-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W12
parent_assignment_id: ASG-UA-W12-01
assigned_agent: WINDOW-AGENT
authorized_write_file: NONE
read_only_scope:
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/components/keyword-intelligence/selection-review.tsx
  - frontend/test/uphunt-aesthetic-w12.test.ts
may_start_successor: false
```

Expected assembled changed-file set (parent-authorized scope):

- `frontend/components/keyword-intelligence/research-dashboard.tsx` (S001)
- `frontend/components/keyword-intelligence/selection-review.tsx` (S002)
- `frontend/test/uphunt-aesthetic-w12.test.ts` (S003)

Planned-file-set digest `49cff36ab4e7adc0439d7e6436d3a974b70cbf2998f303eacd778f116e39bd92`
(verified in this decomposition, `S3` `EV-UA-W12-D-002`).

Frozen gates (from `frontend/`):

- **G0** Recompute and confirm parent-visible pins: A1 `57fa49c7…`, A3
  `094bc8bf…`, A4 `1edc1bc7…`, A5 state_version 27 `6ccc1ce2…`, subwindow
  standard `842c2955…`. Confirm predecessor UA-W11 pins (lead-details
  `9431f71b…`, w11 `40e31788…`) present.
- **G1** `npm test` per DEC-UA-016. Expected `201` tests, `198` pass, `3` fail.
  PASS iff the allocated UA CASE tests (CASE-UA-W12-001/002) pass AND every
  failing title is exactly a member of the three heading-oracle titles
  (`My searches presents keyword research and identifiable run dossiers without
  rendering IDs`, `MRR-FE-01 exact research payload and two-section surface`,
  `MRR-W2 frontend unit certificate`). Process exit 1 is expected and is NOT G1
  FAIL when those conditions hold.
- **G2** DEC-UA-014: from `frontend/`, `npx tsc --noEmit --pretty false`. PASS iff
  zero diagnostics name a path in the UA-W12 `authorized_write_scope` needles:
  `research-dashboard.tsx`, `selection-review.tsx`,
  `uphunt-aesthetic-w12.test.ts` (`globals.css` and
  `keyword-dashboard.module.css` are not needles). The ten parked SRC-UA-0092
  diagnostics are not a PASS condition and are not to be "fixed".
- **G3** `npm run lint` when CSS/JSX is owned (JSX owned here). PASS: exit 0.
- **G4** `browser_evidence` false for UA-W12 → N/A, no screenshots.
- **G5** Coverage: window-local case set digest `2956f82027ffb1acad77613eb23af4f22df96ba168e29de77cede5242685efd8`
  (CASE-UA-W12-001/002). After `npm test`,
  `test/.ua-executed.json` must equal the 33-ID set (digest
  `cf0e61acc57d90a55d9738018f214a574b97a72a26bcbce9e81c2792751935e4`) with
  required = registered = executed, zero skips/duplicates/unexpected IDs, and
  no missing activation witnesses. Full 43-set equality remains UA-W15-V5.
- **G6** Forbidden-path negative search: `git diff --name-only HEAD` scope of the
  UA-W12 delta ⊂ UA-W12 `authorized_write_scope` plus the documented
  `.ua-executed.json` residue; zero hits among DEC-UA-006 paths
  (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`,
  `email_scraper`), root `ACTIVE_EXECUTION_STATE.md`, `chart-panels.tsx`,
  `keyword-dashboard.module.css`, `globals.css`, traffic/crux files,
  `lead-details.tsx`, `lead-details-component.test.ts`, W2–W11 test files,
  `REQUIRED_CASE_IDS`, parked files. All zero-edit pins byte-identical.
- **G7** No new network/DB operation: imports of the changed product files and
  the new test are source-read only; 0 network, 0 DB.
- **G8** Negative controls: (a) removing `data-surface="surface:selection-review-panel"`
  or (b) removing one SectionIntro wrapper string must make CASE-UA-W12-001/002
  fail; (c) a forbidden path in the diff must fail G6. Record falsification.
- **G9** Negative search: no UA-W13 artifact, no `run`/`keyword`-dashboard
  `keyword-dashboard.module.css`/`chart-panels.tsx` edit, no successor parent
  window, no commit/push/AWS/paid-provider/production action, `A5` unchanged
  until the authorized handoff action.

Oracle outcomes: PASS, CORRECTION_REQUIRED, or PARENT_BLOCKED. A correction
requires a new single-file `UA-W12-C00n` and a new `UA-W12-I002`; no direct file
repair by the window agent.

## 8. Correction and re-assessment rules

- Corrections are append-only `UA-W12-C001`, `UA-W12-C002`, …; never reuse an
  initial/assessment/assignment/evidence ID.
- A correction owns exactly one file and cites the failed evidence, root cause,
  governing requirement/decision, the sub-window it corrects, and the checks it
  invalidates.
- The window agent never edits an implementation file during review; every fix is
  a new corrective sub-window (standard §8 item 2).
- After the last correction, a new whole-window assessment `UA-W12-I002` is
  required; leaf test results cannot substitute.
- Do not weaken an accepted oracle; do not repair a parent-level ambiguity by
  guessing (escalate as PARENT_BLOCKED).
- If the correction needs a new parent decision or expands parent scope, do not
  author a corrective sub-window; escalate.

## 9. Intermediate-state contracts

| Edge | After producer | Local checks that must pass | Expected temporary result | Safety | Resolver | Prohibited while state exists |
|---|---|---|---|---|---|---|
| S001 → S002 | S001 edits `research-dashboard.tsx` only | G1 `npm test` (no new test yet) under DEC-UA-016: 199/196/3 exit 1 (three heading-oracle only); G2/tsc 0 needles on `research-dashboard.tsx`; numstat 17/4; digest 39367648 | G1 passes with exactly the three heading-oracle fails; no unexpected failure | No existing test reads `research-dashboard.tsx`; presentation-only JSX; change is not externally visible (no route/DOM assertion in the suite) | S003 creates the w12 test that reads it | do not reorder charts; do not edit the module css; do not begin S002 before the S001 review |
| S002 → S003 | S002 edits `selection-review.tsx` only | G1 199/196/3 exit 1; G2 0 needles on `selection-review.tsx`; numstat 1 0; digest 87b7232b | G1 unchanged except heading-oracle | No existing test reads `selection-review.tsx`; attribute-only; not externally visible to the suite | S003 | do not edit the h2/handlers/chip UI; do not begin S003 before the S002 review |
| S003 → I001 | S003 creates the w12 test | V1d isolated 4-ID run exits 0; 4-ID digest 8bc38aad; digest 83eca3de | G1 now 201/198/3; the two CASE-UA-W12 tests pass | w12 test is source-text-only; no navigation, no network | I001 runs G1/G5/G6 | do not begin UA-W13; do not run a whole-window assessment from leaf summaries alone |

## 10. Mandatory decomposition-readiness checkboxes

Evidence references resolve to `S3` evidence IDs. `N/A` rows cite a verified
non-applicability. Marked `[x]` by the window agent after verification in this
decomposition; `AWAITING_PARENT_DECOMPOSITION_REVIEW` is set in `S2`.

### 11.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA-W12-D-001
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA-W12-D-001
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA-W12-D-001 (§2)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA-W12-D-001 (§3)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA-W12-D-001 (§ ~top/S2/S3)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA-W12-D-001 (identity UA-W12-WINDOW-AGENT executes + reviews; no lower subagent)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: A5 `execution_environment_policy`; EV-UA-W12-D-001

### 11.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA-W12-D-001, §6
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA-W12-D-001, §0 (no reopened consequence)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA-W12-D-002 (3-file digest 49cff36a matches parent frozen)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: §5 (S001/S002/S003 one file each)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: §5 blocks; EV-UA-W12-D-003/004/005
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: §4 (§9); no parallel wave (parent-frozen)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: §6 (only presentation `data-surface`/aria wrappers; consumed by S003 source-text assertions, all frozen in S001/S002)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: §9
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: S001/S002 (production) and S003 (test) are separate sub-windows; no fixture/schema/config edit
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: only per-file `node --test`/`sha256sum`/`git diff` runs; S003's isolated run mutates only `.ua-executed.json` (DEC-UA-011 runtime residue) plus the test file

### 11.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7. Evidence: §5 blocks
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: §5 S001/S002/S003 exact hunks/bytes
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: §5 checks
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: §5 V2
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: §5, §11.6
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: §11.6; DEC-UA-015 (single identity)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: §5 (each file-local acceptance is self-contained; G1-with-heading-oracle is a predecessor baseline, not successor work)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: §5 (G1/G2/G3/G5/G6/G8 → UA-W12-I001)

### 11.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: §6, EV-UA-W12-D-005
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: §5 V3 + §7.2 G5 (digests 2956f820 / 8bc38aad / cf0e61ac)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: §7.2 G8 + EV-UA-W12-D-006
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: SUB-UA-001 (source-text read; not computed px); EV-UA-W12-D-006
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: §7.2 (authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: §7.2 (G1/G2/G3/G5/G6 = I001 only)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: §8
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: §11.6, DEC-UA-015
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: §7.2 G1/G5/G8 oracles
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: §11.6
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: A5 `execution_environment_policy`; EV-UA-W12-D-001

### 11.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA-W12-D-002/S1 IDs (S001/S002/S003/I001; CASE-UA-W12-001/002; no reuse)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA-W12-D-001 (§5 all digests pinned; only I001 executed-evidence refs are deliberately TO_BE_FILLED, which is allowed by §9.1)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA-W12-D-005/each §5 V2
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: §5 (each file maps a distinct REQ/DEC; removing any yields an unmapped requirement)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: §7.2 G5 (required=registered=executed; zero skips)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: §7.2 G1/DEC-UA-016; G5 digests; G6 negative search
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: §11.6 (single writable file per sub-window; strict adjacency)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: §8
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: §12 certificate + `S2.decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`; S1 not executed
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA-W12-D-006
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: A5 policy; EV-UA-W12-D-001 (no environment invalidation observed in decomposition; policy copied unchanged)

## 11.6 Handoff, stop, and successor rules

- The window agent is `UA-W12-WINDOW-AGENT`, DEC-UA-015 identity. After the
  parent accepts this decomposition, that identity executes each FILE leaf, then
  personally reviews it, then assigns the next S-number, then personally runs
  `UA-W12-I001`, then performs the consolidated parent handoff. `may_start_successor: false`
  means do not start `UA-W13` (the next parent window); it is not a FILE-leaf
  brake, and **no** FILE leaf halts at `AWAITING_WINDOW_REVIEW` for a parent turn.
- A FILE leaf stops at `AWAITING_WINDOW_REVIEW`; the window agent (same identity)
  reviews it and advances without a parent round trip.
- Communication is strictly adjacent: no implementation subagent talks to the
  parent; no parent talks to a subagent. Here the executor and reviewer are the
  same identity, so strict adjacency is trivially enforced.
- `S2` is live status; `S3` is append-only evidence. Only the window agent
  updates `S2`.

## 12. Authoring-readiness certificate

Appended below in `S3` (`EV-UA-W12-D-007`, `certificate: SUBWINDOW-DECOMPOSITION-READY`),
and `S2.decomposition_status` is set to `AWAITING_PARENT_DECOMPOSITION_REVIEW`.

---

## 13. Corrective sub-window `UA-W12-C001` (append-only)

```yaml
correction_id: UA-W12-C001
parent_window_id: UA-W12
parent_assignment_id: ASG-UA-W12-01-C001
kind: CORRECTIVE
corrects: UA-W12-S002
failed_evidence: EV-UA-A-067
parent_block_state: PARENT_BLOCKED
root_cause: UA-W12-S002 added `data-surface="surface:selection-review-panel"` to
  `selection-review.tsx`, but that value is absent from the frozen surface
  inventories (`KEYWORD_INTELLIGENCE_SURFACE_INVENTORY` and `I_F15_LITERAL`), so
  `W5-I05` ("surface inventory equality + registrations") failed at I001 G1,
  making G1 203/199/4 instead of the allowed 201/198/3 (three heading-oracle only).
governing_requirement: REQ-UA-005
governing_decisions: [DEC-UA-005, DEC-UA-009, INV-UA-010]
owner_scope: frontend/components/keyword-intelligence/selection-review.tsx
file_operation: REVERT (remove the S002-introduced line)
starting_file_digest: 87b7232ba7cbe77a2378107ab63cffc2ff7d89007d8f108d44e9e1048fc99807
ending_file_digest: 5550dffa70db24bc923c2ba405cefaa568e29a7bbb281bac261429cf049a3ae2
file_numstat: "0 1"
preserve: [h2, finalize/save handlers, chip UI, surface:selection-review on the dashboard wrapper]
expanded_parent_scope_required: false
invalidated_checks:
  - UA-W12-S002 V1a ending digest 87b7232b
  - UA-W12-S002 V1b numstat 1 0
new_whole_window_assessment: UA-W12-I002
```

Mechanical trace (parent frozen CHG-UA-0007 / EV-UA-A-067): the net effect of
`UA-W12-S002` then `UA-W12-C001` is that `selection-review.tsx` returns to its
original state (ending digest `5550dffa`), so `selection-review.tsx` is no longer
part of the window's net changed-file set. The net planned set after C001 is two
files (`frontend/components/keyword-intelligence/research-dashboard.tsx` and
`frontend/test/uphunt-aesthetic-w12.test.ts`) with digest `54cf2d36…`. S002's
history in §5 is retained verbatim (no rewrite); the correction is append-only.

---

*End of S1.* This decomposition does not edit any implementation file, does not
assign FILE leaves, does not execute `UA-W12-S001`, and does not begin `UA-W13`.
