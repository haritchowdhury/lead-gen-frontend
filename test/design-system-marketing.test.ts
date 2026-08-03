import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("lower landing page retains every owned section and truthful copy", () => {
  const landing = source("components/landing-sections.tsx");

  for (const section of [
    "landing-problem", "process-section", "intelligence-section", "evidence-section",
    "market-section", "use-cases-section", "control-section", "faq-section",
    "final-cta", "site-footer",
  ]) assert.match(landing, new RegExp(`className="${section}`, "u"));

  assert.match(landing, /Search visibility estimates are not private storefront analytics\./u);
  assert.match(landing, /Traffic figures are search-visibility estimates, not private storefront analytics or confirmed website visits\./u);
  assert.match(landing, /Depending on what a store makes publicly available/u);
  assert.doesNotMatch(landing, /mailto:|testimonial|pricing|street address|trusted by|customers\b/iu);
});

test("start and query-review variants keep their local CTA targets", () => {
  const landing = source("components/landing-sections.tsx");

  assert.match(landing, /const target = reviewing \? "#query-review" : "#start-discovery"/u);
  assert.match(landing, /href=\{target\}/u);
  assert.match(landing, /reviewing \? "Return to my search plan" : "Start finding stores"/u);
  assert.match(landing, /reviewing \? "Review my search plan" : "Find my next leads"/u);
  assert.match(landing, /href="#how-it-works"/u);
  assert.match(landing, /href="#what-you-get"/u);
  assert.match(landing, /href="#use-cases"/u);
});

test("FAQ preserves native disclosure semantics and visible keyboard focus", () => {
  const landing = source("components/landing-sections.tsx");
  const css = source("app/globals.css");

  assert.match(landing, /<details key=\{question\}><summary>/u);
  assert.match(landing, /<span aria-hidden="true">\+<\/span>/u);
  assert.match(css, /\.marketing-flow \.faq-list summary:focus-visible/u);
  assert.match(css, /\.marketing-flow section\[id\][\s\S]*scroll-margin-top/u);
});

test("G5 styling is scoped below the hero and honors the shared visual roles", () => {
  const css = source("app/globals.css");
  const g5 = css.slice(css.indexOf("G5 —"));

  assert.match(g5, /\.marketing-flow/u);
  assert.match(g5, /var\(--color-canvas\)/u);
  assert.match(g5, /var\(--color-surface\)/u);
  assert.match(g5, /var\(--color-inverse\)/u);
  assert.match(g5, /var\(--color-signal\)/u);
  assert.match(g5, /@media \(max-width: 780px\)/u);
  assert.doesNotMatch(g5.slice(0, g5.indexOf(".marketing-heading")), /\.landing-hero/u);
});
