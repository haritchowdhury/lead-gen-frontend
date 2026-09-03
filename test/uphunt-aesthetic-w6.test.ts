import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const runsPage = await readFile(new URL("../app/runs/page.tsx", import.meta.url), "utf8");
const keywordsPage = await readFile(new URL("../app/keywords/page.tsx", import.meta.url), "utf8");
const runContinuation = await readFile(
  new URL("../components/run-continuation.tsx", import.meta.url),
  "utf8",
);
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W6-001 runs page intro and app-page-header gap", () => {
  assert.match(runsPage, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(runsPage, /Account workspace/u);
  assert.match(runsPage, /Return to the searches you already started\./u);
  assert.match(runsPage, /Continue keyword research or open the leads from an earlier market\./u);
  assert.match(runsPage, /href="\/"/u);
  assert.match(globals, /align-items: flex-end;\n  gap: var\(--space-6\);/u);
  recordExecuted("CASE-UA-W6-001");
});

test("CASE-UA-W6-002 keywords page intro", () => {
  assert.match(keywordsPage, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(keywordsPage, /Keyword research/u);
  assert.match(keywordsPage, /See the phrases a market actually uses\./u);
  assert.match(
    keywordsPage,
    /Start from seed phrases\. Finish with a shortlist you are willing to search\./u,
  );
  recordExecuted("CASE-UA-W6-002");
});

test("CASE-UA-W6-003 run continuation intro", () => {
  assert.match(runContinuation, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(runContinuation, /Preparing run/u);
  assert.match(runContinuation, /Your search is being prepared\./u);
  assert.match(runContinuation, /Continue when the next step is ready\./u);
  assert.match(runContinuation, /href="\/runs"/u);
  recordExecuted("CASE-UA-W6-003");
});
