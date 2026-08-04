# User Master Leads Implementation Plan

## Objective

Build a user-scoped, deduplicated, live "My Leads" workspace containing every shop the authenticated user has ever discovered.

The system must preserve two distinct data products:

1. **Run results** remain immutable historical snapshots of what a specific run produced.
2. **My Leads** reads the current master shop/profile/traffic data and changes when later refresh or cron work updates that master data.

A user may see a live shop only after one of their own runs discovered it. Users must never gain access to another user's runs, discovery history, notes, or shops merely because the global shop exists.

## Core architecture

```text
Authenticated user
  -> UserShop (authorization, discovery metadata, user CRM state)
    -> UserShopDiscovery (one durable membership record per run in which it appeared)
    -> Shop (global deduplicated identity)
      -> ShopLeadProfile (current live profile)
      -> current shop-level traffic/enrichment

Run
  -> Lead (immutable run-specific snapshot)
    -> Shop
```

The authorization rule is:

> `UserShop` determines whether a user can see a shop. `ShopLeadProfile` and current shop traffic provide live data. `Lead` preserves historical run output.

Do not create a physical master table per user. Use one user-to-shop join table with a unique `(userId, shopId)` constraint.

## Required invariants

- A shop is globally deduplicated by `Shop.stableKey`.
- The same shop discovered in multiple runs creates one `UserShop` for that user.
- Different users can each have a `UserShop` for the same global shop.
- Every live-list query starts from `UserShop.userId = authenticatedUserId`.
- `userId` is taken only from the trusted authenticated session/header, never from client input.
- A run lead and its corresponding `UserShop` grant are persisted atomically.
- Every distinct run in which the user discovered the shop is retained through `UserShopDiscovery`.
- Cron/profile refreshes update current master data without changing historical `Lead` rows.
- Run endpoints never substitute current master fields into historical results.
- Live traffic aggregation counts each accessible shop once, even if it appeared in many runs.
- User-owned fields never live on the global `Shop` or `ShopLeadProfile`.

## Data ownership

### Global current shop data

Keep on `Shop`, `ShopLeadProfile`, or a new shop-level current enrichment model:

- Stable identity and domains
- Current store name
- Current email and phone
- Current contact URL and social profiles
- Current contact and identity evidence
- Current website/profile state
- Current traffic and CrUX/DataForSEO enrichment
- Profile/enrichment freshness, refresh state, and safe refresh errors

### User-specific data

Keep on `UserShop`:

- Access to the shop
- First and last discovery timestamps
- First and last discovery run IDs
- Discovery count
- User lifecycle/CRM status
- Notes and tags
- Archive state

### Historical run data

Keep on `Lead`:

- Run query and Google result/rank
- Category requested in that run
- Run-specific category assessment
- Evidence and score as observed during the run
- Qualification/rejection result
- Historical run-level traffic snapshot

Do not present run-dependent rank, relevance, or score as a universal current shop property. If shown in My Leads, label it explicitly as latest-discovery or historical context.

## Backend repository

Backend path: `/home/harit/Email Scrapper/email_scraper`

### 1. Prisma schema

Add a model equivalent to:

```prisma
model UserShop {
  id                   String   @id
  userId               String
  shopId               String
  shop                 Shop     @relation(fields: [shopId], references: [id], onDelete: Restrict)
  firstDiscoveredAt    DateTime @default(now())
  lastDiscoveredAt     DateTime @default(now())
  firstDiscoveredRunId String?
  lastDiscoveredRunId  String?
  discoveryCount       Int      @default(1)
  lifecycleStatus      String?
  notes                String?
  tags                 String[] @default([])
  archivedAt           DateTime?
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  discoveries          UserShopDiscovery[]

  @@unique([userId, shopId])
  @@index([userId, lastDiscoveredAt])
  @@index([userId, lifecycleStatus])
  @@index([shopId])
}

model UserShopDiscovery {
  id          String   @id
  userShopId  String
  userShop    UserShop @relation(fields: [userShopId], references: [id], onDelete: Cascade)
  runId       String
  run         Run      @relation(fields: [runId], references: [id], onDelete: Restrict)
  leadId      String?
  discoveredAt DateTime
  createdAt   DateTime @default(now())

  @@unique([userShopId, runId])
  @@index([runId])
  @@index([userShopId, discoveredAt])
}
```

Add `userShops UserShop[]` to `Shop`.

`UserShopDiscovery` is the authoritative run-membership history. The first/last run fields on `UserShop` may be retained as denormalized query helpers, but must agree with the earliest/latest discovery rows. Define deliberate deletion behavior: preserving discovery history is preferred, so completed runs referenced by a discovery should not be silently cascaded away.

Add freshness metadata to the current shop profile or an associated refresh-state model:

- `lastCheckedAt`
- `nextRefreshAt`
- `refreshState`
- `profileVersion`
- safe error code/message if needed

Do not build cron execution in the initial master-list milestone, but make the model cron-ready.

### 2. Current shop-level traffic

The live page must not read `LeadTrafficEnrichment`, because it belongs to a run snapshot.

Use the existing durable traffic cache if it can be joined safely and deterministically to `Shop`. Otherwise introduce an explicit current shop enrichment projection/model that:

- belongs to `Shop`;
- stores the currently published DataForSEO/CrUX material;
- records observation and refresh timestamps;
- preserves provider contract validation;
- is refreshed independently of run leads.

Historical `LeadTrafficEnrichment` remains unchanged.

### 3. Discovery persistence

When a run persists a lead with a resolved `shopId`, upsert `UserShop` for `Run.ownerId` in the same transaction.

Also insert one `UserShopDiscovery` for the `(userShopId, runId)` pair. Its unique constraint is the idempotency boundary: worker retries insert no second membership, and `discoveryCount` changes only when a new membership is created.

First discovery:

- create `UserShop`;
- set first and last discovery timestamps/run IDs;
- set `discoveryCount = 1`.

Repeat discovery in a different run:

- retain the original first-discovery values;
- update last-discovery values;
- increment `discoveryCount` exactly once per newly published run/shop pair.

The write must be replay-safe. Existing worker retries must not inflate `discoveryCount`. Prefer deriving the count from `UserShopDiscovery`, or increment it only when `createMany({ skipDuplicates: true })`/an equivalent insert proves that a new unique membership was created.

Runs without an owner must not create a user grant.

### 4. Backfill migration

Backfill one `UserShop` per distinct owned `(Run.ownerId, Lead.shopId)` pair and one `UserShopDiscovery` per distinct owned `(userShopId, Run.id)` membership.

For each pair derive:

- earliest run timestamp/run ID;
- latest run timestamp/run ID;
- count of distinct runs containing that shop.

Exclude null owners and null shop IDs. Make the migration deterministic and safe to rerun where practical. Validate counts before and after migration.

### 5. Backend API

Add authenticated endpoints equivalent to:

```text
GET   /api/leads
GET   /api/leads/:userShopId
PATCH /api/leads/:userShopId       # only if notes/status/archive are included now
GET   /api/leads/traffic-overview
```

`GET /api/leads` supports the current table capabilities:

- page and page size
- search
- sorting and direction
- contactability/status/category filters
- archive filter if archive is implemented
- current-data freshness filter if useful

The repository query must begin at `UserShop` scoped by the trusted owner and join current `Shop`, `ShopLeadProfile`, and shop-level traffic. Never fetch a shop globally and check ownership afterward.

Return a dedicated live contract rather than pretending it is the historical `Lead` contract. Suggested shape:

```ts
type MasterLead = {
  id: string; // UserShop ID
  shopId: string;
  current: {
    storeName: string | null;
    resolvedDomain: string | null;
    canonicalUrl: string | null;
    myshopifyDomain: string | null;
    email: string | null;
    emailSourceUrl: string | null;
    phone: string | null;
    phoneSourceUrl: string | null;
    contactUrl: string | null;
    socialProfiles: string[];
    contactabilityTier: string | null;
    contactEvidence: unknown;
    identityEvidence: unknown;
    profileUpdatedAt: string | null;
    lastCheckedAt: string | null;
    refreshState: string | null;
  };
  discovery: {
    firstDiscoveredAt: string;
    lastDiscoveredAt: string;
    discoveryCount: number;
    firstRunId: string | null;
    lastRunId: string | null;
    runs: Array<{
      href: string;
      discoveredAt: string;
    }>;
  };
  userState: {
    lifecycleStatus: string | null;
    notes: string | null;
    tags: string[];
    archived: boolean;
  };
  latestDiscoveryContext?: {
    shopType: string | null;
    businessQualifier: string | null;
    googleRank: number | null;
    leadScore: number | null;
    scoreSemantics: string | null;
    runId: string;
  };
  traffic: unknown;
};
```

Use the backend's strict serializer/contract validation conventions. Expose only safe errors and public evidence.

The public API may use a run ID internally to construct each safe, owner-checked `href` (for example `/runs/{encodedRunId}`), but the frontend should not render the raw ID as user-facing text. For shops with many discoveries, return a bounded recent list in the main result and provide an owner-scoped paginated discovery-history endpoint or disclosure loader for the complete list.

### 6. Live traffic overview

`GET /api/leads/traffic-overview` must:

- scope from the authenticated user's `UserShop` rows;
- include only distinct, non-archived accessible shops unless requested otherwise;
- aggregate current shop-level traffic, not run snapshots;
- support the same applicable search/filter scope as the live table;
- return worldwide and supported-country metrics required by the existing heatmap/globe UI;
- preserve source attribution, timestamps, unavailable/no-coverage states, and zero values;
- never reveal counts or identities belonging only to another user.

## Frontend repository

Frontend path: `/home/harit/Email Scrapper/frontend`

Before editing Next.js code, read the relevant installed documentation in `node_modules/next/dist/docs/` as required by `AGENTS.md`. Follow this installed Next.js version rather than assumed conventions.

### 1. New routes and proxies

Add a protected page:

```text
app/leads/page.tsx
```

Add authenticated Next.js proxy routes matching the established backend proxy/auth patterns:

```text
app/api/leads/route.ts
app/api/leads/traffic-overview/route.ts
app/api/leads/[userShopId]/route.ts   # if detail/PATCH is needed
```

Forward only allowlisted parameters. Derive the user from authentication and forward the trusted user header exactly as existing run routes do.

### 2. Types and validation

Add dedicated live-master types and strict runtime parsers, either in current API files or focused modules:

```text
lib/master-lead-types.ts
lib/master-lead-validation.ts
lib/master-lead-presentation.ts
```

Do not cast a `MasterLead` to `Lead`. Validate nested current profile, discovery metadata, user state, traffic contracts, nullable fields, timestamps, pagination, and summary values before React state is updated.

### 3. Component refactor

Reuse visual behavior without coupling historical and live semantics. Extract shared presentational pieces from:

- `components/results-filters.tsx`
- `components/results-table.tsx`
- `components/lead-details.tsx`
- `components/traffic-globe.tsx`
- `components/traffic-enrichment.tsx`
- `components/query-traffic-heatmap.tsx`
- `components/cumulative-traffic.tsx`
- `components/export-csv-button.tsx`

Suggested organization:

```text
components/leads/
  lead-table-view.tsx
  lead-details-view.tsx
  live-leads-workspace.tsx
  live-leads-table.tsx
  live-lead-details.tsx
  live-leads-filters.tsx
  live-leads-export.tsx
```

Keep existing run components/API behavior stable. Prefer adapters or shared leaf views over a single component full of `run` versus `live` conditionals.

### 4. My Leads page behavior

The page should contain:

- Header/navigation consistent with the authenticated application shell
- Unique-shop summary
- Reachable/contactable summary
- Current/freshness summary where supported
- Aggregate live traffic heatmap
- Search, filters, sorting, and pagination
- Master lead table
- Expandable current shop detail
- CSV export of the user's current accessible master records
- Links to first/latest relevant run where available
- A discovery-history disclosure listing every run in which the shop appeared as human-readable links (for example, `Run from 4 Aug 2026, 14:32`), without displaying raw run IDs
- Explicit "current/live" and "last checked" labelling
- Loading, empty, error, reconnect/retry, partial-data, and unavailable states
- Responsive and keyboard-accessible interactions matching current quality

### 5. Individual traffic globe

Reuse the existing `TrafficGlobe` presentation for an expanded live shop, but feed it current shop traffic returned by the master endpoint.

The live path is:

```text
UserShop -> Shop -> current shop traffic -> MasterLead API -> live details -> TrafficGlobe
```

The historical path remains:

```text
Lead -> LeadTrafficEnrichment -> run results -> TrafficGlobe
```

Preserve country selection/reset/drag behavior, source attribution, exact zero values, no-coverage states, and observed timestamps.

### 6. Aggregate traffic heatmap

Reuse/refactor the existing heatmap visualization, but load it from:

```text
GET /api/leads/traffic-overview
```

Do not call a run traffic-overview endpoint for this page. The heatmap must aggregate each user-accessible shop once and react to the live page's supported filters. It must show current shop traffic so later cron refreshes appear automatically.

### 7. Navigation

Add an authenticated navigation entry such as "My Leads" linking to `/leads`. Do not expose the protected page as if it were public. Preserve current landing, run history, and run workspace navigation.

### 8. CSV export

Build a master-specific export path/serializer. It should export current fields plus discovery/freshness metadata and avoid presenting historical rank/score as current unless explicitly named, for example:

- `latest_discovery_google_rank`
- `latest_run_lead_score`
- `profile_last_checked_at`

Export all filtered master results through paginated API requests without using run-result endpoints.

## Security requirements

- Test that user A cannot list, fetch, update, aggregate, or export user B's `UserShop` records.
- Test that knowing a global `shopId` does not grant access.
- Test that knowing another user's `userShopId` returns not found/unauthorized without leaking existence.
- Run-history links must only be emitted after ownership is established; a link must never reveal another user's run.
- Keep run ownership enforcement unchanged.
- Never expose internal refresh errors, provider credentials, cache internals, or another user's discovery metadata.
- Validate and allowlist all filters, sort keys, pagination values, and PATCH fields.

## Testing and verification

### Backend

- Schema/migration tests
- Backfill integration test
- First discovery creates one `UserShop`
- Repeat discovery across runs remains one `UserShop`
- Every distinct discovering run is retained once in `UserShopDiscovery`
- Replay/retry does not inflate discovery count
- Different users get separate grants to the same shop
- Unowned runs do not create grants
- Master endpoint returns current profile after a profile update
- Historical results remain unchanged after a profile update
- Live traffic uses shop-level current data
- Traffic aggregation deduplicates across runs
- Cross-user API isolation for list/detail/overview/update
- Filtering, sorting, pagination, nulls, zero metrics, and CSV contracts

### Frontend

- Strict parser acceptance/rejection tests
- Live-table presentation tests
- Search/filter/sort/pagination state tests
- Expanded details and evidence tests
- Discovery-history link rendering, pagination/disclosure, and raw-ID non-display tests
- Globe worldwide/country/reset/drag and unavailable-state tests
- Heatmap aggregation rendering and filter refresh tests
- CSV field naming and multi-page export tests
- Authenticated navigation test
- Loading, empty, error, partial, zero, stale, and refreshed states
- Responsive/browser regression coverage using the repository's existing harnesses
- Existing run workspace regression tests remain green

### Manual acceptance scenario

1. User A discovers Shop X in run 1.
2. Shop X appears once in User A's My Leads page.
3. User A discovers Shop X again in run 2.
4. It remains one live row; discovery metadata updates.
5. User B cannot see Shop X until User B independently discovers it.
6. User B then sees the same global current shop profile through their own `UserShop` grant.
7. Update Shop X's current profile/traffic as a simulated cron refresh.
8. Both authorized users see the refreshed live values and updated globe/heatmap.
9. Run 1 and run 2 pages still show their original snapshots.
10. Neither user's notes, tags, discovery history, or run links are visible to the other.

## Execution order

1. Audit existing backend persistence, traffic cache, ownership, and API contracts.
2. Read relevant installed Next.js documentation before frontend code changes.
3. Add Prisma models/migration and deterministic backfill.
4. Add replay-safe `UserShop` upsert to lead publication transactions.
5. Implement/confirm current shop-level traffic projection.
6. Implement backend master list/detail/traffic-overview contracts and authorization.
7. Add backend tests and run them.
8. Add frontend proxy routes, types, and strict validators.
9. Refactor shared table/detail/traffic presentation without changing run behavior.
10. Build `/leads`, filters, pagination, expanded live details, and navigation.
11. Connect current per-shop traffic globe.
12. Connect user-scoped aggregate live traffic heatmap.
13. Implement master-specific CSV export.
14. Add frontend unit/component/browser regression tests.
15. Run targeted checks, full relevant test suites, lint/typecheck/build, and inspect the final diff.

## Non-goals for the first milestone

- Do not implement the cron scheduler itself unless separately requested.
- Do not rewrite or delete historical run leads.
- Do not make run pages display current master data.
- Do not merge user notes/status into global shop data.
- Do not expose all global shops to a user.
- Do not treat latest run rank/score as an unlabeled live metric.

## Completion definition

The work is complete when an authenticated user has a production-ready `/leads` workspace showing only shops they discovered, deduplicated across their runs, backed by current master profile and shop-level traffic data, with the current table capabilities, CSV export, individual traffic globe, aggregate traffic heatmap, strict authorization, and verified preservation of historical run results.
