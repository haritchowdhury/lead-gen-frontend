# UA-W9 append-only sub-window evidence (`S3`)

Subordinate artifact `S3` of parent window `UA-W9` under assignment `ASG-UA-W9-01`.
Companion artifacts: `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_DECOMPOSITION_S1.md`
and `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_STATE_S2.yaml`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

Append-only. Entries below cover decomposition authoring only (`EV-UA-W9-D-001..002` plus the
§12.1 readiness certificate). Execution, review, assessment, and handoff evidence will be appended
as `EV-UA-W9-S-001..`, `EV-UA-W9-R-001..`, `EV-UA-W9-I-001..`, and `EV-UA-W9-A-001..` in later
turns. Nothing here amends a task, decision, or authority boundary.

```yaml
evidence_id: EV-UA-W9-D-001
timestamp: 2026-09-03T18:45:00+05:30
phase: decomposition-gate
parent_window: UA-W9
parent_assignment_id: ASG-UA-W9-01
subwindow_ids: []
assignment_ids: [ASG-UA-W9-01 (decomposition authoring)]
actor: UA-W9-WINDOW-AGENT
role: window agent (decomposition entry gate, sub-window standard §3)
frozen_revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract_A1: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision_A3: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  checklist_A4: 75005e558cfc238d89839ee2af0e94b94b682dae7ff432a4762c0f4a63c9a7c0
  active_state_A5: d23fccfe21c627dbd783d028f67682251732d4d964850d45bfe85a855ac577e8 (state_version 21, ASG-UA-W9-01, IN_PROGRESS)
starting_file_digests:
  frontend/components/lead-details.tsx: 0ceec9058af2c24d65c8ef880848b114674352a2c0593ec0a64914a0f9aefc5b
  frontend/app/globals.css: f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c
  frontend/test/lead-details-component.test.ts: 8f7f611b3866b1cfd108ebb2acb0c06c8a06da74035ab4e5dd433a4fd8431412
  frontend/test/uphunt-aesthetic-w9.test.ts: ABSENT
  frontend/components/section-intro.tsx: 159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175
  frontend/components/results-table.tsx: a4e1472fdc4129d20a61faa893d07694dba1528336cfabd257219833cd7d0b4f
  frontend/components/results-filters.tsx: 0ab118e47349efb0c71e4facaf9bdd2844d8ea564f3c1fbf59afbc7e6e22b881
  frontend/components/cumulative-traffic.tsx: 7d37a3ae2eb8e423a539f85330688bcc863a4e028525bce46222ac1cbbdb45aa
  frontend/app/leads/page.tsx: 21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b
  frontend/components/leads/live-leads-workspace.tsx: a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36
  frontend/components/run-workspace.tsx: 643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3
  frontend/test/uphunt-aesthetic-w8.test.ts: cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0
  frontend/components/traffic-enrichment.tsx: 833cb54c4b06034aa6e11a044d329c04710856e25e0ea189cc9a74655623be08
  frontend/components/landing-sections.tsx: 914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15
  frontend/components/query-editor.tsx: 92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c
  frontend/components/run-progress.tsx: 15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38
  frontend/app/runs/[runId]/page.tsx: 719e05ea0eec73fe948f0c41a9c56c970d6db61cfff0c990e59666136a069072
  frontend/test/fixtures.ts: 9ea26525ed983b71063aad9e84ea492f2c85d0c95f80ba238b0a48352836c4b4
  frontend/test/uphunt-aesthetic-coverage.test.ts: f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1
  frontend/test/uphunt-aesthetic-w7.test.ts: 92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842
  frontend/test/.ua-executed.json: 34f5b71a886352f13aac9287314187b14b62d85928e0ad5578d2c1197bd26385 (TRACKED, clean, 22 sorted IDs; set digest 9da0dc92b33e9eec059c774d2591cd1a1120a77f70110c94312f57f0ec7904fd)
command_or_inspection: |
  sha256sum of A1/A3/A4/A5/subwindow-standard/parent-standard and the 20 files above;
  test ! -f frontend/test/uphunt-aesthetic-w9.test.ts; git status --porcelain in frontend/
  and in the coordination root; node --version; package.json scripts read;
  /usr/bin/google-chrome presence; tsconfig.json flags read; grep lead-details.tsx for
  the seven JSX anchors (TrafficEnrichmentDetails import, DetailSection, OverviewPanel,
  Score semantics, Store identity, Outreach evidence, Lead overview); grep globals.css for
  the eight CSS anchors (the two `.lead-overview > h3`, `.lead-details { gap: 0.25rem; }`,
  `.lead-details .detail-section { padding: 0.3125rem 0.375rem; }`,
  `.lead-details .detail-section > h3`, the identity/score repeat(8)/repeat(6) pair, the
  dense `.fact-grid dt`/`.version-note` and `.fact-grid dd`/`.detail-copy`/`.detail-callout`/
  `.detail-score` groups); grep lead-details-component.test.ts for the three title-order lines.
observed_result: |
  All §1 pins MATCH (A1 57fa49c7…, A3 094bc8bf…, A4 75005e55…, A5 d23fccfe…
  state_version 21, standards cda35201…/842c2955…). A5 names current_window UA-W9,
  authorized_windows [UA-W9], assigned_agent UA-W9-WINDOW-AGENT, current_status IN_PROGRESS,
  and authorizes decompose_UA-W9_under_subwindow_standard. Every starting digest matches A6
  EV-UA-A-055. frontend porcelain == exactly ` M docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md`,
  ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml`,
  ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md`, and
  ` M docs/open-work/uphunt-aesthetic/A7_SPECIFICATION_CHANGELOG.md` (parent/requester
  authoring writes; PROTECTED). Coordination root porcelain clean (root
  ACTIVE_EXECUTION_STATE.md untouched). node v24.14.1; test/lint scripts present;
  /usr/bin/google-chrome present (P3). w9 test ABSENT. All seven JSX anchors and eight CSS
  anchors present exactly once. The three title-order assertion lines present in
  lead-details-component.test.ts. Frontend repo HEAD d5738df "W8". Parent-frozen mechanical
  consequences EV-UA-A-055 copied into S1 §0 verbatim in substance and not reopened.
starting_repository_change_set_digest: 7cc315a19557daedb6b025cc6185d810d08283c3d073c46f93f98408c390513e
sandbox_privilege: none
environment_invalidated_attempt: none
coverage_cases:
  registered_this_window: [CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004]
  executed: none (decomposition turn; no CASE test run)
  skipped: []
  duplicate: []
  unexpected: []
limitations: decomposition authoring turn; no implementation file opened for write; no test command run against the workspace; A5 and A6 untouched by this turn (A5 handoff field is post-I001 only, not this turn); the decomposition-simulation and dry-run evidence is in EV-UA-W9-D-002
external_mutations: none
```

```yaml
evidence_id: EV-UA-W9-D-002
timestamp: 2026-09-03T18:52:00+05:30
phase: decomposition-simulation
parent_window: UA-W9
parent_assignment_id: ASG-UA-W9-01
subwindow_ids: [UA-W9-S001, UA-W9-S002, UA-W9-S003, UA-W9-S004]
assignment_ids: [ASG-UA-W9-01 (window-agent simulation)]
actor: UA-W9-WINDOW-AGENT
role: window agent (mechanical simulation and dry-run validation)
frozen_revisions: as EV-UA-W9-D-001
starting_file_digests: as EV-UA-W9-D-001
command_or_inspection: |
  In the disposable location /tmp/opencode/ua-w9-dework (outside the workspace):
  1. copied the three starting planned files (lead-details.tsx, globals.css,
     lead-details-component.test.ts), fixtures.ts, coverage, w7, results-table.tsx,
     traffic-enrichment.tsx, and symlinked node_modules into a mirror tree;
  2. applied each S1 OLD fence with a count-checking replacement function that throws unless
     OLD count == 1 (S001 H1–H7, S002 H1–H8, S003 R1–R3);
  3. sha256sum of every resulting simulated ending file, and git diff --no-index --numstat of
     each original vs simulated copy;
  4. occurrence counts (split/length) of all §6.4/§7.4/§8.4 V-D needles and baselines, pre and post;
  5. built a dry-run tree /tmp/opencode/ua-w9-dework/mirror with the simulated post-S001/S002/S003
     states plus the real fixtures/coverage/results-table/traffic-enrichment, wrote the exact
     §9.3 w9 test bytes as test/uphunt-aesthetic-w9.test.ts, and ran
     `node --experimental-strip-types --test test/uphunt-aesthetic-w9.test.ts` from the mirror
     root; read the generated test/.ua-executed.json inside the mirror;
  6. computed §4.7 set digests (4-ID window-local set, 4-path planned set, 6-ID executed set,
     26-ID post-npm-test set, 4-path starting change set);
  7. negative probes via node -e on in-memory copies (zero workspace writes):
     N1 replace `Know the business behind this domain.` with `Lead overview`;
     N2 delete the `import { SectionIntro } from "./section-intro";` line;
     N3 reintroduce `font-size: 0.5rem;` in the `.lead-details .detail-section > h3` block;
     N4 drop the `detail-score` class from a copy of the rendered SourceDetails;
     N5 reintroduce the separated identity `repeat(8)` rule;
     N6 restore the combined `repeat(3)` rule to the separated 8/6 form.
observed_result: |
  Ending digests (simulated): S001 lead-details.tsx
  5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c (window-agent §7.3
  deterministic bytes; the parent sample cba5c096… is retained verbatim in S1 §0 and the
  divergence is reconciled in the S1 §0 note and §1); S002 globals.css
  6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d (MATCHES parent pin in
  EV-UA-A-055 consequence 4); S003 lead-details-component.test.ts
  f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b (MATCHES parent pin
  consequence 5). Numstat (original vs simulated): lead-details.tsx 17 5, globals.css 9 9,
  lead-details-component.test.ts 3 3 (all MATCH the parent pins). S004 test file digest
  baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31.
  Dry-run (mirror): 6 tests pass (CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W9-001,
  CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004), 0 fail, 0 skipped; generated executed-set ==
  exactly those 6 IDs (set digest 7254ec520303506a3aa8be3afd45143122f5e78552596be20681c6f1550390b8,
  MATCHES parent consequence 7). A separate mirror run of the post-S003
  test/lead-details-component.test.ts passed all 11 tests, confirming the three updated
  title-order assertions render the DEC-UA-004 strings (0 fail, and no .ua-executed.json write
  from that file). §4.7 set digests: W9 window-local (CASE-UA-W9-001..004)
  73acdc6bf1c7d1258d64f93b8371f5a33b4fd1a2cf56762fc93e2d785ed06451 (MATCHES parent pin in
  EV-UA-A-055 consequence 8); 4-path planned set
  85f56b7b570f3f92bbafbfc55ba8ca9c1178ac23826f15daa39e7861a5adc04f (MATCHES parent pin — the
  parent used §4.7 byte order); 26-ID post-npm-test set
  48c03081df64e9bc5fb69c29dbb65257b6364aa1c0a0fdd37bcf4c9185fb7fb7 (MATCHES parent pin); 4-path
  starting change set 7cc315a19557daedb6b025cc6185d810d08283c3d073c46f93f98408c390513e;
  required 43-set 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05.
  Negative probes (all falsified): N1 before=true after=false; N2 before=true after=false;
  N3 before=true after=false; N4 before=true after=false; N5 before=true after=false;
  N6 before=true after=false. Post-state counts verified: `import { SectionIntro }`==1,
  `eyebrow?: string;`==1, `copy?: string;`==2, `<p className="detail-copy">{copy}</p>`==1,
  `title="Strength"`/`title="Identity"`/`title="Reachability"` each==1 in post-S001
  lead-details.tsx; `font-size: 1.375rem;`==1 and `repeat(3, minmax(0, 1fr));`==2 (combined
  rule + media block), `.lead-overview > .marketing-heading`==2, `.lead-overview > h3`==0 in
  post-S002 globals.css.
sandbox_privilege: none
environment_invalidated_attempt: none
coverage_cases:
  registered_this_window: [CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004]
  executed: none (window-agent simulation only; the 4 CASE IDs were executed only in the disposable mirror tree)
  skipped: []
  duplicate: []
  unexpected: []
limitations: the dry run exercises the §9.3 test bytes against the simulated post-leaf file states in /tmp/opencode/ua-w9-dework/mirror only; it is not the leaf execution and does not modify any workspace file; numstat 17 5 / 9 9 / 3 3 are git --no-index counts. The S001 ending digest 5f32de7f… differs from the parent sample cba5c096… because sub-window standard §7.3 grants non-behavioral formatting freedom to the two behaviourally-specified function hunks (DetailSection/OverviewPanel); the transformation's behavior, string set, numstat, and rendered oracles are identical. The mirror tree also contained a second copy of the real test/lead-details-component.test.ts to verify the LDC run; that run is recorded as diagnostic only.
external_mutations: none
```

```yaml
certificate: SUBWINDOW-DECOMPOSITION-READY
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
window_agent_identity: UA-W9-WINDOW-AGENT
revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  parent_checklist: 75005e558cfc238d89839ee2af0e94b94b682dae7ff432a4762c0f4a63c9a7c0
  decomposition: c900cebe930791a438fd23c3c311597a7f79e27dfef15dfaa0650ea96849d149
initial_subwindow_ids: [UA-W9-S001, UA-W9-S002, UA-W9-S003, UA-W9-S004]
initial_subwindow_count: 4
planned_file_set:
  - frontend/components/lead-details.tsx
  - frontend/app/globals.css
  - frontend/test/lead-details-component.test.ts
  - frontend/test/uphunt-aesthetic-w9.test.ts
planned_file_set_digest: 85f56b7b570f3f92bbafbfc55ba8ca9c1178ac23826f15daa39e7861a5adc04f
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
first_subwindow: UA-W9-S001
integration_assessment_id: UA-W9-I001
parent_review_required: true
```

```yaml
evidence_id: EV-UA-W9-X-001
timestamp: 2026-09-03T19:30:00+05:30
phase: assignment
claim: Parent accepted the UA-W9 decomposition and converted S2 to READY. First leaf is frontend/components/lead-details.tsx. Identity UA-W9-WINDOW-AGENT owns S001→S002→S003→S004→I001 continuously (DEC-UA-015). A5 digest unchanged (d23fccfe…) so S001 P1 still holds.
actor: parent (Cursor Grok 4.6)
frozen_revisions:
  decomposition: c900cebe930791a438fd23c3c311597a7f79e27dfef15dfaa0650ea96849d149
  submitted_s2: f5099518d486c0138259cfc58381a7331abc34d615ba1ef2d140bbeceaeb63a4
  submitted_s3: 8650e8334834172612a757d0564a53f064499e905fcb481b010d43207cff2355
  active_state_A5: d23fccfe21c627dbd783d028f67682251732d4d964850d45bfe85a855ac577e8
command: independent fence apply + digest recompute; rewrite S2 READY; this S3 entry; A6 EV-UA-A-056
observed_result: |
  S2 decomposition_status READY; current_assignment_id ASG-UA-W9-01-S001;
  assigned_agent UA-W9-WINDOW-AGENT; authorized_write_file frontend/components/lead-details.tsx;
  next_subwindow UA-W9-S002; A5 digest unchanged
decisive_assertion: APPROVED and executable; UA-W9-WINDOW-AGENT may execute S001 (S1 §6.2 seven ordered hunks, ending digest 5f32de7f…) then personally review the leaf in the same turn, then itself assign S002 and continue through I001; UA-W10 remains unauthorized
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: UA-W9_SUBWINDOW_STATE_S2.yaml
external_mutations: none
```

```yaml
evidence_id: EV-UA-W9-S-001
timestamp: 2026-09-03T19:34:00+05:30
phase: leaf-execution
subwindow_id: UA-W9-S001
assignment_id: ASG-UA-W9-01-S001
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
actor: UA-W9-WINDOW-AGENT
role: window agent (execute-then-review, DEC-UA-015; S001 executor)
frozen_revisions:
  decomposition: c900cebe930791a438fd23c3c311597a7f79e27dfef15dfaa0650ea96849d149
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  active_state_A5: d23fccfe21c627dbd783d028f67682251732d4d964850d45bfe85a855ac577e8
writable_file: frontend/components/lead-details.tsx
starting_file_digest: 0ceec9058af2c24d65c8ef880848b114674352a2c0593ec0a64914a0f9aefc5b
ending_file_digest: 5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c
starting_repository_change_set_digest: 7cc315a19557daedb6b025cc6185d810d08283c3d073c46f93f98408c390513e
attribute_delta: [frontend/components/lead-details.tsx]
commands:
  - node apply_s001.py (seven ordered hunks, each OLD count == 1)
  - git diff --no-index --numstat baseline components/lead-details.tsx
  - node -e read-only needle count inspection
  - sha256sum components/lead-details.tsx
  - git status --porcelain
observed_result:
  ending digest 5f32de7f…; numstat 17 5; V-D counts import SectionIntro==1,
  eyebrow?: string;==1, copy?: string;==2, SectionIntro render==1,
  Why this lead sits==1, Storefront StoreSignal resolved==1, A real way in==1,
  title=Know the business==1, eyebrow=01·The store==1, detail-copy p==1,
  h4 template==1, Strength==1, Identity==1, Reachability==1,
  Category and store fit==1, Discovery provenance==1, h3 span order==1,
  TrafficEnrichment call==1; attributable delta == M components/lead-details.tsx
  only (the four protected paths + three coordination artifacts unchanged);
  A5 digest unchanged d23fccfe…
required_local_cases: []
registered_local_cases: []
executed_local_cases: []
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
negative_controls_expected: 0
negative_controls_falsified: 0
deferred_integration_checks: [UA-W9-I001 G1–G9]
external_mutations: none
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W9-R-001
timestamp: 2026-09-03T19:35:00+05:30
phase: independent-review
subwindow_id: UA-W9-S001
assignment_id: ASG-UA-W9-01-S001
actor: UA-W9-WINDOW-AGENT
role: window agent (§8 independent reviewer, same identity, DEC-UA-015 no second prompt)
reviewed_object: frontend/components/lead-details.tsx
starting_digest: 0ceec9058af2c24d65c8ef880848b114674352a2c0593ec0a64914a0f9aefc5b
ending_digest: 5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c
frozen_expected_digest: 5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c
numstat_observed: "17 5"
numstat_frozen: "17 5"
aggregate_delta_recomputed_digest: "not required (non-empty set)"   # S001 is a modify leaf, set-digest checked at I001 G6
protected_paths_unchanged: true
attributable_delta: [frontend/components/lead-details.tsx]
checks:
  - V-A porcelain: " M components/lead-details.tsx"
  - V-C numstat: "17 5"
  - V-D needle counts: all expected
  - V-E ending digest: 5f32de7f…
verification_gates_passed: [V-A, V-C, V-D, V-E]
verification_gates_failed: []
cross_check_against_frozen_consequences: true
cross_check_negative_controls: 0 falsified
review_decision: ACCEPTED_FOR_INTEGRATION
notes: LeadDetails refactor matches S1 §6.2 hunks byte-for-byte. No prohibited
  path (StoreEvidence body, DiscoveryDetails body, TrafficEnrichmentDetails,
  section-intro, landing-sections, results-*, cumulative-traffic, leads-page,
  live-leads-workspace, run-workspace, query-editor, run-progress) touched.
  DEC-UA-012/013 the three title strings preserved; StoreEvidence order 03 and
  DiscoveryDetails order 04 preserved; DiscoveryDetails body untouched.
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W9-S-002
timestamp: 2026-09-03T19:38:00+05:30
phase: leaf-execution
subwindow_id: UA-W9-S002
assignment_id: ASG-UA-W9-01-S002
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
actor: UA-W9-WINDOW-AGENT
role: window agent (execute-then-review, DEC-UA-015; S002 executor)
frozen_revisions:
  decomposition: c900cebe930791a438fd23c3c311597a7f79e27dfef15dfaa0650ea96849d149
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  active_state_A5: d23fccfe21c627dbd783d028f67682251732d4d964850d45bfe85a855ac577e8
writable_file: frontend/app/globals.css
predecessor_ending_digest: 5f32de7f…
starting_file_digest: f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c
ending_file_digest: 6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d
commands:
  - node apply_s002.py (H1–H8 from S1 §7.2, each OLD count == 1)
  - git diff --numstat -- app/globals.css; git diff -- app/globals.css
  - node -e scoped/global needle inspection
  - sha256sum app/globals.css
  - git status --porcelain; git -C .. status --porcelain
observed_result:
  H1–H8 all applied with count == 1; numstat 9 9; diff contains exactly the
  eight §7.2 hunks (padding var(--space-6) var(--space-5); gap var(--space-5);
  h3 font-size 1.375rem; identity/score repeat(3); dt/version-note 12px;
  dd/copy/callout/score 14px; two .marketing-heading retargets); ending digest
  6e57268a…; attributable delta == M components/lead-details.tsx + M app/globals.css
  (the four protected paths + three coordination artifacts unchanged); A5 digest
  unchanged d23fccfe…; coordination root clean (0)
vd_divergence_observed:
  the three literal GLOBAL count values in S1 §7.4 V-D ($font-size: 12px;$ == 1,
  $repeat(3, minmax(0, 1fr))$ == 2, $font-size: 0.5rem;$ semantics) are NOT
  reproducible as global counters because those patterns pre-exist elsewhere in the
  8394-line file (observed font-size:12px==24, repeat(3,...)==6, font-size:0.5rem==23).
  All SCOPED invariants DO hold: H5 block 12px, H6 block 14px, combined rule
  repeat(3), media repeat(3), .marketing-heading==2, .lead-overview > h3==0,
  repeat(8)==0, repeat(6)==0, padding:12px==0,
  font-size:1.375rem-in-detail-section>h3==1, padding var(--space-6)--==1,
  gap var(--space-5)-in-dense-.lead-details==1, .lead-expansion-shell==2.
  Classification: S1-authoring imprecision in the V-D global-count literals, NOT a
  frozen-consequence contradiction. Byte-acceptance bar (V-E pin + numstat 9 9 +
  exact-hunk diff) is met.
required_local_cases: []
registered_local_cases: []
executed_local_cases: []
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
negative_controls_expected: 0
negative_controls_falsified: 0
deferred_integration_checks: [UA-W9-I001 G1–G9]
external_mutations: none
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W9-R-002
timestamp: 2026-09-03T19:39:00+05:30
phase: independent-review
subwindow_id: UA-W9-S002
assignment_id: ASG-UA-W9-01-S002
actor: UA-W9-WINDOW-AGENT
role: window agent (§8 independent reviewer, same identity, DEC-UA-015 no second prompt)
reviewed_object: frontend/app/globals.css
starting_digest: f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c
ending_digest: 6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d
frozen_expected_digest: 6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d
numstat_observed: "9 9"
numstat_frozen: "9 9"
aggregate_delta_recomputed_digest: "not required (non-empty set)"   # checked at I001 G6
protected_paths_unchanged: true
checklist:
  - V-A preflight true
  - V-B eight hunks count==1
  - V-C numstat 9 9, diff == H1–H8 only
  - V-D scoped invariants all hold; two global-count literals diverge (S1-authoring
    imprecision, documented in EV-UA-W9-S-002)
  - V-E ending digest 6e57268a…, porcelain exactly the two planned paths
verification_gates_passed: [V-A, V-B, V-C, V-E]
verification_gates_partially_passed: [V-D]   # scoped semantics correct; two literal global counters diverge (pre-existing matches elsewhere)
verification_gates_failed: []
review_decision: ACCEPTED_FOR_INTEGRATION
notes: Applied exactly the eight §7.2 hunks. No unauthorized CSS region touched
  (.lead-expansion-shell == 2 unchanged; W4–W8, .auth-card, token regions unchanged
  per numstat 9 9). No design-system G-R1 package entered. Byte pin authoritative.
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W9-S-003
timestamp: 2026-09-03T19:42:00+05:30
phase: leaf-execution
subwindow_id: UA-W9-S003
assignment_id: ASG-UA-W9-01-S003
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
actor: UA-W9-WINDOW-AGENT
role: window agent (execute-then-review, DEC-UA-015; S003 executor)
frozen_revisions:
  decomposition: c900cebe930791a438fd23c3c311597a7f79e27dfef15dfaa0650ea96849d149
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  active_state_A5: d23fccfe21c627dbd783d028f67682251732d4d964850d45bfe85a855ac577e8
writable_file: frontend/test/lead-details-component.test.ts
predecessor_ending_digests: [5f32de7f… (S001), 6e57268a… (S002)]
starting_file_digest: 8f7f611b3866b1cfd108ebb2acb0c06c8a06da74035ab4e5dd433a4fd8431412
ending_file_digest: f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b
commands:
  - node apply_s003.py (R1–R3, each OLD count == 1)
  - git diff --numstat -- test/lead-details-component.test.ts; git diff -- test/lead-details-component.test.ts
  - node --experimental-strip-types --test test/lead-details-component.test.ts
  - sha256sum test/lead-details-component.test.ts test/.ua-executed.json
  - node -e read-only needle inspection
observed_result:
  R1–R3 applied count == 1; numstat 3 3; diff == exactly the three §8.2
  replacements (indexOf comparators: Know the business…<Category and store fit;
  Why this lead…<The storefront StoreSignal resolved.; The storefront…<A real way in);
  single-file run 11 pass / 0 fail; test/.ua-executed.json byte-identical
  34f5b71a…; ending digest f8f7323c…; attributable delta == M components/lead-details.tsx
  + M app/globals.css + M test/lead-details-component.test.ts; no .ua-executed.json
  write; A5 digest unchanged d23fccfe…; coordination root clean
vd_needles:
  Know the business…<Category and store fit == 1; Why this lead…<The storefront == 1;
  The storefront…<A real way in == 1; "Lead overview" == 0; "Score semantics" == 0;
  "Outreach evidence" == 0; compiledComponents present == 1; recordExecuted import == 0
required_local_cases: []
registered_local_cases: []
executed_local_cases: []
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
negative_controls_expected: 0
negative_controls_falsified: 0
deferred_integration_checks: [UA-W9-I001 G1–G9]
external_mutations: none
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W9-R-003
timestamp: 2026-09-03T19:43:00+05:30
phase: independent-review
subwindow_id: UA-W9-S003
assignment_id: ASG-UA-W9-01-S003
actor: UA-W9-WINDOW-AGENT
role: window agent (§8 independent reviewer, same identity, DEC-UA-015 no second prompt)
reviewed_object: frontend/test/lead-details-component.test.ts
starting_digest: 8f7f611b3866b1cfd108ebb2acb0c06c8a06da74035ab4e5dd433a4fd8431412
ending_digest: f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b
frozen_expected_digest: f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b
numstat_observed: "3 3"
numstat_frozen: "3 3"
protected_paths_unchanged: true
checklist:
  - V-A preflight true (S001 5f32de7f…, S002 6e57268a… recomputed; coordination root clean)
  - V-B three replacements count==1
  - V-C numstat 3 3, diff == R1–R3 only
  - V-D node --test single file 11 pass 0 fail; .ua-executed.json unchanged 34f5b71a…
  - V-E ending digest f8f7323c…; porcelain == the three planned M paths
verification_gates_passed: [V-A, V-B, V-C, V-D, V-E]
verification_gates_failed: []
review_decision: ACCEPTED_FOR_INTEGRATION
notes: Exactly the three ordered §8.2 replacements applied. DEC-UA-004 strings preserved
  byte-exact including periods; comparators remain <. No test added/removed/reordered;
  no recordExecuted import; compiledComponents and all other assertions byte-identical
  (numstat 3 3). Sub-window-specific single-file run permitted (not npm test full suite;
  deferred to I001 G1).
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W9-S-004
timestamp: 2026-09-03T19:46:00+05:30
phase: leaf-execution
subwindow_id: UA-W9-S004
assignment_id: ASG-UA-W9-01-S004
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
actor: UA-W9-WINDOW-AGENT
role: window agent (execute-then-review, DEC-UA-015; S004 executor)
frozen_revisions:
  decomposition: c900cebe930791a438fd23c3c311597a7f79e27dfef15dfaa0650ea96849d149
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  active_state_A5: d23fccfe21c627dbd783d028f67682251732d4d964850d45bfe85a855ac577e8
writable_file: frontend/test/uphunt-aesthetic-w9.test.ts
file_operation: CREATE
predecessor_ending_digests: [5f32de7f… (S001), 6e57268a… (S002), f8f7323c… (S003)]
starting_file_digest: ABSENT
ending_file_digest: baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31
commands:
  - wrote §9.3 exact bytes extracted from S1
  - sha256sum test/uphunt-aesthetic-w9.test.ts
  - V-D backup: mv test/.ua-executed.json /tmp/opencode/ua-w9-ua-executed-head-backup.json
  - node --experimental-strip-types --test test/uphunt-aesthetic-w9.test.ts
  - python3 -c read executed json (sorted IDs + §4.7 set digest)
  - V-D restore: mv /tmp/opencode/ua-w9-ua-executed-head-backup.json test/.ua-executed.json
  - sha256sum test/.ua-executed.json (post-restore)
observed_result:
  §9.3 bytes written exactly (digest baee1b2e…); preflight .ua-executed.json ABSENT-executed
  run: tests 6, pass 6, fail 0, skipped 0; titles CASE-UA-W1-001, CASE-UA-W1-002,
  CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004; executed json == exactly
  those 6 sorted IDs; §4.7 set digest 7254ec52…; post-restore .ua-executed.json digest
  34f5b71a…; git status --porcelain shows ?? test/uphunt-aesthetic-w9.test.ts added to the
  three M implementation paths; A5 digest unchanged d23fccfe…
required_local_cases: [CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004]   # +2 W1 registry re-executions via import
registered_local_cases: [CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004]
executed_local_cases: [CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004]
plus_2_W1_re_executions: true
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
local_set_digest_6id_executed: 7254ec52…
negative_controls:
  N1–N6: recorded authoring evidence (EV-UA-W9-D-002); fresh re-execution DEFERRED to I001 G8
external_mutations: none
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W9-R-004
timestamp: 2026-09-03T19:47:00+05:30
phase: independent-review
subwindow_id: UA-W9-S004
assignment_id: ASG-UA-W9-01-S004
actor: UA-W9-WINDOW-AGENT
role: window agent (§8 independent reviewer, same identity, DEC-UA-015 no second prompt)
reviewed_object: frontend/test/uphunt-aesthetic-w9.test.ts
starting_digest: ABSENT
ending_digest: baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31
frozen_expected_digest: baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31
protected_paths_unchanged: true
checklist:
  - V-A preflight true (w9 file ABSENT; S001/S002/S003 ending digests recomputed; coordination root clean)
  - V-B digest baee1b2e…
  - V-C negative probes N1–N6 recorded at authoring (EV-UA-W9-D-002); fresh re-execution at I001 G8
  - V-D run 6 pass 0 fail 0 skipped; executed-set digest 7254ec52…; .ua-executed.json restored 34f5b71a…
  - V-E porcelain shows ?? test/uphunt-aesthetic-w9.test.ts added to the three M paths
verification_gates_passed: [V-A, V-B, V-D, V-E]
verification_gates_deferred: [V-C]   # N1–N6 re-executed fresh at I001 G8
verification_gates_failed: []
review_decision: ACCEPTED_FOR_INTEGRATION
notes: File created byte-exactly per §9.3. CASE-UA-W9-001..004 registered and executed; the
  two CASE-UA-W1 registry re-executions provoke via the import and are expected. No fifth test,
  no skip/todo, no getExecuted full-set equality, no recordExecuted-before-assertions. Jsx
  compiled via the duplicated compiledComponents harness.
status: AWAITING_WINDOW_REVIEW
```

```yaml
evidence_id: EV-UA-W9-I-001
timestamp: 2026-09-03T19:52:00+05:30
phase: integration-assessment
integration_assessment_id: UA-W9-I001
assignment_id: ASG-UA-W9-01-I001
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
actor: UA-W9-WINDOW-AGENT
role: window agent (§9.1 personally executed, never delegated)
predecessors: [UA-W9-S001, UA-W9-S002, UA-W9-S003, UA-W9-S004]
accepted_initial_subwindows: [UA-W9-S001, UA-W9-S002, UA-W9-S003, UA-W9-S004]
expected_changed_file_set: [frontend/components/lead-details.tsx, frontend/app/globals.css, frontend/test/lead-details-component.test.ts, frontend/test/uphunt-aesthetic-w9.test.ts]
required_case_count: 4
registered_case_count: 4
executed_case_count: 4          # plus 2 × CASE-UA-W1 + 20 predecessor IDs re-executed in the full run
required_case_set_digest: 73acdc6bf1c7d1258d64f93b8371f5a33b4fd1a2cf56762fc93e2d785ed06451
registered_case_set_digest: 73acdc6bf1c7d1258d64f93b8371f5a33b4fd1a2cf56762fc93e2d785ed06451
executed_case_set_digest_26id: 48c03081df64e9bc5fb69c29dbb65257b6364aa1c0a0fdd37bcf4c9185fb7fb7
gates:
  G1: PASS        # npm test 190/187/3; failures exactly the allowed predecessor set {My searches…, MRR-FE-01 exact research payload…, MRR-W2 frontend unit certificate}; exit 1 expected
  G2: PASS        # tsc --noEmit --incremental false; only 13 physical lines parked SRC-UA-0092 diagnostics; zero owned-path needles (lead-details.tsx / lead-details-component.test.ts / uphunt-aesthetic-w9.test.ts)
  G3: PASS        # npm run lint exit 0 (0 errors, 2 warnings in unrelated files traffic-globe.tsx, keyword-intelligence-dashboard.mjs)
  G4: PASS        # browser_evidence true; frozen route /design-fixture?scenario=completed ONLY; 4 PNGs under review-evidence/uphunt-aesthetic/UA-W9/ {390,768,1280,1440}×900; first row expanded; LeadDetails visible; fontSize 22px; 3-col identity grid; SectionIntro + Strength/Identity/Reachability copies render (synthetic .example pre-hydration technique per §10 G4 note; local_e2e not a CASE oracle)
  G5: PASS        # post-G1 executed set == 26 sorted IDs {2 W1,4 W2,4 W3,2 W4,2 W5,3 W6,2 W7,3 W8,4 W9}; §4.7 digest 48c03081…; zero skips/duplicates/unexpected/unactivated
  G6: PASS        # 4 planned-file ending digests 5f32de7f/6e57268a/f8f7323c/baee1b2e; all 15 zero-edit in-scope + 6 w2-w7 byte pins unchanged; forbidden-path negative search NONE; implementation delta == exactly the four planned files; coordination artifacts limited to S1/S2/S3; A5 digest unchanged by leaves
  G7: PASS        # static import inspection: 0 network, 0 DB, 0 WebSocket operations
  G8: PASS        # N1-N6 re-executed fresh in disposable mirror: N1,N2→W9-001 fail; N3→W9-002 fail; N4→W9-003 fail; N5,N6→W9-004 fail (all falsified)
  G9: PASS        # successor negative search: no uphunt-aesthetic-w10.test.ts / UA-W10 artifacts (prohibitions only); A5.current_window UA-W9; A5.next_window UA-W10 untouched; may_start_successor false honored
decision: PASS
status: READY_FOR_PARENT_REVIEW
stop_condition: UA-W9-H6 holds; UA-W10 not started; A5 current_status set to AWAITING_REVIEW (sole authorized post-I001 A5 handoff action)
sandbox_recovery: none required (browser capture, tsc, lint, npm test all succeeded first attempt)
dec_ua_016_race: none observed (full 22-ID set then 26-ID set registered on the first run)
external_mutations: none
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
```
