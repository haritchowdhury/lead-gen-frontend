# UA-W7 frozen sub-window decomposition checklist (`S1`)

Subordinate artifact `S1` of parent window `UA-W7` under assignment `ASG-UA-W7-01`.
Companion artifacts: `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W7_SUBWINDOW_STATE_S2.yaml`
and `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W7_SUBWINDOW_EVIDENCE_S3.md`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

This file is frozen once the parent approves the decomposition. Corrections are appended
in §15 with new IDs; existing blocks are never rewritten.

## 0. Parent-frozen mechanical consequences (copied from `A6` `EV-UA-A-049`; not reopened)

The parent froze the following consequences in `A6` `EV-UA-A-049`
(`parent_frozen_mechanical_consequences`). They are copied here and are outside
decomposition authority. They close otherwise-open S1 choices; they are uniquely
determined by DEC-UA-002, DEC-UA-003, DEC-UA-015, DEC-UA-016, UA-W7-T1/T2/T3,
and CASE-UA-W7-001..002:

1. FILE sub-window IDs start at `UA-W7-S001`. A zero-edit in-scope file gets no
   FILE sub-window and does not consume an S-number. Do not retire S001/S002
   unused. Sequential DAG, no parallel waves: S001
   `frontend/components/query-editor.tsx` → S002 `frontend/components/run-progress.tsx`
   → S003 `frontend/test/uphunt-aesthetic-w7.test.ts` → `UA-W7-I001`.
2. Zero-edit preserved (G6 pins, no FILE leaf): `frontend/app/globals.css`
   `b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d` (F1 lists it;
   T1/T2/T3 name no CSS hunk; A4 `.query-editor` selector does not exist — do not
   invent it); `frontend/components/run-workspace.tsx`
   `9472450d3a22143befe5f52569328eb5c07df94fee543ecb873c0ca05914c8c3`
   (`const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];` once; poll/fetch
   unchanged); `frontend/app/runs/[runId]/page.tsx`
   `719e05ea0eec73fe948f0c41a9c56c970d6db61cfff0c990e59666136a069072`.
   `section-intro.tsx` is read-only
   `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175`. Do not change
   save/start/load, apiRequest URLs, metric calculations, stagePercent, stageLabel
   function, formatDuration, RunLoadingSkeleton, or LandingHeroCopy usage in
   run-workspace.
3. T1 JSX: keep `section#query-review` with existing
   `run-form-card query-editor-card ds-card` classes, keep
   `div.form-heading-row.query-editor-heading`, keep
   `<span className="step-badge">02</span>`, keep the query list/footer and
   `onClick={() => void save()}` / `onClick={() => void start()}`. Replace only the
   inner heading `<div>` that currently contains the unique eyebrow
   `Query review · revision {querySet.revision}` and unique
   `<h2>Review your searches</h2>` (each counts 1) with
   `<SectionIntro eyebrow="Search plan" title="Shape the searches before discovery starts." copy="Review, edit, or add queries, then start when the direction feels right." />`
   (DEC-UA-003 exact, periods included). Keep `querySet.revision` visible in that
   heading row as `<span>revision {querySet.revision}</span>` beside the
   step-badge; do not put the revision number into SectionIntro props. Import
   `{ SectionIntro } from "@/components/section-intro"`. Do not change the
   loading-card branch.
4. T2 JSX: keep `section.progress-card`, `div.progress-head`,
   `div.progress-stage`, the `state-indicator` span, `div.progress-state`
   badge+duration, progress-track, and both ProgressCount metric branches.
   Replace only the inner `.progress-stage` `<div>` children that are the unique
   conditional eyebrow (`Preparing your search plan` / `Current stage`) and unique
   `<h2>{stageLabel(run.stage)}</h2>` (each counts 1) with
   `<SectionIntro eyebrow="Discovery" title="StoreSignal is looking for matching stores." copy="The stages and counts below are the existing run status." />`
   (DEC-UA-003 exact, periods included). Immediately after SectionIntro in that
   same inner div, keep `{stageLabel(run.stage)}` as
   `<p>{stageLabel(run.stage)}</p>` — not a second marketing h2 and not inside
   SectionIntro. Do not put phase/error strings into SectionIntro copy. Do not edit
   `RunLoadingSkeleton`. Import `{ SectionIntro } from "@/components/section-intro"`.
5. CREATE `test/uphunt-aesthetic-w7.test.ts` with exactly two tests
   CASE-UA-W7-001/002. 001: query-editor.tsx has the SectionIntro import and the
   three query-editor DEC-UA-003 strings. 002: run-progress.tsx has the import and
   the three run-progress DEC-UA-003 strings, and run-workspace.tsx still contains
   `const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];`. recordExecuted after
   assertions. No third test. No getExecuted vs REQUIRED_CASE_IDS full-set
   equality. Import recordExecuted from `./uphunt-aesthetic-coverage.test.ts` the
   same way as the w6 test file.
6. Last FILE leaf (S003) from ABSENT `test/.ua-executed.json` expects exactly 4 IDs
   (2 × W1 re-executions + CASE-UA-W7-001/002), set digest
   `3ae216075ca80627b76f559b880ac0d7270b646832e70543300989957d07e52e`. The 19-ID
   set {2 × W1} ∪ {4 × W2} ∪ {4 × W3} ∪ {2 × W4} ∪ {2 × W5} ∪ {3 × W6} ∪ {2 × W7}
   is asserted only at I001 G5 after `npm test`, digest
   `3bf626bfcd753aa30685f57a4285c441bfd3b68a2a5fb7ada03ad85218532ffb`. Do not
   require W2–W6 IDs at the w7-only test command. `test/.ua-executed.json` is
   TRACKED at HEAD (owner commit `d6121aa` residue; W6 left 17-ID content
   `f136c564642a363831bbc3797aeb1b34356501672ba3188e5d32a797e1c95bfc`); never
   commit it.
7. I001 G1 is DEC-UA-016: from `frontend/`, `npm test`. Expected 179 tests /
   176 pass / 3 fail (175 predecessor + 2 W1 re-executions from the w7 import +
   2 W7 cases). PASS iff allocated UA CASE tests pass and every failing title, if
   any, is exactly the three named heading-oracle titles; process exit 1 is
   expected and is not G1 FAIL when that holds. G2 DEC-UA-014 needles are
   query-editor.tsx, run-progress.tsx, uphunt-aesthetic-w7.test.ts (globals.css is
   not typechecked). G4 is frozen as local next with `STORESIGNAL_DESIGN_FIXTURES=1`
   on routes {`/design-fixture?scenario=query-review`,
   `/design-fixture?scenario=runtime`} at 390/768/1280/1440 only (8 screenshots,
   height 900). Do not screenshot live `/runs/[runId]` (it polls). If the fixture
   404s, that is PARENT_BLOCKED, not a live run. Window-local case digest
   `a8c74516b3979e433aa07e11262d4504f3935076b3d7e70a8a5629872bf70394`. Planned
   implementation set {`frontend/components/query-editor.tsx`,
   `frontend/components/run-progress.tsx`, `frontend/test/uphunt-aesthetic-w7.test.ts`},
   digest `b0421156aac24cb62a33ed3695e2f87a04c3210e97ea26c0f2d1a47a8ba254cb`.
8. Do not start UA-W8. Do not edit `section-intro.tsx`, `landing-sections.tsx`,
   W6 product/test files, `REQUIRED_CASE_IDS`, parked files, or
   `design-system-shell.test.ts`. After the parent accepts this decomposition,
   identity UA-W7-WINDOW-AGENT executes then personally reviews each FILE leaf in
   the same turn, then itself assigns the next S-number (DEC-UA-015), then
   personally runs I001, then hands off. This assignment does not execute S001.
   Per DEC-UA-015, this S1 §0 contains none of the phrases that decision forbids in
   assignment pastes and §0 freezes; the FILE-leaf sequence below is continuous
   with no parent gate between leaves and no halt before I001.

## 1. Inherited authority and revision pins

| Pin | Value |
|---|---|
| Parent window | `UA-W7` |
| Parent assignment | `ASG-UA-W7-01` |
| Window agent | `UA-W7-WINDOW-AGENT` |
| Parent standard | `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` |
| Sub-window standard | `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` |
| Contract `A1` | `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827` |
| Decision `A3` | `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3` |
| Checklist `A4` | `0a834df7f96677c78d0772564fd2c6a92ca161d0a5ce59c5c5ad6c112182a9a8` |
| Active state `A5` (file digest) | `13285c12cdaec6b406ae37c209c7a14ea62b87bf1e191c1e7d50f5c04cc872eb` (state_version 17, ASG-UA-W7-01, IN_PROGRESS) |
| Required coverage set (43 IDs, E6) | `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` (A4 §Coverage pin; asserted by CASE-UA-W1-002) |
| Planned implementation set (3 paths, §4.7 digest) | `b0421156aac24cb62a33ed3695e2f87a04c3210e97ea26c0f2d1a47a8ba254cb` (parent consequence 7, recomputed 2026-09-03) |
| Read-only `frontend/components/section-intro.tsx` | `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175` (recomputed 2026-09-03; matches `EV-UA-A-049`) |
| Predecessor `frontend/test/uphunt-aesthetic-coverage.test.ts` | `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` (recomputed 2026-09-03; matches `EV-UA-A-049`) |
| Protected `frontend/test/uphunt-aesthetic-w2.test.ts` | `f65ba0c50c78ef983496d0a37af1a1a6a1234332c48a5290bc344c9a5e68b78c` (recomputed 2026-09-03; unchanged) |
| Protected `frontend/test/uphunt-aesthetic-w3.test.ts` | `635e28022e14646c26407dd41c77c55a4c7fb3b34c6aa29d2f6b63eaaee69b13` (recomputed 2026-09-03; unchanged) |
| Protected `frontend/test/uphunt-aesthetic-w4.test.ts` | `8008501d5da4b946bd07ea05260400198c306e1cfb2741fec7ed3ff44a3832a7` (recomputed 2026-09-03; unchanged) |
| Protected `frontend/test/uphunt-aesthetic-w5.test.ts` | `ee6425e9be6ca190d27981b39656dc1692f5cc2b0c049795a59f28d418cffe06` (recomputed 2026-09-03; unchanged) |
| Predecessor `frontend/test/uphunt-aesthetic-w6.test.ts` | `f78b8da2fad5084777ec727d25ad21d4d81a08994eaa5c406643821d8deaec1a` (recomputed 2026-09-03; unchanged) |
| W6 product `frontend/app/runs/page.tsx` | `863927204b5af1ad1af9eba1d04d01eef53ecdd2c967d6a18f1fa925cc9943b9` (recomputed 2026-09-03; unchanged) |
| W6 product `frontend/app/keywords/page.tsx` | `8376447da438ef96b1618102032a4f0bbeb58f0c9bf6d0e1b72348315dee8917` (recomputed 2026-09-03; unchanged) |
| W6 product `frontend/components/run-continuation.tsx` | `d57edbe3e8f1ae6f8f7eb869a6dc016d00b243465c636168a8bf6cade2bcf62f` (recomputed 2026-09-03; unchanged) |
| Preserved predecessor `frontend/components/landing-sections.tsx` | `914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15` (recomputed 2026-09-03; unchanged) |
| Preserved predecessor `frontend/app/page.tsx` | `3460751e72842cb22b4116211408c4c8ddaef0f4efd02513f1228182902f5a86` (recomputed 2026-09-03; unchanged) |
| Preserved predecessor `frontend/components/run-form.tsx` | `72576044e7f57c4e76206e7b204c73202b84775b98e309ead8ba2ccc601fb8a2` (recomputed 2026-09-03; unchanged) |
| Starting `frontend/components/query-editor.tsx` (S001 baseline) | `ce09064c490a17a4ba93209438b545504d9ab928a12b13edb604931a3d5e6e12` (recomputed 2026-09-03; matches `EV-UA-A-049`) |
| Starting `frontend/components/run-progress.tsx` (S002 baseline) | `e12b8c5ba6f8835c9d2215ed985651b97b720fe7d47303ca236d3dc2c1ae6697` (recomputed 2026-09-03; matches `EV-UA-A-049`) |
| Starting `frontend/test/uphunt-aesthetic-w7.test.ts` | ABSENT (verified 2026-09-03) |
| Zero-edit in-scope `frontend/app/globals.css` | `b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d` (recomputed 2026-09-03; parent consequence 2) |
| Zero-edit in-scope `frontend/components/run-workspace.tsx` | `9472450d3a22143befe5f52569328eb5c07df94fee543ecb873c0ca05914c8c3` (recomputed 2026-09-03; parent consequence 2) |
| Zero-edit in-scope `frontend/app/runs/[runId]/page.tsx` | `719e05ea0eec73fe948f0c41a9c56c970d6db61cfff0c990e59666136a069072` (recomputed 2026-09-03; parent consequence 2) |
| `A5` authorized_windows | `[UA-W7]` |
| `A5` may_start_successor | `false` |
| Successor `UA-W8` | reserved for parent; NOT authorized (`A5` prohibited `start_UA-W8`) |

All pins recomputed 2026-09-03 by `UA-W7-WINDOW-AGENT` and matched byte-exact
(S3 `EV-UA-W7-D-001`). Root `ACTIVE_EXECUTION_STATE.md` is out of authority and
untouched (coordination root `git status --porcelain` clean, S3 `EV-UA-W7-D-001`).

## 2. Parent-window scope and exclusions (copied, no expansion)

From `A4` §UA-W7 and `A5` `authorized_write_scope`:

- Objective: Query editor and run progress use landing headlines; polling code
  unchanged (`A4` §UA-W7).
- Window write scope (implementation, exactly four authorized paths):
  `frontend/components/query-editor.tsx`, `frontend/components/run-progress.tsx`,
  `frontend/app/globals.css` (shared-file scope listed, but zero-edit this window —
  parent consequence 2), `frontend/test/uphunt-aesthetic-w7.test.ts`.
- Planned changed-file set (§4): exactly three files —
  `frontend/components/query-editor.tsx` (MODIFY),
  `frontend/components/run-progress.tsx` (MODIFY),
  `frontend/test/uphunt-aesthetic-w7.test.ts` (CREATE); planned-set digest
  `b0421156aac24cb62a33ed3695e2f87a04c3210e97ea26c0f2d1a47a8ba254cb`
  (parent consequence 7). Three in-scope/read-only files have zero required edits
  and get no FILE sub-window (parent consequences 1–2): `globals.css`
  (authorized but zero-edit; `.query-editor` selector does not exist — do not
  invent it), `run-workspace.tsx` (A4 `read_only_scope`), `runs/[runId]/page.tsx`.
  Required changed-file set = planned set (S3 `EV-UA-W7-D-002`).
- Shared-file scope for `frontend/app/globals.css` (`A4`): `.run-page`,
  `.query-editor`, `.progress-card`, `.progress-stage`. None are edited this
  window; every declaration in those selectors stays byte-identical.
- Read-only scope (window): `frontend/components/run-workspace.tsx`,
  `frontend/app/runs/[runId]/page.tsx`.
- Window-agent coordination writes (never implementation): `S1`, `S2`, `S3` (this
  decomposition), `A6` append-only, `A4` `UA-W7-P*`/`UA-W7-T*`/`UA-W7-V*`/`UA-W7-H*`
  checkboxes only, `frontend/review-evidence/uphunt-aesthetic/UA-W7_HANDOFF.md`,
  screenshots under `frontend/review-evidence/uphunt-aesthetic/UA-W7/` (headless
  chrome only, after the parent accepts this decomposition), and at handoff only
  `A5.current_status: AWAITING_REVIEW` (the sole authorized `A5` handoff action
  after I001 PASS; `A5` is otherwise protected from every leaf).
- Authorized actions: `decompose_UA-W7_under_subwindow_standard`,
  `modify_query_editor`, `modify_run_progress`, `create_w7_test_file`,
  `run_frontend_unit_tests`, `run_frontend_npm_test`, `run_npx_tsc_noEmit`,
  `run_npm_run_lint`, `run_headless_chrome_browser_evidence` (I001 only),
  `check_UA-W7_boxes`, `append_A6_evidence`, `write_UA-W7_handoff`,
  `set_A5_AWAITING_REVIEW_on_handoff`; window-agent assessment and coordination
  writes above; sandbox escalation per the E8.1 policy in §10 item 6.
- Prohibited: `start_UA-W8`, `may_start_successor`,
  `execute_FILE_leaves_before_parent_accepts_decomposition`,
  `parent_assign_or_accept_FILE_leaf`, `stop_for_parent_between_FILE_leaves`,
  `treat_AWAITING_WINDOW_REVIEW_as_parent_stop`, `edit_RETRY_DELAYS`,
  `edit_poll_fetch`, `edit_run_workspace`, `edit_runs_runId_page`,
  `change_query_save_or_start_handlers`, `change_metric_calculations`,
  `edit_globals_css`, `edit_section_intro`, `edit_landing_sections`,
  `edit_unowned_globals_css_selectors`, `edit_app_page_header_or_W6_selectors`,
  `edit_intelligence_card_or_W5_selectors`, `edit_run_form_card_or_W4_selectors`,
  `edit_auth_card`, `add_dependency`, `edit_REQUIRED_CASE_IDS`,
  `edit_uphunt-aesthetic-coverage_test`, `edit_uphunt-aesthetic-w2_w3_w4_w5_w6_test_files`,
  `edit_parked_SRC-UA-0092_test_files`, `edit_design-system-shell_test`,
  `edit_unowned_app_or_component_files`, `aws`, `commit`, `push`, `production`,
  `paid_provider`, `edit_email_scraper`, `edit_root_ACTIVE_EXECUTION_STATE`.
  `npm run build` is a UA-W15-only gate.
- `test/.ua-executed.json` is a TRACKED runtime-output path (owner commit
  `d6121aa` residue). It is never a W7 deliverable and is never committed by this
  window; leaves may touch it only through the prescribed §8.4 V-D
  backup/run/restore procedure.

## 3. Starting working-tree inventory (recorded 2026-09-03, read-only)

Repository: `/home/harit/Email Scrapper/frontend` (git toplevel, HEAD `b83b8e9`
"W6"). Coordination root `/home/harit/Email Scrapper` is a separate git repository
and reported a clean `git status --porcelain` (root `ACTIVE_EXECUTION_STATE.md`
untouched).

Starting changed-file set (frontend repo, `git status --porcelain`, sorted):

1. ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml` — assignment
   fields written by parent for `ASG-UA-W7-01` (`EV-UA-A-049`); starting file
   digest `13285c12cdaec6b406ae37c209c7a14ea62b87bf1e191c1e7d50f5c04cc872eb`
   (state_version 17); PROTECTED (no leaf writes; only the handoff action
   `set_A5_AWAITING_REVIEW_on_handoff` may touch it later, never a leaf).
2. ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` — append-only evidence
   (`EV-UA-A-049` is its tail); window-agent append-only; PROTECTED against leaf
   writes.

Starting repository change set digest (§4.7 formula over the two paths above):
`e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450`.

Starting state of planned and preserved files (all recomputed 2026-09-03):

- `frontend/components/query-editor.tsx`: present, clean, digest `ce09064c…`.
  Anchors: the `@/components/icons` import is line 5; the heading row
  `div.form-heading-row.query-editor-heading` is lines 219–225; the inner heading
  `<div>` (unique eyebrow `Query review · revision {querySet.revision}` + unique
  `<h2>Review your searches</h2>`) is lines 220–223; the `<span
  className="step-badge">02</span>` is line 224; `onClick={() => void save()}`
  line 290 and `onClick={() => void start()}` line 293; the loading-card branch is
  lines 209–215.
- `frontend/components/run-progress.tsx`: present, clean, digest `e12b8c5b…`.
  Anchors: the `@/lib/api-types` import is line 1; `section.progress-card` lines
  35–39; `div.progress-head` line 40; `div.progress-stage` lines 41–51; the
  conditional-eyebrow inner `<div>` (unique `Preparing your search plan` /
  `Current stage` + unique `<h2>{stageLabel(run.stage)}</h2>`) is lines 43–50;
  `div.progress-state` lines 52–55; `progress-track` lines 58–67; the two
  `ProgressCount` metric branches lines 69–110; `formatDuration` lines 9–21;
  `RunLoadingSkeleton` lines 135–147.
- `frontend/test/uphunt-aesthetic-w7.test.ts`: ABSENT.
- `frontend/components/section-intro.tsx` (read-only): digest `159096f3…`; exports
  `SectionIntro({ eyebrow, title, copy, inverse = false })` rendering
  `div.marketing-heading` with `span.eyebrow` (when eyebrow defined), `h2` title,
  `p` copy (when copy defined).
- Zero-edit in-scope/read-only files (parent consequence 2): `app/globals.css`
  `b5c79578…`, `components/run-workspace.tsx` `9472450d…`,
  `app/runs/[runId]/page.tsx` `719e05ea…`.
- Predecessor and protected files: `test/uphunt-aesthetic-coverage.test.ts`
  `f5137be4…`, `test/uphunt-aesthetic-w2.test.ts` `f65ba0c5…`,
  `test/uphunt-aesthetic-w3.test.ts` `635e2802…`,
  `test/uphunt-aesthetic-w4.test.ts` `8008501d…`,
  `test/uphunt-aesthetic-w5.test.ts` `ee6425e9…`,
  `test/uphunt-aesthetic-w6.test.ts` `f78b8da2…`, `app/runs/page.tsx`
  `86392720…`, `app/keywords/page.tsx` `8376447d…`,
  `components/run-continuation.tsx` `d57edbe3…`,
  `components/landing-sections.tsx` `914c61e5…`, `app/page.tsx` `3460751e…`,
  `components/run-form.tsx` `72576044…`; `frontend/test/.ua-executed.json`
  present, clean, TRACKED, digest
  `f136c564642a363831bbc3797aeb1b34356501672ba3188e5d32a797e1c95bfc`, content =
  exactly 17 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3} ∪
  {2 × CASE-UA-W4} ∪ {2 × CASE-UA-W5} ∪ {3 × CASE-UA-W6} (owner commit `d6121aa`
  residue; DEC-UA-011 runtime output; never committed by W7);
  `review-evidence/uphunt-aesthetic/UA-W7/` ABSENT.

Environment: node `v24.14.1`; `frontend/package.json` `test` =
`node --experimental-strip-types --test test/*.test.ts`, `lint` = `eslint`;
`tsconfig.json` `incremental: true`, `allowImportingTsExtensions: true`,
`strict: true`, `paths: {"@/*": ["./*"]}`; I001 tsc runs with
`--incremental false --pretty false` so no tsbuildinfo is written.
`/usr/bin/google-chrome` exists (P3; I001 G4 only). `/tmp/opencode` exists as the
prescribed disposable location for leaf V-D backup/restore, the S003 dry-run
validation, and negative probes.

## 4. Initial single-file dependency DAG and intermediate-state contracts

```text
UA-W7-S001 (FILE, modify frontend/components/query-editor.tsx)   ─┐
UA-W7-S002 (FILE, modify frontend/components/run-progress.tsx)   ─┼─> UA-W7-S003 ─> UA-W7-I001
                                                                 │   (FILE, create      (INTEGRATION_ASSESSMENT)
                                                                 │    test/uphunt-aesthetic-w7.test.ts)
```

Sequential execution order (parent consequence 1 freezes the DAG and prohibits
parallel waves; default one-active-leaf lifecycle): S001, S002, S003, I001. IDs
S001–S003 are used exactly as named by the parent; no zero-edit in-scope file
consumes an S-number.

- Edge S001→S002: parent-frozen sequencing (consequences 1 and 8), not a data
  dependency; the two JSX files are mutually independent and are executed one at a
  time because the parent authorizes exactly one active leaf and requires
  same-identity review between leaves.
- Edge S002→S003: CASE-UA-W7-001 (in S003) reads the post-S001 `query-editor.tsx`
  and CASE-UA-W7-002 reads the post-S002 `run-progress.tsx`; the test file must be
  authored and executed against the post-leaf file states, otherwise its oracles
  are false before the work exists.
- Edge S003→I001: whole-window gates require all three planned files assembled.
- No planned file consumes any interface produced inside this window except the
  §5.1 frozen states; the only consumed cross-file interfaces are predecessor
  outputs, the read-only `SectionIntro` export, the read-only
  `run-workspace.tsx` RETRY_DELAYS pin, and the post-S001/post-S002 file states.

### 4.1 Intermediate-state contracts

| After | Permitted checks | Expected temporary state | Why safe | Resolved by | Prohibited while pending |
|---|---|---|---|---|---|
| S001 accepted | S001 §6.4 only | query-editor.tsx renders `<SectionIntro>` and the `<span>revision {querySet.revision}</span>` beside the step-badge; w7 test file still ABSENT so `npm test` would still report 175/172/3 (w7 file not yet in the test glob); no permitted check fails in this state | local workspace only; no deployment or external surface; no CASE test runs at leaf level (`npm test` prohibited at leaves) | S003 adds the asserting tests | editing any other planned file, `section-intro.tsx`, a preserved file, or a zero-edit in-scope file; running `npm test`; successor work |
| S002 accepted | S002 §7.4 only | run-progress.tsx renders `<SectionIntro>` and the kept `<p>{stageLabel(run.stage)}</p>`; same pending-test state as above | same as above | S003 | any second-file edit; running `npm test`; successor work |
| S003 accepted | S003 §8.4 only; whole-window gates remain PENDING | w7-only run executed from ABSENT-json state produced exactly 4 IDs then restored; `.ua-executed.json` byte-identical to HEAD (`f136c564…`); repo delta = the three planned files only | test file is not imported by app code; runtime json restored per §8.4 V-D | I001 | any additional-file edit; committing `.ua-executed.json`; successor work |

Unexpected failures at any row stop the sequence for diagnosis (no silent
progression). No permitted intermediate check is expected to fail.

## 5. Exact allocation of requirements, decisions, interfaces, and coverage cases

Parent trace for `UA-W7` (all IDs from `A1`/`A3`/`A4`):

| Parent ID | Allocated to | Terminal anchor |
|---|---|---|
| UA-W7 objective (`SCN-UA-002`) | `UA-W7-S001` §6.2 + `UA-W7-S002` §7.2 | `<SectionIntro>` with DEC-UA-003 strings in the kept heading-row/stage wrappers |
| UA-W7-T1 | `UA-W7-S001` §6.2 | query-editor.tsx ending digest `92efe1f7…`; save/start handlers byte-identical |
| UA-W7-T2 | `UA-W7-S002` §7.2 | run-progress.tsx ending digest `15d840bf…`; metric calculations byte-identical |
| UA-W7-T3 | `UA-W7-S003` §8.3 | two tests, CASE-UA-W7-001/002; read-only grep RETRY_DELAYS in run-workspace.tsx |
| CASE-UA-W7-001 (`SCN-UA-002`) | `UA-W7-S003` test 1 | query-editor.tsx import + 3 DEC-UA-003 strings |
| CASE-UA-W7-002 (`SCN-UA-002`) | `UA-W7-S003` test 2 | run-progress.tsx import + 3 DEC-UA-003 strings + run-workspace.tsx RETRY_DELAYS needle |
| NC-UA-002 family | S003 §8.4 V-D N1/N2 + `UA-W7-I001` G8 | removing a DEC-UA-003 string or a SectionIntro import falsifies the corresponding oracle |
| T3 read-only pin (RETRY_DELAYS) | S003 §8.4 V-D N3 + `UA-W7-I001` G8 | altering the RETRY_DELAYS byte falsifies CASE-UA-W7-002's run-workspace oracle |
| DEC-UA-002 | S001/S002 imports of the frozen `SectionIntro` export; no third heading component | `import { SectionIntro } from "@/components/section-intro";` in both files; `section-intro.tsx` read-only `159096f3…` |
| DEC-UA-003 | exact strings in S001/S002; oracles in S003 | JSX text nodes match including periods; no paraphrase |
| DEC-UA-006 | §2 prohibited paths; I001 G6 forbidden-path search | 0 hits |
| DEC-UA-011 | S003 `recordExecuted` import + call-after-witness ordering; `.ua-executed.json` handling | two `recordExecuted` calls, each after its oracle; json never committed |
| DEC-UA-013 | leaf preflights P1/P2 | git status before/after (frontend + coordination root) |
| DEC-UA-014 | `UA-W7-I001` gate G2 | zero tsc diagnostic lines on the owned-path needles |
| DEC-UA-015 | same-identity execute-then-review; window agent assigns next S-number; §0 freeze | no parent leaf gates; no halt at AWAITING_WINDOW_REVIEW |
| DEC-UA-016 | `UA-W7-I001` gate G1 | 179/176/3; failing titles ⊆ heading-oracle set |
| UA-W7-P1..P4, UA-W7-V1..V5, UA-W7-H1..H6 | `UA-W7-I001` / handoff | `A4` UA-W7 lifecycle boxes checked with evidence at I001 |

The remaining 41 coverage CASE IDs belong to other/later windows per the
`test_registration` column of `A4` §Coverage. Window-required local case set =
{CASE-UA-W7-001, CASE-UA-W7-002}, §4.7 set digest
`a8c74516b3979e433aa07e11262d4504f3935076b3d7e70a8a5629872bf70394` (matches the
parent pin in `EV-UA-A-049` consequence 7).

### 5.1 Frozen cross-file interfaces (inherited and produced)

- `SectionIntro` consumed export (frozen by DEC-UA-002, file pinned `159096f3…`):
  `import { SectionIntro } from "@/components/section-intro";` with props
  `{ eyebrow?: ReactNode; title: ReactNode; copy?: ReactNode; inverse?: boolean }`;
  renders `div.marketing-heading` (optionally `is-inverse`) containing
  `span.eyebrow`, `h2`, `p`. Both JSX leaves consume exactly this export; no leaf
  may edit the component.
- `recordExecuted(id: string): void` — produced by `UA-W1-T1`, pinned at file
  digest `f5137be4…`. S003 imports it from
  `./uphunt-aesthetic-coverage.test.ts` and calls it exactly once per test, after
  that test's assertions. `REQUIRED_CASE_IDS` already contains the two W7 IDs; it
  is never edited here.
- Read-only `run-workspace.tsx` needle consumed by S003 (byte-exact; occurrence
  count verified == 1 by inspection, S3 `EV-UA-W7-D-002`):
  - N-RW `const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];`
- Ending digests produced by the leaves and consumed by S003/I001 (deterministic
  simulations from the §3 starting digests, S3 `EV-UA-W7-D-002`):
  - S001 `frontend/components/query-editor.tsx` →
    `92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c`
  - S002 `frontend/components/run-progress.tsx` →
    `15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38`
  - S003 `frontend/test/uphunt-aesthetic-w7.test.ts` →
    `92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842`
    (exact §8.3 bytes, dry-run validated)

## 6. Initial implementation sub-window `UA-W7-S001`

```yaml
subwindow_id: UA-W7-S001
type: FILE
parent_window_id: UA-W7
parent_assignment_id: ASG-UA-W7-01
assigned_agent: UNASSIGNED
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/query-editor.tsx
file_operation: MODIFY
starting_file_digest: ce09064c490a17a4ba93209438b545504d9ab928a12b13edb604931a3d5e6e12
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W7)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W7_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §6)
  - frontend/components/section-intro.tsx (consumed export, pinned 159096f3…)
  - frontend/components/query-editor.tsx (own file)
authorized_actions:
  - apply_the_three_ordered_replacements_of_section_6.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_loading_card_branch
  - edit_the_query_list_footer_or_buttons
  - change_query_save_or_start_handlers
  - edit_the_query_editor_heading_row_wrapper
  - edit_the_step_badge
  - edit_section_intro_tsx_or_any_preserved_or_zero_edit_file
  - edit_run_progress_tsx_or_the_w7_test_file
  - put_the_revision_number_into_SectionIntro_props
  - paraphrase_any_DEC-UA-003_string_or_drop_a_period
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W7-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W8
may_start_successor: false
```

### 6.1 Mechanical trace

UA-W7-T1; UA-W7 objective (`SCN-UA-002`); DEC-UA-002; DEC-UA-003
(query-editor strings); DEC-UA-013 (preflight); parent consequences 2, 3, and 8.
Terminal anchor: the §6.2 replacements; ending digest pin `92efe1f7…`. Every
requirement allocated here terminates in a file anchor verified by §6.4 checks and
by S003's CASE-UA-W7-001 oracles.

### 6.2 Exact file transformation (three ordered replacements; each anchor count == 1)

Apply in this order. Each OLD string occurs exactly once in the starting file
(verified by simulation, S3 `EV-UA-W7-D-002`); if any count differs, STOP and
report — do not improvise.

**R1 — import** (line 5 region). OLD fence = starting bytes; NEW fence = ending
bytes:

OLD:

```tsx
import { ArrowRightIcon, PlusIcon } from "@/components/icons";
```

NEW:

```tsx
import { ArrowRightIcon, PlusIcon } from "@/components/icons";
import { SectionIntro } from "@/components/section-intro";
```

**R2 — heading children** (lines 220–223). The heading row wrapper
`<div className="form-heading-row query-editor-heading">` (line 219) and the
`<span className="step-badge">02</span>` (line 224) are kept byte-identical. The
DEC-UA-003 strings replace the old eyebrow/h2 content including their periods.

OLD:

```tsx
        <div>
          <span className="eyebrow">Query review · revision {querySet.revision}</span>
          <h2>Review your searches</h2>
        </div>
```

NEW:

```tsx
        <SectionIntro
          eyebrow="Search plan"
          title="Shape the searches before discovery starts."
          copy="Review, edit, or add queries, then start when the direction feels right."
        />
```

**R3 — revision span beside the step-badge** (parent consequence 3: keep
`querySet.revision` visible in that heading row as `<span>revision
{querySet.revision}</span>` beside the step-badge; do not put the revision number
into SectionIntro props):

OLD:

```tsx
        <span className="step-badge">02</span>
      </div>
```

NEW:

```tsx
        <span className="step-badge">02</span>
        <span>revision {querySet.revision}</span>
      </div>
```

Operation ordering: single atomic file write after all three replacements are
prepared; no intermediate partial state is saved. Obsolete behavior removed from
this file: the eyebrow string `Query review · revision {querySet.revision}` and
the `<h2>Review your searches</h2>` heading children (the `querySet.revision`
value is preserved via the R3 span). Resulting numstat is exactly `7 4`
(simulated, S3 `EV-UA-W7-D-002`).

### 6.3 Preserved behavior and forbidden edits (within the writable file)

- `"use client";`, all imports except the inserted SectionIntro line, `EditableRow`
  / `editableRows` / `signature`, all state, `load` / `save` / `start`
  (including `onClick={() => void save()}` and `onClick={() => void start()}`
  call sites, `QUERY_REVISION_CONFLICT` / `QUERY_LIST_INVALID` handling),
  `updateRow` / `addRow` / `deleteRow` / `moveRow` / `clientValidate`, `grouped`,
  `hasVisibleErrors` — byte-identical.
- `<section id="query-review" className="run-form-card query-editor-card ds-card"
  aria-busy={busy !== null}>` — byte-identical.
- `<div className="form-heading-row query-editor-heading">` wrapper and
  `<span className="step-badge">02</span>` — byte-identical.
- The loading-card branch
  `<section className="run-form-card query-editor-card query-editor-loading
  ds-card" role="status" aria-live="polite">Loading saved queries…</section>` —
  byte-identical.
- The query list (`.query-editor-scroll`, `.query-category`, `.query-row`,
  `.query-list-wrap`, `.query-add-button`), footer (`.form-footer
  query-editor-footer`, `Restore deleted generated query`, `Unsaved changes`,
  `Save changes`, `Find my stores`, `ArrowRightIcon`) — byte-identical.
- The three DEC-UA-003 strings must include their trailing periods exactly; no
  paraphrase, no case change, no added marketing-heading className on the wrapper.

### 6.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: `git status --porcelain` in frontend/ and coordination root; `sha256sum components/query-editor.tsx` | frontend porcelain == exactly the two §3 protected paths; coordination root clean; digest == `ce09064c…` |
| V-B | Apply §6.2 edits with exact-match tooling (each OLD count == 1 before replacing) | 3 replacements applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- components/query-editor.tsx` and full `git diff` inspection | numstat == `7  4` for `frontend/components/query-editor.tsx`; the diff contains exactly the §6.2 R1, R2, and R3 changes and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state: `import { SectionIntro } from "@/components/section-intro";` == 1; `Search plan` == 1; `Shape the searches before discovery starts.` == 1; `Review, edit, or add queries, then start when the direction feels right.` == 1; `<SectionIntro` == 1; `<span>revision {querySet.revision}</span>` == 1; `<h2>` == 0; `Query review · revision` == 0; `Review your searches` == 0; `form-heading-row query-editor-heading` == 1; `<span className="step-badge">02</span>` == 1; `id="query-review"` == 1; `run-form-card query-editor-card ds-card` == 1; `query-editor-loading` == 1; `void save()` == 1; `void start()` == 1 | every assertion true |
| V-E | `sha256sum components/query-editor.tsx`; `git status --porcelain` | ending digest == `92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c`; attributable delta == ` M components/query-editor.tsx` exactly (protected §3 paths unchanged) |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W7-I001` G1–G9) |

Negative controls: none at this leaf — the ending-digest pin (V-E) mechanically
falsifies any deviation, and the copy/import falsification probes are assigned at
the narrowest effective level in S003 §8.4 V-D and I001 G8.

Expected workspace write set: exactly `{frontend/components/query-editor.tsx}`.

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
coverage cases execute in S003.)

## 7. Initial implementation sub-window `UA-W7-S002`

```yaml
subwindow_id: UA-W7-S002
type: FILE
parent_window_id: UA-W7
parent_assignment_id: ASG-UA-W7-01
assigned_agent: UNASSIGNED
predecessors: [UA-W7-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/run-progress.tsx
file_operation: MODIFY
starting_file_digest: e12b8c5ba6f8835c9d2215ed985651b97b720fe7d47303ca236d3dc2c1ae6697
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W7)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W7_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §7)
  - frontend/components/section-intro.tsx (consumed export, pinned 159096f3…)
  - frontend/components/run-progress.tsx (own file)
authorized_actions:
  - apply_the_two_ordered_replacements_of_section_7.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_progress_card_progress_head_progress_state_progress_track_wrappers
  - edit_the_state_indicator_span
  - change_metric_calculations_or_ProgressCount_branches
  - edit_stagePercent_stageLabel_formatDuration_or_RunLoadingSkeleton
  - put_phase_or_error_strings_into_SectionIntro_copy
  - create_a_second_marketing_h2
  - edit_section_intro_tsx_or_any_preserved_or_zero_edit_file
  - edit_query_editor_tsx_or_the_w7_test_file
  - paraphrase_any_DEC-UA-003_string_or_drop_a_period
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W7-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W8
may_start_successor: false
```

### 7.1 Mechanical trace

UA-W7-T2; UA-W7 objective (`SCN-UA-002`); DEC-UA-002; DEC-UA-003
(run-progress strings); DEC-UA-013; parent consequences 2, 4, and 8
(`change_metric_calculations` prohibited). Predecessor: UA-W7-S001 (parent-frozen
sequencing, §4). Terminal anchor: the §7.2 replacements; ending digest pin
`15d840bf…`.

### 7.2 Exact file transformation (two ordered replacements; each anchor count == 1)

**R1 — import** (line 1 region). The new import joins the existing `@/` group as
its first line (house style per `run-continuation.tsx`, components before lib):

OLD:

```tsx
import type { RunStatus } from "@/lib/api-types";
```

NEW:

```tsx
import { SectionIntro } from "@/components/section-intro";
import type { RunStatus } from "@/lib/api-types";
```

**R2 — inner `.progress-stage` children** (lines 43–50). The
`<section className="progress-card …">` wrapper (lines 35–39),
`div.progress-head` (line 40), `div.progress-stage` (lines 41–42 and 51), the
`state-indicator` span (line 42), `div.progress-state` (lines 52–55),
`progress-track` (lines 58–67), and both `ProgressCount` branches (lines 69–110)
are kept byte-identical. The conditional-eyebrow `<div>` children are replaced by
the SectionIntro call; immediately after it in that same inner div, `{stageLabel
(run.stage)}` is kept as `<p>{stageLabel(run.stage)}</p>` — not a second marketing
h2 and not inside SectionIntro (parent consequence 4).

OLD:

```tsx
          <div>
            <span className="eyebrow">
              {isQueryPreparation
                ? "Preparing your search plan"
                : "Current stage"}
            </span>
            <h2>{stageLabel(run.stage)}</h2>
          </div>
```

NEW:

```tsx
          <div>
            <SectionIntro
              eyebrow="Discovery"
              title="StoreSignal is looking for matching stores."
              copy="The stages and counts below are the existing run status."
            />
            <p>{stageLabel(run.stage)}</p>
          </div>
```

Operation ordering: single atomic file write after both replacements are prepared.
Obsolete behavior removed from this file: the conditional eyebrow string
(`Preparing your search plan` / `Current stage`) and the `<h2>{stageLabel(run.stage)}</h2>`
heading (the stage value survives as the kept `<p>{stageLabel(run.stage)}</p>`).
Resulting numstat is exactly `7 6` (simulated, S3 `EV-UA-W7-D-002`).

### 7.3 Preserved behavior and forbidden edits (within the writable file)

- All imports except the inserted SectionIntro line, `RunProgressProps`,
  `formatDuration`, `percent`/`active`/`isQueryPreparation`/`storesAnalyzed`/
  `trafficState` computation, the `progress-card` className expression, the
  `state-indicator` span, `div.progress-state` badge (`runStateTone`/
  `runStateLabel`) and duration, `progress-track` (`role="progressbar"`, the four
  aria-* attributes, the width span), both `ProgressCount` branches including the
  `traffic-metric-state` div, and the `ProgressCount` function — byte-identical.
- `stagePercent`, `stageLabel` (from `@/lib/stages`) and `formatDuration` — no
  call-site changes; the metric calculation lines are byte-identical.
- `RunLoadingSkeleton` (lines 135–147) — byte-identical.
- The three DEC-UA-003 strings must include their trailing periods exactly; no
  paraphrase, no case change, no added marketing-heading className on the
  `.progress-stage` wrapper. `Discovery` (capital D) must occur exactly once
  (the eyebrow prop); the lowercase `discovery` inside `RunLoadingSkeleton`'s
  aria-label is preserved.

### 7.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S001 accepted with ending digest `92efe1f7…` (recompute); frontend porcelain == §3 protected paths + ` M components/query-editor.tsx`; coordination root clean; `sha256sum components/run-progress.tsx` == `e12b8c5b…` | all true |
| V-B | Apply §7.2 edits with exact-match tooling (each OLD count == 1 before replacing) | 2 replacements applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- components/run-progress.tsx` and full `git diff` inspection | numstat == `7  6`; the diff contains exactly the §7.2 R1 and R2 changes and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state: SectionIntro import == 1; `Discovery` == 1; `StoreSignal is looking for matching stores.` == 1; `The stages and counts below are the existing run status.` == 1; `<SectionIntro` == 1; `<p>{stageLabel(run.stage)}</p>` == 1; `<h2` == 0; `Preparing your search plan` == 0; `Current stage` == 0; `state-indicator` == 1; `progress-stage` == 1; `progress-card` == 3; `progress-state` == 1; `progress-track` == 1; `stageLabel(` == 1; `stagePercent(` == 1; `formatDuration` == 2; `RunLoadingSkeleton` == 1; `<ProgressCount` == 7 | every assertion true |
| V-E | `sha256sum components/run-progress.tsx`; `git status --porcelain` | ending digest == `15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38`; attributable delta == ` M components/query-editor.tsx` + ` M components/run-progress.tsx` exactly (protected §3 paths unchanged) |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W7-I001` G1–G9) |

Expected workspace write set: exactly `{frontend/components/run-progress.tsx}`.

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

## 8. Initial implementation sub-window `UA-W7-S003`

```yaml
subwindow_id: UA-W7-S003
type: FILE
parent_window_id: UA-W7
parent_assignment_id: ASG-UA-W7-01
assigned_agent: UNASSIGNED
predecessors: [UA-W7-S001, UA-W7-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w7.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/components/query-editor.tsx (post-S001 state, digest 92efe1f7…)
  - frontend/components/run-progress.tsx (post-S002 state, digest 15d840bf…)
  - frontend/components/run-workspace.tsx (read-only pin, digest 9472450d…)
  - frontend/test/uphunt-aesthetic-coverage.test.ts (pinned f5137be4…)
  - frontend/test/uphunt-aesthetic-w6.test.ts (import-style predecessor, pinned f78b8da2…)
  - frontend/test/.ua-executed.json (runtime state, HEAD digest f136c564…)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W7_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §8)
authorized_actions:
  - create_the_writable_file_with_the_exact_section_8.3_bytes
  - run_the_w7_only_test_command_under_the_section_8.4_V-D_backup_run_restore_procedure
  - run_disposable_in_memory_negative_probes_V-D_via_node_-e (zero workspace writes)
  - run_read_only_node_inspection
  - record_git_status_preflight_and_postcondition
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_two_jsx_files_or_run_workspace_tsx
  - add_a_third_test_or_a_skip_filter_or_todo
  - assert_getExecuted_equals_REQUIRED_CASE_IDS_full_set_equality
  - call_recordExecuted_before_a_tests_assertions
  - edit_REQUIRED_CASE_IDS_or_the_coverage_test_file
  - commit_or_stage_test/.ua-executed.json
  - delete_test/.ua-executed.json (V-D moves it to /tmp/opencode and restores it byte-identically)
  - run_npm_test_full_suite_or_npx_tsc_or_npm_run_lint (deferred to UA-W7-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W8
may_start_successor: false
```

### 8.1 Mechanical trace

UA-W7-T3; CASE-UA-W7-001 (`SCN-UA-002`); CASE-UA-W7-002 (`SCN-UA-002`);
DEC-UA-011; DEC-UA-013; NC-UA-002 family and the T3 read-only RETRY_DELAYS pin
(§8.4 V-D). Predecessors: S001–S002 (each case's needles read the post-leaf file
states; §4 edges). Parent consequences 5 and 6 freeze the test count, needles, and
executed-set expectations.

### 8.2 Exact file transformation

CREATE `frontend/test/uphunt-aesthetic-w7.test.ts` with exactly the §8.3 bytes.
No other content, no extra test, no helper exports.

### 8.3 Exact required ending file content

The file is exactly (UTF-8, LF endings, single trailing newline; SHA-256
`92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842`):

```ts
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const queryEditor = await readFile(
  new URL("../components/query-editor.tsx", import.meta.url),
  "utf8",
);
const runProgress = await readFile(new URL("../components/run-progress.tsx", import.meta.url), "utf8");
const runWorkspace = await readFile(new URL("../components/run-workspace.tsx", import.meta.url), "utf8");

test("CASE-UA-W7-001 query editor search plan intro", () => {
  assert.match(queryEditor, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(queryEditor, /Search plan/u);
  assert.match(queryEditor, /Shape the searches before discovery starts\./u);
  assert.match(queryEditor, /Review, edit, or add queries, then start when the direction feels right\./u);
  recordExecuted("CASE-UA-W7-001");
});

test("CASE-UA-W7-002 run progress discovery intro and polling pin", () => {
  assert.match(runProgress, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(runProgress, /Discovery/u);
  assert.match(runProgress, /StoreSignal is looking for matching stores\./u);
  assert.match(runProgress, /The stages and counts below are the existing run status\./u);
  assert.match(runWorkspace, /const RETRY_DELAYS = \[3_000, 5_000, 10_000, 15_000\];/u);
  recordExecuted("CASE-UA-W7-002");
});
```

This content was dry-run validated by the window agent against the simulated
post-S001/S002 states in the disposable location `/tmp/opencode/ua-w7-dework/dryrun`
(S3 `EV-UA-W7-D-002`): 4 tests pass (2 × CASE-UA-W1 via the coverage import +
2 × CASE-UA-W7), 0 fail, 0 skipped, and the generated executed set contained
exactly the 4 expected IDs (set digest `3ae21607…`, matching parent consequence 6);
the dry-run directory remains disposable and outside the workspace.

### 8.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S002 accepted with ending digest `15d840bf…` (recompute); the S001 ending digest `92efe1f7…` (recompute); `test/uphunt-aesthetic-w7.test.ts` ABSENT; frontend porcelain == §3 protected paths + the two ` M` planned implementation paths; coordination root clean; `sha256sum test/.ua-executed.json` == `f136c564…` | all true |
| V-B | `sha256sum test/uphunt-aesthetic-w7.test.ts` after writing §8.3 bytes | digest == `92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842` |
| V-C | Disposable in-memory validation evidence recorded during authoring (window agent, `/tmp/opencode/ua-w7-dework`, S3 `EV-UA-W7-D-002`): N1 (NC-UA-002 family) delete the DEC-UA-003 title from an in-memory copy of post-S001 query-editor.tsx → the title assertion must fail; N2 (NC-UA-002 family) delete the SectionIntro import from an in-memory copy of post-S002 run-progress.tsx → the import assertion must fail; N3 (T3 read-only pin) alter the RETRY_DELAYS byte in an in-memory copy of run-workspace.tsx → the run-workspace needle assertion must fail | all three probes falsified (recorded authoring evidence; I001 G8 re-executes them fresh) |
| V-D | From ABSENT executed-set state: `mv test/.ua-executed.json /tmp/opencode/ua-w7-ua-executed-head-backup.json`; from `frontend/` run `node --experimental-strip-types --test test/uphunt-aesthetic-w7.test.ts`; read `test/.ua-executed.json`; then `mv /tmp/opencode/ua-w7-ua-executed-head-backup.json test/.ua-executed.json`; re-`sha256sum` | command exit 0; tests 4, pass 4, fail 0, skipped 0, with exactly the titles CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W7-001, CASE-UA-W7-002; json == exactly those 4 sorted IDs (§4.7 set digest `3ae216075ca80627b76f559b880ac0d7270b646832e70543300989957d07e52e`, parent consequence 6); post-restore digest == `f136c564…` and `git status --porcelain` shows `test/.ua-executed.json` unmodified |
| V-E | `git status --porcelain` | attributable delta == `?? test/uphunt-aesthetic-w7.test.ts` added to the two ` M` implementation paths and the protected §3 paths; no other path |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W7-I001` G1–G9) |

Expected workspace write set: exactly
`{frontend/test/uphunt-aesthetic-w7.test.ts}` plus the prescribed disposable
`test/.ua-executed.json` backup/run/restore cycle of V-D, whose net ending delta
is zero (byte-identical restore is part of the check).

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

(S003 V3: required local coverage IDs = registered =
{CASE-UA-W7-001, CASE-UA-W7-002} plus the 2 × CASE-UA-W1 registry re-executions
provoked by the import; zero skips, duplicates, or unexpected IDs; the 4-ID
executed-set digest `3ae21607…` is the witness. Full 43-set equality is
UA-W15-V5 only.)

## 9. Local and whole-window verification gates

Leaf-local gates: §6.4, §7.4, §8.4. Frozen whole-window gates, executed only by
`UA-W7-I001` from `frontend/`, per `A4` §Gates, `A4` UA-W7 lifecycle, `DEC-UA-014`,
`DEC-UA-016`, and parent consequence 7:

| Gate | Command / assertion | Expected |
|---|---|---|
| G1 | `npm test` per `DEC-UA-016` | PASS iff CASE-UA-W7-001 and CASE-UA-W7-002 pass (plus the two CASE-UA-W1 registry re-executions via the import) and every failing title, if any, is a member of the predecessor heading-oracle set {"My searches presents keyword research and identifiable run dossiers without rendering IDs", "MRR-FE-01 exact research payload and two-section surface", "MRR-W2 frontend unit certificate"}; expected total 179 tests / 176 pass / 3 fail = 175 predecessor + 2 W1 re-executions from the w7 import + 2 W7 cases; process exit 1 is expected and is not G1 FAIL when that holds; if CASE-UA-W1-001/002 fail solely with `SyntaxError: Unexpected end of JSON input` from getExecuted, that is the known concurrent recordExecuted race (DEC-UA-011 residue) — one identical rerun is permitted (E8.1) and is not a product failure |
| G2 | `npx tsc --noEmit --incremental false --pretty false` (`DEC-UA-014` oracle; `--incremental false` so no tsbuildinfo is written) | PASS iff zero output lines contain any owned-path needle: `query-editor.tsx`, `run-progress.tsx`, `uphunt-aesthetic-w7.test.ts` (globals.css is not typechecked); expected remaining diagnostics: exactly the 10 parked SRC-UA-0092 diagnostics (13 physical lines at the W6 close); repo-wide exit 0 NOT required; parked files MUST NOT be edited |
| G3 | `npm run lint` | exit 0 (JSX owned this window; globals.css not edited) |
| G4 | browser evidence (`browser_evidence: true`): local `next dev` with `STORESIGNAL_DESIGN_FIXTURES=1`, `/usr/bin/google-chrome --headless` screenshots of routes {`/design-fixture?scenario=query-review`, `/design-fixture?scenario=runtime`} ONLY, at widths 390, 768, 1280, 1440 (height 900), under `frontend/review-evidence/uphunt-aesthetic/UA-W7/` | 8 screenshots recorded; the route set is frozen to those two fixture routes (parent consequence 7); live `/runs/[runId]` MUST NOT be screenshotted (it polls); if the fixture 404s, that is PARENT_BLOCKED, not a live run; synthetic fixtures only; no credentials; local dev server processes only, under the §10 item 6 sandbox policy; this is local_e2e evidence, NOT a CASE oracle (SUB-UA-001) |
| G5 | coverage scope: required W7 window set (2 IDs, digest `a8c74516…`) = registered (two `test()` titles) = executed W7 IDs; after G1, `test/.ua-executed.json` is exactly the 19 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3} ∪ {2 × CASE-UA-W4} ∪ {2 × CASE-UA-W5} ∪ {3 × CASE-UA-W6} ∪ {2 × CASE-UA-W7} (§4.7 set digest `3bf626bfcd753aa30685f57a4285c441bfd3b68a2a5fb7ada03ad85218532ffb`, parent consequence 6); zero skips, duplicates, unexpected, or unactivated IDs in this window; full 43-set equality NOT asserted (`UA-W15-V5` owns it); the json is modified tracked runtime output (`d6121aa` residue) and is never committed | exact |
| G6 | `sha256sum` of the three planned files, `section-intro.tsx`, `run-workspace.tsx`, `runs/[runId]/page.tsx`, `globals.css`, `landing-sections.tsx`, `app/page.tsx`, `run-form.tsx`, `uphunt-aesthetic-coverage.test.ts`, `uphunt-aesthetic-w2.test.ts`, `uphunt-aesthetic-w3.test.ts`, `uphunt-aesthetic-w4.test.ts`, `uphunt-aesthetic-w5.test.ts`, `uphunt-aesthetic-w6.test.ts`, `app/runs/page.tsx`, `app/keywords/page.tsx`, `components/run-continuation.tsx`; plus `git status --porcelain` and a forbidden-path negative search over the whole window delta (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`, `email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, the five parked test files, the coverage test file, `REQUIRED_CASE_IDS`, `section-intro.tsx`, `landing-sections.tsx`, `run-workspace.tsx`, `app/runs/[runId]/page.tsx`, `globals.css`, W6 product files, the w2–w6 test files, `design-system-shell.test.ts`) | ending pins `92efe1f7…`, `15d840bf…`, `92201c35…` on the three planned files; byte pins `159096f3…`, `9472450d…`, `719e05ea…`, `b5c79578…`, `914c61e5…`, `3460751e…`, `72576044…`, `f5137be4…`, `f65ba0c5…`, `635e2802…`, `8008501d…`, `ee6425e9…`, `f78b8da2…`, `86392720…`, `8376447d…`, `d57edbe3…` all unchanged; implementation delta == exactly the three §4 planned files; coordination artifacts limited to the enumerated §2 list; `A5`/`A6` digests unchanged by leaves |
| G7 | static inspection of the new test file imports (`node:test`, `node:assert/strict`, `node:fs/promises`, `node:url`, `./uphunt-aesthetic-coverage.test.ts`) + suite behavior | 0 network operations, 0 DB operations (`UA-W7-V3`) |
| G8 | personally re-execute the §8.4 V-C probes N1/N2/N3 on fresh in-memory copies (tmp only, no workspace writes): NC-UA-002 family (DEC-UA-003 string removal falsifies CASE-UA-W7-001; SectionIntro import removal falsifies CASE-UA-W7-002) and the T3 read-only pin (RETRY_DELAYS byte change falsifies CASE-UA-W7-002's run-workspace oracle) | all falsified |
| G9 | successor negative search: no `UA-W8` artifact of any kind (no `uphunt-aesthetic-w8.test.ts`, no `live-leads-workspace`/`results-table`/`cumulative-traffic`/`results-filters` edits), `A5.current_window` still `UA-W7`, `next_window` untouched | `may_start_successor: false` honored; `UA-W7-H4/H6` hold |

PASS oracle for `UA-W7-I001`: G1–G9 all pass; `A4` `UA-W7-P1..P4`,
`UA-W7-V1..V5`, `UA-W7-H1..H5` then checked with resolvable evidence;
`frontend/review-evidence/uphunt-aesthetic/UA-W7_HANDOFF.md` written per §12.3;
`A5.current_status` set to `AWAITING_REVIEW` (the sole authorized post-I001 `A5`
handoff action); STOP per `UA-W7-H6` (no `UA-W8`).
CORRECTION_REQUIRED oracle: any G-gate behavioral failure → §10 correction loop
with `UA-W7-C00n` (single-file, dependency-safe).
PARENT_BLOCKED oracle: missing parent decision, contradiction with `A1`–`A4`, or
required scope expansion (e.g., a defect that cannot be corrected without editing
`section-intro.tsx`, `run-workspace.tsx`, `runs/[runId]/page.tsx`, `globals.css`,
`REQUIRED_CASE_IDS`, a parked file, `design-system-shell.test.ts`, or a W6
product/test file).

## 10. Correction and re-assessment rules

1. Every correction is a new single-file sub-window `UA-W7-C00n` with a new
   assignment ID and baseline digest, citing: the failed evidence, exact root
   cause, the governing requirement and decision already determining the remedy,
   the earlier sub-window corrected, and the gates invalidated. Nothing is
   rewritten in place; `S3` is append-only.
2. `REQUIRED_CASE_IDS` and the coverage test file are NOT correctable at window
   level (`A5` prohibitions). A defect requiring changes there is
   `PARENT_BLOCKED`.
3. `section-intro.tsx`, `run-workspace.tsx`, `app/runs/[runId]/page.tsx`, and
   `globals.css` are frozen (§0 consequence 2). A failing check that would
   require editing any of them, a W6 product/test file, a parked file, or
   `design-system-shell.test.ts` is `PARENT_BLOCKED`, never a frozen-file edit.
4. After the last correction the window agent personally runs a new assessment
   `UA-W7-I00n` (new ID), reusing unchanged gates by exact reference and rerunning
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

## 11. Mandatory authoring-readiness checklist (sub-window standard §11)

Evidence citations resolve into `S3` (`EV-UA-W7-D-001..003`).

### 11.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA-W7-D-001 (A5: ASG-UA-W7-01, UA-W7-WINDOW-AGENT, IN_PROGRESS, decompose action authorized; A5 digest 13285c12… recomputed MATCH)
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA-W7-D-001 (recomputed SHA-256 matches all pins incl. A4 `0a834df7…`, A1 `57fa49c7…`, A3 `094bc8bf…`, and subwindow standard `842c2955…`)
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA-W7-D-003 (§2, §6–§8 of this S1)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA-W7-D-001 (§3 of this S1)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA-W7-D-003 (S1 spec / S2 state / S3 evidence paths)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA-W7-D-003 (leaf prohibited_actions; report-only-to-window-agent rule)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: EV-UA-W7-D-003 (§10 item 5 == A5 policy)

### 11.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA-W7-D-003 (§5 table; UA-W7-T1/T2/T3; A4 test_registration CASE-UA-W7-001..002)
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA-W7-D-001 (§0 consequences close the remaining choices; current source matches every §3 anchor: query-editor heading row lines 219–225, run-progress stage inner div lines 43–50)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA-W7-D-002 (both = the three §4 planned files; planned-file-set digest `b0421156…` matches parent consequence 7; the three zero-edit in-scope/read-only files accounted for by parent consequence 2 with G6 pins)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: EV-UA-W7-D-003 (§4: S001–S003, one file each; zero-edit in-scope files take no S-number per parent consequence 1)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: EV-UA-W7-D-002 (§6.2/§7.2 replacements with unique anchors and occurrence count 1; §8.3 bytes with pinned digest `92201c35…`; all ending digests simulated)
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: EV-UA-W7-D-003 (§4; no waves — parent consequence 1; S003 ordered after S001/S002 by the needle dependencies; S001→S002 ordered by parent-frozen sequencing with one-active-leaf review between leaves)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: EV-UA-W7-D-003 (§5.1: SectionIntro export pinned `159096f3…`; RETRY_DELAYS needle pinned `9472450d…`; recordExecuted pinned `f5137be4…`; all leaf ending digests pinned before S003 dispatch)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: EV-UA-W7-D-003 (§4.1 table)
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: EV-UA-W7-D-003 (two jsx leaves and a test leaf are separate; runtime json handled by prescribed disposable procedure, never a deliverable)
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: EV-UA-W7-D-003 (command lists in §6.4–§8.4; the only prescribed non-writable touch is the §8.4 V-D json backup/run/restore with net-zero delta; tsc leaf runs are not scheduled — tsc is an I001 gate)

### 11.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7 of the standard. Evidence: EV-UA-W7-D-003 (§6–§8 yaml blocks; 15/15 field-presence lint per block)
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: EV-UA-W7-D-003 (byte-exact §6.2/§7.2 with unique anchors and occurrence counts; §8.3 full file bytes pinned by digest)
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: EV-UA-W7-D-003 (§6.4–§8.4)
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: EV-UA-W7-D-003 (V-E rows in §6.4–§8.4; V-D net-zero json restore proof)
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: EV-UA-W7-D-003 (§12 templates; H3 rows)
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: EV-UA-W7-D-003 (leaf prohibited_actions)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: EV-UA-W7-D-003 (each leaf's LOCAL_NOW set passes standalone — S001/S002 by digest pins, S003 by the V-D w7-only run; whole-window gates deferred and named)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: EV-UA-W7-D-003 (DEF rows → UA-W7-I001)

### 11.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: EV-UA-W7-D-003 (§5; 2 cases → S003 with §8.3 bytes)
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: EV-UA-W7-D-003 (§8.4 V-D; §9 G5)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: EV-UA-W7-D-003 (NC-UA-002/001-family probes at S003 leaf level (§8.4 V-C N1–N3) with I001 G8 personal re-execution; S001/S002 integrity enforced by the ending-digest pins)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: EV-UA-W7-D-003 (SUB-UA-001 inherited: UTF-8 file reads are source-text oracles only; no computed-pixel claim; screenshots are local_e2e evidence, not oracles; coverage and w2–w6 test files never weakened here)
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: EV-UA-W7-D-003 (§13: authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: EV-UA-W7-D-003 (§9; G4 scheduled at I001 per browser_evidence true)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: EV-UA-W7-D-003 (§10)
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: EV-UA-W7-D-003 (§13 assigned WINDOW-AGENT; §10 item 6; parent consequence 8 same-identity review)
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: EV-UA-W7-D-003 (§9 G5/G6/G8; §8.4 V-B/V-D)
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: EV-UA-W7-D-003 (§12.3)
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: EV-UA-W7-D-003 (§10 item 5)

### 11.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA-W7-D-003 (`UA-W7-S001`–`UA-W7-S003`, `UA-W7-I001` unique; S-numbering exactly as parent consequence 1; CASE/DEC/SCN/NC IDs cite A3/A4)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA-W7-D-003 (S1 contains only concrete paths, digests, bytes, counts)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA-W7-D-003 (exact-set comparisons in §6.4–§8.4 V-E rows; prescribed disposable `.ua-executed.json` cycle excluded by the net-zero restore proof)
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: EV-UA-W7-D-002 (SW-D03 set equality over the parent-pinned 3-file digest `b0421156…` is the failure detector)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: EV-UA-W7-D-003 (§8.3 two tests each call recordExecuted after its oracle; §9 G5 counts and digests; A4 §Enforcement 1–4 inherited)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: EV-UA-W7-D-003 (byte-pinned replacements and file content; any divergence changes the reviewed ending digests; accepted tests untouched)
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: EV-UA-W7-D-003 (leaf prohibited_actions + §4.6 proofs via V-E rows)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: EV-UA-W7-D-003 (§10 items 1, 6)
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: EV-UA-W7-D-003 + S2 `decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`, leaves `assigned_agent: UNASSIGNED`
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA-W7-D-003 (15/15 required fields per FILE block; 0 unresolved references)
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: EV-UA-W7-D-003 (§10 item 5)

## 12. Handoff templates

### 12.1 Leaf completion certificate (returned by each leaf agent)

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W7
subwindow_id: UA-W7-S001 | UA-W7-S002 | UA-W7-S003
assignment_id: ASG-UA-W7-01-S001 | ASG-UA-W7-01-S002 | ASG-UA-W7-01-S003
agent_identity: exact identity
writable_file: exact path from §6–§8
starting_file_digest: ce09064c… | e12b8c5b… | ABSENT
ending_file_digest: 92efe1f7… | 15d840bf… | 92201c35…
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
attributable_changed_file_set: [writable file only]
required_local_cases: [] | [] | [CASE-UA-W7-001, CASE-UA-W7-002]
registered_local_cases: same as required_local_cases
executed_local_cases: [] | [] | [CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W7-001, CASE-UA-W7-002] (V-D w7-only run; the 2 W1 IDs are registry re-executions via the import)
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 0 | 0 | 3
negative_controls_falsified: 0 | 0 | 3
commands: []
deferred_integration_checks: [UA-W7-I001 gates per §9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

### 12.2 Window-agent integration certificate (appended to `S3` by `UA-W7-I001`)

The §12.4 certificate of the sub-window standard, adapted:
`integration_assessment_id: UA-W7-I001`; `accepted_initial_subwindows` from leaf
reviews; `expected_changed_file_set` = the three §4 planned files;
`required_case_count: 2` (window-local; the 43-ID registry equality is UA-W15-V5);
`registered_case_count: 2`; `executed_case_count: 2` window-local (plus 2 W1 + 15
predecessor IDs re-executed in the full run); `required_case_set_digest:
a8c74516b3979e433aa07e11262d4504f3935076b3d7e70a8a5629872bf70394`;
registered/executed digests computed with the §4.7 formula over the same IDs;
post-G1 executed-set digest
`3bf626bfcd753aa30685f57a4285c441bfd3b68a2a5fb7ada03ad85218532ffb`;
`status: READY_FOR_PARENT_REVIEW` only per the §9 PASS oracle.

### 12.3 Consolidated parent handoff

`frontend/review-evidence/uphunt-aesthetic/UA-W7_HANDOFF.md` per `A4` handoff
template and sub-window standard §12.5: objective; status
`READY_FOR_PARENT_REVIEW` or one exact blocker; changed-file set +
starting/ending SHA-256s (including the preserved zero-edit `globals.css`
`b5c79578…`, `run-workspace.tsx` `9472450d…`, `runs/[runId]/page.tsx`
`719e05ea…`, read-only `section-intro.tsx` `159096f3…`, and unchanged
predecessors); CASE required/registered/executed/skipped/duplicate/unexpected
(2/2/2/0/0/0 window-local; 2 additional registry IDs re-executed via import; full
43-set equality deferred to UA-W15); required-set digest `0d14982c…` (registry)
and W7-set digest `a8c74516…`; commands and outcomes; browser-evidence file list
under `frontend/review-evidence/uphunt-aesthetic/UA-W7/` (8 PNGs, routes
`/design-fixture?scenario=query-review` + `/design-fixture?scenario=runtime`);
sandbox recoveries; NC results; forbidden-path negative search; `S1`/`S2`/`S3`
paths and revisions; the tracked `.ua-executed.json` residue disclosure (19-ID
content, uncommitted); confirmation that `UA-W8` was not started.

## 13. Initial integration assessment `UA-W7-I001` (fully authored now)

```yaml
subwindow_id: UA-W7-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W7
parent_assignment_id: ASG-UA-W7-01
assigned_agent: WINDOW-AGENT (UA-W7-WINDOW-AGENT, personally executed, never delegated)
predecessors: [UA-W7-S001, UA-W7-S002, UA-W7-S003]
authorized_write_file: NONE (implementation files; coordination artifacts per §2 only)
input: assembled UA-W7 state after UA-W7-S003 is accepted
gates: §9 table G1–G9 (frozen)
pass_oracle: G1..G9 pass; G4 executed and recorded (browser_evidence true; the two frozen fixture routes only)
correction_oracle: any behavioral gate failure -> §10 loop with UA-W7-C00n
parent_blocked_oracle: missing decision / contradiction / scope expansion (incl. §10 items 2–3)
execution_policy: E8.1 sandbox escalation + one identical recovery (§10 item 5)
may_start_successor: false
```

Accepted-subwindow and digest fields are filled from completed leaf evidence at
run time; the gate set above is frozen now (sub-window standard §9.1).

## 14. Self-falsification (sub-window standard §14)

Before declaring readiness the window agent verified the document rejects each
applicable counterexample (rejection mechanism in parentheses):

1. sub-window names two writable files (§6–§8 yaml `writable_file` single path; SW-E04 V-E exact-set proofs) — rejected.
2. sub-window names a directory/wildcard (canonical file paths only; SW-R03) — rejected.
3. a command creates an unplanned second workspace file (command lists enumerated; the only non-writable touch is the §8.4 V-D json cycle with prescribed net-zero restore) — rejected.
4. source and test file assigned together (jsx leaves S001/S002 and test leaf S003 are separate; SW-D09) — rejected.
5. a required parent file is absent from the decomposition (SW-D03 set equality over the parent-pinned 3-file digest; the zero-edit in-scope files are accounted for by parent consequence 2 with G6 pins) — rejected.
6. two initial sub-windows own the same file (S001–S003 files pairwise distinct; SW-D04) — rejected.
7. a dependent file begins before its interface is frozen (§5.1 ending digests and needles frozen before S003 dispatch; SW-D07) — rejected.
8. an intermediate state has an unexplained test failure (§4.1 table: no permitted check fails in any row; unexpected failures stop the sequence) — rejected.
9. a subagent starts its successor (`may_start_successor: false` in every block; H3; parent consequence 8) — rejected.
10. a subagent communicates directly with the parent (prohibited_actions; H2) — rejected.
11. the window agent repairs implementation during review (§10 item 6) — rejected.
12. an integration failure produces no diagnosed one-file correction (§10 items 1, 4) — rejected.
13. a correction silently rewrites a completed sub-window (§15 append-only amendments; §10 item 1) — rejected.
14. acceptance omits/skips/duplicates/filters/unactivates a required case (§9 G5 counts + digests; §8.4 V-D) — rejected.
15. an oracle is weakened to accommodate current behavior (byte-pinned replacements and file content; any divergence changes reviewed digests; SW-R06) — rejected.
16. a test substitute proves more parity than its fidelity supports (SUB-UA-001 inherited: source-text oracles; screenshots are local_e2e only; SW-V04) — rejected.
17. a costly gate is repeated without its scheduling rule (§9 gates scheduled at I001 only; DEF rows name the owner) — rejected.
18. a correction changes a file but dependent evidence is reused without proof (§10 item 4 rerun list) — rejected.
19. the assembled changed-file set differs from the planned set or exceeds parent scope (§9 G6 delta + forbidden-path search; SW-D03) — rejected.
20. the window agent claims parent acceptance or begins UA-W8 (§9 PASS oracle stops at READY_FOR_PARENT_REVIEW + A5 AWAITING_REVIEW; G9) — rejected.
21. an already-authorized local gate is escalated to the parent merely for sandbox privilege (§10 item 5 E8.1 policy) — rejected.
22. a changed command, observable failure, surviving process, or mutation is accepted as automatic sandbox recovery (§10 item 5 recovery preconditions) — rejected.
23. parallel leaves overlap dependencies/resources or the next wave starts early (no waves authorized; §4 single sequential order; parent consequence 1) — rejected.

## 15. Append-only amendment sections

Reserved for corrective sub-windows (`UA-W7-C001`, …) and further assessments
(`UA-W7-I002`, …). Each amendment repeats the §6 block structure in full with a
new ID, new baseline digest, cited trigger evidence, and invalidated gates.
Existing sections above are immutable after parent approval.