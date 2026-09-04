import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const keywordTable = await readFile(
  new URL("../components/keyword-intelligence/keyword-table.tsx", import.meta.url),
  "utf8",
);

const clusterLandscape = await readFile(
  new URL("../components/keyword-intelligence/cluster-landscape.tsx", import.meta.url),
  "utf8",
);

const summaryCards = await readFile(
  new URL("../components/keyword-intelligence/summary-cards.tsx", import.meta.url),
  "utf8",
);

const filterBar = await readFile(
  new URL("../components/keyword-intelligence/filter-bar.tsx", import.meta.url),
  "utf8",
);

test("CASE-UA-W14-001 keyword table shortlist SectionIntro present", () => {
  assert.match(keywordTable, /Every active phrase, ready to inspect and keep\./u);
  recordExecuted("CASE-UA-W14-001");
});

test("CASE-UA-W14-002 cluster and overlap SectionIntro present", () => {
  assert.match(clusterLandscape, /Related phrases, grouped so you can choose a lane\./u);
  assert.match(summaryCards, /Phrases that may be counting the same demand twice\./u);
  recordExecuted("CASE-UA-W14-002");
});

test("CASE-UA-W14-003 filter bar market filter preserved", () => {
  assert.match(filterBar, /data-filter="market"/u);
  recordExecuted("CASE-UA-W14-003");
});
