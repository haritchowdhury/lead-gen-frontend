import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W15-001 reduced-motion rule remains", () => {
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(globals, /transition-duration:\s*0\.01ms !important/u);
  recordExecuted("CASE-UA-W15-001");
});

test("CASE-UA-W15-002 lead detail section heading type floor", () => {
  const block = globals.match(/\.lead-details \.detail-section > h3 \{[\s\S]*?\}/u)?.[0] ?? "";
  assert.ok(block.includes("font-size: 1.375rem;"));
  assert.ok(!block.includes("font-size: 0.5rem;"));
  recordExecuted("CASE-UA-W15-002");
});
