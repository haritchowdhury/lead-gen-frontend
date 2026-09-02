import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W4-001 landing page still imports and renders LandingHeroCopy", () => {
  assert.match(page, /import \{ LandingHeroCopy, LandingProcess \} from "@\/components\/landing-sections";/u);
  assert.match(page, /<LandingHeroCopy \/>/u);
  recordExecuted("CASE-UA-W4-001");
});

test("CASE-UA-W4-002 run-form-card uses the hairline border and radius-panel tokens", () => {
  assert.match(
    globals,
    /padding: 34px;\n  border: 1px solid var\(--color-line\);\n  border-radius: var\(--radius-panel\);/u,
  );
  assert.match(
    globals,
    /\.landing-hero \.run-form-card \{\n  min-height: 47rem;\n  padding: clamp\(1\.75rem, 2\.6vw, 2\.25rem\);\n  border: 1px solid var\(--color-line\);\n  border-radius: var\(--radius-panel\);/u,
  );
  assert.match(
    globals,
    /  \.run-form-card \{\n    padding: 23px 20px;\n    border-radius: var\(--radius-panel\);\n  \}/u,
  );
  assert.match(
    globals,
    /  \.landing-hero \.run-form-card \{\n    min-height: 0;\n    padding: var\(--space-5\) var\(--space-4\);\n    border-radius: var\(--radius-panel\);\n  \}/u,
  );
  assert.match(globals, /--color-signal:\s*#c8f04b/u);
  recordExecuted("CASE-UA-W4-002");
});
