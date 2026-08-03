# G2 handoff — semantic tokens and shared visual primitives

**Status:** implementation complete; ready for parent review  
**Completed:** 2026-08-03  
**Window boundary:** G2 only; no application page migration and no G3 work started

## Outcome

G2 adds a compact, opt-in visual vocabulary without broadly restyling existing pages. `app/globals.css` now defines semantic color, typography, spacing, radius, control-height, motion, focus, and exactly three elevation roles. Existing token names remain aliases with their original visible values, and all legacy selectors remain in place.

Presentation-only React primitives cover buttons, icon buttons, cards, inset groups, section headers, badges, metrics, fields, notices, native disclosures, skeletons, and empty states. They are server-compatible and add no client boundary, dependency, remote font, or icon package.

The global keyboard fallback gives focus-visible elements a high-contrast two-pixel outline. Motion transitions are scoped to interactive G2 selectors; the existing reduced-motion media query collapses transitions and animations to `0.01ms`.

## Plan executed

1. Verified the G1 handoff and G2 ownership boundary; treated the user's explicit G2 execution request as parent approval because the checklist checkbox remains parent-owned.
2. Read the required local Next.js server/client and CSS guides, current global/layout/icon sources, and the Sportz67 token/Card/Button references.
3. Added stable semantic tokens with exact-value legacy aliases and an opt-in `ds-*` CSS layer.
4. Added presentation-only shared React primitives and static regression tests.
5. Captured real compiled-CSS evidence for unmigrated public pages, narrow primitive states, keyboard focus, and reduced motion.
6. Ran focused and standard verification; stopped before G3.

## Changed files

- `app/globals.css` — semantic tokens, legacy aliases, opt-in primitives, focus-visible baseline, and scoped motion.
- `components/ui/primitives.tsx` — shared presentation-only React primitives.
- `test/design-system-primitives.test.ts` — token, elevation, transition, reduced-motion, focus, native-semantics, and zero-value contracts.
- `scripts/g2-browser-regression.mjs` — dependency-free local Next.js/Chrome evidence harness.
- `review-evidence/design-system/G2/*` — screenshots, browser measurements, and sanitized server log.
- `review-evidence/design-system/G2_HANDOFF.md` — this handoff.

No page, API, parser, proxy, authentication, polling, data model, icon meaning, dependency, lockfile, or G1 artifact was changed.

## Token and primitive usage contract

Later windows should consume semantic roles, not introduce raw alternatives:

- Canvas/surfaces: `--color-canvas`, `--color-surface`, `--color-surface-inset`.
- Text/lines: `--color-ink`, `--color-ink-muted`, `--color-ink-subtle`, `--color-line`, `--color-line-strong`.
- Emphasis/state: signal only for primary/selected emphasis; positive, warning, and danger roles only for truthful semantic states.
- Elevation: only `--elevation-inset`, `--elevation-card`, or `--elevation-floating`.
- Shape/control: use `--radius-control`, `--radius-card`, `--radius-panel`, `--radius-pill` and the three control heights.
- Application composition: prefer `.ds-card` with divider-separated regions or `.ds-inset`; avoid equally strong nested cards.
- Shared behavior: import primitives from `components/ui/primitives.tsx` or use their `ds-*` classes when an existing semantic element must be retained. Do not add a client boundary merely for styling.

Legacy names and selectors are compatibility-only. Later bounded windows may migrate their owned selectors to semantic roles, but should not remove legacy definitions until source usage is proven absent.

## Tests and verification

```text
node --experimental-strip-types --test test/design-system-primitives.test.ts
PASS — 1 test file, 0 failed

npm run lint
PASS

npm test
PASS — 7 test entrypoints, 0 failed

npx tsc --noEmit
PASS

git diff --check
PASS

npm run build
PASS — compiled successfully, TypeScript and page-data generation completed; .next/BUILD_ID produced
```

The first sandboxed browser command could not bind the local development port. The permitted rerun passed. The first reduced-motion browser run correctly returned `0.01ms` as Chrome's canonical `1e-05s`; the harness assertion was made representation-tolerant and the final run passed.

The sandboxed build output stopped during compilation under the known Turbopack restriction. The permitted production build compiled successfully in 14.7 seconds, completed its build artifact, and produced `.next/BUILD_ID`. Existing Neon static-render behavior remains unrelated to this CSS-only change.

## Browser evidence

Reproduce with:

```text
node scripts/g2-browser-regression.mjs
```

The harness runs the real compiled stylesheet, injects its synthetic primitive matrix into the browser DOM only, and stores no credentials or customer data. Evidence:

- `G2/landing-regression-{390x844,768x1024,1280x800}.png` — unmigrated landing composition; no body overflow.
- `G2/auth-focus-390x844.png` — keyboard Tab target is `StoreSignal home` with a computed solid 2px forest outline.
- `G2/primitive-matrix-390x844.png` — long button label, disabled/loading controls, all semantic badges/notices, zero metric, inset, open disclosure, skeleton, and empty state; no body overflow.
- `G2/primitive-matrix-reduced-motion-1280x800.png` — desktop matrix under reduced-motion emulation.
- `G2/browser-checks.json` — resolved tokens, widths, bounding rectangles, focus target/outline, overflow, redirects, and computed motion durations.

Reduced-motion checks report `matches: true`, transition duration `1e-05s`, and animation duration `1e-05s` (Chrome's serialization of `0.01ms`).

## Invariant checks

- **V1–V9:** no behavior/data-owned source changed. Full G1 tests pass. Landing regression is captured at 390/768/1280 with no overflow.
- **V10:** native `details`/`summary` semantics are retained; the keyboard focus target has a visible computed outline; reduced motion is machine-verified.
- **V11:** no marketing copy, data, or showcase metric changed.
- **V12:** initial G2 `git status --short --untracked-files=all` was clean. G2 touched only its owned stylesheet/new primitives, tests, harness, and evidence; no unrelated file was changed.

## Skipped checks and residual risk

Current results and expanded-lead screenshots remain unavailable for the same exact G1 prerequisite: the real Neon proxy redirects unauthenticated deterministic sessions to `/sign-in` before client fixtures mount. The G2 harness records `/runs`, the synthetic query-review run, and the synthetic completed run all redirecting to `/sign-in`. G2 made no authentication bypass.

Because G2 primitives are intentionally opt-in and no application page is migrated, the synthetic DOM matrix is the direct visual proof for primitive states. Later windows must provide page-level proof as they adopt these primitives.

G3 was not started.
