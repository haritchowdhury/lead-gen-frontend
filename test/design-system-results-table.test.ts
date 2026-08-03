import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";

const filters = fs.readFileSync(
  new URL("../components/results-filters.tsx", import.meta.url),
  "utf8",
);
const table = fs.readFileSync(
  new URL("../components/results-table.tsx", import.meta.url),
  "utf8",
);
const workspace = fs.readFileSync(
  new URL("../components/run-workspace.tsx", import.meta.url),
  "utf8",
);
const css = fs.readFileSync(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);

test("G8 preserves filter debounce, sort options, paging, and URL-backed changes", () => {
  assert.match(filters, /window\.setTimeout\([\s\S]*350/u);
  assert.match(filters, /search: search\.trim\(\), page: 1/u);
  assert.match(filters, /onChange\(\{ status: option\.value, page: 1 \}\)/u);
  for (const option of [
    "lead_score:desc",
    "lead_score:asc",
    "store_name:asc",
    "store_name:desc",
    "shop_type:asc",
    "google_rank:asc",
  ]) {
    assert.match(filters, new RegExp(`value="${option}"`, "u"));
  }
  assert.match(workspace, /router\.replace\([\s\S]*scroll: false/u);
  assert.match(workspace, /onPage=\{\(page\) => changeFilters\(\{ page \}\)\}/u);
  assert.match(workspace, /disabled=\{page <= 1\}/u);
  assert.match(workspace, /disabled=\{page >= totalPages\}/u);
});

test("G8 table retains scan fields, safe store links, and truthful expansion semantics", () => {
  for (const heading of ["Store", "Category", "Reachability", "Rank", "Score", "Status"]) {
    assert.match(table, new RegExp(`>${heading}<`, "u"));
  }
  assert.match(table, /safeExternalUrl\(lead\.final_url \?\? lead\.canonical_url\)/u);
  assert.match(table, /target="_blank" rel="noreferrer"/u);
  assert.match(table, /aria-expanded=\{isExpanded\}/u);
  assert.match(table, /aria-controls=\{detailId\}/u);
  assert.match(table, /onExpandedLeadId\(isExpanded \? null : lead\.id\)/u);
  assert.match(table, /retainedExpandedLead\(expanded, leads\)/u);
  assert.match(table, /<td colSpan=\{7\}>[\s\S]*lead-expansion-shell[\s\S]*<LeadDetails lead=\{lead\}/u);
});

test("G8 groups secondary channels without changing channel derivation", () => {
  assert.match(table, /const channels = contactChannels\(lead\)/u);
  assert.match(table, /compactChannels\.slice\(0, 2\)/u);
  assert.match(table, /remainingChannelCount/u);
  assert.match(table, /Available channels: \$\{compactChannels\.join\(", "\)\}/u);
  assert.match(table, /title=\{compactChannels\.slice\(2\)\.join\(", "\)\}/u);
});

test("G8 styling keeps essential table text readable and overflow scoped to the table", () => {
  assert.match(css, /\.table-wrap \{[\s\S]*overflow-x: auto/u);
  assert.match(css, /\.results-table \{[\s\S]*min-width: 980px/u);
  assert.match(css, /\.lead-expansion-shell \{[\s\S]*width: 100%[\s\S]*min-width: 0/u);
  assert.match(css, /\.results-table tbody > tr:not\(\.detail-row\):focus-within/u);
  assert.match(css, /\.row-toggle:focus-visible/u);
  for (const selector of [
    ".results-table th",
    ".store-cell small",
    ".category-pill",
    ".cell-note",
    ".contact-tier",
    ".channel-list i",
    ".status-pill",
  ]) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
    const match = css.match(new RegExp(`${escaped} \\{([\\s\\S]*?)\\n\\}`, "u"));
    assert.ok(match, `missing ${selector}`);
    const size = match[1].match(/font-size:\s*(\d+)px/u);
    assert.ok(size && Number(size[1]) >= 10, `${selector} must remain at least 10px`);
  }
});
