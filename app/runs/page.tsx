import type { Metadata } from "next";
import Link from "next/link";

import { RunHistory } from "@/components/run-history";

export const metadata: Metadata = { title: "My runs" };
export const dynamic = "force-dynamic";

export default function RunsPage() {
  return (
    <main className="history-page">
      <div className="shell">
        <div className="run-title-row">
          <div>
            <span className="eyebrow">Account workspace</span>
            <h1>My runs</h1>
            <p>Open any active or completed store discovery run.</p>
          </div>
          <Link className="button button-primary" href="/">New discovery</Link>
        </div>
        <RunHistory />
      </div>
    </main>
  );
}
