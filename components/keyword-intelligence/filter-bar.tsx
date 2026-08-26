"use client";

import type {
  filterOptionSources,
  KeywordFilterState,
} from "@/lib/keyword-intelligence-view-model";
import type { KeywordLane } from "@/lib/keyword-intelligence-types";
import { laneLabel } from "@/lib/keyword-intelligence-view-model";

import styles from "./keyword-dashboard.module.css";

const MARKET_CODES = ["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"] as const;

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
  return FLAG_META[flag] ?? { label: flag, tip: "Quality flag applied by the pipeline" };
}

function intentLabel(intent: string): string {
  return intent.charAt(0).toUpperCase() + intent.slice(1);
}

type FilterBarProps = {
  filter: KeywordFilterState;
  options: ReturnType<typeof filterOptionSources>;
  onChange: (patch: Partial<KeywordFilterState>) => void;
  onReset: () => void;
};

export function FilterBar({ filter, options, onChange, onReset }: FilterBarProps) {
  return (
    <section className={styles.filters} aria-label="Global filters">
      <div className={styles.filterRow}>
        <label className={styles.filter}>
          <span
            className={styles.tip}
            data-tip="Switch every metric, chart, score, and recommendation between cumulative demand and one country"
          >
            Market
          </span>
          <select
            data-filter="market"
            value={filter.market}
            onChange={(event) => onChange({ market: event.target.value, page: 1 })}
          >
            <option value="all">All markets — cumulative</option>
            {MARKET_CODES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span
            className={styles.tip}
            data-tip="Filter to a single seed keyword group (e.g. Clothing, Fashion, Dresses, Suits, Skirts)"
          >
            Seed
          </span>
          <select
            data-filter="seed"
            value={filter.seed}
            onChange={(event) => onChange({ seed: event.target.value, page: 1 })}
          >
            <option value="">All</option>
            {options.seeds.map((seed) => (
              <option key={seed} value={seed}>
                {seed}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span className={styles.tip} data-tip="Filter to a single keyword cluster">
            Cluster
          </span>
          <select
            data-filter="clusterId"
            value={filter.clusterId}
            onChange={(event) => onChange({ clusterId: event.target.value, page: 1 })}
          >
            <option value="">All</option>
            {options.clusters.map((clusterId) => (
              <option key={clusterId} value={clusterId}>
                {clusterId}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span
            className={styles.tip}
            data-tip="Filter by search intent: commercial, transactional, navigational or informational"
          >
            Intent
          </span>
          <select
            data-filter="intent"
            value={filter.intent}
            onChange={(event) => onChange({ intent: event.target.value, page: 1 })}
          >
            <option value="">All</option>
            {options.intents.map((intent) => (
              <option key={intent} value={intent}>
                {intentLabel(intent)}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span
            className={styles.tip}
            data-tip="Filter by the role the query plays in retail discovery"
          >
            Lane
          </span>
          <select
            data-filter="lane"
            value={filter.lane}
            onChange={(event) => onChange({ lane: event.target.value, page: 1 })}
          >
            <option value="">All</option>
            {options.lanes.map((lane) => (
              <option key={lane} value={lane}>
                {laneLabel(lane as KeywordLane)}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span className={styles.tip} data-tip="Filter by extracted apparel category">
            Category
          </span>
          <select
            data-filter="category"
            value={filter.category}
            onChange={(event) => onChange({ category: event.target.value, page: 1 })}
          >
            <option value="">All</option>
            {options.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span className={styles.tip} data-tip="Filter by extracted shopper audience">
            Audience
          </span>
          <select
            data-filter="audience"
            value={filter.audience}
            onChange={(event) => onChange({ audience: event.target.value, page: 1 })}
          >
            <option value="">All</option>
            {options.audiences.map((audience) => (
              <option key={audience} value={audience}>
                {audience}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span className={styles.tip} data-tip="Filter by online, store, or local channel">
            Channel
          </span>
          <select
            data-filter="channel"
            value={filter.channel}
            onChange={(event) => onChange({ channel: event.target.value, page: 1 })}
          >
            <option value="">All</option>
            {options.channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span
            className={styles.tip}
            data-tip="Only show keywords with a search volume at or above this value"
          >
            Min volume
          </span>
          <input
            type="number"
            data-filter="minVolume"
            min={0}
            step={1000}
            placeholder="0"
            value={filter.minVolume === 0 ? "" : String(filter.minVolume)}
            onChange={(event) =>
              onChange({
                minVolume: parseInt(event.target.value, 10) || 0,
                page: 1,
              })
            }
          />
        </label>

        <label className={styles.filter}>
          <span
            className={styles.tip}
            data-tip="Only show keywords with an opportunity score at or above this value (0–100)"
          >
            Min opportunity
          </span>
          <input
            type="number"
            data-filter="minOpportunity"
            min={0}
            max={100}
            step={5}
            placeholder="0"
            value={filter.minOpportunity === 0 ? "" : String(filter.minOpportunity)}
            onChange={(event) =>
              onChange({
                minOpportunity: parseInt(event.target.value, 10) || 0,
                page: 1,
              })
            }
          />
        </label>

        <label className={styles.filter}>
          <span className={styles.tip} data-tip="Show only recommended keywords">
            Recommended
          </span>
          <select
            data-filter="recommended"
            value={filter.recommended}
            onChange={(event) =>
              onChange({
                recommended: event.target.value as "" | "true" | "false",
                page: 1,
              })
            }
          >
            <option value="">Any</option>
            <option value="true">Recommended only</option>
            <option value="false">Exclude recommended</option>
          </select>
        </label>

        <div className={`${styles.filter} ${styles.flagsFilter}`}>
          <span className={styles.tip} data-tip="Show keywords carrying any of the selected flags">
            Flags
          </span>
          <div className={styles.flagGroup} data-filter="flags">
            {options.flags.length === 0 ? (
              <span className={styles.seedEmpty}>No flags in the dataset</span>
            ) : (
              options.flags.map((flag) => {
                const meta = flagMeta(flag);
                return (
                  <label key={flag} title={meta.tip}>
                    <input
                      type="checkbox"
                      value={flag}
                      checked={filter.flags.includes(flag)}
                      onChange={() => {
                        const next = filter.flags.includes(flag)
                          ? filter.flags.filter((item) => item !== flag)
                          : [...filter.flags, flag];
                        onChange({ flags: next, page: 1 });
                      }}
                    />
                    {meta.label}
                  </label>
                );
              })
            )}
          </div>
        </div>

        <label className={`${styles.filter} ${styles.grow}`}>
          <span
            className={styles.tip}
            data-tip="Free-text search across keyword, seed, cluster, intent and flags"
          >
            Search
          </span>
          <input
            type="search"
            data-filter="search"
            value={filter.search}
            placeholder="Search keywords…"
            onChange={(event) => onChange({ search: event.target.value, page: 1 })}
          />
        </label>

        <button
          type="button"
          className={styles.btn}
          data-filter="reset"
          data-tip="Clear every filter and restore the full dataset"
          onClick={onReset}
        >
          Reset filters
        </button>
      </div>
    </section>
  );
}
