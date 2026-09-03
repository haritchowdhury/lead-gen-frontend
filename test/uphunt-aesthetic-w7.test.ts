import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const queryEditor = await readFile(
  new URL("../components/query-editor.tsx", import.meta.url),
  "utf8",
);
const runProgress = await readFile(new URL("../components/run-progress.tsx", import.meta.url), "utf8");
const runWorkspace = await readFile(new URL("../components/run-workspace.tsx", import.meta.url), "utf8");

test("CASE-UA-W7-001 query editor search plan intro", () => {
  assert.match(queryEditor, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(queryEditor, /Search plan/u);
  assert.match(queryEditor, /Shape the searches before discovery starts\./u);
  assert.match(queryEditor, /Review, edit, or add queries, then start when the direction feels right\./u);
  recordExecuted("CASE-UA-W7-001");
});

test("CASE-UA-W7-002 run progress discovery intro and polling pin", () => {
  assert.match(runProgress, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.match(runProgress, /Discovery/u);
  assert.match(runProgress, /StoreSignal is looking for matching stores\./u);
  assert.match(runProgress, /The stages and counts below are the existing run status\./u);
  assert.match(runWorkspace, /const RETRY_DELAYS = \[3_000, 5_000, 10_000, 15_000\];/u);
  recordExecuted("CASE-UA-W7-002");
});
