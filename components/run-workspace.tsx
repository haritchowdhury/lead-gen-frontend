"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ExportCsvButton } from "@/components/export-csv-button";
import { CopyIcon, PlusIcon, RefreshIcon } from "@/components/icons";
import { ResultsFilters } from "@/components/results-filters";
import { ResultsTable } from "@/components/results-table";
import { RunEvidence } from "@/components/run-evidence";
import { RunProgress } from "@/components/run-progress";
import type {
  LeadStatus,
  ResultFilters,
  ResultPage,
  RunStatus,
} from "@/lib/api-types";
import { parseResultPage, parseRunStatus } from "@/lib/api-validation";
import {
  ApiRequestError,
  apiRequest,
  errorMessage,
} from "@/lib/client-api";

const RETRY_DELAYS = [3_000, 5_000, 10_000, 15_000];
const SORT_FIELDS = new Set<ResultFilters["sortBy"]>([
  "lead_score",
  "store_name",
  "shop_type",
  "google_rank",
]);
const STATUSES = new Set<LeadStatus>(["qualified", "rejected", "failed"]);

function filtersFromParams(params: URLSearchParams): ResultFilters {
  const page = Number(params.get("page"));
  const status = params.get("status");
  const sortBy = params.get("sortBy");
  const sortDirection = params.get("sortDirection");
  return {
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
    pageSize: 25,
    status: status && STATUSES.has(status as LeadStatus) ? (status as LeadStatus) : "",
    search: (params.get("search") ?? "").slice(0, 200),
    sortBy:
      sortBy && SORT_FIELDS.has(sortBy as ResultFilters["sortBy"])
        ? (sortBy as ResultFilters["sortBy"])
        : "lead_score",
    sortDirection: sortDirection === "asc" ? "asc" : "desc",
  };
}

function resultsQuery(filters: ResultFilters): string {
  const params = new URLSearchParams({
    page: String(filters.page),
    pageSize: String(filters.pageSize),
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
  });
  if (filters.status) params.set("status", filters.status);
  if (filters.search) params.set("search", filters.search);
  return params.toString();
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function RunWorkspace({ runId }: { runId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [run, setRun] = useState<RunStatus | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [connectionWarning, setConnectionWarning] = useState<string | null>(null);
  const [results, setResults] = useState<ResultPage | null>(null);
  const [loadedQuery, setLoadedQuery] = useState<string | null>(null);
  const [resultsError, setResultsError] = useState<{
    query: string;
    message: string;
  } | null>(null);
  const [reloadVersion, setReloadVersion] = useState(0);
  const [copied, setCopied] = useState(false);
  const filters = useMemo(
    () => filtersFromParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );
  const query = useMemo(() => resultsQuery(filters), [filters]);

  useEffect(() => {
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let controller: AbortController | null = null;
    let failureCount = 0;

    async function poll() {
      controller = new AbortController();
      try {
        const nextRun = await apiRequest<RunStatus>(
          `/api/runs/${encodeURIComponent(runId)}`,
          { signal: controller.signal },
          parseRunStatus,
        );
        if (disposed) return;
        setRun(nextRun);
        setStatusError(null);
        setConnectionWarning(null);
        failureCount = 0;
        if (nextRun.state === "queued" || nextRun.state === "running") {
          timer = setTimeout(poll, 3_000);
        }
      } catch (pollError) {
        if (disposed || (pollError as { name?: string }).name === "AbortError") return;
        if (pollError instanceof ApiRequestError && pollError.status === 404) {
          setStatusError("This run could not be found.");
          return;
        }
        setConnectionWarning(
          "Connection interrupted. Your run is still safe; reconnecting automatically.",
        );
        const delay = RETRY_DELAYS[Math.min(failureCount, RETRY_DELAYS.length - 1)];
        failureCount += 1;
        timer = setTimeout(poll, delay);
      }
    }

    void poll();
    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
      controller?.abort();
    };
  }, [runId]);

  useEffect(() => {
    if (!run?.resultsAvailable) return;
    const controller = new AbortController();
    apiRequest<ResultPage>(
        `/api/runs/${encodeURIComponent(runId)}/results?${query}`,
        { signal: controller.signal },
        parseResultPage,
      )
      .then((nextResults) => {
        setResults(nextResults);
        setLoadedQuery(query);
        setResultsError(null);
      })
      .catch((requestError: unknown) => {
        if ((requestError as { name?: string }).name !== "AbortError") {
          setLoadedQuery(query);
          setResultsError({ query, message: errorMessage(requestError) });
        }
      });
    return () => controller.abort();
  }, [query, reloadVersion, run?.resultsAvailable, runId]);

  const changeFilters = useCallback(
    (patch: Partial<ResultFilters>) => {
      const next = { ...filters, ...patch };
      const params = new URLSearchParams();
      if (next.page > 1) params.set("page", String(next.page));
      if (next.status) params.set("status", next.status);
      if (next.search) params.set("search", next.search);
      if (next.sortBy !== "lead_score") params.set("sortBy", next.sortBy);
      if (next.sortDirection !== "desc")
        params.set("sortDirection", next.sortDirection);
      const suffix = params.toString();
      router.replace(`${pathname}${suffix ? `?${suffix}` : ""}`, {
        scroll: false,
      });
    },
    [filters, pathname, router],
  );

  async function copyRunId() {
    await navigator.clipboard.writeText(runId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1_500);
  }

  if (statusError) {
    return (
      <main className="run-page">
        <div className="shell">
          <div className="fatal-card">
            <span className="eyebrow">Run unavailable</span>
            <h1>{statusError}</h1>
            <p>
              Check the link or return home to create a new store discovery run.
            </p>
            <Link className="button button-primary" href="/">
              <PlusIcon /> Start a new run
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!run) {
    return (
      <main className="run-page">
        <div className="shell run-loading">
          <span />
          <span />
          <span />
        </div>
      </main>
    );
  }

  const terminalError =
    run.state === "failed" || run.state === "cancelled" ? run.error : null;
  const currentResults = loadedQuery === query ? results : null;

  return (
    <main className="run-page">
      <div className="shell">
        <div className="run-title-row">
          <div>
            <Link className="back-link" href="/">
              ← New discovery
            </Link>
            <h1>Lead discovery run</h1>
            <div className="run-meta">
              <span>Created {formatDate(run.createdAt)}</span>
              <span className="meta-divider" />
              <button type="button" onClick={copyRunId}>
                {copied ? "Copied" : runId}
                <CopyIcon />
              </button>
            </div>
          </div>
          <Link className="button button-secondary" href="/">
            <PlusIcon />
            New run
          </Link>
        </div>

        {connectionWarning && (
          <div className="warning-banner" role="status">
            <RefreshIcon />
            {connectionWarning}
          </div>
        )}

        {terminalError && (
          <div className="error-banner" role="alert">
            <strong>{terminalError.message}</strong>
            <span>Error code: {terminalError.code}</span>
          </div>
        )}

        <RunProgress run={run} />

        {run.resultsAvailable && (
          <section className="results-section">
            <div className="results-heading">
              <div>
                <span className="eyebrow">Lead workspace</span>
                <h2>Your store leads</h2>
                <p>
                  Review the evidence, focus on qualified prospects, or export
                  the complete dataset.
                </p>
              </div>
              <ExportCsvButton runId={runId} />
            </div>

            {resultsError?.query === query ? (
              <div className="inline-error" role="alert">
                <span>{resultsError.message}</span>
                <button
                  type="button"
                  onClick={() => setReloadVersion((value) => value + 1)}
                >
                  Try again
                </button>
              </div>
            ) : currentResults ? (
              <>
                <div className="summary-grid">
                  <SummaryCard
                    label="All leads"
                    value={currentResults.summary.total}
                    tone="neutral"
                  />
                  <SummaryCard
                    label="Qualified"
                    value={currentResults.summary.qualified}
                    tone="positive"
                  />
                  <SummaryCard
                    label="Rejected"
                    value={currentResults.summary.rejected}
                    tone="muted"
                  />
                  <SummaryCard
                    label="Failed"
                    value={currentResults.summary.failed}
                    tone="danger"
                  />
                </div>

                <div className="results-panel">
                  <ResultsFilters
                    filters={filters}
                    onChange={changeFilters}
                    counts={currentResults.summary}
                  />
                  <ResultsTable
                    key={`${runId}:${query}:${currentResults.items.map(({ id }) => id).join(",")}`}
                    leads={currentResults.items}
                    loading={loadedQuery !== query}
                  />
                  <Pagination
                    page={currentResults.pagination.page}
                    totalPages={currentResults.pagination.totalPages}
                    totalItems={currentResults.pagination.totalItems}
                    onPage={(page) => changeFilters({ page })}
                  />
                </div>
              </>
            ) : (
              <div className="results-loading-card">
                <RefreshIcon />
                Loading stored results…
              </div>
            )}
            <RunEvidence runId={runId} />
          </section>
        )}
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "neutral" | "positive" | "muted" | "danger";
}) {
  return (
    <article className={`summary-card summary-${tone}`}>
      <span>{label}</span>
      <strong>{value.toLocaleString()}</strong>
      <i />
    </article>
  );
}

function Pagination({
  page,
  totalPages,
  totalItems,
  onPage,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  onPage: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return (
      <div className="pagination single">
        {totalItems.toLocaleString()}{" "}
        {totalItems === 1 ? "lead" : "leads"} in this view
      </div>
    );
  }
  return (
    <div className="pagination">
      <span>
        Page {page} of {totalPages}
      </span>
      <div>
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
