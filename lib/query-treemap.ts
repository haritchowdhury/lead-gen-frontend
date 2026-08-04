import type { DataForSeoMarketTraffic, DataForSeoTrafficMetrics, TrafficQuerySummary } from "@/lib/api-types";

export const UNATTRIBUTED_QUERY = "__unattributed__";
export const MAX_VISIBLE_QUERIES = 30;

type CountryCode = DataForSeoMarketTraffic["country_code"];

export type QueryTreemapNode = {
  name: string;
  query: string | null;
  filterValue: string;
  value: number;
  shopsFound: number;
  leadsWithTraffic: number;
  hiddenQueries?: TrafficQuerySummary[];
};

export function trafficForQuery(query: TrafficQuerySummary, country: CountryCode | null): DataForSeoTrafficMetrics | undefined {
  return country ? query.markets.find((market) => market.country_code === country) : query.worldwide;
}

export function queryFilterValue(query: string | null): string {
  return query ?? UNATTRIBUTED_QUERY;
}

export function queryDisplayName(query: string | null): string {
  return query || "Unattributed discovery";
}

export function buildQueryTreemap(queries: TrafficQuerySummary[], country: CountryCode | null) {
  const sorted = queries.map((query) => ({
    source: query,
    value: trafficForQuery(query, country)?.estimated_google_search_traffic ?? 0,
  })).sort((left, right) => right.value - left.value || queryDisplayName(left.source.query).localeCompare(queryDisplayName(right.source.query)));
  const positive = sorted.filter((item) => item.value > 0);
  const zero = sorted.filter((item) => item.value === 0).map((item) => item.source);
  const visible = positive.slice(0, MAX_VISIBLE_QUERIES);
  const hidden = positive.slice(MAX_VISIBLE_QUERIES);
  const nodes: QueryTreemapNode[] = visible.map(({ source, value }) => ({
    name: queryDisplayName(source.query), query: source.query, filterValue: queryFilterValue(source.query), value,
    shopsFound: source.shopsFound, leadsWithTraffic: source.leadsWithTraffic,
  }));
  if (hidden.length) nodes.push({
    name: "Other queries", query: null, filterValue: "", value: hidden.reduce((sum, item) => sum + item.value, 0),
    shopsFound: hidden.reduce((sum, item) => sum + item.source.shopsFound, 0),
    leadsWithTraffic: hidden.reduce((sum, item) => sum + item.source.leadsWithTraffic, 0),
    hiddenQueries: hidden.map((item) => item.source),
  });
  return { nodes, zero, hidden: hidden.map((item) => item.source) };
}

export function selectedDiscoveryQueries(params: URLSearchParams): string[] {
  return [...new Set(params.getAll("discoveryQuery").filter((value) => value && value.length <= 500))].slice(0, 100);
}

export function setDiscoveryQueries(params: URLSearchParams, values: string[]): URLSearchParams {
  const next = new URLSearchParams(params);
  next.delete("discoveryQuery");
  for (const value of [...new Set(values)]) next.append("discoveryQuery", value);
  next.delete("page");
  return next;
}
