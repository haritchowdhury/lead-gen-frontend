import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const researchDashboard = await readFile(
  new URL("../components/keyword-intelligence/research-dashboard.tsx", import.meta.url),
  "utf8",
);

test("CASE-UA-W12-001 research dashboard result page intro", () => {
  assert.match(researchDashboard, /Keyword intelligence/u);
  assert.match(researchDashboard, /The landscape behind this market\./u);
  assert.match(
    researchDashboard,
    /Active phrases, recommended targets, and the clusters that hold the demand\./u,
  );
  recordExecuted("CASE-UA-W12-001");
});

test("CASE-UA-W12-002 research dashboard SectionIntro import", () => {
  assert.match(
    researchDashboard,
    /import \{ SectionIntro \} from "@\/components\/section-intro";/u,
  );
  recordExecuted("CASE-UA-W12-002");
});
