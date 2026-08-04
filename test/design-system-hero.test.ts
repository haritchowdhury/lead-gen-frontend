import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("landing categories retain validation, suggestions, payload, and redirects", () => {
  const form = source("components/run-form.tsx");

  for (const suggestion of [
    "Clothing", "Eyewear", "Home decor", "Pet supplies", "Skincare",
    "Jewelry", "Fitness", "Baby products", "Kitchenware",
  ]) assert.match(form, new RegExp(`"${suggestion}"`, "u"));

  assert.match(form, /parseCategories\(input\)/u);
  assert.match(form, /body: JSON\.stringify\(\{ shopTypes: parsed\.categories \}\)/u);
  assert.match(form, /router\.push\(`\/runs\/\$\{encodeURIComponent\(run\.runId\)\}`\)/u);
  assert.match(form, /requestError\.code === "AUTHENTICATION_REQUIRED"/u);
  assert.match(form, /router\.push\("\/sign-up"\)/u);
  assert.match(form, /requestError\.code === "BACKEND_TIMEOUT"/u);
});

test("query review retains load, edit, add, remove, reorder, save, and start behavior", () => {
  const editor = source("components/query-editor.tsx");

  assert.match(editor, /`\/api\/runs\/\$\{encodeURIComponent\(runId\)\}\/queries`/u);
  assert.match(editor, /method: "PUT"/u);
  assert.match(editor, /body: JSON\.stringify\(\{\s*revision: querySet\.revision,/u);
  assert.match(editor, /function addRow\(categoryIndex: number\)/u);
  assert.match(editor, /function deleteRow\(row: EditableRow\)/u);
  assert.match(editor, /function moveRow\(row: EditableRow, direction: -1 \| 1\)/u);
  assert.match(editor, /QUERY_REVISION_CONFLICT/u);
  assert.match(editor, /QUERY_LIST_INVALID/u);
  assert.match(editor, /`\/api\/runs\/\$\{encodeURIComponent\(runId\)\}\/start`/u);
  assert.match(editor, /disabled=\{dirty \|\| hasVisibleErrors \|\| !rows\.length \|\| busy !== null\}/u);
  assert.match(editor, /className="query-editor-scroll"/u);
});

test("showcase stays metric-free while shared globe interaction remains intact", () => {
  const globe = source("components/traffic-globe.tsx");

  assert.match(globe, /!showcase && <section className="traffic-market-data"/u);
  assert.match(globe, /onPointerDown=\{handlePointerDown\}/u);
  assert.match(globe, /onPointerMove=\{handlePointerMove\}/u);
  assert.match(globe, /onClick=\{\(\) => rotateToCountry\(market\.country_code\)\}/u);
  assert.match(globe, /aria-pressed=\{selected\}/u);
  assert.match(globe, /export function TrafficGlobeShowcase/u);
});

test("landing and review use the same G4 hero composition without owning lower sections", () => {
  const page = source("app/page.tsx");
  const workspace = source("components/run-workspace.tsx");
  const hero = source("components/landing-sections.tsx");
  const css = source("app/globals.css");

  assert.match(page, /hero landing-hero/u);
  assert.match(workspace, /hero landing-hero query-review-hero/u);
  assert.match(hero, /className="hero-message"/u);
  assert.match(hero, /TrafficGlobeShowcase/u);
  assert.match(css, /G4 — landing and query-review hero composition/u);
  assert.match(css, /\.landing-hero \.run-form-card/u);
  assert.match(css, /--landing-form-height: 49rem/u);
  assert.match(css, /\.landing-hero \.query-editor-scroll/u);
  assert.match(css, /scrollbar-width: thin/u);
  assert.doesNotMatch(css.slice(css.indexOf("G4 —")), /\.process-section\s*\{/u);
});
