# StoreSignal visual-system migration plan

## Objective

Bring the compositional discipline and premium application finish of `/home/harit/Sportz67` into StoreSignal without turning StoreSignal into a sports-site clone and without changing discovery, polling, filtering, exporting, authentication, traffic, or evidence behavior.

The migration should preserve StoreSignal's strongest identity assets:

- dark forest ink;
- bright lime signal color;
- editorial landing-page voice;
- interactive traffic globe;
- evidence-rich lead detail model;
- compact, information-dense workflow.

The work is a visual-system consolidation first and a page redesign second.

## What makes the sample feel polished

The most useful references in Sportz67 are:

- `app/page.tsx` for editorial landing-page rhythm, restrained motion, split heroes, dark feature bands, and product previews;
- `app/components/sports-hub/SportsHub.tsx` for dense dashboard hierarchy;
- `app/components/worldcup-country/CountryPageView.tsx` for information-rich detail pages;
- `app/components/scanner/CompactGameCard.tsx` for expandable result rows;
- `app/components/loading/DashboardLoadingShell.tsx` for state-specific loading composition;
- `app/components/ui/Card.tsx` and `app/components/ui/Button.tsx` for primitive boundaries;
- `app/globals.css` for the intentionally small global token layer.

Its premium quality comes from a repeated visual grammar:

1. **Neutral canvas, decisive contrast.** Most of the interface is white and zinc. Green is reserved for live, selected, successful, or primary states.
2. **A small surface vocabulary.** Outer cards are white with a faint border and low shadow. Nested information uses pale inset surfaces rather than another fully bordered card.
3. **Two typography modes.** Marketing pages use large editorial sentence-case display type. Application pages use compact, heavy headings with uppercase micro-labels and wide tracking.
4. **Tight application spacing.** Dashboard cards commonly use 12–16px padding, 8–12px gaps, and shallow headers. Density comes from grouping, not from shrinking every label.
5. **Clear visual anchors.** Each major module has one strong title, a small eyebrow, and often one dark icon tile or important metric.
6. **Low-chroma status color.** Green, amber, and red usually sit on very pale backgrounds and do not flood entire sections.
7. **Subtle depth.** Hairline borders, inset one-pixel rings, and extremely soft shadows establish hierarchy without glossy decoration.
8. **Consistent geometry.** Small controls are mostly 6–8px radius, application cards 8–12px, marketing cards 16–24px, and pills are fully rounded.
9. **Responsive recomposition.** Dense grids collapse into purposeful stacks; they do not merely squeeze until the text becomes unreadable.
10. **Motion explains state.** Motion is used for page entrance, expansion, loading, or selection—not as constant decoration.

## What should not be copied literally

- Sportz67's sports terminology, content, team imagery, or brand gradients.
- Its very smallest 7–9px text. StoreSignal already relies too heavily on 6–9px labels; copying that literally would reduce legibility.
- Every use of uppercase. StoreSignal's evidence explanations and lead data should remain sentence case for easier scanning.
- Its occasional one-off Tailwind values. StoreSignal should copy the system, not inherit another set of exceptions.
- Its missing/implicit font configuration. StoreSignal should load its chosen typeface explicitly through the supported Next.js font API.

## Current StoreSignal design debt

The current frontend is strong in content structure but visually fragmented:

- `app/globals.css` is 4,273 lines and acts as tokens, primitives, page CSS, component CSS, and responsive overrides at once.
- It contains 183 distinct hexadecimal colors, many of them nearly identical green-grey surfaces.
- Radius and shadow values are repeatedly reinvented instead of expressing a small elevation system.
- Operational content frequently drops to 6–9px, which makes dense evidence feel miniature rather than refined.
- Cards are nested inside cards with similar borders and backgrounds, flattening hierarchy and creating visual noise.
- The lime accent appears in branding, controls, borders, highlights, and backgrounds, reducing its power as a signal.
- The landing page and application pages use related colors but different composition rules, so they feel like adjacent designs rather than one product.
- Responsive rules are split across several late stylesheet blocks, making cascade outcomes difficult to predict.
- Loading, empty, error, and authenticated workspace screens do not yet share one state language.

## StoreSignal's translated design system

### Color roles

Use semantic tokens rather than raw colors in components.

- **Canvas:** one warm-neutral page background, with an optional slightly cooler application canvas.
- **Surface:** white/near-white primary card.
- **Inset:** one pale neutral for grouped facts, table headers, and secondary controls.
- **Ink:** forest-black primary text.
- **Muted ink:** two levels only: supporting and quiet.
- **Line:** subtle and strong border tokens.
- **Signal:** lime for primary CTA, active progress, selected state, and qualified emphasis only.
- **Positive:** restrained green distinct from lime.
- **Warning:** amber.
- **Danger:** muted red.
- **Inverse:** dark forest surface with white and soft-grey content.

Target: reduce the current 183 literal hex values to a compact token set plus exceptional globe/map colors.

### Typography roles

- **Display:** landing hero and major marketing statements; sentence case, tight tracking.
- **Page title:** run, results, history, and authentication titles.
- **Section title:** major application module title.
- **Card title:** compact but clearly stronger than body copy.
- **Eyebrow:** uppercase, tracked, 10–11px minimum.
- **Body:** 14–16px marketing; 12–14px application.
- **Data label:** 10–11px minimum, muted.
- **Data value:** 12–14px, strong.
- **Fine print:** 10–11px; never use 6–8px for information the user must read.
- **Numeric metric:** tabular numerals and strong weight.

Use a single explicitly loaded sans family. Geist Sans is the closest match to the sample's intended feel; Inter can remain if preserving the current brand is preferred. The important requirement is an explicit, consistent font source and a defined weight scale.

### Spacing and geometry

- Base spacing unit: 4px.
- Application card padding: 12px compact, 16px standard, 20px featured.
- Marketing section spacing: responsive 72–112px.
- Application gaps: 8px, 12px, 16px, and 24px only.
- Radius scale: 6px controls, 10px compact cards, 14px featured cards, 20px marketing cards, pill for statuses.
- Content widths: one application shell and one marketing shell; avoid component-specific max widths unless content requires them.
- Avoid fixed or minimum heights used solely to make neighboring cards align. Let content define height, then align through grid structure.

### Elevation

Create only three elevation levels:

1. **Inset:** subtle internal one-pixel ring for nested facts and controls.
2. **Card:** almost-flat border plus soft ambient shadow.
3. **Floating:** popovers, menus, and hero forms only.

No large shadow should be used to compensate for weak layout hierarchy.

### Component composition rule

Every module should use this hierarchy where applicable:

1. module shell;
2. compact module header;
3. one content surface;
4. inset groups or divided rows inside it;
5. badges only for state, count, or a genuinely exceptional value.

Do not place several equally styled bordered cards inside another bordered card. Use dividers, inset surfaces, or a grid with shared containment instead.

## Implementation phases

### Phase 0 — Baseline and safeguards

Before restyling:

- capture desktop, tablet, and mobile screenshots for the public landing page, query review, running loader, completed run, expanded lead, contact evidence, traffic country selection, run history, sign-in, and all empty/error states;
- record long-content fixtures: long store name, long URL, many category-vocabulary tokens, many contact items, missing resolved domain, and partial traffic data;
- document every current interaction and link target;
- add lightweight visual-regression coverage if the project can support it without disturbing the application stack;
- verify reduced-motion, keyboard focus, horizontal table behavior, and details/summary behavior.

Acceptance: the redesign has a factual visual and functional baseline, including the bugs and edge cases already fixed during earlier sessions.

### Phase 1 — Tokens and reusable primitives

Build the visual foundation before changing page layouts:

- introduce semantic color, type, spacing, radius, and shadow tokens;
- load the chosen font explicitly using the current Next.js 16 guidance;
- create or standardize primitives for button, icon button, card, inset panel, badge, section header, metric, field, skeleton, empty state, notice, and disclosure;
- choose one icon language. Lucide is the closest direct match to Sportz67 and would be an optional dependency; otherwise the existing icon set must be normalized to the same stroke and sizing rules;
- split the stylesheet by responsibility or move stable component styles beside components while preserving one token/global layer;
- remove global transitions from all elements and apply transitions only to interactive elements.

Acceptance: primitives can reproduce the major visual patterns without page-specific colors, radii, or shadows.

### Phase 2 — Application shell, navigation, auth, and run history

Start with lower-risk shared surfaces:

- make the header more compact and product-like: subtle sticky surface, stronger active state, restrained account actions;
- give authenticated pages a quiet neutral canvas and consistent top/bottom spacing;
- redesign sign-in/sign-up as a composed split or centered product card using the same field/button primitives;
- turn run history into a clear workspace list with a strong page header, state chips, useful metadata, and purposeful empty/loading states;
- align not-found and continuation pages with the same state-shell pattern.

Acceptance: all non-result application pages look like one family and remain fully keyboard usable at 390px width.

### Phase 3 — Query review and live run progress

- retain the distinct query-planning loader, but express it with the same module header, metric tiles, and progress system as the rest of the app;
- redesign generated queries as one composed form surface, matching the landing form while clearly indicating editable repeated rows;
- use a dark visual anchor for the active stage and reserve lime for actual progress/ready states;
- make skeletons structurally match the content they replace;
- preserve real-time increments and traffic-analysis status behavior exactly.

Acceptance: query preparation, query review, discovery, qualification, traffic analysis, completion, failure, and reconnection are visually distinct without introducing different design systems.

### Phase 4 — Results overview and cumulative traffic hero

- redesign the results heading, four lead totals, export action, and cumulative traffic into one intentional workspace hero;
- use the sample's dashboard-header pattern: eyebrow + decisive title on the left, compact status/utility controls on the right;
- treat the four totals as one divided metric strip rather than four isolated promotional cards;
- keep the cumulative globe as the hero anchor, with traffic metrics on the left and the globe on the right;
- keep both sides visually transparent/quiet within one parent surface;
- ensure the country links read as navigation, not decorative microcopy;
- eliminate fixed vertical space and allow the globe size to determine the compact hero height.

Acceptance: the complete overview and first table rows are visible at a normal laptop viewport without making text miniature.

### Phase 5 — Lead table and controls

- use a single white results container on the application canvas;
- make filters a compact toolbar with a visible selected tab, consistent 36–40px control height, and clear focus treatment;
- strengthen the store column as the row anchor; subordinate category, channels, rank, score, and status through predictable alignment;
- reduce chip count in the collapsed row by grouping secondary channels without removing their information from the expanded view;
- use tabular numerals for ranks, counts, and scores;
- add a restrained hover/focus state and a clear expanded-row boundary;
- preserve sorting, searching, filtering, pagination, export, external links, and refresh behavior unchanged.

Acceptance: a user can scan store, fit, reachability, score, and status in one horizontal pass; table density is achieved with grouping, not sub-10px essential text.

### Phase 6 — Expanded lead evidence

This is the highest-complexity application phase and should be implemented after the primitives are stable.

- keep the required order: context first, traffic second, remaining evidence after;
- make Lead overview one parent module with identity, score, and outreach as subregions, using dividers/insets rather than three competing cards;
- keep Outcome evidence as a top-right badge/popover;
- show Resolved domain only when present and keep Resolved storefront linked to the resolved domain, not a product path;
- make outreach compact in the overview and present full contact evidence in a proper wide disclosure surface;
- replace giant vocabulary fields with compact summary chips plus a readable disclosure layout;
- design discovery occurrences and store-fit evidence as ledgers: strong occurrence header, compact primary facts, optional token groups, and source links in a consistent footer;
- use progressive disclosure for provenance and secondary diagnostics without hiding important lead data;
- keep every currently surfaced field unless it is explicitly identified as duplicate presentation of the same value;
- preserve missing-data distinctions: missing, not observed, unavailable, and zero must not collapse into one visual state.

Acceptance: expanding a dense lead does not create large blank columns, giant source icons, horizontal overflow, or unreadably small text; long-content fixtures remain composed.

### Phase 7 — Traffic module refinement

- retain the existing interactive globe implementation and country selection behavior;
- standardize globe framing, selected-country state, market link typography, metric cells, and attribution text through the new primitives;
- ensure unavailable countries remain non-interactive and visually quiet;
- reuse the same traffic composition for individual leads and all-lead totals, changing only scale and heading context;
- keep the landing globe in showcase mode with no fabricated metrics.

Acceptance: landing, cumulative, and individual-lead globes visibly belong to the same component family while serving different information densities.

### Phase 8 — Landing-page finishing

The landing page should be harmonized after the application visual language is stable:

- keep the current combined market/prospecting narrative and globe/form composition;
- refine the hero into one compositional field rather than two adjacent objects;
- give the form the same control geometry used in the application, with a higher marketing-level elevation;
- reduce the number of competing section treatments; alternate neutral, white, and one dark band with a predictable rhythm;
- replace generic benefit boxes with selective product-interface previews drawn from the real results experience;
- ensure query review remains a true visual continuation of the landing hero;
- tighten section copy width, button hierarchy, and footer finish;
- do not add invented customer logos, testimonials, usage numbers, addresses, contact information, pricing, or unsupported claims.

Acceptance: the landing page promises the same experience the application visually delivers.

### Phase 9 — Responsive, accessibility, and final polish

- define breakpoints once and colocate responsive rules with their component groups;
- test 390px, 768px, 1024px, 1280px, and 1440px widths;
- establish a visible keyboard focus system for links, buttons, fields, tabs, globe countries, and disclosures;
- maintain 44px touch targets where controls stand alone;
- verify color contrast and do not rely on color alone for status;
- honor `prefers-reduced-motion` for globe transitions, pulse indicators, expansion, and marketing reveals;
- standardize truncation, wrapping, and tooltip/title behavior for long domains and URLs;
- run lint, type checking, tests, production build, and visual comparison after each major page phase.

Acceptance: no regression in interaction, information, accessibility, or responsive behavior; visual changes are deliberate at every target viewport.

## Recommended execution order across sessions

1. Baseline screenshots and token/primitives foundation.
2. Header, auth, history, and global state shells.
3. Query review and run-progress states.
4. Results overview and cumulative traffic hero.
5. Table rows, controls, and pagination.
6. Expanded lead overview and contact evidence.
7. Discovery/store-fit/vocabulary disclosures and remaining evidence.
8. Traffic consistency pass.
9. Landing and query-review finishing pass.
10. Responsive/accessibility audit and final visual regression pass.

Each session should finish one coherent phase or component family, not scatter small style changes across the entire site.

## Change-control rules

- Do not change backend/API contracts as part of visual work.
- Do not rename, omit, reinterpret, or deduplicate data fields without a separate data audit.
- Do not touch polling cadence, refresh triggers, filters, sorting, query editing, export behavior, or external link resolution during restyling.
- Keep the existing globe's data and interaction logic separate from its presentation refactor.
- Preserve user changes in the dirty worktree and review overlapping diffs before editing.
- Read the relevant local Next.js 16.2.12 guide before every implementation phase that changes Next.js APIs, fonts, styling conventions, client/server boundaries, loading UI, or navigation.
- Avoid a one-shot stylesheet rewrite. Migrate a bounded component family, validate it, then remove only the obsolete selectors proven unused by that migration.

## Definition of done

The migration is complete when:

- landing, auth, history, query review, run progress, results, and expanded evidence feel like one product;
- a compact token and primitive system replaces most one-off colors, radii, and shadows;
- essential application text no longer depends on 6–9px sizing;
- green/lime has a clear semantic role and no longer washes across every surface;
- nested-card noise and unexplained blank space are gone;
- loading, empty, failure, partial, and completed states share one visual language;
- all existing user-visible data and functionality remain intact;
- desktop and mobile visual baselines pass a deliberate review rather than relying only on lint and unit tests.
