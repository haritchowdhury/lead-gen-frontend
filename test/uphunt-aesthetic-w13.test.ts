import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const keywordDashboardModuleCss = await readFile(
  new URL("../components/keyword-intelligence/keyword-dashboard.module.css", import.meta.url),
  "utf8",
);

const chartPanels = await readFile(
  new URL("../components/keyword-intelligence/chart-panels.tsx", import.meta.url),
  "utf8",
);

const researchDashboard = await readFile(
  new URL("../components/keyword-intelligence/research-dashboard.tsx", import.meta.url),
  "utf8",
);

test("CASE-UA-W13-001 keyword dashboard charts grid is single column", () => {
  assert.match(keywordDashboardModuleCss, /\.charts \{[\s\S]*?grid-template-columns: 1fr;/u);
  assert.doesNotMatch(keywordDashboardModuleCss, /\.charts \{[\s\S]{0,240}repeat\(2/u);
  recordExecuted("CASE-UA-W13-001");
});

test("CASE-UA-W13-002 chart wrap heights and tall rule stay locked", () => {
  assert.match(keywordDashboardModuleCss, /min-height: 520px;/u);
  assert.match(keywordDashboardModuleCss, /\.seedPerformanceChart \{ height: 420px; \}/u);
  assert.match(keywordDashboardModuleCss, /\.chartWrap \{ position: relative; height: 360px; \}/u);
  assert.match(keywordDashboardModuleCss, /\.chartWrap\.tall \{ height: 380px; \}/u);
  recordExecuted("CASE-UA-W13-002");
});

test("CASE-UA-W13-003 all eleven chart data-surface values preserved", () => {
  for (const surface of [
    "chart:seeds",
    "chart:intent",
    "chart:recommended",
    "chart:histogram",
    "chart:flags",
    "chart:history",
    "chart:treemap",
    "chart:top-keywords",
    "chart:cluster-volume",
    "chart:bubble",
    "chart:scatter",
  ]) {
    assert.ok(chartPanels.includes(`data-surface="${surface}"`), `missing ${surface}`);
  }
  recordExecuted("CASE-UA-W13-003");
});

test("CASE-UA-W13-004 SectionIntro copy strings present", () => {
  assert.match(chartPanels, /See which clusters hold the search demand\./u);
  assert.match(chartPanels, /Which starting phrases actually pulled weight\./u);
  assert.match(chartPanels, /What people mean when they search these phrases\./u);
  assert.match(researchDashboard, /The same keywords, nine markets\./u);
  recordExecuted("CASE-UA-W13-004");
});
