# G4 handoff — landing and query-review hero

**Status:** implementation complete; ready for parent review  
**Completed:** 2026-08-03  
**Window boundary:** G4 only; lower landing sections, loaders, results, and G5+ work were not started

## Objective and outcome

G4 composes the headline, value proof, full-size interactive globe, country links, and primary form as one responsive marketing hero. Query review now uses the same hero, globe, surface, hierarchy, and controls while retaining its repeated editable-search structure.

The globe remains 359px wide at 390, 307px at 768, and 432px at 1280/1440 in captured evidence. Showcase mode presents no traffic metric UI or invented values. All nine existing category suggestions, validation rules, request payloads, redirects, query mutations, ordering, deletion/restoration, saving, starting, and globe geometry/selection logic remain unchanged.

## Plan executed

1. Verified the G1–G3 handoffs, G4 ownership boundary, current source, Next.js 16.2.12 local CSS/link/server-client guidance, and Sportz67 hero/dashboard-preview references.
2. Introduced a shared `landing-hero`/`hero-message` composition for the public landing and protected query-review states.
3. Migrated only hero form/query surfaces to G2 semantic roles and primitives, with responsive recomposition at 980px and 720px.
4. Added focused source contracts and a deterministic real-browser harness for adversarial form/globe/query states.
5. Ran focused, full, browser, and production verification; stopped before G5.

## Changed files

- `app/page.tsx` — G4 landing-page and hero composition hooks.
- `components/landing-sections.tsx` — shared hero message/globe grouping for start and review variants; copy is unchanged.
- `components/run-form.tsx` — semantic card/field/button and truthful busy presentation hooks; behavior unchanged.
- `components/query-editor.tsx` — semantic card/notice/field/button and busy/loading semantics; behavior unchanged.
- `components/run-workspace.tsx` — applies the same G4 hero composition to query review only.
- `app/globals.css` — scoped G4 hero, full-size showcase globe, form/query surface, and responsive composition selectors.
- `test/design-system-hero.test.ts` — focused category, payload, redirect, query mutation/start, globe, and ownership contracts.
- `scripts/g4-browser-regression.mjs` — deterministic real landing and compiled-CSS query-review browser checks.
- `review-evidence/design-system/G4/*` — screenshots, machine checks, and sanitized server log.

No API, parser, backend proxy, authentication, polling, data model, dependency, lockfile, globe geometry/data/selection logic, lower marketing section, loader, result, traffic metric, or evidence component changed.

## Tests and commands

```text
node --experimental-strip-types --test test/design-system-hero.test.ts test/category-validation.test.ts
PASS — 2 test entrypoints, 0 failed

npm test
PASS — 9 test entrypoints, 0 failed

npm run lint
PASS

npx tsc --noEmit
PASS

git diff --check
PASS

node scripts/g4-browser-regression.mjs
PASS after permission to bind local Next.js/Chrome ports

npm run build
Sandbox: expected Turbopack internal helper-port denial
Permitted rerun: PASS — compiled in 11.4s, TypeScript in 11.9s, 6/6 static generations complete
```

The permitted production build emitted the same previously recorded Neon Auth dynamic-cookie diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`. They did not fail the build and no new warning class appeared.

## Browser evidence and provenance

The landing captures use the real `/` route and real React interactions. Query review cannot mount through the existing unauthenticated Neon proxy, so its captures use DOM-only synthetic `.example` content against the real compiled G4 stylesheet. No authentication bypass, credential, backend mutation, or customer data is used.

- `G4/landing-{390x844,768x1024,1280x800,1440x900}.png`
- `G4/landing-empty-error-390x844.png`
- `G4/landing-maximum-error-390x844.png` — 101 categories and exact 100-category validation.
- `G4/landing-pending-390x844.png` — long category and pending primary action.
- `G4/query-review-{390x844,768x1024,1280x800,1440x900}.png` — multiple long queries, generated/edited states, invalid query, restoration, unsaved/saving, and disabled start.
- `G4/browser-checks.json` — viewport/document widths, hero/globe/form rectangles, values, category counts, all nine suggestions, alerts, button labels/states, selected country, query values, metric absence, and pointer interaction.
- `G4/browser-server.log` — sanitized local server output.

All captured scenarios report `bodyOverflow: false`. The real landing globe records a supported-country transition from `aria-pressed="false"` to `"true"` and a changed rendered path after pointer drag. Every showcase scenario records `visibleMetrics: false`.

## Invariant checks

- **V1:** no API, parser, backend proxy, authentication, or data contract source changed; full tests and build pass.
- **V2:** focused contracts retain landing validation/payload/auth redirect/timeout behavior and query load/edit/add/remove/reorder/save/conflict/start behavior.
- **V3–V9:** polling/results/evidence sources are outside the diff. All required G4 widths avoid body overflow.
- **V10:** labels and alerts remain present; forms expose truthful `aria-busy`; query loading uses a polite status; globe keyboard and pointer semantics are unchanged.
- **V11:** production marketing copy is unchanged, showcase metrics remain structurally hidden, and browser checks find no visible metric UI.
- **V12:** the pre-existing G1–G3 work was preserved. G4 adds only owned production hooks/styles, focused tests, harness, and evidence.

## Skipped checks and residual risk

The real protected query editor cannot mount in the deterministic browser without a Neon-compatible authenticated run in `awaiting_query_confirmation`. The harness therefore cannot prove React-level query add/remove/reorder/edit/save/start interaction from a live fixture. It records the exact limitation, uses the real compiled stylesheet with deterministic synthetic query states, and pairs that evidence with focused source contracts preserving each production behavior path. No auth bypass was introduced.

The checklist checkbox remains parent-owned and was not edited. The user's explicit G4 execution request was treated as approval to proceed from the completed G3 handoff.

G5 was not started.
