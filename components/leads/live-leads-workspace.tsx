"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CumulativeTrafficSection } from "@/components/cumulative-traffic";
import { ResultsTable } from "@/components/results-table";
import { SearchIcon } from "@/components/icons";
import { MasterExportButton } from "@/components/leads/master-export-button";
import type { MasterLeadPage } from "@/lib/api-types";
import { parseMasterLeadPage } from "@/lib/api-validation";
import { apiRequest, errorMessage } from "@/lib/client-api";

export function LiveLeadsWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = (searchParams.get("search") || "").slice(0, 200);
  const rawSort = searchParams.get("sortBy");
  const sortBy = rawSort === "first_discovered" || rawSort === "last_discovered" ? rawSort : "lead_quality";
  const sortDirection = searchParams.get("sortDirection") === "asc" ? "asc" : "desc";
  const discoveryQueries = useMemo(() => searchParams.getAll("discoveryQuery"), [searchParams]);
  const [draft, setDraft] = useState(search);
  const [lastSearch, setLastSearch] = useState(search);
  const [data, setData] = useState<MasterLeadPage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trafficSettled, setTrafficSettled] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleTrafficSettled = useCallback(() => setTrafficSettled(true), []);
  const query = useMemo(() => { const next = new URLSearchParams({ page: String(page), pageSize: "25", sortBy, sortDirection, ...(search ? { search } : {}) }); for (const value of discoveryQueries) next.append("discoveryQuery", value); return next.toString(); }, [page, search, sortBy, sortDirection, discoveryQueries]);
  if (search !== lastSearch) { setLastSearch(search); setDraft(search); }
  useEffect(() => {
    const controller = new AbortController();
    apiRequest<MasterLeadPage>(`/api/leads?${query}`, { signal: controller.signal }, parseMasterLeadPage)
      .then((next) => { setData(next); setError(null); })
      .catch((reason) => { if (reason?.name !== "AbortError") { setData(null); setError(errorMessage(reason)); } });
    return () => controller.abort();
  }, [query]);
  useEffect(() => () => { if (searchTimer.current) clearTimeout(searchTimer.current); }, []);
  function navigate(patch: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value); else next.delete(key);
    }
    router.replace(`/leads${next.size ? `?${next}` : ""}`, { scroll: false });
  }
  function scheduleSearch(value: string) {
    setDraft(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => navigate({ search: value.trim() || null, page: null }), 350);
  }
  return <>
    <CumulativeTrafficSection runId="master" endpoint="/api/leads/traffic-overview" live
      refreshVersion={0} search={draft} committedSearch={search}
      onSearchChange={scheduleSearch} onLoadSettled={handleTrafficSettled}
      discoveryQueries={discoveryQueries} />
    {trafficSettled && <section className="results-section">
      <header className="results-heading">
        <div><span className="eyebrow">Current master data</span><h2>Unique shops</h2><p>One live record per shop, with every discovering run retained.</p></div>
        <MasterExportButton search={search} discoveryQueries={discoveryQueries} />
      </header>
      <div className="results-panel">
        <div className="results-controls">
          <label className="search-field"><SearchIcon /><span className="sr-only">Search live leads</span>
            <input type="search" value={draft} maxLength={200} placeholder="Search store or domain…" onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") navigate({ search: draft.trim() || null, page: null }); }} />
          </label>
          <label className="select-field"><span className="sr-only">Sort live leads</span><select value={`${sortBy}:${sortDirection}`} onChange={(event) => { const [field, direction] = event.target.value.split(":"); navigate({ sortBy: field, sortDirection: direction, page: null }); }}>
            <option value="lead_quality:desc">Lead quality · High to low</option><option value="lead_quality:asc">Lead quality · Low to high</option><option value="last_discovered:desc">Recently discovered</option><option value="first_discovered:asc">First discovered</option>
          </select></label>
        </div>
        {data && discoveryQueries.length > 0 && <p className="query-match-summary">{data.pagination.totalItems.toLocaleString()} unique {data.pagination.totalItems === 1 ? "shop" : "shops"} matching any of {discoveryQueries.length} {discoveryQueries.length === 1 ? "query" : "queries"}.</p>}
        {error && <p className="results-error" role="alert">{error}</p>}
        {!error && <ResultsTable leads={data?.items ?? []} loading={!data} />}
        {data && data.pagination.totalPages > 1 && <div className="pagination"><span>Page {data.pagination.page} of {data.pagination.totalPages}</span><button disabled={page <= 1} onClick={() => navigate({ page: String(page - 1) })}>Previous</button><button disabled={page >= data.pagination.totalPages} onClick={() => navigate({ page: String(page + 1) })}>Next</button></div>}
      </div>
    </section>}
  </>;
}
