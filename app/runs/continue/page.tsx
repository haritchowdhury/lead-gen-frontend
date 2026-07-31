import type { Metadata } from "next";

import { RunContinuation } from "@/components/run-continuation";

export const metadata: Metadata = { title: "Preparing run" };
export const dynamic = "force-dynamic";

export default function ContinueRunPage() {
  return <RunContinuation />;
}
