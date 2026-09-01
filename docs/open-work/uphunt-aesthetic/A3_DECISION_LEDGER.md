# Uphunt-aesthetic decision ledger (`A3`)

**Status:** locked choices for the visual package. Two remaining implementations for a listed decision would make the package unassignable.  
**Package status:** authoring complete; assignment is `A5` only.

Other artifacts: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A2` `A2_DISCOVERY_DOSSIER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`; `A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

D-ledger applicability for this presentation-only package is recorded after the decisions. `N/A` rows cite evidence that the concern is unreachable because write scope excludes durable/external mutation.

```yaml
decision_id: DEC-UA-001
requirement_ids: [REQ-UA-001]
locked_choice: Keep existing :root tokens. Do not add a dark canvas. Do not change --color-signal away from #c8f04b. Do not add a remote font.
evidence_ids: [SRC-UA-0010, SRC-UA-0021, SRC-UA-0022]
alternatives_rejected:
  - Invert the product to Uphunt #0D0D0D
  - Recolor signal to #A8E200
  - Add a second typeface
reason: Landing already matches Uphunt's lime/Inter family on paper; inversion would fight REQ-UA-001.
consequences: All windows restyle using existing CSS variables. No package.json font or UI-kit dependency.
derived_values: none
implementing_tasks: [UA-W2-T1]
verification_scenarios: [SCN-UA-001]
```

```yaml
decision_id: DEC-UA-002
requirement_ids: [REQ-UA-002, REQ-UA-007]
locked_choice: Reuse the landing headline recipe via a new file frontend/components/section-intro.tsx that exports SectionIntro with props { eyebrow?: ReactNode, title: ReactNode, copy?: ReactNode, inverse?: boolean }. landing-sections.tsx SHALL import that export and delete its local SectionIntro function. Information pages SHALL render <SectionIntro> or an element with className "marketing-heading" plus the same three children. Do not invent a third heading component.
evidence_ids: [SRC-UA-0011, SRC-UA-0012]
alternatives_rejected:
  - Enlarge .ds-section-header only and skip landing scale
  - Duplicate SectionIntro markup in every page
  - Dashboard captions (9–14px) as the information-page H2
reason: One recipe, landing type scale, no agent choice of heading system.
consequences: UA-W2 creates the file and migrates landing-sections. Later windows only import or apply .marketing-heading.
derived_values: CSS for .marketing-heading remains the source of type scale; section-intro.tsx SHALL set className "marketing-heading" and "is-inverse" when inverse is true.
implementing_tasks: [UA-W2-T2, UA-W2-T3, UA-W3-T2, UA-W4-T1, UA-W5-T1, UA-W6-T1, UA-W7-T1, UA-W8-T1, UA-W12-T1]
verification_scenarios: [SCN-UA-002]
```

```yaml
decision_id: DEC-UA-003
requirement_ids: [REQ-UA-002]
locked_choice: Headline copy is the following exact strings. Agents SHALL NOT paraphrase.
evidence_ids: [SRC-UA-0011]
alternatives_rejected:
  - Agent-authored marketing claims
  - Database nouns alone as H2 ("Flag Breakdown" as the only title)
reason: Copy is a product decision, not formatting freedom.
consequences: JSX text nodes must match.
derived_values: |
  Page titles (eyebrow | title | copy):
  /runs : Account workspace | Return to the searches you already started. | Continue keyword research or open the leads from an earlier market.
  /leads : Live lead workspace | Every shop you have already found, in one place. | One live record per store, with the evidence from every discovering run still attached.
  /keywords : Keyword research | See the phrases a market actually uses. | Start from seed phrases. Finish with a shortlist you are willing to search.
  /keywords/[researchId] result : Keyword intelligence | The landscape behind this market. | Active phrases, recommended targets, and the clusters that hold the demand.
  /sign-in : StoreSignal account | Welcome back. | Sign in to continue a pending search or return to earlier runs.
  /sign-up : StoreSignal account | Save your search. | Create an account to start the search you just prepared and keep every run in one place.
  /runs/[runId] completed : Lead discovery | The stores this search was able to stand behind. | Inspect the evidence, then keep the prospects worth approaching.
  /runs/continue : Preparing run | Your search is being prepared. | Continue when the next step is ready.
  Query editor : Search plan | Shape the searches before discovery starts. | Review, edit, or add queries, then start when the direction feels right.
  Run progress : Discovery | StoreSignal is looking for matching stores. | The stages and counts below are the existing run status.
  AuthForm already has H1 "Welcome back" / "Save your search"; UA-W3 maps those to SectionIntro without changing auth logic.
  404 : 404 · Not found | That lead run does not exist. | The address may be incomplete, or the run ID may be invalid.
implementing_tasks: [UA-W3-T2, UA-W6-T1, UA-W7-T1, UA-W7-T2, UA-W8-T1, UA-W12-T1]
verification_scenarios: [SCN-UA-002]
```

```yaml
decision_id: DEC-UA-004
requirement_ids: [REQ-UA-004]
locked_choice: LeadDetails section headlines are exact. Keep four groups and field set. Remove dense-compression CSS owned by UA-W9–UA-W11. Fact-grid columns at viewport >=1024px are 3 maximum. Type floor label 12px, value 14px.
evidence_ids: [SRC-UA-0014, SRC-UA-0015]
alternatives_rejected:
  - New /leads/[id] route
  - Dropping nested evidence because it looks repetitive
  - Keeping 0.5rem H3 and 8-column identity grids
reason: Extra care on the ugliest lead surface; expansion-in-row stays.
consequences: globals.css dense-lead rules listed in UA-W9 shared-file symbols are replaced, not supplemented.
derived_values: |
  01 eyebrow 01 · The store | Know the business behind this domain. | Score, identity, and the outreach paths that were actually recorded.
  Inner H3 Strength | Why this lead sits where it does.
  Inner H3 Identity | The storefront StoreSignal resolved.
  Inner H3 Reachability | A real way in, if one was found.
  02 eyebrow 02 · Attention | Where this store already appears in search. | Visibility estimates, not private storefront analytics.
  03 eyebrow 03 · Fit | Whether this shop belongs in the market you asked for. | Exact input, normalized category, and the store-fit evidence behind the call.
  04 eyebrow 04 · Provenance | How this store entered the list. | Query, rank, and the occurrences that produced this row.
  Padding for .lead-details .detail-section becomes padding: var(--space-6) var(--space-5); gap between sections var(--space-5).
implementing_tasks: [UA-W9-T1, UA-W9-T2, UA-W10-T1, UA-W11-T1]
verification_scenarios: [SCN-UA-003]
```

```yaml
decision_id: DEC-UA-005
requirement_ids: [REQ-UA-003]
locked_choice: Keyword research result stacks sections in this exact order after filters. Each chart/table is full width. Desktop grids for .overviewSignals and .charts are 1fr. .chartPair is display:block. Heights are exact.
evidence_ids: [SRC-UA-0016, SRC-UA-0017, SRC-UA-0018]
alternatives_rejected:
  - Keep four-up overviewSignals
  - Keep two-up .charts / display:contents chartPair
  - Hide any existing chart
  - Change Chart.js dataset math
reason: Extra care; not a dashboard; headlines for readability.
consequences: chart-panels.tsx wraps each chart in a section with SectionIntro; keyword-dashboard.module.css updates layout/heights only.
derived_values: |
  Order:
  1. Page SectionIntro (DEC-UA-003) plus existing selection review
  2. Treemap chart:treemap — Demand map | See which clusters hold the search demand. | Cluster size is the share of filtered volume, not a ranking of quality. Wrap height 520px.
  3. Globe (existing KeywordMarketGlobe / TrafficMarketExplorer in research-dashboard) — Market lens | The same keywords, nine markets. | Move between worldwide and country views without leaving this research. Min-height 520px.
  4. chart:seeds — Seed phrases | Which starting phrases actually pulled weight. | Volume split into recommended, declining, and remaining keywords. Wrap 420px.
  5. Cluster landscape — Clusters | Related phrases, grouped so you can choose a lane. | Select a cluster to inspect its volume, CPC, and mix.
  6. chart:intent — Intent | What people mean when they search these phrases. | Share of active keywords by search-intent label. Wrap 360px.
  7. chart:recommended — Recommendation | What the pipeline would keep, and what it would drop. | Recommendation status for the active set, not a new score. Wrap 360px.
  8. chart:histogram — Opportunity | Where the scores actually sit. | Active keywords in 10-point buckets from 0–10 through 90–100. Wrap 360px.
  9. chart:flags — Quality flags | The warnings attached to this set. | Declining traffic, too-broad phrases, and too-little traffic. Wrap 360px.
  10. Existing overlap panel — Overlap | Phrases that may be counting the same demand twice. | Variants that share metrics and monthly history.
  11. chart:history — History | How volume moved, month by month. | Combined history for the filtered set, or one keyword at a time. Wrap 420px.
  12. chart:top-keywords — Volume and trend | The phrases, their volume, and whether they are rising. | Columns are volume. The line is seasonality-adjusted momentum. Wrap 420px.
  13. chart:cluster-volume — Cluster volume | Combined search volume, cluster by cluster. | Sorted by volume. Color is share of the filtered total. Wrap 380px.
  14. chart:bubble — Difficulty | High demand is not the same as an easy phrase. | Each bubble is a keyword: volume, difficulty, CPC, commercial intent. Wrap 420px.
  15. chart:scatter — Competition | Low competition, high opportunity — if that quadrant exists here. | Each point is a keyword on competition versus opportunity score. Wrap 420px.
  16. Keyword table — Shortlist | Every active phrase, ready to inspect and keep. | Sort, filter, and select without leaving the evidence above.
  Selection review H2 stays "Recommended keywords, ready for your final edit."
  Filter bar remains sticky; it is not a KPI strip of four charts.
implementing_tasks: [UA-W12-T1, UA-W12-T2, UA-W13-T1, UA-W13-T2, UA-W14-T1]
verification_scenarios: [SCN-UA-004]
```

```yaml
decision_id: DEC-UA-006
requirement_ids: [REQ-UA-005, INV-UA-001]
locked_choice: Presentation-only. Forbidden write paths include frontend/app/api/**, frontend/lib/api-types.ts, frontend/lib/api-validation.ts, frontend/lib/client-api.ts, email_scraper/**, Prisma, AWS template, root ACTIVE_EXECUTION_STATE.md.
evidence_ids: [SRC-UA-0024]
alternatives_rejected:
  - Drive layout from new API fields
  - Deduplicate lead evidence in this package
reason: Requester locked aesthetic-only.
consequences: Window write scopes omit those paths. Diff handoff fails if they appear.
derived_values: none
implementing_tasks: [UA-W1-T1]
verification_scenarios: [SCN-UA-005]
```

```yaml
decision_id: DEC-UA-007
requirement_ids: [REQ-UA-008]
locked_choice: Fifteen sequential parent windows UA-W1..UA-W15. Default assignment is one window. may_start_successor is false. After a window is assigned, the window agent decomposes it under the sub-window standard into one-file leaves. globals.css overlap is symbol-specific per window as listed in A4.
evidence_ids: [SRC-UA-0002]
alternatives_rejected:
  - One parent window for the whole site
  - Parallel parent windows sharing globals.css
  - Reusing G1–G12 or KI-W* IDs
reason: Parent standard window bounds plus single-file sub-window decomposability.
consequences: Sequential DAG. Sub-window IDs are UA-Wn-S00x and are not authored until a window agent is assigned.
derived_values: Window list in A4 F1 headers.
implementing_tasks: [UA-W1-T1]
verification_scenarios: [SCN-UA-006]
```

```yaml
decision_id: DEC-UA-008
requirement_ids: [REQ-UA-006]
locked_choice: Do not add a global * { transition }. Keep existing reduced-motion and :focus-visible rules. New CSS transitions only on owned interactive selectors already using .ds-button pattern.
evidence_ids: [SRC-UA-0025]
alternatives_rejected:
  - Uphunt shine/float animations on every heading
reason: Accessibility invariant.
consequences: UA-W2 and UA-W15 verify reduced-motion still matches design-system-primitives.test.ts assertions.
derived_values: none
implementing_tasks: [UA-W2-T1, UA-W15-T1]
verification_scenarios: [SCN-UA-001]
```

```yaml
decision_id: DEC-UA-009
requirement_ids: [REQ-UA-005]
locked_choice: Preserve existing Chart.js registration, tooltip callbacks, and data-surface attributes. Empty-state copy already in chart-panels.tsx stays.
evidence_ids: [SRC-UA-0017]
alternatives_rejected:
  - Replacing Chart.js with another library
  - Dropping empty-state divs
reason: Visual layout only.
consequences: UA-W13 may wrap canvases but must keep data-surface values byte-for-byte.
derived_values: data-surface list in SRC-UA-0017
implementing_tasks: [UA-W13-T1]
verification_scenarios: [SCN-UA-004]
```

```yaml
decision_id: DEC-UA-010
requirement_ids: [REQ-UA-004]
locked_choice: Collapsed results table rows stay the index. Expansion shell in results-table.tsx remains a following tr.detail-row. UA-W8 restyles the collapsed row and shell only; UA-W9–W11 restyle LeadDetails internals.
evidence_ids: [SRC-UA-0014]
alternatives_rejected:
  - Modal or separate lead page
reason: No functional routing change.
consequences: Exact component split across windows.
derived_values: none
implementing_tasks: [UA-W8-T2, UA-W9-T1]
verification_scenarios: [SCN-UA-003]
```

```yaml
decision_id: DEC-UA-011
requirement_ids: [REQ-UA-005]
locked_choice: Coverage cases live in frontend/test/uphunt-aesthetic-coverage.test.ts using node:test. UA-W1 creates that file with the COMPLETE frozen REQUIRED_CASE_IDS array equal to A4 §Coverage (43 IDs). Later windows MUST NOT append IDs to that array. The file exports listRequiredCaseIds(): string[] returning a copy, coverageDigest(ids) implementing parent-standard E6, recordExecuted(id: string): void that merges into frontend/test/.ua-executed.json, and getExecuted(): string[] that reads that file. A UA-W1 test CASE-UA-W1-002 asserts coverageDigest(listRequiredCaseIds()) equals the A4 pinned digest. Each later window owns frontend/test/uphunt-aesthetic-wN.test.ts containing one test() per allocated CASE ID; after that case's activation witness and oracle succeed, the test calls recordExecuted("CASE-UA-Wn-00x"). Executed-set equality is asserted only by frontend/test/ua-coverage-equality.mjs (UA-W15), which is not in the npm test glob. npm test glob test/*.test.ts remains.
evidence_ids: [SRC-UA-0019]
alternatives_rejected:
  - Nested test directory that npm test would miss
  - Inferring case IDs from test titles only
  - Later windows mutating REQUIRED_CASE_IDS
reason: Existing runner glob; E6 registration must be an enumerable list frozen before later visual edits.
consequences: UA-W1 writes the complete registry and JSON-file executed-set helpers. Later windows only import recordExecuted in their own test files. UA-W15 creates `frontend/test/ua-coverage-equality.mjs` (not in the npm test glob) and runs it after `npm test`.
derived_values: |
  Executed-set path: frontend/test/.ua-executed.json (generated, untracked).
  Digest algorithm per standard E6.
  Required IDs and digest pinned in A4 §Coverage and A6 EV-UA-A-009.
  UA-W15 equality command sequence from frontend/: rm -f test/.ua-executed.json ; npm test ; node --experimental-strip-types test/ua-coverage-equality.mjs
implementing_tasks: [UA-W1-T1, UA-W1-T2, UA-W15-T2]
verification_scenarios: [SCN-UA-006]
```

```yaml
decision_id: DEC-UA-012
requirement_ids: [REQ-UA-007]
locked_choice: Landing hero and lower sections remain in scope. UA-W4 and UA-W5 only apply grammar consistency (SectionIntro already present; spacing/card hairlines) without changing LandingHeroCopy or LandingProcess copy strings except where they already equal DEC-UA-003.
evidence_ids: [SRC-UA-0011]
alternatives_rejected:
  - Skip landing because it is "good enough"
reason: Whole-site contract.
consequences: Light-touch windows, still mandatory.
derived_values: none
implementing_tasks: [UA-W4-T1, UA-W5-T1]
verification_scenarios: [SCN-UA-002]
```

```yaml
decision_id: DEC-UA-013
requirement_ids: [INV-UA-007]
locked_choice: Every window preflight records git status --short from frontend/ and coordination root, and refuses to revert unowned paths.
evidence_ids: [SRC-UA-0001]
alternatives_rejected:
  - Treating the relocation-state worktree as disposable
reason: Workspace rule.
consequences: Handoff includes before/after status.
derived_values: none
implementing_tasks: [UA-W1-T1]
verification_scenarios: [SCN-UA-005]
```

## D1–D13 applicability

| Ledger | Disposition | Evidence |
|---|---|---|
| D1 Interface | Exact: SectionIntro props in DEC-UA-002; no other new public exports required. Existing component props unchanged. | DEC-UA-002 |
| D2 Persistence | N/A unreachable. No Prisma/schema writes. | SRC-UA-0024 DEC-UA-006 |
| D2A Storage isolation | N/A for product. Frontend tests use in-memory render/string CSS reads; no TEST_DATABASE_URL. | SRC-UA-0019 |
| D3 Identity | Preserve existing user/run/lead/research IDs; no substitution. | REQ-UA-005 |
| D4 Concurrency | N/A new shared mutable resource. Existing expansion state in ResultsTable remains local React state. | SRC-UA-0014 |
| D5 Payload | No new payload. Consumed UI props are existing parsed types. Unknown-field policy unchanged (Zod already in API layer, not edited). | DEC-UA-006 |
| D6 External | No new provider calls. Chrome screenshots are local. | SRC-UA-0020 |
| D7 Configuration | No new env. Preserve designFixtureEnabled gate. | design-fixture-gate.ts |
| D8 Control-plane | Presentation paths listed in A4; status mapping unchanged. | REQ-UA-007 |
| D9 Build | next 16.2.12 existing closure. No new dependency. PROVISIONAL not used. | SRC-UA-0022 |
| D10 Environment | Local chrome path observed. Production canary parked. | SRC-UA-0020 SRC-UA-0090 |
| D11 Scale | Existing keyword row counts; wrap heights locked. No new O(n) queries. | DEC-UA-005 |
| D12 Compatibility | Replace owned CSS in place. Do not support a compact-lead mode flag. | DEC-UA-004 |
| D13 Observability | No new logging of contact values. | INV-UA-009 |

## Scenarios

```yaml
scenario_id: SCN-UA-001
requirements: [REQ-UA-001, REQ-UA-006]
decisions: [DEC-UA-001, DEC-UA-008]
preconditions: frontend/app/globals.css :root tokens present
inputs: file read of globals.css and primitives.tsx
actions: run owned token/reduced-motion tests
activation_witnesses: test "G2 exposes the required semantic token vocabulary" and UA CASE-UA-W2-001
oracle: tokens unchanged; reduced-motion rule present; no * transition
call_and_operation_counts: 0 network
negative_control: NC-UA-001 remove --color-signal definition makes CASE-UA-W2-001 fail
parity_class: unit
cleanup: none
```

```yaml
scenario_id: SCN-UA-002
requirements: [REQ-UA-002, REQ-UA-007]
decisions: [DEC-UA-002, DEC-UA-003, DEC-UA-012]
preconditions: SectionIntro exists after UA-W2
inputs: renderToStaticMarkup of owned pages/components
actions: assert exact headline strings and marketing-heading class
activation_witnesses: CASE-UA-W3-001 through CASE-UA-W12-001 as allocated
oracle: exact copy; class marketing-heading present
call_and_operation_counts: 0 network
negative_control: NC-UA-002 delete SectionIntro title node fails the case
parity_class: component
cleanup: none
```

```yaml
scenario_id: SCN-UA-003
requirements: [REQ-UA-004]
decisions: [DEC-UA-004, DEC-UA-010]
preconditions: denseLead fixture from frontend/test/fixtures.ts
inputs: render LeadDetails and ResultsTableView
actions: expand row; assert four groups, field presence, no 0.5rem rule in owned CSS
activation_witnesses: CASE-UA-W9-001 CASE-UA-W10-001 CASE-UA-W11-001
oracle: type-floor CSS; <=3 fact-grid columns in owned rules; all current fields still in markup
call_and_operation_counts: 0 network
negative_control: NC-UA-003 restore 0.5rem h3 rule fails CASE-UA-W9-002
parity_class: component
cleanup: none
```

```yaml
scenario_id: SCN-UA-004
requirements: [REQ-UA-003]
decisions: [DEC-UA-005, DEC-UA-009]
preconditions: ResearchDashboard source after UA-W13
inputs: file read of keyword-dashboard.module.css and chart-panels.tsx
actions: assert grid 1fr, chartPair display block, wrap heights, data-surface list, section order
activation_witnesses: CASE-UA-W13-001 CASE-UA-W13-002
oracle: no 4-column overviewSignals; all 11 data-surface chart ids present; heights match DEC-UA-005
call_and_operation_counts: 0 network
negative_control: NC-UA-004 set .charts to repeat(2, minmax(0, 1fr)) fails CASE-UA-W13-001
parity_class: unit
cleanup: none
```

```yaml
scenario_id: SCN-UA-005
requirements: [REQ-UA-005]
decisions: [DEC-UA-006, DEC-UA-013]
preconditions: window handoff diff
inputs: git diff --name-only
actions: assert changed files ⊆ authorized write scope
activation_witnesses: CASE-UA-W1-001
oracle: api/ lib/api-*.ts email_scraper/ ACTIVE_EXECUTION_STATE.md unchanged
call_and_operation_counts: 0
negative_control: NC-UA-005 a forbidden path in the diff fails handoff
parity_class: unit
cleanup: none
```

```yaml
scenario_id: SCN-UA-006
requirements: [REQ-UA-008]
decisions: [DEC-UA-007, DEC-UA-011]
preconditions: coverage registry file
inputs: listRequiredCaseIds()
actions: digest equality required=registered; executed set filled by each test
activation_witnesses: CASE-UA-W1-002
oracle: E6 set equality; duplicate/skip fail
call_and_operation_counts: 0
negative_control: NC-UA-006 omit one ID from executed set fails registry test
parity_class: unit
cleanup: none
```
