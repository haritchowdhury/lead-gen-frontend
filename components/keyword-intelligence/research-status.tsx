"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getKeywordResearch } from "@/lib/client-api";
import type {
  ResearchProgressStage,
  ResearchView,
  StageCounts,
} from "@/lib/keyword-intelligence-types";
import {
  isTerminalResearchState,
  nextPollDelay,
} from "@/lib/keyword-intelligence-view-model";
import styles from "./keyword-dashboard.module.css";

const INITIAL_POLL_DELAY = 2000;

const STAGE_ORDER: readonly ResearchProgressStage[] = [
  "queued",
  "expansion",
  "anchor_screen",
  "market_overview",
  "finalizing",
  "completed",
  "failed",
];

const STAGE_LABELS: Record<ResearchProgressStage, string> = {
  queued: "Queued",
  expansion: "Expansion",
  anchor_screen: "Anchor screen",
  market_overview: "Market overview",
  finalizing: "Finalizing",
  completed: "Completed",
  failed: "Failed",
};

const STAGE_GROUPS = [
  { key: "expansion", label: "Expansion" },
  { key: "anchorScreen", label: "Anchor screen" },
  { key: "marketOverview", label: "Market overview" },
] as const;

type ResearchStatusProps = {
  researchId: string;
  initialView: ResearchView;
  onTerminal: (view: ResearchView) => void;
};

export function ResearchStatus({ researchId, initialView, onTerminal }: ResearchStatusProps) {
  const [view, setView] = useState<ResearchView>(initialView);
  const [retryNotice, setRetryNotice] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortedRef = useRef(false);
  const terminalDoneRef = useRef(false);
  const onTerminalRef = useRef(onTerminal);
  const pollRef = useRef<(delayMs: number) => void>(() => {});

  useEffect(() => {
    onTerminalRef.current = onTerminal;
  }, [onTerminal]);

  const stopTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback((delayMs: number) => {
    timeoutRef.current = setTimeout(() => {
      pollRef.current(delayMs);
    }, delayMs);
  }, []);

  const finishTerminal = useCallback(
    (next: ResearchView) => {
      if (terminalDoneRef.current) return;
      terminalDoneRef.current = true;
      stopTimer();
      onTerminalRef.current(next);
    },
    [stopTimer],
  );

  useEffect(() => {
    pollRef.current = (delayMs: number) => {
      if (abortedRef.current) return;
      void getKeywordResearch(researchId)
        .then((next) => {
          if (abortedRef.current) return;
          setView(next);
          setRetryNotice(false);
          if (isTerminalResearchState(next.state)) {
            finishTerminal(next);
            return;
          }
          scheduleNext(nextPollDelay(delayMs));
        })
        .catch(() => {
          if (abortedRef.current) return;
          setRetryNotice(true);
          scheduleNext(nextPollDelay(delayMs));
        });
    };
  }, [researchId, scheduleNext, finishTerminal]);

  useEffect(() => {
    abortedRef.current = false;
    terminalDoneRef.current = false;
    scheduleNext(INITIAL_POLL_DELAY);
    return () => {
      abortedRef.current = true;
      stopTimer();
    };
  }, [scheduleNext, stopTimer]);

  const retry = useCallback(() => {
    if (abortedRef.current) return;
    void getKeywordResearch(researchId)
      .then((next) => {
        if (abortedRef.current) return;
        setView(next);
        setRetryNotice(false);
        if (isTerminalResearchState(next.state)) {
          finishTerminal(next);
        }
      })
      .catch(() => {
        if (abortedRef.current) return;
        setRetryNotice(true);
      });
  }, [researchId, finishTerminal]);

  const stage = view.progress.stage;
  const busy = view.state === "queued" || view.state === "running";

  return (
    <section
      className={`${styles.kiDashboard} progress-card ds-card state-${view.state}`}
      aria-busy={busy}
      aria-live="polite"
    >
      <div className="progress-head">
        <div className="progress-stage">
          <span className="state-indicator is-active" />
          <div>
            <span className="eyebrow">Research status</span>
            <h2>{STAGE_LABELS[stage]}</h2>
          </div>
        </div>
      </div>

      <ol aria-label="Research stages">
        {STAGE_ORDER.map((s) => (
          <li key={s} aria-current={s === stage ? "step" : undefined}>
            {STAGE_LABELS[s]}
          </li>
        ))}
      </ol>

      <div className="progress-metrics progress-metrics-pipeline">
        {STAGE_GROUPS.map((group) => (
          <StageCountsRow
            key={group.key}
            label={group.label}
            counts={view.progress[group.key]}
          />
        ))}
      </div>

      {retryNotice && (
        <div className="inline-error" role="status">
          <span>Still checking — connection issue.</span>
          <button type="button" onClick={retry}>
            Check again
          </button>
        </div>
      )}

      {view.state === "failed" && view.safeError && (
        <div
          className="error-banner ds-notice ds-notice--danger"
          role="alert"
          data-code={view.safeError.code}
        >
          {view.safeError.message}
        </div>
      )}
    </section>
  );
}

function StageCountsRow({ label, counts }: { label: string; counts: StageCounts }) {
  return (
    <div className="progress-count">
      <strong>{label}</strong>
      <span>Expected: {counts.expected}</span>
      <span>Succeeded: {counts.succeeded}</span>
      <span>Skipped: {counts.skipped}</span>
      <span>Failed: {counts.failed}</span>
    </div>
  );
}
