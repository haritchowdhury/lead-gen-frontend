import type { RunStatus } from "@/lib/api-types";
import { stageLabel, stagePercent } from "@/lib/stages";

type RunProgressProps = {
  run: RunStatus;
};

function formatDuration(start: string | null, end: string | null): string {
  if (!start) return "Not started";
  const seconds = Math.max(
    0,
    Math.floor(
      ((end ? new Date(end) : new Date()).getTime() - new Date(start).getTime()) /
        1000,
    ),
  );
  if (seconds < 60) return `${seconds}s elapsed`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s elapsed`;
}

export function RunProgress({ run }: RunProgressProps) {
  const percent = stagePercent(run.stage, run.state);
  const active = run.state === "queued" || run.state === "running";
  const isQueryPreparation =
    run.phase === "query_planning" || run.phase === "query_review";
  const storesAnalyzed =
    run.progress.storesQualified +
    run.progress.storesRejected +
    run.progress.storeProcessingFailures;
  const trafficState = trafficProgressState(run);

  return (
    <section
      className={`progress-card state-${run.state} ${isQueryPreparation ? "progress-card-query" : "progress-card-pipeline"}`}
    >
      <div className="progress-head">
        <div className="progress-stage">
          <span className={`state-indicator ${active ? "is-active" : ""}`} />
          <div>
            <span className="eyebrow">
              {isQueryPreparation
                ? "Preparing your search plan"
                : "Current stage"}
            </span>
            <h2>{stageLabel(run.stage)}</h2>
          </div>
        </div>
        <div className="progress-state">
          <span>{run.state}</span>
          <small>{formatDuration(run.startedAt, run.completedAt)}</small>
        </div>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Run progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <span style={{ width: `${percent}%` }} />
      </div>

      {isQueryPreparation ? (
        <div className="progress-metrics progress-metrics-query">
          <ProgressCount
            value={run.progress.shopTypesProcessed}
            total={run.progress.shopTypesTotal}
            label="Categories researched"
          />
          <ProgressCount
            value={run.progress.queryCandidatesGenerated}
            label="Search ideas created"
          />
          <ProgressCount
            value={run.progress.queryCandidatesValidated}
            label="Ideas checked"
          />
          <ProgressCount
            value={run.progress.queriesSelected}
            label="Searches ready"
          />
        </div>
      ) : (
        <div className="progress-metrics progress-metrics-pipeline">
          <ProgressCount
            value={run.progress.queriesProcessed}
            total={run.progress.queriesTotal}
            label="Searches processed"
          />
          <ProgressCount
            value={run.progress.storesDiscovered}
            label="Stores discovered"
          />
          <ProgressCount
            value={storesAnalyzed}
            total={run.progress.storesDiscovered || undefined}
            label="Contacts analyzed"
          />
          <div className={`progress-metric-state traffic-${trafficState.tone}`}>
            <strong>{trafficState.label}</strong>
            <span>Traffic analysis</span>
          </div>
        </div>
      )}
    </section>
  );
}

function ProgressCount({
  value,
  total,
  label,
}: {
  value: number;
  total?: number;
  label: string;
}) {
  return (
    <div>
      <strong>
        {value.toLocaleString()}
        {total !== undefined && <small>/{total.toLocaleString()}</small>}
      </strong>
      <span>{label}</span>
    </div>
  );
}

function trafficProgressState(run: RunStatus): {
  label: "Waiting" | "Analyzing" | "Complete" | "Stopped";
  tone: "waiting" | "active" | "complete" | "stopped";
} {
  if (run.state === "failed" || run.state === "cancelled") {
    return { label: "Stopped", tone: "stopped" };
  }
  if (run.stage === "enriching_traffic") {
    return { label: "Analyzing", tone: "active" };
  }
  if (run.stage === "writing_results" || run.state === "completed") {
    return { label: "Complete", tone: "complete" };
  }
  return { label: "Waiting", tone: "waiting" };
}
