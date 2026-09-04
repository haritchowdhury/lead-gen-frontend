"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import type { DataForSeoMarketTraffic } from "@/lib/api-types";
import {
  ApiRequestError,
  errorMessage,
  getKeywordResearch,
  saveKeywordSelection,
  startKeywordResearchRun,
} from "@/lib/client-api";
import { newClientRequestId } from "@/lib/keyword-intelligence-validation";
import type {
  ClusterRow,
  KeywordMarket,
  KeywordRow,
  ResearchResult,
  ResearchView,
  SelectionItem,
} from "@/lib/keyword-intelligence-types";
import type { KeywordFilterState } from "@/lib/keyword-intelligence-view-model";
import {
  KEYWORD_THEME_STORAGE_KEY,
  activeRows,
  adjustedVolume,
  aggregateByCluster,
  buildExportQuery,
  canFinalizeSelection,
  cumulativeVolume,
  currentClusterMetric,
  dashboardPhase,
  distinctKeywordRows,
  emptyKeywordFilterState,
  filterOptionSources,
  fmtCpc,
  fmtNum,
  getFiltered,
  nextTheme,
  projectMarketRow,
  selectionDraftFromView,
  toggleSelectedItem,
} from "@/lib/keyword-intelligence-view-model";

import { ChartPanels } from "./chart-panels";
import { ClusterLandscape } from "./cluster-landscape";
import { FilterBar } from "./filter-bar";
import { KeywordTable } from "./keyword-table";
import { ResearchStatus } from "./research-status";
import { SelectionReview } from "./selection-review";
import { SummaryCards } from "./summary-cards";
import { SectionIntro } from "@/components/section-intro";
import { TrafficMarketExplorer } from "../traffic-globe";

import styles from "./keyword-dashboard.module.css";

type CountryCode = KeywordMarket["code"];

function keywordMarketTraffic(
  code: CountryCode,
  rows: KeywordRow[],
): DataForSeoMarketTraffic {
  const metrics = rows
    .map((row) => row.marketMetrics[code])
    .filter((metric) => metric !== null);
  const activeCount = rows.filter(
    (row) => row.mergedInto === null && row.marketMetrics[code] !== null,
  ).length;
  const volume = metrics.reduce((sum, metric) => sum + metric.searchVolume, 0);

  return {
    country_code: code,
    estimated_google_search_traffic: volume,
    organic_estimated_traffic: volume,
    organic_keyword_count: activeCount,
    paid_estimated_traffic: 0,
    paid_keyword_count: 0,
    featured_snippet_estimated_traffic: 0,
    featured_snippet_keyword_count: 0,
    local_pack_estimated_traffic: 0,
    local_pack_keyword_count: 0,
  };
}

function KeywordMarketGlobe({
  markets,
  rows,
  selectedMarket,
  onMarketChange,
}: {
  markets: KeywordMarket[];
  rows: KeywordRow[];
  selectedMarket: string;
  onMarketChange: (market: "all" | CountryCode) => void;
}) {
  const globeMarkets = markets.map((market) => keywordMarketTraffic(market.code, rows));
  const selectedCountry = selectedMarket === "all" ? null : selectedMarket as CountryCode;

  return (
    <section className={styles.marketGlobe} aria-label="Keyword demand by market">
      <div className={styles.marketGlobeHead}>
        <div>
          <span className={styles.sectionKicker}>Market lens</span>
          <p>Select a highlighted country to focus every keyword metric and chart.</p>
        </div>
        <button
          type="button"
          className={`${styles.btn} ${selectedMarket === "all" ? styles.isActive : ""}`}
          aria-pressed={selectedMarket === "all"}
          onClick={() => onMarketChange("all")}
        >
          All markets
        </button>
      </div>
      <div className={styles.marketGlobeStage}>
        <TrafficMarketExplorer
          markets={globeMarkets}
          showcase
          showcaseLabel="Available keyword markets"
          selectedCountry={selectedCountry}
          onCountryChange={(country) => onMarketChange(country ?? "all")}
        />
      </div>
    </section>
  );
}

const EMPTY_FILTER_OPTIONS: ReturnType<typeof filterOptionSources> = {
  seeds: [],
  clusters: [],
  intents: [],
  lanes: [],
  categories: [],
  audiences: [],
  channels: [],
  flags: [],
};

export function ResearchDashboard({ researchId }: { researchId: string }) {
  const router = useRouter();
  const [view, setView] = useState<ResearchView | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [authRequired, setAuthRequired] = useState(false);
  const [reloadVersion, setReloadVersion] = useState(0);
  const [draft, setDraft] = useState<SelectionItem[]>([]);
  const [filter, setFilter] = useState<KeywordFilterState>(emptyKeywordFilterState);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [saving, setSaving] = useState(false);
  const [staleConflict, setStaleConflict] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [finalizeState, setFinalizeState] = useState<
    "idle" | "handing-off" | "succeeded" | "definitive_failure" | "retry_required"
  >("idle");

  const clientRequestIdRef = useRef<string | null>(null);
  const lastRevisionRef = useRef<number | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;
    getKeywordResearch(researchId)
      .then((next) => {
        if (disposed) return;
        setView(next);
      })
      .catch((err) => {
        if (disposed) return;
        if (err instanceof ApiRequestError && err.status === 401) {
          setAuthRequired(true);
        } else if (err instanceof ApiRequestError && err.status === 404) {
          setLoadError("This research could not be found.");
        } else {
          setLoadError(errorMessage(err));
        }
      });
    return () => {
      disposed = true;
    };
  }, [researchId, reloadVersion]);

  useEffect(() => {
    if (!view) return;
    if (lastRevisionRef.current !== view.selectionRevision) {
      lastRevisionRef.current = view.selectionRevision;
      setDraft(selectionDraftFromView(view));
    }
  }, [view]);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(KEYWORD_THEME_STORAGE_KEY);
    } catch {
      saved = null;
    }
    if (!saved) {
      saved =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    }
    const resolved: "light" | "dark" = saved === "dark" ? "dark" : "light";
    queueMicrotask(() => setTheme(resolved));
  }, []);

  const result: ResearchResult | null = view && view.state === "completed" ? view.result : null;

  const filteredRows = useMemo(
    () => (result ? getFiltered(result.keywords, filter) : []),
    [result, filter],
  );

  const activeRowsIn = useMemo(() => {
    if (!result) return [];
    return activeRows({ ...result, keywords: filteredRows });
  }, [result, filteredRows]);

  const selectionItemIds = useMemo(() => new Set(draft.map((item) => item.itemId)), [draft]);

  const options = useMemo(
    () => (result ? filterOptionSources(result.keywords) : EMPTY_FILTER_OPTIONS),
    [result],
  );

  const clusterRows = useMemo<ClusterRow[]>(() => {
    if (!result) return [];
    const distinct = distinctKeywordRows(getFiltered(result.keywords, filter));
    const agg = aggregateByCluster(distinct);
    const rows: ClusterRow[] = [];
    for (const base of result.clusters) {
      const cluster = currentClusterMetric(base, filter.market);
      const group = agg[cluster.cluster];
      if (!group) continue;
      const records = distinct.filter((row) => row.cluster === cluster.cluster);
      const sortedRecords = records.slice().sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));
      rows.push({
        cluster: cluster.cluster,
        clusterId: cluster.clusterId,
        keywords: sortedRecords.map((row) => row.keyword),
        combinedVolume: cumulativeVolume(records),
        headlineVolume: cluster.headlineVolume,
        adjustedClusterVolume: adjustedVolume(records),
        rawVariantVolume: group.volume,
        variantGroups: cluster.variantGroups,
        sourceSeeds: cluster.sourceSeeds,
        laneCounts: cluster.laneCounts,
        facets: cluster.facets,
        avgCpc: group.cpcN ? group.cpcSum / group.cpcN : cluster.avgCpc,
        commercialIntent: group.ciN ? group.ciSum / group.ciN : cluster.commercialIntent,
        trendScore: cluster.trendScore,
        opportunityScore: cluster.opportunityScore,
        recommendedForStoreDiscovery: cluster.recommendedForStoreDiscovery,
      });
    }
    return rows.sort((a, b) => b.combinedVolume - a.combinedVolume);
  }, [result, filter]);

  if (selectedClusterId && !clusterRows.some((cluster) => cluster.clusterId === selectedClusterId)) {
    setSelectedClusterId(null);
  }

  function handleFilterChange(patch: Partial<KeywordFilterState>) {
    setFilter((current) => ({ ...current, ...patch }));
  }

  function resetFilters() {
    setFilter(emptyKeywordFilterState());
  }

  function toggleTheme() {
    setTheme((current) => {
      const next = nextTheme(current);
      try {
        window.localStorage.setItem(KEYWORD_THEME_STORAGE_KEY, next);
      } catch {
        // storage is optional; the in-memory theme still switches
      }
      return next;
    });
  }

  function handleToggleRow(row: KeywordRow) {
    setDraft((current) => toggleSelectedItem(current, row));
  }

  function handleDraftChange(next: SelectionItem[]) {
    setDraft(next);
  }

  async function handleSave() {
    if (!view || view.state !== "completed" || saving || staleConflict) return;
    setSaving(true);
    setSaveError(null);
    try {
      const next = await saveKeywordSelection(researchId, view.selectionRevision, draft);
      setView(next);
      setStaleConflict(false);
    } catch (err) {
      if (
        err instanceof ApiRequestError &&
        err.status === 409 &&
        err.code === "KEYWORD_SELECTION_REVISION_CONFLICT"
      ) {
        setStaleConflict(true);
      } else {
        setSaveError(errorMessage(err));
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleFinalize() {
    if (
      !view ||
      view.state !== "completed" ||
      finalizeState === "handing-off" ||
      finalizeState === "succeeded" ||
      finalizeState === "retry_required"
    ) {
      return;
    }
    const gate = canFinalizeSelection(view, draft);
    if (!gate.ok) return;
    if (clientRequestIdRef.current === null) {
      clientRequestIdRef.current = newClientRequestId();
    }
    setFinalizeState("handing-off");
    setSaveError(null);
    try {
      const handoff = await startKeywordResearchRun(
        researchId,
        view.selectionRevision,
        clientRequestIdRef.current,
      );
      setFinalizeState("succeeded");
      router.push(`/runs/${encodeURIComponent(handoff.run.runId)}`);
    } catch (err) {
      if (err instanceof ApiRequestError && err.status < 500) {
        clientRequestIdRef.current = null;
        setFinalizeState("definitive_failure");
        if (err.status === 409) {
          setStaleConflict(true);
        } else {
          setSaveError(errorMessage(err));
        }
      } else {
        setFinalizeState("retry_required");
      }
    }
  }

  async function handleRetryHandoff() {
    if (
      !view ||
      view.state !== "completed" ||
      finalizeState !== "retry_required" ||
      clientRequestIdRef.current === null
    ) {
      return;
    }
    setFinalizeState("handing-off");
    setSaveError(null);
    try {
      const handoff = await startKeywordResearchRun(
        researchId,
        view.selectionRevision,
        clientRequestIdRef.current,
      );
      setFinalizeState("succeeded");
      router.push(`/runs/${encodeURIComponent(handoff.run.runId)}`);
    } catch (err) {
      if (err instanceof ApiRequestError && err.status < 500) {
        clientRequestIdRef.current = null;
        setFinalizeState("definitive_failure");
        if (err.status === 409) {
          setStaleConflict(true);
        } else {
          setSaveError(errorMessage(err));
        }
      } else {
        setFinalizeState("retry_required");
      }
    }
  }

  function retry() {
    setLoadError(null);
    setAuthRequired(false);
    setView(null);
    setReloadVersion((value) => value + 1);
  }

  const exportHref = result
    ? `/api/keyword-research/${encodeURIComponent(researchId)}/export.csv?${buildExportQuery(filter).toString()}`
    : "";

  if (authRequired) {
    return (
      <section
        className={styles.kiDashboard}
        data-ki-theme={theme}
        data-surface="surface:research-dashboard"
        aria-label="Keyword research dashboard"
      >
        <div className={styles.banner} role="alert">
          <span>You need to sign in to view keyword research.</span>
          <Link className={styles.btn} href="/sign-in">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  if (loadError) {
    return (
      <section
        className={styles.kiDashboard}
        data-ki-theme={theme}
        data-surface="surface:research-dashboard"
        aria-label="Keyword research dashboard"
      >
        <div className={styles.banner} role="alert">
          <span>{loadError}</span>
          <button className={styles.btn} type="button" onClick={retry}>
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (!view) {
    return (
      <section
        className={styles.kiDashboard}
        data-ki-theme={theme}
        data-surface="surface:research-dashboard"
        aria-label="Keyword research dashboard"
      >
        <div className={styles.seedEmpty}>Loading keyword research…</div>
      </section>
    );
  }

  if (view.state === "queued" || view.state === "running") {
    return (
      <section
        className={styles.kiDashboard}
        data-ki-theme={theme}
        data-surface="surface:research-dashboard"
        aria-label="Keyword research dashboard"
      >
        <div data-surface="surface:research-status">
          <ResearchStatus researchId={researchId} initialView={view} onTerminal={setView} />
        </div>
      </section>
    );
  }

  if (view.state === "failed") {
    return (
      <section
        className={styles.kiDashboard}
        data-ki-theme={theme}
        data-surface="surface:research-dashboard"
        aria-label="Keyword research dashboard"
      >
        <div className={styles.banner} role="alert" data-code={view.safeError ? view.safeError.code : ""}>
          <span>{view.safeError ? view.safeError.message : "The research run failed."}</span>
          <button className={styles.btn} type="button" onClick={retry}>
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <section
        className={styles.kiDashboard}
        data-ki-theme={theme}
        data-surface="surface:research-dashboard"
        aria-label="Keyword research dashboard"
      >
        <div className={styles.seedEmpty}>Loading keyword research…</div>
      </section>
    );
  }

  const phase = dashboardPhase(view, null);
  const heroRows = result.keywords
    .map((row) => projectMarketRow(row, filter.market))
    .filter((row) => !(row as KeywordRow & { _marketMissing?: boolean })._marketMissing);
  const heroActiveRows = heroRows.filter((row) => row.mergedInto === null);
  const heroCpcValues = heroActiveRows
    .map((row) => row.cpc)
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const heroAverageCpc = heroCpcValues.length
    ? heroCpcValues.reduce((sum, value) => sum + value, 0) / heroCpcValues.length
    : null;
  const heroMarket = result.markets.find((market) => market.code === filter.market);
  const heroMarketLabel =
    filter.market === "all" ? "cumulative" : heroMarket?.name || filter.market;

  return (
    <section
      className={styles.kiDashboard}
      data-ki-theme={theme}
      data-surface="surface:research-dashboard"
      aria-label="Keyword research dashboard"
    >
      {phase !== "empty" && (
        <div className={styles.filterDock} data-surface="surface:filter-bar">
          <div className={styles.dashboardToolbar}>
            <span className={styles.servicePill}>Keyword intelligence ready</span>
            <div className={styles.headerActions}>
              <button type="button" className={styles.btn} onClick={toggleTheme}>
                {theme === "dark" ? "Standard contrast" : "Soft contrast"}
              </button>
              {activeRowsIn.length > 0 ? (
                <a className={`${styles.btn} ${styles.primary}`} href={exportHref}>
                  Export CSV
                </a>
              ) : (
                <span className={`${styles.btn} ${styles.primary}`} aria-disabled="true">
                  Export CSV
                </span>
              )}
            </div>
          </div>
          <FilterBar
            filter={filter}
            options={options}
            onChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>
      )}

      {result && (
        <section aria-label="Keyword research introduction">
          <SectionIntro
            eyebrow="Keyword intelligence"
            title="The landscape behind this market."
            copy="Active phrases, recommended targets, and the clusters that hold the demand."
          />
        </section>
      )}

      {saveError && (
        <div className={styles.banner} role="alert">
          <span>{saveError}</span>
        </div>
      )}

      {staleConflict && (
        <div className={styles.banner} role="alert">
          <span>
            Your selection changed on the server. Reload the dashboard to review the latest version
            before saving again.
          </span>
          <button className={styles.btn} type="button" onClick={retry}>
            Reload dashboard
          </button>
        </div>
      )}

      {phase === "empty" ? (
        <div className={styles.seedEmpty} role="status">
          This research contains no active keywords.
        </div>
      ) : (
        <section aria-label="Keyword research results">
          <div className={styles.marketContext} aria-live="polite">
            <span className={styles.marketContextDot} aria-hidden="true" />
            <span>
              Viewing{" "}
              <strong>
                {filter.market === "all" ? "all markets — cumulative" : filter.market}
              </strong>
            </span>
          </div>

          <SummaryCards result={result} marketCode={filter.market}>
            {(summary) => (
              <ChartPanels
                result={result}
                marketCode={filter.market}
                filter={filter}
                rows={filteredRows}
              >
                {(charts) => (
                  <>
                    <section className={styles.researchHero} aria-label="Keyword research workspace">
                      <div className={styles.heroCopy} data-surface="surface:summary-cards">
                        <span className={styles.servicePill}>Research landscape ready</span>
                        <div className={styles.heroEyebrow}>Your keyword opportunity</div>
                        <h1>
                          <span className={styles.heroHighlight}>
                            {fmtNum(result.summary.rawItemsCollected)} keywords
                          </span>{" "}
                          across {fmtNum(result.summary.clusters)} clusters.
                        </h1>
                        <p>
                          {fmtNum(result.summary.activeKeywords)} are active and{" "}
                          {fmtNum(result.summary.recommendedKeywords)} are recommended, representing{" "}
                          {fmtNum(cumulativeVolume(heroRows))} {heroMarketLabel} searches at an average CPC of{" "}
                          {fmtCpc(heroAverageCpc)}.
                        </p>
                        <div className={styles.heroBenefits}>
                          <span>{fmtNum(result.summary.activeKeywords)} active keywords</span>
                          <span>{fmtNum(result.summary.recommendedKeywords)} recommended</span>
                          <span>{fmtNum(result.summary.clusters)} focused clusters</span>
                        </div>
                        <div className={styles.heroOrbit} aria-hidden="true" />
                      </div>

                      <div
                        ref={reviewRef}
                        className={styles.selectionStep}
                        data-surface="surface:selection-review"
                      >
                        <SelectionReview
                          view={view}
                          draft={draft}
                          conflicts={view.selectionConflicts}
                          saving={saving}
                          staleConflict={staleConflict}
                          onSave={handleSave}
                          onFinalize={handleFinalize}
                          finalizeState={finalizeState}
                          onRetryHandoff={handleRetryHandoff}
                          onDraftChange={handleDraftChange}
                        />
                      </div>

                      {charts.heatmapPanel}

                      <KeywordMarketGlobe
                        markets={result.markets}
                        rows={result.keywords}
                        selectedMarket={filter.market}
                        onMarketChange={(market) => handleFilterChange({ market, page: 1 })}
                      />
                    </section>

                    <section aria-label="Keyword charts and table">
                      <div className={styles.dashboardFlow}>
                      {charts.seedPerformance}

                      <ClusterLandscape
                        clusters={clusterRows}
                        selectedClusterId={selectedClusterId}
                        onSelect={setSelectedClusterId}
                      />

                      {summary.marketOverview(charts.overviewSignals)}

                      <section className={styles.decisionGrid} aria-label="Decision summary">
                        {summary.overlapPanel}
                        {charts.historyPanel}
                      </section>

                      {charts.analysisCharts}

                      <div data-surface="surface:keyword-table">
                        <KeywordTable
                          rows={activeRowsIn}
                          filter={filter}
                          selectionItemIds={selectionItemIds}
                          onToggleRow={handleToggleRow}
                        />
                      </div>
                      </div>
                    </section>
                  </>
                )}
              </ChartPanels>
            )}
          </SummaryCards>
        </section>
      )}
    </section>
  );
}
