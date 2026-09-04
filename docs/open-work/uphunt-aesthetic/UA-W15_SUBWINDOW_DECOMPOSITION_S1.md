# UA-W15 Sub-window decomposition checklist (`UA-W15_S1`)

Frozen decomposition for parent window `UA-W15` under assignment `ASG-UA-W15-01`.
Author: window agent identity `UA-W15-WINDOW-AGENT`.

Status: `AWAITING_PARENT_DECOMPOSITION_REVIEW`. Parent has not accepted this
decomposition. No FILE leaf is assigned, no implementation file is edited, and
`UA-W15-S001` is NOT executed by this decomposition. `A5_ACTIVE_EXECUTION_STATE.yaml`
remains byte-identical (`7e75f75b5f5c8e662f1868871fd2e53b6bce5ecac20763469984e462277d88e5`,
state_version 38) through decomposition.

Other subordinate artifacts:

- `S2` — `frontend/docs/open-work/uphunt-aesthetic/UA-W15_SUBWINDOW_STATE_S2.yaml`
- `S3` — `frontend/docs/open-work/uphunt-aesthetic/UA-W15_SUBWINDOW_EVIDENCE_S3.md`

Inherited parent package (`A5` state_version 38, digest
`7e75f75b5f5c8e662f1868871fd2e53b6bce5ecac20763469984e462277d88e5`, `current_window
UA-W15`, `current_assignment_id ASG-UA-W15-01`, `stop_after UA-W15`,
`may_start_successor: false`):

- `A1` — `frontend/docs/open-work/uphunt-aesthetic/A1_LOCKED_PRODUCT_CONTRACT.md`
  revision `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827`
- `A3` — `frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md`
  revision `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3`
- `A4` — `frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md`
  revision `68f6669acfeecb801ec76c9f2500199204c0f6103f9e65bce554b79fb84dec54`
- `A5` — `frontend/docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml`
  state_version 38, `current_window UA-W15`, `current_assignment_id ASG-UA-W15-01`,
  `assigned_agent UA-W15-WINDOW-AGENT`, `current_status IN_PROGRESS`,
  `accepted_through UA-W14`, `next_window STOP`, `may_start_successor: false`
- `A6` — `frontend/docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md`
  (`EV-UA-A-082` is the assignment record whose
  `parent_frozen_mechanical_consequences` is transcribed verbatim in §0;
  `EV-UA-A-081` is the parent accept of predecessor `UA-W14-I001`)
- `A7` — `frontend/docs/open-work/uphunt-aesthetic/A7_SPECIFICATION_CHANGELOG.md`
  (constrains the preserved `data-surface` / inventory rules this window must keep)

Standards:

- Parent standard:
  `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md`
  revision `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848`
- Sub-window standard:
  `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md`
  revision `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0`

---

## 0. Parent-frozen mechanical consequences (encoded verbatim)

The following is transcribed verbatim from `A6` evidence `EV-UA-A-082`
(`parent_frozen_mechanical_consequences`, items 1 through 9). The parent authority
is NOT reopened by this decomposition; any phrase or choice here that would
contradict these lines is void and the consequence lines win. They are uniquely
determined by DEC-UA-004, DEC-UA-005 leftover wrap/type floors, DEC-UA-008
reduced-motion, DEC-UA-014, DEC-UA-015, DEC-UA-016, INV-UA-010, UA-W15-T1/T2,
CASE-UA-W15-001..003, and UA-W15-V3/V5.

> 1. FILE sub-window IDs start at UA-W15-S001. A zero-edit in-scope file gets no
>    FILE sub-window and does not consume an S-number. Do not retire S001 unused.
>    Sequential DAG, no parallel waves: S001 frontend/test/uphunt-aesthetic-w15.test.ts CREATE → S002 frontend/test/ua-coverage-equality.mjs CREATE → UA-W15-I001. frontend/app/globals.css is in-scope but zero-edit (4cf7a1fccba5f3b455b8c1a63e3d2aff4dc8a4f6a9dedd5731b3ea754aa87d95); leftover @media on already-owned lead-details and header rules is already present; do not add any new globals selector; do not invent CSS polish. Do not change `.shell { width: min(1180px, calc(100% - 40px)); }`. Keyword shell remains existing `.kiDashboard` in keyword-dashboard.module.css (out of write scope except as a G6 pin).
> 2. Zero-edit preserved (G6 pins, no FILE leaf): globals.css 4cf7a1fc…; keyword-dashboard.module.css 3095e384…; lead-details.tsx 9431f71b…; app-header.tsx 050da7c4…; cluster-landscape.tsx d1ed9ad4…; summary-cards.tsx c60d6bad…; keyword-table.tsx 96ce5e0e…; filter-bar.tsx 17edbde0…; research-dashboard.tsx 82f8a628…; chart-panels.tsx 2847411e…; uphunt-aesthetic-w14.test.ts 2436f2c8…; uphunt-aesthetic-w13.test.ts 8e96d6de…; uphunt-aesthetic-w12.test.ts 41711cc5…; uphunt-aesthetic-w9.test.ts baee1b2e…; uphunt-aesthetic-w2.test.ts f65ba0c5…; selection-review.tsx 5550dffa…; keywords/[researchId]/page.tsx a46b89bc…; section-intro.tsx 159096f3…; lib/keyword-intelligence-view-model.ts 8328b023…; test/keyword-intelligence-inventory.test.ts 2a6e6b24…; test/browser/keyword-intelligence-dashboard.mjs 317d3fa1…; traffic-enrichment.tsx 1a903788…; traffic-globe.tsx 7d9567b5…; uphunt-aesthetic-coverage.test.ts f5137be4…. Do not edit REQUIRED_CASE_IDS, listRequiredCaseIds, coverageDigest, PINNED_REQUIRED_SET_DIGEST, getFiltered, saveKeywordSelection, Chart.js Chart.register, dataset math, tooltip callbacks, parked SRC-UA-0092 files, or design-system-shell.test.ts.
> 3. CREATE frontend/test/uphunt-aesthetic-w15.test.ts with exactly two tests CASE-UA-W15-001 and CASE-UA-W15-002. Import recordExecuted from `./uphunt-aesthetic-coverage.test.ts` the same way as the w14 test. Unit tests that read source (not render). 001: globals.css contains `@media (prefers-reduced-motion: reduce)` and `transition-duration: 0.01ms !important`. 002: extract the `.lead-details .detail-section > h3 {` block with the same regex as CASE-UA-W9-002 (`/\.lead-details \.detail-section > h3 \{[\s\S]*?\}/u`); the block includes `font-size: 1.375rem;` and does not include `font-size: 0.5rem;`. Call recordExecuted after each witness. Do not use CASE-UA-W15-003 in this file. No third test(). S1 must freeze deterministic bytes (§7.3 non-behavioral formatting freedom applies).
> 4. CREATE frontend/test/ua-coverage-equality.mjs which is not matched by `test/*.test.ts`. The script imports `listRequiredCaseIds`, `coverageDigest`, `getExecuted`, and `recordExecuted` from `./uphunt-aesthetic-coverage.test.ts`. It asserts `getExecuted()` equals `REQUIRED_CASE_IDS` minus `{CASE-UA-W15-003}` as a set (42 IDs, digest 434a1f5eb42ce7e8640ba1ab8d80e54c2d0225c9f155a4f781d9f2ef76418cbd), then calls `recordExecuted("CASE-UA-W15-003")`, then asserts `coverageDigest(getExecuted()) === "0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05"` and set equality required=registered=executed, zero skips, no duplicates, no unexpected IDs. Do not put CASE-UA-W15-003 inside a `test()` that `npm test` runs. S1 must freeze deterministic bytes. Do not run this script at S002 (coverage sequence is I001 only).
> 5. FILE leaf S001 from ABSENT test/.ua-executed.json, running only the w15 test file, expects exactly 4 IDs (2 × W1 + CASE-UA-W15-001 + CASE-UA-W15-002), set digest 3172a45acdd6329e0bcf45f28e24279349be5157c5fd0da199afe1409bdb17db. S002 is the last FILE leaf (CREATE mjs) and MUST NOT run the equality script; its V-B is file existence plus the frozen S1 bytes, not an executed-set digest. Window-local 2-ID digest 5ac8c2a9ad2545c3f88d52826827138d9ed24a418a7cc64c26215f09bbd51343. Planned-file-set digest 16ed1b8b21e6e6278b66a601789e83bd4a8b7d63dbfdad70ddb381cfe47df74a over the two CREATE paths (globals.css excluded as zero-edit). Do not require W2–W14 IDs at the w15-only test command. test/.ua-executed.json is TRACKED at HEAD (never commit).
> 6. Frozen coverage sequence is I001 only, from frontend/: `rm -f test/.ua-executed.json` then `npm test` then `node --experimental-strip-types test/ua-coverage-equality.mjs`. After `npm test` and before the equality script, getExecuted is the 42-ID set digest 434a1f5eb42ce7e8640ba1ab8d80e54c2d0225c9f155a4f781d9f2ef76418cbd (40-ID W1–W14 union CASE-UA-W15-001/002). After the equality script, getExecuted is the 43-ID required set digest 0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05. That 43-ID equality is UA-W15-V5 / CASE-UA-W15-003 and is asserted only at I001 G5 after the frozen sequence. Predecessor 40-ID digest remains 2c31828460d630208cbee7ae9875298058412258efc81682bba597ea5109a875 until this window's tests run.
> 7. I001 G1 is DEC-UA-016: from `frontend/`, `npm test`. Parent-measured predecessor after W14 is 214 tests / 211 pass / 3 fail; expected after W15 is 216 / 213 / 3. PASS iff allocated UA CASE tests (including CASE-UA-W15-001 and CASE-UA-W15-002) pass and every failing title, if any, is exactly the three named heading-oracle titles; process exit 1 is expected and is not G1 FAIL when that holds. Per-file coverage-module re-execution may add +2 passing tests versus 216/213 (same class as W14 214/211 vs 212/209); the behavioral oracle holds either way. G2 DEC-UA-014 needles are uphunt-aesthetic-w15.test.ts and ua-coverage-equality.mjs (globals.css is not a tsc input). G3 `npm run lint` because CSS remains in F1 write scope even as zero-edit; lint needles are those two CREATE paths plus globals.css. I001 G10 is `npm run build` from frontend/. If build fails solely on parked SRC-UA-0092 files, STOP and escalate; do not silently skip, do not edit parked files, and do not treat that as G10 PASS. I001 V3 reads (does not edit) keyword-dashboard.module.css wrap heights 520/420/360/380 and the owned h3 type floor 1.375rem; they must still match DEC-UA-004 and DEC-UA-005.
> 8. G4 browser_evidence true: four full-page PNGs under frontend/review-evidence/uphunt-aesthetic/UA-W15/ at widths 390, 768, 1280, 1440 (viewport height 900) of local route `/` only. captureBeyondViewport must be true. Do not require PNG IHDR height > 900 (landing may fit in 900). Assert `.site-header` is present in the DOM at 1280 (g4-checks.json). Do not screenshot `/design-fixture`. Do not screenshot a live `/keywords/{id}` against production. Do not edit test/browser/keyword-intelligence-dashboard.mjs. Helper scripts and g4-checks.json may live only under that review-evidence directory (not a planned product file). G4 is local_e2e evidence, not a CASE oracle.
> 9. Do not start UA-W16 (none exists). Do not add any new data-surface token. Do not edit globals.css, lead-details.tsx, app-header.tsx, view-model inventories, research-dashboard, chart-panels, W2–W14 test files, REQUIRED_CASE_IDS, parked files, or design-system-shell.test.ts. After parent accepts this decomposition, identity UA-W15-WINDOW-AGENT executes then personally reviews each FILE leaf in the same turn, then itself assigns the next S-number, then personally runs I001, then hands off (DEC-UA-015). This assignment does not execute S001. Do not write into S1 §0 any of: "parent issues the next leaf", "stop at AWAITING_WINDOW_REVIEW before S00n", "stop for parent after this leaf".

The consequence lines above are the operative mechanical form; they win over any
later choice in this document or in `S2`/`S3`. In particular, items 1, 3, 4, 5, 6,
and 9 fix the ordering, the zero-edit set, the exact deterministic file bytes, the
single-identity execution-authority model, and the `<parent issue / AWAITING_WINDOW_REVIEW
/ stop for parent>` forbidden-decomposition-phrase exclusions. The CREATE-file
ending digests pinned in §5 are derived from disposable window-agent simulation
(not parent-simulated), per consequences 3, 4, 5.

Verbatim-fidelity note: `globals.css` is in-scope but **zero-edit**
(`4cf7a1fccba5f3b455b8c1a63e3d2aff4dc8a4f6a9dedd5731b3ea754aa87d95`); it consumes
no S-number and is a G6 pin. The two CREATE paths are the only planned files.

Forbidden-phrase reconciliation: the three DEC-UA-015 forbidden decomposition
phrases appear in this §0 only because the parent's own verbatim item 9 lists them
as the strings to avoid (`Do not write into S1 §0 any of: ...`); per consequence
"those lines win over any later choice". They appear in no window-agent-authored
directive anywhere in `S1`/`S2`/`S3`, and §11 confirms they are not used as
operative choices.

---

## 1. Authority and revision pins

| Pin | Value | Verified |
|---|---|---|
| parent_window_id | `UA-W15` | A5 |
| parent_assignment_id | `ASG-UA-W15-01` | A5 `current_assignment_id`; EV-UA-A-082 |
| window_agent_identity | `UA-W15-WINDOW-AGENT` | A5 `assigned_agent` |
| delegated_authority | decompose UA-W15; write S1/S2/S3; append S3 to A6 | A5 `authorized_actions` |
| FILE-leaf execution authority | none at decomposition time | A5 `prohibited_actions: execute_UA-W15_FILE_leaf` |
| parent-standard revision | `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` | recomputed MATCH |
| subwindow-standard revision | `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` | recomputed MATCH |
| A1 revision | `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827` | recomputed MATCH |
| A3 revision | `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3` | recomputed MATCH |
| A4 revision | `68f6669acfeecb801ec76c9f2500199204c0f6103f9e65bce554b79fb84dec54` | recomputed MATCH (post-UA-W14-checkbox pin, EV-UA-A-082) |
| A5 state_version / digest | 38 / `7e75f75b5f5c8e662f1868871fd2e53b6bce5ecac20763469984e462277d88e5` | recomputed MATCH (byte-identical) |
| A5 blocker | `null` | A5 |
| may_start_successor | false | A5 |
| next window | `STOP` (no UA-W16 exists) | A5 |
| stop_after | `UA-W15` | A5 |

Evidence: `S3` `EV-UA-W15-D-001`.

## 2. Parent-window scope and exclusions

`authorized_write_scope` (`A5`; in-scope):

- `frontend/test/uphunt-aesthetic-w15.test.ts` — S001 (CREATE).
- `frontend/test/ua-coverage-equality.mjs` — S002 (CREATE).
- `frontend/app/globals.css` — in-scope but **zero-edit** (`4cf7a1fc…`); no FILE
  leaf, consumes no S-number (DEC-UA-008 leftover @media already present; no new
  selector; do not invent CSS polish).

`read_only_scope` (`A5` / `A4` F1): `frontend/app/globals.css` (G6 pin),
`frontend/components/lead-details.tsx`, `frontend/components/app-header.tsx`,
`frontend/components/keyword-intelligence/keyword-dashboard.module.css` (G6 pin /
V3 read), `frontend/components/keyword-intelligence/filter-bar.tsx`,
`frontend/components/keyword-intelligence/research-dashboard.tsx`,
`frontend/components/keyword-intelligence/chart-panels.tsx`,
`frontend/test/uphunt-aesthetic-coverage.test.ts`,
`frontend/test/uphunt-aesthetic-w14.test.ts`,
`frontend/test/uphunt-aesthetic-w9.test.ts`,
`frontend/test/uphunt-aesthetic-w2.test.ts`.

Exclusions / prohibited (`A5 prohibited_actions` + consequence 9):

- do not start UA-W16 (none exists);
- do not add any new data-surface token;
- do not edit `globals.css`, `lead-details.tsx`, `app-header.tsx`,
  `view-model` inventories, `research-dashboard.tsx`, `chart-panels.tsx`,
  `filter-bar.tsx`, `keyword-dashboard.module.css`, `section-intro.tsx`,
  `selection-review.tsx`, W2–W14 test files, `REQUIRED_CASE_IDS`,
  `listRequiredCaseIds`, `coverageDigest`, `PINNED_REQUIRED_SET_DIGEST`,
  `getFiltered`, `saveKeywordSelection`, Chart.js `Chart.register`, dataset math,
  tooltip callbacks, parked SRC-UA-0092 files,
  `test/keyword-intelligence-inventory.test.ts`,
  `test/browser/keyword-intelligence-dashboard.mjs`, or
  `design-system-shell.test.ts`;
- no AWS, commit, push, production, paid provider, `email_scraper` edit, or root
  `ACTIVE_EXECUTION_STATE.md` edit.

Scope-locked decisions governing UA-W15 (from A3): DEC-UA-004 (lead h3 type floor
`1.375rem`, not `0.5rem`), DEC-UA-005 (keyword wrap heights `520/420/360/380`),
DEC-UA-008 (reduced-motion + no global `* { transition }`), DEC-UA-014 (typecheck
G2 oracle), DEC-UA-015 (one identity UA-W15-WINDOW-AGENT executes and reviews its
own FILE leaves; movement between FILE leaves is internal; the three DEC-UA-015
forbidden decomposition phrases are not used), DEC-UA-016 (npm test oracle),
REQ-UA-004, REQ-UA-006, INV-UA-010 (no new data-surface value; only layout/type
change; here no product file changes).

## 3. Starting working-tree inventory

Recording does not modify the tree. From `frontend/`, `git status --short` at
window start (window-agent capture, `S3` `EV-UA-W15-D-001`):

```
 M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml
 M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md
```

Coordination root (`/home/harit/Email Scrapper`) `git status --short`: clean (no
output). Protected pre-existing changed set (parent-owned A5/A6, coordination-root-
relative paths) set digest
`be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a`.

Planned implementation files:

- `frontend/test/uphunt-aesthetic-w15.test.ts`: **ABSENT** (CREATE by S001).
- `frontend/test/ua-coverage-equality.mjs`: **ABSENT** (CREATE by S002).

Zero-edit / preserved pins (must remain byte-identical; verified in `S3`
`EV-UA-W15-D-001`): `globals.css 4cf7a1fc…`, `keyword-dashboard.module.css
3095e384…`, `lead-details.tsx 9431f71b…`, `app-header.tsx 050da7c4…`,
`cluster-landscape.tsx d1ed9ad4…`, `summary-cards.tsx c60d6bad…`,
`keyword-table.tsx 96ce5e0e…`, `filter-bar.tsx 17edbde0…`,
`research-dashboard.tsx 82f8a628…`, `chart-panels.tsx 2847411e…`,
`selection-review.tsx 5550dffa…`, `keywords/[researchId]/page.tsx a46b89bc…`,
`section-intro.tsx 159096f3…`, `lib/keyword-intelligence-view-model.ts
8328b023…`, `test/keyword-intelligence-inventory.test.ts 2a6e6b24…`,
`test/browser/keyword-intelligence-dashboard.mjs 317d3fa1…`,
`traffic-enrichment.tsx 1a903788…`, `traffic-globe.tsx 7d9567b5…`,
`uphunt-aesthetic-w14.test.ts 2436f2c8…`, `uphunt-aesthetic-w13.test.ts
8e96d6de…`, `uphunt-aesthetic-w12.test.ts 41711cc5…`,
`uphunt-aesthetic-w9.test.ts baee1b2e…`, `uphunt-aesthetic-w2.test.ts
f65ba0c5…`, `uphunt-aesthetic-coverage.test.ts f5137be4…`.

## 4. Initial single-file dependency DAG

```text
UA-W15-S001 (frontend/test/uphunt-aesthetic-w15.test.ts CREATE)
  -> UA-W15-S002 (frontend/test/ua-coverage-equality.mjs CREATE)
    -> UA-W15-I001 (window-agent integration assessment)
```

Sequential, no parallel wave (parent-frozen, consequence 1). Edges justified by
named outputs: S001 must create the w15 test file (which imports
`recordExecuted` from `./uphunt-aesthetic-coverage.test.ts` and reads
`../app/globals.css` as source text) before S002 imports the same coverage module
and asserts the executed set that S001 populates. S002 is the last FILE leaf and
must NOT run the equality script (consequence 4/5). I001 is the operator of
G1/G2/G3/G4/G5/G6/G8/G10/V3.

Zero-edit `globals.css` does not appear in the DAG.

## 5. Initial sub-window blocks

### UA-W15-S001

```yaml
subwindow_id: UA-W15-S001
type: FILE
parent_window_id: UA-W15
parent_assignment_id: ASG-UA-W15-01
assigned_agent: UA-W15-WINDOW-AGENT
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w15.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a
read_only_scope:
  - frontend/app/globals.css
  - frontend/test/uphunt-aesthetic-coverage.test.ts
  - frontend/test/uphunt-aesthetic-w14.test.ts
authorized_actions:
  - create_w15_test_file_with_exact_bytes
  - two_tests_and_two_recordExecuted_calls
  - import_recordExecuted_from_coverage_module
  - read_globals_css_as_source_text
prohibited_actions:
  - use_CASE-UA-W15-003_in_this_file
  - add_third_test
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: REQ-UA-006 (reduced-motion preserved), DEC-UA-008 (no global
`* { transition }`; reduced-motion rule stays; w2 test assertions still hold),
REQ-UA-004 / DEC-UA-004 (owned h3 type floor `1.375rem`, not `0.5rem`),
CASE-UA-W15-001 (SCN-UA-001; NC-UA-001), CASE-UA-W15-002 (SCN-UA-003; NC-UA-003),
UA-W15-T1. Nothing in this file changes behavior; it is a source-text unit test.

Exact file transformation (consequence 3; deterministic bytes frozen by `S3`
`EV-UA-W15-D-003`). CREATE `frontend/test/uphunt-aesthetic-w15.test.ts` with
exactly these bytes (modeled on the w14 test; two `test()` blocks and exactly two
`recordExecuted` calls, no third test, no `CASE-UA-W15-003`):

```ts
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W15-001 reduced-motion rule remains", () => {
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(globals, /transition-duration:\s*0\.01ms !important/u);
  recordExecuted("CASE-UA-W15-001");
});

test("CASE-UA-W15-002 lead detail section heading type floor", () => {
  const block = globals.match(/\.lead-details \.detail-section > h3 \{[\s\S]*?\}/u)?.[0] ?? "";
  assert.ok(block.includes("font-size: 1.375rem;"));
  assert.ok(!block.includes("font-size: 0.5rem;"));
  recordExecuted("CASE-UA-W15-002");
});
```

Preserved behavior: no production file is touched; the file only reads source.
Forbidden edits within the writable file: adding `CASE-UA-W15-003`, a third
`test()`, a render/import of a product component, or weakening either assertion.

Frozen completion oracle for S001 (disposable simulation, `S3` `EV-UA-W15-D-003`):

- ending file digest `0a34acf1e5a168a19c8db534f41c1ac934e27a2bdc79285e9a4f325bd21431d7`
- exactly two `test(` blocks; exactly two `recordExecuted(` calls;
  `CASE-UA-W15-003` absent from the file; `import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts"` present
- V1 run (isolated, `node --experimental-strip-types --test test/uphunt-aesthetic-w15.test.ts`)
  under consequence 5: exactly 4 IDs (2 × W1 + CASE-UA-W15-001/002), set digest
  `3172a45acdd6329e0bcf45f28e24279349be5157c5fd0da199afe1409bdb17db`
- window-local 2-ID digest `5ac8c2a9ad2545c3f88d52826827138d9ed24a418a7cc64c26215f09bbd51343`
- `node --check` / syntax: 0 diagnostics

### UA-W15-S002

```yaml
subwindow_id: UA-W15-S002
type: FILE
parent_window_id: UA-W15
parent_assignment_id: ASG-UA-W15-01
assigned_agent: UA-W15-WINDOW-AGENT
predecessors:
  - UA-W15-S001
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/ua-coverage-equality.mjs
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: be27e220fe5344934ab989e59c12b2156a28001ecc9f34cec397f1de00193b5a
read_only_scope:
  - frontend/test/uphunt-aesthetic-coverage.test.ts
  - frontend/test/uphunt-aesthetic-w15.test.ts
authorized_actions:
  - create_ua_coverage_equality_mjs_with_exact_bytes
  - import_listRequiredCaseIds_coverageDigest_getExecuted_recordExecuted
  - not_run_the_equality_script_at_S002
prohibited_actions:
  - run_equality_script_at_S002
  - put_CASE-UA-W15-003_in_a_test
  - aws / commit / push
may_start_successor: false
```

Mechanical trace: REQ-UA-008 / DEC-UA-011 (equality is the UA-W15 full-set gate,
not in the npm test glob), DEC-UA-014, CASE-UA-W15-003 (SCN-UA-005; NC-UA-006),
UA-W15-T2, UA-W15-V5. The file is the operator of the 43-ID required=registered=
executed equality and the frozen digest `0d14982c…`.

Exact file transformation (consequence 4; deterministic bytes frozen by `S3`
`EV-UA-W15-D-004`). CREATE `frontend/test/ua-coverage-equality.mjs` with exactly
these bytes:

```js
import assert from "node:assert/strict";
import {
  coverageDigest,
  getExecuted,
  listRequiredCaseIds,
  recordExecuted,
} from "./uphunt-aesthetic-coverage.test.ts";

const required = listRequiredCaseIds();
const requiredAfterNpmTest = required.filter((id) => id !== "CASE-UA-W15-003");

const executedAfterNpmTest = getExecuted();
assert.equal(
  coverageDigest(executedAfterNpmTest),
  "434a1f5eb42ce7e8640ba1ab8d80e54c2d0225c9f155a4f781d9f2ef76418cbd",
  `executed-after-npm-test digest mismatch: got ${coverageDigest(getExecuted())}`,
);
assert.deepEqual(
  [...executedAfterNpmTest].sort(),
  [...requiredAfterNpmTest].sort(),
  "executed-after-npm-test set mismatches required minus CASE-UA-W15-003",
);

recordExecuted("CASE-UA-W15-003");

const finalExecuted = getExecuted();
assert.equal(
  coverageDigest(finalExecuted),
  "0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05",
  `final executed-set digest mismatch: got ${coverageDigest(getExecuted())}`,
);
assert.deepEqual(
  [...finalExecuted].sort(),
  [...listRequiredCaseIds()].sort(),
  "final executed set mismatches REQUIRED_CASE_IDS",
);

console.log("UA-W15 coverage equality PASS: 43 required = registered = executed.");
```

Preserved behavior: no production file is touched; the file imports and reads the
coverage module only. Forbidden edits within the writable file: any import other
than the four named exports, any weakening of the two digest assertions or the two
set-equality assertions, or moving the `recordExecuted("CASE-UA-W15-003")` call.

Frozen completion oracle for S002 (disposable simulation, `S3` `EV-UA-W15-D-004`,
`EV-UA-W15-D-005`):

- ending file digest `921d5df708348fe141b0ecffa19c7bce664a68be6d43ffc364e78bebf479a0eb`
- V-B is **file existence plus frozen S1 bytes** (`sha256sum` equals
  `921d5df7…`); NOT an executed-set digest; the equality script is not run at S002
  (consequence 4/5)
- `node --check` on the `.mjs`: 0 diagnostics (no execution)
- imports exactly `coverageDigest`, `getExecuted`, `listRequiredCaseIds`,
  `recordExecuted` from `./uphunt-aesthetic-coverage.test.ts`

## 6. Allocation of requirements, decisions, interfaces, and coverage cases

| CASE ID | Scenario | File / assertion | Decision(s) |
|---|---|---|---|
| CASE-UA-W15-001 | SCN-UA-001 | `globals.css` reduced-motion + `transition-duration: 0.01ms !important` (S001) | DEC-UA-008, REQ-UA-006 |
| CASE-UA-W15-002 | SCN-UA-003 | `globals.css` `.lead-details .detail-section > h3` block has `1.375rem`, not `0.5rem` (S001) | DEC-UA-004, REQ-UA-004 |
| CASE-UA-W15-003 | SCN-UA-005 | coverage `getExecuted()` = `REQUIRED_CASE_IDS` minus `{CASE-UA-W15-003}` (42), then +`recordExecuted` → 43 required=registered=executed, digest `0d14982c…` (S002; I001 G5) | DEC-UA-011, DEC-UA-014, REQ-UA-008, UA-W15-V5 |

The full 43-ID required set and `REQUIRED_CASE_IDS` are frozen in
`uphunt-aesthetic-coverage.test.ts` (`0d14982c…`); this window adds only the three
UA-W15 CASE IDs already present in that frozen registry. No edit to
`REQUIRED_CASE_IDS`, `listRequiredCaseIds`, `coverageDigest`, or
`PINNED_REQUIRED_SET_DIGEST` is authorized (consequence 2/9).

Cross-file interface frozen before S002: the four named exports from
`uphunt-aesthetic-coverage.test.ts` (`listRequiredCaseIds`, `coverageDigest`,
`getExecuted`, `recordExecuted`) and their signatures are already frozen by
DEC-UA-011 / `uphunt-aesthetic-coverage.test.ts` (`EV-UA-A-009`). S002 consumes
them; no interface choice is left to the subagent.

## 7. Verification gates

### 7.1 File-local gates (LOCAL_NOW per sub-window)

- S001 V1: from `frontend/`, isolated start from `ABSENT`/empty
  `test/.ua-executed.json`,
  `node --experimental-strip-types --test test/uphunt-aesthetic-w15.test.ts`.
  Expected: exit 0; exactly 4 tests pass (the 2 w15 tests plus the 2 re-executed
  W1 coverage tests); the executed set is exactly the isolated 4-ID
  (2 × W1 + CASE-UA-W15-001/002), set digest `3172a45a…`. Activation witness: the
  `.ua-executed.json` 4-ID set. Assertions: `CASE-UA-W15-001` reduced-motion /
  `0.01ms !important`; `CASE-UA-W15-002` `.lead-details .detail-section > h3`
  block has `1.375rem` and not `0.5rem`.
- S001 V2: attributable changed-file set is exactly
  `frontend/test/uphunt-aesthetic-w15.test.ts` plus the runtime residue
  `frontend/test/.ua-executed.json` (DEC-UA-011 tracked file, never commit).
- S002 V1: `node --check test/ua-coverage-equality.mjs`; expected exit 0, no
  execution. V-B: `sha256sum test/ua-coverage-equality.mjs` equals
  `921d5df708348fe141b0ecffa19c7bce664a68be6d43ffc364e78bebf479a0eb`.
  The equality script is NOT run at S002.
- S002 V2: attributable changed-file set is exactly
  `frontend/test/ua-coverage-equality.mjs`.

### 7.2 Whole-window integration assessment `UA-W15-I001`

Owner: `UA-W15-WINDOW-AGENT` (personally; no delegation). It may write only the
window agent's coordination artifacts. Implemented by the frozen gate set below
(consequence 7/8/9):

- G1: from `frontend/`, `npm test` per DEC-UA-016. Expected after W15 `216 / 213 / 3`.
  PASS iff allocated UA CASE tests (CASE-UA-W15-001/002) pass and every failing title
  is exactly the three named heading-oracle titles; exit 1 is not G1 FAIL when that
  holds. Coverage-module re-execution may add +2 passing (216→218); oracle holds.
- G2: from `frontend/`, `npx tsc --noEmit --pretty false` per DEC-UA-014. PASS iff
  zero diagnostics mention a path in this window's `authorized_write_scope`
  (`test/uphunt-aesthetic-w15.test.ts`, `test/ua-coverage-equality.mjs`).
- G3: from `frontend/`, `npm run lint`. In scope (CSS/JSX write scope). Needles:
  the two CREATE paths plus `globals.css`.
- G4: browser_evidence true. Four full-page PNGs under
  `frontend/review-evidence/uphunt-aesthetic/UA-W15/` at widths 390, 768, 1280,
  1440 (viewport height 900) of local route `/` only; `captureBeyondViewport` true;
  do not require PNG IHDR height > 900; assert `.site-header` present in the DOM at
  1280 (`g4-checks.json`); no `/design-fixture`; no live `/keywords/{id}`; no edit
  to `test/browser/keyword-intelligence-dashboard.mjs`. Local_e2e evidence only.
- G5: frozen coverage sequence from `frontend/`: `rm -f test/.ua-executed.json`
  then `npm test` then `node --experimental-strip-types test/ua-coverage-equality.mjs`.
  After `npm test`, `getExecuted` is the 42-ID set digest `434a1f5e…`; after the
  equality script, `getExecuted` is the 43-ID required set digest `0d14982c…`.
  43-ID equality is UA-W15-V5 / CASE-UA-W15-003. Required=registered=executed,
  zero skips, no duplicates, no unexpected IDs.
- G6: forbidden-path negative search. The assembled diff (both CREATE paths) names
  no `globals.css`, no product/API/auth/parked file, and no successor artifact.
- G8: negative controls — NC-UA-001 (reduced-motion/token), NC-UA-003 (lead
  fields/type floor), NC-UA-005 (forbidden paths), NC-UA-006 (digest).
- G10: from `frontend/`, `npm run build`. If build fails solely on parked
  SRC-UA-0092 files, STOP and escalate; do not silently skip, do not edit parked
  files, do not treat as G10 PASS.
- V3: read (does not edit) `keyword-dashboard.module.css` wrap heights
  `520/420/360/380` and the owned h3 type floor `1.375rem`; they must still match
  DEC-UA-004 and DEC-UA-005.

I001 may update only the window agent's coordination artifacts. Outcome is
`PASS`, `CORRECTION_REQUIRED`, or `PARENT_BLOCKED`.

## 8. Correction and re-assessment rules

- Corrections are append-only `UA-W15-C001`, `UA-W15-C002`, …; never reuse an
  initial/assessment/assignment/evidence ID.
- A correction owns exactly one file and cites the failed evidence, root cause,
  governing requirement/decision, the sub-window it corrects, and the checks it
  invalidates.
- The window agent never edits an implementation file during review; every fix is a
  new corrective sub-window.
- After the last correction, a new whole-window assessment `UA-W15-I002` is
  required; leaf test results cannot substitute.
- Do not weaken an accepted oracle; do not repair a parent-level ambiguity by
  guessing (escalate as PARENT_BLOCKED).
- If the correction needs a new parent decision or expands parent scope, do not
  author a corrective sub-window; escalate.

## 9. Intermediate-state contracts

| Edge | After producer | Local checks that must pass | Expected temporary result | Safety | Resolver | Prohibited while state exists |
|---|---|---|---|---|---|---|
| S001 → S002 | S001 creates the w15 test | isolated run exit 0; 4-ID digest `3172a45a…`; digest `0a34acf1…`; two `test()`; two `recordExecuted`; no `CASE-UA-W15-003` | G1 (npm test) would now be `216/213/3` (two new tests pass) | The w15 test reads `globals.css` and the coverage module only; no navigation/network; no product/API edit | S002 | do not add a third test; do not use CASE-UA-W15-003 here; do not run the equality script before S002 |
| S002 → I001 | S002 creates the mjs | `node --check` exit 0; `sha256sum` `921d5df7…`; file exists | G1 now effectively runnable to the full 43-ID equality; equality script NOT run at S002 | mjs reads the coverage module only; no product/API edit | I001 runs G1/G2/G3/G4/G5/G6/G8/G10/V3 | do not run the equality script at S002; do not begin UA-W16; do not run a whole-window assessment from leaf summaries alone |

## 10. Mandatory decomposition-readiness checkboxes

Evidence references resolve to `S3` evidence IDs. Marked `[x]` by the window agent
after verification in this decomposition; `AWAITING_PARENT_DECOMPOSITION_REVIEW` is
set in `S2`.

### 10.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA-W15-D-001
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA-W15-D-001
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA-W15-D-001 (§2)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA-W15-D-001 (§3)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA-W15-D-001 (§top/S2/S3)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA-W15-D-001 (identity UA-W15-WINDOW-AGENT executes + reviews; no lower subagent)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: A5 `execution_environment_policy`; EV-UA-W15-D-001

### 10.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA-W15-D-001, §6
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA-W15-D-001, §0 (consequences 1–9 transcribed verbatim; no reopened consequence; no unresolved parent decision)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA-W15-D-002 (2-file digest `16ed1b8b…` matches parent frozen)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: §5 (S001/S002 one file each)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: §5 blocks; EV-UA-W15-D-003/004/005
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: §4 (§9); no parallel wave (parent-frozen)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: §6 (four coverage-module exports frozen before S002 imports them)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: §9
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: S001 (test) and S002 (equality script) are separate sub-windows; no product/fixture/schema/config edit
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: only per-file `node --test`/`node --check`/`sha256sum`/`git diff` runs; S001's isolated run mutates only `.ua-executed.json` (DEC-UA-011 runtime residue) plus the test file

### 10.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7. Evidence: §5 blocks
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: §5 exact bytes
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: §5 checks
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: §5 V2
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: §5, §11.6
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: §11.6; DEC-UA-015 (single identity)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: §5 (each file-local acceptance is self-contained; S002 V-B is file existence + frozen bytes, not an executed-set digest)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: §5 (G1/G2/G3/G4/G5/G6/G8/G10/V3 → UA-W15-I001)

### 10.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: §6, EV-UA-W15-D-003/004/005
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: §5 V3 + §7.2 G5 (digests 5ac8c2a9 / 3172a45a / 434a1f5e / 0d14982c)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: §7.2 G8 + EV-UA-W15-D-005 (NC-UA-001 / NC-UA-003 / NC-UA-005 / NC-UA-006)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: SUB-UA-001 (source-text read; not computed px); EV-UA-W15-D-005
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: §7.2 (authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: §7.2 (G1/G2/G3/G4/G5/G6/G8/G10/V3 = I001 only)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: §8
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: §11.6, DEC-UA-015
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: §7.2 G1/G5/G6 oracles
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: §11.6
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: A5 `execution_environment_policy`; EV-UA-W15-D-001

### 10.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA-W15-D-002/S1 IDs (S001/S002/I001; CASE-UA-W15-001..003; no reuse)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA-W15-D-001 (§5 all digests and bytes pinned; only I001 executed-evidence refs are deliberately TO_BE_FILLED, allowed by §9.1)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA-W15-D-005/each §5 V2
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: §5 (each file maps a distinct REQ/DEC; removing any yields an unmapped requirement)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: §7.2 G5 (required=registered=executed; zero skips)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: §7.2 G1/DEC-UA-016; G5 digests; G6 negative search
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: §11.6 (single writable file per sub-window; strict adjacency)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: §8
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: §12 certificate + `S2.decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`; S1 not executed
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA-W15-D-005
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: A5 policy; EV-UA-W15-D-001 (no environment invalidation observed in decomposition; policy copied unchanged)

## 11. Handoff, stop, and successor rules

- The window agent is `UA-W15-WINDOW-AGENT`, DEC-UA-015 identity. After the
  parent accepts this decomposition, that identity executes each FILE leaf, then
  personally reviews it, then assigns the next S-number, then personally runs
  `UA-W15-I001`, then performs the consolidated parent handoff. `may_start_successor: false`
  means do not start `UA-W16` (which does not exist); it is not a FILE-leaf brake,
  and **no** FILE leaf halts at `AWAITING_WINDOW_REVIEW` for a parent turn.
- A FILE leaf stops at `AWAITING_WINDOW_REVIEW`; the window agent (same identity)
  reviews it and advances without a parent round trip.
- Communication is strictly adjacent: no implementation subagent talks to the
  parent; no parent talks to a subagent. Here the executor and reviewer are the
  same identity, so strict adjacency is trivially enforced.
- `S2` is live status; `S3` is append-only evidence. Only the window agent updates
  `S2`.
- The three forbidden decomposition phrases from consequence 9 are not used in
  this document: this decomposition does not require the parent to issue any FILE
  leaf, does not treat a file-subwindow review as a parent halt, and does not stop
  for the parent after any leaf.

## 12. Authoring-readiness certificate

Appended below in `S3` (`EV-UA-W15-D-006`, `certificate: SUBWINDOW-DECOMPOSITION-READY`),
and `S2.decomposition_status` is set to `AWAITING_PARENT_DECOMPOSITION_REVIEW`.

---

## 13. Corrective sub-window (append-only)

No corrective sub-window has been authored at decomposition time. Any future
corrective is appended here as `UA-W15-C001`, `UA-W15-C002`, …; none of the
initial blocks above is rewritten.

---

*End of S1.* This decomposition does not edit any implementation file, does not
assign FILE leaves, does not execute `UA-W15-S001`, and does not begin `UA-W16`.
