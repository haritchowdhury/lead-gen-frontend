# UA-W1 frozen sub-window decomposition checklist (`S1`)

Subordinate artifact `S1` of parent window `UA-W1` under assignment `ASG-UA-W1-01`.
Companion artifacts: `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W1_SUBWINDOW_STATE_S2.yaml`
and `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W1_SUBWINDOW_EVIDENCE_S3.md`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

This file is frozen once the parent approves the decomposition. Corrections are appended
in §12 with new IDs; existing blocks are never rewritten.

## 1. Inherited authority and revision pins

| Pin | Value |
|---|---|
| Parent window | `UA-W1` |
| Parent assignment | `ASG-UA-W1-01` |
| Window agent | `UA-W1-WINDOW-AGENT` |
| Parent standard | `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` |
| Sub-window standard | `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` |
| Contract `A1` | `a33ae1d8af4442de2680dc70f2c6e793a668b1400f0814833489061848c9baef` |
| Decision `A3` | `edfc34d4f2ffe6f372f975f5b0247893a258da6364fb79ea638928dd687197e5` |
| Checklist `A4` | `c46ef7c2287ad9ebf9de28cdec941d8f755e45ae43f72656f0e343105b645977` |
| Required coverage set (43 IDs, E6) | `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` (recomputed 2026-09-01, matches `A4` pin and `A6` `EV-UA-A-009`) |
| `A5` authorized_windows | `[UA-W1]` |
| `A5` may_start_successor | `false` |
| Successor `UA-W2` | reserved for parent |

The DESIGN_SYSTEM package (`DESIGN_SYSTEM_EXECUTION_CHECKLIST.md`, G-R1,
`frontend/docs/open-work/design-system/`, `DESIGN_SYSTEM_W1_SUBWINDOW_STATE.yaml`) is
rejected authority per `A6` `EV-UA-A-020`. No member of it is read scope for any
sub-window of `UA-W1`.

## 2. Parent-window scope and exclusions (copied, no expansion)

From `A4` §UA-W1 F1 and `A5` `authorized_write_scope`:

- Objective: frozen coverage registry and forbidden-path handoff check; no visual product change.
- Window write scope (implementation): `frontend/test/uphunt-aesthetic-coverage.test.ts` (CREATE).
- Window-agent coordination writes (never implementation): `S1`, `S2`, `S3` (this decomposition),
  `A6` append-only, `A4` `UA-W1-P*`/`UA-W1-T*`/`UA-W1-V*`/`UA-W1-H*` checkboxes only,
  `frontend/review-evidence/uphunt-aesthetic/UA-W1_HANDOFF.md`, and at handoff only
  `A5.current_status: AWAITING_REVIEW`.
- Read-only scope: `A1`, `A4` §Coverage, `frontend/package.json` (window); leaf scope narrowed in §6.
- Authorized actions: `create_test_file`, `run_frontend_unit_tests`; window-agent assessment,
  coordination writes above; sandbox escalation per E8.1 policy below.
- Prohibited: `edit_production_source`, `edit_package_json`, `edit_design_fixture`, any app or
  component file edit, `edit_REQUIRED_CASE_IDS_after_initial_create`, `start_UA-W2`,
  `may_start_successor`, `aws`, `commit`, `push`, `production`, `paid_provider`,
  `edit_email_scraper`, `edit_root_ACTIVE_EXECUTION_STATE`.
- `browser_evidence: false`; `npm run lint` is not a UA-W1 gate (no CSS/JSX owned).

## 3. Starting working-tree inventory (recorded 2026-09-01T17:30:00+05:30, read-only)

Repository: `/home/harit/Email Scrapper/frontend` (git toplevel). Coordination root
`/home/harit/Email Scrapper` is a separate git repository and reported a clean
`git status --porcelain`.

Starting changed-file set (frontend repo, `git status --porcelain`, sorted):

1. `?? docs/open-work/design-system/` — untracked; user-owned; out-of-assignment output rejected by `EV-UA-A-020`; PRESERVE, never read for authority, never modify.
2. ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml` — assignment fields written by parent (`EV-UA-A-019`); starting digest `fa23432c6d0a7c4aed010ded335088f7cc45e08ff51cbe6fa28e08addb24a6f8`; PROTECTED (no writes during decomposition; only the handoff action `set_A5_AWAITING_REVIEW_on_handoff` may touch it later, during execution, never by a leaf).
3. ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` — authoring/assignment evidence; starting digest `1e3a3208479867e8ff70022356d46cf28ec1d5c388ba2ab5622699db32522cee`; window-agent append-only; PROTECTED against leaf writes.

Starting repository change set digest (§4.7 formula over the three paths above):
`e916afc56e3fc315c8bc780d1db8e7c56d5b83f765f26b4ca59ccff7c25d5257`.

Environment: node `v24.14.1`; `frontend/package.json` `test` =
`node --experimental-strip-types --test test/*.test.ts` (glob `test/*.test.ts`).
`frontend/test/uphunt-aesthetic-coverage.test.ts`: ABSENT.
`frontend/test/.ua-executed.json`: ABSENT; NOT covered by `.gitignore`; generated untracked
runtime state that must never be staged or committed (`DEC-UA-011`).
`tsconfig.json` includes `**/*.ts` (strict); `npx tsc --noEmit` will typecheck the leaf file.

## 4. Initial single-file dependency DAG

```text
UA-W1-S001 (FILE, create frontend/test/uphunt-aesthetic-coverage.test.ts)
  -> UA-W1-I001 (INTEGRATION_ASSESSMENT, window agent, zero implementation write authority)
```

- Single edge justification: the integration gate consumes the completed file produced by `UA-W1-S001`.
- Acyclic; no parallel waves (`A5` authorizes none; one file total).
- Intermediate-state contract (§6.1 of the sub-window standard): after `UA-W1-S001` is accepted,
  the only workspace delta is the writable file plus the parent-authorized disposable runtime
  artifact `frontend/test/.ua-executed.json` (removed by prescribed leaf cleanup, so no residue).
  `node --experimental-strip-types --test test/uphunt-aesthetic-coverage.test.ts` passes with
  exactly 2 passing tests; no test anywhere is expected to fail. Repo-wide gates `npm test` and
  `npx tsc --noEmit` are PENDING (unrun), owned by `UA-W1-I001`. No externally visible state
  exists (test file is not imported by app code). Prohibited while intermediate state exists:
  any second file edit, any successor-window work.
- No planned file depends on an interface produced outside this window. The file's produced
  interface (§7) is consumed by later windows' `uphunt-aesthetic-wN.test.ts` files and
  `UA-W15`'s `ua-coverage-equality.mjs` — none execute inside `UA-W1`.

## 5. Exact allocation of requirements, decisions, interfaces, and coverage cases

Parent trace for `UA-W1` (all IDs from `A1`/`A3`/`A4`):

| Parent ID | Allocated to | Terminal anchor |
|---|---|---|
| REQ-UA-005 | `UA-W1-S001` CASE-UA-W1-001 | allowlist assertion in the writable file |
| REQ-UA-008 | `UA-W1-S001` CASE-UA-W1-002 (registry) | `REQUIRED_CASE_IDS` + digest assertion |
| INV-UA-001 | window diff check (`UA-W1-I001` gate G6) + CASE-UA-W1-001 | forbidden-path negative search |
| INV-UA-007 | preflight rules in `UA-W1-S001` P1/P2 | git status before/after comparison |
| DEC-UA-006 | CASE-UA-W1-001 fragments; `UA-W1-I001` G6 | four forbidden fragments asserted absent from allowlist |
| DEC-UA-007 | window ID grammar `UA-W1-S00x`/`UA-W1-I001` | this `S1` |
| DEC-UA-011 | entire writable-file content spec (§7.3) | exports + tests, byte-exact content |
| DEC-UA-013 | leaf preflight (git status from frontend/ and coordination root) | P1/P2 steps |
| UA-W1-T1 | `UA-W1-S001` ordered edits 1–6 (§7.3) | file content |
| UA-W1-T2 | `UA-W1-S001` ordered edits 7–8 (§7.3) | file content |
| SCN-UA-005 | CASE-UA-W1-001 | test executes, calls `recordExecuted` after witness |
| SCN-UA-006 | CASE-UA-W1-002 | digest + duplicate-throw assertions, then `recordExecuted` |
| NC-UA-005 | leaf probe N1 + `UA-W1-I001` G8 | allowlist containing `app/api` fails the assertion logic |
| NC-UA-006 | leaf probe N2 + `UA-W1-I001` G8 | 42-ID set digest ≠ pin; duplicate throws |

Remaining 41 coverage CASE IDs are allocated to later windows' own test files by the
`test_registration` column of `A4` §Coverage; they are not `UA-W1` required changed files.
Every `DEC-UA-001..013` names its `implementing_tasks` in `A3`; no parent requirement,
decision, task, scenario, or coverage case is unmapped (`A8` traces hold).

### 5.1 Frozen cross-file interface produced by `UA-W1-S001`

Consumed by later windows (`UA-W2+` test files import `recordExecuted`; `UA-W15`
`ua-coverage-equality.mjs` imports `listRequiredCaseIds`, `coverageDigest`, `getExecuted`,
`recordExecuted`). Frozen now, before any dependent window executes:

```text
export const REQUIRED_CASE_IDS: readonly string[]   // frozen 43-member array, A4 §Coverage order; MUST NOT be edited after initial create (A5 prohibition)
export function listRequiredCaseIds(): string[]     // returns a fresh copy, same order
export function coverageDigest(ids: readonly string[]): string
  // lowercase hex SHA-256 over the distinct IDs sorted by unsigned UTF-8 byte order,
  // each ID followed by one LF byte (parent-standard E6 / sub-window standard §4.7);
  // throws Error("duplicate coverage case id: <id>") if any ID repeats, before hashing
export function getExecuted(): string[]             // parses frontend/test/.ua-executed.json; [] when absent; Error on malformed content
export function recordExecuted(id: string): void
  // throws Error("unknown coverage case id: <id>") for an ID outside REQUIRED_CASE_IDS;
  // otherwise merges id into frontend/test/.ua-executed.json (creates the file when absent)
  // storing a sorted unique JSON string array; never in-process memory only
```

No other exports; no default export. Test titles embed the CASE IDs.

## 6. Initial implementation sub-window `UA-W1-S001`

```yaml
subwindow_id: UA-W1-S001
type: FILE
parent_window_id: UA-W1
parent_assignment_id: ASG-UA-W1-01
assigned_agent: UNASSIGNED
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-coverage.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: e916afc56e3fc315c8bc780d1db8e7c56d5b83f765f26b4ca59ccff7c25d5257
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A1_LOCKED_PRODUCT_CONTRACT.md
  - frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md
  - frontend/package.json
authorized_actions:
  - create_writable_file_with_exact_content_below
  - run_node_test_on_writable_file
  - run_in_memory_negative_control_probes_N1_N2
  - record_git_status_preflight_and_postcondition
  - remove_generated_test_dot_ua_executed_json
prohibited_actions:
  - edit_any_workspace_file_other_than_writable_file
  - edit_REQUIRED_CASE_IDS_after_initial_create
  - enable_required_equals_executed_equality
  - edit_package_json
  - edit_design_fixture
  - edit_app_or_component_or_globals_files
  - edit_A4_A5_A6_S1_S2_S3_or_any_authority_artifact
  - communicate_with_parent_agent
  - start_successor_or_corrective_work
  - aws
  - commit
  - push
  - production
  - paid_provider
  - edit_email_scraper
  - edit_root_ACTIVE_EXECUTION_STATE
  - npm_install_or_any_format_fix_generate_build_command
may_start_successor: false
```

### 6.1 Mechanical trace

- Requirements: REQ-UA-005, REQ-UA-008. Invariants: INV-UA-001, INV-UA-007.
- Decisions: DEC-UA-006, DEC-UA-007, DEC-UA-011, DEC-UA-013.
- Tasks: UA-W1-T1 (edits 1–6), UA-W1-T2 (edits 7–8).
- Scenario/coverage: SCN-UA-005 → CASE-UA-W1-001; SCN-UA-006 → CASE-UA-W1-002.
- Negative controls: NC-UA-005, NC-UA-006.
- Every requirement terminates in an executable assertion inside the single writable file.

### 6.2 Exact file transformation (§7.3 fields)

1. Starting state: `frontend/test/uphunt-aesthetic-coverage.test.ts` ABSENT (digest ABSENT);
   anchors: none (new file). Relevant existing behavior to preserve: none (no file imports it).
2. Target anchor: the exact 100%-complete file content in §6.3 below. The ending file MUST be
   byte-identical to that block (final newline included, no trailing whitespace, no BOM).
3. Ordered edits (atomic CREATE, one operation): write the §6.3 content once. No second write
   pass, no post-write formatting.
4. Complete signatures, constants, formulas, bounds: the §5.1 interface block plus, inside the
   file: `PINNED_REQUIRED_SET_DIGEST = "0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05"`;
   `REQUIRED_CASE_IDS` members are exactly the 43 IDs of `A4` §Coverage in the listed order;
   executed-set path is `frontend/test/.ua-executed.json` resolved from the test file's own
   directory; digest algorithm is E6 (UTF-8 byte-order sort, ID + LF, lowercase hex).
5. Imports/exports/callers/consumers affected by this file: imports only
   `node:crypto`, `node:fs`, `node:test`, `node:assert/strict`, `node:url`; exports exactly
   `REQUIRED_CASE_IDS`, `listRequiredCaseIds`, `coverageDigest`, `getExecuted`,
   `recordExecuted` (§5.1). No app/component file is imported or touched.
6. Operation ordering / transaction class: `SAME_ATOMIC_BOUNDARY` of one file create; rollback =
   delete that file (restore ABSENT).
7. Failure outcomes applicable to this file: if the LOCAL_NOW check fails, or either negative
   control fails to fail, the leaf stops and reports `AWAITING_WINDOW_REVIEW` with the failure
   captured; no retry of any kind; no second file edit. Duplicate/restart/concurrency/cancellation:
   N/A (single idempotent create; re-running the test only rewrites the disposable executed-set
   JSON, which is removed by cleanup step).
8. Preserved behavior/content: none required (file is new). `frontend/test/fixtures.ts` and all
   existing test files remain untouched.
9. Obsolete behavior removed: none.
10. Resulting interface exposed to successors: §5.1, byte-frozen.
11. Forbidden edits within the writable file: anything other than the §6.3 bytes; no comments;
    no additional tests; no assertion that `getExecuted()` equals `REQUIRED_CASE_IDS` (full-set
    equality is `UA-W15-V5` only); no `REQUIRED_CASE_IDS` mutation after the initial create.

### 6.3 Exact required ending file content

```ts
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

export const REQUIRED_CASE_IDS: readonly string[] = [
  "CASE-UA-W1-001",
  "CASE-UA-W1-002",
  "CASE-UA-W2-001",
  "CASE-UA-W2-002",
  "CASE-UA-W2-003",
  "CASE-UA-W2-004",
  "CASE-UA-W3-001",
  "CASE-UA-W3-002",
  "CASE-UA-W3-003",
  "CASE-UA-W3-004",
  "CASE-UA-W4-001",
  "CASE-UA-W4-002",
  "CASE-UA-W5-001",
  "CASE-UA-W5-002",
  "CASE-UA-W6-001",
  "CASE-UA-W6-002",
  "CASE-UA-W6-003",
  "CASE-UA-W7-001",
  "CASE-UA-W7-002",
  "CASE-UA-W8-001",
  "CASE-UA-W8-002",
  "CASE-UA-W8-003",
  "CASE-UA-W9-001",
  "CASE-UA-W9-002",
  "CASE-UA-W9-003",
  "CASE-UA-W9-004",
  "CASE-UA-W10-001",
  "CASE-UA-W10-002",
  "CASE-UA-W10-003",
  "CASE-UA-W11-001",
  "CASE-UA-W11-002",
  "CASE-UA-W12-001",
  "CASE-UA-W12-002",
  "CASE-UA-W13-001",
  "CASE-UA-W13-002",
  "CASE-UA-W13-003",
  "CASE-UA-W13-004",
  "CASE-UA-W14-001",
  "CASE-UA-W14-002",
  "CASE-UA-W14-003",
  "CASE-UA-W15-001",
  "CASE-UA-W15-002",
  "CASE-UA-W15-003",
];

export function listRequiredCaseIds(): string[] {
  return [...REQUIRED_CASE_IDS];
}

export function coverageDigest(ids: readonly string[]): string {
  const unique = new Set<string>();
  for (const id of ids) {
    if (unique.has(id)) {
      throw new Error(`duplicate coverage case id: ${id}`);
    }
    unique.add(id);
  }
  const sorted = [...unique].sort((a, b) =>
    Buffer.compare(Buffer.from(a, "utf8"), Buffer.from(b, "utf8")),
  );
  const hash = createHash("sha256");
  for (const id of sorted) {
    hash.update(Buffer.from(id, "utf8"));
    hash.update(Buffer.from("\n", "utf8"));
  }
  return hash.digest("hex");
}

const PINNED_REQUIRED_SET_DIGEST = "0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05";

const executedSetPath = fileURLToPath(new URL(".ua-executed.json", import.meta.url));

export function getExecuted(): string[] {
  if (!existsSync(executedSetPath)) {
    return [];
  }
  const parsed: unknown = JSON.parse(readFileSync(executedSetPath, "utf8"));
  if (!Array.isArray(parsed) || !parsed.every((id): id is string => typeof id === "string")) {
    throw new Error(`malformed executed set file: ${executedSetPath}`);
  }
  return parsed;
}

export function recordExecuted(id: string): void {
  if (!REQUIRED_CASE_IDS.includes(id)) {
    throw new Error(`unknown coverage case id: ${id}`);
  }
  const merged = [...new Set([...getExecuted(), id])].sort((a, b) =>
    Buffer.compare(Buffer.from(a, "utf8"), Buffer.from(b, "utf8")),
  );
  writeFileSync(executedSetPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
}

const UA_W1_WRITE_SCOPE_ALLOWLIST: readonly string[] = [
  "frontend/test/uphunt-aesthetic-coverage.test.ts",
];

const FORBIDDEN_PATH_FRAGMENTS: readonly string[] = [
  "app/api",
  "lib/api-types.ts",
  "email_scraper",
  "ACTIVE_EXECUTION_STATE.md",
];

test("CASE-UA-W1-001 UA-W1 write-scope allowlist excludes every forbidden path", () => {
  assert.deepEqual(
    [...UA_W1_WRITE_SCOPE_ALLOWLIST],
    ["frontend/test/uphunt-aesthetic-coverage.test.ts"],
  );
  for (const allowed of UA_W1_WRITE_SCOPE_ALLOWLIST) {
    for (const fragment of FORBIDDEN_PATH_FRAGMENTS) {
      assert.ok(
        !allowed.includes(fragment),
        `forbidden fragment ${fragment} found in ${allowed}`,
      );
    }
  }
  recordExecuted("CASE-UA-W1-001");
});

test("CASE-UA-W1-002 required coverage set digest matches the frozen A4 pin", () => {
  const ids = listRequiredCaseIds();
  assert.equal(ids.length, 43);
  assert.equal(new Set(ids).size, 43);
  assert.throws(
    () => coverageDigest([...ids, "CASE-UA-W1-001"]),
    /duplicate coverage case id: CASE-UA-W1-001/,
  );
  assert.equal(coverageDigest(ids), PINNED_REQUIRED_SET_DIGEST);
  recordExecuted("CASE-UA-W1-002");
});
```

### 6.4 Exact checks (§7.4 fields)

| ID | Command / inspection (cwd `frontend/`) | Class | Expected | Activation witness / assertions |
|---|---|---|---|---|
| P1 | `git status --porcelain` in `frontend/` and in `/home/harit/Email Scrapper` | LOCAL_NOW | matches §3 inventory: frontend set = 3 recorded paths + this decomposition's coordination artifacts only; coordination root clean; protected digests unchanged (`A5` `fa23432c…`) | DEC-UA-013 preflight recorded |
| P2 | `sha256sum` of writable file | LOCAL_NOW | ABSENT (file does not exist) | baseline recorded |
| V-A | `node --experimental-strip-types --test test/uphunt-aesthetic-coverage.test.ts` | LOCAL_NOW | exit 0; exactly 2 passing tests, 0 failed, 0 skipped; titles begin `CASE-UA-W1-001` and `CASE-UA-W1-002` | witness "allowlist assertion ran" (CASE-UA-W1-001), witness "digest function ran" (CASE-UA-W1-002); recordExecuted is called only after the assertions in each test (present in §6.3 bytes) |
| V-B | in-memory NC probe N1: evaluate the CASE-UA-W1-001 loop logic with allowlist member `frontend/app/api/route.ts` | LOCAL_NOW (node -e, writes no file) | assertion fails (forbidden fragment `app/api` detected) | NC-UA-005 falsified control demonstrated |
| V-C | in-memory NC probe N2: compute `coverageDigest` logic over the 43 IDs minus one; and call the duplicate path with `["CASE-UA-W1-001","CASE-UA-W1-001"]` | LOCAL_NOW (node -e, writes no file) | 42-ID digest ≠ pin; duplicate call throws `duplicate coverage case id: CASE-UA-W1-001` before hashing | NC-UA-006 falsified control demonstrated |
| V-D | `git status --porcelain` (frontend) + `rm -f test/.ua-executed.json` then `git status --porcelain` again | LOCAL_NOW | attributable changed-file set is exactly `frontend/test/uphunt-aesthetic-coverage.test.ts`; `.ua-executed.json` residue removed; §3 protected paths byte-unchanged | §4.6 single-file proof |
| DEFERRED | `npm test`, `npx tsc --noEmit`, coverage-scope assertions, forbidden-path negative search over the window diff | DEFERRED_TO_INTEGRATION | owned by `UA-W1-I001` | `A4` UA-W1-V2/V4/V5 |

Negative controls expected: 2 (N1, N2); both must fail as specified, proving the CASE oracles
can fail. Workspace write set of every LOCAL_NOW command: the writable file only, plus the
parent-authorized disposable runtime file `frontend/test/.ua-executed.json` created by running
the test and removed by V-D (prescribed cleanup; never committed).

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

(For V3: required local IDs for this leaf = `{CASE-UA-W1-001, CASE-UA-W1-002}`;
registered = the two `test()` titles; executed = the two IDs recorded via `recordExecuted`.)

## 7. Local and whole-window verification gates

Leaf-local gates: §6.4 (V-A..V-D). Frozen whole-window gates, executed only by `UA-W1-I001`
from `frontend/`, per `A4` §Gates and the `UA-W1` lifecycle:

| Gate | Command / assertion | Expected |
|---|---|---|
| G1 | `npm test` | exit 0; every `test/*.test.ts` suite passes; the two UA-W1 tests pass inside the run |
| G2 | `npx tsc --noEmit` | exit 0 |
| G3 | `npm run lint` | NOT RUN — skipped with reason: `UA-W1` owns no CSS/JSX (`A4` gate is conditional; F1 `authorized_actions` exclude lint) |
| G4 | browser evidence | NOT RUN — `browser_evidence: false` |
| G5 | coverage scope: executed set == `{CASE-UA-W1-001, CASE-UA-W1-002}`; both registered by exactly one `test()` each; both ⊂ required(43); zero skips, duplicates, unexpected, or unactivated IDs within this window; full-set equality is NOT asserted (`UA-W15-V5` owns it) | exact |
| G6 | `git status --porcelain` + forbidden-path negative search over the whole window delta (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`, `email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, design-fixture, app/component/globals files) | implementation delta == writable file only; coordination artifacts limited to the enumerated §2 list |
| G7 | static inspection of the leaf file's imports (`node:crypto`, `node:fs`, `node:test`, `node:assert/strict`, `node:url`) + suite behavior | 0 network operations, 0 DB operations (`UA-W1-V3`) |
| G8 | NC probes N1/N2 re-verified or cited from leaf evidence | both falsified |
| G9 | successor negative search: no `UA-W2` artifact, no `uphunt-aesthetic-w2.test.ts`, no SectionIntro file exists | `may_start_successor: false` honored |

PASS oracle for `UA-W1-I001`: G1, G2, G5–G9 all pass; G3/G4 recorded as skipped-with-reason;
`A4` `UA-W1-P1..P4`, `UA-W1-V1..V5`, `UA-W1-H1..H5` then checked with resolvable evidence;
handoff written; `A5.current_status` set to `AWAITING_REVIEW`; STOP per `UA-W1-H6`.
CORRECTION_REQUIRED oracle: any G-gate behavioral failure → §8 correction loop.
PARENT_BLOCKED oracle: any missing parent decision, contradiction with `A1`–`A4`, or required
scope expansion.

## 8. Correction and re-assessment rules

1. Every correction is a new single-file sub-window `UA-W1-C00n` with a new assignment ID and
   baseline digest, citing: the failed evidence, exact root cause, the governing requirement and
   decision already determining the remedy, the earlier sub-window corrected, and the gates
   invalidated. Nothing is rewritten in place; `S3` is append-only.
2. `REQUIRED_CASE_IDS` content is NOT correctable at window level: `A5` prohibits
   `edit_REQUIRED_CASE_IDS_after_initial_create`. A defect requiring an ID change is
   `PARENT_BLOCKED`.
3. After the last correction the window agent personally runs a new assessment `UA-W1-I00n`
   (new ID), reusing unchanged gates by exact reference and rerunning every gate invalidated by
   the correction, the coverage closure checks, and the forbidden-path negative search.
4. Environment rule (E8.1, inherited from `A5`): an otherwise-authorized local check MAY start
   with sandbox escalation. If an attempt is invalidated solely by sandbox denial or execution-
   channel loss, one identical recovery run is permitted (same arguments, selection, environment,
   fixtures, timeouts, resources, oracle, write scope) after read-only proof that no matching
   process, workspace/external mutation, or usable acceptance result remains. A changed command,
   an observable product/test failure, or any external action is NOT recoverable this way and
   enters the correction loop or `PARENT_BLOCKED`. Recovery limit: 1 per invalidated execution.
5. The window agent never repairs the leaf file directly; only corrective sub-windows edit it.

## 9. Mandatory authoring-readiness checklist (sub-window standard §11)

Evidence citations resolve into `S3` (`EV-UA1-D-001..003`).

### 9.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA1-D-001 (A5 fields + sha256 pins)
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA1-D-001 (recomputed SHA-256 matches)
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA1-D-003 (§2, §6, §7 of this S1)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA1-D-002 (§3 of this S1)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA1-D-003 (S1 spec / S2 state / S3 evidence paths)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA1-D-003 (leaf prohibited_actions; report-only-to-window-agent rule)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: EV-UA1-D-003 (§8 item 4 == A5 policy)

### 9.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA1-D-003 (§5 table; A3 implementing_tasks; A4 test_registration)
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA1-D-001 (DEC-UA-011 complete; recomputed digest equals pin)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA1-D-002 (both = {frontend/test/uphunt-aesthetic-coverage.test.ts}, digest `c9daa7d2fe9fbd5c436957f1d5f0851c371d3ce4543fc2809e302ad7879b139f`)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: EV-UA1-D-003 (§4: S001 is the only FILE sub-window)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: EV-UA1-D-003 (§6.1–§6.3)
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: EV-UA1-D-003 (§4; no waves)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: EV-UA1-D-003 (§5.1 frozen before UA-W2+ dispatch)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: EV-UA1-D-003 (§4 intermediate-state contract)
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: EV-UA1-D-003 (planned set has exactly one member; no other file classes in scope)
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: EV-UA1-D-003 (§6.4 command list; only prescribed disposable write is `.ua-executed.json` with prescribed cleanup)

### 9.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7 of the standard. Evidence: EV-UA1-D-003 (§6 block)
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: EV-UA1-D-003 (§6.2 + byte-exact §6.3)
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: EV-UA1-D-003 (§6.4)
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: EV-UA1-D-003 (§6.4 V-D)
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: EV-UA1-D-003 (§10 templates; §6.5 H3)
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: EV-UA1-D-003 (§6 prohibited_actions)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: EV-UA1-D-003 (V-A passes standalone; tsc/npm test deferred and named)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: EV-UA1-D-003 (§6.4 DEFERRED row → UA-W1-I001)

### 9.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: EV-UA1-D-003 (§5; 2 cases → S001; 41 → later windows per A4)
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: EV-UA1-D-003 (§6.4 V3 note; §7 G5)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: EV-UA1-D-003 (N1/N2 in-file level; NC-UA-001..004 belong to later windows' cases per A4)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: EV-UA1-D-003 (SUB-UA-001 inherited; this window uses direct fs/source oracles only, no substitute)
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: EV-UA1-D-003 (§11 below)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: EV-UA1-D-003 (§7; G3/G4 skipped-with-reason)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: EV-UA1-D-003 (§8)
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: EV-UA1-D-003 (§11 assigned WINDOW-AGENT; §8 item 5)
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: EV-UA1-D-003 (§7 G5/G8; §6.5 V1–V3)
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: EV-UA1-D-003 (§10.3)
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: EV-UA1-D-003 (§8 item 4)

### 9.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA1-D-003 (`UA-W1-S001`, `UA-W1-I001` unique; CASE/DEC/REQ/SCN IDs cite A3/A4)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA1-D-003 (S1 contains only concrete paths, digests, bytes)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA1-D-003 (§6.4 V-D exact-set comparison; prescribed disposable `.ua-executed.json` excluded by cleanup)
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: EV-UA1-D-002 (SW-D03 set equality is the failure detector)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: EV-UA1-D-003 (in-file duplicate throw; digest pin; G5)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: EV-UA1-D-003 (byte-pinned content + pinned digest; any weakening changes the diff reviewed in I001)
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: EV-UA1-D-003 (§6 prohibited_actions + V-D)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: EV-UA1-D-003 (§8 items 1, 5)
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: EV-UA1-D-003 + S2 `decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`, `assigned_agent: UNASSIGNED`
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA1-D-003 (S3 audit entry; 47/47 items checked, 0 unresolved)
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: EV-UA1-D-003 (§8 item 4)

## 10. Handoff templates

### 10.1 Leaf completion certificate (returned by `UA-W1-S001` agent)

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W1
subwindow_id: UA-W1-S001
assignment_id: ASG-UA-W1-01-S001
agent_identity: exact identity
writable_file: frontend/test/uphunt-aesthetic-coverage.test.ts
starting_file_digest: ABSENT
ending_file_digest: sha256
starting_repository_change_set_digest: e916afc56e3fc315c8bc780d1db8e7c56d5b83f765f26b4ca59ccff7c25d5257
attributable_changed_file_set: [frontend/test/uphunt-aesthetic-coverage.test.ts]
required_local_cases: [CASE-UA-W1-001, CASE-UA-W1-002]
registered_local_cases: [CASE-UA-W1-001, CASE-UA-W1-002]
executed_local_cases: [CASE-UA-W1-001, CASE-UA-W1-002]
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 2
negative_controls_falsified: 2
commands: []
deferred_integration_checks: [UA-W1-I001 G1, UA-W1-I001 G2, UA-W1-I001 G5, UA-W1-I001 G6, UA-W1-I001 G7, UA-W1-I001 G8, UA-W1-I001 G9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

### 10.2 Window-agent integration certificate (appended to `S3` by `UA-W1-I001`)

The §12.4 certificate of the sub-window standard, adapted: `integration_assessment_id:
UA-W1-I001`; `expected_changed_file_set: [frontend/test/uphunt-aesthetic-coverage.test.ts]`;
`required_case_count: 43`; `registered_case_count` = test() registrations actually present
(this window: 2 of 43; 41 planned for later windows and NOT counted as missing here);
`executed_case_count: 2`; executed/registered/required set digests computed with the §4.7
formula over the applicable sets; `status: READY_FOR_PARENT_REVIEW` only per the PASS oracle.

### 10.3 Consolidated parent handoff

`frontend/review-evidence/uphunt-aesthetic/UA-W1_HANDOFF.md` per `A4` handoff template and
sub-window standard §12.5: objective; status `READY_FOR_PARENT_REVIEW` or one exact blocker;
changed-file set + starting/ending SHA-256s; CASE required/registered/executed/skipped/
duplicate/unexpected (43/2/2/0/0/0 for this window; full 43-set equality deferred to UA-W15);
digest `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` for the required set;
commands and outcomes; sandbox recoveries; NC results; forbidden-path negative search;
`S1`/`S2`/`S3` paths and revisions; confirmation that `UA-W2` was not started.

## 11. Initial integration assessment `UA-W1-I001` (fully authored now)

```yaml
subwindow_id: UA-W1-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W1
parent_assignment_id: ASG-UA-W1-01
assigned_agent: WINDOW-AGENT (UA-W1-WINDOW-AGENT, personally executed, never delegated)
predecessors: [UA-W1-S001]
authorized_write_file: NONE (implementation files; coordination artifacts per §2 only)
input: assembled UA-W1 state after UA-W1-S001 is accepted
gates: §7 table G1–G9 (frozen)
pass_oracle: G1,G2,G5,G6,G7,G8,G9 pass; G3,G4 skipped-with-reason recorded
correction_oracle: any behavioral gate failure -> §8 loop with UA-W1-C00n
parent_blocked_oracle: missing decision / contradiction / scope expansion
execution_policy: E8.1 sandbox escalation + one identical recovery (§8 item 4)
may_start_successor: false
```

Accepted-subwindow and digest fields are filled from completed leaf evidence at run time;
the gate set above is frozen now (sub-window standard §9.1).

## 12. Append-only amendment sections

Reserved for corrective sub-windows (`UA-W1-C001`, …) and further assessments
(`UA-W1-I002`, …). Each amendment repeats the §6 block structure in full with a new ID,
new baseline digest, cited trigger evidence, and invalidated gates. Existing sections above
are immutable after parent approval.

## 13. Amendment `UA-W1-AM-001` — G2 re-pin (DEC-UA-014 / CHG-UA-0002, assignment ASG-UA-W1-02)

Trigger: `UA-W1-I001` returned `PARENT_BLOCKED` on frozen gate G2 (`npx tsc --noEmit`
exit 0) — 10 pre-existing diagnostics in 5 tracked unmodified test files owned by other
packages, proven byte-identical with this window's file removed (S3 `EV-UA1-I-001`,
`A6` `EV-UA-W1-I-001`). Parent decision recorded: re-pin G2; no baseline-repair window;
no write-scope expansion. Authority: `A3` `DEC-UA-014` (revision
`8faaa4e2411235d8a83ec94de6a07e53c54ece91d99121a3c0e09cb6052f4300`), `A4` §Gates
(revision `f1d8252cb815a541a4854c157c25698868a5caa8d27b351ce88480b6dffda99f`),
`A5` `state_version: 3`, `CHG-UA-0002` (`A7`).

**The original §7 G2 row (`npx tsc --noEmit` → exit 0) above is retained verbatim as
superseded history and is NOT rewritten.** All references to gate G2 below and in `UA-W1-I002`
mean the re-pinned oracle:

```yaml
amendment_id: UA-W1-AM-001
supersedes: S1 §7 gate G2 row only (exit-0 oracle)
governing_decision: DEC-UA-014
governing_change: CHG-UA-0002
assignment_id: ASG-UA-W1-02
new_G2_oracle:
  command: npx tsc --noEmit --pretty false   # from frontend/
  pass: zero diagnostic lines mention a path in this window's authorized_write_scope
  fail: any diagnostic line mentioning frontend/test/uphunt-aesthetic-coverage.test.ts (the UA-W1 owned-path needle)
  repo_wide_exit_0: NOT required
parked_files: [test/keyword-intelligence-api.test.ts, test/keyword-intelligence-components.test.ts, test/keyword-intelligence-inventory.test.ts, test/landing-keyword-auth-flow.test.ts, test/my-runs-research-resume.test.ts]
parked_rule: SRC-UA-0092 diagnostics stay; UA-W1..UA-W15 MUST NOT edit those five files (A5 prohibited_actions edit_parked_SRC-UA-0092_test_files)
reassessment: UA-W1-I002
gate_citation_rule: I001 results for G1 and G5–G9 may be cited iff frontend/test/uphunt-aesthetic-coverage.test.ts digest is still f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1
invalidated_evidence: EV-UA1-I-001 G2 row (superseded, retained as history)
unchanged_gates: [G1, G5, G6, G7, G8, G9, G3-skip-reason, G4-skip-reason]
```

`UA-W1-I002` (window-agent executed, authorized_write_file: NONE for implementation) gate
set: re-pinned G2 + verification that the needle digest is unchanged (then I001 citations
hold for G1/G5–G9) + forbidden-path delta re-check (G6) + successor negative search (G9).
PASS → A4 `UA-W1-V2` and `UA-W1-H5` may be checked, handoff written, `A5` →
`AWAITING_REVIEW`. FAIL on the needle → `CORRECTION_REQUIRED` (new `UA-W1-C00n` on the
owned file only). Anything else → `PARENT_BLOCKED`.
