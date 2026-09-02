# UA-W3 frozen sub-window decomposition checklist (`S1`)

Subordinate artifact `S1` of parent window `UA-W3` under assignment `ASG-UA-W3-01`.
Companion artifacts: `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W3_SUBWINDOW_STATE_S2.yaml`
and `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W3_SUBWINDOW_EVIDENCE_S3.md`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

This file is frozen once the parent approves the decomposition. Corrections are appended
in §15 with new IDs; existing blocks are never rewritten.

## 0. Parent-frozen mechanical consequences (copied from the assignment; not reopened)

The parent froze the following consequences in `A6` `EV-UA-A-029`
(`parent_frozen_mechanical_consequences`). They are copied here verbatim and are
outside decomposition authority:

1. AuthForm and not-found wrap titles with SectionIntro using DEC-UA-003 exact
   strings, including periods: sign-in eyebrow "StoreSignal account", title
   "Welcome back.", copy "Sign in to continue a pending search or return to
   earlier runs."; sign-up eyebrow "StoreSignal account", title "Save your
   search.", copy "Create an account to start the search you just prepared and
   keep every run in one place."; 404 eyebrow "404 · Not found", title "That
   lead run does not exist.", copy "The address may be incomplete, or the run
   ID may be invalid."
2. Do not add props to SectionIntro. Remove auth-form `aria-labelledby="auth-title"`
   and `h1 id="auth-title"` because SectionIntro cannot take an id; implicit
   heading labelling is the SectionIntro h2.
3. CSS edits may only set properties named by UA-W3-T1 or retarget existing
   declarations after the h1->SectionIntro h2 wrap. Named: `.auth-card` padding
   `var(--space-6)`; owned cards/header/404 radius `var(--radius-panel)` (keep if
   already present); `.site-header` remains `position: sticky`. Unnamed
   declarations stay byte-identical. After the wrap, retarget existing
   `.auth-card h1` / `.auth-card-header h1` / `.auth-card-header > p` /
   `.fatal-card h1` / `.fatal-card p` declarations onto the corresponding
   `.marketing-heading h2` / `p` selectors with the same values; do not invent
   new values.
4. Do not change authClient calls, form fields, Link hrefs, or layout.tsx children.
5. CASE-UA-W3-001..004 live in `test/uphunt-aesthetic-w3.test.ts`.
   `browser_evidence: true` is a later `UA-W3-I001` obligation, not a
   decomposition write. G2 is DEC-UA-014 (zero tsc diagnostics on owned paths).

## 1. Inherited authority and revision pins

| Pin | Value |
|---|---|
| Parent window | `UA-W3` |
| Parent assignment | `ASG-UA-W3-01` |
| Window agent | `UA-W3-WINDOW-AGENT` |
| Parent standard | `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` |
| Sub-window standard | `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` |
| Contract `A1` | `a33ae1d8af4442de2680dc70f2c6e793a668b1400f0814833489061848c9baef` |
| Decision `A3` | `8faaa4e2411235d8a83ec94de6a07e53c54ece91d99121a3c0e09cb6052f4300` |
| Checklist `A4` | `79816d332d8d54159cd1329d002bda38242147dee105638f90d089f3ff701486` |
| Active state `A5` (file digest) | `f843f58f3e6deebc85853b2d70b9d1f928b38daee89dc05bd411ee841829287e` (state_version 7) |
| Required coverage set (43 IDs, E6) | `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` (A4 §Coverage pin; asserted by CASE-UA-W1-002) |
| Predecessor output `frontend/components/section-intro.tsx` | `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175` (recomputed 2026-09-02; matches A6 EV-UA-A-028 pin) |
| Predecessor output `frontend/test/uphunt-aesthetic-coverage.test.ts` | `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` (recomputed 2026-09-02; matches A6 EV-UA-A-028 pin) |
| Protected predecessor `frontend/components/landing-sections.tsx` | `914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15` (recomputed 2026-09-02; unchanged) |
| Protected predecessor `frontend/test/uphunt-aesthetic-w2.test.ts` | `f65ba0c50c78ef983496d0a37af1a1a6a1234332c48a5290bc344c9a5e68b78c` (recomputed 2026-09-02; unchanged) |
| `A5` authorized_windows | `[UA-W3]` |
| `A5` may_start_successor | `false` |
| Successor `UA-W4` | reserved for parent; NOT authorized (`A5` prohibited `start_UA-W4`) |

All pins recomputed 2026-09-02 by `UA-W3-WINDOW-AGENT` and matched byte-exact
(S3 `EV-UA3-D-001`, `EV-UA3-D-002`). Root `ACTIVE_EXECUTION_STATE.md` is out of
authority and untouched (coordination root `git status --porcelain` is clean,
S3 `EV-UA3-D-002`).

## 2. Parent-window scope and exclusions (copied, no expansion)

From `A4` §UA-W3 F1 and `A5` `authorized_write_scope`:

- Objective: header, auth pages, and 404 use the landing headline recipe and
  existing tokens (`A4` §UA-W3).
- Window write scope (implementation, exactly five authorized paths):
  `frontend/components/app-header.tsx`,
  `frontend/components/auth-form.tsx`,
  `frontend/app/not-found.tsx`,
  `frontend/app/globals.css` (owned selectors only, §2.1 below),
  `frontend/test/uphunt-aesthetic-w3.test.ts`.
- Planned changed-file set (§4): exactly four files — `auth-form.tsx` (MODIFY),
  `not-found.tsx` (MODIFY), `globals.css` (MODIFY), `uphunt-aesthetic-w3.test.ts`
  (CREATE). `app-header.tsx` is in scope but has zero required edits: no
  UA-W3 task prescribes a header JSX edit, `.site-header` is already
  `position: sticky` in CSS, and CASE-UA-W3-003 asserts its existing class. It is
  a PRESERVED in-scope file pinned at digest
  `050da7c4a8835e9421d9a9621bba748c17398204a6ae1347fd1c8c4ca942c2a1`; gate G6
  asserts it stays byte-identical. Required changed-file set = planned set
  (S3 `EV-UA3-D-002`).
- Shared-file scope for `frontend/app/globals.css` (owned selectors only):
  `.site-header`, `.header-inner`, `.brand`, `.brand-mark`, `.site-nav`,
  `.header-actions`, `.header-meta`, `.header-link`, `.auth-page`, `.auth-card`,
  `.auth-card-header`, `.state-page`, `.fatal-card`. No other selector may be
  edited. Unowned selectors (including `.marketing-heading`, `.eyebrow`,
  `.auth-card-footer`, `.header-auth`, `.auth-submit`, `.signal-dot`,
  `.auth-switch`) stay byte-identical.
- Read-only scope (window): `frontend/components/section-intro.tsx`,
  `frontend/components/header-auth.tsx`, `frontend/app/sign-in/page.tsx`,
  `frontend/app/sign-up/page.tsx`, `frontend/app/layout.tsx`.
- Window-agent coordination writes (never implementation): `S1`, `S2`, `S3` (this
  decomposition), `A6` append-only, `A4` `UA-W3-P*`/`UA-W3-T*`/`UA-W3-V*`/`UA-W3-H*`
  checkboxes only, `frontend/review-evidence/uphunt-aesthetic/UA-W3_HANDOFF.md`,
  screenshots under `frontend/review-evidence/uphunt-aesthetic/UA-W3/` (headless
  chrome only, after the parent accepts this decomposition), and at handoff only
  `A5.current_status: AWAITING_REVIEW`.
- Authorized actions: `modify_jsx_css`, `create_w3_test_file`,
  `run_frontend_unit_tests`, `run_frontend_npm_test`, `run_npx_tsc_noEmit`,
  `run_npm_run_lint` (CSS/JSX owned this window), `run_headless_chrome_browser_evidence`
  (I001 only); window-agent assessment and coordination writes above; sandbox
  escalation per the E8.1 policy in §11 item 5.
- Prohibited: `change_authClient_calls`, `edit_layout_tsx_children`,
  `edit_sign_in_or_sign_up_pages`, `edit_header_auth`, `edit_section_intro`,
  `edit_unowned_globals_css_selectors`, `add_dependency`, `edit_REQUIRED_CASE_IDS`,
  `edit_uphunt-aesthetic-coverage_test`, `edit_parked_SRC-UA-0092_test_files`
  (`test/keyword-intelligence-api.test.ts`, `test/keyword-intelligence-components.test.ts`,
  `test/keyword-intelligence-inventory.test.ts`, `test/landing-keyword-auth-flow.test.ts`,
  `test/my-runs-research-resume.test.ts`), `edit_unowned_app_or_component_files`,
  `start_UA-W4`, `may_start_successor`, `aws`, `commit`, `push`, `production`,
  `paid_provider`, `edit_email_scraper`, `edit_root_ACTIVE_EXECUTION_STATE`.
- `npm run build` is a UA-W15-only gate.

## 3. Starting working-tree inventory (recorded 2026-09-02T10:32:00+05:30, read-only)

Repository: `/home/harit/Email Scrapper/frontend` (git toplevel, HEAD `d6121aa` "W2").
Coordination root `/home/harit/Email Scrapper` is a separate git repository and
reported a clean `git status --porcelain` (root `ACTIVE_EXECUTION_STATE.md` untouched).

Starting changed-file set (frontend repo, `git status --porcelain`, sorted):

1. ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml` — assignment
   fields written by parent for `ASG-UA-W3-01`; starting file digest
   `f843f58f3e6deebc85853b2d70b9d1f928b38daee89dc05bd411ee841829287e`; PROTECTED
   (no leaf writes; only the handoff action `set_A5_AWAITING_REVIEW_on_handoff`
   may touch it later, never a leaf).
2. ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` — append-only evidence;
   window-agent append-only; PROTECTED against leaf writes.

Starting repository change set digest (§4.7 formula over the two paths above):
`e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450`.

Starting state of planned and preserved files (all recomputed 2026-09-02):

- `frontend/components/auth-form.tsx`: present, clean, digest
  `54b6bde1a85b398f57b330988135ac57a0030c2697c5edb0b8c55de75f296bf2`; contains
  `<h1 id="auth-title">` (line 58), `aria-labelledby="auth-title"` (line 55), and
  the legacy sign-in copy string (line 62) that UA-W3 replaces.
- `frontend/app/not-found.tsx`: present, clean, digest
  `d35117bd611c5e0315ac263e6220a84005a7f1f208dcf09e15adec2dd405afe4`; contains the
  eyebrow/h1/p triple (lines 8–10) that UA-W3 wraps.
- `frontend/app/globals.css`: present, clean, digest
  `7df1646d8b4d834ebd6d5cf95f1f0bcf77f351e1b84d2ebfcb9e4314bc79f407`; 8393 lines;
  owned-selector rule locations listed in §8.2.
- `frontend/test/uphunt-aesthetic-w3.test.ts`: ABSENT.
- `frontend/components/app-header.tsx` (preserved, in scope, zero edits): digest
  `050da7c4a8835e9421d9a9621bba748c17398204a6ae1347fd1c8c4ca942c2a1`.
- Predecessors and protected files: `section-intro.tsx` `159096f3…`,
  `landing-sections.tsx` `914c61e5…`, `header-auth.tsx` `b2bccd42b477405df7247c8df6534488a9bd3f92af57aee19d7e452fb4076657`,
  `test/uphunt-aesthetic-coverage.test.ts` `f5137be4…`, `test/uphunt-aesthetic-w2.test.ts`
  `f65ba0c5…`; `frontend/test/.ua-executed.json` ABSENT (generated untracked
  runtime state; never committed).

Environment: node `v24.14.1`; `frontend/package.json` `test` =
`node --experimental-strip-types --test test/*.test.ts`, `lint` = `eslint`;
`tsconfig.json` `incremental: true`, `allowImportingTsExtensions: true`,
`paths: {"@/*": ["./*"]}`; `*.tsbuildinfo` is git-ignored tool state (leaves run
tsc with `--incremental false` so no tsbuildinfo is written).

## 4. Initial single-file dependency DAG and intermediate-state contracts

```text
UA-W3-S001 (FILE, modify frontend/components/auth-form.tsx)   ─┐
UA-W3-S002 (FILE, modify frontend/app/not-found.tsx)          ─┤
                                                               ├-> UA-W3-I001
UA-W3-S003 (FILE, modify frontend/app/globals.css)  <──────────┘        (INTEGRATION_ASSESSMENT)
UA-W3-S004 (FILE, create frontend/test/uphunt-aesthetic-w3.test.ts)
```

Sequential execution order (default one-active-leaf lifecycle; no parallel waves
authorized by `A5`): S001, then S002, then S003, then S004, then I001.

- Edge S001→S003 and S002→S003: parent-frozen consequence 3 orders the CSS
  retarget AFTER the h1->SectionIntro h2 wraps; S003 therefore depends on both
  wraps having landed.
- Edge S001→S004 and S002→S004: CASE-UA-W3-001/002 assert the S001 bytes;
  CASE-UA-W3-004 asserts the S002 bytes; the S004 file must read the wrapped
  sources.
- Edge S003→S004: S004's CASE-UA-W3-003 reads `globals.css`; the leaf sequence
  presents the assembled production state before the test leaf runs. (The
  CASE-UA-W3-003 oracle asserts only pre-existing token bytes, so it would pass
  at any point; the ordering is scheduling, not an interface dependency.)
- Edge S004→I001: whole-window gates require all four files assembled.
- S001 and S002 are mutually independent (no shared interface); their order is a
  scheduling choice under §0.3. No planned file consumes an interface produced
  inside this window; the only consumed cross-file interfaces are predecessor
  outputs (§5.1).

### 4.1 Intermediate-state contracts

| After | Permitted checks | Expected temporary state | Why safe | Resolved by | Prohibited while pending |
|---|---|---|---|---|---|
| S001 accepted | S001 §6.4 only; `npx tsc --noEmit --incremental false --pretty false` output limited to the 10 parked SRC-UA-0092 diagnostic lines in the five parked files; ZERO lines containing `auth-form` | auth card title/copy render as SectionIntro output; the dead `.auth-card h1` / `.auth-card-header h1` / `.auth-card-header > p` rules no longer match, so `.marketing-heading h2`/`p` landing-scale rules (line 5201/5215) apply temporarily inside the auth card; header strip padding retained | local workspace only; no deployment or external surface; no CASE test runs at leaf level (`npm test` prohibited at leaves); no permitted check fails in this state | S003 retargets restore the frozen title/copy values inside auth and 404 surfaces | editing `globals.css`, `not-found.tsx`, or the test file from S001; running `npm test`; successor work |
| S002 accepted | S002 §7.4 only; same tsc expectation with ZERO lines containing `not-found` | same temporary type-scale shift on the 404 card | same as above | S003 | editing `globals.css` or the test file from S002; running `npm test`; successor work |
| S003 accepted | S003 §8.4 only; tsc expectation unchanged (CSS is not typechecked) | retargeted selectors live; auth/404 title/copy render the frozen values; `.marketing-heading` block margins apply inside the two cards (owned by UA-W5, not editable here — accepted frozen outcome) | same as above | S004 | editing the test file from S003; running `npm test`; successor work |
| S004 accepted | S004 §9.4 only; whole-window gates remain PENDING | `.ua-executed.json` regenerated then removed by prescribed cleanup; repo delta = the four planned files only | test file is not imported by app code | I001 | any second-file edit; successor work |

Unexpected failures at any row stop the sequence for diagnosis (no silent
progression). No permitted intermediate check is expected to fail.

## 5. Exact allocation of requirements, decisions, interfaces, and coverage cases

Parent trace for `UA-W3` (all IDs from `A1`/`A3`/`A4`):

| Parent ID | Allocated to | Terminal anchor |
|---|---|---|
| REQ-UA-001 (`SCN-UA-001`) | `UA-W3-S004` CASE-UA-W3-003 | `className="site-header"` in `app-header.tsx` (preserved bytes) + `--color-signal: #c8f04b` token assertion |
| REQ-UA-002, REQ-UA-007 (`SCN-UA-002`) | `UA-W3-S001` CASE-UA-W3-001/002; `UA-W3-S002` CASE-UA-W3-004 | exact DEC-UA-003 strings inside the S001/S002 SectionIntro wraps |
| INV-UA-001 (`NC-UA-005`) | `UA-W3-I001` gate G6 | forbidden-path negative search over the window diff |
| DEC-UA-002 | S001/S002 imports; CASE-UA-W3-001/004 import assertions | `import { SectionIntro } from "@/components/section-intro";` exactly once per file; no SectionIntro prop changes |
| DEC-UA-003 | S001/S002 §6.3/§7.3 bytes | sign-in / sign-up / 404 eyebrow-title-copy strings byte-exact including periods |
| DEC-UA-006 | `UA-W3-I001` gate G6 | DEC forbidden paths absent from diff |
| DEC-UA-007 | window ID grammar `UA-W3-S00x`/`UA-W3-I001` | this `S1` |
| DEC-UA-011 | S004 `recordExecuted` import + call-after-witness ordering | four `recordExecuted` calls, each after its oracle |
| DEC-UA-013 | leaf preflights P1/P2 | git status before/after (frontend + coordination root) |
| DEC-UA-014 | `UA-W3-I001` gate G2 | zero diagnostic lines on the owned-path needles |
| UA-W3-T1 | `UA-W3-S003` §8 | the seven prescribed replacements incl. `.auth-card` padding `var(--space-6)`; sticky + radius keep-if-present assertions |
| UA-W3-T2 | `UA-W3-S001` §6; `UA-W3-S002` §7 | SectionIntro wraps with DEC-UA-003 strings; no Link href changes; no authClient/form-field changes |
| UA-W3-T3 | `UA-W3-S004` §9 | four tests, CASE-UA-W3-001..004 |
| SCN-UA-001 | CASE-UA-W3-003 | site-header + token witnesses |
| SCN-UA-002 | CASE-UA-W3-001, CASE-UA-W3-002, CASE-UA-W3-004 | headline witnesses |
| NC-UA-001 | S004 §9.4 N3 + `UA-W3-I001` G8 | removing `--color-signal` makes the CASE-UA-W3-003 oracle fail |
| NC-UA-002 | S001 §6.4 N1 + S002 §7.4 N1 + S004 §9.4 N1/N2 + `UA-W3-I001` G8 | deleting a SectionIntro title node makes the CASE oracles fail |

The remaining 39 coverage CASE IDs belong to later windows per the
`test_registration` column of `A4` §Coverage; they are not `UA-W3` required
changed files. Window-required local case set = {CASE-UA-W3-001, CASE-UA-W3-002,
CASE-UA-W3-003, CASE-UA-W3-004}, §4.7 set digest
`25e6c1d7ca199a383069570b7a083e57b39c8f81b32b7f4c02b7aaa04bea470f`.

### 5.1 Frozen cross-file interfaces (inherited; restated)

- `SectionIntro` — produced by `UA-W2-S001`, frozen in `UA-W2` `S1` §5.1, pinned
  at file digest `159096f3…`. Import form for consumers:
  `import { SectionIntro } from "@/components/section-intro";`. Props
  `eyebrow?: ReactNode; title: ReactNode; copy?: ReactNode; inverse?: boolean`;
  root `div.className` = `marketing-heading` (plus `" is-inverse"` iff
  `inverse === true`); renders eyebrow span iff defined, always `<h2>{title}</h2>`,
  copy `<p>` iff defined. UA-W3 consumes it read-only: NO prop changes, no
  section-intro.tsx edits.
- `recordExecuted(id: string): void` — produced by `UA-W1-T1`, pinned at file
  digest `f5137be4…`. S004 imports it from
  `./uphunt-aesthetic-coverage.test.ts` and calls it exactly once per test, after
  that test's assertions.
- CSS retarget rule (frozen by parent consequence 3): each retargeted selector is
  the source selector with `h1` replaced by `.marketing-heading h2` / bare `p`
  replaced by `.marketing-heading p`, keeping the original combinator depth
  relation to the owned card/header scope (descendant form), with declaration
  bodies byte-identical. The complete frozen selector map is §8.2.

## 6. Initial implementation sub-window `UA-W3-S001`

```yaml
subwindow_id: UA-W3-S001
type: FILE
parent_window_id: UA-W3
parent_assignment_id: ASG-UA-W3-01
assigned_agent: UNASSIGNED
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/auth-form.tsx
file_operation: MODIFY
starting_file_digest: 54b6bde1a85b398f57b330988135ac57a0030c2697c5edb0b8c55de75f296bf2
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md
  - frontend/components/section-intro.tsx
authorized_actions:
  - apply_the_three_ordered_edits_below
  - run_npx_tsc_noEmit_incremental_false_as_file_local_check
  - run_read_only_node_inspection_of_writable_file
  - run_in_memory_negative_control_probe_N1
  - record_git_status_preflight_and_postcondition
prohibited_actions:
  - edit_any_workspace_file_other_than_writable_file
  - edit_globals_css_or_not_found_or_any_test_file
  - edit_section_intro_tsx_or_add_props_to_it
  - change_authClient_calls_form_fields_or_Link_hrefs
  - edit_layout_tsx_sign_in_or_sign_up_pages_or_header_auth
  - edit_parked_SRC-UA-0092_test_files
  - edit_uphunt-aesthetic-coverage_test_or_REQUIRED_CASE_IDS
  - edit_A4_A5_A6_S1_S2_S3_or_any_authority_artifact
  - npm_install_or_any_format_fix_generate_build_command
  - run_npm_test_or_npm_run_lint
  - communicate_with_parent_agent
  - start_successor_or_corrective_work
  - aws
  - commit
  - push
  - production
  - paid_provider
  - edit_email_scraper
  - edit_root_ACTIVE_EXECUTION_STATE
may_start_successor: false
```

### 6.1 Mechanical trace

- Requirements: REQ-UA-002, REQ-UA-007. Decisions: DEC-UA-002 (consume
  SectionIntro unchanged), DEC-UA-003 (exact auth strings), DEC-UA-013 (preflight);
  parent-frozen consequences 1 and 2.
- Task: UA-W3-T2 (auth half). Scenario/coverage: SCN-UA-002 → CASE-UA-W3-001 and
  CASE-UA-W3-002 (registered and executed by S004; this leaf produces the asserted
  bytes). Negative control: NC-UA-002 (probe N1).
- Every requirement terminates in file bytes asserted by CASE-UA-W3-001/002.

### 6.2 Exact file transformation

1. Source anchor A (import block, exact bytes):
   `import { authClient } from "@/lib/auth/client";`
2. Source anchor B (section open tag, exact bytes):
   `<section className="auth-card ds-card ds-card--floating" aria-labelledby="auth-title">`
3. Source anchor C (the exact 9-line header block from
   `        <header className="auth-card-header">` through the matching
   `        </header>`, lines 56–64 in the starting file).
4. Ordered edits, exactly three, in this order (each old string occurs exactly
   once in the starting file). Edit 1 adds one line; Edit 3 replaces 9 lines
   with 11 lines:
   - Edit 1: replace anchor A with the two lines
     `import { SectionIntro } from "@/components/section-intro";`
     `import { authClient } from "@/lib/auth/client";`
   - Edit 2: replace anchor B with
     `<section className="auth-card ds-card ds-card--floating">`
   - Edit 3: replace anchor C with the exact 11-line block in §6.3.
5. Complete signatures: none added or changed; the consumed symbol is the §5.1
   frozen `SectionIntro` interface; no props are added to it.
6. Imports/exports/consumers affected: this file gains the SectionIntro import;
   its export `AuthForm` and all other imports are unchanged; consumers
   `sign-in/page.tsx` and `sign-up/page.tsx` (read-only) keep rendering
   `<AuthForm mode=... />` unchanged.
7. Operation ordering / transaction class: `SAME_ATOMIC_BOUNDARY` of one file
   edit (all three edits inside one write); rollback = restore the file to
   digest `54b6bde1a85b398f57b330988135ac57a0030c2697c5edb0b8c55de75f296bf2`.
8. Failure outcomes: if any LOCAL_NOW check fails or probe N1 fails to fail,
   stop and report `AWAITING_WINDOW_REVIEW` with the failure captured; no retry;
   no second file edit. Duplicate/restart/concurrency/cancellation: N/A (single
   idempotent file edit; this leaf writes no runtime state).
9. Preserved behavior/content: every `authClient` call, form field, state hook,
   handler, `Link` href, button label, and footer line byte-identical; every
   other line of the file byte-identical; `mode` semantics unchanged.
10. Obsolete behavior removed: the `h1 id="auth-title"` element and the
    `aria-labelledby="auth-title"` attribute; the legacy periodless strings
    `"Save your search"` / `"Welcome back"` and the legacy sign-in copy
    `"Sign in to continue your pending search or return to your previous runs."`.
11. Resulting interface exposed to successors: unchanged export `AuthForm`; the
    rendered card now contains `.auth-card-header > .marketing-heading` with the
    DEC-UA-003 strings (S003 retargets the CSS onto it).
12. Forbidden edits within the writable file: anything other than Edits 1–3; no
    comments; no new components; no `id` on the SectionIntro; no reformatting.

### 6.3 Exact required ending content of the replaced block (Edit 3) and expected ending digest

The exact 11-line replacement for source anchor C (indentation is part of the
bytes; two-space steps inside the JSX attribute):

```tsx
        <header className="auth-card-header">
          <SectionIntro
            eyebrow="StoreSignal account"
            title={isSignUp ? "Save your search." : "Welcome back."}
            copy={
              isSignUp
                ? "Create an account to start the search you just prepared and keep every run in one place."
                : "Sign in to continue a pending search or return to earlier runs."
            }
          />
        </header>
```

With Edits 1–3 applied to the starting file, the window agent simulated the
ending file (S3 `EV-UA3-D-003`): expected ending digest
`efffc7b883268418e26e3ecb3d12e72036cae8093448eb87a4cf0d68d8905119`
(108 lines). The leaf's ending file MUST be byte-identical to that simulation:
starting bytes + exactly Edits 1–3 and nothing else.

### 6.4 Exact checks

| ID | Command / inspection (cwd `frontend/`) | Class | Expected | Activation witness / assertions |
|---|---|---|---|---|
| P1 | `git status --porcelain` in `frontend/` and in `/home/harit/Email Scrapper` | LOCAL_NOW | frontend set = §3 inventory + this decomposition's coordination artifacts only; coordination root clean; `A5` digest `f843f58f…` unchanged | DEC-UA-013 preflight recorded |
| P2 | `sha256sum` of writable file and of `frontend/components/section-intro.tsx` | LOCAL_NOW | writable = `54b6bde1…` before; after: `efffc7b8…`; section-intro still `159096f3…` | baseline + ending digest + predecessor validation recorded |
| V-A | `npx tsc --noEmit --incremental false --pretty false` | LOCAL_NOW | nonzero exit is expected from pre-existing parked diagnostics; output lines only for the five parked SRC-UA-0092 files; ZERO lines containing `auth-form` | wrapped JSX typechecks under `strict` (SectionIntro import resolves; string props fit `ReactNode`) |
| V-B | read-only `node -e` inspection of the writable file: (a) exactly 1 match of `import { SectionIntro } from "@/components/section-intro";`; (b) 0 matches of `/<h1/u`; (c) 0 matches of `aria-labelledby="auth-title"`; (d) exactly 1 match of `/<SectionIntro/u`; (e) the six DEC-UA-003 regexes of CASE-UA-W3-001/002 (S004 §9.3) all match | LOCAL_NOW | (a) 1; (b) 0; (c) 0; (d) 1; (e) all match | CASE-UA-W3-001/002 oracles will pass |
| V-C | in-memory NC probe N1 (`node -e`, writes no file): run the CASE-UA-W3-001 oracle logic against (a) the edited bytes and (b) the edited bytes with the `title={isSignUp ? "Save your search." : "Welcome back."}` line removed | LOCAL_NOW | (a) all regexes match; (b) the title regex fails | NC-UA-002 falsified at leaf level |
| V-D | `git status --porcelain` (frontend) after checks | LOCAL_NOW | attributable changed-file set is exactly `frontend/components/auth-form.tsx` (plus the pre-existing §3 coordination paths) | §4.6 single-file proof |
| DEFERRED | `npm test`, G2 needle run, `npm run lint`, coverage-scope, forbidden-path negative search, browser evidence | DEFERRED_TO_INTEGRATION | owned by `UA-W3-I001` | A4 UA-W3-V2/V4/V5 |

Workspace write set of every LOCAL_NOW command: the writable file only.

### 6.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match. Evidence: ___
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline. Evidence: ___
- [ ] T1 Apply every ordered transformation and no other edit to the writable file. Evidence: ___
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions. Evidence: ___
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file. Evidence: ___
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips. Evidence: ___
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations. Evidence: ___
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred. Evidence: ___
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW. Evidence: ___

(For V3: this leaf registers and executes no CASE IDs itself; the bytes it
produces carry CASE-UA-W3-001/002, whose registration/execution is owned by
`UA-W3-S004`. Required local IDs for this leaf = ∅; `recordExecuted` is never
called by this leaf.)

## 7. Initial implementation sub-window `UA-W3-S002`

```yaml
subwindow_id: UA-W3-S002
type: FILE
parent_window_id: UA-W3
parent_assignment_id: ASG-UA-W3-01
assigned_agent: UNASSIGNED
predecessors: [UA-W3-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/not-found.tsx
file_operation: MODIFY
starting_file_digest: d35117bd611c5e0315ac263e6220a84005a7f1f208dcf09e15adec2dd405afe4
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md
  - frontend/components/section-intro.tsx
authorized_actions:
  - apply_the_two_ordered_edits_below
  - run_npx_tsc_noEmit_incremental_false_as_file_local_check
  - run_read_only_node_inspection_of_writable_file
  - run_in_memory_negative_control_probe_N1
  - record_git_status_preflight_and_postcondition
prohibited_actions:
  - edit_any_workspace_file_other_than_writable_file
  - edit_globals_css_or_auth_form_or_any_test_file
  - edit_section_intro_tsx_or_add_props_to_it
  - change_the_Link_href_or_button_classes
  - edit_layout_tsx_sign_in_or_sign_up_pages_or_header_auth
  - edit_parked_SRC-UA-0092_test_files
  - edit_uphunt-aesthetic-coverage_test_or_REQUIRED_CASE_IDS
  - edit_A4_A5_A6_S1_S2_S3_or_any_authority_artifact
  - npm_install_or_any_format_fix_generate_build_command
  - run_npm_test_or_npm_run_lint
  - communicate_with_parent_agent
  - start_successor_or_corrective_work
  - aws
  - commit
  - push
  - production
  - paid_provider
  - edit_email_scraper
  - edit_root_ACTIVE_EXECUTION_STATE
may_start_successor: false
```

### 7.1 Mechanical trace

- Requirements: REQ-UA-002, REQ-UA-007. Decisions: DEC-UA-002, DEC-UA-003 (404
  strings), DEC-UA-013; parent-frozen consequences 1 and 2.
- Task: UA-W3-T2 (404 half). Scenario/coverage: SCN-UA-002 → CASE-UA-W3-004
  (registered/executed by S004). Negative control: NC-UA-002 (probe N1).
- Every requirement terminates in file bytes asserted by CASE-UA-W3-004.

### 7.2 Exact file transformation

1. Source anchor A (exact bytes): `import Link from "next/link";` followed by a
   blank line and `export default function NotFound() {`.
2. Source anchor B (the exact 3-line block, lines 8–10 of the starting file):
   `          <span className="eyebrow">404 · Not found</span>` /
   `          <h1>That lead run does not exist.</h1>` /
   `          <p>The address may be incomplete, or the run ID may be invalid.</p>`.
3. Ordered edits, exactly two, in this order (each old string occurs exactly
   once). Edit 1 adds two lines; Edit 2 replaces three lines with five lines:
   - Edit 1: replace anchor A with
     `import Link from "next/link";` / blank /
     `import { SectionIntro } from "@/components/section-intro";` / blank /
     `export default function NotFound() {`
   - Edit 2: replace anchor B with the exact 5-line block in §7.3.
4. Complete signatures: none added or changed; consumed symbol is the §5.1
   frozen `SectionIntro` interface; no props added.
5. Imports/exports/consumers affected: this file gains the SectionIntro import;
   its default export `NotFound` is unchanged; the Next.js 404 route keeps
   rendering it.
6. Operation ordering / transaction class: `SAME_ATOMIC_BOUNDARY` of one file
   edit; rollback = restore the file to digest
   `d35117bd611c5e0315ac263e6220a84005a7f1f208dcf09e15adec2dd405afe4`.
7. Failure outcomes: if any LOCAL_NOW check fails or probe N1 fails to fail,
   stop and report `AWAITING_WINDOW_REVIEW`; no retry; no second file edit;
   never edit `auth-form.tsx` or `globals.css` from this leaf.
   Duplicate/restart/concurrency/cancellation: N/A.
8. Preserved behavior/content: the `Link className="ds-button ds-button--primary" href="/"`
   element and its label byte-identical (UA-W3-T2: do not change Link hrefs);
   `main`/`shell`/`fatal-card` class composition byte-identical; every other
   line byte-identical.
9. Obsolete behavior removed: the eyebrow `span`, the `h1`, and the copy `p`
   elements (replaced by the SectionIntro render).
10. Resulting interface exposed to successors: the 404 card contains
    `.fatal-card > .marketing-heading` with the DEC-UA-003 strings (S003
    retargets the CSS onto it).
11. Forbidden edits within the writable file: anything other than Edits 1–2; no
    comments; no `id` on the SectionIntro; no reformatting.

### 7.3 Exact required ending file content

```tsx
import Link from "next/link";

import { SectionIntro } from "@/components/section-intro";

export default function NotFound() {
  return (
    <main className="app-canvas run-page state-page">
      <div className="shell">
        <div className="fatal-card ds-card">
          <SectionIntro
            eyebrow="404 · Not found"
            title="That lead run does not exist."
            copy="The address may be incomplete, or the run ID may be invalid."
          />
          <Link className="ds-button ds-button--primary" href="/">
            Return to StoreSignal
          </Link>
        </div>
      </div>
    </main>
  );
}
```

Expected ending digest (window-agent simulation, S3 `EV-UA3-D-003`):
`0ec6a3b2a0526fc51248ca1766636b63bed32e1aef4bafac7907f5fc06ca682c` (22 lines).
The leaf's ending file MUST be byte-identical to this block (final newline
included, no trailing whitespace, no BOM).

### 7.4 Exact checks

| ID | Command / inspection (cwd `frontend/`) | Class | Expected | Activation witness / assertions |
|---|---|---|---|---|
| P1 | `git status --porcelain` in `frontend/` and in `/home/harit/Email Scrapper` | LOCAL_NOW | §3 inventory + S001's accepted delta + coordination artifacts only; `A5`/`A6` digests unchanged | DEC-UA-013 preflight recorded |
| P2 | `sha256sum` of writable file and of the S001 file | LOCAL_NOW | writable = `d35117bd…` before; after: `0ec6a3b2…`; auth-form = S001 ending digest `efffc7b8…` (predecessor validation) | predecessor evidence matches |
| V-A | `npx tsc --noEmit --incremental false --pretty false` | LOCAL_NOW | output lines only for the five parked SRC-UA-0092 files; ZERO lines containing `not-found` | wrapped JSX typechecks under `strict` |
| V-B | read-only `node -e` inspection of the writable file: (a) exactly 1 match of the SectionIntro import line; (b) 0 matches of `/<h1/u`; (c) exactly 1 match of `/<SectionIntro/u`; (d) the five DEC-UA-003 regexes of CASE-UA-W3-004 (S004 §9.3) all match; (e) `href="/"` present exactly once | LOCAL_NOW | all as listed | CASE-UA-W3-004 oracle will pass |
| V-C | in-memory NC probe N1 (`node -e`, writes no file): run the CASE-UA-W3-004 oracle logic against (a) the edited bytes and (b) the edited bytes with the `title="That lead run does not exist."` line removed | LOCAL_NOW | (a) all regexes match; (b) the title regex fails | NC-UA-002 falsified at leaf level for CASE-UA-W3-004 |
| V-D | `git status --porcelain` (frontend) after checks | LOCAL_NOW | attributable changed-file set is exactly `frontend/app/not-found.tsx` (plus S001's accepted delta and coordination paths) | §4.6 single-file proof |
| DEFERRED | `npm test`, G2 needle run, `npm run lint`, forbidden-path negative search, browser evidence | DEFERRED_TO_INTEGRATION | owned by `UA-W3-I001` | A4 UA-W3-V2/V4/V5 |

Workspace write set of every LOCAL_NOW command: the writable file only.

### 7.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match. Evidence: ___
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline. Evidence: ___
- [ ] T1 Apply every ordered transformation and no other edit to the writable file. Evidence: ___
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions. Evidence: ___
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file. Evidence: ___
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips. Evidence: ___
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations. Evidence: ___
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred. Evidence: ___
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW. Evidence: ___

(For V3: required local IDs for this leaf = ∅; CASE-UA-W3-004 registration/
execution is owned by `UA-W3-S004`.)

## 8. Initial implementation sub-window `UA-W3-S003`

```yaml
subwindow_id: UA-W3-S003
type: FILE
parent_window_id: UA-W3
parent_assignment_id: ASG-UA-W3-01
assigned_agent: UNASSIGNED
predecessors: [UA-W3-S001, UA-W3-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/globals.css
file_operation: MODIFY
starting_file_digest: 7df1646d8b4d834ebd6d5cf95f1f0bcf77f351e1b84d2ebfcb9e4314bc79f407
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md
  - frontend/components/auth-form.tsx
  - frontend/app/not-found.tsx
authorized_actions:
  - apply_the_seven_ordered_replacements_below
  - run_read_only_node_inspection_of_writable_file
  - run_tmp_copy_negative_control_probe_N1
  - record_git_status_preflight_and_postcondition
prohibited_actions:
  - edit_any_workspace_file_other_than_writable_file
  - edit_auth_form_or_not_found_or_any_test_file
  - edit_unowned_globals_css_selectors_or_add_new_declarations_or_properties
  - change_any_declaration_body_of_a_retargeted_rule
  - remove_or_change_the_sticky_or_radius_declarations
  - edit_section_intro_or_layout_or_sign_in_or_sign_up_or_header_auth
  - edit_parked_SRC-UA-0092_test_files
  - edit_uphunt-aesthetic-coverage_test_or_REQUIRED_CASE_IDS
  - edit_A4_A5_A6_S1_S2_S3_or_any_authority_artifact
  - npm_install_or_any_format_fix_generate_build_command
  - run_npm_test_or_npm_run_lint_or_npx_tsc
  - communicate_with_parent_agent
  - start_successor_or_corrective_work
  - aws
  - commit
  - push
  - production
  - paid_provider
  - edit_email_scraper
  - edit_root_ACTIVE_EXECUTION_STATE
may_start_successor: false
```

### 8.1 Mechanical trace

- Requirements: REQ-UA-001 (token preservation), REQ-UA-006 (no new motion),
  REQ-UA-002 (headline recipe surfaces). Decisions: DEC-UA-001 (tokens untouched),
  DEC-UA-008 (no new transitions), DEC-UA-013; parent-frozen consequence 3.
- Task: UA-W3-T1. Coverage: this leaf produces no CASE bytes of its own; its
  acceptance is the exact seven replacements plus the §8.4 inspections, and its
  diff is asserted exact-by-hunk by I001 G6. Negative control: NC probe N1.
- Every named UA-W3-T1 property terminates in a byte-exact hunk below.

### 8.2 Exact file transformation (seven ordered replacements; all line-count preserving)

Starting-file line numbers are listed for review; every `old` string below is a
unique full-line (or unique multi-line) match at execution time, with the stated
occurrence count, applied with a whole-string replace. Declaration bodies are
byte-identical before and after; only the named selector/padding bytes change.

1. Replace `.fatal-card h1 {` with `.fatal-card .marketing-heading h2 {` —
   exactly 2 occurrences (lines 3878 and 6122).
2. Replace `.fatal-card p {` with `.fatal-card .marketing-heading p {` —
   exactly 2 occurrences (lines 3884 and 6127).
3. Replace `  .auth-card h1 {` (two-space indent) with
   `  .auth-card .marketing-heading h2 {` — exactly 1 occurrence (line 4306,
   inside `@media`). MUST run before step 4 because this line contains the
   step-4 substring.
4. Replace `.auth-card h1 {` with `.auth-card .marketing-heading h2 {` —
   exactly 1 remaining occurrence (line 3936).
5. Replace the unique 3-line anchor
   `.auth-card {` / `  width: min(27rem, 100%);` / `  padding: 0;`
   (lines 5681–5683) with
   `.auth-card {` / `  width: min(27rem, 100%);` / `  padding: var(--space-6);`
   — exactly 1 occurrence. (This is the named UA-W3-T1 padding property. The
   dead `padding: 38px;` at line 3929 is NOT named and stays byte-identical.)
6. Replace the unique 2-line anchor
   `.auth-card h1,` / `.auth-card-header h1 {` (lines 5695–5696) with
   `.auth-card .marketing-heading h2,` / `.auth-card-header .marketing-heading h2 {`.
7. Replace `.auth-card-header > p {` with
   `.auth-card-header .marketing-heading p {` — exactly 1 occurrence (line 5703).

Resulting rule bodies (all unchanged by this leaf, listed for review):

- lines 3878 block: `  margin: 12px 0;` / `  font-size: 36px;` /
  `  letter-spacing: -0.05em;`
- lines 3884 block: `  margin: 0 auto 27px;` / `  color: var(--muted);` /
  `  font-size: 13px;` / `  line-height: 1.6;`
- line 3936 block: `  margin: 8px 0 12px;` / `  font-size: 36px;` /
  `  letter-spacing: -0.055em;`
- line 4306 block: `    font-size: 31px;`
- lines 5695 block: `  margin: var(--space-1) 0 var(--space-2);` /
  `  font-size: clamp(1.75rem, 5vw, 2.125rem);` /
  `  letter-spacing: -0.045em;` / `  line-height: var(--line-height-tight);`
- line 5703 block: `  margin: 0;` / `  color: var(--color-ink-muted);` /
  `  font-size: var(--font-size-body);` / `  line-height: var(--line-height-body);`
- line 6122 block: `  margin: var(--space-2) 0;` /
  `  font-size: clamp(1.75rem, 6vw, 2.25rem);`
- line 6127 block: `  margin-bottom: var(--space-6);` /
  `  color: var(--color-ink-muted);` / `  font-size: var(--font-size-body);`

Keep-if-present (no edits; asserted in §8.4):

- `.site-header` live rule (line 5591) already contains `position: sticky;`
  (line 5592) — UA-W3-T1 "keep sticky header".
- `.auth-card` live rule (line 5681) already contains
  `border-radius: var(--radius-panel);` (line 5685).
- `.fatal-card` live rule (line 6112) already contains
  `border-radius: var(--radius-panel);` (line 6117).

Expected ending digest (window-agent simulation, S3 `EV-UA3-D-003`):
`325a442bdd1b076b8bb0b2029ff4326b91edfbe4b5a6478a540318afe3c50ea9`
(8393 lines — all seven steps are line-count preserving).

### 8.3 Preserved behavior and forbidden edits

- Every selector not named in §8.2 steps 1–7 stays byte-identical, including
  `.marketing-heading` (UA-W5's), `.eyebrow`, `.auth-card-footer`,
  `.auth-card > p` (line 3942), `.auth-card-header` padding rule (line 5690),
  `.run-page .fatal-card.ds-notice` (line 4803), and both `@media` fatal/auth
  padding rules (lines 4577, 6166).
- No new declaration, property, selector, comment, or reordering; no
  `transition` additions (DEC-UA-008); no token changes (DEC-UA-001).
- Owned-selector rule: the seven replacements touch only rules whose selectors
  are within the §2 shared-file scope (`.auth-card`, `.auth-card-header`,
  `.fatal-card` descendant rules).

### 8.4 Exact checks

| ID | Command / inspection (cwd `frontend/`) | Class | Expected | Activation witness / assertions |
|---|---|---|---|---|
| P1 | `git status --porcelain` in `frontend/` and in `/home/harit/Email Scrapper` | LOCAL_NOW | §3 inventory + S001+S002 accepted deltas + coordination artifacts only; `A5`/`A6` digests unchanged | DEC-UA-013 preflight recorded |
| P2 | `sha256sum` of writable file, auth-form, not-found | LOCAL_NOW | writable = `7df1646d…` before; after: `325a442b…`; auth-form = `efffc7b8…`; not-found = `0ec6a3b2…` | baseline + ending digest + predecessor validation recorded |
| V-A | read-only `node -e` inspection: OLD-pattern counts all zero — `/^\.fatal-card h1 \{$/gm`, `/^\.fatal-card p \{$/gm`, `/^\.auth-card h1 \{$/gm`, `/^ {2}\.auth-card h1 \{$/gm`, `/^\.auth-card h1,$/gm`, `/^\.auth-card-header h1 \{$/gm`, `/^\.auth-card-header > p \{$/gm` | LOCAL_NOW | each count = 0 | no legacy h1/child-p selector remains on the owned retarget list |
| V-B | read-only `node -e` inspection: NEW-pattern counts — `/^\.fatal-card \.marketing-heading h2 \{$/gm` = 2; `/^\.fatal-card \.marketing-heading p \{$/gm` = 2; `/^\.auth-card \.marketing-heading h2 \{$/gm` = 1; `/^ {2}\.auth-card \.marketing-heading h2 \{$/gm` = 1; `/^\.auth-card \.marketing-heading h2,$/gm` = 1; `/^\.auth-card-header \.marketing-heading h2 \{$/gm` = 1; `/^\.auth-card-header \.marketing-heading p \{$/gm` = 1 | LOCAL_NOW | exact counts as listed | retarget complete |
| V-C | read-only `node -e` inspection: keep-if-present regexes — `\.site-header \{\n  position: sticky;` matches; the `.auth-card` live rule matches `padding: var\(--space-6\);` and `border-radius: var\(--radius-panel\);`; the `.fatal-card` live rule contains `border-radius: var\(--radius-panel\);`; `padding: 38px;` still present exactly once (dead rule untouched); token lines `--color-signal: #c8f04b`, `--radius-panel: 1rem`, `--space-6: 1.5rem` present; zero new `transition`-property declarations inside the edited hunks | LOCAL_NOW | all match | UA-W3-T1 named properties proven; DEC-UA-001/008 preserved |
| V-D | NC probe N1 in `/tmp/opencode/ua-w3-nc/` (disposable tmp copy, no workspace writes): copy the edited file to the tmp dir; revert the first `.fatal-card .marketing-heading h2 {` occurrence back to `.fatal-card h1 {`; re-run the V-B count logic on the copy; remove the tmp dir afterwards | LOCAL_NOW | the count check FAILS on the defective copy (count 1 ≠ 2) | the leaf inspection can fail; removed tmp residue |
| V-E | `git status --porcelain` (frontend) after checks | LOCAL_NOW | attributable changed-file set is exactly `frontend/app/globals.css` (plus S001+S002 accepted deltas and coordination paths) | §4.6 single-file proof |
| DEFERRED | `npm test`, G2 needle run, `npm run lint`, forbidden-path negative search, browser evidence | DEFERRED_TO_INTEGRATION | owned by `UA-W3-I001` | A4 UA-W3-V2/V4/V5 |

Workspace write set of every LOCAL_NOW command: the writable file only; V-D
writes only inside `/tmp/opencode/ua-w3-nc/` (removed afterwards).

### 8.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match. Evidence: ___
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline. Evidence: ___
- [ ] T1 Apply every ordered transformation and no other edit to the writable file. Evidence: ___
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions. Evidence: ___
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file. Evidence: ___
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips. Evidence: ___
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations. Evidence: ___
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred. Evidence: ___
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW. Evidence: ___

(For V3: required local IDs for this leaf = ∅; the four CASE registrations are
owned by `UA-W3-S004`.)

## 9. Initial implementation sub-window `UA-W3-S004`

```yaml
subwindow_id: UA-W3-S004
type: FILE
parent_window_id: UA-W3
parent_assignment_id: ASG-UA-W3-01
assigned_agent: UNASSIGNED
predecessors: [UA-W3-S001, UA-W3-S002, UA-W3-S003]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w3.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md
  - frontend/test/uphunt-aesthetic-coverage.test.ts
  - frontend/components/auth-form.tsx
  - frontend/components/app-header.tsx
  - frontend/app/not-found.tsx
  - frontend/app/globals.css
authorized_actions:
  - create_writable_file_with_exact_content_below
  - run_node_test_on_writable_file
  - run_disposable_tmp_negative_control_probes_N1_N2_N3
  - record_git_status_preflight_and_postcondition
  - remove_generated_test_dot_ua_executed_json
prohibited_actions:
  - edit_any_workspace_file_other_than_writable_file
  - edit_globals_css_or_any_production_file
  - edit_uphunt-aesthetic-coverage_test_or_REQUIRED_CASE_IDS
  - edit_parked_SRC-UA-0092_test_files
  - assert_getExecuted_equals_REQUIRED_CASE_IDS_full_set_equality
  - edit_A4_A5_A6_S1_S2_S3_or_any_authority_artifact
  - npm_install_or_any_format_fix_generate_build_command
  - run_npm_test_or_npm_run_lint_or_npx_tsc
  - communicate_with_parent_agent
  - start_successor_or_corrective_work
  - aws
  - commit
  - push
  - production
  - paid_provider
  - edit_email_scraper
  - edit_root_ACTIVE_EXECUTION_STATE
may_start_successor: false
```

### 9.1 Mechanical trace

- Requirements: REQ-UA-001, REQ-UA-002, REQ-UA-007. Decisions: DEC-UA-003 (exact
  strings), DEC-UA-011 (`recordExecuted` import + call-after-witness), DEC-UA-013
  (preflight).
- Task: UA-W3-T3. Scenarios/coverage: SCN-UA-002 → CASE-UA-W3-001, CASE-UA-W3-002,
  CASE-UA-W3-004; SCN-UA-001 → CASE-UA-W3-003. Negative controls: NC-UA-002
  (probes N1/N2), NC-UA-001 (probe N3); NC-UA-002 also cited from S001/S002 leaf
  probes.
- Every requirement terminates in an executable assertion inside the single
  writable file.

### 9.2 Exact file transformation

1. Starting state: `frontend/test/uphunt-aesthetic-w3.test.ts` ABSENT; no
   anchors (new file).
2. Target anchor: the exact 100%-complete file content in §9.3 (byte-identical,
   final newline, no trailing whitespace, no BOM).
3. Ordered edits (atomic CREATE, one operation): write the §9.3 content once.
   No second write pass, no post-write formatting.
4. Complete signatures/constants: imports `assert` from `node:assert/strict`,
   `readFile` from `node:fs/promises`, `test` from `node:test`, and
   `recordExecuted` from `./uphunt-aesthetic-coverage.test.ts`; four top-level
   `readFile`s of `../components/auth-form.tsx`, `../components/app-header.tsx`,
   `../app/not-found.tsx`, `../app/globals.css`; exactly four `test()` blocks
   titled with CASE-UA-W3-001..004 in ascending order, each ending in exactly
   one `recordExecuted("<case id>")` call placed after its assertions.
5. Imports/exports/consumers affected: exports nothing; imported by nothing.
   Importing the coverage registry re-executes its two CASE-UA-W1 tests inside
   this file's process (by design, DEC-UA-011); their `recordExecuted` calls
   merge into `.ua-executed.json` (idempotent).
6. Operation ordering / transaction class: `SAME_ATOMIC_BOUNDARY` of one file
   create; rollback = delete the file and `rm -f test/.ua-executed.json`.
7. Failure outcomes: if the LOCAL_NOW test run fails, or any negative-control
   probe fails to fail, stop and report `AWAITING_WINDOW_REVIEW`; no retry; no
   second file edit; never edit production files to make a CASE pass.
   Duplicate/restart: re-running the test only rewrites the disposable
   executed-set JSON, removed by V-D cleanup.
8. Preserved behavior: `frontend/test/uphunt-aesthetic-coverage.test.ts` and the
   w2 test file untouched; the CASE-UA-W3-003 token assertion copies the
   `#c8f04b` value pin from CASE-UA-W2-001/DEC-UA-001.
9. Obsolete behavior removed: none.
10. Resulting interface exposed to successors: none (later windows create their
    own `uphunt-aesthetic-wN.test.ts` files).
11. Forbidden edits within the writable file: anything other than the §9.3
    bytes; no comments; no fifth test; no `getExecuted()` vs `REQUIRED_CASE_IDS`
    full-set equality (UA-W15-V5 owns it); no `recordExecuted` call before a
    test's assertions; no skip filters; no renderToStaticMarkup substitute
    (SUB-UA-001 file-read parity only for this window).

### 9.3 Exact required ending file content

```ts
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const authForm = await readFile(new URL("../components/auth-form.tsx", import.meta.url), "utf8");
const appHeader = await readFile(new URL("../components/app-header.tsx", import.meta.url), "utf8");
const notFound = await readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8");
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W3-001 auth-form sign-in headline uses the DEC-UA-003 recipe", () => {
  assert.match(authForm, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.doesNotMatch(authForm, /<h1/u);
  assert.doesNotMatch(authForm, /aria-labelledby="auth-title"/u);
  assert.match(authForm, /eyebrow="StoreSignal account"/u);
  assert.match(authForm, /title=\{isSignUp \? "Save your search\." : "Welcome back\."\}/u);
  assert.match(authForm, /"Sign in to continue a pending search or return to earlier runs\."/u);
  recordExecuted("CASE-UA-W3-001");
});

test("CASE-UA-W3-002 auth-form sign-up headline uses the DEC-UA-003 recipe", () => {
  assert.match(authForm, /"Save your search\."/u);
  assert.match(authForm, /"Create an account to start the search you just prepared and keep every run in one place\."/u);
  assert.doesNotMatch(authForm, /id="auth-title"/u);
  recordExecuted("CASE-UA-W3-002");
});

test("CASE-UA-W3-003 app header keeps the site-header class and signal tokens", () => {
  assert.match(appHeader, /className="site-header"/u);
  assert.match(globals, /--color-signal:\s*#c8f04b/u);
  recordExecuted("CASE-UA-W3-003");
});

test("CASE-UA-W3-004 not-found uses the DEC-UA-003 recipe", () => {
  assert.match(notFound, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.doesNotMatch(notFound, /<h1/u);
  assert.match(notFound, /eyebrow="404 · Not found"/u);
  assert.match(notFound, /title="That lead run does not exist\."/u);
  assert.match(notFound, /copy="The address may be incomplete, or the run ID may be invalid\."/u);
  assert.match(notFound, /href="\/"/u);
  recordExecuted("CASE-UA-W3-004");
});
```

The window agent verified every regex of §9.3 against the simulated S001/S002/
S003 end-state bytes in `/tmp/opencode/ua-w3-sim/` (S3 `EV-UA3-D-003`): all four
CASE oracle suites pass, and all three negative-control probes fail as
prescribed. The four source reads are the A4 activation witnesses: auth-form
markup (001, 002), app-header class (003), not-found markup (004).

### 9.4 Exact checks

| ID | Command / inspection (cwd `frontend/`) | Class | Expected | Activation witness / assertions |
|---|---|---|---|---|
| P1 | `git status --porcelain` in `frontend/` and in `/home/harit/Email Scrapper` | LOCAL_NOW | §3 inventory + S001+S002+S003 accepted deltas + coordination artifacts only; `A5`/`A6` digests unchanged; predecessor coverage file still `f5137be4…` | DEC-UA-013 preflight recorded |
| P2 | `sha256sum` of writable file, S001, S002, S003 files | LOCAL_NOW | writable ABSENT before; after: digest of §9.3 bytes, recorded; auth-form `efffc7b8…`, not-found `0ec6a3b2…`, globals `325a442b…` | baseline + ending digest + predecessor validation recorded |
| V-A | `node --experimental-strip-types --test test/uphunt-aesthetic-w3.test.ts` | LOCAL_NOW | exit 0; exactly 6 passing tests, 0 failed, 0 skipped: CASE-UA-W1-001 and CASE-UA-W1-002 (re-executed via the registry import) plus the four CASE-UA-W3-00x tests, in the order 001, 002, 003, 004 for the W3 titles | witnesses: "auth-form markup" (001), "auth-form markup" (002), "app-header class" + globals read (003), "not-found markup" (004); each `recordExecuted` follows its assertions (present in §9.3 bytes) |
| V-B | after V-A: `cat test/.ua-executed.json` | LOCAL_NOW | JSON array of exactly 6 sorted unique IDs: CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W3-001, CASE-UA-W3-002, CASE-UA-W3-003, CASE-UA-W3-004 (V-A run from an ABSENT `test/.ua-executed.json`; no CASE-UA-W2-\* ID is required or expected at this leaf — W2 IDs are produced only by the w2 test file or `npm test`, neither of which is an S004 command; the 10-ID set {2 × W1} ∪ {4 × W2} ∪ {4 × W3} is asserted only at `UA-W3-I001` gate G5 after `npm test`) | required local (4) = registered (4) = executed W3 IDs (4); zero skips/duplicates/unexpected |
| V-C | NC probes in `/tmp/opencode/ua-w3-nc/` (disposable tmp copies, no workspace writes): N1 = remove the `title={isSignUp ? ...}` line from the auth-form copy then run the CASE-UA-W3-001 oracle logic; N2 = remove the `title="That lead run does not exist."` line from the not-found copy then run the CASE-UA-W3-004 oracle logic; N3 = replace `--color-signal: #c8f04b` in the globals copy then run the CASE-UA-W3-003 oracle logic; remove the tmp dir afterwards | LOCAL_NOW | all three oracle runs FAIL on the defective copies | NC-UA-002 (N1, N2) and NC-UA-001 (N3) falsified at leaf level |
| V-D | `rm -f test/.ua-executed.json` then `git status --porcelain` | LOCAL_NOW | attributable changed-file set is exactly `frontend/test/uphunt-aesthetic-w3.test.ts` (plus the three accepted production deltas and coordination paths); `.ua-executed.json` residue removed; §3 protected paths byte-unchanged | §4.6 single-file proof with prescribed disposable cleanup |
| DEFERRED | `npm test`, G2 needle run, `npm run lint`, forbidden-path negative search, NC end-to-end citation, browser evidence | DEFERRED_TO_INTEGRATION | owned by `UA-W3-I001` | A4 UA-W3-V2/V4/V5 |

Negative controls expected: 3 (N1, N2, N3); all must fail as specified.
Workspace write set of every LOCAL_NOW command: the writable file only, plus the
parent-authorized disposable runtime file `frontend/test/.ua-executed.json`
created by V-A and removed by V-D (DEC-UA-011; never committed). V-C writes only
inside `/tmp/opencode/ua-w3-nc/` (removed afterwards).

### 9.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match. Evidence: ___
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline. Evidence: ___
- [ ] T1 Apply every ordered transformation and no other edit to the writable file. Evidence: ___
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions. Evidence: ___
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file. Evidence: ___
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips. Evidence: ___
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations. Evidence: ___
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred. Evidence: ___
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW. Evidence: ___

(For V3: required local IDs = {CASE-UA-W3-001..004}; registered = the four
`test()` titles; executed = the four IDs recorded via `recordExecuted`; the two
CASE-UA-W1 IDs observed in V-B are predecessor re-executions inside the import
and are counted as predecessor cases, not unexpected W3 cases.)

## 10. Local and whole-window verification gates

Leaf-local gates: §6.4, §7.4, §8.4, §9.4. Frozen whole-window gates, executed
only by `UA-W3-I001` from `frontend/`, per `A4` §Gates, `A4` UA-W3 lifecycle, and
`DEC-UA-014`:

| Gate | Command / assertion | Expected |
|---|---|---|
| G0 | `sha256sum` of `section-intro.tsx`, `landing-sections.tsx`, `uphunt-aesthetic-w2.test.ts`, `uphunt-aesthetic-coverage.test.ts`, `app-header.tsx` | `159096f3…`, `914c61e5…`, `f65ba0c5…`, `f5137be4…`, `050da7c4…` (predecessors and preserved in-scope file unchanged) |
| G1 | `npm test` | exit 0; 0 failed; the four CASE-UA-W3-00x tests pass inside the run; expected total 162 passing = 156 baseline (`EV-UA-W2-I-001` G1) + 6 in the w3-file process (4 new + 2 registry re-executions via the import); actual recorded |
| G2 | `npx tsc --noEmit --pretty false` (`DEC-UA-014` oracle) | PASS iff zero output lines contain any owned-path needle: `auth-form`, `not-found`, `app-header`, `uphunt-aesthetic-w3.test.ts`; expected remaining diagnostics: exactly the 10 parked SRC-UA-0092 lines in the five parked files; repo-wide exit 0 NOT required; parked files MUST NOT be edited |
| G3 | `npm run lint` | exit 0 (CSS/JSX owned this window) |
| G4 | browser evidence (`browser_evidence: true`): `/usr/bin/google-chrome --headless` screenshots of `/`, `/sign-in`, `/sign-up`, and `/this-lead-run-does-not-exist` (the frozen not-found route) at 390, 768, 1280, 1440 under `frontend/review-evidence/uphunt-aesthetic/UA-W3/` | screenshots recorded; synthetic fixtures only; no credentials; local dev server processes only, under the §11 item 5 sandbox policy; this is local_e2e evidence, NOT a CASE oracle (SUB-UA-001) |
| G5 | coverage scope: required W3 set (4 IDs, digest `25e6c1d7…`) = registered (four `test()` titles) = executed W3 IDs; after G1, `test/.ua-executed.json` is exactly the 10 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3}; zero skips, duplicates, unexpected, or unactivated IDs in this window; full 43-set equality NOT asserted (`UA-W15-V5` owns it) | exact |
| G6 | `git status --porcelain` + forbidden-path negative search over the whole window delta (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`, `email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, the five parked test files, the coverage test file, `layout.tsx`, `sign-in/page.tsx`, `sign-up/page.tsx`, `header-auth.tsx`, `section-intro.tsx`) | implementation delta == exactly the four §4 planned files; the `globals.css` diff contains exactly the seven §8.2 hunks and nothing else; `app-header.tsx` byte-identical (`050da7c4…`); coordination artifacts limited to the enumerated §2 list; `A5`/`A6` digests unchanged by leaves |
| G7 | static inspection of leaf imports (`react` type-only, `next/link`/`next/navigation` existing, `node:test`, `node:assert/strict`, `node:fs/promises`, `node:url`, `./uphunt-aesthetic-coverage.test.ts`) + suite behavior | 0 network operations, 0 DB operations (`UA-W3-V3`) |
| G8 | NC-UA-002: cite S001 §6.4 V-C and S002 §7.4 V-C leaf probes from `S3` and personally re-execute the S004 §9.4 V-C N1/N2 disposable-copy probes. NC-UA-001: personally re-execute the S004 §9.4 V-C N3 probe (tmp copies only, no workspace writes) | all falsified: removing a title node fails the CASE-UA-W3-001/004 oracle logic; removing `--color-signal` fails the CASE-UA-W3-003 oracle logic |
| G9 | successor negative search: no `UA-W4` artifact of any kind (no `uphunt-aesthetic-w4.test.ts`, no edits to `page.tsx`/`run-form.tsx`), `A5.current_window` still `UA-W3`, `next_window` untouched | `may_start_successor: false` honored; `UA-W3-H4/H6` hold |

PASS oracle for `UA-W3-I001`: G0–G3 and G5–G9 all pass; G4 executed and recorded
(`browser_evidence: true` this window — not skipped); `A4` `UA-W3-P1..P4`,
`UA-W3-V1..V5`, `UA-W3-H1..H5` then checked with resolvable evidence;
`frontend/review-evidence/uphunt-aesthetic/UA-W3_HANDOFF.md` written per §13;
`A5.current_status` set to `AWAITING_REVIEW`; STOP per `UA-W3-H6` (no `UA-W4`).
CORRECTION_REQUIRED oracle: any G-gate behavioral failure → §11 correction loop
with `UA-W3-C00n` (single-file, dependency-safe).
PARENT_BLOCKED oracle: missing parent decision, contradiction with `A1`–`A4`, or
required scope expansion (e.g., a defect that cannot be corrected without
editing an unowned `globals.css` selector, `layout.tsx`, the sign-in/sign-up
pages, `header-auth.tsx`, `section-intro.tsx`, a parked file, or
`REQUIRED_CASE_IDS`).

## 11. Correction and re-assessment rules

1. Every correction is a new single-file sub-window `UA-W3-C00n` with a new
   assignment ID and baseline digest, citing: the failed evidence, exact root
   cause, the governing requirement and decision already determining the remedy,
   the earlier sub-window corrected, and the gates invalidated. Nothing is
   rewritten in place; `S3` is append-only.
2. `REQUIRED_CASE_IDS` and the coverage test file are NOT correctable at window
   level (`A5` prohibitions). A defect requiring changes there is
   `PARENT_BLOCKED`.
3. `globals.css` is owned only for the §2 selector list and the §8.2 hunks. A
   failing check that would require editing an unowned selector, adding a new
   property, or editing `.marketing-heading` is `PARENT_BLOCKED`, never an
   unowned edit.
4. After the last correction the window agent personally runs a new assessment
   `UA-W3-I00n` (new ID), reusing unchanged gates by exact reference and
   rerunning every gate invalidated by the correction (at minimum G0, G1, G2,
   G5, G6, G8), the coverage closure checks, and the forbidden-path negative
   search.
5. Environment rule (E8.1, inherited from `A5`): an otherwise-authorized local
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
6. The window agent never repairs a leaf file directly; only corrective
   sub-windows edit files.

## 12. Mandatory authoring-readiness checklist (sub-window standard §11)

Evidence citations resolve into `S3` (`EV-UA3-D-001..003`).

### 12.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA3-D-001 (A5: ASG-UA-W3-01, UA-W3-WINDOW-AGENT, IN_PROGRESS, decompose action authorized; A5 digest f843f58f… recomputed)
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA3-D-001 (recomputed SHA-256 matches all pins incl. A4 `79816d33…`)
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA3-D-003 (§2, §6–§9, §10 of this S1)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA3-D-002 (§3 of this S1)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA3-D-003 (S1 spec / S2 state / S3 evidence paths)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA3-D-003 (leaf prohibited_actions; report-only-to-window-agent rule)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: EV-UA3-D-003 (§11 item 5 == A5 policy)

### 12.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA3-D-003 (§5 table; A3 implementing_tasks; A4 test_registration)
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA3-D-001 (DEC-UA-002/003/011/013/014 complete; parent-frozen consequences §0 close the remaining choices; current source matches DEC-UA-003 strings and the §0 consequence inputs)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA3-D-002 (both = {frontend/components/auth-form.tsx, frontend/app/not-found.tsx, frontend/app/globals.css, frontend/test/uphunt-aesthetic-w3.test.ts}; planned-file-set digest `abe8597b87a7898e461ef4929f30a40c6ec88c9e6f88eb838a08c6612125a485`; app-header.tsx proven zero-edit preserved)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: EV-UA3-D-003 (§4: S001/S002/S003/S004, one file each)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: EV-UA3-D-003 (§6.2–§6.3, §7.2–§7.3, §8.2, §9.2–§9.3; expected ending digests simulated)
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: EV-UA3-D-003 (§4; no waves; S003 ordered after the wraps by parent consequence 3)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: EV-UA3-D-003 (§5.1: SectionIntro pinned `159096f3…`; recordExecuted pinned `f5137be4…`; both predecessor-frozen)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: EV-UA3-D-003 (§4.1 table)
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: EV-UA3-D-003 (component / app / css / test split across S001/S002/S003/S004)
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: EV-UA3-D-003 (command lists in §6.4/§7.4/§8.4/§9.4; only prescribed disposable write is `.ua-executed.json` with prescribed cleanup; tsc leaf runs use `--incremental false`)

### 12.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7 of the standard. Evidence: EV-UA3-D-003 (§6, §7, §8, §9 yaml blocks; 15/15 field-presence lint)
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: EV-UA3-D-003 (byte-exact §6.3/§7.3/§9.3; seven exact replacements with occurrence counts in §8.2)
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: EV-UA3-D-003 (§6.4, §7.4, §8.4, §9.4)
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: EV-UA3-D-003 (V-D/V-E rows in §6.4/§7.4/§8.4/§9.4)
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: EV-UA3-D-003 (§13 templates; H3 rows)
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: EV-UA3-D-003 (leaf prohibited_actions)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: EV-UA3-D-003 (each leaf's LOCAL_NOW set passes standalone; whole-window gates deferred and named)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: EV-UA3-D-003 (DEFERRED rows → UA-W3-I001)

### 12.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: EV-UA3-D-003 (§5; 4 cases → S004 with §9.3 bytes)
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: EV-UA3-D-003 (§9.4 V-B; §10 G5)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: EV-UA3-D-003 (NC-UA-002 probes at S001/S002 leaf level plus S004; NC-UA-001 at S004 leaf level with I001 re-execution; §8.4 V-D integrity probe)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: EV-UA3-D-003 (SUB-UA-001 inherited: UTF-8 file reads are source-text oracles only; no computed-pixel claim; screenshots are local_e2e evidence, not oracles; coverage and w2 test files never weakened here)
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: EV-UA3-D-003 (§14: authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: EV-UA3-D-003 (§10; G4 scheduled at I001 per browser_evidence true)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: EV-UA3-D-003 (§11)
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: EV-UA3-D-003 (§14 assigned WINDOW-AGENT; §11 item 6)
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: EV-UA3-D-003 (§10 G0/G5/G8; §9.4 V-A/V-B)
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: EV-UA3-D-003 (§13.3)
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: EV-UA3-D-003 (§11 item 5)

### 12.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA3-D-003 (`UA-W3-S001..S004`, `UA-W3-I001` unique; CASE/DEC/REQ/SCN/NC IDs cite A3/A4)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA3-D-003 (S1 contains only concrete paths, digests, bytes, counts)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA3-D-003 (exact-set comparisons in §6.4 V-D, §7.4 V-D, §8.4 V-E, §9.4 V-D; prescribed disposable `.ua-executed.json` excluded by cleanup)
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: EV-UA3-D-002 (SW-D03 set equality is the failure detector)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: EV-UA3-D-003 (§9.3 four tests each call recordExecuted after its oracle; §10 G5 counts; A4 §Enforcement 1–4 inherited)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: EV-UA3-D-003 (byte-pinned §6.3/§7.3/§9.3 content and §8.2 exact hunks; any divergence changes the diff reviewed at I001; accepted tests untouched)
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: EV-UA3-D-003 (leaf prohibited_actions + §4.6 proofs)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: EV-UA3-D-003 (§11 items 1, 6)
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: EV-UA3-D-003 + S2 `decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`, leaves `assigned_agent: UNASSIGNED`
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA3-D-003 (15/15 required fields per FILE block; 0 unresolved references)
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: EV-UA3-D-003 (§11 item 5)

## 13. Handoff templates

### 13.1 Leaf completion certificate (returned by each leaf agent)

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W3
subwindow_id: UA-W3-S001 | UA-W3-S002 | UA-W3-S003 | UA-W3-S004
assignment_id: ASG-UA-W3-01-S001 | ASG-UA-W3-01-S002 | ASG-UA-W3-01-S003 | ASG-UA-W3-01-S004
agent_identity: exact identity
writable_file: exact path from §6/§7/§8/§9
starting_file_digest: 54b6bde1… | d35117bd… | 7df1646d… | ABSENT
ending_file_digest: sha256
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
attributable_changed_file_set: [writable file only]
required_local_cases: [] | [] | [] | [CASE-UA-W3-001, CASE-UA-W3-002, CASE-UA-W3-003, CASE-UA-W3-004]
registered_local_cases: same as required_local_cases
executed_local_cases: same as required_local_cases
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 1 | 1 | 1 | 3
negative_controls_falsified: 1 | 1 | 1 | 3
commands: []
deferred_integration_checks: [UA-W3-I001 gates per §10]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

### 13.2 Window-agent integration certificate (appended to `S3` by `UA-W3-I001`)

The §12.4 certificate of the sub-window standard, adapted: `integration_assessment_id:
UA-W3-I001`; `accepted_initial_subwindows` from leaf reviews; `expected_changed_file_set`
= the four §4 planned files; `required_case_count: 4` (window-local; the 43-ID registry
equality is UA-W15-V5); `registered_case_count: 4`; `executed_case_count: 4`;
`required_case_set_digest: 25e6c1d7ca199a383069570b7a083e57b39c8f81b32b7f4c02b7aaa04bea470f`;
registered/executed digests computed with the §4.7 formula over the same four IDs;
`status: READY_FOR_PARENT_REVIEW` only per the §10 PASS oracle.

### 13.3 Consolidated parent handoff

`frontend/review-evidence/uphunt-aesthetic/UA-W3_HANDOFF.md` per `A4` handoff
template and sub-window standard §12.5: objective; status
`READY_FOR_PARENT_REVIEW` or one exact blocker; changed-file set +
starting/ending SHA-256s (including the preserved `app-header.tsx` `050da7c4…`
and unchanged predecessors); CASE required/registered/executed/skipped/duplicate/
unexpected (4/4/4/0/0/0 window-local; 2 additional registry IDs re-executed via
import; full 43-set equality deferred to UA-W15); required-set digest
`0d14982c…` (registry) and W3-set digest `25e6c1d7…`; commands and outcomes;
browser-evidence file list under `frontend/review-evidence/uphunt-aesthetic/UA-W3/`;
sandbox recoveries; NC results; forbidden-path negative search; `S1`/`S2`/`S3`
paths and revisions; confirmation that `UA-W4` was not started.

## 14. Initial integration assessment `UA-W3-I001` (fully authored now)

```yaml
subwindow_id: UA-W3-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W3
parent_assignment_id: ASG-UA-W3-01
assigned_agent: WINDOW-AGENT (UA-W3-WINDOW-AGENT, personally executed, never delegated)
predecessors: [UA-W3-S001, UA-W3-S002, UA-W3-S003, UA-W3-S004]
authorized_write_file: NONE (implementation files; coordination artifacts per §2 only)
input: assembled UA-W3 state after UA-W3-S004 is accepted
gates: §10 table G0–G9 (frozen)
pass_oracle: G0,G1,G2,G3,G5,G6,G7,G8,G9 pass; G4 executed and recorded (browser_evidence true)
correction_oracle: any behavioral gate failure -> §11 loop with UA-W3-C00n
parent_blocked_oracle: missing decision / contradiction / scope expansion (incl. §11 items 2–3)
execution_policy: E8.1 sandbox escalation + one identical recovery (§11 item 5)
may_start_successor: false
```

Accepted-subwindow and digest fields are filled from completed leaf evidence at
run time; the gate set above is frozen now (sub-window standard §9.1).

## 15. Append-only amendment sections

Reserved for corrective sub-windows (`UA-W3-C001`, …) and further assessments
(`UA-W3-I002`, …). Each amendment repeats the §6 block structure in full with a
new ID, new baseline digest, cited trigger evidence, and invalidated gates.
Existing sections above are immutable after parent approval.
