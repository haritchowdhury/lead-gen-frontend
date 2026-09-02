# UA-W4 consolidated parent handoff

Window: `UA-W4` · Assignment: `ASG-UA-W4-01` · Window agent: `UA-W4-WINDOW-AGENT`
Date: 2026-09-02 · Status: **READY_FOR_PARENT_REVIEW**

## 1. Objective and outcome

Landing hero and run form stay landing-scale; the `.run-form-card` hairline card
now uses `var(--color-line)` / `var(--radius-panel)` per DEC-UA-001, verified by
CASE-UA-W4-001/002. Both FILE leaves (`UA-W4-S003`, `UA-W4-S004`) were executed,
independently reviewed, and accepted (`ACCEPTED_FOR_INTEGRATION`); the window
agent personally executed integration assessment `UA-W4-I001` → **PASS** (S1 §8
gates G1–G9; G4 executed and recorded per `browser_evidence: true`).

## 2. Changed-file set and digests

| File | Operation | Starting digest | Ending digest |
|---|---|---|---|
| `frontend/app/globals.css` | MODIFY | `325a442bdd1b076b8bb0b2029ff4326b91edfbe4b5a6478a540318afe3c50ea9` | `04df3d7ed3f3528c448cf05c9b0f45d78d9a422305c436dc7b8fd16487ee6a42` |
| `frontend/test/uphunt-aesthetic-w4.test.ts` | CREATE | ABSENT | `8008501d5da4b946bd07ea05260400198c306e1cfb2741fec7ed3ff44a3832a7` |

Planned == actual implementation set; §4.7 set digest
`e8825b8d8509f4f96e78186f47c08b9083022cf6e690e013eaeb568546990f1e`. The
`globals.css` diff is exactly five deleted / five added lines (S1 §6.2 hunks
1–4; `::before`/`::after`, `.suggestion-chip`, `.query-list-wrap`, and all token
definitions byte-identical).

Preserved in-scope and predecessor files, all byte-identical (G6):
`page.tsx` `3460751e72842cb22b4116211408c4c8ddaef0f4efd02513f1228182902f5a86`,
`run-form.tsx` `72576044e7f57c4e76206e7b204c73202b84775b98e309ead8ba2ccc601fb8a2`,
`landing-sections.tsx` `914c61e5…`, `section-intro.tsx` `159096f3…`,
`uphunt-aesthetic-coverage.test.ts` `f5137be4…`, `uphunt-aesthetic-w2.test.ts`
`f65ba0c5…`, `uphunt-aesthetic-w3.test.ts` `635e2802…`.

## 3. Coverage

- Window required = registered = executed = 2 (`CASE-UA-W4-001`, `CASE-UA-W4-002`);
  skipped 0, duplicate 0, unexpected 0. Window-local set digest
  `ea7e02bc33cc8ad7d247c60e5d300a3a83ac02814866ca2c97bbfc4fa3ead715`.
- After G1 `npm test`: `test/.ua-executed.json` == exactly 12 sorted IDs
  {2 × W1} ∪ {4 × W2} ∪ {4 × W3} ∪ {2 × W4}; set digest
  `c433674b9c25f667483ff9b5024bc6c8a08fad2fb02e0dd04318c9dc9194fae1`.
  S004 V-B additionally proved the w4-only command from ABSENT json yields
  exactly 4 IDs (digest `9be62b77…`), restored byte-identically to
  `7d48ebc536458ffd872edc25c7cf5aa9835abcefbd41bc767a040d39a2dc5768`.
- Registry 43-ID required digest unchanged: `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05`.
  Full required==executed equality remains UA-W15-V5.

## 4. Commands and outcomes

- S003: node exact-match apply (4 hunks, count==1 each) → §6.4 V-C numstat 5/5 +
  full diff inspection; V-D 13/13 count/needle assertions; V-E ending digest pin.
- S004: create from §7.3 bytes (digest pin); V-C in-memory NC probes 3/3
  falsified; V-D backup → w4-only run (tests 4, pass 4, fail 0, skipped 0) →
  json == 4 IDs → restore byte-identical (git-verified unmodified).
- I001: G1 `npm test` = 166 pass / 0 fail / 0 skipped; G2 `npx tsc --noEmit
  --incremental false --pretty false` = 13 physical lines / 10 parked SRC-UA-0092
  diagnostics, zero owned-needle lines (`uphunt-aesthetic-w4.test.ts`, `page.tsx`,
  `run-form.tsx`); G3 `npm run lint` exit 0; G4 `/usr/bin/google-chrome --headless`
  screenshots of route `/` ONLY at 390/768/1280/1440; G5 12-ID set + digests;
  G6 byte pins + forbidden-path negative search (0 hits; root
  `ACTIVE_EXECUTION_STATE.md` untouched); G7 imports → 0 network/DB operations;
  G8 NC re-execution 3/3 falsified; G9 successor search clean.

## 5. Browser evidence

`frontend/review-evidence/uphunt-aesthetic/UA-W4/UA-W4-home-{390,768,1280,1440}.png`
(local dev server, headless chrome; local_e2e evidence only, not a CASE oracle
per SUB-UA-001; no credentials, no external calls).

## 6. Sandbox recoveries, negative controls, residue

- No sandbox-escalated recovery was needed; no environment-invalidated attempts.
- Negative controls: S004 V-C 3/3 and I001 G8 3/3 falsified (render-removal,
  hunk-1 border revert, hunk-3 radius revert each falsify its oracle).
- Known tracked-path residue (inherited, owner commit `d6121aa`):
  `test/.ua-executed.json` is tracked and is modified by `npm test` (DEC-UA-011
  runtime output, now 12 IDs). NOT committed by this window; untracking remains
  a parent decision.

## 7. Artifacts and revisions

- S1 `frontend/docs/open-work/uphunt-aesthetic/UA-W4_SUBWINDOW_DECOMPOSITION_S1.md`
  `7663766adb05ec772092f92d5191e3612974a0fef79e04bab50195f758852486`
- S2 `frontend/docs/open-work/uphunt-aesthetic/UA-W4_SUBWINDOW_STATE_S2.yaml`
  (decomposition READY; S003/S004 accepted; I001 PASS; next_subwindow STOP)
- S3 `frontend/docs/open-work/uphunt-aesthetic/UA-W4_SUBWINDOW_EVIDENCE_S3.md`
  (EV-UA-W4-D-001..004, EV-UA-W4-S-001/002, EV-UA-W4-I-001)
- A4 UA-W4 P1–P4, V1–V5, H1–H6 checked with resolvable evidence; A5
  `current_status: AWAITING_REVIEW`; A6 appended.

## 8. Successor boundary

`UA-W5` was NOT started: no `uphunt-aesthetic-w5.test.ts`, no lower-landing
edits, `A5.next_window` untouched, `may_start_successor: false` honored
throughout. Window stops here per UA-W4-H6.
