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

  return (
    <section className={`progress-card state-${run.state}`}>
      <div className="progress-head">
        <div className="progress-stage">
          <span className={`state-indicator ${active ? "is-active" : ""}`} />
          <div>
            <span className="eyebrow">Current stage</span>
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

      <div className="progress-metrics">
        <div>
          <strong>
            {run.progress.shopTypesProcessed}
            <small>/{run.progress.shopTypesTotal}</small>
          </strong>
          <span>Categories researched</span>
        </div>
        <div>
          <strong>{run.progress.queriesSelected}</strong>
          <span>Searches selected</span>
        </div>
        <div>
          <strong>{run.progress.storesDiscovered}</strong>
          <span>Stores discovered</span>
        </div>
        <div>
          <strong>{run.progress.outputRows}</strong>
          <span>Lead records</span>
        </div>
      </div>
    </section>
  );
}

