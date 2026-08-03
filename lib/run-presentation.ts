import type { RunStatus } from "./api-types.ts";

export type TrafficProgressState = {
  label: "Waiting" | "Analyzing" | "Complete" | "Stopped";
  tone: "waiting" | "active" | "complete" | "stopped";
};

export function runStateLabel(state: RunStatus["state"]): string {
  if (state === "awaiting_query_confirmation") return "Review ready";
  return state[0].toUpperCase() + state.slice(1);
}

export function runStateTone(state: RunStatus["state"]): string {
  if (state === "completed") return "ds-badge--positive";
  if (state === "failed" || state === "cancelled") return "ds-badge--danger";
  if (state === "awaiting_query_confirmation") return "ds-badge--warning";
  return "ds-badge--neutral";
}

export function trafficProgressState(run: RunStatus): TrafficProgressState {
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
