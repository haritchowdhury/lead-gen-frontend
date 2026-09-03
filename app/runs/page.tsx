import type { Metadata } from "next";
import Link from "next/link";

import { RunHistory } from "@/components/run-history";
import { SectionIntro } from "@/components/section-intro";

export const metadata: Metadata = { title: "My searches" };
export const dynamic = "force-dynamic";

export default function RunsPage() {
  return (
    <main className="app-canvas history-page">
      <div className="shell">
        <div className="run-title-row app-page-header">
          <SectionIntro
            eyebrow="Account workspace"
            title="Return to the searches you already started."
            copy="Continue keyword research or open the leads from an earlier market."
          />
          <Link className="ds-button ds-button--primary" href="/">New discovery</Link>
        </div>
        <RunHistory />
      </div>
    </main>
  );
}
