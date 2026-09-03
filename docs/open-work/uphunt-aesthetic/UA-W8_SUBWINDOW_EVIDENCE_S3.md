# UA-W8 append-only sub-window evidence (`S3`)

Subordinate artifact `S3` of parent window `UA-W8` under assignment `ASG-UA-W8-01`.
Companion artifacts: `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_DECOMPOSITION_S1.md`
and `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_STATE_S2.yaml`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

Append-only. Entries below cover decomposition authoring only (`EV-UA-W8-D-001..002`
plus the §12.1 readiness certificate). Execution, review, assessment, and handoff
evidence will be appended as `EV-UA-W8-S-001..`, `EV-UA-W8-R-001..`,
`EV-UA-W8-I-001..`, and `EV-UA-W8-A-001..` in later turns. Nothing here amends a
task, decision, or authority boundary.

```yaml
evidence_id: EV-UA-W8-D-001
timestamp: 2026-09-03T17:15:00+05:30
phase: decomposition-gate
parent_window: UA-W8
parent_assignment_id: ASG-UA-W8-01
subwindow_ids: []
assignment_ids: [WINDOW-AGENT (decomposition authoring)]
actor: UA-W8-WINDOW-AGENT
role: window agent (decomposition entry gate, sub-window standard §3)
frozen_revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract_A1: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision_A3: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  checklist_A4: 34d5d8969c85bc57394d4b728b0e489b83537044de96311787f2df539f371cee
  active_state_A5: c6a4ba507365261c14a7e87108e440c4cb2bd71720baf61631fcb5a9c1fc05a3 (state_version 19, ASG-UA-W8-01, IN_PROGRESS)
starting_file_digests:
  frontend/app/leads/page.tsx: 9fad9d0b55b5959e75c016fad0643ba81255cb609871140c0b77b0b1d70bed79
  frontend/components/leads/live-leads-workspace.tsx: 294201ad42d2831b1c04d0beef0e3b64ca8874fe4160b5dcd221d6fef488ab01
  frontend/components/run-workspace.tsx: 9472450d3a22143befe5f52569328eb5c07df94fee543ecb873c0ca05914c8c3
  frontend/app/globals.css: b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d
  frontend/test/uphunt-aesthetic-w8.test.ts: ABSENT
  frontend/components/results-table.tsx: a4e1472fdc4129d20a61faa893d07694dba1528336cfabd257219833cd7d0b4f
  frontend/components/results-filters.tsx: 0ab118e47349efb0c71e4facaf9bdd2844d8ea564f3c1fbf59afbc7e6e22b881
  frontend/components/cumulative-traffic.tsx: 7d37a3ae2eb8e423a539f85330688bcc863a4e028525bce46222ac1cbbdb45aa
  frontend/app/runs/[runId]/page.tsx: 719e05ea0eec73fe948f0c41a9c56c970d6db61cfff0c990e59666136a069072
  frontend/components/query-editor.tsx: 92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c
  frontend/components/run-progress.tsx: 15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38
  frontend/components/lead-details.tsx: 0ceec9058af2c24d65c8ef880848b114674352a2c0593ec0a64914a0f9aefc5b
  frontend/components/section-intro.tsx: 159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175
  frontend/test/uphunt-aesthetic-coverage.test.ts: f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1
  frontend/test/uphunt-aesthetic-w7.test.ts: 92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842
  frontend/test/.ua-executed.json: 0aab3c5911e4a5c624d803286be998e88be8d503a9d95c1acf4f9678ac48f978 (TRACKED, clean, 19 sorted IDs)
command_or_inspection: |
  sha256sum of A1/A3/A4/A5/subwindow-standard/parent-standard and the 16 files above;
  test ! -f frontend/test/uphunt-aesthetic-w8.test.ts; git status --porcelain in
  frontend/ and in the coordination root; node --version; package.json scripts read;
  /usr/bin/google-chrome presence; tsconfig.json flags read; grep results-table.tsx
  for className="detail-row"; grep results-filters.tsx for sortBy/sortDirection;
  grep run-workspace.tsx for the RETRY_DELAYS and params.get needles; pre-existing
  globals.css count of `padding: var(--space-5);` and `height: 3.25rem;`.
observed_result: |
  All §1 pins MATCH (A1 57fa49c7…, A3 094bc8bf…, A4 34d5d896…, A5 c6a4ba50…
  state_version 19, standards cda35201…/842c2955…). A5 names current_window UA-W8,
  authorized_windows [UA-W8], assigned_agent UA-W8-WINDOW-AGENT, current_status
  IN_PROGRESS, and authorizes decompose_UA-W8_under_subwindow_standard. Every
  starting digest matches A6 EV-UA-A-052 (leads/page 9fad9d0b…, live-leads-workspace
  294201ad…, run-workspace 9472450d…, globals b5c79578…, w8 test ABSENT,
  results-table a4e1472f…, results-filters 0ab118e4…, cumulative-traffic 7d37a3ae…,
  runs/[runId]/page 719e05ea…, query-editor 92efe1f7…, run-progress 15d840bf…,
  lead-details 0ceec905…, section-intro 159096f3…, coverage f5137be4…, w7 test
  92201c35…, .ua-executed.json 0aab3c59…). frontend porcelain == exactly
  ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml` and
  ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` (parent assignment
  writes; PROTECTED). Coordination root porcelain clean (root
  ACTIVE_EXECUTION_STATE.md untouched). node v24.14.1; test/lint scripts present;
  /usr/bin/google-chrome present (P3). className="detail-row" count == 1 in
  results-table.tsx (CASE-UA-W8-003 reads it). sortBy and sortDirection present in
  results-filters.tsx. RETRY_DELAYS needle count == 1 and params.get("page")/"sortBy"/
  "sortDirection"/"search" each count == 1 in run-workspace.tsx. Pre-existing
  globals.css: `padding: var(--space-5);` count == 1 (unrelated rule @6066) and
  `height: 3.25rem;` count == 1 (the collapsed-row rule @8075). Frontend repo HEAD
  41d6632 "W7". Parent-frozen mechanical consequences EV-UA-A-052 copied into S1 §0
  verbatim in substance and not reopened.
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
sandbox_privilege: none
environment_invalidated_attempt: none
coverage_cases:
  registered_this_window: [CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003]
  executed: none (decomposition turn; no CASE test run)
  skipped: []
  duplicate: []
  unexpected: []
limitations: decomposition authoring turn; no implementation file opened for write; no test command run; A5 and A6 untouched by this turn (A5 handoff field is post-I001 only, not this turn); the decomposition-simulation and dry-run evidence is in EV-UA-W8-D-002
external_mutations: none
```

```yaml
evidence_id: EV-UA-W8-D-002
timestamp: 2026-09-03T17:20:00+05:30
phase: decomposition-simulation
parent_window: UA-W8
parent_assignment_id: ASG-UA-W8-01
subwindow_ids: [UA-W8-S001, UA-W8-S002, UA-W8-S003, UA-W8-S004, UA-W8-S005]
assignment_ids: [WINDOW-AGENT]
actor: UA-W8-WINDOW-AGENT
role: window agent (mechanical simulation and dry-run validation)
frozen_revisions: as EV-UA-W8-D-001
starting_file_digests: as EV-UA-W8-D-001
command_or_inspection: |
  In the disposable location /tmp/opencode/ua-w8-dework (outside the workspace):
  1. copied the four starting planned files; applied each S1 OLD fence with a
     count-checking replacement function that throws unless OLD count == 1
     (S001 R1/R2, S002 R1/R2, S003 R1/R2, S004 H1/H2/H3);
  2. sha256sum of every resulting simulated ending file;
  3. git diff --no-index --numstat of each original vs simulated copy;
  4. occurrence counts (split/length) of all §6.4/§7.4/§8.4/§9.4 V-D needles and
     baselines, pre and post;
  5. built a dry-run tree /tmp/opencode/ua-w8-dework/dryrun with the simulated
     post-S001..S004 states plus a copy of test/uphunt-aesthetic-coverage.test.ts,
     the real components/results-table.tsx and components/results-filters.tsx, and
     the exact §10.3 w8 test bytes; ran
     `node --experimental-strip-types --test test/uphunt-aesthetic-w8.test.ts`;
     read the generated test/.ua-executed.json inside the dry-run tree;
  6. computed §4.7 set digests (5-ID executed set, 3-ID window-local set,
     22-ID post-npm-test set, 5-file planned set, 2-path starting change set);
  7. negative probes via node -e on in-memory copies (zero workspace writes):
     N1 delete the DEC-UA-003 completed title from post-S003 run-workspace.tsx;
     N2 delete the SectionIntro import from post-S001 leads/page.tsx;
     N3 remove className="detail-row" from results-table.tsx;
     N4 alter one element of the RETRY_DELAYS array in post-S003 run-workspace.tsx;
     N5 remove min-height: 56px; from post-S004 globals.css.
observed_result: |
  Ending digests (simulated): S001 leads/page.tsx
  21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b; S002
  live-leads-workspace.tsx a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36;
  S003 run-workspace.tsx 643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3;
  S004 globals.css f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c
  (matches the parent pin in EV-UA-A-052 consequence 4). Numstat
  (original vs simulated): page.tsx 2 1, live-leads-workspace.tsx 2 1,
  run-workspace.tsx 2 8, globals.css 3 3 (matches parent consequence 4). S005 test
  file digest cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0.
  Dry-run: 5 tests pass (CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W8-001,
  CASE-UA-W8-002, CASE-UA-W8-003), 0 fail, 0 skipped; generated executed-set ==
  exactly those 5 IDs (set digest 703c8441470da81b31c474099b78e2cd38b4e2c1c79756e3e0d9d63d14bfc8c7,
  matches parent consequence 6). §4.7 set digests: W8 window-local
  (CASE-UA-W8-001/002/003) fb88fd2a8409b4a7527585e36e0868c833b72fa5ee0bb9785747df7babd3e8cc
  (matches parent consequence 7); 22-ID post-npm-test set
  9da0dc92b33e9eec059c774d2591cd1a1120a77f70110c94312f57f0ec7904fd (matches parent
  consequence 6); planned-file set 88a8fc3280241ce819c353c1160d37d48e61f56def1cf726180059d9f64cd9e0
  under §4.7 byte-sorted formula (A6 consequence 7 recorded 00726b4e… over the
  same five paths in the parent's listed document order — §4.7 sorting is
  authoritative, and this S1 uses the §4.7 value); required 43-set
  0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05.
  Negative probes (all falsified): N1 title-removal before=true after=false;
  N2 import-removal before=true after=false; N3 detail-row-removal before=true
  after=false; N4 RETRY_DELAYS-array-element-change before=true after=false;
  N5 min-height-56-removal before=true after=false. Post-state counts verified:
  detail-row == 1 in results-table.tsx; min-height: 56px; == 1 and
  padding: var(--space-5); == 3 (two .lead-expansion-shell rules + one pre-existing
  unrelated rule @6066) in post-S004 globals.css; navigate( == 6 and
  ExportCsvButton == 2 in the simulated live-leads-workspace / run-workspace.
sandbox_privilege: none
environment_invalidated_attempt: none
coverage_cases:
  registered_this_window: [CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003]
  executed: none (window-agent simulation only; the 3 CASE IDs were executed only in the disposable dry-run tree)
  skipped: []
  duplicate: []
  unexpected: []
limitations: the dry run exercises the §10.3 test bytes against the simulated post-leaf file states in /tmp/opencode/ua-w8-dework/dryrun only; it is not the leaf execution and does not modify any workspace file; numstat 2 1 / 2 1 / 2 8 / 3 3 are git --no-index counts. The §4.7 planned-file-set digest 88a8fc3280241ce819c353c1160d37d48e61f56def1cf726180059d9f64cd9e0 differs from the A6-recorded 00726b4e5cd1f95c764afad43bf3208e440a3f536167cfe2048707450c0b33f2 because A6 used unsorted document order; the five-path set is unchanged.
external_mutations: none
```

```yaml
certificate: SUBWINDOW-DECOMPOSITION-READY
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
window_agent_identity: UA-W8-WINDOW-AGENT
revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  parent_checklist: 34d5d8969c85bc57394d4b728b0e489b83537044de96311787f2df539f371cee
  decomposition: 8e40cf4ff234efa596dd89adbe2cc18a31bb4141617bd2a52217fb78845ce879
initial_subwindow_ids: [UA-W8-S001, UA-W8-S002, UA-W8-S003, UA-W8-S004, UA-W8-S005]
initial_subwindow_count: 5
planned_file_set:
  - frontend/app/leads/page.tsx
  - frontend/components/leads/live-leads-workspace.tsx
  - frontend/components/run-workspace.tsx
  - frontend/app/globals.css
  - frontend/test/uphunt-aesthetic-w8.test.ts
planned_file_set_digest: 88a8fc3280241ce819c353c1160d37d48e61f56def1cf726180059d9f64cd9e0
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
first_subwindow: UA-W8-S001
integration_assessment_id: UA-W8-I001
parent_review_required: true
```

```yaml
evidence_id: EV-UA-W8-X-001
timestamp: 2026-09-03T17:25:00+05:30
phase: assignment
claim: Parent accepted the UA-W8 decomposition and converted S2 to READY. First leaf is frontend/app/leads/page.tsx. Identity UA-W8-WINDOW-AGENT owns S001→S002→S003→S004→S005→I001 continuously (DEC-UA-015). A5 digest unchanged (c6a4ba50…) so S001 P1 still holds.
actor: parent (Cursor Grok 4.6)
frozen_revisions:
  decomposition: 8e40cf4ff234efa596dd89adbe2cc18a31bb4141617bd2a52217fb78845ce879
  submitted_s2: ac8a6d478b581c24943e076bda35068e5fd63b0be32a511ba4f41999441d2112
  submitted_s3: 25ab55b2056ac4b6ff4ba0b62f149d1e6d73b28495b0c1bd92e0a6e61a4f42bb
  active_state_A5: c6a4ba507365261c14a7e87108e440c4cb2bd71720baf61631fcb5a9c1fc05a3
  ready_s2: c3bdd1d6638f4a84afedd964cd2cb4432fb58ecd56311d53a35f26d79918239f
command: independent fence apply + digest recompute; rewrite S2 READY; this S3 entry; A6 EV-UA-A-053
observed_result: |
  S2 decomposition_status READY; current_assignment_id ASG-UA-W8-01-S001;
  assigned_agent UA-W8-WINDOW-AGENT; authorized_write_file frontend/app/leads/page.tsx;
  next_subwindow UA-W8-S002; A5 digest unchanged
decisive_assertion: APPROVED and executable; UA-W8-WINDOW-AGENT may execute S001 (S1 §6.2 two ordered replacements, ending digest 21a17799…) then personally review the leaf in the same turn, then itself assign S002 and continue through I001; UA-W9 remains unauthorized
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: UA-W8_SUBWINDOW_STATE_S2.yaml
external_mutations: none
```

```yaml
evidence_id: EV-UA-W8-S-001
timestamp: 2026-09-03T17:26:00+05:30
phase: leaf-execution
subwindow_id: UA-W8-S001
assignment_id: ASG-UA-W8-01-S001
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
type: FILE
file_operation: MODIFY
writable_file: frontend/app/leads/page.tsx
actor: UA-W8-WINDOW-AGENT
role: window agent (execute-then-review, DEC-UA-015)
predecessor_reference: UA-W8-S001 §6 (EV-UA-W8-X-001 assignment)
starting_file_digest: 9fad9d0b55b5959e75c016fad0643ba81255cb609871140c0b77b0b1d70bed79
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
transformation_applied:
  order: [R1, R2]
  r1: insert `import { SectionIntro } from "@/components/section-intro";` immediately after the `LiveLeadsWorkspace` import
  r2: replace the inner `div.run-title-row.app-page-header` eyebrow `<div><span className="eyebrow">Live lead workspace</span></div>` block with `<SectionIntro eyebrow="Live lead workspace" title="Every shop you have already found, in one place." copy="One live record per store, with the evidence from every discovering run still attached." />`
  anchors_verified: R1 count == 1, R2 count == 1, each OLD string located exactly once before replacement (run terminates non-zero on any count != 1)
checks:
  V-A: frontend porcelain == the two §3 protected paths plus the three untracked UA-W8 coordination artifacts (S1/S2/S3); coordination root clean; starting digest 9fad9d0b… — PASS
  V-B: both OLD anchors count == 1; 2 replacements applied — PASS
  V-C: numstat 2 1; full git diff == exactly R1 and R2, no other hunk — PASS
  V-D: 12 assertions all true (SectionIntro import 1; "Live lead workspace" 1; "Every shop you have already found, in one place." 1; "One live record per store, with the evidence from every discovering run still attached." 1; <SectionIntro 1; "Live lead workspace</span>" 0; "eyebrow\">Live lead workspace" 0; "run-title-row app-page-header" 1; "href=\"/runs\"" 1; "My leads" 1; "force-dynamic" 1; "<LiveLeadsWorkspace />" 1) — PASS
  V-E: ending digest 21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b (matches S1 pin §6.4 / consequence 2); attributable delta == exactly ` M app/leads/page.tsx`; the two §3 protected paths unchanged; no other path — PASS
  DEF: N/A (deferred to UA-W8-I001 G1–G9)
ending_file_digest: 21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b
numstat: 2 1
completion_checklist:
  P1: PASS (revisions, identity ASG-UA-W8-01-S001, writable file, baseline digest, predecessor EV-UA-W8-S-001 all match)
  P2: PASS (starting repository status and protected dirty changes match baseline)
  T1: PASS (both ordered transformations applied, no other edit)
  V1: PASS (V-A..V-E run; activation witnesses and exact assertions recorded above)
  V2: PASS (attributable changed-file set == {frontend/app/leads/page.tsx})
  V3: PASS (required local coverage IDs = {} = registered = executed; W8 coverage executes in S005)
  H1: PASS (diff, ending digest, commands, outcomes, residual integration obligations above)
  H2: PASS (no prohibited action, second-file edit, successor work, external mutation, or parent communication)
  H3: PASS (AWAITING_WINDOW_REVIEW is the FILE H3 certificate field, not a parent stop; U-W8-WINDOW-AGENT continues to S002 in this same turn)
covered_cases: []
registered_this_subwindow: []
executed_this_subwindow: []
skipped: []
residual_obligations: [UA-W8-I001 G1–G9; S005 CASE-UA-W8-002 oracles consume this file's post-state]
evidence_chain: S3 EV-UA-W8-X-001 → EV-UA-W8-S-001 → (next EV-UA-W8-S-002)
sandbox_privilege: none
environment_invalidated_attempt: none
external_mutations: none
```

```yaml
evidence_id: EV-UA-W8-S-002
timestamp: 2026-09-03T17:27:00+05:30
phase: leaf-execution
subwindow_id: UA-W8-S002
assignment_id: ASG-UA-W8-01-S002
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
type: FILE
file_operation: MODIFY
writable_file: frontend/components/leads/live-leads-workspace.tsx
actor: UA-W8-WINDOW-AGENT
role: window agent (execute-then-review, DEC-UA-015)
predecessor_reference: UA-W8-S002 §7; S001 accepted (ending digest 21a17799…)
starting_file_digest: 294201ad42d2831b1c04d0beef0e3b64ca8874fe4160b5dcd221d6fef488ab01
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
transformation_applied:
  order: [R1, R2]
  r1: insert `import { SectionIntro } from "@/components/section-intro";` immediately after the `MasterExportButton` import
  r2: replace the inner `.results-heading` title `<div><span className="eyebrow">Current master data</span><h2>Unique shops</h2><p>One live record per shop, with every discovering run retained.</p></div>` with `<SectionIntro eyebrow="Live lead workspace" title="Every shop you have already found, in one place." copy="One live record per store, with the evidence from every discovering run still attached." />`
  anchors_verified: R1 count == 1, R2 count == 1, each OLD string located exactly once before replacement
checks:
  V-A: S001 ending digest 21a17799… (recomputed equal); frontend porcelain == the two §3 protected paths + ` M app/leads/page.tsx`; coordination root clean; starting digest 294201ad… — PASS
  V-B: both OLD anchors count == 1; 2 replacements applied — PASS
  V-C: numstat 2 1; full git diff == exactly R1 and R2, no other hunk — PASS
  V-D: 13 assertions all true (SectionIntro import 1; "Live lead workspace" 1; "Every shop you have already found, in one place." 1; "One live record per store, with the evidence from every discovering run still attached." 1; <SectionIntro 1; "Current master data" 0; "Unique shops" 0; "One live record per shop, with every discovering run retained." 0; "results-heading" 1; <MasterExportButton 1; "navigate(" 6; "apiRequest<MasterLeadPage>" 1; "pageSize: \"25\"" 1) — PASS
  V-E: ending digest a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36 (matches S1 pin §7.4); attributable delta == ` M app/leads/page.tsx` + ` M components/leads/live-leads-workspace.tsx` exactly; protected paths unchanged — PASS
  DEF: N/A (deferred to UA-W8-I001 G1–G9)
ending_file_digest: a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36
numstat: 2 1
completion_checklist:
  P1: PASS (revisions, identity ASG-UA-W8-01-S002, writable file, baseline digest, predecessor evidence EV-UA-W8-S-001 all match)
  P2: PASS (starting repository status and protected dirty changes match baseline)
  T1: PASS (both ordered transformations applied, no other edit)
  V1: PASS (V-A..V-E run; activation witnesses and exact assertions recorded above)
  V2: PASS (attributable changed-file set == {frontend/app/leads/page.tsx, frontend/components/leads/live-leads-workspace.tsx})
  V3: PASS (required local coverage IDs = {} = registered = executed; W8 coverage executes in S005)
  H1: PASS (diff, ending digest, commands, outcomes, residual integration obligations above)
  H2: PASS (no prohibited action, second-file edit, successor work, external mutation, or parent communication)
  H3: PASS (AWAITING_WINDOW_REVIEW is the FILE H3 certificate field, not a parent stop; U-W8-WINDOW-AGENT continues to S003 in this same turn)
covered_cases: []
registered_this_subwindow: []
executed_this_subwindow: []
skipped: []
residual_obligations: [UA-W8-I001 G1–G9; S005 CASE-UA-W8-002 oracles consume this file's post-state]
evidence_chain: S3 EV-UA-W8-X-001 → EV-UA-W8-S-001 → EV-UA-W8-S-002 → (next EV-UA-W8-S-003)
sandbox_privilege: none
environment_invalidated_attempt: none
external_mutations: none
```

```yaml
evidence_id: EV-UA-W8-S-003
timestamp: 2026-09-03T17:28:00+05:30
phase: leaf-execution
subwindow_id: UA-W8-S003
assignment_id: ASG-UA-W8-01-S003
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
type: FILE
file_operation: MODIFY
writable_file: frontend/components/run-workspace.tsx
actor: UA-W8-WINDOW-AGENT
role: window agent (execute-then-review, DEC-UA-015)
predecessor_reference: UA-W8-S003 §8; S001+S002 accepted (ending digests 21a17799…/a646f657…)
starting_file_digest: 9472450d3a22143befe5f52569328eb5c07df94fee543ecb873c0ca05914c8c3
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
transformation_applied:
  order: [R1, R2]
  r1: insert `import { SectionIntro } from "@/components/section-intro";` immediately after the `QueryEditor` import
  r2: replace the inner `.results-heading` children `<div><span className="eyebrow">Lead workspace</span><h2>Your store leads</h2><p>Review the evidence, focus on qualified prospects, or export the complete dataset.</p></div>` with `<SectionIntro eyebrow="Lead discovery" title="The stores this search was able to stand behind." copy="Inspect the evidence, then keep the prospects worth approaching." />`
  anchors_verified: R1 count == 1, R2 count == 1, each OLD string located exactly once before replacement
checks:
  V-A: S001 ending digest 21a17799… and S002 ending digest a646f657… (both recomputed equal); frontend porcelain == the two §3 protected paths + ` M app/leads/page.tsx` + ` M components/leads/live-leads-workspace.tsx`; coordination root clean; starting digest 9472450d… — PASS
  V-B: both OLD anchors count == 1; 2 replacements applied — PASS
  V-C: numstat 2 8; full git diff == exactly R1 and R2, no other hunk — PASS
  V-D: 16 assertions all true (SectionIntro import 1; "Lead discovery" 2 (eyebrow + preserved h1 `Lead discovery run`, >= 1 satisfied); "The stores this search was able to stand behind." 1; "Inspect the evidence, then keep the prospects worth approaching." 1; <SectionIntro 1; "Lead workspace" 0; "Your store leads" 0; "Review the evidence, focus on qualified prospects" 0; RETRY_DELAYS needle 1; "results-heading-utilities" 1; "ExportCsvButton" 2; <RunProgress 1; params.get("page") 1; params.get("sortBy") 1; params.get("sortDirection") 1; params.get("search") 1) — PASS
  V-E: ending digest 643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3 (matches S1 pin §8.4); attributable delta == the three ` M` planned implementation paths exactly; protected paths unchanged — PASS
  DEF: N/A (deferred to UA-W8-I001 G1–G9)
ending_file_digest: 643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3
numstat: 2 8
completion_checklist:
  P1: PASS (revisions, identity ASG-UA-W8-01-S003, writable file, baseline digest, predecessor evidence EV-UA-W8-S-001/002 all match)
  P2: PASS (starting repository status and protected dirty changes match baseline)
  T1: PASS (both ordered transformations applied, no other edit)
  V1: PASS (V-A..V-E run; activation witnesses and exact assertions recorded above)
  V2: PASS (attributable changed-file set == {frontend/app/leads/page.tsx, frontend/components/leads/live-leads-workspace.tsx, frontend/components/run-workspace.tsx})
  V3: PASS (required local coverage IDs = {} = registered = executed; W8 coverage executes in S005)
  H1: PASS (diff, ending digest, commands, outcomes, residual integration obligations above)
  H2: PASS (no prohibited action, second-file edit, successor work, external mutation, or parent communication)
  H3: PASS (AWAITING_WINDOW_REVIEW is the FILE H3 certificate field, not a parent stop; U-W8-WINDOW-AGENT continues to S004 in this same turn)
covered_cases: []
registered_this_subwindow: []
executed_this_subwindow: []
skipped: []
residual_obligations: [UA-W8-I001 G1–G9; S005 CASE-UA-W8-001/003 oracles consume this file's post-state and preserved needles]
evidence_chain: S3 EV-UA-W8-X-001 → EV-UA-W8-S-001 → EV-UA-W8-S-002 → EV-UA-W8-S-003 → (next EV-UA-W8-S-004)
sandbox_privilege: none
environment_invalidated_attempt: none
external_mutations: none
```

```yaml
evidence_id: EV-UA-W8-S-004
timestamp: 2026-09-03T17:29:00+05:30
phase: leaf-execution
subwindow_id: UA-W8-S004
assignment_id: ASG-UA-W8-01-S004
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
type: FILE
file_operation: MODIFY
writable_file: frontend/app/globals.css
actor: UA-W8-WINDOW-AGENT
role: window agent (execute-then-review, DEC-UA-015)
predecessor_reference: UA-W8-S004 §9; S001–S003 accepted (ending digests 21a17799…/a646f657…/643c3568…)
starting_file_digest: b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
transformation_applied:
  order: [H1, H2, H3]
  h1: `.results-table tbody > tr:not(.detail-row) > td` — replace `height: 3.25rem;` with `min-height: 56px;`, keeping `padding: 0.375rem 0.625rem;`
  h2: first `.lead-expansion-shell` (width/min-width block) — replace `padding: 2px;` with `padding: var(--space-5);`, keeping the rest of the block
  h3: second `.lead-expansion-shell` — replace leading `padding: 0;` with `padding: var(--space-5);`, keeping `border: 0;`/`border-radius: 0;`/`background: transparent;`/`box-shadow: none;`
  anchors_verified: H1 count == 1, H2 count == 1, H3 count == 1, each named OLD fence byte-exact before replacement
checks:
  V-A: S003 ending digest 643c3568… (recomputed equal); frontend porcelain == the two §3 protected paths + the three prior ` M` planned implementation paths; coordination root clean; starting digest b5c79578… — PASS
  V-B: each of the three named OLD fences count == 1; 3 hunks applied — PASS
  V-C: numstat 3 3; full git diff == exactly H1, H2, H3 hunks, no other hunk or selector change — PASS
  V-D: 9 assertions all true ("min-height: 56px;" 1; "height: 3.25rem;" 0; "padding: var(--space-5);" 3 (two .lead-expansion-shell rules @2341/7514 + pre-existing unrelated rule @6066); "padding: 2px;" 0; ".lead-expansion-shell" 2; ".results-table .store-column" 1; ".results-table .toggle-column" 1; "width: 28%;" 1; "width: 7%;" 1) — PASS
  V-E: ending digest f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c (matches S1 pin §9.4 / parent consequence 4); attributable delta == the four ` M` planned implementation paths exactly; protected paths unchanged — PASS
  DEF: N/A (deferred to UA-W8-I001 G1–G9)
ending_file_digest: f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c
numstat: 3 3
completion_checklist:
  P1: PASS (revisions, identity ASG-UA-W8-01-S004, writable file, baseline digest, predecessor evidence EV-UA-W8-S-001/002/003 all match)
  P2: PASS (starting repository status and protected dirty changes match baseline)
  T1: PASS (all three ordered hunks applied, no other edit)
  V1: PASS (V-A..V-E run; activation witnesses and exact assertions recorded above)
  V2: PASS (attributable changed-file set == {frontend/app/leads/page.tsx, frontend/components/leads/live-leads-workspace.tsx, frontend/components/run-workspace.tsx, frontend/app/globals.css})
  V3: PASS (required local coverage IDs = {} = registered = executed; W8 coverage executes in S005)
  H1: PASS (diff, ending digest, commands, outcomes, residual integration obligations above)
  H2: PASS (no prohibited action, second-file edit, successor work, external mutation, or parent communication)
  H3: PASS (AWAITING_WINDOW_REVIEW is the FILE H3 certificate field, not a parent stop; U-W8-WINDOW-AGENT continues to S005 in this same turn)
covered_cases: []
registered_this_subwindow: []
executed_this_subwindow: []
skipped: []
residual_obligations: [UA-W8-I001 G1–G9; S005 CASE-UA-W8-003 oracles consume this file's post-state and preserved CSS.]
evidence_chain: S3 EV-UA-W8-X-001 → EV-UA-W8-S-001 → EV-UA-W8-S-002 → EV-UA-W8-S-003 → EV-UA-W8-S-004 → (next EV-UA-W8-S-005)
sandbox_privilege: none
environment_invalidated_attempt: none
external_mutations: none
```

```yaml
evidence_id: EV-UA-W8-S-005
timestamp: 2026-09-03T17:30:00+05:30
phase: leaf-execution
subwindow_id: UA-W8-S005
assignment_id: ASG-UA-W8-01-S005
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
type: FILE
file_operation: CREATE
writable_file: frontend/test/uphunt-aesthetic-w8.test.ts
actor: UA-W8-WINDOW-AGENT
role: window agent (execute-then-review, DEC-UA-015)
predecessor_reference: UA-W8-S005 §10; S001–S004 accepted (ending digests 21a17799…/a646f657…/643c3568…/f1a7e45a…)
starting_file_digest: ABSENT
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
transformation_applied:
  create: frontend/test/uphunt-aesthetic-w8.test.ts with exactly the §10.3 bytes (three tests CASE-UA-W8-001/002/003, each calling recordExecuted after its assertions; no extra test, no skip/filter, no full-set-equality assertion)
  resulting_digest: cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0
checks:
  V-A: S004 ending digest f1a7e45a… (recomputed equal); S001/S002/S003 ending digests 21a17799…/a646f657…/643c3568… (recomputed equal); w8 test file ABSENT pre-write; frontend porcelain == two §3 protected paths + the four ` M` planned implementation paths; coordination root clean; .ua-executed.json digest 0aab3c59… — PASS
  V-B: sha256sum test/uphunt-aesthetic-w8.test.ts == cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0 (matches §10.3 pin) — PASS
  V-C: disposable in-memory negative probes N1–N5 previously falsified (S3 EV-UA-W8-D-002); I001 G8 re-executes them fresh — PASS (authoring evidence recorded)
  V-D: from ABSENT executed-set state — `mv test/.ua-executed.json /tmp/opencode/ua-w8-ua-executed-head-backup.json`; ran `node --experimental-strip-types --test test/uphunt-aesthetic-w8.test.ts`: exit 0, tests 5, pass 5, fail 0, skipped 0, titles exactly CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003; generated json == exactly those 5 sorted IDs, set digest 703c8441470da81b31c474099b78e2cd38b4e2c1c79756e3e0d9d63d14bfc8c7 (parent consequence 6); restored backup, re-sha256 == 0aab3c59… and porcelain shows test/.ua-executed.json unmodified — PASS
  V-E: porcelain == `?? test/uphunt-aesthetic-w8.test.ts` added to the four ` M` implementation paths; no other path — PASS
  DEF: N/A (deferred to UA-W8-I001 G1–G9)
ending_file_digest: cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0
completion_checklist:
  P1: PASS (revisions, identity ASG-UA-W8-01-S005, writable file, baseline digest ABSENT, predecessor evidence EV-UA-W8-S-001..004 all match)
  P2: PASS (starting repository status and protected dirty changes match baseline)
  T1: PASS (file created with exactly the §10.3 bytes, no other edit)
  V1: PASS (V-A..V-E run; activation witnesses and exact assertions recorded above)
  V2: PASS (attributable changed-file set == the five planned files; .ua-executed.json restored and unmodified)
  V3: PASS (registered = executed = {CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003} ∪ {CASE-UA-W1-001, CASE-UA-W1-002} imported from the coverage file; zero skips)
  H1: PASS (diff, ending digest, commands, outcomes, residual integration obligations above)
  H2: PASS (no prohibited action, additional-file edit, successor work, external mutation, or parent communication)
  H3: PASS (AWAITING_WINDOW_REVIEW is the FILE H3 certificate field, not a parent stop; U-W8-WINDOW-AGENT now runs UA-W8-I001 in this same turn)
covered_cases: [CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003]
registered_this_subwindow: [CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003]
executed_this_subwindow: [CASE-UA-W8-001, CASE-UA-W8-002, CASE-UA-W8-003]
skipped: []
residual_obligations: [UA-W8-I001 G1–G9]
evidence_chain: S3 EV-UA-W8-X-001 → EV-UA-W8-S-001 → EV-UA-W8-S-002 → EV-UA-W8-S-003 → EV-UA-W8-S-004 → EV-UA-W8-S-005 → (next EV-UA-W8-I-001)
sandbox_privilege: none
environment_invalidated_attempt: none
external_mutations: none
```

```yaml
certificate: INTEGRATION-ASSESSMENT-EXECUTED
integration_assessment_id: UA-W8-I001
parent_window_id: UA-W8
parent_assignment_id: ASG-UA-W8-01
assigned_agent: UA-W8-WINDOW-AGENT (personally executed, never delegated)
timestamp: 2026-09-03T17:55:00+05:30
accepted_initial_subwindows: [UA-W8-S001, UA-W8-S002, UA-W8-S003, UA-W8-S004, UA-W8-S005]
predecessors: [UA-W8-S001, UA-W8-S002, UA-W8-S003, UA-W8-S004, UA-W8-S005]
expected_changed_file_set:
  - frontend/app/leads/page.tsx
  - frontend/components/leads/live-leads-workspace.tsx
  - frontend/components/run-workspace.tsx
  - frontend/app/globals.css
  - frontend/test/uphunt-aesthetic-w8.test.ts
ending_file_digests:
  frontend/app/leads/page.tsx: 21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b
  frontend/components/leads/live-leads-workspace.tsx: a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36
  frontend/components/run-workspace.tsx: 643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3
  frontend/app/globals.css: f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c
  frontend/test/uphunt-aesthetic-w8.test.ts: cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0
planned_set_digest: 88a8fc3280241ce819c353c1160d37d48e61f56def1cf726180059d9f64cd9e0
required_case_count: 3
registered_case_count: 3
executed_case_count: 3 (window-local; 2 × CASE-UA-W1 + 17 predecessor IDs additionally re-executed in the full run)
required_case_set_digest: fb88fd2a8409b4a7527585e36e0868c833b72fa5ee0bb9785747df7babd3e8cc
post_g1_executed_set_digest: 9da0dc92b33e9eec059c774d2591cd1a1120a77f70110c94312f57f0ec7904fd (22 IDs)
gates:
  G1: PASS (npm test 184 tests / 181 pass / 3 fail; failing titles subset of the DEC-UA-016 heading-oracle set; CASE-UA-W8-001/002/003 pass)
  G2: PASS (tsc 13 physical lines, 0 owned-path needles, 10 parked SRC-UA-0092 diagnostics)
  G3: PASS (npm run lint exit 0, 0 errors)
  G4: PASS (8 PNGs exact 390/768/1280/1440 × 900 under review-evidence/uphunt-aesthetic/UA-W8/; routes {/leads, /design-fixture?scenario=completed} only)
  G5: PASS (.ua-executed.json == exactly 22 sorted IDs, digest 9da0dc92…)
  G6: PASS (24 byte pins match; forbidden-path search 0 hits; implementation delta == 5 planned files + coordination/browser/runtime artifacts)
  G7: PASS (0 network ops, 0 DB ops)
  G8: PASS (N1–N5 all falsified on fresh in-memory copies)
  G9: PASS (no UA-W9 artifacts; A5 current_window UA-W8; next_window UA-W9 untouched; may_start_successor false)
browser_evidence:
  directory: frontend/review-evidence/uphunt-aesthetic/UA-W8/
  files: [leads-390.png, leads-768.png, leads-1280.png, leads-1440.png, completed-390.png, completed-768.png, completed-1280.png, completed-1440.png]
  routes: [/leads, /design-fixture?scenario=completed]
  sizes: 390×900, 768×900, 1280×900, 1440×900
sandbox_recoveries: []
races_observed: []
status: READY_FOR_PARENT_REVIEW
handoff_written: frontend/review-evidence/uphunt-aesthetic/UA-W8_HANDOFF.md
successor_started: false
external_mutations: frontend/docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml (current_status set to AWAITING_REVIEW — the sole authorized post-I001 handoff action)
nothing_about_ua_w9: true
```
