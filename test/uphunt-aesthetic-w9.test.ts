import assert from "node:assert/strict";
import { mkdtemp, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";
import { denseLead, lead, trafficEnrichment } from "./fixtures.ts";

type Components = {
  LeadDetails: React.ComponentType<{ lead: ReturnType<typeof lead> }>;
  ResultsTableView: React.ComponentType<{
    leads: ReturnType<typeof lead>[];
    loading: boolean;
    expandedLeadId: string | null;
    onExpandedLeadId: (leadId: string | null) => void;
  }>;
  TrafficEnrichmentDetails: React.ComponentType<{
    enrichment: ReturnType<typeof trafficEnrichment> | undefined;
  }>;
  coreWebVitalRating: (
    metric: "lcp" | "inp" | "cls",
    value: number,
  ) => "good" | "needs_improvement" | "poor";
  coreWebVitalsAssessment: (
    metrics: ReturnType<typeof trafficEnrichment>["crux"] extends infer Crux
      ? Crux extends { origin_metrics: { metrics?: infer Metrics } }
        ? Metrics
        : never
      : never,
  ) => "good" | "needs_improvement" | "poor" | "incomplete";
  formattedCalendarDate: (value: string) => string;
};

let compiled: Promise<Components> | null = null;

function compiledComponents(): Promise<Components> {
  if (compiled) return compiled;
  compiled = (async () => {
    const frontendRoot = fileURLToPath(new URL("..", import.meta.url));
    const output = await mkdtemp(join(tmpdir(), "gr5-components-"));
    await writeFile(join(output, "package.json"), '{"type":"commonjs"}\n', "utf8");
    await symlink(join(frontendRoot, "node_modules"), join(output, "node_modules"), "dir");
    const tsc = join(frontendRoot, "node_modules", "typescript", "bin", "tsc");
    const harnessConfig = join(output, "tsconfig.harness.json");
    await writeFile(harnessConfig, JSON.stringify({
      compilerOptions: {
        outDir: ".",
        rootDir: frontendRoot,
        module: "CommonJS",
        moduleResolution: "Node",
        target: "ES2022",
        jsx: "react-jsx",
        strict: true,
        skipLibCheck: true,
        esModuleInterop: true,
        resolveJsonModule: true,
        baseUrl: frontendRoot,
        paths: { "@/*": ["*"] },
      },
      files: [
        join(frontendRoot, "components", "lead-details.tsx"),
        join(frontendRoot, "components", "results-table.tsx"),
      ],
    }), "utf8");
    const result = spawnSync(process.execPath, [
      tsc,
      "-p", harnessConfig,
    ], { cwd: frontendRoot, encoding: "utf8" });
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const require = createRequire(import.meta.url);
    const details = require(join(output, "components", "lead-details.js"));
    const table = require(join(output, "components", "results-table.js"));
    const traffic = require(join(output, "components", "traffic-enrichment.js"));
    return {
      LeadDetails: details.LeadDetails,
      ResultsTableView: table.ResultsTableView,
      TrafficEnrichmentDetails: traffic.TrafficEnrichmentDetails,
      coreWebVitalRating: traffic.coreWebVitalRating,
      coreWebVitalsAssessment: traffic.coreWebVitalsAssessment,
      formattedCalendarDate: traffic.formattedCalendarDate,
    } as Components;
  })();
  return compiled;
}

const leadDetailsSrc = await readFile(new URL("../components/lead-details.tsx", import.meta.url), "utf8");
const globalsCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W9-001 lead overview uses SectionIntro with the lead heading and copy", async () => {
  assert.match(leadDetailsSrc, /import \{ SectionIntro \} from "\.\/section-intro";/u);
  const { LeadDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: denseLead() }));
  assert.match(html, /01 · The store/u);
  assert.match(html, /Know the business behind this domain\./u);
  assert.match(html, /Score, identity, and the outreach paths that were actually recorded\./u);
  recordExecuted("CASE-UA-W9-001");
});

test("CASE-UA-W9-002 lead detail section heading type floor", () => {
  const block = globalsCss.match(/\.lead-details \.detail-section > h3 \{[\s\S]*?\}/u)?.[0] ?? "";
  assert.ok(block.includes("font-size: 1.375rem;"));
  assert.ok(!block.includes("font-size: 0.5rem;"));
  recordExecuted("CASE-UA-W9-002");
});

test("CASE-UA-W9-003 lead overview identity, contact, and score still render", async () => {
  const { LeadDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: denseLead() }));
  assert.match(html, /MyShopify domain/u);
  assert.match(html, /Resolved domain/u);
  assert.match(html, /hello@fixture\.example/u);
  assert.match(html, /\+12125550100/u);
  assert.match(html, /detail-score/u);
  recordExecuted("CASE-UA-W9-003");
});

test("CASE-UA-W9-004 identity and score grids cap at three columns", () => {
  assert.doesNotMatch(globalsCss, /\.lead-overview \.overview-identity \.fact-grid \{ grid-template-columns: repeat\(8/u);
  assert.ok(globalsCss.includes(".lead-overview .overview-identity .fact-grid,\n.lead-overview .overview-score .score-components { grid-template-columns: repeat(3, minmax(0, 1fr)); }"));
  recordExecuted("CASE-UA-W9-004");
});
