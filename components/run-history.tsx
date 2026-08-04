"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ChevronIcon } from "@/components/icons";
import type { RunListResponse, RunStatus } from "@/lib/api-types";
import { parseRunListResponse } from "@/lib/api-validation";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { trafficProgressState } from "@/lib/run-presentation";
import { stageLabel, stagePercent } from "@/lib/stages";

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
  if (run.state === "completed") return "Completed";
  if (run.state === "failed") return "Failed";
  return "Cancelled";
}

function stateTone(run: RunStatus): string {
  if (run.state === "completed") return "ds-badge--positive";
  if (run.state === "failed" || run.state === "cancelled") return "ds-badge--danger";
  if (run.state === "awaiting_query_confirmation") return "ds-badge--warning";
  if (run.state === "running") return "ds-badge--signal";
  return "";
}

function categoryTitle(run: RunStatus): string {
  const names = [...new Set(run.categories
    .map((category) => category.originalShopType?.trim() || category.shopType.trim())
    .filter(Boolean))];
  if (!names.length) {
    const count = run.progress.shopTypesTotal;
    return count > 1 ? `${count} store categories` : "Store discovery";
  }
  const visible = names.slice(0, 2).join(" · ");
  return names.length > 2 ? `${visible} +${names.length - 2} more` : visible;
}

function formatDuration(run: RunStatus): string | null {
  if (!run.startedAt || !run.completedAt) return null;
  const elapsed = Date.parse(run.completedAt) - Date.parse(run.startedAt);
  if (!Number.isFinite(elapsed) || elapsed < 0) return null;
  const totalMinutes = Math.max(1, Math.round(elapsed / 60_000));
  if (totalMinutes < 60) return `${totalMinutes}m`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

function timingLabel(run: RunStatus): string {
  if (run.completedAt) {
    const duration = formatDuration(run);
    return `Completed ${formatDate(run.completedAt)}${duration ? ` · ${duration}` : ""}`;
  }
  if (run.startedAt) return `Started ${formatDate(run.startedAt)}`;
  return `Created ${formatDate(run.createdAt)}`;
}

function activityLabel(run: RunStatus): string {
  if (run.error?.message) return run.error.message;
  if (run.state === "awaiting_query_confirmation") {
    const count = run.progress.queriesSelected;
    return count
      ? `${count} search ${count === 1 ? "query is" : "queries are"} ready for approval`
      : "Your search plan is ready for approval";
  }
  if (run.state === "completed") return "Lead discovery finished";
  if (run.state === "failed") return "This discovery run stopped before completion";
  if (run.state === "cancelled") return "This discovery run was cancelled";
  return stageLabel(run.stage);
}

function Outcome({ label, value }: { label: string; value: number }) {
  return <span className="run-outcome"><strong>{value}</strong><small>{label}</small></span>;
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
    return <div className="inline-error ds-notice ds-notice--danger" role="alert">{error}</div>;
  }
  if (!data) {
    return (
      <div className="history-loading ds-card" role="status" aria-live="polite">
        <span>Loading your runs…</span>
        <div className="history-loading-row" aria-hidden="true"><i /><i /><i /></div>
        <div className="history-loading-row" aria-hidden="true"><i /><i /><i /></div>
        <div className="history-loading-row" aria-hidden="true"><i /><i /><i /></div>
      </div>
    );
  }
  if (!data.items.length && page === 1) {
    return (
      <div className="empty-runs ds-card ds-empty">
        <h2>No runs yet</h2>
        <p>Your completed and active discovery runs will appear here.</p>
        <Link className="ds-button ds-button--primary" href="/">Start a search</Link>
      </div>
    );
  }

  return (
    <>
      <div className="run-history-list ds-card" aria-label="Discovery runs">
        {data.items.map((run) => (
          <Link
            className={`run-history-row is-${run.state}`}
            href={`/runs/${encodeURIComponent(run.runId)}`}
            key={run.runId}
            aria-label={`Open ${categoryTitle(run)}, ${stateLabel(run)}, from ${formatDate(run.createdAt)}`}
          >
            <div className="run-history-primary">
              <strong className="run-history-title">{categoryTitle(run)}</strong>
              <span className="run-history-activity">{activityLabel(run)}</span>
              <span className="run-history-time">{timingLabel(run)}</span>
            </div>
            <div className="run-history-outcomes" aria-label="Run outcome totals">
              <Outcome label="Stores found" value={run.progress.storesDiscovered} />
              <Outcome label="Qualified" value={run.progress.storesQualified} />
              <Outcome label="Rejected" value={run.progress.storesRejected} />
              <Outcome label="Failed" value={run.progress.storeProcessingFailures} />
            </div>
            <div className="run-history-status">
              <span className={`run-state ds-badge ${stateTone(run)}`}>{stateLabel(run)}</span>
              <span className={`run-traffic-state is-${trafficProgressState(run).tone}`}>
                <i /> Traffic {trafficProgressState(run).label.toLowerCase()}
              </span>
              {(run.state === "queued" || run.state === "running") && (
                <span className="run-history-progress" aria-label={`${stagePercent(run.stage, run.state)} percent complete`}>
                  <i style={{ width: `${stagePercent(run.stage, run.state)}%` }} />
                </span>
              )}
              <span className="run-history-open">Open run <ChevronIcon /></span>
            </div>
          </Link>
        ))}
      </div>
      <div className="history-pagination">
        <span>{data.pagination.totalItems} total runs</span>
        <div>
          <button className="ds-button ds-button--secondary" disabled={page <= 1} onClick={() => changePage(page - 1)}>Previous</button>
          <span>Page {data.pagination.page} of {Math.max(1, data.pagination.totalPages)}</span>
          <button className="ds-button ds-button--secondary" disabled={page >= data.pagination.totalPages} onClick={() => changePage(page + 1)}>Next</button>
        </div>
      </div>
    </>
  );
}
