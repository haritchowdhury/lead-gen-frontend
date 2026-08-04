# Query Traffic Heatmap Replacement Plan

## Outcome

Replace the current equal-cell CSS grid on both completed run pages and `/leads` with one shared, production-quality query traffic treemap. The visualization will always occupy a square plotting area, and each query tile's area will be proportional to its selected-scope traffic value. Make the visualization actionable: users can open one query or select several queries to filter the lead table below it.

The UI can continue calling the section a “heatmap,” but the correct visualization primitive is a **squarified treemap**: a fixed rectangle partitioned into value-weighted rectangles.

## Current implementation and fault

- Both pages already share `components/query-traffic-heatmap.tsx` through `components/cumulative-traffic.tsx`; one component replacement will therefore cover both surfaces.
- The current implementation maps traffic only to background color (`--query-ratio`).
- CSS forces every cell to the same size using a grid and `aspect-ratio: 1`, so a query with 100 traffic occupies the same area as one with 100,000 traffic.
- The grid itself has no fixed aspect ratio. It becomes a wide rectangle on desktop and changes shape as the column count changes.
- Several later CSS overrides target the same selectors, making the final layout difficult to reason about and maintain.

## Library choice

Use **Recharts 3 `Treemap`** with `ResponsiveContainer`.

Why:

- Native squarified treemap layout makes tile area proportional to the supplied value.
- `ResponsiveContainer` supports an aspect ratio, so the plot can remain exactly 1:1 while following the available width.
- Custom SVG node rendering gives full control over the existing visual language, conditional labels, keyboard/focus treatment, and compact metrics.
- Recharts supports React 19 and is a declarative React integration, which is a better fit for this Next.js client component than manually managing an ECharts instance.

Alternatives considered:

- `@nivo/treemap`: excellent treemap-specific API and customization, but its present React compatibility/update posture introduces more dependency risk for this React 19 project.
- Apache ECharts: mature and highly capable, but its imperative initialization/resizing/cleanup and larger general-purpose surface are unnecessary for one treemap.
- Raw `d3-hierarchy`: smallest conceptual dependency and maximum control, but it would require us to build and maintain rendering, tooltip, resize, and accessibility behavior ourselves.

Before installation, pin the exact current Recharts release after checking its peer dependencies against React 19.2.4 and run a clean install/build to validate compatibility.

## Data and sizing rules

1. Preserve `TrafficQuerySummary[]` from each page's traffic-overview endpoint as the visualization source of truth. Add lead-list filtering support separately where the current endpoint cannot filter by discovery query.
2. Recompute node values whenever the country filter changes, using `estimated_google_search_traffic` for Worldwide or the selected country.
3. Sort nodes deterministically by traffic descending, then query text, before passing them to the chart. This stabilizes layout and tests.
4. Use a linear area mapping for normal datasets: `node.value = traffic`. Area, not side length, represents traffic.
5. Use tiered display policies by item count without changing the underlying values:
   - 1 item: one full-square tile.
   - 2–12 items: labels and key metrics inside every tile that has room.
   - 13–30 items: labels inside medium/large tiles; small tiles use tooltip/focus details.
   - 31+ items: render the largest 30 individually and combine the remainder into an explicit “Other queries” tile. The tooltip reports the hidden query count and combined metrics; activating it opens the complete searchable query selector.
6. Zero-traffic queries cannot receive meaningful proportional area. Show them in a compact “No measured traffic” list directly below the square rather than assigning fake weight. This keeps the area encoding truthful.
7. Use traffic as both area and a restrained sequential green color scale. Area communicates magnitude; color reinforces rank and does not encode a different metric.
8. Keep shops found and covered leads in tile/tooltip details only; they do not affect tile area.

## Query navigation and lead filtering

The treemap is both a visualization and an entry point into the lead data.

1. **Single-query navigation:** every visible query tile is an actual hyperlink. Activating it updates the current page URL with that discovery query, scrolls/focuses the lead table, and displays only leads discovered through that query.
2. **Multi-query selection:** provide a searchable selector beside/below the chart with checkboxes for all queries. Users can mix visible top-30 queries with queries contained in “Other queries.”
3. **Match semantics:** selected queries use OR semantics—a lead is included if it was discovered through any selected query.
4. **Deduplication:** a shop that matches several selected queries appears once. `/leads` deduplicates by the user-owned master shop identity; a run page deduplicates by its run-scoped lead/shop identity.
5. **URL state:** encode selections as repeated query parameters (for example `discoveryQuery=...&discoveryQuery=...`) rather than a comma-delimited value. Preserve country, text search, sorting, and other existing parameters when adding or removing query filters.
6. **Shareable/back-forward behavior:** URL state is the source of truth, so filtered views can be bookmarked/shared and browser back/forward restores the selection.
7. **Filter actions:** include Search queries, Select all visible, Clear all, and an explicit Apply action. Display selected queries as removable chips above the lead table.
8. **Result feedback:** show the unique matched-lead count and a concise “matching any of N queries” summary. A zero-result selection shows a real empty-filter state, not a traffic-data error.
9. **Other queries:** the aggregate tile is not itself treated as one discovery query. Activating it opens the selector pre-scrolled to the queries outside the top 30; the user can choose one or many of them.
10. **Unattributed discovery:** expose it as a distinct filter value with a stable internal token; never encode the display label as though it were a real query.

### Backend/API implications

- Extend the user master lead endpoint to accept repeated `discoveryQuery` parameters and filter through the user's discovery-history relation before pagination and count calculation.
- Extend the run lead endpoint similarly if its current response is server-paginated. If the completed run already loads its complete lead set, use the same shared predicate client-side but retain identical URL semantics.
- Validate query count, individual query length, and total encoded URL size. Ignore no values silently: invalid query filters return a specific validation message.
- Keep authorization unchanged: filtering must never reveal a shop or run outside the authenticated user's existing scope.
- Keep exports consistent with the visible filter. Export requests include the active repeated discovery-query parameters and deduplicate with the same identity rules.

## Fixed-square layout

- Wrap the chart in a plot container with `width: min(100%, <desktop-max>)` and `aspect-ratio: 1`.
- Set the desktop maximum from the current heatmap's available content width so that width becomes the reference dimension for height, as requested.
- Center the square within the section rather than stretching it across wide screens.
- On smaller screens use the full available width; height follows automatically from `aspect-ratio: 1`.
- Give the chart an explicit initial dimension to avoid a zero-size or layout-shift flash before `ResizeObserver` reports its size.
- Keep the country controls outside the plotting square, so filters never alter its dimensions.

## Component work

1. Keep `QueryTrafficHeatmap` as the shared public component so both `/leads` and individual run pages change together.
2. Add a small pure transformation module for:
   - country-specific traffic selection;
   - deterministic sorting;
   - item-count tier selection;
   - “Other queries” aggregation;
   - zero-value separation;
   - color-domain calculation.
3. Add a custom treemap node component that:
   - draws the tile with a narrow gutter and consistent corners;
   - only renders text when measured bounds can contain it;
   - truncates long query labels safely;
   - exposes the full query and values through an accessible tooltip/focus panel;
   - retains `site:` prefix treatment where space permits.
4. Add a shared query-filter controller that reads/writes URL state, renders selected chips and the searchable selector, and supplies page-specific link targets without duplicating behavior.
5. Connect the filtered query state to the master lead fetch, run lead filtering/fetch, result count, pagination reset, and export.
6. Retain the existing Worldwide/country filter behavior and live-vs-run copy.
7. Dynamically import only the interactive treemap client boundary if bundle analysis shows a meaningful route cost; keep the surrounding heading and empty states as ordinary React markup.

## Visual and interaction specification

- One square plot at every breakpoint.
- Tile area proportional to estimated Google search traffic for the active scope.
- Do not ship Recharts' default appearance. Use the application's existing design tokens and the visual language already shared by completed run pages and `/leads`.
- Keep the existing restrained cream/white surfaces, dark green text, lime selection accent, muted olive secondary text, compact typography, and low-contrast borders/shadows.
- Use a custom sequential green scale derived from the existing palette. Avoid rainbow scales, saturated dashboard colors, gradients that reduce label contrast, and generic chart-library chrome.
- Match the surrounding section's spacing and hierarchy: existing eyebrow, heading, explanatory copy, country pills, and vertical rhythm remain intact.
- Use narrow gutters and subtle corner radii so the treemap feels precise and dense without looking like an unrelated analytics widget.
- Style the custom tooltip like the existing detail cards/popovers: light surface, dark green text, restrained border/shadow, tabular numeric alignment, and no library branding.
- Active query tiles and filter chips use the existing lime selected state. Hover is a small luminance/border change; focus uses the application's established visible focus ring.
- Keep the square centered and visually balanced with the globe and lead table at the same content width. It must not widen the page or introduce a competing card style.
- Large tiles: query, traffic, shops, and coverage.
- Medium tiles: query and traffic.
- Small tiles: no forced text; hover, keyboard focus, or tap reveals full details.
- Query tiles use real links and expose the destination/active state to assistive technology; selection controls remain separate so link activation and multi-selection are not ambiguous.
- Tooltip content: full discovery query, traffic, shops found, leads covered, percentage of displayed traffic, and active geographic scope.
- The “Other queries” tile clearly states that it opens the remaining query choices; it never looks like a real measured query.
- Selected-country changes animate only if motion is allowed; honor `prefers-reduced-motion`.
- Use a minimum-contrast palette and do not depend on color alone—the numeric tooltip/focus details remain authoritative.
- Preserve empty-query and no-traffic states without rendering a misleading chart.

## CSS cleanup

- Remove the duplicated `.query-traffic-grid` and `.query-traffic-cell` rule blocks and their column-count media queries.
- Replace them with narrowly scoped section, square plot, tooltip, zero-value list, and filter styles.
- Preserve the completed-run page spacing and typography so the chart replacement does not restyle unrelated sections.

## Verification

### Unit tests

- Country selection uses the correct market value and falls back to zero when absent.
- Nodes sort deterministically.
- Tile input values remain exactly proportional to traffic.
- Count tiers behave at boundaries: 1, 2, 12, 13, 30, and 31 items.
- “Other queries” totals traffic, shops, and coverage correctly.
- Zero-value queries are excluded from weighted layout and retained in the no-traffic list.
- Null/unattributed queries retain a readable label.
- Repeated query parameters parse and serialize without losing existing URL state.
- OR filtering returns a shop once even when several selected queries discovered it.
- Filtered totals and exports use the same deduplication rules.

### Component and accessibility tests

- Worldwide and country buttons update the rendered treemap data.
- A query tile link updates the URL and filters the lead table on both page types.
- Selecting multiple queries returns the union of their leads, renders removable chips, and resets pagination.
- “Other queries” opens the selector at the hidden-query group and permits selecting those queries.
- Browser back/forward and a directly loaded filtered URL restore the same state.
- Keyboard focus exposes the same information as pointer hover.
- The plot has an accessible name/description and every data item remains discoverable without relying on SVG text visibility.
- Empty and all-zero datasets render truthful states.

### Visual checks

- Capture `/leads` and at least one completed run at desktop, tablet, and mobile widths.
- Compare the treemap directly against the surrounding globe, filter pills, section headings, and lead table to confirm consistent colors, type scale, radii, spacing, focus states, and density.
- Reject the implementation if any unmodified Recharts default color, font, tooltip, outline, or animation is visible.
- Assert the plot container width and height are equal (allowing at most one device pixel for rounding).
- Exercise skewed values, equal values, long labels, 1 item, 12 items, 30 items, and 100+ raw queries.
- Confirm the largest traffic value visibly owns the largest area and that changing country reshapes the treemap.
- Run lint, unit tests, production build, and the real-component browser test.

## Execution order

1. Install and compatibility-check the pinned Recharts version.
2. Build and unit-test the pure query-to-treemap transformation.
3. Add discovery-query filtering to the master/run lead data path, including unique counts, pagination, authorization, and export semantics.
4. Add shared URL-state and query-selector behavior with single-query hyperlinks and multi-query OR selection.
5. Replace the grid renderer with the responsive square treemap and custom nodes/tooltips.
6. Consolidate the old heatmap CSS.
7. Add unit, component, accessibility, and API coverage.
8. Verify both `/leads` and an individual completed run using representative real payloads at all target breakpoints.
9. Compare the production bundle and remove or dynamically split unnecessary chart code before release.

## Acceptance criteria

- `/leads` and individual run pages use the same shared treemap implementation.
- The plotting surface is square at every supported viewport.
- Tile area changes proportionally with the active traffic values.
- Country filtering reshapes the treemap correctly.
- Every visible query tile links to the corresponding filtered lead view.
- Users can combine any top-30 or hidden query selections, with OR matching and no duplicate shops.
- “Other queries” exposes every query it represents through a searchable selector.
- Query filters survive refresh, sharing, and browser navigation, and apply consistently to counts, pagination, and export.
- Large and small datasets remain legible without falsifying zero values.
- All values are available to keyboard and assistive-technology users.
- Existing traffic overview, globe, filters, and page styling continue to work.
- The treemap looks native to the existing interface on both page types; no generic third-party chart styling remains.
- Lint, tests, production build, and browser verification pass.
