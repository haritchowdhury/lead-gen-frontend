# Uphunt-aesthetic locked product contract (`A1`)

**Contract ID:** `UA-PC-1`  
**Status:** Authoring complete for planning. Implementation remains unauthorized until `A5.current_status` is `READY` and a window is assigned.  
**Package status:** Section 9 `AUTHORING-READY` is recorded in `A6` when hashes match `A5`.

This artifact is the sole authority for required behavior, invariants,
exclusions, compatibility, and authorization for the StoreSignal whole-site
Uphunt-aesthetic visual translation. It contains no execution status.

The other package artifacts are:

- `A2` — `frontend/docs/open-work/uphunt-aesthetic/A2_DISCOVERY_DOSSIER.md`
- `A3` — `frontend/docs/open-work/uphunt-aesthetic/A3_DECISION_LEDGER.md`
- `A4` — `frontend/docs/open-work/uphunt-aesthetic/A4_EXECUTION_CHECKLIST.md`
- `A5` — `frontend/docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml`
- `A6` — `frontend/docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md`
- `A7` — `frontend/docs/open-work/uphunt-aesthetic/A7_SPECIFICATION_CHANGELOG.md`
- `A8` — `frontend/docs/open-work/uphunt-aesthetic/A8_TRACEABILITY_INDEX.md`

Supporting research, not execution authority:

- `frontend/docs/UPHUNT_AESTHETIC_TRANSLATION_ANALYSIS.md`
- `https://uphunt.io/` (observed 2026-09-01; visual grammar source only)

Historical, not this contract:

- `frontend/docs/open-work/DESIGN_SYSTEM_EXECUTION_CHECKLIST.md` (G1–G12 compact-dashboard grammar)
- Keyword Intelligence and AWS pipeline packages
- Root `ACTIVE_EXECUTION_STATE.md` (Keyword Intelligence / AWS; do not mutate)

After a parent window is `READY`, a window agent SHALL decompose it using
`PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md` into single-file
sub-windows. That decomposition cannot change this contract.

## 1. Defined terms

| Term | Locked operational meaning |
|---|---|
| Information page | Any signed-in or result route that presents run, lead, keyword, auth, or history data: `/sign-in`, `/sign-up`, `/runs`, `/runs/continue`, `/runs/[runId]`, `/leads`, `/keywords`, `/keywords/[researchId]`, and expanded lead details inside a results table row. |
| Landing headline recipe | The exact composition already used by `SectionIntro` in `frontend/components/landing-sections.tsx`: optional eyebrow, `h2` title, supporting paragraph. Type scale is the CSS already applied by `.marketing-heading` in `frontend/app/globals.css` (H2 `clamp(36px, 4.5vw, 59px)`, weight 700, tracking `-0.065em`, line-height `1.02`; copy 16px, line-height `1.7`, color `--color-ink-muted`; eyebrow 11px, uppercase, letter-spacing `0.12em`–`0.14em`). |
| Stacked chart section | One keyword-research chart (or globe, treemap, cluster landscape, or keyword table) occupies a full-width block whose first children are the landing headline recipe, then the existing visual. Desktop `grid-template-columns` for `.overviewSignals` and `.charts` is `1fr`. `.chartPair` is `display: block`. |
| Dense lead compression | The CSS block in `frontend/app/globals.css` beginning at the comment `Dense lead expansion: preserve every field without dashboard-sized whitespace.` including `.lead-details .detail-section > h3` at `0.5rem` and fact-grids of more than three columns. |
| Extra-care surface | `/keywords/[researchId]` (keyword research result) and `LeadDetails` expanded-row contents (individual lead details). |
| Presentation-only change | A CSS or JSX composition change that does not alter request URLs, request bodies, parsers, persisted fields, sort/filter/page query-string keys, CSV column contents, polling, auth, scoring, or which evidence fields are rendered when their source values are present. |
| User-owned dirty tree | Any pre-existing modified or untracked path at window start that is not in that window's authorized write scope. |

## 2. Requirements

### REQ-UA-001 Whole-site visual grammar

Every listed route SHALL use StoreSignal forest-and-lime tokens already in
`frontend/app/globals.css` `:root` (`--color-canvas` `#f4f3ed`, `--color-surface`
`#fffefa`, `--color-ink` `#12231e`, `--color-signal` `#c8f04b`) and Inter via
`--font-sans`. Canvas SHALL remain paper, not `#0D0D0D`. Lime SHALL be used
for primary actions, selected/qualified emphasis, and signal dots, not as a
full-section fill.

### REQ-UA-002 Landing headline recipe on information pages

Every information page and every extra-care section listed in DEC-UA-004 and
DEC-UA-005 SHALL open with the landing headline recipe. Headlines name
information already on the page. They SHALL NOT add product claims, metrics,
testimonials, pricing, or new data.

### REQ-UA-003 Keyword research is not a dashboard

The completed `/keywords/[researchId]` result view SHALL be a long stacked
document: one idea per section. It SHALL NOT present four-up or two-up chart
grids on viewports `>= 1024px`. Every chart listed in DEC-UA-005 SHALL have
its own section and the locked wrap height.

### REQ-UA-004 Individual lead details are readable

Expanded `LeadDetails` SHALL keep the four existing groups (overview, traffic
enrichment, store fit, discovery provenance) and every currently rendered
non-duplicate field when the source value is present. Type floors: labels
`>= 12px`, values `>= 14px`. Fact grids `<= 3` columns at viewports `>= 1024px`.
The expand-in-row pattern in `results-table.tsx` remains the individual-lead
surface; this contract does not add `/leads/[id]`.

### REQ-UA-005 Behavior and data contract preservation

Implementation SHALL be presentation-only. Parsers, API routes, Prisma, AWS,
auth, polling, scoring, aggregation, sort, filter, search, pagination, CSV
contents, and query-string keys SHALL NOT change. Missing, zero, unavailable,
partial, and unobserved values SHALL remain visually and semantically distinct.

### REQ-UA-006 Accessibility and reduced motion

Native `button`, `a`, `details`/`summary`, labels, and `:focus-visible` rings
already defined for `.ds-button` / global focus SHALL remain truthful.
`prefers-reduced-motion: reduce` SHALL keep the existing `transition-duration:
0.01ms !important` rule. New motion, if any, SHALL be entrance/expansion only
and SHALL honor that media query.

### REQ-UA-007 Extra care does not skip the rest of the site

Chrome, landing, auth, history, query review, runtime, completed-run index,
master-leads list, and keyword start SHALL receive the same grammar. They are
not optional. Extra care means more decompression on keyword research and lead
details, not exclusive scope.

### REQ-UA-008 Sub-window decomposability

Every parent window's authorized write scope SHALL be an exact file list plus
symbol-specific `globals.css` ownership. After parent assignment, decomposition
SHALL follow `PROJECT_AGNOSTIC_WINDOW_AGENT_SUBWINDOW_AUTHORING_STANDARD.md`
(one writable file per `FILE` sub-window; tests separate from production files).

## 3. Invariants

| ID | Invariant |
|---|---|
| INV-UA-001 | No API, parser, backend-proxy, schema, migration, auth, or AWS mutation. |
| INV-UA-002 | No change to query generation, start, polling, reconnect, or run state labels. |
| INV-UA-003 | Filtering, sorting, searching, pagination, row expansion toggle, and CSV export keep current query keys and payloads. |
| INV-UA-004 | Every currently presented non-duplicate lead evidence field remains available. |
| INV-UA-005 | Resolved storefront links open the resolved domain only when `resolved_domain` is present. |
| INV-UA-006 | Unsupported traffic countries remain non-clickable; globe and country-link selection stay synchronized. |
| INV-UA-007 | User-owned dirty-tree paths outside write scope are preserved. |
| INV-UA-008 | No remote font, new UI kit, or dark-mode product theme is introduced. |
| INV-UA-009 | No invented customer data, testimonials, usage numbers, or marketing claims. |
| INV-UA-010 | Keyword charts keep the same `data-surface` values and the same Chart.js datasets; only layout, type, and wrap height change. |

## 4. User-visible outcomes

After UA-W15, a signed-in user moving from `/` to information pages SHALL see
the same forest-and-lime product with landing-scale section titles. Keyword
research SHALL read as stacked titled charts. An expanded lead SHALL read as
stacked titled groups at or above the type floor. Intermediate loader, empty,
error, and partial states SHALL remain truthful and distinct.

## 5. Authorization and identities

This package does not change session, `UserShop`, owner-scoped reads, or Neon
Auth. Existing `sessionUserId()` and client `authClient` paths remain
authoritative. Visual work MAY render signed-in versus signed-out header links
already produced by `HeaderAuth`.

## 6. Compatibility, retention, deployment

- Historical CSS class names MAY remain as unused aliases only when a window
  explicitly lists the alias as preserved; default is replace-in-place inside
  owned selectors.
- No data migration.
- No production, AWS, secret, or paid-provider action.
- Local verification uses `frontend/` `npm test`, `npm run lint`, `npx tsc
  --noEmit`, and `npm run build`. Browser evidence uses `/usr/bin/google-chrome`
  when a window names it. Sandbox escalation for those local commands is
  authorized per E8.1; it is not cloud authority.

## 7. Explicit exclusions

- Functional changes of any kind.
- Dark-mode product.
- Fargate, Step Functions, DynamoDB, S3-event fan-in, or other locked-architecture substitutes.
- Frontend rewrite, new app router groups, or new lead identity algorithm.
- Editing `email_scraper/` except read-only inspection.
- Editing root `ACTIVE_EXECUTION_STATE.md` or Keyword Intelligence artifacts.
- Committing, pushing, or staging unless a later requester message explicitly asks.

## 8. Ambiguous terms

| Term | Not this contract |
|---|---|
| Dashboard | Not an accepted layout for `/keywords/[researchId]`. |
| Decompress | More padding, type, and stacking; not removal of fields. |
| Uphunt design | Grammar (spacing, type, lime-on-paper, headlines), not Uphunt copy, black canvas, or assets. |
| Flawless | Meeting this contract's type floors, stacking rules, and preservation invariants; not an unbounded taste rewrite. |
