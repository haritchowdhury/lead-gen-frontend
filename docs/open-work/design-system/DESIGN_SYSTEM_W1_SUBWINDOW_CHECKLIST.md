# W1 frozen sub-window decomposition checklist

**Status:** AWAITING_PARENT_DECOMPOSITION_REVIEW  
**Parent window:** G-R1 — Real-component deterministic browser harness  
**Parent assignment ID:** ASG-W1  
**Window agent:** design-system-window-agent  
**Parent checklist:** `frontend/docs/open-work/DESIGN_SYSTEM_EXECUTION_CHECKLIST.md` (revision `5b1982d478ac9bc9185005cf08911ec18b9343842a58c4ffe0c2fa30d54172d0`)  
**Active state (`S2`):** `frontend/docs/open-work/design-system/DESIGN_SYSTEM_W1_SUBWINDOW_STATE.yaml`  
**Evidence (`S3`):** `frontend/docs/open-work/design-system/DESIGN_SYSTEM_W1_SUBWINDOW_EVIDENCE.md`

## Inherited authority and revision pins

| Artifact | Path | Revision (sha256) |
|---|---|---|
| Parent standard | `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` | `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` |
| Sub-window standard | `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` | `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` |
| Parent checklist / contract | `frontend/docs/open-work/DESIGN_SYSTEM_EXECUTION_CHECKLIST.md` | `5b1982d478ac9bc9185005cf08911ec18b9343842a58c4ffe0c2fa30d54172d0` |

## Parent scope and exclusions (copied without expansion)

**Objective:** Replace injected-DOM browser replicas with a deterministic fixture surface that mounts production React components and real event handlers; produce machine-readable evidence for every behavior named in G-R1 without changing production presentation, auth, API, polling, or navigation.

**Writable scope (implementation):** five files in Section 4 file registry only.

**Non-goals:** no `proxy.ts`, Neon Auth, backend, CSS, component redesign, G-R2 responsive fix, G-R3 consolidation, G-R4 ledger, or successor window work.

**Execution environment policy (inherited E8.1):** sandbox escalation permitted for localhost Next.js dev, headless Chrome, and production build when loopback bind is denied; one identical recovery per proven environment invalidation; no external/provider/destructive actions.

## Starting working-tree inventory

**Unrelated owner-controlled dirty files (preserve, do not edit):**

- `docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml`
- `docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md`

**starting_repository_change_set_digest:** `e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450`

**Read-only dependencies:** `frontend/proxy.ts`, `frontend/test/fixtures.ts`, `frontend/components/run-workspace.tsx`, `frontend/AGENTS.md`, installed Next.js guides named by parent G-R1, existing G1/G6–G12 handoffs, `/usr/bin/google-chrome`.

## File registry and dependency DAG

```yaml
file_id: F-001
path: frontend/lib/design-fixture-gate.ts
operation: MODIFY
current_digest: 1266bc3d319c53ec33d8185ad0bc98c0db59826872161e5fb117ea248d81d23c
parent_requirement_ids: [GR1-T-gate, GR1-ACC-fixture-security]
parent_task_ids: [G-R1-ordered-5]
depends_on_files: []
produced_interfaces: [designFixtureEnabled]
coverage_case_ids: [CASE-GR1-001, CASE-GR1-002, NC-GR1-001]

file_id: F-002
path: frontend/app/design-fixture/page.tsx
operation: MODIFY
current_digest: 510d3248b311899df7a361ad14da98fbe84ef87a07ab49c27249ed60154dd567
parent_requirement_ids: [GR1-T-fixture-surface, GR1-ACC-real-components]
parent_task_ids: [G-R1-ordered-1, G-R1-ordered-2]
depends_on_files: [F-001]
consumed_interfaces: [designFixtureEnabled]
produced_interfaces: [DesignSystemFixturePage, SCENARIOS, runIdPattern]
coverage_case_ids: [CASE-GR1-003, CASE-GR1-004]

file_id: F-003
path: frontend/scripts/g-r1-real-component-browser.mjs
operation: MODIFY
current_digest: 0cb638c1d4a9932ccaff40609e647f59022b66762af566b5440d0f2f24712b93
parent_requirement_ids: [GR1-T-coverage, GR1-T-assertions, GR1-T-matrix, GR1-ADV-all]
parent_task_ids: [G-R1-ordered-3, G-R1-ordered-4, G-R1-ordered-6]
depends_on_files: [F-002]
consumed_interfaces: [DesignSystemFixturePage, runIdPattern]
produced_interfaces: [harnessCommand, browserChecksJson, artifactIndex]
coverage_case_ids: [CASE-GR1-005, CASE-GR1-006, CASE-GR1-007, CASE-GR1-008, CASE-GR1-009, CASE-GR1-010, CASE-GR1-011, CASE-GR1-012, CASE-GR1-013, CASE-GR1-014, CASE-GR1-015, CASE-GR1-016, CASE-GR1-017, CASE-GR1-018, CASE-GR1-019, CASE-GR1-020, CASE-GR1-021, CASE-GR1-022, CASE-GR1-023, CASE-GR1-024, CASE-GR1-025, CASE-GR1-026, CASE-GR1-027, NC-GR1-002]

file_id: F-004
path: frontend/package.json
operation: MODIFY
current_digest: 65abf84236945fd89f973b5efc39031d3f9fb1a81d0608dd3647f50546b50d0d
parent_requirement_ids: [GR1-T-matrix]
parent_task_ids: [G-R1-ordered-6]
depends_on_files: [F-003]
consumed_interfaces: [harnessCommand]
produced_interfaces: [npmScriptTestBrowserRealComponents]
coverage_case_ids: []

file_id: F-005
path: frontend/test/design-system-real-component-harness.test.ts
operation: MODIFY
current_digest: 8e439406f7f6a4226159b5bca39a5c28e86fea4be958d8da7a3b56db9b09914f
parent_requirement_ids: [GR1-T-gate, GR1-T-no-replica]
parent_task_ids: [G-R1-ordered-5]
depends_on_files: [F-001, F-002, F-003]
consumed_interfaces: [designFixtureEnabled, DesignSystemFixturePage, harnessCommand]
coverage_case_ids: [CASE-GR1-001, CASE-GR1-002, CASE-GR1-003, CASE-GR1-004, CASE-GR1-005, CASE-GR1-006]

planned_file_set_digest: 89f14a07a1698a4d4c57f390b9fd64c67b3d1df89602b1014d72661090b7ff6a
required_case_set_digest: 180244d4d06afff8fee2d0ec31e2e6e2fb00b846e0ad23f6f5d957c182c7d45b
required_case_count: 29
```

**Mechanical closure:** required changed-file set = {F-001..F-005} = initial sub-window writable set. Graph is acyclic: S001 → S002 → S003 → S004 → S005 → I001.

## Frozen cross-file interface (Section 6.2)

```typescript
// F-001 export — byte-stable contract for successors
export function designFixtureEnabled(
  environment?: Partial<Pick<NodeJS.ProcessEnv, "NODE_ENV" | "STORESIGNAL_DESIGN_FIXTURES">>
): boolean;
// true iff (NODE_ENV === "development" || NODE_ENV === "test") && STORESIGNAL_DESIGN_FIXTURES === "1"
// false for production, missing/invalid flag, or any other NODE_ENV
```

```typescript
// F-002 route contract
// Path: /design-fixture
// Gate: if (!designFixtureEnabled()) notFound();
// SCENARIOS: Set<"query-review"|"query-planning"|"runtime"|"completed"|"failed">
// Default scenario: "completed"
// runId: `run_fixture_${scenario.replaceAll("-", "_")}`
// Root marker: data-design-fixture-surface="production-components"
// Component: <RunWorkspace runId={...} /> — no props beyond runId
```

```javascript
// F-003 harness contract
// Entry: node scripts/g-r1-real-component-browser.mjs from frontend/
// Dev server: next dev --hostname 127.0.0.1 --port 4341 env STORESIGNAL_DESIGN_FIXTURES=1
// Injection: Page.addScriptToEvaluateOnNewDocument(fixtureInjection) before fixture navigations
// Fixture path prefix: /design-fixture?scenario=
// Output dir: review-evidence/design-system/G-R1/
// Must write: browser-checks.json, artifact-index.json, browser-server.log, PNG captures
// Must throw if checks.assertions contains any false value
// Prohibited substrings in source: document.body.innerHTML, .outerHTML =, insertAdjacentHTML, addEventListener('click'
```

```json
// F-004 scripts entry (exact)
"test:browser:real-components": "node scripts/g-r1-real-component-browser.mjs"
```

## Intermediate-state contracts

| After | Permitted local checks | Expected pending / failing | Resolver |
|---|---|---|---|
| S001 | import gate unit logic via S005 later | fixture route 404 without flag | S002 |
| S002 | `next dev` manual / build route compile | harness not runnable until S003 | S003 |
| S003 | `node --check scripts/g-r1-real-component-browser.mjs` | browser matrix, integration gates | S004–S005 then I001 |
| S004 | `npm run test:browser:real-components --dry-run` N/A; script path exists | full browser run deferred | I001 |
| S005 | `node --experimental-strip-types --test test/design-system-real-component-harness.test.ts` | browser artifacts absent until I001 | I001 |

## Coverage-case registry

| ID | Parent trace | Owner | Assertion locus |
|---|---|---|---|
| CASE-GR1-001 | V10 gate / G-R1 ordered-5 | S001,S005 | designFixtureEnabled production → false |
| CASE-GR1-002 | G-R1 ordered-5 | S001,S005 | flag absent/0 → false; dev+1 → true |
| CASE-GR1-003 | G-R1 ordered-1 | S002,S005 | RunWorkspace import + mount |
| CASE-GR1-004 | G-R1 non-goals | S002,S005 | proxy matcher `/runs/:path*` only |
| CASE-GR1-005 | G-R1 ordered-6 | S003,S005 | harness uses design-fixture + injection |
| CASE-GR1-006 | G-R1 ordered-4 | S003,S005 | no innerHTML / replacement click listeners |
| CASE-GR1-007 | G-R1 ordered-3 | S003 | query edit, PUT save, POST start, revision 4 |
| CASE-GR1-008 | G-R1 ordered-3 | S003 | query-planning progress-card-query |
| CASE-GR1-009 | G-R1 ordered-3 | S003 | runtime pipeline progress |
| CASE-GR1-010 | G-R1 ordered-3 | S003 | reconnect warning then recovery |
| CASE-GR1-011 | G-R1 ordered-3 | S003 | terminal failed error-banner |
| CASE-GR1-012 | G-R1 ordered-3 | S003 | completed captures 390/768/1024/1280/1440 |
| CASE-GR1-013 | G-R1 ordered-3 | S003 | filter URL, sort URL, debounced search, pagination |
| CASE-GR1-014 | G-R1 ordered-3 | S003 | CSV success + synthetic 503 error |
| CASE-GR1-015 | G-R1 ordered-3 | S003 | expand, replace row, expansion IDs |
| CASE-GR1-016 | G-R1 ordered-3 | S003 | outcome, contacts, store-fit, vocabulary, occurrences counts |
| CASE-GR1-017 | G-R1 ADV traffic | S003 | partial/missing/unavailable/no-coverage visible |
| CASE-GR1-018 | G-R1 ordered-3 | S003 | aggregate market select + worldwide reset |
| CASE-GR1-019 | G-R1 ADV globe | S003 | text, pointer, keyboard, drag suppression, individual reset |
| CASE-GR1-020 | G-R1 ADV | S003 | unsupportedControls === 0 |
| CASE-GR1-021 | G-R1 ADV resolved | S003 | resolved href exact domain, rel, target |
| CASE-GR1-022 | G-R1 ordered-4 | S003 | polling intervals 2500–3500ms |
| CASE-GR1-023 | G-R1 ordered-4 | S003 | checks.assertions all true or throw |
| CASE-GR1-024 | G-R1 ADV rapid filter | S003 | qualified filter clears expansion |
| CASE-GR1-025 | V10 focus | S003 | focusOrder 18 steps recorded |
| CASE-GR1-026 | V9 baseline | S003 | widths rectangles + bodyOverflow flags |
| CASE-GR1-027 | G-R1 ordered-6 | S003 | public landing real route captures |
| NC-GR1-001 | fixture security | S003 | throw if fixtureFlagClientVisible |
| NC-GR1-002 | auth boundary | S003 | /runs/run_fixture_completed → 307 sign-in |

---

## W1-S001 — fail-closed fixture gate

```yaml
subwindow_id: W1-S001
type: FILE
parent_window_id: W1
parent_assignment_id: ASG-W1
assigned_agent: UNASSIGNED
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/lib/design-fixture-gate.ts
file_operation: MODIFY
starting_file_digest: 1266bc3d319c53ec33d8185ad0bc98c0db59826872161e5fb117ea248d81d23c
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope: [frontend/docs/open-work/DESIGN_SYSTEM_EXECUTION_CHECKLIST.md#G-R1]
authorized_actions: []
prohibited_actions: [edit_any_other_file, change_proxy_or_auth, start_S002]
may_start_successor: false
```

**Mechanical trace:** GR1-T-gate; G-R1 ordered-5; CASE-GR1-001, CASE-GR1-002; invariants V1, V10.

**Exact transformation:**

1. Preserve file as single exported function `designFixtureEnabled`.
2. Default parameter `environment = process.env`.
3. Return expression exactly: `(environment.NODE_ENV === "development" || environment.NODE_ENV === "test") && environment.STORESIGNAL_DESIGN_FIXTURES === "1"`.
4. No client export, no `NEXT_PUBLIC_` references, no side effects.

**Preserved:** entire current file if already matching (no edit required when digest unchanged after review).

**Forbidden:** additional exports, async, logging, env mutation.

**Exposed interface:** `designFixtureEnabled` per frozen contract.

**LOCAL_NOW checks:**

| ID | Command | Expected |
|---|---|---|
| V-S001-1 | `cd frontend && node --experimental-strip-types --test test/design-system-real-component-harness.test.ts -t "fail-closed"` | exit 0; CASE-GR1-001/002 pass |
| V-S001-2 | `git -C frontend diff --name-only` after execution | only `lib/design-fixture-gate.ts` or empty if no edit needed |

**DEFERRED_TO_INTEGRATION:** production-build `/design-fixture` HTTP 404 (I001).

**Completion checklist:**

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match.
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline.
- [ ] T1 Apply every ordered transformation and no other edit to the writable file.
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions.
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file.
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips.
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations.
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred.
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW.

---

## W1-S002 — production fixture route

```yaml
subwindow_id: W1-S002
type: FILE
parent_window_id: W1
parent_assignment_id: ASG-W1
assigned_agent: UNASSIGNED
predecessors: [W1-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/design-fixture/page.tsx
file_operation: MODIFY
starting_file_digest: 510d3248b311899df7a361ad14da98fbe84ef87a07ab49c27249ed60154dd567
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope: [frontend/lib/design-fixture-gate.ts, frontend/components/run-workspace.tsx]
authorized_actions: []
prohibited_actions: [edit_proxy, edit_run_workspace_logic, start_S003]
may_start_successor: false
```

**Mechanical trace:** GR1-T-fixture-surface; G-R1 ordered-1/2; CASE-GR1-003/004.

**Exact transformation:**

1. Server component default export `DesignSystemFixturePage`.
2. Import `notFound`, `RunWorkspace`, `designFixtureEnabled`.
3. `SCENARIOS` Set with exactly five strings: query-review, query-planning, runtime, completed, failed.
4. Parse `searchParams.scenario`; default `completed` when missing/invalid.
5. Early `if (!designFixtureEnabled()) notFound();`.
6. Render wrapper `div` with `data-design-fixture-surface="production-components"` and `data-fixture-scenario={scenario}`.
7. `<RunWorkspace runId={\`run_fixture_${scenario.replaceAll("-", "_")}\`} />`.

**Forbidden:** client directive, fetch overrides, auth bypass, additional scenarios, styling changes.

**LOCAL_NOW checks:**

| ID | Command | Expected |
|---|---|---|
| V-S002-1 | `node --experimental-strip-types --test test/design-system-real-component-harness.test.ts -t "fixture route"` | CASE-GR1-003/004 pass |
| V-S002-2 | `git -C frontend diff --name-only` | only `app/design-fixture/page.tsx` |

**DEFERRED_TO_INTEGRATION:** route reachable under dev+flag (I001).

---

## W1-S003 — real-component browser harness

```yaml
subwindow_id: W1-S003
type: FILE
parent_window_id: W1
parent_assignment_id: ASG-W1
assigned_agent: UNASSIGNED
predecessors: [W1-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/scripts/g-r1-real-component-browser.mjs
file_operation: MODIFY
starting_file_digest: 0cb638c1d4a9932ccaff40609e647f59022b66762af566b5440d0f2f24712b93
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope: [frontend/test/fixtures.ts, frontend/app/design-fixture/page.tsx, frontend/components/**/*.tsx read-only]
authorized_actions: [spawn_next_dev_localhost, spawn_headless_chrome, write_review_evidence_under_G-R1_via_this_script_only]
prohibited_actions: [innerHTML_replica, replacement_click_listeners, edit_components, edit_proxy, start_S004]
may_start_successor: false
```

**Mechanical trace:** G-R1 ordered-3/4/6; all CASE-GR1-005 through CASE-GR1-027; NC-GR1-001/002; adversarial section verbatim.

**Exact transformation (ordered):**

1. Import synthetic data from `../test/fixtures.ts` (`denseLead`, `lead`, `querySet`, `resultPage`, `runStatus`, `trafficEnrichment`).
2. Constants: `port=4341`, `fixturePath="/design-fixture"`, `outputDir=review-evidence/design-system/G-R1`, viewports `[[390,844],[768,1024],[1024,768],[1280,800],[1440,900]]`.
3. Build inline fixture leads: dense (default), partial (rejected, partial traffic), missing (failed, no traffic), unavailable (no coverage/unavailable states).
4. `fixtureInjection(payloads)` pre-hydration fetch mock for `/api/runs/*` paths covering: queries GET/PUT, start POST, results GET (pagination, status filter, export pageSize 200), scenario-specific status payloads, runtime sequence with one thrown fetch on call 2, CSV 503 when `exportFailure`.
5. Spawn Next dev with `STORESIGNAL_DESIGN_FIXTURES=1`; verify protected `/runs/run_fixture_completed` → 307 `/sign-in`.
6. Chrome CDP: inject script on new document; capture public landing at all widths.
7. Scenarios via query param: query-review (edit/save/start), query-planning, runtime (warning/recovery), failed, completed.
8. Completed flow: aggregate globe select/reset; expand dense lead; open all disclosures; capture all widths; row replacement; traffic variant rows; rapid filter clearing expansion; sort/search/pagination URL assertions; CSV success/failure; individual globe text/pointer/keyboard/drag/reset; focus order 18 tabs.
9. Populate `checks.assertions` object with named booleans listed in CASE-GR1-007 through CASE-GR1-024; throw listing failed names when any false.
10. Write `browser-checks.json`, `artifact-index.json`, `browser-server.log`; cleanup temp Chrome profile and dev server.

**Preserved:** G-R2 baseline width measurements (do not hide overflow defect).

**Forbidden:** `document.body.innerHTML`, `addEventListener('click'`, editing production components.

**LOCAL_NOW checks:**

| ID | Command | Expected |
|---|---|---|
| V-S003-1 | `node --check frontend/scripts/g-r1-real-component-browser.mjs` | exit 0 |
| V-S003-2 | `npm run test:browser:real-components` (escalate if loopback denied) | exit 0; all assertions true; NC-GR1-001/002 satisfied |
| V-S003-3 | `git -C frontend diff --name-only` excluding `review-evidence/design-system/G-R1/*` | only harness file |

**Note:** evidence PNG/JSON under `review-evidence/design-system/G-R1/` are script output, not separate writable files for a leaf agent.

---

## W1-S004 — npm script registration

```yaml
subwindow_id: W1-S004
type: FILE
parent_window_id: W1
parent_assignment_id: ASG-W1
assigned_agent: UNASSIGNED
predecessors: [W1-S003]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/package.json
file_operation: MODIFY
starting_file_digest: 65abf84236945fd89f973b5efc39031d3f9fb1a81d0608dd3647f50546b50d0d
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope: [frontend/scripts/g-r1-real-component-browser.mjs]
authorized_actions: []
prohibited_actions: [change_dependencies, edit_other_scripts, start_S005]
may_start_successor: false
```

**Exact transformation:**

1. Under `scripts`, set exactly: `"test:browser:real-components": "node scripts/g-r1-real-component-browser.mjs"`.
2. No other key changes.

**LOCAL_NOW checks:**

| ID | Command | Expected |
|---|---|---|
| V-S004-1 | `node -e "import p from './frontend/package.json' with {type:'json'}; if(p.scripts['test:browser:real-components']!=='node scripts/g-r1-real-component-browser.mjs') process.exit(1)"` | exit 0 |
| V-S004-2 | `git -C frontend diff --name-only` | only `package.json` |

---

## W1-S005 — source contract tests

```yaml
subwindow_id: W1-S005
type: FILE
parent_window_id: W1
parent_assignment_id: ASG-W1
assigned_agent: UNASSIGNED
predecessors: [W1-S003]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/design-system-real-component-harness.test.ts
file_operation: MODIFY
starting_file_digest: 8e439406f7f6a4226159b5bca39a5c28e86fea4be958d8da7a3b56db9b09914f
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope: [frontend/lib/design-fixture-gate.ts, frontend/app/design-fixture/page.tsx, frontend/scripts/g-r1-real-component-browser.mjs, frontend/proxy.ts]
authorized_actions: []
prohibited_actions: [weaken_assertions, start_I001]
may_start_successor: false
```

**Exact transformation:** three tests:

1. `designFixtureEnabled` falsy for production+flag, dev without flag, test+0, undefined NODE_ENV; true for dev+1.
2. Fixture route source contains RunWorkspace import/mount, `notFound()` gate; proxy matcher `/runs/:path*` only, no fixture flag in proxy.
3. Harness source contains `design-fixture`, `Page.addScriptToEvaluateOnNewDocument`, assertion field names (`aggregateSelectedMarket`, `selectedByPointer`, `trafficVariants`, `everyIntervalWithinBound`, `rapidFilterStart`, `failedAssertions`); excludes innerHTML/replacement click patterns.

**LOCAL_NOW checks:**

| ID | Command | Expected |
|---|---|---|
| V-S005-1 | `cd frontend && node --experimental-strip-types --test test/design-system-real-component-harness.test.ts` | 3/3 pass |
| V-S005-2 | `git -C frontend diff --name-only` | only harness test file |

---

## W1-I001 — whole-window integration assessment

```yaml
subwindow_id: W1-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: W1
assigned_agent: WINDOW-AGENT
authorized_write_file: NONE
authorized_write_coordination: [frontend/docs/open-work/design-system/DESIGN_SYSTEM_W1_SUBWINDOW_STATE.yaml, frontend/docs/open-work/design-system/DESIGN_SYSTEM_W1_SUBWINDOW_EVIDENCE.md, frontend/review-evidence/design-system/G-R1_HANDOFF.md]
predecessors: [W1-S001, W1-S002, W1-S003, W1-S004, W1-S005]
expected_changed_file_set_digest: 89f14a07a1698a4d4c57f390b9fd64c67b3d1df89602b1014d72661090b7ff6a
```

**Frozen whole-window gates (from parent G-R1 + Section 6 standard commands):**

| Gate | Command | Assertions |
|---|---|---|
| G-INT-01 | `cd frontend && npm run lint` | exit 0 |
| G-INT-02 | `cd frontend && npm test` | exit 0; includes design-system suite |
| G-INT-03 | `cd frontend && npx tsc --noEmit` | exit 0 |
| G-INT-04 | `cd frontend && npm run build` | exit 0; escalate once if Turbopack bind EPERM only |
| G-INT-05 | `cd frontend && git diff --check` | exit 0 |
| G-INT-06 | `cd frontend && npm run test:browser:real-components` | exit 0; 29/29 coverage cases; artifact-index present |
| G-INT-07 | Production fail-closed probe | `NODE_ENV=production` server: `/design-fixture` → 404 with flag set |
| G-INT-08 | Focused regression bundle | 12 design-system test files listed in G-R1 handoff → all pass |
| G-INT-09 | Negative | harness must fail if `checks.assertions.realComponentSurfaceAtEveryCompletedViewport` forced false (diagnostic only, not committed) |
| G-INT-10 | Unrelated dirty preservation | uphunt-aesthetic dirty files still present, unmodified |

**PASS oracle:** all gates pass; `browser-checks.json` shows `fixtureSurface: "production-components"` on completed captures; no production behavior diff outside five-file set; handoff written; `S2.current_status: COMPLETE`; `may_start_successor: false`; G-R2 not started.

**CORRECTION_REQUIRED oracle:** any gate failure diagnosable within G-R1 scope → append W1-C00n single-file corrective sub-window per Section 10.

**PARENT_BLOCKED oracle:** requires proxy/auth/component redesign, or fixture gate cannot be made fail-closed without excluded edits.

**Integration checklist:**

- [ ] I1 Verify all listed file sub-windows were independently accepted.
- [ ] I2 Verify actual assembled changed files equal the planned file set and the planned set is contained by parent-authorized scope.
- [ ] I3 Verify complete requirement and decision traceability to current source and assertions.
- [ ] I4 Execute all frozen applicable whole-window gates with activation witnesses.
- [ ] I5 Verify required = registered = executed coverage-case sets, matching digests, and zero skips/duplicates/unexpected IDs.
- [ ] I6 Execute required negative controls and verify acceptance fails under each prescribed defect.
- [ ] I7 Verify substitute fidelity and accepted-test/fixture integrity.
- [ ] I8 Verify no prohibited, successor, external, destructive, secret-bearing, or out-of-scope action occurred.
- [ ] I9 Independently inspect current source and complete diff; do not rely on leaf summaries.
- [ ] I10 Record PASS, CORRECTION_REQUIRED, or PARENT_BLOCKED with decisive evidence.

---

## Correction and reassessment rules

1. Append-only corrective IDs `W1-C001+`; never rewrite completed sub-window blocks.
2. One corrective sub-window owns exactly one file; cite failed gate and governing parent requirement.
3. Invalidated evidence: any gate whose inputs include a corrected file must rerun.
4. After last corrective acceptance, new integration assessment `W1-I002+` required.
5. Escalate to parent if fix requires G-R2 layout, auth/proxy change, or component behavior change.

---

## Mandatory decomposition-readiness checklist (Section 11)

### 11.1 Authority and inheritance

- [x] SW-A01 Parent assignment W1/G-R1 and delegation authorized. Evidence: EV-DEC-001
- [x] SW-A02 Revisions pinned and verified. Evidence: EV-DEC-001
- [x] SW-A03 Parent boundaries copied without expansion. Evidence: S1 parent scope section
- [x] SW-A04 Dirty state inventoried. Evidence: EV-DEC-001
- [x] SW-A05 S1/S2/S3 exist with non-overlapping authority. Evidence: this package
- [x] SW-A06 Adjacent communication enforced. Evidence: S1 roles
- [x] SW-A07 Sandbox escalation policy inherited. Evidence: S1 execution environment

### 11.2 Decision and file-set closure

- [x] SW-D01 Requirements allocated to files/assertions. Evidence: trace tables
- [x] SW-D02 No missing parent decisions. Evidence: EV-DEC-001
- [x] SW-D03 Required changed-file set equals planned set. Evidence: file registry
- [x] SW-D04 One owner per file; one file per leaf. Evidence: W1-S001..S005
- [x] SW-D05 Digests, anchors, interfaces exact. Evidence: file registry + interface freeze
- [x] SW-D06 Acyclic DAG with named outputs. Evidence: dependency table
- [x] SW-D07 Interfaces frozen before dependents. Evidence: Section 6.2
- [x] SW-D08 Intermediate states documented. Evidence: intermediate-state table
- [x] SW-D09 Production vs test files separated. Evidence: S003 vs S005
- [x] SW-D10 No multi-output generator in leaves. Evidence: SW-D04

### 11.3 Sub-window execution completeness

- [x] SW-E01 Section 7 fields present per leaf. Evidence: W1-S001..S005 blocks
- [x] SW-E02 Exact ordered edits, no design verbs. Evidence: transformation lists
- [x] SW-E03 Local checks with assertions. Evidence: V-S00n tables
- [x] SW-E04 One-file write proof prescribed. Evidence: V-S00n-2 rows
- [x] SW-E05 Handoff/stop rules per leaf. Evidence: completion checklists
- [x] SW-E06 Subagents report to window agent only. Evidence: S1 roles
- [x] SW-E07 No leaf requires successor work for local acceptance. Evidence: DEFERRED_TO_INTEGRATION rows
- [x] SW-E08 Deferred checks owned by W1-I001. Evidence: integration gates

### 11.4 Enforcement and integration closure

- [x] SW-V01 Coverage allocated. Evidence: coverage registry
- [x] SW-V02 Case-set digests prescribed. Evidence: file registry header
- [x] SW-V03 Negative controls assigned. Evidence: NC-GR1-001/002
- [x] SW-V04 Source-test fidelity to harness. Evidence: W1-S005
- [x] SW-V05 I001 fully authored; no impl writes. Evidence: W1-I001
- [x] SW-V06 Costly gates at I001 only. Evidence: G-INT-04/06/07
- [x] SW-V07 Correction loop complete. Evidence: correction rules
- [x] SW-V08 Window agent executes I001 personally. Evidence: W1-I001 assigned_agent
- [x] SW-V09 No summary-only acceptance. Evidence: I001 checklist
- [x] SW-V10 Handoff boundary exact. Evidence: I001 PASS oracle
- [x] SW-V11 Sandbox recovery policy copied. Evidence: S1 execution environment

### 11.5 Mechanical and adversarial audit

- [x] SW-R01 IDs unique and resolving. Evidence: manual lint
- [x] SW-R02 No assignable placeholders. Evidence: manual lint
- [x] SW-R03 Single-file write lint satisfied. Evidence: five distinct paths
- [x] SW-R04 Removing any mapped file breaks readiness. Evidence: file registry
- [x] SW-R05 Coverage set complete (29 cases). Evidence: registry
- [x] SW-R06 Oracle weakening prohibited. Evidence: correction rule 4
- [x] SW-R07 Second-file edit rejected by V-S00n-2. Evidence: leaf checks
- [x] SW-R08 Window agent cannot repair without W1-C00n. Evidence: standard Section 8
- [x] SW-R09 Parent decomposition review required before S001 assignment. Evidence: S2 status
- [x] SW-R10 Document lint zero conflicts. Evidence: this checklist
- [x] SW-R11 Sandbox recovery distinguished from failure. Evidence: I001 + policy

---

## Append-only corrective sub-windows

*(None authored at decomposition time. Append W1-C001+ only after a failed W1-I00n gate with diagnosed single-file root cause.)*
