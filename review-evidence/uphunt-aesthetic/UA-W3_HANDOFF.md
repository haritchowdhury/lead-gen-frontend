# UA-W3 handoff — Shell, auth, 404

## Objective and status

- Objective (A4 §UA-W3): header, auth pages, and 404 use the landing headline
  recipe and existing tokens.
- **Status: READY_FOR_PARENT_REVIEW** (`WINDOW-AGENT-INTEGRATION-PASS`,
  UA-W3-I001, S3 `EV-UA-W3-I-001` block). No blocker. No successor started
  (`UA-W4` reserved for parent; `may_start_successor: false`).

## Subordinate artifacts

| Artifact | Path | Revision (SHA-256) |
|---|---|---|
| S1 | `frontend/docs/open-work/uphunt-aesthetic/UA-W3_SUBWINDOW_DECOMPOSITION_S1.md` | `35fbc5f6489ff89cf1680a068b30e1ba6edab36ede9f7418924fbb21d9557ef2` (parent-approved v2) |
| S2 | `frontend/docs/open-work/uphunt-aesthetic/UA-W3_SUBWINDOW_STATE_S2.yaml` | final state recorded at handoff (see S2 file) |
| S3 | `frontend/docs/open-work/uphunt-aesthetic/UA-W3_SUBWINDOW_EVIDENCE_S3.md` | append-only; S001–S004 certificates + I001 certificate |

## Changed-file set (implementation) with SHA-256

| File | Operation | Starting | Ending |
|---|---|---|---|
| `frontend/components/auth-form.tsx` | MODIFY | `54b6bde1a85b398f57b330988135ac57a0030c2697c5edb0b8c55de75f296bf2` | `efffc7b883268418e26e3ecb3d12e72036cae8093448eb87a4cf0d68d8905119` |
| `frontend/app/not-found.tsx` | MODIFY | `d35117bd611c5e0315ac263e6220a84005a7f1f208dcf09e15adec2dd405afe4` | `0ec6a3b2a0526fc51248ca1766636b63bed32e1aef4bafac7907f5fc06ca682c` |
| `frontend/app/globals.css` | MODIFY | `7df1646d8b4d834ebd6d5cf95f1f0bcf77f351e1b84d2ebfcb9e4314bc79f407` | `325a442bdd1b076b8bb0b2029ff4326b91edfbe4b5a6478a540318afe3c50ea9` |
| `frontend/test/uphunt-aesthetic-w3.test.ts` | CREATE | ABSENT | `635e28022e14646c26407dd41c77c55a4c7fb3b34c6aa29d2f6b63eaaee69b13` |

Preserved in-scope file: `frontend/components/app-header.tsx` =
`050da7c4a8835e9421d9a9621bba748c17398204a6ae1347fd1c8c4ca942c2a1`
(byte-identical; G0/G6). No migrations. Predecessors byte-identical:
`section-intro.tsx 159096f3…`, `landing-sections.tsx 914c61e5…`,
`uphunt-aesthetic-w2.test.ts f65ba0c5…`,
`uphunt-aesthetic-coverage.test.ts f5137be4…`.

globals.css delta is exactly the seven S1 §8.2 hunks (selector retargets ×8 line
changes + `.auth-card` padding `var(--space-6)`); sticky header and both
`--radius-panel` card radii kept; tokens untouched; line count 8393 → 8393.

## Coverage (window-local)

- Required = registered = executed = {CASE-UA-W3-001, CASE-UA-W3-002,
  CASE-UA-W3-003, CASE-UA-W3-004}; skipped 0, duplicate 0, unexpected 0.
- Window-local set digest (E6): `25e6c1d7ca199a383069570b7a083e57b39c8f81b32b7f4c02b7aaa04bea470f`.
- Registry set digest (43 IDs): `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05`
  (asserted inside G1 by CASE-UA-W1-002).
- Executed set after `npm test`: `test/.ua-executed.json` = the 10 sorted IDs
  {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3}
  (`7d48ebc536458ffd872edc25c7cf5aa9835abcefbd41bc767a040d39a2dc5768`).
  Full 43-set equality remains UA-W15-V5.

## Commands and outcomes

| Gate | Command | Outcome |
|---|---|---|
| G0 | sha256sum predecessors + app-header | all pins byte-exact |
| G1 | `npm test` | exit 0; 162 pass / 0 fail / 0 skipped; CASE-UA-W3-001..004 pass |
| G2 | `npx tsc --noEmit --pretty false` | 10 parked SRC-UA-0092 diagnostics only; zero owned-path needles (DEC-UA-014 PASS) |
| G3 | `npm run lint` | exit 0 (2 pre-existing warnings in unowned files) |
| G4 | headless Chrome screenshots | 16/16 under `review-evidence/uphunt-aesthetic/UA-W3/` (routes /, /sign-in, /sign-up, /this-lead-run-does-not-exist × 390/768/1280/1440); local `next dev` stopped after capture |
| G5 | executed-set + digest checks | 10-ID set; window-local 4/4/4 |
| G6 | git status + forbidden-path search | 0 forbidden fragments; delta = 4 planned files + coordination artifacts + documented runtime file (below) |
| G7 | import inspection | 0 network / 0 DB operations |
| G8 | negative controls | NC-UA-002 (N1/N2) + NC-UA-001 (N3) all falsified |
| G9 | successor negative search | no UA-W4 artifacts; A5 current_window UA-W3 |

Raw outputs: `/tmp/opencode/ua-w3-i001-{tsc,npmtest,lint}.txt`.

## Browser evidence (local_e2e, not a CASE oracle — SUB-UA-001)

`root-*.png`, `sign-in-*.png`, `sign-up-*.png`, `not-found-*.png` at
390x844 / 768x1024 / 1280x800 / 1440x900 (16 files). Visual inspection
(sign-in and not-found at 1280) confirms the DEC-UA-003 eyebrow/title/copy
strings render exactly, with the retargeted heading/copy values, sticky header,
`--radius-panel` cards, and intact links/forms/buttons.

## Negative controls

- NC-UA-002: title-node removal breaks the CASE-UA-W3-001/004 oracles
  (S001 V-C, S002 V-C leaf probes; re-executed at I001 G8).
- NC-UA-001: `--color-signal` removal breaks the CASE-UA-W3-003 oracle
  (S004 V-C N3; re-executed at I001 G8). 3/3 falsified.

## Sandbox recoveries

None. No attempt was invalidated by sandbox denial or channel loss; no identical
recovery was used (E8.1 policy inherited, unused).

## Residual parent-review items (non-blocking)

1. `frontend/test/.ua-executed.json` is **tracked** at HEAD because owner commit
   `d6121aa "W2"` committed it against DEC-UA-011's never-commit contract. The
   prescribed `npm test` therefore shows it as a modified tracked path (ending
   content is the correct 10-ID set). Untracking it (gitignore) is a parent
   decision outside UA-W3 scope (no commits authorized).
2. `.next/` dev-server output from G4 is git-ignored tool state; no workspace
   delta.

## Successor confirmation

`UA-W4` was not started: no `uphunt-aesthetic-w4.test.ts`, no `page.tsx` /
`run-form.tsx` edits, `A5.current_window` still `UA-W3`, `may_start_successor:
false`, S2 `next_subwindow: STOP`.
