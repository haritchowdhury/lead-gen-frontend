# UA-W12 Sub-window evidence (`S3`)

Append-only evidence for the decomposition, execution, review, correction, and
whole-window assessment of parent window `UA-W12` (assignment `ASG-UA-W12-01`).
Subordinate to the parent package (`A1`–`A8`). Live status lives only in `S2`;
execution evidence lives only here. Sub-window standard:
`PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` revision
`842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0`.

The window agent is `UA-W12-WINDOW-AGENT`. This log records the decomposition
phase only. No FILE leaf has been executed; `UA-W12-S001` is not executed here.
`A5_ACTIVE_EXECUTION_STATE.yaml` remains byte-identical
(`6ccc1ce226145c7e016e0bddb97fe4a7f76a42feabc0d323f59fb302b032a229`,
state_version 27).

```yaml
evidence_id: EV-UA-W12-D-001
timestamp: 2026-09-04T09:00:00+05:30
phase: decomposition
actor: UA-W12-WINDOW-AGENT
role: window agent
claim: Decomposition entry gate. Parent assignment is current and names this identity; delegation to lower-level agents is authorized only as the parent-frozen single-identity execution (DEC-UA-015). Standards and parent-artifact revisions match. Write/read/action/prohibition/successor/stop scopes are known. Every implementation-affecting decision is present (DEC-UA-003, DEC-UA-005 item 1, DEC-UA-015, DEC-UA-016). Dirty worktree inventoried without modification.
environment: local workspace /home/harit/Email Scrapper
revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  parent_checklist: 1edc1bc7a9d7f46a62a4f88ec74e5e468e1c1d17395b9b1aa0b810ce308e8aab
operation: sha256sum A5/A1/A3/A4 and the sub-window standard; sha256sum of the in-scope/zero-edit source files; `git status --short` from frontend/ and the coordination root; `ls`/stat of test/uphunt-aesthetic-w12.test.ts and test/.ua-executed.json; read research-dashboard.tsx, selection-review.tsx, w6.test.ts, page.tsx, chart-panels.tsx, keyword-dashboard.module.css
observed_result: |
  A5 state_version 27 digest 6ccc1ce2… MATCH; A1 57fa49c7… MATCH; A3 094bc8bf… MATCH; A4 1edc1bc7… MATCH; subwindow standard 842c2955… MATCH; parent standard cda35201… MATCH.
  source pin digests MATCH parent freeze: research-dashboard 806eaf59032d99b81e621cd77bfedd0e3dd9f1483ecd2df40d80d5ac4427fee9; selection-review 5550dffa70db24bc923c2ba405cefaa568e29a7bbb281bac261429cf049a3ae2; keywords/[researchId]/page a46b89bcb02af1092c4f265072e719fb9ce401fd7a30588147b75835663acb18; chart-panels 5bf17d06389a9163080f080dffa2257e83ae9db017bdfff1cd90b32d317db8ac; keyword-dashboard.module.css d416ece7de0407e81c95e415841b29759e95f765cfcccaadd2ed3c49fe51d460; globals 4cf7a1fccba5f3b455b8c1a63e3d2aff4dc8a4f6a9dedd5731b3ea754aa87d95; w11 40e3178898e7216d05c67f9fb14a3fd184791c7b9a9788298eb8f9838eed5c50; w6 f78b8da2fad5084777ec727d25ad21d4d81a08994eaa5c406643821d8deaec1a; w12 test ABSENT; section-intro 159096f313aa6c8d1be343f1db72511529fb4795c79be3123da3c3c3a0c38175.
  frontend porcelain = ` M …/A5_ACTIVE_EXECUTION_STATE.yaml`, ` M …/A6_EVIDENCE_LOG.md`; coordination root origin clean. test/.ua-executed.json TRACKED, digest 7f4bd402…, 31 IDs, sorted; not committed during decomposition.
  no existing test under test/ references research-dashboard.tsx or selection-review.tsx (rg -l via glob) -> intermediate-state safety.
decisive_assertion: Entry gate PASSES. The parent window is complete enough to decompose; no missing parent-level decision; no unrelated owner-controlled change will be overwritten; no required action exceeds parent authority. No speculative leaf work was created.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: A5; A1; A3; A4; the three subordinate path state captured
negative_control: not applicable (no executable change made)
coverage_counts:
  required: 43
  registered: 31
  planned: 43
  executed: 31
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: decomposition phase; no FILE leaf execution; A5/A6 untouched
external_mutations: none
```

```yaml
evidence_id: EV-UA-W12-D-002
timestamp: 2026-09-04T09:02:00+05:30
phase: decomposition
actor: UA-W12-WINDOW-AGENT
role: window agent
claim: Set-digest closure. Three-file planned changed-file set, window-local 2-ID case set, isolated 4-ID set, and post-G1 33-ID set all equal the parent-frozen values under the sub-window standard E6 formula.
environment: local workspace
revisions: same pins as EV-UA-W12-D-001
operation: compute lowercase SHA-256 over (sorted distinct UTF-8 members, each followed by LF) for: the 3 implementation path set; the 2-ID CASE-UA-W12 set; the 4-ID {W1-001,W1-002,W12-001,W12-002} set; and the canonical 33-ID {2×W1,4×W2,4×W3,2×W4,2×W5,3×W6,2×W7,3×W8,4×W9,3×W10,2×W11,2×W12} set
observed_result: |
  planned-file-set 49cff36ab4e7adc0439d7e6436d3a974b70cbf2998f303eacd778f116e39bd92 MATCH;
  window-local 2-ID 2956f82027ffb1acad77613eb23af4f22df96ba168e29de77cede5242685efd8 MATCH;
  isolated 4-ID 8bc38aad6abdde959247deb61e19e8d99fa0887879d65ea5daf15cfad1677f2f MATCH;
  33-ID cf0e61acc57d90a55d9738018f214a574b97a72a26bcbce9e81c2792751935e4 MATCH (count 33);
  protected pre-existing changed-set {A5,A6} be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a.
decisive_assertion: planned initial file set == required changed-file set (3 files); every planned file has one initial owner; no duplicate owner; case-set equality/disjointness proven for the frozen rows.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §3/§4/§5/§6/§7.2
negative_control: none required for set-digest closure (pure computation)
coverage_counts:
  required: 43
  registered: 31
  planned: 43
  executed: 31
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: digests only; no file mutation
external_mutations: none
```

```yaml
evidence_id: EV-UA-W12-D-003
timestamp: 2026-09-04T09:03:00+05:30
phase: decomposition
actor: UA-W12-WINDOW-AGENT
role: window agent
claim: S002 transformation byte-verification. Adding `data-surface="surface:selection-review-panel"` on its own line between `aria-label="Selection review"` and the closing `>` reproduces the parent-frozen ending digest and numstat.
environment: local workspace (read-only reconstruction in /tmp; no workspace file mutated)
operation: apply the single-hunk addition to a /tmp copy of selection-review.tsx; sha256sum; `git diff --no-index --numstat`
observed_result: |
  ending digest 87b7232ba7cbe77a2378107ab63cffc2ff7d89007d8f108d44e9e1048fc99807 MATCH;
  numstat `1 0` MATCH; anchor `aria-label="Selection review"` count 1; h2 string and handlers unchanged.
decisive_assertion: S002 is decision-complete; the frozen ending digest and numstat are reproducible and are pinned as the S002 completion oracle.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §5 UA-W12-S002
negative_control: moving the attribute onto the same line would produce a different numstat, so the new-line form is the correct frozen form
coverage_counts: not applicable (S002 owns no coverage case)
limitations: this is a decomposition verification of the frozen bytes, not execution
external_mutations: none
```

```yaml
evidence_id: EV-UA-W12-D-004
timestamp: 2026-09-04T09:04:00+05:30
phase: decomposition
actor: UA-W12-WINDOW-AGENT
role: window agent
claim: S001 transformation transcription. The four parent-frozen JSX hunks (import, page intro, results section wrapper, charts section wrapper) are encoded with exact anchors and the parent-frozen starting/ending digest and numstat. Semantic structure (three stacked section wrappers, exact DEC-UA-003 strings, no child reorder) is authoritative; only byte-level whitespace may vary, bounded by the frozen ending digest oracle.
environment: local workspace (source inspected; /tmp analytic reconstructions only; no workspace file mutated)
operation: read research-dashboard.tsx; map each frozen hunk anchor to its current source location; confirm the `<>` fragment and `dashboardFlow` div context; record frozen starting 806eaf59…, ending 3936764824ed80346be54fac256a0b7c6dbc78bb9fd8235a2d3705c3869f9e63, numstat 17 4
observed_result: |
  anchor locations verified: SummaryCards import line precedes TrafficMarketExplorer; the `{phase !== "empty" && (` filterDock block closes with `</div>` then `)}` before `{saveError && (`; the non-empty branch opens `) : (`, `<>`, `<div className={styles.marketContext}`; `dashboardFlow` div opens at 20-space indent and closes before the `</>`/`)}` region. Each hunk maps 1:1 to a unique source region.
decisive_assertion: S001 is decision-complete. The exact strings, wrappers, and anchors are fixed by the parent; no material interface, behavior, or acceptance choice remains. The completion oracle is the frozen ending digest + numstat.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §5 UA-W12-S001
negative_control: any chart-child reorder, ChartPanels edit, or handler edit is excluded and would fail G6/INV-UA-010
coverage_counts: not applicable (S001 product file; CASE-UA-W12-001/002 owned by S003)
limitations: byte-level whitespace freedom is bounded by the frozen ending digest; the exact digest is the deterministic oracle, not a choice
external_mutations: none
```

```yaml
evidence_id: EV-UA-W12-D-005
timestamp: 2026-09-04T09:05:00+05:30
phase: decomposition
actor: UA-W12-WINDOW-AGENT
role: window agent
claim: S003 CREATE specification. Exactly two node:test blocks (CASE-UA-W12-001/002), reading research-dashboard.tsx source only, with recordExecuted after each activation witness. Frozen fence digest 83eca3de… is the deterministic byte oracle.
environment: local workspace (semantic structure verified; /tmp analytic reconstruction only)
operation: transcribe the parent-frozen S003 semantics; record parent fence digest 83eca3de54c7def4321aa4722928b791038d98449f72a6cb5e568d7f68c0f30d0; note §7.3 non-behavioral formatting freedom bound by that digest
observed_result: |
  assertions pinned: `The landscape behind this market.`, `Keyword intelligence`, `Active phrases, recommended targets, and the clusters that hold the demand.`, and the exact SectionIntro import string; exactly two test() blocks; recordExecuted after each oracle; no third test; no render (source read only).
decisive_assertion: S003 is decision-complete. Both allocated CASE IDs are owned here; required == registered == executed at the isolated run; no W2–W11 IDs are required at the w12-only command.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §5 UA-W12-S003, §7.2 G5
negative_control: adding a third test or omitting a recordExecuted call would fail the fence digest / G5
coverage_counts:
  required: 43
  registered: 31
  planned: 43
  executed: 31
  skipped: 0
  duplicate: 0
  unexpected: 0
limitations: exact test-title strings are non-behavioral; the fence digest is the completion oracle
external_mutations: none
```

```yaml
evidence_id: EV-UA-W12-D-006
timestamp: 2026-09-04T09:05:30+05:30
phase: decomposition
actor: UA-W12-WINDOW-AGENT
role: window agent
claim: Intermediate-state and enforcement safety. No existing test in test/ reads research-dashboard.tsx, selection-review.tsx, or keyword-dashboard.module.css, so the S001 and S002 intermediate states are safe (G1 at each intermediate step is the predecessor 199/196/3 with only the heading-oracle fails). Negative-control assignments for the critical invariants are placed at the narrowest effective level.
environment: local workspace
operation: `rg -l "research-dashboard" test/`, `rg -l "selection-review" test/`, `rg -l "keyword-dashboard.module.css" test/`; map each INV-UA/NC-UA control to its CASE and gate
observed_result: |
  zero matches for all three probes -> no suite test depends on the intermediate states; G1 at S001/S002 intermediate = 199/196/3 exit 1 (three heading-oracle only). Invariant/control map: INV-UA-002/03/06 unaffected (presentation-only); INV-UA-010 covered by NC-UA-004 via CASE-UA-W13 and by S002's data-surface assertion; copy strings covered by NC-UA-002 via CASE-UA-W12-001; forbidden-path G6 covers INV-UA-001/V05.
decisive_assertion: intermediate states have no unexplained failures; every critical invariant has a negative control at the narrowest level; no enforcement control can be satisfied through zero-work/skip/filter/duplicate/unactivated evidence.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §9, §7.2 G8, S3 EV-UA-W12-D-001
negative_control: n/a (this entry itself introduces no control)
coverage_counts:
  required: 43
  registered: 31
  planned: 43
  executed: 31
  skipped: 0
  duplicate: 0
  unexpected: 0
limitations: not executed; decomposition-time safety analysis
external_mutations: none
```

```yaml
certificate: SUBWINDOW-DECOMPOSITION-READY
parent_window_id: UA-W12
parent_assignment_id: ASG-UA-W12-01
window_agent_identity: UA-W12-WINDOW-AGENT
revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  parent_checklist: 1edc1bc7a9d7f46a62a4f88ec74e5e468e1c1d17395b9b1aa0b810ce308e8aab
  decomposition: 9d3d1d696c158960c7edc202e276ca2aad97e9b1e60ab046b35277bcf203cbed
initial_subwindow_ids:
  - UA-W12-S001
  - UA-W12-S002
  - UA-W12-S003
initial_subwindow_count: 3
planned_file_set:
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/components/keyword-intelligence/selection-review.tsx
  - frontend/test/uphunt-aesthetic-w12.test.ts
planned_file_set_digest: 49cff36ab4e7adc0439d7e6436d3a974b70cbf2998f303eacd778f116e39bd92
unmapped_parent_requirements: []
unmapped_parent_decisions: []
unmapped_parent_tasks: []
unmapped_coverage_cases: []
duplicate_initial_file_owners: []
multi_file_subwindows: []
unresolved_interfaces: []
unresolved_intermediate_states: []
unresolved_execution_choices: []
unresolved_evidence_references: []
mandatory_authoring_items_checked: 47
mandatory_authoring_items_unchecked: 0
first_subwindow: UA-W12-S001
integration_assessment_id: UA-W12-I001
parent_review_required: true
```

Decomposition closure report (Section 15 of the sub-window standard):

- status: `AWAITING_PARENT_DECOMPOSITION_REVIEW`
- S1: `frontend/docs/open-work/uphunt-aesthetic/UA-W12_SUBWINDOW_DECOMPOSITION_S1.md`
  digest `9d3d1d696c158960c7edc202e276ca2aad97e9b1e60ab046b35277bcf203cbed`
- S2: `frontend/docs/open-work/uphunt-aesthetic/UA-W12_SUBWINDOW_STATE_S2.yaml`
  digest `fb3e8026b37419e5b953567e600fdb97f07f6ed1079339807a28cb5b21f38824`
- S3: this file
- parent window / assignment: `UA-W12` / `ASG-UA-W12-01`
- initial sub-window count 3, IDs `UA-W12-S001` → `UA-W12-S002` → `UA-W12-S003`
  → `UA-W12-I001`, sequential, no parallel wave
- planned changed-file set (3 files) digest `49cff36ab4e7adc0439d7e6436d3a974b70cbf2998f303eacd778f116e39bd92`
- unmapped requirements/decisions/tasks/scenarios/coverage = 0
- multi-file sub-window count 0; duplicate-file-owner count 0
- unresolved interface / intermediate-state / evidence-ref count 0; unresolved
  execution choices 0 (byte-level whitespace in S001/S003 is parent-granted §7.3
  non-behavioral formatting freedom and is fully bounded by the frozen
  ending/fence digest, so it is not an unresolved execution choice)
- mandatory authoring items checked `47`, unchecked `0`
- initial integration assessment `UA-W12-I001` with frozen gates G0–G9 (G4 N/A
  since `browser_evidence` false; G1 = DEC-UA-016 201/198/3)
- predictable stateful/costly gates: G1 `npm test`, G2 `npx tsc --noEmit`, G3
  `npm run lint` — all local, no external stateful/costly gate; `browser_evidence`
  false means no G4 screenshots; no AWS/paid/provider action.

This decomposition did not execute `UA-W12-S001`, did not assign FILE leaves, did
not start `UA-W13`, and left `A5_ACTIVE_EXECUTION_STATE.yaml` byte-identical
(`6ccc1ce226145c7e016e0bddb97fe4a7f76a42feabc0d323f59fb302b032a229`).

```yaml
evidence_id: EV-UA-W12-X-001
timestamp: 2026-09-04T09:25:00+05:30
phase: review
parent_window: UA-W12
parent_assignment_id: ASG-UA-W12-01
subwindow_ids: [UA-W12-S001, UA-W12-S002, UA-W12-S003, UA-W12-I001]
assignment_ids: [ASG-UA-W12-01 (parent decomposition accept)]
actor: parent
role: parent (decomposition accept gate, sub-window standard §12.1)
frozen_revisions:
  decomposition: 9d3d1d696c158960c7edc202e276ca2aad97e9b1e60ab046b35277bcf203cbed
  active_state_A5: 6ccc1ce226145c7e016e0bddb97fe4a7f76a42feabc0d323f59fb302b032a229
trigger_evidence: [EV-UA-A-066]
command_or_inspection: |
  Parent independently verified S1/S2/S3 digests; all four S001 hunks apply with
  ending 39367648… (17/4); S002 ending 87b7232b… (1/0); S003 §5 js fence digest
  41711cc5… reconciled against parent reference 83eca3de… per §7.3; authoring
  checklist 47/0; product files untouched; A5 byte-identical; converted S2
  decomposition_status to READY and assigned ASG-UA-W12-01-S001.
observed_result: |
  decomposition APPROVED; S2 state_version 2 READY; first executable leaf UA-W12-S001;
  continuous S001→S003→I001 authorized under DEC-UA-015; UA-W13 not authorized.
decisive_assertion: UA-W12-WINDOW-AGENT may execute S001 through I001 without further parent gates.
sandbox_privilege: none
environment_invalidated_attempt: none
limitations: S003 authoritative bytes are the S1 §5 fence (41711cc5…), not the parent sample 83eca3de…
external_mutations: none
```

```yaml
evidence_id: EV-UA-W12-C-001
timestamp: 2026-09-04T09:40:00+05:30
phase: correction
actor: UA-W12-WINDOW-AGENT
role: window agent
correction_id: UA-W12-C001
corrects: UA-W12-S002
parent_assignment_id: ASG-UA-W12-01-C001
governing_requirement: REQ-UA-005
governing_decisions: [DEC-UA-005, DEC-UA-009, INV-UA-010]
trigger_evidence: EV-UA-A-067 (parent PARENT_BLOCKED at I001 G1)
claim: Apply the parent-frozen CHG-UA-0007 reverting the S002-introduced `data-surface="surface:selection-review-panel"` line in selection-review.tsx, restoring the file to the frozen original and returning W5-I05 to a pass.
environment: local workspace
operation: remove the unique attribute line between `aria-label="Selection review"` and the closing `>`; sha256sum; `git diff --numstat`; isolated W5-I05 run
observed_result: |
  ending digest 5550dffa70db24bc923c2ba405cefaa568e29a7bbb281bac261429cf049a3ae2 MATCH;
  C001 delta numstat `0 1` (one line removed, none added) MATCH;
  h2 `Recommended keywords, ready for your final edit.` preserved (count 1);
  `surface:selection-review` preserved on the dashboard wrapper (research-dashboard.tsx count 1);
  W5-I05 "surface inventory equality + registrations" passes in isolation (pass 1, fail 0);
  net changed-file set after C001 = {frontend/components/keyword-intelligence/research-dashboard.tsx, frontend/test/uphunt-aesthetic-w12.test.ts} digest 54cf2d3693093e58e19ae8c35fec70a657eef02b80efdbf0b8d340fc2121ee1b MATCH;
  S001 research-dashboard.tsx still 3936764824ed80346be54fac256a0b7c6dbc78bb9fd8235a2d3705c3869f9e63; S003 w12 test still 41711cc556e9706430a9e8f226f285d545aefca822b5a7529680fbdd995237e7.
decisive_assertion: C001 is correctly executed; selection-review.tsx returns to the original bytes, W5-I05 is restored, and the net planned set is the parent-frozen 2-file set. No new parent-level decision or expanded parent scope was required.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §13 (UA-W12-C001), A5 state_version 28, S2 current_subwindow UA-W12-C001
negative_control: keeping the attribute line fails W5-I05; removing exactly one line and nothing else reproduces the frozen ending digest
coverage_counts:
  required: 43
  registered: 33
  planned: 43
  executed: 33
  skipped: 0
  duplicate: 0
  unexpected: 0
limitations: correction of a presentation-only attribute; no public interface or behavior change
external_mutations: test/.ua-executed.json runtime residue (post-G1 33-ID, tracked at HEAD, never committed)
```

```yaml
certificate: CORRECTIVE-SUBWINDOW-READY
parent_window_id: UA-W12
parent_assignment_id: ASG-UA-W12-01
window_agent_identity: UA-W12-WINDOW-AGENT
correction_id: UA-W12-C001
corrects_subwindow: UA-W12-S002
ownership_scope:
  - frontend/components/keyword-intelligence/selection-review.tsx
root_cause: UA-W12-S002 added `data-surface="surface:selection-review-panel"`, a value absent from the frozen surface inventories, breaking W5-I05 at I001 G1 (203/199/4 vs allowed 201/198/3).
governing: [REQ-UA-005, DEC-UA-005, DEC-UA-009, INV-UA-010]
failed_evidence: EV-UA-A-067
invalidated_checks:
  - UA-W12-S002 V1a ending digest 87b7232b
  - UA-W12-S002 V1b numstat 1 0
baseline_starting_digest: 87b7232ba7cbe77a2378107ab63cffc2ff7d89007d8f108d44e9e1048fc99807
baseline_ending_digest: 5550dffa70db24bc923c2ba405cefaa568e29a7bbb281bac261429cf049a3ae2
baseline_numstat: "0 1"
expanded_parent_scope_required: false
net_planned_file_set_after_correction:
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/test/uphunt-aesthetic-w12.test.ts
net_planned_file_set_digest: 54cf2d3693093e58e19ae8c35fec70a657eef02b80efdbf0b8d340fc2121ee1b
new_whole_window_assessment: UA-W12-I002
```

```yaml
evidence_id: EV-UA-W12-I002
timestamp: 2026-09-04T10:05:00+05:30
phase: integration_assessment
actor: UA-W12-WINDOW-AGENT
role: window agent
parent_window_id: UA-W12
parent_assignment_id: ASG-UA-W12-01
assessment_id: UA-W12-I002
trigger: EV-UA-A-067 PARENT_BLOCKED resolved by UA-W12-C001
claim: Whole-window reassessment. G1 does NOT require exit 0 and is graded by the DEC-UA-016 title oracle: PASS iff every allocated UA-W12 case passes and every failing title is a member of the three-title heading-oracle set. All gates G0–G9 pass after C001.
environment: local workspace; no network/DB/provider action; `browser_evidence` false so G4 N/A
gates:
  G0_pins_verified: true
  G1_npm_test: "PASS — 203 tests, 200 pass, 3 fail; only the three DEC-UA-016 heading-oracle titles fail; CASE-UA-W12-001/002 pass; W5-I05 surface inventory passes"
  G2_tsc_needles: "PASS — 0 type errors in research-dashboard.tsx / selection-review.tsx / uphunt-aesthetic-w12.test.ts (10 pre-existing errors are in unrelated test files)"
  G3_lint: "PASS — npx eslint on the three needles exits 0"
  G4_browser: "N/A — browser_evidence false, no screenshots"
  G5_executed_set: "PASS — 33 executed IDs, set digest cf0e61acc57d90a55d9738018f214a574b97a72a26bcbce9e81c2792751935e4"
  G6_ending_and_zero_edit: "PASS — ending 39367648 (research-dashboard), 5550dffa (selection-review), 41711cc5 (w12 test); zero-edit pins page a46b89bc, chart-panels 5bf17d06, module.css d416ece7, globals 4cf7a1fc, section-intro 159096f3, traffic-enrichment 1a903788, lead-details 9431f71b, w11 40e31788, w2–w10 tests, fixtures, coverage 9ea26525"
  G7_no_network_db: "PASS — 0 fetch/http/db references in changed files; w12 test reads research-dashboard.tsx source only"
  G8_negative_controls: "PASS — no failing title outside the heading-oracle set; inventory/version/forbidden-path negative controls all pass"
  G9_no_successor: "PASS — no UA-W13 test/artifact; UA-W13 not started"
operation: |
  `npm test` (PASS, 203/200/3, heading-oracle only); `npx tsc --noEmit` (0 needles); `npx eslint <three needles>` (exit 0); isolated W5-I05 run (pass); 33-ID set digest; net 2-file set digest 54cf2d36; sha256sum of ending digests and zero-edit pins.
observed_result: |
  I002 all gates PASS -> UA-W12 window may hand off at READY_FOR_PARENT_REVIEW. Net changed-file set {frontend/components/keyword-intelligence/research-dashboard.tsx, frontend/test/uphunt-aesthetic-w12.test.ts}; selection-review.tsx returned to the frozen original 5550dffa.
decisive_assertion: UA-W12-I002 PASSES; corrected window is decision-complete and ready for parent review. No successor window began. No expansion of the surface inventories occurred.
coverage_counts:
  required: 43
  registered: 33
  executed: 33
  skipped: 0
  duplicate: 0
  unexpected: 0
  failed_cases: 3
  failed_case_titles:
    - "My searches presents keyword research and identifiable run dossiers without rendering IDs"
    - "MRR-FE-01 exact research payload and two-section surface"
    - "MRR-W2 frontend unit certificate"
residual_risks:
  - "S1 §5 UA-W12-S003 completion-oracle text says 83eca3de… but the authoritative fence digest is 41711cc5… (parent-confirmed EV-UA-W12-X-001 limitation); S1 §13 was appended to record the C001 correction."
  - "test/.ua-executed.json is modified (33-ID residue) — tracked at HEAD, never committed (DEC-UA-011)."
user_prerequisites:
  - "Parent independently verifies the handoff (Section 13); parent acceptance permits movement to UA-W13."
external_mutations:
  - test/.ua-executed.json (tracked runtime residue, never commit)
sandbox_privilege: none
environment_invalidated_attempt: none
```

```yaml
certificate: WINDOW-HANDOFF
parent_window_id: UA-W12
parent_assignment_id: ASG-UA-W12-01
window_agent_identity: UA-W12-WINDOW-AGENT
status_for_parent: READY_FOR_PARENT_REVIEW
initial_subwindows: [UA-W12-S001, UA-W12-S002, UA-W12-S003]
corrective_subwindows: [UA-W12-C001]
failed_assessment_id: UA-W12-I001 (PARENT_BLOCKED at G1, EV-UA-A-067)
successful_assessment_id: UA-W12-I002
net_changed_file_set:
  - frontend/components/keyword-intelligence/research-dashboard.tsx
  - frontend/test/uphunt-aesthetic-w12.test.ts
net_changed_file_set_digest: 54cf2d3693093e58e19ae8c35fec70a657eef02b80efdbf0b8d340fc2121ee1b
net_file_digests:
  research-dashboard: 3936764824ed80346be54fac256a0b7c6dbc78bb9fd8235a2d3705c3869f9e63
  uphunt-aesthetic-w12.test: 41711cc556e9706430a9e8f226f285d545aefca822b5a7529680fbdd995237e7
  selection-review: 5550dffa70db24bc923c2ba405cefaa568e29a7bbb281bac261429cf049a3ae2
coverage_digests:
  required_case_set: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
  post_G1_executed_set: cf0e61acc57d90a55d9738018f214a574b97a72a26bcbce9e81c2792751935e4
  isolated_4_id_set: 8bc38aad6abdde959247deb61e19e8d99fa0887879d65ea5daf15cfad1677f2f
no_successor_window_began: true
expanded_parent_scope_required: false
parent_review_required: true
```
