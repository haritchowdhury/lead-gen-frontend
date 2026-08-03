# G-R1 handoff — real-component deterministic browser harness

**Status:** implementation available for parent review; G-R1 is not marked complete  
**Reviewed:** 2026-08-04  
**Window boundary:** G-R1 only; G-R2 was not started

## Outcome

The corrective fixture route mounts the shipped `RunWorkspace` component and drives its existing fetch and React event paths with deterministic synthetic `.example` responses injected before hydration. The primary corrective browser script does not assign application markup with `innerHTML`, add replacement click listeners, alter `/runs/*` proxy protection, or expose a client-side fixture flag.

The existing G-R1 browser artifacts demonstrate the real public landing route plus the real production workspace in query-review, query-planning, active/reconnecting, failed, and completed states. They also intentionally reproduce the expanded-row width defect reserved for G-R2.

## Changed files

- `app/design-fixture/page.tsx` — server-gated fixture page outside `/runs/*`, mounting `RunWorkspace`.
- `lib/design-fixture-gate.ts` — explicit development/test-only, opt-in fail-closed gate.
- `scripts/g-r1-real-component-browser.mjs` — pre-hydration API interception and real-component Chrome matrix.
- `test/design-system-real-component-harness.test.ts` — gate, import, proxy-isolation, and no-copied-markup contracts.
- `package.json` — `test:browser:real-components` command.
- `review-evidence/design-system/G-R1/*` — screenshots, request/interaction checks, server log, and artifact index.
- `DESIGN_SYSTEM_EXECUTION_CHECKLIST.md` — only supported G-R1 ordered-task boxes checked; status remains not started pending parent review.

No production component, styling, authentication, proxy, API, parser, polling, result, CSV, globe, or navigation behavior changed.

## Fixture security and provenance

- `/design-fixture` calls `notFound()` unless `STORESIGNAL_DESIGN_FIXTURES=1` and `NODE_ENV` is `development` or `test`.
- `NODE_ENV=production` fails closed even if the fixture flag is set.
- The flag has no `NEXT_PUBLIC_` prefix and the browser check reports `fixtureFlagClientVisible: false`.
- `proxy.ts` remains limited to `matcher: ["/runs/:path*"]`; the corrective route cannot bypass or weaken protected-run authentication.
- The browser check confirms `/runs/run_fixture_completed` still redirects to `/sign-in` with status 307.
- The parent independently started the production server without an enabling development/test environment and verified `/design-fixture` returns HTTP 404 even when `STORESIGNAL_DESIGN_FIXTURES=1` is supplied. This confirms the production `NODE_ENV` branch fails closed at the HTTP boundary.
- Synthetic data is imported from `test/fixtures.ts`; external fixture values use `.example` domains.
- The successful production build includes the route as a dynamic server route, but the production gate always resolves it through `notFound()`.

## Browser evidence already captured

Primary command:

```text
npm run test:browser:real-components
```

Artifacts:

- `G-R1/browser-checks.json`
- `G-R1/artifact-index.json`
- `G-R1/browser-server.log`
- public landing captures at 390x844, 768x1024, 1024x768, 1280x800, and 1440x900
- completed overview captures at all five required viewports
- completed all-disclosures-open captures at all five required viewports
- focused query-review, query-planning, and reconnect-recovery captures

The machine record shows actual React-controlled query inputs; query PUT and start POST bodies; bounded approximately 3-second polling timestamps with interruption/recovery; terminal failure; filter, sort, debounced search, pagination, CSV success/error request paths; one-expanded-row replacement; resolved-storefront target; individual country selection, SVG keyboard selection, drag suppression, worldwide reset, and unsupported-country absence; disclosure/evidence counts; focus order; element rectangles; and document/internal overflow.

The real-component narrow measurements expose the known G-R2 baseline rather than hiding it: at 390px the expansion shell remains on the table's wide canvas while `.lead-details` is constrained, and at 768px the expansion content remains approximately 2375px wide inside the internal table scroller.

## Independent takeover verification

```text
node --experimental-strip-types --test \
  test/design-system-real-component-harness.test.ts \
  test/design-system-baseline.test.ts \
  test/design-system-shell.test.ts \
  test/design-system-hero.test.ts \
  test/design-system-primitives.test.ts \
  test/design-system-marketing.test.ts \
  test/design-system-runtime.test.ts \
  test/design-system-results-table.test.ts \
  test/design-system-results-hero.test.ts \
  test/lead-details-component.test.ts \
  test/design-system-individual-traffic.test.ts \
  test/design-system-final-polish.test.ts
PASS — 12 entrypoints, 0 failed

npm test
PASS — 16 entrypoints, 0 failed

npm run lint
PASS

npx tsc --noEmit
PASS

npm run build
PASS outside the sandbox — compiled in 13.6s, TypeScript in 14.5s, 7/7 pages generated

git diff --check
PASS
```

The first sandboxed build failed only because Turbopack could not bind its helper port. The permitted rerun passed. It emitted the existing Neon Auth dynamic-cookie diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`, plus `/design-fixture` because the root layout performs the same session lookup for every route; no build failure occurred.

## Takeover rerun note

The original real-component artifacts were produced successfully before this handoff audit. During the takeover, the browser script was temporarily amended to make several residual claims more explicit. The sandboxed rerun could not start Next.js because loopback binding is prohibited; the permitted rerun then remained hung without producing or updating artifacts and was stopped. Those unverified amendments were fully removed. The final harness source matches the already captured evidence contract, passes syntax/focused tests, and the artifact timestamps were not misrepresented as a fresh run.

## Narrow follow-up coverage pending a fresh parent browser run

The parent did not accept the residual evidence gaps and requested one focused source patch. The real-component harness now adds:

- aggregate globe country selection and worldwide reset;
- hyperlink selection followed by an SVG-path `PointerEvent` click, a different SVG-path keyboard selection, drag suppression, and individual worldwide reset;
- expanded visible-state checks for partial/zero, absent, unavailable, and no-coverage traffic;
- explicit expanded lead IDs, visible data labels, disclosure labels, and derived polling intervals with a 2500–3500ms bound;
- two status handlers invoked in rapid succession, followed by final qualified URL, result-count, row-name, and cleared-expansion checks;
- named boolean assertions that terminate the harness if any of these or the existing query, route, resolved-link, unsupported-country, and real-component checks fail.

The focused source contract now requires those assertions and continues to prohibit copied application markup or replacement click listeners. Syntax, focused test, lint, TypeScript, and diff checks pass.

The local browser rerun was attempted once and stopped after Next.js could not become ready under the sandbox's loopback-bind restriction. No stale artifact is claimed as proof for the newly added fields. The parent must rerun `npm run test:browser:real-components` outside the sandbox and inspect the resulting `assertions`, `polling`, `trafficVariants`, `denseEvidence`, `filterState`, and `globe` records before checking the remaining two ordered tasks or G-R1 status.

## Stop confirmation

G-R1 status remains unchecked. G-R2 responsive implementation, G-R3 stylesheet consolidation, and G-R4 ledger work were not started.
