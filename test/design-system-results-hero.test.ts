import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import type { DataForSeoTrafficMetrics } from "../lib/api-types.ts";
import { cumulativeTraffic } from "../lib/traffic-aggregation.ts";
import { lead, trafficEnrichment } from "./fixtures.ts";

function zeroMetrics(): DataForSeoTrafficMetrics {
  return {
    estimated_google_search_traffic: 0,
    organic_estimated_traffic: 0,
    organic_keyword_count: 0,
    paid_estimated_traffic: 0,
    paid_keyword_count: 0,
    featured_snippet_estimated_traffic: 0,
    featured_snippet_keyword_count: 0,
    local_pack_estimated_traffic: 0,
    local_pack_keyword_count: 0,
  };
}

test("G7 cumulative traffic preserves zero, missing, partial, and full coverage", () => {
  assert.deepEqual(cumulativeTraffic([]), {
    markets: [],
    leadsWithTraffic: 0,
    totalLeads: 0,
  });

  const missing = lead({ id: "missing", traffic_enrichment: undefined });
  const available = lead({ id: "available", traffic_enrichment: trafficEnrichment() });
  const partial = cumulativeTraffic([missing, available]);
  assert.equal(partial.totalLeads, 2);
  assert.equal(partial.leadsWithTraffic, 1);
  assert.equal(partial.worldwide?.estimated_google_search_traffic, 12);
  assert.deepEqual(partial.markets.map(({ country_code }) => country_code), ["IN"]);

  const zero = trafficEnrichment();
  if (!zero.dataforseo) throw new Error("fixture must include DataForSEO");
  zero.dataforseo.worldwide = zeroMetrics();
  zero.dataforseo.markets = [{ country_code: "US", ...zeroMetrics() }];
  const full = cumulativeTraffic([
    lead({ id: "zero", traffic_enrichment: zero }),
    available,
  ]);
  assert.equal(full.leadsWithTraffic, 2);
  assert.equal(full.totalLeads, 2);
  assert.equal(full.worldwide?.estimated_google_search_traffic, 12);
  assert.deepEqual(full.markets.map(({ country_code }) => country_code), ["US", "IN"]);
});

test("G7 overview sources remain independent of table filters and export behavior", () => {
  const workspace = fs.readFileSync(
    new URL("../components/run-workspace.tsx", import.meta.url),
    "utf8",
  );
  const traffic = fs.readFileSync(
    new URL("../components/cumulative-traffic.tsx", import.meta.url),
    "utf8",
  );
  const exporter = fs.readFileSync(
    new URL("../components/export-csv-button.tsx", import.meta.url),
    "utf8",
  );

  assert.match(workspace, /currentResults\.summary\.total/u);
  assert.match(workspace, /currentResults\.summary\.qualified/u);
  assert.match(workspace, /currentResults\.summary\.rejected/u);
  assert.match(workspace, /currentResults\.summary\.failed/u);
  assert.match(workspace, /aria-label="Run result totals"/u);
  assert.match(workspace, /runStateLabel\(run\.state\)/u);
  assert.match(traffic, /results\?page=\$\{page\}&pageSize=200/u);
  assert.doesNotMatch(traffic, /sortBy|sortDirection|status=|search=/u);
  assert.match(exporter, /collectAllLeads/u);
  assert.match(exporter, /downloadLeadsCsv\(leads, runId\)/u);
  assert.match(exporter, /className="export-error" role="alert"/u);
});

test("G7 traffic composition keeps country navigation in the locked aggregate location", () => {
  const globe = fs.readFileSync(
    new URL("../components/traffic-globe.tsx", import.meta.url),
    "utf8",
  );
  const css = fs.readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(globe, /showcase \? "landing-globe-copy" : "traffic-country-nav"/u);
  assert.match(globe, /onClick=\{showOverall\}/u);
  assert.match(globe, /aria-pressed=\{selected\}/u);
  assert.match(css, /\.traffic-country-nav\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?bottom:\s*0;[\s\S]*?left:\s*0;/u);
  assert.match(css, /\.cumulative-traffic \.traffic-market-explorer\s*\{[\s\S]*?grid-template-columns:/u);
  assert.doesNotMatch(css, /\.cumulative-traffic \.traffic-market-explorer\s*\{[^}]*min-height:/u);
});
