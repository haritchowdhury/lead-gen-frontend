# G5 handoff — lower landing page, CTA, and footer

**Status:** implementation complete; ready for parent review  
**Completed:** 2026-08-03  
**Window boundary:** G5 only; hero/form, runtime loaders, results, and G6+ work were not changed

## Objective and outcome

G5 finishes the marketing page below the shared G4 hero with a restrained white/dark/neutral/lime rhythm, clearer editorial hierarchy, compact product-preview surfaces, an enclosed final CTA, and a complete inverse footer. The hero-to-problem seam is marked by a short signal rule rather than another card.

All existing claims and explanatory copy remain unchanged. Public process/final CTA links still target `#start-discovery`; review variants still target `#query-review`. Footer product links now use local fragment targets so they work on both the public and query-review pages without leaving the current page. Native FAQ disclosures remain keyboard-operable, and the decorative plus is hidden from assistive technology.

## Plan executed

1. Verified the G4 handoff, G5 ownership boundary, current landing source, local Next.js 16.2.12 CSS and Link guides, and the Sportz67 landing rhythm reference.
2. Scoped the complete lower page under `marketing-flow` and established its surface rhythm and responsive editorial hierarchy.
3. Refined problem, process, intelligence, evidence, market, use-case, control, FAQ, CTA, and footer presentation without changing product claims or workflow logic.
4. Added source contracts and a real-browser full-page harness for responsive, keyboard, sticky-anchor, content, and target checks.
5. Ran focused, full, browser, and production verification; stopped before G6.

## Changed files

- `components/landing-sections.tsx` — lower-page scope hook, local footer fragments, and decorative FAQ icon semantics.
- `app/globals.css` — scoped G5 section rhythm, editorial/product-preview hierarchy, readable microcopy, focus treatment, CTA/footer finish, and responsive recomposition.
- `test/design-system-marketing.test.ts` — section inventory, truthful-copy, CTA-target, footer-anchor, FAQ, token, responsive, and ownership contracts.
- `scripts/g5-browser-regression.mjs` — deterministic CDP full-page captures and machine checks.
- `review-evidence/design-system/G5/*` — screenshots, machine-readable checks, and sanitized server log.

No hero/form, API, parser, backend proxy, authentication, polling, query behavior, data model, dependency, lockfile, results, or traffic logic changed.

## Tests and commands

```text
node --experimental-strip-types --test test/design-system-marketing.test.ts test/design-system-hero.test.ts
PASS — 2 test entrypoints, 0 failed

npm test
PASS — 10 test entrypoints, 0 failed

npm run lint
PASS

npx tsc --noEmit
PASS

git diff --check
PASS

rg -n 'mailto:|testimonial|pricing|street address|trusted by|[0-9]+%' components/landing-sections.tsx app/page.tsx
PASS — no matches

node scripts/g5-browser-regression.mjs
Sandbox: local server could not bind, as expected
Permitted final run: PASS

npm run build
Sandbox: expected Turbopack internal helper-port denial
Permitted rerun: PASS — compiled in 12.1s, TypeScript in 11.6s, 6/6 static generations complete
```

The permitted production build emitted the same previously recorded Neon Auth dynamic-cookie diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`. They did not fail the build and no new warning class appeared.

## Browser evidence and provenance

The captures use the real public `/` route and production React markup with no customer data. The query-review target check is a DOM-only synthetic target substitution because the protected review route cannot be mounted deterministically without Neon authentication; source contracts separately verify the review labels and `#query-review` branch.

- `G5/landing-full-{390x844,768x1024,1280x800,1440x900}.png`
- `G5/browser-checks.json`
- `G5/browser-server.log`

All four full-page scenarios report `bodyOverflow: false`, all ten owned lower sections with non-zero dimensions, seven FAQ disclosures, two footer navigation groups, and both public CTAs targeting `#start-discovery`. The keyboard interaction opens the FAQ while retaining focus and a solid 2px outline. Footer anchor navigation resolves `#how-it-works` and leaves the section visible below the 61px sticky header. The review fixture records two `#query-review` targets.

## Invariant checks

- **V1–V5:** no application workflow, request, polling, result, export, or evidence source changed; full tests and build pass.
- **V6–V10:** result-state and evidence components are outside the G5 diff. FAQ retains native disclosure semantics and truthful focus; responsive captures have no body overflow.
- **V11:** marketing copy is unchanged, showcase behavior remains G4-owned, and source/browser scans find no contact address, testimonial, pricing, percentage, or trust claim.
- **V12:** existing work was preserved; the final diff contains only G5-owned production styling/markup plus focused test and evidence files.

## Skipped checks and residual risk

The authenticated query-review page cannot be mounted as a deterministic live browser fixture under the existing Neon proxy. G5 therefore proves review-target selection through focused source contracts and a synthetic DOM target check against the real page/CSS. No authentication bypass was introduced.

The checklist checkbox remains parent-owned and was not edited. G6 was not started.
