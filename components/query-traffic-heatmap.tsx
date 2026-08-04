"use client";

import type { DataForSeoMarketTraffic, DataForSeoTrafficMetrics, TrafficQuerySummary } from "@/lib/api-types";
import type { CSSProperties } from "react";

type CountryCode = DataForSeoMarketTraffic["country_code"];

const COUNTRY_NAMES: Record<CountryCode, string> = {
  US: "United States", GB: "United Kingdom", CA: "Canada", AU: "Australia",
  NZ: "New Zealand", DE: "Germany", FR: "France", IN: "India", AE: "United Arab Emirates",
};

const numberFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });

function queryLabel(query: string | null): { prefix: string; phrase: string } {
  if (!query) return { prefix: "", phrase: "Unattributed discovery" };
  const match = query.match(/^(site:[^\s]+)\s+(.+)$/iu);
  return match ? { prefix: match[1], phrase: match[2] } : { prefix: "", phrase: query };
}

function trafficForQuery(query: TrafficQuerySummary, country: CountryCode | null): DataForSeoTrafficMetrics | undefined {
  if (!country) return query.worldwide;
  return query.markets.find((market) => market.country_code === country);
}

export function QueryTrafficHeatmap({
  queries,
  selectedCountry,
  onCountryChange,
}: {
  queries: TrafficQuerySummary[];
  selectedCountry: CountryCode | null;
  onCountryChange: (country: CountryCode | null) => void;
}) {
  const availableCountries = [...new Set(queries.flatMap((query) => query.markets.map((market) => market.country_code)))];
  const values = queries.map((query) => trafficForQuery(query, selectedCountry)?.estimated_google_search_traffic ?? 0);
  const maxTraffic = Math.max(...values, 0);
  const scopeLabel = selectedCountry ? COUNTRY_NAMES[selectedCountry] : "Worldwide";

  return (
    <section className="query-traffic-heatmap" aria-labelledby="query-traffic-title">
      <header className="query-traffic-heading">
        <div>
          <span className="eyebrow">Query traffic intelligence</span>
          <h3 id="query-traffic-title">Traffic by discovery query</h3>
          <p>Compare the search opportunities behind every query in this run.</p>
        </div>
        <div className="query-traffic-filters" aria-label="Filter query traffic by country">
          <button type="button" className={!selectedCountry ? "is-selected" : undefined} onClick={() => onCountryChange(null)}>Worldwide</button>
          {availableCountries.map((country) => (
            <button
              key={country}
              type="button"
              className={selectedCountry === country ? "is-selected" : undefined}
              onClick={() => onCountryChange(country)}
            >
              {COUNTRY_NAMES[country]} <span>({country})</span>
            </button>
          ))}
        </div>
      </header>
      {queries.length ? (
        <div className="query-traffic-grid">
          {queries.map((query, index) => {
            const metrics = trafficForQuery(query, selectedCountry);
            const traffic = metrics?.estimated_google_search_traffic ?? 0;
            const label = queryLabel(query.query);
            const ratio = maxTraffic ? traffic / maxTraffic : 0;
            return (
              <article
                className="query-traffic-cell"
                key={`${query.query ?? "unattributed"}-${index}`}
                style={{ "--query-ratio": ratio } as CSSProperties}
                title={query.query ?? "Unattributed discovery"}
              >
                <div className="query-traffic-cell-query">
                  {label.prefix && <span className="query-prefix">{label.prefix}</span>}
                  <strong>{label.phrase}</strong>
                </div>
                <div className="query-traffic-cell-stats">
                  <span><b>{numberFormatter.format(traffic)}</b> traffic</span>
                  <span><b>{query.shopsFound.toLocaleString()}</b> shops</span>
                  <span><b>{query.leadsWithTraffic.toLocaleString()}</b> covered</span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="empty-evidence">No generated queries are available for this run.</p>
      )}
      <p className="query-traffic-note">Showing {scopeLabel.toLowerCase()} traffic · darker cells indicate greater estimated search demand.</p>
    </section>
  );
}
