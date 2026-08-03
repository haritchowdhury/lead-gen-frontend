# G8 handoff — results controls, collapsed table, pagination, and expansion shell

**Status:** implementation complete; ready for parent review  
**Completed:** 2026-08-03  
**Window boundary:** G8 only; internal `LeadDetails` presentation and G9+ were not changed

## Objective and outcome

G8 makes the lead list denser and easier to scan while retaining the existing result interactions. Status filters now read as one compact segmented toolbar, search and sort controls share the design-system control geometry, and the table uses an explicit hierarchy for store, category, reachability, rank, score, status, and disclosure.

Collapsed rows retain all previously displayed information. Secondary channel chips are grouped after the first two as a truthful `+N`, with the complete grouped channel names in the accessible label and title and all full channel evidence still immediately available through the existing expansion. Essential collapsed-row text is at least 10px, numeric values use tabular alignment, and long store/domain/category fixtures truncate without changing their source values.

The expansion row still spans all seven columns and renders the unchanged `LeadDetails` component inside a new full-width shell. Narrow screens scroll the table surface horizontally while the results panel contains paint overflow, so the document itself does not overflow.

## Plan executed

1. Verified G7, read the complete checklist, G1/G2/G7 handoffs, local Next.js client/server and CSS guides, owned components/tests, traffic compact signal, and the Sportz67 compact dashboard reference.
2. Traced debounce, URL replacement, status, sort, pagination, safe external link, result-replacement, and row-expansion contracts before editing.
3. Added toolbar, column, row-state, loading, pagination, and full-width expansion-shell presentation without moving behavioral logic.
4. Added focused source/render contracts and deterministic compiled-CSS browser evidence for adversarial collapsed and expanded states.
5. Ran focused, full, browser, TypeScript, lint, diff, and production-build verification; stopped before G9.

## Changed files

- `components/results-filters.tsx` — names the controls region and adds truthful count labels; debounce, status changes, and sort handling are unchanged.
- `components/results-table.tsx` — explicit column hierarchy, busy/scroll semantics, long-value titles, grouped secondary channels, and full-width expansion wrapper; link and expansion logic are unchanged.
- `app/globals.css` — compact segmented toolbar, consistent controls, readable/table-aligned row treatments, hover/focus/expanded/loading states, contained narrow overflow, and expansion shell.
- `test/design-system-results-table.test.ts` — focused behavior-preservation and G8 presentation contracts.
- `scripts/g8-browser-regression.mjs` — deterministic compiled-CSS responsive and interaction harness.
- `review-evidence/design-system/G8/*` — eight screenshots, machine-readable browser checks, and sanitized server log.

No API request, parser, backend proxy, authentication, result query, debounce interval, URL parameter, sort option, pagination rule, expansion-state rule, contact derivation, traffic selection, external link target, CSV path, internal `LeadDetails` markup, dependency, or lockfile changed.

## Verification

```text
node --experimental-strip-types --test test/design-system-results-table.test.ts test/lead-details-component.test.ts
PASS — 2 entrypoints, 0 failed

npm test
PASS — 13 entrypoints, 0 failed

npm run lint
PASS

npx tsc --noEmit
PASS

git diff --check
PASS

node scripts/g8-browser-regression.mjs
PASS with permission to bind local Next.js/Chrome loopback ports

npm run build
PASS with permission for Turbopack's local helper port — compiled in 11.2s, TypeScript in 11.6s, 6/6 static pages generated
```

The production build emitted the same previously recorded Neon Auth dynamic-cookie diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`. They did not fail the build and no new warning class appeared.

## Browser evidence

Protected run routes still require Neon authentication, so the harness uses deterministic synthetic `.example` table DOM against the real compiled G8 stylesheet. Focused source and server-rendered component tests cover the unchanged production behavior without adding an authentication bypass.

- `G8/collapsed-{390x844,768x1024,1280x800,1440x900}.png`
- `G8/expanded-{390x844,768x1024,1280x800,1440x900}.png`
- `G8/browser-checks.json`
- `G8/browser-server.log`

All eight responsive scenarios report no document overflow, all seven table headings, and a 10px minimum essential table font. At 390 and 768 the 1220px table canvas scrolls within a 345–726px viewport. The expanded shell measures 1184px, receiving the full table canvas rather than a narrow side column.

Machine interactions prove: keyboard-targeted open with truthful `aria-expanded`/`Hide details`; close; opening another row; filter selection clearing the synthetic expanded state; narrow horizontal scroll focus; and overflow-free loading and empty states.

## Adversarial and invariant coverage

- Long store name, domain, category, and grouped channels retain readable anchors and full-value titles/labels.
- Missing domain/category/channel values, score zero, unscored value, best rank, worst rank, and all three statuses remain visibly distinct.
- All four status tabs and all six production sort values remain present.
- Search remains trimmed and debounced at 350ms; status/search/sort reset page 1; router replacement remains non-scrolling.
- Previous/next boundaries and single-page totals remain unchanged.
- Safe storefront targeting remains `final_url ?? canonical_url` through `safeExternalUrl`, with `_blank` and `noreferrer` unchanged.
- Row toggles retain button semantics, `aria-expanded`, `aria-controls`, truthful show/hide labels, one-open-row behavior, and result-replacement clearing through `retainedExpandedLead`.
- Existing G1–G7 work and the parent-owned checklist checkbox were preserved.

## Skipped checks and residual risk

The live protected results route could not be mounted with deterministic synthetic data because the existing Neon proxy redirects unauthenticated sessions before React mounts. Browser proof therefore covers real compiled styling and deterministic equivalent interactions; exact production-source and server-render tests cover behavior. A Neon-compatible local authenticated fixture would be required for live protected-route browser proof.

G9 was not started.
