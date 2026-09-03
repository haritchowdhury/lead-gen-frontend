import type { Metadata } from "next";

import { ResearchForm } from "@/components/keyword-intelligence/research-form";
import { SectionIntro } from "@/components/section-intro";

export const metadata: Metadata = { title: "Keyword research" };
export const dynamic = "force-dynamic";

export default function KeywordsPage() {
  return (
    <main className="app-canvas history-page">
      <div className="shell">
        <div className="run-title-row app-page-header">
          <SectionIntro
            eyebrow="Keyword research"
            title="See the phrases a market actually uses."
            copy="Start from seed phrases. Finish with a shortlist you are willing to search."
          />
        </div>
        <ResearchForm />
      </div>
    </main>
  );
}
