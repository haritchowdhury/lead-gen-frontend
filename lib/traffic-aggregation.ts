import type {
  DataForSeoMarketTraffic,
  DataForSeoTrafficMetrics,
  Lead,
} from "./api-types";

const METRIC_KEYS = [
  "estimated_google_search_traffic",
  "organic_estimated_traffic",
  "organic_keyword_count",
  "paid_estimated_traffic",
  "paid_keyword_count",
  "featured_snippet_estimated_traffic",
  "featured_snippet_keyword_count",
  "local_pack_estimated_traffic",
  "local_pack_keyword_count",
] as const satisfies ReadonlyArray<keyof DataForSeoTrafficMetrics>;

function emptyMetrics(): DataForSeoTrafficMetrics {
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

function addMetrics(target: DataForSeoTrafficMetrics, source: DataForSeoTrafficMetrics): void {
  for (const key of METRIC_KEYS) target[key] += source[key];
}

export type CumulativeTraffic = {
  worldwide?: DataForSeoTrafficMetrics;
  markets: DataForSeoMarketTraffic[];
  leadsWithTraffic: number;
  totalLeads: number;
};

export function cumulativeTraffic(leads: Lead[]): CumulativeTraffic {
  let worldwide: DataForSeoTrafficMetrics | undefined;
  let leadsWithTraffic = 0;
  const markets = new Map<DataForSeoMarketTraffic["country_code"], DataForSeoMarketTraffic>();

  for (const lead of leads) {
    const traffic = lead.traffic_enrichment?.dataforseo;
    if (!traffic?.worldwide && !traffic?.markets?.length) continue;
    leadsWithTraffic += 1;
    if (traffic.worldwide) {
      worldwide ??= emptyMetrics();
      addMetrics(worldwide, traffic.worldwide);
    }
    for (const market of traffic.markets ?? []) {
      let aggregate = markets.get(market.country_code);
      if (!aggregate) {
        aggregate = { country_code: market.country_code, ...emptyMetrics() };
        markets.set(market.country_code, aggregate);
      }
      addMetrics(aggregate, market);
    }
  }

  return {
    ...(worldwide ? { worldwide } : {}),
    markets: [...markets.values()],
    leadsWithTraffic,
    totalLeads: leads.length,
  };
}
