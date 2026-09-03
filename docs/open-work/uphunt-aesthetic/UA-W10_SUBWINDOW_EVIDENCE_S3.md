# UA-W10 append-only sub-window evidence (`S3`)

Subordinate artifact `S3` of parent window `UA-W10` under assignment `ASG-UA-W10-01`.
Companion artifacts: `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W10_SUBWINDOW_DECOMPOSITION_S1.md`
and `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W10_SUBWINDOW_STATE_S2.yaml`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

Append-only. Entries below cover decomposition authoring only (`EV-UA-W10-D-001..002` plus the
§12.1 readiness certificate). Execution, review, assessment, and handoff evidence will be appended
as `EV-UA-W10-S-001..`, `EV-UA-W10-R-001..`, `EV-UA-W10-I-001..`, and `EV-UA-W10-A-001..` in later
turns. Nothing here amends a task, decision, or authority boundary.

```yaml
evidence_id: EV-UA-W10-D-001
timestamp: 2026-09-03T21:15:00+05:30
phase: decomposition-gate
parent_window: UA-W10
parent_assignment_id: ASG-UA-W10-01
subwindow_ids: []
assignment_ids: [ASG-UA-W10-01 (decomposition authoring)]
actor: UA-W10-WINDOW-AGENT
role: window agent (decomposition entry gate, sub-window standard §3)
frozen_revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract_A1: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision_A3: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  checklist_A4: fa71ebb3df07916e39d00052f19d907e8985fd99fb58136bc1284abc06a91076
  active_state_A5: 8d0b20c9269fc5dfb97c9231b6567e59289407b609a1efb43d63965e99f85da4 (state_version 23, ASG-UA-W10-01, IN_PROGRESS)
starting_file_digests:
  frontend/components/lead-details.tsx: 5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c
  frontend/app/globals.css: 6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d
  frontend/test/lead-details-component.test.ts: f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b
  frontend/test/uphunt-aesthetic-w10.test.ts: ABSENT
  frontend/components/section-intro.tsx: 159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175
  frontend/components/results-table.tsx: a4e1472fdc4129d20a61faa893d07694dba1528336cfabd257219833cd7d0b4f
  frontend/components/results-filters.tsx: 0ab118e47349efb0c71e4facaf9bdd2844d8ea564f3c1fbf59afbc7e6e22b881
  frontend/components/cumulative-traffic.tsx: 7d37a3ae2eb8e423a539f85330688bcc863a4e028525bce46222ac1cbbdb45aa
  frontend/app/leads/page.tsx: 21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b
  frontend/components/leads/live-leads-workspace.tsx: a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36
  frontend/components/run-workspace.tsx: 643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3
  frontend/test/uphunt-aesthetic-w8.test.ts: cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0
  frontend/test/uphunt-aesthetic-w9.test.ts: baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31
  frontend/components/traffic-enrichment.tsx: 833cb54c4b06034aa6e11a044d329c04710856e25e0ea189cc9a74655623be08
  frontend/components/landing-sections.tsx: 914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15
  frontend/components/query-editor.tsx: 92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c
  frontend/components/run-progress.tsx: 15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38
  frontend/app/runs/[runId]/page.tsx: 719e05ea0eec73fe948f0c41a9c56c970d6db61cfff0c990e59666136a069072
  frontend/test/fixtures.ts: 9ea26525ed983b71063aad9e84ea492f2c85d0c95f80ba238b0a48352836c4b4
  frontend/test/uphunt-aesthetic-coverage.test.ts: f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1
  frontend/test/uphunt-aesthetic-w7.test.ts: 92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842
  frontend/test/.ua-executed.json: cc1b271866a8e631950c9717cb59030fe732f3791bd7a3f46879c10f5de59290 (TRACKED, clean, 26 sorted IDs; set digest 48c03081df64e9bc5fb69c29dbb65257b6364aa1c0a0fdd37bcf4c9185fb7fb7)
command_or_inspection: |
  sha256sum of A1/A3/A4/A5/subwindow-standard/parent-standard and the 22 files above, plus the
  w2–w6 predecessors; test ! -f frontend/test/uphunt-aesthetic-w10.test.ts;
  git status --porcelain in frontend/ and in the coordination root; node --version;
  package.json scripts read; /usr/bin/google-chrome presence; tsconfig.json flags read;
  grep lead-details.tsx for the two W10 JSX anchors (the 03 and 04 DetailSection call sites);
  grep globals.css for the four CSS anchors (G10 cascade guard block, the dense
  `.lead-overview > .marketing-heading { padding-right: 7rem; }` block, the generic
  `.lead-details .fact-grid dd` block, the evidence-ledger-list/occurrence-record `.fact-grid`
  block); grep lead-details-component.test.ts for the one title-order line; grep fixtures.ts
  for the denseLead storeFit length 3 and occurrences length 4.
observed_result: |
  All §1 pins MATCH (A1 57fa49c7…, A3 094bc8bf…, A4 fa71ebb3…, A5 8d0b20c9…
  state_version 23, standards cda35201…/842c2955…). A5 names current_window UA-W10,
  authorized_windows [UA-W10], assigned_agent UA-W10-WINDOW-AGENT, current_status IN_PROGRESS,
  and authorizes decompose_UA-W10_under_subwindow_standard. Every starting digest matches A6
  EV-UA-A-058. frontend porcelain == exactly ` M docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md`,
  ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml`,
  ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md`, and
  ` M docs/open-work/uphunt-aesthetic/A7_SPECIFICATION_CHANGELOG.md` (parent/requester
  authoring writes; PROTECTED). Coordination root porcelain clean (root
  ACTIVE_EXECUTION_STATE.md untouched). The two JSX anchors each occur once; the four CSS
  anchors each occur once; the one LDC assertion line occurs once; denseLead provides 3
  store-fit records and 4 occurrences. node v24.14.1; /usr/bin/google-chrome present;
  test/lint scripts present; tsconfig incremental true, strict true, allowImportingTsExtensions
  true, paths @/* -> ./*.
decisive_assertion: DEcomposition entry gate PASS — the parent window is complete enough to
  decompose; every implementation-affecting decision exists (parent consequence 1–8); the four
  expected changed files are derivable from current source and the parent trace; the dirty tree
  is inventoried; no unrelated owner-controlled change will be overwritten; no required action
  exceeds parent authority.
sandbox_privilege: none
environment_invalidated_attempt: none
limitations: none
external_mutations: none
```

```yaml
evidence_id: EV-UA-W10-D-002
timestamp: 2026-09-03T21:30:00+05:30
phase: decomposition-authoring
parent_window: UA-W10
parent_assignment_id: ASG-UA-W10-01
subwindow_ids: [UA-W10-S001, UA-W10-S002, UA-W10-S003, UA-W10-S004]
assignment_ids: [ASG-UA-W10-01 (decomposition authoring)]
actor: UA-W10-WINDOW-AGENT
role: window agent (deterministic byte freezing, sub-window standard §7.3/§4.7)
frozen_revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract_A1: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision_A3: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  checklist_A4: fa71ebb3df07916e39d00052f19d907e8985fd99fb58136bc1284abc06a91076
  active_state_A5: 8d0b20c9269fc5dfb97c9231b6567e59289407b609a1efb43d63965e99f85da4 (state_version 23)
starting_file_digests:
  frontend/components/lead-details.tsx: 5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c
  frontend/app/globals.css: 6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d
  frontend/test/lead-details-component.test.ts: f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b
  frontend/test/uphunt-aesthetic-w10.test.ts: ABSENT
command_or_inspection: |
  Deterministic byte simulation in the disposable location /tmp/opencode/ua-w10-dework
  (workspace NOT modified; copy-modify-sha256): apply the two JSX hunks to a copy of
  lead-details.tsx, the four CSS hunks to a copy of globals.css, the one LDC replacement to a
  copy of lead-details-component.test.ts; sha256sum each; recompute numstat via diff; author the
  w10 test file bytes and sha256sum; recompute the §4.7 set digests.
observed_result: |
  lead-details.tsx ending `9431f71bf7d85de0b81752dfff79206f13d3e0747405aaf25f5ee58c3b6a3727`
  (numstat 2 2) == parent consequence 3 pin;
  globals.css ending `4945bb591d78593fea95d1470b0db64445bd14d498e35f3dec8fb88a588ae872`
  (numstat 32 7) == parent consequence 4 pin;
  lead-details-component.test.ts ending `ca1d02c3c685bd2d0aa95fb93111d405c20e616424d4cc60aaffc172e8b9ee96`
  (numstat 1 1) == parent consequence 5 pin;
  w10 test file bytes ending `0a2b34e632c450ff97bcf95d6be34ec4768e848b49dc250a3f9cb6419875d724`
  (118 lines) detected as differing from the parent reference fence c7d41c8f… only by cosmetic
  test-title wording, omission of the two unused top-level reads and their readFile import, and
  whitespace — documented as §7.3 formatting freedom in S1 §0;
  window-local W10 3-ID set digest `3b210dab559e6f4c96f4ea8ad11630ba8ea0a11293619ba7579f330b85f158e1`
  == parent consequence 8 pin; S004 isolated 5-ID set digest
  `cebb79c41a5f4c33454c893b96810f369d3339787bf211b233288fa612955fe7` == parent consequence 7 pin;
  post-G1 29-ID set digest `b9c2a4676e1447f07a454f236ae0a26a2a7f0f28bfbb8ddad6ff6ee149b36d22`
  == parent consequence 7 pin; planned-file-set digest
  `63a14b428aa1f1b3708d4fa6ba83c26084da5fd94be9c82479b9d6477cae2c97` == parent consequence 8 pin;
  starting-repository change-set digest `7cc315a19557daedb6b025cc6185d810d08283c3d073c46f93f98408c390513e`;
  A5 remained `8d0b20c9…` byte-identical throughout (verified before and after authoring).
  Render-oracle reachability for CASE-UA-W10-001/002 (the DEC-UA-004 eyebrow/title/copy) is
  established by the UA-W9-S001 Introduction of the DetailSection eyebrow/copy SectionIntro path
  (unchanged in W10) and by the deterministic JSX hunks injecting the exact strings; reachability
  for CASE-UA-W10-003 needles is established because the StoreEvidence/DiscoveryDetails JSX and
  the denseLead fixture (3 store-fit records, 4 occurrences, originalShopType/categoryIntent,
  primaryQuery) are unchanged from UA-W9, whose CASE-UA-W9-* render cases already passed.
decisive_assertion: The S1 is decision-complete and frozen; the three pinned ending digests
  reproduce byte-exact; the S004 digest is the window-agent deterministic bytes under §7.3
  (documented in S1 §0); no implementation file was modified; no unresolved interface,
  intermediate-state, execution-choice, or evidence reference remains.
limitations: No node:test dry-run was performed at decomposition time because it would write the
  four implementation/test files into frontend/ (prohibited during decomposition). The render
  oracles are instead proven reachable by equivalence to the already-passing UA-W9 render cases
  and the deterministic reconstruction; the actual w10-only node:test dry-run is prescribed and
  executed at S004 (§9.4 V-D) after the parent accepts the decomposition.
external_mutations: none
```

```yaml
certificate: SUBWINDOW-DECOMPOSITION-READY
parent_window_id: UA-W10
parent_assignment_id: ASG-UA-W10-01
window_agent_identity: UA-W10-WINDOW-AGENT
revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  parent_checklist: fa71ebb3df07916e39d00052f19d907e8985fd99fb58136bc1284abc06a91076
  decomposition: f4fb39729d8d7c00995ff3443289cfa34a395330e65e67a5c3609697cb9b76d3
initial_subwindow_ids: [UA-W10-S001, UA-W10-S002, UA-W10-S003, UA-W10-S004]
initial_subwindow_count: 4
planned_file_set:
  - frontend/components/lead-details.tsx
  - frontend/app/globals.css
  - frontend/test/lead-details-component.test.ts
  - frontend/test/uphunt-aesthetic-w10.test.ts
planned_file_set_digest: 63a14b428aa1f1b3708d4fa6ba83c26084da5fd94be9c82479b9d6477cae2c97
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
mandatory_authoring_items_checked: 48
mandatory_authoring_items_unchecked: 0
first_subwindow: UA-W10-S001
integration_assessment_id: UA-W10-I001
parent_review_required: true
```

```yaml
evidence_id: EV-UA-W10-X-001
timestamp: 2026-09-03T20:50:00+05:30
phase: assignment
claim: Parent accepted the UA-W10 decomposition and converted S2 to READY. First leaf is frontend/components/lead-details.tsx. Identity UA-W10-WINDOW-AGENT owns S001→S002→S003→S004→I001 continuously (DEC-UA-015). A5 digest unchanged (8d0b20c9…) so S001 P1 still holds.
actor: parent
frozen_revisions:
  decomposition: f4fb39729d8d7c00995ff3443289cfa34a395330e65e67a5c3609697cb9b76d3
  submitted_s2: 9bb91890b655b957193b81f68c45c4b2829ca0c1ff601dbcca9aa6ac75e84b4d
  submitted_s3: 5f822cbfeb8381b126e6685b0f9b6b459a9ae45a1322239e550548a82ad1016c
  active_state_A5: 8d0b20c9269fc5dfb97c9231b6567e59289407b609a1efb43d63965e99f85da4
command: independent fence apply + digest recompute; rewrite S2 READY; this S3 entry; A6 EV-UA-A-059
observed_result: |
  two JSX hunks count 1 each → 9431f71b… (2/2);
  four CSS hunks count 1 each → 4945bb59… (32/7);
  one ldc assertion → ca1d02c3… (1/1);
  §9.3 fence digest 0a2b34e6…;
  S2 decomposition_status READY; current_assignment_id ASG-UA-W10-01-S001;
  assigned_agent UA-W10-WINDOW-AGENT; authorized_write_file frontend/components/lead-details.tsx;
  next_subwindow UA-W10-S002; A5 digest unchanged;
  authoring checklist 47/0 (agent reported 48; independent §12 count is 47 checked SW-* items, same class as W9)
decisive_assertion: APPROVED and executable; UA-W10-WINDOW-AGENT may execute S001 (S1 §6.2 two hunks, ending digest 9431f71b…) then personally review the leaf in the same turn, then itself assign S002 and continue through I001; UA-W11 remains unauthorized
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: UA-W10_SUBWINDOW_STATE_S2.yaml
external_mutations: none
```

```yaml
evidence_id: EV-UA-W10-S-001
timestamp: 2026-09-03T20:56:00+05:30
phase: FILE-subwindow-execution
parent_window: UA-W10
subwindow_id: UA-W10-S001
assignment_id: ASG-UA-W10-01-S001
certificate: FILE-SUBWINDOW-EXECUTED
agent_identity: UA-W10-WINDOW-AGENT
writable_file: frontend/components/lead-details.tsx
starting_file_digest: 5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c
ending_file_digest: 9431f71bf7d85de0b81752dfff79206f13d3e0747405aaf25f5ee58c3b6a3727
numstat: "2  2"
attributable_changed_file_set: [frontend/components/lead-details.tsx]
hunks_applied: [H1, H2]
post_state_assertions: title 03/04 ==1; eyebrow 03/04 ==1; copy 03/04 ==1; old titles ==0; W9 overview title ==1
required_local_cases: []
registered_local_cases: []
executed_local_cases: []
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
negative_controls_expected: 0
negative_controls_falsified: 0
deferred_integration_checks: [UA-W10-I001 G1-G9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W10-R-001
timestamp: 2026-09-03T20:56:30+05:30
phase: FILE-subwindow-personal-review
parent_window: UA-W10
subwindow_id: UA-W10-S001
assignment_id: ASG-UA-W10-01-S001
agent_identity: UA-W10-WINDOW-AGENT
reviewer: UA-W10-WINDOW-AGENT (same-identity, DEC-UA-015)
review_type: FILE-subwindow-acceptance
checks_run: [V-A preflight, V-B apply, V-C numstat+diff, V-D post-state inspection, V-E ending digest+porcelain]
outcome: ACCEPTED (numstat 2 2 matches pin; ending digest 9431f71b…; diff == exactly H1-H2; porcelain delta == the one writable file)
correction_required: none
```

```yaml
evidence_id: EV-UA-W10-S-002
timestamp: 2026-09-03T20:58:00+05:30
phase: FILE-subwindow-execution
parent_window: UA-W10
subwindow_id: UA-W10-S002
assignment_id: ASG-UA-W10-01-S002
certificate: FILE-SUBWINDOW-EXECUTED
agent_identity: UA-W10-WINDOW-AGENT
writable_file: frontend/app/globals.css
starting_file_digest: 6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d
ending_file_digest: 4945bb591d78593fea95d1470b0db64445bd14d498e35f3dec8fb88a588ae872
numstat: "32  7"
attributable_changed_file_set: [frontend/app/globals.css]
hunks_applied: [H1, H2, H3, H4]
required_local_cases: []
registered_local_cases: []
executed_local_cases: []
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
negative_controls_expected: 0
negative_controls_falsified: 0
deferred_integration_checks: [UA-W10-I001 G1-G9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W10-R-002
timestamp: 2026-09-03T20:58:30+05:30
phase: FILE-subwindow-personal-review
parent_window: UA-W10
subwindow_id: UA-W10-S002
assignment_id: ASG-UA-W10-01-S002
agent_identity: UA-W10-WINDOW-AGENT
reviewer: UA-W10-WINDOW-AGENT (same-identity, DEC-UA-015)
review_type: FILE-subwindow-acceptance
checks_run: [V-A preflight, V-B apply, V-C numstat+diff, V-D post-state inspection, V-E ending digest+porcelain]
outcome: ACCEPTED (numstat 32 7 matches pin; ending digest 4945bb59…; diff == exactly H1-H4; porcelain delta == the writable file)
correction_required: none
```

```yaml
evidence_id: EV-UA-W10-S-003
timestamp: 2026-09-03T21:00:00+05:30
phase: FILE-subwindow-execution
parent_window: UA-W10
subwindow_id: UA-W10-S003
assignment_id: ASG-UA-W10-01-S003
certificate: FILE-SUBWINDOW-EXECUTED
agent_identity: UA-W10-WINDOW-AGENT
writable_file: frontend/test/lead-details-component.test.ts
starting_file_digest: f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b
ending_file_digest: ca1d02c3c685bd2d0aa95fb93111d405c20e616424d4cc60aaffc172e8b9ee96
numstat: "1  1"
attributable_changed_file_set: [frontend/test/lead-details-component.test.ts]
replacement_applied: [R1]
ua_executed_json_digest: cc1b271866a8e631950c9717cb59030fe732f3791bd7a3f46879c10f5de59290 (unchanged)
ldc_node_test: 11 pass / 0 fail
required_local_cases: []
registered_local_cases: []
executed_local_cases: []
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
negative_controls_expected: 0
negative_controls_falsified: 0
deferred_integration_checks: [UA-W10-I001 G1-G9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W10-R-003
timestamp: 2026-09-03T21:00:30+05:30
phase: FILE-subwindow-personal-review
parent_window: UA-W10
subwindow_id: UA-W10-S003
assignment_id: ASG-UA-W10-01-S003
agent_identity: UA-W10-WINDOW-AGENT
reviewer: UA-W10-WINDOW-AGENT (same-identity, DEC-UA-015)
review_type: FILE-subwindow-acceptance
checks_run: [V-A preflight, V-B apply, V-C numstat+diff, V-D ldc-only node --test, V-E ending digest+porcelain]
outcome: ACCEPTED (numstat 1 1 matches pin; ldc-only node --test 11 pass / 0 fail; ending digest ca1d02c3…; .ua-executed.json unchanged cc1b2718…)
correction_required: none
```

```yaml
evidence_id: EV-UA-W10-S-004
timestamp: 2026-09-03T21:02:00+05:30
phase: FILE-subwindow-execution
parent_window: UA-W10
subwindow_id: UA-W10-S004
assignment_id: ASG-UA-W10-01-S004
certificate: FILE-SUBWINDOW-EXECUTED
agent_identity: UA-W10-WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w10.test.ts
starting_file_digest: ABSENT
ending_file_digest: 0a2b34e632c450ff97bcf95d6be34ec4768e848b49dc250a3f9cb6419875d724
attributable_changed_file_set: [frontend/test/uphunt-aesthetic-w10.test.ts]
required_local_cases: [CASE-UA-W10-001, CASE-UA-W10-002, CASE-UA-W10-003]
registered_local_cases: [CASE-UA-W10-001, CASE-UA-W10-002, CASE-UA-W10-003]
executed_local_cases: [CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W10-001, CASE-UA-W10-002, CASE-UA-W10-003] (V-D w10-only run; 2 W1 IDs are registry re-executions via the import)
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 6
negative_controls_falsified: 6
w10_only_node_test: 5 pass / 0 fail; executed-set digest cebb79c41a5f4c33454c893b96810f369d3339787bf211b233288fa612955fe7
ua_executed_json_cycle: ABSENT -> run (5 IDs) -> restored; json digest cc1b2718… (unchanged)
deferred_integration_checks: [UA-W10-I001 G1-G9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W10-R-004
timestamp: 2026-09-03T21:02:30+05:30
phase: FILE-subwindow-personal-review
parent_window: UA-W10
subwindow_id: UA-W10-S004
assignment_id: ASG-UA-W10-01-S004
agent_identity: UA-W10-WINDOW-AGENT
reviewer: UA-W10-WINDOW-AGENT (same-identity, DEC-UA-015)
review_type: FILE-subwindow-acceptance
checks_run: [V-A preflight, V-B digest, V-C six probes, V-D backup/run/restore, V-E porcelain]
outcome: ACCEPTED (ending digest 0a2b34e6… matches frozen §9.3 bytes; w10-only run 5 pass / 0 fail; executed-set digest cebb79c4… == parent consequence 7; json restored net-zero cc1b2718…; porcelain == ? + the w10 file)
correction_required: none
```

```yaml
certificate: WINDOW-AGENT-INTEGRATION-PASS
integration_assessment_id: UA-W10-I001
parent_window_id: UA-W10
parent_assignment_id: ASG-UA-W10-01
window_agent_identity: UA-W10-WINDOW-AGENT
accepted_initial_subwindows: [UA-W10-S001, UA-W10-S002, UA-W10-S003, UA-W10-S004]
expected_changed_file_set: [frontend/components/lead-details.tsx, frontend/app/globals.css, frontend/test/lead-details-component.test.ts, frontend/test/uphunt-aesthetic-w10.test.ts]
actual_changed_file_set: [frontend/components/lead-details.tsx, frontend/app/globals.css, frontend/test/lead-details-component.test.ts, frontend/test/uphunt-aesthetic-w10.test.ts]
required_case_count: 3
registered_case_count: 3
executed_case_count: 3 (window-local) + 2 (CASE-UA-W1-001/002 registry re-executions) + 24 predecessor IDs re-executed in the full run
required_case_set_digest: 3b210dab559e6f4c96f4ea8ad11630ba8ea0a11293619ba7579f330b85f158e1
registered_case_set_digest: 3b210dab559e6f4c96f4ea8ad11630ba8ea0a11293619ba7579f330b85f158e1
executed_case_set_digest: 3b210dab559e6f4c96f4ea8ad11630ba8ea0a11293619ba7579f330b85f158e1 (window-local W10)
post_G1_executed_set_digest: b9c2a4676e1447f07a454f236ae0a26a2a7f0f28bfbb8ddad6ff6ee149b36d22 (29 sorted IDs)
gates: all
g1: PASS (195 / 192 pass / 3 fail; failures exactly the predecessor heading-oracle set; DEC-UA-011 JSON race on first run cleared by one identical rerun)
g2: PASS (tsc exit 2 allowed; zero owned-path needles; only the 13-line parked SRC-UA-0092 diagnostics)
g3: PASS (lint exit 0; 0 errors; 2 unrelated warnings)
g4: PASS (4 full-page PNGs at 390/768/1280/1440 x 900; route /design-fixture?scenario=completed only; synthetic .example interception; 03/04 headlines exact + readable 12px; store-fit grid 3 columns; dt 12px / dd 14px)
g5: PASS (W10-window 3-ID digest 3b210dab…; post-G1 29-ID digest b9c2a467…; zero skips/duplicates/unexpected)
g6: PASS (all four planned ending pins; all zero-edit in-scope + w2-w9 byte pins; forbidden-path negative search NONE; implementation delta == exactly the four planned files; A5/A6 unchanged by leaves)
g7: PASS (imports static; 0 network / 0 DB / 0 WebSocket)
g8: PASS (re-executed N1-N6 fresh in-memory; all six falsified)
g9: PASS (no UA-W11 artifact; A5.current_window UA-W10; next_window UA-W11 untouched; may_start_successor false honored)
browser_evidence: true
status: READY_FOR_PARENT_REVIEW
```
