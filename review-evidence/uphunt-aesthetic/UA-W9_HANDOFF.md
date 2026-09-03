# UA-W9 Window-Agent Handoff

**Window:** `UA-W9` — Uphunt-aesthetic lead-details/overview CSS + react-markup refinement.
**Identity:** `UA-W9-WINDOW-AGENT`. **Assignment:** `ASG-UA-W9-01` (decomposition + `S001`–`S004`
leaves + `I001`).
**Status:** `READY_FOR_PARENT_REVIEW`. The FILE sequence was executed and personally reviewed
in-window (`DEC-UA-015`); integration assessment **`UA-W9-I001` PASS** (`G1`–`G9` all PASS,
personally executed by the window agent, never delegated).

## Objective

Refresh the run-lead expanded LeadDetails markup (SectionIntro overview heading/copy; renamed
Strength/Identity/Reachability panels with copy) and the matching CSS (heading type floor,
3-column identity/score grid, marketing-heading retargets) for Uphunt-aesthetic `UA-W9` only.
No design-system G-R1 work. No `UA-W10`.

## Changed-file set (starting SHA-256 → ending SHA-256)

| File | Operation | Starting | Ending |
|---|---|---|---|
| `frontend/components/lead-details.tsx` | MODIFY | `0ceec9058af2c24d65c8ef880848b114674352a2c0593ec0a64914a0f9aefc5b` | `5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c` |
| `frontend/app/globals.css` | MODIFY | `f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c` | `6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d` |
| `frontend/test/lead-details-component.test.ts` | MODIFY | `8f7f611b3866b1cfd108ebb2acb0c06c8a06da74035ab4e5dd433a4fd8431412` | `f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b` |
| `frontend/test/uphunt-aesthetic-w9.test.ts` | CREATE | `ABSENT` | `baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31` |

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
| `frontend/test/uphunt-aesthetic-w8.test.ts` | `cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0` |
| `frontend/test/uphunt-aesthetic-w2.test.ts` | `f65ba0c50c78ef983496d0a37af1a1a6a1234332c48a5290bc344c9a5e68b78c` |
| `frontend/test/uphunt-aesthetic-w3.test.ts` | `635e28022e14646c26407dd41c77c55a4c7fb3b34c6aa29d2f6b63eaaee69b13` |
| `frontend/test/uphunt-aesthetic-w4.test.ts` | `8008501d5da4b946bd07ea05260400198c306e1cfb2741fec7ed3ff44a3832a7` |
| `frontend/test/uphunt-aesthetic-w5.test.ts` | `ee6425e9be6ca190d27981b39656dc1692f5cc2b0c049795a59f28d418cffe06` |
| `frontend/test/uphunt-aesthetic-w6.test.ts` | `f78b8da2fad5084777ec727d25ad21d4d81a08994eaa5c406643821d8deaec1a` |
| `frontend/test/uphunt-aesthetic-w7.test.ts` | `92201c35dbf51758c911d11dbe312df611fd1cc2f9a27c086ff39304c98cb842` |

## Case registration and execution

- Window-local required / registered / executed / skipped / duplicate / unexpected:
  **4 / 4 / 4 / 0 / 0 / 0** (`CASE-UA-W9-001..004`). Two additional registry IDs
  (`CASE-UA-W1-001/002`) are re-executed via the `uphunt-aesthetic-w9.test.ts` import
  (coverage re-validation), and the 20 predecessor IDs re-execute in the full `npm test` run.
- Required-set digest (window-local W9): `73acdc6bf1c7d1258d64f93b8371f5a33b4fd1a2cf56762fc93e2d785ed06451`.
- Post-`npm test` executed-set digest (26 IDs): `48c03081df64e9bc5fb69c29dbb65257b6364aa1c0a0fdd37bcf4c9185fb7fb7`.
- Full 43-ID registry-set equality is **not** asserted here; `UA-W15-V5` owns it.

## Commands and outcomes

- `S001` lead-details: seven ordered hunks (count==1 each); numstat `17 5`; ending `5f32de7f…`.
- `S002` globals.css: eight ordered hunks (count==1 each); numstat `9 9`; ending `6e57268a…`.
- `S003` ldc-test: three ordered replacements (count==1 each); numstat `3 3`; ending `f8f7323c…`;
  single-file `node --test` 11 pass / 0 fail; `test/.ua-executed.json` unchanged `34f5b71a…`.
- `S004` w9-test: CREATE with exact `§9.3` bytes (`baee1b2e…`); V-D backup/run/restore →
  6 pass / 0 fail, executed-set digest `7254ec52…`, json restored `34f5b71a…`.
- `G1` `npm test` → 190 / 187 pass / 3 fail (failures exactly the allowed predecessor heading
  set: `My searches presents keyword research and identifiable run dossiers without rendering IDs`,
  `MRR-FE-01 exact research payload and two-section surface`, `MRR-W2 frontend unit certificate`);
  exit 1 expected and is **not** a fail.
- `G2` `npx tsc --noEmit --incremental false --pretty false` → only 13 physical lines of the 10
  parked `SRC-UA-0092` diagnostics; **zero** owned-path needles. Parked files untouched.
- `G3` `npm run lint` → exit 0 (0 errors; 2 warnings in unrelated `traffic-globe.tsx`,
  `keyword-intelligence-dashboard.mjs`).
- `G5` post-G1 executed set == 26 sorted IDs; digest `48c03081…`; zero skips/duplicates/unexpected.
- `G7` static import/suite inspection → 0 network, 0 DB, 0 WebSocket operations.
- `G8` fresh in-memory NC probes N1–N6 all falsified (N1,N2→W9-001; N3→W9-002; N4→W9-003;
  N5,N6→W9-004).
- `G9` successor negative search → no `UA-W10` artifact; `A5.current_window: UA-W9`;
  `A5.next_window: UA-W10` untouched; `may_start_successor: false` honored.

## Browser evidence (G4)

`frontend/review-evidence/uphunt-aesthetic/UA-W9/`:
`completed-390.png` (390×900), `completed-768.png` (768×900), `completed-1280.png` (1280×900),
`completed-1440.png` (1440×900). Route frozen to
`/design-fixture?scenario=completed` **only**; live `/runs/[runId]` not screenshotted (it polls).
`g4-checks.json` + `g4-browser-server.log` accompany. The completed fixture renders through
`RunWorkspace` → proxied auth-gated `/api/runs/run_fixture_completed*` (synthetic id, not a
backend row, auth-gated), so G4 used the G-R1-style synthetic `.example` pre-hydration
interception to render the real compiled `ResultsTableView` (first row expanded) + `LeadDetails`
against the real compiled `globals.css` (no live run, no credentials). Local_e2e evidence, not a
CASE oracle (SUB-UA-001). Captured invariants: first row expanded; LeadDetails visible;
`01 · The store` eyebrow + `Know the business behind this domain.` + `Score, identity, and the
outreach paths that were actually recorded.` copy; Strength/Identity/Reachability panels with
their copy props; identity/score grid `repeat(3)` (3 columns); overview heading `font-size:
1.375rem` (22px).

## Negative controls

N1 (heading string → `Lead overview`) → CASE-UA-W9-001 falsified. N2 (SectionIntro import
removed) → CASE-UA-W9-001 falsified. N3 (`font-size: 0.5rem;` reintroduced in the `> h3` block)
→ CASE-UA-W9-002 falsified. N4 (`detail-score` dropped) → CASE-UA-W9-003 falsified. N5
(`repeat(8…)` reintroduced) → CASE-UA-W9-004 falsified. N6 (combined `repeat(3)` split to 8/6)
→ CASE-UA-W9-004 falsified.

## Forbidden-path negative search

Implementation delta `git status --porcelain` == exactly the four planned files; forbidden-hit
scan (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`,
`email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, parked test files, coverage
test, `REQUIRED_CASE_IDS`, `section-intro.tsx`, `landing-sections.tsx`, `traffic-enrichment.tsx`,
`fixtures.ts`, `run-workspace.tsx`, `leads/page.tsx`, `live-leads-workspace.tsx`, W4–W8 product
files, w2–w8 test files, `design-system-shell.test.ts`) → **NONE**.

## Sandbox recoveries

None required. Browser capture, `tsc`, `lint`, and `npm test` all succeeded on first attempt.
No DEC-UA-016 W1 empty-JSON race observed (the 26-ID set registered on the first run).

## Coordination artifacts

- `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_DECOMPOSITION_S1.md`
  `c900cebe930791a438fd23c3c311597a7f79e27dfef15dfaa0650ea96849d149` (frozen as authored).
- `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_STATE_S2.yaml`
  `88e438a0572b1689fcdf23cea2fec04999186d23e5fa00b2f6fd25a19080d2e6`
  (advanced by the window agent through `S001`/`S002`/`S003`/`S004` → `I001`; `current_status:
  READY_FOR_PARENT_REVIEW`).
- `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_EVIDENCE_S3.md`
  `64695bffc137d06fbb13f5e2574bab91332749fca64245df2fa9c796cebd0aa9`
  (`EV-UA-W9-D-001..002`, `EV-UA-W9-S-001..004`, `EV-UA-W9-R-001..004`, `EV-UA-W9-I-001`).

## `.ua-executed.json` residue

`test/.ua-executed.json` is tracked runtime output (owner commit residue). It is left in the
post-G5 state: exactly the 26 sorted IDs (digest `48c03081…`), shown as
` M test/.ua-executed.json` in `git status --porcelain`. **Never committed** by the window agent.

## JSX ending-digest reconciliation note (from S1 §0)

Parent consequence 3 pinned the lead-details.tsx ending digest as `cba5c096…` but described
hunks 2/3 behaviorally (non-deterministic span). Per sub-window standard `§7.3` formatting
freedom, this S1 freezes deterministic byte fences achieving the identical behaviour/strings/
numstat (window-agent ending `5f32de7f…`), documented in the S1 §0 note (same pattern as the W8
S1 §1 §4.7 note). CSS `6e57268a…` and LDC `f8f7323c…` reproduce the parent pins exactly.

## UA-W10

Not started. `A5.current_window` remains `UA-W9`; `next_window` remains frozen at `UA-W10`;
`may_start_successor: false` honored. `A5.current_status` set to `AWAITING_REVIEW`. `UA-W9-H6`
holds.
