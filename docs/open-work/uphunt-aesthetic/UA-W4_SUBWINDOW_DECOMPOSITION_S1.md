# UA-W4 frozen sub-window decomposition checklist (`S1`)

Subordinate artifact `S1` of parent window `UA-W4` under assignment `ASG-UA-W4-01`.
Companion artifacts: `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W4_SUBWINDOW_STATE_S2.yaml`
and `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W4_SUBWINDOW_EVIDENCE_S3.md`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

This file is frozen once the parent approves the decomposition. Corrections are appended
in §14 with new IDs; existing blocks are never rewritten.

## 0. Parent-frozen mechanical consequences (copied from `A6` `EV-UA-A-033`; not reopened)

The parent froze the following consequences in `A6` `EV-UA-A-033`
(`parent_frozen_mechanical_consequences`). They are copied here and are outside
decomposition authority. They close otherwise-open S1 choices; they are uniquely
determined by DEC-UA-001, DEC-UA-012, and UA-W4-T1/T2:

1. page.tsx and run-form.tsx are in-scope preserved (zero JSX edits). G6
   byte-identity pins: `page.tsx` `3460751e72842cb22b4116211408c4c8ddaef0f4efd02513f1228182902f5a86`,
   `run-form.tsx` `72576044e7f57c4e76206e7b204c73202b84775b98e309ead8ba2ccc601fb8a2`.
   Do not change `LandingHeroCopy` or `LandingProcess` strings. page.tsx already
   imports `LandingHeroCopy` and renders `<LandingHeroCopy />` / `<RunForm />` /
   `<LandingProcess />`; run-form.tsx already has `className="run-form-card
   run-start-form ds-card"`. Do not change `createKeywordResearch`, `router`,
   form fields, `SUGGESTIONS`, or that className.
2. CSS: exactly four unique `.run-form-card` hunks (border / border-radius only),
   using these four hunks and no others. Unnamed declarations stay byte-identical,
   including ::before/::after, grouped `.hero-copy`/`.run-form-card` min-width,
   height/padding/background/box-shadow, and every `.landing-page`/`.landing-hero`/
   `.hero`/`.hero-copy`/`.hero-kicker`/`.hero-intro`/`.accent-underline` rule that
   does not contain a T1-failing named property.
   - Hunk 1: the unique unscoped block beginning `.run-form-card {\n  position: relative;`
     — replace `border: 1px solid rgba(18, 35, 30, 0.13);` with
     `border: 1px solid var(--color-line);` and `border-radius: 24px;` with
     `border-radius: var(--radius-panel);`.
   - Hunk 2: the unique `.landing-hero .run-form-card` block that contains
     `min-height: 47rem;` — replace `border: 0;` with
     `border: 1px solid var(--color-line);` and keep the existing
     `border-radius: var(--radius-panel);`.
   - Hunk 3: the unique media block `  .run-form-card {\n    padding: 23px 20px;\n    border-radius: 17px;\n  }`
     — replace `border-radius: 17px;` with `border-radius: var(--radius-panel);`
     and do not edit the following ::before 17px.
   - Hunk 4: the unique `.landing-hero .run-form-card` block that contains
     `padding: var(--space-5) var(--space-4);` — replace
     `border-radius: var(--radius-card);` with `border-radius: var(--radius-panel);`
     and do not edit the following ::before `--radius-card`.
   - Do not replace the rgba border on `.suggestion-chip` or `.query-list-wrap`.
3. CREATE `test/uphunt-aesthetic-w4.test.ts` with exactly two tests,
   CASE-UA-W4-001 and CASE-UA-W4-002. 001 asserts page.tsx contains
   `import { LandingHeroCopy, LandingProcess } from "@/components/landing-sections"`
   and `<LandingHeroCopy />`. 002 asserts the four post-hunk needles (unscoped
   card border `1px solid var(--color-line)` after `padding: 34px;`; landing-hero
   47rem block border `1px solid var(--color-line)`; media `padding: 23px 20px`
   then `border-radius: var(--radius-panel)`; landing-hero mobile
   `padding: var(--space-5) var(--space-4)` then
   `border-radius: var(--radius-panel)`) and `--color-signal: #c8f04b`.
   `recordExecuted` after assertions. No fifth test. No `getExecuted` vs
   `REQUIRED_CASE_IDS` full-set equality.
4. Leaf S004 V-B from ABSENT `test/.ua-executed.json` expects exactly 4 IDs
   (2 × W1 re-executions + CASE-UA-W4-001/002). The 12-ID set
   {2 × W1} ∪ {4 × W2} ∪ {4 × W3} ∪ {2 × W4} is asserted only at I001 G5 after
   `npm test`. Do not require W2/W3 IDs at the w4-only test command.
   `test/.ua-executed.json` is TRACKED at HEAD (owner commit `d6121aa` residue);
   treat that as inherited DEC-UA-011 runtime output, not a W4 file to commit.
5. I001 G4 is frozen as route `/` at 390/768/1280/1440 only (owned landing route;
   `local_e2e`, not a CASE oracle). Expected `npm test` after W4 is 166 pass
   (162 predecessor + 2 W1 re-executions from the w4 import + 2 W4 cases).
   Window-local case digest
   `ea7e02bc33cc8ad7d247c60e5d300a3a83ac02814866ca2c97bbfc4fa3ead715`.
6. Do not change LandingHeroCopy/LandingProcess strings. Do not edit
   `landing-sections.tsx` or `section-intro.tsx`. Do not change
   `createKeywordResearch`, `router`, form fields, or `SUGGESTIONS`.

## 1. Inherited authority and revision pins

| Pin | Value |
|---|---|
| Parent window | `UA-W4` |
| Parent assignment | `ASG-UA-W4-01` |
| Window agent | `UA-W4-WINDOW-AGENT` |
| Parent standard | `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` |
| Sub-window standard | `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` |
| Contract `A1` | `a33ae1d8af4442de2680dc70f2c6e793a668b1400f0814833489061848c9baef` |
| Decision `A3` | `8faaa4e2411235d8a83ec94de6a07e53c54ece91d99121a3c0e09cb6052f4300` |
| Checklist `A4` | `10543d6d3cceeb9a5775ac9dfdfe1ea8b8f658b6619d42b8fa3ccc72500ddc5e` |
| Active state `A5` (file digest) | `cf8a54c7e74f935e2ba279c6e287415d62bfb497bf26c8b6c6aa7c8a3bfece87` (state_version 9) |
| Required coverage set (43 IDs, E6) | `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` (A4 §Coverage pin; asserted by CASE-UA-W1-002) |
| Predecessor `frontend/components/section-intro.tsx` | `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175` (recomputed 2026-09-02; matches `EV-UA-A-033`) |
| Predecessor `frontend/components/landing-sections.tsx` | `914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15` (recomputed 2026-09-02; matches `EV-UA-A-033`) |
| Predecessor `frontend/test/uphunt-aesthetic-coverage.test.ts` | `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` (recomputed 2026-09-02; matches `EV-UA-A-033`) |
| Predecessor `frontend/test/uphunt-aesthetic-w3.test.ts` | `635e28022e14646c26407dd41c77c55a4c7fb3b34c6aa29d2f6b63eaaee69b13` (recomputed 2026-09-02; matches `EV-UA-A-033`) |
| Protected `frontend/test/uphunt-aesthetic-w2.test.ts` | `f65ba0c50c78ef983496d0a37af1a1a6a1234332c48a5290bc344c9a5e68b78c` (recomputed 2026-09-02; unchanged) |
| Preserved in-scope `frontend/app/page.tsx` | `3460751e72842cb22b4116211408c4c8ddaef0f4efd02513f1228182902f5a86` (G6 pin) |
| Preserved in-scope `frontend/components/run-form.tsx` | `72576044e7f57c4e76206e7b204c73202b84775b98e309ead8ba2ccc601fb8a2` (G6 pin) |
| `A5` authorized_windows | `[UA-W4]` |
| `A5` may_start_successor | `false` |
| Successor `UA-W5` | reserved for parent; NOT authorized (`A5` prohibited `start_UA-W5`) |

All pins recomputed 2026-09-02 by `UA-W4-WINDOW-AGENT` and matched byte-exact
(S3 `EV-UA-W4-D-001`). Root `ACTIVE_EXECUTION_STATE.md` is out of authority and
untouched (coordination root `git status --porcelain` clean, S3 `EV-UA-W4-D-001`).

## 2. Parent-window scope and exclusions (copied, no expansion)

From `A4` §UA-W4 F1 and `A5` `authorized_write_scope`:

- Objective: landing hero and run form stay landing-scale; hairline card
  consistent with DEC-UA-001 (`A4` §UA-W4).
- Window write scope (implementation, exactly four authorized paths):
  `frontend/app/page.tsx`, `frontend/components/run-form.tsx`,
  `frontend/app/globals.css` (owned selectors only, below),
  `frontend/test/uphunt-aesthetic-w4.test.ts`.
- Planned changed-file set (§4): exactly two files — `frontend/app/globals.css`
  (MODIFY) and `frontend/test/uphunt-aesthetic-w4.test.ts` (CREATE).
  `page.tsx` and `run-form.tsx` are in scope but have zero required edits:
  parent consequence 1 preserves them (G6 byte-identity pins above) because the
  CASE-UA-W4-001 import and the `run-form-card` className already exist. Required
  changed-file set = planned set (S3 `EV-UA-W4-D-002`).
- Shared-file scope for `frontend/app/globals.css`: `.landing-page`, `.landing-hero`,
  `.hero`, `.hero-copy`, `.hero-kicker`, `.hero-intro`, `.run-form-card`,
  `.accent-underline`. This decomposition narrows the editable set to the four
  §6.2 hunks (parent consequence 2); no other declaration in any of those rules
  may change. Unowned selectors (including `.suggestion-chip`, `.query-list-wrap`,
  `.marketing-heading`, `.auth-card`) stay byte-identical.
- Read-only scope (window): `frontend/components/landing-sections.tsx`,
  `frontend/components/section-intro.tsx`.
- Window-agent coordination writes (never implementation): `S1`, `S2`, `S3` (this
  decomposition), `A6` append-only, `A4` `UA-W4-P*`/`UA-W4-T*`/`UA-W4-V*`/`UA-W4-H*`
  checkboxes only, `frontend/review-evidence/uphunt-aesthetic/UA-W4_HANDOFF.md`,
  screenshots under `frontend/review-evidence/uphunt-aesthetic/UA-W4/` (headless
  chrome only, after the parent accepts this decomposition), and at handoff only
  `A5.current_status: AWAITING_REVIEW`.
- Authorized actions: `modify_globals_css_owned_selectors_only`,
  `create_w4_test_file`, `run_frontend_unit_tests`, `run_frontend_npm_test`,
  `run_npx_tsc_noEmit`, `run_npm_run_lint` (CSS/JSX owned this window),
  `run_headless_chrome_browser_evidence` (I001 only); window-agent assessment and
  coordination writes above; sandbox escalation per the E8.1 policy in §9 item 5.
- Prohibited: `edit_landing_sections`, `edit_section_intro`,
  `change_LandingHeroCopy_or_LandingProcess_strings`,
  `change_run_form_API_router_or_form_fields` (`createKeywordResearch`, `router`,
  form fields, `SUGGESTIONS`), `edit_page_tsx`, `edit_run_form`,
  `edit_unowned_globals_css_selectors`, `add_dependency`, `edit_REQUIRED_CASE_IDS`,
  `edit_uphunt-aesthetic-coverage_test`, `edit_parked_SRC-UA-0092_test_files`,
  `edit_unowned_app_or_component_files`, `start_UA-W5`, `may_start_successor`,
  `aws`, `commit`, `push`, `production`, `paid_provider`, `edit_email_scraper`,
  `edit_root_ACTIVE_EXECUTION_STATE`. `npm run build` is a UA-W15-only gate.
- `test/.ua-executed.json` is a TRACKED runtime-output path (owner commit
  `d6121aa` residue). It is never a W4 deliverable and is never committed by this
  window; leaves may touch it only through the prescribed §7.4 V-D
  backup/run/restore procedure.

## 3. Starting working-tree inventory (recorded 2026-09-02T13:08:00+05:30, read-only)

Repository: `/home/harit/Email Scrapper/frontend` (git toplevel, HEAD `818994a` "W3").
Coordination root `/home/harit/Email Scrapper` is a separate git repository and
reported a clean `git status --porcelain` (root `ACTIVE_EXECUTION_STATE.md` untouched).

Starting changed-file set (frontend repo, `git status --porcelain`, sorted):

1. ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml` — assignment
   fields written by parent for `ASG-UA-W4-01`; starting file digest
   `cf8a54c7e74f935e2ba279c6e287415d62bfb497bf26c8b6c6aa7c8a3bfece87`; PROTECTED
   (no leaf writes; only the handoff action `set_A5_AWAITING_REVIEW_on_handoff`
   may touch it later, never a leaf).
2. ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` — append-only evidence;
   window-agent append-only; PROTECTED against leaf writes.

Starting repository change set digest (§4.7 formula over the two paths above):
`e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450`.

Starting state of planned and preserved files (all recomputed 2026-09-02):

- `frontend/app/globals.css`: present, clean, digest
  `325a442bdd1b076b8bb0b2029ff4326b91edfbe4b5a6478a540318afe3c50ea9`. Hunk anchor
  locations: hunk 1 unscoped `.run-form-card` block at line 815; hunk 2
  `.landing-hero .run-form-card` (`min-height: 47rem;`) block at line 6564; hunk 3
  media `.run-form-card` block at line 4357; hunk 4 media `.landing-hero
  .run-form-card` block at line 6796. Preserved ::before rules at lines 832, 4371,
  6579, 6802. Baseline declaration counts are pinned in §6.4 V-D.
- `frontend/test/uphunt-aesthetic-w4.test.ts`: ABSENT.
- `frontend/app/page.tsx` (preserved, in scope, zero edits): digest
  `3460751e72842cb22b4116211408c4c8ddaef0f4efd02513f1228182902f5a86`; line 1
  already contains `import { LandingHeroCopy, LandingProcess } from "@/components/landing-sections";`,
  line 9 renders `<LandingHeroCopy />`.
- `frontend/components/run-form.tsx` (preserved, in scope, zero edits): digest
  `72576044e7f57c4e76206e7b204c73202b84775b98e309ead8ba2ccc601fb8a2`; line 98
  already contains `className="run-form-card run-start-form ds-card"`.
- Predecessors and protected files: `section-intro.tsx` `159096f3…`,
  `landing-sections.tsx` `914c61e5…`, `header-auth.tsx` `b2bccd42b477405df7247c8df6534488a9bd3f92af57aee19d7e452fb4076657`,
  `test/uphunt-aesthetic-coverage.test.ts` `f5137be4…`, `test/uphunt-aesthetic-w2.test.ts`
  `f65ba0c5…`, `test/uphunt-aesthetic-w3.test.ts` `635e2802…`;
  `frontend/test/.ua-executed.json` present, clean, TRACKED, digest
  `7d48ebc536458ffd872edc25c7cf5aa9835abcefbd41bc767a040d39a2dc5768`, content =
  exactly 10 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3}
  (owner commit `d6121aa` residue; DEC-UA-011 runtime output; never committed by W4).

Environment: node `v24.14.1`; `frontend/package.json` `test` =
`node --experimental-strip-types --test test/*.test.ts`, `lint` = `eslint`;
`tsconfig.json` `incremental: true`, `allowImportingTsExtensions: true`,
`strict: true`, `paths: {"@/*": ["./*"]}`; leaves run tsc with
`--incremental false --pretty false` so no tsbuildinfo is written. `/tmp/opencode`
exists as the prescribed disposable location for leaf V-D backup/restore and
negative probes.

## 4. Initial single-file dependency DAG and intermediate-state contracts

```text
UA-W4-S003 (FILE, modify frontend/app/globals.css)             ──> UA-W4-S004 ──> UA-W4-I001
UA-W4-S004 (FILE, create frontend/test/uphunt-aesthetic-w4.test.ts)              (INTEGRATION_ASSESSMENT)
```

Sub-window ID grammar follows the parent's slot convention from `A6`
`EV-UA-A-033` (which cites "S004 V-B" and "I001 G4/G5"): `S003` owns
`globals.css` and `S004` owns the W4 test file, matching the `UA-W3` slots for
the same files. Slots S001/S002 correspond to `page.tsx`/`run-form.tsx`, which
parent consequence 1 preserves with zero edits; per the single-file invariant a
zero-change file requires no FILE sub-window, so no S001/S002 blocks exist and
those IDs are retired unused.

Sequential execution order (default one-active-leaf lifecycle; no parallel waves
authorized by `A5`): S003, then S004, then I001.

- Edge S003→S004: CASE-UA-W4-002 (in S004) asserts the four post-hunk needles in
  `globals.css`; the test file must be authored and executed against the
  post-S003 file state, otherwise its oracles are false before the work exists.
- Edge S004→I001: whole-window gates require both planned files assembled.
- No planned file consumes any interface produced inside this window; the only
  consumed cross-file interfaces are predecessor outputs and the S003 result
  state (§5.1).

### 4.1 Intermediate-state contracts

| After | Permitted checks | Expected temporary state | Why safe | Resolved by | Prohibited while pending |
|---|---|---|---|---|---|
| S003 accepted | S003 §6.4 only | four hunks live; hero card renders hairline `var(--color-line)` border and `var(--radius-panel)` radii; `uphunt-aesthetic-w4.test.ts` still ABSENT so `npm test` would still report 162 pass (162 predecessor incl. W1/W2/W3; w4 file not yet in the test glob); no permitted check fails in this state | local workspace only; no deployment or external surface; no CASE test runs at leaf level (`npm test` prohibited at leaves) | S004 adds the asserting tests | editing `page.tsx`, `run-form.tsx`, or the test file from S003; running `npm test`; successor work |
| S004 accepted | S004 §7.4 only; whole-window gates remain PENDING | w4-only run executed from ABSENT-json state produced exactly 4 IDs then restored; `.ua-executed.json` byte-identical to HEAD (`7d48ebc5…`); repo delta = the two planned files only | test file is not imported by app code; runtime json restored per §7.4 V-D | I001 | any second-file edit; committing `.ua-executed.json`; successor work |

Unexpected failures at any row stop the sequence for diagnosis (no silent
progression). No permitted intermediate check is expected to fail.

## 5. Exact allocation of requirements, decisions, interfaces, and coverage cases

Parent trace for `UA-W4` (all IDs from `A1`/`A3`/`A4`):

| Parent ID | Allocated to | Terminal anchor |
|---|---|---|
| UA-W4 objective (`SCN-UA-001`, DEC-UA-001) | `UA-W4-S003` §6.2 | the four `.run-form-card` border/radius hunks |
| UA-W4-T1 | `UA-W4-S003` §6.2 | `border: 1px solid var(--color-line)` + `border-radius: var(--radius-panel)` on `.run-form-card` rules; LandingHeroCopy strings untouched |
| UA-W4-T2 | `UA-W4-S004` §7.3 | two tests, CASE-UA-W4-001/002 |
| CASE-UA-W4-001 (`SCN-UA-002`) | `UA-W4-S004` test 1 | page.tsx import + `<LandingHeroCopy />` regexes (page.tsx preserved bytes) |
| CASE-UA-W4-002 (`SCN-UA-001`) | `UA-W4-S004` test 2 | four post-hunk `globals.css` needles + `--color-signal: #c8f04b` |
| NC-UA-002 family | S004 §7.4 V-C N1 + `UA-W4-I001` G8 | removing the LandingHeroCopy render falsifies the CASE-UA-W4-001 oracle |
| NC-UA-001 family | S004 §7.4 V-C N2/N3 + `UA-W4-I001` G8 | reverting a hunk border/radius string falsifies the CASE-UA-W4-002 needles |
| DEC-UA-011 | S004 `recordExecuted` import + call-after-witness ordering; `.ua-executed.json` handling | two `recordExecuted` calls, each after its oracle; json never committed |
| DEC-UA-012 | §0 consequences (parent-frozen) | this S1 §0 |
| DEC-UA-013 | leaf preflights P1/P2 | git status before/after (frontend + coordination root) |
| DEC-UA-014 | `UA-W4-I001` gate G2 | zero tsc diagnostic lines on the owned-path needles |
| UA-W4-P1..P4, UA-W4-V1..V5, UA-W4-H1..H6 | `UA-W4-I001` / handoff | `A4` UA-W4 lifecycle boxes checked with evidence at I001 |

The remaining 41 coverage CASE IDs belong to other/later windows per the
`test_registration` column of `A4` §Coverage. Window-required local case set =
{CASE-UA-W4-001, CASE-UA-W4-002}, §4.7 set digest
`ea7e02bc33cc8ad7d247c60e5d300a3a83ac02814866ca2c97bbfc4fa3ead715` (matches the
parent pin in `EV-UA-A-033`).

### 5.1 Frozen cross-file interfaces (inherited; restated)

- `page.tsx` consumed bytes (frozen by G6 pin `3460751e…`): line 1
  `import { LandingHeroCopy, LandingProcess } from "@/components/landing-sections";`
  and line 9 `<LandingHeroCopy />`. S004 asserts these regexes read-only.
- `recordExecuted(id: string): void` — produced by `UA-W1-T1`, pinned at file
  digest `f5137be4…`. S004 imports it from
  `./uphunt-aesthetic-coverage.test.ts` and calls it exactly once per test, after
  that test's assertions. `REQUIRED_CASE_IDS` already contains both W4 IDs; it is
  never edited here.
- Post-S003 `globals.css` needles consumed by S004 (byte-exact; all four
  occurrence counts verified == 1 by simulation, S3 `EV-UA-W4-D-002`):
  - N1 `padding: 34px;\n  border: 1px solid var(--color-line);\n  border-radius: var(--radius-panel);`
  - N2 `.landing-hero .run-form-card {\n  min-height: 47rem;\n  padding: clamp(1.75rem, 2.6vw, 2.25rem);\n  border: 1px solid var(--color-line);\n  border-radius: var(--radius-panel);`
  - N3 `  .run-form-card {\n    padding: 23px 20px;\n    border-radius: var(--radius-panel);\n  }`
  - N4 `  .landing-hero .run-form-card {\n    min-height: 0;\n    padding: var(--space-5) var(--space-4);\n    border-radius: var(--radius-panel);\n  }`
- Expected post-S003 `globals.css` digest:
  `04df3d7ed3f3528c448cf05c9b0f45d78d9a422305c436dc7b8fd16487ee6a42`
  (deterministically simulated from `325a442b…` by applying exactly the four §6.2
  hunks; S3 `EV-UA-W4-D-002`).

## 6. Initial implementation sub-window `UA-W4-S003`

```yaml
subwindow_id: UA-W4-S003
type: FILE
parent_window_id: UA-W4
parent_assignment_id: ASG-UA-W4-01
assigned_agent: UNASSIGNED
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/globals.css
file_operation: MODIFY
starting_file_digest: 325a442bdd1b076b8bb0b2029ff4326b91edfbe4b5a6478a540318afe3c50ea9
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W4)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W4_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §6)
  - frontend/app/globals.css (own file)
  - frontend/test/uphunt-aesthetic-w2.test.ts, frontend/test/uphunt-aesthetic-w3.test.ts (regression context, read-only)
authorized_actions:
  - apply_the_four_ordered_hunk_replacements_of_section_6.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_any_declaration_or_selector_not_named_in_section_6.2
  - edit_run_form_card_before_or_after_pseudo_element_rules
  - edit_suggestion_chip_or_query_list_wrap_borders
  - edit_css_token_definitions
  - edit_page_tsx_or_run_form_tsx
  - edit_the_w4_test_file
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W4-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W5
may_start_successor: false
```

### 6.1 Mechanical trace

UA-W4-T1; UA-W4 objective; DEC-UA-001; DEC-UA-012 (via §0 consequences 1–2);
DEC-UA-013 (preflight). Terminal anchors: the four §6.2 hunks; ending digest pin
`04df3d7e…`. Every requirement allocated here terminates in a file anchor
verified by §6.4 checks and by S004's CASE-UA-W4-002 oracles.

### 6.2 Exact file transformation (four ordered replacements; all anchor counts == 1)

Apply in this order. Each OLD string occurs exactly once in the starting file
(verified by simulation, S3 `EV-UA-W4-D-002`); if any count differs, STOP and
report — do not improvise.

**Hunk 1** — inside the unique block beginning `.run-form-card {\n  position: relative;`
(lines 815–821 of the starting file). OLD fence = starting bytes, lines 819–821;
NEW fence = ending bytes.

OLD:

```text
  padding: 34px;
  border: 1px solid rgba(18, 35, 30, 0.13);
  border-radius: 24px;
```

NEW:

```text
  padding: 34px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-panel);
```

**Hunk 2** — inside the unique `.landing-hero .run-form-card` block containing
`min-height: 47rem;` (lines 6564–6567 of the starting file). OLD fence = starting
bytes, lines 6565–6567; NEW fence = ending bytes. The block's existing
`  border-radius: var(--radius-panel);` line is kept byte-identical.

OLD:

```text
  min-height: 47rem;
  padding: clamp(1.75rem, 2.6vw, 2.25rem);
  border: 0;
```

NEW:

```text
  min-height: 47rem;
  padding: clamp(1.75rem, 2.6vw, 2.25rem);
  border: 1px solid var(--color-line);
```

**Hunk 3** — the unique media-indented block (lines 4357–4360 of the starting
file). OLD fence = starting bytes; NEW fence = ending bytes. The following
`.run-form-card::before` block's `    border-radius: 17px;` line is kept
byte-identical.

OLD:

```text
  .run-form-card {
    padding: 23px 20px;
    border-radius: 17px;
  }
```

NEW:

```text
  .run-form-card {
    padding: 23px 20px;
    border-radius: var(--radius-panel);
  }
```

**Hunk 4** — the unique media-indented block (lines 6796–6800 of the starting
file). OLD fence = starting bytes; NEW fence = ending bytes. The following
`.landing-hero .run-form-card::before` block's
`    border-radius: var(--radius-card);` line is kept byte-identical.

OLD:

```text
  .landing-hero .run-form-card {
    min-height: 0;
    padding: var(--space-5) var(--space-4);
    border-radius: var(--radius-card);
  }
```

NEW:

```text
  .landing-hero .run-form-card {
    min-height: 0;
    padding: var(--space-5) var(--space-4);
    border-radius: var(--radius-panel);
  }
```

Operation ordering: single atomic file write after all four replacements are
prepared; no intermediate partial state is saved. No obsolete behavior is
removed; no new declarations, properties, selectors, or rules are added; the
edit set is exactly the five deleted / five added lines above (all line-count
preserving).

### 6.3 Preserved behavior and forbidden edits (within the writable file)

- `.run-form-card::before` (line 832, `border-radius: 24px;` at line 838) —
  byte-identical.
- Media `.run-form-card::before` (line 4371, `border-radius: 17px;` at 4375) —
  byte-identical.
- `.landing-hero .run-form-card::before` (line 6579) and `::after` (line 6585) —
  byte-identical.
- Media `.landing-hero .run-form-card::before` (line 6802, `border-radius:
  var(--radius-card);`) — byte-identical.
- `.suggestion-chip` and `.query-list-wrap` rgba borders — byte-identical.
- Token definitions `--color-line: #dce1d9;`, `--radius-panel: 1rem;`,
  `--radius-card: 0.75rem;`, `--color-signal: #c8f04b;` — byte-identical.
- Grouped `.hero-copy, .run-form-card { min-width: 0; }` (line 708), the
  `min-height: 47rem;` block's background/box-shadow/backdrop-filter, the line
  7007 and 7046 `.landing-hero .run-form-card` blocks, and the line 7268 media
  block — byte-identical.
- Every declaration of `.landing-page`, `.landing-hero`, `.hero`, `.hero-copy`,
  `.hero-kicker`, `.hero-intro`, `.accent-underline` not touched by the four
  hunks — byte-identical.

### 6.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: `git status --porcelain` in frontend/ and coordination root; `sha256sum app/globals.css` | frontend porcelain == exactly the two §3 protected paths; coordination root clean; digest == `325a442b…` |
| V-B | Apply §6.2 edits with exact-match tooling (each OLD count == 1 before replacing) | 4 replacements applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- app/globals.css` and full `git diff` inspection | numstat == `5  5` for `frontend/app/globals.css`; the diff contains exactly the five OLD→NEW line pairs of §6.2 and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state counts: `border: 1px solid var(--color-line);` == 8; `border-radius: var(--radius-panel);` == 10; `border-radius: var(--radius-card);` == 17; `border-radius: 24px;` == 1; `border-radius: 17px;` == 2; `rgba(18, 35, 30, 0.13)` == 2; `border: 0;` == 40; `--color-line: #dce1d9;` == 1; `--radius-panel: 1rem;` == 1; needles §5.1 N1..N4 each match exactly once (starting counts: 6 / 7 / 18 / 2 / 3 / 3 / 41) | every assertion true |
| V-E | `sha256sum app/globals.css`; `git status --porcelain` | ending digest == `04df3d7ed3f3528c448cf05c9b0f45d78d9a422305c436dc7b8fd16487ee6a42`; attributable delta == ` M app/globals.css` exactly (protected §3 paths unchanged) |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W4-I001` G1–G9) |

Negative controls: none at this leaf — the ending-digest pin (V-E) mechanically
falsifies any deviation, and the CSS oracles' falsification probes are assigned
at the narrowest effective level in S004 §7.4 V-C and I001 G8.

Expected workspace write set: exactly `{frontend/app/globals.css}`.

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

(S003 V3: required local coverage IDs = {} = registered = executed; the window's
coverage cases execute in S004.)

## 7. Initial implementation sub-window `UA-W4-S004`

```yaml
subwindow_id: UA-W4-S004
type: FILE
parent_window_id: UA-W4
parent_assignment_id: ASG-UA-W4-01
assigned_agent: UNASSIGNED
predecessors: [UA-W4-S003]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w4.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/app/globals.css (post-S003 state, digest 04df3d7e…)
  - frontend/app/page.tsx (preserved, digest 3460751e…)
  - frontend/test/uphunt-aesthetic-coverage.test.ts (pinned f5137be4…)
  - frontend/test/uphunt-aesthetic-w3.test.ts (style predecessor, pinned 635e2802…)
  - frontend/test/.ua-executed.json (runtime state, HEAD digest 7d48ebc5…)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W4_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §7)
authorized_actions:
  - create_the_writable_file_with_the_exact_section_7.3_bytes
  - run_the_w4_only_test_command_under_the_section_7.4_V-D_backup_run_restore_procedure
  - run_disposable_in_memory_negative_probes_V-C_via_node_-e (zero workspace writes)
  - run_read_only_node_inspection
  - record_git_status_preflight_and_postcondition
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_page_tsx_run_form_tsx_globals_css_landing_sections_or_section_intro
  - add_a_fifth_test_or_a_skip_filter_or_todo
  - assert_getExecuted_equals_REQUIRED_CASE_IDS_full_set_equality
  - call_recordExecuted_before_a_tests_assertions
  - edit_REQUIRED_CASE_IDS_or_the_coverage_test_file
  - commit_or_stage_test/.ua-executed.json
  - delete_test/.ua-executed.json (V-D moves it to /tmp/opencode and restores it byte-identically)
  - run_npm_test_full_suite_or_npx_tsc_or_npm_run_lint (deferred to UA-W4-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W5
may_start_successor: false
```

### 7.1 Mechanical trace

UA-W4-T2; CASE-UA-W4-001 (`SCN-UA-002`); CASE-UA-W4-002 (`SCN-UA-001`);
DEC-UA-011; DEC-UA-013; NC-UA-001/NC-UA-002 families (§7.4 V-C). Predecessor:
UA-W4-S003 (CASE-UA-W4-002 needles read the post-S003 file; §4 edge S003→S004).

### 7.2 Exact file transformation

CREATE `frontend/test/uphunt-aesthetic-w4.test.ts` with exactly the §7.3 bytes.
No other content, no extra test, no helper exports.

### 7.3 Exact required ending file content

The file is exactly (UTF-8, LF endings, single trailing newline; SHA-256
`8008501d5da4b946bd07ea05260400198c306e1cfb2741fec7ed3ff44a3832a7`):

```ts
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W4-001 landing page still imports and renders LandingHeroCopy", () => {
  assert.match(page, /import \{ LandingHeroCopy, LandingProcess \} from "@\/components\/landing-sections";/u);
  assert.match(page, /<LandingHeroCopy \/>/u);
  recordExecuted("CASE-UA-W4-001");
});

test("CASE-UA-W4-002 run-form-card uses the hairline border and radius-panel tokens", () => {
  assert.match(
    globals,
    /padding: 34px;\n  border: 1px solid var\(--color-line\);\n  border-radius: var\(--radius-panel\);/u,
  );
  assert.match(
    globals,
    /\.landing-hero \.run-form-card \{\n  min-height: 47rem;\n  padding: clamp\(1\.75rem, 2\.6vw, 2\.25rem\);\n  border: 1px solid var\(--color-line\);\n  border-radius: var\(--radius-panel\);/u,
  );
  assert.match(
    globals,
    /  \.run-form-card \{\n    padding: 23px 20px;\n    border-radius: var\(--radius-panel\);\n  \}/u,
  );
  assert.match(
    globals,
    /  \.landing-hero \.run-form-card \{\n    min-height: 0;\n    padding: var\(--space-5\) var\(--space-4\);\n    border-radius: var\(--radius-panel\);\n  \}/u,
  );
  assert.match(globals, /--color-signal:\s*#c8f04b/u);
  recordExecuted("CASE-UA-W4-002");
});
```

This content was dry-run validated by the window agent against the simulated
post-S003 state in the disposable location `/tmp/opencode/ua-w4-dryrun`
(S3 `EV-UA-W4-D-002`): 4 tests pass (2 × CASE-UA-W1 via the coverage import +
2 × CASE-UA-W4), 0 fail, and the generated executed set contained exactly the
4 expected IDs; the dry-run directory was then deleted.

### 7.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S003 accepted with ending digest `04df3d7e…` (recompute); `sha256sum app/page.tsx` == `3460751e…`; `test/uphunt-aesthetic-w4.test.ts` ABSENT; frontend porcelain == §3 protected paths + ` M app/globals.css`; coordination root clean | all true |
| V-B | `sha256sum test/uphunt-aesthetic-w4.test.ts` after writing §7.3 bytes | digest == `8008501d5da4b946bd07ea05260400198c306e1cfb2741fec7ed3ff44a3832a7` |
| V-C | Negative probes, in-memory copies via `node -e`, ZERO workspace writes: N1 (NC-UA-002 family): delete the `<LandingHeroCopy />` occurrence from an in-memory copy of page.tsx and re-apply the CASE-UA-W4-001 regexes → the render assertion must fail; N2 (NC-UA-001 family): in an in-memory copy of post-S003 globals.css revert the hunk-1 border line to `border: 1px solid rgba(18, 35, 30, 0.13);` → needle N1 regex must fail; N3 (NC-UA-001 family): in an in-memory copy revert the hunk-3 radius line to `border-radius: 17px;` → needle N3 regex must fail | all three probes falsified (each mutated copy fails its oracle) |
| V-D | From ABSENT executed-set state: `sha256sum test/.ua-executed.json` == `7d48ebc5…`; `mv test/.ua-executed.json /tmp/opencode/ua-w4-ua-executed-head-backup.json`; from `frontend/` run `node --experimental-strip-types --test test/uphunt-aesthetic-w4.test.ts`; read `test/.ua-executed.json`; then `mv /tmp/opencode/ua-w4-ua-executed-head-backup.json test/.ua-executed.json`; re-`sha256sum` | command exit 0; tests 4, pass 4, fail 0, skipped 0, with exactly the titles CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W4-001, CASE-UA-W4-002; json == exactly those 4 sorted IDs (§4.7 set digest `9be62b779af0cca77abf9544a3a59c21e36ed28e8f8b46d041980f9b4ea7fc9e`); post-restore digest == `7d48ebc5…` and `git status --porcelain` shows `test/.ua-executed.json` unmodified |
| V-E | `git status --porcelain` | attributable delta == `?? test/uphunt-aesthetic-w4.test.ts` exactly (plus the S003 ` M app/globals.css` and the protected §3 paths; no other path) |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W4-I001` G1–G9) |

Expected workspace write set: exactly
`{frontend/test/uphunt-aesthetic-w4.test.ts}` plus the prescribed disposable
`test/.ua-executed.json` backup/run/restore cycle of V-D, whose net ending delta
is zero (byte-identical restore is part of the check).

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

(S004 V3: required local coverage IDs = registered = executed =
{CASE-UA-W4-001, CASE-UA-W4-002} plus the 2 × CASE-UA-W1 registry re-executions
provoked by the import; zero skips, duplicates, or unexpected IDs; the 4-ID
executed-set digest `9be62b77…` is the witness. Full 43-set equality is
UA-W15-V5 only.)

## 8. Local and whole-window verification gates

Leaf-local gates: §6.4, §7.4. Frozen whole-window gates, executed only by
`UA-W4-I001` from `frontend/`, per `A4` §Gates, `A4` UA-W4 lifecycle, and
`DEC-UA-014`:

| Gate | Command / assertion | Expected |
|---|---|---|
| G1 | `npm test` | exit 0; 0 failed; both CASE-UA-W4-00x tests pass inside the run; expected total 166 passing = 162 predecessor (`EV-UA-A-032` G1) + 4 in the w4-file process (2 new + 2 registry re-executions via the import); actual recorded |
| G2 | `npx tsc --noEmit --incremental false --pretty false` (`DEC-UA-014` oracle) | PASS iff zero output lines contain any owned-path needle: `uphunt-aesthetic-w4.test.ts`, `page.tsx`, `run-form.tsx` (globals.css is not typechecked); expected remaining diagnostics: exactly the 10 parked SRC-UA-0092 lines in the five parked files; repo-wide exit 0 NOT required; parked files MUST NOT be edited |
| G3 | `npm run lint` | exit 0 (CSS/JSX owned this window) |
| G4 | browser evidence (`browser_evidence: true`): `/usr/bin/google-chrome --headless` screenshots of route `/` ONLY, at 390, 768, 1280, 1440, under `frontend/review-evidence/uphunt-aesthetic/UA-W4/` | 4 screenshots recorded; the route set is frozen to `{/}` (parent consequence 5); synthetic fixtures only; no credentials; local dev server processes only, under the §9 item 5 sandbox policy; this is local_e2e evidence, NOT a CASE oracle (SUB-UA-001) |
| G5 | coverage scope: required W4 window set (2 IDs, digest `ea7e02bc…`) = registered (two `test()` titles) = executed W4 IDs; after G1, `test/.ua-executed.json` is exactly the 12 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3} ∪ {2 × CASE-UA-W4} (§4.7 set digest `c433674b9c25f667483ff9b5024bc6c8a08fad2fb02e0dd04318c9dc9194fae1`); zero skips, duplicates, unexpected, or unactivated IDs in this window; full 43-set equality NOT asserted (`UA-W15-V5` owns it); the json is modified tracked runtime output (`d6121aa` residue) and is never committed | exact |
| G6 | `sha256sum` of `page.tsx`, `run-form.tsx`, `landing-sections.tsx`, `section-intro.tsx`, `uphunt-aesthetic-coverage.test.ts`, `uphunt-aesthetic-w2.test.ts`, `uphunt-aesthetic-w3.test.ts`; plus `git status --porcelain` and a forbidden-path negative search over the whole window delta (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`, `email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, the five parked test files, the coverage test file, `layout.tsx`, `sign-in/page.tsx`, `sign-up/page.tsx`, `header-auth.tsx`) | byte pins `3460751e…`, `72576044…`, `914c61e5…`, `159096f3…`, `f5137be4…`, `f65ba0c5…`, `635e2802…` all unchanged; implementation delta == exactly the two §4 planned files; the `globals.css` diff contains exactly the four §6.2 hunks and nothing else; the w4 test file digest == `8008501d…`; coordination artifacts limited to the enumerated §2 list; `A5`/`A6` digests unchanged by leaves |
| G7 | static inspection of the new test file imports (`node:test`, `node:assert/strict`, `node:fs/promises`, `node:url`, `./uphunt-aesthetic-coverage.test.ts`) + suite behavior | 0 network operations, 0 DB operations (`UA-W4-V3`) |
| G8 | personally re-execute the S004 §7.4 V-C probes N1/N2/N3 on fresh in-memory copies (tmp only, no workspace writes): NC-UA-002 family (render removal falsifies CASE-UA-W4-001) and NC-UA-001 family (border/radius reverts falsify CASE-UA-W4-002 needles) | all falsified |
| G9 | successor negative search: no `UA-W5` artifact of any kind (no `uphunt-aesthetic-w5.test.ts`, no lower-landing edits), `A5.current_window` still `UA-W4`, `next_window` untouched | `may_start_successor: false` honored; `UA-W4-H4/H6` hold |

PASS oracle for `UA-W4-I001`: G1–G9 all pass; `A4` `UA-W4-P1..P4`,
`UA-W4-V1..V5`, `UA-W4-H1..H5` then checked with resolvable evidence;
`frontend/review-evidence/uphunt-aesthetic/UA-W4_HANDOFF.md` written per §11.3;
`A5.current_status` set to `AWAITING_REVIEW`; STOP per `UA-W4-H6` (no `UA-W5`).
CORRECTION_REQUIRED oracle: any G-gate behavioral failure → §9 correction loop
with `UA-W4-C00n` (single-file, dependency-safe).
PARENT_BLOCKED oracle: missing parent decision, contradiction with `A1`–`A4`, or
required scope expansion (e.g., a defect that cannot be corrected without
editing `page.tsx`/`run-form.tsx`, an unowned `globals.css` selector,
`landing-sections.tsx`, `section-intro.tsx`, a parked file, or
`REQUIRED_CASE_IDS`).

## 9. Correction and re-assessment rules

1. Every correction is a new single-file sub-window `UA-W4-C00n` with a new
   assignment ID and baseline digest, citing: the failed evidence, exact root
   cause, the governing requirement and decision already determining the remedy,
   the earlier sub-window corrected, and the gates invalidated. Nothing is
   rewritten in place; `S3` is append-only.
2. `REQUIRED_CASE_IDS` and the coverage test file are NOT correctable at window
   level (`A5` prohibitions). A defect requiring changes there is
   `PARENT_BLOCKED`.
3. `page.tsx`, `run-form.tsx`, `landing-sections.tsx`, and `section-intro.tsx`
   are frozen (§0 consequences 1 and 6). A failing check that would require
   editing any of them, or an unowned `globals.css` selector, is
   `PARENT_BLOCKED`, never a frozen-file edit.
4. `globals.css` corrections are owned only for the four §6.2 hunks. A correction
   that would add or change any other declaration is `PARENT_BLOCKED`.
5. After the last correction the window agent personally runs a new assessment
   `UA-W4-I00n` (new ID), reusing unchanged gates by exact reference and
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

## 10. Mandatory authoring-readiness checklist (sub-window standard §11)

Evidence citations resolve into `S3` (`EV-UA-W4-D-001..003`).

### 10.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA-W4-D-001 (A5: ASG-UA-W4-01, UA-W4-WINDOW-AGENT, IN_PROGRESS, decompose action authorized; A5 digest cf8a54c7… recomputed)
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA-W4-D-001 (recomputed SHA-256 matches all pins incl. A4 `10543d6d…`)
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA-W4-D-003 (§2, §6–§8 of this S1)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA-W4-D-001 (§3 of this S1)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA-W4-D-003 (S1 spec / S2 state / S3 evidence paths)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA-W4-D-003 (leaf prohibited_actions; report-only-to-window-agent rule)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: EV-UA-W4-D-003 (§9 item 6 == A5 policy)

### 10.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA-W4-D-003 (§5 table; UA-W4-T1/T2; A4 test_registration CASE-UA-W4-001/002)
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA-W4-D-001 (§0 consequences close the remaining choices; current source already satisfies consequence 1 anchors: page.tsx import at line 1 / render at line 9; run-form.tsx className at line 98)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA-W4-D-002 (both = {frontend/app/globals.css, frontend/test/uphunt-aesthetic-w4.test.ts}; planned-file-set digest `e8825b8d8509f4f96e78186f47c08b9083022cf6e690e013eaeb568546990f1e`; page.tsx and run-form.tsx proven zero-edit preserved by §0 consequence 1)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: EV-UA-W4-D-003 (§4: S003/S004, one file each; S001/S002 slots retired unused for preserved files)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: EV-UA-W4-D-002 (§6.2 hunks with unique anchors; §6.3 forbidden edits; §7.3 bytes with pinned digest `8008501d…`; ending digest `04df3d7e…` simulated)
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: EV-UA-W4-D-003 (§4; no waves; S004 ordered after S003 by the CASE-UA-W4-002 needle dependency)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: EV-UA-W4-D-003 (§5.1: post-S003 needles N1..N4 with ending digest `04df3d7e…`; page.tsx bytes pinned `3460751e…`; recordExecuted pinned `f5137be4…`)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: EV-UA-W4-D-003 (§4.1 table)
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: EV-UA-W4-D-003 (css / test split across S003/S004; runtime json handled by prescribed disposable procedure, never a deliverable)
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: EV-UA-W4-D-003 (command lists in §6.4/§7.4; the only prescribed non-writable touch is the V-D json backup/run/restore with net-zero delta; tsc leaf runs are not scheduled — tsc is an I001 gate)

### 10.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7 of the standard. Evidence: EV-UA-W4-D-003 (§6, §7 yaml blocks; 15/15 field-presence lint)
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: EV-UA-W4-D-003 (byte-exact §6.2 with unique anchors and occurrence counts; §7.3 full file bytes pinned by digest)
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: EV-UA-W4-D-003 (§6.4, §7.4)
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: EV-UA-W4-D-003 (V-E rows in §6.4/§7.4; V-D net-zero json restore proof)
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: EV-UA-W4-D-003 (§11 templates; H3 rows)
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: EV-UA-W4-D-003 (leaf prohibited_actions)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: EV-UA-W4-D-003 (each leaf's LOCAL_NOW set passes standalone — S003 by digest pin, S004 by the V-D w4-only run; whole-window gates deferred and named)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: EV-UA-W4-D-003 (DEF rows → UA-W4-I001)

### 10.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: EV-UA-W4-D-003 (§5; 2 cases → S004 with §7.3 bytes)
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: EV-UA-W4-D-003 (§7.4 V-D; §8 G5)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: EV-UA-W4-D-003 (NC-UA-002/001-family probes at S004 leaf level (V-C N1–N3) with I001 G8 personal re-execution; S003 integrity enforced by the ending-digest pin)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: EV-UA-W4-D-003 (SUB-UA-001 inherited: UTF-8 file reads are source-text oracles only; no computed-pixel claim; screenshots are local_e2e evidence, not oracles; coverage and w2/w3 test files never weakened here)
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: EV-UA-W4-D-003 (§12: authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: EV-UA-W4-D-003 (§8; G4 scheduled at I001 per browser_evidence true)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: EV-UA-W4-D-003 (§9)
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: EV-UA-W4-D-003 (§12 assigned WINDOW-AGENT; §9 item 7)
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: EV-UA-W4-D-003 (§8 G5/G6/G8; §7.4 V-B/V-D)
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: EV-UA-W4-D-003 (§11.3)
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: EV-UA-W4-D-003 (§9 item 6)

### 10.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA-W4-D-003 (`UA-W4-S003`, `UA-W4-S004`, `UA-W4-I001` unique; S001/S002 retired with documented mapping; CASE/DEC/SCN/NC IDs cite A3/A4)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA-W4-D-003 (S1 contains only concrete paths, digests, bytes, counts)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA-W4-D-003 (exact-set comparisons in §6.4 V-E and §7.4 V-E; prescribed disposable `.ua-executed.json` cycle excluded by the net-zero restore proof)
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: EV-UA-W4-D-002 (SW-D03 set equality is the failure detector)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: EV-UA-W4-D-003 (§7.3 two tests each call recordExecuted after its oracle; §8 G5 counts; A4 §Enforcement 1–4 inherited)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: EV-UA-W4-D-003 (byte-pinned §6.2 hunks and §7.3 content; any divergence changes the ending digests reviewed at I001; accepted tests untouched)
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: EV-UA-W4-D-003 (leaf prohibited_actions + §4.6 proofs via V-E rows)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: EV-UA-W4-D-003 (§9 items 1, 7)
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: EV-UA-W4-D-003 + S2 `decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`, leaves `assigned_agent: UNASSIGNED`
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA-W4-D-003 (15/15 required fields per FILE block; 0 unresolved references)
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: EV-UA-W4-D-003 (§9 item 6)

## 11. Handoff templates

### 11.1 Leaf completion certificate (returned by each leaf agent)

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W4
subwindow_id: UA-W4-S003 | UA-W4-S004
assignment_id: ASG-UA-W4-01-S003 | ASG-UA-W4-01-S004
agent_identity: exact identity
writable_file: exact path from §6/§7
starting_file_digest: 325a442b… | ABSENT
ending_file_digest: 04df3d7e… | 8008501d…
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
attributable_changed_file_set: [writable file only]
required_local_cases: [] | [CASE-UA-W4-001, CASE-UA-W4-002]
registered_local_cases: same as required_local_cases
executed_local_cases: [] | [CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W4-001, CASE-UA-W4-002] (V-D w4-only run; the 2 W1 IDs are registry re-executions via the import)
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 0 | 3
negative_controls_falsified: 0 | 3
commands: []
deferred_integration_checks: [UA-W4-I001 gates per §8]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

### 11.2 Window-agent integration certificate (appended to `S3` by `UA-W4-I001`)

The §12.4 certificate of the sub-window standard, adapted: `integration_assessment_id:
UA-W4-I001`; `accepted_initial_subwindows` from leaf reviews; `expected_changed_file_set`
= the two §4 planned files; `required_case_count: 2` (window-local; the 43-ID registry
equality is UA-W15-V5); `registered_case_count: 2`; `executed_case_count: 2` window-local
(plus 2 W1 + 8 predecessor IDs re-executed in the full run); `required_case_set_digest:
ea7e02bc33cc8ad7d247c60e5d300a3a83ac02814866ca2c97bbfc4fa3ead715`; registered/executed
digests computed with the §4.7 formula over the same IDs; post-G1 executed-set digest
`c433674b9c25f667483ff9b5024bc6c8a08fad2fb02e0dd04318c9dc9194fae1`; `status:
READY_FOR_PARENT_REVIEW` only per the §8 PASS oracle.

### 11.3 Consolidated parent handoff

`frontend/review-evidence/uphunt-aesthetic/UA-W4_HANDOFF.md` per `A4` handoff
template and sub-window standard §12.5: objective; status
`READY_FOR_PARENT_REVIEW` or one exact blocker; changed-file set +
starting/ending SHA-256s (including the preserved `page.tsx` `3460751e…` and
`run-form.tsx` `72576044…` and unchanged predecessors); CASE
required/registered/executed/skipped/duplicate/unexpected (2/2/2/0/0/0
window-local; 2 additional registry IDs re-executed via import; full 43-set
equality deferred to UA-W15); required-set digest `0d14982c…` (registry) and
W4-set digest `ea7e02bc…`; commands and outcomes; browser-evidence file list
under `frontend/review-evidence/uphunt-aesthetic/UA-W4/`; sandbox recoveries; NC
results; forbidden-path negative search; `S1`/`S2`/`S3` paths and revisions;
the tracked `.ua-executed.json` residue disclosure (12-ID content, uncommitted);
confirmation that `UA-W5` was not started.

## 12. Initial integration assessment `UA-W4-I001` (fully authored now)

```yaml
subwindow_id: UA-W4-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W4
parent_assignment_id: ASG-UA-W4-01
assigned_agent: WINDOW-AGENT (UA-W4-WINDOW-AGENT, personally executed, never delegated)
predecessors: [UA-W4-S003, UA-W4-S004]
authorized_write_file: NONE (implementation files; coordination artifacts per §2 only)
input: assembled UA-W4 state after UA-W4-S004 is accepted
gates: §8 table G1–G9 (frozen)
pass_oracle: G1..G9 pass; G4 executed and recorded (browser_evidence true)
correction_oracle: any behavioral gate failure -> §9 loop with UA-W4-C00n
parent_blocked_oracle: missing decision / contradiction / scope expansion (incl. §9 items 2–4)
execution_policy: E8.1 sandbox escalation + one identical recovery (§9 item 6)
may_start_successor: false
```

Accepted-subwindow and digest fields are filled from completed leaf evidence at
run time; the gate set above is frozen now (sub-window standard §9.1).

## 13. Self-falsification (sub-window standard §14)

Before declaring readiness the window agent verified the document rejects each
applicable counterexample (rejection mechanism in parentheses):

1. sub-window names two writable files (§6/§7 yaml `writable_file` single path; SW-E04 V-E exact-set proofs) — rejected.
2. sub-window names a directory/wildcard (canonical file paths only; SW-R03) — rejected.
3. a command creates an unplanned second workspace file (command lists enumerated; the only non-writable touch is the §7.4 V-D json cycle with prescribed net-zero restore) — rejected.
4. source and test file assigned together (css leaf S003 and test leaf S004 are separate; SW-D09) — rejected.
5. a required parent file is absent from the decomposition (SW-D03 set equality over §2 scope; preserved page.tsx/run-form.tsx pinned by G6) — rejected.
6. two initial sub-windows own the same file (S003≠S004 files; SW-D04) — rejected.
7. a dependent file begins before its interface is frozen (§5.1 needles + ending digest frozen before S004 dispatch; SW-D07) — rejected.
8. an intermediate state has an unexplained test failure (§4.1 table: no permitted check fails in either row; unexpected failures stop the sequence) — rejected.
9. a subagent starts its successor (`may_start_successor: false` in both blocks; H3) — rejected.
10. a subagent communicates directly with the parent (prohibited_actions; H2) — rejected.
11. the window agent repairs implementation during review (§9 item 7) — rejected.
12. an integration failure produces no diagnosed one-file correction (§9 items 1, 5) — rejected.
13. a correction silently rewrites a completed sub-window (§14 append-only amendments; §9 item 1) — rejected.
14. acceptance omits/skips/duplicates/filters/unactivates a required case (§8 G5 counts + digests; §7.4 V-D) — rejected.
15. an oracle is weakened to accommodate current behavior (byte-pinned hunks and file content; any divergence changes reviewed digests; SW-R06) — rejected.
16. a test substitute proves more parity than its fidelity supports (SUB-UA-001 inherited: source-text oracles; screenshots are local_e2e only; SW-V04) — rejected.
17. a costly gate is repeated without its scheduling rule (§8 gates scheduled at I001 only; DEF rows name the owner) — rejected.
18. a correction changes a file but dependent evidence is reused without proof (§9 item 5 rerun list) — rejected.
19. the assembled changed-file set differs from the planned set or exceeds parent scope (§8 G6 delta + forbidden-path search; SW-D03) — rejected.
20. the window agent claims parent acceptance or begins UA-W5 (§8 PASS oracle stops at READY_FOR_PARENT_REVIEW + A5 AWAITING_REVIEW; G9) — rejected.
21. an already-authorized local gate is escalated to the parent merely for sandbox privilege (§9 item 6 E8.1 policy) — rejected.
22. a changed command, observable failure, surviving process, or mutation is accepted as automatic sandbox recovery (§9 item 6 recovery preconditions) — rejected.
23. parallel leaves overlap dependencies/resources or the next wave starts early (no waves authorized; §4 single sequential order) — rejected.

## 14. Append-only amendment sections

Reserved for corrective sub-windows (`UA-W4-C001`, …) and further assessments
(`UA-W4-I002`, …). Each amendment repeats the §6 block structure in full with a
new ID, new baseline digest, cited trigger evidence, and invalidated gates.
Existing sections above are immutable after parent approval.
