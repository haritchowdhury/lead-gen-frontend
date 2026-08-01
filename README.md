# StoreSignal frontend

Next.js App Router frontend for the Shopify lead-generation backend in
`../email_scraper`. It accepts manual store categories, monitors asynchronous
runs, displays persisted lead results, and creates the legacy-compatible CSV in
the browser.

## Local setup

Requirements:

- Node.js 20 or newer
- The backend running on its own port
- Neon Auth enabled on the same Neon branch used by the backend
- The same private backend API token configured in both projects

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then start the backend:

```bash
cd "../email_scraper"
npm start
```

In a second terminal, start this project:

```bash
cd "../frontend"
npm install
npm run dev
```

Open `http://localhost:3001` if port 3000 is already used by the backend:

```bash
npm run dev -- --port 3001
```

## Environment boundary

Only these values belong in the frontend:

```env
BACKEND_API_BASE_URL=http://127.0.0.1:3000
BACKEND_API_TOKEN=use-the-same-backend-service-token
NEON_AUTH_BASE_URL=your-branch-neon-auth-endpoint
NEON_AUTH_COOKIE_SECRET=at-least-32-random-characters
```

They are server-only. Generate the cookie secret with `openssl rand -base64 32`.
Do not add `NEXT_PUBLIC_` prefixes. Database, Google,
OpenAI, Browserless, or other scraper credentials must remain in the backend.
`BACKEND_API_BASE_URL` must not end with `/`.

The frontend pins `@neondatabase/auth` and mounts its Next.js handler at
`/api/auth/[...path]`. Email/password signup behavior, allowed origins, email
verification, and password-reset delivery are configured in Neon Auth. Configure
verification or an equivalent abuse control before a public launch.

### Dependency security gate

As of 31 July 2026, the current official SDK release is the beta
`@neondatabase/auth@0.4.2-beta`, which pins `better-auth@1.4.18`. `npm audit`
reports advisories in that dependency, primarily for OAuth/OIDC providers,
magic-link/email-OTP, organizations, and auth-server plugins. This application
uses the SDK as a proxy to Neon's managed service, exposes only email/password,
session lookup, and sign-out through its auth Route Handler, and does not enable
those features. Even so, re-check for a Neon SDK release with patched transitive
dependencies before a public production launch; do not force an unsupported
`better-auth` override without Neon compatibility testing.

## Commands

```bash
npm run dev
npm run lint
npm test
npm run build
npm run check
```

## Architecture

The browser only calls same-origin Next.js routes:

- `GET /api/health`
- `POST /api/run-intents/claim`
- `GET /api/runs`
- `POST /api/runs`
- `GET /api/runs/[runId]`
- `GET /api/runs/[runId]/results`
- `GET /api/runs/[runId]/query-audits`
- `GET /api/runs/[runId]/diagnostics`

The Route Handlers validate the Neon Auth session, add the private service token
and a server-derived `X-User-Id`, and proxy short-lived requests to the backend.
The browser can never supply the owner ID. Scraping never runs in Vercel. The run page polls every three
seconds without overlapping requests, survives reloads through its URL, and
stops at a terminal state.

An anonymous home-page submission creates only an expiring backend `RunIntent`.
The opaque intent ID is stored in an HTTP-only, SameSite=Lax cookie. After signup
or signin, `/runs/continue` claims it idempotently and redirects to the owned run
slug. `/runs` lists the current user's run history.

The lead table presents every validated contact channel, contactability tier,
store-fit and identity evidence, discovery provenance, and versioned score
semantics. Evidence-rank v2 is described as a deterministic rank rather than a
probability; legacy score-v1 rows remain readable and use neutral styling. Query
audits and operational diagnostics have a separate paginated view and never
appear as store leads.

CSV serialization lives in `lib/csv-export.ts`. Export-all requests every result
page at a page size of 200, preserves the backend's 25-column legacy prefix,
appends the 12 G3 evidence fields in backend order, converts null values to empty
cells, serializes structured values as JSON, and protects spreadsheet formula-like
text.

## Vercel

Create a Vercel project with `frontend` as the Root Directory and configure all
four server-only variables above for Development, Preview, and Production.
Prefer a non-production backend and Neon branch for preview deployments. No
database credential is needed by Vercel.

Before deployment:

```bash
npm run check
```

## Dependency audit note

As of 31 July 2026, the latest stable Next.js (`16.2.12`) pins PostCSS `8.4.31`
and Sharp `0.34.5`, which npm currently flags in high-severity advisories. The
latest framework-supported ESLint tree also includes an affected
`brace-expansion` branch. `npm audit fix --force` incorrectly proposes breaking
downgrades (including Next.js 9), so it must not be used. Upgrade when Next.js
publishes a compatible patched release, then rerun the complete check suite.
# lead-gen-frontend
