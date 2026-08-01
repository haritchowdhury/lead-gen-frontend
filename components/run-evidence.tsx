"use client";

import { useEffect, useState } from "react";

import { ExternalLinkIcon, RefreshIcon } from "@/components/icons";
import type {
  DiagnosticPage,
  JsonValue,
  QueryAuditPage,
} from "@/lib/api-types";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { humanizeToken, safeExternalUrl } from "@/lib/lead-presentation";

const PAGE_SIZE = 10;

type CollectionState<T> = {
  page: number;
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: number;
};

function initialState<T>(): CollectionState<T> {
  return { page: 1, data: null, loading: true, error: null, reload: 0 };
}

export function RunEvidence({ runId }: { runId: string }) {
  const [audits, setAudits] = useState<CollectionState<QueryAuditPage>>(initialState);
  const [diagnostics, setDiagnostics] = useState<CollectionState<DiagnosticPage>>(initialState);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<QueryAuditPage>(
      `/api/runs/${encodeURIComponent(runId)}/query-audits?page=${audits.page}&pageSize=${PAGE_SIZE}`,
      { signal: controller.signal },
    ).then((data) => {
      setAudits((current) => ({ ...current, data, loading: false, error: null }));
    }).catch((error: unknown) => {
      if ((error as { name?: string }).name !== "AbortError") {
        setAudits((current) => ({ ...current, loading: false, error: errorMessage(error) }));
      }
    });
    return () => controller.abort();
  }, [audits.page, audits.reload, runId]);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<DiagnosticPage>(
      `/api/runs/${encodeURIComponent(runId)}/diagnostics?page=${diagnostics.page}&pageSize=${PAGE_SIZE}`,
      { signal: controller.signal },
    ).then((data) => {
      setDiagnostics((current) => ({ ...current, data, loading: false, error: null }));
    }).catch((error: unknown) => {
      if ((error as { name?: string }).name !== "AbortError") {
        setDiagnostics((current) => ({ ...current, loading: false, error: errorMessage(error) }));
      }
    });
    return () => controller.abort();
  }, [diagnostics.page, diagnostics.reload, runId]);

  return (
    <section className="run-evidence" aria-labelledby="run-evidence-heading">
      <div className="run-evidence-heading">
        <div>
          <span className="eyebrow">Operational evidence</span>
          <h2 id="run-evidence-heading">Query audits and diagnostics</h2>
          <p>Planning decisions and operational events are kept separate from store leads.</p>
        </div>
      </div>
      <div className="run-evidence-grid">
        <EvidencePanel
          title="Query audits"
          description="Why candidate queries were selected or rejected."
          state={audits}
          onPage={(page) => setAudits((current) => ({ ...current, page, loading: true, error: null }))}
          onRetry={() => setAudits((current) => ({ ...current, loading: true, error: null, reload: current.reload + 1 }))}
        >
          {audits.data?.items.map((audit) => (
            <article className="operational-record" key={audit.sequence}>
              <header><strong>{audit.query ?? "Query not recorded"}</strong><span>{humanizeToken(audit.status)}</span></header>
              <p>{[audit.shop_type, audit.business_qualifier && humanizeToken(audit.business_qualifier)].filter(Boolean).join(" · ") || "Category not recorded"}</p>
              {audit.rejection_reason && <p className="record-reason">{humanizeToken(audit.rejection_reason)}</p>}
              <JsonDetails value={audit.details} />
            </article>
          ))}
        </EvidencePanel>

        <EvidencePanel
          title="Run diagnostics"
          description="Provider, query, occurrence, and processing events."
          state={diagnostics}
          onPage={(page) => setDiagnostics((current) => ({ ...current, page, loading: true, error: null }))}
          onRetry={() => setDiagnostics((current) => ({ ...current, loading: true, error: null, reload: current.reload + 1 }))}
        >
          {diagnostics.data?.items.map((diagnostic) => {
            const resultUrl = safeExternalUrl(diagnostic.result_url);
            return (
              <article className="operational-record" key={diagnostic.sequence}>
                <header><strong>{humanizeToken(diagnostic.code)}</strong><span>{humanizeToken(diagnostic.scope)}</span></header>
                <p>{[diagnostic.shop_type, diagnostic.query].filter(Boolean).join(" · ") || "Run-level event"}</p>
                {resultUrl && <a href={resultUrl} target="_blank" rel="noreferrer">Related result <ExternalLinkIcon /></a>}
                <JsonDetails value={diagnostic.details} />
              </article>
            );
          })}
        </EvidencePanel>
      </div>
    </section>
  );
}

function EvidencePanel<T extends QueryAuditPage | DiagnosticPage>({
  title,
  description,
  state,
  onPage,
  onRetry,
  children,
}: {
  title: string;
  description: string;
  state: CollectionState<T>;
  onPage: (page: number) => void;
  onRetry: () => void;
  children: React.ReactNode;
}) {
  const totalItems = state.data?.pagination.totalItems ?? 0;
  const totalPages = state.data?.pagination.totalPages ?? 0;
  return (
    <div className={`evidence-panel ${state.loading ? "is-loading" : ""}`}>
      <header className="evidence-panel-heading">
        <div><h3>{title}</h3><p>{description}</p></div>
        <span>{totalItems.toLocaleString()}</span>
      </header>
      {state.error ? (
        <div className="inline-error" role="alert"><span>{state.error}</span><button type="button" onClick={onRetry}>Try again</button></div>
      ) : state.loading && !state.data ? (
        <div className="evidence-loading"><RefreshIcon /> Loading…</div>
      ) : totalItems === 0 ? (
        <p className="empty-evidence panel-empty">No records were stored for this run.</p>
      ) : (
        <div className="operational-list">{children}</div>
      )}
      {totalPages > 1 && (
        <div className="evidence-pagination">
          <button type="button" disabled={state.page <= 1 || state.loading} onClick={() => onPage(state.page - 1)}>Previous</button>
          <span>Page {state.page} of {totalPages}</span>
          <button type="button" disabled={state.page >= totalPages || state.loading} onClick={() => onPage(state.page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}

function JsonDetails({ value }: { value: JsonValue }) {
  if (value == null) return null;
  if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) return null;
  return (
    <details className="json-details">
      <summary>Technical details</summary>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </details>
  );
}
