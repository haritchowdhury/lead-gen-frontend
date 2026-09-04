# Uphunt-aesthetic specification changelog (`A7`)

Append-only. Never reuse a change ID. This file does not authorize work.

Other artifacts: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`; `A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`; `A6` `A6_EVIDENCE_LOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

```yaml
change_id: CHG-UA-0001
timestamp: 2026-09-01T16:50:00+05:30
trigger_evidence: [EV-UA-A-001]
reason: Initial eight-artifact parent package for the whole-site Uphunt-aesthetic visual translation. No prior UA revision existed.
old_revision: 0000000000000000000000000000000000000000000000000000000000000000
new_revision: c46ef7c2287ad9ebf9de28cdec941d8f755e45ae43f72656f0e343105b645977
changed_requirements: [REQ-UA-001, REQ-UA-002, REQ-UA-003, REQ-UA-004, REQ-UA-005, REQ-UA-006, REQ-UA-007, REQ-UA-008]
changed_decisions: [DEC-UA-001, DEC-UA-002, DEC-UA-003, DEC-UA-004, DEC-UA-005, DEC-UA-006, DEC-UA-007, DEC-UA-008, DEC-UA-009, DEC-UA-010, DEC-UA-011, DEC-UA-012, DEC-UA-013]
affected_windows: [UA-W1, UA-W2, UA-W3, UA-W4, UA-W5, UA-W6, UA-W7, UA-W8, UA-W9, UA-W10, UA-W11, UA-W12, UA-W13, UA-W14, UA-W15]
invalidated_evidence: []
compatibility_or_migration_effect: none; presentation-only future CSS/JSX; no data migration
authorization_effect: package remains unassigned until A5 current_status is READY and a requester assigns UA-W1; root ACTIVE_EXECUTION_STATE.md is not this package
resumption_state: A5 current_window NONE, assigned_agent UNASSIGNED, next_window UA-W1, stop_after UA-W15
```

```yaml
change_id: CHG-UA-0002
timestamp: 2026-09-01T18:05:00+05:30
trigger_evidence: [EV-UA-W1-I-001, EV-UA1-I-001, SRC-UA-0092]
reason: Applied typecheck capability on this tree is not repo-wide npx tsc --noEmit exit 0. Ten pre-existing diagnostics in five other-package test files are byte-identical with or without the UA-W1 coverage file. Parent re-pins frozen G2 to owned-path diagnostics only (DEC-UA-014). No baseline-repair window. No write-scope expansion.
old_revision: c46ef7c2287ad9ebf9de28cdec941d8f755e45ae43f72656f0e343105b645977
new_revision: f1d8252cb815a541a4854c157c25698868a5caa8d27b351ce88480b6dffda99f
changed_requirements: []
changed_decisions: [DEC-UA-014]
affected_windows: [UA-W1, UA-W2, UA-W3, UA-W4, UA-W5, UA-W6, UA-W7, UA-W8, UA-W9, UA-W10, UA-W11, UA-W12, UA-W13, UA-W14, UA-W15]
invalidated_evidence:
  - EV-UA-W1-I-001 (G2 FAIL as terminal PARENT_BLOCKED under the exit-0 oracle; historical record retained; disposition superseded by DEC-UA-014 plus UA-W1-I002)
  - EV-UA1-D-001 (A5 pin match against pre-CHG-UA-0002 A3/A4 hashes)
  - S1 §7 G2 expected exit 0 (original block immutable; superseded by appended S1 amendment)
  - A4 UA-W1-V2/H5 withheld PARENT_BLOCKED evidence text
  - S2 current_status BLOCKED and G2 exit-0 blocker text (window agent must refresh S2 under ASG-UA-W1-02)
compatibility_or_migration_effect: none; presentation-only package; parked SRC-UA-0092 files remain unedited
authorization_effect: ASG-UA-W1-01 is closed for further work. New assignment ASG-UA-W1-02 resumes UA-W1 for S1 G2 append, S2 pin refresh, personal UA-W1-I002, A4 UA-W1 boxes, handoff, and A5 AWAITING_REVIEW. Write scope unchanged for product files. UA-W2 remains unauthorized. Root ACTIVE_EXECUTION_STATE.md is not this package.
resumption_state: A5 current_window UA-W1, current_assignment_id ASG-UA-W1-02, assigned_agent UA-W1-WINDOW-AGENT, current_status IN_PROGRESS, blocker null, next_window UA-W2, stop_after UA-W15, may_start_successor false
```

```yaml
change_id: CHG-UA-0003
timestamp: 2026-09-03T14:10:00+05:30
trigger_evidence: [EV-UA-A-044, EV-UA-A-045]
reason: Plan docs omitted who advances FILE leaves. Parent had frozen the opposite of the sub-window standard (parent-per-leaf). DEC-UA-015 locks window-agent leaf advancement for UA-W7 through UA-W15. Does not accept UA-W6 and does not assign UA-W7.
old_revision: 8faaa4e2411235d8a83ec94de6a07e53c54ece91d99121a3c0e09cb6052f4300
new_revision: c5c41162ec2d7406d285422e8aeae0508e13989161507d122e787512fef31870
changed_requirements: [REQ-UA-008]
changed_decisions: [DEC-UA-015]
affected_windows: [UA-W7, UA-W8, UA-W9, UA-W10, UA-W11, UA-W12, UA-W13, UA-W14, UA-W15]
invalidated_evidence:
  - EV-UA-A-041 consequence 8 last clause "parent issues the next leaf" (superseded; historical row retained)
  - EV-UA-A-042 / EV-UA-A-043 parent-per-leaf paste instructions (superseded by EV-UA-A-044 and this decision)
compatibility_or_migration_effect: none; presentation-only package; no product file change in this revision
authorization_effect: UA-W6 remains the current window and is not accepted by this change. UA-W7 remains unauthorized. Future UA-W7+ assignment pastes MUST copy DEC-UA-015. Root ACTIVE_EXECUTION_STATE.md is not this package.
resumption_state: A5 current_window UA-W6, current_assignment_id ASG-UA-W6-01, assigned_agent UA-W6-WINDOW-AGENT, next_window UA-W7, stop_after UA-W15, may_start_successor false
```

```yaml
change_id: CHG-UA-0004
timestamp: 2026-09-03T14:20:00+05:30
trigger_evidence: [EV-UA-W6-I-001, EV-UA-A-046]
reason: UA-W6-I001 PARENT_BLOCKED on G1. Three predecessor tests assert <h1>My searches</h1> which DEC-UA-003 /runs SectionIntro removes. Parked MRR file cannot be edited. DEC-UA-016 re-pins G1 to named heading-oracle failures. Does not accept UA-W6. Does not assign UA-W7.
old_revision: c5c41162ec2d7406d285422e8aeae0508e13989161507d122e787512fef31870
new_revision: 094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3
changed_requirements: []
changed_decisions: [DEC-UA-016]
affected_windows: [UA-W6, UA-W7, UA-W8, UA-W9, UA-W10, UA-W11, UA-W12, UA-W13, UA-W14, UA-W15]
invalidated_evidence:
  - EV-UA-A-041 consequence 7 "Expected npm test after W6 is 175 pass" (superseded for G1 PASS; historical row retained)
  - UA-W6-I001 G1 FAIL under the old exit-0/175-pass oracle (disposition superseded by DEC-UA-016 plus UA-W6-I002)
compatibility_or_migration_effect: none; presentation-only package; UA-W6 product files unchanged by this revision
authorization_effect: ASG-UA-W6-01 is closed for further work under the old G1. New assignment ASG-UA-W6-02 resumes UA-W6 for S1 §17 G1 append, personal UA-W6-I002, A4 UA-W6 boxes, handoff, and A5 AWAITING_REVIEW. Product write scope removed. UA-W7 remains unauthorized. Root ACTIVE_EXECUTION_STATE.md is not this package.
resumption_state: A5 current_window UA-W6, current_assignment_id ASG-UA-W6-02, assigned_agent UA-W6-WINDOW-AGENT, current_status IN_PROGRESS, blocker null, next_window UA-W7, stop_after UA-W15, may_start_successor false
```

```yaml
change_id: CHG-UA-0005
timestamp: 2026-09-03T18:20:00+05:30
trigger_evidence: [EV-UA-A-054, EV-UA-A-055]
reason: UA-W9 replaces DEC-UA-004 overview titles that frontend/test/lead-details-component.test.ts still asserts as "Lead overview" / "Score semantics" / "Store identity" / "Outreach evidence". DEC-UA-016 treats any failure outside the three named heading-oracle titles as G1 FAIL, so those three assertion lines must move with the product strings. Uniquely determined; no new product decision.
old_revision: e93443356612e1c1b9dfbd482b1153771e8e55f02e0eff15a8e8d0230aafbf68
new_revision: 75005e558cfc238d89839ee2af0e94b94b682dae7ff432a4762c0f4a63c9a7c0
changed_requirements: []
changed_decisions: []
affected_windows: [UA-W9]
invalidated_evidence:
  - A4 F1 UA-W9 authorized_write_scope three-path list (superseded by the four-path list plus UA-W9-T4; historical A4 bytes retained in git)
  - EV-UA-A-054 A5 READY checklist_revision e9344335… (superseded by this assignment pin)
compatibility_or_migration_effect: none; presentation-only package; no product file change in this revision
authorization_effect: UA-W9 is assigned as ASG-UA-W9-01 to UA-W9-WINDOW-AGENT for decomposition only. FILE leaves remain unassigned until parent accepts the decomposition. UA-W10 remains unauthorized. Root ACTIVE_EXECUTION_STATE.md is not this package.
resumption_state: A5 current_window UA-W9, current_assignment_id ASG-UA-W9-01, assigned_agent UA-W9-WINDOW-AGENT, current_status IN_PROGRESS, blocker null, next_window UA-W10, stop_after UA-W15, may_start_successor false
```

```yaml
change_id: CHG-UA-0006
timestamp: 2026-09-03T20:30:00+05:30
trigger_evidence: [EV-UA-A-057, EV-UA-A-058]
reason: UA-W10 replaces DEC-UA-004 03 title that frontend/test/lead-details-component.test.ts still asserts as "Category and store fit" in the overview ordering witness. DEC-UA-016 treats any failure outside the three named heading-oracle titles as G1 FAIL, so that assertion line must move with the product string. Uniquely determined; no new product decision.
old_revision: 0380ea831cf345e48433a9dc9d0e573e8f993a0d9ec1e00dfdd3305a06c98c4d
new_revision: fa71ebb3df07916e39d00052f19d907e8985fd99fb58136bc1284abc06a91076
changed_requirements: []
changed_decisions: []
affected_windows: [UA-W10]
invalidated_evidence:
  - A4 F1 UA-W10 authorized_write_scope three-path list (superseded by the four-path list plus UA-W10-T3)
  - EV-UA-A-057 A5 READY checklist_revision 0380ea83… (superseded by this assignment pin)
compatibility_or_migration_effect: none; presentation-only package; no product file change in this revision
authorization_effect: UA-W10 is assigned as ASG-UA-W10-01 to UA-W10-WINDOW-AGENT for decomposition only. FILE leaves remain unassigned until parent accepts the decomposition. UA-W11 remains unauthorized. Root ACTIVE_EXECUTION_STATE.md is not this package.
resumption_state: A5 current_window UA-W10, current_assignment_id ASG-UA-W10-01, assigned_agent UA-W10-WINDOW-AGENT, current_status IN_PROGRESS, blocker null, next_window UA-W11, stop_after UA-W15, may_start_successor false
```

```yaml
change_id: CHG-UA-0007
timestamp: 2026-09-04T09:55:00+05:30
trigger_evidence: [EV-UA-A-067]
reason: Parent-frozen UA-W12 S002 added a new data-surface token surface:selection-review-panel. W5-I05 requires the registered set to equal KEYWORD_INTELLIGENCE_SURFACE_INVENTORY / I_F15_LITERAL, which already contain surface:selection-review on the research-dashboard wrapper. INV-UA-010 and DEC-UA-009 preserve existing data-surface values; they do not authorize a new surface identity or an inventory expansion. Uniquely determined: revert S002. No new product decision.
old_revision: 1edc1bc7a9d7f46a62a4f88ec74e5e468e1c1d17395b9b1aa0b810ce308e8aab
new_revision: 1edc1bc7a9d7f46a62a4f88ec74e5e468e1c1d17395b9b1aa0b810ce308e8aab
changed_requirements: []
changed_decisions: []
affected_windows: [UA-W12]
invalidated_evidence:
  - EV-UA-A-065 parent_frozen_mechanical_consequences item 4 (S002 new data-surface)
  - EV-UA-A-066 S002 ending pin as a required net product change
  - UA-W12 planned-file-set digest 49cff36a… (three files; superseded by two-file net set 54cf2d36…)
compatibility_or_migration_effect: none; S002 is retracted; selection-review.tsx returns to starting digest 5550dffa…; inventories unchanged
authorization_effect: UA-W12-WINDOW-AGENT may author and execute UA-W12-C001 then personally run UA-W12-I002. Do not edit lib/keyword-intelligence-view-model.ts or test/keyword-intelligence-inventory.test.ts. UA-W13 remains unauthorized.
resumption_state: A5 current_window UA-W12, current_assignment_id ASG-UA-W12-01, assigned_agent UA-W12-WINDOW-AGENT, current_status IN_PROGRESS, blocker EV-UA-A-067_S002_new_surface_vs_W5-I05, next_window UA-W13, stop_after UA-W15, may_start_successor false
```

```yaml
change_id: CHG-UA-0008
timestamp: 2026-09-04T11:20:00+05:30
trigger_evidence: [EV-UA-A-070, EV-UA-W13-D-007]
reason: Submitted UA-W13 S1 consequences 3/5 remove surface:summary-cards, the dashboard h1, summary.marketOverview(charts.overviewSignals), {charts.analysisCharts}, and ChartPanelSections members overviewSignals/analysisCharts. Parked uneditable test/keyword-intelligence-inventory.test.ts W5-I05 and VIS-KD assert those strings, one dashboard h1, and a fixed source-order. DEC-UA-016 treats those failures as G1 FAIL. Same class as CHG-UA-0007: do not edit the parked inventory test or expand inventories. Retract the over-frozen removals. Keep DEC-UA-005 titled full-width charts and CSS heights. No new product decision.
old_revision: 7962776cb55e8228dab77f9f09826a6db0a297880d25d1ed772d3d686c362385
new_revision: 7962776cb55e8228dab77f9f09826a6db0a297880d25d1ed772d3d686c362385
changed_requirements: []
changed_decisions: []
affected_windows: [UA-W13]
invalidated_evidence:
  - EV-UA-A-069 parent_frozen_mechanical_consequences items 3 and 5 (remove composites/hero/marketOverview)
  - UA-W13 S1 ending pins 3dab75d4… and 3a527dae… (must be resimulated)
  - UA-W13 S1 V1d grep overviewSignals/analysisCharts => 0
compatibility_or_migration_effect: none; inventories and parked tests unchanged; S002 CSS pin 3095e384… remains
authorization_effect: UA-W13-WINDOW-AGENT may rewrite S1/S2/S3 under ASG-UA-W13-01. FILE leaves remain unexecuted. UA-W14 remains unauthorized.
resumption_state: A5 current_window UA-W13, current_assignment_id ASG-UA-W13-01, assigned_agent UA-W13-WINDOW-AGENT, current_status IN_PROGRESS, blocker EV-UA-A-070_VIS-KD_W5-I05_vs_removed_composites, next_window UA-W14, stop_after UA-W15, may_start_successor false
```
