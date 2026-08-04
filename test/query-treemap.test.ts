import assert from "node:assert/strict";
import test from "node:test";
import type { TrafficQuerySummary } from "../lib/api-types.ts";
import { buildQueryTreemap, selectedDiscoveryQueries, setDiscoveryQueries } from "../lib/query-treemap.ts";

function query(name: string, traffic: number): TrafficQuerySummary {
  return { query: name, shopsFound: 1, leadsWithTraffic: traffic ? 1 : 0, worldwide: { estimated_google_search_traffic: traffic, organic_estimated_traffic: 0, organic_keyword_count: 0, paid_estimated_traffic: 0, paid_keyword_count: 0, featured_snippet_estimated_traffic: 0, featured_snippet_keyword_count: 0, local_pack_estimated_traffic: 0, local_pack_keyword_count: 0 }, markets: [] };
}

test("treemap preserves traffic values, sorts them, and separates zero traffic", () => {
  const result = buildQueryTreemap([query("small", 10), query("zero", 0), query("large", 100)], null);
  assert.deepEqual(result.nodes.map((node) => [node.name, node.value]), [["large", 100], ["small", 10]]);
  assert.equal(result.zero[0]?.query, "zero");
});

test("more than 30 positive queries creates a truthful Other aggregate", () => {
  const result = buildQueryTreemap(Array.from({ length: 32 }, (_, index) => query(`query-${index}`, index + 1)), null);
  assert.equal(result.nodes.length, 31);
  assert.equal(result.nodes.at(-1)?.hiddenQueries?.length, 2);
  assert.equal(result.nodes.at(-1)?.value, 3);
});

test("repeated query URL state is deduplicated and preserves unrelated filters", () => {
  const initial = new URLSearchParams("search=shoe&page=4&discoveryQuery=old");
  const next = setDiscoveryQueries(initial, ["first", "second", "first"]);
  assert.equal(next.get("search"), "shoe");
  assert.equal(next.has("page"), false);
  assert.deepEqual(selectedDiscoveryQueries(next), ["first", "second"]);
});
