# UA-W8 frozen sub-window decomposition checklist (`S1`)

Subordinate artifact `S1` of parent window `UA-W8` under assignment `ASG-UA-W8-01`.
Companion artifacts: `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_STATE_S2.yaml`
and `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_EVIDENCE_S3.md`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

This file is frozen once the parent approves the decomposition. Corrections are appended
in §17 with new IDs; existing blocks are never rewritten.

## 0. Parent-frozen mechanical consequences (copied from `A6` `EV-UA-A-052`; not reopened)

The parent froze the following consequences in `A6` `EV-UA-A-052`
(`parent_frozen_mechanical_consequences`). They are copied here and are outside
decomposition authority. They close otherwise-open S1 choices; they are uniquely
determined by DEC-UA-002, DEC-UA-003, DEC-UA-015, DEC-UA-016, UA-W8-T1/T2/T3,
and CASE-UA-W8-001..003:

1. FILE sub-window IDs start at `UA-W8-S001`. A zero-edit in-scope file gets no
   FILE sub-window and does not consume an S-number. Do not retire S001/S002
   unused. Sequential DAG, no parallel waves: S001
   `frontend/app/leads/page.tsx` → S002
   `frontend/components/leads/live-leads-workspace.tsx` → S003
   `frontend/components/run-workspace.tsx` → S004 `frontend/app/globals.css`
   → S005 `frontend/test/uphunt-aesthetic-w8.test.ts` → `UA-W8-I001`.
2. Zero-edit preserved (G6 pins, no FILE leaf): `frontend/components/results-table.tsx`
   `a4e1472fdc4129d20a61faa893d07694dba1528336cfabd257219833cd7d0b4f`
   (already has `className="detail-row"` once; CASE-UA-W8-003 reads it);
   `frontend/components/results-filters.tsx`
   `0ab118e47349efb0c71e4facaf9bdd2844d8ea564f3c1fbf59afbc7e6e22b881`
   (`sortBy`/`sortDirection`/`page`/`search` needles stay);
   `frontend/components/cumulative-traffic.tsx`
   `7d37a3ae2eb8e423a539f85330688bcc863a4e028525bce46222ac1cbbdb45aa`;
   `frontend/app/runs/[runId]/page.tsx`
   `719e05ea0eec73fe948f0c41a9c56c970d6db61cfff0c990e59666136a069072`;
   `frontend/components/query-editor.tsx`
   `92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c`;
   `frontend/components/run-progress.tsx`
   `15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38`;
   `frontend/components/lead-details.tsx`
   `0ceec9058af2c24d65c8ef880848b114674352a2c0593ec0a64914a0f9aefc5b`;
   `frontend/components/section-intro.tsx`
   `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175`. Do not
   change RETRY_DELAYS, poll/fetch, filtersFromParams key names, resultsQuery key
   names, metadata titles, or Link href="/runs".
3. T1 JSX: Import `{ SectionIntro } from "@/components/section-intro"`.
   `frontend/app/leads/page.tsx`: keep `div.run-title-row.app-page-header` and
   `<Link className="ds-button ds-button--secondary" href="/runs">View runs</Link>`
   and metadata title `My leads`. Replace only the inner
   `<div><span className="eyebrow">Live lead workspace</span></div>` (count 1)
   with `<SectionIntro eyebrow="Live lead workspace" title="Every shop you have already found, in one place." copy="One live record per store, with the evidence from every discovering run still attached." />`
   (DEC-UA-003 exact, periods included). `frontend/components/leads/live-leads-workspace.tsx`:
   keep `header.results-heading`, MasterExportButton, navigate/sort/search/apiRequest.
   Replace only the unique inner title block `Current master data` / `Unique
   shops` / `One live record per shop, with every discovering run retained.`
   (each counts 1) with the same three DEC-UA-003 /leads SectionIntro props.
   `frontend/components/run-workspace.tsx`: edit completed-results heading JSX
   only. Keep `div.results-heading`, `div.results-heading-utilities`, ds-badge,
   ExportCsvButton, RunProgress, QueryEditor, polling,
   `const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];`, and the run-title-row
   `<h1>Lead discovery run</h1>`. Replace only the unique inner results-heading
   children `Lead workspace` / `Your store leads` / `Review the evidence, focus
   on qualified prospects, or export the complete dataset.` (each counts 1) with
   `<SectionIntro eyebrow="Lead discovery" title="The stores this search was able to stand behind." copy="Inspect the evidence, then keep the prospects worth approaching." />`
   (DEC-UA-003 completed, periods included).
4. T2 CSS only, three unique hunks, no new selectors. Starting globals.css
   `b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d`. Ending
   digest `f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c`.
   Numstat 3 3. Hunk 1 `.results-table tbody > tr:not(.detail-row) > td`
   replace `height: 3.25rem;` with `min-height: 56px;` (keep the padding
   declaration). Hunk 2 first `.lead-expansion-shell` (width/min-width block)
   replace `padding: 2px;` with `padding: var(--space-5);`. Hunk 3 later
   `.lead-expansion-shell { padding: 0; border: 0;` replace `padding: 0;` with
   `padding: var(--space-5);`. Keep `.results-table .store-column` through
   `.toggle-column` widths byte-identical. Do not edit `.lead-details`, W4
   `.run-form-card`, W5 `.intelligence-card`, W6 `.app-page-header`, W7
   query-editor/progress selectors, tokens, or `.auth-card`.
5. CREATE `test/uphunt-aesthetic-w8.test.ts` with exactly three tests
   CASE-UA-W8-001/002/003. 001: run-workspace.tsx has the SectionIntro import and
   the three completed DEC-UA-003 strings, and still contains
   `const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];`. 002: leads/page.tsx
   has the import, the three /leads DEC-UA-003 strings, and href="/runs";
   live-leads-workspace.tsx has the import and the same three /leads strings.
   003: results-table.tsx contains `className="detail-row"`;
   results-filters.tsx still contains `sortBy` and `sortDirection`;
   run-workspace.tsx still contains `params.get("page")`,
   `params.get("sortBy")`, `params.get("sortDirection")`, and
   `params.get("search")`; globals.css contains `min-height: 56px;` and
   `padding: var(--space-5);` inside a `.lead-expansion-shell` rule.
   recordExecuted after assertions. No fourth test. No getExecuted vs
   REQUIRED_CASE_IDS full-set equality. Import recordExecuted from
   `./uphunt-aesthetic-coverage.test.ts` the same way as the w7 test file.
6. Last FILE leaf (S005) from ABSENT `test/.ua-executed.json` expects exactly 5
   IDs (2 × W1 re-executions + CASE-UA-W8-001/002/003), set digest
   `703c8441470da81b31c474099b78e2cd38b4e2c1c79756e3e0d9d63d14bfc8c7`. The 22-ID
   set {2 × W1} ∪ {4 × W2} ∪ {4 × W3} ∪ {2 × W4} ∪ {2 × W5} ∪ {3 × W6} ∪ {2 × W7}
   ∪ {3 × W8} is asserted only at I001 G5 after `npm test`, digest
   `9da0dc92b33e9eec059c774d2591cd1a1120a77f70110c94312f57f0ec7904fd`. Do not
   require W2–W7 IDs at the w8-only test command. `test/.ua-executed.json` is
   TRACKED at HEAD (19-ID content `0aab3c5911e4a5c624d803286be998e88be8d503a9d95c1acf4f9678ac48f978`); never commit it.
7. I001 G1 is DEC-UA-016: from `frontend/`, `npm test`. Expected 184 tests /
   181 pass / 3 fail (179 predecessor + 2 W1 re-executions from the w8 import +
   3 W8 cases). PASS iff allocated UA CASE tests pass and every failing title, if
   any, is exactly the three named heading-oracle titles; process exit 1 is
   expected and is not G1 FAIL when that holds. G2 DEC-UA-014 needles are
   leads/page.tsx, live-leads-workspace.tsx, run-workspace.tsx,
   uphunt-aesthetic-w8.test.ts (globals.css is not typechecked). G4 is frozen as
   routes {`/leads`, `/design-fixture?scenario=completed`} at 390/768/1280/1440
   only (8 screenshots, height 900). Local next may set
   `STORESIGNAL_DESIGN_FIXTURES=1` for the fixture route. Do not screenshot live
   `/runs/[runId]` (it polls). Unauthenticated `/leads` may 307 to `/sign-in`
   (record it; not a CASE oracle). If the completed fixture cannot render the
   results heading without the same G-R1-style pre-hydration synthetic `.example`
   interception used on UA-W7, that technique is permitted (no live run, no
   credentials); a fixture 404 without that recovery is PARENT_BLOCKED.
   Window-local case digest
   `fb88fd2a8409b4a7527585e36e0868c833b72fa5ee0bb9785747df7babd3e8cc`. Planned
   implementation set {`frontend/app/leads/page.tsx`,
   `frontend/components/leads/live-leads-workspace.tsx`,
   `frontend/components/run-workspace.tsx`, `frontend/app/globals.css`,
   `frontend/test/uphunt-aesthetic-w8.test.ts`}; `A6` records its digest as
   `00726b4e5cd1f95c764afad43bf3208e440a3f536167cfe2048707450c0b33f2`.
8. Do not start UA-W9. Do not edit `section-intro.tsx`, `landing-sections.tsx`,
   `lead-details.tsx`, W7 product/test files, `REQUIRED_CASE_IDS`, parked files,
   or `design-system-shell.test.ts`. After the parent accepts this decomposition,
   identity UA-W8-WINDOW-AGENT executes then personally reviews each FILE leaf in
   the same turn, then itself assigns the next S-number, then personally runs
   I001, then hands off (DEC-UA-015). This assignment does not execute S001.
   Per DEC-UA-015, this S1 §0 contains none of the phrases that decision forbids
   in assignment pastes and §0 freezes; the FILE-leaf sequence below is
   continuous with no parent gate between leaves and no halt before I001.

## 1. Inherited authority and revision pins

| Pin | Value |
|---|---|
| Parent window | `UA-W8` |
| Parent assignment | `ASG-UA-W8-01` |
| Window agent | `UA-W8-WINDOW-AGENT` |
| Parent standard | `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` |
| Sub-window standard | `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` |
| Contract `A1` | `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827` |
| Decision `A3` | `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3` |
| Checklist `A4` | `34d5d8969c85bc57394d4b728b0e489b83537044de96311787f2df539f371cee` |
| Active state `A5` (file digest) | `c6a4ba507365261c14a7e87108e440c4cb2bd71720baf61631fcb5a9c1fc05a3` (state_version 19, ASG-UA-W8-01, IN_PROGRESS) |
| Required coverage set (43 IDs, E6) | `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` (A4 §Coverage pin; asserted by CASE-UA-W1-002) |
| Window-local W8 case set (3 IDs, §4.7) | `fb88fd2a8409b4a7527585e36e0868c833b72fa5ee0bb9785747df7babd3e8cc` (parent consequence 7) |
| Planned implementation set (5 paths, §4.7 digest) | `88a8fc3280241ce819c353c1160d37d48e61f56def1cf726180059d9f64cd9e0` (window agent §4.7 recompute; `A6` consequence 7 recorded `00726b4e…` via unsorted doc order — §4.7 sorting is authoritative, see §1 note) |
| Read-only `frontend/components/section-intro.tsx` | `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175` (recomputed 2026-09-03; matches `EV-UA-A-052`) |
| Predecessor `frontend/test/uphunt-aesthetic-coverage.test.ts` | `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` (recomputed 2026-09-03; matches `EV-UA-A-052`) |
| Predecessor `frontend/test/uphunt-aesthetic-w7.test.ts` | `92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842` (recomputed 2026-09-03; unchanged) |
| Predecessor `frontend/test/.ua-executed.json` | `0aab3c5911e4a5c624d803286be998e88be8d503a9d95c1acf4f9678ac48f978` (19 sorted IDs; TRACKED; never committed by this window) |
| Starting `frontend/app/leads/page.tsx` (S001 baseline) | `9fad9d0b55b5959e75c016fad0643ba81255cb609871140c0b77b0b1d70bed79` (matches `EV-UA-A-052`) |
| Starting `frontend/components/leads/live-leads-workspace.tsx` (S002 baseline) | `294201ad42d2831b1c04d0beef0e3b64ca8874fe4160b5dcd221d6fef488ab01` (matches `EV-UA-A-052`) |
| Starting `frontend/components/run-workspace.tsx` (S003 baseline) | `9472450d3a22143befe5f52569328eb5c07df94fee543ecb873c0ca05914c8c3` (matches `EV-UA-A-052`) |
| Starting `frontend/app/globals.css` (S004 baseline) | `b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d` (matches `EV-UA-A-052`) |
| Starting `frontend/test/uphunt-aesthetic-w8.test.ts` (S005 baseline) | ABSENT (verified 2026-09-03) |
| Zero-edit in-scope `frontend/components/results-table.tsx` | `a4e1472fdc4129d20a61faa893d07694dba1528336cfabd257219833cd7d0b4f` (parent consequence 2) |
| Zero-edit in-scope `frontend/components/results-filters.tsx` | `0ab118e47349efb0c71e4facaf9bdd2844d8ea564f3c1fbf59afbc7e6e22b881` (parent consequence 2) |
| Zero-edit in-scope `frontend/components/cumulative-traffic.tsx` | `7d37a3ae2eb8e423a539f85330688bcc863a4e028525bce46222ac1cbbdb45aa` (parent consequence 2) |
| Zero-edit in-scope `frontend/app/runs/[runId]/page.tsx` | `719e05ea0eec73fe948f0c41a9c56c970d6db61cfff0c990e59666136a069072` (parent consequence 2) |
| Zero-edit in-scope `frontend/components/query-editor.tsx` | `92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c` (parent consequence 2) |
| Zero-edit in-scope `frontend/components/run-progress.tsx` | `15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38` (parent consequence 2) |
| Zero-edit in-scope `frontend/components/lead-details.tsx` | `0ceec9058af2c24d65c8ef880848b114674352a2c0593ec0a64914a0f9aefc5b` (parent consequence 2) |
| `A5` authorized_windows | `[UA-W8]` |
| `A5` may_start_successor | `false` |
| Successor `UA-W9` | reserved for parent; NOT authorized (`A5` prohibited `start_UA-W9`) |

> §1 note on the planned-set digest: parent `A6` consequence 7 records the planned
> implementation-set digest as `00726b4e5cd1f95c764afad43bf3208e440a3f536167cfe2048707450c0b33f2`,
> which is the §4.7 concatenation in the parent's listed (unsorted) document order.
> Sub-window standard §4.7 requires members to be sorted by unsigned UTF-8 byte
> order before concatenation, and states that tool-default/locale ordering is not
> authoritative. The §4.7 digest over the same five frozen paths is therefore
> `88a8fc3280241ce819c353c1160d37d48e61f56def1cf726180059d9f64cd9e0`, which this
> `S1` uses wherever a path-set digest is computed. The five-path set itself is
> unchanged and is the parent-frozen decision; only the §4.7 normalization differs.

All pins recomputed 2026-09-03 by `UA-W8-WINDOW-AGENT` and matched byte-exact
(S3 `EV-UA-W8-D-001`). Root `ACTIVE_EXECUTION_STATE.md` is out of authority and
untouched (coordination root `git status --porcelain` clean, S3 `EV-UA-W8-D-001`).

## 2. Parent-window scope and exclusions (copied, no expansion)

From `A4` §UA-W8 and `A5` `authorized_write_scope`:

- Objective: Completed-run and master-leads chrome, plus the results-table shell
  (`A4` §UA-W8); run-workspace.tsx is shared with UA-W7 read-only; UA-W8 may edit
  completed-results heading JSX only (symbols `results-heading`, completed title
  row), not polling.
- Window write scope (implementation, exactly five authorized paths):
  `frontend/app/leads/page.tsx`, `frontend/components/leads/live-leads-workspace.tsx`,
  `frontend/components/run-workspace.tsx` (completed heading only),
  `frontend/app/globals.css` (owned selectors only), `frontend/test/uphunt-aesthetic-w8.test.ts`.
- Planned changed-file set (§4): exactly five files —
  `frontend/app/leads/page.tsx` (MODIFY),
  `frontend/components/leads/live-leads-workspace.tsx` (MODIFY),
  `frontend/components/run-workspace.tsx` (MODIFY, completed heading only),
  `frontend/app/globals.css` (MODIFY), `frontend/test/uphunt-aesthetic-w8.test.ts`
  (CREATE); §4.7 planned-set digest `88a8fc3280241ce819c353c1160d37d48e61f56def1cf726180059d9f64cd9e0`.
  Three in-scope files have zero required edits and get no FILE sub-window
  (parent consequence 1–2): `frontend/components/results-table.tsx` (already has
  `className="detail-row"` once; CASE-UA-W8-003 reads it), `frontend/components/results-filters.tsx`
  (`sortBy`/`sortDirection`/`page`/`search` needles stay), `frontend/components/cumulative-traffic.tsx`.
  Required changed-file set = planned set (S3 `EV-UA-W8-D-002`).
- Shared-file scope for `frontend/app/globals.css` (`A4`): `.results-table
  tbody > tr:not(.detail-row) > td`, `.lead-expansion-shell`, `.results-table
  .store-column`, `.results-table .toggle-column`. Only the two `padding` and one
  `height`/`min-height` hunks named in parent consequence 4 are edited; every
  other declaration stays byte-identical.
- Read-only scope (window): `frontend/components/run-workspace.tsx` (read-only for
  UA-W7; UA-W8 edits only the completed-results heading), `frontend/app/runs/[runId]/page.tsx`.
- Window-agent coordination writes (never implementation): `S1`, `S2`, `S3` (this
  decomposition), `A6` append-only, `A4` `UA-W8-P*`/`UA-W8-T*`/`UA-W8-V*`/`UA-W8-H*`
  checkboxes only, `frontend/review-evidence/uphunt-aesthetic/UA-W8_HANDOFF.md`,
  screenshots under `frontend/review-evidence/uphunt-aesthetic/UA-W8/` (headless
  chrome only, after the parent accepts this decomposition), and at handoff only
  `A5.current_status: AWAITING_REVIEW` (the sole authorized `A5` handoff action
  after I001 PASS; `A5` is otherwise protected from every leaf).
- Authorized actions: `decompose_UA-W8_under_subwindow_standard`,
  `modify_leads_page`, `modify_live_leads_workspace`,
  `modify_run_workspace_completed_heading_only`, `modify_globals_css_owned_selectors_only`,
  `create_w8_test_file`, `run_frontend_unit_tests`, `run_frontend_npm_test`,
  `run_npx_tsc_noEmit`, `run_npm_run_lint`, `run_headless_chrome_browser_evidence`
  (I001 only), `check_UA-W8_boxes`, `append_A6_evidence`, `write_UA-W8_handoff`,
  `set_A5_AWAITING_REVIEW_on_handoff`; window-agent assessment and coordination
  writes above; sandbox escalation per the E8.1 policy in §12 item 6.
- Prohibited: `start_UA-W9`, `may_start_successor`,
  `execute_FILE_leaves_before_parent_accepts_decomposition`,
  `parent_assign_or_accept_FILE_leaf`, `stop_for_parent_between_FILE_leaves`,
  `treat_AWAITING_WINDOW_REVIEW_as_parent_stop`, `edit_lead-details.tsx`,
  `edit_sort_query_keys`, `edit_RETRY_DELAYS`, `edit_poll_fetch`, `edit_runs_runId_page`,
  `edit_query_editor`, `edit_run_progress`, `edit_results_table_tsx`,
  `edit_results_filters_tsx`, `edit_cumulative_traffic_tsx`, `edit_section_intro`,
  `edit_landing_sections`, `edit_unowned_globals_css_selectors`,
  `edit_app_page_header_or_W6_selectors`, `edit_intelligence_card_or_W5_selectors`,
  `edit_run_form_card_or_W4_selectors`, `edit_query_editor_or_progress_or_W7_selectors`,
  `edit_auth_card`, `edit_lead_details_css`, `add_dependency`,
  `edit_REQUIRED_CASE_IDS`, `edit_uphunt-aesthetic-coverage_test`,
  `edit_uphunt-aesthetic-w2_w3_w4_w5_w6_w7_test_files`,
  `edit_parked_SRC-UA-0092_test_files`, `edit_design-system-shell_test`,
  `edit_unowned_app_or_component_files`, `aws`, `commit`, `push`, `production`,
  `paid_provider`, `edit_email_scraper`, `edit_root_ACTIVE_EXECUTION_STATE`.
  `npm run build` is a UA-W15-only gate.
- `test/.ua-executed.json` is a TRACKED runtime-output path (owner commit
  `d6121aa` residue). It is never a W8 deliverable and is never committed by this
  window; leaves may touch it only through the prescribed §10.4 V-D
  backup/run/restore procedure.

## 3. Starting working-tree inventory (recorded 2026-09-03, read-only)

Repository: `/home/harit/Email Scrapper/frontend` (git toplevel, HEAD `41d6632`
"W7"). Coordination root `/home/harit/Email Scrapper` is a separate git repository
and reported a clean `git status --porcelain` (root `ACTIVE_EXECUTION_STATE.md`
untouched; no owner-controlled change would be overwritten).

Starting changed-file set (frontend repo, `git status --porcelain`, sorted):

1. ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml` — assignment
   fields written by parent for `ASG-UA-W8-01` (`EV-UA-A-052`); working-tree file
   digest `c6a4ba50…` (state_version 19); PROTECTED (no leaf writes; only the
   handoff action `set_A5_AWAITING_REVIEW_on_handoff` may touch it later, never a
   leaf).
2. ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` — append-only evidence
   (`EV-UA-A-052` is its tail); window-agent append-only; PROTECTED against leaf
   writes.

Starting repository change set digest (§4.7 formula over the two paths above):
`e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450`.

Starting state of planned and preserved files (all recomputed 2026-09-03):

- `frontend/app/leads/page.tsx`: present, clean, digest `9fad9d0b…`. Anchors:
  the `@/components/leads/live-leads-workspace` import is line 3; the
  `div.run-title-row.app-page-header` + inner eyebrow block +
  `<Link … href="/runs">View runs</Link>` is line 10; the metadata title
  `My leads` is line 5.
- `frontend/components/leads/live-leads-workspace.tsx`: present, clean, digest
  `294201ad…`. Anchors: the `@/components/leads/master-export-button` import is
  line 8; `header.results-heading` is lines 57–60; the inner title block
  `Current master data` / `Unique shops` / `One live record per shop, with every
  discovering run retained.` is line 58; `MasterExportButton` is line 59.
- `frontend/components/run-workspace.tsx`: present, clean, digest `9472450d…`.
  Anchors: the `@/components/query-editor` import is line 19; the
  `div.results-heading` is lines 326–341; the inner results-heading `<div>`
  (unique `Lead workspace` / `Your store leads` / `Review the evidence, focus on
  qualified prospects, or export the complete dataset.`) is lines 327–334;
  `div.results-heading-utilities` is lines 335–340;
  `const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];` is line 34; the
  run-title-row `<h1>Lead discovery run</h1>` is line 292.
- `frontend/app/globals.css`: present, clean, digest `b5c79578…`. Anchors:
  `.results-table tbody > tr:not(.detail-row) > td` is lines 8074–8077 with
  `height: 3.25rem;` at line 8075; the first `.lead-expansion-shell`
  (width/min-width block) is lines 2338–2347 with `padding: 2px;` at line 2341;
  the later `.lead-expansion-shell { padding: 0; border: 0; … }` is lines 7513+
  with `padding: 0;` at line 7514; `.results-table .store-column` is line 1991
  and `.results-table .toggle-column` is line 1997.
- `frontend/test/uphunt-aesthetic-w8.test.ts`: ABSENT.
- `frontend/components/section-intro.tsx` (read-only): digest `159096f3…`; exports
  `SectionIntro({ eyebrow, title, copy, inverse = false })` rendering
  `div.marketing-heading` with `span.eyebrow` (when eyebrow defined), `h2` title,
  `p` copy (when copy defined).
- Zero-edit in-scope/read-only files (parent consequence 2): `components/results-table.tsx`
  `a4e1472f…`, `components/results-filters.tsx` `0ab118e4…`,
  `components/cumulative-traffic.tsx` `7d37a3ae…`, `app/runs/[runId]/page.tsx`
  `719e05ea…`, `components/query-editor.tsx` `92efe1f7…`,
  `components/run-progress.tsx` `15d840bf…`, `components/lead-details.tsx`
  `0ceec905…`; read-only `section-intro.tsx` `159096f3…`.
- Predecessor and protected files: `test/uphunt-aesthetic-coverage.test.ts`
  `f5137be4…`, `test/uphunt-aesthetic-w7.test.ts` `92201c35…`,
  `test/uphunt-aesthetic-w2.test.ts` `f65ba0c5…`,
  `test/uphunt-aesthetic-w3.test.ts` `635e2802…`,
  `test/uphunt-aesthetic-w4.test.ts` `8008501d…`,
  `test/uphunt-aesthetic-w5.test.ts` `ee6425e9…`,
  `test/uphunt-aesthetic-w6.test.ts` `f78b8da2…`; `frontend/test/.ua-executed.json`
  present, clean, TRACKED, digest `0aab3c5911e4a5c624d803286be998e88be8d503a9d95c1acf4f9678ac48f978`,
  content = exactly 19 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 ×
  CASE-UA-W3} ∪ {2 × CASE-UA-W4} ∪ {2 × CASE-UA-W5} ∪ {3 × CASE-UA-W6} ∪ {2 ×
  CASE-UA-W7} (owner commit `d6121aa` residue; DEC-UA-011 runtime output; never
  committed by W8); `review-evidence/uphunt-aesthetic/UA-W8/` ABSENT.

Environment: node `v24.14.1`; `frontend/package.json` `test` =
`node --experimental-strip-types --test test/*.test.ts`, `lint` = `eslint`;
`tsconfig.json` `incremental: true`, `allowImportingTsExtensions: true`,
`strict: true`, `paths: {"@/*": ["./*"]}`; I001 tsc runs with
`--incremental false --pretty false` so no tsbuildinfo is written.
`/usr/bin/google-chrome` exists (P3; I001 G4 only). `/tmp/opencode` exists as the
prescribed disposable location for leaf V-D backup/restore, the S005 dry-run
validation, and negative probes.

## 4. Initial single-file dependency DAG and intermediate-state contracts

```text
UA-W8-S001 (FILE, modify frontend/app/leads/page.tsx)                ─┐
UA-W8-S002 (FILE, modify frontend/components/leads/live-leads-workspace.tsx) ─┼>
UA-W8-S003 (FILE, modify frontend/components/run-workspace.tsx)     ─┼─> UA-W8-S005 ─> UA-W8-I001
UA-W8-S004 (FILE, modify frontend/app/globals.css)                  ─┘  (FILE, create      (INTEGRATION_ASSESSMENT)
                                                                          test/uphunt-aesthetic-w8.test.ts)
```

Sequential execution order (parent consequence 1 freezes the DAG and prohibits
parallel waves; default one-active-leaf lifecycle): S001, S002, S003, S004, S005,
I001. IDs S001–S005 are used exactly as named by the parent; no zero-edit in-scope
file consumes an S-number.

- Edges S001→S002→S003→S004: parent-frozen sequencing (consequences 1 and 8), not
  a data dependency; the four files are mutually independent and are executed one
  at a time because the parent authorizes exactly one active leaf and requires
  same-identity review between leaves.
- Edge S005→(S001–S004): CASE-UA-W8-001/002/003 (in S005) read the post-S001/S002/
  S003/S004 file states; the test file must be authored and executed against the
  post-leaf file states, otherwise its oracles are false before the work exists.
- Edge S005→I001: whole-window gates require all five planned files assembled.
- No planned file consumes any interface produced inside this window except the
  §5.1 frozen states; the only consumed cross-file interfaces are predecessor
  outputs, the read-only `SectionIntro` export, the read-only `results-table.tsx`
  / `results-filters.tsx` needles, and the post-S001/S002/S003/S004 file states.

### 4.1 Intermediate-state contracts

| After | Permitted checks | Expected temporary state | Why safe | Resolved by | Prohibited while pending |
|---|---|---|---|---|---|
| S001 accepted | S001 §6.4 only | leads/page.tsx renders `<SectionIntro>` with the three /leads DEC-UA-003 strings; w8 test file still ABSENT so `npm test` would still report 179/176/3 (w8 file not yet in the test glob); no permitted check fails in this state | local workspace only; no deployment or external surface; no CASE test runs at leaf level (`npm test` prohibited at leaves) | S005 adds the asserting tests | editing any other planned file, `section-intro.tsx`, a preserved file, or a zero-edit in-scope file; running `npm test`; successor work |
| S002 accepted | S002 §7.4 only | live-leads-workspace.tsx renders `<SectionIntro>` in the kept `results-heading`; same pending-test state as above | same as above | S005 | any second-file edit; running `npm test`; successor work |
| S003 accepted | S003 §8.4 only | run-workspace.tsx renders `<SectionIntro>` in the kept `div.results-heading`; `RETRY_DELAYS`, `div.results-heading-utilities`, ds-badge, ExportCsvButton, RunProgress, QueryEditor, polling unchanged; same pending-test state as above | same as above | S005 | any second-file edit; running `npm test`; successor work |
| S004 accepted | S004 §9.4 only | globals.css has the three hunks applied; `.results-table .store-column`/`.toggle-column` widths byte-identical; `.lead-details`/W4/W5/W6/W7 selectors untouched; same pending-test state | same as above | S005 | any second-file edit; running `npm test`; successor work |
| S005 accepted | S005 §10.4 only; whole-window gates remain PENDING | w8-only run executed from ABSENT-json state produced exactly 5 IDs then restored; `.ua-executed.json` byte-identical to HEAD (`0aab3c59…`); repo delta = the five planned files only | test file is not imported by app code; runtime json restored per §10.4 V-D | I001 | any additional-file edit; committing `.ua-executed.json`; successor work |

Unexpected failures at any row stop the sequence for diagnosis (no silent
progression). No permitted intermediate check is expected to fail.

## 5. Exact allocation of requirements, decisions, interfaces, and coverage cases

Parent trace for `UA-W8` (all IDs from `A1`/`A3`/`A4`):

| Parent ID | Allocated to | Terminal anchor |
|---|---|---|
| UA-W8 objective (`SCN-UA-002`, `SCN-UA-003`) | `UA-W8-S001` §6.2 + `UA-W8-S002` §7.2 + `UA-W8-S003` §8.2 + `UA-W8-S004` §9.2 | `<SectionIntro>` with DEC-UA-003 strings in the kept wrappers; `min-height: 56px;` and `padding: var(--space-5);` hunks |
| UA-W8-T1 | `UA-W8-S001` §6.2 + `UA-W8-S002` §7.2 + `UA-W8-S003` §8.2 | leads/page.tsx ending digest `21a17799…`; live-leads-workspace.tsx ending digest `a646f657…`; run-workspace.tsx ending digest `643c3568…`; sort query keys unchanged (`sortBy`, `sortDirection`, `page`, `search`) |
| UA-W8-T2 | `UA-W8-S004` §9.2 | globals.css ending digest `f1a7e45a…`; numstat 3 3; widths byte-identical |
| UA-W8-T3 | `UA-W8-S005` §10.3 | three tests, CASE-UA-W8-001/002/003; sort query keys unchanged; RETRY_DELAYS pin |
| CASE-UA-W8-001 (`SCN-UA-002`) | `UA-W8-S005` test 1 | run-workspace.tsx import + 3 completed DEC-UA-003 strings + RETRY_DELAYS needle |
| CASE-UA-W8-002 (`SCN-UA-002`) | `UA-W8-S005` test 2 | leads/page.tsx import + 3 /leads DEC-UA-003 strings + href="/runs"; live-leads-workspace.tsx import + 3 /leads strings |
| CASE-UA-W8-003 (`SCN-UA-003`) | `UA-W8-S005` test 3 | results-table.tsx `className="detail-row"`; results-filters.tsx `sortBy` + `sortDirection`; run-workspace.tsx `params.get("page")`/`sortBy`/`sortDirection`/`search`; globals.css `min-height: 56px;` + `padding: var(--space-5);` in a `.lead-expansion-shell` rule |
| NC-UA-002 / NC-UA-003 family | S005 §10.4 V-C N1/N2/N3 + `UA-W8-I001` G8 | removing a DEC-UA-003 string, a SectionIntro import, or the `detail-row` class falsifies the corresponding oracle |
| Read-only pins (RETRY_DELAYS, sort keys, detail-row) | S005 §10.4 V-D N4/N5 + `UA-W8-I001` G8 | altering RETRY_DELAYS, a sort key, or removing `detail-row` falsifies CASE-UA-W8-001/003 |
| DEC-UA-002 | S001/S002/S003 imports of the frozen `SectionIntro` export; no third heading component | `import { SectionIntro } from "@/components/section-intro";` in all three files; `section-intro.tsx` read-only `159096f3…` |
| DEC-UA-003 | exact strings in S001/S002/S003; oracles in S005 | JSX text nodes match including periods; no paraphrase |
| DEC-UA-006 | §2 prohibited paths; I001 G6 forbidden-path search | 0 hits |
| DEC-UA-011 | S005 `recordExecuted` import + call-after-witness ordering; `.ua-executed.json` handling | three `recordExecuted` calls, each after its oracle; json never committed |
| DEC-UA-013 | leaf preflights P1/P2 | git status before/after (frontend + coordination root) |
| DEC-UA-014 | `UA-W8-I001` gate G2 | zero tsc diagnostic lines on the owned-path needles |
| DEC-UA-015 | same-identity execute-then-review; window agent assigns next S-number; §0 freeze | no parent leaf gates; no halt at AWAITING_WINDOW_REVIEW |
| DEC-UA-016 | `UA-W8-I001` gate G1 | 184/181/3; failing titles ⊆ heading-oracle set |
| UA-W8-P1..P4, UA-W8-V1..V5, UA-W8-H1..H6 | `UA-W8-I001` / handoff | `A4` UA-W8 lifecycle boxes checked with evidence at I001 |

The remaining 40 coverage CASE IDs belong to other/later windows per the
`test_registration` column of `A4` §Coverage. Window-required local case set =
{CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003}, §4.7 set digest
`fb88fd2a8409b4a7527585e36e0868c833b72fa5ee0bb9785747df7babd3e8cc` (matches the
parent pin in `EV-UA-A-052` consequence 7).

### 5.1 Frozen cross-file interfaces (inherited and produced)

- `SectionIntro` consumed export (frozen by DEC-UA-002, file pinned `159096f3…`):
  `import { SectionIntro } from "@/components/section-intro";` with props
  `{ eyebrow?: ReactNode; title: ReactNode; copy?: ReactNode; inverse?: boolean }`;
  renders `div.marketing-heading` (optionally `is-inverse`) containing
  `span.eyebrow`, `h2`, `p`. The three JSX leaves consume exactly this export; no
  leaf may edit the component.
- `recordExecuted(id: string): void` — produced by `UA-W1-T1`, pinned at file
  digest `f5137be4…`. S005 imports it from
  `./uphunt-aesthetic-coverage.test.ts` and calls it exactly once per test, after
  that test's assertions. `REQUIRED_CASE_IDS` already contains the three W8 IDs
  (`CASE-UA-W8-001/002/003`); it is never edited here.
- Read-only needles consumed by S005 (byte-exact; occurrence counts verified by
  inspection, S3 `EV-UA-W8-D-002`):
  - N-RW `const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];`
  - N-RW2 `params.get("page")`, `params.get("sortBy")`, `params.get("sortDirection")`,
    `params.get("search")` in `run-workspace.tsx`
  - N-RT `className="detail-row"` in `results-table.tsx`
  - N-RF `sortBy` and `sortDirection` in `results-filters.tsx`
  - N-CSS `min-height: 56px;` and `padding: var(--space-5);` in `globals.css`
- Ending digests produced by the leaves and consumed by S005/I001 (deterministic
  simulations from the §3 starting digests, S3 `EV-UA-W8-D-002`):
  - S001 `frontend/app/leads/page.tsx` →
    `21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b`
  - S002 `frontend/components/leads/live-leads-workspace.tsx` →
    `a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36`
  - S003 `frontend/components/run-workspace.tsx` →
    `643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3`
  - S004 `frontend/app/globals.css` →
    `f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c`
    (matches parent consequence 4 pin)
  - S005 `frontend/test/uphunt-aesthetic-w8.test.ts` →
    `cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0`
    (exact §10.3 bytes, dry-run validated)

## 6. Initial implementation sub-window `UA-W8-S001`

```yaml
subwindow_id: UA-W8-S001
type: FILE
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
assigned_agent: UNASSIGNED
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/leads/page.tsx
file_operation: MODIFY
starting_file_digest: 9fad9d0b55b5959e75c016fad0643ba81255cb609871140c0b77b0b1d70bed79
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W8)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §6)
  - frontend/components/section-intro.tsx (consumed export, pinned 159096f3…)
  - frontend/app/leads/page.tsx (own file)
authorized_actions:
  - apply_the_two_ordered_replacements_of_section_6.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_run_title_row_wrapper_or_the_View_runs_link
  - change_metadata_title_My_leads
  - change_href_runs_dynamic_export_or_LiveLeadsWorkspace_usage
  - edit_section_intro_tsx_or_any_preserved_or_zero_edit_file
  - edit_live_leads_workspace_run_workspace_globals_css_or_the_w8_test_file
  - paraphrase_any_DEC-UA-003_string_or_drop_a_period
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W8-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W9
may_start_successor: false
```

### 6.1 Mechanical trace

UA-W8-T1; UA-W8 objective (`SCN-UA-002`); DEC-UA-002; DEC-UA-003
(/leads page strings); DEC-UA-013 (preflight); parent consequences 2, 3, and 8.
Terminal anchor: the §6.2 replacements; ending digest pin `21a17799…`. Every
requirement allocated here terminates in a file anchor verified by §6.4 checks and
by S005's CASE-UA-W8-002 oracles.

### 6.2 Exact file transformation (two ordered replacements; each anchor count == 1)

Apply in this order. Each OLD string occurs exactly once in the starting file
(verified by simulation, S3 `EV-UA-W8-D-002`); if any count differs, STOP and
report — do not improvise.

**R1 — import** (line 3 region). The new import joins the `@/` group directly
after the `LiveLeadsWorkspace` import:

OLD:

```tsx
import { LiveLeadsWorkspace } from "@/components/leads/live-leads-workspace";
```

NEW:

```tsx
import { LiveLeadsWorkspace } from "@/components/leads/live-leads-workspace";
import { SectionIntro } from "@/components/section-intro";
```

**R2 — inner eyebrow block** (line 10). The `div.run-title-row.app-page-header`
wrapper and the `<Link className="ds-button ds-button--secondary" href="/runs">View runs</Link>`
and metadata title `My leads` are kept byte-identical. The DEC-UA-003 /leads
strings replace the old eyebrow content including its periods.

OLD:

```tsx
    <div className="run-title-row app-page-header"><div><span className="eyebrow">Live lead workspace</span></div><Link className="ds-button ds-button--secondary" href="/runs">View runs</Link></div>
```

NEW:

```tsx
    <div className="run-title-row app-page-header"><SectionIntro eyebrow="Live lead workspace" title="Every shop you have already found, in one place." copy="One live record per store, with the evidence from every discovering run still attached." /><Link className="ds-button ds-button--secondary" href="/runs">View runs</Link></div>
```

Operation ordering: single atomic file write after both replacements are prepared;
no intermediate partial state is saved. Obsolete behavior removed from this file:
the inner `<div><span className="eyebrow">Live lead workspace</span></div>` block.
Resulting numstat is exactly `2 1` (simulated, S3 `EV-UA-W8-D-002`).

### 6.3 Preserved behavior and forbidden edits (within the writable file)

- `import type { Metadata }`, `import Link from "next/link"`, all imports except
  the inserted SectionIntro line, `export const metadata: Metadata = { title:
  "My leads" }`, `export const dynamic = "force-dynamic"`, the
  `export default function LeadsPage()` body —
  byte-identical.
- `main.app-canvas.run-page.run-page-completed`, `div.shell`, `div.run-title-row.app-page-header`,
  `<Link className="ds-button ds-button--secondary" href="/runs">View runs</Link>`,
  `<LiveLeadsWorkspace />` — byte-identical.
- The three DEC-UA-003 strings must include their trailing periods exactly; no
  paraphrase, no case change, no added marketing-heading className on the wrapper.
- Do not change `href="/runs"`, the metadata title `My leads`, or the `dynamic`
  export.

### 6.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: `git status --porcelain` in frontend/ and coordination root; `sha256sum app/leads/page.tsx` | frontend porcelain == exactly the two §3 protected paths; coordination root clean; digest == `9fad9d0b…` |
| V-B | Apply §6.2 edits with exact-match tooling (each OLD count == 1 before replacing) | 2 replacements applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- app/leads/page.tsx` and full `git diff` inspection | numstat == `2  1` for `frontend/app/leads/page.tsx`; the diff contains exactly the §6.2 R1 and R2 changes and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state: `import { SectionIntro } from "@/components/section-intro";` == 1; `Live lead workspace` == 1; `Every shop you have already found, in one place.` == 1; `One live record per store, with the evidence from every discovering run still attached.` == 1; `<SectionIntro` == 1; `Live lead workspace</span>` == 0; `eyebrow">Live lead workspace` == 0; `run-title-row app-page-header` == 1; `href="/runs"` == 1; `My leads` == 1; `force-dynamic` == 1; `<LiveLeadsWorkspace />` == 1 | every assertion true |
| V-E | `sha256sum app/leads/page.tsx`; `git status --porcelain` | ending digest == `21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b`; attributable delta == ` M app/leads/page.tsx` exactly (the two §3 protected paths unchanged); no other path |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W8-I001` G1–G9) |

Negative controls: none at this leaf — the ending-digest pin (V-E) mechanically
falsifies any deviation, and the copy/import falsification probes are assigned at
the narrowest effective level in S005 §10.4 V-C and I001 G8.

Expected workspace write set: exactly `{frontend/app/leads/page.tsx}`.

### 6.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match.
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline.
- [ ] T1 Apply every ordered transformation and no other edit to the writable file.
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions.
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file.
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips.
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations.
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred.
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW.

(S001 V3: required local coverage IDs = {} = registered = executed; the window's
coverage cases execute in S005.)

## 7. Initial implementation sub-window `UA-W8-S002`

```yaml
subwindow_id: UA-W8-S002
type: FILE
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
assigned_agent: UNASSIGNED
predecessors: [UA-W8-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/leads/live-leads-workspace.tsx
file_operation: MODIFY
starting_file_digest: 294201ad42d2831b1c04d0beef0e3b64ca8874fe4160b5dcd221d6fef488ab01
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W8)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §7)
  - frontend/components/section-intro.tsx (consumed export, pinned 159096f3…)
  - frontend/components/leads/live-leads-workspace.tsx (own file)
authorized_actions:
  - apply_the_two_ordered_replacements_of_section_7.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_header_results_heading_wrapper_or_any_other_markup_below_it
  - edit_the_MasterExportButton_callsite
  - change_navigate_sort_search_apiRequest_or_any_data_fetch_logic
  - change_page_pageSize_sortBy_sortDirection_search_derivation
  - edit_section_intro_tsx_or_any_preserved_or_zero_edit_file
  - edit_leads_page_run_workspace_globals_css_or_the_w8_test_file
  - paraphrase_any_DEC-UA-003_string_or_drop_a_period
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W8-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W9
may_start_successor: false
```

### 7.1 Mechanical trace

UA-W8-T1; UA-W8 objective (`SCN-UA-002`); DEC-UA-002; DEC-UA-003
(live-leads workspace strings); DEC-UA-013; parent consequences 2, 3, and 8.
Predecessor: UA-W8-S001 (parent-frozen sequencing, §4). Terminal anchor: the §7.2
replacements; ending digest pin `a646f657…`.

### 7.2 Exact file transformation (two ordered replacements; each anchor count == 1)

**R1 — import** (line 8 region). The new import joins the `@/components/leads/`
group directly after the `MasterExportButton` import (house style: components
before lib):

OLD:

```tsx
import { MasterExportButton } from "@/components/leads/master-export-button";
```

NEW:

```tsx
import { MasterExportButton } from "@/components/leads/master-export-button";
import { SectionIntro } from "@/components/section-intro";
```

**R2 — inner `.results-heading` title block** (line 58). The
`<header className="results-heading">` wrapper and the
`<MasterExportButton search={search} discoveryQueries={discoveryQueries} />` are
kept byte-identical. The inner title block's three /leads DEC-UA-003 strings
replace the old eyebrow/h2/p content including their periods.

OLD:

```tsx
        <div><span className="eyebrow">Current master data</span><h2>Unique shops</h2><p>One live record per shop, with every discovering run retained.</p></div>
```

NEW:

```tsx
        <SectionIntro eyebrow="Live lead workspace" title="Every shop you have already found, in one place." copy="One live record per store, with the evidence from every discovering run still attached." />
```

Operation ordering: single atomic file write after both replacements are prepared.
Obsolete behavior removed from this file: the inner `<div><span
className="eyebrow">Current master data</span><h2>Unique shops</h2><p>One live
record per shop, with every discovering run retained.</p></div>` block. Resulting
numstat is exactly `2 1` (simulated, S3 `EV-UA-W8-D-002`).

### 7.3 Preserved behavior and forbidden edits (within the writable file)

- All imports except the inserted SectionIntro line, `useCallback`/`useEffect`/
  `useMemo`/`useRef`/`useState`, `useRouter`/`useSearchParams`, `CumulativeTrafficSection`,
  `ResultsTable`, `SearchIcon`, all state, `draft`/`lastSearch`/`data`/`error`/
  `trafficSettled`/`searchTimer`, `handleTrafficSettled`, `query`, `navigate`,
  `scheduleSearch`, `apiRequest`, `errorMessage`, `parseMasterLeadPage`, the
  returned fragment and all its children below `header.results-heading` —
  byte-identical.
- `<header className="results-heading">`, `<MasterExportButton search={search}
  discoveryQueries={discoveryQueries} />` — byte-identical.
- The `page`/`search`/`sortBy`/`sortDirection` derivation, the `navigate(...)`
  logic, and the `apiRequest<MasterLeadPage>(...)` fetch — byte-identical
  (`pageSize: "25"`, `sortBy`, `sortDirection`, `search`, `discoveryQuery`).
- The three DEC-UA-003 strings must include their trailing periods exactly; no
  paraphrase, no case change, no added marketing-heading className on the wrapper.

### 7.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S001 accepted with ending digest `21a17799…` (recompute); frontend porcelain == the two §3 protected paths + ` M app/leads/page.tsx`; coordination root clean; `sha256sum components/leads/live-leads-workspace.tsx` == `294201ad…` | all true |
| V-B | Apply §7.2 edits with exact-match tooling (each OLD count == 1 before replacing) | 2 replacements applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- components/leads/live-leads-workspace.tsx` and full `git diff` inspection | numstat == `2  1`; the diff contains exactly the §7.2 R1 and R2 changes and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state: SectionIntro import == 1; `Live lead workspace` == 1; `Every shop you have already found, in one place.` == 1; `One live record per store, with the evidence from every discovering run still attached.` == 1; `<SectionIntro` == 1; `Current master data` == 0; `Unique shops` == 0; `One live record per shop, with every discovering run retained.` == 0; `results-heading` == 1; `<MasterExportButton` == 1; `navigate(` == 6 (definition + the scheduleSearch, search-keydown, sort-select, and two pagination call sites); `apiRequest<MasterLeadPage>` == 1; `pageSize: "25"` == 1 | every assertion true |
| V-E | `sha256sum components/leads/live-leads-workspace.tsx`; `git status --porcelain` | ending digest == `a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36`; attributable delta == ` M app/leads/page.tsx` + ` M components/leads/live-leads-workspace.tsx` exactly |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W8-I001` G1–G9) |

Expected workspace write set: exactly `{frontend/components/leads/live-leads-workspace.tsx}`.

### 7.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match.
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline.
- [ ] T1 Apply every ordered transformation and no other edit to the writable file.
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions.
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file.
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips.
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations.
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred.
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW.

(S002 V3: required local coverage IDs = {} = registered = executed.)

## 8. Initial implementation sub-window `UA-W8-S003`

```yaml
subwindow_id: UA-W8-S003
type: FILE
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
assigned_agent: UNASSIGNED
predecessors: [UA-W8-S001, UA-W8-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/run-workspace.tsx
file_operation: MODIFY
starting_file_digest: 9472450d3a22143befe5f52569328eb5c07df94fee543ecb873c0ca05914c8c3
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W8)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §8)
  - frontend/components/section-intro.tsx (consumed export, pinned 159096f3…)
  - frontend/components/run-workspace.tsx (own file)
authorized_actions:
  - apply_the_two_ordered_replacements_of_section_8.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_results_heading_utilities_ds_badge_or_ExportCsvButton
  - edit_RunProgress_QueryEditor_polling_connectionWarning_terminalError_SummaryCard_Pagination
  - edit_RETRY_DELAYS_filtersFromParams_resultsQuery_changeFilters_any_sort_key
  - edit_the_run_title_row_or_the_Lead_discovery_run_h1
  - edit_section_intro_tsx_or_any_preserved_or_zero_edit_file
  - edit_leads_page_live_leads_workspace_globals_css_or_the_w8_test_file
  - paraphrase_any_DEC-UA-003_string_or_drop_a_period
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W8-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W9
may_start_successor: false
```

### 8.1 Mechanical trace

UA-W8-T1; UA-W8 objective (`SCN-UA-002`); DEC-UA-002; DEC-UA-003
(completed-results strings); DEC-UA-013; parent consequences 2, 3, and 8.
Predecessors: S001–S002 (parent-frozen sequencing, §4). Terminal anchor: the §8.2
replacements; ending digest pin `643c3568…`.

### 8.2 Exact file transformation (two ordered replacements; each anchor count == 1)

**R1 — import** (line 19 region). The new import joins the `@/` group directly
after the `QueryEditor` import:

OLD:

```tsx
import { QueryEditor } from "@/components/query-editor";
```

NEW:

```tsx
import { QueryEditor } from "@/components/query-editor";
import { SectionIntro } from "@/components/section-intro";
```

**R2 — inner `.results-heading` children** (lines 327–334). The
`<div className="results-heading">` wrapper, `div.results-heading-utilities`, the
ds-badge span (`runStateTone`/`runStateLabel`), and `ExportCsvButton` are kept
byte-identical. The completed DEC-UA-003 strings replace the old eyebrow/h2/p
content including their periods.

OLD:

```tsx
              <div>
                <span className="eyebrow">Lead workspace</span>
                <h2>Your store leads</h2>
                <p>
                  Review the evidence, focus on qualified prospects, or export
                  the complete dataset.
                </p>
              </div>
```

NEW:

```tsx
              <SectionIntro eyebrow="Lead discovery" title="The stores this search was able to stand behind." copy="Inspect the evidence, then keep the prospects worth approaching." />
```

Operation ordering: single atomic file write after both replacements are prepared.
Obsolete behavior removed from this file: the inner `<div>` block containing
`Lead workspace` / `Your store leads` / `Review the evidence, focus on qualified
prospects, or export the complete dataset.`. Resulting numstat is exactly `2 8`
(simulated, S3 `EV-UA-W8-D-002`).

### 8.3 Preserved behavior and forbidden edits (within the writable file)

- All imports except the inserted SectionIntro line (including
  `SORT_FIELDS`/`STATUSES`), `RETRY_DELAYS`, `filtersFromParams`, `resultsQuery`,
  `formatDate`, the `PollStatus`-driven `poll()`/`apiRequest` fetch, the
  `results`/`query`/`resultsPollVersion` effects, `changeFilters`,
  `copyRunId`, the `statusError`/`!run`/`awaiting_query_confirmation`/terminal
  return branches, `RunProgress`, `CumulativeTrafficSection`, `ResultsFilters`,
  `ResultsTable`, `Pagination`,
  `SummaryCard`, the run-title-row `<h1>Lead discovery run</h1>` — byte-identical.
- `const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];` — byte-identical
  (occurrence count == 1).
- `filtersFromParams` key names `page` / `status` / `sortBy` / `sortDirection` /
  `search` and `resultsQuery` key names `page` / `pageSize` / `sortBy` /
  `sortDirection` / `status` / `search` / `discoveryQuery` — byte-identical.
- `<div className="results-heading">`, `<div className="results-heading-utilities">`,
  `<span className={\`ds-badge ${runStateTone(run.state)}\`}>`, `ExportCsvButton` —
  byte-identical.
- The three DEC-UA-003 strings must include their trailing periods exactly; no
  paraphrase, no case change, no added marketing-heading className on the
  `.results-heading` wrapper. `Lead discovery` must occur at least once (the
  eyebrow prop); the h1 `Lead discovery run` is preserved and unrelated.

### 8.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S002 accepted with ending digest `a646f657…` (recompute); S001 ending digest `21a17799…` (recompute); frontend porcelain == the two §3 protected paths + ` M app/leads/page.tsx` + ` M components/leads/live-leads-workspace.tsx`; coordination root clean; `sha256sum components/run-workspace.tsx` == `9472450d…` | all true |
| V-B | Apply §8.2 edits with exact-match tooling (each OLD count == 1 before replacing) | 2 replacements applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- components/run-workspace.tsx` and full `git diff` inspection | numstat == `2  8`; the diff contains exactly the §8.2 R1 and R2 changes and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state: SectionIntro import == 1; `Lead discovery` >= 1 (eyebrow prop; may collide with the preserved h1 substring `Lead discovery run`); `The stores this search was able to stand behind.` == 1; `Inspect the evidence, then keep the prospects worth approaching.` == 1; `<SectionIntro` == 1; `Lead workspace` == 0; `Your store leads` == 0; `Review the evidence, focus on qualified prospects` == 0; `const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];` == 1; `results-heading-utilities` == 1; `ExportCsvButton` == 2 (import + usage); `<RunProgress` == 1; `params.get("page")` == 1; `params.get("sortBy")` == 1; `params.get("sortDirection")` == 1; `params.get("search")` == 1 | every assertion true |
| V-E | `sha256sum components/run-workspace.tsx`; `git status --porcelain` | ending digest == `643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3`; attributable delta == the three ` M` planned implementation paths exactly |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W8-I001` G1–G9) |

Expected workspace write set: exactly `{frontend/components/run-workspace.tsx}`.

### 8.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match.
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline.
- [ ] T1 Apply every ordered transformation and no other edit to the writable file.
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions.
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file.
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips.
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations.
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred.
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW.

(S003 V3: required local coverage IDs = {} = registered = executed.)

## 9. Initial implementation sub-window `UA-W8-S004`

```yaml
subwindow_id: UA-W8-S004
type: FILE
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
assigned_agent: UNASSIGNED
predecessors: [UA-W8-S001, UA-W8-S002, UA-W8-S003]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/globals.css
file_operation: MODIFY
starting_file_digest: b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W8)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §9)
  - frontend/app/globals.css (own file)
authorized_actions:
  - apply_the_three_ordered_hunks_of_section_9.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - add_a_new_selector_or_change_any_selector_name
  - edit_lead_details_or_lead_details_css
  - edit_run_form_card_or_W4_selectors
  - edit_intelligence_card_or_W5_selectors
  - edit_app_page_header_or_W6_selectors
  - edit_query_editor_progress_or_W7_selectors
  - edit_auth_card
  - edit_tokens_or_variables
  - change_results_table_store_column_through_toggle_column_widths
  - remove_the_padding_declaration_in_the_collapsed_row_rule
  - edit_section_intro_tsx_or_any_preserved_or_zero_edit_file
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W8-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W9
may_start_successor: false
```

### 9.1 Mechanical trace

UA-W8-T2; UA-W8 objective (`SCN-UA-003`); DEC-UA-003 (visual chrome via CSS
hunks); DEC-UA-013; parent consequences 2, 4, and 8. Predecessors: S001–S003
(parent-frozen sequencing, §4). Terminal anchor: the §9.2 three hunks; ending
digest pin `f1a7e45a…` (parent consequence 4).

### 9.2 Exact file transformation (three ordered hunks; each OLD anchor distinguished uniquely)

**H1 — collapsed-row cell height** (line 8075). In `.results-table tbody >
tr:not(.detail-row) > td`, replace `height: 3.25rem;` (occurrence count == 1 in
that rule) with `min-height: 56px;`, keeping `padding: 0.375rem 0.625rem;`
byte-identical. OLD fence for the tooling:

```
  height: 3.25rem;
  padding: 0.375rem 0.625rem;
```

NEW fence:

```
  min-height: 56px;
  padding: 0.375rem 0.625rem;
```

**H2 — first `.lead-expansion-shell` (width/min-width block)** (lines 2338–2347).
Replace `padding: 2px;` (occurrence count == 1 in that block) with
`padding: var(--space-5);`, keeping `width: 100%;`, `min-width: 0;`,
`overflow: visible;`, `border: 1px solid var(--color-line-strong);`,
`border-radius: var(--radius-card);`, `background: var(--color-surface);`,
`box-shadow: var(--elevation-inset);` byte-identical. OLD fence:

```
  width: 100%;
  min-width: 0;
  padding: 2px;
  overflow: visible;
```

NEW fence:

```
  width: 100%;
  min-width: 0;
  padding: var(--space-5);
  overflow: visible;
```

**H3 — later `.lead-expansion-shell`** (lines 7513–7519). In the second
`.lead-expansion-shell { padding: 0; border: 0; … }` rule, replace the leading
`padding: 0;` (occurrence count == 1 in that rule) with `padding: var(--space-5);`,
keeping `border: 0;`, `border-radius: 0;`, `background: transparent;`,
`box-shadow: none;` byte-identical. OLD fence:

```
.lead-expansion-shell {
  padding: 0;
  border: 0;
  border-radius: 0;
```

NEW fence:

```
.lead-expansion-shell {
  padding: var(--space-5);
  border: 0;
  border-radius: 0;
```

Operation ordering: single atomic file write after all three hunks are prepared.
Resulting numstat is exactly `3 3` (simulated, S3 `EV-UA-W8-D-002`; matches parent
consequence 4).

### 9.3 Preserved behavior and forbidden edits (within the writable file)

- `.results-table .store-column { width: 28%; }` and `.results-table
  .toggle-column { width: 7%; }` and every column width between them —
  byte-identical.
- `.lead-details`, `.lead-detail-grid`, the W4 `.run-form-card`, W5
  `.intelligence-card`, W6 `.app-page-header`, W7 `.query-editor` /
  `.progress-card` / `.progress-stage` selectors, tokens (`--space-*`, `--color-*`,
  `--radius-*`), and `.auth-card` — byte-identical.
- The collapsed-row rule keeps `padding: 0.375rem 0.625rem;` and its
  `:first-child`/`:last-child` siblings — byte-identical.

### 9.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S003 accepted with ending digest `643c3568…` (recompute); frontend porcelain == the two §3 protected paths + the three prior ` M` planned implementation paths; coordination root clean; `sha256sum app/globals.css` == `b5c79578…` | all true |
| V-B | Apply §9.2 hunks with exact-match tooling (each named OLD fence count == 1 before replacing) | 3 hunks applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- app/globals.css` and full `git diff` inspection | numstat == `3  3`; the diff contains exactly the §9.2 H1, H2, H3 hunks and no other hunk or selector change |
| V-D | Read-only node inspection of the file, asserting post-state: `min-height: 56px;` == 1 (the collapsed-row rule); `height: 3.25rem;` == 0; `padding: var(--space-5);` == 3 (the two `.lead-expansion-shell` rules @2341/7514 plus the pre-existing unrelated rule @6066); `padding: 2px;` == 0; `.lead-expansion-shell` occurrence count == 2; `.results-table .store-column` == 1; `.results-table .toggle-column` == 1; `width: 28%;` == 1; `width: 7%;` == 1; `border: 0;` present in the second `.lead-expansion-shell` rule unchanged; the `.lead-details`, W4/W5/W6/W7, and `.auth-card` regions are byte-identical as a whole (proven by the numstat == 3 3 and the ending-digest pin V-E, not by fragile substring counts) | every assertion true |
| V-E | `sha256sum app/globals.css`; `git status --porcelain` | ending digest == `f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c`; attributable delta == the four ` M` planned implementation paths exactly |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W8-I001` G1–G9) |

Expected workspace write set: exactly `{frontend/app/globals.css}`.

### 9.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match.
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline.
- [ ] T1 Apply every ordered transformation and no other edit to the writable file.
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions.
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file.
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips.
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations.
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred.
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW.

(S004 V3: required local coverage IDs = {} = registered = executed.)

## 10. Initial implementation sub-window `UA-W8-S005`

```yaml
subwindow_id: UA-W8-S005
type: FILE
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
assigned_agent: UNASSIGNED
predecessors: [UA-W8-S001, UA-W8-S002, UA-W8-S003, UA-W8-S004]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w8.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/app/leads/page.tsx (post-S001 state, digest 21a17799…)
  - frontend/components/leads/live-leads-workspace.tsx (post-S002 state, digest a646f657…)
  - frontend/components/run-workspace.tsx (post-S003 state, digest 643c3568…)
  - frontend/app/globals.css (post-S004 state, digest f1a7e45a…)
  - frontend/components/results-table.tsx (read-only pin, digest a4e1472f…)
  - frontend/components/results-filters.tsx (read-only pin, digest 0ab118e4…)
  - frontend/test/uphunt-aesthetic-coverage.test.ts (pinned f5137be4…)
  - frontend/test/uphunt-aesthetic-w7.test.ts (import-style predecessor, pinned 92201c35…)
  - frontend/test/.ua-executed.json (runtime state, HEAD digest 0aab3c59…)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §10)
authorized_actions:
  - create_the_writable_file_with_the_exact_section_10.3_bytes
  - run_the_w8_only_test_command_under_the_section_10.4_V-D_backup_run_restore_procedure
  - run_disposable_in_memory_negative_probes_V-C_via_node_-e (zero workspace writes)
  - run_read_only_node_inspection
  - record_git_status_preflight_and_postcondition
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_four_planned_product_files_or_the_read_only_pin_files
  - add_a_fourth_test_or_a_skip_filter_or_todo
  - assert_getExecuted_equals_REQUIRED_CASE_IDS_full_set_equality
  - call_recordExecuted_before_a_tests_assertions
  - edit_REQUIRED_CASE_IDS_or_the_coverage_test_file
  - commit_or_stage_test/.ua-executed.json
  - delete_test/.ua-executed.json (V-D moves it to /tmp/opencode and restores it byte-identically)
  - run_npm_test_full_suite_or_npx_tsc_or_npm_run_lint (deferred to UA-W8-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W9
may_start_successor: false
```

### 10.1 Mechanical trace

UA-W8-T3; CASE-UA-W8-001 (`SCN-UA-002`); CASE-UA-W8-002 (`SCN-UA-002`);
CASE-UA-W8-003 (`SCN-UA-003`); DEC-UA-011; DEC-UA-013; NC-UA-002 / NC-UA-003
family and the read-only pins (§10.4 V-C). Predecessors: S001–S004 (each case's
needles read the post-leaf file states; §4 edges). Parent consequences 5 and 6
freeze the test count, needles, and executed-set expectations.

### 10.2 Exact file transformation

CREATE `frontend/test/uphunt-aesthetic-w8.test.ts` with exactly the §10.3 bytes.
No other content, no extra test, no helper exports.

### 10.3 Exact required ending file content

The file is exactly (UTF-8, LF endings, single trailing newline; SHA-256
`cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0`):

```ts
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const runWorkspace = await readFile(new URL("../components/run-workspace.tsx", import.meta.url), "utf8");
const leadsPage = await readFile(new URL("../app/leads/page.tsx", import.meta.url), "utf8");
const liveLeadsWorkspace = await readFile(new URL("../components/leads/live-leads-workspace.tsx", import.meta.url), "utf8");
const resultsTable = await readFile(new URL("../components/results-table.tsx", import.meta.url), "utf8");
const resultsFilters = await readFile(new URL("../components/results-filters.tsx", import.meta.url), "utf8");
const globalsCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W8-001 run workspace completed-results intro and polling pin", () => {
  assert.match(runWorkspace, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(runWorkspace, /Lead discovery/u);
  assert.match(runWorkspace, /The stores this search was able to stand behind\./u);
  assert.match(runWorkspace, /Inspect the evidence, then keep the prospects worth approaching\./u);
  assert.match(runWorkspace, /const RETRY_DELAYS = \[3_000, 5_000, 10_000, 15_000\];/u);
  recordExecuted("CASE-UA-W8-001");
});

test("CASE-UA-W8-002 leads and live leads workspace intro", () => {
  assert.match(leadsPage, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(leadsPage, /Live lead workspace/u);
  assert.match(leadsPage, /Every shop you have already found, in one place\./u);
  assert.match(leadsPage, /One live record per store, with the evidence from every discovering run still attached\./u);
  assert.match(leadsPage, /href="\/runs"/u);
  assert.match(liveLeadsWorkspace, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(liveLeadsWorkspace, /Live lead workspace/u);
  assert.match(liveLeadsWorkspace, /Every shop you have already found, in one place\./u);
  assert.match(liveLeadsWorkspace, /One live record per store, with the evidence from every discovering run still attached\./u);
  recordExecuted("CASE-UA-W8-002");
});

test("CASE-UA-W8-003 collapsed row height, sort keys, and expansion shell padding", () => {
  assert.match(resultsTable, /className="detail-row"/u);
  assert.match(resultsFilters, /sortBy/u);
  assert.match(resultsFilters, /sortDirection/u);
  assert.match(runWorkspace, /params\.get\("page"\)/u);
  assert.match(runWorkspace, /params\.get\("sortBy"\)/u);
  assert.match(runWorkspace, /params\.get\("sortDirection"\)/u);
  assert.match(runWorkspace, /params\.get\("search"\)/u);
  assert.match(globalsCss, /min-height: 56px;/u);
  assert.match(globalsCss, /padding: var\(--space-5\);/u);
  assert.match(globalsCss, /\.lead-expansion-shell/u);
  recordExecuted("CASE-UA-W8-003");
});
```

This content was dry-run validated by the window agent against the simulated
post-S001/S002/S003/S004 states in the disposable location `/tmp/opencode/ua-w8-dework/dryrun`
(S3 `EV-UA-W8-D-002`): 5 tests pass (2 × CASE-UA-W1 via the coverage import +
3 × CASE-UA-W8), 0 fail, 0 skipped, and the generated executed set contained
exactly the 5 expected IDs (set digest `703c8441…`, matching parent consequence 6);
the dry-run directory remains disposable and outside the workspace.

### 10.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S004 accepted with ending digest `f1a7e45a…` (recompute); the S001/S002/S003 ending digests `21a17799…`/`a646f657…`/`643c3568…` (recompute); `test/uphunt-aesthetic-w8.test.ts` ABSENT; frontend porcelain == the two §3 protected paths + the four ` M` planned implementation paths; coordination root clean; `sha256sum test/.ua-executed.json` == `0aab3c59…` | all true |
| V-B | `sha256sum test/uphunt-aesthetic-w8.test.ts` after writing §10.3 bytes | digest == `cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0` |
| V-C | Disposable in-memory validation evidence recorded during authoring (window agent, `/tmp/opencode/ua-w8-dework`, S3 `EV-UA-W8-D-002`): N1 (NC-UA-002) delete the DEC-UA-003 completed title from an in-memory copy of post-S003 run-workspace.tsx → the title assertion must fail; N2 (NC-UA-002) delete the SectionIntro import from an in-memory copy of post-S001 leads/page.tsx → the import assertion must fail; N3 (NC-UA-003) remove the `detail-row` class from an in-memory copy of results-table.tsx → the detail-row assertion must fail; N4 (read-only pin) alter one RETRY_DELAYS byte in an in-memory copy of post-S003 run-workspace.tsx → the run-workspace needle assertion must fail; N5 (read-only pin) remove `min-height: 56px;` from an in-memory copy of post-S004 globals.css → the globals.css assertion must fail | all five probes falsified (recorded authoring evidence; I001 G8 re-executes them fresh) |
| V-D | From ABSENT executed-set state: `mv test/.ua-executed.json /tmp/opencode/ua-w8-ua-executed-head-backup.json`; from `frontend/` run `node --experimental-strip-types --test test/uphunt-aesthetic-w8.test.ts`; read `test/.ua-executed.json`; then `mv /tmp/opencode/ua-w8-ua-executed-head-backup.json test/.ua-executed.json`; re-`sha256sum` | command exit 0; tests 5, pass 5, fail 0, skipped 0, with exactly the titles CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003; json == exactly those 5 sorted IDs (§4.7 set digest `703c8441470da81b31c474099b78e2cd38b4e2c1c79756e3e0d9d63d14bfc8c7`, parent consequence 6); post-restore digest == `0aab3c59…` and `git status --porcelain` shows `test/.ua-executed.json` unmodified |
| V-E | `git status --porcelain` | attributable delta == `?? test/uphunt-aesthetic-w8.test.ts` added to the four ` M` implementation paths; no other path |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W8-I001` G1–G9) |

Expected workspace write set: exactly
`{frontend/test/uphunt-aesthetic-w8.test.ts}` plus the prescribed disposable
`test/.ua-executed.json` backup/run/restore cycle of V-D, whose net ending delta
is zero (byte-identical restore is part of the check).

### 10.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match.
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline.
- [ ] T1 Apply every ordered transformation and no other edit to the writable file.
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions.
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file.
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips.
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations.
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred.
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW.

(S005 V3: required local coverage IDs = registered =
{CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003} plus the 2 × CASE-UA-W1
registry re-executions provoked by the import; zero skips, duplicates, or
unexpected IDs; the 5-ID executed-set digest `703c8441…` is the witness. Full
43-set equality is UA-W15-V5 only.)

## 11. Local and whole-window verification gates

Leaf-local gates: §6.4, §7.4, §8.4, §9.4, §10.4. Frozen whole-window gates,
executed only by `UA-W8-I001` from `frontend/`, per `A4` §Gates, `A4` UA-W8
lifecycle, `DEC-UA-014`, `DEC-UA-016`, and parent consequence 7:

| Gate | Command / assertion | Expected |
|---|---|---|
| G1 | `npm test` per `DEC-UA-016` | PASS iff CASE-UA-W8-001, CASE-UA-W8-002 and CASE-UA-W8-003 pass (plus the two CASE-UA-W1 registry re-executions via the import) and every failing title, if any, is a member of the predecessor heading-oracle set {"My searches presents keyword research and identifiable run dossiers without rendering IDs", "MRR-FE-01 exact research payload and two-section surface", "MRR-W2 frontend unit certificate"}; expected total 184 tests / 181 pass / 3 fail = 179 predecessor + 2 W1 re-executions from the w8 import + 3 W8 cases; process exit 1 is expected and is not G1 FAIL when that holds; if CASE-UA-W1-001/002 fail solely with `SyntaxError: Unexpected end of JSON input` from getExecuted, that is the known concurrent recordExecuted race (DEC-UA-011 residue) — one identical rerun is permitted (E8.1) and is not a product failure |
| G2 | `npx tsc --noEmit --incremental false --pretty false` (`DEC-UA-014` oracle; `--incremental false` so no tsbuildinfo is written) | PASS iff zero output lines contain any owned-path needle: `leads/page.tsx`, `live-leads-workspace.tsx`, `run-workspace.tsx`, `uphunt-aesthetic-w8.test.ts` (globals.css is not typechecked); expected remaining diagnostics: exactly the 10 parked SRC-UA-0092 diagnostics (13 physical lines at the W6 close); repo-wide exit 0 NOT required; parked files MUST NOT be edited |
| G3 | `npm run lint` | exit 0 (JSX and CSS owned this window; globals.css edited) |
| G4 | browser evidence (`browser_evidence: true`): local `next dev` with `STORESIGNAL_DESIGN_FIXTURES=1`, `/usr/bin/google-chrome --headless` screenshots of routes {`/leads`, `/design-fixture?scenario=completed`} ONLY, at widths 390, 768, 1280, 1440 (height 900), under `frontend/review-evidence/uphunt-aesthetic/UA-W8/` | 8 screenshots recorded; the route set is frozen to those two routes (parent consequence 7); live `/runs/[runId]` MUST NOT be screenshotted (it polls); unauthenticated `/leads` may 307 to `/sign-in` (record it; not a CASE oracle); if the completed fixture cannot render the results heading without the G-R1-style pre-hydration synthetic `.example` interception used on UA-W7, that technique is permitted (no live run, no credentials); a fixture 404 without that recovery is PARENT_BLOCKED; smooth local dev server processes only, under the §12 item 6 sandbox policy; this is local_e2e evidence, NOT a CASE oracle (SUB-UA-001) |
| G5 | coverage scope: required W8 window set (3 IDs, digest `fb88fd2a…`) = registered (three `test()` titles) = executed W8 IDs; after G1, `test/.ua-executed.json` is exactly the 22 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3} ∪ {2 × CASE-UA-W4} ∪ {2 × CASE-UA-W5} ∪ {3 × CASE-UA-W6} ∪ {2 × CASE-UA-W7} ∪ {3 × CASE-UA-W8} (§4.7 set digest `9da0dc92b33e9eec059c774d2591cd1a1120a77f70110c94312f57f0ec7904fd`, parent consequence 6); zero skips, duplicates, unexpected, or unactivated IDs in this window; full 43-set equality NOT asserted (`UA-W15-V5` owns it); the json is modified tracked runtime output (`d6121aa` residue) and is never committed | exact |
| G6 | `sha256sum` of the five planned files, all zero-edit in-scope files (`results-table.tsx`, `results-filters.tsx`, `cumulative-traffic.tsx`, `runs/[runId]/page.tsx`, `query-editor.tsx`, `run-progress.tsx`, `lead-details.tsx`), read-only `section-intro.tsx`, `landing-sections.tsx`, the coverage and w2–w7 test files, `app/runs/page.tsx`, `app/keywords/page.tsx`, `components/run-continuation.tsx`; plus `git status --porcelain` and a forbidden-path negative search over the whole window delta (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`, `email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, the five parked test files, the coverage test file, `REQUIRED_CASE_IDS`, `section-intro.tsx`, `landing-sections.tsx`, `lead-details.tsx`, `run-workspace.tsx` read-only parts, `app/runs/[runId]/page.tsx`, the W4/W5/W6/W7 product files, the w2–w7 test files, `design-system-shell.test.ts`) | ending pins `21a17799…`, `a646f657…`, `643c3568…`, `f1a7e45a…`, `cab15f7f…` on the five planned files; byte pins `a4e1472f…`, `0ab118e4…`, `7d37a3ae…`, `719e05ea…`, `92efe1f7…`, `15d840bf…`, `0ceec905…`, `159096f3…`, `914c61e5…`, `f5137be4…`, `f65ba0c5…`, `635e2802…`, `8008501d…`, `ee6425e9…`, `f78b8da2…`, `92201c35…`, `86392720…`, `8376447d…`, `d57edbe3…` all unchanged; implementation delta == exactly the five §4 planned files; coordination artifacts limited to the enumerated §2 list; `A5`/`A6` digests unchanged by leaves |
| G7 | static inspection of the new test file imports (`node:test`, `node:assert/strict`, `node:fs/promises`, `node:url`, `./uphunt-aesthetic-coverage.test.ts`) + suite behavior | 0 network operations, 0 DB operations (`UA-W8-V3`) |
| G8 | personally re-execute the §10.4 V-C probes N1–N5 on fresh in-memory copies (tmp only, no workspace writes): NC-UA-002 / NC-UA-003 families (DEC-UA-003 string removal falsifies CASE-UA-W8-001; SectionIntro import removal falsifies CASE-UA-W8-002; `detail-row` removal falsifies CASE-UA-W8-003) and the read-only pins (RETRY_DELAYS byte change falsifies CASE-UA-W8-001; `min-height: 56px;` removal falsifies CASE-UA-W8-003) | all falsified |
| G9 | successor negative search: no `UA-W9` artifact of any kind (no `uphunt-aesthetic-w9.test.ts`, no `lead-details.tsx` / `landing-sections.tsx` edits), `A5.current_window` still `UA-W8`, `next_window` untouched | `may_start_successor: false` honored; `UA-W8-H4/H6` hold |

PASS oracle for `UA-W8-I001`: G1–G9 all pass; `A4` `UA-W8-P1..P4`,
`UA-W8-V1..V5`, `UA-W8-H1..H5` then checked with resolvable evidence;
`frontend/review-evidence/uphunt-aesthetic/UA-W8_HANDOFF.md` written per §14.3;
`A5.current_status` set to `AWAITING_REVIEW` (the sole authorized post-I001 `A5`
handoff action); STOP per `UA-W8-H6` (no `UA-W9`).
CORRECTION_REQUIRED oracle: any G-gate behavioral failure → §12 correction loop
with `UA-W8-C00n` (single-file, dependency-safe).
PARENT_BLOCKED oracle: missing parent decision, contradiction with `A1`–`A4`, or
required scope expansion (e.g., a defect that cannot be corrected without editing
`section-intro.tsx`, `results-table.tsx`, `results-filters.tsx`,
`cumulative-traffic.tsx`, `runs/[runId]/page.tsx`, `lead-details.tsx`,
`REQUIRED_CASE_IDS`, a parked file, `design-system-shell.test.ts`, or a W6/W7
product/test file).

## 12. Correction and re-assessment rules

1. Every correction is a new single-file sub-window `UA-W8-C00n` with a new
   assignment ID and baseline digest, citing: the failed evidence, exact root
   cause, the governing requirement and decision already determining the remedy,
   the earlier sub-window corrected, and the gates invalidated. Nothing is
   rewritten in place; `S3` is append-only.
2. `REQUIRED_CASE_IDS` and the coverage test file are NOT correctable at window
   level (`A5` prohibitions). A defect requiring changes there is
   `PARENT_BLOCKED`.
3. `section-intro.tsx`, `results-table.tsx`, `results-filters.tsx`,
   `cumulative-traffic.tsx`, `app/runs/[runId]/page.tsx`, and `lead-details.tsx`
   are frozen (§0 consequence 2). A failing check that would require editing any
   of them, a W6/W7 product/test file, a parked file, or
   `design-system-shell.test.ts` is `PARENT_BLOCKED`, never a frozen-file edit.
4. After the last correction the window agent personally runs a new assessment
   `UA-W8-I00n` (new ID), reusing unchanged gates by exact reference and rerunning
   every gate invalidated by the correction (at minimum G1, G2, G5, G6, G8), the
   coverage closure checks, and the forbidden-path negative search.
5. Environment rule (E8.1, inherited from `A5`): an otherwise-authorized local
   check MAY start with sandbox escalation
   (`sandbox_escalation_for_authorized_local_actions: true`,
   `automatic_identical_recovery_after_proven_environment_invalidation: true`,
   `recovery_limit_per_invalidated_execution: 1`,
   `external_authority_expansion: false`). If an attempt is invalidated solely by
   sandbox denial or execution-channel loss, one identical recovery run is
   permitted (same arguments, selection, environment, fixtures, timeouts,
   resources, oracle, write scope) after read-only proof that no matching
   process, workspace/external mutation, or usable acceptance result remains. A
   changed command, an observable product/test failure, or any external action is
   NOT recoverable this way and enters the correction loop or `PARENT_BLOCKED`.
   The DEC-UA-016 W1 empty-JSON race is governed by DEC-UA-016's own one-rerun
   rule, not this clause.
6. The window agent never repairs a leaf file directly; only corrective
   sub-windows edit files.

## 13. Mandatory authoring-readiness checklist (sub-window standard §11)

Evidence citations resolve into `S3` (`EV-UA-W8-D-001..002`).

### 13.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA-W8-D-001 (A5: ASG-UA-W8-01, UA-W8-WINDOW-AGENT, IN_PROGRESS, decompose action authorized; A5 digest c6a4ba50… recomputed MATCH)
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA-W8-D-001 (recomputed SHA-256 matches all pins incl. A4 `34d5d896…`, A1 `57fa49c7…`, A3 `094bc8bf…`, and subwindow standard `842c2955…`)
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA-W8-D-002 (§2, §6–§10 of this S1)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA-W8-D-001 (§3 of this S1)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA-W8-D-001 (S1 spec / S2 state / S3 evidence paths)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA-W8-D-002 (leaf prohibited_actions; report-only-to-window-agent rule)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: EV-UA-W8-D-002 (§12 item 5 == A5 policy)

### 13.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA-W8-D-002 (§5 table; UA-W8-T1/T2/T3; A4 test_registration CASE-UA-W8-001..003)
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA-W8-D-001 (§0 consequences close the remaining choices; current source matches every §3 anchor)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA-W8-D-002 (both = the five §4 planned files; planned-file-set digest `88a8fc32…` under §4.7; the three zero-edit in-scope files accounted for by parent consequence 2 with G6 pins)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: EV-UA-W8-D-002 (§4: S001–S005, one file each; zero-edit in-scope files take no S-number per parent consequence 1)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: EV-UA-W8-D-002 (§6.2/§7.2/§8.2/§9.2 replacements with unique anchors and occurrence count 1; §10.3 bytes with pinned digest `cab15f7f…`; all ending digests simulated)
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: EV-UA-W8-D-002 (§4; no waves — parent consequence 1; S005 ordered after S001–S004 by the needle dependencies; S001→S004 ordered by parent-frozen sequencing with one-active-leaf review between leaves)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: EV-UA-W8-D-002 (§5.1: SectionIntro export pinned `159096f3…`; read-only needles pinned; recordExecuted pinned `f5137be4…`; all leaf ending digests pinned before S005 dispatch)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: EV-UA-W8-D-002 (§4.1 table)
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: EV-UA-W8-D-002 (four product leaves and a test leaf are separate; runtime json handled by prescribed disposable procedure, never a deliverable)
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: EV-UA-W8-D-002 (command lists in §6.4–§10.4; the only prescribed non-writable touch is the §10.4 V-D json backup/run/restore with net-zero delta; tsc leaf runs are not scheduled — tsc is an I001 gate)

### 13.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7 of the standard. Evidence: EV-UA-W8-D-002 (§6–§10 yaml blocks; 15/15 field-presence lint per block)
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: EV-UA-W8-D-002 (byte-exact §6.2/§7.2/§8.2/§9.2 with unique anchors and occurrence counts; §10.3 full file bytes pinned by digest)
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: EV-UA-W8-D-002 (§6.4–§10.4)
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: EV-UA-W8-D-002 (V-E rows in §6.4–§10.4; V-D net-zero json restore proof)
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: EV-UA-W8-D-002 (§14 templates; H3 rows)
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: EV-UA-W8-D-002 (leaf prohibited_actions)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: EV-UA-W8-D-002 (each leaf's LOCAL_NOW set passes standalone — S001–S004 by digest pins, S005 by the V-D w8-only run; whole-window gates deferred and named)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: EV-UA-W8-D-002 (DEF rows → UA-W8-I001)

### 13.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: EV-UA-W8-D-002 (§5; 3 cases → S005 with §10.3 bytes)
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: EV-UA-W8-D-002 (§10.4 V-D; §11 G5)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: EV-UA-W8-D-002 (NC-UA-002/003-family probes at S005 leaf level (§10.4 V-C N1–N5) with I001 G8 personal re-execution; S001–S004 integrity enforced by the ending-digest pins)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: EV-UA-W8-D-002 (SUB-UA-001 inherited: UTF-8 file reads are source-text oracles only; no computed-pixel claim; screenshots are local_e2e evidence, not oracles; coverage and w2–w7 test files never weakened here)
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: EV-UA-W8-D-002 (§15: authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: EV-UA-W8-D-002 (§11; G4 scheduled at I001 per browser_evidence true)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: EV-UA-W8-D-002 (§12)
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: EV-UA-W8-D-002 (§15 assigned WINDOW-AGENT; §12 item 6; parent consequence 8 same-identity review)
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: EV-UA-W8-D-002 (§11 G5/G6/G8; §10.4 V-B/V-D)
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: EV-UA-W8-D-002 (§14.3)
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: EV-UA-W8-D-002 (§12 item 5)

### 13.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA-W8-D-002 (`UA-W8-S001`–`UA-W8-S005`, `UA-W8-I001` unique; S-numbering exactly as parent consequence 1; CASE/DEC/SCN/NC IDs cite A3/A4)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA-W8-D-002 (S1 contains only concrete paths, digests, bytes, counts)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA-W8-D-002 (exact-set comparisons in §6.4–§10.4 V-E rows; prescribed disposable `.ua-executed.json` cycle excluded by the net-zero restore proof)
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: EV-UA-W8-D-002 (SW-D03 set equality over the parent-pinned 5-file planned set is the failure detector)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: EV-UA-W8-D-002 (§10.3 three tests each call recordExecuted after its oracle; §11 G5 counts and digests; A4 §Enforcement 1–4 inherited)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: EV-UA-W8-D-002 (byte-pinned replacements and file content; any divergence changes the reviewed ending digests; accepted tests untouched)
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: EV-UA-W8-D-002 (leaf prohibited_actions + §4.6 proofs via V-E rows)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: EV-UA-W8-D-002 (§12 items 1, 6)
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: EV-UA-W8-D-002 + S2 `decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`, leaves `assigned_agent: UNASSIGNED`
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA-W8-D-002 (15/15 required fields per FILE block; 0 unresolved references)
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: EV-UA-W8-D-002 (§12 item 5)

## 14. Handoff templates

### 14.1 Leaf completion certificate (returned by each leaf agent)

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W8
subwindow_id: UA-W8-S001 | UA-W8-S002 | UA-W8-S003 | UA-W8-S004 | UA-W8-S005
assignment_id: ASG-UA-W8-01-S001 | ASG-UA-W8-01-S002 | ASG-UA-W8-01-S003 | ASG-UA-W8-01-S004 | ASG-UA-W8-01-S005
agent_identity: exact identity
writable_file: exact path from §6–§10
starting_file_digest: 9fad9d0b… | 294201ad… | 9472450d… | b5c79578… | ABSENT
ending_file_digest: 21a17799… | a646f657… | 643c3568… | f1a7e45a… | cab15f7f…
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
attributable_changed_file_set: [writable file only]
required_local_cases: [] | [] | [] | [] | [CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003]
registered_local_cases: same as required_local_cases
executed_local_cases: [] | [] | [] | [] | [CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003] (V-D w8-only run; the 2 W1 IDs are registry re-executions via the import)
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 0 | 0 | 0 | 0 | 5
negative_controls_falsified: 0 | 0 | 0 | 0 | 5
commands: []
deferred_integration_checks: [UA-W8-I001 gates per §11]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

### 14.2 Window-agent integration certificate (appended to `S3` by `UA-W8-I001`)

The §12.4 certificate of the sub-window standard, adapted:
`integration_assessment_id: UA-W8-I001`; `accepted_initial_subwindows` from leaf
reviews; `expected_changed_file_set` = the five §4 planned files;
`required_case_count: 3` (window-local; the 43-ID registry equality is UA-W15-V5);
`registered_case_count: 3`; `executed_case_count: 3` window-local (plus 2 W1 + 17
predecessor IDs re-executed in the full run); `required_case_set_digest:
fb88fd2a8409b4a7527585e36e0868c833b72fa5ee0bb9785747df7babd3e8cc`;
registered/executed digests computed with the §4.7 formula over the same IDs;
post-G1 executed-set digest `9da0dc92b33e9eec059c774d2591cd1a1120a77f70110c94312f57f0ec7904fd`;
`status: READY_FOR_PARENT_REVIEW` only per the §11 PASS oracle.

### 14.3 Consolidated parent handoff

`frontend/review-evidence/uphunt-aesthetic/UA-W8_HANDOFF.md` per `A4` handoff
template and sub-window standard §12.5: objective; status
`READY_FOR_PARENT_REVIEW` or one exact blocker; changed-file set +
starting/ending SHA-256s (including the preserved zero-edit `results-table.tsx`
`a4e1472f…`, `results-filters.tsx` `0ab118e4…`, `cumulative-traffic.tsx`
`7d37a3ae…`, `runs/[runId]/page.tsx` `719e05ea…`, `query-editor.tsx` `92efe1f7…`,
`run-progress.tsx` `15d840bf…`, `lead-details.tsx` `0ceec905…`, read-only
`section-intro.tsx` `159096f3…`, and unchanged predecessors); CASE
required/registered/executed/skipped/duplicate/unexpected (3/3/3/0/0/0
window-local; 2 additional registry IDs re-executed via import; full 43-set
equality deferred to UA-W15); required-set digest `0d14982c…` (registry) and
W8-set digest `fb88fd2a…`; commands and outcomes; browser-evidence file list
under `frontend/review-evidence/uphunt-aesthetic/UA-W8/` (8 PNGs, routes `/leads`
+ `/design-fixture?scenario=completed`); sandbox recoveries; NC results;
forbidden-path negative search; `S1`/`S2`/`S3` paths and revisions; the tracked
`.ua-executed.json` residue disclosure (22-ID content, uncommitted); confirmation
that `UA-W9` was not started.

## 15. Initial integration assessment `UA-W8-I001` (fully authored now)

```yaml
subwindow_id: UA-W8-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
assigned_agent: WINDOW-AGENT (UA-W8-WINDOW-AGENT, personally executed, never delegated)
predecessors: [UA-W8-S001, UA-W8-S002, UA-W8-S003, UA-W8-S004, UA-W8-S005]
authorized_write_file: NONE (implementation files; coordination artifacts per §2 only)
input: assembled UA-W8 state after UA-W8-S005 is accepted
gates: §11 table G1–G9 (frozen)
pass_oracle: G1..G9 pass; G4 executed and recorded (browser_evidence true; the two frozen routes {/leads, /design-fixture?scenario=completed} only)
correction_oracle: any behavioral gate failure -> §12 loop with UA-W8-C00n
parent_blocked_oracle: missing decision / contradiction / scope expansion (incl. §12 items 2–3)
execution_policy: E8.1 sandbox escalation + one identical recovery (§12 item 5)
may_start_successor: false
```

Accepted-subwindow and digest fields are filled from completed leaf evidence at
run time; the gate set above is frozen now (sub-window standard §9.1).

## 16. Self-falsification (sub-window standard §14)

Before declaring readiness the window agent verified the document rejects each
applicable counterexample (rejection mechanism in parentheses):

1. sub-window names two writable files (§6–§10 yaml `writable_file` single path; SW-E04 V-E exact-set proofs) — rejected.
2. sub-window names a directory/wildcard (canonical file paths only; SW-R03) — rejected.
3. a command creates an unplanned second workspace file (command lists enumerated; the only non-writable touch is the §10.4 V-D json cycle with prescribed net-zero restore) — rejected.
4. source and test file assigned together (four product leaves S001–S004 and test leaf S005 are separate; SW-D09) — rejected.
5. a required parent file is absent from the decomposition (SW-D03 set equality over the five-file planned set; the zero-edit in-scope files are accounted for by parent consequence 2 with G6 pins) — rejected.
6. two initial sub-windows own the same file (S001–S005 files pairwise distinct; SW-D04) — rejected.
7. a dependent file begins before its interface is frozen (§5.1 ending digests and needles frozen before S005 dispatch; SW-D07) — rejected.
8. an intermediate state has an unexplained test failure (§4.1 table: no permitted check fails in any row; unexpected failures stop the sequence) — rejected.
9. a subagent starts its successor (`may_start_successor: false` in every block; H3; parent consequence 8) — rejected.
10. a subagent communicates directly with the parent (prohibited_actions; H2) — rejected.
11. the window agent repairs implementation during review (§12 item 6) — rejected.
12. an integration failure produces no diagnosed one-file correction (§12 items 1, 4) — rejected.
13. a correction silently rewrites a completed sub-window (§17 append-only amendments; §12 item 1) — rejected.
14. acceptance omits/skips/duplicates/filters/unactivates a required case (§11 G5 counts + digests; §10.4 V-D) — rejected.
15. an oracle is weakened to accommodate current behavior (byte-pinned replacements and file content; any divergence changes reviewed digests; SW-R06) — rejected.
16. a test substitute proves more parity than its fidelity supports (SUB-UA-001 inherited: source-text oracles; screenshots are local_e2e only; SW-V04) — rejected.
17. a costly gate is repeated without its scheduling rule (§11 gates scheduled at I001 only; DEF rows name the owner) — rejected.
18. a correction changes a file but dependent evidence is reused without proof (§12 item 4 rerun list) — rejected.
19. the assembled changed-file set differs from the planned set or exceeds parent scope (§11 G6 delta + forbidden-path search; SW-D03) — rejected.
20. the window agent claims parent acceptance or begins UA-W9 (§11 PASS oracle stops at READY_FOR_PARENT_REVIEW + A5 AWAITING_REVIEW; G9) — rejected.
21. an already-authorized local gate is escalated to the parent merely for sandbox privilege (§12 item 5 E8.1 policy) — rejected.
22. a changed command, observable failure, surviving process, or mutation is accepted as automatic sandbox recovery (§12 item 5 recovery preconditions) — rejected.
23. parallel leaves overlap dependencies/resources or the next wave starts early (no waves authorized; §4 single sequential order; parent consequence 1) — rejected.

## 17. Append-only amendment sections

Reserved for corrective sub-windows (`UA-W8-C001`, …) and further assessments
(`UA-W8-I002`, …). Each amendment repeats the §6–§10 block structure in full with a
new ID, new baseline digest, cited trigger evidence, and invalidated gates.
Existing sections above are immutable after parent approval.
