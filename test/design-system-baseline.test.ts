import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";

import { parseQuerySet, parseResultPage } from "../lib/api-validation.ts";
import { safeExternalUrl } from "../lib/lead-presentation.ts";
import { allTrackedMarkets, denseLead, lead, querySet, resultPage } from "./fixtures.ts";

const marketOrder = ["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"];

test("G1 dense fixture covers long, repeated, and all-market evidence", () => {
  const fixture = denseLead();
  const parsed = parseResultPage(resultPage([fixture]));
  const item = parsed.items[0];

  assert.ok((item.store_name ?? "").length > 200);
  assert.ok((item.final_url ?? "").length > 200);
  assert.equal(item.contact_evidence?.emails?.length, 6);
  assert.equal(item.store_fit_evidence?.length, 3);
  assert.equal(item.store_fit_evidence?.every((entry) => entry.evidence?.length === 3), true);
  assert.equal(item.discovery_occurrences?.length, 4);
  assert.ok((item.matched_categories?.[0].categoryVocabulary?.length ?? 0) >= 18);
  assert.deepEqual(item.traffic_enrichment?.dataforseo?.markets?.map(({ country_code }) => country_code), marketOrder);
  assert.equal(item.traffic_enrichment?.dataforseo?.worldwide?.estimated_google_search_traffic, 0);
});

test("G1 resolved domain, absent domain, zero traffic, and missing traffic stay distinct", () => {
  const resolved = denseLead();
  const absent = lead({ resolved_domain: null, traffic_enrichment: undefined });
  assert.equal(safeExternalUrl(`https://${resolved.resolved_domain}/`), "https://very-long-store-domain.example/");
  assert.equal(absent.resolved_domain, null);
  assert.equal(absent.traffic_enrichment, undefined);
  assert.equal(resolved.traffic_enrichment?.dataforseo?.worldwide?.estimated_google_search_traffic, 0);
});

test("G1 query review fixture is deterministic and parser-valid", () => {
  const first = querySet();
  const second = querySet();
  assert.deepEqual(first, second);
  assert.deepEqual(parseQuerySet(first), first);
  assert.equal(first.categories.length, 2);
  assert.equal(first.queries.length, 5);
});

test("G1 traffic explorer exposes tracked markets and no unsupported fallback control", () => {
  assert.deepEqual(allTrackedMarkets().map(({ country_code }) => country_code), marketOrder);
  const source = fs.readFileSync(new URL("../components/traffic-globe.tsx", import.meta.url), "utf8");
  assert.match(source, /markets\.map\(\(market\)/u);
  assert.match(source, /aria-pressed=\{selected\}/u);
  assert.match(source, /availableIds\.get/u);
  assert.ok(source.indexOf("if (!code) return null") < source.indexOf('role="button"'));
});
