# Uphunt-aesthetic traceability index (`A8`)

**Status:** planning traces. Execution evidence columns stay `PENDING` until the owning window runs.  
**Package status:** authoring complete; assignment is `A5` only.

Other artifacts: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`; `A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`; `A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`.

Every arrow is a stable ID. Extra or missing members fail readiness.

## Requirements

```text
REQ-UA-001
-> SRC-UA-0010 SRC-UA-0021 SRC-UA-0022
-> DEC-UA-001 DEC-UA-008
-> UA-W2-T1 UA-W2-T3 UA-W3-T1 UA-W4-T1 UA-W5-T1
-> SCN-UA-001 CASE-UA-W2-001 CASE-UA-W2-004 CASE-UA-W3-003 CASE-UA-W4-002 CASE-UA-W5-002 CASE-UA-W15-001
-> test/uphunt-aesthetic-w2.test.ts ; test/uphunt-aesthetic-w3.test.ts ; test/uphunt-aesthetic-w4.test.ts ; test/uphunt-aesthetic-w5.test.ts ; test/uphunt-aesthetic-w15.test.ts
-> PENDING execution
-> FR-001
```

```text
REQ-UA-002
-> SRC-UA-0011 SRC-UA-0012
-> DEC-UA-002 DEC-UA-003
-> UA-W2-T1 UA-W2-T2 UA-W3-T2 UA-W6-T1 UA-W7-T1 UA-W7-T2 UA-W8-T1 UA-W12-T1
-> SCN-UA-002 CASE-UA-W2-002 CASE-UA-W2-003 CASE-UA-W3-001 CASE-UA-W3-002 CASE-UA-W3-004 CASE-UA-W6-001 CASE-UA-W6-002 CASE-UA-W6-003 CASE-UA-W7-001 CASE-UA-W7-002 CASE-UA-W8-001 CASE-UA-W8-002 CASE-UA-W12-001
-> matching window test files plus SectionIntro export
-> PENDING execution
-> FR-001
```

```text
REQ-UA-003
-> SRC-UA-0016 SRC-UA-0017 SRC-UA-0018
-> DEC-UA-005 DEC-UA-009
-> UA-W12-T1 UA-W13-T1 UA-W13-T2 UA-W14-T1
-> SCN-UA-004 CASE-UA-W12-001 CASE-UA-W12-002 CASE-UA-W13-001 CASE-UA-W13-002 CASE-UA-W13-003 CASE-UA-W13-004 CASE-UA-W14-001 CASE-UA-W14-002 CASE-UA-W14-003
-> test/uphunt-aesthetic-w12.test.ts ; test/uphunt-aesthetic-w13.test.ts ; test/uphunt-aesthetic-w14.test.ts
-> PENDING execution
-> FR-001
```

```text
REQ-UA-004
-> SRC-UA-0014 SRC-UA-0015 SRC-UA-0023 SRC-UA-0026
-> DEC-UA-004 DEC-UA-010
-> UA-W8-T2 UA-W9-T1 UA-W9-T2 UA-W10-T1 UA-W11-T1
-> SCN-UA-003 CASE-UA-W8-003 CASE-UA-W9-001 CASE-UA-W9-002 CASE-UA-W9-003 CASE-UA-W9-004 CASE-UA-W10-001 CASE-UA-W10-002 CASE-UA-W10-003 CASE-UA-W11-001 CASE-UA-W11-002 CASE-UA-W15-002
-> test/uphunt-aesthetic-w8.test.ts through w11.test.ts ; test/uphunt-aesthetic-w15.test.ts
-> PENDING execution
-> FR-001
```

```text
REQ-UA-005
-> SRC-UA-0024 SRC-UA-0019 SRC-UA-0092
-> DEC-UA-006 DEC-UA-011 DEC-UA-013 DEC-UA-014
-> UA-W1-T1 UA-W1-T2 UA-W7-T3 UA-W8-T3 UA-W14-T2 UA-W15-T2
-> SCN-UA-005 SCN-UA-006 CASE-UA-W1-001 CASE-UA-W1-002 CASE-UA-W7-002 CASE-UA-W8-003 CASE-UA-W14-003 CASE-UA-W15-003
-> test/uphunt-aesthetic-coverage.test.ts ; test/ua-coverage-equality.mjs
-> EV-UA-W1-I-002 EV-UA-A-023 (CASE-UA-W1-001 CASE-UA-W1-002); remaining IDs PENDING later windows
-> FR-002 FR-003
```

```text
REQ-UA-006
-> SRC-UA-0025
-> DEC-UA-008
-> UA-W2-T3 UA-W15-T1
-> SCN-UA-001 CASE-UA-W2-004 CASE-UA-W15-001
-> test/uphunt-aesthetic-w2.test.ts ; test/uphunt-aesthetic-w15.test.ts
-> PENDING execution
-> FR-001
```

```text
REQ-UA-007
-> SRC-UA-0013 SRC-UA-0011
-> DEC-UA-003 DEC-UA-012
-> UA-W3-T2 UA-W4-T1 UA-W5-T1 UA-W6-T1
-> SCN-UA-002 CASE-UA-W3-001 CASE-UA-W4-001 CASE-UA-W5-001 CASE-UA-W6-001 CASE-UA-W6-002 CASE-UA-W6-003
-> matching window test files
-> PENDING execution
-> FR-001
```

```text
REQ-UA-008
-> SRC-UA-0002
-> DEC-UA-007
-> UA-W1-T1 (registry shape); parent assignment then window-agent decomposition (not a UA-Wn product task)
-> SCN-UA-006 CASE-UA-W1-002
-> A4 F1 file lists plus symbol-specific globals.css
-> PENDING execution
-> FR-003
```

## Invariants

```text
INV-UA-001
-> SRC-UA-0024
-> DEC-UA-006
-> UA-W1-T2 every-window H3/V4
-> SCN-UA-005 CASE-UA-W1-001 NC-UA-005
-> coverage allowlist plus handoff name-only diff
-> PENDING execution
-> FR-003
```

```text
INV-UA-002
-> run-workspace.tsx RETRY_DELAYS (A2 Phase B row 7)
-> DEC-UA-006
-> UA-W7-T3
-> SCN-UA-005 CASE-UA-W7-002
-> grep RETRY_DELAYS remains in run-workspace.tsx
-> PENDING execution
-> FR-001
```

```text
INV-UA-003
-> SRC-UA-0014
-> DEC-UA-006 DEC-UA-010
-> UA-W8-T3 UA-W14-T2
-> SCN-UA-005 CASE-UA-W8-003 CASE-UA-W14-003
-> sort/filter query-key assertions
-> PENDING execution
-> FR-001
```

```text
INV-UA-004
-> SRC-UA-0014 SRC-UA-0026
-> DEC-UA-004
-> UA-W9-T3 UA-W10-T2
-> SCN-UA-003 CASE-UA-W9-003 CASE-UA-W10-003 NC-UA-003
-> denseLead fixture field presence
-> PENDING execution
-> FR-001
```

```text
INV-UA-005
-> SRC-UA-0014
-> DEC-UA-004 (preserve field conditions)
-> UA-W9-T1 (keep Fact/TokenList conditions)
-> SCN-UA-003 CASE-UA-W9-003
-> resolved_domain link condition unchanged
-> PENDING execution
-> FR-001
```

```text
INV-UA-006
-> SRC-UA-0016 traffic globe
-> DEC-UA-009
-> UA-W11-T1 (do not change rating/globe)
-> SCN-UA-003 CASE-UA-W11-002
-> traffic-globe.tsx read-only
-> PENDING execution
-> FR-001
```

```text
INV-UA-007
-> SRC-UA-0001
-> DEC-UA-013
-> every UA-Wn-P4
-> SCN-UA-005
-> handoff starting/ending git status
-> PENDING execution
-> FR-003
```

```text
INV-UA-008
-> SRC-UA-0022 SRC-UA-0010
-> DEC-UA-001
-> UA-W2-T1 (no new dependency)
-> SCN-UA-001 CASE-UA-W2-001
-> package.json not in any write scope
-> PENDING execution
-> FR-001
```

```text
INV-UA-009
-> A1 §7
-> DEC-UA-003 DEC-UA-004 DEC-UA-005 (locked copy only)
-> every headline task
-> SCN-UA-002 NC-UA-002
-> exact string match; no invented metrics
-> PENDING execution
-> FR-001
```

```text
INV-UA-010
-> SRC-UA-0017
-> DEC-UA-009 DEC-UA-005
-> UA-W13-T2 UA-W13-T3
-> SCN-UA-004 CASE-UA-W13-003 NC-UA-004
-> data-surface byte-for-byte
-> PENDING execution
-> FR-001
```

## Critical invariant → negative control

| Invariant | Negative control |
|---|---|
| INV-UA-001 | NC-UA-005 |
| INV-UA-002 | NC-UA-005 (poll/API path in diff) |
| INV-UA-003 | NC-UA-005 plus CASE-UA-W8-003 / CASE-UA-W14-003 oracles |
| INV-UA-004 | NC-UA-003 |
| INV-UA-005 | NC-UA-003 |
| INV-UA-006 | NC-UA-003 |
| INV-UA-007 | NC-UA-005 (unowned path reverted) |
| INV-UA-008 | NC-UA-001 |
| INV-UA-009 | NC-UA-002 |
| INV-UA-010 | NC-UA-004 |

## Coverage ID closure

Required = registered planned members: the 43 IDs in A4 §Coverage. Digest `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` (EV-UA-A-009). Executed set after UA-W1 is `{CASE-UA-W1-001, CASE-UA-W1-002}` (EV-UA-A-023). Full required=executed equality remains `PENDING` until UA-W15.

```text
DEC-UA-014
-> SRC-UA-0092 EV-UA1-I-001 EV-UA-A-022
-> A4 §Gates G2; every UA-Wn-V2; UA-W1-I002
-> SCN-UA-005 (owned-path tsc diagnostics must be empty)
-> npx tsc --noEmit --pretty false; grep authorized_write_scope paths
-> EV-UA-W1-I-002 EV-UA-A-023
-> FR-001
```

