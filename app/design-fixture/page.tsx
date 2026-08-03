import { notFound } from "next/navigation";

import { RunWorkspace } from "@/components/run-workspace";
import { designFixtureEnabled } from "@/lib/design-fixture-gate";

const SCENARIOS = new Set([
  "query-review",
  "query-planning",
  "runtime",
  "completed",
  "failed",
]);

export default async function DesignSystemFixturePage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string | string[] }>;
}) {
  if (!designFixtureEnabled()) notFound();

  const requestedScenario = (await searchParams).scenario;
  const scenario =
    typeof requestedScenario === "string" && SCENARIOS.has(requestedScenario)
      ? requestedScenario
      : "completed";

  return (
    <div data-design-fixture-surface="production-components" data-fixture-scenario={scenario}>
      <RunWorkspace runId={`run_fixture_${scenario.replaceAll("-", "_")}`} />
    </div>
  );
}
