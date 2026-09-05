"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ChevronIcon } from "@/components/icons";
import type { RunListResponse, RunStatus } from "@/lib/api-types";
import { parseRunListResponse } from "@/lib/api-validation";
import { apiRequest, errorMessage } from "@/lib/client-api";
import {
  parseKeywordResearchHistoryResponse,
  type KeywordResearchHistoryItem,
  type KeywordResearchHistoryResponse,
} from "@/lib/keyword-research-history";
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

function researchTitle(research: KeywordResearchHistoryItem): string {
  const visible = research.seeds.slice(0, 2).join(" · ");
  return research.seeds.length > 2 ? `${visible} +${research.seeds.length - 2} more` : visible;
}

function researchStateLabel(research: KeywordResearchHistoryItem): string {
  if (research.state === "queued") return "Queued";
  if (research.state === "running") return "Running";
  if (research.state === "failed") return "Failed";
  return research.selectionRevision > 0 ? "Selection saved" : "Ready to review";
}

function researchStateTone(research: KeywordResearchHistoryItem): string {
  if (research.state === "running") return "ds-badge--signal";
  if (research.state === "failed") return "ds-badge--danger";
  if (research.state === "completed") return "ds-badge--positive";
  return "";
}

function researchStageLabel(research: KeywordResearchHistoryItem): string {
  if (research.state === "queued") return "Waiting to start keyword research";
  if (research.state === "failed") return "Keyword research stopped before completion";
  if (research.state === "completed") {
    return research.selectionRevision > 0
      ? "Your saved shortlist is ready to continue"
      : "Keyword results are ready to review";
  }
  if (research.stage === "expansion") return "Expanding seed keywords";
  if (research.stage === "anchor_screen") return "Screening keyword opportunities";
  if (research.stage === "market_overview") return "Comparing market demand";
  return "Finalizing keyword results";
}

function Loading({ label }: { label: string }) {
  return (
    <div className="history-loading ds-card" role="status" aria-live="polite">
      <span>{label}</span>
      <div className="history-loading-row" aria-hidden="true"><i /><i /><i /></div>
      <div className="history-loading-row" aria-hidden="true"><i /><i /><i /></div>
    </div>
  );
}

function Pagination({
  page,
  totalItems,
  totalPages,
  noun,
  onChange,
}: {
  page: number;
  totalItems: number;
  totalPages: number;
  noun: string;
  onChange: (page: number) => void;
}) {
  return (
    <div className="history-pagination">
      <span>{totalItems} total {noun}</span>
      <div>
        <button className="ds-button ds-button--secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</button>
        <span>Page {page} of {Math.max(1, totalPages)}</span>
        <button className="ds-button ds-button--secondary" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export function RunHistory() {
  const [researchPage, setResearchPage] = useState(1);
  const [researchData, setResearchData] = useState<KeywordResearchHistoryResponse | null>(null);
  const [researchError, setResearchError] = useState<string | null>(null);
  const [runPage, setRunPage] = useState(1);
  const [runData, setRunData] = useState<RunListResponse | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState<"research" | "runs">("research");

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<KeywordResearchHistoryResponse>(
      `/api/keyword-research?page=${researchPage}&pageSize=${PAGE_SIZE}`,
      { signal: controller.signal },
      parseKeywordResearchHistoryResponse,
    )
      .then(setResearchData)
      .catch((requestError: unknown) => {
        if ((requestError as { name?: string }).name !== "AbortError") {
          setResearchError(errorMessage(requestError));
        }
      });
    return () => controller.abort();
  }, [researchPage]);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<RunListResponse>(`/api/runs?page=${runPage}&pageSize=${PAGE_SIZE}`, {
      signal: controller.signal,
    }, parseRunListResponse)
      .then(setRunData)
      .catch((requestError: unknown) => {
        if ((requestError as { name?: string }).name !== "AbortError") {
          setRunError(errorMessage(requestError));
        }
      });
    return () => controller.abort();
  }, [runPage]);

  function changeResearchPage(nextPage: number) {
    setResearchError(null);
    setResearchData(null);
    setResearchPage(nextPage);
  }

  function changeRunPage(nextPage: number) {
    setRunError(null);
    setRunData(null);
    setRunPage(nextPage);
  }

  if (researchData && runData && researchPage === 1 && runPage === 1 &&
      researchData.pagination.totalItems === 0 && runData.pagination.totalItems === 0) {
    return (
      <div className="empty-runs ds-card ds-empty">
        <h2>No searches yet</h2>
        <p>Your keyword research and discovery runs will appear here.</p>
        <Link className="ds-button ds-button--primary" href="/">Start a search</Link>
      </div>
    );
  }

  return (
    <div className="search-history-sections">
      <div className="history-drawer-rail" role="tablist" aria-label="Search workspace">
        <button
          type="button"
          className="history-drawer-toggle"
          role="tab"
          id="history-drawer-research"
          aria-expanded={openDrawer === "research"}
          aria-selected={openDrawer === "research"}
          aria-controls="keyword-research-history-panel"
          onClick={() => setOpenDrawer("research")}
        >
          <span>Keyword research</span>
          {researchData ? <small>{researchData.pagination.totalItems}</small> : null}
        </button>
        <button
          type="button"
          className="history-drawer-toggle"
          role="tab"
          id="history-drawer-runs"
          aria-expanded={openDrawer === "runs"}
          aria-selected={openDrawer === "runs"}
          aria-controls="discovery-runs-history-panel"
          onClick={() => setOpenDrawer("runs")}
        >
          <span>Discovery runs</span>
          {runData ? <small>{runData.pagination.totalItems}</small> : null}
        </button>
      </div>

      <section
        className="search-history-section"
        id="keyword-research-history-panel"
        role="tabpanel"
        aria-labelledby="keyword-research-history-heading"
        hidden={openDrawer !== "research"}
      >
        <div className="search-history-heading">
          <div><span className="eyebrow">Research workspace</span><h2 id="keyword-research-history-heading">Keyword research</h2></div>
        </div>
        {researchError ? (
          <div className="inline-error ds-notice ds-notice--danger" role="alert">{researchError}</div>
        ) : !researchData ? (
          <Loading label="Loading your keyword research…" />
        ) : researchData.items.length === 0 && researchPage === 1 ? (
          <div className="research-history-empty ds-card">No keyword research is waiting for review.</div>
        ) : (
          <>
            <div className="research-history-list ds-card" aria-label="Keyword research">
              {researchData.items.map((research) => (
                <Link
                  className={`research-history-row is-${research.state}`}
                  href={`/keywords/${encodeURIComponent(research.researchId)}`}
                  key={research.researchId}
                  aria-label={`Open ${researchTitle(research)}, ${researchStateLabel(research)}, from ${formatDate(research.createdAt)}`}
                >
                  <div className="run-history-primary">
                    <strong className="run-history-title">{researchTitle(research)}</strong>
                    <span className="run-history-activity">{researchStageLabel(research)}</span>
                    <span className="run-history-time">Created {formatDate(research.createdAt)}</span>
                  </div>
                  <div className="run-history-status research-history-status">
                    <span className={`run-state ds-badge ${researchStateTone(research)}`}>{researchStateLabel(research)}</span>
                    <span className="run-history-open">Continue research <ChevronIcon /></span>
                  </div>
                </Link>
              ))}
            </div>
            <Pagination
              page={researchData.pagination.page}
              totalItems={researchData.pagination.totalItems}
              totalPages={researchData.pagination.totalPages}
              noun="research projects"
              onChange={changeResearchPage}
            />
          </>
        )}
      </section>

      <section
        className="search-history-section"
        id="discovery-runs-history-panel"
        role="tabpanel"
        aria-labelledby="discovery-runs-history-heading"
        hidden={openDrawer !== "runs"}
      >
        <div className="search-history-heading">
          <div><span className="eyebrow">Lead discovery</span><h2 id="discovery-runs-history-heading">Discovery runs</h2></div>
        </div>
        {runError ? (
          <div className="inline-error ds-notice ds-notice--danger" role="alert">{runError}</div>
        ) : !runData ? (
          <Loading label="Loading your discovery runs…" />
        ) : runData.items.length === 0 && runPage === 1 ? (
          <div className="research-history-empty ds-card">No discovery runs yet.</div>
        ) : (
          <>
            <div className="run-history-list ds-card" aria-label="Discovery runs">
              {runData.items.map((run) => (
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
            <Pagination
              page={runData.pagination.page}
              totalItems={runData.pagination.totalItems}
              totalPages={runData.pagination.totalPages}
              noun="runs"
              onChange={changeRunPage}
            />
          </>
        )}
      </section>
    </div>
  );
}
