import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { RunLoadingSkeleton } from "@/components/run-progress";
import { RunWorkspace } from "@/components/run-workspace";

const RUN_ID_PATTERN = /^run_[A-Za-z0-9_-]{16,80}$/u;

export const metadata: Metadata = {
  title: "Lead discovery run",
};

export const dynamic = "force-dynamic";

export default async function RunPage({
  params,
}: PageProps<"/runs/[runId]">) {
  const { runId } = await params;
  if (!RUN_ID_PATTERN.test(runId)) notFound();

  return (
    <Suspense
      fallback={
        <main className="run-page">
          <RunLoadingSkeleton />
        </main>
      }
    >
      <RunWorkspace runId={runId} />
    </Suspense>
  );
}
