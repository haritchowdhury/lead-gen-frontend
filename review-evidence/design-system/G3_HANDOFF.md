# G3 handoff — application shell, authentication, and run history

**Status:** implementation complete; ready for parent review  
**Completed:** 2026-08-03  
**Window boundary:** G3 only; no landing, query, results, expanded-evidence, or G4 work started

## Outcome

G3 brings the shared header, authentication pages, run history, continuation, not-found, and fatal-state shell into the G2 visual system. The application now uses one warm neutral canvas, a compact sticky 60–64px header, consistent page-title composition, semantic controls/fields/cards/notices/badges, divided history rows, and purposeful loading/empty/error states.

Authentication calls, validation branches, redirects, run-list fetching, page size, pagination rules, status labels, and link targets are unchanged. Long run IDs remain available through the code value and `title` while composing safely at 390px.

## Plan executed

1. Verified the G2 handoff, G3 boundary, clean starting worktree, current owned components, local Next.js linking/CSS/server-client guidance, and Sportz67 shell references.
2. Migrated the shared header and owned page shells to G2 semantic tokens and primitives.
3. Composed auth, continuation, fatal, history loading/error/empty/list/pagination states without changing their behavior contracts.
4. Added focused source regressions and a direct-Chrome G3 harness covering real public pages plus compiled-CSS synthetic protected states.
5. Ran focused, full, responsive, and production verification; stopped before G4.

## Changed files

- `app/globals.css` — G3-owned shell/header/auth/history/continuation/fatal selectors and responsive recomposition.
- `app/runs/page.tsx` — application canvas/page-header and shared primary action classes.
- `app/not-found.tsx` — shared state shell/card/button classes.
- `components/app-header.tsx` — explicit auth-state evidence hook and decorative semantics; session behavior unchanged.
- `components/header-auth.tsx` — compact primary account-action class; targets and sign-out logic unchanged.
- `components/auth-form.tsx` — semantic field/card/notice/button composition and busy semantics.
- `components/run-history.tsx` — semantic badges, loading ledger, empty/error/actions, long-ID affordance, and descriptive row labels.
- `components/run-continuation.tsx` — shared state shell/actions and polite live region.
- `test/design-system-shell.test.ts` — G3 authentication, redirect, fetching, paging, labels, links, and primitive contracts.
- `scripts/g3-browser-regression.mjs` — deterministic local browser verification.
- `review-evidence/design-system/G3/*` — screenshots, machine checks, and sanitized server log.

No API, parser, authentication client/server, run fetching, data model, dependency, lockfile, landing, query, result, traffic, or evidence component changed.

## Verification

```text
node --experimental-strip-types --test test/design-system-shell.test.ts
PASS — 4 G3 subtests, 0 failed

npm test
PASS — 8 test entrypoints, 0 failed

npx tsc --noEmit
PASS

npm run lint
PASS

git diff --check
PASS

node scripts/g3-browser-regression.mjs
PASS after permission to bind the local Next.js/Chrome ports

npm run build
PASS after permission for Turbopack's internal helper port; compiled in 11.4s, TypeScript and all six static generations completed
```

The production build emitted the already-recorded Neon dynamic-cookie diagnostics for `/`, `/_not-found`, `/sign-in`, and `/sign-up`. They did not fail the build and no new warning class appeared.

## Browser evidence and fixture provenance

The harness uses real `/sign-in`, `/sign-up`, and not-found routes. History uses DOM-only synthetic `.example` content against the real compiled G3 stylesheet because the existing Neon proxy blocks unauthenticated protected-page mounting. No auth bypass, credential, backend call, or customer data is used.

- `G3/sign-in-{390x844,768x1024,1280x800}.png`
- `G3/sign-up-{390x844,768x1024,1280x800}.png`
- `G3/sign-up-validation-390x844.png` — name validation.
- `G3/sign-up-password-validation-390x844.png` — password validation.
- `G3/sign-in-pending-long-email-390x844.png` — pending control and long synthetic email.
- `G3/history-all-states-{390x844,768x1024,1280x800}.png` — signed-in header, long IDs, all six run states, focused row, and multi-page pagination.
- `G3/history-empty-390x844.png` — empty state.
- `G3/not-found-{390x844,768x1024,1280x800}.png`
- `G3/browser-checks.json` — viewport/document widths, overflow, auth state, focus, alerts, labels, exact links, row targets, and protected redirect.

Every captured scenario reports `bodyOverflow: false`. The real `/runs` request still resolves to `/sign-in`. Link evidence retains `/`, `/sign-in`, `/sign-up`, `/runs`, and encoded run-detail targets.

## Invariant checks

- **V1–V4:** no API/auth/polling/filter/export behavior changed; focused source contracts and full tests pass.
- **V5–V9:** evidence/results code is outside the diff. Long history identifiers compose without body overflow at all required G3 widths.
- **V10:** native labels remain, errors retain `role="alert"`, pending forms expose `aria-busy`, continuation uses a polite live region, and keyboard focus is visible on the synthetic history row.
- **V11:** landing copy/data was not changed.
- **V12:** initial G3 `git status --short` was clean. Only G3-owned source, tests, harness, and evidence changed.

## Skipped checks and residual risk

The real signed-in header, real `RunHistory` client fetch states, and continuation success/error states cannot mount in the deterministic browser without a Neon-compatible local session. The harness records the unchanged `/runs` → `/sign-in` redirect and uses the real compiled CSS with synthetic DOM-only G3 states; focused tests separately preserve the production fetch, retry, redirect, paging, and link contracts. No authentication bypass was introduced.

G4 was not started.
