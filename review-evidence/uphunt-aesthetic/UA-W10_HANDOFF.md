# UA-W10 Window-Agent Handoff

**Window:** `UA-W10` — Uphunt-aesthetic lead-details store-fit / provenance headings + CSS type
floor and 3-column evidence grid.
**Identity:** `UA-W10-WINDOW-AGENT`. **Assignment:** `ASG-UA-W10-01` (decomposition + `S001`–`S004`
leaves + `I001`).
**Status:** `READY_FOR_PARENT_REVIEW`. The FILE sequence was executed and personally reviewed
in-window (`DEC-UA-015`); integration assessment **`UA-W10-I001` PASS** (`G1`–`G9` all PASS,
personally executed by the window agent, never delegated).

## Objective

Freeze the DEC-UA-004 03/04 headings and copy for the run-lead expanded LeadDetails
(`03 · Fit` / `Whether this shop belongs in the market you asked for.`, `04 · Provenance` /
`How this store entered the list.`) via the SectionIntro eyebrow/copy path, retarget the
store-evidence/discovery CSS guard (h3→marketing-heading; 12px labels / 14px values), add the
section marketing-heading margin rule, scope the store-fit/discovery fact-grid 12px/14px
overrides, extend the evidence-ledger fact-grid to a 3-column `repeat(3)` grid, and re-pin the
`lead-details-component.test.ts` title-order assertion. `UA-W10` only; no `UA-W11`.

## Changed-file set (starting SHA-256 → ending SHA-256)

| File | Operation | Starting | Ending |
|---|---|---|---|
| `frontend/components/lead-details.tsx` | MODIFY | `5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c` | `9431f71bf7d85de0b81752dfff79206f13d3e0747405aaf25f5ee58c3b6a3727` |
| `frontend/app/globals.css` | MODIFY | `6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d` | `4945bb591d78593fea95d1470b0db64445bd14d498e35f3dec8fb88a588ae872` |
| `frontend/test/lead-details-component.test.ts` | MODIFY | `f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b` | `ca1d02c3c685bd2d0aa95fb93111d405c20e616424d4cc60aaffc172e8b9ee96` |
| `frontend/test/uphunt-aesthetic-w10.test.ts` | CREATE | `ABSENT` | `0a2b34e632c450ff97bcf95d6be34ec4768e848b49dc250a3f9cb6419875d724` |

Preserved zero-edit in-scope files (byte-identical starting == ending):

| File | SHA-256 |
|---|---|
| `frontend/components/section-intro.tsx` | `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175` |
| `frontend/components/results-table.tsx` | `a4e1472fdc4129d20a61faa893d07694dba1528336cfabd257219833cd7d0b4f` |
| `frontend/components/results-filters.tsx` | `0ab118e47349efb0c71e4facaf9bdd2844d8ea564f3c1fbf59afbc7e6e22b881` |
| `frontend/components/cumulative-traffic.tsx` | `7d37a3ae2eb8e423a539f85330688bcc863a4e028525bce46222ac1cbbdb45aa` |
| `frontend/app/leads/page.tsx` | `21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b` |
| `frontend/components/leads/live-leads-workspace.tsx` | `a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36` |
| `frontend/components/run-workspace.tsx` | `643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3` |
| `frontend/components/traffic-enrichment.tsx` | `833cb54c4b06034aa6e11a044d329c04710856e25e0ea189cc9a74655623be08` |
| `frontend/components/landing-sections.tsx` | `914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15` |
| `frontend/components/query-editor.tsx` | `92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c` |
| `frontend/components/run-progress.tsx` | `15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38` |
| `frontend/app/runs/[runId]/page.tsx` | `719e05ea0eec73fe948f0c41a9c56c970d6db61cfff0c990e59666136a069072` |
| `frontend/test/fixtures.ts` | `9ea26525ed983b71063aad9e84ea492f2c85d0c95f80ba238b0a48352836c4b4` |
| `frontend/test/uphunt-aesthetic-coverage.test.ts` | `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` |
| `frontend/test/uphunt-aesthetic-w2.test.ts` | `f65ba0c50c78ef983496d0a37af1a1a6a1234332c48a5290bc344c9a5e68b78c` |
| `frontend/test/uphunt-aesthetic-w3.test.ts` | `635e28022e14646c26407dd41c77c55a4c7fb3b34c6aa29d2f6b63eaaee69b13` |
| `frontend/test/uphunt-aesthetic-w4.test.ts` | `8008501d5da4b946bd07ea05260400198c306e1cfb2741fec7ed3ff44a3832a7` |
| `frontend/test/uphunt-aesthetic-w5.test.ts` | `ee6425e9be6ca190d27981b39656dc1692f5cc2b0c049795a59f28d418cffe06` |
| `frontend/test/uphunt-aesthetic-w6.test.ts` | `f78b8da2fad5084777ec727d25ad21d4d81a08994eaa5c406643821d8deaec1a` |
| `frontend/test/uphunt-aesthetic-w7.test.ts` | `92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842` |
| `frontend/test/uphunt-aesthetic-w8.test.ts` | `cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0` |
| `frontend/test/uphunt-aesthetic-w9.test.ts` | `baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31` |

## Case registration and execution

- Window-local required / registered / executed / skipped / duplicate / unexpected:
  **3 / 3 / 3 / 0 / 0 / 0** (`CASE-UA-W10-001..003`). Two additional registry IDs
  (`CASE-UA-W1-001/002`) are re-executed via the `uphunt-aesthetic-w10.test.ts` import
  (coverage re-validation), and the 24 predecessor IDs re-execute in the full `npm test` run.
- Required-set digest (window-local W10 3-ID): `3b210dab559e6f4c96f4ea8ad11630ba8ea0a11293619ba7579f330b85f158e1`.
- Post-`npm test` executed-set digest (29 IDs): `b9c2a4676e1447f07a454f236ae0a26a2a7f0f28bfbb8ddad6ff6ee149b36d22`.
- Full 43-ID registry-set equality is **not** asserted here; `UA-W15-V5` owns it.

## Commands and outcomes

- `S001` lead-details: two ordered hunks (count==1 each); numstat `2 2`; ending `9431f71b…`;
  V-D post-state: 03/04 titles, eyebrows, copy ==1; old titles ==0; W9 overview title ==1.
- `S002` globals.css: four ordered hunks (count==1 each); numstat `32 7`; ending `4945bb59…`.
- `S003` ldc-test: one ordered replacement (count==1); numstat `1 1`; ending `ca1d02c3…`;
  single-file `node --test` 11 pass / 0 fail; `test/.ua-executed.json` unchanged `cc1b2718…`.
- `S004` w10-test: CREATE with exact `§9.3` bytes (`0a2b34e6…`); V-D backup/run/restore →
  5 pass / 0 fail (`CASE-UA-W1-001`, `CASE-UA-W1-002`, `CASE-UA-W10-001..003`), w10-only set
  digest `cebb79c4…`, json restored `cc1b2718…`.
- `G1` `npm test` → 195 / 192 pass / 3 fail (failures exactly the allowed predecessor heading
  set: `My searches presents keyword research and identifiable run dossiers without rendering IDs`,
  `MRR-FE-01 exact research payload and two-section surface`, `MRR-W2 frontend unit certificate`);
  exit 1 expected and is **not** a fail. First run hit the DEC-UA-011 concurrent `recordExecuted`
  JSON race (`CASE-UA-W8-001` `SyntaxError: Unexpected end of JSON input`) — one identical rerun
  cleared it and the 29-ID set registered; this is a race on a predecessor test, **not** a product
  failure. Observed 195/192 vs the DEC-UA-016 expected 193/190 is +2 passing predecessor tests;
  the behavioral G1 oracle (W10 cases pass; every failing title ∈ the heading-oracle set) held
  exactly.
- `G2` `npx tsc --noEmit --incremental false --pretty false` → only 13 physical lines of the 10
  parked `SRC-UA-0092` diagnostics; **zero** owned-path needles
  (`lead-details.tsx`, `lead-details-component.test.ts`, `uphunt-aesthetic-w10.test.ts`).
  Parked files untouched.
- `G3` `npm run lint` → exit 0 (0 errors; 2 warnings in unrelated `traffic-globe.tsx`,
  `keyword-intelligence-dashboard.mjs`).
- `G5` post-G1 executed set == 29 sorted IDs; digest `b9c2a467…`; zero skips/duplicates/unexpected;
  W10-window 3-ID digest `3b210dab…`.
- `G6` all four planned ending pins + all zero-edit in-scope and w2–w9 byte pins recomputed and
  MATCH; forbidden-path negative search (see below) → **NONE**; implementation delta == exactly the
  four planned files; `A5`/`A6` unaffected by leaves.
- `G7` static import/suite inspection → 0 network, 0 DB, 0 WebSocket operations.
- `G8` fresh in-memory NC probes N1–N6 all falsified (oracles are sensitive, not vacuous):
  N1,N3→CASE-UA-W10-001; N2,N4→CASE-UA-W10-002; N5,N6→CASE-UA-W10-003.
- `G9` successor negative search → no `UA-W11` artifact; `A5.current_window: UA-W10`;
  `A5.next_window: UA-W11` untouched; `may_start_successor: false` honored.

## Browser evidence (G4)

`frontend/review-evidence/uphunt-aesthetic/UA-W10/`:
`completed-390.png` (390×900), `completed-768.png` (768×900), `completed-1280.png` (1280×900),
`completed-1440.png` (1440×900). Route frozen to
`/design-fixture?scenario=completed` **only**; live `/runs/[runId]` not screenshotted (it polls).
`g4-checks.json` + `g4-browser-server.log` accompany. The completed fixture renders through
`RunWorkspace` → proxied auth-gated `/api/runs/run_fixture_completed*` (synthetic id, not a
backend row, auth-gated), so G4 used the G-R1-style synthetic `.example` pre-hydration
interception to render the real compiled `ResultsTableView` (first row expanded) + `LeadDetails`
against the real compiled `globals.css` (no live run, no credentials). Local_e2e evidence, not a
CASE oracle (SUB-UA-001). The enlarged dense lead spans ~11,000px, so the captures are full-page
(`captureBeyondViewport`) at each width to guarantee the frame contains BOTH the 03 and 04
headlines. Captured invariants (all asserted in `g4-checks.json`): first row expanded; LeadDetails
visible; `03 · Fit` eyebrow + `Whether this shop belongs in the market you asked for.` +
`Exact input, normalized category, and the store-fit evidence behind the call.` copy; `04 ·
Provenance` eyebrow + `How this store entered the list.` + `Query, rank, and the occurrences that
produced this row.` copy; both headings readable (≥12px); store-fit evidence grid `repeat(3)`
(3 columns); store-fit `dt` 12px / `dd` 14px.

## Negative controls

N1 (03 title → `Category and store fit`) → CASE-UA-W10-001 falsified. N2 (04 title →
`Discovery provenance`) → CASE-UA-W10-002 falsified. N3 (`03 · Fit` eyebrow dropped) →
CASE-UA-W10-001 falsified. N4 (`04 · Provenance` eyebrow dropped) → CASE-UA-W10-002 falsified.
N5 (`Structured store-fit evidence` label removed) → CASE-UA-W10-003 falsified. N6 (`Search query`
label removed) → CASE-UA-W10-003 falsified.

## Forbidden-path negative search

Implementation delta `git status --porcelain` == exactly the four planned files; forbidden-hit
scan (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`,
`email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, parked test files, coverage
test, `REQUIRED_CASE_IDS`, `section-intro.tsx`, `landing-sections.tsx`, `traffic-enrichment.tsx`,
`fixtures.ts`, `run-workspace.tsx`, `leads/page.tsx`, `live-leads-workspace.tsx`, W4–W9 product
files, w2–w9 test files, `design-system-shell.test.ts`, `LeadOverview`/`ScoreDetails`/
`IdentityDetails`/`ContactDetails`/`OutcomeBadge`) → **NONE**.

## Sandbox recoveries

One. The `npm test` (G1) first run surfaced the known DEC-UA-011 concurrent `recordExecuted`
JSON race (`CASE-UA-W8-001` `SyntaxError: Unexpected end of JSON input`). Per DEC-UA-016/E8.1 one
identical rerun was performed (same command, selection, env, fixtures, timeouts, oracles, write
scope); it cleared the race and registered the full 29-ID set with no other product/test failure.
Read-only proof that no surviving process/mutation/acceptance result remained was confirmed before
the rerun. No other sandbox/channel recovery was needed (browser capture, `tsc`, `lint` all
succeeded first attempt). Note: the race is on a W8 predecessor test, not a W10 behavior.

## Coordination artifacts

- `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W10_SUBWINDOW_DECOMPOSITION_S1.md`
  `f4fb39729d8d7c00995ff3443289cfa34a395330e65e67a5c3609697cb9b76d3` (frozen as authored).
- `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W10_SUBWINDOW_STATE_S2.yaml`
  `0f98494bf683e211e918430fa4e60dea8c8f0e5ce9d571cd747344a47d659a1e`
  (advanced by the window agent through `S001`/`S002`/`S003`/`S004` → `I001`; `current_status:
  READY_FOR_PARENT_REVIEW`; `accepted_subwindows` S001–S004 + I001; `next_subwindow: STOP`).
- `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W10_SUBWINDOW_EVIDENCE_S3.md`
  `4fe506dbf201119c5b2b45f8c9bc59cb4b09d2f132ae1841f36258375b557e8b`
  (`EV-UA-W10-D-001..002`, `EV-UA-W10-S-001..004`, `EV-UA-W10-R-001..004`,
  `WINDOW-AGENT-INTEGRATION-PASS`).

## `.ua-executed.json` residue

`test/.ua-executed.json` is tracked runtime output (owner commit residue). It is left in the
post-G5 state: exactly the 29 sorted IDs (digest `b9c2a467…`), shown as
` M test/.ua-executed.json` in `git status --porcelain`. **Never committed** by the window agent.

## A5 post-handoff

`A5.current_status` set to `AWAITING_REVIEW` (sole authorized post-I001 A5 action);
`A5.current_window: UA-W10` unchanged; `next_window: UA-W11` frozen; `stop_after: UA-W15`;
`may_start_successor: false`. New A5 SHA-256 after the authorized handoff write:
`34608dc4ab3c96596470f5c9a7f2a4a96c426268c499d58951002cb5c41bda84`.

## S004 ending-digest reconciliation note (from S1 §0)

Parent consequence 6 pinned a reference fence `c7d41c8f52f5590d32640a9355fad3c3e83ea103e97dccda7906c5d48656c101`
for the w10 test file but granted sub-window standard `§7.3` non-behavioral formatting freedom
("S1 must freeze deterministic bytes"). The window agent froze deterministic bytes (`0a2b34e6…`)
achieving the identical behavior/strings/numstat, documented in the S1 §0 note (same class as the
W9 JSX note). The three implementation-file ending digests (`9431f71b…`, `4945bb59…`,
`ca1d02c3…`) reproduce the parent pins exactly with no reconciliation required.

## UA-W11

Not started. `A5.current_window` remains `UA-W10`; `next_window` remains frozen at `UA-W11`;
`may_start_successor: false` honored. `A5.current_status` set to `AWAITING_REVIEW`. `UA-W10-H6`
holds.
