# UA-W8 parent handoff — `READY_FOR_PARENT_REVIEW`

Parent window: **UA-W8** (Uphunt-aesthetic: uses the shared `SectionIntro` for the
leads, live-leads-workspace, and run-workspace completed-results headlines, and
fits the lead-expansion-shell + collapsed-row chrome (CSS)). Window agent:
`UA-W8-WINDOW-AGENT`. Assignment: `ASG-UA-W8-01` (decomposition + S001–S005
leaves + I001) closed; the FILE sequence was executed and personally reviewed
in-window (`DEC-UA-015`), integration assessment **`UA-W8-I001` PASS**
(`G1–G9` all PASS, personally executed by the window agent, never delegated).

## Changed-file set (starting SHA-256 → ending SHA-256)

| File | Operation | Starting | Ending |
|---|---|---|---|
| `frontend/app/leads/page.tsx` | MODIFY | `9fad9d0b55b5959e75c016fad0643ba81255cb609871140c0b77b0b1d70bed79` | `21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b` |
| `frontend/components/leads/live-leads-workspace.tsx` | MODIFY | `294201ad42d2831b1c04d0beef0e3b64ca8874fe4160b5dcd221d6fef488ab01` | `a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36` |
| `frontend/components/run-workspace.tsx` | MODIFY | `9472450d3a22143befe5f52569328eb5c07df94fee543ecb873c0ca05914c8c3` | `643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3` |
| `frontend/app/globals.css` | MODIFY | `b5c79578012da0ea47ee85665bce96b1127aca5b5526964074c52656b7359d6d` | `f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c` |
| `frontend/test/uphunt-aesthetic-w8.test.ts` | CREATE | ABSENT | `cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0` |

Planned implementation set digest `88a8fc3280241ce819c353c1160d37d48e61f56def1cf726180059d9f64cd9e0`
(§4.7 byte-sorted). Migrations: none.

Preserved zero-edit (byte-verified at I001 G6): `components/results-table.tsx`
`a4e1472f…`, `components/results-filters.tsx` `0ab118e4…`,
`components/cumulative-traffic.tsx` `7d37a3ae…`, `app/runs/[runId]/page.tsx`
`719e05ea…`, `components/query-editor.tsx` `92efe1f7…`, `components/run-progress.tsx`
`15d840bf…`, `components/lead-details.tsx` `0ceec905…`; read-only
`components/section-intro.tsx` `159096f3…`, `components/landing-sections.tsx`
`914c61e5…`; unchanged predecessors coverage `f5137be4…`, w2 `f65ba0c5…`, w3
`635e2802…`, w4 `8008501d…`, w5 `ee6425e9…`, w6 `f78b8da2…`, w7 `92201c35…`,
`app/runs/page.tsx` `86392720…`, `app/keywords/page.tsx` `8376447d…`,
`components/run-continuation.tsx` `d57edbe3…`. Parked SRC-UA-0092 files and
`test/design-system-shell.test.ts` untouched per `DEC-UA-016`.

## Symbols / behavior

- `leads/page.tsx`: inner `div.run-title-row.app-page-header` eyebrow
  `<div><span className="eyebrow">Live lead workspace</span></div>` replaced with
  `<SectionIntro eyebrow="Live lead workspace" title="Every shop you have already
  found, in one place." copy="One live record per store, with the evidence from
  every discovering run still attached." />` (DEC-UA-003 exact, periods included);
  `import { SectionIntro }` added after the `LiveLeadsWorkspace` import. Wrapper,
  `<Link ... href="/runs">View runs</Link>`, metadata title `My leads`,
  `export const dynamic = "force-dynamic"`, `<LiveLeadsWorkspace />` —
  byte-identical. numstat `2 1`.
- `live-leads-workspace.tsx`: `.results-heading` inner title
  `<div><span className="eyebrow">Current master data</span><h2>Unique shops</h2><p>One
  live record per shop, with every discovering run retained.</p></div>` replaced
  with the same `/leads` `<SectionIntro …/>` (DEC-UA-003 exact); import added. The
  `<header className="results-heading">` wrapper, `<MasterExportButton …/>`,
  `navigate(...)` logic, `apiRequest<MasterLeadPage>(...)` fetch, `pageSize: "25"`,
  `sortBy`/`sortDirection`/`page`/`search` derivation — byte-identical. numstat `2 1`.
- `run-workspace.tsx`: `.results-heading` inner children `<div>…Lead workspace /
  Your store leads / Review the evidence, focus on qualified prospects, or export
  the complete dataset.</div>` replaced with `<SectionIntro eyebrow="Lead
  discovery" title="The stores this search was able to stand behind." copy="Inspect
  the evidence, then keep the prospects worth approaching." />` (DEC-UA-003 exact);
  import added. `.results-heading-utilities`, `ds-badge` span, `ExportCsvButton`,
  `const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];`, `RunProgress`,
  `QueryEditor`, `CumulativeTrafficSection`, `ResultsFilters`, `ResultsTable`,
  `Pagination`, `SummaryCard`, `filtersFromParams`/`resultsQuery` sort keys,
  `params.get("page"/"sortBy"/"sortDirection"/"search")` — byte-identical. numstat `2 8`.
- `globals.css`: H1 `.results-table tbody > tr:not(.detail-row) > td`
  `height: 3.25rem;` → `min-height: 56px;` (kept `padding: 0.375rem 0.625rem;`);
  H2 first `.lead-expansion-shell` `padding: 2px;` → `padding: var(--space-5);`;
  H3 second `.lead-expansion-shell` `padding: 0;` → `padding: var(--space-5);`.
  `.results-table .store-column { width: 28%; }`, `.toggle-column { width: 7%; }`,
  `.lead-details`, W4/W5/W6/W7 selectors, tokens, `.auth-card` — byte-identical.
  numstat `3 3`.
- New registry suite `uphunt-aesthetic-w8.test.ts`: exactly three tests
  CASE-UA-W8-001/002/003, `recordExecuted` after each oracle; source-text oracles
  only (UTF-8 reads of the post-leaf files + the read-only `RETRY_DELAYS`,
  `params.get(...)`, `detail-row`, `sortBy`/`sortDirection`, `min-height: 56px;`,
  `padding: var(--space-5);` needles). No fourth test, no full-set equality, no
  `REQUIRED_CASE_IDS` edit.

## Coverage (window-local)

required = registered = executed = {CASE-UA-W8-001, CASE-UA-W8-002,
CASE-UA-W8-003}; skipped 0; duplicate 0; unexpected 0. Two additional registry IDs
(CASE-UA-W1-001/002) re-executed via the coverage import (w8-only run 5-ID set
digest `703c8441470da81b31c474099b78e2cd38b4e2c1c79756e3e0d9d63d14bfc8c7`, parent
consequence 6). After `npm test`, `test/.ua-executed.json` = exactly the 22 expected
IDs, canonical digest `9da0dc92b33e9eec059c774d2591cd1a1120a77f70110c94312f57f0ec7904fd`
(G5). Required-set digest `0d14982c…` (registry, CASE-UA-W1-002). Window-local set
digest `fb88fd2a8409b4a7527585e36e0868c833b72fa5ee0bb9785747df7babd3e8cc`. Full
43-set equality deferred to UA-W15-V5.

## Commands and outcomes

| Gate | Command | Outcome |
|---|---|---|
| G1 | `npm test` (DEC-UA-016 oracle) | 184 tests, 181 pass, 3 fail (exit 1, expected): exactly the three DEC-UA-016 heading-oracle titles from `my-runs-research-resume.test.ts`; CASE-UA-W8-001/002/003 pass → **PASS** |
| G2 | `npx tsc --noEmit --incremental false --pretty false` | 13 physical lines, 0 owned-path needles, 10 parked SRC-UA-0092 diagnostics → **PASS** |
| G3 | `npm run lint` | exit 0 (0 errors, 2 warnings from non-owned files) → **PASS** |
| G4 | headless Chrome + `next dev` (`STORESIGNAL_DESIGN_FIXTURES=1`), pre-hydration synthetic `.example` interception | 8/8 PNGs at exact sizes under `review-evidence/uphunt-aesthetic/UA-W8/`; routes frozen to {`/leads`, `/design-fixture?scenario=completed`} only → **PASS** |
| G5 | canonical `coverageDigest` over `test/.ua-executed.json` | 22 IDs == pin `9da0dc92…` → **PASS** |
| G6 | 24 byte pins + forbidden-path negative search | all match; implementation delta = 5 planned files + tracked json residue + coordination artifacts + browser evidence → **PASS** |
| G7 | static test import/suite inspection | 0 network / 0 DB operations → **PASS** |
| G8 | fresh in-memory NC probes N1/N2/N3 + read-only-pin N4/N5 | all five falsified → **PASS** |
| G9 | successor negative search | no UA-W9 artifacts; A5 `current_window: UA-W8`; `next_window: UA-W9` untouched; `may_start_successor: false` → **PASS** |

Leaf-level commands: exact-match replacement runners (anchor count 1 each),
numstat inspections (`2 1`, `2 1`, `2 8`, `3 3`), V-B/V-D sha256 pins, V-C
in-memory NC probes, and the prescribed `.ua-executed.json` backup/run/restore
cycle at S005 — per-leaf evidence in
`UA-W8_SUBWINDOW_EVIDENCE_S3.md` `EV-UA-W8-S-001..005`.

## Browser evidence (G4)

`frontend/review-evidence/uphunt-aesthetic/UA-W8/`:
`leads-390.png` (390×900), `leads-768.png` (768×900), `leads-1280.png`
(1280×900), `leads-1440.png` (1440×900), `completed-390.png` (390×900),
`completed-768.png` (768×900), `completed-1280.png` (1280×900),
`completed-1440.png` (1440×900). Routes frozen to the two
{`/leads`, `/design-fixture?scenario=completed`}; live `/runs/[runId]` not
screenshotted. The fixture route resolves `run_fixture_completed` through
`RunWorkspace`, which proxies authenticated `/api/runs/run_fixture_completed*`;
that synthetic id is not a backend row and the data route is auth-gated, so G4
used the G-R1-style pre-hydration synthetic `.example` fetch interception to
render the W8 components (no live run, no credentials). `/leads` (no auth
middleware) rendered the `SectionIntro` headline directly; its live data fetch
was satisfied by synthetic `.example` fixtures. Local_e2e evidence, not a CASE
oracle (SUB-UA-001).

## Negative controls

N1 (delete completed title in-memory) → CASE-UA-W8-001 title assertion falsified.
N2 (delete leads `SectionIntro` import in-memory) → CASE-UA-W8-002 import
assertion falsified. N3 (remove `detail-row` class in-memory) → CASE-UA-W8-003
detail-row assertion falsified. N4 (alter one `RETRY_DELAYS` byte in-memory) →
CASE-UA-W8-001 needle assertion falsified. N5 (remove `min-height: 56px;`
in-memory) → CASE-UA-W8-003 needle assertion falsified. Re-executed fresh at I001
G8.

## Sandbox recoveries and races

No sandbox escalation was required by any gate (browser capture, tsc, lint, and
`npm test` all ran on first attempt). No DEC-UA-016 W1 empty-JSON race was
observed this run (`npm test` registered the full 22-ID set on the first run).

## Coordination artifacts

- `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_DECOMPOSITION_S1.md`
  `8e40cf4ff234efa596dd89adbe2cc18a31bb4141617bd2a52217fb78845ce879`
- `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_STATE_S2.yaml`
  (advanced by the window agent through S001/S002/S003/S004/S005 → I001)
- `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W8_SUBWINDOW_EVIDENCE_S3.md`
  (`EV-UA-W8-D-001..002`, `EV-UA-W8-X-001`, `EV-UA-W8-S-001..005`, and the
  appended `EV-UA-W8-I-001` certificate)

## `.ua-executed.json` residue

`test/.ua-executed.json` is tracked runtime output (`d6121aa` residue). It is left
in the post-G5 state: exactly the 22 sorted IDs (digest `9da0dc92…`), shown as
` M test/.ua-executed.json` in `git status --porcelain`. **Never committed** by the
window agent.

## UA-W9

Not started. `A5.current_window` remains `UA-W8`; `next_window` remains frozen at
`UA-W9`; `may_start_successor: false` honored. `UA-W8-H4` / `UA-W8-H6` hold.
