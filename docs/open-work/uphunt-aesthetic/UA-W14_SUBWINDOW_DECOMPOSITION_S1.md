# UA-W14 Sub-window decomposition checklist (`UA-W14_S1`)

Frozen decomposition for parent window `UA-W14` under assignment `ASG-UA-W14-01`.
Author: window agent identity `UA-W14-WINDOW-AGENT`.

Status: `AWAITING_PARENT_DECOMPOSITION_REVIEW`. Parent has not accepted this
decomposition. No FILE leaf is assigned, no implementation file is edited, and
`UA-W14-S001` is NOT executed by this decomposition. `A5_ACTIVE_EXECUTION_STATE.yaml`
remains byte-identical (`f13324222a6eb426d42b33983956a30fff8ab3da9fe94690567769206cb2e6ec`,
state_version 35) through decomposition.

This is the revised decomposition after the parent rejection in `A6` `EV-UA-A-077`
(S001 V1c). The parent's `3V` consequence amends `EV-UA-A-075` item 3's V1c oracle
and is transcribed in §0; the previously submitted S1/S2/S3 digests
(`7c673e7c…`, `5652f615…`, `ae480890…`) are superseded. No product starting byte
changed.

Other subordinate artifacts:

- `S2` — `frontend/docs/open-work/uphunt-aesthetic/UA-W14_SUBWINDOW_STATE_S2.yaml`
- `S3` — `frontend/docs/open-work/uphunt-aesthetic/UA-W14_SUBWINDOW_EVIDENCE_S3.md`

Inherited parent package (`A5` state_version 35, digest
`f13324222a6eb426d42b33983956a30fff8ab3da9fe94690567769206cb2e6ec`, blocker
`EV-UA-A-077_S001_V1c_Cluster_landscape_grep_zero`):

- `A1` — `frontend/docs/open-work/uphunt-aesthetic/A1_LOCKED_PRODUCT_CONTRACT.md`
  revision `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827`
- `A3` — `frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md`
  revision `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3`
- `A4` — `frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md`
  revision `9d2bb23a93bad57e991bfe1603de6ab9a2acba604af9cde18fef52fd369b918a`
- `A5` — `frontend/docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml`
  state_version 35, `current_window UA-W14`, `current_assignment_id ASG-UA-W14-01`,
  `assigned_agent UA-W14-WINDOW-AGENT`, `current_status IN_PROGRESS`, blocker
  `EV-UA-A-077_S001_V1c_Cluster_landscape_grep_zero`, `accepted_through UA-W13`,
  `next_window UA-W15`, `may_start_successor: false`
- `A6` — `frontend/docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md`
  (`EV-UA-A-075` is the assignment record whose
  `parent_frozen_mechanical_consequences` is transcribed verbatim in §0;
  `EV-UA-A-077` is the rejection record whose `3V` consequence amends item 3's
  V1c oracle)
- `A7` — `frontend/docs/open-work/uphunt-aesthetic/A7_SPECIFICATION_CHANGELOG.md`
  (`CHG-UA-0007`, `CHG-UA-0008`; both apply to prior windows UA-W12/UA-W13 and
  constrain the parked inventory/`data-surface` rules this window must preserve)

Standards:

- Parent standard:
  `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md`
  revision `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848`
- Sub-window standard:
  `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md`
  revision `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0`

---

## 0. Parent-frozen mechanical consequences (encoded verbatim)

The following is transcribed verbatim from `A6` evidence `EV-UA-A-075`
(`parent_frozen_mechanical_consequences`, items 1 through 9) and `A6` evidence
`EV-UA-A-077` (`parent_frozen_mechanical_consequences`, item `3V`), which amends
`EV-UA-A-075` item 3's V1c oracle only. The parent authority is NOT reopened by
this decomposition; any phrase or choice here that would contradict these lines
is void and the consequence lines win. They are uniquely determined by DEC-UA-005
items 5/10/16, DEC-UA-009, DEC-UA-015, DEC-UA-016, INV-UA-010, CHG-UA-0007,
CHG-UA-0008, UA-W14-T1/T2, CASE-UA-W14-001..003, VIS-KD, and W5-I05.

> 1. FILE sub-window IDs start at UA-W14-S001. A zero-edit in-scope file gets no
>    FILE sub-window and does not consume an S-number. Do not retire S001 unused.
>    Sequential DAG, no parallel waves: S001
>    `frontend/components/keyword-intelligence/cluster-landscape.tsx` → S002
>    `frontend/components/keyword-intelligence/summary-cards.tsx` → S003
>    `frontend/components/keyword-intelligence/keyword-table.tsx` → S004
>    `frontend/test/uphunt-aesthetic-w14.test.ts` CREATE → UA-W14-I001.
>    `frontend/components/keyword-intelligence/filter-bar.tsx` is in-scope but
>    zero-edit (`17edbde0e27e3df688f0f2e88fc8c2a342980458d58144ad2bbb5890562d7f23`);
>    it consumes no S-number.
>    `frontend/components/keyword-intelligence/keyword-dashboard.module.css` is
>    in-scope but zero-edit
>    (`3095e3842443abccb1a656373101cf4127f29b4adf7594efc280561bfa25a6bd`);
>    DEC-UA-005 leftover module rules for this window are none (W13 already locked
>    chart heights). Do not add SectionIntro on the research-dashboard
>    ClusterLandscape or KeywordTable call sites (those files are out of write
>    scope). Do not wrap filters in SectionIntro.
> 2. Zero-edit preserved (G6 pins, no FILE leaf): filter-bar.tsx `17edbde0…`;
>    keyword-dashboard.module.css `3095e384…`; research-dashboard.tsx `82f8a628…`;
>    chart-panels.tsx `2847411e…`; uphunt-aesthetic-w13.test.ts `8e96d6de…`;
>    selection-review.tsx `5550dffa…`; keywords/[researchId]/page.tsx `a46b89bc…`;
>    section-intro.tsx `159096f3…`; lib/keyword-intelligence-view-model.ts
>    `8328b023…`; test/keyword-intelligence-inventory.test.ts `2a6e6b24…`;
>    test/browser/keyword-intelligence-dashboard.mjs `317d3fa1…`; globals.css
>    `4cf7a1fc…`; traffic-enrichment.tsx `1a903788…`; traffic-globe.tsx `7d9567b5…`;
>    uphunt-aesthetic-w12.test.ts `41711cc5…`; uphunt-aesthetic-coverage.test.ts
>    `f5137be4…`. Do not edit getFiltered, saveKeywordSelection, Chart.js
>    Chart.register, dataset math, tooltip callbacks, REQUIRED_CASE_IDS, or
>    empty-state copy except as required to keep those nodes beside the same
>    canvas/table/cluster scene.
> 3. T1 cluster, starting cluster-landscape.tsx
>    `2304b0c8c9d40b89a364a2ad1badd6ba871767a7bad49fdf30f2257675409e6a`. S1 MUST
>    freeze deterministic ending bytes and git numstat via disposable unique-hunk
>    simulation. Insert `import { SectionIntro } from "@/components/section-intro";`
>    once. Replace the clusterHeroTitle inner h2 "Cluster landscape" and the
>    clusterHeroSub paragraph with one SectionIntro eyebrow="Clusters"
>    title="Related phrases, grouped so you can choose a lane." copy="Select a
>    cluster to inspect its volume, CPC, and mix." Keep data-surface="surface:cluster-landscape"
>    and data-surface="landscape:cluster-scene" byte-identical. Keep canvas,
>    drag/select, tableMeta cluster counts, and overlap-note math. Do not add a
>    new data-surface token.
> 4. T1 overlap, starting summary-cards.tsx
>    `19fbd558703a8e97560ec2c36c6b2e0db5d81f27774cf2ff961f4fd752815b51`. S1 MUST
>    freeze ending digest and numstat via disposable unique-hunk simulation. Insert
>    the same SectionIntro import once. In overlapPanel only, replace the h2
>    "Possible volume overlap" and the following panelNote about identical-volume
>    variants with one SectionIntro eyebrow="Overlap" title="Phrases that may be
>    counting the same demand twice." copy="Variants that share metrics and monthly
>    history." Keep overlap stats, groups, and empty-state note. Keep word-boundary
>    members marketOverview and overlapPanel. Keep Market overview and
>    Store-discovery mix chrome (CHG-UA-0008 / VIS-KD). Do not add a data-surface
>    attribute. Do not edit discovery-mix math.
> 5. T1 table, starting keyword-table.tsx
>    `91480058fbda5c0942c8a7abe07ed9267ad52c63400d6050769b63246e32ed61`. S1 MUST
>    freeze ending digest and numstat via disposable unique-hunk simulation. Insert
>    the same SectionIntro import once. Replace the h2 "Keyword workspace" with one
>    SectionIntro eyebrow="Shortlist" title="Every active phrase, ready to inspect
>    and keep." copy="Sort, filter, and select without leaving the evidence above."
>    Keep the existing tableMeta row-count line. Keep sort/paginate/toggle,
>    TABLE_COLS, and FLAG_META. Keep styles.kiDashboard absent, "<th>Action</th>"
>    absent, and styles.rowEdit absent (VIS-KD). Do not add data-surface on
>    KeywordTable (dashboard already wraps surface:keyword-table). Do not edit
>    getFiltered or saveKeywordSelection.
> 6. CREATE test/uphunt-aesthetic-w14.test.ts with exactly three tests
>    CASE-UA-W14-001..003. Import recordExecuted from
>    `./uphunt-aesthetic-coverage.test.ts` the same way as the w13 test. Unit tests
>    that read source (not render). 001: keyword-table.tsx contains `Every active
>    phrase, ready to inspect and keep.` 002: cluster-landscape.tsx contains
>    `Related phrases, grouped so you can choose a lane.` and summary-cards.tsx
>    contains `Phrases that may be counting the same demand twice.` 003:
>    filter-bar.tsx contains `data-filter="market"`. recordExecuted after
>    assertions. No fourth test. S1 must freeze deterministic bytes (§7.3
>    non-behavioral formatting freedom applies).
> 7. Last FILE leaf (S004) from ABSENT test/.ua-executed.json expects exactly 5 IDs
>    (2 × W1 + CASE-UA-W14-001..003), set digest
>    `2dac0041db87b97e360260c76a4aa5bfb145b8a1e49252c1ca1fa5b6f322de48`. The 40-ID
>    set {2 × W1} ∪ {4 × W2} ∪ {4 × W3} ∪ {2 × W4} ∪ {2 × W5} ∪ {3 × W6} ∪ {2 ×
>    W7} ∪ {3 × W8} ∪ {4 × W9} ∪ {3 × W10} ∪ {2 × W11} ∪ {2 × W12} ∪ {4 × W13} ∪
>    {3 × W14} is asserted only at I001 G5 after `npm test`, digest
>    `2c31828460d630208cbee7ae9875298058412258efc81682bba597ea5109a875`. Window-local
>    3-ID digest `d2d3e48bb9a225e7bfa63b0faaa858c569439d8f8e41c59914da3cd083639c88`. Planned-file-set
>    digest `541169bc3ebd4c72932bc1b47b5bdf93de4c964517115ea93618edc97f949383`
>    over the four planned paths (filter-bar and module.css excluded as zero-edit).
>    Do not require W2–W13 IDs at the w14-only test command. test/.ua-executed.json
>    is TRACKED at HEAD (never commit).
> 8. I001 G1 is DEC-UA-016: from `frontend/`, `npm test`. Parent-measured
>    predecessor after W13 is 209 tests / 206 pass / 3 fail; expected after W14 is
>    212 / 209 / 3. PASS iff allocated UA CASE tests (including
>    CASE-UA-W14-001..003) pass and every failing title, if any, is exactly the
>    three named heading-oracle titles; process exit 1 is expected and is not G1
>    FAIL when that holds. G2 DEC-UA-014 needles are cluster-landscape.tsx,
>    summary-cards.tsx, keyword-table.tsx, filter-bar.tsx, uphunt-aesthetic-w14.test.ts
>    (keyword-dashboard.module.css is not a tsc input). G3 npm run lint on those
>    JSX/TS needles. G4 browser_evidence true: do not screenshot `/design-fixture`
>    and do not screenshot a live `/keywords/{id}` against production. Do not edit
>    test/browser/keyword-intelligence-dashboard.mjs. I001 records four full-page
>    PNGs under frontend/review-evidence/uphunt-aesthetic/UA-W14/ at widths 390,
>    768, 1280, 1440 (viewport height 900) of synthetic
>    `/keywords/kr_abcdefghijklmnopqrstuvwx` with same-class fetch interception of
>    `/api/keyword-research*` completed payloads (copy interception from UA-W13 G4;
>    do not mutate the KI-W5 harness). captureBeyondViewport must be true (W13 C001
>    class). PNG IHDR height must exceed 900. Assert the table SectionIntro title
>    `Every active phrase, ready to inspect and keep.` is present and readable at
>    1280, and the cluster title `Related phrases, grouped so you can choose a
>    lane.` is present in g4-checks.json at 1280. Helper scripts and g4-checks.json
>    may live only under that review-evidence directory (not a planned product
>    file; G9 still forbids UA-W15 artifacts).
> 9. Do not start UA-W15. Do not add any new data-surface token. Do not edit
>    view-model inventories, research-dashboard, chart-panels, w13 tests, globals.css,
>    section-intro.tsx, W2–W13 test files, REQUIRED_CASE_IDS, parked files, or
>    design-system-shell.test.ts. After parent accepts this decomposition, identity
>    UA-W14-WINDOW-AGENT executes then personally reviews each FILE leaf in the same
>    turn, then itself assigns the next S-number, then personally runs I001, then
>    hands off (DEC-UA-015). This assignment does not execute S001.
> 3V. S001 V1c MUST NOT require grep -c "Cluster landscape" => 0. After the unique
>    hunk, `Cluster landscape` remains exactly once as aria-label="Cluster
>    landscape" and that attribute stays. Required V1c counts: grep -c "Related
>    phrases, grouped so you can choose a lane." >= 1; grep -c "See where demand
>    concentrates" => 0; grep -c "data-surface=\"surface:cluster-landscape\"" => 1;
>    grep -c "data-surface=\"landscape:cluster-scene\"" => 1; grep -c
>    "aria-label=\"Cluster landscape\"" => 1. Ending digest
>    d1ed9ad4d8a1148f2e8b7deedf5c0bc9e39c682793cc19d55dce3f68cdcfcd53 / numstat 6 11
>    is unchanged. Rewrite S1/S2/S3; do not change product starting bytes. Do not
>    set S2 decomposition_status READY on 7c673e7c….

The consequence lines above are the operative mechanical form; they win over any
later choice in this document or in `S2`/`S3`. In particular, items 1, 3, 4, 5, 6,
and 9 fix the ordering, the zero-edit set, the exact intended JSX substitutions,
and the single-identity execution-authority model; item `3V` replaces the
`grep -c "Cluster landscape" => 0` V1c oracle of item 3 with the required counts
that also keep `aria-label="Cluster landscape"` exactly once. The three
edited-source ending digests and numstats pinned in §5 are derived from
disposable unique-hunk
simulation (not parent-simulated), per consequence items 3, 4, 5.

---

## 1. Authority and revision pins

| Pin | Value | Verified |
|---|---|---|
| parent_window_id | `UA-W14` | A5 |
| parent_assignment_id | `ASG-UA-W14-01` | A5 `current_assignment_id`; EV-UA-A-075 |
| window_agent_identity | `UA-W14-WINDOW-AGENT` | A5 `assigned_agent` |
| delegated_authority | decompose UA-W14; write S1/S2/S3; append S3 and A6 | A5 `authorized_actions` |
| FILE-leaf execution authority | none at decomposition time | A5 `prohibited_actions: execute_UA-W14_FILE_leaves` |
| parent-standard revision | `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` | recomputed MATCH |
| subwindow-standard revision | `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` | recomputed MATCH |
| A1 revision | `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827` | recomputed MATCH |
| A3 revision | `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3` | recomputed MATCH |
| A4 revision | `9d2bb23a93bad57e991bfe1603de6ab9a2acba604af9cde18fef52fd369b918a` | recomputed MATCH |
| A5 state_version / digest | 35 / `f13324222a6eb426d42b33983956a30fff8ab3da9fe94690567769206cb2e6ec` | recomputed MATCH (byte-identical) |
| A5 blocker | `EV-UA-A-077_S001_V1c_Cluster_landscape_grep_zero` | A5 |
| may_start_successor | false | A5 |
| next window | `UA-W15` (reserved for parent) | A5 |
| stop_after | `UA-W15` | A5 |

Evidence: `S3` `EV-UA-W14-D-001`.

## 2. Parent-window scope and exclusions

`authorized_write_scope` (A5; in-scope):

- `frontend/components/keyword-intelligence/cluster-landscape.tsx` — S001.
- `frontend/components/keyword-intelligence/summary-cards.tsx` — S002.
- `frontend/components/keyword-intelligence/keyword-table.tsx` — S003.
- `frontend/test/uphunt-aesthetic-w14.test.ts` — S004.
- `frontend/components/keyword-intelligence/filter-bar.tsx` — in-scope but
  **zero-edit** (`17edbde0…`); no FILE leaf, consumes no S-number.
- `frontend/components/keyword-intelligence/keyword-dashboard.module.css` — in-scope
  but **zero-edit** (`3095e384…`); no FILE leaf, consumes no S-number (DEC-UA-005
  leftover module rules for this window are none).

`read_only_scope` (A5 / A4 F1): `frontend/components/section-intro.tsx`,
`frontend/components/keyword-intelligence/filter-bar.tsx`,
`frontend/components/keyword-intelligence/keyword-dashboard.module.css`,
`frontend/components/keyword-intelligence/research-dashboard.tsx` (read-only;
out of write scope), `frontend/test/uphunt-aesthetic-coverage.test.ts`,
`frontend/test/uphunt-aesthetic-w13.test.ts`.

Exclusions / prohibited (A5 `prohibited_actions` + consequence 9):

- do not start UA-W15;
- do not add any new data-surface token;
- do not edit view-model inventories, `research-dashboard.tsx`, `chart-panels.tsx`,
  `filter-bar.tsx`, `keyword-dashboard.module.css`, `globals.css`,
  `section-intro.tsx`, `selection-review.tsx`, W2–W13 test files,
  `REQUIRED_CASE_IDS`, parked files, `keyword-intelligence-inventory.test.ts`,
  `test/browser/keyword-intelligence-dashboard.mjs`, or
  `design-system-shell.test.ts`;
- do not edit `getFiltered`, `saveKeywordSelection`, Chart.js `Chart.register`,
  dataset math, tooltip callbacks, or empty-state copy except as required to keep
  those nodes beside the same canvas/table/cluster scene;
- no AWS, commit, push, production, paid provider, `email_scraper` edit, or root
  `ACTIVE_EXECUTION_STATE.md` edit.

Scope-locked decisions governing UA-W14 (from A3): DEC-UA-005 items 5/10/16
(cluster, overlap, and table SectionIntro eyebrow|title|copy), DEC-UA-009 (keep
`data-surface` values and Chart.js datasets byte-for-byte), DEC-UA-015 (one
identity UA-W14-WINDOW-AGENT executes and reviews its own FILE leaves; movement
between FILE leaves is internal; the three DEC-UA-015 forbidden decomposition
phrases are not used), DEC-UA-016 (npm test oracle), REQ-UA-003 (keyword result is
not a dashboard), INV-UA-010 (keep `data-surface` values; only presentation
layout/copy change). CHG-UA-0007/0008 constrain the preserved `data-surface` and
VIS-KD / W5-I05 needles (no new surface identity, no inventory expansion).

## 3. Starting working-tree inventory

Recording does not modify the tree. From `frontend/`, `git status --short` at
window start (window-agent capture, `S3` `EV-UA-W14-D-001`):

```
 M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml
 M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md
```

Coordination root (`/home/harit/Email Scrapper`) `git status --short`: clean (no
output). Protected pre-existing changed set (parent-owned A5/A6) set digest
`be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a`.

Planned implementation files:

- `frontend/components/keyword-intelligence/cluster-landscape.tsx`: exists, digest
  `2304b0c8c9d40b89a364a2ad1badd6ba871767a7bad49fdf30f2257675409e6a`, not dirty at
  window start (MODIFY by S001).
- `frontend/components/keyword-intelligence/summary-cards.tsx`: exists, digest
  `19fbd558703a8e97560ec2c36c6b2e0db5d81f27774cf2ff961f4fd752815b51`, not dirty at
  window start (MODIFY by S002).
- `frontend/components/keyword-intelligence/keyword-table.tsx`: exists, digest
  `91480058fbda5c0942c8a7abe07ed9267ad52c63400d6050769b63246e32ed61`, not dirty at
  window start (MODIFY by S003).
- `frontend/test/uphunt-aesthetic-w14.test.ts`: **ABSENT** (CREATE by S004).

Zero-edit / preserved pins (must remain byte-identical; verified in `S3`
`EV-UA-W14-D-001`): `filter-bar.tsx 17edbde0…`, `keyword-dashboard.module.css
3095e384…`, `research-dashboard.tsx 82f8a628…`, `chart-panels.tsx 2847411e…`,
`uphunt-aesthetic-w13.test.ts 8e96d6de…`, `selection-review.tsx 5550dffa…`,
`keywords/[researchId]/page.tsx a46b89bc…`, `section-intro.tsx 159096f3…`,
`view-model.ts 8328b023…`, `keyword-intelligence-inventory.test.ts 2a6e6b24…`,
`test/browser/keyword-intelligence-dashboard.mjs 317d3fa1…`, `globals.css
4cf7a1fc…`, `traffic-enrichment.tsx 1a903788…`, `traffic-globe.tsx 7d9567b5…`,
`uphunt-aesthetic-w12.test.ts 41711cc5…`, `uphunt-aesthetic-w11.test.ts
40e31788…`, `uphunt-aesthetic-coverage.test.ts f5137be4…`.

## 4. Initial single-file dependency DAG

```text
UA-W14-S001 (cluster-landscape.tsx)
  -> UA-W14-S002 (summary-cards.tsx)
    -> UA-W14-S003 (keyword-table.tsx)
      -> UA-W14-S004 (uphunt-aesthetic-w14.test.ts CREATE)
        -> UA-W14-I001 (window-agent integration assessment)
```

Sequential, no parallel wave (parent-frozen, consequence 1). Edges justified by
named outputs: S001 must expose cluster-landscape.tsx's SectionIntro (the
`Clusters | Related phrases, grouped so you can choose a lane. | Select a cluster
to inspect its volume, CPC, and mix.` block) and preserve
`data-surface="surface:cluster-landscape"` and `data-surface="landscape:cluster-scene"`
before S004 reads it as source text. S002 must expose the overlap SectionIntro in
summary-cards.tsx (`Overlap | Phrases that may be counting the same demand twice.
| Variants that share metrics and monthly history.`) and keep word-boundary members
`marketOverview`/`overlapPanel` before S004 reads it. S003 must expose the table
SectionIntro in keyword-table.tsx (`Shortlist | Every active phrase, ready to
inspect and keep. | Sort, filter, and select without leaving the evidence above.`)
and keep `styles.kiDashboard`/`<th>Action</th>`/`styles.rowEdit` absent before
S004 reads it. S004 reads all three producer files (plus filter-bar.tsx) as source
text and therefore depends on S001/S002/S003. I001 is the operator of G0–G9.

Zero-edit `filter-bar.tsx` and `keyword-dashboard.module.css` do not appear in the
DAG.

## 5. Initial sub-window blocks

### UA-W14-S001

```yaml
subwindow_id: UA-W14-S001
type: FILE
parent_window_id: UA-W14
parent_assignment_id: ASG-UA-W14-01
assigned_agent: UA-W14-WINDOW-AGENT
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/keyword-intelligence/cluster-landscape.tsx
file_operation: MODIFY
starting_file_digest: 2304b0c8c9d40b89a364a2ad1badd6ba871767a7bad49fdf30f2257675409e6a
starting_repository_change_set_digest: be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a
read_only_scope:
  - frontend/components/section-intro.tsx
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/components/keyword-intelligence/keyword-dashboard.module.css
authorized_actions:
  - add_section_intro_import
  - replace_cluster_hero_with_section_intro
  - keep_data_surface_values_byte_identical
  - keep_canvas_drag_select_tableMeta_overlap_math
prohibited_actions:
  - add_new_data_surface_attribute
  - wrap_filter_bar
  - edit_getFiltered
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: REQ-UA-003 (keyword result is not a dashboard; readable
headline), DEC-UA-005 item 5 (cluster SectionIntro
`Clusters | Related phrases, grouped so you can choose a lane. | Select a cluster
to inspect its volume, CPC, and mix.`), DEC-UA-009 + INV-UA-010 (keep
`data-surface="surface:cluster-landscape"` and `data-surface="landscape:cluster-scene"`
byte-identical; do not add a new data-surface token), REQ-UA-005
(presentation-only), VIS-KD / W5-I05 (no new data-surface token; existing surface
values and the canvas/cluster-scene scene preserved).

Exact file transformation (consequence 3). Two ordered edits, applied in this
order to `cluster-landscape.tsx`:

1. Insert one local `import { SectionIntro } from "@/components/section-intro";`
   immediately after the existing
   `import styles from "./keyword-dashboard.module.css";` line (the line before
   the blank line that precedes `const CLUSTER_COLORS`). Only one such import.
2. Replace the whole
   `<div className={styles.clusterHeroTitle}>...</div>` block — whose sole
   children are the `<h2 className={styles.tip} data-tip="A filtered market map of
   the keyword clusters. Volume, CPC, and commercial intent are recomputed from
   visible keywords; trend and opportunity come from the clustering pipeline.">
   Cluster landscape </h2>` and the
   `<div className={styles.clusterHeroSub}> See where demand concentrates, which
   themes are recommended, and how strong each opportunity is. </div>` — with the
   following six-line element (8-space base indentation to match the sibling
   `tableMeta` div):

   ```jsx
   <SectionIntro
     eyebrow="Clusters"
     title="Related phrases, grouped so you can choose a lane."
     copy="Select a cluster to inspect its volume, CPC, and mix."
   />
   ```

   The surrounding `<section className={`${styles.clusterSection}
   ${styles.clusterHero}`} data-surface="surface:cluster-landscape"
   aria-label="Cluster landscape">`, the `<div className={styles.sectionHead}>`
   and `<div className={styles.tableMeta}>` siblings, the `<canvas
   data-surface="landscape:cluster-scene">`, the drag/select handlers, the
   legend/list-head, and the overlap-note math are all kept byte-identical.

Preserved behaviors: canvas and 3D scene, drag/rotate/pinch/wheel/double-click,
pill tooltips, cluster legend, and the `{selected && selectedDetail && (...)}`
inspector with the `fmtNum`/overlap-note math. Forbidden edits within the writable
file: adding any new `data-surface` attribute, wrapping the filter bar, editing
`getFiltered`, removing either preserved data-surface value, or touching the
canvas/drag/select/tableMeta/overlap math.

Frozen completion oracle for S001 (disposable unique-hunk simulation, `S3`
`EV-UA-W14-D-003`):

- ending file digest `d1ed9ad4d8a1148f2e8b7deedf5c0bc9e39c682793cc19d55dce3f68cdcfcd53`
- git numstat `6 11`
- SectionIntro import count exactly 1; `Related phrases, grouped so you can choose
  a lane.` present; `data-surface="surface:cluster-landscape"` count 1;
  `data-surface="landscape:cluster-scene"` count 1; `aria-label="Cluster landscape"`
  count 1.

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 of `cluster-landscape.tsx` equals
  `d1ed9ad4d8a1148f2e8b7deedf5c0bc9e39c682793cc19d55dce3f68cdcfcd53`; git numstat
  `6 11`.
- `V1b` `grep -c "import { SectionIntro } from \"@/components/section-intro\";"` =>
  1.
- `V1c` `grep -c "Related phrases, grouped so you can choose a lane\."` >= 1;
  `grep -c "See where demand concentrates"` => 0 (sub removed);
  `grep -c "data-surface=\"surface:cluster-landscape\""` => 1;
  `grep -c "data-surface=\"landscape:cluster-scene\""` => 1;
  `grep -c "aria-label=\"Cluster landscape\""` => 1. (Per consequence 3V: the
  h2 "Cluster landscape" is replaced, but `aria-label="Cluster landscape"` is
  preserved and counts exactly 1; the check MUST NOT require the raw
  `Cluster landscape` string to be 0.)
- `V1d` brace/paren balance (JSX parse) via `tsc transpileModule` => 0 diagnostics.
- `V2` attributable implementation-file set is exactly
  `{frontend/components/keyword-intelligence/cluster-landscape.tsx}`.
- `V3` required local coverage IDs = registered = executed = `[]` for this leaf
  (no CASE registration is owned by S001; the CASE tests for cluster read this file
  as source in S004). Zero skips/duplicates/unexpected.
- `V4` zero-edit pins unchanged.

Classification: V1a–V1d, V2, V3, V4 LOCAL_NOW. G1/G2/G5/G6/G8 and G4
(READY_FOR_PARENT_REVIEW) DEFERRED_TO_INTEGRATION; `npm test` is NOT part of this
leaf.

### UA-W14-S002

```yaml
subwindow_id: UA-W14-S002
type: FILE
parent_window_id: UA-W14
parent_assignment_id: ASG-UA-W14-01
assigned_agent: UA-W14-WINDOW-AGENT
predecessors: [UA-W14-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/keyword-intelligence/summary-cards.tsx
file_operation: MODIFY
starting_file_digest: 19fbd558703a8e97560ec2c36c6b2e0db5d81f27774cf2ff961f4fd752815b51
starting_repository_change_set_digest: be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a
read_only_scope:
  - frontend/components/section-intro.tsx
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/components/keyword-intelligence/keyword-dashboard.module.css
authorized_actions:
  - add_section_intro_import
  - replace_overlap_heading_with_section_intro
  - keep_marketOverview_overlapPanel_word_boundary
  - keep_discovery_mix_math
prohibited_actions:
  - add_new_data_surface_attribute
  - edit_discovery_mix_math
  - remove_marketOverview_or_overlapPanel
  - edit_getFiltered
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: DEC-UA-005 item 10 (overlap SectionIntro
`Overlap | Phrases that may be counting the same demand twice. | Variants that
share metrics and monthly history.`), DEC-UA-009 + INV-UA-010 (no new
`data-surface` attribute), REQ-UA-005 (presentation-only), REQ-UA-003 (readable
overlap heading), CHG-UA-0008 (keep `marketOverview`/`overlapPanel` word-boundary
members, Market overview and Store-discovery mix chrome, no discovery-mix math
edit), VIS-KD / W5-I05.

Exact file transformation (consequence 4). Two ordered edits to `summary-cards.tsx`:

1. Insert one local `import { SectionIntro } from "@/components/section-intro";`
   immediately after the existing
   `import styles from "./keyword-dashboard.module.css";` line. Only one such
   import (same pattern as S001).
2. In the `overlapPanel` const only, replace the `<h2>Possible volume overlap</h2>`
   plus the following descriptive
   `<div className={styles.panelNote}> Variants with the same reported metrics and
   monthly history are treated as a likely shared Google volume bucket. The raw
   and adjusted totals remain visible. </div>` (the two children immediately after
   the `<div className={`${styles.decisionPanel} ${styles.wide}`}>` opening) with
   this five-line element (10-space base indentation to match the replaced `h2`):

   ```jsx
   <SectionIntro
     eyebrow="Overlap"
     title="Phrases that may be counting the same demand twice."
     copy="Variants that share metrics and monthly history."
   />
   ```

   The rest of `overlapPanel` is untouched: the empty-state note
   (`No identical-volume variant groups in the filtered data.`), the overlap
   summary stats, the overlapTotalTrack/legend, the warningList of OverlapGroup,
   and all `buildOverlapGroups`/`buildDiscoverySegments`/`sharedVolume`/
   `reportedVolume`/`overlapVolume`/`variantCount`/`maxReported` math are preserved.
   `marketOverview` (and its `overviewPackage/overviewFlow/discoveryPanel/segmentGrid`
   chrome) and `overlapPanel` remain as word-boundary identifiers in the same
   source order.

Preserved behaviors: discovery-mix math, overlap stats/groups, empty-state note,
`Market overview`, `Store-discovery mix` chrome, word-boundary members
`marketOverview` and `overlapPanel`. Forbidden edits within the writable file:
adding any `data-surface` attribute, editing discovery-mix math, removing the
`marketOverview` or `overlapPanel` binding, wrapping anything in a new section, or
editing `getFiltered`.

Frozen completion oracle for S002 (disposable unique-hunk simulation, `S3`
`EV-UA-W14-D-004`):

- ending file digest `c60d6bad700060134d8f4fcf2ef57aa1f1fb133a428a5f5e3c5d20ebaa1711f0`
- git numstat `6 5`
- SectionIntro import count exactly 1; `Phrases that may be counting the same
  demand twice.` present; `grep -w marketOverview` >= 1; `grep -w overlapPanel`
  >= 1.

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 equals `c60d6bad700060134d8f4fcf2ef57aa1f1fb133a428a5f5e3c5d20ebaa1711f0`;
  git numstat `6 5`.
- `V1b` `grep -c "import { SectionIntro } from \"@/components/section-intro\";"` =>
  1.
- `V1c` `grep -c "Phrases that may be counting the same demand twice\."` >= 1;
  `grep -c "Possible volume overlap"` => 0 (h2 replaced); `grep -cw
  marketOverview` >= 1; `grep -cw overlapPanel` >= 1.
- `V1d` JSX/TS parse via `tsc transpileModule` => 0 diagnostics.
- `V2` attributable implementation-file set is exactly
  `{frontend/components/keyword-intelligence/summary-cards.tsx}`.
- `V3` required local coverage IDs = registered = executed = `[]`.
- `V4` zero-edit pins unchanged.

Classification: V1a–V1d, V2, V3, V4 LOCAL_NOW. G1/G2/G5/G6/G8 and G4
DEFERRED_TO_INTEGRATION; `npm test` is NOT part of this leaf.

### UA-W14-S003

```yaml
subwindow_id: UA-W14-S003
type: FILE
parent_window_id: UA-W14
parent_assignment_id: ASG-UA-W14-01
assigned_agent: UA-W14-WINDOW-AGENT
predecessors: [UA-W14-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/keyword-intelligence/keyword-table.tsx
file_operation: MODIFY
starting_file_digest: 91480058fbda5c0942c8a7abe07ed9267ad52c63400d6050769b63246e32ed61
starting_repository_change_set_digest: be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a
read_only_scope:
  - frontend/components/section-intro.tsx
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/components/keyword-intelligence/keyword-dashboard.module.css
authorized_actions:
  - add_section_intro_import
  - replace_kw_workspace_heading_with_section_intro
  - keep_tableMeta_row_count
  - keep_table_cols_flag_meta_sort_paginate_toggle
prohibited_actions:
  - add_data_surface_on_keyword_table
  - edit_getFiltered
  - edit_saveKeywordSelection
  - add_th_Action_or_kiDashboard_or_rowEdit
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: DEC-UA-005 item 16 (table SectionIntro
`Shortlist | Every active phrase, ready to inspect and keep. | Sort, filter, and
select without leaving the evidence above.`), DEC-UA-009 + INV-UA-010 (no
`data-surface` on KeywordTable — dashboard already wraps `surface:keyword-table`),
REQ-UA-005 (presentation-only), REQ-UA-003 (readable table heading), VIS-KD
(`styles.kiDashboard` absent, `<th>Action</th>` absent, `styles.rowEdit` absent).

Exact file transformation (consequence 5). Two ordered edits to `keyword-table.tsx`:

1. Insert one local `import { SectionIntro } from "@/components/section-intro";`
   immediately after the existing
   `import styles from "./keyword-dashboard.module.css";` line (which follows the
   view-model import block). Only one such import.
2. Replace the `<h2 className={styles.tip} data-tip="Active keywords only (merged
   duplicates are excluded). Select rows to edit your keyword set."> Keyword
   workspace </h2>` (10-space base indentation inside the wrapper `<div>` that is
   a sibling of the `tableMeta` div) with this five-line element:

   ```jsx
   <SectionIntro
     eyebrow="Shortlist"
     title="Every active phrase, ready to inspect and keep."
     copy="Sort, filter, and select without leaving the evidence above."
   />
   ```

   The wrapper `<div>` and the `<div className={styles.tableMeta}>` (the
   `{total} row{s}` row-count line and the ` · Use the first column to add or
   remove keywords from the form` hint) are kept in place immediately after the
   SectionIntro. The `<table>`, `<thead>`, `TABLE_COLS`, `FLAG_META`,
   `renderCell`, `TrendCell`, `FlagsCell`, sort/paginate/toggle state, and the
   `PAGE_SIZES`/`pagination` block are all kept byte-identical. No `data-surface`
   attribute is added on KeywordTable. `styles.kiDashboard`, `<th>Action</th>`, and
   `styles.rowEdit` remain absent.

Preserved behaviors: sort/paginate/toggle, `TABLE_COLS`, `FLAG_META`, the
row-count `tableMeta` line, checkbox row-selection, empty-state row. Forbidden
edits within the writable file: adding any `data-surface` on KeywordTable, editing
`getFiltered` or `saveKeywordSelection`, adding `<th>Action</th>`, `styles.rowEdit`,
or `styles.kiDashboard`.

Frozen completion oracle for S003 (disposable unique-hunk simulation, `S3`
`EV-UA-W14-D-005`):

- ending file digest `96ce5e0e198f398b8ab6f9884c6ecd26c45bf8cd9b7b26ec4f851366ca2134ee`
- git numstat `6 6`
- SectionIntro import count exactly 1; `Every active phrase, ready to inspect and
  keep.` present; `grep -c "<th>Action</th>"` => 0; `grep -c "styles.rowEdit"` =>
  0; `grep -c "styles.kiDashboard"` => 0.

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 equals `96ce5e0e198f398b8ab6f9884c6ecd26c45bf8cd9b7b26ec4f851366ca2134ee`;
  git numstat `6 6`.
- `V1b` `grep -c "import { SectionIntro } from \"@/components/section-intro\";"` =>
  1.
- `V1c` `grep -c "Every active phrase, ready to inspect and keep\."` >= 1;
  `grep -c "Keyword workspace"` => 0 (h2 replaced); `grep -c "<th>Action</th>"` =>
  0; `grep -c "styles.rowEdit"` => 0; `grep -c "styles.kiDashboard"` => 0;
  `grep -c "data-filter=\"market\""` => 0 (that needle belongs to filter-bar.tsx,
  zero-edit, not here).
- `V1d` JSX/TS parse via `tsc transpileModule` => 0 diagnostics.
- `V2` attributable implementation-file set is exactly
  `{frontend/components/keyword-intelligence/keyword-table.tsx}`.
- `V3` required local coverage IDs = registered = executed = `[]`.
- `V4` zero-edit pins unchanged.

Classification: V1a–V1d, V2, V3, V4 LOCAL_NOW. G1/G2/G5/G6/G8 and G4
DEFERRED_TO_INTEGRATION; `npm test` is NOT part of this leaf.

### UA-W14-S004

```yaml
subwindow_id: UA-W14-S004
type: FILE
parent_window_id: UA-W14
parent_assignment_id: ASG-UA-W14-01
assigned_agent: UA-W14-WINDOW-AGENT
predecessors: [UA-W14-S003]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w14.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a
read_only_scope:
  - frontend/components/keyword-intelligence/keyword-table.tsx
  - frontend/components/keyword-intelligence/cluster-landscape.tsx
  - frontend/components/keyword-intelligence/summary-cards.tsx
  - frontend/components/keyword-intelligence/filter-bar.tsx
  - frontend/test/uphunt-aesthetic-coverage.test.ts
  - frontend/test/uphunt-aesthetic-w13.test.ts
authorized_actions:
  - create_w14_test
  - run_coverage_and_w14_tests
prohibited_actions:
  - add_fourth_test
  - edit_revisions_or_REQUIRED_CASE_IDS
  - edit_producer_files
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: DEC-UA-011 (recordExecuted contract; one test() per allocated
CASE ID; recordExecuted after the activation witness and oracle).
CASE-UA-W14-001 (SCN-UA-004: `Every active phrase, ready to inspect and keep.` in
keyword-table.tsx), 002 (SCN-UA-004: `Related phrases, grouped so you can choose a
lane.` in cluster-landscape.tsx and `Phrases that may be counting the same demand
twice.` in summary-cards.tsx), 003 (SCN-UA-004: `data-filter="market"` in
filter-bar.tsx). No fourth test.

Exact file transformation (CREATE, W13 class, `node:test` unit). A unit file that
reads `keyword-table.tsx`, `cluster-landscape.tsx`, `summary-cards.tsx`, and
`filter-bar.tsx` source (not rendered), modelled on
`test/uphunt-aesthetic-w13.test.ts`, and defines exactly three `test()` blocks with
`recordExecuted` after each oracle.

The complete deterministic bytes are frozen here (consequence 6; §7.3
non-behavioral formatting freedom is bounded by this fence). The byte content of
`frontend/test/uphunt-aesthetic-w14.test.ts` (verbatim, W13 class; recompute
SHA-256 to confirm):

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const keywordTable = await readFile(
  new URL("../components/keyword-intelligence/keyword-table.tsx", import.meta.url),
  "utf8",
);

const clusterLandscape = await readFile(
  new URL("../components/keyword-intelligence/cluster-landscape.tsx", import.meta.url),
  "utf8",
);

const summaryCards = await readFile(
  new URL("../components/keyword-intelligence/summary-cards.tsx", import.meta.url),
  "utf8",
);

const filterBar = await readFile(
  new URL("../components/keyword-intelligence/filter-bar.tsx", import.meta.url),
  "utf8",
);

test("CASE-UA-W14-001 keyword table shortlist SectionIntro present", () => {
  assert.match(keywordTable, /Every active phrase, ready to inspect and keep\./u);
  recordExecuted("CASE-UA-W14-001");
});

test("CASE-UA-W14-002 cluster and overlap SectionIntro present", () => {
  assert.match(clusterLandscape, /Related phrases, grouped so you can choose a lane\./u);
  assert.match(summaryCards, /Phrases that may be counting the same demand twice\./u);
  recordExecuted("CASE-UA-W14-002");
});

test("CASE-UA-W14-003 filter bar market filter preserved", () => {
  assert.match(filterBar, /data-filter="market"/u);
  recordExecuted("CASE-UA-W14-003");
});
```

Expected result / completion oracle (deterministic bytes frozen above — `S3`
`EV-UA-W14-D-006`):

- ending file digest `2436f2c88d7e3a5aacc7cca64f179c510cf1e8b12ad440930852b347ae09dbe9`
- exactly three `test(` blocks; `grep -c "recordExecuted("` => 3; the frozen bytes
  satisfy every assertion above.

Exact checks (LOCAL_NOW):

- `V1a` SHA-256 equals
  `2436f2c88d7e3a5aacc7cca64f179c510cf1e8b12ad440930852b347ae09dbe9`.
- `V1b` exactly three `test(` blocks; `grep -c "recordExecuted("` => 3.
- `V1c` assertion greps: `grep -c "Every active phrase, ready to inspect and keep\."`
  >= 1; `grep -c "Related phrases, grouped so you can choose a lane\."` >= 1;
  `grep -c "Phrases that may be counting the same demand twice\."` >= 1;
  `grep -c "data-filter=\"market\""` >= 1.
- `V1d` isolated execution from ABSENT executed-set:
  `rm -f test/.ua-executed.json && node --experimental-strip-types --test test/uphunt-aesthetic-coverage.test.ts test/uphunt-aesthetic-w14.test.ts`
  → exits 0; `test/.ua-executed.json` contains exactly the 5 IDs
  `{CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W14-001, CASE-UA-W14-002,
  CASE-UA-W14-003}`; set digest
  `2dac0041db87b97e360260c76a4aa5bfb145b8a1e49252c1ca1fa5b6f322de48`.
  Do NOT require W2–W13 IDs here.
- `V1e` `V1d` violation check: the three CASE-UA-W14 tests each pass (no skipped,
  filtered, or duplicated case); the only executing case set is the 5 IDs above.
- `V2` attributable implementation-file set is exactly
  `{frontend/test/uphunt-aesthetic-w14.test.ts}`. The `test/.ua-executed.json`
  mutation is the DEC-UA-011-registered runtime residue (tracked at HEAD, never
  commit) and is reported as documented residual, not an implementation edit.
- `V3` required local coverage IDs = registered = executed = `{CASE-UA-W14-001,
  CASE-UA-W14-002, CASE-UA-W14-003}`, zero skips/duplicates/unexpected, plus the
  two W1 registry re-executions.
- `V4` zero-edit pins unchanged.

Classification: V1a–V1e, V2, V3, V4 LOCAL_NOW. G1/G5 (40-ID) and G2/G3/G6/G8
DEFERRED_TO_INTEGRATION. After `V1d`, `npm test` is NOT part of this leaf (it
belongs to I001 G1); G5's 40-ID assertion is explicitly I001-only.

## 6. Allocation of requirements, decisions, interfaces, and coverage cases

| Requirement | Decision | File / sub-window | Assertion (executable) |
|---|---|---|---|
| REQ-UA-003, DEC-UA-005 item 5 | DEC-UA-005, DEC-UA-009 | S001 `cluster-landscape.tsx` | cluster SectionIntro exact string; `surface:cluster-landscape` + `landscape:cluster-scene` preserved; no new data-surface |
| REQ-UA-003, DEC-UA-005 item 10 | DEC-UA-005, DEC-UA-009 | S002 `summary-cards.tsx` | overlap SectionIntro exact string; `marketOverview`/`overlapPanel` word-boundary retained; no data-surface attribute; discovery-mix math unchanged |
| REQ-UA-003, DEC-UA-005 item 16 | DEC-UA-005, DEC-UA-009 | S003 `keyword-table.tsx` | table SectionIntro exact string; `tableMeta` row-count kept; no data-surface on KeywordTable; `kiDashboard`/`<th>Action</th>`/`rowEdit` absent |
| INV-UA-010 | DEC-UA-009 | S001 + S002 + S003 | existing `data-surface` values preserved; no new token |
| VIS-KD / W5-I05 | DEC-UA-009, INV-UA-010 | S001 + S002 + S003 | no new data-surface; `marketOverview`/`overlapPanel` word-boundary present; table absent needles preserved |
| REQ-UA-005 | DEC-UA-006, DEC-UA-015 | all | forbidden-path negative search at I001 G6 |
| CASE-UA-W14-001 | SCN-UA-004 | S004 (reads S003) | `Every active phrase, ready to inspect and keep.` |
| CASE-UA-W14-002 | SCN-UA-004 | S004 (reads S001, S002) | cluster title + overlap title strings |
| CASE-UA-W14-003 | SCN-UA-004 | S004 (reads filter-bar) | `data-filter="market"` preserved |

Cross-file interfaces: no new public/JS interface is introduced. The only
cross-file surfaces are the three SectionIntro blocks (presentation-only JSX) and
the preserved `data-surface` attributes; they are frozen in S001/S002/S003 before
S004 consumes them as source text (interface freeze §6.2 of the sub-window
standard). No imported/exported name changes; `SectionIntro` is imported uniformly
in the three edited files. `filter-bar.tsx` and `keyword-dashboard.module.css` are
consumed by S004 as read-only source under zero-edit.

Coverage allocation: CASE-UA-W14-001..003 → `uphunt-aesthetic-w14.test.ts` (S004).
No other window-local case. REQUIRED_CASE_IDS is never edited.

## 7. Verification gates

### 7.1 File-local gates (LOCAL_NOW per sub-window)

Enumerated in each sub-window block above (`V1a`–`V4`). Each FILE leaf's local
gate proves its own file digest, numstat, attributable single-file change set, and
(for S004) the isolated 5-ID executed-set.

### 7.2 Whole-window integration assessment `UA-W14-I001`

Author of assessment: `UA-W14-WINDOW-AGENT` (personally; not delegated).
`authorized_write_file: NONE` for implementation files during I001. Initial
assessment block is fully authored here; frozen source revision and executed
evidence refs are filled from the completed sub-windows at I001 run time.

```yaml
subwindow_id: UA-W14-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W14
parent_assignment_id: ASG-UA-W14-01
assigned_agent: WINDOW-AGENT
authorized_write_file: NONE
read_only_scope:
  - frontend/components/keyword-intelligence/cluster-landscape.tsx
  - frontend/components/keyword-intelligence/summary-cards.tsx
  - frontend/components/keyword-intelligence/keyword-table.tsx
  - frontend/test/uphunt-aesthetic-w14.test.ts
may_start_successor: false
```

Expected assembled changed-file set (parent-authorized scope):

- `frontend/components/keyword-intelligence/cluster-landscape.tsx` (S001)
- `frontend/components/keyword-intelligence/summary-cards.tsx` (S002)
- `frontend/components/keyword-intelligence/keyword-table.tsx` (S003)
- `frontend/test/uphunt-aesthetic-w14.test.ts` (S004)

Planned-file-set digest `541169bc3ebd4c72932bc1b47b5bdf93de4c964517115ea93618edc97f949383`
(verified in this decomposition, `S3` `EV-UA-W14-D-002`). `filter-bar.tsx` and
`keyword-dashboard.module.css` are excluded as zero-edit.

Frozen gates (from `frontend/`):

- **G0** Recompute and confirm parent-visible pins: A1 `57fa49c7…`, A3
  `094bc8bf…`, A4 `9d2bb23a…`, A5 state_version 34 `3664892e…`, subwindow
  standard `842c2955…`. Confirm predecessor UA-W13 pins (`chart-panels 2847411e…`,
  `module.css 3095e384…`, `research-dashboard 82f8a628…`, w13 test `8e96d6de…`)
  present and byte-identical.
- **G1** `npm test` per DEC-UA-016. Expected `212` tests, `209` pass, `3` fail.
  PASS iff the allocated UA CASE tests (CASE-UA-W14-001..003) pass AND every
  failing title is exactly a member of the three heading-oracle titles (`My
  searches presents keyword research and identifiable run dossiers without
  rendering IDs`, `MRR-FE-01 exact research payload and two-section surface`,
  `MRR-W2 frontend unit certificate`). Process exit 1 is expected and is NOT G1
  FAIL when those conditions hold.
- **G2** DEC-UA-014: from `frontend/`, `npx tsc --noEmit --pretty false`. PASS iff
  zero diagnostics name a path in the UA-W14 `authorized_write_scope` needles:
  `cluster-landscape.tsx`, `summary-cards.tsx`, `keyword-table.tsx`,
  `filter-bar.tsx`, `uphunt-aesthetic-w14.test.ts` (`keyword-dashboard.module.css`
  is not a tsc input). The ten parked SRC-UA-0092 diagnostics are not a PASS
  condition and are not to be "fixed".
- **G3** `npm run lint` when CSS/JSX is owned (JSX/TS owned here). PASS: exit 0 on
  the changed needles.
- **G4** `browser_evidence` true. Four full-page PNGs under
  `frontend/review-evidence/uphunt-aesthetic/UA-W14/` at widths `390`, `768`,
  `1280`, `1440` (viewport height `900`) of synthetic
  `/keywords/kr_abcdefghijklmnopqrstuvwx` with same-class fetch interception of
  `/api/keyword-research*` completed payloads (copy interception from UA-W13 G4; do
  not mutate the KI-W5 harness). `captureBeyondViewport` must be true (W13 C001
  class); PNG IHDR height must exceed 900. Do not screenshot `/design-fixture` or a
  live `/keywords/{id}` against production. Assert the table SectionIntro title
  `Every active phrase, ready to inspect and keep.` is present and readable at
  1280, and the cluster title `Related phrases, grouped so you can choose a lane.`
  is present in `g4-checks.json` at 1280. Helper scripts and `g4-checks.json` may
  live only under that review-evidence directory.
- **G5** Coverage: window-local 3-ID case set digest
  `d2d3e48bb9a225e7bfa63b0faaa858c569439d8f8e41c59914da3cd083639c88`
  (CASE-UA-W14-001..003). After `npm test`, `test/.ua-executed.json` must equal the
  40-ID set (digest
  `2c31828460d630208cbee7ae9875298058412258efc81682bba597ea5109a875`) with
  required = registered = executed, zero skips/duplicates/unexpected IDs, and no
  missing activation witnesses. Full 43-set equality remains UA-W15-V5.
- **G6** Forbidden-path negative search: `git diff --name-only HEAD` scope of the
  UA-W14 delta ⊂ UA-W14 `authorized_write_scope` (the four planned files) plus the
  documented `.ua-executed.json` residue; zero hits among DEC-UA-006 paths (`app/api`,
  `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`,
  `email_scraper`), root `ACTIVE_EXECUTION_STATE.md`, `filter-bar.tsx`,
  `keyword-dashboard.module.css`, `research-dashboard.tsx`, `chart-panels.tsx`,
  `globals.css`, traffic/crux files, W2–W13 test files, `REQUIRED_CASE_IDS`,
  `keyword-intelligence-inventory.test.ts`, parked files. All zero-edit pins
  byte-identical.
- **G7** No new network/DB operation: imports of the changed product files and the
  new test are source-read only; 0 network, 0 DB.
- **G8** Negative controls: (a) replacing the table/cluster/overlap SectionIntro
  titles must fail CASE-UA-W14-001/002 (NC-UA-002); (b) removing
  `data-filter="market"` from filter-bar must fail CASE-UA-W14-003 (NC-UA-004);
  (c) a forbidden path in the diff must fail G6 (NC-UA-005); (d) adding a new
  data-surface token must fail the W5-I05 / VIS-KD parked inventory assertions
  (DEC-UA-016 G1). Record falsification.
- **G9** Negative search: no UA-W15 artifact, no `run`/`keyword`-dashboard
  out-of-scope edit, no article/helper outside
  `review-evidence/uphunt-aesthetic/UA-W14/`, no successor parent window, no
  commit/push/AWS/paid-provider/production action, `A5` unchanged until the
  authorized handoff action.

Oracle outcomes: PASS, CORRECTION_REQUIRED, or PARENT_BLOCKED. A correction
requires a new single-file `UA-W14-C00n` and a new `UA-W14-I002`; no direct file
repair by the window agent.

## 8. Correction and re-assessment rules

- Corrections are append-only `UA-W14-C001`, `UA-W14-C002`, …; never reuse an
  initial/assessment/assignment/evidence ID.
- A correction owns exactly one file and cites the failed evidence, root cause,
  governing requirement/decision, the sub-window it corrects, and the checks it
  invalidates.
- The window agent never edits an implementation file during review; every fix is
  a new corrective sub-window (standard §8 item 2).
- After the last correction, a new whole-window assessment `UA-W14-I002` is
  required; leaf test results cannot substitute.
- Do not weaken an accepted oracle; do not repair a parent-level ambiguity by
  guessing (escalate as PARENT_BLOCKED).
- If the correction needs a new parent decision or expands parent scope, do not
  author a corrective sub-window; escalate.

## 9. Intermediate-state contracts

| Edge | After producer | Local checks that must pass | Expected temporary result | Safety | Resolver | Prohibited while state exists |
|---|---|---|---|---|---|---|
| S001 → S002 | S001 edits `cluster-landscape.tsx` only | G1 `npm test` (no test change) under DEC-UA-016: 209/206/3 exit 1 (three heading-oracle only); G2 0 needles on `cluster-landscape.tsx`; numstat `6 11`; digest `d1ed9ad4…`; S001 V1c (cluster title >= 1, "See where demand concentrates" == 0, both data-surface == 1, aria-label="Cluster landscape" == 1) | G1 passes with exactly the three heading-oracle fails; no unexpected failure | No suite test reads `cluster-landscape.tsx` except the source-text w14 test (S004, not yet created) and the parked inventory test, whose data-surface expectations are preserved byte-for-byte; presentation-only JSX | S002 | do not edit research-dashboard; do not edit module css; do not begin S002 before the S001 review |
| S002 → S003 | S002 edits `summary-cards.tsx` only | G1 209/206/3 exit 1; G2 0 needles on `summary-cards.tsx`; numstat `6 5`; digest `c60d6bad…`; S002 V1c (`Phrases that may be counting the same demand twice.` >= 1, `Possible volume overlap` == 0, `marketOverview`/`overlapPanel` >= 1) | G1 unchanged except heading-oracle | SummaryCards is read by the parked inventory test for `marketOverview`/`overlapPanel` word-boundary and by research-dashboard consumers; both members retained in source order; no data-surface added; discovery-mix math unchanged | S003 | do not add a data-surface; do not edit discovery-mix math; do not begin S003 before the S002 review |
| S003 → S004 | S003 edits `keyword-table.tsx` only | G1 209/206/3 exit 1; G2 0 needles on `keyword-table.tsx`; numstat `6 6`; digest `96ce5e0e…`; S003 V1c (`Every active phrase, ready to inspect and keep.` >= 1, `Keyword workspace` == 0, `<th>Action</th>`/`styles.rowEdit`/`styles.kiDashboard` == 0) | G1 unchanged except heading-oracle | KeywordTable is read by the parked inventory test for `surface:keyword-table` (which lives on the research-dashboard wrapper, unchanged) and for absent `kiDashboard`/`rowEdit`/`<th>Action</th>`; no data-surface added here | S004 | do not begin S004 before the S003 review; do not add data-surface on KeywordTable; do not start UA-W15 |
| S004 → I001 | S004 creates the w14 test | V1d isolated 5-ID run exits 0; 5-ID digest `2dac0041…`; digest `2436f2c8…` | G1 now 212/209/3; the three CASE-UA-W14 tests pass | w14 test is source-text-only; no navigation, no network | I001 runs G1/G2/G3/G4/G5/G6/G8 | do not begin UA-W15; do not run a whole-window assessment from leaf summaries alone |

## 10. Mandatory decomposition-readiness checkboxes

Evidence references resolve to `S3` evidence IDs. `N/A` rows cite a verified
non-applicability. Marked `[x]` by the window agent after verification in this
decomposition; `AWAITING_PARENT_DECOMPOSITION_REVIEW` is set in `S2`.

### 10.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA-W14-D-001
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA-W14-D-001
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA-W14-D-001 (§2)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA-W14-D-001 (§3)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA-W14-D-001 (§top/S2/S3)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA-W14-D-001 (identity UA-W14-WINDOW-AGENT executes + reviews; no lower subagent)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: A5 `execution_environment_policy`; EV-UA-W14-D-001

### 10.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA-W14-D-001, §6
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA-W14-D-001, §0 (consequences 1–9 transcribed verbatim; no reopened consequence; no unresolved parent decision)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA-W14-D-002 (4-file digest 541169bc matches parent frozen)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: §5 (S001/S002/S003/S004 one file each)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: §5 blocks; EV-UA-W14-D-003/004/005/006
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: §4 (§9); no parallel wave (parent-frozen)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: §6 (three SectionIntro blocks + preserved data-surface frozen in S001/S002/S003 before S004; presentation-only source-text assertions)
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
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: §5 (G1/G2/G3/G5/G6/G8 → UA-W14-I001)

### 10.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: §6, EV-UA-W14-D-006
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: §5 V3 + §7.2 G5 (digests d2d3e48b / 2dac0041 / 2c318284)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: §7.2 G8 + EV-UA-W14-D-007 (NC-UA-002 / NC-UA-004 / NC-UA-005)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: SUB-UA-001 (source-text read; not computed px); EV-UA-W14-D-007
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: §7.2 (authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: §7.2 (G1/G2/G3/G5/G6/G8 = I001 only)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: §8
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: §11.6, DEC-UA-015
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: §7.2 G1/G5/G8 oracles
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: §11.6
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: A5 `execution_environment_policy`; EV-UA-W14-D-001

### 10.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA-W14-D-002/S1 IDs (S001/S002/S003/S004/I001; CASE-UA-W14-001..003; no reuse)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA-W14-D-001 (§5 all digests pinned; S004 frozen bytes fully embedded plus sha256; only I001 executed-evidence refs are deliberately TO_BE_FILLED, allowed by §9.1)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA-W14-D-007/each §5 V2
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: §5 (each file maps a distinct REQ/DEC; removing any yields an unmapped requirement)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: §7.2 G5 (required=registered=executed; zero skips)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: §7.2 G1/DEC-UA-016; G5 digests; G6 negative search
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: §11.6 (single writable file per sub-window; strict adjacency)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: §8
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: §12 certificate + `S2.decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`; S1 not executed
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA-W14-D-007
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: A5 policy; EV-UA-W14-D-001 (no environment invalidation observed in decomposition; policy copied unchanged)

## 11. Handoff, stop, and successor rules

- The window agent is `UA-W14-WINDOW-AGENT`, DEC-UA-015 identity. After the
  parent accepts this decomposition, that identity executes each FILE leaf, then
  personally reviews it, then assigns the next S-number, then personally runs
  `UA-W14-I001`, then performs the consolidated parent handoff. `may_start_successor: false`
  means do not start `UA-W15` (the next parent window); it is not a FILE-leaf
  brake, and **no** FILE leaf halts at `AWAITING_WINDOW_REVIEW` for a parent turn.
- A FILE leaf stops at `AWAITING_WINDOW_REVIEW`; the window agent (same identity)
  reviews it and advances without a parent round trip.
- Communication is strictly adjacent: no implementation subagent talks to the
  parent; no parent talks to a subagent. Here the executor and reviewer are the
  same identity, so strict adjacency is trivially enforced.
- `S2` is live status; `S3` is append-only evidence. Only the window agent
  updates `S2`.
- The three forbidden decomposition phrases from consequence 9 are not used in
  this document: this decomposition does not require the parent to issue any FILE
  leaf, does not treat a file-subwindow review as a parent halt, and does not stop
  for the parent after any leaf.

## 12. Authoring-readiness certificate

Appended below in `S3` (`EV-UA-W14-D-008`, `certificate: SUBWINDOW-DECOMPOSITION-READY`),
and `S2.decomposition_status` is set to `AWAITING_PARENT_DECOMPOSITION_REVIEW`.

---

## 13. Corrective sub-window (append-only)

No corrective sub-window has been authored at decomposition time. Any future
corrective is appended here as `UA-W14-C001`, `UA-W14-C002`, …; none of the
initial blocks above is rewritten.

---

*End of S1.* This decomposition does not edit any implementation file, does not
assign FILE leaves, does not execute `UA-W14-S001`, and does not begin `UA-W15`.
