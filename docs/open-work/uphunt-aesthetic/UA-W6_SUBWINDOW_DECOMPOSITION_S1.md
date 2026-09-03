# UA-W6 frozen sub-window decomposition checklist (`S1`)

Subordinate artifact `S1` of parent window `UA-W6` under assignment `ASG-UA-W6-01`.
Companion artifacts: `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W6_SUBWINDOW_STATE_S2.yaml`
and `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W6_SUBWINDOW_EVIDENCE_S3.md`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

This file is frozen once the parent approves the decomposition. Corrections are appended
in §17 with new IDs; existing blocks are never rewritten.

## 0. Parent-frozen mechanical consequences (copied from `A6` `EV-UA-A-041`; not reopened)

The parent froze the following consequences in `A6` `EV-UA-A-041`
(`parent_frozen_mechanical_consequences`). They are copied here and are outside
decomposition authority. They close otherwise-open S1 choices; they are uniquely
determined by DEC-UA-002, DEC-UA-003, UA-W6-T1/T2/T3, and CASE-UA-W6-001..003:

1. FILE sub-window IDs start at `UA-W6-S001`. A zero-edit in-scope file gets no
   FILE sub-window and does not consume an S-number. Do not retire S001/S002
   unused. Sequential DAG, no parallel waves: S001 `frontend/app/runs/page.tsx`
   → S002 `frontend/app/keywords/page.tsx` → S003
   `frontend/components/run-continuation.tsx` → S004 `frontend/app/globals.css`
   → S005 `frontend/test/uphunt-aesthetic-w6.test.ts` → `UA-W6-I001`.
2. Zero-edit preserved (G6 pins, no FILE leaf): `frontend/app/runs/continue/page.tsx`
   `c72d135f32f7b71f7109a0af58af8dbc1c165a03a256eef3eae74b16492ca28b` (only renders
   `<RunContinuation />`; no run-title-row); `frontend/components/run-history.tsx`
   `de99ecac6cb4935c445fc1b669e3174bb64b37be0e8b6565888d877776d6ce19` (list h2s are
   not the page header); `frontend/components/keyword-intelligence/research-form.tsx`
   `b5fae7da13c47a0cdacb85db69261bc5df8b0cf50c03bb4b1876424476c4e950`.
   `section-intro.tsx` is read-only
   `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175`. Do not change
   metadata titles, `dynamic`, RunHistory/ResearchForm usage, claim/router/apiRequest,
   createKeywordResearch, or Link hrefs.
3. T1 JSX: keep the existing `div.run-title-row.app-page-header` wrappers and
   existing buttons/links. Replace only the inner eyebrow/h1/p heading children with
   `<SectionIntro>` using DEC-UA-003 exact strings including periods. /runs eyebrow
   "Account workspace" title "Return to the searches you already started." copy
   "Continue keyword research or open the leads from an earlier market."; keep
   `<Link className="ds-button ds-button--primary" href="/">New discovery</Link>`.
   /keywords eyebrow "Keyword research" title "See the phrases a market actually
   uses." copy "Start from seed phrases. Finish with a shortlist you are willing to
   search." /runs/continue is owned in `run-continuation.tsx`: replace the
   eyebrow/h1/default-p with SectionIntro eyebrow "Preparing run" title "Your search
   is being prepared." copy "Continue when the next step is ready."; keep the
   spinner; keep error+actions (Try again, Link href="/runs"); do not put the error
   string into SectionIntro copy; do not change claim logic. Import
   `{ SectionIntro } from "@/components/section-intro"`.
4. T2 CSS only, two unique hunks, no new selectors. Starting `globals.css`
   `7ae364194f8522a40a072914708841408909c9e41228e71cbc56488f948d98d2`. Ending digest
   `b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d`. Hunk 1
   unscoped `.app-page-header` (align-items: flex-end; margin-bottom:
   var(--space-7);) add `gap: var(--space-6);` between those two declarations.
   Hunk 2 media `.app-page-header` (align-items: stretch; gap: var(--space-4);
   margin-bottom: var(--space-5);) replace gap with `gap: var(--space-6);`. Do not
   edit `.run-title-row`, `.app-canvas`, `.history-page`, `.eyebrow`,
   `.app-page-header h1`, W4 `.run-form-card`, W5 `.intelligence-card`, tokens, or
   `.auth-card`.
5. CREATE `test/uphunt-aesthetic-w6.test.ts` with exactly three tests
   CASE-UA-W6-001/002/003. 001: runs/page.tsx has the SectionIntro import, the three
   /runs DEC-UA-003 strings, href="/", and globals.css contains the unscoped needle
   `align-items: flex-end;\n  gap: var(--space-6);`. 002: keywords/page.tsx has the
   import and the three /keywords DEC-UA-003 strings. 003: run-continuation.tsx has
   the import, the three /runs/continue DEC-UA-003 strings, and href="/runs".
   `recordExecuted` after assertions. No fourth test. No `getExecuted` vs
   `REQUIRED_CASE_IDS` full-set equality.
6. Last FILE leaf (S005) from ABSENT `test/.ua-executed.json` expects exactly 5 IDs
   (2 × W1 re-executions + CASE-UA-W6-001/002/003), set digest
   `98d03fa1e3bbd761922657e899297703352ac551abba210713fc13860682ddc1`. The 17-ID
   set {2 × W1} ∪ {4 × W2} ∪ {4 × W3} ∪ {2 × W4} ∪ {2 × W5} ∪ {3 × W6} is asserted
   only at I001 G5 after `npm test`, digest
   `e7895fa537ab11d142d86344f4cca4607d35d1b164f1cbda6097bf765e167421`. Do not
   require W2–W5 IDs at the w6-only test command. `test/.ua-executed.json` is
   TRACKED at HEAD (owner commit `d6121aa` residue); never commit it.
7. I001 G4 is frozen as routes {`/runs`, `/keywords`} at 390/768/1280/1440 only
   (8 screenshots). Do not screenshot `/runs/continue` (it POSTs claim and
   redirects). Expected `npm test` after W6 is 175 pass (170 predecessor + 2 × W1
   re-executions from the w6 import + 3 W6 cases). Window-local case digest
   `c5cc5fca3fc5d9d81325b229047a41f4b845c50aa530b1da84c4fc57b23bfb9a`. Planned
   implementation set {`frontend/app/runs/page.tsx`,
   `frontend/app/keywords/page.tsx`, `frontend/components/run-continuation.tsx`,
   `frontend/app/globals.css`, `frontend/test/uphunt-aesthetic-w6.test.ts`}, digest
   `85d3d712a40a520a425acff2511ee06abb1b2c5bdf1c4b191474b3e161140577`.
8. Do not start UA-W7. Do not edit `section-intro.tsx`, `landing-sections.tsx`,
   `query-editor`, `run-progress`, leads pages, or `REQUIRED_CASE_IDS`. After each
   FILE leaf, the same window-agent identity personally reviews it (execute then
   review in one turn); parent issues the next leaf.

## 1. Inherited authority and revision pins

| Pin | Value |
|---|---|
| Parent window | `UA-W6` |
| Parent assignment | `ASG-UA-W6-01` |
| Window agent | `UA-W6-WINDOW-AGENT` |
| Parent standard | `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` |
| Sub-window standard | `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` |
| Contract `A1` | `a33ae1d8af4442de2680dc70f2c6e793a668b1400f0814833489061848c9baef` |
| Decision `A3` | `8faaa4e2411235d8a83ec94de6a07e53c54ece91d99121a3c0e09cb6052f4300` |
| Checklist `A4` | `713462c8b26fba4a1e94caa36ec8d28b1e6481b171fbce399491231dccb74c64` |
| Active state `A5` (file digest) | `8620953c6d00f2c9beee7e0896a38abca8b02477a65502071b7c5ff705e488a3` (state_version 13) |
| Required coverage set (43 IDs, E6) | `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` (A4 §Coverage pin; asserted by CASE-UA-W1-002) |
| Planned implementation set (5 paths, §4.7 digest) | `85d3d712a40a520a425acff2511ee06abb1b2c5bdf1c4b191474b3e161140577` (parent consequence 7, recomputed 2026-09-03) |
| Read-only `frontend/components/section-intro.tsx` | `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175` (recomputed 2026-09-03; matches `EV-UA-A-041`) |
| Predecessor `frontend/test/uphunt-aesthetic-coverage.test.ts` | `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` (recomputed 2026-09-03; matches `EV-UA-A-041`) |
| Protected `frontend/test/uphunt-aesthetic-w2.test.ts` | `f65ba0c50c78ef983496d0a37af1a1a6a1234332c48a5290bc344c9a5e68b78c` (recomputed 2026-09-03; unchanged) |
| Protected `frontend/test/uphunt-aesthetic-w3.test.ts` | `635e28022e14646c26407dd41c77c55a4c7fb3b34c6aa29d2f6b63eaaee69b13` (recomputed 2026-09-03; unchanged) |
| Protected `frontend/test/uphunt-aesthetic-w4.test.ts` | `8008501d5da4b946bd07ea05260400198c306e1cfb2741fec7ed3ff44a3832a7` (recomputed 2026-09-03; unchanged) |
| Protected `frontend/test/uphunt-aesthetic-w5.test.ts` | `ee6425e9be6ca190d27981b39656dc1692f5cc2b0c049795a59f28d418cffe06` (recomputed 2026-09-03; matches `EV-UA-A-041`) |
| Preserved predecessor `frontend/components/landing-sections.tsx` | `914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15` (recomputed 2026-09-03; unchanged) |
| Preserved predecessor `frontend/app/page.tsx` | `3460751e72842cb22b4116211408c4c8ddaef0f4efd02513f1228182902f5a86` (recomputed 2026-09-03; unchanged) |
| Preserved predecessor `frontend/components/run-form.tsx` | `72576044e7f57c4e76206e7b204c73202b84775b98e309ead8ba2ccc601fb8a2` (recomputed 2026-09-03; unchanged) |
| Zero-edit in-scope `frontend/app/runs/continue/page.tsx` | `c72d135f32f7b71f7109a0af58af8dbc1c165a03a256eef3eae74b16492ca28b` (recomputed 2026-09-03; parent consequence 2) |
| Zero-edit in-scope `frontend/components/run-history.tsx` | `de99ecac6cb4935c445fc1b669e3174bb64b37be0e8b6565888d877776d6ce19` (recomputed 2026-09-03; parent consequence 2) |
| Zero-edit in-scope `frontend/components/keyword-intelligence/research-form.tsx` | `b5fae7da13c47a0cdacb85db69261bc5df8b0cf50c03bb4b1876424476c4e950` (recomputed 2026-09-03; parent consequence 2) |
| Starting `frontend/app/runs/page.tsx` (S001 baseline) | `24c146e8feefc30408c7932a57195a87cf6bc38ef4cc810cff26778d059ed181` (recomputed 2026-09-03; matches `EV-UA-A-041`) |
| Starting `frontend/app/keywords/page.tsx` (S002 baseline) | `07a826646454bb2612b992d2e2d5f77a302e3272ce11d5ee21e3bd950e3de1fd` (recomputed 2026-09-03; matches `EV-UA-A-041`) |
| Starting `frontend/components/run-continuation.tsx` (S003 baseline) | `e0e4f14f2b84493aef5268fca5a2913472ce17cf4c762bcd008b04e813722cc3` (recomputed 2026-09-03; matches `EV-UA-A-041`) |
| Starting `frontend/app/globals.css` (S004 baseline) | `7ae364194f8522a40a072914708841408909c9e41228e71cbc56488f948d98d2` (recomputed 2026-09-03; the UA-W5 ending state) |
| Starting `frontend/test/uphunt-aesthetic-w6.test.ts` | ABSENT (verified 2026-09-03) |
| `A5` authorized_windows | `[UA-W6]` |
| `A5` may_start_successor | `false` |
| Successor `UA-W7` | reserved for parent; NOT authorized (`A5` prohibited `start_UA-W7`) |

All pins recomputed 2026-09-03 by `UA-W6-WINDOW-AGENT` and matched byte-exact
(S3 `EV-UA-W6-D-001`). Root `ACTIVE_EXECUTION_STATE.md` is out of authority and
untouched (coordination root `git status --porcelain` clean, S3 `EV-UA-W6-D-001`).

## 2. Parent-window scope and exclusions (copied, no expansion)

From `A4` §UA-W6 and `A5` `authorized_write_scope`:

- Objective: /runs, /runs/continue, /keywords page headers use DEC-UA-003 copy
  (`A4` §UA-W6).
- Window write scope (implementation, exactly eight authorized paths):
  `frontend/app/runs/page.tsx`, `frontend/app/runs/continue/page.tsx`,
  `frontend/app/keywords/page.tsx`, `frontend/components/run-history.tsx`,
  `frontend/components/run-continuation.tsx`,
  `frontend/components/keyword-intelligence/research-form.tsx`,
  `frontend/app/globals.css` (owned selectors only, below),
  `frontend/test/uphunt-aesthetic-w6.test.ts`.
- Planned changed-file set (§4): exactly five files — `frontend/app/runs/page.tsx`
  (MODIFY), `frontend/app/keywords/page.tsx` (MODIFY),
  `frontend/components/run-continuation.tsx` (MODIFY), `frontend/app/globals.css`
  (MODIFY), `frontend/test/uphunt-aesthetic-w6.test.ts` (CREATE); planned-set
  digest `85d3d712a40a520a425acff2511ee06abb1b2c5bdf1c4b191474b3e161140577`
  (parent consequence 7). Three in-scope files have zero required edits and get no
  FILE sub-window (parent consequences 1–2): `runs/continue/page.tsx` only renders
  `<RunContinuation />`, `run-history.tsx` list h2s are not the page header, and
  `research-form.tsx` is untouched. Required changed-file set = planned set
  (S3 `EV-UA-W6-D-002`).
- Shared-file scope for `frontend/app/globals.css` (`A4`): `.app-canvas`,
  `.history-page`, `.app-page-header`, `.run-title-row`, `.eyebrow`. This
  decomposition narrows the editable set to exactly the two §9.2 hunks (parent
  consequence 4, which pins start digest `7ae36419…` and end digest
  `b5c79578…`); no other declaration in any of those rules may change. Unowned
  selectors (`.run-title-row`, `.app-canvas`, `.history-page`, `.eyebrow`,
  `.app-page-header h1`, W4 `.run-form-card` rules, W5 `.intelligence-card` rules,
  `.auth-card`, token definitions) stay byte-identical.
- Read-only scope (window): `frontend/components/section-intro.tsx`.
- Window-agent coordination writes (never implementation): `S1`, `S2`, `S3` (this
  decomposition), `A6` append-only, `A4` `UA-W6-P*`/`UA-W6-T*`/`UA-W6-V*`/`UA-W6-H*`
  checkboxes only, `frontend/review-evidence/uphunt-aesthetic/UA-W6_HANDOFF.md`,
  screenshots under `frontend/review-evidence/uphunt-aesthetic/UA-W6/` (headless
  chrome only, after the parent accepts this decomposition), and at handoff only
  `A5.current_status: AWAITING_REVIEW` (the sole authorized `A5` handoff action
  after I001 PASS; `A5` is otherwise protected from every leaf).
- Authorized actions: `modify_runs_page`, `modify_keywords_page`,
  `modify_run_continuation`, `modify_globals_css_owned_selectors_only`,
  `create_w6_test_file`, `run_frontend_unit_tests`, `run_frontend_npm_test`,
  `run_npx_tsc_noEmit`, `run_npm_run_lint` (CSS/JSX owned this window),
  `run_headless_chrome_browser_evidence` (I001 only); window-agent assessment and
  coordination writes above; sandbox escalation per the E8.1 policy in §12 item 6.
- Prohibited: `start_UA-W7`, `may_start_successor`, `edit_section_intro`,
  `edit_continue_page_tsx`, `edit_run_history`, `edit_research_form`,
  `change_claim_or_router_or_apiRequest`, `change_createKeywordResearch`,
  `edit_unowned_globals_css_selectors`, `edit_intelligence_card_or_W5_selectors`,
  `edit_run_form_card_or_W4_selectors`,
  `edit_auth_card_or_glass_grouped_intelligence_card_rule`, `add_dependency`,
  `edit_REQUIRED_CASE_IDS`, `edit_uphunt-aesthetic-coverage_test`,
  `edit_uphunt-aesthetic-w2_w3_w4_w5_test_files`,
  `edit_parked_SRC-UA-0092_test_files`, `edit_unowned_app_or_component_files`,
  `aws`, `commit`, `push`, `production`, `paid_provider`, `edit_email_scraper`,
  `edit_root_ACTIVE_EXECUTION_STATE`. `npm run build` is a UA-W15-only gate.
- `test/.ua-executed.json` is a TRACKED runtime-output path (owner commit
  `d6121aa` residue). It is never a W6 deliverable and is never committed by this
  window; leaves may touch it only through the prescribed §10.4 V-D
  backup/run/restore procedure.

## 3. Starting working-tree inventory (recorded 2026-09-03, read-only)

Repository: `/home/harit/Email Scrapper/frontend` (git toplevel, HEAD `bb4285e`
"W5"). Coordination root `/home/harit/Email Scrapper` is a separate git repository
and reported a clean `git status --porcelain` (root `ACTIVE_EXECUTION_STATE.md`
untouched).

Starting changed-file set (frontend repo, `git status --porcelain`, sorted):

1. ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml` — assignment
   fields written by parent for `ASG-UA-W6-01` (`EV-UA-A-041`); starting file
   digest `8620953c6d00f2c9beee7e0896a38abca8b02477a65502071b7c5ff705e488a3`
   (state_version 13); PROTECTED (no leaf writes; only the handoff action
   `set_A5_AWAITING_REVIEW_on_handoff` may touch it later, never a leaf).
2. ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` — append-only evidence
   (`EV-UA-A-041` is its tail); window-agent append-only; PROTECTED against leaf
   writes.

Starting repository change set digest (§4.7 formula over the two paths above):
`e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450`.

Starting state of planned and preserved files (all recomputed 2026-09-03):

- `frontend/app/runs/page.tsx`: present, clean, digest `24c146e8…`. Anchors: the
  `RunHistory` import is line 4; the wrapper `div.run-title-row.app-page-header` is
  line 13; the inner eyebrow/h1/p `<div>` is lines 14–18; the `New discovery`
  `<Link … href="/">` is line 19.
- `frontend/app/keywords/page.tsx`: present, clean, digest `07a82664…`. Anchors:
  the `ResearchForm` import is line 3; the wrapper is line 12; the inner
  eyebrow/h1/p `<div>` is lines 13–17; no Link exists in this file.
- `frontend/components/run-continuation.tsx`: present, clean, digest `e0e4f14f…`.
  Anchors: the `@/lib/api-types` import is line 7; the spinner span is line 56; the
  eyebrow/h1/p block is lines 57–61; the error actions block is lines 62–67
  (`Try again` button + `<Link … href="/runs">My runs</Link>`).
- `frontend/app/globals.css`: present, clean, digest `7ae36419…` (the parent
  consequence 4 starting pin; equals the UA-W5 ending state). Hunk anchors: the
  unique unscoped `.app-page-header` block is lines 5810–5813; the media
  `.app-page-header` block is lines 6176–6180 inside `@media (max-width: 780px) {`
  opened at line 6133. Baseline counts are pinned in §9.4 V-D.
- `frontend/test/uphunt-aesthetic-w6.test.ts`: ABSENT.
- `frontend/components/section-intro.tsx` (read-only): digest `159096f3…`; exports
  `SectionIntro({ eyebrow, title, copy, inverse = false })` rendering
  `div.marketing-heading` with `span.eyebrow` (when eyebrow defined), `h2` title,
  `p` copy (when copy defined).
- Zero-edit in-scope files (parent consequence 2): `app/runs/continue/page.tsx`
  `c72d135f…`, `components/run-history.tsx` `de99ecac…`,
  `components/keyword-intelligence/research-form.tsx` `b5fae7da…`.
- Predecessor and protected files: `test/uphunt-aesthetic-coverage.test.ts`
  `f5137be4…`, `test/uphunt-aesthetic-w2.test.ts` `f65ba0c5…`,
  `test/uphunt-aesthetic-w3.test.ts` `635e2802…`, `test/uphunt-aesthetic-w4.test.ts`
  `8008501d…`, `test/uphunt-aesthetic-w5.test.ts` `ee6425e9…`,
  `components/landing-sections.tsx` `914c61e5…`, `app/page.tsx` `3460751e…`,
  `components/run-form.tsx` `72576044…`; `frontend/test/.ua-executed.json` present,
  clean, TRACKED, digest
  `4df72199117c33237c9980dccd8e85b3f764f969ba0f27a514465b53420f954a`, content =
  exactly 14 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3} ∪
  {2 × CASE-UA-W4} ∪ {2 × CASE-UA-W5} (owner commit `d6121aa` residue; DEC-UA-011
  runtime output; never committed by W6); `review-evidence/uphunt-aesthetic/UA-W6/`
  ABSENT.

Environment: node `v24.14.1`; `frontend/package.json` `test` =
`node --experimental-strip-types --test test/*.test.ts`, `lint` = `eslint`;
`tsconfig.json` `incremental: true`, `allowImportingTsExtensions: true`,
`strict: true`, `paths: {"@/*": ["./*"]}`; leaves run tsc only at I001 with
`--incremental false --pretty false` so no tsbuildinfo is written.
`/usr/bin/google-chrome` exists (P3; I001 G4 only). `/tmp/opencode` exists as the
prescribed disposable location for leaf V-D backup/restore, the S005 dry-run
validation, and negative probes.

## 4. Initial single-file dependency DAG and intermediate-state contracts

```text
UA-W6-S001 (FILE, modify frontend/app/runs/page.tsx)                    ─┐
UA-W6-S002 (FILE, modify frontend/app/keywords/page.tsx)                 │
UA-W6-S003 (FILE, modify frontend/components/run-continuation.tsx)      ─┼─> UA-W6-S004 ─> UA-W6-S005 ─> UA-W6-I001
UA-W6-S004 (FILE, modify frontend/app/globals.css)                      ─┘   (FILE, create          (INTEGRATION_ASSESSMENT)
                                                                              test/uphunt-aesthetic-w6.test.ts)
```

Sequential execution order (parent consequence 1 freezes the DAG and prohibits
parallel waves; default one-active-leaf lifecycle): S001, S002, S003, S004, S005,
I001. IDs S001–S005 are used exactly as named by the parent; no zero-edit in-scope
file consumes an S-number.

- Edges S001→S002 and S002→S003: parent-frozen sequencing (consequences 1 and 8),
  not a data dependency; the three JSX files are mutually independent and are
  executed one at a time because the parent authorizes exactly one active leaf and
  requires same-identity review between leaves.
- Edge S003→S004: same parent-frozen sequencing; no data dependency (CSS hunks do
  not read JSX).
- Edge S004→S005: CASE-UA-W6-001 (in S005) asserts the post-hunk unscoped needle in
  `globals.css`; the test file must be authored and executed against the post-S004
  file state, otherwise its oracles are false before the work exists.
- Edge S005→I001: whole-window gates require all five planned files assembled.
- No planned file consumes any interface produced inside this window except the
  §5.1 frozen states; the only consumed cross-file interfaces are predecessor
  outputs, the read-only `SectionIntro` export, and the post-S004 CSS state.

### 4.1 Intermediate-state contracts

| After | Permitted checks | Expected temporary state | Why safe | Resolved by | Prohibited while pending |
|---|---|---|---|---|---|
| S001 accepted | S001 §6.4 only | runs/page.tsx renders `<SectionIntro>` in the kept `div.run-title-row.app-page-header`; w6 test file still ABSENT so `npm test` would still report 170 pass (w6 file not yet in the test glob); no permitted check fails in this state | local workspace only; no deployment or external surface; no CASE test runs at leaf level (`npm test` prohibited at leaves) | S005 adds the asserting tests | editing any other planned file, `section-intro.tsx`, or a preserved file; running `npm test`; successor work |
| S002 accepted | S002 §7.4 only | keywords/page.tsx renders `<SectionIntro>`; same pending-test state as above | same as above | S005 | any second-file edit; running `npm test`; successor work |
| S003 accepted | S003 §8.4 only | run-continuation.tsx renders `<SectionIntro>`; spinner and error actions kept; same pending-test state | same as above | S005 | any second-file edit; running `npm test`; successor work |
| S004 accepted | S004 §9.4 only | both CSS hunks live; `.app-page-header` gap = `var(--space-6)` in base and ≤780px media; w6 test still ABSENT so `npm test` would still report 170 pass | local workspace only; test file not yet in the glob | S005 | editing the test file from S004; running `npm test`; successor work |
| S005 accepted | S005 §10.4 only; whole-window gates remain PENDING | w6-only run executed from ABSENT-json state produced exactly 5 IDs then restored; `.ua-executed.json` byte-identical to HEAD (`4df72199…`); repo delta = the five planned files only | test file is not imported by app code; runtime json restored per §10.4 V-D | I001 | any additional-file edit; committing `.ua-executed.json`; successor work |

Unexpected failures at any row stop the sequence for diagnosis (no silent
progression). No permitted intermediate check is expected to fail.

## 5. Exact allocation of requirements, decisions, interfaces, and coverage cases

Parent trace for `UA-W6` (all IDs from `A1`/`A3`/`A4`):

| Parent ID | Allocated to | Terminal anchor |
|---|---|---|
| UA-W6 objective (`SCN-UA-002`) | `UA-W6-S001` §6.2 + `UA-W6-S002` §7.2 + `UA-W6-S003` §8.2 | `<SectionIntro>` with DEC-UA-003 strings in the three kept `run-title-row app-page-header`/card wrappers |
| UA-W6-T1 (/runs part) | `UA-W6-S001` §6.2 | runs/page.tsx ending digest `86392720…` |
| UA-W6-T1 (/keywords part) | `UA-W6-S002` §7.2 | keywords/page.tsx ending digest `8376447d…` |
| UA-W6-T1 (/runs/continue part) | `UA-W6-S003` §8.2 | run-continuation.tsx ending digest `d57edbe3…` |
| UA-W6-T2 | `UA-W6-S004` §9.2 | the two hunks; globals.css ending digest `b5c79578…` (parent pin) |
| UA-W6-T3 | `UA-W6-S005` §10.3 | three tests, CASE-UA-W6-001/002/003 |
| CASE-UA-W6-001 (`SCN-UA-002`) | `UA-W6-S005` test 1 | runs/page.tsx import + 3 DEC-UA-003 strings + href="/" + unscoped CSS needle |
| CASE-UA-W6-002 (`SCN-UA-002`) | `UA-W6-S005` test 2 | keywords/page.tsx import + 3 DEC-UA-003 strings |
| CASE-UA-W6-003 (`SCN-UA-002`) | `UA-W6-S005` test 3 | run-continuation.tsx import + 3 DEC-UA-003 strings + href="/runs" |
| NC-UA-002 family | S005 §10.4 V-D N1/N2 + `UA-W6-I001` G8 | removing a DEC-UA-003 string or a SectionIntro import falsifies the corresponding oracle |
| NC-UA-001 family | S005 §10.4 V-D N3 + `UA-W6-I001` G8 | changing the hunk-1 gap byte falsifies the unscoped needle; the S004 ending digest `b5c79578…` mechanically falsifies every other CSS deviation |
| DEC-UA-002 | S001/S002/S003 imports of the frozen `SectionIntro` export; no third heading component | `import { SectionIntro } from "@/components/section-intro";` in all three files; `section-intro.tsx` read-only `159096f3…` |
| DEC-UA-003 | exact strings in S001/S002/S003; oracles in S005 | JSX text nodes match including periods; no paraphrase |
| DEC-UA-006 | §2 prohibited paths; I001 G6 forbidden-path search | 0 hits |
| DEC-UA-011 | S005 `recordExecuted` import + call-after-witness ordering; `.ua-executed.json` handling | three `recordExecuted` calls, each after its oracle; json never committed |
| DEC-UA-013 | leaf preflights P1/P2 | git status before/after (frontend + coordination root) |
| DEC-UA-014 | `UA-W6-I001` gate G2 | zero tsc diagnostic lines on the owned-path needles |
| UA-W6-P1..P4, UA-W6-V1..V5, UA-W6-H1..H6 | `UA-W6-I001` / handoff | `A4` UA-W6 lifecycle boxes checked with evidence at I001 |

The remaining 40 coverage CASE IDs belong to other/later windows per the
`test_registration` column of `A4` §Coverage. Window-required local case set =
{CASE-UA-W6-001, CASE-UA-W6-002, CASE-UA-W6-003}, §4.7 set digest
`c5cc5fca3fc5d9d81325b229047a41f4b845c50aa530b1da84c4fc57b23bfb9a` (matches the
parent pin in `EV-UA-A-041` consequence 7).

### 5.1 Frozen cross-file interfaces (inherited and produced)

- `SectionIntro` consumed export (frozen by DEC-UA-002, file pinned `159096f3…`):
  `import { SectionIntro } from "@/components/section-intro";` with props
  `{ eyebrow?: ReactNode; title: ReactNode; copy?: ReactNode; inverse?: boolean }`;
  renders `div.marketing-heading` (optionally `is-inverse`) containing
  `span.eyebrow`, `h2`, `p`. All three JSX leaves consume exactly this export; no
  leaf may edit the component.
- `recordExecuted(id: string): void` — produced by `UA-W1-T1`, pinned at file
  digest `f5137be4…`. S005 imports it from
  `./uphunt-aesthetic-coverage.test.ts` and calls it exactly once per test, after
  that test's assertions. `REQUIRED_CASE_IDS` already contains the three W6 IDs; it
  is never edited here.
- Post-S004 `globals.css` needle consumed by S005 (byte-exact; occurrence count
  verified == 1 by simulation, S3 `EV-UA-W6-D-002`):
  - N-CSS `align-items: flex-end;\n  gap: var(--space-6);`
- Ending digests produced by the leaves and consumed by S005/I001 (deterministic
  simulations from the §3 starting digests, S3 `EV-UA-W6-D-002`):
  - S001 `frontend/app/runs/page.tsx` →
    `863927204b5af1ad1af9eba1d04d01eef53ecdd2c967d6a18f1fa925cc9943b9`
  - S002 `frontend/app/keywords/page.tsx` →
    `8376447da438ef96b1618102032a4f0bbeb58f0c9bf6d0e1b72348315dee8917`
  - S003 `frontend/components/run-continuation.tsx` →
    `d57edbe3e8f1ae6f8f7eb869a6dc016d00b243465c636168a8bf6cade2bcf62f`
  - S004 `frontend/app/globals.css` →
    `b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d`
    (parent-pinned in consequence 4; simulation matches)
  - S005 `frontend/test/uphunt-aesthetic-w6.test.ts` →
    `f78b8da2fad5084777ec727d25ad21d4d81a08994eaa5c406643821d8deaec1a`
    (exact §10.3 bytes, dry-run validated)

## 6. Initial implementation sub-window `UA-W6-S001`

```yaml
subwindow_id: UA-W6-S001
type: FILE
parent_window_id: UA-W6
parent_assignment_id: ASG-UA-W6-01
assigned_agent: UNASSIGNED
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/runs/page.tsx
file_operation: MODIFY
starting_file_digest: 24c146e8feefc30408c7932a57195a87cf6bc38ef4cc810cff26778d059ed181
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W6)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W6_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §6)
  - frontend/components/section-intro.tsx (consumed export, pinned 159096f3…)
  - frontend/app/runs/page.tsx (own file)
authorized_actions:
  - apply_the_two_ordered_replacements_of_section_6.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_metadata_title_or_dynamic_export
  - edit_the_run_title_row_app_page_header_wrapper_or_the_new_discovery_link
  - edit_RunHistory_import_or_usage
  - paraphrase_any_DEC-UA-003_string_or_drop_a_period
  - edit_section_intro_tsx_or_any_preserved_file
  - edit_the_w6_test_file_or_globals_css
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W6-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W7
may_start_successor: false
```

### 6.1 Mechanical trace

UA-W6-T1 (/runs part); UA-W6 objective (`SCN-UA-002`); DEC-UA-002; DEC-UA-003
(/runs strings); DEC-UA-013 (preflight); parent consequences 2 and 3. Terminal
anchor: the §6.2 replacements; ending digest pin `86392720…`. Every requirement
allocated here terminates in a file anchor verified by §6.4 checks and by S005's
CASE-UA-W6-001 oracles.

### 6.2 Exact file transformation (two ordered replacements; each anchor count == 1)

Apply in this order. Each OLD string occurs exactly once in the starting file
(verified by simulation, S3 `EV-UA-W6-D-002`); if any count differs, STOP and
report — do not improvise.

**R1 — import** (line 4 region). OLD fence = starting bytes; NEW fence = ending
bytes:

OLD:

```tsx
import { RunHistory } from "@/components/run-history";
```

NEW:

```tsx
import { RunHistory } from "@/components/run-history";
import { SectionIntro } from "@/components/section-intro";
```

**R2 — heading children** (lines 14–18). The wrapper
`<div className="run-title-row app-page-header">` (line 13) and the
`<Link className="ds-button ds-button--primary" href="/">New discovery</Link>`
(line 19) are kept byte-identical. OLD fence = starting bytes, lines 14–18; NEW
fence = ending bytes. The DEC-UA-003 strings replace the old eyebrow/h1/p content
including their periods; the old h1 text "My searches" remains only in the
untouched `metadata` export.

OLD:

```tsx
          <div>
            <span className="eyebrow">Account workspace</span>
            <h1>My searches</h1>
            <p>Continue keyword research or revisit the leads discovered in an earlier market.</p>
          </div>
```

NEW:

```tsx
          <SectionIntro
            eyebrow="Account workspace"
            title="Return to the searches you already started."
            copy="Continue keyword research or open the leads from an earlier market."
          />
```

Operation ordering: single atomic file write after both replacements are prepared;
no intermediate partial state is saved. Obsolete behavior removed from this file:
the `<span className="eyebrow">`, `<h1>`, and `<p>` heading children (the eyebrow
string "Account workspace" is preserved as the SectionIntro eyebrow; the old h1/p
copy is replaced per DEC-UA-003). No other line changes; resulting numstat is
exactly `6 5`.

### 6.3 Preserved behavior and forbidden edits (within the writable file)

- `export const metadata: Metadata = { title: "My searches" };` and
  `export const dynamic = "force-dynamic";` — byte-identical.
- `<main className="app-canvas history-page">`, `<div className="shell">`, and the
  wrapper `<div className="run-title-row app-page-header">` — byte-identical.
- `<Link className="ds-button ds-button--primary" href="/">New discovery</Link>` —
  byte-identical (href="/" unchanged).
- `<RunHistory />` and its import — byte-identical.
- The three DEC-UA-003 strings must include their trailing periods exactly; no
  paraphrase, no case change, no added marketing-heading className on the wrapper.

### 6.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: `git status --porcelain` in frontend/ and coordination root; `sha256sum app/runs/page.tsx` | frontend porcelain == exactly the two §3 protected paths; coordination root clean; digest == `24c146e8…` |
| V-B | Apply §6.2 edits with exact-match tooling (each OLD count == 1 before replacing) | 2 replacements applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- app/runs/page.tsx` and full `git diff` inspection | numstat == `6  5` for `frontend/app/runs/page.tsx`; the diff contains exactly the §6.2 R1 and R2 changes and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state: `import { SectionIntro } from "@/components/section-intro";` == 1; `Account workspace` == 1; `Return to the searches you already started.` == 1; `Continue keyword research or open the leads from an earlier market.` == 1; `href="/"` == 1; `<SectionIntro ` == 1; `<h1>` == 0; `run-title-row app-page-header` == 1; `ds-button ds-button--primary` == 1; `New discovery` == 1 | every assertion true |
| V-E | `sha256sum app/runs/page.tsx`; `git status --porcelain` | ending digest == `863927204b5af1ad1af9eba1d04d01eef53ecdd2c967d6a18f1fa925cc9943b9`; attributable delta == ` M app/runs/page.tsx` exactly (protected §3 paths unchanged) |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W6-I001` G1–G9) |

Negative controls: none at this leaf — the ending-digest pin (V-E) mechanically
falsifies any deviation, and the copy/import falsification probes are assigned at
the narrowest effective level in S005 §10.4 V-D and I001 G8.

Expected workspace write set: exactly `{frontend/app/runs/page.tsx}`.

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

## 7. Initial implementation sub-window `UA-W6-S002`

```yaml
subwindow_id: UA-W6-S002
type: FILE
parent_window_id: UA-W6
parent_assignment_id: ASG-UA-W6-01
assigned_agent: UNASSIGNED
predecessors: [UA-W6-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/keywords/page.tsx
file_operation: MODIFY
starting_file_digest: 07a826646454bb2612b992d2e2d5f77a302e3272ce11d5ee21e3bd950e3de1fd
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W6)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W6_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §7)
  - frontend/components/section-intro.tsx (consumed export, pinned 159096f3…)
  - frontend/app/keywords/page.tsx (own file)
authorized_actions:
  - apply_the_two_ordered_replacements_of_section_7.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_metadata_title_or_dynamic_export
  - edit_the_run_title_row_app_page_header_wrapper
  - edit_ResearchForm_import_or_usage_or_createKeywordResearch
  - paraphrase_any_DEC-UA-003_string_or_drop_a_period
  - edit_section_intro_tsx_or_any_preserved_file
  - edit_the_w6_test_file_or_globals_css
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W6-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W7
may_start_successor: false
```

### 7.1 Mechanical trace

UA-W6-T1 (/keywords part); UA-W6 objective (`SCN-UA-002`); DEC-UA-002; DEC-UA-003
(/keywords strings); DEC-UA-013; parent consequences 2 and 3
(`change_createKeywordResearch` prohibited). Predecessor: UA-W6-S001 (parent-frozen
sequencing, §4). Terminal anchor: the §7.2 replacements; ending digest pin
`8376447d…`.

### 7.2 Exact file transformation (two ordered replacements; each anchor count == 1)

**R1 — import** (line 3 region):

OLD:

```tsx
import { ResearchForm } from "@/components/keyword-intelligence/research-form";
```

NEW:

```tsx
import { ResearchForm } from "@/components/keyword-intelligence/research-form";
import { SectionIntro } from "@/components/section-intro";
```

**R2 — heading children** (lines 13–17). The wrapper
`<div className="run-title-row app-page-header">` (line 12) is kept byte-identical.
This file has no Link/button; nothing else in the wrapper changes.

OLD:

```tsx
          <div>
            <span className="eyebrow">Keyword research</span>
            <h1>Keyword research</h1>
            <p>Explore the keyword landscape for a market and shortlist the phrases you want to research.</p>
          </div>
```

NEW:

```tsx
          <SectionIntro
            eyebrow="Keyword research"
            title="See the phrases a market actually uses."
            copy="Start from seed phrases. Finish with a shortlist you are willing to search."
          />
```

Operation ordering: single atomic file write; obsolete behavior removed: the
eyebrow/h1/p children (the string "Keyword research" survives as the SectionIntro
eyebrow and in the untouched metadata title). Resulting numstat is exactly `6 5`.

### 7.3 Preserved behavior and forbidden edits (within the writable file)

- `export const metadata: Metadata = { title: "Keyword research" };` and
  `export const dynamic = "force-dynamic";` — byte-identical.
- `<main className="app-canvas history-page">`, `<div className="shell">`, and the
  wrapper `<div className="run-title-row app-page-header">` — byte-identical.
- `<ResearchForm />` and its import — byte-identical;
  `createKeywordResearch` behavior untouched (it lives in the read-only
  `research-form.tsx`).
- The three DEC-UA-003 strings must include their trailing periods exactly.

### 7.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S001 accepted with ending digest `86392720…` (recompute); frontend porcelain == §3 protected paths + ` M app/runs/page.tsx`; coordination root clean; `sha256sum app/keywords/page.tsx` == `07a82664…` | all true |
| V-B | Apply §7.2 edits with exact-match tooling (each OLD count == 1 before replacing) | 2 replacements applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- app/keywords/page.tsx` and full `git diff` inspection | numstat == `6  5`; the diff contains exactly the §7.2 R1 and R2 changes and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state: SectionIntro import == 1; `Keyword research` >= 1 (eyebrow + metadata title); `See the phrases a market actually uses.` == 1; `Start from seed phrases. Finish with a shortlist you are willing to search.` == 1; `<SectionIntro ` == 1; `<h1>` == 0; `run-title-row app-page-header` == 1; `ResearchForm` == 2 (import + usage) | every assertion true |
| V-E | `sha256sum app/keywords/page.tsx`; `git status --porcelain` | ending digest == `8376447da438ef96b1618102032a4f0bbeb58f0c9bf6d0e1b72348315dee8917`; attributable delta == ` M app/runs/page.tsx` + ` M app/keywords/page.tsx` exactly (protected §3 paths unchanged) |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W6-I001` G1–G9) |

Expected workspace write set: exactly `{frontend/app/keywords/page.tsx}`.

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

## 8. Initial implementation sub-window `UA-W6-S003`

```yaml
subwindow_id: UA-W6-S003
type: FILE
parent_window_id: UA-W6
parent_assignment_id: ASG-UA-W6-01
assigned_agent: UNASSIGNED
predecessors: [UA-W6-S001, UA-W6-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/run-continuation.tsx
file_operation: MODIFY
starting_file_digest: e0e4f14f2b84493aef5268fca5a2913472ce17cf4c762bcd008b04e813722cc3
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W6)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W6_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §8)
  - frontend/components/section-intro.tsx (consumed export, pinned 159096f3…)
  - frontend/components/run-continuation.tsx (own file)
authorized_actions:
  - apply_the_two_ordered_replacements_of_section_8.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_claim_router_apiRequest_or_errorState_logic
  - edit_useEffect_retryClaim_or_the_error_actions_block
  - put_the_error_string_into_SectionIntro_copy
  - edit_the_spinner_span_or_the_auth_card_continuation_card_wrapper
  - paraphrase_any_DEC-UA-003_string_or_drop_a_period
  - edit_section_intro_tsx_or_any_preserved_file
  - edit_the_w6_test_file_or_globals_css
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W6-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W7
may_start_successor: false
```

### 8.1 Mechanical trace

UA-W6-T1 (/runs/continue part); UA-W6 objective (`SCN-UA-002`); DEC-UA-002;
DEC-UA-003 (/runs/continue strings); DEC-UA-013; parent consequence 3 (claim logic
and error string rules). Predecessors: UA-W6-S001, UA-W6-S002 (parent-frozen
sequencing, §4). Terminal anchor: the §8.2 replacements; ending digest pin
`d57edbe3…`.

### 8.2 Exact file transformation (two ordered replacements; each anchor count == 1)

**R1 — import** (line 7 region). The new import joins the existing `@/` group as
its first line (house style per `auth-form.tsx`, components before lib):

OLD:

```tsx
import type { SearchContinuationResponse } from "@/lib/api-types";
```

NEW:

```tsx
import { SectionIntro } from "@/components/section-intro";
import type { SearchContinuationResponse } from "@/lib/api-types";
```

**R2 — heading children** (lines 57–61). The `<section
className="auth-card continuation-card ds-card" aria-live="polite">` wrapper, the
spinner span (line 56), and the `{error && (…)}` actions block (lines 62–67) are
kept byte-identical. The eyebrow/h1/default-p block is replaced by the SectionIntro
call with the DEC-UA-003 continue strings; the error string is NOT put into
SectionIntro copy (parent consequence 3) — when `error` is set, the actions block
still renders and the static SectionIntro copy stays unchanged.

OLD:

```tsx
        <span className="eyebrow">Preparing your search</span>
        <h1>{error ? "We could not continue yet" : "Starting your saved search…"}</h1>
        <p>
          {error ?? "Your account is ready. We are attaching the pending search and opening its workspace."}
        </p>
```

NEW:

```tsx
        <SectionIntro
          eyebrow="Preparing run"
          title="Your search is being prepared."
          copy="Continue when the next step is ready."
        />
```

Operation ordering: single atomic file write; obsolete behavior removed from this
file: the conditional eyebrow/h1/p heading rendering (including the strings
"We could not continue yet", "Starting your saved search…", and "Your account is
ready. We are attaching the pending search and opening its workspace."). Resulting
numstat is exactly `6 5`.

### 8.3 Preserved behavior and forbidden edits (within the writable file)

- `"use client";`, all imports except the inserted SectionIntro line, `useRouter`,
  `started` ref, `error`/`retry` state, `claim` useCallback (including the
  `/api/run-intents/claim` POST, `parseSearchContinuationResponse`, the
  `RUN_INTENT_NOT_FOUND` / `KEYWORD_RESEARCH_INTENT_NOT_FOUND` handling, and both
  `router.replace` calls), `useEffect`, and `retryClaim` — byte-identical.
- `<main className="app-canvas auth-page">` and `<section className="auth-card
  continuation-card ds-card" aria-live="polite">` — byte-identical.
- `<span className="continuation-spinner" aria-hidden="true" />` — byte-identical.
- The `{error && (…)}` block with `<button className="ds-button ds-button--primary"
  onClick={retryClaim}>Try again</button>` and `<Link
  className="ds-button ds-button--secondary" href="/runs">My runs</Link>` —
  byte-identical (href="/runs" unchanged).
- The three DEC-UA-003 strings must include their trailing periods exactly; the
  error message string must not appear inside the SectionIntro call.

### 8.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S002 accepted with ending digest `8376447d…` (recompute); frontend porcelain == §3 protected paths + the two ` M` planned page paths; coordination root clean; `sha256sum components/run-continuation.tsx` == `e0e4f14f…` | all true |
| V-B | Apply §8.2 edits with exact-match tooling (each OLD count == 1 before replacing) | 2 replacements applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- components/run-continuation.tsx` and full `git diff` inspection | numstat == `6  5`; the diff contains exactly the §8.2 R1 and R2 changes and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state: SectionIntro import == 1; `Preparing run` == 1; `Your search is being prepared.` == 1; `Continue when the next step is ready.` == 1; `href="/runs"` == 1; `<SectionIntro ` == 1; `<h1>` == 0; `Preparing your search` == 0; `Starting your saved search` == 0; `Your account is ready` == 0; `continuation-spinner` == 1; `Try again` == 1; `apiRequest` == 1; `router.replace` == 2 | every assertion true |
| V-E | `sha256sum components/run-continuation.tsx`; `git status --porcelain` | ending digest == `d57edbe3e8f1ae6f8f7eb869a6dc016d00b243465c636168a8bf6cade2bcf62f`; attributable delta == the two page ` M` paths + ` M components/run-continuation.tsx` exactly (protected §3 paths unchanged) |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W6-I001` G1–G9) |

Expected workspace write set: exactly `{frontend/components/run-continuation.tsx}`.

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

## 9. Initial implementation sub-window `UA-W6-S004`

```yaml
subwindow_id: UA-W6-S004
type: FILE
parent_window_id: UA-W6
parent_assignment_id: ASG-UA-W6-01
assigned_agent: UNASSIGNED
predecessors: [UA-W6-S001, UA-W6-S002, UA-W6-S003]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/globals.css
file_operation: MODIFY
starting_file_digest: 7ae364194f8522a40a072914708841408909c9e41228e71cbc56488f948d98d2
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W6)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W6_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §9)
  - frontend/app/globals.css (own file)
  - frontend/test/uphunt-aesthetic-w4.test.ts, frontend/test/uphunt-aesthetic-w5.test.ts (regression context, read-only)
authorized_actions:
  - apply_the_two_ordered_hunks_of_section_9.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_any_declaration_or_selector_not_named_in_section_9.2
  - edit_run_title_row_or_app_canvas_or_history_page_or_eyebrow_or_app-page-header-h1
  - edit_run_form_card_or_any_W4_selector
  - edit_intelligence_card_or_any_W5_selector_or_auth_card_or_tokens
  - add_selectors_or_rules
  - edit_the_three_jsx_files_or_the_w6_test_file
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W6-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W7
may_start_successor: false
```

### 9.1 Mechanical trace

UA-W6-T2; UA-W6 objective; DEC-UA-013; parent consequence 4 (two unique hunks, no
new selectors, start/end digests). Predecessors: S001–S003 (parent-frozen
sequencing, §4). Terminal anchor: the §9.2 hunks; ending digest pin `b5c79578…`
(parent-pinned; simulation reproduced it exactly, S3 `EV-UA-W6-D-002`).

### 9.2 Exact file transformation (two ordered hunks; each anchor count == 1)

Apply in this order. Each OLD fence occurs exactly once in the starting file
(verified by simulation, S3 `EV-UA-W6-D-002`); if any count differs, STOP and
report — do not improvise. `align-items: flex-end;` alone occurs 5× in the file;
only the full-fence match may be replaced.

**Hunk 1 — unscoped `.app-page-header`** (starting lines 5810–5813; the other four
`align-items: flex-end;` occurrences at lines 1266, 1452, 1728, 7291 are different
blocks and MUST NOT change):

OLD:

```css
.app-page-header {
  align-items: flex-end;
  margin-bottom: var(--space-7);
}
```

NEW:

```css
.app-page-header {
  align-items: flex-end;
  gap: var(--space-6);
  margin-bottom: var(--space-7);
}
```

**Hunk 2 — media `.app-page-header`** (starting lines 6176–6180, inside
`@media (max-width: 780px) {` opened at line 6133; the seven other
`gap: var(--space-4);` occurrences are different blocks and MUST NOT change):

OLD:

```css
  .app-page-header {
    align-items: stretch;
    gap: var(--space-4);
    margin-bottom: var(--space-5);
  }
```

NEW:

```css
  .app-page-header {
    align-items: stretch;
    gap: var(--space-6);
    margin-bottom: var(--space-5);
  }
```

Operation ordering: single atomic file write after both hunks are prepared.
Obsolete behavior removed from this file: the media gap `var(--space-4)` override
(replaced by `var(--space-6)`). No new selectors or rules; resulting numstat is
exactly `2 1`.

### 9.3 Preserved behavior and forbidden edits (within the writable file)

- `.app-page-header h1` clamp rule (lines 5815–5820), `.history-page .run-title-row
  p` (lines 5822–5826), `.app-page-header > .ds-button` media rule (lines
  6182–6184), and every other `.run-title-row`, `.app-canvas`, `.history-page`,
  `.eyebrow` declaration — byte-identical.
- W4 `.run-form-card` rules and ::before/::after, W5 `.intelligence-card`
  (`padding: 31px;`, `border: 1px solid var(--color-line);`,
  `border-radius: 20px;`, `min-height: 330px;`), `.auth-card`, the glass grouped
  rule, tokens, and the clamp rules — byte-identical (`border: 1px solid
  var(--color-line);` stays exactly 9 occurrences; `padding: 31px;` stays 1).

### 9.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S003 accepted with ending digest `d57edbe3…` (recompute); frontend porcelain == §3 protected paths + the three ` M` planned jsx paths; coordination root clean; `sha256sum app/globals.css` == `7ae36419…` | all true |
| V-B | Apply §9.2 hunks with exact-match tooling (each OLD count == 1 before replacing) | 2 hunks applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- app/globals.css` and full `git diff` inspection | numstat == `2  1`; the diff contains exactly the two §9.2 hunks and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state counts: `align-items: flex-end;\n  gap: var(--space-6);` == 1; `    gap: var(--space-6);\n    margin-bottom: var(--space-5);` == 1; `gap: var(--space-6);` == 2; `gap: var(--space-4);` == 7; `border: 1px solid var(--color-line);` == 9; `align-items: flex-end;` == 5; `.app-page-header {` == 2; `padding: 31px;` == 1; `min-height: 330px;` == 1; `border-radius: 20px;` == 1 (starting counts: 0 / 0 / 0 / 8 / 9 / 5 / 2 / 1 / 1 / 1) | every assertion true |
| V-E | `sha256sum app/globals.css`; `git status --porcelain` | ending digest == `b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d` (parent consequence 4 pin); attributable delta == the three jsx ` M` paths + ` M app/globals.css` exactly (protected §3 paths unchanged) |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W6-I001` G1–G9) |

Negative controls: none at this leaf — the ending-digest pin (V-E) mechanically
falsifies any deviation (it is the parent-frozen digest), and the CSS falsification
probe is assigned at the narrowest effective level in S005 §10.4 V-D N3 and I001
G8.

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

## 10. Initial implementation sub-window `UA-W6-S005`

```yaml
subwindow_id: UA-W6-S005
type: FILE
parent_window_id: UA-W6
parent_assignment_id: ASG-UA-W6-01
assigned_agent: UNASSIGNED
predecessors: [UA-W6-S001, UA-W6-S002, UA-W6-S003, UA-W6-S004]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w6.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/app/runs/page.tsx (post-S001 state, digest 86392720…)
  - frontend/app/keywords/page.tsx (post-S002 state, digest 8376447d…)
  - frontend/components/run-continuation.tsx (post-S003 state, digest d57edbe3…)
  - frontend/app/globals.css (post-S004 state, digest b5c79578…)
  - frontend/test/uphunt-aesthetic-coverage.test.ts (pinned f5137be4…)
  - frontend/test/uphunt-aesthetic-w5.test.ts (style predecessor, pinned ee6425e9…)
  - frontend/test/.ua-executed.json (runtime state, HEAD digest 4df72199…)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W6_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §10)
authorized_actions:
  - create_the_writable_file_with_the_exact_section_10.3_bytes
  - run_the_w6_only_test_command_under_the_section_10.4_V-D_backup_run_restore_procedure
  - run_disposable_in_memory_negative_probes_V-D_via_node_-e (zero workspace writes)
  - run_read_only_node_inspection
  - record_git_status_preflight_and_postcondition
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_three_jsx_files_or_globals_css
  - add_a_fourth_test_or_a_skip_filter_or_todo
  - assert_getExecuted_equals_REQUIRED_CASE_IDS_full_set_equality
  - call_recordExecuted_before_a_tests_assertions
  - edit_REQUIRED_CASE_IDS_or_the_coverage_test_file
  - commit_or_stage_test/.ua-executed.json
  - delete_test/.ua-executed.json (V-D moves it to /tmp/opencode and restores it byte-identically)
  - run_npm_test_full_suite_or_npx_tsc_or_npm_run_lint (deferred to UA-W6-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W7
may_start_successor: false
```

### 10.1 Mechanical trace

UA-W6-T3; CASE-UA-W6-001 (`SCN-UA-002`); CASE-UA-W6-002 (`SCN-UA-002`);
CASE-UA-W6-003 (`SCN-UA-002`); DEC-UA-011; DEC-UA-013; NC-UA-001/NC-UA-002 families
(§10.4 V-D). Predecessors: S001–S004 (each case's needles read the post-leaf file
states; §4 edges). Parent consequences 5 and 6 freeze the test count, needles, and
executed-set expectations.

### 10.2 Exact file transformation

CREATE `frontend/test/uphunt-aesthetic-w6.test.ts` with exactly the §10.3 bytes.
No other content, no extra test, no helper exports.

### 10.3 Exact required ending file content

The file is exactly (UTF-8, LF endings, single trailing newline; SHA-256
`f78b8da2fad5084777ec727d25ad21d4d81a08994eaa5c406643821d8deaec1a`):

```ts
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const runsPage = await readFile(new URL("../app/runs/page.tsx", import.meta.url), "utf8");
const keywordsPage = await readFile(new URL("../app/keywords/page.tsx", import.meta.url), "utf8");
const runContinuation = await readFile(
  new URL("../components/run-continuation.tsx", import.meta.url),
  "utf8",
);
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W6-001 runs page intro and app-page-header gap", () => {
  assert.match(runsPage, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(runsPage, /Account workspace/u);
  assert.match(runsPage, /Return to the searches you already started\./u);
  assert.match(runsPage, /Continue keyword research or open the leads from an earlier market\./u);
  assert.match(runsPage, /href="\/"/u);
  assert.match(globals, /align-items: flex-end;\n  gap: var\(--space-6\);/u);
  recordExecuted("CASE-UA-W6-001");
});

test("CASE-UA-W6-002 keywords page intro", () => {
  assert.match(keywordsPage, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(keywordsPage, /Keyword research/u);
  assert.match(keywordsPage, /See the phrases a market actually uses\./u);
  assert.match(
    keywordsPage,
    /Start from seed phrases\. Finish with a shortlist you are willing to search\./u,
  );
  recordExecuted("CASE-UA-W6-002");
});

test("CASE-UA-W6-003 run continuation intro", () => {
  assert.match(runContinuation, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(runContinuation, /Preparing run/u);
  assert.match(runContinuation, /Your search is being prepared\./u);
  assert.match(runContinuation, /Continue when the next step is ready\./u);
  assert.match(runContinuation, /href="\/runs"/u);
  recordExecuted("CASE-UA-W6-003");
});
```

This content was dry-run validated by the window agent against the simulated
post-S004 state in the disposable location `/tmp/opencode/ua-w6-dework/dryrun`
(S3 `EV-UA-W6-D-002`): 5 tests pass (2 × CASE-UA-W1 via the coverage import +
3 × CASE-UA-W6), 0 fail, 0 skipped, and the generated executed set contained
exactly the 5 expected IDs (set digest `98d03fa1…`, matching parent consequence 6);
the dry-run directory remains disposable and outside the workspace.

### 10.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S004 accepted with ending digest `b5c79578…` (recompute); the three jsx digests `86392720…` / `8376447d…` / `d57edbe3…` (recompute); `test/uphunt-aesthetic-w6.test.ts` ABSENT; frontend porcelain == §3 protected paths + the four ` M`/planned implementation paths; coordination root clean; `sha256sum test/.ua-executed.json` == `4df72199…` | all true |
| V-B | `sha256sum test/uphunt-aesthetic-w6.test.ts` after writing §10.3 bytes | digest == `f78b8da2fad5084777ec727d25ad21d4d81a08994eaa5c406643821d8deaec1a` |
| V-C | Disposable in-memory validation evidence recorded during authoring (window agent, `/tmp/opencode/ua-w6-dework`, S3 `EV-UA-W6-D-002`): N1 (NC-UA-002 family) delete the /runs title from an in-memory copy of post-S001 runs/page.tsx → the title assertion must fail; N2 (NC-UA-002 family) delete the SectionIntro import from an in-memory copy of post-S002 keywords/page.tsx → the import assertion must fail; N3 (NC-UA-001 family) change the hunk-1 gap byte to `var(--space-4)` in an in-memory copy of post-S004 globals.css → the unscoped-needle assertion must fail | all three probes falsified (recorded authoring evidence; I001 G8 re-executes them fresh) |
| V-D | From ABSENT executed-set state: `mv test/.ua-executed.json /tmp/opencode/ua-w6-ua-executed-head-backup.json`; from `frontend/` run `node --experimental-strip-types --test test/uphunt-aesthetic-w6.test.ts`; read `test/.ua-executed.json`; then `mv /tmp/opencode/ua-w6-ua-executed-head-backup.json test/.ua-executed.json`; re-`sha256sum` | command exit 0; tests 5, pass 5, fail 0, skipped 0, with exactly the titles CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W6-001, CASE-UA-W6-002, CASE-UA-W6-003; json == exactly those 5 sorted IDs (§4.7 set digest `98d03fa1e3bbd761922657e899297703352ac551abba210713fc13860682ddc1`, parent consequence 6); post-restore digest == `4df72199…` and `git status --porcelain` shows `test/.ua-executed.json` unmodified |
| V-E | `git status --porcelain` | attributable delta == `?? test/uphunt-aesthetic-w6.test.ts` added to the four ` M` implementation paths and the protected §3 paths; no other path |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W6-I001` G1–G9) |

Expected workspace write set: exactly
`{frontend/test/uphunt-aesthetic-w6.test.ts}` plus the prescribed disposable
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
{CASE-UA-W6-001, CASE-UA-W6-002, CASE-UA-W6-003} plus the 2 × CASE-UA-W1 registry
re-executions provoked by the import; zero skips, duplicates, or unexpected IDs;
the 5-ID executed-set digest `98d03fa1…` is the witness. Full 43-set equality is
UA-W15-V5 only.)

## 11. Local and whole-window verification gates

Leaf-local gates: §6.4, §7.4, §8.4, §9.4, §10.4. Frozen whole-window gates,
executed only by `UA-W6-I001` from `frontend/`, per `A4` §Gates, `A4` UA-W6
lifecycle, and `DEC-UA-014`:

| Gate | Command / assertion | Expected |
|---|---|---|
| G1 | `npm test` | exit 0; 0 failed; all three CASE-UA-W6-00x tests pass inside the run; expected total 175 passing = 170 predecessor (`EV-UA-A-040` G1) + 5 in the w6-file process (3 new + 2 registry re-executions via the import); actual recorded |
| G2 | `npx tsc --noEmit --incremental false --pretty false` (`DEC-UA-014` oracle) | PASS iff zero output lines contain any owned-path needle: `uphunt-aesthetic-w6.test.ts`, `app/runs/page.tsx`, `app/keywords/page.tsx`, `components/run-continuation.tsx` (globals.css is not typechecked); expected remaining diagnostics: exactly the 10 parked SRC-UA-0092 lines in the five parked files (13 physical lines at the W4/W5 baseline); repo-wide exit 0 NOT required; parked files MUST NOT be edited |
| G3 | `npm run lint` | exit 0 (CSS/JSX owned this window) |
| G4 | browser evidence (`browser_evidence: true`): `/usr/bin/google-chrome --headless` screenshots of routes `/runs` and `/keywords` ONLY, at 390, 768, 1280, 1440, under `frontend/review-evidence/uphunt-aesthetic/UA-W6/` | 8 screenshots recorded; the route set is frozen to {`/runs`, `/keywords`} (parent consequence 7); `/runs/continue` MUST NOT be screenshotted (it POSTs claim and redirects); synthetic fixtures only; no credentials; local dev server processes only, under the §12 item 6 sandbox policy; this is local_e2e evidence, NOT a CASE oracle (SUB-UA-001) |
| G5 | coverage scope: required W6 window set (3 IDs, digest `c5cc5fca…`) = registered (three `test()` titles) = executed W6 IDs; after G1, `test/.ua-executed.json` is exactly the 17 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3} ∪ {2 × CASE-UA-W4} ∪ {2 × CASE-UA-W5} ∪ {3 × CASE-UA-W6} (§4.7 set digest `e7895fa537ab11d142d86344f4cca4607d35d1b164f1cbda6097bf765e167421`, parent consequence 6); zero skips, duplicates, unexpected, or unactivated IDs in this window; full 43-set equality NOT asserted (`UA-W15-V5` owns it); the json is modified tracked runtime output (`d6121aa` residue) and is never committed | exact |
| G6 | `sha256sum` of the three jsx files, `globals.css`, `uphunt-aesthetic-w6.test.ts`, `section-intro.tsx`, `landing-sections.tsx`, `app/page.tsx`, `run-form.tsx`, `uphunt-aesthetic-coverage.test.ts`, `uphunt-aesthetic-w2.test.ts`, `uphunt-aesthetic-w3.test.ts`, `uphunt-aesthetic-w4.test.ts`, `uphunt-aesthetic-w5.test.ts`, `app/runs/continue/page.tsx`, `components/run-history.tsx`, `components/keyword-intelligence/research-form.tsx`; plus `git status --porcelain` and a forbidden-path negative search over the whole window delta (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`, `email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, the five parked test files, the coverage test file, `REQUIRED_CASE_IDS`, `section-intro.tsx`, `landing-sections.tsx`, `query-editor.tsx`, `run-progress.tsx`, the leads pages, `app/runs/continue/page.tsx`, `run-history.tsx`, `research-form.tsx`, the w2–w5 test files) | ending pins `86392720…`, `8376447d…`, `d57edbe3…`, `b5c79578…`, `f78b8da2…` on the five planned files; byte pins `159096f3…`, `914c61e5…`, `3460751e…`, `72576044…`, `f5137be4…`, `f65ba0c5…`, `635e2802…`, `8008501d…`, `ee6425e9…`, `c72d135f…`, `de99ecac…`, `b5fae7da…` all unchanged; implementation delta == exactly the five §4 planned files; the `globals.css` diff contains exactly the two §9.2 hunks and nothing else; coordination artifacts limited to the enumerated §2 list; `A5`/`A6` digests unchanged by leaves |
| G7 | static inspection of the new test file imports (`node:test`, `node:assert/strict`, `node:fs/promises`, `node:url`, `./uphunt-aesthetic-coverage.test.ts`) + suite behavior | 0 network operations, 0 DB operations (`UA-W6-V3`) |
| G8 | personally re-execute the §10.4 V-C probes N1/N2/N3 on fresh in-memory copies (tmp only, no workspace writes): NC-UA-002 family (DEC-UA-003 string removal falsifies CASE-UA-W6-001; SectionIntro import removal falsifies CASE-UA-W6-002) and NC-UA-001 family (hunk-1 gap byte change falsifies the unscoped needle) | all falsified |
| G9 | successor negative search: no `UA-W7` artifact of any kind (no `uphunt-aesthetic-w7.test.ts`, no query-editor/run-progress edits), `A5.current_window` still `UA-W6`, `next_window` untouched | `may_start_successor: false` honored; `UA-W6-H4/H6` hold |

PASS oracle for `UA-W6-I001`: G1–G9 all pass; `A4` `UA-W6-P1..P4`,
`UA-W6-V1..V5`, `UA-W6-H1..H5` then checked with resolvable evidence;
`frontend/review-evidence/uphunt-aesthetic/UA-W6_HANDOFF.md` written per §14.3;
`A5.current_status` set to `AWAITING_REVIEW` (the sole authorized post-I001 `A5`
handoff action); STOP per `UA-W6-H6` (no `UA-W7`).
CORRECTION_REQUIRED oracle: any G-gate behavioral failure → §12 correction loop
with `UA-W6-C00n` (single-file, dependency-safe).
PARENT_BLOCKED oracle: missing parent decision, contradiction with `A1`–`A4`, or
required scope expansion (e.g., a defect that cannot be corrected without editing
`section-intro.tsx`, a preserved file (`runs/continue/page.tsx`,
`run-history.tsx`, `research-form.tsx`), an unowned `globals.css` selector
(including `.run-title-row`, `.app-page-header h1`, W4/W5 selectors, `.auth-card`,
tokens), a parked file, or `REQUIRED_CASE_IDS`).

## 12. Correction and re-assessment rules

1. Every correction is a new single-file sub-window `UA-W6-C00n` with a new
   assignment ID and baseline digest, citing: the failed evidence, exact root
   cause, the governing requirement and decision already determining the remedy,
   the earlier sub-window corrected, and the gates invalidated. Nothing is
   rewritten in place; `S3` is append-only.
2. `REQUIRED_CASE_IDS` and the coverage test file are NOT correctable at window
   level (`A5` prohibitions). A defect requiring changes there is
   `PARENT_BLOCKED`.
3. `section-intro.tsx` is read-only and the three preserved files are frozen (§0
   consequences 2 and 8). A failing check that would require editing any of them,
   or an unowned `globals.css` selector, is `PARENT_BLOCKED`, never a frozen-file
   edit.
4. `globals.css` corrections are owned only for the two §9.2 hunks. A correction
   that would add or change any other declaration is `PARENT_BLOCKED`.
5. After the last correction the window agent personally runs a new assessment
   `UA-W6-I00n` (new ID), reusing unchanged gates by exact reference and
   rerunning every gate invalidated by the correction (at minimum G1, G2, G5,
   G6, G8), the coverage closure checks, and the forbidden-path negative search.
6. Environment rule (E8.1, inherited from `A5`): an otherwise-authorized local
   check MAY start with sandbox escalation (`sandbox_escalation_for_authorized_local_actions: true`,
   `automatic_identical_recovery_after_proven_environment_invalidation: true`,
   `recovery_limit_per_invalidated_execution: 1`,
   `external_authority_expansion: false`). If an attempt is invalidated solely by
   sandbox denial or execution-channel loss, one identical recovery run is
   permitted (same arguments, selection, environment, fixtures, timeouts,
   resources, oracle, write scope) after read-only proof that no matching
   process, workspace/external mutation, or usable acceptance result remains. A
   changed command, an observable product/test failure, or any external action is
   NOT recoverable this way and enters the correction loop or `PARENT_BLOCKED`.
7. The window agent never repairs a leaf file directly; only corrective
   sub-windows edit files.

## 13. Mandatory authoring-readiness checklist (sub-window standard §11)

Evidence citations resolve into `S3` (`EV-UA-W6-D-001..003`).

### 13.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA-W6-D-001 (A5: ASG-UA-W6-01, UA-W6-WINDOW-AGENT, IN_PROGRESS, decompose action authorized; A5 digest 8620953c… recomputed)
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA-W6-D-001 (recomputed SHA-256 matches all pins incl. A4 `713462c8…` and subwindow standard `842c2955…`)
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA-W6-D-003 (§2, §6–§10 of this S1)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA-W6-D-001 (§3 of this S1)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA-W6-D-003 (S1 spec / S2 state / S3 evidence paths)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA-W6-D-003 (leaf prohibited_actions; report-only-to-window-agent rule)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: EV-UA-W6-D-003 (§12 item 6 == A5 policy)

### 13.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA-W6-D-003 (§5 table; UA-W6-T1/T2/T3; A4 test_registration CASE-UA-W6-001..003)
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA-W6-D-001 (§0 consequences close the remaining choices; current source matches every §3 anchor: imports at runs/page.tsx line 4, keywords/page.tsx line 3, run-continuation.tsx line 7; CSS hunks at lines 5810–5813 and 6176–6180)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA-W6-D-002 (both = the five §4 planned files; planned-file-set digest `85d3d712a40a520a425acff2511ee06abb1b2c5bdf1c4b191474b3e161140577` matches parent consequence 7; the three in-scope files proven zero-edit preserved by §0 consequence 2)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: EV-UA-W6-D-003 (§4: S001–S005, one file each; zero-edit in-scope files take no S-number per parent consequence 1)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: EV-UA-W6-D-002 (§6.2/§7.2/§8.2 replacements with unique anchors and occurrence count 1; §9.2 hunks with unique full fences; §10.3 bytes with pinned digest `f78b8da2…`; all ending digests simulated, globals matching the parent pin `b5c79578…`)
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: EV-UA-W6-D-003 (§4; no waves — parent consequence 1; S005 ordered after S001–S004 by the needle dependencies; S001–S003 ordered by parent-frozen sequencing with one-active-leaf review between leaves)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: EV-UA-W6-D-003 (§5.1: SectionIntro export pinned `159096f3…`; post-S004 needle N-CSS with ending digest `b5c79578…`; recordExecuted pinned `f5137be4…`; all leaf ending digests pinned before S005 dispatch)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: EV-UA-W6-D-003 (§4.1 table)
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: EV-UA-W6-D-003 (three jsx leaves, css leaf, and test leaf are separate; runtime json handled by prescribed disposable procedure, never a deliverable)
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: EV-UA-W6-D-003 (command lists in §6.4–§10.4; the only prescribed non-writable touch is the §10.4 V-D json backup/run/restore with net-zero delta; tsc leaf runs are not scheduled — tsc is an I001 gate)

### 13.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7 of the standard. Evidence: EV-UA-W6-D-003 (§6–§10 yaml blocks; 15/15 field-presence lint per block)
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: EV-UA-W6-D-003 (byte-exact §6.2/§7.2/§8.2/§9.2 with unique anchors and occurrence counts; §10.3 full file bytes pinned by digest)
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: EV-UA-W6-D-003 (§6.4–§10.4)
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: EV-UA-W6-D-003 (V-E rows in §6.4–§10.4; V-D net-zero json restore proof)
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: EV-UA-W6-D-003 (§14 templates; H3 rows)
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: EV-UA-W6-D-003 (leaf prohibited_actions)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: EV-UA-W6-D-003 (each leaf's LOCAL_NOW set passes standalone — S001–S004 by digest pins, S005 by the V-D w6-only run; whole-window gates deferred and named)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: EV-UA-W6-D-003 (DEF rows → UA-W6-I001)

### 13.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: EV-UA-W6-D-003 (§5; 3 cases → S005 with §10.3 bytes)
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: EV-UA-W6-D-003 (§10.4 V-D; §11 G5)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: EV-UA-W6-D-003 (NC-UA-002/001-family probes at S005 leaf level (§10.4 V-C N1–N3) with I001 G8 personal re-execution; S001–S004 integrity enforced by the ending-digest pins)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: EV-UA-W6-D-003 (SUB-UA-001 inherited: UTF-8 file reads are source-text oracles only; no computed-pixel claim; screenshots are local_e2e evidence, not oracles; coverage and w2–w5 test files never weakened here)
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: EV-UA-W6-D-003 (§15: authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: EV-UA-W6-D-003 (§11; G4 scheduled at I001 per browser_evidence true)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: EV-UA-W6-D-003 (§12)
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: EV-UA-W6-D-003 (§15 assigned WINDOW-AGENT; §12 item 7; parent consequence 8 same-identity review)
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: EV-UA-W6-D-003 (§11 G5/G6/G8; §10.4 V-B/V-D)
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: EV-UA-W6-D-003 (§14.3)
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: EV-UA-W6-D-003 (§12 item 6)

### 13.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA-W6-D-003 (`UA-W6-S001`–`UA-W6-S005`, `UA-W6-I001` unique; S-numbering exactly as parent consequence 1; CASE/DEC/SCN/NC IDs cite A3/A4)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA-W6-D-003 (S1 contains only concrete paths, digests, bytes, counts)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA-W6-D-003 (exact-set comparisons in §6.4–§10.4 V-E rows; prescribed disposable `.ua-executed.json` cycle excluded by the net-zero restore proof)
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: EV-UA-W6-D-002 (SW-D03 set equality over the parent-pinned 5-file digest `85d3d712…` is the failure detector)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: EV-UA-W6-D-003 (§10.3 three tests each call recordExecuted after its oracle; §11 G5 counts and digests; A4 §Enforcement 1–4 inherited)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: EV-UA-W6-D-003 (byte-pinned hunks and file content; any divergence changes the reviewed ending digests; accepted tests untouched)
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: EV-UA-W6-D-003 (leaf prohibited_actions + §4.6 proofs via V-E rows)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: EV-UA-W6-D-003 (§12 items 1, 7)
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: EV-UA-W6-D-003 + S2 `decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`, leaves `assigned_agent: UNASSIGNED`
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA-W6-D-003 (15/15 required fields per FILE block; 0 unresolved references)
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: EV-UA-W6-D-003 (§12 item 6)

## 14. Handoff templates

### 14.1 Leaf completion certificate (returned by each leaf agent)

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W6
subwindow_id: UA-W6-S001 | UA-W6-S002 | UA-W6-S003 | UA-W6-S004 | UA-W6-S005
assignment_id: ASG-UA-W6-01-S001 | ASG-UA-W6-01-S002 | ASG-UA-W6-01-S003 | ASG-UA-W6-01-S004 | ASG-UA-W6-01-S005
agent_identity: exact identity
writable_file: exact path from §6–§10
starting_file_digest: 24c146e8… | 07a82664… | e0e4f14f… | 7ae36419… | ABSENT
ending_file_digest: 86392720… | 8376447d… | d57edbe3… | b5c79578… | f78b8da2…
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
attributable_changed_file_set: [writable file only]
required_local_cases: [] | [] | [] | [] | [CASE-UA-W6-001, CASE-UA-W6-002, CASE-UA-W6-003]
registered_local_cases: same as required_local_cases
executed_local_cases: [] | [] | [] | [] | [CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W6-001, CASE-UA-W6-002, CASE-UA-W6-003] (V-D w6-only run; the 2 W1 IDs are registry re-executions via the import)
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 0 | 0 | 0 | 0 | 3
negative_controls_falsified: 0 | 0 | 0 | 0 | 3
commands: []
deferred_integration_checks: [UA-W6-I001 gates per §11]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

### 14.2 Window-agent integration certificate (appended to `S3` by `UA-W6-I001`)

The §12.4 certificate of the sub-window standard, adapted: `integration_assessment_id:
UA-W6-I001`; `accepted_initial_subwindows` from leaf reviews; `expected_changed_file_set`
= the five §4 planned files; `required_case_count: 3` (window-local; the 43-ID registry
equality is UA-W15-V5); `registered_case_count: 3`; `executed_case_count: 3` window-local
(plus 2 W1 + 12 predecessor IDs re-executed in the full run); `required_case_set_digest:
c5cc5fca3fc5d9d81325b229047a41f4b845c50aa530b1da84c4fc57b23bfb9a`; registered/executed
digests computed with the §4.7 formula over the same IDs; post-G1 executed-set digest
`e7895fa537ab11d142d86344f4cca4607d35d1b164f1cbda6097bf765e167421`; `status:
READY_FOR_PARENT_REVIEW` only per the §11 PASS oracle.

### 14.3 Consolidated parent handoff

`frontend/review-evidence/uphunt-aesthetic/UA-W6_HANDOFF.md` per `A4` handoff
template and sub-window standard §12.5: objective; status
`READY_FOR_PARENT_REVIEW` or one exact blocker; changed-file set +
starting/ending SHA-256s (including the preserved `runs/continue/page.tsx`
`c72d135f…`, `run-history.tsx` `de99ecac…`, `research-form.tsx` `b5fae7da…`,
read-only `section-intro.tsx` `159096f3…`, and unchanged predecessors); CASE
required/registered/executed/skipped/duplicate/unexpected (3/3/3/0/0/0
window-local; 2 additional registry IDs re-executed via import; full 43-set
equality deferred to UA-W15); required-set digest `0d14982c…` (registry) and
W6-set digest `c5cc5fca…`; commands and outcomes; browser-evidence file list
under `frontend/review-evidence/uphunt-aesthetic/UA-W6/` (8 PNGs, routes
`/runs` + `/keywords`); sandbox recoveries; NC results; forbidden-path negative
search; `S1`/`S2`/`S3` paths and revisions; the tracked `.ua-executed.json`
residue disclosure (17-ID content, uncommitted); confirmation that `UA-W7` was
not started.

## 15. Initial integration assessment `UA-W6-I001` (fully authored now)

```yaml
subwindow_id: UA-W6-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W6
parent_assignment_id: ASG-UA-W6-01
assigned_agent: WINDOW-AGENT (UA-W6-WINDOW-AGENT, personally executed, never delegated)
predecessors: [UA-W6-S001, UA-W6-S002, UA-W6-S003, UA-W6-S004, UA-W6-S005]
authorized_write_file: NONE (implementation files; coordination artifacts per §2 only)
input: assembled UA-W6 state after UA-W6-S005 is accepted
gates: §11 table G1–G9 (frozen)
pass_oracle: G1..G9 pass; G4 executed and recorded (browser_evidence true; routes /runs + /keywords only)
correction_oracle: any behavioral gate failure -> §12 loop with UA-W6-C00n
parent_blocked_oracle: missing decision / contradiction / scope expansion (incl. §12 items 2–4)
execution_policy: E8.1 sandbox escalation + one identical recovery (§12 item 6)
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
4. source and test file assigned together (jsx/css leaves S001–S004 and test leaf S005 are separate; SW-D09) — rejected.
5. a required parent file is absent from the decomposition (SW-D03 set equality over the parent-pinned 5-file digest; the three zero-edit in-scope files are accounted for by parent consequence 2 with G6 pins) — rejected.
6. two initial sub-windows own the same file (S001–S005 files pairwise distinct; SW-D04) — rejected.
7. a dependent file begins before its interface is frozen (§5.1 ending digests and needle frozen before S005 dispatch; SW-D07) — rejected.
8. an intermediate state has an unexplained test failure (§4.1 table: no permitted check fails in any row; unexpected failures stop the sequence) — rejected.
9. a subagent starts its successor (`may_start_successor: false` in every block; H3; parent consequence 8) — rejected.
10. a subagent communicates directly with the parent (prohibited_actions; H2) — rejected.
11. the window agent repairs implementation during review (§12 item 7) — rejected.
12. an integration failure produces no diagnosed one-file correction (§12 items 1, 5) — rejected.
13. a correction silently rewrites a completed sub-window (§17 append-only amendments; §12 item 1) — rejected.
14. acceptance omits/skips/duplicates/filters/unactivates a required case (§11 G5 counts + digests; §10.4 V-D) — rejected.
15. an oracle is weakened to accommodate current behavior (byte-pinned hunks and file content; any divergence changes reviewed digests; SW-R06) — rejected.
16. a test substitute proves more parity than its fidelity supports (SUB-UA-001 inherited: source-text oracles; screenshots are local_e2e only; SW-V04) — rejected.
17. a costly gate is repeated without its scheduling rule (§11 gates scheduled at I001 only; DEF rows name the owner) — rejected.
18. a correction changes a file but dependent evidence is reused without proof (§12 item 5 rerun list) — rejected.
19. the assembled changed-file set differs from the planned set or exceeds parent scope (§11 G6 delta + forbidden-path search; SW-D03) — rejected.
20. the window agent claims parent acceptance or begins UA-W7 (§11 PASS oracle stops at READY_FOR_PARENT_REVIEW + A5 AWAITING_REVIEW; G9) — rejected.
21. an already-authorized local gate is escalated to the parent merely for sandbox privilege (§12 item 6 E8.1 policy) — rejected.
22. a changed command, observable failure, surviving process, or mutation is accepted as automatic sandbox recovery (§12 item 6 recovery preconditions) — rejected.
23. parallel leaves overlap dependencies/resources or the next wave starts early (no waves authorized; §4 single sequential order; parent consequence 1) — rejected.

## 17. Append-only amendment sections

Reserved for corrective sub-windows (`UA-W6-C001`, …) and further assessments
(`UA-W6-I002`, …). Each amendment repeats the §6 block structure in full with a
new ID, new baseline digest, cited trigger evidence, and invalidated gates.
Existing sections above are immutable after parent approval.

### 17.A1 — Amendment `UA-W6-A1`: G1 oracle superseded by `DEC-UA-016`

```yaml
amendment_id: UA-W6-A1
kind: gate-oracle-amendment
parent_assignment_id: ASG-UA-W6-02
governing_decision: DEC-UA-016 (A3 revision 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3)
trigger_evidence:
  - EV-UA-W6-I-001 (I001 PARENT_BLOCKED on old G1; 175/172/3)
  - EV-UA-A-046 (parent confirmation)
invalidated_gates: [G1]
unchanged_gates: [G2, G3, G4, G5, G6, G7, G8, G9]
unchanged_pins: >-
  All five product pins stand: runs 86392720…, keywords 8376447d…,
  run-continuation d57edbe3…, globals b5c79578…, w6 test f78b8da2….
amended_G1: >-
  From frontend/, run `npm test`. PASS iff (a) CASE-UA-W6-001, CASE-UA-W6-002,
  and CASE-UA-W6-003 pass, AND (b) every failing test title, if any, is a
  member of the predecessor heading-oracle set {"My searches presents keyword
  research and identifiable run dossiers without rendering IDs", "MRR-FE-01
  exact research payload and two-section surface", "MRR-W2 frontend unit
  certificate"}. FAIL iff any other test fails or any allocated UA CASE fails.
  npm test process exit 1 is expected and is not G1 FAIL when (a) and (b)
  hold. Parent-measured baseline: 175 tests, 172 pass, 3 fail, exactly those
  three titles. If CASE-UA-W1-001/002 fail solely with
  `SyntaxError: Unexpected end of JSON input` from getExecuted, that is the
  known concurrent recordExecuted race (DEC-UA-011 residue): one identical
  rerun is permitted (E8.1); it is not a member of the heading-oracle set.
successor_assessment: UA-W6-I002 (personally executed by UA-W6-WINDOW-AGENT, G1–G9, no parent wait between gates)
prohibited: >-
  Do not edit product files, the parked SRC-UA-0092 files, or
  test/design-system-shell.test.ts; do not revert the DEC-UA-003 /runs
  SectionIntro; do not start UA-W7; do not commit.
rationale: >-
  The frozen 175-pass G1 contradicted the parent-frozen DEC-UA-003 heading
  replacement; the three failing predecessor oracles pin the removed
  <h1>My searches</h1>. DEC-UA-016 freezes the heading-oracle set instead of
  authorizing parked/predecessor-file edits or a product revert.
```
