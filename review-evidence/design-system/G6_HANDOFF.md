# G6 handoff — query planning, discovery progress, and runtime states

**Status:** implementation complete; ready for parent review  
**Completed:** 2026-08-03  
**Window boundary:** G6 only; completed-results overview/table and G7+ work were not changed

## Objective and outcome

G6 gives initial route loading, query planning, the later discovery pipeline, reconnection, and terminal states one coherent runtime language without changing live behavior. Query planning is visually distinct through a neutral inset surface and patterned forest marker; discovery uses the shared lime pipeline marker. Traffic remains its own fourth metric with truthful Waiting, Analyzing, Complete, and Stopped states.

The route Suspense fallback and client status fallback now share an eventual-content skeleton shaped like the actual run title, progress header, track, and four metrics. Queued, running, review-ready, completed, failed, cancelled, reconnecting, and unavailable states use the G2 badge/notice vocabulary. All existing stage labels, percentage calculations, counters, polling cadence, backoff, refresh triggers, and request paths are unchanged.

## Plan executed

1. Verified G5 completion, G6 ownership, G1/G2 handoffs, current runtime source, local Next.js CSS/loading/server-client guidance, and the Sportz67 loading-shell reference.
2. Traced every run state, stage, metric source, traffic mapping, polling timer, retry delay, and results refresh trigger before editing.
3. Added pure runtime presentation mappings, semantic progress state, a shared eventual-content skeleton, unified notices, and scoped responsive G6 styling.
4. Added deterministic stage/traffic/polling contracts and a compiled-CSS browser state-sequence harness at 390px and 1280px.
5. Ran focused, full, browser, and production verification; stopped before G7.

## Changed files

- `components/run-progress.tsx` — semantic progress card/badge state, unchanged counters, and shared route/client loading skeleton.
- `lib/run-presentation.ts` — pure state-label, state-tone, and existing traffic-state presentation mapping.
- `components/run-workspace.tsx` — shared skeleton and G2 notice classes only; polling/state logic unchanged.
- `app/runs/[runId]/page.tsx` — uses the same skeleton for the Suspense fallback.
- `app/globals.css` — scoped G6 planning/pipeline, metric, skeleton, notice, terminal-state, and responsive styling.
- `test/design-system-runtime.test.ts` — stage boundaries, zero/nonzero planning, independent counters, traffic mapping, state tones, skeleton reuse, and polling invariants.
- `scripts/g6-browser-regression.mjs` — deterministic 390/1280 browser composition and state-sequence checks.
- `review-evidence/design-system/G6/*` — screenshots, machine checks, and sanitized server log.

No API, parser, backend proxy, authentication, polling interval, retry delay, fetch dependency, refresh trigger, progress calculation, stage label, run state, data model, dependency, lockfile, result overview, table, filter, export, or traffic calculation changed.

## Tests and commands

```text
node --experimental-strip-types --test test/design-system-runtime.test.ts
PASS — 1 test entrypoint, 0 failed

npm test
PASS — 11 test entrypoints, 0 failed

npm run lint
PASS

npx tsc --noEmit
PASS

git diff --check
PASS

node scripts/g6-browser-regression.mjs
Sandbox: local server could not bind, as expected
Permitted rerun: PASS

npm run build
Sandbox: expected Turbopack internal helper-port denial
Permitted rerun: PASS — compiled in 12.1s, TypeScript in 11.1s, 6/6 static generations complete
```

The permitted production build emitted the same previously recorded Neon Auth dynamic-cookie diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`. They did not fail the build and no new warning class appeared.

## Browser evidence and provenance

Protected run routes require Neon authentication, so browser composition uses deterministic `.example` DOM against the real compiled G6 stylesheet. Focused source and pure mapping tests verify the production component fields, traffic mapping, stages, polling, retry, and refresh invariants. No authentication bypass or customer data is used.

- `G6/skeleton-{390x844,1280x800}.png`
- `G6/planning-{390x844,1280x800}.png`
- `G6/pipeline-{390x844,1280x800}.png`
- `G6/browser-checks.json`
- `G6/browser-server.log`

All six visual scenarios report `bodyOverflow: false` and exactly four eventual/live metric cells. Planning records 26% with four independent planning metrics; pipeline records 84%, Analyzing traffic, and the reconnection warning. The machine state sequence covers queued, running discovery, traffic analysis, result writing, completed, failed, and cancelled, with Waiting/Analyzing/Complete/Stopped traffic states and stable independent query/store/contact values.

## Invariant checks

- **V1–V2:** no API, parser, authentication, query-edit/start, or data contract change.
- **V3:** contracts preserve `3_000` polling, `[3_000, 5_000, 10_000, 15_000]` retry delays, results refresh increments, recovery reset, and all existing source expressions.
- **V4–V9:** completed results, filtering, table, evidence, and traffic calculation sources are outside the G6 diff; browser fixtures have no body overflow.
- **V10:** progress exposes truthful `aria-busy`, `aria-live`, and progressbar values; fallback exposes a polite named status; reduced-motion remains covered by the global G2 contract.
- **V11:** landing marketing/showcase sources are outside the G6 diff.
- **V12:** prior work was preserved; only G6-owned production presentation, tests, harness, and evidence were added.

## Skipped checks and residual risk

The authenticated live run sequence cannot be mounted deterministically under the existing Neon proxy. Browser evidence therefore cannot directly observe real network responses incrementing counters or a real polling failure/recovery. Pure mapping tests, exact source contracts, and the synthetic browser sequence cover those boundaries without altering or bypassing authentication.

The checklist checkbox remains parent-owned and was not edited. G7 was not started.
