# G11 handoff — individual traffic analysis and remaining expanded evidence

**Status:** implementation complete; ready for parent review  
**Completed:** 2026-08-03  
**Window boundary:** G11 only; G12 consolidation and final polish were not started

## Objective and outcome

Lead-level traffic is now one coherent divided evidence section. DataForSEO search estimates, market navigation, CrUX performance/popularity, observations, and attribution remain distinct source regions without recursive cards. The individual explorer uses the same metric, globe, selected-country, and overall-state vocabulary as aggregate traffic while preserving the showcase and aggregate compositions.

No traffic parsing, source-state interpretation, metric calculation, Core Web Vitals threshold, attribution derivation, aggregation, country support, selection, rotation, or click behavior changed. Provider zero remains visible; absent enrichment remains absent; partial, unavailable, and no-coverage states remain explicit.

## Requirements gathered and plan executed

1. Read G11 and its dependencies: G1 fixtures, G7 aggregate handoff, G10 expanded-evidence handoff, TE6 traffic handoff/evidence, installed Next.js 16.2.12 CSS and server/client guides, owned components, API types/validation, aggregation, fixtures, and focused tests.
2. Inventoried provider, component, metric, state, date, target/origin, market, assessment, disclaimer, link, license, transformation, and missing/zero fields before presentation edits.
3. Kept the locked expanded order: lead overview, traffic analysis, category/store fit, then discovery provenance.
4. Refactored individual traffic into one parent with divider-led source/scope/attribution regions, responsive inset metrics/globe, explicit provider/component states, and source footers.
5. Added production-markup, order, shared-mode, safe-link, field-retention, and responsive browser checks; captured all three globe modes at 390, 768, 1280, and 1440.
6. Ran focused, full, browser, lint, TypeScript, diff, and production-build verification; stopped before G12.

## Changed files

- `components/traffic-enrichment.tsx` — presentation hierarchy, provider count/labels, explicit CrUX component states, and divided observation footers.
- `app/globals.css` — G11-scoped source ledger, transparent/inset hierarchy, responsive stacking, attribution dividers, and 10px individual-traffic minimum-type guard.
- `test/lead-details-component.test.ts` — retained-field/source-state/provider-count assertions.
- `test/design-system-individual-traffic.test.ts` — G11 order, composition, and shared globe invariants.
- `scripts/g11-browser-regression.mjs` — deterministic compiled-CSS three-mode responsive harness.
- `review-evidence/design-system/G11/*` — twelve screenshots, machine checks, and sanitized server log.

No API type, parser, validator, fixture, aggregation, CSV, authentication, dependency, lockfile, `traffic-globe.tsx`, `cumulative-traffic.tsx`, compact-row behavior, G9 overview, or G10 evidence code changed.

## Field and state inventory retained

- DataForSEO: overall state, truthful search-estimate disclaimer, worldwide and every supported-market instance of all nine metrics, measured zeros, target, observation time, market order, selected country, overall reset, and no-material messages.
- CrUX origin: overall/component state, origin, LCP/INP/CLS/FCP/TTFB p75 values including zero, semantic abbreviations, per-vital rating, complete/incomplete overall assessment, form-factor fractions including zero, collection dates, observation time, and no-coverage/unavailable messages.
- CrUX popularity: component state, origin, coarse rank/band, dataset month, device fractions including zero, observation time, and no-coverage/unavailable messages.
- Attribution: provider name/text, safe source and optional license links, license name, transformation, and non-endorsement disclaimer.
- Absence remains no traffic section. DataForSEO-only, CrUX-only, both-provider, state-only, partial, no-coverage, unavailable, and material zero remain distinct.

Presentation-only additions: source provider labels/count, explicit already-validated CrUX origin/popularity state badges, and displayed source origins in observation footers. The existing target/date line is now split into wrapping footer items. No values are synthesized or reinterpreted.

## Browser evidence

- `G11/{showcase,aggregate,individual}-{390x844,768x1024,1280x800,1440x900}.png`
- `G11/browser-checks.json`
- `G11/browser-server.log`

Every scenario reports no document overflow, all supported market controls present, and no unsafe external links. Individual mode reports all 14 visible metric cells and a 10px minimum required type size at every width. The interaction record selects the final supported market, retains `aria-pressed="true"` and focus, and finds no unsupported-country control. Shared showcase/aggregate microtype remains at its pre-G11 9px/7px values because G11 did not silently redesign those locked modes.

Protected run routes still require Neon authentication. The harness therefore uses deterministic `.example` DOM against the real compiled stylesheet. Server-render tests verify actual production markup and field retention, and source-contract tests verify unchanged shared behavior without introducing an auth bypass.

## Verification

```text
node --experimental-strip-types --test test/lead-details-component.test.ts test/design-system-individual-traffic.test.ts test/design-system-baseline.test.ts test/design-system-results-hero.test.ts
PASS — 4 entrypoints

npm test
PASS

npm run lint
PASS

npx tsc --noEmit
PASS

git diff --check
PASS

node scripts/g11-browser-regression.mjs
PASS with permission to bind isolated Next.js/Chrome loopback ports

npm run build
PASS with permission for Turbopack's local helper port
```

The production build retains the previously documented Neon Auth dynamic-cookie diagnostics for public/auth routes; no new warning class was introduced.

## Invariants and stop confirmation

- V1/V4: no validation, aggregation, CSV, or result behavior changed.
- V5/V6: focused rendering covers every existing metric/value, zero, source combination, and state-only boundary; newly surfaced component state/origin values come directly from validated input.
- V8: only the nine supported markets produce controls; selected text/globe state and overall reset paths are unchanged.
- V9/V10: individual mode stacks without body overflow, keeps required type at 10px, and preserves native focusable controls.
- V12: prior G1–G10 work and the parent-owned checklist checkbox were preserved.

G12 was not started.
