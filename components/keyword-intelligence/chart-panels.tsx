"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  ScatterController,
  Tooltip,
} from "chart.js";
import type { ChartConfiguration, ScriptableContext, TooltipItem } from "chart.js";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";

import type {
  KeywordRow,
  MonthlyHistoryPoint,
  ResearchResult,
} from "@/lib/keyword-intelligence-types";
import type { KeywordFilterState } from "@/lib/keyword-intelligence-view-model";
import {
  activeRows,
  aggregateByCluster,
  fmtCpc,
  fmtNum,
  fmtPct,
  fmtSlope,
  getFiltered,
  median,
} from "@/lib/keyword-intelligence-view-model";

import styles from "./keyword-dashboard.module.css";

Chart.register(
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  ScatterController,
  Tooltip,
  TreemapController,
  TreemapElement,
);

type ChartPanelsProps = {
  result: ResearchResult;
  marketCode: string;
  filter: KeywordFilterState;
  rows: KeywordRow[];
  children: (sections: ChartPanelSections) => ReactNode;
};

type ChartPanelSections = {
  seedPerformance: ReactNode;
  overviewSignals: ReactNode;
  historyPanel: ReactNode;
  analysisCharts: ReactNode;
};

type Palette = {
  text: string;
  muted: string;
  grid: string;
  primary: string;
  green: string;
  red: string;
  amber: string;
  gray: string;
  bg: string;
  card: string;
};

type SeedGroup = {
  count: number;
  volume: number;
  recommendedCount: number;
  recommendedVolume: number;
  decliningCount: number;
  decliningVolume: number;
  otherVolume: number;
  commercial: number;
  volumes: number[];
};

type BubblePoint = {
  x: number;
  y: number;
  r: number;
  _kw: string;
  _cpc: number | null;
  _ci: number;
  _vol: number;
  _diff: number;
};

type ScatterPoint = {
  x: number;
  y: number;
  _kw: string;
  _vol: number;
  _ci: number;
};

type TreemapNodeData = {
  _data?: {
    name?: string;
    label?: string;
    count?: number;
    value?: number;
    color?: string;
  };
};

const FLAG_META: Record<string, { label: string; tip: string }> = {
  declining_traffic: {
    label: "Declining",
    tip: "Seasonality-adjusted momentum is below the declining threshold",
  },
  too_broad: {
    label: "Too broad",
    tip: "Short, high-volume keyword that is too generic to target",
  },
  too_little_traffic: {
    label: "Low traffic",
    tip: "Search volume too low to be worth targeting",
  },
  brand_competitor: {
    label: "Brand / competitor",
    tip: "Useful competitor demand, separated from unbranded targeting recommendations",
  },
  informational_dropped: {
    label: "Informational",
    tip: "Dropped from the pipeline as informational intent",
  },
  manually_added: {
    label: "New",
    tip: "Added manually from the keyword workspace",
  },
};

function flagMeta(flag: string): { label: string; tip: string } {
  return (
    FLAG_META[flag] ?? {
      label: flag,
      tip: "Quality flag applied by the pipeline",
    }
  );
}

function isNum(value: unknown): value is number {
  return typeof value === "number" && isFinite(value);
}

function truncate(value: unknown, n: number): string {
  const s = String(value == null ? "" : value);
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function hexToRgb(h: string): number[] {
  let m = String(h).replace("#", "");
  if (m.length === 3) m = m.split("").map((c) => c + c).join("");
  const parsed = parseInt(m, 16);
  return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255];
}

function rgba(h: string, a: number): string {
  let c: number[];
  if (String(h).indexOf("rgb(") === 0) {
    c = String(h).slice(4, -1).split(",").map((x) => parseInt(x, 10));
  } else {
    c = hexToRgb(h);
  }
  return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
}

function lerpColor(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
  return "rgb(" + r + "," + g + "," + bl + ")";
}

function shade(hex: string, f: number): string {
  const c = hexToRgb(hex);
  return "rgb(" + Math.round(c[0] * f) + "," + Math.round(c[1] * f) + "," + Math.round(c[2] * f) + ")";
}

function cssVar(root: HTMLElement | null, name: string): string {
  if (!root) return "";
  return getComputedStyle(root).getPropertyValue(name).trim();
}

function palette(root: HTMLElement | null): Palette {
  return {
    text: cssVar(root, "--c-text") || "#0f172a",
    muted: cssVar(root, "--c-muted") || "#64748b",
    grid: cssVar(root, "--c-grid") || "#e2e8f0",
    primary: cssVar(root, "--c-primary") || "#6366f1",
    green: cssVar(root, "--c-green") || "#16a34a",
    red: cssVar(root, "--c-red") || "#dc2626",
    amber: cssVar(root, "--c-amber") || "#d97706",
    gray: cssVar(root, "--c-muted") || "#64748b",
    bg: cssVar(root, "--bg") || "#ffffff",
    card: cssVar(root, "--c-card") || "#ffffff",
  };
}

function tooltipBase(root: HTMLElement | null) {
  return {
    backgroundColor: cssVar(root, "--text") || "#0f172a",
    titleColor: cssVar(root, "--bg") || "#ffffff",
    bodyColor: cssVar(root, "--bg") || "#ffffff",
    cornerRadius: 8,
    padding: 10,
    boxPadding: 4,
  };
}

function baseScales(colors: Palette) {
  return {
    x: { grid: { color: colors.grid }, ticks: { color: colors.muted } },
    y: { grid: { color: colors.grid }, ticks: { color: colors.muted } },
  };
}

function totalVolume(agg: Record<string, { volume: number; count: number }>): number {
  return Object.keys(agg).reduce((sum, key) => sum + agg[key].volume, 0);
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function buildTopKeywordsConfig(colors: Palette, top: KeywordRow[]): ChartConfiguration {
  const labels = top.map((r) => truncate(r.keyword, 42));
  return {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          type: "bar",
          label: "Search volume",
          data: top.map((r) => r.searchVolume || 0),
          backgroundColor: rgba(colors.primary, 0.78),
          borderColor: colors.primary,
          borderWidth: 1,
          borderRadius: 4,
          xAxisID: "x",
          yAxisID: "yVolume",
          order: 2,
          barThickness: "flex",
        },
        {
          type: "line",
          label: "Trend momentum",
          data: top.map((r) => (isNum(r.trendSlope) ? r.trendSlope : null)),
          showLine: true,
          spanGaps: true,
          tension: 0.15,
          borderColor: rgba(colors.amber, 0.8),
          borderWidth: 2,
          backgroundColor: top.map((r) => {
            if (!isNum(r.trendSlope)) return colors.muted;
            return r.trendSlope > 0 ? colors.green : r.trendSlope < 0 ? colors.red : colors.muted;
          }),
          pointBorderColor: top.map((r) => {
            if (!isNum(r.trendSlope)) return colors.muted;
            return r.trendSlope > 0 ? colors.green : r.trendSlope < 0 ? colors.red : colors.muted;
          }),
          pointBackgroundColor: top.map((r) => {
            if (!isNum(r.trendSlope)) return colors.muted;
            return r.trendSlope > 0 ? colors.green : r.trendSlope < 0 ? colors.red : colors.muted;
          }),
          pointBorderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 7,
          xAxisID: "x",
          yAxisID: "yTrend",
          order: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { color: colors.text, boxWidth: 12, padding: 14 } },
        tooltip: {
          ...tooltipBase(null),
          callbacks: {
            title: (items: TooltipItem<"bar" | "line">[]) => top[items[0].dataIndex].keyword,
            label: (item: TooltipItem<"bar" | "line">) => {
              const r = top[item.dataIndex];
              if (item.datasetIndex === 1) {
                let trend = "Trend momentum: " + fmtSlope(r.trendSlope);
                if (isNum(r.trendSlope)) {
                  trend += " " + (r.trendSlope > 0 ? "(rising)" : r.trendSlope < 0 ? "(declining)" : "(flat)");
                }
                return trend;
              }
              return "Search volume: " + fmtNum(r.searchVolume);
            },
            afterBody: (items: TooltipItem<"bar" | "line">[]) => {
              if (!items.length) return [];
              const r = top[items[0].dataIndex];
              const details: string[] = [];
              if (isNum(r.cpc)) details.push("CPC: " + fmtCpc(r.cpc));
              if (isNum(r.commercialIntent)) details.push("Commercial intent: " + fmtPct(r.commercialIntent));
              return details;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: colors.text,
            autoSkip: true,
            maxTicksLimit: 16,
            maxRotation: 40,
            minRotation: 0,
            font: { size: 9 },
          },
          title: { display: true, text: "Active keywords", color: colors.muted },
        },
        yVolume: {
          position: "left",
          beginAtZero: true,
          grid: { color: colors.grid },
          ticks: { color: colors.muted, callback: (value: string | number) => fmtNum(Number(value)) },
          title: { display: true, text: "Monthly search volume", color: colors.muted },
        },
        yTrend: {
          position: "right",
          grid: { display: false },
          ticks: { color: colors.muted, callback: (value: string | number) => fmtSlope(Number(value)) },
          title: { display: true, text: "Trend momentum", color: colors.muted },
        },
      },
    },
  };
}

function buildClusterVolumeConfig(
  colors: Palette,
  agg: Record<string, { volume: number; count: number }>,
  root: HTMLElement | null,
): ChartConfiguration | null {
  const entries = Object.keys(agg)
    .map((k) => ({ name: k, volume: agg[k].volume }))
    .sort((a, b) => b.volume - a.volume);
  if (!entries.length) return null;
  const max = entries[0].volume || 1;
  const total = totalVolume(agg);
  return {
    type: "bar",
    data: {
      labels: entries.map((e) => truncate(e.name, 22)),
      datasets: [
        {
          data: entries.map((e) => e.volume),
          backgroundColor: entries.map((e) => {
            const t = Math.max(0.15, Math.min(1, e.volume / max));
            return lerpColor(colors.primary, colors.amber, t);
          }),
          borderRadius: 4,
          barThickness: "flex",
        },
      ],
    },
    options: {
      indexAxis: "y",
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipBase(root),
          callbacks: {
            title: (items: TooltipItem<"bar">[]) => entries[items[0].dataIndex].name,
            label: (item: TooltipItem<"bar">) => {
              const e = entries[item.dataIndex];
              const g = agg[e.name];
              const share = total ? (e.volume / total * 100).toFixed(1) + "% of filtered volume" : "";
              return ["Combined volume: " + fmtNum(e.volume), "Keywords: " + g.count, share].filter(Boolean);
            },
          },
        },
      },
      scales: {
        x: { grid: { color: colors.grid }, ticks: { color: colors.muted, callback: (value: string | number) => fmtNum(Number(value)) } },
        y: { grid: { display: false }, ticks: { color: colors.text, autoSkip: false, font: { size: 11 } } },
      },
    },
  };
}

function buildBubbleConfig(colors: Palette, rows: KeywordRow[]): ChartConfiguration | null {
  const pts = rows.filter((r) => isNum(r.keywordDifficulty) && isNum(r.searchVolume));
  if (!pts.length) return null;
  return {
    type: "bubble",
    data: {
      datasets: [
        {
          data: pts.map((r): BubblePoint => ({
            x: r.keywordDifficulty as number,
            y: r.searchVolume,
            r: isNum(r.cpc) ? Math.max(4, Math.sqrt(r.cpc as number) * 9) : 4,
            _kw: r.keyword,
            _cpc: r.cpc,
            _ci: r.commercialIntent,
            _vol: r.searchVolume,
            _diff: r.keywordDifficulty as number,
          })),
          backgroundColor: pts.map((r) => rgba(lerpColor(colors.primary, colors.red, clamp01((r.commercialIntent || 0) / 1)), 0.55)),
          borderColor: pts.map((r) => lerpColor(colors.primary, colors.red, clamp01((r.commercialIntent || 0) / 1))),
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipBase(null),
          callbacks: {
            label: (item: TooltipItem<"bubble">) => {
              const d = item.raw as BubblePoint;
              return [
                d._kw,
                "Volume: " + fmtNum(d._vol),
                "Difficulty: " + d._diff,
                "CPC: " + fmtCpc(d._cpc),
                "Commercial intent: " + fmtPct(d._ci),
              ];
            },
          },
        },
      },
      scales: {
        x: Object.assign(
          { title: { display: true, text: "Keyword difficulty", color: colors.muted } },
          baseScales(colors).x,
        ),
        y: Object.assign(
          {
            title: { display: true, text: "Search volume", color: colors.muted },
            ticks: { color: colors.muted, callback: (value: string | number) => fmtNum(Number(value)) },
          },
          baseScales(colors).y,
        ),
      },
    },
  };
}

function buildScatterConfig(colors: Palette, rows: KeywordRow[]): ChartConfiguration | null {
  const pts = rows.filter((r) => isNum(r.competition) && isNum(r.opportunityScore));
  if (!pts.length) return null;
  const scatterScales = baseScales(colors);
  return {
    type: "scatter",
    data: {
      datasets: [
        {
          data: pts.map((r): ScatterPoint => ({
            x: r.competition as number,
            y: r.opportunityScore as number,
            _kw: r.keyword,
            _vol: r.searchVolume,
            _ci: r.commercialIntent,
          })),
          backgroundColor: rgba(colors.primary, 0.55),
          borderColor: colors.primary,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipBase(null),
          callbacks: {
            label: (item: TooltipItem<"scatter">) => {
              const d = item.raw as ScatterPoint;
              return [
                d._kw,
                "Competition: " + fmtPct(d.x),
                "Opportunity: " + d.y,
                "Volume: " + fmtNum(d._vol),
                "Commercial intent: " + fmtPct(d._ci),
              ];
            },
          },
        },
      },
      scales: {
        x: Object.assign({}, scatterScales.x, {
          title: { display: true, text: "Competition (0–1)", color: colors.muted },
          min: -0.04,
          max: 1.04,
          ticks: Object.assign({}, scatterScales.x.ticks, {
            callback: (value: string | number) => {
              const v = Number(value);
              return v < 0 || v > 1 ? "" : v.toFixed(1);
            },
          }),
        }),
        y: Object.assign(
          { title: { display: true, text: "Opportunity score", color: colors.muted }, min: 0, max: 100 },
          scatterScales.y,
        ),
      },
    },
  };
}

function buildDoughnutConfig(
  colors: Palette,
  datasets: { label: string; value: number; color: string }[],
  root: HTMLElement | null,
): ChartConfiguration<"doughnut"> | null {
  const total = datasets.reduce((sum, d) => sum + d.value, 0);
  if (!total) return null;
  return {
    type: "doughnut",
    data: {
      labels: datasets.map((d) => d.label),
      datasets: [
        {
          data: datasets.map((d) => d.value),
          backgroundColor: datasets.map((d) => d.color),
          borderColor: cssVar(root, "--c-card") || "#ffffff",
          borderWidth: 2,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: {
        legend: { position: "bottom", labels: { color: colors.text, boxWidth: 12, padding: 12 } },
        tooltip: {
          ...tooltipBase(root),
          callbacks: {
            label: (item: TooltipItem<"doughnut">) => {
              const d = datasets[item.dataIndex];
              const pct = total ? (d.value / total * 100).toFixed(1) + "%" : "0%";
              return " " + d.label + ": " + fmtNum(d.value) + " (" + pct + ")";
            },
          },
        },
      },
    },
  };
}

function buildSeedsConfig(
  colors: Palette,
  seedAgg: Record<string, SeedGroup>,
  seedKeys: string[],
): ChartConfiguration | null {
  if (!seedKeys.length) return null;
  return {
    type: "bar",
    data: {
      labels: seedKeys,
      datasets: [
        {
          label: "Recommended volume",
          data: seedKeys.map((k) => seedAgg[k].recommendedVolume),
          backgroundColor: rgba(colors.green, 0.88),
          borderRadius: 3,
          borderSkipped: false,
        },
        {
          label: "Declining volume",
          data: seedKeys.map((k) => seedAgg[k].decliningVolume),
          backgroundColor: rgba(colors.red, 0.82),
          borderRadius: 3,
          borderSkipped: false,
        },
        {
          label: "Remaining volume",
          data: seedKeys.map((k) => seedAgg[k].otherVolume),
          backgroundColor: rgba(colors.gray, 0.48),
          borderRadius: 3,
          borderSkipped: false,
        },
      ],
    },
    options: {
      indexAxis: "y",
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { color: colors.text, boxWidth: 12, padding: 12 } },
        tooltip: {
          ...tooltipBase(null),
          callbacks: {
            label: (item: TooltipItem<"bar">) => {
              const k = seedKeys[item.dataIndex];
              const value = item.raw as number || 0;
              const pct = seedAgg[k].volume ? Math.round((value / seedAgg[k].volume) * 100) : 0;
              return item.dataset.label + ": " + fmtNum(value) + " (" + pct + "%)";
            },
            afterBody: (items: TooltipItem<"bar">[]) => {
              if (!items.length) return [];
              const g = seedAgg[seedKeys[items[0].dataIndex]];
              return [
                "Total volume: " + fmtNum(g.volume),
                "Active keywords: " + g.count,
                "Median volume: " + fmtNum(median(g.volumes)),
                "Commercial: " + g.commercial + " (" + Math.round((g.commercial / g.count) * 100) + "%)",
                "Recommended: " + g.recommendedCount,
                "Declining: " + g.decliningCount,
              ];
            },
          },
        },
      },
      scales: {
        x: { stacked: true, beginAtZero: true, grid: { color: colors.grid }, ticks: { color: colors.muted, callback: (value: string | number) => fmtNum(Number(value)) }, title: { display: true, text: "Search volume", color: colors.muted } },
        y: { stacked: true, grid: { display: false }, ticks: { color: colors.text, autoSkip: false } },
      },
    },
  };
}

function buildHistogramConfig(
  colors: Palette,
  bins: { label: string; n: number }[],
  totalRows: number,
): ChartConfiguration | null {
  if (!totalRows) return null;
  return {
    type: "bar",
    data: {
      labels: bins.map((b) => b.label),
      datasets: [
        {
          data: bins.map((b) => b.n),
          backgroundColor: colors.primary,
          borderRadius: 4,
          barThickness: "flex",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipBase(null),
          callbacks: {
            label: (item: TooltipItem<"bar">) => {
              const b = bins[item.dataIndex];
              const pct = totalRows ? (b.n / totalRows * 100).toFixed(1) + "%" : "0%";
              return b.label + ": " + b.n + " keywords (" + pct + ")";
            },
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text, autoSkip: false } },
        y: { beginAtZero: true, grid: { color: colors.grid }, ticks: { color: colors.muted, precision: 0 } },
      },
    },
  };
}

function buildTreemapConfig(
  colors: Palette,
  agg: Record<string, { volume: number; count: number }>,
  root: HTMLElement | null,
): ChartConfiguration<"treemap"> | null {
  const entries = Object.keys(agg).map((k) => ({
    name: k,
    value: agg[k].volume,
    count: agg[k].count,
  }));
  if (!entries.length) return null;
  const maxV = Math.max(...entries.map((e) => e.value));
  const tree = entries.map((e) => ({
    name: e.name,
    value: e.value,
    label: truncate(e.name, 20),
    count: e.count,
    color: lerpColor(shade(colors.primary, 0.85), shade(colors.amber, 0.55), Math.max(0.1, Math.min(1, maxV ? e.value / maxV : 0.5))),
  }));
  const total = totalVolume(agg);
  const backgroundColor = (ctx: ScriptableContext<"treemap">) => {
    if (ctx.type === "data") {
      const node = ctx.raw as TreemapNodeData;
      return node._data?.color ?? colors.primary;
    }
    return colors.primary;
  };
  return {
    type: "treemap",
    data: {
      datasets: [
        {
          label: "Cluster volume",
          data: [],
          tree,
          key: "value",
          backgroundColor,
          borderColor: cssVar(root, "--c-card") || "#ffffff",
          borderWidth: 2,
          spacing: 2,
          labels: {
            display: true,
            align: "center",
            position: "middle",
            color: "#ffffff",
            font: { size: 11, weight: "bold" },
            formatter: (ctx: ScriptableContext<"treemap">) => {
              const node = ctx.raw as TreemapNodeData;
              return node._data?.label ?? "";
            },
          },
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipBase(root),
          callbacks: {
            title: (items: TooltipItem<"treemap">[]) => {
              const node = items[0].raw as TreemapNodeData;
              return node._data?.name ?? "";
            },
            label: (item: TooltipItem<"treemap">) => {
              const node = item.raw as TreemapNodeData;
              const d = node._data ?? {};
              const share = total ? ((d.value ?? 0) / total * 100).toFixed(1) + "% of filtered volume" : "";
              return ["Volume: " + fmtNum(d.value ?? 0), "Keywords: " + (d.count ?? 0), share].filter(Boolean);
            },
          },
        },
      },
    },
  };
}

function buildFlagsConfig(colors: Palette, flagCounts: Record<string, number>): ChartConfiguration | null {
  const keys = Object.keys(flagCounts);
  if (!keys.length) return null;
  return {
    type: "bar",
    data: {
      labels: keys.map((k) => flagMeta(k).label),
      datasets: [
        {
          data: keys.map((k) => flagCounts[k]),
          backgroundColor: keys.map((k) => {
            if (k === "declining_traffic") return colors.red;
            if (k === "too_broad") return colors.amber;
            return colors.muted;
          }),
          borderRadius: 4,
          barThickness: "flex",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipBase(null),
          callbacks: {
            label: (item: TooltipItem<"bar">) => {
              const k = keys[item.dataIndex];
              return flagMeta(k).label + ": " + flagCounts[k] + " keyword(s) — " + flagMeta(k).tip;
            },
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text, autoSkip: false } },
        y: { beginAtZero: true, grid: { color: colors.grid }, ticks: { color: colors.muted, precision: 0 } },
      },
    },
  };
}

function buildHistoryConfig(
  colors: Palette,
  rows: KeywordRow[],
  historyKeyword: string,
): ChartConfiguration | null {
  const eligible = rows
    .filter((r) => Array.isArray(r.monthlyHistory) && r.monthlyHistory.length > 0)
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));
  if (!eligible.length) return null;

  let history: MonthlyHistoryPoint[];
  let chartLabel: string;
  if (historyKeyword === "all") {
    const combined: Record<string, number> = {};
    eligible.forEach((r) => {
      r.monthlyHistory.forEach((m) => {
        const key = m.year + "-" + String(m.month).padStart(2, "0");
        combined[key] = (combined[key] || 0) + (m.searchVolume || 0);
      });
    });
    history = Object.keys(combined).sort().map((key) => {
      const parts = key.split("-");
      return { year: parseInt(parts[0], 10), month: parseInt(parts[1], 10), searchVolume: combined[key] };
    });
    chartLabel = "Combined monthly search volume";
  } else {
    const rec = eligible.find((r) => r.itemId === historyKeyword);
    if (!rec) return null;
    history = rec.monthlyHistory.slice();
    chartLabel = "Monthly search volume";
  }
  history.sort((a, b) => a.year * 12 + a.month - (b.year * 12 + b.month));

  return {
    type: "line",
    data: {
      labels: history.map((m) => m.year + "-" + String(m.month).padStart(2, "0")),
      datasets: [
        {
          label: chartLabel,
          data: history.map((m) => m.searchVolume || 0),
          borderColor: colors.primary,
          backgroundColor: rgba(colors.primary, 0.14),
          pointBackgroundColor: colors.primary,
          pointRadius: 4,
          tension: 0.25,
          fill: true,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: tooltipBase(null) },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text } },
        y: {
          beginAtZero: true,
          grid: { color: colors.grid },
          ticks: { color: colors.muted, callback: (value: string | number) => fmtNum(Number(value)) },
        },
      },
    },
  };
}

export function ChartPanels({ result, marketCode, filter, rows, children }: ChartPanelsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const topKeywordsRef = useRef<HTMLCanvasElement | null>(null);
  const clusterVolumeRef = useRef<HTMLCanvasElement | null>(null);
  const bubbleRef = useRef<HTMLCanvasElement | null>(null);
  const scatterRef = useRef<HTMLCanvasElement | null>(null);
  const intentRef = useRef<HTMLCanvasElement | null>(null);
  const recommendedRef = useRef<HTMLCanvasElement | null>(null);
  const seedsRef = useRef<HTMLCanvasElement | null>(null);
  const histogramRef = useRef<HTMLCanvasElement | null>(null);
  const treemapRef = useRef<HTMLCanvasElement | null>(null);
  const flagsRef = useRef<HTMLCanvasElement | null>(null);
  const historyRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstancesRef = useRef<Record<string, Chart>>({});
  const [historyKeyword, setHistoryKeyword] = useState("all");
  const [themeTick, setThemeTick] = useState(0);
  const [chartError, setChartError] = useState(false);
  const chartErrorRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const themed = root.closest("[data-ki-theme]") ?? root;
    const observer = new MutationObserver(() => {
      setThemeTick((t) => t + 1);
    });
    observer.observe(themed, { attributes: true, attributeFilter: ["data-ki-theme"] });
    return () => observer.disconnect();
  }, []);

  const datasets = useMemo(() => {
    const filtered = getFiltered(rows, { ...filter, market: marketCode });
    const active = activeRows({ ...result, keywords: filtered });
    const agg = aggregateByCluster(active);

    const topRows = active
      .slice()
      .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));
    const clusterEntries = Object.keys(agg)
      .map((k) => ({ name: k, volume: agg[k].volume, count: agg[k].count }))
      .sort((a, b) => b.volume - a.volume);
    const clusterTotal = clusterEntries.reduce((sum, e) => sum + e.volume, 0);

    const bubblePts = active.filter((r) => isNum(r.keywordDifficulty) && isNum(r.searchVolume));
    const scatterPts = active.filter((r) => isNum(r.competition) && isNum(r.opportunityScore));

    const intentCounts: Record<string, number> = {
      commercial: 0,
      transactional: 0,
      navigational: 0,
      informational: 0,
    };
    active.forEach((r) => {
      const i = (r.mainIntent || "").toLowerCase();
      if (intentCounts[i] === undefined) intentCounts[i] = 0;
      intentCounts[i]++;
    });
    const recCount = active.filter((r) => r.recommended).length;

    const seedAgg: Record<string, SeedGroup> = {};
    active.forEach((r) => {
      const key = r.seed || "Unknown";
      const g = seedAgg[key] || (seedAgg[key] = {
        count: 0,
        volume: 0,
        recommendedCount: 0,
        recommendedVolume: 0,
        decliningCount: 0,
        decliningVolume: 0,
        otherVolume: 0,
        commercial: 0,
        volumes: [],
      });
      const volume = isNum(r.searchVolume) ? r.searchVolume : 0;
      const declining = (r.flags || []).indexOf("declining_traffic") !== -1;
      g.count++;
      g.volume += volume;
      g.volumes.push(volume);
      if (["commercial", "transactional"].indexOf((r.mainIntent || "").toLowerCase()) !== -1) g.commercial++;
      if (r.recommended) {
        g.recommendedCount++;
        g.recommendedVolume += volume;
      } else if (declining) {
        g.decliningCount++;
        g.decliningVolume += volume;
      } else {
        g.otherVolume += volume;
      }
    });
    const seedKeys = Object.keys(seedAgg).sort((a, b) => seedAgg[b].volume - seedAgg[a].volume);

    const bins: { label: string; n: number }[] = [];
    for (let i = 0; i < 10; i++) bins.push({ label: i * 10 + "–" + (i * 10 + 10), n: 0 });
    let nulls = 0;
    active.forEach((r) => {
      if (!isNum(r.opportunityScore)) {
        nulls++;
        return;
      }
      const idx = Math.min(9, Math.floor(Math.max(0, r.opportunityScore as number) / 10));
      bins[idx].n++;
    });

    const flagCounts: Record<string, number> = {};
    active.forEach((r) => {
      (r.flags || []).forEach((f) => {
        flagCounts[f] = (flagCounts[f] || 0) + 1;
      });
    });

    const historyEligible = active
      .filter((r) => Array.isArray(r.monthlyHistory) && r.monthlyHistory.length > 0)
      .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));

    return {
      active,
      agg,
      topRows,
      clusterEntries,
      clusterTotal,
      bubblePts,
      scatterPts,
      intentCounts,
      recCount,
      seedAgg,
      seedKeys,
      bins,
      nulls,
      flagCounts,
      historyEligible,
    };
  }, [rows, filter, marketCode, result]);

  const effectiveHistoryKeyword = useMemo(() => {
    if (historyKeyword === "all") return "all";
    return datasets.historyEligible.some((r) => r.itemId === historyKeyword) ? historyKeyword : "all";
  }, [historyKeyword, datasets.historyEligible]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const colors = palette(root);
    const instances: Record<string, Chart> = {};

    const build = (
      name: string,
      canvas: HTMLCanvasElement | null,
      cfg: ChartConfiguration | ChartConfiguration<"doughnut"> | ChartConfiguration<"treemap"> | null,
    ) => {
      if (canvas && cfg) {
        instances[name] = new Chart(canvas, cfg as ChartConfiguration);
      }
    };

    try {
      build("topKeywords", topKeywordsRef.current, buildTopKeywordsConfig(colors, datasets.topRows));
      build("clusterVolume", clusterVolumeRef.current, buildClusterVolumeConfig(colors, datasets.agg, root));
      build("bubble", bubbleRef.current, buildBubbleConfig(colors, datasets.active));
      build("scatter", scatterRef.current, buildScatterConfig(colors, datasets.active));
      build(
        "intent",
        intentRef.current,
        buildDoughnutConfig(colors, [
          { label: "Commercial", value: datasets.intentCounts.commercial || 0, color: colors.primary },
          { label: "Transactional", value: datasets.intentCounts.transactional || 0, color: colors.green },
          { label: "Navigational", value: datasets.intentCounts.navigational || 0, color: colors.amber },
          { label: "Informational", value: datasets.intentCounts.informational || 0, color: colors.gray },
        ], root),
      );
      build(
        "recommended",
        recommendedRef.current,
        buildDoughnutConfig(colors, [
          { label: "Recommended", value: datasets.recCount, color: colors.green },
          { label: "Rejected", value: datasets.active.length - datasets.recCount, color: colors.red },
        ], root),
      );
      build("seeds", seedsRef.current, buildSeedsConfig(colors, datasets.seedAgg, datasets.seedKeys));
      build("histogram", histogramRef.current, buildHistogramConfig(colors, datasets.bins, datasets.active.length));
      build("treemap", treemapRef.current, buildTreemapConfig(colors, datasets.agg, root));
      build("flags", flagsRef.current, buildFlagsConfig(colors, datasets.flagCounts));
      build("history", historyRef.current, buildHistoryConfig(colors, datasets.active, effectiveHistoryKeyword));
      if (chartErrorRef.current) {
        chartErrorRef.current = false;
        queueMicrotask(() => setChartError(false));
      }
    } catch (err) {
      void err;
      for (const c of Object.values(instances)) c.destroy();
      if (!chartErrorRef.current) {
        chartErrorRef.current = true;
        queueMicrotask(() => setChartError(true));
      }
    }

    chartInstancesRef.current = instances;
    return () => {
      for (const c of Object.values(chartInstancesRef.current)) c.destroy();
      chartInstancesRef.current = {};
    };
  }, [datasets, effectiveHistoryKeyword, themeTick, marketCode]);

  const topKeywordNote =
    datasets.topRows.length === 0
      ? "No active keywords in the filtered set."
      : datasets.topRows.length +
        " active keyword" +
        (datasets.topRows.length === 1 ? "" : "s") +
        " · columns show volume; the line and dots show trend momentum.";

  const histogramNote = datasets.nulls
    ? datasets.nulls + " keyword(s) without an opportunity score are excluded"
    : "";

  const historyNote = (() => {
    if (!datasets.historyEligible.length) {
      return "Run the updated pipeline once, then refresh. Future keywords.json files include the full monthly history.";
    }
    if (effectiveHistoryKeyword === "all") {
      return "Combined monthly search volume across " + datasets.historyEligible.length + " filtered active keywords.";
    }
    const rec = datasets.historyEligible.find((r) => r.itemId === effectiveHistoryKeyword);
    return rec ? rec.keyword + " — actual monthly search volumes returned by DataForSEO." : "";
  })();

  const hasData = {
    topKeywords: datasets.topRows.length > 0,
    clusterVolume: datasets.clusterEntries.length > 0,
    bubble: datasets.bubblePts.length > 0,
    scatter: datasets.scatterPts.length > 0,
    intent: datasets.active.length > 0,
    recommended: datasets.active.length > 0,
    seeds: datasets.seedKeys.length > 0,
    histogram: datasets.active.length > 0,
    treemap: datasets.clusterEntries.length > 0,
    flags: Object.keys(datasets.flagCounts).length > 0,
    history: datasets.historyEligible.length > 0,
  };

  const emptyCls = (present: boolean) =>
    present ? `${styles.chartEmpty} ${styles.hidden}` : styles.chartEmpty;

  const seedPerformance = (
      <section className={`${styles.decisionPanel} ${styles.seedAnalysis}`} aria-label="Seed phrase analysis">
        <h2>Seed performance</h2>
        <div className={styles.panelNote}>
          Search volume by seed, split into recommended, declining, and remaining keywords. Hover for active
          count, median volume, and commercial share.
        </div>
        <div className={`${styles.chartWrap} ${styles.seedPerformanceChart}`}>
          <canvas ref={seedsRef} data-surface="chart:seeds" />
          <div className={emptyCls(hasData.seeds)}>No data</div>
        </div>
      </section>
  );

  const overviewSignals = (
      <div className={styles.overviewSignals}>
        <div className={styles.chartCard}>
          <h3
            className={`${styles.chartTitle} ${styles.tip}`}
            data-tip="Share of active keywords by search intent label"
          >
            Search Intent Mix
          </h3>
          <div className={styles.chartWrap}>
            <canvas ref={intentRef} data-surface="chart:intent" />
            <div className={emptyCls(hasData.intent)}>No data</div>
          </div>
        </div>
        <div className={styles.chartCard}>
          <h3
            className={`${styles.chartTitle} ${styles.tip}`}
            data-tip="Share of active keywords that the pipeline recommends targeting vs rejects"
          >
            Recommended vs Rejected
          </h3>
          <div className={styles.chartWrap}>
            <canvas ref={recommendedRef} data-surface="chart:recommended" />
            <div className={emptyCls(hasData.recommended)}>No data</div>
          </div>
        </div>
        <div className={styles.chartCard}>
          <h3
            className={`${styles.chartTitle} ${styles.tip}`}
            data-tip="Distribution of opportunity scores in 10-point buckets (0–10 … 90–100)"
          >
            Opportunity-Score Distribution
          </h3>
          <div className={styles.chartSub}>{histogramNote}</div>
          <div className={styles.chartWrap}>
            <canvas ref={histogramRef} data-surface="chart:histogram" />
            <div className={emptyCls(hasData.histogram)}>No data</div>
          </div>
        </div>
        <div className={styles.chartCard}>
          <h3
            className={`${styles.chartTitle} ${styles.tip}`}
            data-tip="How many active keywords carry each quality flag: declining traffic, too broad, or too little traffic"
          >
            Flag Breakdown
          </h3>
          <div className={styles.chartWrap}>
            <canvas ref={flagsRef} data-surface="chart:flags" />
            <div className={emptyCls(hasData.flags)}>No data</div>
          </div>
        </div>
      </div>
  );

  const historyPanel = (
      <section className={`${styles.decisionPanel} ${styles.wide} ${styles.historyPanel}`}>
        <h2>Actual monthly search history</h2>
        <div className={styles.panelNote}>{historyNote}</div>
        <div className={styles.historyToolbar}>
          <select
            aria-label="Keyword for monthly history"
            value={effectiveHistoryKeyword}
            disabled={!hasData.history}
            onChange={(event) => setHistoryKeyword(event.target.value)}
          >
            {!hasData.history && <option value="">Monthly history is not in this output yet</option>}
            {hasData.history && <option value="all">All filtered keywords · combined monthly volume</option>}
            {datasets.historyEligible.map((r) => (
              <option key={r.itemId} value={r.itemId}>
                {r.keyword} · {fmtNum(r.searchVolume)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.chartWrap}>
          <canvas ref={historyRef} data-surface="chart:history" />
          <div className={emptyCls(hasData.history)}>
            Run the pipeline again to add monthly history to the output.
          </div>
        </div>
      </section>
  );

  const analysisCharts = (
      <section className={styles.charts} aria-label="Charts">
        <div className={`${styles.chartCard} ${styles.wide}`}>
          <h3
            className={`${styles.chartTitle} ${styles.tip}`}
            data-tip="Every active keyword is included. Columns use the left volume axis; the line uses seasonality-adjusted year-over-year momentum."
          >
            Active Keywords · Search Volume and Trend
          </h3>
          <div className={styles.chartSub}>{topKeywordNote}</div>
          <div className={`${styles.chartWrap} ${styles.topKeywordsChart}`}>
            <canvas ref={topKeywordsRef} data-surface="chart:top-keywords" />
            <div className={emptyCls(hasData.topKeywords)}>No active keywords</div>
          </div>
        </div>

        <div className={`${styles.chartCard} ${styles.wide}`}>
          <h3
            className={`${styles.chartTitle} ${styles.tip}`}
            data-tip="Combined search volume per cluster, sorted descending; color shows relative share of the filtered total"
          >
            Cluster volume
          </h3>
          <div className={styles.chartSub}>
            Combined search volume by cluster across {datasets.clusterEntries.length} cluster
            {datasets.clusterEntries.length === 1 ? "" : "s"}.
          </div>
          <div className={styles.chartWrap}>
            <canvas ref={clusterVolumeRef} data-surface="chart:cluster-volume" />
            <div className={emptyCls(hasData.clusterVolume)}>No data</div>
          </div>
        </div>

        <div className={styles.chartPair}>
          <div className={styles.chartCard}>
            <h3
              className={`${styles.chartTitle} ${styles.tip}`}
              data-tip="Each bubble is a keyword: X = keyword difficulty (0–100), Y = search volume, bubble size = CPC, color = commercial intent (blue = low, red = high)"
            >
              Volume vs Keyword Difficulty
            </h3>
            <div className={styles.chartWrap}>
              <canvas ref={bubbleRef} data-surface="chart:bubble" />
              <div className={emptyCls(hasData.bubble)}>No data</div>
            </div>
          </div>
          <div className={styles.chartCard}>
            <h3
              className={`${styles.chartTitle} ${styles.tip}`}
              data-tip="Each point is a keyword: X = competition (0–1), Y = opportunity score (0–100). Points in the top-left quadrant are attractive low-competition opportunities."
            >
              Competition vs Opportunity Score
            </h3>
            <div className={styles.chartWrap}>
              <canvas ref={scatterRef} data-surface="chart:scatter" />
              <div className={emptyCls(hasData.scatter)}>No data</div>
            </div>
          </div>
        </div>

        <div className={`${styles.chartCard} ${styles.wide}`}>
          <h3
            className={`${styles.chartTitle} ${styles.tip}`}
            data-tip="Relative share of filtered volume per cluster, laid out as a treemap"
          >
            Cluster volume treemap
          </h3>
          <div className={styles.chartWrap}>
            <canvas ref={treemapRef} data-surface="chart:treemap" />
            <div className={emptyCls(hasData.treemap)}>No data</div>
          </div>
        </div>
      </section>
  );

  return (
    <div
      ref={rootRef}
      className={styles.chartPanelsRoot}
      data-surface="surface:chart-panels"
      aria-label={`Keyword charts${marketCode === "all" ? "" : " · " + marketCode}`}
    >
      {chartError && (
        <div className={styles.banner} role="alert">
          <span>Some charts could not be rendered. Reload the page to try again.</span>
        </div>
      )}
      {children({ seedPerformance, overviewSignals, historyPanel, analysisCharts })}
    </div>
  );
}
