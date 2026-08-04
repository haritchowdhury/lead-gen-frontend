"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ResponsiveContainer, Tooltip, Treemap } from "recharts";
import type { DataForSeoMarketTraffic, TrafficQuerySummary } from "@/lib/api-types";
import {
  buildQueryTreemap, queryDisplayName, queryFilterValue, selectedDiscoveryQueries, setDiscoveryQueries,
  type QueryTreemapNode,
} from "@/lib/query-treemap";

type CountryCode = DataForSeoMarketTraffic["country_code"];
const COUNTRY_NAMES: Record<CountryCode, string> = { US: "United States", GB: "United Kingdom", CA: "Canada", AU: "Australia", NZ: "New Zealand", DE: "Germany", FR: "France", IN: "India", AE: "United Arab Emirates" };
const numberFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1, notation: "compact" });

type TreemapContentProps = { x?: number; y?: number; width?: number; height?: number; depth?: number; index?: number; payload?: QueryTreemapNode } & Partial<QueryTreemapNode>;

function tileColor(index: number, total: number, active: boolean): string {
  if (active) return "#c5f536";
  const lightness = 64 + (total <= 1 ? 0 : (index / (total - 1)) * 24);
  return `hsl(83 48% ${lightness}%)`;
}

function productPhrase(query: string): string {
  if (query === "Other queries" || query === "Unattributed discovery") return query;
  const match = query.match(/\/products(?:\s+|$)(.*)$/iu);
  const phrase = (match?.[1] || query).trim().replace(/^(["'])|(["'])$/gu, "");
  return phrase || query;
}

function QueryTile(props: TreemapContentProps & { nodes: QueryTreemapNode[]; selected: string[]; hrefFor: (value: string) => string; navigateTo: (value: string) => void; openOther: () => void }) {
  const { x = 0, y = 0, width = 0, height = 0, depth = 0, index = 0 } = props;
  if (depth !== 1) return null;
  const node = props.payload ?? props as QueryTreemapNode;
  if (!node.name || node.value == null) return null;
  const active = node.filterValue ? props.selected.includes(node.filterValue) : false;
  const showTraffic = width >= 38 && height >= 22 && width * height >= 900;
  const showLabel = width >= 72 && height >= 50 && width * height >= 3_800;
  const showShops = width >= 110 && height >= 112 && width * height >= 13_000;
  const label = productPhrase(node.name);
  const maxCharacters = Math.max(7, Math.min(30, Math.floor((width - 18) / 6)));
  const compactTraffic = numberFormatter.format(node.value);
  const content = <>
    <rect x={x + 1.5} y={y + 1.5} width={Math.max(0, width - 3)} height={Math.max(0, height - 3)} rx={4} fill={tileColor(index, props.nodes.length, active)} stroke={active ? "#173a24" : "rgba(38,67,32,.1)"} />
    {showTraffic && <text x={x + (showLabel ? 9 : width / 2)} y={y + (showLabel ? 18 : height / 2 + 3)} textAnchor={showLabel ? "start" : "middle"} className={showLabel ? "query-treemap-label" : "query-treemap-compact-value"}>
      {showLabel && <tspan>{label.length > maxCharacters ? `${label.slice(0, maxCharacters - 1)}…` : label}</tspan>}
      <tspan x={x + (showLabel ? 9 : width / 2)} dy={showLabel ? "16" : "0"} className="query-treemap-value">{compactTraffic}{showLabel ? " traffic" : ""}</tspan>
      {showShops && <tspan x={x + 9} dy="15" className="query-treemap-detail">{node.shopsFound.toLocaleString()} shops</tspan>}
    </text>}
  </>;
  return node.hiddenQueries ? <g role="button" tabIndex={0} aria-label={`Choose from ${node.hiddenQueries.length} other queries`} onClick={props.openOther} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") props.openOther(); }}>{content}</g>
    : <a href={props.hrefFor(node.filterValue)} onClick={(event) => { event.preventDefault(); props.navigateTo(node.filterValue); }} aria-label={`Filter leads by ${node.name}${active ? ", selected" : ""}`}>{content}</a>;
}

function QueryTooltip({ active, payload, scope }: { active?: boolean; payload?: Array<{ payload?: QueryTreemapNode }>; scope: string }) {
  const node = payload?.[0]?.payload;
  if (!active || !node) return null;
  return <div className="query-treemap-tooltip"><strong>{node.name}</strong><span>{numberFormatter.format(node.value)} estimated traffic · {scope}</span><span>{node.shopsFound.toLocaleString()} shops · {node.leadsWithTraffic.toLocaleString()} covered</span>{node.hiddenQueries && <span>{node.hiddenQueries.length} additional queries</span>}</div>;
}

export function QueryTrafficHeatmap({ queries, selectedCountry, live = false }: { queries: TrafficQuerySummary[]; selectedCountry: CountryCode | null; live?: boolean }) {
  const pathname = usePathname(); const router = useRouter(); const searchParams = useSearchParams();
  const selected = selectedDiscoveryQueries(new URLSearchParams(searchParams.toString()));
  const [selectorOpen, setSelectorOpen] = useState(false); const [querySearch, setQuerySearch] = useState(""); const [hiddenOnly, setHiddenOnly] = useState(false); const [draft, setDraft] = useState(selected);
  const { nodes, zero, hidden } = useMemo(() => buildQueryTreemap(queries, selectedCountry), [queries, selectedCountry]);
  const scopeLabel = selectedCountry ? COUNTRY_NAMES[selectedCountry] : "Worldwide";
  const choiceSource = hiddenOnly && !querySearch ? hidden : queries;
  const choices = choiceSource.filter((query) => queryDisplayName(query.query).toLowerCase().includes(querySearch.trim().toLowerCase()));
  function hrefFor(value: string) { const next = setDiscoveryQueries(new URLSearchParams(searchParams.toString()), [value]); return `${pathname}?${next}`; }
  function navigateTo(values: string[]) { const next = setDiscoveryQueries(new URLSearchParams(searchParams.toString()), values); router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false }); }
  function applySelection() { navigateTo(draft); setSelectorOpen(false); }
  function openSelector(showHidden = false) { setDraft(selected); setQuerySearch(""); setHiddenOnly(showHidden); setSelectorOpen(true); }
  return <section className="query-traffic-heatmap" aria-labelledby="query-traffic-title">
    <header className="query-traffic-heading"><div><span className="eyebrow">Query traffic intelligence</span><h3 id="query-traffic-title">Traffic by discovery query</h3><p>Tile area represents estimated search demand behind every query in this {live ? "lead collection" : "run"}.</p></div></header>
    {nodes.length ? <div className="query-treemap-plot" role="group" aria-label={`Discovery-query traffic treemap for ${scopeLabel}`}><ResponsiveContainer width="100%" height="100%"><Treemap data={nodes} dataKey="value" nameKey="name" isAnimationActive={false} content={<QueryTile nodes={nodes} selected={selected} hrefFor={hrefFor} navigateTo={(value) => navigateTo([value])} openOther={() => openSelector(true)} />}><Tooltip content={<QueryTooltip scope={scopeLabel} />} /></Treemap></ResponsiveContainer></div> : queries.length ? <p className="empty-evidence">No measured traffic is available for {scopeLabel.toLowerCase()}.</p> : <p className="empty-evidence">No generated queries are available for this {live ? "lead collection" : "run"}.</p>}
    <div className="query-filter-bar"><div>{selected.map((value) => <button key={value} className="query-filter-chip" onClick={() => { const next = selected.filter((item) => item !== value); setDraft(next); const params = setDiscoveryQueries(new URLSearchParams(searchParams.toString()), next); router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false }); }}>{queryDisplayName(value === "__unattributed__" ? null : value)} ×</button>)}</div><button type="button" className="button button-secondary query-selector-trigger" onClick={() => openSelector()}>{selected.length ? `Edit ${selected.length} query filters` : "Filter leads by queries"}</button></div>
    {selectorOpen && <div className="query-selector" role="dialog" aria-modal="false" aria-labelledby="query-selector-title"><div className="query-selector-heading"><strong id="query-selector-title">{hiddenOnly ? `${hidden.length} other queries` : "Choose discovery queries"}</strong><button type="button" onClick={() => setSelectorOpen(false)} aria-label="Close query selector">×</button></div><input type="search" value={querySearch} onChange={(event) => setQuerySearch(event.target.value)} placeholder="Search all queries…" aria-label="Search discovery queries"/><div className="query-selector-actions"><button type="button" onClick={() => setDraft([...new Set([...draft, ...choices.map((query) => queryFilterValue(query.query))])])}>Select all visible</button>{hiddenOnly && <button type="button" onClick={() => setHiddenOnly(false)}>Show all queries</button>}<button type="button" onClick={() => setDraft([])}>Clear</button></div><div className="query-selector-list">{choices.map((query) => { const value = queryFilterValue(query.query); return <label key={value}><input type="checkbox" checked={draft.includes(value)} onChange={(event) => setDraft(event.target.checked ? [...draft, value] : draft.filter((item) => item !== value))}/><span>{queryDisplayName(query.query)}</span><small>{query.shopsFound.toLocaleString()} shops</small></label>; })}</div><button type="button" className="button button-primary" onClick={applySelection}>Apply filters</button></div>}
    {zero.length > 0 && <details className="query-zero-list"><summary>{zero.length} {zero.length === 1 ? "query has" : "queries have"} no measured {scopeLabel.toLowerCase()} traffic</summary><div>{zero.map((query) => { const value = queryFilterValue(query.query); return <a href={hrefFor(value)} onClick={(event) => { event.preventDefault(); navigateTo([value]); }} key={value}>{queryDisplayName(query.query)}</a>; })}</div></details>}
    <p className="query-traffic-note">Showing {scopeLabel.toLowerCase()} traffic · larger, darker tiles indicate greater estimated demand.</p>
  </section>;
}
