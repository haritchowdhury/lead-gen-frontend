import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const runWorkspace = await readFile(new URL("../components/run-workspace.tsx", import.meta.url), "utf8");
const leadsPage = await readFile(new URL("../app/leads/page.tsx", import.meta.url), "utf8");
const liveLeadsWorkspace = await readFile(new URL("../components/leads/live-leads-workspace.tsx", import.meta.url), "utf8");
const resultsTable = await readFile(new URL("../components/results-table.tsx", import.meta.url), "utf8");
const resultsFilters = await readFile(new URL("../components/results-filters.tsx", import.meta.url), "utf8");
const globalsCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W8-001 run workspace completed-results intro and polling pin", () => {
  assert.match(runWorkspace, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(runWorkspace, /Lead discovery/u);
  assert.match(runWorkspace, /The stores this search was able to stand behind\./u);
  assert.match(runWorkspace, /Inspect the evidence, then keep the prospects worth approaching\./u);
  assert.match(runWorkspace, /const RETRY_DELAYS = \[3_000, 5_000, 10_000, 15_000\];/u);
  recordExecuted("CASE-UA-W8-001");
});

test("CASE-UA-W8-002 leads and live leads workspace intro", () => {
  assert.match(leadsPage, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(leadsPage, /Live lead workspace/u);
  assert.match(leadsPage, /Every shop you have already found, in one place\./u);
  assert.match(leadsPage, /One live record per store, with the evidence from every discovering run still attached\./u);
  assert.match(leadsPage, /href="\/runs"/u);
  assert.match(liveLeadsWorkspace, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(liveLeadsWorkspace, /Live lead workspace/u);
  assert.match(liveLeadsWorkspace, /Every shop you have already found, in one place\./u);
  assert.match(liveLeadsWorkspace, /One live record per store, with the evidence from every discovering run still attached\./u);
  recordExecuted("CASE-UA-W8-002");
});

test("CASE-UA-W8-003 collapsed row height, sort keys, and expansion shell padding", () => {
  assert.match(resultsTable, /className="detail-row"/u);
  assert.match(resultsFilters, /sortBy/u);
  assert.match(resultsFilters, /sortDirection/u);
  assert.match(runWorkspace, /params\.get\("page"\)/u);
  assert.match(runWorkspace, /params\.get\("sortBy"\)/u);
  assert.match(runWorkspace, /params\.get\("sortDirection"\)/u);
  assert.match(runWorkspace, /params\.get\("search"\)/u);
  assert.match(globalsCss, /min-height: 56px;/u);
  assert.match(globalsCss, /padding: var\(--space-5\);/u);
  assert.match(globalsCss, /\.lead-expansion-shell/u);
  recordExecuted("CASE-UA-W8-003");
});
