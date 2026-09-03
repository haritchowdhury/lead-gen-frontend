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
