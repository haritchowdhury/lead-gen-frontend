# UA-W11 append-only sub-window evidence (`S3`)

Subordinate artifact `S3` of parent window `UA-W11` under assignment `ASG-UA-W11-01`.
Companion artifacts: `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W11_SUBWINDOW_DECOMPOSITION_S1.md`
and `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W11_SUBWINDOW_STATE_S2.yaml`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

Append-only. Entries below cover decomposition authoring only (`EV-UA-W11-D-001..002` plus the
§11.1 readiness certificate). Execution, review, assessment, and handoff evidence will be appended
as `EV-UA-W11-S-001..`, `EV-UA-W11-R-001..`, `EV-UA-W11-I-001..`, and `EV-UA-W11-A-001..` in later
turns. Nothing here amends a task, decision, or authority boundary.

```yaml
evidence_id: EV-UA-W11-D-001
timestamp: 2026-09-03T22:00:00+05:30
phase: decomposition-gate
parent_window: UA-W11
parent_assignment_id: ASG-UA-W11-01
subwindow_ids: []
assignment_ids: [ASG-UA-W11-01 (decomposition authoring)]
actor: UA-W11-WINDOW-AGENT
role: window agent (decomposition entry gate, sub-window standard §3)
frozen_revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract_A1: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision_A3: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  checklist_A4: 4db7876134838f33cb7fadae2ca596b2de28d428cac473bd7515bfebb90f550a
  active_state_A5: 9e94fe1bec6065c62d833157595079b1fc411a0ca81525b2b9967be49181e685 (state_version 25, ASG-UA-W11-01, UA-W11-WINDOW-AGENT, IN_PROGRESS)
starting_file_digests:
  frontend/components/traffic-enrichment.tsx: 833cb54c4b06034aa6e11a044d329c04710856e25e0ea189cc9a74655623be08
  frontend/app/globals.css: 4945bb591d78593fea95d1470b0db64445bd14d498e35f3dec8fb88a588ae872
  frontend/test/uphunt-aesthetic-w11.test.ts: ABSENT
  frontend/components/lead-details.tsx: 9431f71bf7d85de0b81752dfff79206f13d3e0747405aaf25f5ee58c3b6a3727
  frontend/components/section-intro.tsx: 159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175
  frontend/components/traffic-globe.tsx: 7d9567b5c8743b9257e916cf033f39ec7b33529fbec003ca02e58ba66fb74a8b
  frontend/test/lead-details-component.test.ts: ca1d02c3c685bd2d0aa95fb93111d405c20e616424d4cc60aaffc172e8b9ee96
  frontend/test/uphunt-aesthetic-w10.test.ts: 0a2b34e632c450ff97bcf95d6be34ec4768e848b49dc250a3f9cb6419875d724
  frontend/components/results-table.tsx: a4e1472fdc4129d20a61faa893d07694dba1528336cfabd257219833cd7d0b4f
  frontend/components/results-filters.tsx: 0ab118e47349efb0c71e4facaf9bdd2844d8ea564f3c1fbf59afbc7e6e22b881
  frontend/components/cumulative-traffic.tsx: 7d37a3ae2eb8e423a539f85330688bcc863a4e028525bce46222ac1cbbdb45aa
  frontend/app/leads/page.tsx: 21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b
  frontend/components/leads/live-leads-workspace.tsx: a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36
  frontend/components/run-workspace.tsx: 643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3
  frontend/test/uphunt-aesthetic-w8.test.ts: cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0
  frontend/test/uphunt-aesthetic-w9.test.ts: baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31
  frontend/components/landing-sections.tsx: 914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15
  frontend/components/query-editor.tsx: 92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c
  frontend/components/run-progress.tsx: 15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38
  frontend/app/runs/[runId]/page.tsx: 719e05ea0eec73fe948f0c41a9c56c970d6db61cfff0c990e59666136a069072
  frontend/test/fixtures.ts: 9ea26525ed983b71063aad9e84ea492f2c85d0c95f80ba238b0a48352836c4b4
  frontend/test/uphunt-aesthetic-coverage.test.ts: f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1
  frontend/test/uphunt-aesthetic-w7.test.ts: 92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842
  frontend/test/.ua-executed.json: d8ad50ab2fdc5294ee7c5f7048036268cb64ff15e35c1e42431cf85924bb184b (TRACKED, clean, 29 sorted IDs; set digest b9c2a4676e1447f07a454f236ae0a26a2a7f0f28bfbb8ddad6ff6ee149b36d22)
command_or_inspection: |
  sha256sum of A1/A3/A4/A5/subwindow-standard/parent-standard and the 23 files above, plus the
  w2–w6 predecessors; test ! -f frontend/test/uphunt-aesthetic-w11.test.ts;
  git status --porcelain in frontend/ and in the coordination root; node --version;
  package.json scripts read; /usr/bin/google-chrome presence; tsconfig.json flags read;
  grep traffic-enrichment.tsx for the two W11 JSX anchors (the traffic-globe import line and the
  TrafficEnrichmentDetails header block); grep globals.css for the four CSS anchors (G11 cascade
  guard block, the store-evidence/discovery marketing-heading margin block, the crux
  scope-header h5/state/assessment block, the crux h6/fact-grid/observation block);
  grep lead-details.tsx for the TrafficEnrichmentDetails call; grep fixtures.ts for the
  denseLead traffic_enrichment cred with both dataforseo and crux.
observed_result: |
  All §1 pins MATCH (A1 57fa49c7…, A3 094bc8bf…, A4 4db78761…, A5 9e94fe1b…
  state_version 25, standards cda35201…/842c2955…). A5 names current_window UA-W11,
  authorized_windows [UA-W11], assigned_agent UA-W11-WINDOW-AGENT, current_status IN_PROGRESS,
  and authorizes decompose_UA-W11_under_subwindow_standard. Every starting digest matches A6
  EV-UA-A-061. frontend porcelain == exactly ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml`
  and ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` (parent/requester authoring writes;
  PROTECTED). Coordination root porcelain clean (root ACTIVE_EXECUTION_STATE.md untouched; its
  `git status --porcelain` empty). The two JSX anchors each occur once; the four CSS anchors each
  occur once; the TrafficEnrichmentDetails call occurs once in lead-details.tsx; denseLead's
  traffic_enrichment spreads trafficEnrichment() (dataforseo + crux + attributions) so both
  provider blocks render. node v24.14.1; /usr/bin/google-chrome present; test/lint scripts present;
  tsconfig incremental true, strict true, allowImportingTsExtensions true, paths @/* -> ./*.
decisive_assertion: Decomposition entry gate PASS — the parent window is complete enough to
  decompose; every implementation-affecting decision exists (parent consequences 1–8); the three
  expected changed files are derivable from current source and the parent trace; the dirty tree
  is inventoried; no unrelated owner-controlled change will be overwritten; no required action
  exceeds parent authority.
sandbox_privilege: none
environment_invalidated_attempt: none
limitations: none
external_mutations: none
```

```yaml
evidence_id: EV-UA-W11-D-002
timestamp: 2026-09-03T22:05:00+05:30
phase: decomposition-authoring
parent_window: UA-W11
parent_assignment_id: ASG-UA-W11-01
subwindow_ids: [UA-W11-S001, UA-W11-S002, UA-W11-S003]
assignment_ids: [ASG-UA-W11-01 (decomposition authoring)]
actor: UA-W11-WINDOW-AGENT
role: window agent (deterministic byte freezing, sub-window standard §7.3/§4.7)
frozen_revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract_A1: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision_A3: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  checklist_A4: 4db7876134838f33cb7fadae2ca596b2de28d428cac473bd7515bfebb90f550a
  active_state_A5: 9e94fe1bec6065c62d833157595079b1fc411a0ca81525b2b9967be49181e685 (state_version 25)
starting_file_digests:
  frontend/components/traffic-enrichment.tsx: 833cb54c4b06034aa6e11a044d329c04710856e25e0ea189cc9a74655623be08
  frontend/app/globals.css: 4945bb591d78593fea95d1470b0db64445bd14d498e35f3dec8fb88a588ae872
  frontend/test/uphunt-aesthetic-w11.test.ts: ABSENT
command_or_inspection: |
  Deterministic byte simulation in the disposable location /tmp/opencode/ua-w11-dework
  (workspace NOT modified; copy-modify-sha256): apply the two JSX hunks to a copy of
  traffic-enrichment.tsx, the four CSS hunks to a copy of globals.css; sha256sum each; recompute
  numstat via diff; author the w11 test file bytes and sha256sum; recompute the §4.7 set digests.
observed_result: |
  traffic-enrichment.tsx ending `1a90378887408f16fcb15c733b39629a4c7b034f6132e3b736bc104bd0d230d1`
  (numstat 7 5) == parent consequence 3 pin;
  globals.css ending `4cf7a1fccba5f3b455b8c1a63e3d2aff4dc8a4f6a9dedd5731b3ea754aa87d95`
  (numstat 19 11) == parent consequence 4 pin;
  w11 test file bytes ending `40e3178898e7216d05c67f9fb14a3fd184791c7b9a9788298eb8f9838eed5c50`
  (107 lines) detected as differing from the parent reference fence dcf22691… only by cosmetic
  test-title wording and whitespace — documented as §7.3 formatting freedom in S1 §0;
  window-local W11 2-ID set digest `21989bfcf384dcba25aefdc3821ee54e1fb3305538facc348a61e7b41a12460f`
  == parent consequence 6 pin; S003 isolated 4-ID set digest
  `f12d789daac333d2e5accefc65e402a8e047f5a6b978d415bf31805c70f3fcf6` == parent consequence 6 pin;
  post-G1 31-ID set digest `aa120e83587fd9792542c07dc606b0dcc50f66e8f8c45d3857ec8a0c162c671f`
  == parent consequence 6 pin; planned-file-set digest
  `26115fd2ed6dbcccccb4d798fe68423042a1eba0795ba2e37f6cbf8c887dff5b` == parent consequence 6 pin;
  starting-repository change-set digest `e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450`;
  A5 remained `9e94fe1b…` byte-identical throughout (verified before and after authoring).
  Render-oracle reachability for CASE-UA-W11-001 (the DEC-UA-004 eyebrow/title/copy) is
  established by the deterministic S001 H2 JSX injecting the exact strings through the unchanged
  SectionIntro export; reachability for CASE-UA-W11-002 needles (`traffic-source-crux`,
  `crux-detail-row`) is established because the CruxDetails JSX and the denseLead fixture
  (dataforseo + crux from trafficEnrichment()) are unchanged, and the ldc `traffic details render
  every available metric...` render case already rendered and passed them.
decisive_assertion: The S1 is decision-complete and frozen; the two pinned ending digests
  reproduce byte-exact; the S003 digest is the window-agent deterministic bytes under §7.3
  (documented in S1 §0); no implementation file was modified; no unresolved interface,
  intermediate-state, execution-choice, or evidence reference remains.
limitations: No node:test dry-run was performed at decomposition time because it would write the
  three implementation/test files into frontend/ (prohibited during decomposition). The render
  oracles are instead proven reachable by equivalence to the already-passing ldc traffic render
  case and the deterministic reconstruction; the actual w11-only node:test dry-run is prescribed
  and executed at S003 (§8.4 V-D) after the parent accepts the decomposition.
external_mutations: none
```

```yaml
certificate: SUBWINDOW-DECOMPOSITION-READY
parent_window_id: UA-W11
parent_assignment_id: ASG-UA-W11-01
window_agent_identity: UA-W11-WINDOW-AGENT
revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  parent_checklist: 4db7876134838f33cb7fadae2ca596b2de28d428cac473bd7515bfebb90f550a
  decomposition: 3e835f72992a5ebc9c73cfcf2099e66665f0176d3034113150ae4b5055e2fe34
initial_subwindow_ids: [UA-W11-S001, UA-W11-S002, UA-W11-S003]
initial_subwindow_count: 3
planned_file_set:
  - frontend/components/traffic-enrichment.tsx
  - frontend/app/globals.css
  - frontend/test/uphunt-aesthetic-w11.test.ts
planned_file_set_digest: 26115fd2ed6dbcccccb4d798fe68423042a1eba0795ba2e37f6cbf8c887dff5b
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
first_subwindow: UA-W11-S001
integration_assessment_id: UA-W11-I001
parent_review_required: true
```

```yaml
evidence_id: EV-UA-W11-RC-001
timestamp: 2026-09-03T22:15:00+05:30
phase: decomposition-correction
parent_window: UA-W11
parent_assignment_id: ASG-UA-W11-01
subwindow_ids: [UA-W11-S002]
assignment_ids: [ASG-UA-W11-01 (decomposition authoring correction)]
actor: UA-W11-WINDOW-AGENT
role: window agent (parent-rejection correction, sub-window standard §13)
trigger_evidence: EV-UA-A-062-REJECT (parent rejection; only finding = S1 §7.2 H4 OLD fence missing the intervening rule)
root_cause: S1 §7.2 H4 OLD fence as first authored skipped the intervening
  `.traffic-source-crux .fact-grid > div { padding: 0.1875rem 0.25rem; }` rule that sits
  between the `.traffic-source-crux h6` block and the combined
  `.traffic-source-crux .fact-grid dt/dd/.vital-rating` block in the starting globals.css.
  Authored as one contiguous fence, that OLD therefore occurred 0 times and §7.4 V-B would
  have required STOP. (The earlier deterministic simulation applied the three blocks as separate
  single-match replacements and so still reproduced the correct ending digest; the single-fence
  transcription was the defect.)
fix: Re-inserted the intervening rule, unchanged, into BOTH the H4 OLD and H4 NEW fences in S1 §7.2.
  OLD now spans h6 -> `.fact-grid > div` -> combined dt/dd/vital-rating -> traffic-observation.
  NEW keeps `.fact-grid > div` byte-identical and still splits `dt`+`vital-rating` (12px) from
  `dd` (14px). No other S1/S2/S3 content changed; §0, the JSX hunks, H1–H3, and §8.3 are
  untouched.
reverification:
  H4_OLD_count_in_starting_globals.css: 1
  applied_H1_H2_H3_H4_counts: 1 1 1 1
  ending_digest_globals.css: 4cf7a1fccba5f3b455b8c1a63e3d2aff4dc8a4f6a9dedd5731b3ea754aa87d95 (unchanged pin; MATCH)
  numstat: "19 11" (unchanged pin; MATCH)
command_or_inspection: |
  copy-modify-sha256 in the disposable /tmp/opencode/ua-w11-dework against a copy of the starting
  globals.css: re-apply H1–H4 using the corrected H4 fence; sha256sum the result; recompute numstat
  via diff; grep count of the corrected H4 OLD fence in the starting globals.css.
observed_result: |
  All four hunks apply with count == 1 each; corrected H4 OLD count == 1 (was 0 as first
  authored); resulting globals.css digest == 4cf7a1fccba5f3b455b8c1a63e3d2aff4dc8a4f6a9dedd5731b3ea754aa87d95
  (matches the parent consequence 4 pin, unchanged); numstat 19 11 (matches pin).
  S1 digest updated to 3e835f72992a5ebc9c73cfcf2099e66665f0176d3034113150ae4b5055e2fe34;
  S2 decomposition_revision and the S3 readiness certificate decomposition both updated to that
  SHA-256. A5 remained 9e94fe1b… byte-identical; no implementation file edited.
decisive_assertion: The single parent finding is corrected; §7.2 H4 OLD now occurs exactly once,
  the transformation still yields the frozen ending digest and numstat, and the decomposition is
  again ready for parent review.
sandbox_privilege: none
environment_invalidated_attempt: none
limitations: none
external_mutations: none
```

```yaml
evidence_id: EV-UA-W11-X-001
timestamp: 2026-09-03T22:20:00+05:30
phase: review
parent_window: UA-W11
parent_assignment_id: ASG-UA-W11-01
subwindow_ids: [UA-W11-S001, UA-W11-S002, UA-W11-S003, UA-W11-I001]
assignment_ids: [ASG-UA-W11-01 (parent decomposition accept)]
actor: parent
role: parent (decomposition accept gate, sub-window standard §12.1)
frozen_revisions:
  decomposition: 3e835f72992a5ebc9c73cfcf2099e66665f0176d3034113150ae4b5055e2fe34
  active_state_A5: 9e94fe1bec6065c62d833157595079b1fc411a0ca81525b2b9967be49181e685
trigger_evidence: [EV-UA-A-062]
command_or_inspection: |
  Parent independently verified corrected S1 §7.2 H4 OLD count == 1; H1–H4 apply counts all 1;
  ending digests and numstat pins MATCH; product files untouched; A5 byte-identical; converted S2
  decomposition_status to READY and assigned ASG-UA-W11-01-S001 to UA-W11-WINDOW-AGENT.
observed_result: |
  decomposition APPROVED; S2 state_version 2 READY; first executable leaf UA-W11-S001;
  continuous S001→S003→I001 authorized under DEC-UA-015; UA-W12 not authorized.
decisive_assertion: UA-W11-WINDOW-AGENT may execute S001 through I001 without further parent gates.
sandbox_privilege: none
environment_invalidated_attempt: none
limitations: none
external_mutations: none
```

```yaml
evidence_id: EV-UA-W11-I-001
timestamp: 2026-09-03T22:35:00+05:30
phase: execution
parent_window: UA-W11
parent_assignment_id: ASG-UA-W11-01
subwindow_ids: [UA-W11-S001, UA-W11-S002, UA-W11-S003]
assessment_id: UA-W11-I001
assignment_ids: [ASG-UA-W11-01-S001, ASG-UA-W11-01-S002, ASG-UA-W11-01-S003]
actor: UA-W11-WINDOW-AGENT
role: window agent (integration assessment, sub-window standard §9; personally executed, never delegated)
accepted_initial_subwindows: [UA-W11-S001, UA-W11-S002, UA-W11-S003]
expected_changed_file_set:
  - frontend/components/traffic-enrichment.tsx
  - frontend/app/globals.css
  - frontend/test/uphunt-aesthetic-w11.test.ts
required_case_count: 2
registered_case_count: 2
executed_case_count: 2
required_case_set_digest: 21989bfcf384dcba25aefdc3821ee54e1fb3305538facc348a61e7b41a12460f
post_G1_executed_set_digest: aa120e83587fd9792542c07dc606b0dcc50f66e8f8c45d3857ec8a0c162c671f
status: READY_FOR_PARENT_REVIEW
gates:
  G1:
    command: "npm test (node --experimental-strip-types --test test/*.test.ts)"
    outcome: PASS
    detail: "exit 1 expected; tests 199 / pass 196 / fail 3 / skip 0; the 3 failures are exactly the allowed predecessor heading-oracle set {My searches presents keyword research and identifiable run dossiers without rendering IDs, MRR-FE-01 exact research payload and two-section surface, MRR-W2 frontend unit certificate}; CASE-UA-W11-001 & CASE-UA-W11-002 PASS; W1 registry re-executions PASS. (count 199/196 = noted 197/194 + 2 from node --test per-file process isolation re-evaluating the imported coverage module's W1 rows; fail-set identical.)"
  G2:
    command: "npx tsc --noEmit --incremental false --pretty false"
    outcome: PASS
    detail: "0 output lines contain owned-path needles traffic-enrichment.tsx / uphunt-aesthetic-w11.test.ts; remaining 12 diagnostics are all in generated .next/dev/types/{routes.d.ts,validator.ts} (pre-existing env artifacts, not owned, not introduced by W11); parked SRC-UA-0092 diagnostics not present in this run; repo-wide exit 2 not required."
  G3:
    command: "npm run lint"
    outcome: PASS
    detail: "exit 0; 0 errors, 2 warnings (traffic-globe.tsx react-hooks/exhaustive-deps; test/browser/keyword-intelligence-dashboard.mjs no-unused-vars) — both in non-owned files."
  G4:
    command: "local next dev (STORESIGNAL_DESIGN_FIXTURES=1) + /usr/bin/google-chrome --headless (146.0.7680.164) screenshots, route /design-fixture?scenario=completed only"
    outcome: PASS
    detail: "4 PNGs (completed-390/768/1280/1440, height 900 viewport, full-page captureBeyondViewport) under review-evidence/uphunt-aesthetic/UA-W11/ + g4-checks.json + g4-browser-server.log; first row expanded, LeadDetails visible; 02 · Attention + Where this store already appears in search. + Visibility estimates, not private storefront analytics. present & readable (title 57.6px); 03 · Fit and 04 · Provenance present; traffic-source-crux + crux-detail-row rendered. Synthetic .example pre-hydration interception per S1 §9 G4 note; live /runs/[runId] not visited; local_e2e not a CASE oracle (SUB-UA-001)."
  G5:
    command: "read test/.ua-executed.json after G1"
    outcome: PASS
    detail: "31 sorted unique IDs: 2 CAS-UA-W1 + 4 W2 + 4 W3 + 2 W4 + 2 W5 + 3 W6 + 2 W7 + 3 W8 + 4 W9 + 3 W10 + 2 W11; set digest aa120e83… MATCH (parent consequence 6); window-local required W11 2-ID digest 21989bfc…; executed-set digest f12d789d… at the S003 leaf; zero skips/duplicates/unexpected in this window; full 43-set equality deferred to UA-W15-V5."
  G6:
    command: "sha256sum of the 3 planned files + all zero-edit in-scope/preserved files + git status --porcelain + forbidden-path negative search"
    outcome: PASS
    detail: "3 planned ending digests full-match (1a903788…, 4cf7a1fc…, 40e317…); all 25 zero-edit pins match; implementation delta = exactly the 3 planned files; A5 (9e94fe1b…) unchanged by leaves; no forbidden path modified; only non-implementation delta = protected A5/A6 (pre-existing) + 3 untracked coordination artifacts + test/.ua-executed.json tracked runtime residue (uncommitted)."
  G7:
    command: "static import/suite inspection"
    outcome: PASS
    detail: "test imports are node:x built-ins + react + react-dom/server + ./uphunt-aesthetic-coverage.test.ts + ./fixtures.ts only; 0 network, 0 DB operations."
  G8:
    command: "fresh in-memory NC probes N1–N5 (tmp only, no workspace writes), independent component compile + render"
    outcome: PASS
    detail: "N1 (02 title→Traffic and site experience), N2 (drop 02 · Attention eyebrow), N3 (02 copy→Lead-level search visibility…) falsify CASE-UA-W11-001 title/eyebrow/copy assertions; N4 (remove traffic-source-crux), N5 (remove crux-detail-row) falsify CASE-UA-W11-002 needles; all 5 falsified."
  G9:
    command: "successor negative search"
    outcome: PASS
    detail: "no UA-W12 artifact of any kind; A5.current_window still UA-W11, next_window UA-W12 untouched, may_start_successor false honored."
recorded_variances:
  - "S002 git diff --numstat = 18/10, not the frozen 19/11; identical content (ending digest matches pin exactly); difflib unified-diff counts 19/11; git's differ aligns the H4 split dd rule differently. Diff contains exactly the §7.2 H1–H4 hunks, no other selector change."
  - "S003 V-D w11-only run reported tests 6 / pass 6 (not 4) because node --test isolates each file in its own process, re-evaluating the imported coverage module and re-running the 2 W1 registry rows; the executed-set is exactly the 4 expected IDs {W1-001, W1-002, W11-001, W11-002} (set digest f12d789d…), json restored byte-identical d8ad50ab…. Matches S1 §12.1 note that the 2 W1 IDs are registry re-executions via the import."
sandbox_recoveries: none
external_mutations: none
tracked_residue: "test/.ua-executed.json now holds the 31-ID set (uncommitted; never committed by the window agent)."
decisive_assertion: UA-W11-I001 PASS (G1–G9 all pass); UA-W11 objective SCN-UA-003 satisfied; no UA-W12 started; window reads READY_FOR_PARENT_REVIEW.
```
