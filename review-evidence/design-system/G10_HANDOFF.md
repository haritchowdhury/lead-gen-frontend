# G10 handoff — category, store-fit, and discovery evidence

**Status:** implementation complete; ready for parent review  
**Completed:** 2026-08-03  
**Window boundary:** G10 only; G11 individual traffic presentation was not started

## Objective and outcome

The recursive category, store-fit, page, breadth, and discovery evidence now uses compact divided ledgers instead of repeated equally strong cards. Vocabulary walls have a counted native disclosure and an individually wrapping token surface. Store-fit and occurrence records have strong identity headers, compact fact groups, subordinate page/breadth ledgers, and restrained source footers.

All source records, tokens, fields, order, counts, URLs, missing states, and native disclosure behavior remain available. The narrow layout recomposes facts and headers into one column inside the existing G8 horizontal results canvas; it does not create document overflow.

## Plan executed

1. Read the complete checklist, G1/G9 handoffs, required Next.js 16.2.12 guides, complete owned component, types, validation fixtures, helpers, tests, and the specified Sportz67 detail/compact-card references.
2. Inventoried every G10-rendered field and refactored category vocabulary, store-fit records, breadth/page evidence, matched category intents, and discovery occurrences into a divider-led hierarchy.
3. Added dense and boundary rendering regressions for field retention, duplicate tokens, counts, order, native disclosures, safe links, and explicit missing states.
4. Captured all-disclosures-open compiled-CSS evidence at 390, 768, 1280, and 1440. The first pass exposed legacy 8–9px cascade fallbacks; scoped cascade guards and viewport stacking corrected them before final capture.
5. Ran focused, full, browser, lint, TypeScript, diff, and production-build verification; stopped before G11.

## Changed files

- `components/lead-details.tsx` — presentation-only ledger headers, subordinate page/breadth rows, source footers, counted token disclosures, wrapping token items, and G10 section hooks.
- `app/globals.css` — G10-scoped ledger hierarchy, dividers/insets, responsive stacking, token surfaces, source rows, focus, wrapping, and minimum-type cascade guards.
- `test/lead-details-component.test.ts` — dense G10 retention/order/count/duplicate-token and empty-state regressions; one existing presentation assertion updated from the former colon-joined text line to the retained fact label.
- `scripts/g10-browser-regression.mjs` — deterministic all-open responsive/count/focus/overflow harness.
- `review-evidence/design-system/G10/*` — four screenshots, machine checks, and sanitized server log.

No API type, validation/parser, presentation derivation, fixture contract, evidence order, URL sanitizer/target, authentication, results behavior, G9 overview, G11 traffic component, dependency, or lockfile changed.

## Field inventory retained

### Category and top-level store fit

- Exact category input, normalized category, business qualifier, store-fit state, Shopify confidence, and category evidence score.
- Explicit no-structured-store-fit and no-accepted-category states.

### Each structured store-fit record

- Original/fallback category identity, state, accepted/unaccepted/unrecorded distinction, optional score, exact input, normalized category, business qualifier, reason, complete category vocabulary, matched terms, signal kinds, and every source URL.
- Each breadth record: signal, all terms, source URL, source order, and disclosure count.
- Each page record: page type, strength including zero, usable text length including zero, matched terms, claim terms, signals, breadth terms, negative signals, source URL, source order, and disclosure count.

### Accepted matched category intents

- Original/fallback category identity, normalized category, business qualifier, every vocabulary token, source order, and disclosure count.

### Discovery provenance and occurrences

- Top level: primary search/generated query distinction, query-generation reason, query score including zero, representative rank including zero, representative requested URL, and representative final URL.
- Each occurrence: query/unrecorded fallback, original/normalized category, business qualifier, query-generation reason/unrecorded header fallback, rank/unrecorded distinction, query score including zero, MyShopify domain, every vocabulary token, every query source URL, requested result URL, resolved result URL, source order, occurrence order, and disclosure count.
- Explicit legacy/no-structured-provenance state.

Presentation-only changes: `Usable text length: N` is now a `Usable text length` fact/value pair; vocabulary is shown as `N recorded` plus `View vocabulary`; state, acceptance/score, rank, and strength are separated into header labels instead of dot-joined lines. No value interpretation changed.

Duplicate-looking source vocabulary is intentionally retained. Token keys now include source index, preventing React key collisions without deduplicating content.

## Tests and verification

```text
node --experimental-strip-types --test test/lead-details-component.test.ts
PASS — 1 entrypoint, 0 failed

npm test
PASS — 13 entrypoints, 0 failed

npm run lint
PASS

npx tsc --noEmit
PASS

git diff --check
PASS

node scripts/g10-browser-regression.mjs
PASS with permission to bind local Next.js/Chrome loopback ports

npm run build
PASS with permission for Turbopack's helper port — compiled in 14.3s, TypeScript in 14.2s, 6/6 static pages generated
```

The initial sandboxed build failed only at Turbopack's local helper-port bind (`Operation not permitted`). The permitted rerun passed. It emitted the existing Neon Auth dynamic-cookie diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`; no new warning class appeared.

## Browser evidence

- `G10/all-open-{390x844,768x1024,1280x800,1440x900}.png`
- `G10/browser-checks.json`
- `G10/browser-server.log`

Every final scenario reports:

- no document overflow;
- all 17 native disclosures open simultaneously;
- 3 store-fit records, 9 page records, 4 discovery occurrences, and 144 vocabulary-token instances;
- minimum essential font of 10px and no undersized required nodes.

The interaction check closes and reopens the discovery ledger through its native summary and proves focus remains on `SUMMARY` with the truthful label `Discovery occurrences (4)`. Screenshots and URLs use deterministic `.example` data only.

## Invariants and residual risk

- **V1/V4:** no API, parser, result control, or behavior code changed.
- **V5:** dense server rendering asserts all fixture values, sources, tokens, counts, and source order; duplicate tokens remain duplicated.
- **V6:** zero-capable numeric facts continue to render because `Fact` omits only null/empty values; accepted false versus unrecorded, rank absent versus zero, and all three explicit no-evidence states remain distinct.
- **V9:** all-open compiled-CSS checks prove no body overflow, minimum 10px essential text, viewport-driven stacking, wrapping, and record counts at all target widths.
- **V10:** native `details`/`summary` semantics and visible focus remain; no custom disclosure state was introduced.
- **V12:** the clean G10 baseline and all prior checked-in windows were preserved; only scoped G10 files changed.

The protected results route still requires Neon authentication. Browser composition therefore uses deterministic `.example` DOM against the real compiled stylesheet, while production server-render tests prove actual component markup and field retention without adding an auth bypass. A Neon-compatible deterministic local session remains the prerequisite for live protected-route capture.

G11 was not started.
