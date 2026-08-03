# StoreSignal visual-system execution checklist

**Status:** CORRECTIVE ACTION REQUIRED — execute G-R1 through G-R4 sequentially
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

---

## 10. Parent review findings and corrective execution plan

**Review date:** 2026-08-04
**Review result:** Not accepted. G1–G12 implementation artifacts exist, but the migration cannot be marked complete until G-R1 through G-R4 pass.
**Resume point after compaction:** Assign only G-R1 using the universal assignment text. Do not begin G-R2 until the parent independently reviews G-R1 source and evidence.

The original G1–G12 status boxes remain unchanged because the required parent dependency gates were not recorded during execution. Do not retroactively claim that those gates occurred. G-R4 owns an honest execution ledger and final reconciliation after the technical corrections are complete.

### Confirmed parent findings

| Finding | Severity | Observed evidence | Required correction |
|---|---|---|---|
| Expanded lead content remains 882–940px wide at 390/768px inside the table scroller | High | `G9/browser-checks.json`, `G10/browser-checks.json`, `app/globals.css` table/expansion rules | G-R2 |
| Protected application evidence is hand-authored HTML injected into the landing document rather than the shipped React components | High | `scripts/g6-browser-regression.mjs` through `scripts/g12-browser-matrix.mjs`; especially G12 `document.body.innerHTML` | G-R1 |
| Sequential parent gates and status updates were not recorded; G6/G7 share commit `80b2454` | Medium/process | Checklist status fields, G6/G7 handoffs, Git history | G-R4 |
| The stylesheet grew to 6,671 lines and retains uncontrolled raw values, fragmented feature order, and late cascade guards | Medium/design-system | `app/globals.css`, G12 handoff repository-audit findings | G-R3 |

## G-R1 — Real-component deterministic browser harness

**Status:** [ ] Not started
**Token budget:** 30k
**Finding and severity:** High — current protected-route screenshots and interaction records exercise injected replica markup, not the production React component tree.
**Violated invariants:** V2–V10 and parent completion criteria requiring evidence appropriate to each behavioral claim.

### Dependencies and preconditions

- G1–G12 commits and evidence are present at or after `448d521`.
- No authenticated Neon session is required or requested for this correction.
- The worktree must be clean before editing. Preserve all unrelated work if that is no longer true.

### Required reading and exact reproduction

- Read this complete checklist, `AGENTS.md`, G1, G6–G12 handoffs, and current browser scripts.
- Read the installed Next.js guides completely before code changes: project structure, layouts/pages, server/client components, CSS, route handlers if used, and proxy.
- Reproduce `node scripts/g12-browser-matrix.mjs` and confirm that `scripts/g12-browser-matrix.mjs` removes scripts and assigns hand-written markup to `document.body.innerHTML`.
- Confirm G1's protected-route redirect gap without modifying `proxy.ts`, authentication, or API authorization.

### Root cause and ownership

- Root cause: the authenticated `/runs/*` proxy redirects before client fixtures mount, so later windows substituted CSS-only HTML replicas.
- Owns a deterministic, non-production-data browser fixture surface; fixture-only supporting components; browser harnesses; fixture tests; and `review-evidence/design-system/G-R1/*`.
- May minimally export existing presentation components when required for direct fixture composition, without changing their runtime behavior.
- May add a development/test-only Next.js fixture route outside `/runs/*` only if it fails closed with `notFound()` unless an explicit local fixture environment flag is set. The production build must expose no usable fixture data or authentication bypass.

### Non-goals

- Do not change `proxy.ts`, Neon Auth, API authorization, backend requests, polling intervals, retry behavior, parsers, data contracts, or production navigation.
- Do not redesign any page or correct the responsive defect owned by G-R2.
- Do not preserve the old injected-DOM checks as primary proof. They may remain only as explicitly labelled CSS smoke tests.

### Ordered tasks

- [x] Build a deterministic fixture surface that renders the actual production components and synthetic `.example` data.
- [x] Cover the real `RunWorkspace` state machine where feasible by intercepting its existing client requests before hydration, or render its actual exported child components where interception cannot truthfully reproduce a state. Record which method proves each state.
- [ ] Cover query review/edit/save/start, query-planning loader, discovery loader, reconnect warning, terminal states, completed results, filters, sort, search debounce, pagination, CSV trigger/error presentation, row expansion/replacement, outcome, contacts, store fit, vocabulary, occurrences, individual traffic, aggregate traffic, and all globe modes.
- [x] Exercise actual React event handlers; do not bolt replacement listeners onto fixture HTML.
- [ ] Add machine-readable assertions for request paths/counts, URL state, polling cadence under fake time or bounded observation, selected market, expanded IDs, disclosure state, link targets, visible data labels, element rectangles, internal/body overflow, and focus order.
- [x] Ensure all fixture routes/data fail closed in ordinary production configuration and add a test for that gate.
- [x] Replace G12's primary complete-path matrix with the real-component harness while retaining the real public landing route capture.

### Adversarial verification

- Present/absent resolved domain and a product-path `final_url`.
- Zero, missing, partial, no-coverage, and unavailable traffic.
- Unsupported globe country, keyboard country selection, pointer selection, drag suppression, and worldwide reset.
- Rapid filter changes, result replacement while a lead is expanded, polling failure/recovery, and query start after save.
- Every nested disclosure open with long unbroken URLs and duplicate vocabulary tokens.
- Verify that no fixture API, route, or flag grants access to real protected data.

### Required tests and commands

- Add focused tests proving actual component imports/rendering, production fail-closed behavior, and absence of copied application markup in the primary harness.
- Run the new real-component browser harness at 390x844, 768x1024, 1024x768, 1280x800, and 1440x900.
- Run the unchanged G1 baseline tests and G6–G12 focused source/render tests.
- Run all standard verification commands.

### Acceptance

- Primary protected-application evidence comes from the production React components and their real handlers, not `innerHTML` replicas.
- Every behavior named above has component/runtime evidence or an exact, narrowly stated residual blocker accepted by the parent.
- Fixture infrastructure is unreachable or returns 404 without an explicit local test flag and cannot bypass `/runs/*` authentication.
- No production behavior or presentation changes.

### Handoff and stop condition

Write `review-evidence/design-system/G-R1_HANDOFF.md`, index all evidence, and stop. Do not begin G-R2. The parent must inspect the fixture gate, actual imports, network records, and browser interactions before checking G-R1 complete.

## G-R2 — Responsive expanded-row reflow and nested evidence containment

**Status:** [ ] Not started
**Token budget:** 34k
**Finding and severity:** High — expanded overview/contact content measures 928/882px and nested store-fit/discovery content measures 940px at a 390px viewport, making expanded evidence depend on sideways table scrolling and visibly clipping long content.
**Violated invariants:** V9; G9 acceptance prohibiting clipped URLs; G10 acceptance requiring nested content to stack cleanly at every viewport.

### Dependencies

- G-R1 checked complete by the parent.
- The G-R1 real-component fixture must reproduce the current oversized expanded-row measurements before editing.

### Required reading and exact reproduction

- Read this checklist, G8–G12 and G-R1 handoffs, installed Next.js CSS/server-client guides, and the complete current results/lead-detail component and stylesheet sources.
- In the actual component harness, expand a dense lead at 390 and 768 with contact, vocabulary, structured store fit, all page evidence, occurrences, and traffic disclosures open.
- Record table scroll width, expansion-shell width, each top-level section width, disclosure scroll/client widths, long-link rectangles, and current horizontal scroll dependency.

### Root cause and ownership

- Root cause: `.results-table` keeps a 980px minimum canvas and the expanded `<tr>/<td>` inherits that canvas; the existing narrow `.lead-details` width rule does not establish a genuinely viewport-sized expansion composition.
- Owns `components/results-table.tsx` only if markup separation is necessary, responsive expansion selectors in `app/globals.css`, focused tests, G-R2 browser harness/evidence, and minimal lead-detail hooks required for measurement.
- G-R1 harness code may be extended only to add G-R2 scenarios and assertions.

### Non-goals

- Preserve the collapsed desktop table, its intentional horizontal scrolling on narrow screens, filters, sort, pagination, expansion state, and all lead data.
- Do not redesign the visual hierarchy accepted in G9–G11, change evidence order, remove fields, change link derivation, or alter globe/data behavior.
- Do not solve the defect by hiding overflow, truncating required values, shrinking essential text, or accepting horizontal scrolling inside expanded evidence.

### Ordered tasks

- [ ] Decouple the expanded evidence canvas from the table's 980px collapsed-row canvas at widths below the table breakpoint.
- [ ] Prefer the smallest valid markup/CSS correction. If table layout cannot provide a true viewport-width detail surface, render the expansion as a semantically adjacent full-width region while preserving one-expanded-row state and truthful control relationships.
- [ ] Make identity, score, and outreach stack without blank columns; ensure the outcome popover remains inside the visible viewport.
- [ ] Make contact values, decision grids, source links, traffic explorer, vocabulary, store-fit/page ledgers, and occurrences wrap and stack to the expansion width.
- [ ] Preserve horizontal table access for collapsed columns while ensuring opening evidence never requires left/right scrolling to read it.
- [ ] Add regression assertions that fail when any expansion section exceeds its visible expansion viewport.

### Adversarial verification

- 320px minimum document width plus the required 390, 768, 1024, 1280, and 1440 targets.
- Table initially scrolled left, center, and right before expanding a row.
- Extremely long unbroken domain, URL, email, query, validation reason, and vocabulary token.
- All nested disclosures open simultaneously, then repeatedly closed/reopened.
- Outcome badge opened near both viewport edges; keyboard focus must remain visible.
- Result replacement/filter/page change must clear or retain expansion exactly as the current contract specifies.

### Required tests and commands

- Add component tests for any markup/ARIA relationship change and preserve all existing field-count/order/link assertions.
- G-R1 real-component browser matrix must assert, at 390 and 768: expansion width no greater than its visible viewport; every disclosure `scrollWidth <= clientWidth` except explicitly scrollable non-evidence controls; no clipped required link/value; no body overflow.
- Rerun unchanged G8, G9, G10, G11, and G12 focused tests and the G-R1 matrix.
- Run all standard verification commands.

### Acceptance

- Expanded evidence is readable without horizontal scrolling at 390 and 768, even though collapsed table columns may still scroll.
- No overview, contact, traffic, store-fit, category, page, occurrence, or provenance region exceeds the visible expansion canvas.
- No clipped URL, giant blank column, hidden field, type below the minimum contract, focus regression, or behavior change.
- Desktop 1280/1440 composition remains compact and materially unchanged except where required to share corrected structure.

### Handoff and stop condition

Write `review-evidence/design-system/G-R2_HANDOFF.md`, include before/after rectangle evidence and screenshots, and stop. Do not begin stylesheet consolidation. The parent must reproduce narrow all-open behavior before checking G-R2 complete.

## G-R3 — Stylesheet architecture and semantic-token consolidation

**Status:** [ ] Not started
**Token budget:** 36k
**Finding and severity:** Medium — the migration added another raw visual system and late cascade guards instead of completing the intended semantic-token consolidation.
**Violated contract:** G2 acceptance that later windows can proceed without new raw shadow/radius systems; G12 stylesheet-organization and raw-drift review requirements.

### Dependencies

- G-R2 checked complete by the parent with accepted screenshots and machine measurements.
- G-R1 supplies the real-component visual regression matrix used as the no-regression gate.

### Required reading and baseline inventory

- Read this checklist, `DESIGN_SYSTEM_MIGRATION_PLAN.md`, G2/G4–G5/G8–G12/G-R2 handoffs, installed Next.js CSS guide, Sportz67 references named by G2, and all of `app/globals.css`.
- Record baseline stylesheet line count, unique raw colors, raw shadows, numeric radii, breakpoints, `!important` uses, duplicate selectors, unused selectors, and the selectors relying on G10–G12 cascade guards.
- Capture baseline real-component screenshots and computed design tokens before editing.

### Root cause and ownership

- Root cause: sequential windows appended feature styles around legacy blocks, introduced raw marketing/application values, and compensated with late high-specificity cascade guards rather than reorganizing the stylesheet.
- Owns `app/globals.css`, semantic token definitions, deletion of selectors proven unused repository-wide, CSS contract tests, and `review-evidence/design-system/G-R3/*`.
- Component class changes are allowed only as mechanical hooks needed to remove ambiguity; no markup composition or behavior changes.

### Non-goals

- No visual redesign, copy change, feature change, dependency addition, Tailwind conversion, CSS-module conversion, dark mode, or global typography replacement.
- Do not delete legacy selectors without `rg`, actual-component browser coverage, and computed-style proof.
- Do not flatten purposeful landing-page art direction into generic application cards.

### Ordered tasks

- [ ] Organize CSS in one predictable order: tokens, reset/base, shared primitives, shell/auth/history, landing, query/runtime, results/table, expanded evidence, traffic, responsive rules colocated with their owner, then global accessibility/motion overrides.
- [ ] Replace migrated-selector raw colors, shadows, and radii with the locked semantic roles or explicitly named component tokens derived from them.
- [ ] Reduce all surfaces to the three elevation roles and the established radius vocabulary unless a documented shape is semantically unique.
- [ ] Remove redundant cascade guards by placing canonical rules after their true dependencies and lowering unnecessary specificity.
- [ ] Merge safe duplicate/near-identical media-query groups without changing breakpoint behavior; document deliberately retained breakpoints.
- [ ] Remove unused primitives/selectors only with repository-wide proof. If `components/ui/primitives.tsx` remains unused, either adopt it mechanically where behavior-neutral or remove it and document why CSS primitives remain authoritative.
- [ ] Produce before/after metrics and a selector/token migration map.

### Adversarial verification

- Every public/auth/history/query/runtime/results/expanded/traffic state from G-R1.
- Hover, active, disabled, loading, focus-visible, reduced-motion, and forced-colors states.
- Long content, all disclosures open, every viewport, and collapsed table horizontal scrolling.
- Compare computed color, type, radius, elevation, spacing, visibility, and bounding rectangles for unintended drift.

### Required tests and commands

- Add a CSS architecture contract that rejects uncontrolled new raw shadows/radii/colors in migrated feature groups while allowing the root token declarations and explicitly documented exceptions.
- Run a repository-wide unused-selector scan and store the report.
- Rerun the unchanged G-R1/G-R2 browser matrix and all original window tests.
- Run all standard verification commands.

### Acceptance

- No uncontrolled raw color, radius, or shadow system remains in migrated selectors.
- Canonical feature rules no longer depend on late G10–G12 font-size cascade guards.
- Stylesheet metrics materially improve and every retained exception is named with a reason.
- Real-component screenshots and machine checks show no unintended composition, behavior, data, accessibility, or responsive regression.

### Handoff and stop condition

Write `review-evidence/design-system/G-R3_HANDOFF.md` with the before/after inventory and visual-diff evidence, then stop. Do not update historical completion records or declare the migration complete.

## G-R4 — Execution-ledger reconciliation and final parent reliability review

**Status:** [ ] Not started
**Token budget:** 24k
**Owner:** Parent agent only.
**Finding and severity:** Medium/process — G1–G12 dependency approvals were not recorded, all original status fields remain not started, and G6/G7 were committed together despite separate handoff boundary claims.

### Dependencies

- G-R1, G-R2, and G-R3 independently reviewed and checked complete by the parent.
- Clean worktree and reproducible handoffs/evidence for every corrective window.

### Required reconciliation

- [ ] Record the immutable G1–G12 commit map and explicitly note that historical sequential parent gates cannot be retroactively proven.
- [ ] Compare each G1–G12 changed production file with its declared ownership and record exceptions, including the combined `80b2454` G6/G7 commit.
- [ ] Replace ambiguous status reporting with an appended execution ledger containing: implemented commit, handoff present, parent source review, evidence quality, corrective dependency, and final disposition.
- [ ] Do not rewrite handoffs or mark an original dependency gate as historically completed when it was not recorded.
- [ ] Independently inspect G-R1–G-R3 source and rerun their focused checks rather than accepting handoff summaries.
- [ ] Complete every still-applicable item in Section 7 using the real-component harness.
- [ ] Recompare evidence-field inventories, behavior-sensitive effects, request paths, filters, CSV, expansion, links, traffic aggregation, globe interaction, responsive layout, focus, reduced motion, and forced colors.
- [ ] Rerun all standard verification commands and the full real-component five-width matrix from clean processes.
- [ ] Inspect final screenshots at every target width and record any remaining unknown as a new append-only corrective window rather than silently accepting it.

### Acceptance

- The ledger truthfully distinguishes implementation, missing historical approval, current independent verification, and corrected evidence.
- All technical completion criteria in Section 7 pass with appropriate source, test, and real-component browser proof.
- No unresolved finding contradicts V1–V12 or the locked visual contract.
- Only the parent updates the checklist's final status to complete.

### Handoff and stop condition

Write `review-evidence/design-system/G-R4_PARENT_REVIEW.md`. If any concrete finding remains, append G-R5 or later and stop. Otherwise update the authoritative status and completion ledger, report the final command/evidence results, and declare the migration complete.

## 11. Corrective execution order

Execute strictly in this order:

1. **G-R1:** establish trustworthy real-component browser proof.
2. **Parent gate:** independently inspect G-R1 and mark only G-R1 complete.
3. **G-R2:** fix narrow expanded evidence using the G-R1 harness.
4. **Parent gate:** reproduce G-R2 before/after measurements and mark only G-R2 complete.
5. **G-R3:** consolidate CSS after layout is stable.
6. **Parent gate:** inspect CSS inventory and full visual regression evidence.
7. **G-R4:** parent-only historical reconciliation and final reliability review.

Do not parallelize these windows. G-R2 depends on G-R1's trustworthy harness; G-R3 depends on G-R2's accepted layout; G-R4 depends on all technical corrections.
