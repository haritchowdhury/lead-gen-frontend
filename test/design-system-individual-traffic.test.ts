import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("G11 keeps individual traffic ordered between lead context and remaining evidence", () => {
  const details = read("components/lead-details.tsx");
  const overview = details.indexOf("<LeadOverview lead={lead} />");
  const traffic = details.indexOf("<TrafficEnrichmentDetails enrichment={lead.traffic_enrichment} />");
  const store = details.indexOf("<StoreEvidence lead={lead} />");
  const discovery = details.indexOf("<DiscoveryDetails lead={lead} />");
  assert.ok(overview < traffic && traffic < store && store < discovery);
});

test("G11 individual presentation is one divided responsive source ledger", () => {
  const traffic = read("components/traffic-enrichment.tsx");
  const css = read("app/globals.css");

  assert.match(traffic, /traffic-details-header/u);
  assert.match(traffic, /traffic-source-grid/u);
  assert.match(traffic, /traffic-source-dataforseo/u);
  assert.match(traffic, /traffic-source-crux/u);
  assert.match(traffic, /traffic-scope-header/u);
  assert.match(traffic, /traffic-observation/u);
  assert.match(css, /\.traffic-details \.traffic-source-grid\s*\{[\s\S]*?border-top:/u);
  assert.match(css, /\.traffic-details \.traffic-source-block\s*\{[\s\S]*?border:\s*0;[\s\S]*?background:\s*transparent;/u);
  assert.match(css, /G11 cascade guard/u);
});

test("G11 shared globe selection, reset, supported-market, and mode contracts remain intact", () => {
  const globe = read("components/traffic-globe.tsx");
  const aggregate = read("components/cumulative-traffic.tsx");

  assert.match(globe, /const COUNTRY_META:/u);
  assert.match(globe, /if \(!code\) return null/u);
  assert.match(globe, /aria-pressed=\{selected\}/u);
  assert.match(globe, /onClick=\{showOverall\}/u);
  assert.match(globe, /onClick=\{\(\) => handleCountryClick\(code\)\}/u);
  assert.match(globe, /showcase \? "landing-globe-copy" : "traffic-country-nav"/u);
  assert.match(globe, /TrafficGlobeShowcase/u);
  assert.match(aggregate, /<TrafficMarketExplorer worldwide=\{overview\.worldwide\} markets=\{overview\.markets\}/u);
});
