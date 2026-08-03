# G7 handoff — completed-run hero, summary strip, export, and cumulative traffic

**Status:** implementation complete; ready for parent review  
**Completed:** 2026-08-03  
**Window boundary:** G7 only; results controls, table rows, and G8+ were not changed

## Objective and outcome

G7 turns the completed-results introduction into a compact workspace overview. The heading now pairs its decisive title with the truthful run-state badge and export action, while the four backend-provided totals read as one divided metric strip instead of four unrelated cards.

Cumulative traffic remains one parent hero: aggregate metrics occupy the left, the globe anchors the right, and country navigation is locked to the bottom-left of the composition. Inner regions remain transparent or lightly inset. The previous fixed explorer height was removed, the globe scales from available width, and aggregate-only mobile ordering now keeps metrics before the globe with country links at the bottom.

All aggregation math, result-summary sources, unfiltered aggregate paging, CSV collection/download behavior, globe rotation/selection logic, and table behavior are unchanged.

## Plan executed

1. Verified G6 dependency, G1/G6 handoffs, G7 ownership, local Next.js server/client and CSS guidance, current result/traffic/export sources, existing tests, and the Sportz67 dashboard-header/metric-strip reference.
2. Traced summary, export, aggregate paging, coverage, empty/error/loading, country selection/reset, and responsive contracts before editing.
3. Composed the compact results header, unified metric strip, and coherent responsive traffic hero without moving behavioral logic.
4. Added zero/missing/partial/full aggregation contracts, source-independence assertions, CSV preservation checks, and deterministic browser evidence at 390/768/1280/1440.
5. Ran focused, full, browser, and production verification; stopped before G8.

## Changed files

- `components/run-workspace.tsx` — truthful run-state utility beside export and a named unified totals strip; summary sources unchanged.
- `components/cumulative-traffic.tsx` — named status semantics for the existing aggregate loading skeleton; request and aggregation flow unchanged.
- `app/globals.css` — scoped G7 header, divided summary strip, compact aggregate hero, globe sizing, transparent/inset metrics, export-error stability, and responsive aggregate ordering.
- `test/design-system-results-hero.test.ts` — adversarial aggregation states, unfiltered aggregate-source contracts, summary/export preservation, and country-navigation placement.
- `scripts/g7-browser-regression.mjs` — deterministic compiled-CSS browser composition and interaction harness.
- `review-evidence/design-system/G7/*` — responsive screenshots, machine checks, and sanitized server log.

No API, parser, backend proxy, authentication, aggregation calculation, filter state, result fetch query, export data, download behavior, globe interaction logic, individual-lead traffic, table control, table row, dependency, or lockfile changed.

## Verification

```text
node --experimental-strip-types --test test/design-system-results-hero.test.ts test/csv-export.test.ts
PASS — 2 entrypoints, 0 failed

npm test
PASS — 12 entrypoints, 0 failed

npm run lint
PASS

npx tsc --noEmit
PASS

git diff --check
PASS

node scripts/g7-browser-regression.mjs
PASS with permission to bind the local Next.js/Chrome loopback ports

npm run build
PASS with permission for Turbopack's local helper port — compiled in 11.2s, TypeScript in 11.4s, 6/6 static generations complete
```

The production build emitted the same previously recorded Neon Auth dynamic-cookie diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`. They did not fail the build and no new warning class appeared.

## Browser evidence

Protected run routes still require Neon authentication, so the browser harness uses deterministic `.example` completed-results DOM against the real compiled G7 stylesheet. Pure aggregation, exact production-source, CSV, and interaction contracts cover behavior without bypassing authentication.

- `G7/completed-{390x844,768x1024,1280x800,1440x900}.png`
- `G7/browser-checks.json`
- `G7/browser-server.log`

All four responsive scenarios report no horizontal overflow, four summary cells, nine aggregate traffic metrics, and bottom-left country navigation. The initial table surface is visible at 768, 1280, and 1440; the 390 capture intentionally prioritizes readable stacked content. Selected-country and worldwide-reset states preserve hero dimensions. Export error presentation records identical heading height before and after disclosure. Loading, error, and no-data traffic states remain compact and overflow-free.

## Adversarial and invariant coverage

- Empty lead sets return zero coverage without inventing worldwide data.
- Leads without traffic do not increment coverage; partial coverage retains total lead count and available aggregates.
- Measured aggregate zero remains material and distinct from unavailable data.
- Fully covered mixed zero/nonzero leads retain both coverage and market order.
- Aggregate paging remains `/results?page=${page}&pageSize=200`, independent of search, status, sort, and pagination filters.
- The four displayed totals remain the current result response's `summary.total`, `qualified`, `rejected`, and `failed` fields.
- Export still calls `collectAllLeads` and `downloadLeadsCsv`; its error remains an alert and does not shift the header.
- Country buttons retain `aria-pressed`, selection, rotation, and `View overall` reset paths; unsupported-country fallback was not introduced.
- Existing G1–G6 changes and the parent-owned checklist checkbox were preserved.

## Residual risk

The live protected results route cannot be mounted deterministically under the current Neon proxy. Browser evidence therefore proves real compiled styling and deterministic interactions rather than authenticated production fetches. Exact source contracts and existing validation/CSV suites cover the unchanged request and data boundaries.

G8 was not started.
