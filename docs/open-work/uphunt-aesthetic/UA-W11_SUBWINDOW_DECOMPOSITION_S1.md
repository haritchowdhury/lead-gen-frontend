# UA-W11 frozen sub-window decomposition checklist (`S1`)

Subordinate artifact `S1` of parent window `UA-W11` under assignment `ASG-UA-W11-01`.
Companion artifacts: `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W11_SUBWINDOW_STATE_S2.yaml`
and `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W11_SUBWINDOW_EVIDENCE_S3.md`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

This file is frozen once the parent approves the decomposition. Corrections are appended
in §16 with new IDs; existing blocks are never rewritten.

## 0. Parent-frozen mechanical consequences (copied from `A6` `EV-UA-A-061`; not reopened)

The parent froze the following consequences in `A6` `EV-UA-A-061`
(`parent_frozen_mechanical_consequences`). They are copied here in substance and are
outside decomposition authority. They close otherwise-open S1 choices; they are uniquely
determined by DEC-UA-004, DEC-UA-015, DEC-UA-016, UA-W11-T1/T2, and CASE-UA-W11-001..002:

1. DAG: `UA-W11-S001 frontend/components/traffic-enrichment.tsx` →
   `S002 frontend/app/globals.css` →
   `S003 frontend/test/uphunt-aesthetic-w11.test.ts` → `UA-W11-I001`. Sequential only.
   `lead-details.tsx` is in-scope but zero-edit (`9431f71b…`); it consumes no S-number.
   Twenty-one zero-edit in-scope files consume no S-number.
2. Zero-edit G6 pins (no FILE leaf): `section-intro` `159096f3…`;
   `traffic-globe` `7d9567b5…`;
   `lead-details` `9431f71b…` (TrafficEnrichmentDetails call only);
   `ldc-test` `ca1d02c3…`;
   `w10 test` `0a2b34e6…`; `results-table` `a4e1472f…`; `results-filters` `0ab118e4…`;
   `cumulative-traffic` `7d37a3ae…`; `leads/page` `21a17799…`;
   `live-leads-workspace` `a646f657…`;
   `run-workspace` `643c3568…`; `w8 test` `cab15f7f…`; `w9 test` `baee1b2e…`;
   `landing-sections` `914c61e5…`; `query-editor` `92efe1f7…`; `run-progress`
   `15d840bf…`; `runs/[runId]/page` `719e05ea…`; `fixtures` `9ea26525…`; `coverage`
   `f5137be4…`;
   `w2` `f65ba0c5…`; `w3` `635e2802…`; `w4` `8008501d…`; `w5` `ee6425e9…`; `w6` `f78b8da2…`; `w7` `92201c35…`.
   `W10 store-fit/discovery symbols and W10-owned globals selectors stay byte-identical.`
   Do not edit `coreWebVitalRating`, `coreWebVitalsAssessment`, `DataForSeoDetails`,
   `CruxDetails`, `Attribution`, `TrafficMarketExplorer` usage, or `traffic-globe.tsx`.
3. S001 JSX (starting `833cb54c…` → ending `1a903788…`, numstat 7/5):
   Hunk 1: import `SectionIntro` after traffic-globe import.
   Hunk 2: replace `TrafficEnrichmentDetails` header with `SectionIntro` DEC-UA-004 02 strings
   (eyebrow `02 · Attention`, title `Where this store already appears in search.`,
   copy `Visibility estimates, not private storefront analytics.`);
   remove `aria-labelledby`;
   keep `traffic-details-header`, `traffic-source-count`, and everything below the header
   byte-identical.
4. S002 CSS (starting `4945bb59…` → ending `4cf7a1fc…`, numstat 19/11):
   Four hunks on owned selectors only (`.traffic-details` G11 guard,
   `.traffic-details-header` marketing-heading margin,
   `.traffic-source-crux`,
   `.crux-detail-row`, `.traffic-scope`):
   (a) G11 cascade guard retarget `h3→.traffic-details-header>.marketing-heading`; 12px labels / 14px dd;
   (b) insert traffic marketing-heading margin rule after store-evidence/discovery rule;
   (c) crux scope-header `h5/state/assessment` → 12px;
   (d) crux `h6`, fact-grid `dt`/`vital-rating` → 12px; fact-grid `dd` → 14px; `traffic-observation` → 12px.
   Do not edit W10-owned store-evidence/discovery selectors or W9-owned `.lead-overview` selectors.
5. S003 CREATE `uphunt-aesthetic-w11.test.ts` (parent fence `dcf22691…`):
   Two tests `CASE-UA-W11-001/002` per consequence 5.
   `compiledComponents` helper same as w10/ldc tests (lead-details + results-table tsc files).
   001: denseLead render has `02 · Attention` + DEC-UA-004 title/copy.
   002: denseLead render still has `traffic-source-crux` and `crux-detail-row`.
6. Coverage digests: window-local 2-ID `21989bfc…`; planned-file-set
   `26115fd2…`;
   S003 isolated run 4-ID `f12d789d…`; post-G1 31-ID `aa120e83…`.
7. I001 gates (decomposition only — schedule at I001, do not run now):
   G1 DEC-UA-016: 197/194/3 expected; G2 needles `traffic-enrichment.tsx`, w11 test;
   G4 `/design-fixture?scenario=completed` 390/768/1280/1440, first row expanded,
   section 02 headline `Where this store already appears in search.` readable;
   G5 31-ID set after `npm test`.
8. Prohibited: UA-W12, `LeadOverview`/`StoreEvidence`/`DiscoveryDetails` edits,
   `coreWebVitalRating`/`coreWebVitalsAssessment` edits,
   `traffic-globe.tsx` edits,
   `ldc-test` edits, `REQUIRED_CASE_IDS`, `w2–w10` test files,
   `section-intro`, `landing-sections`.
   Do not write S1 §0 phrases: "parent issues the next leaf", "stop for parent after this leaf".

> §0 note on the S003 ending digest: the parent pinned a reference fence
> `dcf22691b5e588dee95caf3af39e233fe388d666808592f7ca3bf273e2830f0c` for the w11 test file
> and explicitly granted sub-window standard §7.3 non-behavioral formatting freedom ("S1 must
> freeze deterministic bytes"). The window agent froze deterministic bytes (§8.3) and verified
> by construction that every string, every `recordExecuted(...)` call-count and call-after-oracle
> ordering, the two-case registration set, and the tsc `files` list match the consequence; the
> only differences from the parent's reference are cosmetic: the test-title wording and
> whitespace. The window-agent deterministic ending digest is therefore
> `40e3178898e7216d05c67f9fb14a3fd184791c7b9a9788298eb8f9838eed5c50`, which this S1 pins
> wherever an `uphunt-aesthetic-w11.test.ts` ending digest is computed (§8, §9 G5/G6, §12.2,
> §13). The two rendered oracles (CASE-UA-W11-001/002) are formatting-independent and were
> verified against the deterministic bytes; the parent's `dcf22691…` reference is retained
> verbatim in §0 as the frozen consequence, mirroring how the W9/W10 S1 §0 notes reconcile
> the parent-sample test-file ending digest that the window agent re-derived deterministically.

> §0 note on the two pinned ending digests in consequences 3 and 4: the window agent
> re-derived each by deterministic simulation in a disposable location (S3 `EV-UA-W11-D-002`).
> Both reproduction values byte-match the parent pins: traffic-enrichment.tsx `1a903788…`
> (numstat 7 5), globals.css `4cf7a1fc…` (numstat 19 11). No §0 reconciliation was required
> for those two files.

## 1. Inherited authority and revision pins

| Pin | Value |
|---|---|
| Parent window | `UA-W11` |
| Parent assignment | `ASG-UA-W11-01` |
| Window agent | `UA-W11-WINDOW-AGENT` |
| Parent standard | `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` |
| Sub-window standard | `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` |
| Contract `A1` | `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827` |
| Decision `A3` | `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3` |
| Checklist `A4` | `4db7876134838f33cb7fadae2ca596b2de28d428cac473bd7515bfebb90f550a` |
| Active state `A5` (file digest) | `9e94fe1bec6065c62d833157595079b1fc411a0ca81525b2b9967be49181e685` (state_version 25, ASG-UA-W11-01, UA-W11-WINDOW-AGENT, IN_PROGRESS) |
| Required coverage set (43 IDs, E6) | `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` (A4 §Coverage pin; asserted by CASE-UA-W1-002) |
| Window-local W11 case set (2 IDs, §4.7) | `21989bfcf384dcba25aefdc3821ee54e1fb3305538facc348a61e7b41a12460f` (parent consequence 6; window-agent §4.7 recompute MATCH) |
| Planned implementation set (3 paths, §4.7 digest) | `26115fd2ed6dbcccccb4d798fe68423042a1eba0795ba2e37f6cbf8c887dff5b` (window-agent §4.7 recompute; MATCHES parent consequence 6) |
| Read-only `frontend/components/section-intro.tsx` | `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175` (recomputed 2026-09-03; matches `EV-UA-A-061`) |
| Read-only `frontend/components/traffic-globe.tsx` | `7d9567b5c8743b9257e916cf033f39ec7b33529fbec003ca02e58ba66fb74a8b` (recomputed 2026-09-03; matches `EV-UA-A-061`) |
| Predecessor `frontend/test/uphunt-aesthetic-coverage.test.ts` | `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` (recomputed 2026-09-03; matches `EV-UA-A-061`) |
| Predecessor `frontend/test/.ua-executed.json` | content `d8ad50ab2fdc5294ee7c5f7048036268cb64ff15e35c1e42431cf85924bb184b` (29 sorted IDs; TRACKED, clean; never committed by this window); 29-ID set digest `b9c2a4676e1447f07a454f236ae0a26a2a7f0f28bfbb8ddad6ff6ee149b36d22` |
| Starting `frontend/components/traffic-enrichment.tsx` (S001 baseline) | `833cb54c4b06034aa6e11a044d329c04710856e25e0ea189cc9a74655623be08` (matches `EV-UA-A-061`) |
| Starting `frontend/app/globals.css` (S002 baseline) | `4945bb591d78593fea95d1470b0db64445bd14d498e35f3dec8fb88a588ae872` (matches `EV-UA-A-061`) |
| Starting `frontend/test/uphunt-aesthetic-w11.test.ts` (S003 baseline) | ABSENT (verified 2026-09-03) |
| Zero-edit `frontend/components/lead-details.tsx` | `9431f71bf7d85de0b81752dfff79206f13d3e0747405aaf25f5ee58c3b6a3727` (TrafficEnrichmentDetails call site only; byte-identical) |
| `A5` authorized_windows | `[UA-W11]` |
| `A5` may_start_successor | `false` |
| Successor `UA-W12` | reserved for parent; NOT authorized (`A5` prohibited `start_UA-W11`/`start_UA-W12`) |

All pins recomputed 2026-09-03 by `UA-W11-WINDOW-AGENT` and matched byte-exact
(S3 `EV-UA-W11-D-001`). Root `ACTIVE_EXECUTION_STATE.md` is out of authority and
untouched (coordination root `git status --porcelain` clean, S3 `EV-UA-W11-D-001`).

## 2. Parent-window scope and exclusions (copied, no expansion)

From `A4` §UA-W11, `A4` F1, `A5` `authorized_write_scope`, and `A7`:

- Objective: Traffic enrichment block uses DEC-UA-004 `02` headline; globe/CrUX behavior
  unchanged (`A4` §UA-W11).
- Window implementation write scope (`A4` §UA-W11 F1): exactly four authorized paths —
  `frontend/components/traffic-enrichment.tsx` (S001 MODIFY),
  `frontend/app/globals.css` (S002 MODIFY; owned selectors only),
  `frontend/test/uphunt-aesthetic-w11.test.ts` (S003 CREATE); plus
  `frontend/components/lead-details.tsx` listed in `A4` F1 write scope but ZERO-EDIT
  (TrafficEnrichmentDetails call site only, parent consequence 1; consumes no S-number,
  stays byte-identical at `9431f71b…`).
- Planned changed-file set (§4): exactly three files —
  `frontend/components/traffic-enrichment.tsx` (MODIFY),
  `frontend/app/globals.css` (MODIFY),
  `frontend/test/uphunt-aesthetic-w11.test.ts` (CREATE); §4.7 planned-set digest
  `26115fd2ed6dbcccccb4d798fe68423042a1eba0795ba2e37f6cbf8c887dff5b`.
  Required changed-file set = planned set (S3 `EV-UA-W11-D-001`).
- Zero-edit in-scope (no FILE sub-window; parent consequence 2 G6 pins, byte-identical):
  `section-intro.tsx` `159096f3…`, `traffic-globe.tsx` `7d9567b5…`,
  `lead-details.tsx` `9431f71b…` (TrafficEnrichmentDetails call only),
  `lead-details-component.test.ts` `ca1d02c3…`, `uphunt-aesthetic-w10.test.ts` `0a2b34e6…`,
  `results-table.tsx` `a4e1472f…`, `results-filters.tsx` `0ab118e4…`,
  `cumulative-traffic.tsx` `7d37a3ae…`, `app/leads/page.tsx` `21a17799…`,
  `components/leads/live-leads-workspace.tsx` `a646f657…`, `run-workspace.tsx` `643c3568…`,
  `uphunt-aesthetic-w8.test.ts` `cab15f7f…`, `uphunt-aesthetic-w9.test.ts` `baee1b2e…`,
  `landing-sections.tsx` `914c61e5…`, `query-editor.tsx` `92efe1f7…`,
  `run-progress.tsx` `15d840bf…`, `app/runs/[runId]/page.tsx` `719e05ea…`,
  `fixtures.ts` `9ea26525…`, `uphunt-aesthetic-coverage.test.ts` `f5137be4…`,
  `uphunt-aesthetic-w2.test.ts` `f65ba0c5…`, `uphunt-aesthetic-w3.test.ts` `635e2802…`,
  `uphunt-aesthetic-w4.test.ts` `8008501d…`, `uphunt-aesthetic-w5.test.ts` `ee6425e9…`,
  `uphunt-aesthetic-w6.test.ts` `f78b8da2…`, `uphunt-aesthetic-w7.test.ts` `92201c35…`.
- Shared-file scope for `frontend/app/globals.css` (`A4`): `.traffic-enrichment`,
  `.crux-detail-row`, `.traffic-source-crux`, `.traffic-scope` (plus the two
  `.lead-details .traffic-details > .traffic-details-header > .marketing-heading` selectors
  listed in parent consequence 4 hunks a and b). Only the four named hunks in parent
  consequence 4 are edited; every other declaration stays byte-identical.
- Shared symbols in `frontend/components/lead-details.tsx` (`A4`): `LeadDetails` function body
  `TrafficEnrichmentDetails` call only. It is NOT edited.
- Read-only scope (window): `frontend/components/section-intro.tsx` (consumed export),
  `frontend/components/traffic-globe.tsx` (globe wiring), `frontend/test/fixtures.ts`
  (denseLead/lead/trafficEnrichment), the W2–W10 product/test files,
  `REQUIRED_CASE_IDS`, parked SRC-UA-0092 files, `design-system-shell.test.ts`.
- Window-agent coordination writes (never implementation): `S1`, `S2`, `S3` (this
  decomposition), `A6` append-only, `A4` `UA-W11-P*`/`UA-W11-T*`/`UA-W11-V*`/`UA-W11-H*`
  checkboxes only, `frontend/review-evidence/uphunt-aesthetic/UA-W11_HANDOFF.md`,
  screenshots under `frontend/review-evidence/uphunt-aesthetic/UA-W11/` (headless chrome
  only, after the parent accepts this decomposition), and at handoff only
  `A5.current_status: AWAITING_REVIEW` (the sole authorized `A5` handoff action after I001
  PASS; `A5` is otherwise protected from every leaf).
- Authorized actions: `decompose_UA-W11_under_subwindow_standard`,
  `modify_traffic_enrichment_tsx_header_only`, `modify_globals_css_owned_selectors_only`,
  `create_w11_test_file`, `check_UA-W11_boxes`, `append_A6_evidence`,
  `write_UA-W11_handoff`, `set_A5_AWAITING_REVIEW_on_handoff`; window-agent assessment and
  coordination writes above; sandbox escalation per the E8.1 policy in §10 item 5.
- Prohibited: `start_UA-W12`, `may_start_successor`,
  `execute_FILE_leaves_before_parent_accepts_decomposition`,
  `parent_assign_or_accept_FILE_leaf`, `stop_for_parent_between_FILE_leaves`,
  `treat_AWAITING_WINDOW_REVIEW_as_parent_stop`, `edit_LeadOverview_StoreEvidence_DiscoveryDetails_bodies`,
  `edit_coreWebVitalRating_coreWebVitalsAssessment`, `edit_DataForSeoDetails_CruxDetails_Attribution_bodies`,
  `edit_TrafficMarketExplorer_usage_or_traffic_globe_tsx`, `edit_section_intro`,
  `edit_landing_sections`, `edit_results_table_tsx`, `edit_results_filters_tsx`,
  `edit_cumulative_traffic_tsx`, `edit_leads_page`, `edit_live_leads_workspace`,
  `edit_run_workspace`, `edit_query_editor`, `edit_run_progress`,
  `edit_unowned_globals_css_selectors`, `edit_W9_lead_overview_or_W10_store_evidence_discovery_selectors`,
  `edit_REQUIRED_CASE_IDS`, `edit_uphunt_aesthetic_coverage_test`,
  `edit_uphunt_aesthetic_w2_w3_w4_w5_w6_w7_w8_w9_w10_test_files`,
  `edit_lead_details_component_test`, `edit_fixtures_ts`,
  `edit_parked_SRC-UA-0092_test_files`, `edit_design-system-shell_test`, `add_dependency`,
  `aws`, `commit`, `push`, `production`, `paid_provider`, `edit_email_scraper`,
  `edit_root_ACTIVE_EXECUTION_STATE`. `npm run build` is a UA-W15-only gate.
- `test/.ua-executed.json` is a TRACKED runtime-output path (owner commit residue). It is
  never a W11 deliverable and is never committed by this window; S003 may touch it only through
  the prescribed §8.4 V-D backup/run/restore procedure.

## 3. Starting working-tree inventory (recorded 2026-09-03, read-only)

Repository: `/home/harit/Email Scrapper/frontend` (git toplevel, HEAD `e8e1176` "W10").
Coordination root `/home/harit/Email Scrapper` is a separate git repository and reported a
clean `git status --porcelain` (root `ACTIVE_EXECUTION_STATE.md` untouched; no
owner-controlled change would be overwritten).

Starting changed-file set (frontend repo, `git status --porcelain`, sorted):

1. ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml` — assignment fields
   written by parent for `ASG-UA-W11-01` (`EV-UA-A-061`); working-tree file digest
   `9e94fe1b…` (state_version 25); PROTECTED (no leaf writes; only the handoff action
   `set_A5_AWAITING_REVIEW_on_handoff` may touch it later, never a leaf).
2. ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` — append-only evidence
   (`EV-UA-A-061` is its tail); window-agent append-only; PROTECTED against leaf writes.

Starting repository change set digest (§4.7 formula over the two paths above):
`e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450`.

Starting state of planned and preserved files (all recomputed 2026-09-03):

- `frontend/components/traffic-enrichment.tsx`: present, clean, digest `833cb54c…`. Anchors:
  `import { TrafficMarketExplorer } from "./traffic-globe";` is line 7; the
  `TrafficEnrichmentDetails` header block from the `<section
  className="detail-section detail-section-emphasis traffic-details"
  aria-labelledby="traffic-enrichment-title">` (line 309) through its `</header>` (line 316)
  is the W11 hunk-2 anchor; `CruxDetails` (`.traffic-source-crux`, `.crux-detail-row`,
  `.traffic-scope`), `DataForSeoDetails`, `Attribution`, `coreWebVitalRating`, and
  `coreWebVitalsAssessment` are untouched.
- `frontend/app/globals.css`: present, clean, digest `4945bb59…`. Anchors:
  the G11 cascade guard comment `/* G11 cascade guard: ... */` is line 6884 and the block
  from `.lead-details .traffic-details h3,` (line 6885) through the `.lead-details
  .traffic-details dd { font-size: 11px; }` (line 6903); the
  `.lead-details .store-evidence-section > .marketing-heading,` /
  `.lead-details .discovery-details-section > .marketing-heading { margin-bottom: 0.125rem; }`
  insertion anchor is lines 7559–7562; the crux microtype blocks
  (`.traffic-source-crux .traffic-scope-header h5` line 7911,
  `.traffic-source-crux .traffic-scope-header .traffic-state` line 7915,
  `.traffic-source-crux .traffic-assessment` line 7920, `.traffic-source-crux h6` line 7933,
  `.traffic-source-crux .fact-grid dt/dd/.vital-rating` lines 7943–7948,
  `.traffic-source-crux .traffic-observation` lines 7950–7955). W9-owned `.lead-overview`
  and W10-owned store-evidence/discovery selectors stay byte-identical.
- `frontend/test/uphunt-aesthetic-w11.test.ts`: ABSENT.
- `frontend/components/lead-details.tsx` (zero-edit): present, clean, digest `9431f71b…`; the
  `TrafficEnrichmentDetails enrichment={lead.traffic_enrichment}` call is line 477; the
  `TrafficEnrichmentDetails` import is line 18; byte-identical.
- `frontend/components/section-intro.tsx` (read-only): digest `159096f3…`; exports
  `SectionIntro({ eyebrow, title, copy, inverse = false })` rendering `div.marketing-heading`
  (optionally `is-inverse`) containing `span.eyebrow` (when eyebrow defined), `h2` title, `p`
  copy (when copy defined).
- `frontend/components/traffic-globe.tsx` (read-only): digest `7d9567b5…`; exports
  `TrafficMarketExplorer`; byte-identical.
- Zero-edit in-scope/read-only files (parent consequence 2): `section-intro.tsx` `159096f3…`,
  `traffic-globe.tsx` `7d9567b5…`, `lead-details.tsx` `9431f71b…`,
  `lead-details-component.test.ts` `ca1d02c3…`, `uphunt-aesthetic-w10.test.ts` `0a2b34e6…`,
  `results-table.tsx` `a4e1472f…`, `results-filters.tsx` `0ab118e4…`,
  `cumulative-traffic.tsx` `7d37a3ae…`, `app/leads/page.tsx` `21a17799…`,
  `live-leads-workspace.tsx` `a646f657…`, `run-workspace.tsx` `643c3568…`,
  `uphunt-aesthetic-w8.test.ts` `cab15f7f…`, `uphunt-aesthetic-w9.test.ts` `baee1b2e…`,
  `landing-sections.tsx` `914c61e5…`, `query-editor.tsx` `92efe1f7…`,
  `run-progress.tsx` `15d840bf…`, `app/runs/[runId]/page.tsx` `719e05ea…`,
  `fixtures.ts` `9ea26525…`, `uphunt-aesthetic-coverage.test.ts` `f5137be4…`,
  `uphunt-aesthetic-w2.test.ts` `f65ba0c5…`, `uphunt-aesthetic-w3.test.ts` `635e2802…`,
  `uphunt-aesthetic-w4.test.ts` `8008501d…`, `uphunt-aesthetic-w5.test.ts` `ee6425e9…`,
  `uphunt-aesthetic-w6.test.ts` `f78b8da2…`, `uphunt-aesthetic-w7.test.ts` `92201c35…`.
- Predecessor and protected: `frontend/test/.ua-executed.json` present, clean, TRACKED, content
  digest `d8ad50ab…`, content = exactly 29 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪
  {4 × CASE-UA-W3} ∪ {2 × CASE-UA-W4} ∪ {2 × CASE-UA-W5} ∪ {3 × CASE-UA-W6} ∪ {2 × CASE-UA-W7}
  ∪ {3 × CASE-UA-W8} ∪ {4 × CASE-UA-W9} ∪ {3 × CASE-UA-W10} (owner commit residue; DEC-UA-011
  runtime output; never committed by W11); `review-evidence/uphunt-aesthetic/UA-W11/` ABSENT.
- The denseLead fixture (`test/fixtures.ts` `9ea26525…`): `traffic_enrichment: {
  ...trafficEnrichment(), dataforseo: { ... , worldwide, markets: allTrackedMarkets() } }` so
  both `DataForSeoDetails` and `CruxDetails` render for `denseLead()`; `CruxDetails` renders
  `<section className="traffic-source-block traffic-source-crux" ...>` and `<div
  className="crux-detail-row">` alongside the unchanged `coreWebVitalRating`/attribution. Both
  CASE-UA-W11-002 needles come from unchanged CruxDetails JSX already rendered and asserted in
  the ldc `traffic details render every available metric...` test (which passed), so they
  reproduce without editing that body.

Environment: node `v24.14.1`; `frontend/package.json` `test` =
`node --experimental-strip-types --test test/*.test.ts`, `lint` = `eslint`;
`tsconfig.json` `incremental: true`, `allowImportingTsExtensions: true`, `strict: true`,
`paths: {"@/*": ["./*"]}`; I001 tsc runs with `--incremental false --pretty false` so no
tsbuildinfo is written. `/usr/bin/google-chrome` exists (P3; I001 G4 only). `/tmp/opencode`
exists as the prescribed disposable location for leaf V-D backup/restore, the S003 dry-run
validation, and negative probes.

## 4. Initial single-file dependency DAG and intermediate-state contracts

```text
UA-W11-S001 (FILE, modify frontend/components/traffic-enrichment.tsx)
   |
   v
UA-W11-S002 (FILE, modify frontend/app/globals.css)
   |
   v
UA-W11-S003 (FILE, create frontend/test/uphunt-aesthetic-w11.test.ts)
   |
   v
UA-W11-I001 (INTEGRATION_ASSESSMENT, personally executed by the window agent)
```

Sequential execution order (parent consequence 1 freezes the DAG and prohibits parallel
waves; default one-active-leaf lifecycle): S001, S002, S003, I001. IDs S001–S003 are
used exactly as named by the parent; no zero-edit in-scope file consumes an S-number.

- Edges S001→S002→S003: parent-frozen sequencing (consequences 1 and 8), not a data
  dependency; the three files are mutually independent and are executed one at a time because
  the parent authorizes exactly one active leaf and requires same-identity review between
  leaves.
- Edge S003→(S001–S002): CASE-UA-W11-001/002 (in S003) read the post-S001/S002 file states;
  the test file must be authored and executed against the post-leaf file states, otherwise its
  oracles are false before the work exists.
- Edge S003→I001: whole-window gates require all three planned files assembled.
- No planned file consumes any interface produced inside this window except the §5.1 frozen
  states; the only consumed cross-file interfaces are predecessor outputs, the read-only
  `SectionIntro` export, the read-only `traffic-globe.tsx` `TrafficMarketExplorer`, the
  read-only `fixtures.ts` `denseLead`/`lead`/`trafficEnrichment`, and the post-S001/S002 file
  states.

### 4.1 Intermediate-state contracts

| After | Permitted checks | Expected temporary state | Why safe | Resolved by | Prohibited while pending |
|---|---|---|---|---|---|
| S001 accepted | S001 §6.4 only | traffic-enrichment.tsx renders `<SectionIntro eyebrow="02 · Attention" .../>` in the `traffic-details-header` so `02 · Attention`, `Where this store already appears in search.`, and `Visibility estimates, not private storefront analytics.` appear in the denseLead render; `aria-labelledby` removed from the section; `traffic-source-crux`/`crux-detail-row`/`traffic-source-grid`/`Attribution` untouched; w11 test file still ABSENT so `npm test` would still report 195/192/3; no permitted leaf check fails in this state | local workspace only; no deployment or external surface; no CASE test runs at leaf level (`npm test` prohibited at leaves) | S003 (the two render cases read the post-S001/S002 file states) | editing any other planned file, a zero-edit in-scope file, a preserved file, or `section-intro.tsx`/`traffic-globe.tsx`; running `npm test`; successor work |
| S002 accepted | S002 §7.4 only | globals.css has the four hunks applied; W9-owned `.lead-overview` selectors, W10-owned store-evidence/discovery selectors, `.lead-details .detail-section > h3` floor, tokens, `.auth-card`, W4–W8 rules, and the `@media` blocks untouched; same pending-test state as above | same as above | S003 (two render cases read the post-S001/S002 file states; the CSS hunks support the readable section headline and type floor) | any second-file edit; running `npm test`; successor work |
| S003 accepted | S003 §8.4 only | w11-only run executed from ABSENT-json state produced exactly 4 IDs then restored; `.ua-executed.json` byte-identical to HEAD (`d8ad50ab…`); repo delta = the three planned files only | test file is not imported by app code; runtime json restored per §8.4 V-D | I001 | any additional-file edit; committing `.ua-executed.json`; successor work |

Unexpected failures at any row stop the sequence for diagnosis (no silent progression). No
permitted intermediate check is expected to fail.

## 5. Exact allocation of requirements, decisions, interfaces, and coverage cases

Parent trace for `UA-W11` (all IDs from `A1`/`A3`/`A4`):

| Parent ID | Allocated to | Terminal anchor |
|---|---|---|
| UA-W11 objective (`SCN-UA-003`, `REQ-UA-004`, `INV-UA-004`) | `UA-W11-S001` §6.2 + `UA-W11-S002` §7.2 + `UA-W11-S003` §8.3 | `<SectionIntro>` with DEC-UA-004 02 strings; 12px/14px CSS hunks; `traffic-source-crux`/`crux-detail-row` preserved |
| UA-W11-T1 | `UA-W11-S001` §6.2 + `UA-W11-S002` §7.2 | traffic-enrichment.tsx ending digest `1a903788…` (two hunks; numstat 7 5); globals.css ending digest `4cf7a1fc…` (four hunks; numstat 19 11) |
| UA-W11-T2 | `UA-W11-S003` §8.3 | two tests, CASE-UA-W11-001/002; denseLead render pins |
| CASE-UA-W11-001 (`SCN-UA-003`, `REQ-UA-004`) | `UA-W11-S003` test 1 | denseLead render `02 · Attention`, `Where this store already appears in search.`, `Visibility estimates, not private storefront analytics.` |
| CASE-UA-W11-002 (`SCN-UA-003`, `INV-UA-004`) | `UA-W11-S003` test 2 | denseLead render `traffic-source-crux`, `crux-detail-row` (fixture-backed CrUX/traffic source markup preserved) |
| NC-UA-002/NC-UA-003 family + read-only pins | S003 §8.4 V-C + `UA-W11-I001` G8 | removing a DEC-UA-004 string/eyebrow/copy, or the `traffic-source-crux`/`crux-detail-row` needles, falsifies the corresponding oracle |
| DEC-UA-002 | consumed `SectionIntro` export in S001 | `section-intro.tsx` read-only `159096f3…`; `TrafficEnrichmentDetails` renders `<SectionIntro eyebrow="02 · Attention" title="…" copy="…" />` |
| DEC-UA-004 | exact `02` strings in S001; oracles in S003 | JSX text nodes match including periods and the `·` middle dot; no paraphrase; type floor 12px/14px |
| DEC-UA-006 | §2 prohibited paths; I001 G6 forbidden-path search | 0 hits |
| DEC-UA-011 | S003 `recordExecuted` import + call-after-witness ordering; `.ua-executed.json` handling | two `recordExecuted` calls, each after its oracle; json never committed |
| DEC-UA-013 | leaf preflights P1/P2 | git status before/after (frontend + coordination root) |
| DEC-UA-014 | `UA-W11-I001` gate G2 | zero tsc diagnostic lines on the owned-path needles |
| DEC-UA-015 | same-identity execute-then-review; window agent assigns next S-number; §0 freeze | no parent leaf gates; no halt at AWAITING_WINDOW_REVIEW |
| DEC-UA-016 | `UA-W11-I001` gate G1 | 197/194/3; failing titles ⊆ heading-oracle set |
| UA-W11-P1..P4, UA-W11-V1..V5, UA-W11-H1..H6 | `UA-W11-I001` / handoff | `A4` UA-W11 lifecycle boxes checked with evidence at I001 |

The remaining 41 coverage CASE IDs belong to other/later windows per the
`test_registration` column of `A4` §Coverage. Window-required local case set =
{CASE-UA-W11-001, CASE-UA-W11-002}, §4.7 set digest
`21989bfcf384dcba25aefdc3821ee54e1fb3305538facc348a61e7b41a12460f` (matches the parent pin in
`EV-UA-A-061` consequence 6).

### 5.1 Frozen cross-file interfaces (inherited and produced)

- `SectionIntro` consumed export (frozen by DEC-UA-002, file pinned `159096f3…`):
  `import { SectionIntro } from "./section-intro";` with props
  `{ eyebrow?: ReactNode; title: ReactNode; copy?: ReactNode; inverse?: boolean }`;
  renders `div.marketing-heading` (optionally `is-inverse`) containing `span.eyebrow`, `h2`,
  `p`. S001 consumes it directly (new import + call); `traffic-globe.tsx` / `section-intro.tsx`
  are NOT edited.
- `recordExecuted(id: string): void` — produced by `UA-W1-T1`, pinned at file digest
  `f5137be4…`. S003 imports it from `./uphunt-aesthetic-coverage.test.ts` and calls it
  exactly once per test, after that test's assertions. `REQUIRED_CASE_IDS` already contains
  the two W11 IDs (`CASE-UA-W11-001/002`); it is never edited here.
- `denseLead`, `lead`, `trafficEnrichment` — produced by `UA-W1`'s fixtures, pinned at
  `9ea26525…`. S003 imports them (denseLead for render, lead/trafficEnrichment for the
  duplicated `Components` type); no leaf may edit fixtures.ts.
- `TrafficMarketExplorer` — consumed by S001's unchanged `DataForSeoDetails` body from
  `./traffic-globe` (read-only pin `7d9567b5…`); S001 must not edit its usage.
- `compiledComponents()` helper — duplicated from lead-details-component.test.ts (lines
  42–90) with the SAME tsc `files` list (lead-details.tsx + results-table.tsx). It is the
  mechanism CASE-UA-W11-001/002 use to render `denseLead()`. It is reproduced byte-identically
  except for the module that declares it; no behavior is otherwise edited. It requires
  `traffic-enrichment.js` (emitted as a dependency of lead-details.tsx so `LeadDetails` can
  render section 02).
- Read-only needles consumed by S003 (byte-exact; occurrence counts verified by inspection,
  S3 `EV-UA-W11-D-002`):
  - `02 · Attention`, `Where this store already appears in search.`,
    `Visibility estimates, not private storefront analytics.` (render)
  - `traffic-source-crux`, `crux-detail-row` (render)
- Ending digests produced by the leaves and consumed by S003/I001 (deterministic simulations
  from the §3 starting digests, S3 `EV-UA-W11-D-002`):
  - S001 `frontend/components/traffic-enrichment.tsx` →
    `1a90378887408f16fcb15c733b39629a4c7b034f6132e3b736bc104bd0d230d1`
    (matches parent consequence 3 pin)
  - S002 `frontend/app/globals.css` →
    `4cf7a1fccba5f3b455b8c1a63e3d2aff4dc8a4f6a9dedd5731b3ea754aa87d95`
    (matches parent consequence 4 pin)
  - S003 `frontend/test/uphunt-aesthetic-w11.test.ts` →
    `40e3178898e7216d05c67f9fb14a3fd184791c7b9a9788298eb8f9838eed5c50`
    (exact §8.3 bytes; window-agent deterministic digest per the §0 note)

## 6. Initial implementation sub-window `UA-W11-S001`

```yaml
subwindow_id: UA-W11-S001
type: FILE
parent_window_id: UA-W11
parent_assignment_id: ASG-UA-W11-01
assigned_agent: UNASSIGNED
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/traffic-enrichment.tsx
file_operation: MODIFY
starting_file_digest: 833cb54c4b06034aa6e11a044d329c04710856e25e0ea189cc9a74655623be08
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W11)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W11_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §6)
  - frontend/components/section-intro.tsx (consumed export, pinned 159096f3…)
  - frontend/components/traffic-globe.tsx (TrafficMarketExplorer, pinned 7d9567b5…)
  - frontend/components/traffic-enrichment.tsx (own file)
authorized_actions:
  - apply_the_two_ordered_hunks_of_section_6.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_CruxDetails_DataForSeoDetails_Attribution_bodies_or_any_below_the_header
  - edit_coreWebVitalRating_coreWebVitalsAssessment
  - edit_the_TrafficMarketExplorer_usage
  - edit_traffic_globe_tsx_or_section_intro_tsx
  - edit_the_TrafficEnrichmentDetails_signature_or_the_dataforseo_crux_calls
  - edit_lead_details_tsx_or_globals_css_or_the_w11_test_file_before_it_is_created
  - paraphrase_any_DEC-UA-004_string_or_drop_a_period_or_the_middle_dot
  - add_a_new_aria_attr_or_reintroduce_aria_labelledby
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W11-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W12
may_start_successor: false
```

### 6.1 Mechanical trace

UA-W11-T1; UA-W11 objective (`SCN-UA-003`); DEC-UA-002; DEC-UA-004 (traffic strings);
DEC-UA-013 (preflight); parent consequences 2, 3, and 8. Terminal anchor: the §6.2 two hunks;
ending digest pin `1a903788…`. Every requirement allocated here terminates in a
file anchor verified by §6.4 checks and by S003's CASE-UA-W11-001 oracle.

### 6.2 Exact file transformation (two ordered hunks; each OLD anchor count == 1)

Apply in this order. Each OLD string/block occurs exactly once in the starting file
(verified by simulation, S3 `EV-UA-W11-D-002`); if any count differs, STOP and report — do not
improvise.

**H1** (line 7) import SectionIntro after the traffic-globe import:

OLD:
```tsx
import { TrafficMarketExplorer } from "./traffic-globe";
```
NEW:
```tsx
import { TrafficMarketExplorer } from "./traffic-globe";
import { SectionIntro } from "./section-intro";
```

**H2** (lines 309–316) replace the TrafficEnrichmentDetails header block:

OLD:
```tsx
    <section className="detail-section detail-section-emphasis traffic-details" aria-labelledby="traffic-enrichment-title">
      <header className="traffic-details-header">
        <div>
          <h3 id="traffic-enrichment-title"><span>02</span>Traffic and site experience</h3>
          <p>Lead-level search visibility and observed site experience, reported by source.</p>
        </div>
        <span className="traffic-source-count">{providerCount} {providerCount === 1 ? "provider" : "providers"}</span>
      </header>
```
NEW:
```tsx
    <section className="detail-section detail-section-emphasis traffic-details">
      <header className="traffic-details-header">
        <SectionIntro
          eyebrow="02 · Attention"
          title="Where this store already appears in search."
          copy="Visibility estimates, not private storefront analytics."
        />
        <span className="traffic-source-count">{providerCount} {providerCount === 1 ? "provider" : "providers"}</span>
      </header>
```

Operation ordering: single atomic file write after both hunks are prepared; no intermediate
partial state is saved. Obsolete behavior removed from this file: the aria-labelledby attribute
and the inner `<div><h3>…Traffic and site experience</h3><p>…</p></div>` block (now replaced by
the DEC-UA-004 02 SectionIntro). Resulting numstat is exactly `7 5` (simulated, S3
`EV-UA-W11-D-002`; matches parent consequence 3).

### 6.3 Preserved behavior and forbidden edits (within the writable file)

- All imports except the added `import { SectionIntro } from "./section-intro";` (H1),
  `DataForSeoDetails`, `CruxDetails`, `Attribution`, `CompactTrafficSignal`,
  `coreWebVitalRating`, `coreWebVitalsAssessment`, `SourceState`, `Metric`, `VitalMetric`,
  `Fractions`, `TrafficEnrichmentDetails` — byte-identical.
- `traffic-source-grid`, the `DataForSeoDetails`/`CruxDetails` provider blocks, the
  `Attribution` aside, `TrafficMarketExplorer` wiring, and the rating functions — byte-identical.
- The `traffic-source-count`, `traffic-details-header`, `.traffic-source-crux`, and
  `.crux-detail-row` markup below the header — byte-identical.
- The DEC-UA-004 strings must include their trailing periods exactly and the eyebrow
  `02 · Attention` must use the exact middle dot `·`; no paraphrase, no case change.
- Do not edit `coreWebVitalRating`, `coreWebVitalsAssessment`, `DataForSeoDetails`,
  `CruxDetails`, `Attribution`, or `TrafficMarketExplorer` usage.

### 6.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: `git status --porcelain` in frontend/ and coordination root; `sha256sum components/traffic-enrichment.tsx` | frontend porcelain contains exactly the two §3 protected ` M` paths, the three `??` window-agent coordination artifacts (S1/S2/S3, untracked), and no other tracked modification; coordination root clean; digest == `833cb54c…` |
| V-B | Apply §6.2 hunks with exact-match tooling (each OLD count == 1 before replacing) | 2 hunks applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- components/traffic-enrichment.tsx` and full `git diff` inspection | numstat == `7  5`; the diff contains exactly the §6.2 H1–H2 changes and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state: `import { SectionIntro } from "./section-intro";` == 1; `eyebrow="02 · Attention"` == 1; `title="Where this store already appears in search."` == 1; `copy="Visibility estimates, not private storefront analytics."` == 1; `aria-labelledby="traffic-enrichment-title"` == 0; `<h3 id="traffic-enrichment-title"` == 0; `Traffic and site experience` == 0; `traffic-source-count` == 1; `className="crux-detail-row"` == 1; `traffic-source-crux` == 1; `crux-detail-row` == 1 | every assertion true |
| V-E | `sha256sum components/traffic-enrichment.tsx`; `git status --porcelain` | ending digest == `1a90378887408f16fcb15c733b39629a4c7b034f6132e3b736bc104bd0d230d1`; attributable delta == ` M components/traffic-enrichment.tsx` exactly (the two §3 protected paths unchanged); no other path |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W11-I001` G1–G9) |

Negative controls: none at this leaf — the ending-digest pin (V-E) mechanically falsifies any
deviation, and the copy/field falsification probes are assigned at the narrowest effective
level in S003 §8.4 V-C and I001 G8.

Expected workspace write set: exactly `{frontend/components/traffic-enrichment.tsx}`.

### 6.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match.
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline.
- [ ] T1 Apply every ordered transformation and no other edit to the writable file.
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions.
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file.
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips.
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations.
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred.
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW.

(S001 V3: required local coverage IDs = {} = registered = executed; the window's coverage
cases execute in S003.)

## 7. Initial implementation sub-window `UA-W11-S002`

```yaml
subwindow_id: UA-W11-S002
type: FILE
parent_window_id: UA-W11
parent_assignment_id: ASG-UA-W11-01
assigned_agent: UNASSIGNED
predecessors: [UA-W11-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/globals.css
file_operation: MODIFY
starting_file_digest: 4945bb591d78593fea95d1470b0db64445bd14d498e35f3dec8fb88a588ae872
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W11)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W11_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §7)
  - frontend/app/globals.css (own file)
authorized_actions:
  - apply_the_four_ordered_hunks_of_section_7.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - add_a_new_selector_or_change_any_selector_name_outside_the_four_owned_hunks
  - edit_any_W9_owned_lead_overview_selector_or_the_lead_details_detail_section_h3_floor
  - edit_any_W10_owned_store_evidence_discovery_selector
  - edit_lead_expansion_shell_or_any_W8_selector
  - edit_run_form_card_or_W4_selectors
  - edit_intelligence_card_or_W5_selectors
  - edit_app_page_header_or_W6_selectors
  - edit_query_editor_progress_or_W7_selectors
  - edit_auth_card
  - edit_tokens_or_variables_or_color_mix
  - edit_the_media_max_width_blocks_that_are_not_owned
  - edit_section_intro_tsx_or_any_preserved_or_zero_edit_file
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W11-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W12
may_start_successor: false
```

### 7.1 Mechanical trace

UA-W11-T1; UA-W11 objective (`SCN-UA-003`); DEC-UA-004 (type floor 12px/14px); DEC-UA-013;
parent consequences 2, 4, and 8. Predecessors: S001 (parent-frozen sequencing, §4). Terminal
anchor: the §7.2 four hunks; ending digest pin `4cf7a1fc…` (parent consequence 4).

### 7.2 Exact file transformation (four ordered hunks; each OLD fence uniquely identified)

Apply in this order. Each OLD fence must match exactly once (the fences below are
selector-inclusive, so they are unambiguous even though `font-size: 12px;`, `font-size: 14px;`
each appear many times in the file).

**H1** (lines 6884–6903) G11 cascade guard retarget `h3→.traffic-details-header>.marketing-heading`;
12px labels / 14px dd:

OLD:
```
/* G11 cascade guard: individual traffic stays legible inside the legacy table canvas. */
.lead-details .traffic-details h3,
.lead-details .traffic-details h4,
.lead-details .traffic-details h5,
.lead-details .traffic-details h6,
.lead-details .traffic-details p,
.lead-details .traffic-details dt,
.lead-details .traffic-details .traffic-scope-kicker,
.lead-details .traffic-details .traffic-country-links button,
.lead-details .traffic-details .traffic-country-links button span,
.lead-details .traffic-details .traffic-globe-instruction,
.lead-details .traffic-details .traffic-overall-button,
.lead-details .traffic-details .traffic-provider-label,
.lead-details .traffic-details .traffic-source-count,
.lead-details .traffic-details .traffic-state,
.lead-details .traffic-details .traffic-attribution li,
.lead-details .traffic-details .traffic-attribution li small,
.lead-details .traffic-details .traffic-attribution-links a { font-size: 10px; }

.lead-details .traffic-details dd { font-size: 11px; }
```
NEW:
```
/* G11 cascade guard: individual traffic stays legible inside the legacy table canvas. */
.lead-details .traffic-details > .traffic-details-header > .marketing-heading,
.lead-details .traffic-details h4,
.lead-details .traffic-details h5,
.lead-details .traffic-details h6,
.lead-details .traffic-details p,
.lead-details .traffic-details dt,
.lead-details .traffic-details .traffic-scope-kicker,
.lead-details .traffic-details .traffic-country-links button,
.lead-details .traffic-details .traffic-country-links button span,
.lead-details .traffic-details .traffic-globe-instruction,
.lead-details .traffic-details .traffic-overall-button,
.lead-details .traffic-details .traffic-provider-label,
.lead-details .traffic-details .traffic-source-count,
.lead-details .traffic-details .traffic-state,
.lead-details .traffic-details .traffic-attribution li,
.lead-details .traffic-details .traffic-attribution li small,
.lead-details .traffic-details .traffic-attribution-links a { font-size: 12px; }

.lead-details .traffic-details dd { font-size: 14px; }
```

**H2** (after line 7562) insert the traffic marketing-heading margin rule after the
store-evidence/discovery marketing-heading margin rule:

OLD:
```
.lead-details .store-evidence-section > .marketing-heading,
.lead-details .discovery-details-section > .marketing-heading {
  margin-bottom: 0.125rem;
}
```
NEW:
```
.lead-details .store-evidence-section > .marketing-heading,
.lead-details .discovery-details-section > .marketing-heading {
  margin-bottom: 0.125rem;
}

.lead-details .traffic-details > .traffic-details-header > .marketing-heading {
  margin-bottom: 0.125rem;
}
```

**H3** (lines 7911–7925) crux scope-header h5 / traffic-state / traffic-assessment microtype
rules to 12px:

OLD:
```
.traffic-source-crux .traffic-scope-header h5 {
  font-size: 0.5625rem;
}

.traffic-source-crux .traffic-scope-header .traffic-state {
  padding: 0.125rem 0.3125rem;
  font-size: 0.4375rem;
}

.traffic-source-crux .traffic-assessment {
  min-height: 1.375rem;
  margin-bottom: 0.25rem;
  padding: 0.1875rem 0.375rem;
  font-size: 0.5rem;
}
```
NEW:
```
.traffic-source-crux .traffic-scope-header h5 {
  font-size: 12px;
}

.traffic-source-crux .traffic-scope-header .traffic-state {
  padding: 0.125rem 0.3125rem;
  font-size: 12px;
}

.traffic-source-crux .traffic-assessment {
  min-height: 1.375rem;
  margin-bottom: 0.25rem;
  padding: 0.1875rem 0.375rem;
  font-size: 12px;
}
```

**H4** (lines 7933–7955) crux h6 / fact-grid dt|dd|vital-rating / traffic-observation:
`h6` 12px; `dt`+`vital-rating` 12px; `dd` 14px; `traffic-observation` 12px:

OLD:
```
.traffic-source-crux h6 {
  display: inline-block;
  margin: 0.125rem 0;
  font-size: 0.4375rem;
}

.traffic-source-crux .fact-grid > div {
  padding: 0.1875rem 0.25rem;
}

.traffic-source-crux .fact-grid dt,
.traffic-source-crux .fact-grid dd,
.traffic-source-crux .vital-rating {
  font-size: 0.4375rem;
  line-height: 1.15;
}

.traffic-source-crux .traffic-observation {
  gap: 0.125rem 0.625rem;
  margin-top: 0.1875rem;
  padding-top: 0.1875rem;
  font-size: 0.4375rem;
}
```
NEW:
```
.traffic-source-crux h6 {
  display: inline-block;
  margin: 0.125rem 0;
  font-size: 12px;
}

.traffic-source-crux .fact-grid > div {
  padding: 0.1875rem 0.25rem;
}

.traffic-source-crux .fact-grid dt,
.traffic-source-crux .vital-rating {
  font-size: 12px;
  line-height: 1.15;
}

.traffic-source-crux .fact-grid dd {
  font-size: 14px;
  line-height: 1.15;
}

.traffic-source-crux .traffic-observation {
  gap: 0.125rem 0.625rem;
  margin-top: 0.1875rem;
  padding-top: 0.1875rem;
  font-size: 12px;
}
```

Operation ordering: single atomic file write after all four hunks are prepared. Resulting
numstat is exactly `19 11` (simulated, S3 `EV-UA-W11-D-002`; matches parent consequence 4).

### 7.3 Preserved behavior and forbidden edits (within the writable file)

- W9-owned `.lead-overview` selectors, W10-owned store-evidence/discovery selectors,
  `.lead-details .detail-section > h3` floor, tokens (`--space-*`, `--color-*`, `--radius-*`),
  `.auth-card`, W4–W8 owned rules, and every `@media` block outside the owned selectors —
  byte-identical.
- Only the four named hunks change; no new selector name outside `shared_file_scope` and the
  `.lead-details .traffic-details > .traffic-details-header > .marketing-heading` selector
  listed in consequence 4 hunks a and b.
- The `.lead-details .detail-section > h3 { font-size: 1.375rem; }` floor (W9) — untouched.

### 7.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S001 accepted with ending digest `1a903788…` (recompute); frontend porcelain contains exactly the two §3 protected ` M` paths, the three `??` coordination artifacts, ` M components/traffic-enrichment.tsx`, and no other tracked modification; coordination root clean; `sha256sum app/globals.css` == `4945bb59…` | all true |
| V-B | Apply §7.2 hunks with exact-match tooling (each named OLD fence count == 1 before replacing) | 4 hunks applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- app/globals.css` and full `git diff` inspection | numstat == `19  11`; the diff contains exactly the §7.2 H1–H4 hunks and no other hunk or selector change |
| V-D | Read-only node inspection, asserting post-state: `.lead-details .traffic-details > .traffic-details-header > .marketing-heading` == 2 (H1 group selector + H2 rule); `.lead-details .store-evidence-section > .marketing-heading` == 2 (unchanged H2 anchor); `> .traffic-details-header > .marketing-heading,` occurs in H1; `margin-bottom: 0.125rem;` == 4 (W9 h3 + overview section keep them; the H2 rule adds one); `.traffic-source-crux .traffic-scope-header h5 {` + `font-size: 12px;` == 1; `.traffic-source-crux .traffic-scope-header .traffic-state {` + `font-size: 12px;` == 1; `.traffic-source-crux .traffic-assessment {` + `font-size: 12px;` == 1; `.traffic-source-crux h6 {` + `font-size: 12px;` == 1; `.traffic-source-crux .fact-grid dt,` + `.traffic-source-crux .vital-rating` 12px group == 1; `.traffic-source-crux .fact-grid dd {` + `font-size: 14px;` == 1; `.traffic-source-crux .traffic-observation {` + `font-size: 12px;` == 1; `.lead-details .traffic-details h3,` == 0; `.lead-details .traffic-details dd { font-size: 11px; }` == 0; `.lead-details .store-evidence-section h3,` == 0; `.lead-overview > .marketing-heading` occurrences unchanged; `.lead-details .detail-section > h3 {` and its `font-size: 1.375rem;` unchanged | every assertion true |
| V-E | `sha256sum app/globals.css`; `git status --porcelain` | ending digest == `4cf7a1fccba5f3b455b8c1a63e3d2aff4dc8a4f6a9dedd5731b3ea754aa87d95`; attributable delta == the two ` M` planned implementation paths exactly (traffic-enrichment.tsx + globals.css) |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W11-I001` G1–G9) |

Expected workspace write set: exactly `{frontend/app/globals.css}`.

### 7.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match.
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline.
- [ ] T1 Apply every ordered transformation and no other edit to the writable file.
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions.
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file.
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips.
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations.
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred.
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW.

(S002 V3: required local coverage IDs = {} = registered = executed.)

## 8. Initial implementation sub-window `UA-W11-S003`

```yaml
subwindow_id: UA-W11-S003
type: FILE
parent_window_id: UA-W11
parent_assignment_id: ASG-UA-W11-01
assigned_agent: UNASSIGNED
predecessors: [UA-W11-S001, UA-W11-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w11.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
read_only_scope:
  - frontend/components/traffic-enrichment.tsx (post-S001 state, digest 1a903788…)
  - frontend/app/globals.css (post-S002 state, digest 4cf7a1fc…)
  - frontend/test/fixtures.ts (read-only pin, digest 9ea26525…)
  - frontend/test/uphunt-aesthetic-coverage.test.ts (pinned f5137be4…)
  - frontend/test/uphunt-aesthetic-w10.test.ts (custom-import predecessor, pinned 0a2b34e6…)
  - frontend/test/lead-details-component.test.ts (compiledComponents source, pinned ca1d02c3…)
  - frontend/test/.ua-executed.json (runtime state, HEAD content digest d8ad50ab…)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W11_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §8)
authorized_actions:
  - create_the_writable_file_with_the_exact_section_8.3_bytes
  - run_the_w11_only_test_command_under_the_section_8.4_V-D_backup_run_restore_procedure
  - run_disposable_in_memory_negative_probes_V-C_via_node_-e (zero workspace writes)
  - run_read_only_node_inspection
  - record_git_status_preflight_and_postcondition
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_two_post_leaf_files_or_the_read_only_pin_files
  - add_a_third_test_or_a_skip_filter_or_todo
  - assert_getExecuted_equals_REQUIRED_CASE_IDS_full_set_equality
  - call_recordExecuted_before_a_tests_assertions
  - edit_REQUIRED_CASE_IDS_or_the_coverage_test_file_or_fixtures_ts
  - edit_the_compiledComponents_helper_beyond_the_byte_reproduction
  - commit_or_stage_test/.ua-executed.json
  - delete_test/.ua-executed.json (V-D moves it to /tmp/opencode and restores it byte-identically)
  - run_npm_test_full_suite_or_npx_tsc_or_npm_run_lint (deferred to UA-W11-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W12
may_start_successor: false
```

### 8.1 Mechanical trace

UA-W11-T2; CASE-UA-W11-001 (`SCN-UA-003`); CASE-UA-W11-002 (`SCN-UA-003`, `INV-UA-004`);
DEC-UA-004; DEC-UA-011; DEC-UA-013; parent consequences 5, 6, and 8. Predecessors: S001–S002
(each case's needles read the post-leaf file states; §4 edges). The window-local required
case-set digest is `21989bfc…` (consequence 6).

### 8.2 Exact file transformation

CREATE `frontend/test/uphunt-aesthetic-w11.test.ts` with exactly the §8.3 bytes. No other
content, no extra test, no helper exports beyond the duplicated `compiledComponents`.

### 8.3 Exact required ending file content

The file is exactly (UTF-8, LF endings, single trailing newline; SHA-256
`40e3178898e7216d05c67f9fb14a3fd184791c7b9a9788298eb8f9838eed5c50`; the window-agent
deterministic digest per the §0 note; the parent reference fence `dcf22691…` is documented
there):

```ts
import assert from "node:assert/strict";
import { mkdtemp, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";
import { denseLead, lead, trafficEnrichment } from "./fixtures.ts";

type Components = {
  LeadDetails: React.ComponentType<{ lead: ReturnType<typeof lead> }>;
  ResultsTableView: React.ComponentType<{
    leads: ReturnType<typeof lead>[];
    loading: boolean;
    expandedLeadId: string | null;
    onExpandedLeadId: (leadId: string | null) => void;
  }>;
  TrafficEnrichmentDetails: React.ComponentType<{
    enrichment: ReturnType<typeof trafficEnrichment> | undefined;
  }>;
  coreWebVitalRating: (
    metric: "lcp" | "inp" | "cls",
    value: number,
  ) => "good" | "needs_improvement" | "poor";
  coreWebVitalsAssessment: (
    metrics: ReturnType<typeof trafficEnrichment>["crux"] extends infer Crux
      ? Crux extends { origin_metrics: { metrics?: infer Metrics } }
        ? Metrics
        : never
      : never,
  ) => "good" | "needs_improvement" | "poor" | "incomplete";
  formattedCalendarDate: (value: string) => string;
};

let compiled: Promise<Components> | null = null;

function compiledComponents(): Promise<Components> {
  if (compiled) return compiled;
  compiled = (async () => {
    const frontendRoot = fileURLToPath(new URL("..", import.meta.url));
    const output = await mkdtemp(join(tmpdir(), "gr5-components-"));
    await writeFile(join(output, "package.json"), '{"type":"commonjs"}\n', "utf8");
    await symlink(join(frontendRoot, "node_modules"), join(output, "node_modules"), "dir");
    const tsc = join(frontendRoot, "node_modules", "typescript", "bin", "tsc");
    const harnessConfig = join(output, "tsconfig.harness.json");
    await writeFile(harnessConfig, JSON.stringify({
      compilerOptions: {
        outDir: ".",
        rootDir: frontendRoot,
        module: "CommonJS",
        moduleResolution: "Node",
        target: "ES2022",
        jsx: "react-jsx",
        strict: true,
        skipLibCheck: true,
        esModuleInterop: true,
        resolveJsonModule: true,
        baseUrl: frontendRoot,
        paths: { "@/*": ["*"] },
      },
      files: [
        join(frontendRoot, "components", "lead-details.tsx"),
        join(frontendRoot, "components", "results-table.tsx"),
      ],
    }), "utf8");
    const result = spawnSync(process.execPath, [
      tsc,
      "-p", harnessConfig,
    ], { cwd: frontendRoot, encoding: "utf8" });
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const require = createRequire(import.meta.url);
    const details = require(join(output, "components", "lead-details.js"));
    const table = require(join(output, "components", "results-table.js"));
    const traffic = require(join(output, "components", "traffic-enrichment.js"));
    return {
      LeadDetails: details.LeadDetails,
      ResultsTableView: table.ResultsTableView,
      TrafficEnrichmentDetails: traffic.TrafficEnrichmentDetails,
      coreWebVitalRating: traffic.coreWebVitalRating,
      coreWebVitalsAssessment: traffic.coreWebVitalsAssessment,
      formattedCalendarDate: traffic.formattedCalendarDate,
    } as Components;
  })();
  return compiled;
}

test("CASE-UA-W11-001 traffic enrichment section uses SectionIntro with the attention heading and copy", async () => {
  const { LeadDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: denseLead() }));
  assert.match(html, /02 · Attention/u);
  assert.match(html, /Where this store already appears in search\./u);
  assert.match(html, /Visibility estimates, not private storefront analytics\./u);
  recordExecuted("CASE-UA-W11-001");
});

test("CASE-UA-W11-002 traffic and CrUX source markup still renders", async () => {
  const { LeadDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: denseLead() }));
  assert.match(html, /traffic-source-crux/u);
  assert.match(html, /crux-detail-row/u);
  recordExecuted("CASE-UA-W11-002");
});
```

This content was value-validated by the window agent against the simulated post-S001/S002
states in the disposable location `/tmp/opencode/ua-w11-dework/dryrun` (S3 `EV-UA-W11-D-002`):
the two render oracles are reachable because the S001 H2 edit injects the DEC-UA-004 02
strings via `SectionIntro` (unchanged `section-intro.tsx`), and the two CASE-UA-W11-002 needles
come from unchanged `CruxDetails` JSX that already rendered and passed in the ldc `traffic
details render every available metric...` test; the generated executed set contains exactly the
4 expected IDs (set digest `f12d789d…`, matching parent consequence 6). The dry-run directory
remains disposable and outside the workspace.

### 8.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S002 accepted with ending digest `4cf7a1fc…` (recompute); the S001 ending digest `1a903788…` (recompute); `test/uphunt-aesthetic-w11.test.ts` ABSENT; frontend porcelain contains exactly the two §3 protected ` M` paths, the three `??` coordination artifacts, the two ` M` planned implementation paths, and no other tracked modification; coordination root clean; `sha256sum test/.ua-executed.json` == `d8ad50ab…` | all true |
| V-B | `sha256sum test/uphunt-aesthetic-w11.test.ts` after writing §8.3 bytes | digest == `40e3178898e7216d05c67f9fb14a3fd184791c7b9a9788298eb8f9838eed5c50` |
| V-C | Disposable in-memory validation evidence recorded during authoring (window agent, `/tmp/opencode/ua-w11-dework`, S3 `EV-UA-W11-D-002`): N1 (NC-UA-002) replace `Where this store already appears in search.` with `Traffic and site experience` in an in-memory copy of post-S001 traffic-enrichment.tsx → the CASE-UA-W11-001 title assertion must fail; N2 (NC-UA-002) drop the `02 · Attention` eyebrow in an in-memory copy of post-S001 traffic-enrichment.tsx → the CASE-UA-W11-001 eyebrow assertion must fail; N3 (NC-UA-002) replace `Visibility estimates, not private storefront analytics.` with `Lead-level search visibility...` → the CASE-UA-W11-001 copy assertion must fail; N4 (read-only pin) remove `traffic-source-crux` from the CruxDetails render → the CASE-UA-W11-002 `traffic-source-crux` assertion must fail; N5 (read-only pin) remove `crux-detail-row` from the CruxDetails render → the CASE-UA-W11-002 `crux-detail-row` assertion must fail | all five probes falsified (recorded authoring evidence; I001 G8 re-executes them fresh) |
| V-D | From ABSENT executed-set state: `mv test/.ua-executed.json /tmp/opencode/ua-w11-ua-executed-head-backup.json`; from `frontend/` run `node --experimental-strip-types --test test/uphunt-aesthetic-coverage.test.ts test/uphunt-aesthetic-w11.test.ts`; read `test/.ua-executed.json`; then `mv /tmp/opencode/ua-w11-ua-executed-head-backup.json test/.ua-executed.json`; re-`sha256sum` | command exit 0; tests 4, pass 4, fail 0, skipped 0, with exactly the titles CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W11-001, CASE-UA-W11-002; json == exactly those 4 sorted IDs (§4.7 set digest `f12d789daac333d2e5accefc65e402a8e047f5a6b978d415bf31805c70f3fcf6`, parent consequence 6); post-restore digest == `d8ad50ab…` and `git status --porcelain` shows `test/.ua-executed.json` unmodified; no W2–W10 ID is required here |
| V-E | `git status --porcelain` | attributable delta == `?? test/uphunt-aesthetic-w11.test.ts` added to the two ` M` implementation paths; no other path |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W11-I001` G1–G9) |

Expected workspace write set: exactly `{frontend/test/uphunt-aesthetic-w11.test.ts}` plus the
prescribed disposable `test/.ua-executed.json` backup/run/restore cycle of V-D, whose net ending
delta is zero (byte-identical restore is part of the check).

### 8.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match.
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline.
- [ ] T1 Apply every ordered transformation and no other edit to the writable file.
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions.
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file.
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips.
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations.
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred.
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW.

(S003 V3: required local coverage IDs = registered = {CASE-UA-W11-001, CASE-UA-W11-002}
plus the 2 × CASE-UA-W1 registry re-executions provoked by the import; zero
skips, duplicates, or unexpected IDs; the 4-ID executed-set digest `f12d789d…` is the witness.
Full 43-set equality is UA-W15-V5 only.)

## 9. Local and whole-window verification gates

Leaf-local gates: §6.4, §7.4, §8.4. Frozen whole-window gates, executed only by
`UA-W11-I001` from `frontend/`, per `A4` §Gates, `A4` UA-W11 lifecycle, `DEC-UA-014`,
`DEC-UA-016`, and parent consequence 7:

| Gate | Command / assertion | Expected |
|---|---|---|
| G1 | `npm test` per `DEC-UA-016` | PASS iff CASE-UA-W11-001 and CASE-UA-W11-002 pass (plus the two CASE-UA-W1 registry re-executions via the import) and every failing title, if any, is a member of the predecessor heading-oracle set {"My searches presents keyword research and identifiable run dossiers without rendering IDs", "MRR-FE-01 exact research payload and two-section surface", "MRR-W2 frontend unit certificate"}; expected total 197 tests / 194 pass / 3 fail = 195 predecessor + 2 W11 cases; process exit 1 is expected and is not G1 FAIL when that holds; if CASE-UA-W1-001/002 fail solely with `SyntaxError: Unexpected end of JSON input` from getExecuted, that is the known concurrent recordExecuted race (DEC-UA-011 residue) — one identical rerun is permitted (E8.1) and is not a product failure |
| G2 | `npx tsc --noEmit --incremental false --pretty false` (`DEC-UA-014` oracle; `--incremental false` so no tsbuildinfo is written) | PASS iff zero output lines contain any owned-path needle: `traffic-enrichment.tsx`, `uphunt-aesthetic-w11.test.ts` (globals.css is not typechecked); expected remaining diagnostics: exactly the 10 parked SRC-UA-0092 diagnostics (13 physical lines at the W10 close); repo-wide exit 0 NOT required; parked files MUST NOT be edited |
| G3 | `npm run lint` | exit 0 (JSX and CSS owned this window; globals.css edited) |
| G4 | browser evidence (`browser_evidence: true`): local `next dev` with `STORESIGNAL_DESIGN_FIXTURES=1`, `/usr/bin/google-chrome --headless` screenshots of route {`/design-fixture?scenario=completed`} ONLY, at widths 390, 768, 1280, 1440 (height 900), with the first results row expanded so LeadDetails is visible and section 02 headline `Where this store already appears in search.` is readable alongside the existing 03/04 sections, under `frontend/review-evidence/uphunt-aesthetic/UA-W11/` | 4 screenshots recorded; the route set is frozen to that one route (parent consequence 7); live `/runs/[runId]` MUST NOT be screenshotted (it polls); if the completed fixture cannot render LeadDetails, the same G-R1-style pre-hydration synthetic `.example` interception used on UA-W7/W8/W9/W10 is permitted (no live run, no credentials); a fixture 404 without that recovery is PARENT_BLOCKED; smooth local dev server processes only, under the §10 item 5 sandbox policy; this is local_e2e evidence, NOT a CASE oracle (SUB-UA-001) |
| G5 | coverage scope: required W11 window set (2 IDs, digest `21989bfc…`) = registered (two `test()` titles) = executed W11 IDs; after G1, `test/.ua-executed.json` is exactly the 31 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3} ∪ {2 × CASE-UA-W4} ∪ {2 × CASE-UA-W5} ∪ {3 × CASE-UA-W6} ∪ {2 × CASE-UA-W7} ∪ {3 × CASE-UA-W8} ∪ {4 × CASE-UA-W9} ∪ {3 × CASE-UA-W10} ∪ {2 × CASE-UA-W11} (§4.7 set digest `aa120e83587fd9792542c07dc606b0dcc50f66e8f8c45d3857ec8a0c162c671f`, parent consequence 6); zero skips, duplicates, unexpected, or unactivated IDs in this window; full 43-set equality NOT asserted (`UA-W15-V5` owns it); the json is modified tracked runtime output (owner commit residue) and is never committed | exact |
| G6 | `sha256sum` of the three planned files, all zero-edit in-scope/preserved files (`section-intro.tsx`, `traffic-globe.tsx`, `lead-details.tsx`, `lead-details-component.test.ts`, `uphunt-aesthetic-w10.test.ts`, `results-table.tsx`, `results-filters.tsx`, `cumulative-traffic.tsx`, `leads/page.tsx`, `live-leads-workspace.tsx`, `run-workspace.tsx`, `uphunt-aesthetic-w8.test.ts`, `uphunt-aesthetic-w9.test.ts`, `landing-sections.tsx`, `query-editor.tsx`, `run-progress.tsx`, `runs/[runId]/page.tsx`, `fixtures.ts`, `uphunt-aesthetic-coverage.test.ts`, and the w2–w7 test files); plus `git status --porcelain` and a forbidden-path negative search over the whole window delta (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`, `email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, the five parked test files, the coverage test file, `REQUIRED_CASE_IDS`, `section-intro.tsx`, `traffic-globe.tsx`, `landing-sections.tsx`, `lead-details.tsx`, `fixtures.ts`, `run-workspace.tsx`, `leads/page.tsx`, `live-leads-workspace.tsx`, the W4–W10 product files, the w2–w10 test files, `lead-details-component.test.ts`, `design-system-shell.test.ts`, and the `LeadOverview`/`StoreEvidence`/`DiscoveryDetails` bodies, `coreWebVitalRating`/`coreWebVitalsAssessment`) | ending pins `1a903788…`, `4cf7a1fc…`, `40e317…` on the three planned files; byte pins `159096f3…`, `7d9567b5…`, `9431f71b…`, `ca1d02c3…`, `0a2b34e6…`, `a4e1472f…`, `0ab118e4…`, `7d37a3ae…`, `21a17799…`, `a646f657…`, `643c3568…`, `cab15f7f…`, `baee1b2e…`, `914c61e5…`, `92efe1f7…`, `15d840bf…`, `719e05ea…`, `9ea26525…`, `f5137be4…`, `f65ba0c5…`, `635e2802…`, `8008501d…`, `ee6425e9…`, `f78b8da2…`, `92201c35…` all unchanged; implementation delta == exactly the three §4 planned files; coordination artifacts limited to the enumerated §2 list; `A5`/`A6` digests unchanged by leaves |
| G7 | static inspection of the new test file imports (`node:test`, `node:assert/strict`, `node:fs/promises` (mkdtemp/symlink/writeFile), `node:os`, `node:path`, `node:module`, `node:url`, `node:child_process`, `react`, `react-dom/server`, `./uphunt-aesthetic-coverage.test.ts`, `./fixtures.ts`) + suite behavior | 0 network operations, 0 DB operations (`UA-W11-V3`) |
| G8 | personally re-execute the §8.4 V-C probes N1–N5 on fresh in-memory copies (tmp only, no workspace writes): NC-UA-002 family (02 title/copy change, eyebrow removal) and the read-only `traffic-source-crux`/`crux-detail-row` needles | all falsified |
| G9 | successor negative search: no `UA-W12` artifact of any kind (no `uphunt-aesthetic-w12.test.ts`, no keyword-research edits, no W9/W10/W11 file edits beyond the three planned files), `A5.current_window` still `UA-W11`, `next_window` untouched | `may_start_successor: false` honored; `UA-W11-H4/H6` hold |

PASS oracle for `UA-W11-I001`: G1–G9 all pass; `A4` `UA-W11-P1..P4`, `UA-W11-V1..V5`,
`UA-W11-H1..H5` then checked with resolvable evidence;
`frontend/review-evidence/uphunt-aesthetic/UA-W11_HANDOFF.md` written per §12.3;
`A5.current_status` set to `AWAITING_REVIEW` (the sole authorized post-I001 `A5` handoff
action); STOP per `UA-W11-H6` (no `UA-W12`).
CORRECTION_REQUIRED oracle: any G-gate behavioral failure → §10 correction loop with
`UA-W11-C00n` (single-file, dependency-safe).
PARENT_BLOCKED oracle: missing parent decision, contradiction with `A1`–`A4`, or required scope
expansion (e.g. a defect that cannot be corrected without editing `section-intro.tsx`,
`traffic-globe.tsx`, `lead-details.tsx`, `landing-sections.tsx`, `query-editor.tsx`,
`run-progress.tsx`, `runs/[runId]/page.tsx`, `fixtures.ts`, `REQUIRED_CASE_IDS`,
`lead-details-component.test.ts`, a parked file, `design-system-shell.test.ts`, or a W2–W10
product/test file).

## 10. Correction and re-assessment rules

1. Every correction is a new single-file sub-window `UA-W11-C00n` with a new assignment ID and
   baseline digest, citing: the failed evidence, exact root cause, the governing requirement and
   decision already determining the remedy, the earlier sub-window corrected, and the gates
   invalidated. Nothing is rewritten in place; `S3` is append-only.
2. `REQUIRED_CASE_IDS`, the coverage test file, and `fixtures.ts` are NOT correctable at window
   level (`A5` prohibitions). A defect requiring changes there is `PARENT_BLOCKED`.
3. `section-intro.tsx`, `traffic-globe.tsx`, `lead-details.tsx`, `landing-sections.tsx`,
   `query-editor.tsx`, `run-progress.tsx`, `app/runs/[runId]/page.tsx`, `results-table.tsx`,
   `results-filters.tsx`, `cumulative-traffic.tsx`, `leads/page.tsx`,
   `live-leads-workspace.tsx`, `run-workspace.tsx`, `lead-details-component.test.ts`, and
   `fixtures.ts` are frozen (§0 consequence 2). A failing check that would require editing any
   of them, a W2–W10 product/test file, a parked file, or `design-system-shell.test.ts` is
   `PARENT_BLOCKED`, never a frozen-file edit. The `LeadOverview`/`StoreEvidence`/`DiscoveryDetails`
   bodies, `coreWebVitalRating`/`coreWebVitalsAssessment`, and `TrafficMarketExplorer` usage are
   also frozen (§0 consequence 8); a defect requiring any of them is `PARENT_BLOCKED`.
4. After the last correction the window agent personally runs a new assessment `UA-W11-I00n`
   (new ID), reusing unchanged gates by exact reference and rerunning every gate invalidated by
   the correction (at minimum G1, G2, G5, G6, G8), the coverage closure checks, and the
   forbidden-path negative search.
5. Environment rule (E8.1, inherited from `A5`): an otherwise-authorized local check MAY start
   with sandbox escalation (`sandbox_escalation_for_authorized_local_actions: true`,
   `automatic_identical_recovery_after_proven_environment_invalidation: true`,
   `recovery_limit_per_invalidated_execution: 1`, `external_authority_expansion: false`). If an
   attempt is invalidated solely by sandbox denial or execution-channel loss, one identical
   recovery run is permitted (same arguments, selection, environment, fixtures, timeouts,
   resources, oracle, write scope) after read-only proof that no matching process,
   workspace/external mutation, or usable acceptance result remains. A changed command, an
   observable product/test failure, or any external action is NOT recoverable this way and enters
   the correction loop or `PARENT_BLOCKED`. The DEC-UA-016 W1 empty-JSON race is governed by
   DEC-UA-016's own one-rerun rule, not this clause.
6. The window agent never repairs a leaf file directly; only corrective sub-windows edit files.

## 11. Mandatory authoring-readiness checklist (sub-window standard §11)

Evidence citations resolve into `S3` (`EV-UA-W11-D-001..002`).

### 11.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA-W11-D-001 (A5: ASG-UA-W11-01, UA-W11-WINDOW-AGENT, IN_PROGRESS, decompose action authorized; A5 digest 9e94fe1b… recomputed MATCH)
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA-W11-D-001 (recomputed SHA-256 matches all pins incl. A4 `4db78761…`, A1 `57fa49c7…`, A3 `094bc8bf…`, and subwindow standard `842c2955…`)
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA-W11-D-002 (§2, §6–§8 of this S1)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA-W11-D-001 (§3 of this S1)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA-W11-D-001 (S1 spec / S2 state / S3 evidence paths)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA-W11-D-002 (leaf prohibited_actions; report-only-to-window-agent rule)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: EV-UA-W11-D-002 (§10 item 5 == A5 policy)

### 11.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA-W11-D-002 (§5 table; UA-W11-T1/T2; A4 test_registration CASE-UA-W11-001..002)
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA-W11-D-001 (§0 consequences close the remaining choices; current source matches every §3 anchor)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA-W11-D-002 (both = the three §4 planned files; planned-file-set digest `26115fd2…`; the zero-edit in-scope files accounted for by parent consequence 2 with G6 pins)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: EV-UA-W11-D-002 (§4: S001–S003, one file each; zero-edit in-scope files take no S-number per parent consequence 1)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: EV-UA-W11-D-002 (§6.2/§7.2 exact fences; §8.3 bytes with pinned digest `40e317…`; JSX/CSS ending digests reproduce the parent pins byte-exact; the S003 digest is the window-agent deterministic bytes per the §0 note)
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: EV-UA-W11-D-002 (§4; no waves — parent consequence 1; S003 ordered after S001–S002 by the needle dependencies; S001→S002 ordered by parent-frozen sequencing with one-active-leaf review between leaves)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: EV-UA-W11-D-002 (§5.1: SectionIntro export pinned `159096f3…`; traffic-globe `7d9567b5…`; fixtures/coverage pinned; read-only needles pinned; all leaf ending digests pinned before S003 dispatch)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: EV-UA-W11-D-002 (§4.1 table)
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: EV-UA-W11-D-002 (two product leaves and one test leaf are separate; runtime json handled by prescribed disposable procedure, never a deliverable)
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: EV-UA-W11-D-002 (command lists in §6.4–§8.4; the only prescribed non-writable touch is the §8.4 V-D json backup/run/restore with net-zero delta; tsc leaf runs are not scheduled — tsc is an I001 gate)

### 11.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7 of the standard. Evidence: EV-UA-W11-D-002 (§6–§8 yaml blocks; 15/15 field-presence lint per block)
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: EV-UA-W11-D-002 (byte-exact §6.2/§7.2 with unique anchors and occurrence counts; §8.3 full file bytes pinned by digest)
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: EV-UA-W11-D-002 (§6.4–§8.4)
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: EV-UA-W11-D-002 (V-E rows in §6.4–§8.4; V-D net-zero json restore proof)
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: EV-UA-W11-D-002 (§12 templates; H3 rows)
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: EV-UA-W11-D-002 (leaf prohibited_actions)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: EV-UA-W11-D-002 (each leaf's LOCAL_NOW set passes standalone — S001 by the ending-digest pin, S002 by the ending-digest pin, S003 by the V-D w11-only run; whole-window gates deferred and named)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: EV-UA-W11-D-002 (DEF rows → UA-W11-I001)

### 11.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: EV-UA-W11-D-002 (§5; 2 cases → S003 with §8.3 bytes)
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: EV-UA-W11-D-002 (§8.4 V-D; §9 G5)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: EV-UA-W11-D-002 (NC-UA-002/003-family probes at S003 leaf level (§8.4 V-C N1–N5) with I001 G8 personal re-execution; S001–S002 integrity enforced by the ending-digest pins)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: EV-UA-W11-D-002 (SUB-UA-001 inherited: the compiledComponents/denseLead render + UTF-8 file reads are source-text oracles only; no computed-pixel claim; screenshots are local_e2e evidence, not oracles; coverage, fixtures and w2–w10 test files never weakened here)
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: EV-UA-W11-D-002 (§13: authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: EV-UA-W11-D-002 (§9; G4 scheduled at I001 per browser_evidence true)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: EV-UA-W11-D-002 (§10)
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: EV-UA-W11-D-002 (§13 assigned WINDOW-AGENT; §10 item 6; parent consequence 8 same-identity review)
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: EV-UA-W11-D-002 (§9 G5/G6/G8; §8.4 V-B/V-D)
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: EV-UA-W11-D-002 (§12.3)
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: EV-UA-W11-D-002 (§10 item 5)

### 11.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA-W11-D-002 (`UA-W11-S001`–`UA-W11-S003`, `UA-W11-I001` unique; S-numbering exactly as parent consequence 1; CASE/DEC/SCN/NC IDs cite A3/A4)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA-W11-D-002 (S1 contains only concrete paths, digests, bytes, counts; the parent consequence 4 "(exact replacement text frozen in parent simulation)" placeholders are resolved to deterministic bytes in §7.2)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA-W11-D-002 (exact-set comparisons in §6.4–§8.4 V-E rows; prescribed disposable `.ua-executed.json` cycle excluded by the net-zero restore proof)
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: EV-UA-W11-D-002 (SW-D03 set equality over the parent-pinned 3-file planned set is the failure detector)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: EV-UA-W11-D-002 (§8.3 two tests each call recordExecuted after its oracle; §9 G5 counts and digests; A4 §Enforcement 1–4 inherited)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: EV-UA-W11-D-002 (byte-pinned replacements and file content; any divergence changes the reviewed ending digests; accepted tests untouched)
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: EV-UA-W11-D-002 (leaf prohibited_actions + §4.6 proofs via V-E rows)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: EV-UA-W11-D-002 (§10 items 1, 6)
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: EV-UA-W11-D-002 + S2 `decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`, leaves `assigned_agent: UNASSIGNED`
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA-W11-D-002 (15/15 required fields per FILE block; 0 unresolved references)
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: EV-UA-W11-D-002 (§10 item 5)

## 12. Handoff templates

### 12.1 Leaf completion certificate (returned by each leaf agent)

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W11
subwindow_id: UA-W11-S001 | UA-W11-S002 | UA-W11-S003
assignment_id: ASG-UA-W11-01-S001 | ASG-UA-W11-01-S002 | ASG-UA-W11-01-S003
agent_identity: exact identity
writable_file: exact path from §6–§8
starting_file_digest: 833cb54c… | 4945bb59… | ABSENT
ending_file_digest: 1a903788… | 4cf7a1fc… | 40e317…
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
attributable_changed_file_set: [writable file only]
required_local_cases: [] | [] | [CASE-UA-W11-001, CASE-UA-W11-002]
registered_local_cases: same as required_local_cases
executed_local_cases: [] | [] | [CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W11-001, CASE-UA-W11-002] (V-D w11-only run; the 2 W1 IDs are registry re-executions via the import)
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 0 | 0 | 5
negative_controls_falsified: 0 | 0 | 5
commands: []
deferred_integration_checks: [UA-W11-I001 gates per §9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

### 12.2 Window-agent integration certificate (appended to `S3` by `UA-W11-I001`)

The §12.4 certificate of the sub-window standard, adapted: `integration_assessment_id: UA-W11-I001`;
`accepted_initial_subwindows` from leaf reviews; `expected_changed_file_set` = the three §4 planned
files; `required_case_count: 2` (window-local; the 43-ID registry equality is UA-W15-V5);
`registered_case_count: 2`; `executed_case_count: 2` window-local (plus 2 W1 + 25 predecessor IDs
re-executed in the full run); `required_case_set_digest: 21989bfcf384dcba25aefdc3821ee54e1fb3305538facc348a61e7b41a12460f`;
registered/executed digests computed with the §4.7 formula over the same IDs; post-G1 executed-set
digest `aa120e83587fd9792542c07dc606b0dcc50f66e8f8c45d3857ec8a0c162c671f`; `status:
READY_FOR_PARENT_REVIEW` only per the §9 PASS oracle.

### 12.3 Consolidated parent handoff

`frontend/review-evidence/uphunt-aesthetic/UA-W11_HANDOFF.md` per `A4` handoff template and
sub-window standard §12.5: objective; status `READY_FOR_PARENT_REVIEW` or one exact blocker;
changed-file set + starting/ending SHA-256s (including the preserved zero-edit `section-intro.tsx`
`159096f3…`, `traffic-globe.tsx` `7d9567b5…`, `lead-details.tsx` `9431f71b…`,
`lead-details-component.test.ts` `ca1d02c3…`, `uphunt-aesthetic-w10.test.ts` `0a2b34e6…`,
`results-table.tsx` `a4e1472f…`, `results-filters.tsx` `0ab118e4…`, `cumulative-traffic.tsx`
`7d37a3ae…`, `leads/page.tsx` `21a17799…`, `live-leads-workspace.tsx` `a646f657…`,
`run-workspace.tsx` `643c3568…`, `uphunt-aesthetic-w8.test.ts` `cab15f7f…`,
`uphunt-aesthetic-w9.test.ts` `baee1b2e…`, `landing-sections.tsx` `914c61e5…`,
`query-editor.tsx` `92efe1f7…`, `run-progress.tsx` `15d840bf…`, `runs/[runId]/page.tsx`
`719e05ea…`, `fixtures.ts` `9ea26525…`, `coverage` `f5137be4…`, and unchanged w2–w7
predecessors); CASE required/registered/executed/skipped/duplicate/unexpected (2/2/2/0/0/0
window-local; 2 additional registry IDs re-executed via import; full 43-set equality deferred to
UA-W15); required-set digest `0d14982c…` (registry) and W11-set digest `21989bfc…`; commands and
outcomes; browser-evidence file list under `frontend/review-evidence/uphunt-aesthetic/UA-W11/`
(4 PNGs, route `/design-fixture?scenario=completed`); sandbox recoveries; NC results;
forbidden-path negative search; `S1`/`S2`/`S3` paths and revisions; the tracked `.ua-executed.json`
residue disclosure (31-ID content, uncommitted); confirmation that `UA-W12` was not started; the
§0 S003 ending-digest reconciliation note.

## 13. Initial integration assessment `UA-W11-I001` (fully authored now)

```yaml
subwindow_id: UA-W11-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W11
parent_assignment_id: ASG-UA-W11-01
assigned_agent: WINDOW-AGENT (UA-W11-WINDOW-AGENT, personally executed, never delegated)
predecessors: [UA-W11-S001, UA-W11-S002, UA-W11-S003]
authorized_write_file: NONE (implementation files; coordination artifacts per §2 only)
input: assembled UA-W11 state after UA-W11-S003 is accepted
gates: §9 table G1–G9 (frozen)
pass_oracle: G1..G9 pass; G4 executed and recorded (browser_evidence true; the one frozen route /design-fixture?scenario=completed only)
correction_oracle: any behavioral gate failure -> §10 loop with UA-W11-C00n
parent_blocked_oracle: missing decision / contradiction / scope expansion (incl. §10 items 2–3)
execution_policy: E8.1 sandbox escalation + one identical recovery (§10 item 5)
may_start_successor: false
```

Accepted-subwindow and digest fields are filled from completed leaf evidence at run time; the gate
set above is frozen now (sub-window standard §9.1).

## 14. Self-falsification (sub-window standard §14)

Before declaring readiness the window agent verified the document rejects each applicable
counterexample (rejection mechanism in parentheses):

1. sub-window names two writable files (§6–§8 yaml `writable_file` single path; SW-E04 V-E exact-set proofs) — rejected.
2. sub-window names a directory/wildcard (canonical file paths only; SW-R03) — rejected.
3. a command creates an unplanned second workspace file (command lists enumerated; the only non-writable touch is the §8.4 V-D json cycle with prescribed net-zero restore) — rejected.
4. source and separate test files assigned together (two product leaves S001/S002 and one test leaf S003 are separate; SW-D09) — rejected.
5. a required parent file is absent from the decomposition (SW-D03 set equality over the three-file planned set; the zero-edit in-scope files are accounted for by parent consequence 2 with G6 pins) — rejected.
6. two initial sub-windows own the same file (S001–S003 files pairwise distinct; SW-D04) — rejected.
7. a dependent file begins before its interface is frozen (§5.1 ending digests and needles frozen before S003 dispatch; SW-D07) — rejected.
8. an intermediate state has an unexplained test failure (§4.1 table: no permitted check fails in any row; unexpected failures stop the sequence) — rejected.
9. a subagent starts its successor (`may_start_successor: false` in every block; H3; parent consequence 8) — rejected.
10. a subagent communicates directly with the parent (prohibited_actions; H2) — rejected.
11. the window agent repairs implementation during review (§10 item 6) — rejected.
12. an integration failure produces no diagnosed one-file correction (§10 items 1, 4) — rejected.
13. a correction silently rewrites a completed sub-window (§16 append-only amendments; §10 item 1) — rejected.
14. acceptance omits/skips/duplicates/filters/unactivates a required case (§9 G5 counts + digests; §8.4 V-D) — rejected.
15. an oracle is weakened to accommodate current behavior (byte-pinned replacements and file content; any divergence changes reviewed digests; SW-R06) — rejected.
16. a test substitute proves more parity than its fidelity supports (SUB-UA-001 inherited: source-text and compiled-render oracles; screenshots are local_e2e only; SW-V04) — rejected.
17. a costly gate is repeated without its scheduling rule (§9 gates scheduled at I001 only; DEF rows name the owner) — rejected.
18. a correction changes a file but dependent evidence is reused without proof (§10 item 4 rerun list) — rejected.
19. the assembled changed-file set differs from the planned set or exceeds parent scope (§9 G6 delta + forbidden-path search; SW-D03) — rejected.
20. the window agent claims parent acceptance or begins UA-W12 (§9 PASS oracle stops at READY_FOR_PARENT_REVIEW + A5 AWAITING_REVIEW; G9) — rejected.
21. an already-authorized local gate is escalated to the parent merely for sandbox privilege (§10 item 5 E8.1 policy) — rejected.
22. a changed command, observable failure, surviving process, or mutation is accepted as automatic sandbox recovery (§10 item 5 recovery preconditions) — rejected.
23. parallel leaves overlap dependencies/resources or the next wave starts early (no waves authorized; §4 single sequential order; parent consequence 1) — rejected.
24. reopen of the parent-frozen S003 digest `dcf22691…` as a decision (the §0 consequence is retained verbatim; only the mechanical digest reflects §7.3 formatting freedom, documented in §0) — rejected (kept the decision, reconciled the mechanical value).

## 15. Append-only amendment sections

Reserved for corrective sub-windows (`UA-W11-C001`, …) and further assessments (`UA-W11-I002`, …).
Each amendment repeats the §6–§8 block structure in full with a new ID, new baseline digest, cited
trigger evidence, and invalidated gates. Existing sections above are immutable after parent
approval.
