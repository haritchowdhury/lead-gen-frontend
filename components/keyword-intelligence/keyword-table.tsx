"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import type { KeywordRow } from "@/lib/keyword-intelligence-types";
import type { KeywordFilterState } from "@/lib/keyword-intelligence-view-model";
import {
  discoveryLane,
  fmtCpc,
  fmtNum,
  fmtPct,
  fmtSlope,
  laneLabel,
  paginate,
  sortKeywordRows,
} from "@/lib/keyword-intelligence-view-model";

import styles from "./keyword-dashboard.module.css";

const HVOL = 500000;
const HCI = 0.8;

const PAGE_SIZES = [10, 25, 50, 100];

const TABLE_COLS = [
  { key: "keyword", label: "Keyword", type: "string", tip: "The keyword phrase" },
  { key: "seed", label: "Seed", type: "string", tip: "Seed keyword group it was gathered from" },
  { key: "cluster", label: "Cluster", type: "string", tip: "Semantic cluster assigned by the pipeline" },
  { key: "lane", label: "Lane", type: "string", tip: "Category, store, local, or brand/competitor demand" },
  { key: "searchVolume", label: "Volume", type: "number", tip: "Monthly search volume" },
  { key: "cpc", label: "CPC", type: "number", tip: "Average cost-per-click in USD" },
  { key: "competition", label: "Competition", type: "number", tip: "Ad competition, 0–1" },
  { key: "keywordDifficulty", label: "Difficulty", type: "number", tip: "Keyword difficulty, 0–100" },
  { key: "mainIntent", label: "Intent", type: "string", tip: "Dominant search intent label" },
  { key: "commercialIntent", label: "Comm. intent", type: "number", tip: "Commercial intent strength, 0–1" },
  { key: "trendSlope", label: "Trend", type: "number", tip: "Seasonality-adjusted momentum — green is rising, red is declining" },
  { key: "opportunityScore", label: "Opportunity", type: "number", tip: "Opportunity score, 0–100" },
  { key: "flags", label: "Flags", type: "string", tip: "Quality flags: declining, too broad, low traffic" },
  { key: "recommended", label: "Recommendation", type: "boolean", tip: "Whether the pipeline recommends targeting this keyword" },
] as const;

const FLAG_META: Record<string, { label: string; cls: string; tip: string }> = {
  declining_traffic: {
    label: "Declining",
    cls: "flagDeclining",
    tip: "Seasonality-adjusted momentum is below the declining threshold",
  },
  too_broad: {
    label: "Too broad",
    cls: "flagBroad",
    tip: "Short, high-volume keyword that is too generic to target",
  },
  too_little_traffic: {
    label: "Low traffic",
    cls: "flagLow",
    tip: "Search volume too low to be worth targeting",
  },
  brand_competitor: {
    label: "Brand / competitor",
    cls: "flagBroad",
    tip: "Useful competitor demand, separated from unbranded targeting recommendations",
  },
  informational_dropped: {
    label: "Informational",
    cls: "flagLow",
    tip: "Dropped from the pipeline as informational intent",
  },
  manually_added: {
    label: "New",
    cls: "rec",
    tip: "Added manually from the keyword workspace",
  },
};

type TableCol = (typeof TABLE_COLS)[number];

type KeywordTableProps = {
  rows: KeywordRow[];
  filter: KeywordFilterState;
  selectionItemIds: ReadonlySet<string>;
  onToggleRow: (row: KeywordRow) => void;
};

function isNum(value: unknown): value is number {
  return typeof value === "number" && isFinite(value);
}

function asNumOrNaN(value: unknown): number {
  return isNum(value) ? value : NaN;
}

function cellValue(row: KeywordRow, key: string): unknown {
  return (row as unknown as Record<string, unknown>)[key];
}

function flagMeta(flag: string): { label: string; cls: string; tip: string } {
  return (
    FLAG_META[flag] ?? {
      label: flag,
      cls: "flagLow",
      tip: "Quality flag applied by the pipeline",
    }
  );
}

function isHighVolumeCommercial(row: KeywordRow): boolean {
  return (
    row.searchVolume != null &&
    row.searchVolume >= HVOL &&
    row.commercialIntent != null &&
    row.commercialIntent >= HCI
  );
}

function TrendCell({ row }: { row: KeywordRow }) {
  if (!isNum(row.trendSlope)) return <span className={styles.mono}>—</span>;
  const slope = row.trendSlope;
  const tone =
    slope > 0 ? styles.trendUp : slope < 0 ? styles.trendDown : styles.trendFlat;
  const glyph = slope > 0 ? "▲" : slope < 0 ? "▼" : "•";
  const title = `Trend momentum: ${fmtSlope(slope)}${
    slope > 0 ? " (rising demand)" : slope < 0 ? " (declining demand)" : " (flat)"
  }`;
  return (
    <span className={`${styles.mono} ${tone}`} title={title}>
      {glyph} {fmtSlope(slope)}
    </span>
  );
}

function FlagsCell({ row }: { row: KeywordRow }) {
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "4px" }}>
      {(row.flags || []).map((flag) => {
        const meta = flagMeta(flag);
        const badgeClass = (styles as Record<string, string>)[meta.cls] ?? "";
        return (
          <span
            key={flag}
            className={`${styles.badge} ${badgeClass}`}
            title={meta.tip}
          >
            {meta.label}
          </span>
        );
      })}
    </span>
  );
}

function renderCell(row: KeywordRow, col: TableCol): ReactNode {
  const value = cellValue(row, col.key);
  switch (col.key) {
    case "searchVolume":
      return fmtNum(asNumOrNaN(value));
    case "cpc":
      return fmtCpc(value as number | null);
    case "competition":
      return fmtPct(asNumOrNaN(value));
    case "keywordDifficulty":
      return isNum(value) ? value : "—";
    case "mainIntent":
      return value
        ? String(value).charAt(0).toUpperCase() + String(value).slice(1)
        : "—";
    case "commercialIntent":
      return fmtPct(asNumOrNaN(value));
    case "trendSlope":
      return <TrendCell row={row} />;
    case "opportunityScore":
      return isNum(value) ? value : "—";
    case "flags":
      return <FlagsCell row={row} />;
    case "recommended":
      return (
        <span className={`${styles.badge} ${row.recommended ? styles.rec : styles.no}`}>
          {row.recommended ? "Recommended" : "Rejected"}
        </span>
      );
    case "cluster":
      return row.cluster || "—";
    case "lane":
      return laneLabel(row.lane || discoveryLane(row));
    default:
      return value == null ? "—" : String(value);
  }
}

export function KeywordTable({
  rows,
  filter,
  selectionItemIds,
  onToggleRow,
}: KeywordTableProps) {
  const [sortKey, setSortKey] = useState(filter.sortKey);
  const [sortDir, setSortDir] = useState(filter.sortDir);
  const [page, setPage] = useState(filter.page);
  const [pageSize, setPageSize] = useState(filter.pageSize);

  const sorted = sortKeywordRows(rows, sortKey, sortDir);
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const clampedPage = Math.min(Math.max(1, page), pageCount);
  const pageRows = paginate(sorted, page, pageSize);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      const col = TABLE_COLS.find((c) => c.key === key);
      setSortKey(key);
      setSortDir(col && col.type === "number" ? "desc" : "asc");
    }
  }

  return (
    <section className={styles.tableSection} aria-label="Keyword table">
      <div className={styles.sectionHead}>
        <div>
          <h2
            className={styles.tip}
            data-tip="Active keywords only (merged duplicates are excluded). Select rows to edit your keyword set."
          >
            Keyword workspace
          </h2>
          <div className={styles.tableMeta}>
            <span>
              {total} row{total === 1 ? "" : "s"}
            </span>
            {" · Use the first column to add or remove keywords from the form"}
          </div>
        </div>
      </div>

      <div className={styles.tableScroll}>
        <table>
          <thead>
            <tr>
              <th className={styles.selectCol} />
              {TABLE_COLS.map((col) => {
                const active = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    className={`${
                      col.type === "number" ? styles.num : ""
                    } ${styles.tip} ${active ? styles.sorted : ""}`.trim()}
                    data-tip={col.tip}
                    aria-sort={
                      active ? (sortDir === "desc" ? "descending" : "ascending") : "none"
                    }
                    onClick={() => handleSort(col.key)}
                  >
                    <span>{col.label}</span>
                    <span className={styles.arrow}>
                      {active ? (sortDir === "desc" ? "▼" : "▲") : ""}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {total === 0 ? (
              <tr>
                <td
                  colSpan={TABLE_COLS.length + 1}
                  style={{ textAlign: "center", color: "var(--muted)", padding: "24px" }}
                >
                  No keywords match the current filters.
                </td>
              </tr>
            ) : (
              pageRows.map((row) => {
                const isSelected = selectionItemIds.has(row.itemId);
                const isHlVol = isHighVolumeCommercial(row);
                return (
                  <tr
                    key={row.itemId}
                    className={`${isSelected ? styles.isSelected : ""} ${
                      isHlVol ? styles.hlVol : ""
                    }`.trim() || undefined}
                  >
                    <td className={styles.selectCol}>
                      <input
                        type="checkbox"
                        className={styles.rowCheck}
                        checked={isSelected}
                        aria-label={`Select ${row.keyword}`}
                        onChange={() => onToggleRow(row)}
                      />
                    </td>
                    {TABLE_COLS.map((col) => (
                      <td
                        key={col.key}
                        className={`${col.type === "number" ? styles.num : ""} ${
                          col.key === "keyword" ? styles.kwCell : ""
                        }`.trim() || undefined}
                        title={col.key === "keyword" ? row.keyword : undefined}
                      >
                        {renderCell(row, col)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.pageInfo}>
          Page {clampedPage} of {pageCount}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label
            className={styles.tip}
            data-tip="Rows per page"
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Rows
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(parseInt(event.target.value, 10) || 25);
                setPage(1);
              }}
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setPage(clampedPage - 1)}
            disabled={clampedPage <= 1}
          >
            Prev
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setPage(clampedPage + 1)}
            disabled={clampedPage >= pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
