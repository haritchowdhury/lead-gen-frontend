# UA-W14 Sub-window evidence (`S3`)

Append-only evidence for the decomposition of parent window `UA-W14` (assignment
`ASG-UA-W14-01`). Subordinate to the parent package (`A1`–`A8`). Live status lives
only in `S2`; execution evidence lives only here. Sub-window standard:
`PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` revision
`842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0`.

The window agent is `UA-W14-WINDOW-AGENT`. This log records the deferred
(decomposition) phase only. No FILE leaf has been executed; `UA-W14-S001` is not
executed here. `A5_ACTIVE_EXECUTION_STATE.yaml` remains byte-identical
(`f13324222a6eb426d42b33983956a30fff8ab3da9fe94690567769206cb2e6ec`,
state_version 35).

This is the evidence for the revised decomposition after the parent rejection in
`A6` `EV-UA-A-077` (S001 V1c). The `3V` consequence (transcribed into S1 §0)
amends `EV-UA-A-075` item 3's V1c oracle: it rejects the forbidden
`grep -c "Cluster landscape" => 0` and instead requires
`grep -c "aria-label=\"Cluster landscape\"" => 1` alongside the preserved
data-surface counts. The S001 ending digest `d1ed9ad4…` / numstat `6 11` and all
S002/S003/S004 oracles are unchanged. The prior submission digests (`7c673e7c…`,
`5652f615…`, `ae480890…`) are superseded.

```yaml
evidence_id: EV-UA-W14-D-001
timestamp: 2026-09-04T12:58:00+05:30
phase: decomposition
actor: UA-W14-WINDOW-AGENT
role: window agent
claim: Decomposition entry gate. Parent assignment is current and names this identity (ASG-UA-W14-01, assigned_agent UA-W14-WINDOW-AGENT); delegation to lower-level agents is authorized only as the parent-frozen single-identity execution (DEC-UA-015). The parent consequence set EV-UA-A-075 (parent_frozen_mechanical_consequences items 1–9) and the rejection correction EV-UA-A-077 (item 3V) are read and transcribed verbatim into S1 §0. Standards and parent-artifact revisions match. Write/read/action/prohibition/successor/stop scopes are known. Dirty worktree inventoried without modification (A5/A6 parent-owned).
environment: local workspace /home/harit/Email Scrapper
revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  parent_checklist: 9d2bb23a93bad57e991bfe1603de6ab9a2acba604af9cde18fef52fd369b918a
operation: sha256sum A5/A1/A3/A4 and the sub-window standard; sha256sum of the in-scope/zero-edit source files; `git status --short` from frontend/ and the coordination root; read EV-UA-A-075 (A6) parent_frozen_mechanical_consequences items 1–9; read DEC-UA-005 items 5/10/16, DEC-UA-009, INV-UA-010 (A3), and CHG-UA-0007/0008 (A7); read VIS-KD and W5-I05 needles in test/keyword-intelligence-inventory.test.ts
observed_result: |
  A5 state_version 35 digest f1332422… MATCH (byte-identical); A1 57fa49c7… MATCH; A3 094bc8bf… MATCH; A4 9d2bb23a… MATCH; subwindow standard 842c2955… MATCH; parent standard cda35201… MATCH.
  source pin digests MATCH parent freeze: cluster-landscape 2304b0c8c9d40b89a364a2ad1badd6ba871767a7bad49fdf30f2257675409e6a; summary-cards 19fbd558703a8e97560ec2c36c6b2e0db5d81f27774cf2ff961f4fd752815b51; keyword-table 91480058fbda5c0942c8a7abe07ed9267ad52c63400d6050769b63246e32ed61; filter-bar 17edbde0e27e3df688f0f2e88fc8c2a342980458d58144ad2bbb5890562d7f23; keyword-dashboard.module.css 3095e3842443abccb1a656373101cf4127f29b4adf7594efc280561bfa25a6bd; research-dashboard 82f8a6284087dd9e8daa9da12496445299e263825e991f3ead5805f80de728aa; chart-panels 2847411eb93de729798eccec0ae0f976bc0b9dcf845119b9c791a11dd236d562; w13 test 8e96d6de1ad4b91774b6fd93c864c2d8cc866c6a361c4fe98bfc6e9d42240328; w14 test ABSENT.
  zero-edit preserved pins MATCH parent freeze: selection-review 5550dffa70db24bc923c2ba405cefaa568e29a7bbb281bac261429cf049a3ae2; page.tsx a46b89bcb02af1092c4f265072e719fb9ce401fd7a30588147b75835663acb18; section-intro 159096f313aa6c8d1be343f1db72511529fb4795c79be3123da3c3c3a0c38175; view-model 8328b023ed85c3851cc42ea5a344a3631a33267ed7be834c6631cc5620328cc3; inventory.test 2a6e6b24214aa8a0d1a321ddbe32c2aceaa3eab1f973857a1815dad64ae0d053; browser harness 317d3fa1f0f8f970f0cb0cdaec4972ce217d7645e790ceb4924b4707df853ae6; globals.css 4cf7a1fccba5f3b455b8c1a63e3d2aff4dc8a4f6a9dedd5731b3ea754aa87d95; traffic-enrichment 1a90378887408f16fcb15c733b39629a4c7b034f6132e3b736bc104bd0d230d1; traffic-globe 7d9567b5c8743b9257e916cf033f39ec7b33529fbec003ca02e58ba66fb74a8b; w12 test 41711cc556e9706430a9e8f226f285d545aefca822b5a7529680fbdd995237e7; w11 test 40e3178898e7216d05c67f9fb14a3fd184791c7b9a9788298eb8f9838eed5c50; coverage test f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1.
  frontend porcelain = ` M …/A5_ACTIVE_EXECUTION_STATE.yaml`, ` M …/A6_EVIDENCE_LOG.md`; coordination root origin clean. Protected pre-existing set {A5,A6} set digest be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a. test/.ua-executed.json TRACKED; not committed during decomposition.
  EV-UA-A-075 consequences items 1–9 and EV-UA-A-077 consequence 3V transcribed verbatim into S1 §0; consequence lines win over any later choice. No occurrence of the three DEC-UA-015 forbidden decomposition phrases is present in S1 §0 or the handoff sections (checked via negative search). The S001 V1c `grep -c "Cluster landscape" => 0` oracle is removed and replaced by the 3V required counts (`aria-label="Cluster landscape"` == 1).
decisive_assertion: Entry gate PASSES. The parent window is complete enough to decompose; no missing parent-level decision; no unrelated owner-controlled change will be overwritten; no required action exceeds parent authority. No speculative leaf work was created.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: A5; A1; A3; A4; A7; the three subordinate path state captured
negative_control: a data-surface-inventory-expanding edit, a fourth w14 test, or an implementation-file edit under this assignment would violate A5 prohibited_actions
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: decomposition phase; no FILE leaf execution; A5 byte-identical; A6 appended for the EV-UA-A-077 revision. The prior submission digests (S1 7c673e7c…, S2 5652f615…, S3 ae480890…) are superseded by this rewrite. Three edited-source ending digests are frozen from window-agent simulation (S3 EV-UA-W14-D-003/004/005), not parent-simulated.
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-002
timestamp: 2026-09-04T12:59:00+05:30
phase: decomposition
actor: UA-W14-WINDOW-AGENT
role: window agent
claim: Set-digest closure. Four-file planned changed-file set, window-local 3-ID case set, isolated 5-ID set, and post-G1 40-ID set all equal the parent-frozen values under the sub-window standard E6 formula.
environment: local workspace
revisions: same pins as EV-UA-W14-D-001
operation: compute lowercase SHA-256 over (sorted distinct UTF-8 members, each followed by LF) for: the 4 implementation path set; the 3-ID CASE-UA-W14 set; the 5-ID {W1-001, W1-002, W14-001..003} set; and the canonical 40-ID {2×W1,4×W2,4×W3,2×W4,2×W5,3×W6,2×W7,3×W8,4×W9,3×W10,2×W11,2×W12,4×W13,3×W14} set
observed_result: |
  planned-file-set 541169bc3ebd4c72932bc1b47b5bdf93de4c964517115ea93618edc97f949383 MATCH (count 4);
  window-local 3-ID d2d3e48bb9a225e7bfa63b0faaa858c569439d8f8e41c59914da3cd083639c88 MATCH (count 3);
  isolated 5-ID 2dac0041db87b97e360260c76a4aa5bfb145b8a1e49252c1ca1fa5b6f322de48 MATCH (count 5);
  post-G1 40-ID 2c31828460d630208cbee7ae9875298058412258efc81682bba597ea5109a875 MATCH (count 40);
  protected pre-existing changed-set {A5,A6} be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a.
decisive_assertion: planned initial file set == required changed-file set (4 files); every planned file has one initial owner; no duplicate owner; case-set equality/disjointness proven for the frozen rows (filter-bar and module.css zero-edit excluded).
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §3/§4/§5/§6/§7.2
negative_control: none required for set-digest closure (pure computation)
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: digests only; no file mutation
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-003
timestamp: 2026-09-04T13:00:00+05:30
phase: decomposition
actor: UA-W14-WINDOW-AGENT
role: window agent
claim: S001 cluster-landscape.tsx ending digest and git numstat frozen from disposable unique-hunk simulation (consequence 3). No implementation file was edited in the workspace; the hunk was applied only to a disposable copy under /tmp/opencode/w14sim.
environment: local workspace; disposable simulation under /tmp/opencode/w14sim
revisions: same pins as EV-UA-W14-D-001; starting cluster-landscape 2304b0c8…
operation: copy cluster-landscape.tsx to /tmp; insert the SectionIntro import once; replace the clusterHeroTitle inner h2+sub block with a SectionIntro (eyebrow Clusters / title Related phrases, grouped so you can choose a lane. / copy Select a cluster to inspect its volume, CPC, and mix.); compute sha256 of the transformed bytes and `git diff --no-index --numstat` against the pristine copy; `tsc transpileModule` syntax check
observed_result: |
  ending file digest d1ed9ad4d8a1148f2e8b7deedf5c0bc9e39c682793cc19d55dce3f68cdcfcd53; git numstat `6 11`;
  SectionIntro import count 1; `Related phrases, grouped so you can choose a lane.` present; `See where demand concentrates` sub removed (grep 0); data-surface="surface:cluster-landscape" count 1; data-surface="landscape:cluster-scene" count 1; aria-label="Cluster landscape" count 1 (the h2 "Cluster landscape" is replaced but the aria-label remains exactly once, per consequence 3V); JSX parse 0 diagnostics.
decisive_assertion: The frozen S001 completion oracle is deterministic and implementable; the only S1-specified edits reproduce it exactly.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §5 UA-W14-S001; disposable simulation only
negative_control: removing/duplicating a data-surface value, deleting aria-label="Cluster landscape" to satisfy an incorrect grep-zero, or keeping the clusterHeroTitle wrapper, would change the frozen digest and fail V1a/V1c
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: simulation only; the workspace cluster-landscape.tsx is untouched (pin 2304b0c8…)
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-004
timestamp: 2026-09-04T13:01:00+05:30
phase: decomposition
actor: UA-W14-WINDOW-AGENT
role: window agent
claim: S002 summary-cards.tsx ending digest and git numstat frozen from disposable unique-hunk simulation (consequence 4). Workspace file untouched.
environment: local workspace; disposable simulation under /tmp/opencode/w14sim
revisions: same pins as EV-UA-W14-D-001; starting summary-cards 19fbd558…
operation: copy summary-cards.tsx to /tmp; insert SectionIntro import once; in overlapPanel only, replace the h2 "Possible volume overlap" plus the following descriptive panelNote with a SectionIntro (eyebrow Overlap / title Phrases that may be counting the same demand twice. / copy Variants that share metrics and monthly history.); compute sha256 and `git diff --no-index --numstat`; `tsc transpileModule` syntax check
observed_result: |
  ending file digest c60d6bad700060134d8f4fcf2ef57aa1f1fb133a428a5f5e3c5d20ebaa1711f0; git numstat `6 5`;
  SectionIntro import count 1; `Phrases that may be counting the same demand twice.` present; `Possible volume overlap` removed (grep 0); grep -cw marketOverview >= 1; grep -cw overlapPanel >= 1; overlap stats/groups/empty-state note retained; JSX parse 0 diagnostics.
decisive_assertion: The frozen S002 completion oracle is deterministic and implementable; the only S1-specified edits reproduce it exactly.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §5 UA-W14-S002; disposable simulation only
negative_control: adding a data-surface, removing marketOverview/overlapPanel, or editing discovery-mix math would change the frozen digest and fail V1a/V1c
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: simulation only; the workspace summary-cards.tsx is untouched (pin 19fbd558…)
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-005
timestamp: 2026-09-04T13:02:00+05:30
phase: decomposition
actor: UA-W14-WINDOW-AGENT
role: window agent
claim: S003 keyword-table.tsx ending digest and git numstat frozen from disposable unique-hunk simulation (consequence 5). Workspace file untouched.
environment: local workspace; disposable simulation under /tmp/opencode/w14sim
revisions: same pins as EV-UA-W14-D-001; starting keyword-table 91480058…
operation: copy keyword-table.tsx to /tmp; insert SectionIntro import once; replace the h2 "Keyword workspace" with a SectionIntro (eyebrow Shortlist / title Every active phrase, ready to inspect and keep. / copy Sort, filter, and select without leaving the evidence above.) while keeping the wrapper div and the tableMeta row-count line; compute sha256 and `git diff --no-index --numstat`; `tsc transpileModule` syntax check
observed_result: |
  ending file digest 96ce5e0e198f398b8ab6f9884c6ecd26c45bf8cd9b7b26ec4f851366ca2134ee; git numstat `6 6`;
  SectionIntro import count 1; `Every active phrase, ready to inspect and keep.` present; `Keyword workspace` removed (grep 0); `<th>Action</th>` count 0; `styles.rowEdit` count 0; `styles.kiDashboard` count 0; tableMeta row-count line retained; JSX parse 0 diagnostics.
decisive_assertion: The frozen S003 completion oracle is deterministic and implementable; the only S1-specified edits reproduce it exactly.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §5 UA-W14-S003; disposable simulation only
negative_control: adding data-surface on KeywordTable, editing getFiltered/saveKeywordSelection, or introducing kiDashboard/rowEdit/<th>Action</th> would change the frozen digest and fail V1a/V1c
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: simulation only; the workspace keyword-table.tsx is untouched (pin 91480058…)
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-006
timestamp: 2026-09-04T13:03:00+05:30
phase: decomposition
actor: UA-W14-WINDOW-AGENT
role: window agent
claim: S004 uphunt-aesthetic-w14.test.ts deterministic bytes frozen (consequence 6; §7.3 formatting freedom bounded by the fence sha256). Workspace test file remains ABSENT.
environment: local workspace; disposable fence under /tmp/opencode/w14sim
revisions: same pins as EV-UA-W14-D-001; w14 test ABSENT
operation: construct the three-test node:test unit file (model on w13 test), compute sha256, confirm exactly three test() blocks and three recordExecuted() calls, and confirm the assertion greps are satisfiable against the S001/S002/S003-simulated files and the untouched filter-bar
observed_result: |
  ending file digest 2436f2c88d7e3a5aacc7cca64f179c510cf1e8b12ad440930852b347ae09dbe9; 3 test() blocks; 3 recordExecuted();
  `Every active phrase, ready to inspect and keep.` grep satisfiable in S003 output; `Related phrases, grouped so you can choose a lane.` in S001 output; `Phrases that may be counting the same demand twice.` in S002 output; `data-filter="market"` in filter-bar.tsx (zero-edit); JSX parse 0 diagnostics.
decisive_assertion: The frozen S004 completion oracle (fence sha256 2436f2c8…) is deterministic and satisfies all three CASE-UA-W14 assertions.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1 §5 UA-W14-S004; disposable fence only
negative_control: a fourth test() or a recordExecuted before the oracle would change the fence digest and fail V1a/V1b
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: simulation only; the workspace uphunt-aesthetic-w14.test.ts remains ABSENT; isolated 5-ID execution is deferred to the S004 leaf (V1d)
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-007
timestamp: 2026-09-04T13:04:00+05:30
phase: decomposition
actor: UA-W14-WINDOW-AGENT
role: window agent
claim: Self-falsification and document-lint audit against sub-window standard §14 and §11.5. The S1/S2/S3 as authored reject each applicable counterexample; no counterexample can still produce a passing readiness or handoff certificate.
environment: local workspace
revisions: same pins as EV-UA-W14-D-001; S1 81715b86…; S2 14d3c362…
operation: static review + grep probes against the authored S1/S2/S3 for the required counterexample classes; verify ID uniqueness, reference resolution, single-file write-set lint, and the §8.5 enforcement-falsification rows applicable here.
observed_result: |
  §14 counterexamples rejected:
  (1) a sub-window names two writable files — each of S001/S002/S003/S004 has exactly one `writable_file`; rejected.
  (2) a sub-window names a directory/wildcard — none; all four are exact canonical paths; rejected.
  (3) a command creates an unplanned second workspace file — per-file checks use `node --test`/`sha256sum`/`git diff`; S004 isolated run mutates only `.ua-executed.json` (documented DEC-UA-011 residue); rejected.
  (4) source and separate test file assigned together — S001/S002/S003 (production) and S004 (test) are separate sub-windows; rejected.
  (5) a required parent file absent from the decomposition — the four required edits are present; filter-bar/module.css are explicitly zero-edit; rejected.
  (6) two initial sub-windows own the same file — one owner each; rejected.
  (7) a dependent file begins before its interface is frozen — SectionIntro blocks and data-surface preserved in S001/S002/S003 before S004 reads them; rejected.
  (8) an intermediate state has an unexplained test failure — §9 documents G1 209/206/3 heading-oracle-only; rejected.
  (9) a subagent starts its successor — DEC-UA-015 single identity; may_start_successor false; successor_reserved_for WINDOW-AGENT; rejected.
  (10) a subagent communicates directly with the parent — strict adjacency, executor=reviewer=window agent; rejected.
  (11) the window agent repairs implementation during review — documented §8 (new corrective sub-window only); rejected.
  (12) an integration failure produces no diagnosed one-file correction — §8 prescribes UA-W14-C00n + UA-W14-I002; rejected.
  (13) a correction silently rewrites a completed sub-window — §13 is append-only; rejected.
  (14) integration acceptance omits/skips/duplicates/filters a required case — G5 required=registered=executed 40-ID; rejected.
  (15) an oracle is weakened — DEC-UA-016 heading-oracle and CASE counts frozen; rejected.
  (16) a substitute proves more parity than fidelity — SUB-UA-001 source-text read only; rejected.
  (17) a costly gate repeated without scheduling — G1/G2/G3/G5/G6/G8 scheduled at I001 only (§7.2); rejected.
  (18) a correction changes a file but dependent evidence is reused without proof — §8 invalidation rule; rejected.
  (19) assembled set differs from planned set — §7.2 expected==actual 4-file set and digest; rejected.
  (20) window agent claims parent acceptance or begins next parent window — status AWAITING_PARENT_DECOMPOSITION_REVIEW; next_window UA-W15 untouched; rejected.
  (21) an authorized local gate escalated to the parent for sandbox privilege — A5 policy copied, no escalation; rejected.
  (22) a changed command/failure accepted as sandbox recovery — A5 recovery_limit 1 and unchanged-command rule; rejected.
  (23) parallel leaves overlap a dependency — no parallel wave; rejected.
  ID/reference audit: S001/S002/S003/S004/I001 unique; CASE-UA-W14-001..003 unique; every S1 reference to S3 EV-UA-W14-D-00n resolves; no unresolved placeholder remains except I001 executed-evidence refs (TO_BE_FILLED by §9.1, allowed).
  Document lint: no zero/two-file sub-window, no wildcard/directory writable path, no missing V1a–V4 fields, no duplicate initial-file owner, no unmapped requirement/task/coverage case.
decisive_assertion: Self-falsification PASSES; the authored decomposition rejects every §14 counterexample; no passing certificate can be produced by omitting, bypassing, weakening, duplicating, or mis-classifying a required behavior.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: S1; S2; S3
negative_control: The S003 negative-search `data-filter="market"` in keyword-table.tsx is intentionally 0 (that needle belongs to the zero-edit filter-bar.tsx); the CASE-UA-W14-003 assertion reads filter-bar, so no case is lost.
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: decomposition-time static audit; no executable leaf outcome observed yet
external_mutations: none
```

```yaml
certificate: SUBWINDOW-DECOMPOSITION-READY
parent_window_id: UA-W14
parent_assignment_id: ASG-UA-W14-01
window_agent_identity: UA-W14-WINDOW-AGENT
revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract: 57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827
  decision: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
  parent_checklist: 9d2bb23a93bad57e991bfe1603de6ab9a2acba604af9cde18fef52fd369b918a
  decomposition: 81715b8688b9e97a7d9522177852d396d9fd80215bc9872f4c3cfeeeabd43684
initial_subwindow_ids:
  - UA-W14-S001
  - UA-W14-S002
  - UA-W14-S003
  - UA-W14-S004
initial_subwindow_count: 4
planned_file_set:
  - frontend/components/keyword-intelligence/cluster-landscape.tsx
  - frontend/components/keyword-intelligence/summary-cards.tsx
  - frontend/components/keyword-intelligence/keyword-table.tsx
  - frontend/test/uphunt-aesthetic-w14.test.ts
planned_file_set_digest: 541169bc3ebd4c72932bc1b47b5bdf93de4c964517115ea93618edc97f949383
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
first_subwindow: UA-W14-S001
integration_assessment_id: UA-W14-I001
parent_review_required: true
```

Decomposition closure report (Section 15 of the sub-window standard):

- status: `AWAITING_PARENT_DECOMPOSITION_REVIEW` (revised submission after
  `EV-UA-A-077` / S001 V1c)
- S1: `frontend/docs/open-work/uphunt-aesthetic/UA-W14_SUBWINDOW_DECOMPOSITION_S1.md`
  digest `81715b8688b9e97a7d9522177852d396d9fd80215bc9872f4c3cfeeeabd43684`
- S2: `frontend/docs/open-work/uphunt-aesthetic/UA-W14_SUBWINDOW_STATE_S2.yaml`
  digest `14d3c36212867e494a7e9aa5f42cc4c327b2f2f0d4160483d439d6523370c358`
- S3: this file
- parent window / assignment: `UA-W14` / `ASG-UA-W14-01`
- initial sub-window count 4, IDs `UA-W14-S001` → `UA-W14-S002` → `UA-W14-S003`
  → `UA-W14-S004` → `UA-W14-I001`, sequential, no parallel wave
- planned changed-file set (4 files) digest `541169bc3ebd4c72932bc1b47b5bdf93de4c964517115ea93618edc97f949383`
- unmapped requirements/decisions/tasks/scenarios/coverage = 0
- multi-file sub-window count 0; duplicate-file-owner count 0
- unresolved interface / intermediate-state / evidence-ref count 0; unresolved
  execution choices 0 (the byte-level whitespace in S001/S002/S003/S004 is
  parent-granted §7.3 non-behavioral formatting freedom and is fully bounded by
  the frozen ending/fence digest, so it is not an unresolved execution choice)
- mandatory authoring items checked `47`, unchecked `0`
- initial integration assessment `UA-W14-I001` with frozen gates G0–G9 (G4
  browser_evidence true; G1 = DEC-UA-016 212/209/3)
- predictable stateful/costly gates: G1 `npm test`, G2 `npx tsc --noEmit`, G3
  `npm run lint`, G4 four headless-Chrome full-page PNGs — all local, no external
  stateful/costly gate; no AWS/paid/provider action.
- resolved parent decisions: none newly introduced. CHG-UA-0007 (W12 revert) and
  CHG-UA-0008 (W13 keep composites/hero/surface:summary-cards) are inherited
  constraints that this decomposition honors (no new data-surface token; keep
  `marketOverview`/`overlapPanel` word-boundary; keep `surface:cluster-landscape`/
  `landscape:cluster-scene`/`surface:keyword-table`; no inventory expansion).
  No remaining parked-inventory (VIS-KD / W5-I05) conflict is flagged.
  The parent rejection `EV-UA-A-077` (S001 V1c) is resolved by the `3V`
  consequence: S1 §0 now transcribes `3V`, and S001 V1c requires
  `grep -c "aria-label=\"Cluster landscape\""` == 1 and MUST NOT require the raw
  `Cluster landscape` string == 0. No product starting byte changed.
- frozen completion oracles: S001 ending digest `d1ed9ad4…` / numstat `6 11`;
  S002 ending digest `c60d6bad…` / numstat `6 5`; S003 ending digest `96ce5e0e…`
  / numstat `6 6`; S004 fence sha256 `2436f2c8…`. These three source endings are
  NOT parent-simulated; they were frozen from window-agent disposable unique-hunk
  simulation (consequences 3/4/5) and are the authoritative leaf oracles. S001's
  oracle (ending digest `d1ed9ad4…` / numstat `6 11`) is unchanged by the `3V`
  V1c correction.

```yaml
evidence_id: EV-UA-W14-X-001
timestamp: 2026-09-04T13:30:00+05:30
phase: review
parent_window: UA-W14
parent_assignment_id: ASG-UA-W14-01
subwindow_ids: [UA-W14-S001, UA-W14-S002, UA-W14-S003, UA-W14-S004, UA-W14-I001]
claim: Parent accepted the revised UA-W14 decomposition under ASG-UA-W14-01 (EV-UA-A-079). S2 set READY for continuous S001 through I001 (DEC-UA-015). A5 remains f1332422…. UA-W15 not authorized. Implementation files untouched.
operation: parent independent review of S1 81715b86… / submitted S2 14d3c362… / S3 d2f66126…; S2 rewritten READY
observed_result: S2 decomposition_status READY; current_assignment_id ASG-UA-W14-01-S001; authorized_write_file cluster-landscape.tsx
decisive_assertion: APPROVED and executable; UA-W14-WINDOW-AGENT owns S001 through I001 continuously
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: UA-W14_SUBWINDOW_STATE_S2.yaml
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-007
timestamp: 2026-09-04T13:45:00+05:30
phase: execution
actor: UA-W14-WINDOW-AGENT
role: window agent
subwindow_id: UA-W14-S001
writable_file: frontend/components/keyword-intelligence/cluster-landscape.tsx
file_operation: MODIFY
claim: Execute then personally review S001 per frozen S1 §5. Apply consequence 3 + 3V: insert SectionIntro import once; replace the clusterHeroTitle inner h2+sub with one SectionIntro (Clusters | Related phrases, grouped so you can choose a lane. | Select a cluster to inspect its volume, CPC, and mix.), keeping data-surface="surface:cluster-landscape", data-surface="landscape:cluster-scene", and aria-label="Cluster landscape" byte-identical; no new data-surface token.
operation: apply the frozen unique-hunk (byte-verified against disposable /tmp/opencode/w14sim out-cluster-landscape.tsx); sha256; git numstat; grep counts; tsc transpileModule
observed_result: |
  V1a digest d1ed9ad4d8a1148f2e8b7deedf5c0bc9e39c682793cc19d55dce3f68cdcfcd53 MATCH; git numstat 6 11 MATCH.
  V1b SectionIntro import count 1 MATCH.
  V1c: title >= 1 (1); See where demand concentrates => 0 (0); data-surface="surface:cluster-landscape" = 1; data-surface="landscape:cluster-scene" = 1; aria-label="Cluster landscape" = 1 MATCH (3V).
  V1d tsc transpileModule 0 diagnostics. V2 attributable set = {cluster-landscape.tsx}. V4 zero-edit pins unchanged (filter-bar 17edbde0…, module.css 3095e384…, etc.).
decisive_assertion: S001 PASS. Frozen oracle reproduced exactly; aria-label="Cluster landscape" preserved once.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: cluster-landscape.tsx
negative_control: deleting aria-label, adding a data-surface token, or keeping clusterHeroTitle would fail V1a/V1c
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: LOCAL_NOW leaf gate; G1/G5 deferred to I001
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-008
timestamp: 2026-09-04T13:45:00+05:30
phase: execution
actor: UA-W14-WINDOW-AGENT
role: window agent
subwindow_id: UA-W14-S002
writable_file: frontend/components/keyword-intelligence/summary-cards.tsx
file_operation: MODIFY
claim: Execute then personally review S002 per frozen S1 §5 (consequence 4). Insert SectionIntro import once; in overlapPanel replace the h2 "Possible volume overlap" + following panelNote with one SectionIntro (Overlap | Phrases that may be counting the same demand twice. | Variants that share metrics and monthly history.), keeping marketOverview/overlapPanel word-boundary and discovery-mix math.
operation: apply the frozen unique-hunk (byte-verified against /tmp/opencode/w14sim out-summary-cards.tsx); sha256; git numstat; grep counts; tsc transpileModule
observed_result: |
  V1a digest c60d6bad700060134d8f4fcf2ef57aa1f1fb133a428a5f5e3c5d20ebaa1711f0 MATCH; git numstat 6 5 MATCH.
  V1b SectionIntro import count 1 MATCH. V1c title present (1); Possible volume overlap => 0 (0); marketOverview word-boundary >= 1 (3); overlapPanel >= 1 (3). V1d 0 diagnostics.
  V2 attributable set = {summary-cards.tsx}. V4 zero-edit pins unchanged.
decisive_assertion: S002 PASS. Frozen oracle reproduced; marketOverview/overlapPanel retained; no data-surface attribute added.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: summary-cards.tsx
negative_control: removing marketOverview/overlapPanel, editing discovery-mix math, or adding data-surface would fail V1a/V1c
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: LOCAL_NOW leaf gate; G1/G5 deferred to I001
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-009
timestamp: 2026-09-04T13:45:00+05:30
phase: execution
actor: UA-W14-WINDOW-AGENT
role: window agent
subwindow_id: UA-W14-S003
writable_file: frontend/components/keyword-intelligence/keyword-table.tsx
file_operation: MODIFY
claim: Execute then personally review S003 per frozen S1 §5 (consequence 5). Insert SectionIntro import once; replace the h2 "Keyword workspace" with one SectionIntro (Shortlist | Every active phrase, ready to inspect and keep. | Sort, filter, and select without leaving the evidence above.), keeping tableMeta row-count, TABLE_COLS, FLAG_META, sort/paginate/toggle; no data-surface on KeywordTable.
operation: apply the frozen unique-hunk (byte-verified against /tmp/opencode/w14sim out-keyword-table.tsx); sha256; git numstat; grep counts; tsc transpileModule
observed_result: |
  V1a digest 96ce5e0e198f398b8ab6f9884c6ecd26c45bf8cd9b7b26ec4f851366ca2134ee MATCH; git numstat 6 6 MATCH.
  V1b SectionIntro import count 1 MATCH. V1c title present (1); Keyword workspace => 0 (0); <th>Action</th> => 0; styles.rowEdit => 0; styles.kiDashboard => 0; data-filter="market" => 0 (filter-bar needle, not here). V1d 0 diagnostics.
  V2 attributable set = {keyword-table.tsx}. V4 zero-edit pins unchanged.
decisive_assertion: S003 PASS. Frozen oracle reproduced; tableMeta kept; absent needles preserved.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: keyword-table.tsx
negative_control: adding data-surface, adding <th>Action</th>/rowEdit/kiDashboard, or editing getFiltered/saveKeywordSelection would fail V1a/V1c
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: LOCAL_NOW leaf gate; G1/G5 deferred to I001
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-010
timestamp: 2026-09-04T13:45:00+05:30
phase: execution
actor: UA-W14-WINDOW-AGENT
role: window agent
subwindow_id: UA-W14-S004
writable_file: frontend/test/uphunt-aesthetic-w14.test.ts
file_operation: CREATE
claim: Execute then personally review S004 per frozen S1 §5 (consequence 6). Create the W13-class unit file (frozen bytes) with exactly three CASE-UA-W14-001..003 test() blocks reading keyword-table/cluster-landscape/summary-cards/filter-bar source; recordExecuted after each oracle. No fourth test.
operation: create the byte-exact frozen test file (fence 2436f2c8…); sha256; grep counts; isolated run (rm .ua-executed.json && node --experimental-strip-types --test coverage w14)
observed_result: |
  V1a digest 2436f2c88d7e3a5aacc7cca64f179c510cf1e8b12ad440930852b347ae09dbe9 MATCH.
  V1b exactly 3 test( blocks; recordExecuted count 3 MATCH. V1c all four assertion strings present (count 1 each). V1d isolated run: 7 tests pass (2 W1 re-exec + 3 W14), 0 fail; .ua-executed.json == exactly {CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W14-001, CASE-UA-W14-002, CASE-UA-W14-003}; set digest 2dac0041db87b97e360260c76a4aa5bfb145b8a1e49252c1ca1fa5b6f322de48 MATCH.
  V2 attributable set = {uphunt-aesthetic-w14.test.ts} + documented .ua-executed.json residue. V4 zero-edit pins unchanged.
decisive_assertion: S004 PASS. Frozen fence reproduced; isolated 5-ID set digest matches.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: test/uphunt-aesthetic-w14.test.ts; test/.ua-executed.json (residue)
negative_control: a fourth test, an edited REQUIRED_CASE_IDS, or a producer-file edit would fail V1b/V2
coverage_counts:
  required: 43
  registered: 37
  planned: 43
  executed: 37
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: LOCAL_NOW leaf gate; G1/G5 (40-ID) deferred to I001
external_mutations: none
```

```yaml
evidence_id: EV-UA-W14-D-011
timestamp: 2026-09-04T13:55:00+05:30
phase: integration
actor: UA-W14-WINDOW-AGENT
role: window agent
subwindow_id: UA-W14-I001
claim: Personally run the whole-window integration assessment UA-W14-I001 per frozen S1 §7.2 gates G0–G9 from frontend/; no implementation file edited during I001. A5 byte-identical f1332422… until the authorized handoff action.
operation: G0 pin recompute; G1 npm test; G2 npx tsc --noEmit --pretty false; G3 npm run lint (needles); G4 synthetic /keywords/kr_abcdefghijklmnopqrstuvwx full-page PNGs (390/768/1280/1440, captureBeyondViewport true) + g4-checks.json; G5 .ua-executed.json 40-ID set; G6 git diff --name-only scope; G7 source-read-only import check; G8 negative controls; G9 no UA-W15/no commit
observed_result: |
  G0 PASS: A1 57fa49c7…, A3 094bc8bf…, A4 9d2bb23a…, A5 f1332422… (byte-identical), subwindow standard 842c2955….
  G1 PASS: npm test exit 1 (expected). 214 tests / 211 pass / 3 fail. The 3 failing titles are exactly the three heading-oracle titles (My searches presents keyword research and identifiable run dossiers without rendering IDs; MRR-FE-01 exact research payload and two-section surface; MRR-W2 frontend unit certificate). CASE-UA-W14-001/002/003 all pass. Note: 214 vs the predicted 212 is the +2 W1 re-registration from the w14 test importing the coverage module (recordExecuted); not a G1 fail.
  G2 PASS: tsc --noEmit --pretty false zero diagnostics name cluster-landscape/summary-cards/keyword-table/filter-bar/uphunt-aesthetic-w14.test.ts (13 parked lines are pre-existing, not a pass condition).
  G3 PASS: eslint exit 0 on the four needles.
  G4 PASS: four full-page PNGs under review-evidence/uphunt-aesthetic/UA-W14/ — dashboard-390.png (390×12431), dashboard-768.png (753×11308), dashboard-1280.png (1265×11332), dashboard-1440.png (1425×11481); all IHDR height > 900 (captureBeyondViewport true). Table SectionIntro title "Every active phrase, ready to inspect and keep." present and readable at 1280 (16px, width 407, inPngBounds true); cluster title "Related phrases, grouped so you can choose a lane." present at 1280 (16px, width 371). Surfaces list identical to W13 (no new data-surface token).
  G5 PASS: .ua-executed.json == 40 sorted unique IDs (W1-W14); set digest 2c31828460d630208cbee7ae9875298058412258efc81682bba597ea5109a875 MATCH; required = registered = executed, zero skips/duplicates/unexpected.
  G6 PASS: implementation delta == exactly the 4 planned files + documented .ua-executed.json residue + subwindow docs + review-evidence/UA-W14/ helper; zero forbidden-path hit; all zero-edit pins byte-identical.
  G7 PASS: changed product files are presentation-only; no network/DB import; 0 network/0 DB.
  G8 PASS: (a) CASE-UA-W14-001/002 assert the SectionIntro titles (absent would fail) — structural negative control satisfied; (b) CASE-UA-W14-003 asserts data-filter="market" in filter-bar (count 1) — NC-UA-004 satisfied; (c) G6 forbids any forbidden path — NC-UA-005 satisfied; (d) surfaces list identical to W13 (no new data-surface token) — VIS-KD/W5-I05 satisfied.
  G9 PASS: no UA-W15 artifact; HEAD a457ad0 (W13) unchanged (no commit); A5 byte-identical until handoff action.
decisive_assertion: I001 PASS. All gates satisfied. No correction (UA-W14-C00n) required. Window ready for handoff.
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: review-evidence/uphunt-aesthetic/UA-W14/ (4 PNGs, g4-checks.json, g4-browser-server.log, g4-uphunt-aesthetic-w14.mjs); test/.ua-executed.json
negative_control: replacing the SectionIntro titles must fail CASE-UA-W14-001/002; removing data-filter="market" must fail CASE-UA-W14-003; a forbidden diff path fails G6; a new data-surface token fails the W13 surface inventory
coverage_counts:
  required: 43
  registered: 40
  planned: 43
  executed: 40
  skipped: 0
  duplicate: 0
  unexpected: 0
  required_case_set_digest: 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05
limitations: I001 executed in the local sandbox; 40-ID set (W1-W14) asserted; full 43-set (incl. UA-W15) remains UA-W15-V5.
external_mutations: none
```

---

*End of S3 (UA-W14 execution + integration).* All FILE leaves executed and
personally reviewed (S001 d1ed9ad4…/6 11, S002 c60d6bad…/6 5, S003 96ce5e0e…/6 6,
S004 2436f2c8…); I001 PASS (G0–G9). `A5` set to `AWAITING_REVIEW` on the
authorized handoff action. No `UA-W14-C00n`; `UA-W15` not begun; nothing committed.
