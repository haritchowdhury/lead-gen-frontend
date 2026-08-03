import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const primitives = await readFile(new URL("../components/ui/primitives.tsx", import.meta.url), "utf8");

test("G2 exposes the required semantic token vocabulary and exactly three elevation roles", () => {
  for (const token of [
    "color-canvas", "color-surface", "color-surface-inset", "color-ink", "color-ink-muted",
    "color-line", "color-signal", "color-positive", "color-warning", "color-danger", "color-inverse",
    "font-size-label", "space-4", "radius-card", "control-height",
  ]) assert.match(css, new RegExp(`--${token}:`));

  assert.deepEqual([...css.matchAll(/--elevation-([a-z-]+):/gu)].map((match) => match[1]), ["inset", "card", "floating"]);
  assert.match(css, /--ink:\s*var\(--color-ink\)/u);
  assert.match(css, /--paper:\s*var\(--color-canvas\)/u);
});

test("G2 scopes transitions to interactive primitives and honors reduced motion", () => {
  assert.doesNotMatch(css, /(?:^|\})\s*\*\s*\{[^}]*transition(?:-property)?:/u);
  assert.match(css, /\.ds-button,[\s\S]*?transition:/u);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(css, /transition-duration:\s*0\.01ms !important/u);
  assert.match(css, /:focus-visible[\s\S]*?outline:\s*2px solid var\(--color-ink\)/u);
});

test("presentation primitives retain native semantics and truthful state hooks", () => {
  assert.match(primitives, /export function Button[\s\S]*?<button[\s\S]*?type=\{type\}/u);
  assert.match(primitives, /export function Field[\s\S]*?<input/u);
  assert.match(primitives, /role=\{tone === "danger" \? "alert" : "status"\}/u);
  assert.match(primitives, /<details[\s\S]*?<summary>\{summary\}<\/summary>/u);
  assert.match(primitives, /detail !== undefined && detail !== null/u);
  assert.match(primitives, /aria-hidden="true"/u);
});
