# StoreSignal visual-system execution checklist

**Status:** READY FOR SEQUENTIAL EXECUTION  
**Authority:** This file is the sole implementation checklist for the StoreSignal visual-system migration.  
**Parent reviewer:** Root/parent agent. Implementation agents may complete only their assigned window and may not declare the migration complete.  
**Execution model:** G1 through G12 are sequential. Do not parallelize windows because they share the global style system and later windows consume earlier visual contracts.

## 1. Source of truth

Fresh implementation agents must be able to work from the current repository and this checklist without conversation history.

### Authoritative execution contract

1. `DESIGN_SYSTEM_EXECUTION_CHECKLIST.md` — authoritative scope, order, invariants, ownership, and acceptance.
2. `AGENTS.md` — mandatory Next.js 16.2.12 instructions.

### Supporting design research

1. `DESIGN_SYSTEM_MIGRATION_PLAN.md` — design audit and rationale. It is supporting research; this checklist resolves any ambiguity.
2. `/home/harit/Sportz67/app/page.tsx` — landing-page composition reference.
3. `/home/harit/Sportz67/app/components/sports-hub/SportsHub.tsx` — dense dashboard hierarchy reference.
4. `/home/harit/Sportz67/app/components/worldcup-country/CountryPageView.tsx` — dense detail-page reference.
5. `/home/harit/Sportz67/app/components/scanner/CompactGameCard.tsx` — expandable-card reference.
6. `/home/harit/Sportz67/app/components/loading/DashboardLoadingShell.tsx` — loading-state reference.
7. `/home/harit/Sportz67/app/components/ui/Card.tsx` and `Button.tsx` — primitive boundaries.

The Sportz67 files are read-only references. Do not edit that repository and do not copy its sports content, branding, or unreasonably small text.

### Historical evidence, not current authority

- `review-evidence/` records earlier implementation behavior and may be used to locate regression-sensitive states.
- Prior handoffs and screenshots do not override this checklist or current source.
- Conversation history is not an execution input.

## 2. Locked product outcome

Translate Sportz67's restrained, high-contrast, compact visual grammar into StoreSignal while preserving StoreSignal's forest-and-lime identity and every existing behavior and user-visible data contract.

The completed product must feel like one system across:

- public landing page;
- query-review replica landing page;
- authentication and run history;
- query-planning and discovery loaders;
- completed-run overview and cumulative traffic globe;
- filters and collapsed result rows;
- expanded lead overview;
- contact evidence disclosure;
- category vocabulary;
- structured store-fit evidence;
- discovery occurrences and provenance;
- individual traffic analysis;
- loading, empty, partial, error, and missing-data states.

### Explicit exclusions

- No backend or API contract changes.
- No database, schema, migration, authentication, authorization, polling, or deployment changes.
- No changes to query generation, lead qualification, scoring, aggregation, traffic calculations, sorting, filtering, pagination, or CSV contents.
- No invented addresses, contact details, customer logos, testimonials, usage numbers, pricing, certifications, compliance claims, or performance claims.
- No removal or reinterpretation of lead evidence because it appears visually repetitive. Data deduplication requires a separate product/data audit.
- No redesign of Sportz67 and no direct reuse of its brand-specific assets.
- No broad framework conversion or speculative dependency installation.
- Do not add a remote font dependency during this migration. Preserve the current sans stack and improve typography through explicit roles, sizes, weights, and spacing.

### Parked work

- Backend-generated aggregate traffic endpoints.
- Additional marketing claims or new landing-page product promises.
- Dark mode.
- New analytics, tracking, monitoring, or external services.
- Replacing the existing globe implementation.

## 3. Observed current state

The parent observed the following directly from current source on 2026-08-03:

- The application is Next.js `16.2.12`, React `19.2.4`, and Tailwind `4`, but most StoreSignal presentation is custom global CSS.
- `app/globals.css` contains approximately 4,273 lines and 183 distinct literal hexadecimal colors.
- Required application text appears at 6–9px in several expanded-evidence and traffic selectors.
- The results row expands through `components/results-table.tsx` into `components/lead-details.tsx`.
- Lead overview contains store identity, score semantics, outreach evidence, and an outcome disclosure.
- Contact evidence, category intent, store-fit evidence, and discovery occurrences use nested `details`/`summary` disclosures.
- Traffic presentation is shared across `components/traffic-globe.tsx`, `components/traffic-enrichment.tsx`, `components/cumulative-traffic.tsx`, and expanded lead details.
- Query, run, and result state polling lives in `components/run-workspace.tsx`; it must not be visually refactored into different state logic.
- Google Chrome is available at `/usr/bin/google-chrome`.
- Existing browser-evidence conventions exist under `review-evidence/`.
- The worktree already contains intended modified and untracked files. These changes belong to the user and must not be reverted, replaced wholesale, or treated as disposable baseline code.

### Inferred, not contractual

- The user prefers Sportz67's overall finish because of its compositional discipline rather than any single color or component.
- A smaller token vocabulary should improve consistency, but no numeric token reduction is itself a user-visible acceptance criterion.

### Unknowns and handling

- Exact runtime data availability varies by local authentication/backend state. G1 must establish deterministic synthetic browser fixtures or record an exact blocker before visual implementation begins.
- The final aesthetic remains subject to user taste. Browser evidence and parent review are required; passing lint alone never proves visual acceptance.
- Live production appearance is not claimed unless production is actually inspected. Local deterministic acceptance must remain separate from live verification.

## 4. Cross-window safety invariants

Every agent must preserve all invariants, even when its window does not own the corresponding logic.

| ID | Invariant | Primary owner | Final proof |
|---|---|---|---|
| V1 | No API request, parser, backend proxy, authentication, or data contract changes | G1 baseline; all windows preserve | Parent source diff and tests |
| V2 | Query generation/edit/start behavior and pending-auth continuation remain unchanged | G4, G6 | Focused tests and browser flow |
| V3 | Run polling, reconnect behavior, real-time counters, and traffic progress remain unchanged | G6 | Source diff, deterministic state fixtures, browser evidence |
| V4 | Filtering, sorting, searching, pagination, expansion, and CSV export remain unchanged | G7, G8 | Tests and browser interaction evidence |
| V5 | Every currently presented non-duplicate evidence field remains available | G9–G11 | Fixture inventory, rendering tests, expanded screenshots |
| V6 | Missing, absent, zero, unavailable, partial, and unobserved remain visually and semantically distinct | G7, G9–G11 | Boundary fixtures and rendering tests |
| V7 | Resolved domain appears only when present; resolved storefront opens the resolved domain, not a product URL | G9 | Focused component test and browser link inspection |
| V8 | Unsupported countries are not clickable; market links and globe selections remain synchronized | G7, G11 | Interaction test and browser evidence |
| V9 | Nested tables/disclosures do not cause body overflow, giant empty columns, clipped content, or unreadable required text | G9–G12 | 390/768/1280/1440 evidence |
| V10 | Keyboard focus, disclosure semantics, labels, and reduced-motion behavior remain truthful | G2, G12 | Browser accessibility checks |
| V11 | Landing showcase globe displays no fabricated metrics; marketing makes no invented claims | G4, G5 | Source review and screenshots |
| V12 | User-owned dirty-worktree changes are preserved | Every window | Before/after status and scoped diff |

## 5. Global design contract

Agents may refine composition within their ownership boundary, but may not redefine these principles:

- Use one warm-neutral canvas, near-white cards, forest-black ink, restrained muted text, and lime only for primary/selected/qualified emphasis.
- Use pale green, amber, and red only as semantic state backgrounds; do not tint entire ordinary sections green.
- Use three elevation roles only: inset, normal card, and floating/popover.
- Prefer one outer module with dividers or inset groups over cards nested inside equally strong cards.
- Application modules use compact 12–20px padding and 8–16px gaps. Marketing sections may use broader spacing.
- Essential content must not depend on 6–9px text. Eyebrows/data labels target at least 10–11px; values target at least 12px.
- Marketing headings use sentence case and tight tracking. Application headings may use restrained uppercase micro-labels, not uppercase paragraphs.
- Controls in the same context share height, radius, focus treatment, and typography.
- Avoid fixed/minimum heights used only to force alignment or leave blank space.
- Motion must communicate entrance, expansion, progress, or selection and must honor reduced-motion preferences.
- Responsive layouts recompose into stacks; they must not merely shrink content.

## 6. Universal execution protocol

### Assignment text

The parent assigns a window using exactly this intent:

> Execute only Window Gx. Verify its dependencies before editing. Stay inside its ownership boundary. Add and run the required tests. Update only this window and its evidence. Stop after handoff. Do not begin the next window or perform final verification.

### Before editing

Every implementation agent must:

- read this checklist completely;
- read `AGENTS.md`;
- read every local Next.js guide named by its window completely before writing code;
- inspect `git status --short` and preserve all pre-existing changes;
- inspect the current owned components and their tests rather than relying on a prior handoff summary;
- confirm all dependencies are checked complete;
- stop if a required fixture, page state, or ownership boundary cannot be established without changing excluded functionality.

### Standard verification commands

Unless the window explicitly adds more, run from `frontend/`:

```text
npm run lint
npm test
npx tsc --noEmit
npm run build
git diff --check
```

If the sandboxed production build fails only because Turbopack cannot bind an internal port, rerun the same build with the required permission. Record existing Neon Auth static-render cookie diagnostics separately; do not misreport them as new failures or silently dismiss new warnings.

### Browser evidence standard

Store evidence below `review-evidence/design-system/Gx/` using deterministic synthetic `.example`/`.invalid` data only. Do not store credentials or customer data.

For each affected page/state, capture at least:

- `390x844`;
- `768x1024` when responsive composition changes;
- `1280x800`;
- `1440x900` for dense/expanded application layouts.

Each window must record machine-readable checks where applicable: viewport/body widths, overflow, disclosure expanded state, focus target, link `href`, selected country, visible labels, and bounding rectangles. A screenshot alone does not prove interaction behavior.

### Handoff standard

Create `review-evidence/design-system/Gx_HANDOFF.md` containing:

- objective and status;
- changed files;
- tests added/changed;
- exact commands and outcomes;
- browser evidence paths and fixture provenance;
- invariant checks;
- skipped checks and exact reasons;
- residual risks or user prerequisites;
- confirmation that later windows were not started.

Only the parent may check a window complete after reviewing source and evidence.

---

## G1 — Baseline, behavior inventory, and regression harness

**Status:** [ ] Not started  
**Token budget:** 14k  
**Objective:** Establish deterministic proof of the current behavior and difficult layout states before the visual system changes.

### Dependencies and preconditions

- None.
- Current dirty worktree must be treated as the baseline, not cleaned or reverted.

### Required reading

- This checklist and `DESIGN_SYSTEM_MIGRATION_PLAN.md`.
- `AGENTS.md`.
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`.
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`.
- Existing tests and all `review-evidence/*_HANDOFF.md` files relevant to results, traffic, and expanded evidence.
- `lib/api-types.ts`, `lib/api-validation.ts`, `test/fixtures.ts`.
- All routes under `app/`, and exported components under `components/`.

### Ownership

- May add test-only fixtures, browser harness scripts, and `review-evidence/design-system/G1/*`.
- May strengthen rendering/component tests without changing production behavior.
- May add a dev-only browser-test dependency only if deterministic capture cannot be achieved with `/usr/bin/google-chrome`; record the reason and lockfile change.

### Non-goals

- No production CSS or component redesign.
- No API, parser, backend, authentication, or data-model changes.

### Ordered tasks

- [ ] Record current route/page/state inventory and current interaction targets.
- [ ] Record the exact existing dirty-worktree file set in the handoff.
- [ ] Establish synthetic fixtures covering: long store/domain/URL, many category tokens, many contact items, multiple discovery occurrences, multiple store-fit items/pages, outcome evidence, resolved domain present/absent, zero traffic, missing traffic, partial traffic, and all tracked markets.
- [ ] Establish reproducible browser capture without live customer data.
- [ ] Capture current landing, query review, query loader, discovery loader, completed results, expanded lead, contact disclosure, nested store-fit/discovery disclosures, traffic selected/overall, run history, auth, empty, and error states when locally representable.
- [ ] Add regression assertions for interaction/data invariants V1–V9 where current coverage is absent and deterministic.
- [ ] Record genuinely unavailable states as gaps; do not fabricate proof.

### Adversarial verification

- Long unbroken URLs and domains.
- Zero versus absent values.
- Nested disclosure open inside an expanded result row.
- Horizontal result-table scrolling at 390px without body overflow.
- Resolved storefront URL target.
- Country link selection and reset to worldwide.
- Repeated open/close of the same lead.

### Required commands

- Standard verification commands.
- Focused test commands for every changed test file.
- Browser harness/capture command documented verbatim.

### Acceptance

- A fresh agent can reproduce the critical states without conversation history.
- Baseline evidence contains no secrets/customer data.
- No production behavior or presentation is intentionally changed.
- Every invariant has either deterministic baseline evidence or an explicit recorded gap.

### Stop condition

Write the G1 handoff and stop. Do not begin tokens or visual implementation.

---

## G2 — Semantic tokens and shared visual primitives

**Status:** [ ] Not started  
**Token budget:** 26k  
**Objective:** Create the compact visual vocabulary consumed by all later windows without broadly restyling pages.

### Dependencies

- G1 checked complete by the parent.

### Required reading

- G1 handoff and baseline inventory.
- Global design contract in this checklist.
- `AGENTS.md`.
- Next.js guides: server/client components and CSS.
- `app/globals.css`, `app/layout.tsx`, `components/icons.tsx`.
- Sportz67 `app/globals.css`, `app/components/ui/Card.tsx`, and `Button.tsx`.

### Ownership

- `app/globals.css` token and primitive layers.
- New presentation-only primitive components/files when justified.
- `components/icons.tsx` only for consistent size/stroke presentation; do not change icon meaning.

### Non-goals

- No wholesale page redesign.
- No remote font or icon dependency.
- No removal of legacy selectors unless proven unused in current source.

### Ordered tasks

- [ ] Define semantic canvas, surface, inset, ink, muted, line, signal, positive, warning, danger, and inverse tokens.
- [ ] Define type, spacing, radius, control-height, and three-level elevation tokens.
- [ ] Normalize primitives for buttons, icon buttons, badges, cards, inset groups, section headers, metrics, fields, notices, disclosures, skeletons, and empty states.
- [ ] Remove the global transition applied to every element; scope transitions to interactive selectors.
- [ ] Establish keyboard focus and reduced-motion base rules.
- [ ] Preserve legacy selectors for later bounded migration.
- [ ] Add a short token/primitive usage note to the G2 handoff so later agents do not invent alternatives.

### Adversarial verification

- Disabled, hover, focus-visible, active, loading, positive, warning, and danger states.
- Long button labels and narrow containers.
- Reduced-motion emulation.
- No layout movement on pages not yet migrated.

### Required commands

- Standard verification commands.
- G1 regression/browser checks for at least landing, results, and expanded lead to confirm no unintended broad shift.

### Acceptance

- Later windows can implement the design without adding new raw shadow/radius systems.
- Unmigrated pages remain behaviorally and materially visually intact.
- Essential base text remains readable and focus is visible.

### Stop condition

Write the G2 handoff and stop. Do not migrate application pages.

---

## G3 — Application shell, navigation, authentication, and run history

**Status:** [ ] Not started  
**Token budget:** 22k  
**Objective:** Make all low-risk application shells feel like one compact product using G2 primitives.

### Dependencies

- G2 checked complete.

### Required reading

- G1–G2 handoffs.
- `AGENTS.md`; Next.js CSS, linking/navigation, and server/client component guides.
- `app/layout.tsx`, `components/app-header.tsx`, `components/header-auth.tsx`.
- `components/auth-form.tsx`, `components/run-history.tsx`, `components/run-continuation.tsx`.
- `app/sign-in/page.tsx`, `app/sign-up/page.tsx`, `app/runs/page.tsx`, `app/not-found.tsx`.
- Sportz67 header, billing shells, and loading shells as read-only visual references.

### Ownership

- Files listed above and their component-scoped selectors in `app/globals.css`.
- Relevant tests and G3 evidence only.

### Non-goals

- No authentication client/server behavior changes.
- No run list fetching, paging, status-label, or link-target changes.
- No landing, query, result, or expanded-evidence work.

### Ordered tasks

- [ ] Refine header height, navigation hierarchy, brand treatment, responsive controls, and signed-in/out actions.
- [ ] Establish one application canvas and page-title composition.
- [ ] Redesign sign-in/sign-up without changing validation, submit behavior, redirects, or copy contract.
- [ ] Redesign run history rows, state chips, loading, pagination, and empty state.
- [ ] Bring continuation, not-found, and fatal-state shells into the same language.
- [ ] Verify all account and run links.

### Adversarial verification

- Signed in and signed out header states.
- Mobile header at 390px.
- Auth error, pending, long email, and password validation.
- Empty, one-page, and multi-page run history.
- Long run ID and every run state.

### Required commands

- Standard verification commands.
- Focused auth/run-history tests added for preserved behavior where absent.
- Browser evidence for header/auth/history at 390, 768, and 1280.

### Acceptance

- All owned pages visibly share one shell and primitive system.
- Navigation, authentication, pagination, and redirects match G1 behavior.
- No horizontal body overflow at 390px.

### Stop condition

Write the G3 handoff and stop.

---

## G4 — Landing hero, globe composition, primary form, and query-review hero

**Status:** [ ] Not started  
**Token budget:** 28k  
**Objective:** Finish the main marketing composition and make query review a true continuation of it.

### Dependencies

- G3 checked complete.

### Required reading

- G1–G3 handoffs.
- `AGENTS.md`; Next.js CSS, Link, and server/client component guides.
- `app/page.tsx`, `components/landing-sections.tsx`, `components/run-form.tsx`, `components/query-editor.tsx`, `components/run-workspace.tsx`, `components/traffic-globe.tsx`.
- Sportz67 landing hero and dashboard-preview composition.

### Ownership

- Hero-only portions of the listed components.
- Landing/query form presentation and hero/showcase globe presentation.
- Corresponding selectors, tests, and G4 evidence.

### Non-goals

- Do not change form validation, submit payloads, query mutations, order, removal, or start behavior.
- Do not change globe geometry/data/selection logic.
- Do not edit lower marketing sections; G5 owns them.
- No invented copy or claims.

### Ordered tasks

- [ ] Compose headline, value proof, full-size globe, country footnote links, and form as one balanced hero.
- [ ] Preserve the globe's visual prominence; do not shrink it to solve spacing.
- [ ] Refine form surface, fields, chips, error state, footer, and primary action using G2 primitives.
- [ ] Ensure all current category suggestions remain available.
- [ ] Apply the same composition to query review while clearly showing repeated editable searches.
- [ ] Keep showcase mode free of traffic numbers or fabricated data.

### Adversarial verification

- No categories, maximum allowed categories, long category names, validation error, pending submit.
- Multiple long generated queries, add/remove/reorder/edit, query error, pending start.
- Globe drag and supported-country click without form interference.
- 390, 768, 1280, and 1440 composition.

### Required commands

- Standard verification commands.
- Focused category/query tests.
- Browser evidence and machine checks for form values, button state, globe size, and no overflow.

### Acceptance

- Hero reads as one composition at every viewport.
- Landing and query review are recognizably the same experience.
- G1 form/query/globe interaction behavior is unchanged.

### Stop condition

Write the G4 handoff and stop. Do not style lower landing sections or loaders.

---

## G5 — Lower landing page, marketing rhythm, CTA, and footer

**Status:** [ ] Not started  
**Token budget:** 24k  
**Objective:** Finish the entire marketing page with the same disciplined visual system as the hero.

### Dependencies

- G4 checked complete.

### Required reading

- G4 handoff.
- `AGENTS.md`; Next.js CSS and Link guides.
- Complete `components/landing-sections.tsx` and its CSS.
- Sportz67 landing sections for section rhythm, dark bands, feature layouts, and motion restraint.

### Ownership

- Lower landing sections beginning after the hero, final CTA, and footer.
- Lower-section selectors, tests, and G5 evidence.

### Non-goals

- No hero/form changes except a minimal seam correction proven necessary by screenshots.
- No new claims, contact information, logos, testimonials, pricing, or tracking.
- No product workflow changes.

### Ordered tasks

- [ ] Consolidate section backgrounds into a predictable neutral/white/dark rhythm.
- [ ] Refine problem, process, intelligence, evidence, market, use-case, control, FAQ, CTA, and footer sections.
- [ ] Replace equally weighted nested boxes with deliberate editorial or product-preview hierarchy.
- [ ] Keep copy widths readable and ensure visual previews reflect real product concepts.
- [ ] Use restrained entrance motion only if already supported; reduced-motion must remain static.
- [ ] Ensure query-review variant anchors and CTA targets remain correct.

### Adversarial verification

- FAQ keyboard/open states.
- Anchor navigation with sticky header.
- Long wrapping headings at all target widths.
- No invented or unsupported text.
- Query-review variant lower-page links.

### Required commands

- Standard verification commands.
- Source scan for `mailto:`, fabricated addresses, testimonials, pricing, or unsupported numeric claims.
- Full-page browser captures at 390, 768, 1280, and 1440.

### Acceptance

- Landing page has coherent section rhythm and a finished footer.
- Marketing content remains truthful and behaviorally inert.
- Hero-to-next-section seam feels intentional.

### Stop condition

Write the G5 handoff and stop.

---

## G6 — Query-planning loader, discovery progress, and runtime states

**Status:** [ ] Not started  
**Token budget:** 24k  
**Objective:** Give every run stage a distinct but related loading/progress treatment without changing live behavior.

### Dependencies

- G5 checked complete.

### Required reading

- G1 baseline and G2 primitives handoff.
- `AGENTS.md`; Next.js CSS, loading UI, and server/client component guides.
- `components/run-workspace.tsx`, `components/run-progress.tsx`, `lib/stages.ts`, relevant API types/validation, and run page loading fallback.
- Sportz67 dashboard loading shell.

### Ownership

- Run loading/progress/error/reconnection presentation and relevant tests/evidence.
- `run-workspace.tsx` markup may change only to improve semantic grouping; polling/state logic is read-only.

### Non-goals

- No polling interval, fetch dependency, refresh trigger, progress calculation, stage label, run-state, or API change.
- No results overview/table work.

### Ordered tasks

- [ ] Preserve the first query-planning loader as visually distinct from later processing.
- [ ] Keep traffic analysis as its own progress metric.
- [ ] Compose progress header, bar, and four live metrics using G2 primitives.
- [ ] Make skeletons resemble their eventual content.
- [ ] Unify queued, running, reconnecting, failed, cancelled, completed, and unavailable notices.
- [ ] Confirm every metric still updates from the same source state.

### Adversarial verification

- Every stage and terminal state.
- Counters increasing independently across successive fixture responses.
- Traffic waiting/analyzing/complete/stopped.
- Temporary polling failure followed by recovery.
- Query-planning totals of zero and nonzero.

### Required commands

- Standard verification commands.
- Focused deterministic tests for stage presentation and traffic-state mapping.
- Browser/state-sequence evidence at 390 and 1280.

### Acceptance

- Query planning is visually distinct; all later stages share a coherent pipeline language.
- Counters, polling, refresh behavior, and state transitions match G1 exactly.
- No loader implies work that is not occurring.

### Stop condition

Write the G6 handoff and stop.

---

## G7 — Completed-run hero, summary strip, export, and cumulative traffic

**Status:** [ ] Not started  
**Token budget:** 26k  
**Objective:** Turn the completed-run introduction into a compact workspace hero with a disciplined cumulative traffic composition.

### Dependencies

- G6 checked complete.

### Required reading

- G1 baseline and G6 handoff.
- `AGENTS.md`; Next.js CSS and server/client component guides.
- `components/run-workspace.tsx`, `components/cumulative-traffic.tsx`, `lib/traffic-aggregation.ts`, `components/export-csv-button.tsx`, and `components/traffic-globe.tsx`.
- Existing aggregation and CSV tests.
- Sportz67 dashboard headers and metric strips.

### Ownership

- Results heading, four summary values, export placement, cumulative traffic container, and aggregate-mode globe presentation.
- Associated selectors, tests, and G7 evidence.

### Non-goals

- No aggregation math, filtering independence, export data, download behavior, globe interaction logic, or individual-lead traffic changes.
- No table controls or rows.

### Ordered tasks

- [ ] Compose run title/status/utility information as a compact workspace header.
- [ ] Turn the four totals into one divided metric strip rather than four unrelated cards.
- [ ] Make cumulative traffic one coherent hero surface: metrics left, globe right, country links bottom-left within the traffic composition.
- [ ] Keep inner metric/globe regions visually transparent or inset, not separately bordered cards.
- [ ] Remove fixed blank height while keeping the globe at a useful scale.
- [ ] Preserve loading, error, no-data, partial-coverage, and full-coverage states.
- [ ] Confirm totals remain independent of table filters.

### Adversarial verification

- Zero leads, some leads without traffic, all leads with traffic, aggregate zero, aggregate partial markets.
- Country selection/reset and unsupported countries.
- Export success/error without layout shift.
- 390, 768, 1280, and 1440 layouts.

### Required commands

- Standard verification commands.
- Focused traffic aggregation and CSV tests.
- Browser interaction evidence with selected country and worldwide states.

### Acceptance

- The results hero is compact enough to expose initial table content at a normal laptop viewport.
- Aggregate numbers, coverage count, export, and globe behavior remain unchanged.
- Country links are legible navigation and sit in the locked location.

### Stop condition

Write the G7 handoff and stop.

---

## G8 — Results controls, collapsed table, pagination, and row expansion shell

**Status:** [ ] Not started  
**Token budget:** 30k  
**Objective:** Make the lead list fast to scan while preserving every table interaction and the expansion boundary consumed by later windows.

### Dependencies

- G7 checked complete.

### Required reading

- G1 baseline, G2 primitives, and G7 handoff.
- `AGENTS.md`; Next.js CSS and server/client component guides.
- `components/results-filters.tsx`, `components/results-table.tsx`, `components/run-workspace.tsx`, `components/traffic-enrichment.tsx` compact signal, and relevant tests.
- Sportz67 compact expandable cards and dashboard controls.

### Ownership

- Results container, status tabs, search/sort controls, collapsed row cells, pagination, loading/empty table, row-toggle presentation, and outer expanded-row shell.
- Do not style the internal `LeadDetails` content owned by G9–G11.

### Non-goals

- No filter/search debounce, URL parameter, sorting, pagination, expansion state, contact-channel derivation, compact traffic selection, or link-target changes.
- No removal of collapsed-row information; grouping is allowed only when full information remains immediately available in the expanded view.

### Ordered tasks

- [ ] Compose filters as a compact, accessible toolbar.
- [ ] Establish predictable column hierarchy anchored by store identity.
- [ ] Standardize numeric alignment, status, score, category, and channel treatments.
- [ ] Keep rows compact without essential sub-10px content.
- [ ] Define a clear hover, focus-within, selected/expanded, and loading state.
- [ ] Preserve horizontal table scrolling at narrow widths without body overflow.
- [ ] Create a clean expansion shell that does not constrain G9–G11 content into a narrow side column.

### Adversarial verification

- Long name/domain/email/category, many channels, missing values, score zero, best/worst rank.
- Every status tab and sort option.
- Search debounce and URL state.
- Open one row, close it, open another, filter while expanded.
- Narrow horizontal scroll and keyboard row-toggle access.

### Required commands

- Standard verification commands.
- Focused table/filter/presentation tests.
- Browser evidence at all four target widths with collapsed and shell-expanded rows.

### Acceptance

- Store, category, reachability, rank, score, and status scan in one horizontal pass.
- Interactions and URL state match G1.
- Expanded content receives the full available table viewport and cannot cause body overflow.

### Stop condition

Write the G8 handoff and stop. Do not redesign internal lead evidence.

---

## G9 — Expanded lead overview, outcome badge, and contact evidence

**Status:** [ ] Not started  
**Token budget:** 36k  
**Objective:** Produce a compact, polished top-level expanded lead composition and a usable full contact-evidence disclosure.

### Dependencies

- G8 checked complete.

### Required reading

- G1 fixtures, G2 primitives, and G8 expansion-shell handoff.
- `AGENTS.md`; Next.js CSS and server/client component guides.
- Complete `components/lead-details.tsx`, especially `ContactEvidenceItem`, `ContactDetails`, `ScoreDetails`, `IdentityDetails`, `LeadOverview`, and `OutcomeBadge`.
- `lib/lead-presentation.ts`, API types/validation, and `test/lead-details-component.test.ts`.
- Sportz67 country header/detail composition.

### Ownership

- Lead overview parent, identity, score semantics, outreach summary, outcome badge/popover, contact evidence disclosure/list/items, resolved links, and their selectors/tests/evidence.
- G10 owns store-fit/category/discovery nested evidence; do not redesign it here.

### Non-goals

- No data-field removal, evidence filtering, URL derivation, score computation, or contact validation changes.
- Do not convert native disclosures into custom modal state unless semantics, focus management, escape behavior, and tests are fully owned; prefer a well-composed disclosure surface.

### Ordered tasks

- [ ] Make Lead overview one parent module with identity, score, and outreach as clearly weighted subregions, using dividers/insets rather than competing cards.
- [ ] Eliminate blank space; stack subregions when horizontal balance would create empty columns.
- [ ] Keep outreach visually smaller than identity/score while retaining all summary channels.
- [ ] Keep Outcome evidence as a top-right badge with a composed popover/disclosure.
- [ ] Show Resolved domain only when present.
- [ ] Ensure Resolved storefront opens the resolved domain rather than a product path.
- [ ] Redesign contact evidence as a wide, readable disclosure with restrained external-link icons and no giant icon blocks.
- [ ] Preserve every contact fact, decision, confidence, source, and validation detail.

### Adversarial verification

- Resolved domain present/absent and observed product URL present.
- No contact evidence, one item, and many mixed email/phone/page/social items.
- Extremely long URLs and descriptions.
- Outcome note absent/present and badge keyboard interaction.
- Disclosure inside expanded table row at 390, 768, 1280, and 1440.

### Required commands

- Standard verification commands.
- Focused lead-details tests proving conditional domain display, exact resolved link target, all contact content, safe external attributes, and disclosure semantics.
- Browser link/overflow/focus evidence at all target widths.

### Acceptance

- No large blank region, narrow right rail, giant source icon, clipped URL, or body overflow.
- All locked data remains available.
- V7 is proven by source, test, and browser evidence.

### Stop condition

Write the G9 handoff and stop. Do not begin nested store-fit/discovery work.

---

## G10 — Category vocabulary, store-fit evidence, discovery occurrences, and nested tables

**Status:** [ ] Not started  
**Token budget:** 42k  
**Objective:** Redesign the densest recursive evidence as compact ledgers that remain readable and complete at every viewport.

### Dependencies

- G9 checked complete.

### Required reading

- G1 long-content fixtures and G9 handoff.
- `AGENTS.md`; Next.js CSS and server/client component guides.
- Complete `components/lead-details.tsx`, focusing on token disclosures, `StoreFitPage`, `StoreFitItem`, `CategoryList`, `StoreEvidence`, `OccurrenceList`, and `DiscoveryDetails`.
- API types, validation fixtures, presentation helpers, and lead-details tests.
- Sportz67 detail modules, divided metric groups, and compact tables.

### Ownership

- Category vocabulary/tokens, structured store-fit evidence, page-level evidence, matched terms, signal kinds, discovery occurrences, discovery provenance, source disclosures, and all nested-table/disclosure selectors/tests/evidence.
- Must integrate below G9 without changing its contract.

### Non-goals

- No evidence deduplication or omission.
- No parser, field-name, order, link-target, or missing-state changes.
- No individual traffic redesign.

### Ordered tasks

- [ ] Inventory every rendered field before changing markup and attach the inventory to the handoff.
- [ ] Replace vocabulary walls with a concise summary plus an expandable, wrapping token surface; retain every token.
- [ ] Compose each store-fit record as a ledger with a strong header, primary facts, optional grouped tokens, and source footer.
- [ ] Compose page-level store-fit evidence as a subordinate nested ledger, not an equally strong card.
- [ ] Compose each discovery occurrence with clear query/rank/reason identity, compact facts, optional vocabulary, and source footer.
- [ ] Use dividers/inset rows instead of recursive bordered cards.
- [ ] Preserve native disclosure semantics and visible focus.
- [ ] Ensure nested grids/tables stack cleanly and never depend on large empty equal-height columns.

### Adversarial verification

- Zero/one/many categories and tokens.
- Duplicate-looking tokens that must still be retained if present in source.
- Zero/one/many store-fit records and page-level evidence items.
- Zero/one/many occurrences with long query and URL values.
- All nested disclosures open simultaneously.
- 390px body width, table viewport width, wrapping, and focus traversal.

### Required commands

- Standard verification commands.
- Focused rendering tests asserting all fixture values remain present and disclosure counts/order remain correct.
- Machine-readable overflow/count/focus checks and screenshots at all target widths with every nested disclosure open.

### Acceptance

- The field inventory before and after is identical except for presentation-only labels explicitly documented.
- Nested content is readable, compact, and free from body overflow or giant blank columns.
- No essential label/value is below the global minimum type contract.

### Stop condition

Write the G10 handoff and stop.

---

## G11 — Individual traffic analysis and remaining expanded evidence

**Status:** [ ] Not started  
**Token budget:** 32k  
**Objective:** Harmonize lead-level traffic and all remaining evidence sections without changing data interpretation or globe interaction.

### Dependencies

- G10 checked complete.

### Required reading

- G1 traffic fixtures, G7 aggregate traffic handoff, and G10 expanded-evidence handoff.
- `AGENTS.md`; Next.js CSS and server/client component guides.
- `components/traffic-globe.tsx`, `components/traffic-enrichment.tsx`, `components/lead-details.tsx`, `components/cumulative-traffic.tsx`.
- Traffic API types, validation tests, aggregation tests, and TE6 browser evidence/handoff.

### Ownership

- Individual lead traffic section, DataForSEO/CrUX source blocks, metrics, assessments, attribution, market navigation, individual-mode globe presentation, and any remaining expanded sections not owned by G9/G10.
- Shared globe presentation changes must preserve G4 showcase and G7 aggregate modes.

### Non-goals

- No source-state, metric, assessment, attribution, aggregation, selected-country, rotation, or clickable-country logic changes.
- No fabricated worldwide or country data.

### Ordered tasks

- [ ] Preserve required expanded order: lead context, traffic analysis, then remaining evidence.
- [ ] Compose traffic as one parent section with transparent/inset metric and globe regions.
- [ ] Standardize selected-country and overall states with G7.
- [ ] Keep supported country links clear and unsupported countries non-interactive.
- [ ] Refine DataForSEO, CrUX, Core Web Vitals, fractions, attribution, observation, and partial/unavailable states.
- [ ] Preserve provider zeros, missing values, exact dates, safe source links, and disclaimers.
- [ ] Regression-check showcase and aggregate globe modes after shared changes.

### Adversarial verification

- Traffic absent; DataForSEO only; CrUX only; both; partial; unavailable; no coverage; measured zero.
- Worldwide missing while markets exist.
- Every supported country selected through text and globe.
- Unsupported country click attempt.
- Reset to overall.
- Narrow expanded row with all traffic subcontent visible.

### Required commands

- Standard verification commands.
- Focused traffic validation, aggregation, and lead-details tests unchanged plus any new presentation assertions.
- Browser evidence for showcase, aggregate, and individual modes at 390 and 1440, plus 768/1280 where composition changes.

### Acceptance

- All three globe contexts form one visual family while retaining their different data responsibilities.
- No source value, attribution, disclaimer, or state is lost or synthesized.
- Country selection and rotation behavior match G1.

### Stop condition

Write the G11 handoff and stop.

---

## G12 — Responsive, accessibility, stylesheet consolidation, and final implementation polish

**Status:** [ ] Not started  
**Token budget:** 36k  
**Objective:** Resolve cross-page seams and prove the complete migrated frontend at every target viewport without starting parent review.

### Dependencies

- G11 checked complete.

### Required reading

- All G1–G11 handoffs and evidence.
- `AGENTS.md`.
- Next.js CSS, Link, loading, and server/client component guides.
- Complete current `app/globals.css`, all `app/**/*.tsx`, all `components/**/*.tsx`, and all frontend tests.

### Ownership

- Cross-page responsive rules, accessibility presentation, motion rules, stylesheet organization/cleanup, and narrow seam corrections across completed windows.
- May remove legacy selectors only with repository-wide proof they are unused.
- May not redefine a completed window's composition or behavior; substantive findings return to the parent for a corrective window.

### Non-goals

- No feature, API, data, state, or copy expansion.
- No silent corrective redesign of G1–G11.
- No production deployment claim.

### Ordered tasks

- [ ] Test 390, 768, 1024, 1280, and 1440 widths across every owned route/state.
- [ ] Standardize breakpoints and colocate responsive rules with feature groups where safe.
- [ ] Remove obsolete selectors only after `rg` and browser regression proof.
- [ ] Verify keyboard focus, tab order, disclosure operation, toolbar controls, globe countries, links, and popovers.
- [ ] Verify reduced motion for pulses, progress, globe transitions, and marketing motion.
- [ ] Verify contrast, status text/icon redundancy, truncation, wrapping, and touch targets.
- [ ] Run the complete G1 browser matrix and compare against each window's accepted evidence.
- [ ] Record unresolved findings for parent review rather than broadening scope.

### Adversarial verification

- Every long-content and missing/zero/partial fixture from G1.
- All nested disclosures simultaneously open.
- Keyboard-only complete path through landing form, query review, filters, row expansion, outcome, contact, nested evidence, and traffic markets.
- Zoom/reflow where locally testable.
- Reduced-motion and high-contrast/focus visibility.

### Required commands

- Standard verification commands.
- Complete browser matrix command and artifact index.
- Repository scans for unused migrated selectors, essential 6–9px type, uncontrolled raw colors/shadows/radii in migrated selectors, unsafe external links, and accidental invented marketing material.

### Acceptance

- No body overflow at target widths.
- No known functional or data regression.
- No required information depends on unreadable microtype.
- Loading, empty, partial, failure, and completed states share one visual language.
- All implementation evidence is indexed for independent parent review.

### Stop condition

Write the G12 handoff and stop. Do not mark the project complete and do not perform parent review.

---

## 7. Parent reliability review

**Status:** [ ] Not started  
**Token budget:** 40k  
**Owner:** Parent agent only.

After G12, the parent must independently:

- [ ] Inspect the complete diff and current source; do not accept handoff summaries as proof.
- [ ] Confirm every changed production file belongs to an approved window.
- [ ] Compare current behavior with G1's locked inventory and V1–V12.
- [ ] Review `run-workspace.tsx` hooks/effects and confirm polling/fetch dependencies are behaviorally unchanged.
- [ ] Review query editing, filter URL state, pagination, CSV, expansion state, globe selection, and external-link targets.
- [ ] Compare the complete evidence-field inventory before and after G9–G11.
- [ ] Reproduce nested contact, vocabulary, store-fit, occurrence, provenance, and traffic disclosures with all sections open.
- [ ] Rerun standard verification commands from a clean process.
- [ ] Rerun the complete browser matrix using deterministic synthetic fixtures.
- [ ] Inspect screenshots at 390, 768, 1024, 1280, and 1440 rather than relying only on machine checks.
- [ ] Search for body overflow, tiny essential text, raw color/radius/shadow drift, unsafe links, invented claims, and hidden data.
- [ ] Record live checks that were not performed as gaps rather than replacing them with synthetic claims.
- [ ] Open append-only corrective windows for every concrete finding; do not silently fix findings during review.

### Parent completion criteria

The parent may mark the migration complete only when:

- all implementation and required corrective windows are complete;
- every invariant has source plus deterministic test/browser evidence appropriate to the claim;
- no excluded backend, API, authentication, or data behavior changed;
- no evidence field or state distinction was lost;
- nested tables and disclosures are verified at all target widths;
- no unresolved finding contradicts this contract;
- live/deployment claims are limited to checks actually performed.

## 8. Corrective-window protocol

Corrective windows are not pre-created or pre-checked. The parent assigns the next unused stable ID (`G-R1`, `G-R2`, and so on) only after reproducing a concrete finding.

Each corrective entry appended to this file must include:

- finding and severity;
- violated invariant;
- exact reproduction and evidence;
- root cause and owning files;
- narrowly bounded fix;
- required regression test;
- dependencies and commands;
- browser evidence where visual;
- stop condition.

Group findings only when they share one root cause and ownership boundary. After correction, rerun the corrective checks, the original affected-window checks unchanged, the full standard suite, and the relevant parent-review browser matrix.

## 9. Planning readiness gate

The parent must answer all items before assigning G1:

- [x] One authoritative execution checklist exists.
- [x] Supporting research and historical evidence are clearly subordinate.
- [x] Applicable `AGENTS.md` and local Next.js guides are identified.
- [x] Current source, dirty worktree, core components, and prior evidence were inspected.
- [x] User-visible outcome, exclusions, parked work, and design principles are locked.
- [x] Functional/data invariants have named owners and final proof.
- [x] Nested tables, expanding sections, contact evidence, store fit, discovery occurrences, and traffic have isolated ownership.
- [x] Windows are sequential and dependencies are explicit.
- [x] Every window defines source ownership, non-goals, adversarial checks, commands, acceptance, and handoff.
- [x] Deterministic local proof is separated from unavailable live verification.
- [x] Parent review and append-only corrections prevent unchecked cross-window gaps.

**Planning result:** Ready to assign G1. No implementation window has started.
