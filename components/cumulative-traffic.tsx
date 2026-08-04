"use client";

import { useEffect, useState } from "react";

import { SearchIcon } from "./icons";
import { TrafficMarketExplorer } from "./traffic-globe";
import type { TrafficOverview } from "../lib/api-types";
import { parseTrafficOverview } from "../lib/api-validation";
import { apiRequest, errorMessage } from "../lib/client-api";

export function CumulativeTrafficSection({
  runId,
  refreshVersion,
  search,
  committedSearch,
  onSearchChange,
}: {
  runId: string;
  refreshVersion: number;
  search: string;
  committedSearch: string;
  onSearchChange: (value: string) => void;
}) {
  const [overview, setOverview] = useState<TrafficOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const requestKey = `${runId}:${committedSearch}:${refreshVersion}`;
  const [settledRequestKey, setSettledRequestKey] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;
    const controller = new AbortController();
    const parameters = new URLSearchParams();
    if (committedSearch) parameters.set("search", committedSearch);
    const query = parameters.toString();
    apiRequest<TrafficOverview>(
      `/api/runs/${encodeURIComponent(runId)}/traffic-overview${query ? `?${query}` : ""}`,
      { signal: controller.signal },
      parseTrafficOverview,
    )
      .then((nextOverview) => {
        if (disposed) return;
        setOverview(nextOverview);
        setError(null);
        setSettledRequestKey(requestKey);
      })
      .catch((requestError: unknown) => {
        if (!disposed && (requestError as { name?: string }).name !== "AbortError") {
          setError(errorMessage(requestError));
          setSettledRequestKey(requestKey);
        }
      });
    return () => {
      disposed = true;
      controller.abort();
    };
  }, [committedSearch, refreshVersion, requestKey, runId]);

  const loading = settledRequestKey !== requestKey;
  const hasTraffic = Boolean(overview?.worldwide || overview?.markets.length);
  const scoped = Boolean(overview?.scope.search);

  return (
    <section
      className={`cumulative-traffic${loading && overview ? " is-refreshing" : ""}`}
      aria-labelledby="cumulative-traffic-title"
      aria-busy={loading}
    >
      <header>
        <div>
          <span className="eyebrow">Global traffic explorer</span>
          <h3 id="cumulative-traffic-title">Cumulative traffic landscape</h3>
          <p>
            {scoped
              ? "Traffic summed across stores matching this search. Clear it to return to the complete run."
              : "Traffic summed across the complete run. Search here to focus the globe and lead list together."}
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
        hasTraffic ? (
          <TrafficMarketExplorer worldwide={overview.worldwide} markets={overview.markets} />
        ) : (
          <p className="empty-evidence">
            {overview.scope.matchedLeads === 0
              ? "No stores match this search."
              : "No search traffic estimates are available for these stores."}
          </p>
        )
      ) : !error ? (
        <div
          className="cumulative-traffic-loading"
          aria-label="Loading cumulative traffic"
          role="status"
        >
          <span />
          <span />
        </div>
      ) : null}
    </section>
  );
}
