# Uphunt aesthetic translation analysis

**Status:** PLANNING ONLY. This document is analysis and planning. It does not authorize implementation, CSS edits, copy changes, or a visual pass. A later explicit user request is required before any of that work starts.  
**Scope:** whole-site aesthetic translation from Uphunt onto StoreSignal’s existing forest-and-lime system. Visual language, spacing, typography, surfaces, and headlines across every public and signed-in route. Keyword research and individual lead details need extra care because they are the most packed and least readable today.  
**Out of scope:** implementation of any kind; APIs, scoring, auth, polling, filters, pagination, CSV, routing, data contracts, dark-mode product work, and any behavior change.  
**Date observed:** 2026-09-01.  
**Primary reference:** [https://uphunt.io/](https://uphunt.io/)

This note answers three questions:

1. What is Uphunt actually doing visually?
2. Can that grammar sit on StoreSignal’s existing forest-and-lime system?
3. Can it be applied to the whole site without a functional rewrite?

### Locked reading: whole site, with extra care on two ugly surfaces

This is a **whole-website** aesthetic plan, not a single-page redesign. Chrome, landing, auth, run history, query review, runtime, completed results, master leads, keyword start, keyword results, and expanded lead details should feel like one product that already matches `/`.

The landing is already close. Pages that *contain information* are the gap. Two of those are extra ugly and need more decompression than the rest:

1. **Keyword research result** (`/keywords/[researchId]`) — currently a packed dashboard of charts. It does not have to stay a dashboard. Unpack every chart into its own titled section. Headlines are for readability of the charts already there, not extra chrome. Length is acceptable.
2. **Individual lead details** (expanded row in `/runs/[runId]` and `/leads`) — currently a dense 6–11px ledger. Give it landing-scale type, section headlines, and room. Same fields. Same expand-in-row pattern.

What “extra care” means on those two surfaces:

- Do not keep a dashboard skeleton and only enlarge captions.
- Do not treat a large title as wasteful because the data is already visible.
- One idea per section, stacked, with landing-scale type and padding.
- Scanability comes from headlines, not from shrinking the content.

The rest of the site still gets the same Uphunt-to-StoreSignal grammar (hairline cards, lime used sparingly, landing headlines, more air). It is simply less crushed today, so it needs less emergency decompression.

---

## 1. Sources inspected

### Uphunt (live markup and CSS, not screenshots)

Observed from the public Next.js HTML on 2026-09-01. Component source files are named in `data-sentry-source-file`.

| Page | URL | Why it matters |
| --- | --- | --- |
| Home | https://uphunt.io/ | Hero, floating glass nav, numbered steps, bento cards, pricing, CTA |
| Playbook | https://uphunt.io/playbook | Data/chart marketing: one chart as a hero, then a gallery of charts with headlines |
| Blog index | https://uphunt.io/blog | Information listing: featured article, large page title, card grid |
| Sign up | https://uphunt.io/auth/signup | Product page using the same hero headline as marketing |

Live tokens taken from the homepage DOM:

- `theme-color` and forced dark canvas: `#0D0D0D`
- Accent lime: `#A8E200` (hover `#b9f200` / `#97CA00` / `#d4ff4e`)
- Typeface: Inter (`--font-inter`, class `font-inter`)
- Floating nav: `fixed top-3 left-1/2 … rounded-2xl backdrop-blur-md bg-white/5 border-white/10`
- Hero overlay: `bg-[#0D0D0D]/65` plus `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(168,226,0,0.10), transparent 60%)`
- Section max width: `max-w-screen-xl` / `max-w-6xl`
- Card recipe: `rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-9`

Homepage sections in source order: `HeroSection` (`hero.tsx`) → `HowItWorksStepsSection` (`how-it-works-steps.tsx`) → `FullGridSection` (`full-grid.tsx`) → `TestimonialSection` (`testimonial.tsx`) → `PricingSection` (`pricing.tsx`) → `RecentBlogPosts` (`recent-blog-posts.tsx`) → closing CTA.

### StoreSignal (this repo)

| Surface | Route | Primary files |
| --- | --- | --- |
| Landing | `/` | `app/page.tsx`, `components/landing-sections.tsx`, `components/run-form.tsx` |
| Sign in / sign up | `/sign-in`, `/sign-up` | `components/auth-form.tsx` |
| Run history | `/runs` | `app/runs/page.tsx`, `components/run-history.tsx` |
| Continue run | `/runs/continue` | `components/run-continuation.tsx` |
| Run workspace (review, runtime, results, individual leads) | `/runs/[runId]` | `components/run-workspace.tsx`, `components/query-editor.tsx`, `components/results-table.tsx`, `components/lead-details.tsx` |
| Master leads | `/leads` | `app/leads/page.tsx`, `components/leads/live-leads-workspace.tsx` |
| Keyword research start | `/keywords` | `app/keywords/page.tsx`, `components/keyword-intelligence/research-form.tsx` |
| Keyword research result | `/keywords/[researchId]` | `components/keyword-intelligence/research-dashboard.tsx`, `chart-panels.tsx`, `keyword-dashboard.module.css` |
| Shared chrome | all | `components/app-header.tsx`, `components/ui/primitives.tsx`, `app/globals.css` |

Design tokens live in `frontend/app/globals.css` `:root` (lines 3–71). Shared primitives live in `frontend/components/ui/primitives.tsx`.

An earlier visual-system checklist (`frontend/docs/open-work/DESIGN_SYSTEM_EXECUTION_CHECKLIST.md`) deliberately compacted information pages toward a dense dashboard grammar. That is the opposite of what this analysis recommends for result and lead pages.

---

## 2. What Uphunt is doing (aesthetic only)

Uphunt is a **dark, lime-accent, editorial SaaS**. The striking part is not a unique color (StoreSignal already has lime). It is how much air, type contrast, and section theater it gives every block of information.

### 2.1 Palette

| Role | Uphunt | StoreSignal today |
| --- | --- | --- |
| Canvas | `#0D0D0D` | `--color-canvas: #f4f3ed` (warm paper) |
| Raised surface | `#111111` / `bg-white/[0.02]` | `--color-surface: #fffefa` |
| Ink | white / `white/60` / `white/35` / `white/20` | `--color-ink: #12231e` and muted greens |
| Accent | `#A8E200` | `--color-signal: #c8f04b` |
| Accent on ink | lime button, dark text `#0D0D0D` | lime button, dark text `#12231e` |
| Hairline | `border-white/[0.06]`–`[0.08]` | `--color-line: #dce1d9` |
| Muted body | `#71717a` / `white/35` | `--color-ink-muted: #40534c` |

The two brands already share the same accent family: chartreuse lime on a restrained base. Uphunt puts that lime on near-black. StoreSignal puts it on forest paper. **Do not invert StoreSignal to black.** Translate the *roles* (accent, hairline, muted copy, raised card) onto the existing light tokens.

### 2.2 Type

Both sites use Inter.

Uphunt’s hierarchy is the thing to steal:

- Hero H1: `text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] font-semibold tracking-[-0.035em] leading-[1.05]`
- One word in the H1 gets a shine gradient `from-white via-[#A8E200] to-white`
- Section H2: `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.05]`, often with a hard line break
- Eyebrow: `text-[11px] font-semibold tracking-[0.2em] uppercase` plus a short lime or white hairline
- Body: `text-white/35`–`/60`, `leading-relaxed` or `leading-[1.65]`, max-width ~`md`/`lg`
- Micro labels: 9–12px, never used as the *primary* heading of a page
- Mono for step numbers (`01` / `02` / `03`) at very low contrast (`text-white/15`)

StoreSignal’s landing already matches this. Information pages do not. Lead section titles currently go down to `0.5rem` (8px) and numbered badges to `0.375rem` (6px) in `globals.css` around the “Dense lead expansion” block.

### 2.3 Layout rhythm

Uphunt spends space on purpose:

- Section padding `py-24 sm:py-32` (96–128px)
- Card padding `p-7 sm:p-9` or `p-8 sm:p-10 lg:p-12`
- Gaps between cards `gap-5`
- Content column often `max-w-2xl` / `max-w-lg` for copy, then a wide visual beside it
- Hero media sits in a padded glass frame: `p-2 sm:p-3 rounded-3xl … border-white/[0.08]` wrapping an inner `rounded-2xl` screenshot
- Step rows are **full-bleed horizontal split**: copy ~56%, visual ~44%, not a cramped 2×2 widget grid

Playbook is the closest analogue to keyword research: a huge headline, one chart treated as a hero, then every other chart as its own titled card. Charts are never four-up at 220px tall.

### 2.4 Surfaces and chrome

- **Floating capsule nav**, not a full-width bar. Frosted, centered, `rounded-2xl`, `w-[70%]`–`75%`, max `screen-xl`.
- **Hairline cards** on a slightly lighter-than-void fill. Hover only lifts the border (`hover:border-white/[0.1]`), not a heavy shadow.
- **Lime as a rare event:** primary CTA, star fill, “Most Popular” pill, connected-status dots, code `POST` token, hover title color. Everything else is white at varying opacity.
- **Pills and chips:** `rounded-full` or `rounded-md` lime-tinted (`bg-[#A8E200]/[0.07] border-[#A8E200]/20`).
- **Avatar initials** in `w-9 h-9 rounded-full bg-white/[0.06]`.
- **Featured pricing card** uses a 1px lime gradient ring `from-[#A8E200]/40 via-[#A8E200]/10 to-transparent` and a 1px lift on hover.
- **Floating toast cards** around the hero screenshot: `rounded-xl border … bg-[#111111]/90 backdrop-blur-md` with a 28px lime-tinted icon tile.

### 2.5 Motion (keep light)

Observed, not required as a 1:1 copy:

- Hero background / overlay / copy staggered reveals (`heroBgReveal` 1.8s, content 1s delayed 0.4s)
- Floating status chips (`heroFloatLeft` / `heroFloatRight`, 6–8s)
- Section heads fade/slide from `opacity-0 translate-y-6`
- CTA arrow `group-hover:translate-x-0.5`
- Lime glow under the hero frame: `blur-3xl` radial `rgba(168,226,0,0.6)`

For StoreSignal, the useful part is *entrance air and hover translation*, not a heavy animation system.

### 2.6 Recurring component recipes (map these, do not clone copy)

1. **Eyebrow + huge H2 + one muted sentence.** Used on every marketing section and on Playbook/Blog.
2. **Numbered split row.** Giant ghost number + lime pill + H3 + body + micro bullets + visual pane.
3. **Bento / 2-up glass cards** with a lime lucide icon and nested inset rows.
4. **Inset comparison pair** (prompt vs generated proposal) — two stacked inner cards.
5. **Code slab** on a darker pane (`bg-black/30`) beside explanation.
6. **Centered closing CTA card** with icon, H3, two buttons (lime + ghost).
7. **Hero product frame** with overlapping status chips.

### 2.7 What not to take

- The black canvas as a product-wide theme.
- Fake connected-status rows, invented testimonials, or pricing theater on app pages.
- Lime shine animation on every heading.
- A second typeface or a new icon library as a prerequisite (lucide vs current custom icons is optional later).
- Dashboard-dark UI for signed-in pages. Uphunt itself forces dark on `/` and `/auth`, not as a claim that every tool screen must be black.

---

## 3. StoreSignal today: why the landing works and the data pages do not

### 3.1 Already aligned with Uphunt

The landing page is already in the same family:

- Warm paper + forest ink + lime signal (`globals.css` `:root`)
- Inter
- Lime primary buttons with dark ink (`ds-button--primary`)
- Editorial section intros via `SectionIntro` in `landing-sections.tsx`: eyebrow, huge title, supporting copy
- Landing H2 size: `clamp(36px, 4.5vw, 59px)`, tracking `-0.065em`, line-height `1.02`
- Hero H1: `clamp(2.5rem, 3.45vw, 3.55rem)` with a lime underline accent on one phrase
- Numbered steps (`01`–`04`) on inverse process cards
- Alternating canvas / surface / inverse bands
- Rounded cards (`--radius-card: 0.75rem`, `--radius-panel: 1rem`) and pill controls
- Sticky frosted header (full width, not floating, but the same *idea*)

A visitor who likes Uphunt already likes StoreSignal’s marketing. The break happens after they have data.

### 3.2 The information-page problem

Information pages currently use a **ledger grammar**: small eyebrows, 9–14px titles, tight grids, nested `<details>`, and CSS that was later compressed further.

Evidence in source:

- `.shell` is `min(1180px, calc(100% - 40px))` — fine for marketing, tight for a research page that already wants `max-width: 1500px` inside the keyword module.
- Keyword research H1 is `clamp(20px, 2.2vw, 30px)` (`.researchHero h1`). Landing H1 is ~40–57px.
- Overview charts sit four-up at `.overviewSignals .chartWrap { height: 220px }`. Analysis charts are two-up at `255px`. Feature chart is `300px`. That is dashboard density. **Keyword research should not use that density.**
- `.sectionKicker` is 9px. Chart titles are 14px. Chart subcopy is 11px.
- Individual lead expansion was explicitly retitled “Dense lead expansion” in `globals.css`. Section H3 is `0.5rem`. Fact grids go to 8 columns. Nested evidence is collapsed behind summaries. The expanded lead is a compressed spreadsheet inside a table row, not a page.
- `/runs` and `/leads` page headers are a small eyebrow + H1 + one line. They do not reuse `SectionIntro` / `.marketing-heading`.
- Keyword table and cluster landscape have **no page-scale headline** at all.

This is why the product “looks finished” on `/` and “not nice looking” on pages that contain information. The tokens are the same. The **typographic and spatial contract** is not.

### 3.3 Headline gap vs the landing page

Landing voice (from `landing-sections.tsx`):

- Eyebrow: “Know more before you say hello”
- Title: “Every lead comes with a reason to care.”
- Copy: one full sentence that tells you *why this block exists*

Information pages currently say things like “Market overview”, “Seed performance”, “01 Lead overview”. Those are labels, not headlines. Uphunt never titles a section with a database noun alone; it titles it with a claim, then shows the data.

That is the consistency request: **every information block should open like a landing section**, then present the same fields, charts, and evidence that already exist. The headline is how a person finds their place in a long page. It does not add a new product surface.

---

## 4. Can the Uphunt design be translated here?

**Yes.** It is a grammar overlay, not a rebuild and not a dark-mode fork.

### 4.1 Why it fits

- Same accent family (lime `#c8f04b` ≈ Uphunt `#A8E200`).
- Same typeface (Inter).
- Same primitive set already exists: `Button`, `Card`, `Badge`, `Metric`, `SectionHeader`, `EmptyState` in `components/ui/primitives.tsx`.
- Landing already implements the Uphunt section recipe (eyebrow + huge title + muted copy + numbered cards).
- Keyword research already has a two-column hero (copy + selection). It is simply undersized.
- Lead details already have the right *content groups* (overview, traffic, store fit, discovery). They are packed, not missing.

### 4.2 What to translate vs what to keep

| Take from Uphunt | Keep StoreSignal |
| --- | --- |
| Section padding and card padding | Paper canvas, forest ink |
| Huge H2 + eyebrow + supporting sentence | Lime-on-paper buttons and accent underline |
| One visual / chart per section, full width | Existing globe, heatmap, Chart.js set |
| Hairline cards, lime used sparingly | Existing tokens and `ds-*` primitives |
| Playbook “one chart, one headline” | All current fields, scores, evidence, filters |
| Floating/frosted chrome *feeling* | Sticky header structure (optional later: capsule nav) |
| Status chips as small lime tiles | Current score / contact / status pills, restyled |

### 4.3 Constraints that stay locked

- No functional changes if this plan is later authorized: same routes, same expand-in-table lead pattern (it can *look* like a page inside the row), same charts, same evidence fields.
- Do not drop evidence because it looks repetitive. Decompress it.
- Do not introduce a second shop-identity UI, a new color theme product, or a component-library rewrite.
- Prefer extending `.marketing-heading` / `SectionIntro` into app canvases over inventing a third heading system.
- Wider shells and taller charts are in scope. New data is not.

### 4.4 Effort shape (planning only — not an assignment)

Low-risk, high-fit:

1. Reuse `SectionIntro` (or an app variant with the same type scale) on `/runs`, `/leads`, `/keywords`, `/keywords/[researchId]`, and expanded lead sections.
2. Widen the research and lead canvases; stack charts; raise chart heights.
3. Restyle lead expansion from dense ledger to stacked editorial sections with the same fields.

Optional later (still aesthetic): capsule header, lime hairline above sections, hero-frame around the globe/heatmap, light hover lift on cards.

Do **not** start with a global dark theme. That would fight the landing page the user already likes.

---

## 5. Route-by-route aesthetic read

### `/` Landing — already the north star

Keep as the headline and type reference. Information pages should borrow this, not the other way around.

Headline pattern to reuse everywhere:

```text
eyebrow (11px, uppercase, ~0.12em, signal/positive)
title   (clamp ~36–59px, weight 700, tracking -0.06em, line-height ~1.02)
copy    (16px, muted, line-height ~1.65, max-width ~36rem)
```

### `/sign-in`, `/sign-up`

`AuthForm` is already a floating card with an eyebrow and H1. Closest to Uphunt’s `/auth/signup`, which repeats the marketing H1. Optional polish: more padding, a muted supporting list, lime primary that matches landing CTAs. Not the priority.

### `/runs` My searches

Utility header only (“Account workspace” / “My searches”). Should open like a landing band: a real title and a sentence about returning to research and leads. History cards can stay; give them Uphunt card padding and hairlines rather than a compact list.

### `/runs/continue`

Transitional. Keep calm. A large “Preparing your search” headline is enough.

### `/runs/[runId]` Query review / runtime / completed results

Query review already reuses `LandingHeroCopy` + `LandingProcess` — good.

Completed results and the leads table are where the landing voice dies. The table can remain the index. The **expanded lead** must stop looking like a nested spreadsheet.

### `/leads`

Same table + expansion as a completed run. Page header is undersized. Cumulative traffic globe deserves a landing-style section intro above it, not only a control strip.

### `/keywords`

`ResearchForm` already has a decent H2 (“Which seed phrases…”). Lift the page header to landing scale so the start of research feels like the start of discovery.

### `/keywords/[researchId]` — highest-priority decompression

This page already contains a rich visual story and then hides it in a multi-chart grid, as if it were an analytics dashboard. It does not need that form:

1. Hero copy + selection review (two columns)
2. Treemap heatmap (tucked into the hero grid)
3. Market globe (tucked under the heatmap)
4. Seed performance
5. Cluster landscape
6. Market overview + four charts in one row
7. Overlap + monthly history
8. Analysis charts (volume/trend, cluster volume, bubble, scatter)
9. Keyword table with no section title

Treat this page like a long article that happens to contain charts — closer to Uphunt Playbook than to an admin home: **one section, one headline, one chart (or one visual), generous height, then the next section.** Stacking is the layout. A dashboard of simultaneous widgets is not.

### Individual lead (`LeadDetails` inside `.detail-row`)

`lead-details.tsx` already groups the right story:

1. Lead overview — score, identity, outreach
2. Traffic enrichment
3. Category and store fit
4. Discovery provenance

CSS then flattens that story into 6–11px type, 8-column fact grids, and stacked disclosures. Decompress by giving each group a landing-style headline, page-scale padding, and readable type (body 14–16px, labels 11–12px). Nested evidence can stay collapsed *until opened*; once open it should read as cards, not 10px ledgers.

There is no `/leads/[id]` route. Expansion-in-row is the individual-lead page. Aesthetic work happens inside that row, not via a new route.

---

## 6. Decompression spec (aesthetic)

Space is allowed site-wide. The two surfaces below need more of it than the others because they are the least readable today.

### 6.1 Keyword research — extra care: decompress every chart

This page may be long. Prefer one idea per section. Headlines are the way through the charts, not a sidebar or a compact overview row. It does not have to look like a dashboard.

### 6.1 Keyword research — decompress every chart

Current chart inventory in `chart-panels.tsx` (keep all of them; change only presentation):

| Chart | Current housing | Target housing |
| --- | --- | --- |
| Cluster treemap (“Demand map”) | Hero column, min-height 330px | Own full-width section, tall scene (~480–560px) |
| Market globe | Hero column, min-height 360px | Own full-width section, same scale as landing globe showcase |
| Seed performance | Full-width panel, modest wrap | Full-width, taller bars, landing headline |
| Search intent mix | 1 of 4 in `.overviewSignals` at 220px | Own card/section, ~360px+ |
| Recommended vs rejected | 1 of 4 at 220px | Own card/section, ~360px+ |
| Opportunity-score distribution | 1 of 4 at 220px | Own card/section, ~360px+ |
| Flag breakdown | 1 of 4 at 220px | Own card/section, ~360px+ |
| Monthly search history | Shared `decisionGrid` with overlap | Own full-width section, tall line chart |
| Active keywords · volume and trend | Feature chart, 300px | Full width, ~420px+ |
| Cluster volume | Wide chart, 255px | Full width, ~380px+ |
| Volume vs keyword difficulty | Half of `.chartPair` | Own full-width (or min 50vw) bubble scene, ~420px |
| Competition vs opportunity | Half of `.chartPair` | Own full-width scatter, ~420px |

Rules:

- Do not keep `.overviewSignals { grid-template-columns: repeat(4, …) }` on desktop.
- Do not keep `.charts { grid-template-columns: repeat(2, …) }` as the default for analysis charts.
- `.chartPair { display: contents }` currently dumps two charts into the 2-column grid; after stacking, each chart is a section.
- Cluster landscape and keyword table each get the same headline recipe as charts.
- Shell for this route may exceed 1180px (the module already aims at 1500px). That is an aesthetic width change, not a functional one.

Suggested vertical order (same data, more air):

1. Page headline + selection
2. Demand map (treemap)
3. Market globe
4. Seed performance
5. Cluster landscape
6. Four overview charts, each stacked
7. Volume overlap (table/bars, not a chart, but still a titled section)
8. Monthly history
9. Volume and trend
10. Cluster volume
11. Difficulty bubble
12. Opportunity scatter
13. Keyword table

### 6.2 Individual leads — extra care: decompress the expansion

The expanded lead is packed and hard to look at. Same whole-site grammar as everywhere else, with extra room because this surface is extra ugly. Keep the expand/collapse row. Inside it, stop crushing the four existing groups:

- **Lead title block:** store name at landing H2 scale, domain as muted supporting line, outcome pill as a lime/forest chip (not a 10px summary).
- **Section 01–04:** keep the numbered order, but render numbers like landing process cards (`01` as a large ghost index), not 6px badges.
- **Fact grids:** 1–3 columns maximum, 12–16px type, padding comparable to Uphunt inner rows (`px-4 py-3.5` analogue: ~16–18px).
- **Outreach:** each channel as its own inset card (icon tile + label + value + source), not a four-column crush.
- **Traffic:** globe and CrUX blocks get the same section intro as `/` “See the bigger market”.
- **Store fit / discovery:** when a disclosure is open, child records are cards with padding, not nested 10px ledgers.

Minimum type floor for anything the user is meant to read: **12px labels, 14px values**. Decorative indexes may stay large and faint, never small and faint.

### 6.3 Rest of the site

Still in scope. `/`, chrome, auth, `/runs`, `/runs/continue`, query review, runtime, completed-run index, `/leads` list, and `/keywords` start all receive the same tokens, type scale, card recipe, and landing-style headlines. They are not the emergency; they should not be skipped. Completed-run filters and tables can gain row height, card radius, and section intros without changing sort/filter behavior.

---

## 7. Headline system (whole site, matching the landing page)

Headlines belong on the whole site. They are the same readability device the landing already uses: name the block, then show the information. They are not marketing overlay.

Keyword research and lead details need more of them, and at larger scale, because those pages currently hide information behind 9–14px labels.

Planning note, not an assignment: if this is later authorized, reuse `SectionIntro` from `landing-sections.tsx` (eyebrow + title + copy) and apply `.marketing-heading` type on app canvases. Keyword module kickers (`.sectionKicker`, `.heroEyebrow`) and lead `h3` strips would be promoted to that recipe rather than remaining 6–10px.

Copy below is **voice-matched to existing landing language**. It does not add product claims, metrics, or testimonials. It only names what each page already shows, so a person can read it.

### 7.1 Page-level headlines

| Route | Eyebrow | Title | Supporting copy |
| --- | --- | --- | --- |
| `/runs` | Account workspace | Return to the searches you already started. | Continue keyword research or open the leads from an earlier market. |
| `/leads` | Live lead workspace | Every shop you have already found, in one place. | One live record per store, with the evidence from every discovering run still attached. |
| `/keywords` | Keyword research | See the phrases a market actually uses. | Start from seed phrases. Finish with a shortlist you are willing to search. |
| `/keywords/[researchId]` | Keyword intelligence | The landscape behind this market. | Active phrases, recommended targets, and the clusters that hold the demand. |
| `/sign-in` (optional) | StoreSignal account | Welcome back. | Sign in to continue a pending search or return to earlier runs. |
| Completed `/runs/[runId]` results | Lead discovery | The stores this search was able to stand behind. | Inspect the evidence, then keep the prospects worth approaching. |

The research result H1 that currently reads “N keywords across M clusters” can stay as a **stat line under** the editorial title, the way Uphunt puts “4.9/5 from 1k+ freelancers” above its H1 — or inverted: editorial H1 first, then the count sentence as the intro paragraph (closer to current landing hero).

### 7.2 Keyword research section headlines

Replace chart-only labels with landing-style section heads. The H2 is the readable name of the information; the chart is the body. A leftover inner caption is optional and should never be the only title.

| Current label | Proposed eyebrow | Proposed H2 | Proposed supporting line |
| --- | --- | --- | --- |
| Demand map / treemap | Demand map | See which clusters hold the search demand. | Cluster size is the share of filtered volume, not a ranking of quality. |
| Market globe | Market lens | The same keywords, nine markets. | Move between worldwide and country views without leaving this research. |
| Seed performance | Seed phrases | Which starting phrases actually pulled weight. | Volume split into recommended, declining, and remaining keywords. |
| Cluster landscape | Clusters | Related phrases, grouped so you can choose a lane. | Select a cluster to inspect its volume, CPC, and mix. |
| Store-discovery mix | Discovery mix | How this list divides across store, local, product, and brand demand. | Counts and volume for each lane already used by the pipeline. |
| Search intent mix | Intent | What people mean when they search these phrases. | Share of active keywords by search-intent label. |
| Recommended vs rejected | Recommendation | What the pipeline would keep, and what it would drop. | Recommendation status for the active set, not a new score. |
| Opportunity-score distribution | Opportunity | Where the scores actually sit. | Active keywords in 10-point buckets from 0–10 through 90–100. |
| Flag breakdown | Quality flags | The warnings attached to this set. | Declining traffic, too-broad phrases, and too-little traffic. |
| Possible volume overlap | Overlap | Phrases that may be counting the same demand twice. | Variants that share metrics and monthly history. |
| Actual monthly search history | History | How volume moved, month by month. | Combined history for the filtered set, or one keyword at a time. |
| Active keywords · volume and trend | Volume and trend | The phrases, their volume, and whether they are rising. | Columns are volume. The line is seasonality-adjusted momentum. |
| Cluster volume | Cluster volume | Combined search volume, cluster by cluster. | Sorted by volume. Color is share of the filtered total. |
| Volume vs keyword difficulty | Difficulty | High demand is not the same as an easy phrase. | Each bubble is a keyword: volume, difficulty, CPC, commercial intent. |
| Competition vs opportunity | Competition | Low competition, high opportunity — if that quadrant exists here. | Each point is a keyword on competition versus opportunity score. |
| Keyword table | Shortlist | Every active phrase, ready to inspect and keep. | Sort, filter, and select without leaving the evidence above. |
| Selection review (existing H2 is already close) | Shortlist | Recommended keywords, ready for your final edit. | Keep the current selection-review title; it already sounds like the landing. |

### 7.3 Individual lead section headlines

Extra care on this surface: replace “01 Lead overview” as an 8px label with readable section titles. Keep the four existing groups and their fields.

| Current title | Proposed eyebrow / index | Proposed H2 | Proposed supporting line |
| --- | --- | --- | --- |
| Lead overview | 01 · The store | Know the business behind this domain. | Score, identity, and the outreach paths that were actually recorded. |
| Score semantics (inner panel) | Strength | Why this lead sits where it does. | The recorded score and the parts that added up to it. |
| Store identity (inner panel) | Identity | The storefront StoreSignal resolved. | Canonical domain, confidence, and how the identity was verified. |
| Outreach evidence (inner panel) | Reachability | A real way in, if one was found. | Validated channels first. Supporting contact evidence stays inspectable. |
| Traffic enrichment | 02 · Attention | Where this store already appears in search. | Visibility estimates, not private storefront analytics. |
| Category and store fit | 03 · Fit | Whether this shop belongs in the market you asked for. | Exact input, normalized category, and the store-fit evidence behind the call. |
| Discovery provenance | 04 · Provenance | How this store entered the list. | Query, rank, and the occurrences that produced this row. |

Inner panels (score, identity, outreach) can use an H3 at ~22–28px, not another 10px uppercase strip.

### 7.4 Consistency rules for future copy

- Headlines are sentences or claims, ending in a period when they are full sentences (landing already does this).
- Eyebrows stay short, uppercase, widely tracked.
- Supporting copy explains the *frame*, never a new metric.
- Do not put pipeline nouns alone in the H2 (“Flag Breakdown”, “Fact grid”).
- Inverse bands (if used on app pages) keep lime eyebrows, matching `.marketing-heading.is-inverse`.

---

## 8. Token-level translation cheat sheet

Use existing CSS variables. Map Uphunt roles onto them.

| Uphunt (observed) | StoreSignal token |
| --- | --- |
| `#A8E200` | `--color-signal` (`#c8f04b`) |
| `#97CA00` / `#b9f200` hover | `--color-signal-strong` (`#9fc82c`) |
| `#0D0D0D` ink on lime | `--color-ink` / `--color-inverse` |
| `white/60` body | `--color-ink-muted` |
| `white/35` secondary | `--color-ink-subtle` |
| `border-white/[0.06]` | `--color-line` at low emphasis |
| `bg-white/[0.02]` card | `--color-surface` on `--color-canvas` |
| `#111111` raised | slightly inset mix, not a new black |
| `rounded-2xl` | `--radius-panel` (consider 1.25rem if cards need more Uphunt roundness) |
| `rounded-xl` controls | `--radius-card` / `--radius-control` |
| `px-7 py-3.5` CTA | already close to `--control-height-lg` + `--space-4` |
| Section `py-24` | new information-page section padding; landing already uses `clamp(5rem, 8vw, 7.5rem)` |

Shadows: Uphunt uses glow (`shadow-[…rgba(168,226,0,0.5)]`) on lime CTAs and `shadow-black/40` on media frames. StoreSignal already has `--elevation-card` and `--elevation-floating`. Prefer those on paper; add a *soft lime halo* only under hero visuals (heatmap frame, globe frame, primary CTA), not under every table.

---

## 9. Verdict

Uphunt’s design **can and should** be translated into this repo as an aesthetic layer on the existing forest-and-lime system.

The landing page is already most of the way there. The unfinished feeling is concentrated on **pages that contain information**. Two of those — keyword research and individual lead details — are extra ugly and need more decompression than chrome, auth, or history lists.

The correction is a whole-site aesthetic layer, not a single-page redesign, and not a functional rewrite:

1. **Whole site:** same Uphunt-to-StoreSignal grammar everywhere — landing headlines, hairline cards, lime used sparingly, more air, paper canvas kept.
2. **Keyword research (extra care):** stop treating it as a dashboard. Every chart is its own full-width, tall, titled section. Headlines exist so the existing charts can be read.
3. **Individual leads (extra care):** decompress the expanded row — more space, readable type, section titles, same four evidence groups.

This document does not start that work. Optional polish (capsule header, shine on one hero word, lime gradient ring on a featured card) is also unassigned.
