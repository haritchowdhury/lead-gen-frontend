import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const landingSections = await readFile(
  new URL("../components/landing-sections.tsx", import.meta.url),
  "utf8",
);
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W5-001 landing sections keep SectionIntro headers and copy", () => {
  assert.match(
    landingSections,
    /import \{ SectionIntro \} from "@\/components\/section-intro";/u,
  );
  assert.equal([...landingSections.matchAll(/<SectionIntro /gu)].length, 3);
  assert.match(landingSections, /A better lead list in four simple steps\./u);
  assert.match(landingSections, /Every lead comes with a reason to care\./u);
  assert.match(landingSections, /Whatever you sell, start with stores that need it\./u);
  recordExecuted("CASE-UA-W5-001");
});

test("CASE-UA-W5-002 intelligence-card hairline and marketing heading clamp", () => {
  assert.match(globals, /padding: 31px;\n  border: 1px solid var\(--color-line\);/u);
  assert.match(globals, /font-size: clamp\(36px, 4\.5vw, 59px\);/u);
  assert.match(globals, /--color-signal: #c8f04b/u);
  recordExecuted("CASE-UA-W5-002");
});
