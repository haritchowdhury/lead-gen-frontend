# Uphunt-aesthetic execution checklist (`A4`)

**Status:** Authoring boxes in §0 are complete. No window may be assigned until `A5.current_status` is `READY` and Section 9 `AUTHORING-READY` is in `A6`. Implementation, verification, and handoff boxes remain unchecked.

Other artifacts: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`; `A3` `A3_DECISION_LEDGER.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`; `A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

Standards: parent `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` revision `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848`; sub-window `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` revision `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0`.

After a parent window is assigned, a window agent SHALL decompose it into single-file sub-windows under the sub-window standard. This `A4` does not itself assign sub-windows. After decomposition is parent-accepted (`READY`), the parent also does not assign, correct, or accept FILE leaves (`DEC-UA-015`). The window agent owns S00x through I00n. Parent checkpoints for a window are only decomposition review, genuine `PARENT_BLOCKED`, and whole-window review after `A5` `AWAITING_REVIEW`. `may_start_successor: false` is the next parent window, not the next FILE leaf. FILE H3 `AWAITING_WINDOW_REVIEW` is a file-writer certificate field, not a parent stop. Parent paste after decomposition accept is one paste for the remaining DAG; the next parent paste is I001 handoff or a blocker.

## 0. Authoring readiness (mandatory copies)

Checked items cite `A6` evidence IDs. Unchecked items keep the package draft.

### 7.1 Authority and artifacts

- [x] `PA-001` All governing instructions and authorities are recorded. Evidence: EV-UA-A-001
- [x] `PA-002` All eight artifacts exist at named paths. Evidence: EV-UA-A-002
- [x] `PA-003` Mutable status exists only in `A5`. Evidence: EV-UA-A-003
- [x] `PA-004` Execution and approval boundaries are explicit. Evidence: EV-UA-A-001
- [x] `PA-005` Current working tree and repository boundaries were inspected. Evidence: SRC-UA-0001
- [x] `PA-006` Product scope, exclusions and compatibility policy are locked. Evidence: A1 REQ-UA-005 §7
- [x] `PA-007` The canonical authoring-standard path and revision are pinned for the assignment. Evidence: SRC-UA-0002 A5
- [x] `PA-008` A5 grants standing sandbox escalation for already-authorized local actions and forbids treating that privilege as expanded external authority. Evidence: A5 execution_environment_policy

### 7.2 Evidence and payload safety

- [x] `PP-001` Every material fact has an allowed classification. Evidence: A2
- [x] `PP-002` No inferred fact enters a locked contract or task. Evidence: A2 inferred section; A1/A3 have no inferred claims
- [x] `PP-003` Every payload has provenance-labelled sanitized evidence. Evidence: EV-UA-A-004 (N/A new payload; existing Lead/ResearchResult types unchanged)
- [x] `PP-004` Every consumed field has one exact evidence-backed path and type. Evidence: EV-UA-A-004
- [x] `PP-005` Every payload has a strict parser and normalized internal result. Evidence: EV-UA-A-004 (existing Zod; not edited)
- [x] `PP-006` Missing, malformed, boundary and unknown-field fixtures exist. Evidence: EV-UA-A-004 (N/A new parser; existing fixtures.ts preserved)
- [x] `PP-007` Multiple supported shapes use explicit evidence-backed discrimination. Evidence: EV-UA-A-004
- [x] `PP-008` No fallback probing, alias guessing, permissive cast or synthetic evidence remains. Evidence: DEC-UA-006
- [x] `PP-009` Raw secrets and unnecessary private payload data are excluded. Evidence: A2 privacy lines
- [x] `PP-010` All unknown payload facts are blocking or safely parked. Evidence: SRC-UA-0090 SRC-UA-0091

### 7.3 Discovery and lifecycle closure

- [x] `PD-001` All applicable discovery inventories in Phase B are complete. Evidence: A2 Phase B table
- [x] `PD-002` Claimed absences have negative-search evidence. Evidence: SRC-UA-0023 SRC-UA-0024
- [x] `PD-003` Every workflow has a complete state-transition table. Evidence: EV-UA-A-005 (preserve existing; no new transitions)
- [x] `PD-004` Every external and durable failure boundary is classified. Evidence: EV-UA-A-005
- [x] `PD-005` Duplicate, reorder, retry, restart, stale-process and cancellation behavior is locked. Evidence: EV-UA-A-005 (unchanged, not reimplemented)
- [x] `PD-006` Every terminal and visibility boundary has durable evidence. Evidence: EV-UA-A-005

### 7.4 Decision closure

- [x] `PC-001` Every applicable D1-D13 ledger, including D2A, is complete. Evidence: A3 D1–D13 table
- [x] `PC-002` Every interface and payload schema is exact. Evidence: DEC-UA-002
- [x] `PC-003` Every multi-write sequence is atomic or has an exact recovery protocol. Evidence: VisualTaskDefaults item 8
- [x] `PC-004` Every durable key, identity, fingerprint and timestamp has an exact formula/source. Evidence: EV-UA-A-005 N/A new keys
- [x] `PC-005` Every identity cardinality and substitution rule is explicit. Evidence: A3 D3
- [x] `PC-006` Every competing-owner pair has atomic exclusion, fencing or commutativity proof. Evidence: A3 D4 N/A new pairs
- [x] `PC-007` Every external operation has bounded cardinality, cost, retry and ambiguity semantics. Evidence: A3 D6
- [x] `PC-008` Every permitted retry reconstructs all inputs from durable evidence. Evidence: EV-UA-A-005 N/A visual retries
- [x] `PC-009` Every replay-affecting configuration value has an exact durability/drift policy. Evidence: A3 D7
- [x] `PC-010` Control-plane, status and public-output paths are closed. Evidence: A3 D8 A4 windows
- [x] `PC-011` Build/runtime/deployment dependency closure is proven. Evidence: SRC-UA-0022 DEC-UA-001
- [x] `PC-012` Applied environment capabilities and limits are measured or gated. Evidence: SRC-UA-0020 SRC-UA-0090 SRC-UA-0092 DEC-UA-014
- [x] `PC-013` Scale, operation-growth and resource ceilings are locked. Evidence: A3 D11 DEC-UA-005 heights
- [x] `PC-014` Historical/mixed-version policy is an explicit product decision. Evidence: A1 §6 A3 D12 compact-lead mode not supported
- [x] `PC-015` No task leaves two materially different implementations possible. Evidence: DEC-UA-001 through DEC-UA-016
- [x] `PC-016` Storage transport, namespace, migration history and test cleanup are proven isolated. Evidence: A3 D2A

### 7.5 Scenario and acceptance closure

- [x] `PS-001` Scenario dimensions derive from current ledgers. Evidence: A3 scenarios
- [x] `PS-002` Combination strategy and exclusions are justified. Evidence: EV-UA-A-006
- [x] `PS-003` Every scenario has exact preconditions, actions, activation witnesses and oracle. Evidence: A3 SCN-UA-001..006
- [x] `PS-004` Representative nonempty end-to-end behavior is required. Evidence: SCN-UA-003 SCN-UA-004
- [x] `PS-005` End-to-end acceptance cannot pass through a zero-work/bypass path. Evidence: NC-UA-002 NC-UA-004
- [x] `PS-006` Negative controls prove that required tests can fail. Evidence: NC-UA-001..006
- [x] `PS-007` Every durable/external failure boundary has injection coverage. Evidence: EV-UA-A-005 N/A new boundaries
- [x] `PS-008` Every competing-owner pair has a schedule-sensitive behavioral test. Evidence: A3 D4 N/A
- [x] `PS-009` Generated tests use evidence-backed values, deterministic replay and invariants. Evidence: EV-UA-A-006 N/A random generation
- [x] `PS-010` Representative and maximum workload tests assert operation/resource ceilings. Evidence: DEC-UA-005 wrap heights as resource ceiling
- [x] `PS-011` Evidence parity classes match every acceptance claim. Evidence: A3 parity_class fields
- [x] `PS-012` Final/public output is traced to the exercised path. Evidence: A8
- [x] `PS-013` Every applicable window has a complete behavioral coverage matrix derived from reachable paths and behavior-changing partitions. Evidence: A4 §Coverage
- [x] `PS-014` Every required coverage case has one unique ID and exactly one planned executable registration. Evidence: A4 §Coverage
- [x] `PS-015` Acceptance requires exact required/registered/executed case-set equality, zero required skips and an independently recomputed digest. Evidence: EV-UA-A-009; UA-W15-V5; CASE-UA-W15-003
- [x] `PS-016` Every critical invariant has a named falsification control. Evidence: NC-UA-001..006 INV-UA-001..010 mapped in A8
- [x] `PS-017` Every test substitute has a fidelity proof or a narrowed parity claim. Evidence: EV-UA-A-007
- [x] `PS-018` Accepted tests and fixtures have explicit immutability and evidence-invalidation rules. Evidence: EV-UA-A-007
- [x] `PS-019` Frozen final gates are exact, risk-proportionate and bounded for stateful/costly suites. Evidence: A4 §Gates
- [x] `PS-020` Handoff evidence must record coverage counts, skips, duplicates, unexpected IDs, activation failures, negative-control results and digest. Evidence: A4 handoff template
- [x] `PS-021` Frozen gates distinguish behavioral failure from proven environment invalidation and prescribe one identical escalated recovery with exact postcondition evidence. Evidence: A5 E8.1 policy

### 7.6 Window and agent-boundary closure

- [x] `PW-001` The dependency DAG is acyclic and complete. Evidence: A4 §DAG
- [x] `PW-002` Every window establishes one coherent capability. Evidence: F1 objectives
- [x] `PW-003` Every task contains all fifteen F3 fields. Evidence: VisualTaskDefaults plus per-task overrides
- [x] `PW-004` Every task has one complete mechanical trace. Evidence: A8
- [x] `PW-005` Every window has exact write, read, action and prohibition scope. Evidence: F1 yaml
- [x] `PW-006` Shared-file ownership is symbol-specific and ordered. Evidence: F1 shared_file_scope
- [x] `PW-007` Default assignments authorize exactly one window. Evidence: DEC-UA-007 DEC-UA-015 A5
- [x] `PW-008` Successor reservation and `may_start_successor` are explicit. Evidence: F1 successor fields
- [x] `PW-009` Handoff verifies the actual diff against authorized scope. Evidence: handoff H1
- [x] `PW-010` No successor task is required to satisfy predecessor acceptance. Evidence: each window local CASE ids
- [x] `PW-011` Every implementation, verification and handoff action is an actual checkbox. Evidence: this file
- [x] `PW-012` Every checked planning box cites resolvable evidence. Evidence: this section

### 7.7 Traceability and change control

- [x] `PT-001` Every requirement has a complete A8 trace. Evidence: A8
- [x] `PT-002` Every source-set member has exactly one plan owner and assertion. Evidence: A4 file ownership
- [x] `PT-003` Every planned member has a requirement and source/target anchor. Evidence: tasks
- [x] `PT-004` Evidence is append-only and cannot authorize behavior. Evidence: A6 header
- [x] `PT-005` Revision/changelog and invalidation rules are present. Evidence: A7
- [x] `PT-006` Active-state concurrency/version checks and standard/contract/decision/checklist revision pins are specified. Evidence: A5
- [x] `PT-007` IDs are unique and never reused. Evidence: EV-UA-A-008

### 7.8 Audit and readiness

- [x] `PR-001` Forward simulation passed for normal and every failure boundary. Evidence: EV-UA-A-011
- [x] `PR-002` Backward simulation traced every public/terminal field to evidence or formula. Evidence: EV-UA-A-012
- [x] `PR-003` Independent reachable-set audit passed. Evidence: EV-UA-A-013
- [x] `PR-004` Payload no-guessing audit passed. Evidence: EV-UA-A-004
- [x] `PR-005` Anti-vacuity and negative-control audit passed. Evidence: EV-UA-A-014
- [x] `PR-006` Environment/runtime/deployment parity audit passed. Evidence: EV-UA-A-007 SRC-UA-0090
- [x] `PR-007` Scale and competing-owner falsification passed. Evidence: EV-UA-A-015
- [x] `PR-008` Mistake-derived conformance audit in Section 12 passed. Evidence: EV-UA-A-016
- [x] `PR-009` Mechanical checklist lint has no missing IDs, links, evidence or scopes. Evidence: EV-UA-A-010
- [x] `PR-010` No implementation-affecting choice is delegated. Evidence: EV-UA-A-010
- [x] `PR-011` Enforcement lint rejects missing, duplicate, skipped, filtered, unactivated or unexpected coverage cases. Evidence: EV-UA-A-009 A4 §Enforcement
- [x] `PR-012` Substitute-fidelity and accepted-test invalidation audits passed. Evidence: EV-UA-A-007
- [x] `PR-013` Sandbox escalation and identical-recovery lint rejects parent round trips for privilege alone, changed-command retries, real-failure relabelling and external-authority expansion. Evidence: EV-UA-A-017

## VisualTaskDefaults (F3 fields 1–15)

Every `UA-Wn-T*` task includes these fields. A task lists only overrides; omitted override means the default. Defaults are still part of the task. The checkbox ID is F3 field 1.

1. task ID: the checkbox ID `UA-Wn-T*`.
2. requirement and decision IDs: from the task line and the window's covering DEC-UA / REQ-UA IDs.
3. source anchor: from the task line.
4. target anchor: from the task line.
5. complete interface: no new props unless the task names them; SectionIntro is DEC-UA-002 only.
6. exact ordered algorithm: open the writable file; apply the listed CSS/JSX edits in listed order; do not edit unowned symbols.
7. durable/external order: none. No network, no DB.
8. transaction class: `SAME_ATOMIC_BOUNDARY` of one file edit. Rollback is revert that file.
9. identity/key/fingerprint/timestamp: N/A (no new identities).
10. failure/retry/duplicate/concurrency/restart/cancellation: if a local test fails, stop the task; do not retry API; React state already on screen is not reset by CSS.
11. fixed dependencies/bounds: DEC-UA-005 heights and DEC-UA-004 type floors when the task owns those selectors; viewports 390×844, 768×1024, 1280×800, 1440×900 when the window requires browser evidence.
12. callers/obsolete: listed; unused owned CSS may be deleted only if the task names the selector.
13. tests: the CASE IDs listed on the task; commands in §Gates; each test calls `recordExecuted` only after the activation witness and oracle.
14. output consumed by another task/window: resulting CSS/JSX; later windows must not restyle owned selectors.
15. non-goals and forbidden edits: DEC-UA-006 forbidden paths; Chart.js math; copy paraphrase; dark mode; unowned `globals.css` selectors; `frontend/app/api/**`; `frontend/lib/api-types.ts`; `frontend/lib/api-validation.ts`; `frontend/lib/client-api.ts`; `email_scraper/**`; root `ACTIVE_EXECUTION_STATE.md`.

## F1Defaults

Each window yaml is the merge of this block then the window-specific yaml (window keys win).

```yaml
assigned_agent_policy: one_window
authorized_actions: [edit_owned_files, run_frontend_npm_test, run_npx_tsc_noEmit, run_npm_run_lint_when_css_jsx_owned, run_headless_chrome_when_browser_evidence_true]
prohibited_actions: [aws, commit, push, production, paid_provider, edit_email_scraper, edit_root_ACTIVE_EXECUTION_STATE, start_successor]
consumes: predecessor window produces plus this package A1-A8
```

## DAG

```text
UA-W1 -> UA-W2 -> UA-W3 -> UA-W4 -> UA-W5 -> UA-W6 -> UA-W7 -> UA-W8 -> UA-W9 -> UA-W10 -> UA-W11 -> UA-W12 -> UA-W13 -> UA-W14 -> UA-W15 -> STOP
```

No parallel parent windows (`globals.css` shared). `may_start_successor: false` on every window (next parent window only; not a FILE-leaf brake; `DEC-UA-015`).

## Gates

From `frontend/` unless noted:

- Diagnostic during edit: owned test file via `node --experimental-strip-types --test test/<file>.test.ts`
- Frozen window gate: `npm test` (DEC-UA-016 from UA-W6 onward: PASS iff no failure outside the named predecessor heading-oracle set; allocated UA CASE tests must pass; process exit 1 is not G1 FAIL when only that set fails). Before UA-W6, G1 was exit 0.
- Frozen typecheck G2: from `frontend/`, `npx tsc --noEmit --pretty false`. PASS iff zero diagnostics mention a path in the active window's `authorized_write_scope` (DEC-UA-014). Repo-wide tsc exit 0 is not required.
- Frozen window gate when CSS/JSX owned: `npm run lint`
- Frozen window gate UA-W15 only: `npm run build` (sandbox escalation allowed; identical retry once per E8.1)
- Browser evidence when F1 `browser_evidence: true`: `google-chrome --headless` screenshots of owned routes at 390, 768, 1280, 1440 under `frontend/review-evidence/uphunt-aesthetic/UA-Wn/` using only synthetic fixtures. No credentials.
- Coverage: `listRequiredCaseIds()` digest vs A4 required set; executed set from tests.

Do not run backend integration or AWS.

## Handoff template (every window)

Create `frontend/review-evidence/uphunt-aesthetic/UA-Wn_HANDOFF.md` with: objective, status, changed-file set, starting/ending file SHA-256s, CASE required/registered/executed/skipped/duplicate/unexpected, digest hex `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` after UA-W15, commands, sandbox recoveries, NC results, forbidden-path negative search, confirmation successor not started.

Per-window F2/F4/F5 boxes live in §Lifecycle. Do not use unprefixed H1/H2/H3 IDs.

## Lifecycle (F2, F4, F5)

These are the actual precondition, verification, and handoff checkboxes. Window sections below contain F1 yaml and F3 task boxes only.

### UA-W1 lifecycle

- [x] UA-W1-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: S3 EV-UA1-X-002 (ASG-UA-W1-02; A1 a33ae1d8…, A3 8faaa4e2…, A4 f1d8252c… all MATCH; A5 state_version 3)
- [x] UA-W1-P2 Required predecessor outputs exist and validate (none). Evidence: S3 EV-UA1-D-002
- [x] UA-W1-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: S3 EV-UA1-D-002 (node v24.14.1; test script present; browser_evidence false)
- [x] UA-W1-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: S3 EV-UA1-D-002 EV-UA1-X-001
- [x] UA-W1-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence. Evidence: S3 EV-UA1-R-001 EV-UA1-I-001 (2/2 pass inside npm test 150/150; NC-UA-005/006 falsified)
- [x] UA-W1-V2 Frozen gate: from frontend/, `npm test`; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned. Evidence: S3 EV-UA1-I-002 (npm test 150/150; tsc --pretty false 10 diagnostics all parked SRC-UA-0092 files, zero on uphunt-aesthetic-coverage; lint N/A no CSS/JSX owned)
- [x] UA-W1-V3 Confirm this window introduced no new network/DB operations (operation count 0). Evidence: S3 EV-UA1-I-001 G7
- [x] UA-W1-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff. Evidence: S3 EV-UA1-I-001 G6
- [x] UA-W1-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only. Evidence: S3 EV-UA1-R-001 EV-UA1-I-001 G5 (.ua-executed.json = the two IDs exactly)
- [x] UA-W1-H1 Record changed files/symbols and migrations. Evidence: S3 EV-UA1-I-001 (1 implementation file CREATE; no migrations)
- [x] UA-W1-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: S3 EV-UA1-I-001 (G1..G9 with outcomes; G3/G4 skipped-with-reason per S1 §7)
- [x] UA-W1-H3 Diff names ⊆ authorized_write_scope. Evidence: S3 EV-UA1-I-001 G6
- [x] UA-W1-H4 No successor-window task or prohibited action was started. Evidence: S3 EV-UA1-I-001 G9
- [x] UA-W1-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: S3 EV-UA1-R-001 EV-UA1-I-002 + WINDOW-AGENT-INTEGRATION-PASS (UA-W1-I002); A6 EV-UA-W1-E-001 EV-UA-W1-I-001 EV-UA-W1-I-002; A5 current_status AWAITING_REVIEW
- [x] UA-W1-H6 Stop; do not assign or begin the successor. Evidence: S2 current_status BLOCKED; G9 negative search

### UA-W2 lifecycle

- [x] UA-W2-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: S3 EV-UA2-D-001; A5 ASG-UA-W2-01 pins verified at I001
- [x] UA-W2-P2 Required predecessor outputs exist and validate (UA-W1 coverage file). Evidence: G0 digest f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1
- [x] UA-W2-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: node v24.14.1; npm test/lint scripts; browser_evidence false (G4 skipped)
- [x] UA-W2-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: S3 EV-UA2-D-002; coordination root clean
- [x] UA-W2-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence. Evidence: S003 V-A; I001 G1 156 pass; CASE-UA-W2-001..004 all pass
- [x] UA-W2-V2 Frozen gate: from frontend/, `npm test`; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned. Evidence: I001 G1 exit 0; G2 zero owned-path needles; G3 lint exit 0
- [x] UA-W2-V3 Confirm this window introduced no new network/DB operations (operation count 0). Evidence: I001 G7 — file-read oracles only; imports node builtins + coverage registry
- [x] UA-W2-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff. Evidence: I001 G6 — three implementation files only; no globals.css or parked files
- [x] UA-W2-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only. Evidence: I001 G5 — 4/4/4 window-local; test/.ua-executed.json 6 IDs after G1
- [x] UA-W2-H1 Record changed files/symbols and migrations. Evidence: UA-W2_HANDOFF.md changed-file table; digests 159096f3…/914c61e5…/f65ba0c5…
- [x] UA-W2-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: UA-W2_HANDOFF.md commands table; G4 skipped browser_evidence false
- [x] UA-W2-H3 Diff names ⊆ authorized_write_scope. Evidence: I001 G6 implementation delta = §2 three files
- [x] UA-W2-H4 No successor-window task or prohibited action was started. Evidence: I001 G9 — no w3 test; no UA-W3 file edits
- [x] UA-W2-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: S3 UA-W2-I001; A6 EV-UA-W2-I-001; A5 AWAITING_REVIEW
- [x] UA-W2-H6 Stop; do not assign or begin the successor. Evidence: S2 next_subwindow STOP; may_start_successor false

### UA-W3 lifecycle

- [x] UA-W3-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: ___ Evidence: S3 S001 P1 + I001 G0/G9 (ASG-UA-W3-01; A1 a33ae1d8…, A3 8faaa4e2…, A4 79816d33…, A5 f843f58f… all MATCH; standards pinned)
- [x] UA-W3-P2 Required predecessor outputs exist and validate (UA-W2 SectionIntro). Evidence: ___ Evidence: S3 S001 P2 + I001 G0 (SectionIntro 159096f3…, coverage f5137be4…, landing 914c61e5…, w2 test f65ba0c5…)
- [x] UA-W3-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: ___ Evidence: node v24.14.1; test/lint scripts present; browser_evidence true → Chrome 146.0.7680.164 present and used at G4
- [x] UA-W3-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: ___ Evidence: S3 EV-UA3-D-002 (frontend delta = A5/A6 parent writes at window start; coordination root clean)
- [x] UA-W3-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence. Evidence: S3 S004 V-A/V-B + I001 G1/G5 (4/4 leaf pass from ABSENT json; 4/4 in npm test; witnesses recorded; NCs 3/3 falsified at S004 V-C and I001 G8)
- [x] UA-W3-V2 Frozen gate: from frontend/, `npm test`; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned. Evidence: I001 G1 npm test exit 0, 162/162; G2 zero owned-path needles (10 parked only); G3 lint exit 0; G4 16/16 screenshots
- [x] UA-W3-V3 Confirm this window introduced no new network/DB operations (operation count 0). Evidence: I001 G7 (node builtins + registry import only; 0 network / 0 DB)
- [x] UA-W3-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff. Evidence: I001 G6 (delta = exactly the four planned files + documented DEC-UA-011 runtime M on tracked .ua-executed.json inherited from owner commit d6121aa; no forbidden paths)
- [x] UA-W3-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only. Evidence: I001 G5 (.ua-executed.json = 10 sorted IDs; window-local 4/4/4, digest 25e6c1d7…; full equality remains UA-W15-V5)
- [x] UA-W3-H1 Record changed files/symbols and migrations. Evidence: ___ Evidence: UA-W3_HANDOFF.md changed-file table (4 files; ending digests efffc7b8…/0ec6a3b2…/325a442b…/635e2802…; no migrations)
- [x] UA-W3-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: ___ Evidence: UA-W3_HANDOFF.md commands table (G0–G9 outcomes; G4 executed with 16 screenshots)
- [x] UA-W3-H3 Diff names ⊆ authorized_write_scope. Evidence: ___ Evidence: I001 G6 (diff names ⊆ authorized_write_scope plus documented .ua-executed.json runtime output and coordination artifacts)
- [x] UA-W3-H4 No successor-window task or prohibited action was started. Evidence: ___ Evidence: I001 G9 (no successor work; A5 current_window UA-W3; may_start_successor false)
- [x] UA-W3-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: ___ Evidence: S3 WINDOW-AGENT-INTEGRATION-PASS UA-W3-I001; handoff written; A5 current_status AWAITING_REVIEW
- [x] UA-W3-H6 Stop; do not assign or begin the successor. Evidence: S2 next_subwindow STOP; G9 negative search; UA-W4 not started

### UA-W4 lifecycle

- [x] UA-W4-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: S3 EV-UA-W4-S-001 P1 (A5 cf8a54c7…; S1 7663766a…; A1/A3/A4 pins matched at dispatch)
- [x] UA-W4-P2 Required predecessor outputs exist and validate (UA-W3 header/auth). Evidence: S1 §1 pins recomputed; EV-UA-W4-D-001 (section-intro 159096f3…, coverage f5137be4…, w3 test 635e2802…, landing-sections 914c61e5…)
- [x] UA-W4-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: EV-UA-W4-D-001 (node v24.14.1; npm test script) + EV-UA-W4-I-001 G4 (/usr/bin/google-chrome used)
- [x] UA-W4-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: S1 §3 (change-set digest e64ba5df…; protected A5/A6); EV-UA-W4-S-001 V-A preflight
- [x] UA-W4-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence. Evidence: S3 EV-UA-W4-S-002 (V-B w4-only run from ABSENT json: 4/4 pass, exactly 4 IDs; V-C NCs 3/3 falsified) + EV-UA-W4-I-001 (G1 in-suite pass; G8 NCs 3/3)
- [x] UA-W4-V2 Frozen gate: from frontend/, `npm test`; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned. Evidence: EV-UA-W4-I-001 G1 166 pass/0 fail; G2 13 physical lines = 10 parked diagnostics, zero owned-needle lines; G3 lint exit 0
- [x] UA-W4-V3 Confirm this window introduced no new network/DB operations (operation count 0). Evidence: EV-UA-W4-I-001 G7 (imports node:test/assert/fs/url + coverage module only; suite behavior static-file reads)
- [x] UA-W4-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff. Evidence: EV-UA-W4-I-001 G6 (forbidden-path negative search: 0 hits; root ACTIVE_EXECUTION_STATE.md untouched)
- [x] UA-W4-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only. Evidence: S1 §7.3 bytes (2 tests, recordExecuted after assertions; digest 8008501d…); EV-UA-W4-S-002 V-B (4-ID executed set from ABSENT, digest 9be62b77…); window-local digest ea7e02bc…
- [x] UA-W4-H1 Record changed files/symbols and migrations. Evidence: S3 EV-UA-W4-S-001/002 (globals.css 325a442b…→04df3d7e…, five-line retarget on .run-form-card rules; new test file 8008501d…; no migrations)
- [x] UA-W4-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: S3 EV-UA-W4-S-001/002/I-001 command lists; zero skipped checks
- [x] UA-W4-H3 Diff names ⊆ authorized_write_scope. Evidence: EV-UA-W4-I-001 G6 (implementation delta == {frontend/app/globals.css, frontend/test/uphunt-aesthetic-w4.test.ts} + runtime .ua-executed.json residue + authorized coordination artifacts/screenshots)
- [x] UA-W4-H4 No successor-window task or prohibited action was started. Evidence: EV-UA-W4-I-001 G9 (no UA-W5 artifact; A5 current_window UA-W4; may_start_successor false)
- [x] UA-W4-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: S3 EV-UA-W4-S-001/S-002/I-001; A6 EV-UA-W4-I-001; A5 current_status AWAITING_REVIEW
- [x] UA-W4-H6 Stop; do not assign or begin the successor. Evidence: S2 next_subwindow STOP; UA-W4_HANDOFF.md; no UA-W5 work

### UA-W5 lifecycle

- [x] UA-W5-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: S3 EV-UA-W5-D-001 (A5 b7a76387… state_version 11, ASG-UA-W5-01; S1 a9e02421…; A1/A3/A4 pins recomputed MATCH)
- [x] UA-W5-P2 Required predecessor outputs exist and validate (UA-W4 hero). Evidence: S3 EV-UA-W5-D-001 + EV-UA-W5-S-001 V-A (globals 04df3d7e… starting, page 3460751e…, run-form 72576044…, w4 test 8008501d… all MATCH)
- [x] UA-W5-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: S3 EV-UA-W5-D-001 (node v24.14.1; test/lint scripts; /usr/bin/google-chrome present) + EV-UA-W5-I-001 G4
- [x] UA-W5-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: S3 EV-UA-W5-D-001 (§3 inventory; porcelain = A5/A6 protected + coordination artifacts; coordination root clean)
- [x] UA-W5-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence. Evidence: S3 EV-UA-W5-S-002 V-D (4-ID ABSENT-json run 78ad8111…) + EV-UA-W5-R-002 + EV-UA-W5-I-001 G8 (NC N1/N2/N3 3/3 falsified)
- [x] UA-W5-V2 Frozen gate: from frontend/, `npm test`; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned. Evidence: S3 EV-UA-W5-I-001 G1 170/170; G2 0 owned needles (13 physical lines == 10 parked diagnostics, W4 baseline); G3 exit 0
- [x] UA-W5-V3 Confirm this window introduced no new network/DB operations (operation count 0). Evidence: S3 EV-UA-W5-I-001 G7 (imports static inspection; 0 network, 0 DB)
- [x] UA-W5-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff. Evidence: S3 EV-UA-W5-I-001 G6 (forbidden-path negative search 0 hits)
- [x] UA-W5-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only. Evidence: S3 EV-UA-W5-R-002 (exactly 2 test() blocks; ordering check true; post-G1 14-ID set 847c0d06…; full equality deferred to UA-W15-V5)
- [x] UA-W5-H1 Record changed files/symbols and migrations. Evidence: S3 EV-UA-W5-S-001/EV-UA-W5-S-002 certificates (globals.css 04df3d7e…→7ae36419… numstat 1 1; w5 test ABSENT→ee6425e9…; no migrations)
- [x] UA-W5-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: S3 EV-UA-W5-I-001 (G1–G9 commands and outcomes; no skipped gates)
- [x] UA-W5-H3 Diff names ⊆ authorized_write_scope. Evidence: S3 EV-UA-W5-I-001 (actual == expected == the two planned files, digest 7723122d…)
- [x] UA-W5-H4 No successor-window task or prohibited action was started. Evidence: S3 EV-UA-W5-I-001 G9 (no w6/w7 artifacts, no runs/keywords/continue edits, A5 untouched until the authorized handoff action)
- [x] UA-W5-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: S3 EV-UA-W5-S-001/S-002/R-001/R-002/I-001 + WINDOW-AGENT-INTEGRATION-PASS; A5 current_status AWAITING_REVIEW at handoff
- [x] UA-W5-H6 Stop; do not assign or begin the successor. Evidence: S2 next_subwindow STOP; UA-W5_HANDOFF.md; no UA-W6 work

### UA-W6 lifecycle

- [x] UA-W6-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: ASG-UA-W6-01 (S1 a4155461…, S3 D-001) then ASG-UA-W6-02 (A5 169efd89…, A3 094bc8bf…/DEC-UA-016, A4 f45b4163…, A1 57fa49c7… all recomputed at I002 preflight)
- [x] UA-W6-P2 Required predecessor outputs exist and validate (UA-W5 landing). Evidence: landing pins 914c61e5…/3460751e…/72576044… verified; W5 G1 baseline 170 carried into I002 G1; w5 test ee6425e9… unchanged
- [x] UA-W6-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: node v24, npm test = node --experimental-strip-types --test, /usr/bin/google-chrome present; 8 screenshots captured
- [x] UA-W6-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: S1 §3 inventory (change-set e64ba5df…); leaf V-A rows S/R-001..005; porcelain before I002 = 4 implementation M + protected coordination M + 3 UA-W6 untracked artifacts
- [x] UA-W6-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence. Evidence: S005 w6-only run 5/5 (json 5-ID digest 98d03fa1…); I002 G1 W6 cases pass; NC N1/N2/N3 falsified fresh at I002 G8 (S3 S-005, I-002)
- [x] UA-W6-V2 Frozen gate: from frontend/, `npm test` per DEC-UA-016; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned. Evidence: I002 G1 175/172/3 exactly the DEC-UA-016 heading-oracle titles, W6 cases pass, exit 1 expected (S3 I-002); G2 13 physical lines, 0 owned-path needles, 10 parked SRC-UA-0092 diagnostics; G3 lint exit 0
- [x] UA-W6-V3 Confirm this window introduced no new network/DB operations (operation count 0). Evidence: I002 G7 — w6 test imports node:assert/strict, node:fs/promises, node:test, coverage registry only; 0 fetch/http/net/db references; suites are source-text oracles
- [x] UA-W6-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff. Evidence: I002 G6 negative search over git diff --name-only HEAD — product delta exactly {4 implementation files, test/.ua-executed.json residue}; zero forbidden-path matches; all 17 preserved/predecessor pins byte-identical
- [x] UA-W6-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only. Evidence: §10.3 bytes pinned f78b8da2…; 3 tests, recordExecuted after oracle; window-local 3/3/3/0/0/0 + 2 W1 registry re-executions; G5 17-ID digest e7895fa5… after npm test; full 43-set equality deferred to UA-W15-V5
- [x] UA-W6-H1 Record changed files/symbols and migrations. Evidence: exactly the five planned files (85d3d712…): runs/page.tsx 24c146e8…→86392720…, keywords/page.tsx 07a82664…→8376447d…, run-continuation.tsx e0e4f14f…→d57edbe3…, globals.css 7ae36419…→b5c79578… (2 hunks), + new w6 test f78b8da2…; no migrations
- [x] UA-W6-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: S3 EV-UA-W6-S/R-001..005 (leaf V-B..V-E), I-002 (G1–G9 all PASS under DEC-UA-016); zero skipped checks; one E8.1-observed transient registry race (W1 empty-JSON, not reproduced, one identical rerun authorized by DEC-UA-016 and not needed in I002)
- [x] UA-W6-H3 Diff names ⊆ authorized_write_scope. Evidence: leaf V-E attributable-set rows + I002 G6 forbidden-path search; parked/design-system-shell/preserved files untouched (byte-verified)
- [x] UA-W6-H4 No successor-window task or prohibited action was started. Evidence: I002 G9 — no UA-W7 artifacts, A5 current_window UA-W6, next_window untouched; no commit/push/AWS/paid-provider actions; .ua-executed.json never staged
- [x] UA-W6-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: S3 FILE-SUBWINDOW-EXECUTED certificates (S-001..005) + INTEGRATION-PASS certificate (I-002); A5 current_status set to AWAITING_REVIEW at handoff
- [x] UA-W6-H6 Stop; do not assign or begin the successor. Evidence: S2 state_version 7 next_subwindow STOP; UA-W7 unauthorized; no UA-W7 work exists

### UA-W7 lifecycle

- [x] UA-W7-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: EV-UA-W7-D-001 (ASG-UA-W7-01; A5 `13285c12…`; pins recomputed MATCH)
- [x] UA-W7-P2 Required predecessor outputs exist and validate (UA-W6 history headers). Evidence: EV-UA-W7-D-001 (UA-W6 artifacts `…`, files w2–w6 and W6 product digests pinned)
- [x] UA-W7-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: EV-UA-W7-D-001 (node v24.14.1; test/lint scripts; /usr/bin/google-chrome present)
- [x] UA-W7-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: EV-UA-W7-D-001 (frontend ` M A5`/` M A6`; coordination root clean)
- [x] UA-W7-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence.
- [x] UA-W7-V2 Frozen gate: from frontend/, `npm test` per DEC-UA-016; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned.
- [x] UA-W7-V3 Confirm this window introduced no new network/DB operations (operation count 0).
- [x] UA-W7-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff.
- [x] UA-W7-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only.
- [x] UA-W7-H1 Record changed files/symbols and migrations. Evidence: UA-W7_HANDOFF.md (MODIFY query-editor.tsx, MODIFY run-progress.tsx, CREATE w7.test.ts; no migrations)
- [x] UA-W7-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: UA-W7_HANDOFF.md (G1–G9 outcomes; no skipped checks)
- [x] UA-W7-H3 Diff names ⊆ authorized_write_scope. Evidence: UA-W7-I001 G6 (delta = exactly the 3 §4 planned files + coordination artifacts + json residue + browser evidence)
- [x] UA-W7-H4 No successor-window task or prohibited action was started. Evidence: UA-W7-I001 G9 (no UA-W8; may_start_successor false)
- [x] UA-W7-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: EV-UA-W7-I001; A5 `current_status: AWAITING_REVIEW`
- [x] UA-W7-H6 Stop; do not assign or begin the successor.

### UA-W8 lifecycle

- [x] UA-W8-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: EV-UA-W8-D-001 + parent EV-UA-A-054 (ASG-UA-W8-01; S1 `8e40cf4f…`; A1/A3 MATCH)
- [x] UA-W8-P2 Required predecessor outputs exist and validate (UA-W7 query/progress intros). Evidence: parent EV-UA-A-054 (query-editor `92efe1f7…`; run-progress `15d840bf…`; w7 test `92201c35…`)
- [x] UA-W8-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: EV-UA-W8-D-001; parent G1/G2/G3/G4 executed
- [x] UA-W8-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: EV-UA-W8-D-001 (frontend ` M A5`/` M A6`; coordination root clean)
- [x] UA-W8-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence.
- [x] UA-W8-V2 Frozen gate: from frontend/, `npm test` per DEC-UA-016; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned.
- [x] UA-W8-V3 Confirm this window introduced no new network/DB operations (operation count 0).
- [x] UA-W8-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff.
- [x] UA-W8-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only.
- [x] UA-W8-H1 Record changed files/symbols and migrations. Evidence: UA-W8_HANDOFF.md (MODIFY leads/page, live-leads-workspace, run-workspace, globals.css; CREATE w8.test.ts; no migrations)
- [x] UA-W8-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: UA-W8_HANDOFF.md (G1–G9 outcomes; no skipped checks)
- [x] UA-W8-H3 Diff names ⊆ authorized_write_scope. Evidence: UA-W8-I001 G6 (delta = exactly the 5 §4 planned files + coordination artifacts + json residue + browser evidence)
- [x] UA-W8-H4 No successor-window task or prohibited action was started. Evidence: UA-W8-I001 G9 (no UA-W9; may_start_successor false)
- [x] UA-W8-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: EV-UA-W8-I-001; A5 `current_status: AWAITING_REVIEW` (`de474043…`)
- [x] UA-W8-H6 Stop; do not assign or begin the successor.

### UA-W9 lifecycle

- [x] UA-W9-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: EV-UA-W9-D-001 + parent EV-UA-A-057 (ASG-UA-W9-01; S1 `c900cebe…`; A1/A3 MATCH)
- [x] UA-W9-P2 Required predecessor outputs exist and validate (UA-W8 table shell). Evidence: parent EV-UA-A-057 (results-table `a4e1472f…`; run-workspace `643c3568…`; w8 test `cab15f7f…`; lead-expansion-shell paddings preserved)
- [x] UA-W9-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: EV-UA-W9-D-001; parent G1/G2/G3/G4 executed
- [x] UA-W9-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: EV-UA-W9-D-001 (frontend coordination writes; coordination root clean)
- [x] UA-W9-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence.
- [x] UA-W9-V2 Frozen gate: from frontend/, `npm test` per DEC-UA-016; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned.
- [x] UA-W9-V3 Confirm this window introduced no new network/DB operations (operation count 0).
- [x] UA-W9-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff.
- [x] UA-W9-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only.
- [x] UA-W9-H1 Record changed files/symbols and migrations. Evidence: UA-W9_HANDOFF.md (MODIFY lead-details, globals.css, ldc-test; CREATE w9.test.ts; no migrations)
- [x] UA-W9-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: UA-W9_HANDOFF.md (G1–G9 outcomes; no skipped checks)
- [x] UA-W9-H3 Diff names ⊆ authorized_write_scope. Evidence: UA-W9-I001 G6 (delta = exactly the 4 §4 planned files + coordination artifacts + json residue + browser evidence)
- [x] UA-W9-H4 No successor-window task or prohibited action was started. Evidence: UA-W9-I001 G9 (no UA-W10; may_start_successor false)
- [x] UA-W9-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: EV-UA-W9-I-001; A5 `current_status: AWAITING_REVIEW` (`1cb028ec…`)
- [x] UA-W9-H6 Stop; do not assign or begin the successor.

### UA-W10 lifecycle

- [x] UA-W10-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: A5 ASG-UA-W10-01, UA-W10-WINDOW-AGENT, current_window UA-W10; A1 57fa49c7…, A3 094bc8bf…, A4 fa71ebb3…, subwindow standard 842c2955… all recomputed MATCH; S1 f4fb3972… (§12.1 SW-A02; EV-UA-W10-I-001)
- [x] UA-W10-P2 Required predecessor outputs exist and validate (UA-W9 overview CSS). Evidence: W9 lead-details 5f32de7f…/globals 6e57268a… (starting pins); W9 overview DetailSection 01 title and the `.lead-overview > .marketing-heading` block (H2 anchor) present; W9 owned `.lead-details .detail-section > h3` floor 1.375rem intact (§3/G6)
- [x] UA-W10-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: node v24.14.1; package.json test/lint/check scripts; `node --test`; /usr/bin/google-chrome present (§3; G3/G4 ran)
- [x] UA-W10-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: frontend porcelain == the four §3 protected ` M` paths + three `??` coordination artifacts; coordination root clean; protected A4/A5/A6/A7 and the four planned files inventoried (§3; EV-UA-W10-D-001)
- [x] UA-W10-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence. Evidence: CASE-UA-W10-001/002/003 each one test() + recordExecuted after the activation witness; G1 pass; N1–N6 falsified (G8); S4 §9.4 V-C/V-D
- [x] UA-W10-V2 Frozen gate: from frontend/, `npm test` per DEC-UA-016; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned. Evidence: G1 195/192/3 (allowed 3 fails; DEC-UA-011 W8 race cleared by one identical rerun); G2 zero owned-path needles, only 13-line parked SRC-UA-0092; G3 lint exit 0
- [x] UA-W10-V3 Confirm this window introduced no new network/DB operations (operation count 0). Evidence: G7 static import/suite — 0 network, 0 DB, 0 WebSocket
- [x] UA-W10-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff. Evidence: G6 forbidden-path negative search — NONE; implementation delta == exactly the four planned files
- [x] UA-W10-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only. Evidence: 3/3/3/0/0/0 (CASE-UA-W10-001..003); W10 3-ID digest 3b210dab…; 29-ID post-G1 digest b9c2a467…
- [x] UA-W10-H1 Record changed files/symbols and migrations. Evidence: UA-W10_HANDOFF.md changed-file table (MODIFY lead-details/globals/ldc-test, CREATE w10.test.ts; no migrations)
- [x] UA-W10-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: UA-W10_HANDOFF.md commands table (G1–G9 outcomes; no skipped checks)
- [x] UA-W10-H3 Diff names ⊆ authorized_write_scope. Evidence: UA-W10_HANDOFF.md; implementation delta == exactly the four §4 planned files (G6)
- [x] UA-W10-H4 No successor-window task or prohibited action was started. Evidence: UA-W10_HANDOFF.md; G9 no UA-W11 artifact; A5.current_window UA-W10; next_window UA-W11 untouched
- [x] UA-W10-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: S3 EV-UA-W10-S-001..004 + EV-UA-W10-R-001..004 + WINDOW-AGENT-INTEGRATION-PASS; A6 EV-UA-W10-I-001; A5 current_status AWAITING_REVIEW (34608dc4…)
- [x] UA-W10-H6 Stop; do not assign or begin the successor. Evidence: S2 next_subwindow STOP; UA-W10_HANDOFF.md; no UA-W11 work

### UA-W11 lifecycle

- [ ] UA-W11-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: ___
- [ ] UA-W11-P2 Required predecessor outputs exist and validate (UA-W10 store-fit). Evidence: ___
- [ ] UA-W11-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: ___
- [ ] UA-W11-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: ___
- [ ] UA-W11-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence.
- [ ] UA-W11-V2 Frozen gate: from frontend/, `npm test` per DEC-UA-016; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned.
- [ ] UA-W11-V3 Confirm this window introduced no new network/DB operations (operation count 0).
- [ ] UA-W11-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff.
- [ ] UA-W11-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only.
- [ ] UA-W11-H1 Record changed files/symbols and migrations. Evidence: ___
- [ ] UA-W11-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: ___
- [ ] UA-W11-H3 Diff names ⊆ authorized_write_scope. Evidence: ___
- [ ] UA-W11-H4 No successor-window task or prohibited action was started. Evidence: ___
- [ ] UA-W11-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: ___
- [ ] UA-W11-H6 Stop; do not assign or begin the successor.

### UA-W12 lifecycle

- [ ] UA-W12-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: ___
- [ ] UA-W12-P2 Required predecessor outputs exist and validate (UA-W11 traffic intro). Evidence: ___
- [ ] UA-W12-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: ___
- [ ] UA-W12-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: ___
- [ ] UA-W12-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence.
- [ ] UA-W12-V2 Frozen gate: from frontend/, `npm test` per DEC-UA-016; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned.
- [ ] UA-W12-V3 Confirm this window introduced no new network/DB operations (operation count 0).
- [ ] UA-W12-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff.
- [ ] UA-W12-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only.
- [ ] UA-W12-H1 Record changed files/symbols and migrations. Evidence: ___
- [ ] UA-W12-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: ___
- [ ] UA-W12-H3 Diff names ⊆ authorized_write_scope. Evidence: ___
- [ ] UA-W12-H4 No successor-window task or prohibited action was started. Evidence: ___
- [ ] UA-W12-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: ___
- [ ] UA-W12-H6 Stop; do not assign or begin the successor.

### UA-W13 lifecycle

- [ ] UA-W13-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: ___
- [ ] UA-W13-P2 Required predecessor outputs exist and validate (UA-W12 keyword page intro). Evidence: ___
- [ ] UA-W13-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: ___
- [ ] UA-W13-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: ___
- [ ] UA-W13-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence.
- [ ] UA-W13-V2 Frozen gate: from frontend/, `npm test` per DEC-UA-016; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned.
- [ ] UA-W13-V3 Confirm this window introduced no new network/DB operations (operation count 0).
- [ ] UA-W13-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff.
- [ ] UA-W13-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only.
- [ ] UA-W13-H1 Record changed files/symbols and migrations. Evidence: ___
- [ ] UA-W13-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: ___
- [ ] UA-W13-H3 Diff names ⊆ authorized_write_scope. Evidence: ___
- [ ] UA-W13-H4 No successor-window task or prohibited action was started. Evidence: ___
- [ ] UA-W13-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: ___
- [ ] UA-W13-H6 Stop; do not assign or begin the successor.

### UA-W14 lifecycle

- [ ] UA-W14-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: ___
- [ ] UA-W14-P2 Required predecessor outputs exist and validate (UA-W13 stacked charts). Evidence: ___
- [ ] UA-W14-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: ___
- [ ] UA-W14-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: ___
- [ ] UA-W14-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence.
- [ ] UA-W14-V2 Frozen gate: from frontend/, `npm test` per DEC-UA-016; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned.
- [ ] UA-W14-V3 Confirm this window introduced no new network/DB operations (operation count 0).
- [ ] UA-W14-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff.
- [ ] UA-W14-V5 Assert this window's allocated CASE IDs each have one test() that calls recordExecuted after the activation witness. Full-set equality is UA-W15-V5 only.
- [ ] UA-W14-H1 Record changed files/symbols and migrations. Evidence: ___
- [ ] UA-W14-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: ___
- [ ] UA-W14-H3 Diff names ⊆ authorized_write_scope. Evidence: ___
- [ ] UA-W14-H4 No successor-window task or prohibited action was started. Evidence: ___
- [ ] UA-W14-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: ___
- [ ] UA-W14-H6 Stop; do not assign or begin the successor.

### UA-W15 lifecycle

- [ ] UA-W15-P1 Active assignment ID and pinned standard/contract/decision/checklist revisions match A5. Evidence: ___
- [ ] UA-W15-P2 Required predecessor outputs exist and validate (UA-W14 table/cluster intros). Evidence: ___
- [ ] UA-W15-P3 Node, frontend/ package scripts, and named test runner exist. Chrome exists if F1 browser_evidence is true. Evidence: ___
- [ ] UA-W15-P4 Starting dirty-worktree and ownership scope recorded for frontend/ and coordination root. Evidence: ___
- [ ] UA-W15-V1 Execute this window's allocated CASE tests; record activation, oracle, and negative-control evidence.
- [ ] UA-W15-V2 Frozen gate: from frontend/, `npm test` per DEC-UA-016; typecheck G2 per DEC-UA-014 (zero tsc diagnostics on this window's authorized_write_scope paths). Also `npm run lint` when CSS/JSX is owned.
- [ ] UA-W15-V3 Confirm wrap-height and type-floor ceilings still match DEC-UA-004 and DEC-UA-005.
- [ ] UA-W15-V4 Confirm forbidden paths in DEC-UA-006 are absent from the window diff.
- [ ] UA-W15-V5 Assert required = registered = executed coverage-case IDs, zero required skips, digest 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05.
- [ ] UA-W15-H1 Record changed files/symbols and migrations. Evidence: ___
- [ ] UA-W15-H2 Record commands, outcomes, scenarios and skipped checks. Evidence: ___
- [ ] UA-W15-H3 Diff names ⊆ authorized_write_scope. Evidence: ___
- [ ] UA-W15-H4 No successor-window task or prohibited action was started. Evidence: ___
- [ ] UA-W15-H5 Append the execution and enforcement certificates and set A5 current_status to AWAITING_REVIEW. Evidence: ___
- [ ] UA-W15-H6 Stop; do not assign or begin the successor.

---

## UA-W1 Baseline and coverage registry

```yaml
window_id: UA-W1
objective: Frozen coverage registry and forbidden-path handoff check with no visual product change.
depends_on: []
consumes: A1-A8
produces: frontend/test/uphunt-aesthetic-coverage.test.ts listing all CASE-UA-* IDs; tests that fail if a forbidden path is in an empty expected-change set
assigned_agent_policy: one_window
authorized_write_scope: [frontend/test/uphunt-aesthetic-coverage.test.ts]
shared_file_scope: []
read_only_scope: [A1, A4 §Coverage, frontend/package.json]
authorized_actions: [create_test_file, run_frontend_unit_tests]
prohibited_actions: [edit_production_source, aws, commit]
successor: UA-W2
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: false
```

- [x] UA-W1-T1 CREATE `frontend/test/uphunt-aesthetic-coverage.test.ts` exporting frozen `REQUIRED_CASE_IDS` as the exact 43-member array in §Coverage, `listRequiredCaseIds()` returning a copy, `coverageDigest(ids)` implementing E6 SHA-256 (sort UTF-8, ID+LF, lowercase hex), `recordExecuted(id: string): void` that merges the ID into JSON file `frontend/test/.ua-executed.json` (create if absent; store a sorted unique string array; never commit this file), and `getExecuted(): string[]` that reads that file or returns `[]` if absent. Add test `CASE-UA-W1-002` that asserts `coverageDigest(listRequiredCaseIds()) === "0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05"` and that duplicate IDs throw before hashing. F3 source: ABSENT. F3 target: CREATE that file. Later windows MUST NOT edit `REQUIRED_CASE_IDS`. Do not use in-process memory as the executed set. Evidence: S3 EV-UA1-R-001 (file byte-identical to frozen S1 §6.3, digest f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1)
- [x] UA-W1-T2 In the same file add test `CASE-UA-W1-001` that reads a frozen allowlist equal to this window's write scope and asserts it does not contain `app/api`, `lib/api-types.ts`, `email_scraper`, or `ACTIVE_EXECUTION_STATE.md`. After the allowlist assertion, call `recordExecuted("CASE-UA-W1-001")`. After the digest assertion, call `recordExecuted("CASE-UA-W1-002")`. Do not enable required=executed equality in this window. Evidence: S3 EV-UA1-R-001 EV-UA1-I-001 G5

---


## UA-W2 Tokens, primitives, SectionIntro

```yaml
window_id: UA-W2
objective: Shared SectionIntro and confirmation that :root tokens and reduced-motion remain.
depends_on: [UA-W1]
authorized_write_scope: [frontend/components/section-intro.tsx, frontend/components/landing-sections.tsx, frontend/test/uphunt-aesthetic-w2.test.ts]
shared_file_scope: []
read_only_scope: [frontend/app/globals.css, frontend/components/ui/primitives.tsx, frontend/test/design-system-primitives.test.ts]
authorized_actions: [create_component, modify_landing_import, run_frontend_unit_tests]
prohibited_actions: [edit_globals_css, add_dependency, aws, commit]
successor: UA-W3
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: false
```

globals.css is read-only here so token preservation is a test read, not a write. Token edits if any happen only in later windows' owned selectors.

- [x] UA-W2-T1 CREATE `frontend/components/section-intro.tsx` exporting `SectionIntro` per DEC-UA-002 (`className` includes `marketing-heading` and `is-inverse` iff `inverse===true`). Evidence: S001 digest 159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175
- [x] UA-W2-T2 MODIFY `landing-sections.tsx`: remove local `SectionIntro`; `import { SectionIntro } from "@/components/section-intro"`; call sites unchanged. Evidence: S002 digest 914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15; CASE-UA-W2-003 pass
- [x] UA-W2-T3 CREATE `frontend/test/uphunt-aesthetic-w2.test.ts` for CASE-UA-W2-001 (read globals.css token assertions copied from design-system-primitives.test.ts color-signal/canvas/ink), CASE-UA-W2-002 (file exports SectionIntro), CASE-UA-W2-003 (landing-sections imports @/components/section-intro), CASE-UA-W2-004 (reduced-motion rule). Evidence: S003 digest f65ba0c50c78ef983496d0a37af1a1a6a1234332c48a5290bc344c9a5e68b78c; four tests pass

---

## UA-W3 Shell, auth, 404

```yaml
window_id: UA-W3
objective: Header, auth pages, and 404 use landing headline recipe and existing tokens.
depends_on: [UA-W2]
authorized_write_scope: [frontend/components/app-header.tsx, frontend/components/auth-form.tsx, frontend/app/not-found.tsx, frontend/app/globals.css, frontend/test/uphunt-aesthetic-w3.test.ts]
shared_file_scope:
  frontend/app/globals.css: [.site-header, .header-inner, .brand, .brand-mark, .site-nav, .header-actions, .header-meta, .header-link, .auth-page, .auth-card, .auth-card-header, .state-page, .fatal-card]
read_only_scope: [frontend/components/section-intro.tsx, frontend/components/header-auth.tsx, frontend/app/sign-in/page.tsx, frontend/app/sign-up/page.tsx, frontend/app/layout.tsx]
authorized_actions: [modify_jsx_css, run_frontend_unit_tests]
prohibited_actions: [change_authClient_calls, aws, commit]
successor: UA-W4
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

sign-in/sign-up pages only render AuthForm; copy changes happen in auth-form.tsx.

- [x] UA-W3-T1 Restyle owned header/auth/404 CSS to card radius `--radius-panel`, padding `--space-6` on `.auth-card`, keep sticky header. Do not change layout.tsx children. Evidence: S3 UA-W3-S003 certificate (globals.css 7df1646d… → 325a442b…, seven hunks; sticky/radius kept)
- [x] UA-W3-T2 AuthForm and not-found: wrap titles with SectionIntro using DEC-UA-003 sign-in/sign-up/404 strings. 404 title stays "That lead run does not exist." as existing H1; eyebrow "404 · Not found" remains; add copy already in the page as SectionIntro copy. Do not change Link hrefs. Evidence: S3 S001/S002 certificates (auth-form efffc7b8…, not-found 0ec6a3b2…; DEC-UA-003 strings; hrefs/hrefs intact)
- [x] UA-W3-T3 Tests CASE-UA-W3-001..004. Evidence: S3 S004 certificate (test 635e2802…; CASE-UA-W3-001..004 registered and executed; 6/6 leaf pass; 10-ID set after npm test)

---

## UA-W4 Landing hero and form

```yaml
window_id: UA-W4
objective: Landing hero and run form stay landing-scale; hairline card consistent with DEC-UA-001.
depends_on: [UA-W3]
authorized_write_scope: [frontend/app/page.tsx, frontend/components/run-form.tsx, frontend/app/globals.css, frontend/test/uphunt-aesthetic-w4.test.ts]
shared_file_scope:
  frontend/app/globals.css: [.landing-page, .landing-hero, .hero, .hero-copy, .hero-kicker, .hero-intro, .run-form-card, .accent-underline]
read_only_scope: [frontend/components/landing-sections.tsx, frontend/components/section-intro.tsx]
successor: UA-W5
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

- [x] UA-W4-T1 Do not change LandingHeroCopy strings. Tighten `.run-form-card` border to `1px solid var(--color-line)` and radius `var(--radius-panel)` if not already. Evidence: parent EV-UA-A-036 (globals.css 04df3d7e…, exactly four §6.2 hunks / numstat 5/5; page.tsx 3460751e…, run-form.tsx 72576044…, landing-sections 914c61e5… byte-identical; LandingHeroCopy/LandingProcess strings untouched)
- [x] UA-W4-T2 Tests CASE-UA-W4-001 (page still imports LandingHeroCopy), CASE-UA-W4-002 (run-form-card radius/border tokens). Evidence: parent EV-UA-A-036 (w4 test 8008501d…; CASE-UA-W4-001/002; G1 166/166 including both cases; window-local ea7e02bc…)

---

## UA-W5 Lower landing

```yaml
window_id: UA-W5
objective: Lower landing sections keep SectionIntro and marketing-heading scale.
depends_on: [UA-W4]
authorized_write_scope: [frontend/components/landing-sections.tsx, frontend/app/globals.css, frontend/test/uphunt-aesthetic-w5.test.ts]
shared_file_scope:
  frontend/app/globals.css: [.marketing-flow, .marketing-heading, .process-section, .intelligence-section, .evidence-section, .market-section, .use-cases-section, .control-section, .faq-section, .final-cta, .site-footer]
read_only_scope: [frontend/components/section-intro.tsx]
successor: UA-W6
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

- [x] UA-W5-T1 Do not change existing SectionIntro copy strings in landing-sections.tsx. Ensure every marketing section uses SectionIntro or `.marketing-heading`. Card borders `var(--color-line)`. Evidence: S3 EV-UA-W5-S-001/R-001 + EV-UA-W5-I-001 (landing-sections 914c61e5… byte-identical, exactly 3 `<SectionIntro ` sites, grouped h2 selector untouched; the single §6.2 hunk sets `.intelligence-card` border to `1px solid var(--color-line)`, ending digest 7ae36419…)
- [x] UA-W5-T2 Tests CASE-UA-W5-001 CASE-UA-W5-002 (H2 clamp rule still present). Evidence: S3 EV-UA-W5-S-002/R-002 + EV-UA-W5-I-001 (w5 test ee6425e9…; both cases pass in G1 170/170; clamp(36px, 4.5vw, 59px) oracle asserted; window-local 1e44ff78…)

---

## UA-W6 History, continue, keyword start

```yaml
window_id: UA-W6
objective: /runs, /runs/continue, /keywords page headers use DEC-UA-003 copy.
depends_on: [UA-W5]
authorized_write_scope: [frontend/app/runs/page.tsx, frontend/app/runs/continue/page.tsx, frontend/app/keywords/page.tsx, frontend/components/run-history.tsx, frontend/components/run-continuation.tsx, frontend/components/keyword-intelligence/research-form.tsx, frontend/app/globals.css, frontend/test/uphunt-aesthetic-w6.test.ts]
shared_file_scope:
  frontend/app/globals.css: [.app-canvas, .history-page, .app-page-header, .run-title-row, .eyebrow]
successor: UA-W7
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

- [x] UA-W6-T1 Replace run-title-row contents on those three pages with SectionIntro and DEC-UA-003 strings. Keep existing buttons/links. Evidence: parent EV-UA-A-048 (runs 86392720…, keywords 8376447d…, run-continuation d57edbe3…; Link href="/" and href="/runs" preserved; metadata titles unchanged)
- [x] UA-W6-T2 Restyle `.app-page-header` gap to `var(--space-6)`. Evidence: parent EV-UA-A-048 (globals 7ae36419…→b5c79578…; numstat 2 1; unscoped needle `align-items: flex-end;\n  gap: var(--space-6);` count 1)
- [x] UA-W6-T3 Tests CASE-UA-W6-001..003. Evidence: parent EV-UA-A-048 (w6 test f78b8da2…; three cases pass inside G1 175/172/3; window-local 3/3/3; 17-ID digest e7895fa5…)

---

## UA-W7 Query review and runtime

```yaml
window_id: UA-W7
objective: Query editor and run progress use landing headlines; polling code unchanged.
depends_on: [UA-W6]
authorized_write_scope: [frontend/components/query-editor.tsx, frontend/components/run-progress.tsx, frontend/app/globals.css, frontend/test/uphunt-aesthetic-w7.test.ts]
shared_file_scope:
  frontend/app/globals.css: [.run-page, .query-editor, .progress-card, .progress-stage]
read_only_scope: [frontend/components/run-workspace.tsx]
prohibited_actions: [edit_RETRY_DELAYS, edit_poll_fetch, aws, commit]
successor: UA-W8
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

- [x] UA-W7-T1 Insert SectionIntro using DEC-UA-003 query-editor strings. Do not change query save/start handlers. Evidence: parent EV-UA-A-051 (query-editor 92efe1f7…; Search plan / Shape the searches… / Review, edit…; void save()/start() preserved; numstat 7 4)
- [x] UA-W7-T2 Insert SectionIntro using DEC-UA-003 run-progress strings. Do not change metric calculations. Evidence: parent EV-UA-A-051 (run-progress 15d840bf…; Discovery / StoreSignal is looking… / The stages and counts…; `<p>{stageLabel(run.stage)}</p>`; RunLoadingSkeleton and RETRY_DELAYS untouched; numstat 7 6)
- [x] UA-W7-T3 Tests CASE-UA-W7-001 CASE-UA-W7-002; read-only grep that `RETRY_DELAYS` remains in `run-workspace.tsx`. Evidence: parent EV-UA-A-051 (w7 test 92201c35…; both cases pass inside G1 179/176/3; RETRY_DELAYS needle count 1 in run-workspace 9472450d…; window-local 2/2/2)

---

## UA-W8 Completed-run and master-leads chrome, table shell

```yaml
window_id: UA-W8
objective: Completed-run and /leads page intros, collapsed table, expansion shell. Not LeadDetails internals.
depends_on: [UA-W7]
authorized_write_scope: [frontend/app/leads/page.tsx, frontend/components/leads/live-leads-workspace.tsx, frontend/components/run-workspace.tsx, frontend/components/results-table.tsx, frontend/components/results-filters.tsx, frontend/components/cumulative-traffic.tsx, frontend/app/globals.css, frontend/test/uphunt-aesthetic-w8.test.ts]
shared_file_scope:
  frontend/app/globals.css: [.results-section, .results-heading, .results-table, .results-panel, .detail-row, .lead-expansion-shell, .store-cell, .row-toggle]
read_only_scope: [frontend/app/runs/[runId]/page.tsx, frontend/components/query-editor.tsx, frontend/components/run-progress.tsx, frontend/components/lead-details.tsx]
prohibited_actions: [edit_lead-details.tsx, edit_sort_query_keys, aws, commit]
successor: UA-W9
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

run-workspace.tsx is shared with UA-W7 read-only; UA-W8 may edit completed-results heading JSX only (symbols `results-heading`, completed title row), not polling.

- [x] UA-W8-T1 SectionIntro on /leads and completed run heading per DEC-UA-003. Evidence: parent EV-UA-A-054 (leads/page `21a17799…`; live-leads-workspace `a646f657…`; run-workspace `643c3568…`; DEC-UA-003 strings exact; RETRY_DELAYS and href="/runs" preserved; numstat 2 1 / 2 1 / 2 8)
- [x] UA-W8-T2 Collapsed row min-height 56px; keep columns. Expansion shell padding `var(--space-5)`. Evidence: parent EV-UA-A-054 (globals.css `f1a7e45a…`; `min-height: 56px;` == 1; both `.lead-expansion-shell` paddings `var(--space-5)`; store-column 28% / toggle-column 7% unchanged; numstat 3 3)
- [x] UA-W8-T3 Tests CASE-UA-W8-001..003; assert sort query keys unchanged (`sortBy`, `sortDirection`, `page`, `search`). Evidence: parent EV-UA-A-054 (w8 test `cab15f7f…`; three cases pass inside G1 184/181/3; params.get needles and sortBy/sortDirection remain; window-local 3/3/3)

---

## UA-W9 Lead overview (extra care)

```yaml
window_id: UA-W9
objective: Lead overview, score, identity, outreach readable; remove dense type for owned selectors.
depends_on: [UA-W8]
authorized_write_scope: [frontend/components/lead-details.tsx, frontend/app/globals.css, frontend/test/lead-details-component.test.ts, frontend/test/uphunt-aesthetic-w9.test.ts]
shared_file_scope:
  frontend/app/globals.css: [.lead-details, .detail-section, .detail-section-emphasis, .lead-overview, .lead-overview-grid, .lead-overview-panel, .outcome-badge, .fact-grid, .outreach-channel-list, .contact-evidence-item, .detail-score]
  frontend/components/lead-details.tsx: [LeadOverview, ScoreDetails, IdentityDetails, ContactDetails, OutcomeBadge, DetailSection]
successor: UA-W10
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

- [x] UA-W9-T1 Replace DetailSection title rendering with SectionIntro using DEC-UA-004 strings for overview/score/identity/reachability. Keep field Fact/TokenList components and conditions. Evidence: parent EV-UA-A-057 (lead-details `5f32de7f…`; SectionIntro import; DEC-UA-004 01 + Strength/Identity/Reachability copy; 03/04 h3 path preserved; numstat 17 5)
- [x] UA-W9-T2 Replace dense-lead rules for owned selectors: h3 min 1.375rem; dt 12px; dd 14px; fact-grid `repeat(3, minmax(0, 1fr))` max; padding `var(--space-6) var(--space-5)`. Delete `.lead-overview .overview-identity .fact-grid { grid-template-columns: repeat(8, ...)` and `.score-components { repeat(6, ...)`. Evidence: parent EV-UA-A-057 (globals.css `6e57268a…`; eight hunks; `font-size: 1.375rem;`; combined repeat(3); marketing-heading retargets; numstat 9 9)
- [x] UA-W9-T3 Tests CASE-UA-W9-001..004 using denseLead fixture; assert email/phone/score markup still present when fixture has them. Evidence: parent EV-UA-A-057 (w9 test `baee1b2e…`; four cases pass inside G1 190/187/3; window-local 4/4/4)
- [x] UA-W9-T4 Update only the three title-order assertions in `lead-details-component.test.ts` to the DEC-UA-004 unique strings. No other edits in that file. Evidence: parent EV-UA-A-057 (ldc-test `f8f7323c…`; three assertion lines only; numstat 3 3; ldc single-file 11/11)

---

## UA-W10 Store-fit and discovery (extra care)

```yaml
window_id: UA-W10
objective: Store-fit and discovery provenance sections use DEC-UA-004 headlines and type floor.
depends_on: [UA-W9]
authorized_write_scope: [frontend/components/lead-details.tsx, frontend/app/globals.css, frontend/test/lead-details-component.test.ts, frontend/test/uphunt-aesthetic-w10.test.ts]
shared_file_scope:
  frontend/app/globals.css: [.store-evidence-section, .discovery-details-section, .evidence-ledger, .store-fit-record, .occurrence-record, .nested-evidence, .token-disclosure]
  frontend/components/lead-details.tsx: [StoreEvidence, StoreFitItem, StoreFitPage, DiscoveryDetails, OccurrenceList, CategoryList]
successor: UA-W11
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

- [ ] UA-W10-T1 SectionIntro for 03 and 04. Nested disclosures remain. Type floor on owned selectors. Fact-grid max 3 columns.
- [ ] UA-W10-T2 Tests CASE-UA-W10-001..003; fixture fields still in markup.
- [ ] UA-W10-T3 Update only the one title-order assertion in `lead-details-component.test.ts` that still references `Category and store fit` to the DEC-UA-004 03 title. No other edits in that file.

---

## UA-W11 Individual traffic (extra care)

```yaml
window_id: UA-W11
objective: Traffic enrichment block uses DEC-UA-004 02 headline; globe/CrUX behavior unchanged.
depends_on: [UA-W10]
authorized_write_scope: [frontend/components/traffic-enrichment.tsx, frontend/components/lead-details.tsx, frontend/app/globals.css, frontend/test/uphunt-aesthetic-w11.test.ts]
shared_file_scope:
  frontend/app/globals.css: [.traffic-enrichment, .crux-detail-row, .traffic-source-crux, .traffic-scope]
  frontend/components/lead-details.tsx: [LeadDetails function body TrafficEnrichmentDetails call only]
read_only_scope: [frontend/components/traffic-globe.tsx]
prohibited_actions: [edit_coreWebVitalRating, edit_aggregation_math, aws, commit]
successor: UA-W12
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

- [ ] UA-W11-T1 Wrap TrafficEnrichmentDetails with SectionIntro 02 strings. Do not change rating functions.
- [ ] UA-W11-T2 Tests CASE-UA-W11-001 CASE-UA-W11-002.

---

## UA-W12 Keyword research page shell (extra care)

```yaml
window_id: UA-W12
objective: Result page SectionIntro and stacked section wrappers; charts still old grid until UA-W13.
depends_on: [UA-W11]
authorized_write_scope: [frontend/app/keywords/[researchId]/page.tsx, frontend/components/keyword-intelligence/research-dashboard.tsx, frontend/components/keyword-intelligence/selection-review.tsx, frontend/test/uphunt-aesthetic-w12.test.ts]
shared_file_scope: []
read_only_scope: [frontend/components/section-intro.tsx, frontend/components/keyword-intelligence/chart-panels.tsx]
successor: UA-W13
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: false
```

- [ ] UA-W12-T1 Insert page SectionIntro DEC-UA-003 above ResearchDashboard content when `result` is present. Keep filter dock.
- [ ] UA-W12-T2 Do not reorder charts yet. Tests CASE-UA-W12-001 CASE-UA-W12-002 (headline strings present in research-dashboard.tsx source).

---

## UA-W13 Keyword charts unpacked (extra care)

```yaml
window_id: UA-W13
objective: Every chart is a full-width titled section with locked heights; data-surface preserved.
depends_on: [UA-W12]
authorized_write_scope: [frontend/components/keyword-intelligence/chart-panels.tsx, frontend/components/keyword-intelligence/keyword-dashboard.module.css, frontend/components/keyword-intelligence/research-dashboard.tsx, frontend/components/keyword-intelligence/summary-cards.tsx, frontend/test/uphunt-aesthetic-w13.test.ts]
shared_file_scope: []
successor: UA-W14
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

- [ ] UA-W13-T1 CSS: `.overviewSignals` and `.charts` `grid-template-columns: 1fr`; `.chartPair { display: block; }`; wrap heights per DEC-UA-005; heatmap/globe min-height 520px.
- [ ] UA-W13-T2 JSX: wrap each chart in SectionIntro with DEC-UA-005 copy; reorder research-dashboard children to DEC-UA-005 order 1–16. Keep canvas data-surface values identical.
- [ ] UA-W13-T3 Tests CASE-UA-W13-001..004.

---

## UA-W14 Keyword table, filters, cluster, remaining panels

```yaml
window_id: UA-W14
objective: Table, filters, cluster landscape, overlap panel titled; filter behavior unchanged.
depends_on: [UA-W13]
authorized_write_scope: [frontend/components/keyword-intelligence/keyword-table.tsx, frontend/components/keyword-intelligence/filter-bar.tsx, frontend/components/keyword-intelligence/cluster-landscape.tsx, frontend/components/keyword-intelligence/summary-cards.tsx, frontend/components/keyword-intelligence/keyword-dashboard.module.css, frontend/test/uphunt-aesthetic-w14.test.ts]
shared_file_scope: []
prohibited_actions: [edit_getFiltered, edit_saveKeywordSelection, aws, commit]
successor: UA-W15
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

- [ ] UA-W14-T1 SectionIntro for table and cluster per DEC-UA-005 items 5 and 16. Overlap panel title per item 10.
- [ ] UA-W14-T2 Tests CASE-UA-W14-001..003; assert filter select `data-filter="market"` still present.

---

## UA-W15 Site-wide polish and executed-coverage gate

```yaml
window_id: UA-W15
objective: Responsive/a11y leftover in owned leftover selectors; executed coverage equality; build.
depends_on: [UA-W14]
authorized_write_scope: [frontend/app/globals.css, frontend/test/uphunt-aesthetic-w15.test.ts, frontend/test/ua-coverage-equality.mjs]
shared_file_scope:
  frontend/app/globals.css: [no new selectors except leftover @media adjustments to UA-owned lead-details and header rules already introduced]
prohibited_actions: [aws, commit, production]
successor: STOP
successor_reserved_for: parent
may_start_successor: false
parent_file_leaf_checkpoints: forbidden
browser_evidence: true
```

- [ ] UA-W15-T1 CREATE `frontend/test/uphunt-aesthetic-w15.test.ts` with `CASE-UA-W15-001` asserting the existing `prefers-reduced-motion: reduce` rule remains in `globals.css`, and `CASE-UA-W15-002` asserting owned `.lead-details .detail-section > h3` is not `0.5rem`. Do not use CASE-UA-W15-003 for these assertions. Call `recordExecuted` after each witness. Do not add new globals selectors except leftover `@media` adjustments to UA-owned lead-details and header rules already introduced. Do not change `.shell` width; keyword shell remains the existing `.kiDashboard` module rule.
- [ ] UA-W15-T2 CREATE `frontend/test/ua-coverage-equality.mjs` which is not matched by `test/*.test.ts`. The script imports `listRequiredCaseIds`, `coverageDigest`, `getExecuted`, and `recordExecuted` from `./uphunt-aesthetic-coverage.test.ts`, asserts `getExecuted()` equals `REQUIRED_CASE_IDS` minus `{CASE-UA-W15-003}`, then calls `recordExecuted("CASE-UA-W15-003")`, then asserts `coverageDigest(getExecuted()) === "0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05"` and set equality required=registered=executed, zero skips, no duplicates, no unexpected IDs. Frozen coverage sequence from `frontend/` is exactly: `rm -f test/.ua-executed.json` then `npm test` then `node --experimental-strip-types test/ua-coverage-equality.mjs`. Frozen gate additionally includes typecheck G2 per DEC-UA-014, `npm run lint`, and `npm run build`. Do not put CASE-UA-W15-003 inside a `test()` that `npm test` runs.

---

## Coverage matrix

Combination strategy: exhaustive on presentation partitions listed; exclude API/auth/retry combinations as unreachable (EV-UA-A-006). Cartesian durable-state × retry × ownership schedules are unreachable because this package writes no durable/external protocol (A3 D2, D4, D6). Each case registration is an export in `REQUIRED_CASE_IDS` plus one `test()` that calls `recordExecuted` after the activation witness.

## CoverageRowDefaults

Every coverage-table row also has these E6 fields. Table columns are the row-specific overrides.

- requirement_ids / decision_ids: from the named scenario in A3
- production_path: the activation_witness file plus the window's authorized JSX/CSS
- state_partition: local frontend source after the predecessor window
- input_or_external_outcome: no network; named fixture or file read
- actions: run the registered `test()`
- expected_operations: 0 network, 0 DB
- forbidden_operations: DEC-UA-006 paths; copy paraphrase; Chart.js dataset edits


| case_id | scenario | window | activation_witness | expected_result | negative_control | test_registration | parity |
|---|---|---|---|---|---|---|---|
| CASE-UA-W1-001 | SCN-UA-005 | UA-W1 | allowlist assertion ran | forbidden paths absent from allowlist | NC-UA-005 | test/uphunt-aesthetic-coverage.test.ts | unit |
| CASE-UA-W1-002 | SCN-UA-006 | UA-W1 | digest function ran | REQUIRED_CASE_IDS digest stable | NC-UA-006 | same file | unit |
| CASE-UA-W2-001 | SCN-UA-001 | UA-W2 | globals.css read | tokens present | NC-UA-001 | test/uphunt-aesthetic-w2.test.ts | unit |
| CASE-UA-W2-002 | SCN-UA-002 | UA-W2 | section-intro.tsx read | export SectionIntro | NC-UA-002 | same | unit |
| CASE-UA-W2-003 | SCN-UA-002 | UA-W2 | landing-sections import | import path @/components/section-intro | NC-UA-002 | same | unit |
| CASE-UA-W2-004 | SCN-UA-001 | UA-W2 | reduced-motion regex | rule present | NC-UA-001 | same | unit |
| CASE-UA-W3-001 | SCN-UA-002 | UA-W3 | auth-form markup | Welcome back / DEC-UA-003 | NC-UA-002 | test/uphunt-aesthetic-w3.test.ts | component |
| CASE-UA-W3-002 | SCN-UA-002 | UA-W3 | auth-form markup | Save your search | NC-UA-002 | same | component |
| CASE-UA-W3-003 | SCN-UA-001 | UA-W3 | app-header class | site-header present | NC-UA-001 | same | unit |
| CASE-UA-W3-004 | SCN-UA-002 | UA-W3 | not-found markup | 404 eyebrow present | NC-UA-002 | same | component |
| CASE-UA-W4-001 | SCN-UA-002 | UA-W4 | page.tsx source | LandingHeroCopy import | NC-UA-002 | test/uphunt-aesthetic-w4.test.ts | unit |
| CASE-UA-W4-002 | SCN-UA-001 | UA-W4 | globals.css | .run-form-card uses radius-panel or equivalent token | NC-UA-001 | same | unit |
| CASE-UA-W5-001 | SCN-UA-002 | UA-W5 | landing-sections | SectionIntro usage count >= 1 | NC-UA-002 | test/uphunt-aesthetic-w5.test.ts | unit |
| CASE-UA-W5-002 | SCN-UA-001 | UA-W5 | globals.css | marketing-heading h2 clamp 36px | NC-UA-001 | same | unit |
| CASE-UA-W6-001 | SCN-UA-002 | UA-W6 | runs/page.tsx | DEC-UA-003 /runs title | NC-UA-002 | test/uphunt-aesthetic-w6.test.ts | unit |
| CASE-UA-W6-002 | SCN-UA-002 | UA-W6 | keywords/page.tsx | DEC-UA-003 /keywords title | NC-UA-002 | same | unit |
| CASE-UA-W6-003 | SCN-UA-002 | UA-W6 | continue page or run-continuation | DEC-UA-003 continue title | NC-UA-002 | same | unit |
| CASE-UA-W7-001 | SCN-UA-002 | UA-W7 | query-editor.tsx | Shape the searches before discovery starts. | NC-UA-002 | test/uphunt-aesthetic-w7.test.ts | unit |
| CASE-UA-W7-002 | SCN-UA-002 | UA-W7 | run-progress.tsx | StoreSignal is looking for matching stores. | NC-UA-002 | same | unit |
| CASE-UA-W8-001 | SCN-UA-002 | UA-W8 | run-workspace or results heading | DEC-UA-003 completed title | NC-UA-002 | test/uphunt-aesthetic-w8.test.ts | unit |
| CASE-UA-W8-002 | SCN-UA-002 | UA-W8 | leads/page.tsx | DEC-UA-003 /leads title | NC-UA-002 | same | unit |
| CASE-UA-W8-003 | SCN-UA-003 | UA-W8 | results-table.tsx | detail-row class present | NC-UA-003 | same | unit |
| CASE-UA-W9-001 | SCN-UA-003 | UA-W9 | LeadDetails markup | Know the business behind this domain. | NC-UA-002 | test/uphunt-aesthetic-w9.test.ts | component |
| CASE-UA-W9-002 | SCN-UA-003 | UA-W9 | globals.css | no 0.5rem on owned h3 | NC-UA-003 | same | unit |
| CASE-UA-W9-003 | SCN-UA-003 | UA-W9 | denseLead render | store identity fields present | NC-UA-003 | same | component |
| CASE-UA-W9-004 | SCN-UA-003 | UA-W9 | globals.css | identity fact-grid not repeat(8 | NC-UA-003 | same | unit |
| CASE-UA-W10-001 | SCN-UA-003 | UA-W10 | LeadDetails | Whether this shop belongs in the market you asked for. | NC-UA-002 | test/uphunt-aesthetic-w10.test.ts | component |
| CASE-UA-W10-002 | SCN-UA-003 | UA-W10 | LeadDetails | How this store entered the list. | NC-UA-002 | same | component |
| CASE-UA-W10-003 | SCN-UA-003 | UA-W10 | denseLead | nested evidence summary present | NC-UA-003 | same | component |
| CASE-UA-W11-001 | SCN-UA-003 | UA-W11 | traffic-enrichment | Where this store already appears in search. | NC-UA-002 | test/uphunt-aesthetic-w11.test.ts | component |
| CASE-UA-W11-002 | SCN-UA-003 | UA-W11 | fixture render | Crux or traffic source markup when fixture has it | NC-UA-003 | same | component |
| CASE-UA-W12-001 | SCN-UA-004 | UA-W12 | research-dashboard.tsx | The landscape behind this market. | NC-UA-002 | test/uphunt-aesthetic-w12.test.ts | unit |
| CASE-UA-W12-002 | SCN-UA-004 | UA-W12 | research-dashboard.tsx | SectionIntro import | NC-UA-002 | same | unit |
| CASE-UA-W13-001 | SCN-UA-004 | UA-W13 | keyword-dashboard.module.css | .charts 1fr; no repeat(2 for desktop .charts | NC-UA-004 | test/uphunt-aesthetic-w13.test.ts | unit |
| CASE-UA-W13-002 | SCN-UA-004 | UA-W13 | module css | wrap heights 520/420/360/380 as locked | NC-UA-004 | same | unit |
| CASE-UA-W13-003 | SCN-UA-004 | UA-W13 | chart-panels.tsx | all data-surface chart:* values | NC-UA-004 | same | unit |
| CASE-UA-W13-004 | SCN-UA-004 | UA-W13 | chart-panels or dashboard | DEC-UA-005 H2 strings present | NC-UA-002 | same | unit |
| CASE-UA-W14-001 | SCN-UA-004 | UA-W14 | keyword-table.tsx | Every active phrase, ready to inspect and keep. | NC-UA-002 | test/uphunt-aesthetic-w14.test.ts | unit |
| CASE-UA-W14-002 | SCN-UA-004 | UA-W14 | cluster-landscape.tsx | Related phrases, grouped so you can choose a lane. | NC-UA-002 | same | unit |
| CASE-UA-W14-003 | SCN-UA-004 | UA-W14 | filter-bar.tsx | data-filter="market" | NC-UA-004 | same | unit |
| CASE-UA-W15-001 | SCN-UA-001 | UA-W15 | globals.css | reduced-motion | NC-UA-001 | test/uphunt-aesthetic-w15.test.ts | unit |
| CASE-UA-W15-002 | SCN-UA-003 | UA-W15 | globals.css | owned h3 not 0.5rem | NC-UA-003 | same | unit |
| CASE-UA-W15-003 | SCN-UA-005 | UA-W15 | coverage getExecuted vs REQUIRED | sets equal after npm test then equality script | NC-UA-006 | test/ua-coverage-equality.mjs | unit |

Required ID list (exact members for E6 digest):

```
CASE-UA-W1-001
CASE-UA-W1-002
CASE-UA-W2-001
CASE-UA-W2-002
CASE-UA-W2-003
CASE-UA-W2-004
CASE-UA-W3-001
CASE-UA-W3-002
CASE-UA-W3-003
CASE-UA-W3-004
CASE-UA-W4-001
CASE-UA-W4-002
CASE-UA-W5-001
CASE-UA-W5-002
CASE-UA-W6-001
CASE-UA-W6-002
CASE-UA-W6-003
CASE-UA-W7-001
CASE-UA-W7-002
CASE-UA-W8-001
CASE-UA-W8-002
CASE-UA-W8-003
CASE-UA-W9-001
CASE-UA-W9-002
CASE-UA-W9-003
CASE-UA-W9-004
CASE-UA-W10-001
CASE-UA-W10-002
CASE-UA-W10-003
CASE-UA-W11-001
CASE-UA-W11-002
CASE-UA-W12-001
CASE-UA-W12-002
CASE-UA-W13-001
CASE-UA-W13-002
CASE-UA-W13-003
CASE-UA-W13-004
CASE-UA-W14-001
CASE-UA-W14-002
CASE-UA-W14-003
CASE-UA-W15-001
CASE-UA-W15-002
CASE-UA-W15-003
```

Planned count: 43.

Pinned required-set digest (E6, independently recomputed 2026-09-01): `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05`.


Critical invariants INV-UA-001..010 map to NC-UA-005 (forbidden paths), NC-UA-001 (tokens/motion), NC-UA-003 (lead fields/type), NC-UA-004 (chart stack), NC-UA-002 (headlines).


## File ownership (PT-002)

| Path | Plan owner | Assertion |
|---|---|---|
| frontend/test/uphunt-aesthetic-coverage.test.ts | UA-W1 create only | CASE-UA-W1-001/002 |
| frontend/test/ua-coverage-equality.mjs | UA-W15 | CASE-UA-W15-003 |
| frontend/components/section-intro.tsx | UA-W2 | CASE-UA-W2-002 |
| frontend/components/landing-sections.tsx | UA-W2 import; UA-W5 copy/spacing | CASE-UA-W2-003 CASE-UA-W5-001 |
| frontend/components/app-header.tsx | UA-W3 | CASE-UA-W3-003 |
| frontend/components/auth-form.tsx | UA-W3 | CASE-UA-W3-001/002 |
| frontend/app/not-found.tsx | UA-W3 | CASE-UA-W3-004 |
| frontend/app/page.tsx | UA-W4 | CASE-UA-W4-001 |
| frontend/components/run-form.tsx | UA-W4 | CASE-UA-W4-002 |
| frontend/app/runs/page.tsx | UA-W6 | CASE-UA-W6-001 |
| frontend/app/runs/continue/page.tsx | UA-W6 | CASE-UA-W6-003 |
| frontend/app/keywords/page.tsx | UA-W6 | CASE-UA-W6-002 |
| frontend/components/run-history.tsx | UA-W6 | CASE-UA-W6-001 |
| frontend/components/run-continuation.tsx | UA-W6 | CASE-UA-W6-003 |
| frontend/components/keyword-intelligence/research-form.tsx | UA-W6 | CASE-UA-W6-002 |
| frontend/components/query-editor.tsx | UA-W7 | CASE-UA-W7-001 |
| frontend/components/run-progress.tsx | UA-W7 | CASE-UA-W7-002 |
| frontend/app/runs/[runId]/page.tsx | UA-W8 read-only; headings live in run-workspace.tsx | CASE-UA-W8-001 |
| frontend/app/layout.tsx | UA-W3 read-only | CASE-UA-W3-003 |
| frontend/app/sign-in/page.tsx | UA-W3 read-only | CASE-UA-W3-001 |
| frontend/app/sign-up/page.tsx | UA-W3 read-only | CASE-UA-W3-002 |
| frontend/app/design-fixture/page.tsx | parked gated route; not an A1 information page | SRC-UA-0013 SRC-UA-0090 |
| frontend/components/leads/live-leads-workspace.tsx | UA-W8 | CASE-UA-W8-002 |
| frontend/components/run-workspace.tsx | UA-W8 completed heading only | CASE-UA-W8-001 |
| frontend/components/results-table.tsx | UA-W8 | CASE-UA-W8-003 |
| frontend/components/results-filters.tsx | UA-W8 | CASE-UA-W8-003 |
| frontend/components/cumulative-traffic.tsx | UA-W8 | CASE-UA-W8-001 |
| frontend/components/lead-details.tsx | UA-W9 overview; UA-W10 store-fit/discovery; UA-W11 TrafficEnrichmentDetails call | CASE-UA-W9-* CASE-UA-W10-* CASE-UA-W11-* |
| frontend/test/lead-details-component.test.ts | UA-W9 T4 title-order assertions; UA-W10 T3 one-line 03 title-order assertion | predecessor G1 (DEC-UA-016) |
| frontend/components/traffic-enrichment.tsx | UA-W11 | CASE-UA-W11-001/002 |
| frontend/app/keywords/[researchId]/page.tsx | UA-W12 | CASE-UA-W12-001 |
| frontend/components/keyword-intelligence/research-dashboard.tsx | UA-W12 intro; UA-W13 reorder | CASE-UA-W12-* CASE-UA-W13-004 |
| frontend/components/keyword-intelligence/selection-review.tsx | UA-W12 | CASE-UA-W12-001 |
| frontend/components/keyword-intelligence/chart-panels.tsx | UA-W13 | CASE-UA-W13-001/003/004 |
| frontend/components/keyword-intelligence/keyword-dashboard.module.css | UA-W13 layout/heights; UA-W14 leftover module rules | CASE-UA-W13-001/002 |
| frontend/components/keyword-intelligence/summary-cards.tsx | UA-W13/W14 overlap title | CASE-UA-W13-004 CASE-UA-W14-002 |
| frontend/components/keyword-intelligence/keyword-table.tsx | UA-W14 | CASE-UA-W14-001 |
| frontend/components/keyword-intelligence/filter-bar.tsx | UA-W14 | CASE-UA-W14-003 |
| frontend/components/keyword-intelligence/cluster-landscape.tsx | UA-W14 | CASE-UA-W14-002 |
| frontend/app/globals.css | symbol-specific per F1 shared_file_scope | window CASE CSS assertions |
| frontend/test/uphunt-aesthetic-wN.test.ts | UA-Wn | allocated CASE IDs |

`globals.css` sequential owners: W3 header/auth/404 → W4 landing hero → W5 lower landing → W6 app canvas/history → W7 run/query/progress → W8 results table → W9–W11 lead-details slices → W15 leftover @media only.

## Enforcement falsification controls (Section 8.5)

Prescribed; executed at UA-W15 unless noted.

1. Remove `CASE-UA-W2-001` from `REQUIRED_CASE_IDS` → CASE-UA-W1-002 digest fails.
2. Skip one allocated `test()` with `it.skip` / `test.skip` → CASE-UA-W15-003 executed set missing that ID.
3. Duplicate an ID in `REQUIRED_CASE_IDS` → CASE-UA-W1-002 throws before hashing.
4. Call `recordExecuted` without the activation witness (omit the file-read/assert) → oracle in that CASE fails; if both are omitted, CASE-UA-W15-003 still fails only if the ID is missing — therefore each CASE test MUST throw if the witness string/file is absent before `recordExecuted`.
5. Weaken CASE-UA-W13-001 by accepting `repeat(2` → NC-UA-004; acceptance must fail.
6. Point a substitute at a different CSS file than `frontend/app/globals.css` → token CASE fails (SUB-UA-001 known_difference is source-text not computed px; it cannot prove computed layout).

## Test substitutes (E7)

```yaml
substitute_id: SUB-UA-001
production_boundary: Browser-computed CSS on Next.js routes
test_substitute: UTF-8 file read of globals.css / CSS modules plus renderToStaticMarkup of components with fixtures.ts
contract_fields: class names, exact headline strings, CSS property text, data-surface attribute values
operation_order: N/A (no durable writes)
failure_modes: missing string/rule fails the CASE
time_and_concurrency: N/A
fidelity_proof: UA-W3+ browser screenshots are local_e2e evidence, not the CASE oracle
known_differences: file-read does not prove computed pixel values after cascade
claims_not_supported: live production pixels (SRC-UA-0090 parked)
```

## Final independent review

Reserved for parent after UA-W15. Not an implementation window.

- [ ] FR-001 Inspect current source vs this checklist. Evidence: ___
- [ ] FR-002 Recompute coverage digest from §Coverage members. Evidence: ___
- [ ] FR-003 Confirm no successor AWS/KI window was started. Evidence: ___
