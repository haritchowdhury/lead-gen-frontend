# Uphunt-aesthetic discovery dossier (`A2`)

**Status:** observed facts only. Inferred notes are labeled and MUST NOT enter `A1`, `A3`, or `A4`.  
**Inspected at:** 2026-09-01.  
**Environment:** local workspace `/home/harit/Email Scrapper`, frontend nested tree `frontend/`.  
**Privacy:** no credentials, customer payloads, or raw provider bodies recorded.

Other artifacts: `A1` `A1_LOCKED_PRODUCT_CONTRACT.md`; `A3` `A3_DECISION_LEDGER.md`; `A4` `A4_EXECUTION_CHECKLIST.md`; `A5` `A5_ACTIVE_EXECUTION_STATE.yaml`; `A6` `A6_EVIDENCE_LOG.md`; `A7` `A7_SPECIFICATION_CHANGELOG.md`; `A8` `A8_TRACEABILITY_INDEX.md`.

## Working-tree inventory

```yaml
evidence_id: SRC-UA-0001
classification: OBSERVED
claim: Coordination-root git status on 2026-09-01 showed untracked docs/UPHUNT_AESTHETIC_TRANSLATION_ANALYSIS.md; frontend nested status was otherwise clean of this package. Root ACTIVE_EXECUTION_STATE.md remains the Keyword Intelligence/AWS assignment and is outside this package.
source: git -C "/home/harit/Email Scrapper" status --short; git -C "/home/harit/Email Scrapper/frontend" status --short
observed_at: 2026-09-01
environment: local
limitations: Nested-repo relocation state can make root and frontend status differ; agents must re-inventory at window start.
privacy: no secrets
```

```yaml
evidence_id: SRC-UA-0002
classification: OBSERVED
claim: Parent authoring standard revision is cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848. Sub-window standard revision is 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0.
source: sha256sum of PROJECT_AGNOSTIC_DECISION_COMPLETE_CHECKLIST_AUTHORING_STANDARD.md and PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md
observed_at: 2026-09-01
environment: local
limitations: none
privacy: n/a
```

## Presentation sources

```yaml
evidence_id: SRC-UA-0010
classification: OBSERVED
claim: Design tokens live in frontend/app/globals.css :root including --color-canvas #f4f3ed, --color-surface #fffefa, --color-ink #12231e, --color-signal #c8f04b, --font-sans Inter stack.
source: frontend/app/globals.css lines 3-24
observed_at: 2026-09-01
environment: local source
limitations: later lines override some shell measurements
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0011
classification: OBSERVED
claim: Landing SectionIntro renders eyebrow, h2, and copy. Marketing H2 is clamp(36px, 4.5vw, 59px).
source: frontend/components/landing-sections.tsx SectionIntro; frontend/app/globals.css .marketing-heading h2
observed_at: 2026-09-01
environment: local source
limitations: none
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0012
classification: OBSERVED
claim: Shared primitives Button, Card, Badge, Metric, SectionHeader, EmptyState exist in frontend/components/ui/primitives.tsx. SectionHeader already has eyebrow, title, description, action.
source: frontend/components/ui/primitives.tsx
observed_at: 2026-09-01
environment: local source
limitations: ds-section-header type scale is smaller than .marketing-heading
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0013
classification: OBSERVED
claim: Routes are app/page.tsx, sign-in, sign-up, runs, runs/continue, runs/[runId], leads, keywords, keywords/[researchId], design-fixture, not-found.
source: frontend/app/**/page.tsx glob
observed_at: 2026-09-01
environment: local source
limitations: design-fixture is gated
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0014
classification: OBSERVED
claim: Individual leads render via ResultsTable expanded row calling LeadDetails. Groups are overview, TrafficEnrichmentDetails, StoreEvidence, DiscoveryDetails.
source: frontend/components/results-table.tsx; frontend/components/lead-details.tsx export function LeadDetails
observed_at: 2026-09-01
environment: local source
limitations: no /leads/[id] route
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0015
classification: OBSERVED
claim: Dense lead CSS sets .lead-details .detail-section > h3 to 0.5rem and overview identity fact-grid to repeat(8, minmax(0, 1fr)).
source: frontend/app/globals.css comment "Dense lead expansion" near line 7507 and following rules
observed_at: 2026-09-01
environment: local source
limitations: earlier non-dense .lead-details rules also exist around line 2437
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0016
classification: OBSERVED
claim: Keyword result page mounts ResearchDashboard. ChartPanels exposes seedPerformance, heatmapPanel, overviewSignals, historyPanel, analysisCharts. Overview signals are four chartCards. analysisCharts uses .charts two-column grid and .chartPair { display: contents }.
source: frontend/components/keyword-intelligence/research-dashboard.tsx; chart-panels.tsx; keyword-dashboard.module.css .overviewSignals, .charts, .chartWrap, .chartPair
observed_at: 2026-09-01
environment: local source
limitations: module CSS is scoped; globals.css does not own these chart grids
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0017
classification: OBSERVED
claim: Chart canvases use data-surface chart:seeds, chart:intent, chart:recommended, chart:histogram, chart:flags, chart:history, chart:treemap, chart:top-keywords, chart:cluster-volume, chart:bubble, chart:scatter.
source: frontend/components/keyword-intelligence/chart-panels.tsx
observed_at: 2026-09-01
environment: local source
limitations: none
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0018
classification: OBSERVED
claim: Chart wrap heights include .overviewSignals .chartWrap 220px, .chartWrap 255px, .chartWrap.tall 380px, .topKeywordsChart 300px, .keywordHeatmapChart min-height 330px.
source: frontend/components/keyword-intelligence/keyword-dashboard.module.css
observed_at: 2026-09-01
environment: local source
limitations: none
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0019
classification: OBSERVED
claim: Frontend tests run via npm test as node --experimental-strip-types --test test/*.test.ts. Existing visual tests include design-system-*.test.ts and lead-details-component.test.ts. They do not currently register CASE-UA-* IDs.
source: frontend/package.json scripts.test; frontend/test/*.test.ts
observed_at: 2026-09-01
environment: local source
limitations: test glob is test/*.test.ts only, not nested directories unless the glob is changed in UA-W1
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0020
classification: OBSERVED
claim: google-chrome is present at /usr/bin/google-chrome. frontend/package.json has test:browser:real-components.
source: which/ls /usr/bin/google-chrome; frontend/package.json
observed_at: 2026-09-01
environment: local
limitations: headless capture of uphunt.io was previously rejected by environment policy when videos were involved; StoreSignal local pages do not require that fetch
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0021
classification: OBSERVED
claim: Uphunt homepage uses theme-color #0D0D0D, accent #A8E200, Inter, stacked sections with eyebrow plus large H2, lime primary buttons, hairline cards. Forced dark on / and /auth.
source: https://uphunt.io/ HTML 2026-09-01 (theme-color, class names, hero.tsx/how-it-works-steps.tsx source-file attributes)
observed_at: 2026-09-01
environment: public HTTP
limitations: dashboard app routes were not authenticated; public marketing pages only
privacy: no credentials stored
```

```yaml
evidence_id: SRC-UA-0022
classification: OBSERVED
claim: Next.js 16.2.12, React 19.2.4, Tailwind 4, Chart.js 3.9.1, chartjs-chart-treemap 2.0.0 are frontend dependencies.
source: frontend/package.json
observed_at: 2026-09-01
environment: local source
limitations: none
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0023
classification: OBSERVED
claim: Negative search — no /leads/[leadId] page.tsx exists. Lead identity UI uses results-table expansion.
source: glob frontend/app/leads/**/page.tsx
observed_at: 2026-09-01
environment: local source
limitations: none
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0024
classification: OBSERVED
claim: Negative search — this package does not own email_scraper Prisma schema, AWS template, or root ACTIVE_EXECUTION_STATE.md.
source: path inspection; ACTIVE_EXECUTION_STATE.md current_window KI-W8
observed_at: 2026-09-01
environment: local source
limitations: none
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0025
classification: OBSERVED
claim: G2 primitive tests already assert token names, three elevation roles, reduced-motion, and native button/input/details semantics.
source: frontend/test/design-system-primitives.test.ts
observed_at: 2026-09-01
environment: local source
limitations: does not assert information-page headline scale
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0026
classification: OBSERVED
claim: LeadDetails component tests compile lead-details.tsx and results-table.tsx with the denseLead and lead fixtures from frontend/test/fixtures.ts.
source: frontend/test/lead-details-component.test.ts
observed_at: 2026-09-01
environment: local source
limitations: markup assertions, not computed CSS px
privacy: n/a
```

## Phase B inventories (reachability for this visual package)

| Set | Result | Evidence |
|---|---|---|
| 1 Product entry points | Routes in SRC-UA-0013 plus AppHeader on all pages | SRC-UA-0013 |
| 2 Caller graph | Presentation components listed in A4 write scopes; API routes not in write scope | SRC-UA-0014 SRC-UA-0016 |
| 3 Cross-module payloads | Existing Lead, ResearchResult, RunStatus types consumed as already parsed; no new payload | SRC-UA-0026 |
| 4 Durable models | Unreachable for write; parked | SRC-UA-0024 |
| 5 Identities/auth | HeaderAuth/sessionUserId preserved, not rewritten | app-header.tsx HeaderAuth |
| 6 External ops | No new network from visual CSS/JSX. Browser evidence is local chrome. | SRC-UA-0020 |
| 7 Async/retry | Run polling owned by run-workspace; visual windows must not edit polling | run-workspace.tsx |
| 8 Locks/leases | Unreachable | SRC-UA-0024 |
| 9 Config/secrets | No new env vars | package.json |
| 10 Build closure | next build; no new runtime dependency allowed | SRC-UA-0022 REQ-UA-001 INV-UA-008 |
| 11 Infra | Not this package | SRC-UA-0024 |
| 12 Tests/fixtures | test/*.test.ts plus UA-W1 nested glob decision | SRC-UA-0019 |
| 13 Monitoring | No new logs of private fields | INV-UA-009 |
| 14 Control-plane presentation | All information pages | REQ-UA-007 |
| 15 Historical formats | CSS class rename only inside owned selectors | A1 §6 |
| 16 Scale loops | Chart.js already renders existing datasets; no new per-domain queries | INV-UA-010 |

## Unknowns

```yaml
evidence_id: SRC-UA-0090
classification: DEFERRED_GATE
claim: Exact live production pixels are not this package's acceptance. Local source tests plus named browser evidence in each window are the gate. Production visual canary is parked.
source: A1 §6; no production inspection in this authoring session
observed_at: 2026-09-01
environment: n/a
limitations: taste remains parent-review after UA-W15
privacy: n/a
```

```yaml
evidence_id: SRC-UA-0091
classification: PARKED
claim: Authenticated Uphunt app dashboard UI was not observed and is not a contract.
source: no /dashboard fetch
observed_at: 2026-09-01
environment: public web
limitations: none
privacy: n/a
```

## Inferred, not contractual

- Users who like Uphunt like lime-on-dark marketing; StoreSignal already has lime-on-paper landing. Not a requirement.
- Nested test directory may be cleaner than adding many files to test/*. Coverage file placement is DEC-UA-011, not this inference.
