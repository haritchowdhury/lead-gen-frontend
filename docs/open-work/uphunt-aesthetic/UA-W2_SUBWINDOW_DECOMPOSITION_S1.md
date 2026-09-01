# UA-W2 frozen sub-window decomposition checklist (`S1`)

Subordinate artifact `S1` of parent window `UA-W2` under assignment `ASG-UA-W2-01`.
Companion artifacts: `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W2_SUBWINDOW_STATE_S2.yaml`
and `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W2_SUBWINDOW_EVIDENCE_S3.md`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

This file is frozen once the parent approves the decomposition. Corrections are appended
in §14 with new IDs; existing blocks are never rewritten.

## 1. Inherited authority and revision pins

| Pin | Value |
|---|---|
| Parent window | `UA-W2` |
| Parent assignment | `ASG-UA-W2-01` |
| Window agent | `UA-W2-WINDOW-AGENT` |
| Parent standard | `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` |
| Sub-window standard | `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` |
| Contract `A1` | `a33ae1d8af4442de2680dc70f2c6e793a668b1400f0814833489061848c9baef` |
| Decision `A3` | `8faaa4e2411235d8a83ec94de6a07e53c54ece91d99121a3c0e09cb6052f4300` |
| Checklist `A4` | `626c2a7034c88fc9f2f13e25929801b637aed682cd4c5d521de981c593dc7165` |
| Required coverage set (43 IDs, E6) | `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` (A4 §Coverage pin; asserted by CASE-UA-W1-002) |
| Predecessor output `frontend/test/uphunt-aesthetic-coverage.test.ts` | `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` (recomputed 2026-09-01, matches `A6` `EV-UA1-R-001` pin) |
| `A5` authorized_windows | `[UA-W2]` |
| `A5` may_start_successor | `false` |
| Successor `UA-W3` | reserved for parent; NOT authorized (`A5` prohibited `start_UA-W3`) |

All pins recomputed 2026-09-01 by `UA-W2-WINDOW-AGENT` and matched byte-exact
(S3 `EV-UA2-D-001`). Root `ACTIVE_EXECUTION_STATE.md` is out of authority and
untouched (`git status` at the coordination root is clean, S3 `EV-UA2-D-002`).

## 2. Parent-window scope and exclusions (copied, no expansion)

From `A4` §UA-W2 F1 and `A5` `authorized_write_scope`:

- Objective: shared `SectionIntro` component plus confirmation that `:root` tokens and
  reduced-motion remain; no other visual change.
- Window write scope (implementation, exactly three files):
  `frontend/components/section-intro.tsx` (CREATE),
  `frontend/components/landing-sections.tsx` (MODIFY),
  `frontend/test/uphunt-aesthetic-w2.test.ts` (CREATE).
- Window-agent coordination writes (never implementation): `S1`, `S2`, `S3` (this decomposition),
  `A6` append-only, `A4` `UA-W2-P*`/`UA-W2-T*`/`UA-W2-V*`/`UA-W2-H*` checkboxes only,
  `frontend/review-evidence/uphunt-aesthetic/UA-W2_HANDOFF.md`, and at handoff only
  `A5.current_status: AWAITING_REVIEW`.
- Read-only scope (window): `frontend/app/globals.css`,
  `frontend/components/ui/primitives.tsx`, `frontend/test/design-system-primitives.test.ts`.
- Authorized actions: `create_component`, `modify_landing_import`, `create_w2_test_file`,
  `run_frontend_unit_tests`, `run_frontend_npm_test`, `run_npx_tsc_noEmit`, `run_npm_run_lint`
  (CSS/JSX is owned this window); window-agent assessment and coordination writes above;
  sandbox escalation per E8.1 policy below.
- Prohibited: `edit_globals_css`, `add_dependency`, `edit_REQUIRED_CASE_IDS`,
  `edit_uphunt-aesthetic-coverage_test`, `edit_parked_SRC-UA-0092_test_files`
  (`test/keyword-intelligence-api.test.ts`, `test/keyword-intelligence-components.test.ts`,
  `test/keyword-intelligence-inventory.test.ts`, `test/landing-keyword-auth-flow.test.ts`,
  `test/my-runs-research-resume.test.ts`), `edit_unowned_app_or_component_files`,
  `start_UA-W3`, `may_start_successor`, `aws`, `commit`, `push`, `production`,
  `paid_provider`, `edit_email_scraper`, `edit_root_ACTIVE_EXECUTION_STATE`.
- `browser_evidence: false`; `npm run build` is a UA-W15-only gate.

## 3. Starting working-tree inventory (recorded 2026-09-01T18:49:00+05:30, read-only)

Repository: `/home/harit/Email Scrapper/frontend` (git toplevel). Coordination root
`/home/harit/Email Scrapper` is a separate git repository and reported a clean
`git status --porcelain` (root `ACTIVE_EXECUTION_STATE.md` untouched).

Starting changed-file set (frontend repo, `git status --porcelain`, sorted):

1. ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml` — assignment fields
   written by parent for `ASG-UA-W2-01`; starting digest
   `cf0c580a8ec4f9f33a6b5ec8cda2f8e73b1ba2e69c0770e24f450c98b8b7cba9`; PROTECTED (no leaf
   writes; only the handoff action `set_A5_AWAITING_REVIEW_on_handoff` may touch it later,
   never a leaf).
2. ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` — append-only evidence;
   starting digest `44d7efe1a7821a1578ff0ba421e032436626d11880a103eec04ebc6da7c518f5`;
   window-agent append-only; PROTECTED against leaf writes.

Starting repository change set digest (§4.7 formula over the two paths above):
`e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450`.

Starting state of planned files:

- `frontend/components/section-intro.tsx`: ABSENT.
- `frontend/test/uphunt-aesthetic-w2.test.ts`: ABSENT.
- `frontend/components/landing-sections.tsx`: present, clean (tracked, unmodified),
  digest `33f7670852e90b781225f21049e54f275fed93f4f2603c73678064066c0babce`; contains the
  local `function SectionIntro` (lines 52–65) and exactly three `<SectionIntro ` call sites
  (lines 98, 111, 145).
- `frontend/test/uphunt-aesthetic-coverage.test.ts`: digest
  `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` (predecessor, PROTECTED).
- `frontend/test/.ua-executed.json`: ABSENT (generated untracked runtime state; never committed).

Environment: node `v24.14.1`; `frontend/package.json` `test` =
`node --experimental-strip-types --test test/*.test.ts`, `lint` = `eslint`;
`tsconfig.json` `incremental: true`, `allowImportingTsExtensions: true`, `paths: {"@/*": ["./*"]}`;
`*.tsbuildinfo` is git-ignored tool state (regenerated; never committed).

## 4. Initial single-file dependency DAG and intermediate-state contracts

```text
UA-W2-S001 (FILE, create frontend/components/section-intro.tsx)
  -> UA-W2-S002 (FILE, modify frontend/components/landing-sections.tsx)
    -> UA-W2-S003 (FILE, create frontend/test/uphunt-aesthetic-w2.test.ts)
      -> UA-W2-I001 (INTEGRATION_ASSESSMENT, window agent, zero implementation write authority)
```

- Edge S001→S002: `landing-sections.tsx` imports the named export `SectionIntro` produced by
  S001; the import must typecheck (§6.2 interface frozen before S002 dispatch).
- Edge S002→S003: CASE-UA-W2-003 asserts the S002 import line and deleted local function;
  CASE-UA-W2-002 asserts the S001 export bytes. Both must exist before the test file runs.
- Acyclic; one initial owner per file; no parallel waves (`A5` authorizes none).
- No planned file consumes an interface produced outside this window except the predecessor
  coverage-registry export `recordExecuted` (frozen in `UA-W1` `S1` §5.1, pinned digest
  `f5137be4…`, consumed by S003 via
  `import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";`).

### 4.1 Intermediate-state contracts

| After | Permitted checks | Expected temporary state | Why safe | Resolved by | Prohibited while pending |
|---|---|---|---|---|---|
| S001 accepted | S001 §6.4 only; `npx tsc --noEmit --incremental false --pretty false` output limited to the 10 parked SRC-UA-0092 diagnostic lines in the five parked files; zero lines containing `section-intro` | new file exists with zero importers; no behavior change anywhere | no route or component imports `section-intro.tsx` yet; not externally visible | S002 | editing `landing-sections.tsx` or any second file; running `npm test`; successor work |
| S002 accepted | S002 §7.4 only; same tsc expectation with zero lines containing `landing-sections` or `section-intro` | landing imports the shared component; local duplicate deleted; call sites byte-identical (3 `<SectionIntro ` usages) | import resolves to the S001 file; rendered output identical for all three call sites (all pass `eyebrow`/`title`/`copy`) | S003 | editing the test file or any second file; running `npm test`; successor work |
| S003 accepted | S003 §8.4 only; whole-window gates remain PENDING | `.ua-executed.json` removed by prescribed cleanup; repo delta = the three implementation files only | test file is not imported by app code | I001 | any second-file edit; successor work |

Unexpected failures at any row stop the sequence for diagnosis (no silent progression).

## 5. Exact allocation of requirements, decisions, interfaces, and coverage cases

Parent trace for `UA-W2` (all IDs from `A1`/`A3`/`A4`):

| Parent ID | Allocated to | Terminal anchor |
|---|---|---|
| REQ-UA-001 (`SCN-UA-001`) | `UA-W2-S003` CASE-UA-W2-001 | `--color-signal: #c8f04b` + canvas/ink token assertions in the w2 test file |
| REQ-UA-002, REQ-UA-007 (`SCN-UA-002`) | `UA-W2-S001` CASE-UA-W2-002; `UA-W2-S002` CASE-UA-W2-003 | `export function SectionIntro` bytes; landing import line + deleted local function + 3 call sites |
| REQ-UA-006 (via `SCN-UA-001`) | `UA-W2-S003` CASE-UA-W2-004 | reduced-motion + no-global-transition assertions |
| INV-UA-001 (`NC-UA-005`) | `UA-W2-I001` gate G6 | forbidden-path negative search over the window diff |
| DEC-UA-001 | CASE-UA-W2-001 `#c8f04b` pin | token value assertion |
| DEC-UA-002 | `UA-W2-S001` bytes; `UA-W2-S002` edits 1–2; CASE-UA-W2-002/003 | frozen §5.1 interface; `marketing-heading` + `is-inverse` iff `inverse===true` |
| DEC-UA-006 | `UA-W2-I001` gate G6 | DEC forbidden paths absent from diff |
| DEC-UA-007 | window ID grammar `UA-W2-S00x`/`UA-W2-I001` | this `S1` |
| DEC-UA-008 | CASE-UA-W2-004 motion assertions | reduced-motion + transition-scope assertions copied from `design-system-primitives.test.ts` |
| DEC-UA-011 | S003 `recordExecuted` import + call-after-witness ordering | four `recordExecuted` calls, each after its oracle |
| DEC-UA-013 | leaf preflights P1/P2 | git status before/after (frontend + coordination root) |
| DEC-UA-014 | `UA-W2-I001` gate G2 | zero diagnostic lines on the three owned-path needles |
| UA-W2-T1 | `UA-W2-S001` §6 | file content |
| UA-W2-T2 | `UA-W2-S002` §7 edits 1–2 | import line + deletion |
| UA-W2-T3 | `UA-W2-S003` §8 | four tests, CASE-UA-W2-001..004 |
| SCN-UA-001 | CASE-UA-W2-001, CASE-UA-W2-004 | token + motion witnesses |
| SCN-UA-002 | CASE-UA-W2-002, CASE-UA-W2-003 | export + import witnesses |
| NC-UA-001 | S003 §8.4 N1/N2 + `UA-W2-I001` G8 | `--color-signal` removal and reduced-motion removal make the CASE oracles fail |
| NC-UA-002 | S001 §6.4 N1 + S002 §7.4 N1 + `UA-W2-I001` G8 | missing `is-inverse` and re-added local function make the CASE oracles fail |

The remaining 39 coverage CASE IDs belong to later windows per the `test_registration`
column of `A4` §Coverage; they are not `UA-W2` required changed files. Window-required
local case set = {CASE-UA-W2-001, CASE-UA-W2-002, CASE-UA-W2-003, CASE-UA-W2-004},
§4.7 set digest `02f920493c7935e2ecd5a3fd3edf1a97450a915add21b63d4183de1a14f449dd`.

### 5.1 Frozen cross-file interface produced by `UA-W2-S001`

Consumed by `UA-W2-S002` (import), `UA-W2-S003` (source assertions), and later windows
(UA-W3+ per `DEC-UA-002`). Frozen before S002 dispatch:

```text
File: frontend/components/section-intro.tsx (no "use client" directive; no default export)
Import form for consumers: import { SectionIntro } from "@/components/section-intro";

export function SectionIntro({
  eyebrow,
  title,
  copy,
  inverse = false,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  copy?: ReactNode;
  inverse?: boolean;
}): JSX.Element

Rendering rules (DEC-UA-002):
- root div className is exactly `marketing-heading${inverse ? " is-inverse" : ""}`
  (is-inverse present iff inverse === true);
- renders <span className="eyebrow">{eyebrow}</span> iff eyebrow !== undefined;
- always renders <h2>{title}</h2>;
- renders <p>{copy}</p> iff copy !== undefined.
No other exports, no hooks, no client directive. For every existing landing call site
(all pass eyebrow/title/copy) output is identical to the deleted local function.
```

The conditional-eyebrow/copy rendering of absent optional props is the only rendering-form
freedom left by `DEC-UA-002`; it is frozen here because it is output-identical for every
current consumer and gives leaves no choice.

## 6. Initial implementation sub-window `UA-W2-S001`

```yaml
subwindow_id: UA-W2-S001
type: FILE
parent_window_id: UA-W2
parent_assignment_id: ASG-UA-W2-01
assigned_agent: UNASSIGNED
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/section-intro.tsx
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md
  - frontend/components/landing-sections.tsx
authorized_actions:
  - create_writable_file_with_exact_content_below
  - run_npx_tsc_noEmit_incremental_false_as_file_local_check
  - run_in_memory_negative_control_probe_N1
  - record_git_status_preflight_and_postcondition
prohibited_actions:
  - edit_any_workspace_file_other_than_writable_file
  - edit_globals_css
  - edit_landing_sections_call_sites
  - edit_parked_SRC-UA-0092_test_files
  - edit_uphunt-aesthetic-coverage_test_or_REQUIRED_CASE_IDS
  - edit_A4_A5_A6_S1_S2_S3_or_any_authority_artifact
  - add_use_client_directive_or_default_export_or_second_component
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

- Requirements: REQ-UA-002, REQ-UA-007. Decisions: DEC-UA-002 (interface), DEC-UA-013 (preflight).
- Task: UA-W2-T1. Scenario/coverage: SCN-UA-002 → CASE-UA-W2-002 (registered and executed by S003;
  this leaf produces the asserted bytes). Negative control: NC-UA-002 (probe N1).
- Every requirement terminates in file bytes asserted by CASE-UA-W2-002.

### 6.2 Exact file transformation

1. Starting state: `frontend/components/section-intro.tsx` ABSENT; no anchors (new file).
2. Target anchor: the exact 100%-complete file content in §6.3. The ending file MUST be
   byte-identical to that block (final newline included, no trailing whitespace, no BOM).
3. Ordered edits (atomic CREATE, one operation): write the §6.3 content once. No second write
   pass, no post-write formatting.
4. Complete signatures: §5.1. Bounds: props exactly `eyebrow?: ReactNode`, `title: ReactNode`,
   `copy?: ReactNode`, `inverse?: boolean` default `false`.
5. Imports/exports/consumers affected: imports only `type { ReactNode }` from `"react"`;
   exports exactly `SectionIntro`. No existing file is modified by this leaf; S002 performs the
   first consumer import.
6. Operation ordering / transaction class: `SAME_ATOMIC_BOUNDARY` of one file create;
   rollback = delete that file (restore ABSENT).
7. Failure outcomes: if any LOCAL_NOW check fails or probe N1 fails to fail, stop and report
   `AWAITING_WINDOW_REVIEW` with the failure captured; no retry; no second file edit.
   Duplicate/restart/concurrency/cancellation: N/A (single idempotent create; this leaf writes
   no runtime state).
8. Preserved behavior: none required (new file); the extracted recipe must reproduce the local
   `landing-sections.tsx` `SectionIntro` output for all current call sites.
9. Obsolete behavior removed: none (the local function is removed by S002, not S001).
10. Resulting interface exposed to successors: §5.1, byte-frozen.
11. Forbidden edits within the writable file: anything other than the §6.3 bytes; no comments;
    no `"use client"`; no default export; no additional components or helpers.

### 6.3 Exact required ending file content

```tsx
import type { ReactNode } from "react";

export function SectionIntro({
  eyebrow,
  title,
  copy,
  inverse = false,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  copy?: ReactNode;
  inverse?: boolean;
}) {
  return (
    <div className={`marketing-heading${inverse ? " is-inverse" : ""}`}>
      {eyebrow !== undefined ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {copy !== undefined ? <p>{copy}</p> : null}
    </div>
  );
}
```

### 6.4 Exact checks

| ID | Command / inspection (cwd `frontend/`) | Class | Expected | Activation witness / assertions |
|---|---|---|---|---|
| P1 | `git status --porcelain` in `frontend/` and in `/home/harit/Email Scrapper` | LOCAL_NOW | frontend set = §3 inventory + this decomposition's coordination artifacts only; coordination root clean; `A5` digest `cf0c580a…` unchanged | DEC-UA-013 preflight recorded |
| P2 | `sha256sum` of writable file | LOCAL_NOW | ABSENT before; after: digest of §6.3 bytes, recorded | baseline + ending digest recorded |
| V-A | `npx tsc --noEmit --incremental false --pretty false` | LOCAL_NOW | nonzero exit is expected from pre-existing parked diagnostics; output lines only for the five parked SRC-UA-0092 files; ZERO lines containing `section-intro` | new file typechecks under `strict` (`ReactNode` import resolves; JSX compiles) |
| V-B | in-memory NC probe N1 (`node -e`, writes no file): evaluate the CASE-UA-W2-002 regexes of §8.3 against (a) the §6.3 bytes and (b) the same bytes with `inverse ? " is-inverse" : ""` replaced by `inverse ? "" : ""` | LOCAL_NOW | (a) all regexes match; (b) the `className` regex fails to match | NC-UA-002 falsified at leaf level: the CASE oracle can fail |
| V-C | `git status --porcelain` (frontend) after checks | LOCAL_NOW | attributable changed-file set is exactly `frontend/components/section-intro.tsx`; §3 protected paths byte-unchanged; no `.tsbuildinfo` tracked delta (git-ignored) | §4.6 single-file proof |
| DEFERRED | `npm test`, G2 needle run, `npm run lint`, coverage-scope, forbidden-path negative search, NC-UA-002 end-to-end citation | DEFERRED_TO_INTEGRATION | owned by `UA-W2-I001` | A4 UA-W2-V2/V4/V5 |

Workspace write set of every LOCAL_NOW command: the writable file only. No runtime state is
written by this leaf.

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

(For V3: this leaf registers and executes no CASE IDs itself; the bytes it produces carry
CASE-UA-W2-002, whose registration/execution is owned by `UA-W2-S003`. Required local IDs
for this leaf = ∅; `recordExecuted` is never called by this leaf.)

## 7. Initial implementation sub-window `UA-W2-S002`

```yaml
subwindow_id: UA-W2-S002
type: FILE
parent_window_id: UA-W2
parent_assignment_id: ASG-UA-W2-01
assigned_agent: UNASSIGNED
predecessors: [UA-W2-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/landing-sections.tsx
file_operation: MODIFY
starting_file_digest: 33f7670852e90b781225f21049e54f275fed93f4f2603c73678064066c0babce
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
  - edit_section_intro_tsx
  - edit_globals_css
  - change_any_SectionIntro_call_site_prop_or_copy_string
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

- Requirements: REQ-UA-002, REQ-UA-007. Decisions: DEC-UA-002 (import + delete local),
  DEC-UA-013 (preflight).
- Task: UA-W2-T2 ("call sites unchanged"). Scenario/coverage: SCN-UA-002 → CASE-UA-W2-003
  (registered/executed by S003). Negative control: NC-UA-002 (probe N1).
- Every requirement terminates in the import line, the deleted local function, and the three
  preserved call-site lines asserted by CASE-UA-W2-003.

### 7.2 Exact file transformation

1. Source anchor A (current import block, exact bytes):
   `import { TrafficGlobeShowcase } from "@/components/traffic-globe";`
   followed by a blank line and `type LandingVariant = "start" | "review";`.
2. Source anchor B (current local component, exact bytes, lines 52–66):
   the block from `function SectionIntro({ eyebrow, title, copy, inverse = false }: {`
   through its closing `}` plus the one trailing blank line, immediately before
   `export function LandingProcess({ variant = "start" }: { variant?: LandingVariant }) {`.
3. Ordered edits, exactly two, in this order:
   - Edit 1: replace the single line
     `import { TrafficGlobeShowcase } from "@/components/traffic-globe";`
     with the two lines
     `import { SectionIntro } from "@/components/section-intro";`
     `import { TrafficGlobeShowcase } from "@/components/traffic-globe";`
     (inserting the S001 import immediately before the traffic-globe import; no other line of
     the import block changes).
   - Edit 2: delete the entire local component block of source anchor B (exactly 15 lines:
     the 14 function lines at lines 52–65 plus the trailing blank line at line 66; the next
     remaining line is `export function LandingProcess({ variant = "start" }: { variant?: LandingVariant }) {`
     at current line 67 and MUST NOT be deleted). Exactly one blank line must remain between
     the closing `}` of `LandingHeroCopy` and `export function LandingProcess`.
4. Complete signatures: none added or changed in this file; the imported symbol is the §5.1
   frozen interface.
5. Imports/exports/callers/consumers affected: this file gains
   `import { SectionIntro } from "@/components/section-intro";`; its exports
   (`LandingHeroCopy`, `LandingProcess`) and all other imports are unchanged; the three
   `<SectionIntro ` call sites keep their exact prop bytes.
6. Operation ordering / transaction class: `SAME_ATOMIC_BOUNDARY` of one file edit (both edits
   inside one write); rollback = restore the file to digest
   `33f7670852e90b781225f21049e54f275fed93f4f2603c73678064066c0babce`.
7. Failure outcomes: if any LOCAL_NOW check fails or probe N1 fails to fail, stop and report
   `AWAITING_WINDOW_REVIEW`; no retry; no second file edit; never "fix" `section-intro.tsx`
   from this leaf. Duplicate/restart/concurrency/cancellation: N/A.
8. Preserved behavior/content: the three call-site lines (line 98 `<SectionIntro inverse eyebrow="From market idea to meaningful outreach" … />`, line 111, line 145) byte-identical;
   every other line of the file byte-identical; rendered landing output unchanged (all call
   sites pass `eyebrow`, `title`, `copy`).
9. Obsolete behavior removed: the local `function SectionIntro` (the only deleted symbol).
10. Resulting interface exposed to successors: unchanged exports; consumed import as above.
11. Forbidden edits within the writable file: anything other than Edits 1–2; no reformatting;
    no copy-string changes; no prop changes at call sites; no new components.

### 7.3 Exact checks

| ID | Command / inspection (cwd `frontend/`) | Class | Expected | Activation witness / assertions |
|---|---|---|---|---|
| P1 | `git status --porcelain` in `frontend/` and in `/home/harit/Email Scrapper` | LOCAL_NOW | §3 inventory + S001's accepted delta + coordination artifacts only; `A5`/`A6` digests unchanged | DEC-UA-013 preflight recorded |
| P2 | `sha256sum` of writable file before/after | LOCAL_NOW | before `33f7670852e90b781225f21049e54f275fed93f4f2603c73678064066c0babce`; after: new digest, recorded; also verify `frontend/components/section-intro.tsx` digest equals the S001 ending digest (predecessor validation) | predecessor evidence matches |
| V-A | `npx tsc --noEmit --incremental false --pretty false` | LOCAL_NOW | output lines only for the five parked SRC-UA-0092 files; ZERO lines containing `section-intro` or `landing-sections` | import resolves; deleted local function leaves no dangling references |
| V-B | read-only `node -e` inspection of the writable file: (a) contains exactly one occurrence of `import { SectionIntro } from "@/components/section-intro";`; (b) zero matches of `/function SectionIntro/u`; (c) exactly 3 matches of `/<SectionIntro /gu`; (d) the three call-site lines byte-equal the §7.2 preserved strings | LOCAL_NOW | (a) 1; (b) 0; (c) 3; (d) all equal | CASE-UA-W2-003 oracle will pass |
| V-C | in-memory NC probe N1 (`node -e`, writes no file): run the V-B logic against (a) the edited bytes and (b) the edited bytes with the local `function SectionIntro` block re-inserted | LOCAL_NOW | (a) passes; (b) check (b) fails (`function SectionIntro` found) | NC-UA-002 falsified at leaf level for CASE-UA-W2-003 |
| V-D | `git status --porcelain` (frontend) after checks | LOCAL_NOW | attributable changed-file set is exactly `frontend/components/landing-sections.tsx` | §4.6 single-file proof |
| DEFERRED | `npm test`, G2 needle run, `npm run lint`, coverage-scope, forbidden-path negative search | DEFERRED_TO_INTEGRATION | owned by `UA-W2-I001` | A4 UA-W2-V2/V4/V5 |

Workspace write set of every LOCAL_NOW command: the writable file only.

### 7.4 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match. Evidence: ___
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline. Evidence: ___
- [ ] T1 Apply every ordered transformation and no other edit to the writable file. Evidence: ___
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions. Evidence: ___
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file. Evidence: ___
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips. Evidence: ___
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations. Evidence: ___
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred. Evidence: ___
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW. Evidence: ___

(For V3: required local IDs for this leaf = ∅; CASE-UA-W2-003 registration/execution is owned
by `UA-W2-S003`; `recordExecuted` is never called by this leaf.)

## 8. Initial implementation sub-window `UA-W2-S003`

```yaml
subwindow_id: UA-W2-S003
type: FILE
parent_window_id: UA-W2
parent_assignment_id: ASG-UA-W2-01
assigned_agent: UNASSIGNED
predecessors: [UA-W2-S001, UA-W2-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w2.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md
  - frontend/test/uphunt-aesthetic-coverage.test.ts
  - frontend/test/design-system-primitives.test.ts
  - frontend/app/globals.css
  - frontend/components/section-intro.tsx
  - frontend/components/landing-sections.tsx
authorized_actions:
  - create_writable_file_with_exact_content_below
  - run_node_test_on_writable_file
  - run_disposable_tmp_negative_control_probes_N1_N2
  - record_git_status_preflight_and_postcondition
  - remove_generated_test_dot_ua_executed_json
prohibited_actions:
  - edit_any_workspace_file_other_than_writable_file
  - edit_globals_css
  - edit_uphunt-aesthetic-coverage_test_or_REQUIRED_CASE_IDS
  - edit_parked_SRC-UA-0092_test_files
  - edit_section_intro_or_landing_sections
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

### 8.1 Mechanical trace

- Requirements: REQ-UA-001, REQ-UA-002, REQ-UA-006, REQ-UA-007.
- Decisions: DEC-UA-001 (`#c8f04b` pin), DEC-UA-002, DEC-UA-008 (motion assertions),
  DEC-UA-011 (`recordExecuted` import + call-after-witness), DEC-UA-013 (preflight).
- Task: UA-W2-T3. Scenarios/coverage: SCN-UA-001 → CASE-UA-W2-001, CASE-UA-W2-004;
  SCN-UA-002 → CASE-UA-W2-002, CASE-UA-W2-003. Negative controls: NC-UA-001 (probes N1/N2),
  NC-UA-002 (cited from S001/S002 leaf probes).
- Every requirement terminates in an executable assertion inside the single writable file.

### 8.2 Exact file transformation

1. Starting state: `frontend/test/uphunt-aesthetic-w2.test.ts` ABSENT; no anchors (new file).
2. Target anchor: the exact 100%-complete file content in §8.3 (byte-identical, final newline,
   no trailing whitespace, no BOM).
3. Ordered edits (atomic CREATE, one operation): write the §8.3 content once. No second write
   pass, no post-write formatting.
4. Complete signatures/constants: imports `assert` from `node:assert/strict`, `readFile` from
   `node:fs/promises`, `test` from `node:test`, and `recordExecuted` from
   `./uphunt-aesthetic-coverage.test.ts`; three top-level `readFile`s of `../app/globals.css`,
   `../components/section-intro.tsx`, `../components/landing-sections.tsx`; exactly four
   `test()` blocks titled with CASE-UA-W2-001..004 in ascending order, each ending in exactly
   one `recordExecuted("<case id>")` call placed after its assertions.
5. Imports/exports/consumers affected: exports nothing; imported by nothing. Importing the
   coverage registry re-executes its two CASE-UA-W1 tests inside this file's process (by design,
   `DEC-UA-011`); their `recordExecuted` calls merge into `.ua-executed.json` (idempotent).
6. Operation ordering / transaction class: `SAME_ATOMIC_BOUNDARY` of one file create; rollback
   = delete the file and `rm -f test/.ua-executed.json`.
7. Failure outcomes: if the LOCAL_NOW test run fails, or either negative-control probe fails to
   fail, stop and report `AWAITING_WINDOW_REVIEW`; no retry; no second file edit; never edit
   production files to make a CASE pass. Duplicate/restart: re-running the test only rewrites
   the disposable executed-set JSON, removed by V-D cleanup.
8. Preserved behavior: `frontend/test/uphunt-aesthetic-coverage.test.ts` and
   `frontend/test/design-system-primitives.test.ts` untouched; assertions in §8.3 are copied
   from the existing `design-system-primitives.test.ts` token/motion oracles plus the
   `DEC-UA-001` `#c8f04b` value pin.
9. Obsolete behavior removed: none.
10. Resulting interface exposed to successors: none (later windows create their own
    `uphunt-aesthetic-wN.test.ts` files).
11. Forbidden edits within the writable file: anything other than the §8.3 bytes; no comments;
    no fifth test; no `getExecuted()` vs `REQUIRED_CASE_IDS` full-set equality (UA-W15-V5 owns
    it); no `recordExecuted` call before a test's assertions; no skip filters.

### 8.3 Exact required ending file content

```ts
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const sectionIntro = await readFile(new URL("../components/section-intro.tsx", import.meta.url), "utf8");
const landingSections = await readFile(new URL("../components/landing-sections.tsx", import.meta.url), "utf8");

test("CASE-UA-W2-001 landing :root signal tokens remain", () => {
  for (const token of ["color-canvas", "color-ink", "color-signal"]) {
    assert.match(globals, new RegExp(`--${token}:`));
  }
  assert.match(globals, /--color-signal:\s*#c8f04b/u);
  recordExecuted("CASE-UA-W2-001");
});

test("CASE-UA-W2-002 section-intro exports the frozen SectionIntro heading recipe", () => {
  assert.match(sectionIntro, /export function SectionIntro/u);
  assert.match(sectionIntro, /className=\{`marketing-heading\$\{inverse \? " is-inverse" : ""\}`\}/u);
  assert.match(sectionIntro, /\{eyebrow !== undefined \? <span className="eyebrow">\{eyebrow\}<\/span> : null\}/u);
  assert.match(sectionIntro, /\{copy !== undefined \? <p>\{copy\}<\/p> : null\}/u);
  recordExecuted("CASE-UA-W2-002");
});

test("CASE-UA-W2-003 landing-sections imports the shared SectionIntro with call sites intact", () => {
  assert.match(landingSections, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.doesNotMatch(landingSections, /function SectionIntro/u);
  assert.equal([...landingSections.matchAll(/<SectionIntro /gu)].length, 3);
  recordExecuted("CASE-UA-W2-003");
});

test("CASE-UA-W2-004 reduced-motion rule remains with no global transition", () => {
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(globals, /transition-duration:\s*0\.01ms !important/u);
  assert.doesNotMatch(globals, /(?:^|\})\s*\*\s*\{[^}]*transition(?:-property)?:/u);
  recordExecuted("CASE-UA-W2-004");
});
```

### 8.4 Exact checks

| ID | Command / inspection (cwd `frontend/`) | Class | Expected | Activation witness / assertions |
|---|---|---|---|---|
| P1 | `git status --porcelain` in `frontend/` and in `/home/harit/Email Scrapper` | LOCAL_NOW | §3 inventory + S001+S002 accepted deltas + coordination artifacts only; `A5`/`A6` digests unchanged; predecessor coverage file still `f5137be4…` | DEC-UA-013 preflight recorded |
| P2 | `sha256sum` of writable file | LOCAL_NOW | ABSENT before; after: digest of §8.3 bytes, recorded | baseline + ending digest recorded |
| V-A | `node --experimental-strip-types --test test/uphunt-aesthetic-w2.test.ts` | LOCAL_NOW | exit 0; exactly 6 passing tests, 0 failed, 0 skipped: CASE-UA-W1-001 and CASE-UA-W1-002 (re-executed via the registry import) plus the four CASE-UA-W2-00x tests, in the order 001, 002, 003, 004 for the W2 titles | witnesses: "globals.css read" (001), "section-intro.tsx read" (002), "landing-sections import" (003), "reduced-motion regex" (004); each `recordExecuted` follows its assertions (present in §8.3 bytes) |
| V-B | after V-A: `cat test/.ua-executed.json` | LOCAL_NOW | JSON array of exactly 6 sorted unique IDs: the two CASE-UA-W1 IDs plus CASE-UA-W2-001..004 | required local (4) = registered (4) = executed W2 IDs (4); zero skips/duplicates/unexpected |
| V-C | NC probes in `/tmp/opencode/ua-w2-nc/` (disposable, outside-repo-target, no workspace writes): copy `frontend/app/globals.css` to the tmp dir; N1 = delete the line matching `--color-signal:` then run the CASE-UA-W2-001 oracle logic on the copy; N2 = delete the `@media (prefers-reduced-motion: reduce)` block then run the CASE-UA-W2-004 oracle logic on the copy; remove the tmp dir afterwards | LOCAL_NOW | both oracle runs FAIL on the defective copies | NC-UA-001 falsified (twice) at leaf level |
| V-D | `rm -f test/.ua-executed.json` then `git status --porcelain` | LOCAL_NOW | attributable changed-file set is exactly `frontend/test/uphunt-aesthetic-w2.test.ts`; `.ua-executed.json` residue removed; §3 protected paths byte-unchanged | §4.6 single-file proof with prescribed disposable cleanup |
| DEFERRED | `npm test`, G2 needle run, `npm run lint`, forbidden-path negative search, NC citations | DEFERRED_TO_INTEGRATION | owned by `UA-W2-I001` | A4 UA-W2-V2/V4/V5 |

Negative controls expected: 2 (N1, N2); both must fail as specified. Workspace write set of
every LOCAL_NOW command: the writable file only, plus the parent-authorized disposable runtime
file `frontend/test/.ua-executed.json` created by V-A and removed by V-D (DEC-UA-011; never
committed). V-C writes only inside `/tmp/opencode/ua-w2-nc/` (removed afterwards).

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

(For V3: required local IDs = {CASE-UA-W2-001..004}; registered = the four `test()` titles;
executed = the four IDs recorded via `recordExecuted`; the two CASE-UA-W1 IDs observed in V-B
are predecessor re-executions inside the import and are counted as predecessor cases, not
unexpected W2 cases.)

## 9. Local and whole-window verification gates

Leaf-local gates: §6.4, §7.3, §8.4. Frozen whole-window gates, executed only by `UA-W2-I001`
from `frontend/`, per `A4` §Gates, `A4` UA-W2 lifecycle, and `DEC-UA-014`:

| Gate | Command / assertion | Expected |
|---|---|---|
| G0 | `sha256sum frontend/test/uphunt-aesthetic-coverage.test.ts` + confirm `REQUIRED_CASE_IDS` block unchanged | digest still `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1`; 43-member array byte-unchanged |
| G1 | `npm test` | exit 0; 0 failed; the four CASE-UA-W2-00x tests pass inside the run; expected total 156 passing = 150 baseline (`EV-UA-W1-I-001`) + 6 in the w2-file process (4 new + 2 registry re-executions via the import); actual recorded |
| G2 | `npx tsc --noEmit --pretty false` (`DEC-UA-014` oracle) | PASS iff zero output lines contain any owned-path needle: `section-intro`, `landing-sections`, `uphunt-aesthetic-w2.test.ts`; expected remaining diagnostics: exactly the 10 parked SRC-UA-0092 lines in the five parked files; repo-wide exit 0 NOT required; parked files MUST NOT be edited |
| G3 | `npm run lint` | exit 0 (JSX owned this window: two components + one test file) |
| G4 | browser evidence | NOT RUN — skipped with reason: `browser_evidence: false` |
| G5 | coverage scope: required W2 set (4 IDs, digest `02f920493c7935e2ecd5a3fd3edf1a97450a915add21b63d4183de1a14f449dd`) = registered (four `test()` titles) = executed W2 IDs; after G1, `test/.ua-executed.json` is exactly the 6 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2}; zero skips, duplicates, unexpected, or unactivated IDs in this window; full 43-set equality NOT asserted (`UA-W15-V5` owns it) | exact |
| G6 | `git status --porcelain` + forbidden-path negative search over the whole window delta (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`, `email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, `frontend/app/globals.css`, the five parked test files, the coverage test file) | implementation delta == exactly the three §2 files; `globals.css` byte-unchanged (read-only this window); coordination artifacts limited to the enumerated §2 list; `A5`/`A6` digests unchanged by leaves |
| G7 | static inspection of leaf imports (`react` type-only, `node:test`, `node:assert/strict`, `node:fs/promises`, `node:url`, `./uphunt-aesthetic-coverage.test.ts`) + suite behavior | 0 network operations, 0 DB operations (`UA-W2-V3`) |
| G8 | NC-UA-002: cite S001 §6.4 V-B and S002 §7.3 V-C leaf probes from `S3`. NC-UA-001: personally re-execute the two §8.4 V-C disposable-copy probes (tmp copies only, no workspace writes) | all falsified: removing `--color-signal` fails CASE-UA-W2-001 logic; removing the reduced-motion block fails CASE-UA-W2-004 logic; the oracle fails under each prescribed defect |
| G9 | successor negative search: no `UA-W3` artifact of any kind (no `uphunt-aesthetic-w3.test.ts`, no edits to `app-header.tsx`/`auth-form.tsx`/`not-found.tsx`/`globals.css`), `A5.current_window` still `UA-W2`, `next_window` untouched | `may_start_successor: false` honored; `UA-W2-H4/H6` hold |

PASS oracle for `UA-W2-I001`: G0–G3 and G5–G9 all pass; G4 recorded as skipped-with-reason;
`A4` `UA-W2-P1..P4`, `UA-W2-V1..V5`, `UA-W2-H1..H5` then checked with resolvable evidence;
`frontend/review-evidence/uphunt-aesthetic/UA-W2_HANDOFF.md` written per §12.3;
`A5.current_status` set to `AWAITING_REVIEW`; STOP per `UA-W2-H6` (no `UA-W3`).
CORRECTION_REQUIRED oracle: any G-gate behavioral failure → §10 correction loop with
`UA-W2-C00n` (single-file, dependency-safe).
PARENT_BLOCKED oracle: missing parent decision, contradiction with `A1`–`A4`, or required
scope expansion (e.g., a defect that cannot be corrected without editing `globals.css` or a
parked file).

## 10. Correction and re-assessment rules

1. Every correction is a new single-file sub-window `UA-W2-C00n` with a new assignment ID and
   baseline digest, citing: the failed evidence, exact root cause, the governing requirement and
   decision already determining the remedy, the earlier sub-window corrected, and the gates
   invalidated. Nothing is rewritten in place; `S3` is append-only.
2. `REQUIRED_CASE_IDS` and the coverage test file are NOT correctable at window level
   (`A5` prohibitions). A defect requiring changes there is `PARENT_BLOCKED`.
3. `globals.css` is read-only in `UA-W2` (`DEC-UA-001`: keep existing tokens). A failing
   CASE-UA-W2-001/004 that is not explained by a leaf defect is `PARENT_BLOCKED`, never a
   `globals.css` edit.
4. After the last correction the window agent personally runs a new assessment `UA-W2-I00n`
   (new ID), reusing unchanged gates by exact reference and rerunning every gate invalidated by
   the correction (at minimum G0, G1, G2, G5, G6, G8), the coverage closure checks, and the
   forbidden-path negative search.
5. Environment rule (E8.1, inherited from `A5`): an otherwise-authorized local check MAY start
   with sandbox escalation. If an attempt is invalidated solely by sandbox denial or execution-
   channel loss, one identical recovery run is permitted (same arguments, selection, environment,
   fixtures, timeouts, resources, oracle, write scope) after read-only proof that no matching
   process, workspace/external mutation, or usable acceptance result remains. A changed command,
   an observable product/test failure, or any external action is NOT recoverable this way and
   enters the correction loop or `PARENT_BLOCKED`. Recovery limit: 1 per invalidated execution.
6. The window agent never repairs a leaf file directly; only corrective sub-windows edit files.

## 11. Mandatory authoring-readiness checklist (sub-window standard §11)

Evidence citations resolve into `S3` (`EV-UA2-D-001..003`).

### 11.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA2-D-001 (A5: ASG-UA-W2-01, UA-W2-WINDOW-AGENT, IN_PROGRESS, decompose action authorized)
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA2-D-001 (recomputed SHA-256 matches all pins incl. A4 `626c2a70…`)
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA2-D-003 (§2, §6–§8, §9 of this S1)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA2-D-002 (§3 of this S1)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA2-D-003 (S1 spec / S2 state / S3 evidence paths)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA2-D-003 (leaf prohibited_actions; report-only-to-window-agent rule)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: EV-UA2-D-003 (§10 item 5 == A5 policy)

### 11.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA2-D-003 (§5 table; A3 implementing_tasks; A4 test_registration)
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA2-D-001 (DEC-UA-002/014 complete; predecessor digest pin holds; current source matches DEC-UA-002 recipe and DEC-UA-001 `#c8f04b`)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA2-D-002 (both = {frontend/components/section-intro.tsx, frontend/components/landing-sections.tsx, frontend/test/uphunt-aesthetic-w2.test.ts}; planned-file-set digest `1c9285240ded48856d6cddff5088aec458d6c6d70a92c5d54bf4ad3f9c940f4d`)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: EV-UA2-D-003 (§4: S001/S002/S003, one file each)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: EV-UA2-D-003 (§6.2–§6.3, §7.2, §8.2–§8.3)
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: EV-UA2-D-003 (§4; no waves)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: EV-UA2-D-003 (§5.1 frozen before S002 dispatch; predecessor §5.1 of UA-W1 pinned by digest)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: EV-UA2-D-003 (§4.1 table)
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: EV-UA2-D-003 (component / consumer / test split across S001/S002/S003)
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: EV-UA2-D-003 (command lists in §6.4/§7.3/§8.4; only prescribed disposable write is `.ua-executed.json` with prescribed cleanup; tsc leaf runs use `--incremental false` so no `*.tsbuildinfo` write)

### 11.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7 of the standard. Evidence: EV-UA2-D-003 (§6, §7, §8 yaml blocks; document lint EV-UA2-D-003)
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: EV-UA2-D-003 (byte-exact §6.3/§8.3; two exact edits in §7.2)
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: EV-UA2-D-003 (§6.4, §7.3, §8.4)
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: EV-UA2-D-003 (V-C/V-D rows in §6.4/§7.3/§8.4)
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: EV-UA2-D-003 (§12 templates; H3 rows)
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: EV-UA2-D-003 (leaf prohibited_actions)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: EV-UA2-D-003 (each leaf's LOCAL_NOW set passes standalone; whole-window gates deferred and named)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: EV-UA2-D-003 (DEFERRED rows → UA-W2-I001)

### 11.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: EV-UA2-D-003 (§5; 4 cases → S003 with §8.3 bytes)
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: EV-UA2-D-003 (§8.4 V-B; §9 G5)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: EV-UA2-D-003 (NC-UA-002 probes at S001/S002 leaf level; NC-UA-001 probes at S003 leaf level with I001 re-execution)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: EV-UA2-D-003 (SUB-UA-001 inherited: UTF-8 file reads are source-text oracles only; no computed-pixel claim; `design-system-primitives.test.ts` and the coverage file are accepted tests — never weakened here)
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: EV-UA2-D-003 (§13: authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: EV-UA2-D-003 (§9; G4 skipped-with-reason)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: EV-UA2-D-003 (§10)
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: EV-UA2-D-003 (§13 assigned WINDOW-AGENT; §10 item 6)
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: EV-UA2-D-003 (§9 G0/G5/G8; §8.4 V-B)
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: EV-UA2-D-003 (§12.3)
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: EV-UA2-D-003 (§10 item 5)

### 11.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA2-D-003 (`UA-W2-S001/S002/S003`, `UA-W2-I001` unique; CASE/DEC/REQ/SCN/NC IDs cite A3/A4)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA2-D-003 (S1 contains only concrete paths, digests, bytes)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA2-D-003 (exact-set comparisons in §6.4 V-C, §7.3 V-D, §8.4 V-D; prescribed disposable `.ua-executed.json` excluded by cleanup)
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: EV-UA2-D-002 (SW-D03 set equality is the failure detector)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: EV-UA2-D-003 (§8.3 four tests each call recordExecuted after the oracle; §9 G5 counts; A4 §Enforcement 1–4 inherited)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: EV-UA2-D-003 (byte-pinned §6.3/§8.3; any divergence changes the diff reviewed at I001; accepted tests untouched)
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: EV-UA2-D-003 (leaf prohibited_actions + §4.6 proofs)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: EV-UA2-D-003 (§10 items 1, 6)
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: EV-UA2-D-003 + S2 `decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`, leaves `assigned_agent: UNASSIGNED`
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA2-D-003 (field-presence lint over §6/§7/§8 blocks: 15/15 required fields in each; 0 unresolved references)
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: EV-UA2-D-003 (§10 item 5)

## 12. Handoff templates

### 12.1 Leaf completion certificate (returned by each leaf agent)

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W2
subwindow_id: UA-W2-S001 | UA-W2-S002 | UA-W2-S003
assignment_id: ASG-UA-W2-01-S001 | ASG-UA-W2-01-S002 | ASG-UA-W2-01-S003
agent_identity: exact identity
writable_file: exact path from §6/§7/§8
starting_file_digest: ABSENT | 33f7670852e90b781225f21049e54f275fed93f4f2603c73678064066c0babce | ABSENT
ending_file_digest: sha256
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
attributable_changed_file_set: [writable file only]
required_local_cases: [] | [] | [CASE-UA-W2-001, CASE-UA-W2-002, CASE-UA-W2-003, CASE-UA-W2-004]
registered_local_cases: same as required_local_cases
executed_local_cases: same as required_local_cases
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 1 | 1 | 2
negative_controls_falsified: 1 | 1 | 2
commands: []
deferred_integration_checks: [UA-W2-I001 gates per §9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

### 12.2 Window-agent integration certificate (appended to `S3` by `UA-W2-I001`)

The §12.4 certificate of the sub-window standard, adapted: `integration_assessment_id:
UA-W2-I001`; `accepted_initial_subwindows` from leaf reviews; `expected_changed_file_set` =
the three §2 implementation files; `required_case_count: 4` (window-local; the 43-ID registry
equality is UA-W15-V5); `registered_case_count: 4`; `executed_case_count: 4`;
`required_case_set_digest: 02f920493c7935e2ecd5a3fd3edf1a97450a915add21b63d4183de1a14f449dd`;
registered/executed digests computed with the §4.7 formula over the same four IDs;
`status: READY_FOR_PARENT_REVIEW` only per the §9 PASS oracle.

### 12.3 Consolidated parent handoff

`frontend/review-evidence/uphunt-aesthetic/UA-W2_HANDOFF.md` per `A4` handoff template and
sub-window standard §12.5: objective; status `READY_FOR_PARENT_REVIEW` or one exact blocker;
changed-file set + starting/ending SHA-256s (including the predecessor's unchanged
`f5137be4…`); CASE required/registered/executed/skipped/duplicate/unexpected
(4/4/4/0/0/0 window-local; 2 additional registry IDs re-executed via import; full 43-set
equality deferred to UA-W15); required-set digest `0d14982c…` (registry) and W2-set digest
`02f92049…`; commands and outcomes; sandbox recoveries; NC results; forbidden-path negative
search; `S1`/`S2`/`S3` paths and revisions; confirmation that `UA-W3` was not started.

## 13. Initial integration assessment `UA-W2-I001` (fully authored now)

```yaml
subwindow_id: UA-W2-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W2
parent_assignment_id: ASG-UA-W2-01
assigned_agent: WINDOW-AGENT (UA-W2-WINDOW-AGENT, personally executed, never delegated)
predecessors: [UA-W2-S001, UA-W2-S002, UA-W2-S003]
authorized_write_file: NONE (implementation files; coordination artifacts per §2 only)
input: assembled UA-W2 state after UA-W2-S003 is accepted
gates: §9 table G0–G9 (frozen)
pass_oracle: G0,G1,G2,G3,G5,G6,G7,G8,G9 pass; G4 skipped-with-reason recorded
correction_oracle: any behavioral gate failure -> §10 loop with UA-W2-C00n
parent_blocked_oracle: missing decision / contradiction / scope expansion (incl. §10 items 2–3)
execution_policy: E8.1 sandbox escalation + one identical recovery (§10 item 5)
may_start_successor: false
```

Accepted-subwindow and digest fields are filled from completed leaf evidence at run time;
the gate set above is frozen now (sub-window standard §9.1).

## 14. Append-only amendment sections

Reserved for corrective sub-windows (`UA-W2-C001`, …) and further assessments
(`UA-W2-I002`, …). Each amendment repeats the §6 block structure in full with a new ID,
new baseline digest, cited trigger evidence, and invalidated gates. Existing sections above
are immutable after parent approval.
