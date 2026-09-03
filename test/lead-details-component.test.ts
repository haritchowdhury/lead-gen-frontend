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

import { denseLead, lead, trafficEnrichment } from "./fixtures.ts";
import { humanizeToken as humanizeForTest } from "../lib/lead-presentation.ts";

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

test("actual expanded details render every full-evidence family and every contact channel", async () => {
  const { LeadDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: lead() }));
  assert.ok(html.indexOf("Know the business behind this domain.") < html.indexOf("Category and store fit"));
  assert.ok(html.indexOf("Why this lead sits where it does.") < html.indexOf("The storefront StoreSignal resolved."));
  assert.ok(html.indexOf("The storefront StoreSignal resolved.") < html.indexOf("A real way in, if one was found."));
  assert.match(html, /outcome-badge/u);
  assert.match(html, /contact-evidence-disclosure/u);
  assert.match(html, /href="https:\/\/fixture\.example\/"[^>]*>Resolved storefront/u);
  assert.doesNotMatch(html, /href="https:\/\/fixture\.example\/products\/frames"[^>]*>Resolved storefront/u);
  assert.doesNotMatch(html, /<h3><span>05<\/span>Outcome evidence/u);
  for (const expected of [
    "Eyewear Brand",
    "Normalized category",
    "Matched terms",
    "Page-level store-fit evidence",
    "Usable text length",
    "hello@fixture.example",
    "+12125550100",
    "Contact page",
    "Social profile",
    "Validation reason",
    "Query-generation reason",
    "Requested search-result URL",
    "Resolved storefront",
    "MyShopify domain",
    "Resolved domain",
    "fixture.example",
    "Canonical verification",
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

test("G9 overview keeps resolved identity conditional and targets the resolved domain", async () => {
  const { LeadDetails } = await compiledComponents();
  const present = renderToStaticMarkup(createElement(LeadDetails, {
    lead: lead({
      resolved_domain: "resolved-store.example",
      final_url: "https://resolved-store.example/products/observed-product",
      canonical_url: "https://resolved-store.example/products/observed-product",
    }),
  }));
  assert.match(present, /<dt>Resolved domain<\/dt><dd>resolved-store\.example<\/dd>/u);
  assert.match(present, /href="https:\/\/resolved-store\.example\/" target="_blank" rel="noreferrer"/u);
  assert.doesNotMatch(present, /href="https:\/\/resolved-store\.example\/products\/observed-product"[^>]*>Resolved storefront/u);

  const absent = renderToStaticMarkup(createElement(LeadDetails, {
    lead: lead({ resolved_domain: null }),
  }));
  assert.doesNotMatch(absent, /Resolved domain/u);
  assert.doesNotMatch(absent, /Resolved storefront/u);
});

test("G9 contact and outcome disclosures retain native semantics and every evidence record", async () => {
  const { LeadDetails } = await compiledComponents();
  const fixture = denseLead();
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: fixture }));
  assert.match(html, /<details class="outcome-badge"><summary>/u);
  assert.match(html, /<details class="nested-evidence contact-evidence-disclosure"><summary>/u);
  assert.match(html, /Contact evidence details/u);
  assert.match(html, /10 records/u);
  assert.match(html, /Synthetic outcome evidence: long-content fixture with all disclosures\./u);
  for (const group of Object.values(fixture.contact_evidence ?? {})) {
    for (const item of group) {
      assert.match(html, new RegExp(item.value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"), "u"));
      assert.match(html, new RegExp(item.method.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&").replaceAll("_", " "), "iu"));
      assert.match(html, new RegExp(String(item.confidence), "u"));
      assert.match(html, new RegExp(item.sourceUrl.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"), "u"));
    }
  }
  assert.match(html, /Decision<\/dt><dd>Accepted/u);
  assert.match(html, /Route accepted<\/dt><dd>Yes/u);
  assert.match(html, /Positive signals/u);
  assert.match(html, /target="_blank" rel="noreferrer"/u);
});

test("G10 dense nested ledgers retain every category, store-fit, page, and discovery field in order", async () => {
  const { LeadDetails } = await compiledComponents();
  const base = denseLead();
  const duplicateToken = "duplicate-looking-token";
  const fixture = denseLead({
    store_fit_evidence: base.store_fit_evidence?.map((item, index) => index === 0 ? {
      ...item,
      intent: {
        ...item.intent!,
        categoryVocabulary: [duplicateToken, duplicateToken, ...(item.intent?.categoryVocabulary ?? [])],
      },
      breadthEvidence: [{
        sourceUrl: "https://breadth-source.example/pages/very-long-breadth-evidence",
        signal: "catalog_breadth",
        terms: ["first breadth term", "second breadth term"],
      }],
    } : item),
  });
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: fixture }));

  assert.match(html, /class="nested-evidence evidence-ledger store-fit-ledger"/u);
  assert.match(html, /Structured store-fit evidence \(3\)/u);
  assert.match(html, /Page-level store-fit evidence \(3\)/u);
  assert.match(html, /Accepted matched category intents \(1\)/u);
  assert.match(html, /Discovery occurrences \(4\)/u);
  assert.match(html, /class="subordinate-ledger breadth-ledger"/u);
  assert.match(html, /class="subordinate-ledger store-fit-page-ledger"/u);
  assert.equal((html.match(/Duplicate looking token/gu) ?? []).length, 2, "duplicate source tokens must remain duplicated");

  for (const item of fixture.store_fit_evidence ?? []) {
    for (const value of [
      item.intent?.originalShopType,
      item.intent?.shopType,
      item.reason && humanizeForTest(item.reason),
      ...(item.intent?.categoryVocabulary ?? []).map(humanizeForTest),
      ...(item.matchedTerms ?? []).map(humanizeForTest),
      ...(item.signalKinds ?? []).map(humanizeForTest),
      ...(item.sourceUrls ?? []),
    ].filter(Boolean)) assert.ok(html.includes(String(value)), `missing store-fit value: ${value}`);
    for (const page of item.evidence ?? []) {
      assert.ok(html.includes(page.sourceUrl));
      assert.ok(html.includes(page.textLength.toLocaleString()));
      for (const token of [...page.matchedTerms, ...page.claimTerms, ...page.signals, ...page.breadthTerms, ...page.negativeSignals]) {
        assert.ok(html.includes(humanizeForTest(token)), `missing page token: ${token}`);
      }
    }
  }
  for (const occurrence of fixture.discovery_occurrences ?? []) {
    for (const value of [occurrence.query, occurrence.queryGenerationReason, occurrence.myshopifyDomain, occurrence.resultUrl, occurrence.finalUrl, ...(occurrence.querySourceUrls ?? [])]) {
      assert.ok(!value || html.includes(String(value)), `missing discovery value: ${value}`);
    }
  }
  const occurrenceQueries = (fixture.discovery_occurrences ?? []).map(({ query }) => html.indexOf(query ?? ""));
  assert.deepEqual([...occurrenceQueries].sort((a, b) => a - b), occurrenceQueries, "discovery occurrence order changed");
  assert.match(html, /target="_blank" rel="noreferrer"/u);
});

test("G10 zero and unrecorded nested evidence remain explicit and do not invent disclosures", async () => {
  const { LeadDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(LeadDetails, {
    lead: lead({ store_fit_evidence: [], matched_categories: [], discovery_occurrences: [] }),
  }));
  assert.match(html, /No structured store-fit evidence was recorded/u);
  assert.match(html, /No accepted matched category intent was recorded/u);
  assert.match(html, /Legacy row or no structured discovery provenance recorded/u);
  assert.doesNotMatch(html, /Structured store-fit evidence \(0\)/u);
  assert.doesNotMatch(html, /Discovery occurrences \(0\)/u);
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
    "Interactive globe",
    "Drag to rotate",
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
  assert.match(html, /2 providers/u);
  assert.equal((html.match(/traffic-source-block/g) ?? []).length, 2);
  assert.equal((html.match(/traffic-scope-header/g) ?? []).length, 2);
  assert.match(html, /Origin: https:\/\/fixture\.example/u);
  assert.match(html, /Collection Jul 1/u);
  assert.match(html, /Jul 28, 2026/u);
  assert.match(html, /Target: fixture\.example/u);
  assert.match(html, /traffic-state-partial/u);
  assert.ok((html.match(/traffic-state-available/g) ?? []).length >= 3);
});

test("CrUX date-only collection dates render as the same calendar date across timezones", async () => {
  const { formattedCalendarDate } = await compiledComponents();
  const previousTimezone = process.env.TZ;
  try {
    process.env.TZ = "America/Los_Angeles";
    const west = formattedCalendarDate("2026-07-01");
    process.env.TZ = "Asia/Kolkata";
    const east = formattedCalendarDate("2026-07-01");
    assert.equal(west, east);
    assert.match(west, /2026/u);
    assert.match(west, /Jul/u);
    assert.match(west, /1/u);
  } finally {
    if (previousTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = previousTimezone;
  }
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
  assert.match(dataHtml, /1 provider/u);
  assert.doesNotMatch(dataHtml, /CrUX does not provide visit totals/u);

  const cruxHtml = renderToStaticMarkup(createElement(LeadDetails, {
    lead: lead({ traffic_enrichment: cruxOnly }),
  }));
  assert.match(cruxHtml, /CrUX does not provide visit totals/u);
  assert.match(cruxHtml, /1 provider/u);
  assert.doesNotMatch(cruxHtml, /DataForSEO metrics/u);

  const stateHtml = renderToStaticMarkup(createElement(LeadDetails, {
    lead: lead({ traffic_enrichment: noCoverage }),
  }));
  assert.match(stateHtml, /No DataForSEO coverage/u);
  assert.match(stateHtml, /1 provider/u);
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
