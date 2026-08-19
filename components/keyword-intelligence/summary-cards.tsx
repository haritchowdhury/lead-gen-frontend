"use client";

import { Fragment } from "react";

import type {
  KeywordRow,
  ResearchResult,
} from "@/lib/keyword-intelligence-types";
import {
  cumulativeVolume,
  currentSummary,
  discoveryLane,
  fmtCpc,
  fmtNum,
  laneLabel,
  projectMarketRow,
} from "@/lib/keyword-intelligence-view-model";

import styles from "./keyword-dashboard.module.css";

type SummaryCardsProps = {
  result: ResearchResult;
  marketCode: string;
};

type DiscoverySegment = {
  type: string;
  count: number;
  volume: number;
};

function isNum(value: unknown): value is number {
  return typeof value === "number" && isFinite(value);
}

function isMarketMissing(row: KeywordRow): boolean {
  return (row as unknown as { _marketMissing?: boolean })._marketMissing === true;
}

function rowMetricFingerprint(row: KeywordRow): string {
  const history = (row.monthlyHistory || [])
    .map((point) => point.searchVolume || 0)
    .join(",");
  return [row.searchVolume || 0, history, row.cpc, row.competition, row.keywordDifficulty].join("|");
}

function buildDiscoverySegments(rows: KeywordRow[]): DiscoverySegment[] {
  const map: Record<string, { count: number; volume: number }> = {};
  for (const row of rows) {
    const type = laneLabel(row.lane || discoveryLane(row));
    const group = map[type] || (map[type] = { count: 0, volume: 0 });
    group.count += 1;
    group.volume += isNum(row.searchVolume) ? row.searchVolume : 0;
  }
  return ["Store / online", "Local store", "Product / category", "Brand / competitor"].map(
    (type) => ({
      type,
      count: map[type] ? map[type].count : 0,
      volume: map[type] ? map[type].volume : 0,
    }),
  );
}

function buildOverlapGroups(rows: KeywordRow[]): KeywordRow[][] {
  const groups: Record<string, KeywordRow[]> = {};
  for (const row of rows) {
    if (!isNum(row.searchVolume) || row.searchVolume <= 0) continue;
    const key = row.clusterId
      ? row.clusterId + "|" + rowMetricFingerprint(row)
      : (row.seed || "") + "|" + row.searchVolume;
    (groups[key] || (groups[key] = [])).push(row);
  }
  return Object.keys(groups)
    .map((key) => {
      const seen: Record<string, boolean> = {};
      return groups[key].filter((row) => {
        const keyword = String(row.keyword || "").toLowerCase();
        if (seen[keyword]) return false;
        seen[keyword] = true;
        return true;
      });
    })
    .filter((group) => group.length >= 2)
    .sort(
      (a, b) =>
        b[0].searchVolume * (b.length - 1) - a[0].searchVolume * (a.length - 1),
    );
}

function OverlapGroup({
  group,
  maxReported,
}: {
  group: KeywordRow[];
  maxReported: number;
}) {
  const volume = group[0].searchVolume;
  const reported = volume * group.length;
  const risk = volume * (group.length - 1);
  const source = group[0].cluster
    ? `Cluster: ${group[0].cluster}`
    : `Seed: ${group[0].seed || "Unknown"}`;
  return (
    <div>
      <div className={styles.warningGroupSummary}>
        <div className={styles.warningCopy}>
          <div className={styles.warningHeading}>
            <strong>
              {fmtNum(volume)} each · {group.length} variants
            </strong>
            <span className={styles.warningRisk}>+{fmtNum(risk)} at risk</span>
          </div>
          <div className={styles.warningSeed}>{source}</div>
        </div>
        <div
          className={styles.warningBarTrack}
          title={`${fmtNum(volume)} likely shared + ${fmtNum(risk)} possibly duplicated`}
        >
          <div
            className={styles.warningBar}
            style={{ width: `${(reported / maxReported) * 100}%` }}
          >
            <div
              className={styles.shared}
              style={{ width: `${100 / group.length}%` }}
            />
            <div
              className={styles.duplicate}
              style={{ width: `${((group.length - 1) / group.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <div className={styles.overlapVariants}>
        {group.map((row, index) => (
          <div className={styles.overlapVariant} key={row.itemId}>
            <span className={styles.variantIndex}>{index + 1}</span>
            <span className={styles.variantKeyword}>{row.keyword || "—"}</span>
            <span className={styles.variantVolume}>{fmtNum(volume)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SummaryCards({ result, marketCode }: SummaryCardsProps) {
  const summary = currentSummary(result, marketCode);
  const marketRows = result.keywords
    .map((row) => projectMarketRow(row, marketCode))
    .filter((row) => !isMarketMissing(row));
  const active = marketRows.filter((row) => row.mergedInto === null);

  const market = result.markets.find((entry) => entry.code === marketCode) ?? null;
  const country = marketCode === "all" ? "cumulative" : market ? market.name : marketCode;

  const funnelStages = [
    {
      label: "Raw collected",
      value: summary.rawItemsCollected,
      note: "API rows",
    },
    {
      label: "With metrics",
      value: summary.itemsWithMetrics,
      note: "usable volume data",
    },
    {
      label: "After intent filter",
      value: summary.itemsWithMetrics - summary.informationalDropped,
      note: `${summary.informationalDropped} informational removed`,
    },
    {
      label: "Unique phrases",
      value: summary.uniquePhrases,
      note: "cross-seed repeats combined",
    },
    {
      label: "Variant groups",
      value: summary.variantGroups || active.length,
      note: `${summary.dedupMerged} rows organised into canonicals`,
    },
    {
      label: "Topic clusters",
      value: summary.clusters,
      note: "non-transitive market topics",
    },
    {
      label: "Recommended",
      value: summary.recommendedKeywords,
      note: "passed score + flags",
    },
  ];

  const volume = cumulativeVolume(marketRows);
  const cpcValues = active.map((row) => row.cpc).filter(isNum);
  const avgCpc = cpcValues.length
    ? cpcValues.reduce((sum, value) => sum + value, 0) / cpcValues.length
    : null;

  const segments = buildDiscoverySegments(active);
  const overlapGroups = buildOverlapGroups(marketRows);
  const sharedVolume = overlapGroups.reduce(
    (sum, group) => sum + group[0].searchVolume,
    0,
  );
  const reportedVolume = overlapGroups.reduce(
    (sum, group) => sum + group[0].searchVolume * group.length,
    0,
  );
  const overlapVolume = reportedVolume - sharedVolume;
  const variantCount = overlapGroups.reduce(
    (sum, group) => sum + group.length,
    0,
  );
  const maxReported = overlapGroups.reduce(
    (max, group) => Math.max(max, group[0].searchVolume * group.length),
    0,
  );

  return (
    <>
      <section className={styles.cards} aria-label="Summary">
        <div className={styles.card}>
          <div
            className={`${styles.cardLabel} ${styles.tip}`}
            data-tip="Total keywords in the dataset, including merged duplicates"
          >
            Total keywords
          </div>
          <div className={styles.cardValue}>{fmtNum(summary.rawItemsCollected)}</div>
        </div>
        <div className={styles.card}>
          <div
            className={`${styles.cardLabel} ${styles.tip}`}
            data-tip="Keywords that were not merged into a duplicate — the canonical research set"
          >
            Active keywords
          </div>
          <div className={styles.cardValue}>{fmtNum(summary.activeKeywords)}</div>
        </div>
        <div className={styles.card}>
          <div
            className={`${styles.cardLabel} ${styles.tip}`}
            data-tip="Active keywords flagged as recommended by the scoring pipeline"
          >
            Recommended
          </div>
          <div className={styles.cardValue}>{fmtNum(summary.recommendedKeywords)}</div>
        </div>
        <div className={styles.card}>
          <div
            className={`${styles.cardLabel} ${styles.tip}`}
            data-tip="Number of keyword clusters present in the filtered set"
          >
            Clusters
          </div>
          <div className={styles.cardValue}>{fmtNum(summary.clusters)}</div>
        </div>
        <div className={styles.card}>
          <div
            className={`${styles.cardLabel} ${styles.tip}`}
            data-tip="Cumulative search volume across every distinct keyword phrase; exact cross-seed repeats are counted once"
          >
            {marketCode === "all" ? "Cumulative search volume" : `${country} search volume`}
          </div>
          <div className={styles.cardValue}>{fmtNum(volume)}</div>
        </div>
        <div className={styles.card}>
          <div
            className={`${styles.cardLabel} ${styles.tip}`}
            data-tip="Average CPC across active keywords that have a CPC value"
          >
            {`Average CPC · ${country}`}
          </div>
          <div className={styles.cardValue}>{fmtCpc(avgCpc)}</div>
        </div>
      </section>

      <section className={styles.overviewPackage} aria-label="Market overview">
        <div className={styles.overviewPackageHead}>
          <h2>Market overview</h2>
          <p>From collection quality to intent, recommendation, opportunity, and risk signals.</p>
        </div>
        <div className={styles.overviewFlow}>
          <div className={`${styles.decisionPanel} ${styles.wide}`}>
            <h2>Collection funnel</h2>
            <div className={styles.panelNote}>
              Shows what survived collection, intent filtering, deduplication, and recommendation.
            </div>
            <div className={styles.funnel}>
              {funnelStages.map((stage, index) => (
                <Fragment key={stage.label}>
                  {index > 0 && <div className={styles.funnelArrow}>→</div>}
                  <div className={styles.funnelStep}>
                    <strong>{fmtNum(stage.value)}</strong>
                    <div>{stage.label}</div>
                    <span>{stage.note}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className={`${styles.decisionPanel} ${styles.discoveryPanel} ${styles.wide}`}>
            <div className={styles.compactPanelHead}>
              <h2>Store-discovery mix</h2>
              <div className={styles.panelNote}>
                Local/store queries, known-brand searches, and product/category demand.
              </div>
            </div>
            <div className={styles.segmentGrid}>
              {segments.map((segment) => (
                <div className={styles.segment} key={segment.type}>
                  <div className={styles.segmentName}>{segment.type}</div>
                  <div className={styles.segmentValue}>{fmtNum(segment.volume)}</div>
                  <div className={styles.segmentSub}>{segment.count} keywords</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.decisionGrid} aria-label="Decision summary">
        <div className={`${styles.decisionPanel} ${styles.wide}`}>
          <h2>Possible volume overlap</h2>
          <div className={styles.panelNote}>
            Variants with the same reported metrics and monthly history are treated as a likely
            shared Google volume bucket. The raw and adjusted totals remain visible.
          </div>
          {overlapGroups.length === 0 ? (
            <div className={styles.panelNote}>
              No identical-volume variant groups in the filtered data.
            </div>
          ) : (
            <>
              <div className={styles.overlapSummary}>
                <div className={`${styles.overlapStat} ${styles.primary}`}>
                  <div className={styles.overlapStatLabel}>Possible double-counted volume</div>
                  <div className={styles.overlapStatValue}>{fmtNum(overlapVolume)}</div>
                  <div className={styles.overlapStatNote}>Extra volume if every variant is added</div>
                </div>
                <div className={styles.overlapStat}>
                  <div className={styles.overlapStatLabel}>Reported across variants</div>
                  <div className={styles.overlapStatValue}>{fmtNum(reportedVolume)}</div>
                  <div className={styles.overlapStatNote}>
                    {variantCount} variants in {overlapGroups.length} groups
                  </div>
                </div>
                <div className={styles.overlapStat}>
                  <div className={styles.overlapStatLabel}>Likely shared-bucket volume</div>
                  <div className={styles.overlapStatValue}>{fmtNum(sharedVolume)}</div>
                  <div className={styles.overlapStatNote}>Counting each group once</div>
                </div>
              </div>
              <div
                className={styles.overlapTotalTrack}
                aria-label="Shared bucket volume versus possible double-counted volume"
              >
                <div
                  className={styles.shared}
                  style={{ width: `${(sharedVolume / reportedVolume) * 100}%` }}
                />
                <div
                  className={styles.duplicate}
                  style={{ width: `${(overlapVolume / reportedVolume) * 100}%` }}
                />
              </div>
              <div className={styles.overlapLegend}>
                <span>
                  <i className={styles.shared} />
                  Likely shared bucket
                </span>
                <span>
                  <i className={styles.duplicate} />
                  Possible double-counted volume
                </span>
              </div>
              <div className={styles.warningList}>
                {overlapGroups.map((group) => (
                  <div
                    className={styles.warningItem}
                    key={group.map((row) => row.itemId).join("|")}
                  >
                    <OverlapGroup group={group} maxReported={maxReported} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
