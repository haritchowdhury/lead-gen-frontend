"use client";

import { useEffect, useState } from "react";

import { TrafficMarketExplorer } from "./traffic-globe";
import type { ResultPage } from "../lib/api-types";
import { parseResultPage } from "../lib/api-validation";
import { apiRequest, errorMessage } from "../lib/client-api";
import { cumulativeTraffic, type CumulativeTraffic } from "../lib/traffic-aggregation";

export function CumulativeTrafficSection({
  runId,
  refreshVersion,
}: {
  runId: string;
  refreshVersion: number;
}) {
  const [aggregate, setAggregate] = useState<CumulativeTraffic | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadAllTraffic() {
      const leads = [];
      let page = 1;
      let totalPages = 1;
      do {
        const result = await apiRequest<ResultPage>(
          `/api/runs/${encodeURIComponent(runId)}/results?page=${page}&pageSize=200`,
          { signal: controller.signal },
          parseResultPage,
        );
        leads.push(...result.items);
        totalPages = result.pagination.totalPages;
        page += 1;
      } while (page <= totalPages);
      setAggregate(cumulativeTraffic(leads));
      setError(null);
    }
    void loadAllTraffic().catch((requestError: unknown) => {
      if ((requestError as { name?: string }).name !== "AbortError") {
        setError(errorMessage(requestError));
      }
    });
    return () => controller.abort();
  }, [refreshVersion, runId]);

  return (
    <section className="cumulative-traffic" aria-labelledby="cumulative-traffic-title">
      <header>
        <div>
          <span className="eyebrow">All-lead traffic</span>
          <h3 id="cumulative-traffic-title">Cumulative traffic landscape</h3>
          <p>Summed Google search estimates across the complete run, independent of table filters.</p>
        </div>
        {aggregate && (
          <span className="cumulative-traffic-coverage">
            {aggregate.leadsWithTraffic.toLocaleString()} of {aggregate.totalLeads.toLocaleString()} leads covered
          </span>
        )}
      </header>

      {error ? (
        <p className="cumulative-traffic-error" role="alert">{error}</p>
      ) : aggregate ? (
        aggregate.worldwide || aggregate.markets.length ? (
          <TrafficMarketExplorer worldwide={aggregate.worldwide} markets={aggregate.markets} />
        ) : (
          <p className="empty-evidence">No lead-level search traffic estimates are available yet.</p>
        )
      ) : (
        <div className="cumulative-traffic-loading" aria-label="Loading cumulative traffic"><span /><span /></div>
      )}
    </section>
  );
}
