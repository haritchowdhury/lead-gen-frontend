import assert from "node:assert/strict";
import { mkdtemp, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { lead, trafficEnrichment } from "./fixtures.ts";

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
    const result = spawnSync(process.execPath, [
      tsc,
      "--outDir", output,
      "--rootDir", frontendRoot,
      "--module", "CommonJS",
      "--moduleResolution", "Node",
      "--target", "ES2022",
      "--jsx", "react-jsx",
      "--strict",
      "--skipLibCheck",
      "--esModuleInterop",
      "components/lead-details.tsx",
      "components/results-table.tsx",
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
    } as Components;
  })();
  return compiled;
}

test("actual expanded details render every full-evidence family and every contact channel", async () => {
  const { LeadDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: lead() }));
  for (const expected of [
    "Eyewear Brand",
    "Normalized category",
    "Matched terms",
    "Page-level store-fit evidence",
    "Usable text length:",
    "Email: hello@fixture.example",
    "Phone: +12125550100",
    "Contact page:",
    "Social profile:",
    "Validation reason",
    "Query-generation reason",
    "Requested search-result URL",
    "Observed final URL",
    "Display hostname",
    "fixture.example",
    "Canonical trust",
    "Evidence rank v2",
  ]) {
    assert.match(html, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"), "u"));
  }
});

test("missing and unsafe optional URLs never create blank or unsafe links", async () => {
  const { LeadDetails } = await compiledComponents();
  const fixture = lead({
    email: null,
    email_source_url: null,
    phone: null,
    phone_source_url: null,
    contact_url: "javascript:alert(1)",
    social_profiles: ["javascript:alert(2)"],
    final_url: null,
    canonical_url: null,
    contact_evidence: null,
    identity_evidence: null,
  });
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: fixture }));
  assert.doesNotMatch(html, /javascript:/u);
  assert.doesNotMatch(html, /href=""/u);
  assert.match(html, /No validated outreach or social channel was recorded/u);
});

test("actual table view cannot retain expanded evidence for a replaced result set", async () => {
  const { ResultsTableView } = await compiledComponents();
  const first = lead({ id: "lead_first", store_name: "First Evidence" });
  const second = lead({ id: "lead_second", store_name: "Second Evidence" });
  const expanded = renderToStaticMarkup(createElement(ResultsTableView, {
    leads: [first], loading: false, expandedLeadId: first.id, onExpandedLeadId: () => {},
  }));
  assert.match(expanded, /lead-detail-lead_first/u);
  assert.match(expanded, /First Evidence/u);

  const replaced = renderToStaticMarkup(createElement(ResultsTableView, {
    leads: [second], loading: false, expandedLeadId: first.id, onExpandedLeadId: () => {},
  }));
  assert.doesNotMatch(replaced, /lead-detail-lead_first/u);
  assert.doesNotMatch(replaced, /First Evidence/u);
  assert.match(replaced, /Second Evidence/u);
});

test("traffic details render every available metric, truthful labels, and attribution", async () => {
  const { TrafficEnrichmentDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(TrafficEnrichmentDetails, {
    enrichment: trafficEnrichment(),
  }));
  for (const expected of [
    "Estimated Google search traffic",
    "not total website visits",
    "Worldwide",
    "Organic ranking footprint",
    "Featured-snippet keyword count",
    "India (IN)",
    "Chrome UX Report",
    "CrUX does not provide visit totals",
    "Core Web Vitals: Pass",
    "Largest Contentful Paint, 75th percentile",
    "Time to First Byte, 75th percentile",
    "Top 100,000",
    "Observed monthly device fractions",
    "CC BY 4.0",
    "do not imply provider endorsement",
  ]) {
    assert.match(html, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"), "u"));
  }
  assert.match(html, /target="_blank" rel="noreferrer"/u);
});

test("traffic render matrix preserves historical, single-source, both, and state-only leads", async () => {
  const { LeadDetails, ResultsTableView } = await compiledComponents();
  const both = trafficEnrichment();
  const dataOnly = structuredClone(both);
  delete dataOnly.crux;
  dataOnly.traffic_sources = ["dataforseo"];
  dataOnly.traffic_attributions = dataOnly.traffic_attributions?.slice(0, 1);
  const cruxOnly = structuredClone(both);
  delete cruxOnly.dataforseo;
  cruxOnly.traffic_sources = ["crux"];
  cruxOnly.traffic_attributions = cruxOnly.traffic_attributions?.slice(1);
  const noCoverage = {
    version: "traffic-enrichment-public-v1",
    dataforseo: { state: "no_coverage" },
  } as const;

  const historical = renderToStaticMarkup(createElement(LeadDetails, { lead: lead() }));
  assert.doesNotMatch(historical, /Traffic and site experience/u);

  const dataHtml = renderToStaticMarkup(createElement(LeadDetails, {
    lead: lead({ traffic_enrichment: dataOnly }),
  }));
  assert.match(dataHtml, /Estimated Google search traffic/u);
  assert.doesNotMatch(dataHtml, /CrUX does not provide visit totals/u);

  const cruxHtml = renderToStaticMarkup(createElement(LeadDetails, {
    lead: lead({ traffic_enrichment: cruxOnly }),
  }));
  assert.match(cruxHtml, /CrUX does not provide visit totals/u);
  assert.doesNotMatch(cruxHtml, /DataForSEO metrics/u);

  const stateHtml = renderToStaticMarkup(createElement(LeadDetails, {
    lead: lead({ traffic_enrichment: noCoverage }),
  }));
  assert.match(stateHtml, /No DataForSEO coverage/u);
  assert.doesNotMatch(stateHtml, />0</u);

  const collapsed = renderToStaticMarkup(createElement(ResultsTableView, {
    leads: [lead({ traffic_enrichment: both })],
    loading: false,
    expandedLeadId: null,
    onExpandedLeadId: () => {},
  }));
  assert.match(collapsed, /Est\. Google search 12/u);

  const collapsedNoMaterial = renderToStaticMarkup(createElement(ResultsTableView, {
    leads: [lead({ traffic_enrichment: noCoverage })],
    loading: false,
    expandedLeadId: null,
    onExpandedLeadId: () => {},
  }));
  assert.doesNotMatch(collapsedNoMaterial, /traffic-compact/u);
});

test("Core Web Vitals assessments honor exact documented boundaries", async () => {
  const { coreWebVitalRating, coreWebVitalsAssessment } = await compiledComponents();
  assert.equal(coreWebVitalRating("lcp", 2500), "good");
  assert.equal(coreWebVitalRating("lcp", 2500.01), "needs_improvement");
  assert.equal(coreWebVitalRating("lcp", 4000.01), "poor");
  assert.equal(coreWebVitalRating("inp", 200), "good");
  assert.equal(coreWebVitalRating("inp", 500), "needs_improvement");
  assert.equal(coreWebVitalRating("cls", 0.1), "good");
  assert.equal(coreWebVitalRating("cls", 0.25), "needs_improvement");
  assert.equal(coreWebVitalsAssessment({
    largest_contentful_paint_p75_ms: 2500,
    interaction_to_next_paint_p75_ms: 200,
    cumulative_layout_shift_p75: "0.1",
  }), "good");
  assert.equal(coreWebVitalsAssessment({
    largest_contentful_paint_p75_ms: 2500,
    cumulative_layout_shift_p75: "0.1",
  }), "incomplete");
});
