# Frontend Agent Handoff: Authentication and Owned Runs

## Implementation status

Implemented in this frontend on 31 July 2026 against pinned
`@neondatabase/auth@0.4.2-beta`. Frontend lint, unit tests, TypeScript, and the
Next.js production build pass. Live account testing still requires a configured
`NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, and the coordinated backend
migration.

## Scope

Implement the Next.js side of the coordinated plan in
`../email_scraper/AUTH_AND_RUN_OWNERSHIP_IMPLEMENTATION_PLAN.md`.

Do not implement or modify the scraper pipeline. Do not connect the browser to
Neon/Prisma run tables. Do not duplicate backend ownership logic in the browser.

Begin only after the backend implements and tests:

- `POST /api/run-intents`;
- `POST /api/run-intents/{intentId}/claim`;
- authenticated `POST` and `GET /api/runs`;
- owner-filtered run status and results; and
- multiple queued runs with serial execution.

## Required outcome

Support these three paths:

```text
signed-in user -> submit search -> /runs/{runId}
new user -> submit search -> sign up -> /runs/{runId}
returning signed-out user -> submit search -> sign in -> /runs/{runId}
```

The pre-authentication search must survive authentication. No paid scraper work
starts until a user owns the run.

## Rules the frontend must preserve

- Keep Next.js App Router and TypeScript.
- This project uses Next.js 16. Read the relevant installed documentation under
  `node_modules/next/dist/docs/` before changing auth proxy or route behavior, as
  required by `AGENTS.md`.
- Use Neon Auth email/password against the existing Neon project.
- Check the current Neon Auth documentation, pin the package version, and use
  that version's APIs. Expected current primitives include `createNeonAuth()`,
  `auth.handler()`, `auth.middleware()`, `auth.getSession()`, and
  `createAuthClient()`; verify their exact imports before implementation.
- Never expose `BACKEND_API_TOKEN`, `NEON_AUTH_COOKIE_SECRET`, database URLs, or
  the backend base URL to client components.
- Never trust a browser-provided `userId`, `ownerId`, `X-User-Id`, redirect URL,
  or intent ID outside the validated cookie flow.
- Every protected Route Handler must validate the session itself. Proxy-level
  redirects are convenience, not the authorization boundary.
- Do not forward browser cookies or arbitrary browser headers to the scraper
  backend.
- Preserve the existing run workspace, result filters, polling, and CSV export.

## Environment configuration

Add placeholders to `.env.example` and configure real values only in
`.env.local`/Vercel:

```text
BACKEND_API_BASE_URL=http://127.0.0.1:3000
BACKEND_API_TOKEN=<existing service token>
NEON_AUTH_BASE_URL=<Neon branch auth endpoint>
NEON_AUTH_COOKIE_SECRET=<at least 32 random characters>
```

Only values explicitly required by the pinned Neon client SDK may be public.
Never invent a `NEXT_PUBLIC_` duplicate of a server secret.

## Files to add

Use names compatible with the pinned SDK and Next.js 16; the intended structure
is:

```text
lib/auth/server.ts
lib/auth/client.ts
app/api/auth/[...path]/route.ts
proxy.ts
app/sign-up/page.tsx
app/sign-in/page.tsx
app/runs/continue/page.tsx
app/runs/page.tsx
app/api/run-intents/claim/route.ts
components/auth-form.tsx
components/run-continuation.tsx
components/run-history.tsx
```

The sign-up and sign-in forms may be separate components if that makes validation
clearer. Reuse the existing visual language rather than importing a second UI
framework.

## Files to modify

At minimum, review and update:

```text
app/layout.tsx
app/api/runs/route.ts
app/api/runs/[runId]/route.ts
app/api/runs/[runId]/results/route.ts
app/runs/[runId]/page.tsx
components/app-header.tsx
components/run-form.tsx
components/export-csv-button.tsx
lib/backend-proxy.ts
lib/api-types.ts
.env.example
README.md
package.json
```

## Step 1: Configure Neon Auth centrally

1. Add one server-only auth module using `createNeonAuth()`.
2. Add the corresponding browser client using `createAuthClient()`.
3. Mount the SDK handler at `/api/auth/[...path]`.
4. Add the Next.js 16 `proxy.ts` integration for page-level redirects.
5. Keep `/`, `/sign-up`, `/sign-in`, `/api/health`, and the auth handler public.
6. Protect `/runs`, `/runs/*`, and run-related API routes at the proxy level.
7. Independently call `auth.getSession()` inside every protected Route Handler.

Do not perform a database lookup directly from a Client Component to decide
ownership.

## Step 2: Implement minimal email/password screens

### Sign-up

Collect only:

```text
name
email
password
```

Use the auth client email signup method. On success, navigate to
`/runs/continue`. Show safe inline errors and never log passwords or full auth
responses.

### Sign-in

Collect:

```text
email
password
```

Use the auth client email sign-in method. On success, navigate to
`/runs/continue`.

Both pages must link to each other. Both use the same fixed continuation route;
do not implement arbitrary `callbackUrl`/`returnTo` redirects in v0.1.

If there is no pending search, `/runs/continue` should safely redirect to
`/runs` after authentication.

### Sign-out and header

Update the header so:

- signed-out users see `Sign in`;
- signed-in users see `My runs` and `Sign out`; and
- signing out returns to `/` without deleting an unrelated pending intent.

## Step 3: Make the existing run submission auth-aware

Keep the browser request unchanged:

```http
POST /api/runs
Content-Type: application/json

{"shopTypes":["Independent eyewear"]}
```

Change the Next.js handler behavior:

### When a session exists

1. Obtain `session.user.id` server-side.
2. Proxy to backend `POST /api/runs`.
3. Add `X-User-Id: session.user.id` in the server-to-server helper.
4. Return the existing `202 StartRunResponse`.
5. `RunForm` navigates to `/runs/{runId}` as it does today.

### When no session exists

1. Proxy the same validated body to backend `POST /api/run-intents`.
2. Parse and validate `intentId` and `expiresAt` from the backend response.
3. Set:

   ```text
   name: storesignal_pending_run_intent
   value: <opaque intent ID>
   HttpOnly: true
   Secure: true in production
   SameSite: lax
   Path: /
   Max-Age: no longer than backend intent expiry (default 3600 seconds)
   ```

4. Return:

   ```http
   HTTP/1.1 401 Unauthorized
   ```

   ```json
   {
     "error": {
       "code": "AUTHENTICATION_REQUIRED",
       "message": "Create an account or sign in to start this search.",
       "details": { "continueUrl": "/sign-up" }
     }
   }
   ```

5. Update `RunForm` to recognize only this fixed internal continuation and
   navigate to `/sign-up`.

Do not start a run, call pipeline APIs, or store raw categories in the cookie.

## Step 4: Extend the backend proxy safely

Refactor `lib/backend-proxy.ts` as needed so server-side callers can:

- supply a trusted `userId` obtained from the session;
- add `X-User-Id` only when `userId` is present;
- inspect a validated backend JSON response when a handler must set a cookie;
- preserve existing timeout and safe-error behavior; and
- continue adding `BACKEND_API_TOKEN` privately.

The helper must construct headers explicitly. It must never forward incoming
browser `Authorization`, `X-User-Id`, cookies, or arbitrary headers.

## Step 5: Implement post-auth claim and redirect

### Same-origin claim handler

Create `POST /api/run-intents/claim`:

1. Require a valid auth session.
2. Read `storesignal_pending_run_intent` using the server cookie API.
3. If absent, return a safe `404 NO_PENDING_SEARCH` response.
4. Validate the opaque intent pattern before using it in a backend URL.
5. Call `POST /api/run-intents/{intentId}/claim` with the service token and
   authenticated `X-User-Id`.
6. On success, clear the pending cookie and return the backend
   `StartRunResponse`.
7. On an expired intent, clear the cookie and return a message that asks the user
   to submit the search again.
8. Do not clear the cookie on a transient backend timeout, so retry remains
   possible.

### Continuation page

`/runs/continue` is a protected loading page. It should:

1. Issue one `POST /api/run-intents/claim` request.
2. On success, call `router.replace('/runs/' + encodeURIComponent(runId))`.
3. If there is no pending intent, replace with `/runs`.
4. For a transient error, show a retry button without resubmitting categories.
5. Avoid duplicate client requests in React Strict Mode. The backend claim is
   idempotent as the final safeguard.

Both a new signup and a returning-user login must land on this page.

## Step 6: Protect existing run APIs and pages

For each of these handlers:

```text
GET /api/runs/[runId]
GET /api/runs/[runId]/results
POST /api/runs
GET /api/runs
POST /api/run-intents/claim
```

- call the server auth session API;
- return `401 AUTHENTICATION_REQUIRED` if missing;
- use only `session.user.id` as the forwarded identity; and
- preserve `Cache-Control: no-store`.

Protect `/runs/[runId]` at the page/proxy layer for good navigation behavior, but
do not treat that redirect as authorization. The backend remains authoritative
and returns the same `404` for a missing or foreign run.

CSV export needs no new auth code in the browser because it already fetches
through the protected same-origin results handler.

## Step 7: Add the My Runs page

Add `GET /api/runs` to the existing Next.js route file and proxy only `page` and
`pageSize` after session validation.

Add `/runs` with a paginated newest-first list showing:

- submitted categories;
- queued/running/completed/failed state;
- creation time;
- completion time when available;
- result totals when available; and
- a link to `/runs/{runId}`.

Do not load lead result rows for the history list. Keep the page dynamic and
uncached.

Update `lib/api-types.ts` with explicit types for:

```text
RunListItem
RunListResponse
RunIntentResponse
AuthenticationRequiredError details
```

Do not use `any` for new API payloads.

## Step 8: Loading and error UX

Required user-facing cases:

- signup/sign-in pending;
- invalid credentials;
- pending search being resumed;
- expired search intent with a link back to `/`;
- backend temporarily unavailable with retry;
- no previous runs;
- queued run waiting behind another run; and
- foreign/nonexistent run shown as not found without ownership details.

Never display raw auth-provider errors, stack traces, user IDs, backend URLs, or
intent IDs.

## Step 9: Tests

Add automated tests covering:

1. Anonymous `POST /api/runs` creates an intent, sets the exact secure cookie,
   and returns `AUTHENTICATION_REQUIRED`.
2. Authenticated `POST /api/runs` forwards only the session user ID.
3. A browser-supplied `X-User-Id` cannot override the session identity.
4. Missing sessions return `401` on owned API routes.
5. Claim success clears the cookie and returns one run ID.
6. Claim timeout retains the cookie.
7. Expired intent clears the cookie and shows the restart path.
8. Sign-up and sign-in both navigate to `/runs/continue`.
9. Continuation success uses `router.replace`, not `push`, for the run slug.
10. Continuation without a pending intent redirects to `/runs`.
11. Run history forwards only approved pagination parameters.
12. Existing category validation, polling, results, and CSV tests still pass.

Mock Neon Auth session resolution and backend HTTP calls in route tests. Do not
use real user credentials or consume external scraper APIs in the default suite.

## Step 10: Documentation and checks

Update `README.md` with:

- Neon Auth setup;
- all frontend environment variables;
- local sign-up/sign-in instructions;
- the pending-search continuation behavior;
- the `/runs` history page; and
- the backend contract/version required by this frontend.

Run:

```bash
npm run lint
npm test
npm run build
```

Then perform a preview deployment test with two accounts and confirm cross-user
run access returns not found.

## Frontend definition of done

The frontend work is done when a signed-out visitor can submit once, choose
either sign-up or sign-in, and land on exactly one owned run slug without
re-entering the search; signed-in submission goes directly to a slug; `/runs`
shows only the current user's history; and no client-controlled value can select
the owner used by the backend.
