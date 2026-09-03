# UA-W9 frozen sub-window decomposition checklist (`S1`)

Subordinate artifact `S1` of parent window `UA-W9` under assignment `ASG-UA-W9-01`.
Companion artifacts: `S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_STATE_S2.yaml`
and `S3` `frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_EVIDENCE_S3.md`.
Inherited parent package: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`;
`A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`;
`A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

This file is frozen once the parent approves the decomposition. Corrections are appended
in §16 with new IDs; existing blocks are never rewritten.

## 0. Parent-frozen mechanical consequences (copied from `A6` `EV-UA-A-055`; not reopened)

The parent froze the following consequences in `A6` `EV-UA-A-055`
(`parent_frozen_mechanical_consequences`). They are copied here in substance and are
outside decomposition authority. They close otherwise-open S1 choices; they are uniquely
determined by DEC-UA-004, DEC-UA-015, DEC-UA-016, UA-W9-T1/T2/T3/T4,
CASE-UA-W9-001..004, and CHG-UA-0005:

1. FILE sub-window IDs start at `UA-W9-S001`. A zero-edit in-scope file gets no FILE
   sub-window and does not consume an S-number. Do not retire S001/S002 unused.
   Sequential DAG, no parallel waves: S001
   `frontend/components/lead-details.tsx` → S002 `frontend/app/globals.css` →
   S003 `frontend/test/lead-details-component.test.ts` → S004
   `frontend/test/uphunt-aesthetic-w9.test.ts` → `UA-W9-I001`.
2. Zero-edit preserved (G6 pins, no FILE leaf): `frontend/components/section-intro.tsx`
   `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175`;
   `frontend/components/results-table.tsx`
   `a4e1472fdc4129d20a61faa893d07694dba1528336cfabd257219833cd7d0b4f`;
   `frontend/components/results-filters.tsx`
   `0ab118e47349efb0c71e4facaf9bdd2844d8ea564f3c1fbf59afbc7e6e22b881`;
   `frontend/components/cumulative-traffic.tsx`
   `7d37a3ae2eb8e423a539f85330688bcc863a4e028525bce46222ac1cbbdb45aa`;
   `frontend/app/leads/page.tsx`
   `21a1779908a58267cd16749c2b5b86ec2e8105ea71a566fbce361aba392bea4b`;
   `frontend/components/leads/live-leads-workspace.tsx`
   `a646f6574cb325ac1ec324c2d26e6ba343a8d87c79b099b09e5ab0b684984c36`;
   `frontend/components/run-workspace.tsx`
   `643c3568bc7fd483cb15fcad3dfd545e74d179f6a495469b92796660c1b57cf3`;
   `frontend/test/uphunt-aesthetic-w8.test.ts`
   `cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0`;
   `frontend/components/traffic-enrichment.tsx`
   `833cb54c4b06034aa6e11a044d329c04710856e25e0ea189cc9a74655623be08`;
   `frontend/components/landing-sections.tsx`
   `914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15`;
   `frontend/components/query-editor.tsx`
   `92efe1f7319111f58a44e823f33a61bf705a654dbaa7539759d51bd71ece886c`;
   `frontend/components/run-progress.tsx`
   `15d840bfdb81892a5755dbe4f26d8ac9793fd2e02857568f7d9576a748518e38`;
   `frontend/app/runs/[runId]/page.tsx`
   `719e05ea0eec73fe948f0c41a9c56c970d6db61cfff0c990e59666136a069072`;
   `frontend/test/fixtures.ts`
   `9ea26525ed983b71063aad9e84ea492f2c85d0c95f80ba238b0a48352836c4b4`;
   `frontend/test/uphunt-aesthetic-coverage.test.ts`
   `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1`.
   Do not edit StoreEvidence/DiscoveryDetails bodies, the TrafficEnrichmentDetails call,
   Fact/TokenList conditions, RETRY N/A, `coreWebVitalRating`, `REQUIRED_CASE_IDS`, or
   parked SRC-UA-0092 files.
3. T1 JSX only, seven unique hunks, starting lead-details.tsx
   `0ceec9058af2c24d65c8ef880848b114674352a2c0593ec0a64914a0f9aefc5b`. Ending digest
   `cba5c0963353bf6be8d7c5d7cf104f8165ba52079df9f0c501e3c0248ad7dd81`. Numstat 17 5.
   Hunk 1 insert `import { SectionIntro } from "./section-intro";` immediately after
   `import { TrafficEnrichmentDetails } from "./traffic-enrichment";`. Hunk 2 replace the
   unique DetailSection function with the same function plus optional `eyebrow?: string`
   and `copy?: string`; when both are `!== undefined`, render
   `<SectionIntro eyebrow={eyebrow} title={title} copy={copy} />`, else keep
   `<h3><span>{order}</span>{title}</h3>`. Hunk 3 replace the unique OverviewPanel function
   with the same function plus optional `copy?: string`; keep `<h4>{title}</h4>` (do not
   retarget `> h4` CSS); when copy is set, render
   `<p className="detail-copy">{copy}</p>` immediately after the h4, then `{children}`.
   Hunk 4 replace unique
   `<OverviewPanel title="Score semantics" className="overview-score">` with
   `<OverviewPanel title="Strength" className="overview-score" copy="Why this lead sits where it does.">`.
   Hunk 5 replace unique
   `<OverviewPanel title="Store identity" className="overview-identity">` with
   `<OverviewPanel title="Identity" className="overview-identity" copy="The storefront StoreSignal resolved.">`.
   Hunk 6 replace unique
   `<OverviewPanel title="Outreach evidence" className="overview-outreach">` with
   `<OverviewPanel title="Reachability" className="overview-outreach" copy="A real way in, if one was found.">`.
   Hunk 7 replace unique
   `<DetailSection title="Lead overview" order="01" emphasis className="lead-overview">`
   with
   `<DetailSection title="Know the business behind this domain." order="01" emphasis className="lead-overview" eyebrow="01 · The store" copy="Score, identity, and the outreach paths that were actually recorded.">`.
   Keep order="01" emphasis className="lead-overview" OutcomeBadge and the overview grid.
   DEC-UA-004 Inner H3 Strength/Identity/Reachability is a copy recipe, not an h4→h3 tag
   change. 03 `Category and store fit` and 04 `Discovery provenance` stay on the h3 path
   (W10). Do not paraphrase or drop periods.
4. T2 CSS only, eight unique hunks, no new selectors. Starting globals.css
   `f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c`. Ending digest
   `6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d`. Numstat 9 9.
   Hunk 1 `.lead-details .detail-section {` `padding: 0.3125rem 0.375rem;` →
   `padding: var(--space-6) var(--space-5);`. Hunk 2 dense `.lead-details {`
   `gap: 0.25rem;` → `gap: var(--space-5);`. Hunk 3 `.lead-details .detail-section > h3`
   keep gap/margin, replace `font-size: 0.5rem;` with `font-size: 1.375rem;`. Hunk 4 delete
   the unique pair `.lead-overview .overview-identity .fact-grid { grid-template-columns: repeat(8, minmax(0, 1fr)); }`
   and `.lead-overview .overview-score .score-components { grid-template-columns: repeat(6, minmax(0, 1fr)); }`
   and replace with exactly `.lead-overview .overview-identity .fact-grid,` LF
   `.lead-overview .overview-score .score-components { grid-template-columns: repeat(3, minmax(0, 1fr)); }`.
   Hunk 5 dense `.lead-overview .fact-grid dt,` / `.version-note`
   `font-size: 0.4375rem;` → `font-size: 12px;`. Hunk 6 dense `.lead-overview .fact-grid dd,`
   / `.detail-copy` / `.detail-callout` / `.detail-score` `font-size: 0.5rem;` →
   `font-size: 14px;`. Hunk 7 non-dense `.lead-overview > h3 { padding-right: 112px; font-size: 10px;`
   retarget selector to `.lead-overview > .marketing-heading` (keep declarations). Hunk 8
   dense `.lead-overview > h3 { min-height: 1.25rem; padding-right: 7rem;` retarget selector
   to `.lead-overview > .marketing-heading` (keep declarations). Do not edit
   `.lead-expansion-shell`, W4–W8 owned selectors, tokens, `.auth-card`, store-fit/discovery/
   traffic dense rules, or the `@media (max-width: 980px)` identity/score `repeat(3)` block.
5. T4 only, three unique assertion lines in frontend/test/lead-details-component.test.ts,
   starting `8f7f611b3866b1cfd108ebb2acb0c06c8a06da74035ab4e5dd433a4fd8431412`. Ending digest
   `f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b`. Numstat 3 3. Replace
   `html.indexOf("Lead overview") < html.indexOf("Category and store fit")` with
   `html.indexOf("Know the business behind this domain.") < html.indexOf("Category and store fit")`;
   replace `html.indexOf("Score semantics") < html.indexOf("Store identity")` with
   `html.indexOf("Why this lead sits where it does.") < html.indexOf("The storefront StoreSignal resolved.")`;
   replace `html.indexOf("Store identity") < html.indexOf("Outreach evidence")` with
   `html.indexOf("The storefront StoreSignal resolved.") < html.indexOf("A real way in, if one was found.")`.
   No other edits in that file.
6. CREATE test/uphunt-aesthetic-w9.test.ts with exactly four tests
   CASE-UA-W9-001/002/003/004. Import recordExecuted from `./uphunt-aesthetic-coverage.test.ts`
   the same way as the w8 test file. Duplicate the compiledComponents helper from
   lead-details-component.test.ts (same tsc `files` list including results-table.tsx; do not
   otherwise edit that helper). 001: lead-details.tsx has
   `import { SectionIntro } from "./section-intro";`; denseLead render contains
   `01 · The store`, `Know the business behind this domain.`, and `Score, identity, and the
   outreach paths that were actually recorded.`. 002: globals.css owned
   `.lead-details .detail-section > h3 {` block contains `font-size: 1.375rem;` and does not
   contain `font-size: 0.5rem;`. 003: denseLead render contains `MyShopify domain`,
   `Resolved domain`, `hello@fixture.example`, `+12125550100`, and `detail-score`. 004:
   globals.css does not contain `.lead-overview .overview-identity .fact-grid { grid-template-columns: repeat(8`
   and does contain the Hunk 4 combined `repeat(3, minmax(0, 1fr))` rule. recordExecuted
   after assertions. No fifth test. No getExecuted vs REQUIRED_CASE_IDS full-set equality.
7. Last FILE leaf (S004) from ABSENT `test/.ua-executed.json` expects exactly 6 IDs (2 ×
   W1 re-executions + CASE-UA-W9-001/002/003/004), set digest
   `7254ec520303506a3aa8be3afd45143122f5e78552596be20681c6f1550390b8`. The 26-ID set
   {2 × W1} ∪ {4 × W2} ∪ {4 × W3} ∪ {2 × W4} ∪ {2 × W5} ∪ {3 × W6} ∪ {2 × W7} ∪ {3 × W8}
   ∪ {4 × W9} is asserted only at I001 G5 after `npm test`, digest
   `48c03081df64e9bc5fb69c29dbb65257b6364aa1c0a0fdd37bcf4c9185fb7fb7`. Do not require
   W2–W8 IDs at the w9-only test command. `test/.ua-executed.json` is TRACKED at HEAD
   (22-ID content `34f5b71a886352f13aac9287314187b14b62d85928e0ad5578d2c1197bd26385`,
   set digest `9da0dc92b33e9eec059c774d2591cd1a1120a77f70110c94312f57f0ec7904fd`); never
   commit it.
8. I001 G1 is DEC-UA-016: from `frontend/`, `npm test`. Expected 190 tests / 187 pass /
   3 fail (184 predecessor + 2 W1 re-executions from the w9 import + 4 W9 cases). PASS iff
   allocated UA CASE tests pass and every failing title, if any, is exactly the three named
   heading-oracle titles; process exit 1 is expected and is not G1 FAIL when that holds.
   G2 DEC-UA-014 needles are lead-details.tsx, lead-details-component.test.ts,
   uphunt-aesthetic-w9.test.ts (globals.css is not typechecked). G4 is frozen as route
   {`/design-fixture?scenario=completed`} at 390/768/1280/1440 only (4 screenshots, height
   900), with the first results row expanded so LeadDetails is visible. Local next may set
   `STORESIGNAL_DESIGN_FIXTURES=1`. Do not screenshot live `/runs/[runId]` (it polls). If
   the completed fixture cannot render LeadDetails without the same G-R1-style pre-hydration
   synthetic `.example` interception used on UA-W7/W8, that technique is permitted (no live
   run, no credentials); a fixture 404 without that recovery is PARENT_BLOCKED. Window-local
   case digest `73acdc6bf1c7d1258d64f93b8371f5a33b4fd1a2cf56762fc93e2d785ed06451`. Planned
   implementation set {`frontend/app/globals.css`, `frontend/components/lead-details.tsx`,
   `frontend/test/lead-details-component.test.ts`, `frontend/test/uphunt-aesthetic-w9.test.ts`},
   §4.7 digest `85f56b7b570f3f92bbafbfc55ba8ca9c1178ac23826f15daa39e7861a5adc04f`.
9. Do not start UA-W10. Do not edit section-intro.tsx, landing-sections.tsx, W8 product/test
   files, REQUIRED_CASE_IDS, parked files, or design-system-shell.test.ts. After parent
   accepts this decomposition, identity UA-W9-WINDOW-AGENT executes then personally reviews
   each FILE leaf in the same turn, then itself assigns the next S-number, then personally
   runs I001, then hands off (DEC-UA-015). This assignment does not execute S001. Per
   DEC-UA-015, this S1 §0 contains none of the phrases that decision forbids in assignment
   pastes and §0 freezes; the FILE-leaf sequence below is continuous with no parent gate
   between leaves and no halt before I001.

> §0 note on the JSX ending digest in consequence 3: the parent pinned
> `cba5c0963353bf6be8d7c5d7cf104f8165ba52079df9f0c501e3c0248ad7dd81` as the ending digest of
> lead-details.tsx. Consequences 3 hunks 2 and 3 ("replace the function with the same
> function plus …") are written behaviourally, not as byte fences, so sub-window standard
> §7.3 ("non-behavioral formatting freedom") applies to those two function bodies. The
> window agent froze deterministic byte fences for hunks 2 and 3 (§6.2, R2/R3) and verified
> by simulation that every string, order-of-render condition, and numstat (17 5) matches the
> consequence; the only difference from the parent's sample is comment/indentation-free
> whitespace in those two function bodies. The window-agent deterministic ending digest is
> therefore `5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c`, which this S1
> pins wherever a lead-details.tsx ending digest is computed (§6, §11 G6, §12.4). The
> four-case rendered oracles (CASE-UA-W9-001/003) and the three updated LDC title-order
> assertions are formatting-independent and were verified against these exact bytes. The
> parent's `cba5c096…` sample is retained verbatim in §0 as the frozen consequence (the
> transformation is unchanged; only the mechanical digest reflects the window agent's
> deterministic formatting, mirroring how the W8 S1 §1 note reconciles the §4.7 planned-set
> digest the parent recorded in unsorted document order).

## 1. Inherited authority and revision pins

| Pin | Value |
|---|---|
| Parent window | `UA-W9` |
| Parent assignment | `ASG-UA-W9-01` |
| Window agent | `UA-W9-WINDOW-AGENT` |
| Parent standard | `PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md` `cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848` |
| Sub-window standard | `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` `842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0` |
| Contract `A1` | `57fa49c7d9dc1390ef3517c28c73e55bc551bae581d7ea18d7f2e6ee67c54827` |
| Decision `A3` | `094bc8bf33dcce26479e2606b40e451f88b067906b8d21b4488e98481cf378b3` |
| Checklist `A4` | `75005e558cfc238d89839ee2af0e94b94b682dae7ff432a4762c0f4a63c9a7c0` |
| Active state `A5` (file digest) | `d23fccfe21c627dbd783d028f67682251732d4d964850d45bfe85a855ac577e8` (state_version 21, ASG-UA-W9-01, IN_PROGRESS) |
| Required coverage set (43 IDs, E6) | `0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05` (A4 §Coverage pin; asserted by CASE-UA-W1-002) |
| Window-local W9 case set (4 IDs, §4.7) | `73acdc6bf1c7d1258d64f93b8371f5a33b4fd1a2cf56762fc93e2d785ed06451` (parent consequence 8; window-agent §4.7 recompute MATCH) |
| Planned implementation set (4 paths, §4.7 digest) | `85f56b7b570f3f92bbafbfc55ba8ca9c1178ac23826f15daa39e7861a5adc04f` (window-agent §4.7 recompute; MATCHES parent consequence 8 — the parent already used §4.7 byte order) |
| Read-only `frontend/components/section-intro.tsx` | `159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175` (recomputed 2026-09-03; matches `EV-UA-A-055`) |
| Prededessor `frontend/test/uphunt-aesthetic-coverage.test.ts` | `f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1` (recomputed 2026-09-03; matches `EV-UA-A-055`) |
| Predecessor `frontend/test/uphunt-aesthetic-w8.test.ts` | `cab15f7fd3e65528d8ded657da2f8092f01107026ca4c80b48528a8e9200b8b0` (recomputed 2026-09-03; unchanged) |
| Predecessor `frontend/test/.ua-executed.json` | content `34f5b71a886352f13aac9287314187b14b62d85928e0ad5578d2c1197bd26385` (22 sorted IDs; TRACKED; never committed by this window); 22-ID set digest `9da0dc92b33e9eec059c774d2591cd1a1120a77f70110c94312f57f0ec7904fd` |
| Starting `frontend/components/lead-details.tsx` (S001 baseline) | `0ceec9058af2c24d65c8ef880848b114674352a2c0593ec0a64914a0f9aefc5b` (matches `EV-UA-A-055`) |
| Starting `frontend/app/globals.css` (S002 baseline) | `f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c` (matches `EV-UA-A-055`) |
| Starting `frontend/test/lead-details-component.test.ts` (S003 baseline) | `8f7f611b3866b1cfd108ebb2acb0c06c8a06da74035ab4e5dd433a4fd8431412` (matches `EV-UA-A-055`) |
| Starting `frontend/test/uphunt-aesthetic-w9.test.ts` (S004 baseline) | ABSENT (verified 2026-09-03) |
| `A5` authorized_windows | `[UA-W9]` |
| `A5` may_start_successor | `false` |
| Successor `UA-W10` | reserved for parent; NOT authorized (`A5` prohibited `start_UA-W10`) |

All pins recomputed 2026-09-03 by `UA-W9-WINDOW-AGENT` and matched byte-exact
(S3 `EV-UA-W9-D-001`). Root `ACTIVE_EXECUTION_STATE.md` is out of authority and
untouched (coordination root `git status --porcelain` clean, S3 `EV-UA-W9-D-001`).

## 2. Parent-window scope and exclusions (copied, no expansion)

From `A4` §UA-W9, `A4` F1, `A5` `authorized_write_scope`, and `A7` CHG-UA-0005:

- Objective: Lead overview, score, identity, outreach readable; remove dense type for owned
  selectors (`A4` §UA-W9). CHG-UA-0005 expanded the F1 write scope to include
  `frontend/test/lead-details-component.test.ts` (T4 title-order assertions), so the
  implementation write scope is four paths.
- Window implementation write scope (exactly four authorized paths):
  `frontend/components/lead-details.tsx`, `frontend/app/globals.css` (owned selectors
  only), `frontend/test/lead-details-component.test.ts` (three title-order assertion lines
  only), `frontend/test/uphunt-aesthetic-w9.test.ts`.
- Planned changed-file set (§4): exactly four files —
  `frontend/components/lead-details.tsx` (MODIFY),
  `frontend/app/globals.css` (MODIFY),
  `frontend/test/lead-details-component.test.ts` (MODIFY, three assertion lines only),
  `frontend/test/uphunt-aesthetic-w9.test.ts` (CREATE); §4.7 planned-set digest
  `85f56b7b570f3f92bbafbfc55ba8ca9c1178ac23826f15daa39e7861a5adc04f`.
  Fifteen in-scope files have zero required edits and get no FILE sub-window (parent
  consequence 1–2): `section-intro.tsx`, `results-table.tsx`, `results-filters.tsx`,
  `cumulative-traffic.tsx`, `leads/page.tsx`, `live-leads-workspace.tsx`,
  `run-workspace.tsx`, `uphunt-aesthetic-w8.test.ts`, `traffic-enrichment.tsx`,
  `landing-sections.tsx`, `query-editor.tsx`, `run-progress.tsx`,
  `runs/[runId]/page.tsx`, `fixtures.ts`, `uphunt-aesthetic-coverage.test.ts`.
  Required changed-file set = planned set (S3 `EV-UA-W9-D-002`).
- Shared-file scope for `frontend/app/globals.css` (`A4`): `.lead-details`, `.detail-section`,
  `.detail-section-emphasis`, `.lead-overview`, `.lead-overview-grid`, `.lead-overview-panel`,
  `.outcome-badge`, `.fact-grid`, `.outreach-channel-list`, `.contact-evidence-item`,
  `.detail-score`. Only the eight named hunks in parent consequence 4 are edited; every
  other declaration stays byte-identical.
- Shared symbols in `frontend/components/lead-details.tsx` (`A4`): `LeadOverview`,
  `ScoreDetails`, `IdentityDetails`, `ContactDetails`, `OutcomeBadge`, `DetailSection`.
  Do not edit `StoreEvidence`/`DiscoveryDetails` bodies, the `TrafficEnrichmentDetails`
  call, `Fact`/`TokenList`/`TokenDisclosure`/`EvidenceSource(s)`/`ContactEvidenceItem`,
  `coreWebVitalRating`, or the fields/conditions those components read.
- Read-only scope (window): `frontend/components/section-intro.tsx` (consumed export),
  `frontend/test/fixtures.ts` (denseLead/lead/trafficEnrichment), the W2–W8 product/test
  files, `REQUIRED_CASE_IDS`, parked SRC-UA-0092 files, `design-system-shell.test.ts`.
- Window-agent coordination writes (never implementation): `S1`, `S2`, `S3` (this
  decomposition), `A6` append-only, `A4` `UA-W9-P*`/`UA-W9-T*`/`UA-W9-V*`/`UA-W9-H*`
  checkboxes only, `frontend/review-evidence/uphunt-aesthetic/UA-W9_HANDOFF.md`,
  screenshots under `frontend/review-evidence/uphunt-aesthetic/UA-W9/` (headless chrome
  only, after the parent accepts this decomposition), and at handoff only
  `A5.current_status: AWAITING_REVIEW` (the sole authorized `A5` handoff action after I001
  PASS; `A5` is otherwise protected from every leaf).
- Authorized actions: `decompose_UA-W9_under_subwindow_standard`,
  `modify_lead_details_overview_only`, `modify_globals_css_owned_selectors_only`,
  `modify_lead_details_component_test_three_assertions_only`, `create_w9_test_file`,
  `run_frontend_unit_tests`, `run_frontend_npm_test`, `run_npx_tsc_noEmit`,
  `run_npm_run_lint`, `run_headless_chrome_browser_evidence` (I001 only),
  `check_UA-W9_boxes`, `append_A6_evidence`, `write_UA-W9_handoff`,
  `set_A5_AWAITING_REVIEW_on_handoff`; window-agent assessment and coordination writes
  above; sandbox escalation per the E8.1 policy in §11 item 5.
- Prohibited: `start_UA-W10`, `may_start_successor`,
  `execute_FILE_leaves_before_parent_accepts_decomposition`,
  `parent_assign_or_accept_FILE_leaf`, `stop_for_parent_between_FILE_leaves`,
  `treat_AWAITING_WINDOW_REVIEW_as_parent_stop`, `edit_StoreEvidence_or_DiscoveryDetails_bodies`,
  `edit_TrafficEnrichmentDetails_call_or_traffic_enrichment_tsx`, `edit_section_intro`,
  `edit_landing_sections`, `edit_results_table_tsx`, `edit_results_filters_tsx`,
  `edit_cumulative_traffic_tsx`, `edit_leads_page`, `edit_live_leads_workspace`,
  `edit_run_workspace`, `edit_query_editor`, `edit_run_progress`,
  `edit_unowned_globals_css_selectors`, `edit_lead_expansion_shell_or_W8_selectors`,
  `edit_app_page_header_or_W6_selectors`, `edit_intelligence_card_or_W5_selectors`,
  `edit_run_form_card_or_W4_selectors`, `edit_query_editor_or_progress_or_W7_selectors`,
  `edit_auth_card`, `edit_tokens`, `add_dependency`, `edit_REQUIRED_CASE_IDS`,
  `edit_uphunt-aesthetic-coverage_test`, `edit_uphunt-aesthetic-w1_w2_w3_w4_w5_w6_w7_w8_test_files`,
  `edit_lead_details_component_test_except_three_title_order_assertions`,
  `edit_parked_SRC-UA-0092_test_files`, `edit_design-system-shell_test`, `edit_fixtures_ts`,
  `aws`, `commit`, `push`, `production`, `paid_provider`, `edit_email_scraper`,
  `edit_root_ACTIVE_EXECUTION_STATE`, `edit_unowned_app_or_component_files`.
  `npm run build` is a UA-W15-only gate.
- `test/.ua-executed.json` is a TRACKED runtime-output path (owner commit residue). It is
  never a W9 deliverable and is never committed by this window; S004 may touch it only through
  the prescribed §9.4 V-D backup/run/restore procedure.

## 3. Starting working-tree inventory (recorded 2026-09-03, read-only)

Repository: `/home/harit/Email Scrapper/frontend` (git toplevel, HEAD `d5738df` "W8").
Coordination root `/home/harit/Email Scrapper` is a separate git repository and reported a
clean `git status --porcelain` (root `ACTIVE_EXECUTION_STATE.md` untouched; no
owner-controlled change would be overwritten).

Starting changed-file set (frontend repo, `git status --porcelain`, sorted):

1. ` M docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md` — CHG-UA-0005
   F1/T4 file-map expansion (authoring write by parent/requester).
2. ` M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml` — assignment fields
   written by parent for `ASG-UA-W9-01` (`EV-UA-A-055`); working-tree file digest
   `d23fccfe…` (state_version 21); PROTECTED (no leaf writes; only the handoff action
   `set_A5_AWAITING_REVIEW_on_handoff` may touch it later, never a leaf).
3. ` M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md` — append-only evidence
   (`EV-UA-A-055` is its tail); window-agent append-only; PROTECTED against leaf writes.
4. ` M docs/open-work/uphunt-aesthetic/A7_SPECIFICATION_CHANGELOG.md` — `CHG-UA-0005`
   (authoring write by parent/requester); PROTECTED against leaf writes.

Starting repository change set digest (§4.7 formula over the four paths above):
`7cc315a19557daedb6b025cc6185d810d08283c3d073c46f93f98408c390513e`.

Starting state of planned and preserved files (all recomputed 2026-09-03):

- `frontend/components/lead-details.tsx`: present, clean, digest `0ceec905…`. Anchors:
  the `TrafficEnrichmentDetails` import is line 18; `DetailSection` is lines 37–56;
  `OverviewPanel` is lines 58–73; `ContactDetails`' `OverviewPanel title="Outreach evidence"`
  is line 174; `ScoreDetails`' `OverviewPanel title="Score semantics"` is line 327;
  `IdentityDetails`' `OverviewPanel title="Store identity"` is line 347;
  `LeadOverview`' `DetailSection title="Lead overview"` is line 369.
- `frontend/app/globals.css`: present, clean, digest `f1a7e45a…`. Anchors:
  `.lead-overview > h3` (non-dense, `padding-right: 112px`) is lines 2512–2515;
  `.lead-details { gap: 0.25rem; }` is line 7521;
  `.lead-details .detail-section { padding: 0.3125rem 0.375rem; }` is line 7530;
  `.lead-details .detail-section > h3 { font-size: 0.5rem; }` is lines 7538–7542;
  `.lead-overview > h3` (dense, `min-height: 1.25rem`) is lines 7554–7557;
  `.lead-overview .overview-identity .fact-grid { repeat(8…) }` is line 7594;
  `.lead-overview .overview-score .score-components { repeat(6…) }` is line 7595;
  `.lead-overview .fact-grid dt,` / `.version-note { font-size: 0.4375rem; }` is 7670–7673;
  `.lead-overview .fact-grid dd,` / `.detail-copy` / `.detail-callout` / `.detail-score
  { font-size: 0.5rem; }` is 7675–7680. The `@media (max-width: 980px)` identity/score
  `repeat(3)` block is lines 8013–8016 and is untouched.
- `frontend/test/lead-details-component.test.ts`: present, clean, digest `8f7f611b…`.
  Anchors: the three title-order assertions are lines 95–97 inside the
  `actual expanded details render every full-evidence family and every contact channel`
  test (lines 92–125); `compiledComponents` helper is lines 42–90.
- `frontend/test/uphunt-aesthetic-w9.test.ts`: ABSENT.
- `frontend/components/section-intro.tsx` (read-only): digest `159096f3…`; exports
  `SectionIntro({ eyebrow, title, copy, inverse = false })` rendering `div.marketing-heading`
  with `span.eyebrow` (when eyebrow defined), `h2` title, `p` copy (when copy defined).
- Zero-edit in-scope/read-only files (parent consequence 2): `components/section-intro.tsx`
  `159096f3…`, `components/results-table.tsx` `a4e1472f…`, `components/results-filters.tsx`
  `0ab118e4…`, `components/cumulative-traffic.tsx` `7d37a3ae…`, `app/leads/page.tsx`
  `21a17799…`, `components/leads/live-leads-workspace.tsx` `a646f657…`,
  `components/run-workspace.tsx` `643c3568…`, `test/uphunt-aesthetic-w8.test.ts`
  `cab15f7f…`, `components/traffic-enrichment.tsx` `833cb54c…`,
  `components/landing-sections.tsx` `914c61e5…`, `components/query-editor.tsx` `92efe1f7…`,
  `components/run-progress.tsx` `15d840bf…`, `app/runs/[runId]/page.tsx` `719e05ea…`,
  `test/fixtures.ts` `9ea26525…`, `test/uphunt-aesthetic-coverage.test.ts` `f5137be4…`.
- Predecessor and protected files: `test/uphunt-aesthetic-w2.test.ts` `f65ba0c5…`,
  `test/uphunt-aesthetic-w3.test.ts` `635e2802…`, `test/uphunt-aesthetic-w4.test.ts`
  `8008501d…`, `test/uphunt-aesthetic-w5.test.ts` `ee6425e9…`,
  `test/uphunt-aesthetic-w6.test.ts` `f78b8da2…`, `test/uphunt-aesthetic-w7.test.ts`
  `92201c35…`; `frontend/test/.ua-executed.json` present, clean, TRACKED, content digest
  `34f5b71a886352f13aac9287314187b14b62d85928e0ad5578d2c1197bd26385`, content = exactly 22
  sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3} ∪ {2 × CASE-UA-W4} ∪
  {2 × CASE-UA-W5} ∪ {3 × CASE-UA-W6} ∪ {2 × CASE-UA-W7} ∪ {3 × CASE-UA-W8} (owner commit
  residue; DEC-UA-011 runtime output; never committed by W9); `review-evidence/uphunt-aesthetic/UA-W9/`
  ABSENT.

Environment: node `v24.14.1`; `frontend/package.json` `test` =
`node --experimental-strip-types --test test/*.test.ts`, `lint` = `eslint`;
`tsconfig.json` `incremental: true`, `allowImportingTsExtensions: true`, `strict: true`,
`paths: {"@/*": ["./*"]}`; I001 tsc runs with `--incremental false --pretty false` so no
tsbuildinfo is written. `/usr/bin/google-chrome` exists (P3; I001 G4 only). `/tmp/opencode`
exists as the prescribed disposable location for leaf V-D backup/restore, the S004 dry-run
validation, and negative probes.

## 4. Initial single-file dependency DAG and intermediate-state contracts

```text
UA-W9-S001 (FILE, modify frontend/components/lead-details.tsx) ─┐
UA-W9-S002 (FILE, modify frontend/app/globals.css)             ─┼─> UA-W9-S004 ─> UA-W9-I001
UA-W9-S003 (FILE, modify frontend/test/lead-details-component.test.ts) ─┘  (FILE, create   (INTEGRATION_ASSESSMENT)
                                                                             test/uphunt-aesthetic-w9.test.ts)
```

Sequential execution order (parent consequence 1 freezes the DAG and prohibits parallel
waves; default one-active-leaf lifecycle): S001, S002, S003, S004, I001. IDs S001–S004 are
used exactly as named by the parent; no zero-edit in-scope file consumes an S-number.

- Edges S001→S002→S003→S004: parent-frozen sequencing (consequences 1 and 9), not a data
  dependency; the four files are mutually independent and are executed one at a time because
  the parent authorizes exactly one active leaf and requires same-identity review between
  leaves.
- Edge S004→(S001–S003): CASE-UA-W9-001/002/003/004 (in S004) read the post-S001/S002/S003
  file states; the test file must be authored and executed against the post-leaf file states,
  otherwise its oracles are false before the work exists.
- Edge S004→I001: whole-window gates require all four planned files assembled.
- No planned file consumes any interface produced inside this window except the §5.1 frozen
  states; the only consumed cross-file interfaces are predecessor outputs, the read-only
  `SectionIntro` export, the read-only `fixtures.ts` `denseLead`/`lead`/`trafficEnrichment`,
  and the post-S001/S002/S003 file states.

### 4.1 Intermediate-state contracts

| After | Permitted checks | Expected temporary state | Why safe | Resolved by | Prohibited while pending |
|---|---|---|---|---|---|
| S001 accepted | S001 §6.4 only | lead-details.tsx renders `<SectionIntro>` for the overview DetailSection and the three OverviewPanel copy `p.detail-copy` nodes; w9 test file still ABSENT so `npm test` would still report 184/181/3; the LDC `actual expanded details` test is not yet re-pinned so it would fail on the two `indexOf` orderings that compare two removed strings (the `-1 < -1` case); no permitted leaf check fails in this state | local workspace only; no deployment or external surface; no CASE test runs at leaf level (`npm test` prohibited at leaves) | S003 re-pins the three assertions | editing any other planned file, `section-intro.tsx`, a preserved file, or a zero-edit in-scope file; running `npm test`; successor work |
| S002 accepted | S002 §7.4 only | globals.css has the eight hunks applied; `.lead-expansion-shell`, W4–W8 selectors, tokens, `.auth-card`, store-fit/discovery/traffic dense rules, and the `@media` `repeat(3)` block untouched; same pending-test state as above | same as above | S004 (asserts the owned `.detail-section > h3` block and the combined `repeat(3)` rule) | any second-file edit; running `npm test`; successor work |
| S003 accepted | S003 §8.4 only | lead-details-component.test.ts title-order assertions re-pinned to the DEC-UA-004 strings; that file passes standalone; same pending-test state for the whole suite | same as above | S004 | any second-file edit; running `npm test`; successor work |
| S004 accepted | S004 §9.4 only; whole-window gates remain PENDING | w9-only run executed from ABSENT-json state produced exactly 6 IDs then restored; `.ua-executed.json` byte-identical to HEAD (`34f5b71a…`); repo delta = the four planned files only | test file is not imported by app code; runtime json restored per §9.4 V-D | I001 | any additional-file edit; committing `.ua-executed.json`; successor work |

Unexpected failures at any row stop the sequence for diagnosis (no silent progression). No
permitted intermediate check is expected to fail.

## 5. Exact allocation of requirements, decisions, interfaces, and coverage cases

Parent trace for `UA-W9` (all IDs from `A1`/`A3`/`A4`):

| Parent ID | Allocated to | Terminal anchor |
|---|---|---|
| UA-W9 objective (`SCN-UA-003`, `INV-UA-004`, `INV-UA-005`) | `UA-W9-S001` §6.2 + `UA-W9-S002` §7.2 + `UA-W9-S003` §8.2 + `UA-W9-S004` §9.3 | `<SectionIntro>` with DEC-UA-004 strings; `font-size: 1.375rem;`/`12px`/`14px`/`repeat(3)` hunks |
| UA-W9-T1 | `UA-W9-S001` §6.2 | lead-details.tsx ending digest `5f32de7f…` (window-agent §7.3 bytes; §0 note); seven hunks; numstat 17 5 |
| UA-W9-T2 | `UA-W9-S002` §7.2 | globals.css ending digest `6e57268a…`; numstat 9 9 |
| UA-W9-T3 | `UA-W9-S004` §9.3 | four tests, CASE-UA-W9-001/002/003/004; denseLead render pins |
| UA-W9-T4 | `UA-W9-S003` §8.2 | lead-details-component.test.ts ending digest `f8f7323c…`; three assertion lines; numstat 3 3 |
| CASE-UA-W9-001 (`SCN-UA-003`, `REQ-UA-004`) | `UA-W9-S004` test 1 | lead-details.tsx `import { SectionIntro } from "./section-intro";`; denseLead render `01 · The store`, `Know the business behind this domain.`, `Score, identity, and the outreach paths that were actually recorded.` |
| CASE-UA-W9-002 (`REQ-UA-004`) | `UA-W9-S004` test 2 | owned `.lead-details .detail-section > h3 {` block contains `font-size: 1.375rem;` and not `font-size: 0.5rem;` |
| CASE-UA-W9-003 (`SCN-UA-003`, `INV-UA-004`) | `UA-W9-S004` test 3 | denseLead render `MyShopify domain`, `Resolved domain`, `hello@fixture.example`, `+12125550100`, `detail-score` |
| CASE-UA-W9-004 (`REQ-UA-004`, `DEC-UA-004`) | `UA-W9-S004` test 4 | globals.css lacks `repeat(8…)` leaf rule and contains the combined `repeat(3, minmax(0, 1fr))` rule |
| NC-UA-003 family + read-only pins | S004 §9.4 V-C + `UA-W9-I001` G8 | removing a DEC-UA-004 string, an eyebrow, the `detail-score`/field, the `repeat(8)` leaf, or reintroducing `font-size: 0.5rem;` falsifies the corresponding oracle |
| DEC-UA-002 | S001 import of the frozen `SectionIntro` export | `import { SectionIntro } from "./section-intro";`; `section-intro.tsx` read-only `159096f3…` |
| DEC-UA-004 | exact strings in S001/S003; oracles in S004 | JSX text nodes match including periods and the `·` middle dot; no paraphrase |
| DEC-UA-006 | §2 prohibited paths; I001 G6 forbidden-path search | 0 hits |
| DEC-UA-011 | S004 `recordExecuted` import + call-after-witness ordering; `.ua-executed.json` handling | four `recordExecuted` calls, each after its oracle; json never committed |
| DEC-UA-013 | leaf preflights P1/P2 | git status before/after (frontend + coordination root) |
| DEC-UA-014 | `UA-W9-I001` gate G2 | zero tsc diagnostic lines on the owned-path needles |
| DEC-UA-015 | same-identity execute-then-review; window agent assigns next S-number; §0 freeze | no parent leaf gates; no halt at AWAITING_WINDOW_REVIEW |
| DEC-UA-016 | `UA-W9-I001` gate G1 | 190/187/3; failing titles ⊆ heading-oracle set |
| UA-W9-P1..P4, UA-W9-V1..V5, UA-W9-H1..H6 | `UA-W9-I001` / handoff | `A4` UA-W9 lifecycle boxes checked with evidence at I001 |

The remaining 39 coverage CASE IDs belong to other/later windows per the
`test_registration` column of `A4` §Coverage. Window-required local case set =
{CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004}, §4.7 set digest
`73acdc6bf1c7d1258d64f93b8371f5a33b4fd1a2cf56762fc93e2d785ed06451` (matches the parent pin in
`EV-UA-A-055` consequence 8).

### 5.1 Frozen cross-file interfaces (inherited and produced)

- `SectionIntro` consumed export (frozen by DEC-UA-002, file pinned `159096f3…`):
  `import { SectionIntro } from "./section-intro";` with props
  `{ eyebrow?: ReactNode; title: ReactNode; copy?: ReactNode; inverse?: boolean }`;
  renders `div.marketing-heading` (optionally `is-inverse`) containing `span.eyebrow`, `h2`,
  `p`. S001 consumes exactly this export; no leaf may edit the component.
- `recordExecuted(id: string): void` — produced by `UA-W1-T1`, pinned at file digest
  `f5137be4…`. S004 imports it from `./uphunt-aesthetic-coverage.test.ts` and calls it
  exactly once per test, after that test's assertions. `REQUIRED_CASE_IDS` already contains
  the four W9 IDs (`CASE-UA-W9-001/002/003/004`); it is never edited here.
- `denseLead`, `lead`, `trafficEnrichment` — produced by `UA-W1`'s fixtures, pinned at
  `9ea26525…`. S004 imports `denseLead` (and `lead`/`trafficEnrichment` for the duplicated
  `Components` type of the `compiledComponents` helper); no leaf may edit fixtures.ts.
- `compiledComponents()` helper — duplicated from lead-details-component.test.ts (lines
  42–90) with the SAME tsc `files` list (lead-details.tsx + results-table.tsx). It is the
  mechanism CASE-UA-W9-001/003 use to render `denseLead()`. It is reproduced byte-identically
  except for the module that declares it; no behavior is otherwise edited.
- Read-only needles consumed by S004 (byte-exact; occurrence counts verified by inspection,
  S3 `EV-UA-W9-D-002`):
  - `import { SectionIntro } from "./section-intro";` in lead-details.tsx
  - `.lead-details .detail-section > h3 {` block in globals.css
  - `.lead-overview .overview-identity .fact-grid { grid-template-columns: repeat(8, minmax(0, 1fr)); }` leaf (must be absent)
  - `.lead-overview .overview-identity .fact-grid,\n.lead-overview .overview-score .score-components { grid-template-columns: repeat(3, minmax(0, 1fr)); }` (must be present)
  - `MyShopify domain`, `Resolved domain`, `hello@fixture.example`, `+12125550100`,
    `detail-score` in the denseLead render
- Ending digests produced by the leaves and consumed by S004/I001 (deterministic simulations
  from the §3 starting digests, S3 `EV-UA-W9-D-002`):
  - S001 `frontend/components/lead-details.tsx` →
    `5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c`
    (window-agent §7.3 deterministic bytes; parent sample `cba5c096…`, see §0 note)
  - S002 `frontend/app/globals.css` →
    `6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d`
    (matches parent consequence 4 pin)
  - S003 `frontend/test/lead-details-component.test.ts` →
    `f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b`
    (matches parent consequence 5 pin)
  - S004 `frontend/test/uphunt-aesthetic-w9.test.ts` →
    `baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31`
    (exact §9.3 bytes, dry-run validated)

## 6. Initial implementation sub-window `UA-W9-S001`

```yaml
subwindow_id: UA-W9-S001
type: FILE
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
assigned_agent: UNASSIGNED
predecessors: []
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/components/lead-details.tsx
file_operation: MODIFY
starting_file_digest: 0ceec9058af2c24d65c8ef880848b114674352a2c0593ec0a64914a0f9aefc5b
starting_repository_change_set_digest: 7cc315a19557daedb6b025cc6185d810d08283c3d073c46f93f98408c390513e
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W9)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §6)
  - frontend/components/section-intro.tsx (consumed export, pinned 159096f3…)
  - frontend/components/lead-details.tsx (own file)
authorized_actions:
  - apply_the_seven_ordered_hunks_of_section_6.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_DetailSection_03_or_04_DetailSection_call_sites_or_the_h4_title_rendering
  - edit_StoreEvidence_or_DiscoveryDetails_bodies
  - edit_the_TrafficEnrichmentDetails_call_or_TrafficEnrichmentDetails_import
  - edit_Fact_TokenList_TokenDisclosure_EvidenceSource_EvidenceSources_ContactEvidenceItem
  - edit_OutcomeBadge_or_the_lead_overview_grid
  - edit_the_OverviewPanel_h4_or_retarget_any_h4_css
  - edit_section_intro_tsx_or_any_preserved_or_zero_edit_file
  - edit_globals_css_lead_details_component_test_or_the_w9_test_file
  - paraphrase_any_DEC-UA-004_string_or_drop_a_period_or_the_middle_dot
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W9-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W10
may_start_successor: false
```

### 6.1 Mechanical trace

UA-W9-T1; UA-W9 objective (`SCN-UA-003`); DEC-UA-002; DEC-UA-004 (overview/score/identity/
reachability strings); DEC-UA-013 (preflight); parent consequences 2, 3, and 9. Terminal
anchor: the §6.2 seven hunks; ending digest pin `5f32de7f…`. Every requirement allocated here
terminates in a file anchor verified by §6.4 checks and by S004's CASE-UA-W9-001/003 oracles.

### 6.2 Exact file transformation (seven ordered hunks; each OLD anchor count == 1)

Apply in this order. Each OLD string/block occurs exactly once in the starting file
(verified by simulation, S3 `EV-UA-W9-D-002`); if any count differs, STOP and report — do not
improvise.

**H1 — import** (line 18 region). The new import joins the `./` group directly after the
`TrafficEnrichmentDetails` import:

OLD:
```tsx
import { TrafficEnrichmentDetails } from "./traffic-enrichment";
```
NEW:
```tsx
import { TrafficEnrichmentDetails } from "./traffic-enrichment";
import { SectionIntro } from "./section-intro";
```

**H2 — DetailSection function** (lines 37–56). Replace the whole function block:

OLD:
```tsx
function DetailSection({
  title,
  order,
  emphasis = false,
  className,
  children,
}: {
  title: string;
  order: string;
  emphasis?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`detail-section${emphasis ? " detail-section-emphasis" : ""}${className ? ` ${className}` : ""}`}>
      <h3><span>{order}</span>{title}</h3>
      {children}
    </section>
  );
}
```
NEW:
```tsx
function DetailSection({
  title,
  order,
  emphasis = false,
  eyebrow,
  copy,
  className,
  children,
}: {
  title: string;
  order: string;
  emphasis?: boolean;
  eyebrow?: string;
  copy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`detail-section${emphasis ? " detail-section-emphasis" : ""}${className ? ` ${className}` : ""}`}>
      {eyebrow !== undefined && copy !== undefined ? (
        <SectionIntro eyebrow={eyebrow} title={title} copy={copy} />
      ) : (
        <h3><span>{order}</span>{title}</h3>
      )}
      {children}
    </section>
  );
}
```

**H3 — OverviewPanel function** (lines 58–73). Replace the whole function block:

OLD:
```tsx
function OverviewPanel({
  title,
  className,
  children,
}: {
  title: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`lead-overview-panel ${className}`}>
      <h4>{title}</h4>
      {children}
    </section>
  );
}
```
NEW:
```tsx
function OverviewPanel({
  title,
  className,
  copy,
  children,
}: {
  title: string;
  className: string;
  copy?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`lead-overview-panel ${className}`}>
      <h4>{title}</h4>
      {copy !== undefined && <p className="detail-copy">{copy}</p>}
      {children}
    </section>
  );
}
```

**H4** (line 327):
OLD:
```tsx
    <OverviewPanel title="Score semantics" className="overview-score">
```
NEW:
```tsx
    <OverviewPanel title="Strength" className="overview-score" copy="Why this lead sits where it does.">
```

**H5** (line 347):
OLD:
```tsx
    <OverviewPanel title="Store identity" className="overview-identity">
```
NEW:
```tsx
    <OverviewPanel title="Identity" className="overview-identity" copy="The storefront StoreSignal resolved.">
```

**H6** (line 174):
OLD:
```tsx
    <OverviewPanel title="Outreach evidence" className="overview-outreach">
```
NEW:
```tsx
    <OverviewPanel title="Reachability" className="overview-outreach" copy="A real way in, if one was found.">
```

**H7** (line 369):
OLD:
```tsx
    <DetailSection title="Lead overview" order="01" emphasis className="lead-overview">
```
NEW:
```tsx
    <DetailSection title="Know the business behind this domain." order="01" emphasis className="lead-overview" eyebrow="01 · The store" copy="Score, identity, and the outreach paths that were actually recorded.">
```

Operation ordering: single atomic file write after all seven hunks are prepared; no
intermediate partial state is saved. Obsolete behavior removed from this file: the three
h4-title strings `Score semantics` / `Store identity` / `Outreach evidence`, the DetailSection
`<h3>`-only render for the overview (now SectionIntro), and the `Lead overview` DetailSection
title. Resulting numstat is exactly `17 5` (simulated, S3 `EV-UA-W9-D-002`).

### 6.3 Preserved behavior and forbidden edits (within the writable file)

- All imports except the inserted SectionIntro line, `ExternalDetailLink`, `Fact`,
  `TokenList`, `TokenDisclosure`, `EvidenceSource`, `EvidenceSources`, `ContactEvidenceItem`,
  `ContactDetails`, `StoreFitPage`, `StoreFitItem`, `CategoryList`, `StoreEvidence`,
  `ScoreDetails` (score components/fact-grid/`detail-score`/`version-note`),
  `IdentityDetails` (identity fact-grid/`detail-links`/Resolved storefront), `LeadOverview`
  (OutcomeBadge + `lead-overview-grid`), `OutcomeBadge`, `OccurrenceList`, `DiscoveryDetails`,
  `LeadDetails` — byte-identical.
- `DetailSection` 03 (`Category and store fit`) and 04 (`Discovery provenance`) call sites and
  the `TrafficEnrichmentDetails` call — byte-identical (they pass no eyebrow/copy, so they keep
  the h3 path).
- The `OverviewPanel` `h4` render (`<h4>{title}</h4>`) is unchanged; no CSS `> h4` selector is
  retargeted.
- The DEC-UA-004 strings must include their trailing periods exactly and the eyebrow
  `01 · The store` must use the exact middle dot `·`; no paraphrase, no case change.
- Do not edit `StoreEvidence`/`DiscoveryDetails` bodies, `Fact`/`TokenList`/`TokenDisclosure`
  conditions, `coreWebVitalRating`, or the identity/score/outreach field sets.

### 6.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: `git status --porcelain` in frontend/ and coordination root; `sha256sum components/lead-details.tsx` | frontend porcelain contains exactly the four §3 protected ` M` paths, the three `??` window-agent coordination artifacts (S1/S2/S3, in the A5 authorized_write_scope, untracked), and no other tracked modification; coordination root clean; digest == `0ceec905…` |
| V-B | Apply §6.2 hunks with exact-match tooling (each OLD count == 1 before replacing) | 7 hunks applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- components/lead-details.tsx` and full `git diff` inspection | numstat == `17  5`; the diff contains exactly the §6.2 H1–H7 changes and no other hunk |
| V-D | Read-only node inspection of the file, asserting post-state: `import { SectionIntro } from "./section-intro";` == 1; `eyebrow?: string;` == 1; `copy?: string;` == 2; `<SectionIntro eyebrow={eyebrow} title={title} copy={copy} />` == 1; `Why this lead sits where it does.` == 1; `The storefront StoreSignal resolved.` == 1; `A real way in, if one was found.` == 1; `title="Know the business behind this domain."` == 1; `eyebrow="01 · The store"` == 1; `<p className="detail-copy">{copy}</p>` == 1; `<h4>{title}</h4>` == 1 (the OverviewPanel template); `title="Strength"` == 1; `title="Identity"` == 1; `title="Reachability"` == 1 | every assertion true |
| V-E | `sha256sum components/lead-details.tsx`; `git status --porcelain` | ending digest == `5f32de7fd097023439272b777e4a685ee240d117d327c52eb5143d78b5e1375c`; attributable delta == ` M components/lead-details.tsx` exactly (the four §3 protected paths unchanged); no other path |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W9-I001` G1–G9) |

> §6.4 V-D note: `<h4>{title}</h4>` is asserted once in the `OverviewPanel` function template
> and the three OverviewPanel callsites are checked by their `title="Strength"`/`title="Identity"`/
> `title="Reachability"` strings (each == 1); the other OverviewPanel callsite is ContactDetails'
> Reachability, so the three OverviewPanel callsites total Strength, Identity, Reachability.

Negative controls: none at this leaf — the ending-digest pin (V-E) mechanically falsifies any
deviation, and the copy/import/field falsification probes are assigned at the narrowest
effective level in S004 §9.4 V-C and I001 G8.

Expected workspace write set: exactly `{frontend/components/lead-details.tsx}`.

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
cases execute in S004.)

## 7. Initial implementation sub-window `UA-W9-S002`

```yaml
subwindow_id: UA-W9-S002
type: FILE
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
assigned_agent: UNASSIGNED
predecessors: [UA-W9-S001]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/app/globals.css
file_operation: MODIFY
starting_file_digest: f1a7e45a61d27fd635910d2cc594ba9711609474d7238690b9fc2b34ca00e10c
starting_repository_change_set_digest: 7cc315a19557daedb6b025cc6185d810d08283c3d073c46f93f98408c390513e
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W9)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §7)
  - frontend/app/globals.css (own file)
authorized_actions:
  - apply_the_eight_ordered_hunks_of_section_7.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
prohibited_actions:
  - edit_any_other_workspace_file
  - add_a_new_selector_or_change_any_selector_name_except_the_two_lead_overview_gt_h3_retargets
  - edit_lead_expansion_shell_or_any_W8_selector
  - edit_run_form_card_or_W4_selectors
  - edit_intelligence_card_or_W5_selectors
  - edit_app_page_header_or_W6_selectors
  - edit_query_editor_progress_or_W7_selectors
  - edit_auth_card
  - edit_tokens_or_variables_or_color_mix
  - edit_the_media_max_width_980px_identity_score_repeat_3_block
  - edit_store_fit_discovery_or_traffic_dense_rules
  - edit_section_intro_tsx_or_any_preserved_or_zero_edit_file
  - run_npm_test_or_npx_tsc_or_npm_run_lint (deferred to UA-W9-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W10
may_start_successor: false
```

### 7.1 Mechanical trace

UA-W9-T2; UA-W9 objective (`SCN-UA-003`); DEC-UA-004 (dense type floor, fact-grid max 3);
DEC-UA-013; parent consequences 2, 4, and 9. Predecessors: S001 (parent-frozen sequencing,
§4). Terminal anchor: the §7.2 eight hunks; ending digest pin `6e57268a…` (parent consequence 4).

### 7.2 Exact file transformation (eight ordered hunks; each OLD fence uniquely identified)

Apply in this order. Each OLD fence must match exactly once (the fences below are
selector-inclusive so they are unambiguous even though `padding: 0.3125rem 0.375rem;`,
`gap: 0.25rem;`, and `font-size: 0.5rem;` each appear more than once in the file).

**H1** (line 7530) `.lead-details .detail-section {`:
OLD:
```
.lead-details .detail-section {
  padding: 0.3125rem 0.375rem;
```
NEW:
```
.lead-details .detail-section {
  padding: var(--space-6) var(--space-5);
```

**H2** (line 7521) dense `.lead-details {`:
OLD:
```
.lead-details {
  gap: 0.25rem;
  padding: 0.25rem;
```
NEW:
```
.lead-details {
  gap: var(--space-5);
  padding: 0.25rem;
```

**H3** (lines 7538–7542) `.lead-details .detail-section > h3`:
OLD:
```
.lead-details .detail-section > h3 {
  gap: 0.375rem;
  margin-bottom: 0.125rem;
  font-size: 0.5rem;
}
```
NEW:
```
.lead-details .detail-section > h3 {
  gap: 0.375rem;
  margin-bottom: 0.125rem;
  font-size: 1.375rem;
}
```

**H4** (lines 7594–7595) the unique identity/score pair → combined `repeat(3)`:
OLD:
```
.lead-overview .overview-identity .fact-grid { grid-template-columns: repeat(8, minmax(0, 1fr)); }
.lead-overview .overview-score .score-components { grid-template-columns: repeat(6, minmax(0, 1fr)); }
```
NEW:
```
.lead-overview .overview-identity .fact-grid,
.lead-overview .overview-score .score-components { grid-template-columns: repeat(3, minmax(0, 1fr)); }
```

**H5** (lines 7670–7673) `.lead-overview .fact-grid dt,` / `.version-note`:
OLD:
```
.lead-overview .fact-grid dt,
.lead-overview .version-note {
  font-size: 0.4375rem;
}
```
NEW:
```
.lead-overview .fact-grid dt,
.lead-overview .version-note {
  font-size: 12px;
}
```

**H6** (lines 7675–7680) `.lead-overview .fact-grid dd,` / `.detail-copy` / `.detail-callout`
/ `.detail-score`:
OLD:
```
.lead-overview .fact-grid dd,
.lead-overview .detail-copy,
.lead-overview .detail-callout,
.lead-overview .detail-score {
  font-size: 0.5rem;
}
```
NEW:
```
.lead-overview .fact-grid dd,
.lead-overview .detail-copy,
.lead-overview .detail-callout,
.lead-overview .detail-score {
  font-size: 14px;
}
```

**H7** (lines 2512–2515) non-dense `.lead-overview > h3` retarget; keep declarations:
OLD:
```
.lead-overview > h3 {
  padding-right: 112px;
  font-size: 10px;
}
```
NEW:
```
.lead-overview > .marketing-heading {
  padding-right: 112px;
  font-size: 10px;
}
```

**H8** (lines 7554–7557) dense `.lead-overview > h3` retarget; keep declarations:
OLD:
```
.lead-overview > h3 {
  min-height: 1.25rem;
  padding-right: 7rem;
}
```
NEW:
```
.lead-overview > .marketing-heading {
  min-height: 1.25rem;
  padding-right: 7rem;
}
```

Operation ordering: single atomic file write after all eight hunks are prepared. Resulting
numstat is exactly `9 9` (simulated, S3 `EV-UA-W9-D-002`; matches parent consequence 4).

### 7.3 Preserved behavior and forbidden edits (within the writable file)

- `.lead-expansion-shell`, W4 `.run-form-card`, W5 `.intelligence-card`, W6 `.app-page-header`,
  W7 `.query-editor`/`.progress-card`/`.progress-stage`, W8 results-table/leads-page/
  run-workspace owned rules, tokens (`--space-*`, `--color-*`, `--radius-*`), and `.auth-card`
  — byte-identical.
- The `@media (max-width: 980px)` identity/score `repeat(3)` block (lines 8013–8016) — untouched.
- Store-fit/discovery/traffic dense rules (`.lead-details .store-evidence-section …`,
  `.lead-details .traffic-details …`) — byte-identical.
- Only the eight named hunks change; no new selector and no selector name other than the two
  `.lead-overview > h3` → `.lead-overview > .marketing-heading` retargets.

### 7.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S001 accepted with ending digest `5f32de7f…` (recompute); frontend porcelain contains exactly the four §3 protected ` M` paths, the three `??` coordination artifacts, ` M components/lead-details.tsx`, and no other tracked modification; coordination root clean; `sha256sum app/globals.css` == `f1a7e45a…` | all true |
| V-B | Apply §7.2 hunks with exact-match tooling (each named OLD fence count == 1 before replacing) | 8 hunks applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- app/globals.css` and full `git diff` inspection | numstat == `9  9`; the diff contains exactly the §7.2 H1–H8 hunks and no other hunk or selector change |
| V-D | Read-only node inspection, asserting post-state: `font-size: 1.375rem;` == 1 (in `.lead-details .detail-section > h3`); `font-size: 0.5rem;` still > 0 elsewhere but `0` inside the `.lead-details .detail-section > h3` block; `padding: var(--space-6) var(--space-5);` == 1; `gap: var(--space-5);` inside the dense `.lead-details` block == 1; `padding: 12px;` == 0 and `font-size: 12px;` == 1; `font-size: 14px;` == 1 (the dense group); `grid-template-columns: repeat(3, minmax(0, 1fr));` == 2 (the combined rule + the media block); `repeat(8, minmax(0, 1fr))` == 0 in `.lead-overview .overview-identity .fact-grid`; `repeat(6, minmax(0, 1fr))` == 0 in `.lead-overview .overview-score .score-components`; `.lead-overview > .marketing-heading` == 2; `.lead-overview > h3` == 0; `.lead-expansion-shell` occurrence count unchanged; the `@media` `repeat(3)` block and token/`.auth-card`/W4–W8 regions byte-identical (proven by numstat == 9 9 and the ending-digest pin V-E) | every assertion true |
| V-E | `sha256sum app/globals.css`; `git status --porcelain` | ending digest == `6e57268a9fbb756d62207e6c2fded100900b68a91cab321e4131c34b3906140d`; attributable delta == the two ` M` planned implementation paths exactly (lead-details.tsx + globals.css) |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W9-I001` G1–G9) |

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

## 8. Initial implementation sub-window `UA-W9-S003`

```yaml
subwindow_id: UA-W9-S003
type: FILE
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
assigned_agent: UNASSIGNED
predecessors: [UA-W9-S001, UA-W9-S002]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/lead-details-component.test.ts
file_operation: MODIFY
starting_file_digest: 8f7f611b3866b1cfd108ebb2acb0c06c8a06da74035ab4e5dd433a4fd8431412
starting_repository_change_set_digest: 7cc315a19557daedb6b025cc6185d810d08283c3d073c46f93f98408c390513e
read_only_scope:
  - frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md (§UA-W9)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §8)
  - frontend/test/lead-details-component.test.ts (own file)
  - frontend/test/fixtures.ts (denseLead/lead/trafficEnrichment, pinned 9ea26525…)
authorized_actions:
  - apply_the_three_ordered_replacements_of_section_8.2
  - run_read_only_node_inspection_of_writable_file
  - record_git_status_preflight_and_postcondition
  - compute_sha256_of_writable_file
  - run_the_lead_details_component_only_test_command_under_the_section_8.4_no_json_written_procedure
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_any_test_except_the_three_title_order_assertions_in_the_first_test
  - edit_the_compiledComponents_helper_or_any_other_assertion
  - add_remove_or_reorder_a_test
  - edit_fixtures_ts_or_the_coverage_test_file
  - edit_REQUIRED_CASE_IDS
  - edit_lead_details_tsx_or_globals_css_or_the_w9_test_file
  - paraphrase_any_DEC-UA-004_string_or_drop_a_period
  - run_npm_test_full_suite_or_npx_tsc_or_npm_run_lint (deferred to UA-W9-I001)
  - commit_or_stage_test/.ua-executed.json
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W10
may_start_successor: false
```

### 8.1 Mechanical trace

UA-W9-T4; UA-W9 objective (`SCN-UA-003`); DEC-UA-004 (unique strings); DEC-UA-011 (json
handling not applicable — this file does not import recordExecuted); DEC-UA-013; parent
consequence 5 and 9. Predecessors: S001–S002 (parent-frozen sequencing, §4). Terminal anchor:
the §8.2 three replacements; ending digest pin `f8f7323c…` (parent consequence 5).

### 8.2 Exact file transformation (three ordered replacements; each OLD string count == 1)

**R1** (line 95):
OLD:
```tsx
  assert.ok(html.indexOf("Lead overview") < html.indexOf("Category and store fit"));
```
NEW:
```tsx
  assert.ok(html.indexOf("Know the business behind this domain.") < html.indexOf("Category and store fit"));
```

**R2** (line 96):
OLD:
```tsx
  assert.ok(html.indexOf("Score semantics") < html.indexOf("Store identity"));
```
NEW:
```tsx
  assert.ok(html.indexOf("Why this lead sits where it does.") < html.indexOf("The storefront StoreSignal resolved."));
```

**R3** (line 97):
OLD:
```tsx
  assert.ok(html.indexOf("Store identity") < html.indexOf("Outreach evidence"));
```
NEW:
```tsx
  assert.ok(html.indexOf("The storefront StoreSignal resolved.") < html.indexOf("A real way in, if one was found."));
```

Operation ordering: single atomic file write after all three replacements are prepared; no
intermediate partial state is saved. Resulting numstat is exactly `3 3` (simulated, S3
`EV-UA-W9-D-002`; matches parent consequence 5). This file does not import recordExecuted, so
no `.ua-executed.json` touch occurs at this leaf.

### 8.3 Preserved behavior and forbidden edits (within the writable file)

- The `compiledComponents` helper (lines 42–90), all other imports, all other assertions,
  and every other test — byte-identical. No test is added, removed, or reordered.
- The title-order test (lines 92–125) keeps its other 18 `assert.match` bodies
  (`outcome-badge`, `contact-evidence-disclosure`, `Resolved storefront`, and the
  `for (const expected of [...])` loop) byte-identical.
- The three DEC-UA-004 strings must match exactly including periods; no paraphrase. The
  `indexOf(...)` comparators must remain `<` (strictly increasing order).

### 8.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S002 accepted with ending digest `6e57268a…` (recompute); S001 `5f32de7f…` (recompute); frontend porcelain contains exactly the four §3 protected ` M` paths, the three `??` coordination artifacts, ` M components/lead-details.tsx`, ` M app/globals.css`, and no other tracked modification; coordination root clean; `sha256sum test/lead-details-component.test.ts` == `8f7f611b…` | all true |
| V-B | Apply §8.2 edits with exact-match tooling (each OLD count == 1 before replacing) | 3 replacements applied; run terminates non-zero on any count ≠ 1 |
| V-C | `git diff --numstat -- test/lead-details-component.test.ts` and full `git diff` inspection | numstat == `3  3`; the diff contains exactly the §8.2 R1, R2, R3 changes and no other hunk |
| V-D | Run only this file from `frontend/` (`node --experimental-strip-types --test test/lead-details-component.test.ts`) and read-only node inspection asserting: `Know the business behind this domain.`<`Category and store fit` orderings hold; `Lead overview` as the `<h4>`-driven overview comparison is gone; `compiledComponents` still present; no `recordExecuted` import added; `test/.ua-executed.json` content digest unchanged (`34f5b71a…`) | command exit 0 (11 tests pass per the S001 precedent byte simulation); `test/.ua-executed.json` unchanged |
| V-E | `sha256sum test/lead-details-component.test.ts`; `git status --porcelain` | ending digest == `f8f7323c55db175bb9b74f71330ec01725a98aae004ed2e12116641acc0a7e7b`; attributable delta == the three ` M` planned implementation paths exactly |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W9-I001` G1–G9) |

> §8.4 note: this file does not import `recordExecuted`, so the module glitch is absent at this
> leaf and `.ua-executed.json` must remain byte-identical to HEAD (`34f5b71a…`). The
> `node --test` single-file run is permitted under the §8 yaml authorized_actions (it is a
> file-local unit run, not the full `npm test` suite, and writes no workspace file).

Expected workspace write set: exactly `{frontend/test/lead-details-component.test.ts}`.

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

(S003 V3: required local coverage IDs = {} = registered = executed.)

## 9. Initial implementation sub-window `UA-W9-S004`

```yaml
subwindow_id: UA-W9-S004
type: FILE
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
assigned_agent: UNASSIGNED
predecessors: [UA-W9-S001, UA-W9-S002, UA-W9-S003]
successor_reserved_for: WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w9.test.ts
file_operation: CREATE
starting_file_digest: ABSENT
starting_repository_change_set_digest: 7cc315a19557daedb6b025cc6185d810d08283c3d073c46f93f98408c390513e
read_only_scope:
  - frontend/components/lead-details.tsx (post-S001 state, digest 5f32de7f…)
  - frontend/app/globals.css (post-S002 state, digest 6e57268a…)
  - frontend/test/lead-details-component.test.ts (post-S003 state, digest f8f7323c…)
  - frontend/test/fixtures.ts (read-only pin, digest 9ea26525…)
  - frontend/test/uphunt-aesthetic-coverage.test.ts (pinned f5137be4…)
  - frontend/test/uphunt-aesthetic-w8.test.ts (import-style predecessor, pinned cab15f7f…)
  - frontend/test/.ua-executed.json (runtime state, HEAD content digest 34f5b71a…)
  - frontend/docs/open-work/uphunt-aesthetic/UA-W9_SUBWINDOW_DECOMPOSITION_S1.md (this §0 and §9)
authorized_actions:
  - create_the_writable_file_with_the_exact_section_9.3_bytes
  - run_the_w9_only_test_command_under_the_section_9.4_V-D_backup_run_restore_procedure
  - run_disposable_in_memory_negative_probes_V-C_via_node_-e (zero workspace writes)
  - run_read_only_node_inspection
  - record_git_status_preflight_and_postcondition
prohibited_actions:
  - edit_any_other_workspace_file
  - edit_the_three_post_leaf_files_or_the_read_only_pin_files
  - add_a_fifth_test_or_a_skip_filter_or_todo
  - assert_getExecuted_equals_REQUIRED_CASE_IDS_full_set_equality
  - call_recordExecuted_before_a_tests_assertions
  - edit_REQUIRED_CASE_IDS_or_the_coverage_test_file_or_fixtures_ts
  - edit_the_compiledComponents_helper_beyond_the_byte_reproduction
  - commit_or_stage_test/.ua-executed.json
  - delete_test/.ua-executed.json (V-D moves it to /tmp/opencode and restores it byte-identically)
  - run_npm_test_full_suite_or_npx_tsc_or_npm_run_lint (deferred to UA-W9-I001)
  - add_dependency
  - commit_push_production_paid_provider_aws
  - start_UA-W10
may_start_successor: false
```

### 9.1 Mechanical trace

UA-W9-T3; CASE-UA-W9-001 (`SCN-UA-003`); CASE-UA-W9-002; CASE-UA-W9-003 (`SCN-UA-003`,
`INV-UA-004`); CASE-UA-W9-004; DEC-UA-004; DEC-UA-011; DEC-UA-013; parent consequences 6,
7, and 9. Predecessors: S001–S003 (each case's needles read the post-leaf file states; §4
edges). The window-local required case-set digest is `73acdc6b…` (consequence 8).

### 9.2 Exact file transformation

CREATE `frontend/test/uphunt-aesthetic-w9.test.ts` with exactly the §9.3 bytes. No other
content, no extra test, no helper exports beyond the duplicated `compiledComponents`.

### 9.3 Exact required ending file content

The file is exactly (UTF-8, LF endings, single trailing newline; SHA-256
`baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31`):

```ts
import assert from "node:assert/strict";
import { mkdtemp, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
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

const leadDetailsSrc = await readFile(new URL("../components/lead-details.tsx", import.meta.url), "utf8");
const globalsCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W9-001 lead overview uses SectionIntro with the lead heading and copy", async () => {
  assert.match(leadDetailsSrc, /import \{ SectionIntro \} from "\.\/section-intro";/u);
  const { LeadDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: denseLead() }));
  assert.match(html, /01 · The store/u);
  assert.match(html, /Know the business behind this domain\./u);
  assert.match(html, /Score, identity, and the outreach paths that were actually recorded\./u);
  recordExecuted("CASE-UA-W9-001");
});

test("CASE-UA-W9-002 lead detail section heading type floor", () => {
  const block = globalsCss.match(/\.lead-details \.detail-section > h3 \{[\s\S]*?\}/u)?.[0] ?? "";
  assert.ok(block.includes("font-size: 1.375rem;"));
  assert.ok(!block.includes("font-size: 0.5rem;"));
  recordExecuted("CASE-UA-W9-002");
});

test("CASE-UA-W9-003 lead overview identity, contact, and score still render", async () => {
  const { LeadDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: denseLead() }));
  assert.match(html, /MyShopify domain/u);
  assert.match(html, /Resolved domain/u);
  assert.match(html, /hello@fixture\.example/u);
  assert.match(html, /\+12125550100/u);
  assert.match(html, /detail-score/u);
  recordExecuted("CASE-UA-W9-003");
});

test("CASE-UA-W9-004 identity and score grids cap at three columns", () => {
  assert.doesNotMatch(globalsCss, /\.lead-overview \.overview-identity \.fact-grid \{ grid-template-columns: repeat\(8/u);
  assert.ok(globalsCss.includes(".lead-overview .overview-identity .fact-grid,\n.lead-overview .overview-score .score-components { grid-template-columns: repeat(3, minmax(0, 1fr)); }"));
  recordExecuted("CASE-UA-W9-004");
});
```

This content was dry-run validated by the window agent against the simulated post-S001/S002/S003
states in the disposable location `/tmp/opencode/ua-w9-dework/dryrun` (S3 `EV-UA-W9-D-002`): 6
tests pass (2 × CASE-UA-W1 via the coverage import + 4 × CASE-UA-W9), 0 fail, 0 skipped, and the
generated executed set contained exactly the 6 expected IDs (set digest `7254ec52…`, matching
parent consequence 7); the dry-run directory remains disposable and outside the workspace.

### 9.4 Exact checks

| ID | Command / inspection | Expected |
|---|---|---|
| V-A | Preflight: S003 accepted with ending digest `f8f7323c…` (recompute); the S001/S002 ending digests `5f32de7f…`/`6e57268a…` (recompute); `test/uphunt-aesthetic-w9.test.ts` ABSENT; frontend porcelain contains exactly the four §3 protected ` M` paths, the three `??` coordination artifacts, the three ` M` planned implementation paths, and no other tracked modification; coordination root clean; `sha256sum test/.ua-executed.json` == `34f5b71a…` | all true |
| V-B | `sha256sum test/uphunt-aesthetic-w9.test.ts` after writing §9.3 bytes | digest == `baee1b2e44282ff99840f35666ab3b8d68d323589f5a376429d851c44ebe1a31` |
| V-C | Disposable in-memory validation evidence recorded during authoring (window agent, `/tmp/opencode/ua-w9-dework`, S3 `EV-UA-W9-D-002`): N1 (NC-UA-003) replace `Know the business behind this domain.` with `Lead overview` in an in-memory copy of the lead-details source → the lead-details heading assertion must fail; N2 (NC-UA-003) delete the `import { SectionIntro }` line from an in-memory copy of post-S001 lead-details.tsx → the import assertion must fail; N3 (NC-UA-003) reintroduce `font-size: 0.5rem;` in the in-memory `.lead-details .detail-section > h3` block → the `doesNotContain font-size: 0.5rem` assertion must fail; N4 (read-only pin) remove `detail-score` from the dense render (via a copy of lead-details.tsx that drops the `detail-score` class) → the `detail-score` assertion must fail; N5 (NC-UA-003 / read-only pin) reintroduce `.lead-overview .overview-identity .fact-grid { grid-template-columns: repeat(8, minmax(0, 1fr)); }` in an in-memory copy of post-S002 globals.css → the `doesNotMatch repeat(8)` assertion must fail; N6 restore the combined `repeat(3)` rule text to the separated 8/6 form → the combined-rule `includes` assertion must fail | all six probes falsified (recorded authoring evidence; I001 G8 re-executes them fresh) |
| V-D | From ABSENT executed-set state: `mv test/.ua-executed.json /tmp/opencode/ua-w9-ua-executed-head-backup.json`; from `frontend/` run `node --experimental-strip-types --test test/uphunt-aesthetic-w9.test.ts`; read `test/.ua-executed.json`; then `mv /tmp/opencode/ua-w9-ua-executed-head-backup.json test/.ua-executed.json`; re-`sha256sum` | command exit 0; tests 6, pass 6, fail 0, skipped 0, with exactly the titles CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004; json == exactly those 6 sorted IDs (§4.7 set digest `7254ec520303506a3aa8be3afd45143122f5e78552596be20681c6f1550390b8`, parent consequence 7); post-restore digest == `34f5b71a…` and `git status --porcelain` shows `test/.ua-executed.json` unmodified |
| V-E | `git status --porcelain` | attributable delta == `?? test/uphunt-aesthetic-w9.test.ts` added to the three ` M` implementation paths; no other path |
| DEF | Whole-window gates | DEFERRED_TO_INTEGRATION (`UA-W9-I001` G1–G9) |

Expected workspace write set: exactly `{frontend/test/uphunt-aesthetic-w9.test.ts}` plus the
prescribed disposable `test/.ua-executed.json` backup/run/restore cycle of V-D, whose net ending
delta is zero (byte-identical restore is part of the check).

### 9.5 File-subwindow completion checklist

- [ ] P1 Revisions, assignment identity, writable file, baseline digest, and predecessor evidence match.
- [ ] P2 Starting repository status and protected dirty changes match the recorded baseline.
- [ ] T1 Apply every ordered transformation and no other edit to the writable file.
- [ ] V1 Run every LOCAL_NOW check and record its activation witnesses and exact assertions.
- [ ] V2 Prove the attributable workspace changed-file set is exactly the writable file.
- [ ] V3 Prove required local coverage IDs equal registered and executed local IDs with zero skips.
- [ ] H1 Return the exact diff, ending digest, commands, outcomes, and residual integration obligations.
- [ ] H2 Confirm no prohibited action, second-file edit, successor work, external mutation, or parent communication occurred.
- [ ] H3 Stop at AWAITING_WINDOW_REVIEW.

(S004 V3: required local coverage IDs = registered = {CASE-UA-W9-001, CASE-UA-W9-002,
CASE-UA-W9-003, CASE-UA-W9-004} plus the 2 × CASE-UA-W1 registry re-executions provoked by the
import; zero skips, duplicates, or unexpected IDs; the 6-ID executed-set digest `7254ec52…` is
the witness. Full 43-set equality is UA-W15-V5 only.)

## 10. Local and whole-window verification gates

Leaf-local gates: §6.4, §7.4, §8.4, §9.4. Frozen whole-window gates, executed only by
`UA-W9-I001` from `frontend/`, per `A4` §Gates, `A4` UA-W9 lifecycle, `DEC-UA-014`,
`DEC-UA-016`, and parent consequence 8:

| Gate | Command / assertion | Expected |
|---|---|---|
| G1 | `npm test` per `DEC-UA-016` | PASS iff CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003 and CASE-UA-W9-004 pass (plus the two CASE-UA-W1 registry re-executions via the import) and every failing title, if any, is a member of the predecessor heading-oracle set {"My searches presents keyword research and identifiable run dossiers without rendering IDs", "MRR-FE-01 exact research payload and two-section surface", "MRR-W2 frontend unit certificate"}; expected total 190 tests / 187 pass / 3 fail = 184 predecessor + 2 W1 re-executions from the w9 import + 4 W9 cases; process exit 1 is expected and is not G1 FAIL when that holds; if CASE-UA-W1-001/002 fail solely with `SyntaxError: Unexpected end of JSON input` from getExecuted, that is the known concurrent recordExecuted race (DEC-UA-011 residue) — one identical rerun is permitted (E8.1) and is not a product failure |
| G2 | `npx tsc --noEmit --incremental false --pretty false` (`DEC-UA-014` oracle; `--incremental false` so no tsbuildinfo is written) | PASS iff zero output lines contain any owned-path needle: `lead-details.tsx`, `lead-details-component.test.ts`, `uphunt-aesthetic-w9.test.ts` (globals.css is not typechecked); expected remaining diagnostics: exactly the 10 parked SRC-UA-0092 diagnostics (13 physical lines at the W8 close); repo-wide exit 0 NOT required; parked files MUST NOT be edited |
| G3 | `npm run lint` | exit 0 (JSX and CSS owned this window; globals.css edited) |
| G4 | browser evidence (`browser_evidence: true`): local `next dev` with `STORESIGNAL_DESIGN_FIXTURES=1`, `/usr/bin/google-chrome --headless` screenshots of route {`/design-fixture?scenario=completed`} ONLY, at widths 390, 768, 1280, 1440 (height 900), with the first results row expanded so LeadDetails is visible, under `frontend/review-evidence/uphunt-aesthetic/UA-W9/` | 4 screenshots recorded; the route set is frozen to that one route (parent consequence 8); live `/runs/[runId]` MUST NOT be screenshotted (it polls); if the completed fixture cannot render LeadDetails which the same G-R1-style pre-hydration synthetic `.example` interception used on UA-W7/W8, that technique is permitted (no live run, no credentials); a fixture 404 without that recovery is PARENT_BLOCKED; smooth local dev server processes only, under the §11 item 5 sandbox policy; this is local_e2e evidence, NOT a CASE oracle (SUB-UA-001) |
| G5 | coverage scope: required W9 window set (4 IDs, digest `73acdc6b…`) = registered (four `test()` titles) = executed W9 IDs; after G1, `test/.ua-executed.json` is exactly the 26 sorted IDs {2 × CASE-UA-W1} ∪ {4 × CASE-UA-W2} ∪ {4 × CASE-UA-W3} ∪ {2 × CASE-UA-W4} ∪ {2 × CASE-UA-W5} ∪ {3 × CASE-UA-W6} ∪ {2 × CASE-UA-W7} ∪ {3 × CASE-UA-W8} ∪ {4 × CASE-UA-W9} (§4.7 set digest `48c03081df64e9bc5fb69c29dbb65257b6364aa1c0a0fdd37bcf4c9185fb7fb7`, parent consequence 7); zero skips, duplicates, unexpected, or unactivated IDs in this window; full 43-set equality NOT asserted (`UA-W15-V5` owns it); the json is modified tracked runtime output (owner commit residue) and is never committed | exact |
| G6 | `sha256sum` of the four planned files, all zero-edit in-scope files (`section-intro.tsx`, `results-table.tsx`, `results-filters.tsx`, `cumulative-traffic.tsx`, `leads/page.tsx`, `live-leads-workspace.tsx`, `run-workspace.tsx`, `uphunt-aesthetic-w8.test.ts`, `traffic-enrichment.tsx`, `landing-sections.tsx`, `query-editor.tsx`, `run-progress.tsx`, `runs/[runId]/page.tsx`, `fixtures.ts`, `uphunt-aesthetic-coverage.test.ts`), and the w2–w7 test files; plus `git status --porcelain` and a forbidden-path negative search over the whole window delta (`app/api`, `lib/api-types.ts`, `lib/api-validation.ts`, `lib/client-api.ts`, `email_scraper/`, root `ACTIVE_EXECUTION_STATE.md`, `package.json`, the five parked test files, the coverage test file, `REQUIRED_CASE_IDS`, `section-intro.tsx`, `landing-sections.tsx`, `traffic-enrichment.tsx`, `fixtures.ts`, `run-workspace.tsx`, `leads/page.tsx`, `live-leads-workspace.tsx`, the W4/W5/W6/W7/W8 product files, the w2–w8 test files, `design-system-shell.test.ts`) | ending pins `5f32de7f…`, `6e57268a…`, `f8f7323c…`, `baee1b2e…` on the four planned files; byte pins `159096f3…`, `a4e1472f…`, `0ab118e4…`, `7d37a3ae…`, `21a17799…`, `a646f657…`, `643c3568…`, `cab15f7f…`, `833cb54c…`, `914c61e5…`, `92efe1f7…`, `15d840bf…`, `719e05ea…`, `9ea26525…`, `f5137be4…`, `f65ba0c5…`, `635e2802…`, `8008501d…`, `ee6425e9…`, `f78b8da2…`, `92201c35…` all unchanged; implementation delta == exactly the four §4 planned files; coordination artifacts limited to the enumerated §2 list; `A5`/`A6` digests unchanged by leaves |
| G7 | static inspection of the new test file imports (`node:test`, `node:assert/strict`, `node:fs/promises` (mkdtemp/symlink/writeFile/readFile), `node:os`, `node:path`, `node:module`, `node:url`, `node:child_process`, `react`, `react-dom/server`, `./uphunt-aesthetic-coverage.test.ts`, `./fixtures.ts`) + suite behavior | 0 network operations, 0 DB operations (`UA-W9-V3`) |
| G8 | personally re-execute the §9.4 V-C probes N1–N6 on fresh in-memory copies (tmp only, no workspace writes): NC-UA-003 family (heading string change, SectionIntro import removal, reintroduced `font-size: 0.5rem;`, reintroduced `repeat(8)` leaf, combined-rule removal) and the read-only `detail-score` pin | all falsified |
| G9 | successor negative search: no `UA-W10` artifact of any kind (no `uphunt-aesthetic-w10.test.ts`, no lead-details/globals/StoreEvidence/DiscoveryDetails edits beyond the four planned files), `A5.current_window` still `UA-W9`, `next_window` untouched | `may_start_successor: false` honored; `UA-W9-H4/H6` hold |

PASS oracle for `UA-W9-I001`: G1–G9 all pass; `A4` `UA-W9-P1..P4`, `UA-W9-V1..V5`,
`UA-W9-H1..H5` then checked with resolvable evidence; 
`frontend/review-evidence/uphunt-aesthetic/UA-W9_HANDOFF.md` written per §13.3;
`A5.current_status` set to `AWAITING_REVIEW` (the sole authorized post-I001 `A5` handoff
action); STOP per `UA-W9-H6` (no `UA-W10`).
CORRECTION_REQUIRED oracle: any G-gate behavioral failure → §11 correction loop with
`UA-W9-C00n` (single-file, dependency-safe).
PARENT_BLOCKED oracle: missing parent decision, contradiction with `A1`–`A4`, or required scope
expansion (e.g. a defect that cannot be corrected without editing `section-intro.tsx`,
`results-table.tsx`, `results-filters.tsx`, `cumulative-traffic.tsx`, `leads/page.tsx`,
`live-leads-workspace.tsx`, `run-workspace.tsx`, `traffic-enrichment.tsx`, `landing-sections.tsx`,
`query-editor.tsx`, `run-progress.tsx`, `runs/[runId]/page.tsx`, `fixtures.ts`, `REQUIRED_CASE_IDS`,
a parked file, `design-system-shell.test.ts`, or a W4–W8 product/test file).

## 11. Correction and re-assessment rules

1. Every correction is a new single-file sub-window `UA-W9-C00n` with a new assignment ID and
   baseline digest, citing: the failed evidence, exact root cause, the governing requirement and
   decision already determining the remedy, the earlier sub-window corrected, and the gates
   invalidated. Nothing is rewritten in place; `S3` is append-only.
2. `REQUIRED_CASE_IDS`, the coverage test file, and `fixtures.ts` are NOT correctable at window
   level (`A5` prohibitions). A defect requiring changes there is `PARENT_BLOCKED`.
3. `section-intro.tsx`, `results-table.tsx`, `results-filters.tsx`, `cumulative-traffic.tsx`,
   `leads/page.tsx`, `live-leads-workspace.tsx`, `run-workspace.tsx`, `traffic-enrichment.tsx`,
   `landing-sections.tsx`, `query-editor.tsx`, `run-progress.tsx`, `app/runs/[runId]/page.tsx`,
   and `fixtures.ts` are frozen (§0 consequence 2). A failing check that would require editing
   any of them, a W4–W8 product/test file, a parked file, or `design-system-shell.test.ts` is
   `PARENT_BLOCKED`, never a frozen-file edit.
4. After the last correction the window agent personally runs a new assessment `UA-W9-I00n`
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

## 12. Mandatory authoring-readiness checklist (sub-window standard §11)

Evidence citations resolve into `S3` (`EV-UA-W9-D-001..002`).

### 12.1 Authority and inheritance

- [x] `SW-A01` Parent assignment, window agent identity, and delegation authority are exact and current. Evidence: EV-UA-W9-D-001 (A5: ASG-UA-W9-01, UA-W9-WINDOW-AGENT, IN_PROGRESS, decompose action authorized; A5 digest d23fccfe… recomputed MATCH)
- [x] `SW-A02` Parent and sub-window standards plus contract, decision, checklist, and state revisions are pinned and verified. Evidence: EV-UA-W9-D-001 (recomputed SHA-256 matches all pins incl. A4 `75005e55…`, A1 `57fa49c7…`, A3 `094bc8bf…`, and subwindow standard `842c2955…`)
- [x] `SW-A03` Parent write, read, action, prohibition, successor, and stop boundaries are copied without expansion. Evidence: EV-UA-W9-D-002 (§2, §6–§9 of this S1)
- [x] `SW-A04` Current repositories, dirty state, and owner-controlled changes are inventoried. Evidence: EV-UA-W9-D-001 (§3 of this S1)
- [x] `SW-A05` All three subordinate artifacts exist and their authorities do not overlap. Evidence: EV-UA-W9-D-001 (S1 spec / S2 state / S3 evidence paths)
- [x] `SW-A06` Strict adjacent communication and no subagent delegation are enforced. Evidence: EV-UA-W9-D-002 (leaf prohibited_actions; report-only-to-window-agent rule)
- [x] `SW-A07` The inherited execution-environment policy permits sandbox escalation for authorized local actions without expanding parent authority. Evidence: EV-UA-W9-D-002 (§11 item 5 == A5 policy)

### 12.2 Decision and file-set closure

- [x] `SW-D01` Every parent requirement, invariant, decision, task, scenario, and coverage case is allocated to exact files and assertions. Evidence: EV-UA-W9-D-002 (§5 table; UA-W9-T1/T2/T3/T4; A4 test_registration CASE-UA-W9-001..004)
- [x] `SW-D02` No missing parent-level decision or contradictory authority remains. Evidence: EV-UA-W9-D-001 (§0 consequences close the remaining choices; current source matches every §3 anchor)
- [x] `SW-D03` Required changed-file set equals planned initial file set. Evidence: EV-UA-W9-D-002 (both = the four §4 planned files; planned-file-set digest `85f56b7b…`; the fifteen zero-edit in-scope files accounted for by parent consequence 2 with G6 pins)
- [x] `SW-D04` Every planned file has one initial sub-window and no initial sub-window owns more than one file. Evidence: EV-UA-W9-D-002 (§4: S001–S004, one file each; zero-edit in-scope files take no S-number per parent consequence 1)
- [x] `SW-D05` Every file operation, starting digest, anchor, interface, preserved behavior, and forbidden edit is exact. Evidence: EV-UA-W9-D-002 (§6.2/§7.2/§8.2 exact fences; §9.3 bytes with pinned digest `baee1b2e…`; CSS and LDC ending digests reproduce the parent pins; JSX ending digest is the window-agent §7.3 deterministic bytes per the §0 note)
- [x] `SW-D06` The dependency graph is complete and acyclic; every sequential edge and authorized parallel wave is justified by named outputs plus disjoint-resource proof. Evidence: EV-UA-W9-D-002 (§4; no waves — parent consequence 1; S004 ordered after S001–S003 by the needle dependencies; S001→S003 ordered by parent-frozen sequencing with one-active-leaf review between leaves)
- [x] `SW-D07` Every cross-file interface is frozen before dependent execution. Evidence: EV-UA-W9-D-002 (§5.1: SectionIntro export pinned `159096f3…`; fixtures/coverage pinned; read-only needles pinned; all leaf ending digests pinned before S004 dispatch)
- [x] `SW-D08` Every intermediate state has exact permitted checks, expected temporary failures, safety, resolver, and prohibitions. Evidence: EV-UA-W9-D-002 (§4.1 table)
- [x] `SW-D09` Separate production, test, fixture, schema, configuration, manifest, and generated files have separate sub-windows. Evidence: EV-UA-W9-D-002 (two product leaves and two test leaves are separate; runtime json handled by prescribed disposable procedure, never a deliverable)
- [x] `SW-D10` No rename, multi-output generator, formatter, installer, or command can violate the one-file write invariant. Evidence: EV-UA-W9-D-002 (command lists in §6.4–§9.4; the only prescribed non-writable touch is the §9.4 V-D json backup/run/restore with net-zero delta; tsc leaf runs are not scheduled — tsc is an I001 gate)

### 12.3 Sub-window execution completeness

- [x] `SW-E01` Every file sub-window contains every field in Section 7 of the standard. Evidence: EV-UA-W9-D-002 (§6–§9 yaml blocks; 15/15 field-presence lint per block)
- [x] `SW-E02` Every sub-window prescribes exact ordered edits rather than design alternatives or broad verbs. Evidence: EV-UA-W9-D-002 (byte-exact §6.2/§7.2/§8.2 with unique anchors and occurrence counts; §9.3 full file bytes pinned by digest)
- [x] `SW-E03` Every sub-window has exact preflight, local checks, activation witnesses, assertions, and forbidden outcomes. Evidence: EV-UA-W9-D-002 (§6.4–§9.4)
- [x] `SW-E04` Every sub-window mechanically proves its attributable changed-file set is exactly one file. Evidence: EV-UA-W9-D-002 (V-E rows in §6.4–§9.4; V-D net-zero json restore proof)
- [x] `SW-E05` Every sub-window has exact evidence, handoff, stop, and successor-reservation rules. Evidence: EV-UA-W9-D-002 (§13 templates; H3 rows)
- [x] `SW-E06` Each subagent may report only to the window agent and cannot update subordinate or parent authority artifacts. Evidence: EV-UA-W9-D-002 (leaf prohibited_actions)
- [x] `SW-E07` No sub-window requires successor work to satisfy its file-local acceptance. Evidence: EV-UA-W9-D-002 (each leaf's LOCAL_NOW set passes standalone — S001 by the `node --test` LDC precedent, S002/S003 by digest pins, S004 by the V-D w9-only run; whole-window gates deferred and named)
- [x] `SW-E08` Deliberately deferred checks name the exact integration assessment that owns them. Evidence: EV-UA-W9-D-002 (DEF rows → UA-W9-I001)

### 12.4 Enforcement and integration closure

- [x] `SW-V01` Coverage cases are allocated to exact test files, registrations, activation witnesses, and assertions. Evidence: EV-UA-W9-D-002 (§5; 4 cases → S004 with §9.3 bytes)
- [x] `SW-V02` Required local and whole-window case-set equality and digest checks are prescribed. Evidence: EV-UA-W9-D-002 (§9.4 V-D; §10 G5)
- [x] `SW-V03` Every critical invariant has a negative control assigned at the narrowest effective level. Evidence: EV-UA-W9-D-002 (NC-UA-003-family probes at S004 leaf level (§9.4 V-C N1–N6) with I001 G8 personal re-execution; S001–S003 integrity enforced by the ending-digest pins)
- [x] `SW-V04` Test substitutes and accepted tests/fixtures have exact fidelity and invalidation rules. Evidence: EV-UA-W9-D-002 (SUB-UA-001 inherited: the compiledComponents/denseLead render + UTF-8 file reads are source-text oracles only; no computed-pixel claim; screenshots are local_e2e evidence, not oracles; coverage, fixtures and w2–w8 test files never weakened here)
- [x] `SW-V05` The initial integration assessment is fully authored with zero implementation-file write authority. Evidence: EV-UA-W9-D-002 (§14: authorized_write_file NONE)
- [x] `SW-V06` Frozen gates are exact, risk-proportionate, and scheduled at the final assessment rather than every leaf. Evidence: EV-UA-W9-D-002 (§10; G4 scheduled at I001 per browser_evidence true)
- [x] `SW-V07` Correction diagnosis, one-file corrective assignment, invalidation, and reassessment rules are complete. Evidence: EV-UA-W9-D-002 (§11)
- [x] `SW-V08` The window agent must independently inspect every file handoff and personally execute every integration assessment. Evidence: EV-UA-W9-D-002 (§14 assigned WINDOW-AGENT; §11 item 6; parent consequence 9 same-identity review)
- [x] `SW-V09` Whole-window approval cannot pass through zero-work, skipped, filtered, duplicate, unexpected, unactivated, or summary-only evidence. Evidence: EV-UA-W9-D-002 (§10 G5/G6/G8; §9.4 V-B/V-D)
- [x] `SW-V10` Parent handoff contents and `READY_FOR_PARENT_REVIEW` boundary are exact. Evidence: EV-UA-W9-D-002 (§13.3)
- [x] `SW-V11` Every local gate distinguishes real failure from proven sandbox/channel invalidation and permits one identical escalated recovery without parent round trip. Evidence: EV-UA-W9-D-002 (§11 item 5)

### 12.5 Mechanical and adversarial audit

- [x] `SW-R01` All IDs are unique and all references resolve. Evidence: EV-UA-W9-D-002 (`UA-W9-S001`–`UA-W9-S004`, `UA-W9-I001` unique; S-numbering exactly as parent consequence 1; CASE/DEC/SCN/NC IDs cite A3/A4)
- [x] `SW-R02` No unresolved placeholder exists in a checked item or assignable sub-window. Evidence: EV-UA-W9-D-002 (S1 contains only concrete paths, digests, bytes, counts)
- [x] `SW-R03` Single-file write-set lint rejects zero, two, wildcard, directory, rename, and incidental workspace outputs for file sub-windows. Evidence: EV-UA-W9-D-002 (exact-set comparisons in §6.4–§9.4 V-E rows; prescribed disposable `.ua-executed.json` cycle excluded by the net-zero restore proof)
- [x] `SW-R04` Removing one required file or requirement-to-file mapping makes readiness fail. Evidence: EV-UA-W9-D-002 (SW-D03 set equality over the parent-pinned 4-file planned set is the failure detector)
- [x] `SW-R05` Removing, duplicating, skipping, filtering, or bypassing one required coverage case makes acceptance fail. Evidence: EV-UA-W9-D-002 (§9.3 four tests each call recordExecuted after its oracle; §10 G5 counts and digests; A4 §Enforcement 1–4 inherited)
- [x] `SW-R06` Weakening an oracle or diverging a substitute invalidates acceptance evidence. Evidence: EV-UA-W9-D-002 (byte-pinned replacements and file content; any divergence changes the reviewed ending digests; accepted tests untouched)
- [x] `SW-R07` Simulated second-file edit and direct parent communication are rejected. Evidence: EV-UA-W9-D-002 (leaf prohibited_actions + §4.6 proofs via V-E rows)
- [x] `SW-R08` Simulated integration failure cannot be repaired by the window agent without a new corrective sub-window. Evidence: EV-UA-W9-D-002 (§11 items 1, 6)
- [x] `SW-R09` Parent decomposition review is recorded before the first implementation assignment. Evidence: EV-UA-W9-D-002 + S2 `decomposition_status: AWAITING_PARENT_DECOMPOSITION_REVIEW`, leaves `assigned_agent: UNASSIGNED`
- [x] `SW-R10` Document lint reports zero missing fields, mappings, cases, evidence references, or authority conflicts. Evidence: EV-UA-W9-D-002 (15/15 required fields per FILE block; 0 unresolved references)
- [x] `SW-R11` Simulated sandbox denial proceeds to one identical escalated recovery, while a changed command, observable test failure or external action is rejected. Evidence: EV-UA-W9-D-002 (§11 item 5)

## 13. Handoff templates

### 13.1 Leaf completion certificate (returned by each leaf agent)

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W9
subwindow_id: UA-W9-S001 | UA-W9-S002 | UA-W9-S003 | UA-W9-S004
assignment_id: ASG-UA-W9-01-S001 | ASG-UA-W9-01-S002 | ASG-UA-W9-01-S003 | ASG-UA-W9-01-S004
agent_identity: exact identity
writable_file: exact path from §6–§9
starting_file_digest: 0ceec905… | f1a7e45a… | 8f7f611b… | ABSENT
ending_file_digest: 5f32de7f… | 6e57268a… | f8f7323c… | baee1b2e…
starting_repository_change_set_digest: 7cc315a19557daedb6b025cc6185d810d08283c3d073c46f93f98408c390513e
attributable_changed_file_set: [writable file only]
required_local_cases: [] | [] | [] | [CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004]
registered_local_cases: same as required_local_cases
executed_local_cases: [] | [] | [] | [CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W9-001, CASE-UA-W9-002, CASE-UA-W9-003, CASE-UA-W9-004] (V-D w9-only run; the 2 W1 IDs are registry re-executions via the import)
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 0 | 0 | 0 | 6
negative_controls_falsified: 0 | 0 | 0 | 6
commands: []
deferred_integration_checks: [UA-W9-I001 gates per §10]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
```

### 13.2 Window-agent integration certificate (appended to `S3` by `UA-W9-I001`)

The §12.4 certificate of the sub-window standard, adapted: `integration_assessment_id: UA-W9-I001`;
`accepted_initial_subwindows` from leaf reviews; `expected_changed_file_set` = the four §4 planned
files; `required_case_count: 4` (window-local; the 43-ID registry equality is UA-W15-V5);
`registered_case_count: 4`; `executed_case_count: 4` window-local (plus 2 W1 + 20 predecessor IDs
re-executed in the full run); `required_case_set_digest: 73acdc6bf1c7d1258d64f93b8371f5a33b4fd1a2cf56762fc93e2d785ed06451`;
registered/executed digests computed with the §4.7 formula over the same IDs; post-G1 executed-set
digest `48c03081df64e9bc5fb69c29dbb65257b6364aa1c0a0fdd37bcf4c9185fb7fb7`; `status:
READY_FOR_PARENT_REVIEW` only per the §10 PASS oracle.

### 13.3 Consolidated parent handoff

`frontend/review-evidence/uphunt-aesthetic/UA-W9_HANDOFF.md` per `A4` handoff template and
sub-window standard §12.5: objective; status `READY_FOR_PARENT_REVIEW` or one exact blocker;
changed-file set + starting/ending SHA-256s (including the preserved zero-edit `section-intro.tsx`
`159096f3…`, `results-table.tsx` `a4e1472f…`, `results-filters.tsx` `0ab118e4…`,
`cumulative-traffic.tsx` `7d37a3ae…`, `leads/page.tsx` `21a17799…`, `live-leads-workspace.tsx`
`a646f657…`, `run-workspace.tsx` `643c3568…`, `uphunt-aesthetic-w8.test.ts` `cab15f7f…`,
`traffic-enrichment.tsx` `833cb54c…`, `landing-sections.tsx` `914c61e5…`, `query-editor.tsx`
`92efe1f7…`, `run-progress.tsx` `15d840bf…`, `runs/[runId]/page.tsx` `719e05ea…`, `fixtures.ts`
`9ea26525…`, `coverage` `f5137be4…`, and unchanged w2–w7 predecessors); CASE
required/registered/executed/skipped/duplicate/unexpected (4/4/4/0/0/0 window-local; 2 additional
registry IDs re-executed via import; full 43-set equality deferred to UA-W15); required-set digest
`0d14982c…` (registry) and W9-set digest `73acdc6b…`; commands and outcomes; browser-evidence file
list under `frontend/review-evidence/uphunt-aesthetic/UA-W9/` (4 PNGs, route
`/design-fixture?scenario=completed`); sandbox recoveries; NC results; forbidden-path negative
search; `S1`/`S2`/`S3` paths and revisions; the tracked `.ua-executed.json` residue disclosure
(26-ID content, uncommitted); confirmation that `UA-W10` was not started; the §0 JSX ending-digest
reconciliation note.

## 14. Initial integration assessment `UA-W9-I001` (fully authored now)

```yaml
subwindow_id: UA-W9-I001
type: INTEGRATION_ASSESSMENT
parent_window_id: UA-W9
parent_assignment_id: ASG-UA-W9-01
assigned_agent: WINDOW-AGENT (UA-W9-WINDOW-AGENT, personally executed, never delegated)
predecessors: [UA-W9-S001, UA-W9-S002, UA-W9-S003, UA-W9-S004]
authorized_write_file: NONE (implementation files; coordination artifacts per §2 only)
input: assembled UA-W9 state after UA-W9-S004 is accepted
gates: §10 table G1–G9 (frozen)
pass_oracle: G1..G9 pass; G4 executed and recorded (browser_evidence true; the one frozen route /design-fixture?scenario=completed only)
correction_oracle: any behavioral gate failure -> §11 loop with UA-W9-C00n
parent_blocked_oracle: missing decision / contradiction / scope expansion (incl. §11 items 2–3)
execution_policy: E8.1 sandbox escalation + one identical recovery (§11 item 5)
may_start_successor: false
```

Accepted-subwindow and digest fields are filled from completed leaf evidence at run time; the gate
set above is frozen now (sub-window standard §9.1).

## 15. Self-falsification (sub-window standard §14)

Before declaring readiness the window agent verified the document rejects each applicable
counterexample (rejection mechanism in parentheses):

1. sub-window names two writable files (§6–§9 yaml `writable_file` single path; SW-E04 V-E exact-set proofs) — rejected.
2. sub-window names a directory/wildcard (canonical file paths only; SW-R03) — rejected.
3. a command creates an unplanned second workspace file (command lists enumerated; the only non-writable touch is the §9.4 V-D json cycle with prescribed net-zero restore) — rejected.
4. source and separate test files assigned together (two product leaves S001/S002 and two test leaves S003/S004 are separate; SW-D09) — rejected.
5. a required parent file is absent from the decomposition (SW-D03 set equality over the four-file planned set; the fifteen zero-edit in-scope files are accounted for by parent consequence 2 with G6 pins) — rejected.
6. two initial sub-windows own the same file (S001–S004 files pairwise distinct; SW-D04) — rejected.
7. a dependent file begins before its interface is frozen (§5.1 ending digests and needles frozen before S004 dispatch; SW-D07) — rejected.
8. an intermediate state has an unexplained test failure (§4.1 table: the one expected temporary LDC assertion failure at the S001 row is named and resolved by S003; no permitted check fails in any row; unexpected failures stop the sequence) — rejected.
9. a subagent starts its successor (`may_start_successor: false` in every block; H3; parent consequence 9) — rejected.
10. a subagent communicates directly with the parent (prohibited_actions; H2) — rejected.
11. the window agent repairs implementation during review (§11 item 6) — rejected.
12. an integration failure produces no diagnosed one-file correction (§11 items 1, 4) — rejected.
13. a correction silently rewrites a completed sub-window (§16 append-only amendments; §11 item 1) — rejected.
14. acceptance omits/skips/duplicates/filters/unactivates a required case (§10 G5 counts + digests; §9.4 V-D) — rejected.
15. an oracle is weakened to accommodate current behavior (byte-pinned replacements and file content; any divergence changes reviewed digests; SW-R06) — rejected.
16. a test substitute proves more parity than its fidelity supports (SUB-UA-001 inherited: source-text and compiled-render oracles; screenshots are local_e2e only; SW-V04) — rejected.
17. a costly gate is repeated without its scheduling rule (§10 gates scheduled at I001 only; DEF rows name the owner) — rejected.
18. a correction changes a file but dependent evidence is reused without proof (§11 item 4 rerun list) — rejected.
19. the assembled changed-file set differs from the planned set or exceeds parent scope (§10 G6 delta + forbidden-path search; SW-D03) — rejected.
20. the window agent claims parent acceptance or begins UA-W10 (§10 PASS oracle stops at READY_FOR_PARENT_REVIEW + A5 AWAITING_REVIEW; G9) — rejected.
21. an already-authorized local gate is escalated to the parent merely for sandbox privilege (§11 item 5 E8.1 policy) — rejected.
22. a changed command, observable failure, surviving process, or mutation is accepted as automatic sandbox recovery (§11 item 5 recovery preconditions) — rejected.
23. parallel leaves overlap dependencies/resources or the next wave starts early (no waves authorized; §4 single sequential order; parent consequence 1) — rejected.
24. reopen of the parent-frozen cba5c096 ending digest as a decision (the §0 consequence is retained verbatim; only the mechanical digest reflects §7.3 formatting freedom, documented in §0) — rejected (kept the decision, reconciled the mechanical value).

## 16. Append-only amendment sections

Reserved for corrective sub-windows (`UA-W9-C001`, …) and further assessments (`UA-W9-I002`, …).
Each amendment repeats the §6–§9 block structure in full with a new ID, new baseline digest, cited
trigger evidence, and invalidated gates. Existing sections above are immutable after parent
approval.
