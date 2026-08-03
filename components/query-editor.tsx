"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { ArrowRightIcon, PlusIcon } from "@/components/icons";
import type { QuerySet, RunQuery, StartScrapeResponse } from "@/lib/api-types";
import { parseQuerySet, parseStartScrapeResponse } from "@/lib/api-validation";
import { ApiRequestError, apiRequest, errorMessage } from "@/lib/client-api";

type EditableRow = RunQuery & { clientKey: string; localError?: string };

function editableRows(querySet: QuerySet): EditableRow[] {
  return querySet.queries.map((row) => ({ ...row, clientKey: row.id }));
}

function signature(rows: EditableRow[]): string {
  return JSON.stringify(rows.map(({ id, categoryIndex, query }) => ({ id, categoryIndex, query })));
}

export function QueryEditor({
  runId,
  onStarted,
}: {
  runId: string;
  onStarted: (run: StartScrapeResponse) => void;
}) {
  const [querySet, setQuerySet] = useState<QuerySet | null>(null);
  const [rows, setRows] = useState<EditableRow[]>([]);
  const [savedSignature, setSavedSignature] = useState("");
  const [deleted, setDeleted] = useState<EditableRow | null>(null);
  const [busy, setBusy] = useState<"loading" | "saving" | "starting" | null>("loading");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (conflict = false) => {
    setBusy("loading");
    try {
      const next = await apiRequest<QuerySet>(
        `/api/runs/${encodeURIComponent(runId)}/queries`,
        {},
        parseQuerySet,
      );
      const nextRows = editableRows(next);
      setQuerySet(next);
      setRows(nextRows);
      setSavedSignature(signature(nextRows));
      setError(conflict
        ? "The query list changed in another tab. The latest saved revision is shown."
        : null);
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setBusy(null);
    }
  }, [runId]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const dirty = signature(rows) !== savedSignature;
  const grouped = useMemo(() => (querySet?.categories || []).map((category) => ({
    category,
    rows: rows.filter((row) => row.categoryIndex === category.categoryIndex),
  })), [querySet, rows]);
  const hasVisibleErrors = rows.some((row) => row.localError || row.validationState === "invalid");

  function updateRow(clientKey: string, patch: Partial<EditableRow>) {
    setRows((current) => current.map((row) => row.clientKey === clientKey
      ? {
          ...row,
          ...patch,
          source: row.source === "generated" ? "user_edited" : row.source,
          validationState: "pending",
          rejectionReason: null,
          localError: undefined,
        }
      : row));
    setError(null);
  }

  function addRow(categoryIndex: number) {
    const clientKey = `new_${crypto.randomUUID()}`;
    setRows((current) => [...current, {
      id: "",
      clientKey,
      categoryIndex,
      sequence: current.length,
      query: "site:myshopify.com/products ",
      source: "user_added",
      validationState: "pending",
      rejectionReason: null,
      queryScore: null,
      generationReason: null,
      probedAt: null,
    }]);
  }

  function deleteRow(row: EditableRow) {
    setRows((current) => current.filter(({ clientKey }) => clientKey !== row.clientKey));
    if (row.source === "generated") setDeleted(row);
  }

  function moveRow(row: EditableRow, direction: -1 | 1) {
    setRows((current) => {
      const categoryRows = current.filter(({ categoryIndex }) => categoryIndex === row.categoryIndex);
      const from = categoryRows.findIndex(({ clientKey }) => clientKey === row.clientKey);
      const target = from + direction;
      if (from < 0 || target < 0 || target >= categoryRows.length) return current;
      const nextCategoryRows = [...categoryRows];
      [nextCategoryRows[from], nextCategoryRows[target]] = [nextCategoryRows[target], nextCategoryRows[from]];
      let categoryOffset = 0;
      return current.map((item) => item.categoryIndex === row.categoryIndex
        ? nextCategoryRows[categoryOffset++]
        : item);
    });
  }

  function clientValidate(): boolean {
    const counts = new Map<number, number>();
    let valid = true;
    const checkedRows = rows.map((row) => {
      counts.set(row.categoryIndex, (counts.get(row.categoryIndex) || 0) + 1);
      const normalized = row.query.trim().replace(/\s+/gu, " ").toLowerCase();
      const localError = normalized.startsWith("site:myshopify.com/products ")
        ? undefined
        : "Use site:myshopify.com/products followed by a product phrase.";
      if (localError) valid = false;
      return { ...row, localError };
    });
    setRows(checkedRows);
    for (const category of querySet?.categories || []) {
      if (!counts.get(category.categoryIndex)) valid = false;
    }
    if (!valid) setError("Every category needs at least one correctly formatted query.");
    return valid;
  }

  async function save(): Promise<QuerySet | null> {
    if (!querySet || !clientValidate()) return null;
    setBusy("saving");
    setError(null);
    try {
      const saved = await apiRequest<QuerySet>(
        `/api/runs/${encodeURIComponent(runId)}/queries`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            revision: querySet.revision,
            queries: rows.map(({ id, categoryIndex, query }) => ({
              ...(id ? { id } : {}),
              categoryIndex,
              query,
            })),
          }),
        },
        parseQuerySet,
      );
      const nextRows = editableRows(saved);
      setQuerySet(saved);
      setRows(nextRows);
      setSavedSignature(signature(nextRows));
      return saved;
    } catch (requestError) {
      if (requestError instanceof ApiRequestError && requestError.code === "QUERY_REVISION_CONFLICT") {
        await load(true);
        return null;
      }
      if (requestError instanceof ApiRequestError && requestError.code === "QUERY_LIST_INVALID") {
        const details = requestError.details as { errors?: Array<{ index?: number; reason?: string }> } | undefined;
        setRows((current) => current.map((row, index) => ({
          ...row,
          localError: details?.errors?.find((item) => item.index === index)?.reason?.replaceAll("_", " "),
        })));
      }
      setError(errorMessage(requestError));
      return null;
    } finally {
      setBusy(null);
    }
  }

  async function start() {
    if (!querySet || dirty || hasVisibleErrors) return;
    setBusy("starting");
    setError(null);
    try {
      const response = await apiRequest<StartScrapeResponse>(
        `/api/runs/${encodeURIComponent(runId)}/start`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ revision: querySet.revision }),
        },
        parseStartScrapeResponse,
      );
      onStarted(response);
    } catch (requestError) {
      if (requestError instanceof ApiRequestError && requestError.code === "QUERY_REVISION_CONFLICT") {
        await load(true);
      } else {
        setError(errorMessage(requestError));
      }
    } finally {
      setBusy(null);
    }
  }

  if (!querySet) {
    return (
      <section className="run-form-card query-editor-card query-editor-loading">
        Loading saved queries…
      </section>
    );
  }

  return (
    <section id="query-review" className="run-form-card query-editor-card">
      <div className="form-heading-row query-editor-heading">
        <div>
          <span className="eyebrow">Query review · revision {querySet.revision}</span>
          <h2>Review your searches</h2>
        </div>
        <span className="step-badge">02</span>
      </div>

      {error && <div className="inline-error" role="alert">{error}</div>}

      {grouped.map(({ category, rows: categoryRows }) => (
        <div className="query-category" key={category.categoryIndex}>
          <div className="field-label query-category-heading">
            <h3>{category.originalShopType}</h3>
            <span>{categoryRows.length}/20 queries</span>
          </div>
          <div className="query-list-wrap">
            {categoryRows.map((row, index) => (
              <div className="query-row" key={row.clientKey}>
                <div className="query-row-main">
                  <input
                    aria-label={`Query ${index + 1} for ${category.originalShopType}`}
                    value={row.query}
                    maxLength={200}
                    onChange={(event) => updateRow(row.clientKey, { query: event.target.value })}
                    disabled={!querySet.editable || busy !== null}
                  />
                  <div className="query-meta">
                    <span className={`query-badge source-${row.source}`}>{row.source.replace("_", " ")}</span>
                    {row.queryScore !== null && <span>Score {row.queryScore}</span>}
                    {row.generationReason && <span>{row.generationReason}</span>}
                  </div>
                  {(row.localError || row.rejectionReason) && (
                    <p className="query-error">{(row.localError || row.rejectionReason || "").replaceAll("_", " ")}</p>
                  )}
                </div>
                <div className="query-actions">
                  <button type="button" aria-label="Move query up" onClick={() => moveRow(row, -1)} disabled={index === 0 || busy !== null}>↑</button>
                  <button type="button" aria-label="Move query down" onClick={() => moveRow(row, 1)} disabled={index === categoryRows.length - 1 || busy !== null}>↓</button>
                  <button type="button" aria-label="Delete query" onClick={() => deleteRow(row)} disabled={busy !== null}>Delete</button>
                </div>
              </div>
            ))}
            <button
              className="suggestion-chip query-add-button"
              type="button"
              onClick={() => addRow(category.categoryIndex)}
              disabled={categoryRows.length >= 20 || busy !== null}
            >
              <PlusIcon /> Add query
            </button>
          </div>
          <p className="field-help">
            Edit the product phrase while keeping the Shopify search prefix.
          </p>
        </div>
      ))}

      <div className="form-footer query-editor-footer">
        <div>
          {deleted && (
            <button type="button" onClick={() => { setRows((current) => [...current, deleted]); setDeleted(null); }}>
              Restore deleted generated query
            </button>
          )}
          {dirty && <span>Unsaved changes</span>}
        </div>
        <div>
          <button className="button button-secondary" type="button" onClick={() => void save()} disabled={!dirty || busy !== null}>
            {busy === "saving" ? "Saving…" : "Save changes"}
          </button>
          <button className="button button-primary" type="button" onClick={() => void start()} disabled={dirty || hasVisibleErrors || !rows.length || busy !== null}>
            {busy === "starting" ? "Finding your stores…" : "Find my stores"}
            {busy !== "starting" && <ArrowRightIcon />}
          </button>
        </div>
      </div>
    </section>
  );
}
