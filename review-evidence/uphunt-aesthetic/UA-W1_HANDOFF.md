# UA-W1 handoff — frozen coverage registry and forbidden-path check

## Objective

UA-W1 delivers the frozen coverage registry with no visual product change:
`frontend/test/uphunt-aesthetic-coverage.test.ts` listing all 43 `CASE-UA-*` IDs
and a forbidden-path allowlist check, per `A4` §UA-W1 and `DEC-UA-011`.

## Status

`READY_FOR_PARENT_REVIEW` — integration assessment `UA-W1-I002` result PASS
(earlier `UA-W1-I001` `PARENT_BLOCKED` on the exit-0 tsc oracle superseded by
parent decision `DEC-UA-014` / `CHG-UA-0002`, amendment `UA-W1-AM-001`).

## Authority

- Assignment: `ASG-UA-W1-02` (`ASG-UA-W1-01` closed), agent `UA-W1-WINDOW-AGENT`
- Pins verified 2026-09-01: `A1` `a33ae1d8af4442de2680dc70f2c6e793a668b1400f0814833489061848c9baef`,
  `A3` `8faaa4e2411235d8a83ec94de6a07e53c54ece91d99121a3c0e09cb6052f4300`,
  `A4` `f1d8252cb815a541a4854c157c25698868a5caa8d27b351ce88480b6dffda99f`,
  sub-window standard `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0`
- Subordinate artifacts:
  - S1 `frontend/docs/open-work/uphunt-aesthetic/UA-W1_SUBWINDOW_DECOMPOSITION_S1.md` `3a82e00f7eb77325374dc089adf8e62dced40e3b79100b49bc02df6b707da2c3`
  - S2 `frontend/docs/open-work/uphunt-aesthetic/UA-W1_SUBWINDOW_STATE_S2.yaml`
  - S3 `frontend/docs/open-work/uphunt-aesthetic/UA-W1_SUBWINDOW_EVIDENCE_S3.md`

## Changed-file set and digests

| Path | Operation | SHA-256 |
|---|---|---|
| `frontend/test/uphunt-aesthetic-coverage.test.ts` | CREATE (leaf `UA-W1-S001`, `ASG-UA-W1-01-S001`) | `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` |

Starting digest ABSENT; file is byte-identical to frozen S1 §6.3 (diff-empty proof,
S3 `EV-UA1-R-001`). No migrations. Implementation delta = exactly this file;
all other delta paths are parent-owned authority artifacts (`A2`–`A8` parent
revisions), this window's authorized S1/S2/S3 coordination writes, and the
preserved user-owned `docs/open-work/design-system/` path (INV-UA-007).

## Coverage

| Measure | Count / value |
|---|---|
| Required CASE IDs | 43 |
| Registered (executable now, this window) | 2 (`CASE-UA-W1-001`, `CASE-UA-W1-002`) |
| Executed | 2 |
| Skipped / duplicate / unexpected | 0 / 0 / 0 |
| Required-set digest (E6) | `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` |
| Window executed-set digest | `a50e31032032395f9397c9bea3748be5b1e77ca8577750371c3dd00d17c81155` |
| Full-set required=executed equality | deferred to `UA-W15-V5` by design (`DEC-UA-011`) |

Remaining 41 CASE IDs are planned registrations of `UA-W2`..`UA-W15` per the
`A4` §Coverage `test_registration` column; `REQUIRED_CASE_IDS` is frozen and
MUST NOT be edited by later windows.

## Commands and outcomes (from `frontend/`)

| Command | Outcome |
|---|---|
| `node --experimental-strip-types --test test/uphunt-aesthetic-coverage.test.ts` | 2/2 pass, 0 skipped (leaf `EV-UA1-R-001`) |
| `npm test` | 150 pass / 0 fail / 0 skipped — `UA-W1-I001` and re-confirmed in `UA-W1-I002` |
| `npx tsc --noEmit` (original G2, superseded) | exit nonzero; 10 pre-existing errors, byte-identical without this window's file (`EV-UA1-I-001`) — superseded by `DEC-UA-014` |
| `npx tsc --noEmit --pretty false` (G2 per `DEC-UA-014`) | 10 diagnostics, all parked `SRC-UA-0092` files; **zero** diagnostics on any UA-W1 `authorized_write_scope` path → PASS |
| Negative controls N1 (NC-UA-005), N2 (NC-UA-006) | both falsified as prescribed (forbidden fragment caught; 42-ID digest ≠ pin; duplicate throws before hashing) |
| `npm run lint` | not run — UA-W1 owns no CSS/JSX (gate conditional) |
| Browser evidence | not applicable — F1 `browser_evidence: false` |

Sandbox recoveries: none (no sandbox-invalidated attempts occurred).

## Forbidden-path negative search

`git status --porcelain` delta contains no `app/api`, `lib/api-types.ts`,
`lib/api-validation.ts`, `lib/client-api.ts`, `email_scraper/`, root
`ACTIVE_EXECUTION_STATE.md`, `package.json`, design-fixture, or app/component
file. The five parked test files were not edited (A5
`edit_parked_SRC-UA-0092_test_files` prohibition honored). Root
`ACTIVE_EXECUTION_STATE.md` untouched (coordination root clean).

## Successor confirmation

No `UA-W2` work started: no `test/uphunt-aesthetic-w2.test.ts`, no
`components/section-intro.tsx`, no successor assignment. `may_start_successor:
false`; `UA-W2` remains reserved for the parent.

## Residual parent review items

1. Parent acceptance of UA-W1 (reserved to parent).
2. Per `DEC-UA-014`: `UA-W15` `npm run build` remains specified; a failure solely
   on the parked `SRC-UA-0092` files will be a later parent decision, not a silent skip.

Key evidence: S3 `EV-UA1-D-001..003`, `EV-UA1-X-001/002`, `EV-UA1-R-001`,
`EV-UA1-I-001/002`, `EV-UA1-N-001`; A6 `EV-UA-W1-D-001`, `EV-UA-W1-E-001`,
`EV-UA-W1-I-001`, `EV-UA-W1-I-002`.
