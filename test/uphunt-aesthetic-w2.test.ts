import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const sectionIntro = await readFile(new URL("../components/section-intro.tsx", import.meta.url), "utf8");
const landingSections = await readFile(new URL("../components/landing-sections.tsx", import.meta.url), "utf8");

test("CASE-UA-W2-001 landing :root signal tokens remain", () => {
  for (const token of ["color-canvas", "color-ink", "color-signal"]) {
    assert.match(globals, new RegExp(`--${token}:`));
  }
  assert.match(globals, /--color-signal:\s*#c8f04b/u);
  recordExecuted("CASE-UA-W2-001");
});

test("CASE-UA-W2-002 section-intro exports the frozen SectionIntro heading recipe", () => {
  assert.match(sectionIntro, /export function SectionIntro/u);
  assert.match(sectionIntro, /className=\{`marketing-heading\$\{inverse \? " is-inverse" : ""\}`\}/u);
  assert.match(sectionIntro, /\{eyebrow !== undefined \? <span className="eyebrow">\{eyebrow\}<\/span> : null\}/u);
  assert.match(sectionIntro, /\{copy !== undefined \? <p>\{copy\}<\/p> : null\}/u);
  recordExecuted("CASE-UA-W2-002");
});

test("CASE-UA-W2-003 landing-sections imports the shared SectionIntro with call sites intact", () => {
  assert.match(landingSections, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.doesNotMatch(landingSections, /function SectionIntro/u);
  assert.equal([...landingSections.matchAll(/<SectionIntro /gu)].length, 3);
  recordExecuted("CASE-UA-W2-003");
});

test("CASE-UA-W2-004 reduced-motion rule remains with no global transition", () => {
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(globals, /transition-duration:\s*0\.01ms !important/u);
  assert.doesNotMatch(globals, /(?:^|\})\s*\*\s*\{[^}]*transition(?:-property)?:/u);
  recordExecuted("CASE-UA-W2-004");
});
