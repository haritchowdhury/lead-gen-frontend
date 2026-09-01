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
