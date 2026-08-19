import type { Metadata } from "next";

import { ResearchForm } from "@/components/keyword-intelligence/research-form";

export const metadata: Metadata = { title: "Keyword research" };
export const dynamic = "force-dynamic";

export default function KeywordsPage() {
  return (
    <main className="app-canvas history-page">
      <div className="shell">
        <div className="run-title-row app-page-header">
          <div>
            <span className="eyebrow">Keyword research</span>
            <h1>Keyword research</h1>
            <p>Explore the keyword landscape for a market and shortlist the phrases you want to research.</p>
          </div>
        </div>
        <ResearchForm />
      </div>
    </main>
  );
}
