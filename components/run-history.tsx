"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { RunListResponse, RunStatus } from "@/lib/api-types";
import { parseRunListResponse } from "@/lib/api-validation";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { stageLabel } from "@/lib/stages";

const PAGE_SIZE = 20;

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function stateLabel(run: RunStatus): string {
  if (run.state === "queued") return "Queued";
  if (run.state === "running") return stageLabel(run.stage);
  if (run.state === "awaiting_query_confirmation") return "Review queries";
  return run.state[0].toUpperCase() + run.state.slice(1);
}

export function RunHistory() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<RunListResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<RunListResponse>(`/api/runs?page=${page}&pageSize=${PAGE_SIZE}`, {
      signal: controller.signal,
    }, parseRunListResponse)
      .then(setData)
      .catch((requestError: unknown) => {
        if ((requestError as { name?: string }).name !== "AbortError") {
          setError(errorMessage(requestError));
        }
      });
    return () => controller.abort();
  }, [page]);

  function changePage(nextPage: number) {
    setError(null);
    setData(null);
    setPage(nextPage);
  }

  if (error) {
    return <div className="inline-error" role="alert">{error}</div>;
  }
  if (!data) {
    return <div className="results-loading-card">Loading your runs…</div>;
  }
  if (!data.items.length && page === 1) {
    return (
      <div className="empty-runs">
        <h2>No runs yet</h2>
        <p>Your completed and active discovery runs will appear here.</p>
        <Link className="button button-primary" href="/">Start a search</Link>
      </div>
    );
  }

  return (
    <>
      <div className="run-history-list">
        {data.items.map((run) => (
          <Link className="run-history-row" href={`/runs/${encodeURIComponent(run.runId)}`} key={run.runId}>
            <div>
              <strong>Lead discovery run</strong>
              <span>{formatDate(run.createdAt)}</span>
            </div>
            <code>{run.runId}</code>
            <span className={`run-state run-state-${run.state}`}>{stateLabel(run)}</span>
          </Link>
        ))}
      </div>
      <div className="history-pagination">
        <span>{data.pagination.totalItems} total runs</span>
        <div>
          <button className="button button-secondary" disabled={page <= 1} onClick={() => changePage(page - 1)}>Previous</button>
          <span>Page {data.pagination.page} of {Math.max(1, data.pagination.totalPages)}</span>
          <button className="button button-secondary" disabled={page >= data.pagination.totalPages} onClick={() => changePage(page + 1)}>Next</button>
        </div>
      </div>
    </>
  );
}
