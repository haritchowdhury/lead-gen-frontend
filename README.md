# StoreSignal frontend

Next.js App Router frontend for the Shopify lead-generation backend in
`../email_scraper`. It accepts manual store categories, monitors asynchronous
runs, displays persisted lead results, and creates the legacy-compatible CSV in
the browser.

## Local setup

Requirements:

- Node.js 20 or newer
- The backend running on its own port
- The same backend API token configured in both projects, when authentication is
  enabled

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

The completed Neon-backed frontend fixture supplied by the backend is:

```text
run_hH3nIaWOEBsavW0A0ZhKxSKI
```

Open it at `/runs/run_hH3nIaWOEBsavW0A0ZhKxSKI`.

## Environment boundary

Only these values belong in the frontend:

```env
BACKEND_API_BASE_URL=http://127.0.0.1:3000
BACKEND_API_TOKEN=use-the-same-backend-service-token
```

They are server-only. Do not add `NEXT_PUBLIC_` prefixes. Database, Google,
OpenAI, Browserless, or other scraper credentials must remain in the backend.
`BACKEND_API_BASE_URL` must not end with `/`.

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
- `POST /api/runs`
- `GET /api/runs/[runId]`
- `GET /api/runs/[runId]/results`

The Route Handlers add the private service token and proxy short-lived requests
to the backend. Scraping never runs in Vercel. The run page polls every three
seconds without overlapping requests, survives reloads through its URL, and
stops at a terminal state.

CSV serialization lives in `lib/csv-export.ts`. Export-all requests every result
page at a page size of 200, preserves the backend's 25-column legacy order,
converts null values to empty cells, serializes social profiles as JSON, and
protects spreadsheet formula-like text.

## Vercel

Create a Vercel project with `frontend` as the Root Directory and configure
`BACKEND_API_BASE_URL` and `BACKEND_API_TOKEN` for Development, Preview, and
Production. Prefer a non-production backend for preview deployments. No database
credential is needed by Vercel.

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
