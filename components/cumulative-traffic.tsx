"use client";

import { useEffect, useState } from "react";

import { SearchIcon } from "./icons";
import { TrafficMarketExplorer } from "./traffic-globe";
import { QueryTrafficHeatmap } from "./query-traffic-heatmap";
import type { DataForSeoMarketTraffic, TrafficOverview } from "../lib/api-types";
import { parseTrafficOverview } from "../lib/api-validation";
import { apiRequest, errorMessage } from "../lib/client-api";

export function CumulativeTrafficSection({
  runId,
  endpoint,
  live = false,
  refreshVersion,
  search,
  committedSearch,
  onSearchChange,
  onLoadSettled,
  histogramLoadingSkeleton = false,
  discoveryQueries = [],
}: {
  runId: string;
  endpoint?: string;
  live?: boolean;
  refreshVersion: number;
  search: string;
  committedSearch: string;
  onSearchChange: (value: string) => void;
  onLoadSettled?: () => void;
  histogramLoadingSkeleton?: boolean;
  discoveryQueries?: string[];
}) {
  const [overview, setOverview] = useState<TrafficOverview | null>(null);
  const [queryOverview, setQueryOverview] = useState<TrafficOverview | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<DataForSeoMarketTraffic["country_code"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const parameters = new URLSearchParams();
  if (committedSearch) parameters.set("search", committedSearch);
  for (const value of discoveryQueries) parameters.append("discoveryQuery", value);
  const scopedQuery = parameters.toString();
  const requestKey = `${runId}:${scopedQuery}:${refreshVersion}`;
  const [settledRequestKey, setSettledRequestKey] = useState<string | null>(null);
  const queryRequestKey = `${runId}:${endpoint ?? "run"}:${refreshVersion}`;
  const [settledQueryRequestKey, setSettledQueryRequestKey] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;
    const controller = new AbortController();
    apiRequest<TrafficOverview>(
      `${endpoint ?? `/api/runs/${encodeURIComponent(runId)}/traffic-overview`}${scopedQuery ? `?${scopedQuery}` : ""}`,
      { signal: controller.signal },
      parseTrafficOverview,
    )
      .then((nextOverview) => {
        if (disposed) return;
        setOverview(nextOverview);
        setSelectedCountry((current) => current && nextOverview.markets.some((market) => market.country_code === current) ? current : null);
        setError(null);
        setSettledRequestKey(requestKey);
        onLoadSettled?.();
      })
      .catch((requestError: unknown) => {
        if (!disposed && (requestError as { name?: string }).name !== "AbortError") {
          setError(errorMessage(requestError));
          setSettledRequestKey(requestKey);
          onLoadSettled?.();
        }
      });
    return () => {
      disposed = true;
      controller.abort();
    };
  }, [endpoint, onLoadSettled, requestKey, runId, scopedQuery]);

  // Query demand is intentionally run-wide; it must not change with the lead-table search.
  useEffect(() => {
    let disposed = false;
    const controller = new AbortController();
    apiRequest<TrafficOverview>(
      endpoint ?? `/api/runs/${encodeURIComponent(runId)}/traffic-overview`,
      { signal: controller.signal },
      parseTrafficOverview,
    ).then((nextOverview) => {
      if (!disposed) {
        setQueryOverview(nextOverview);
        setSettledQueryRequestKey(queryRequestKey);
      }
    }).catch(() => {
      // The scoped globe still remains useful if the optional query map is unavailable.
      if (!disposed) setSettledQueryRequestKey(queryRequestKey);
    });
    return () => {
      disposed = true;
      controller.abort();
    };
  }, [endpoint, queryRequestKey, runId]);

  const loading = settledRequestKey !== requestKey;
  const hasTraffic = Boolean(overview?.worldwide || overview?.markets.length);
  const scoped = Boolean(overview?.scope.search || discoveryQueries.length);
  const scopeDescription = overview?.scope.search
    ? "this search"
    : discoveryQueries.length
      ? "the selected discovery queries"
      : "the current view";
  const queryLoading = queryOverview === null && settledQueryRequestKey !== queryRequestKey;

  return (
    <section
      className={`cumulative-traffic${loading && overview ? " is-refreshing" : ""}`}
      aria-labelledby="cumulative-traffic-title"
      aria-busy={loading}
    >
      <header>
        <div>
          <span className="eyebrow">Global traffic explorer</span>
          <p>
            {scoped
              ? `Traffic summed across ${live ? "live shops" : "stores"} matching ${scopeDescription}. Clear the filters to return to the complete ${live ? "collection" : "run"}.`
              : `Traffic summed once per shop across the complete ${live ? "live collection" : "run"}. Search here to focus the globe and lead list together.`}
          </p>
        </div>
        <div className="cumulative-traffic-actions">
          {overview && (
            <span className="cumulative-traffic-coverage">
              {overview.scope.leadsWithTraffic.toLocaleString()} of {overview.scope.matchedLeads.toLocaleString()} {scoped ? "matching " : ""}leads covered
            </span>
          )}
          <label className="search-field traffic-overview-search">
            <SearchIcon />
            <span className="sr-only">Search stores in the traffic landscape</span>
            <input
              type="search"
              value={search}
              maxLength={200}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search store, domain, email…"
              autoComplete="off"
            />
          </label>
        </div>
      </header>

      {error && <p className="cumulative-traffic-error" role="alert">{error}</p>}
      {overview ? (
        <div className="traffic-intelligence-card">
          {queryLoading ? (
            <div className="query-traffic-loader" role="status" aria-label="Loading query traffic heatmap">
              <span />
              <small>Loading query traffic…</small>
            </div>
          ) : (
            <QueryTrafficHeatmap
              queries={queryOverview?.queries ?? []}
              selectedCountry={selectedCountry}
              live={live}
            />
          )}
          {hasTraffic ? (
            <TrafficMarketExplorer worldwide={overview.worldwide} markets={overview.markets}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />
          ) : (
            <p className="empty-evidence">
              {overview.scope.matchedLeads === 0
                ? `No stores match ${scopeDescription}.`
                : "No search traffic estimates are available for these stores."}
            </p>
          )}
        </div>
      ) : !error ? (
        <div
          className={`cumulative-traffic-loading${histogramLoadingSkeleton ? " has-query-histogram" : ""}`}
          aria-label="Loading cumulative traffic"
          role="status"
        >
          {histogramLoadingSkeleton ? (
            <>
              <span className="traffic-loading-query" />
              <span className="traffic-loading-globe" />
              <span className="traffic-loading-metrics" />
            </>
          ) : (
            <><span /><span /></>
          )}
        </div>
      ) : null}
    </section>
  );
}
