import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const css = fs.readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const production = [
  "../components/lead-details.tsx",
  "../components/results-table.tsx",
  "../components/run-evidence.tsx",
  "../components/traffic-enrichment.tsx",
].map((file) => fs.readFileSync(new URL(file, import.meta.url), "utf8")).join("\n");

test("G12 keeps shared traffic controls readable, touchable, and keyboard visible", () => {
  assert.match(css, /\.traffic-country-links button,[\s\S]*?\.cumulative-traffic \.traffic-country-links button\s*\{[\s\S]*?min-height:\s*1\.5rem;[\s\S]*?font-size:\s*10px;/u);
  assert.match(css, /\.traffic-country-links button:focus-visible,[\s\S]*?\.traffic-globe-markets\[role="button"\]:focus-visible/u);
  assert.match(css, /\.traffic-country-links button span,[\s\S]*?\.cumulative-traffic \.traffic-metric-grid dd,[\s\S]*?font-size:\s*10px;/u);
});

test("G12 preserves reduced-motion and forced-colors fallbacks", () => {
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?animation-duration:\s*0\.01ms !important;[\s\S]*?transition-duration:\s*0\.01ms !important;/u);
  assert.match(css, /@media \(forced-colors: active\)[\s\S]*?border:\s*1px solid currentColor;[\s\S]*?outline-color:\s*Highlight;/u);
});

test("G12 external production links retain safe new-tab attributes", () => {
  const newTabs = [...production.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gu)].map(([tag]) => tag);
  assert.ok(newTabs.length >= 4);
  for (const tag of newTabs) assert.match(tag, /rel="noreferrer"/u);
});
