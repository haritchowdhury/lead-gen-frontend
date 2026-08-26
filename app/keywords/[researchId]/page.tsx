import type { Metadata } from "next";

import { ResearchDashboard } from "@/components/keyword-intelligence/research-dashboard";
import styles from "@/components/keyword-intelligence/keyword-dashboard.module.css";

export const metadata: Metadata = { title: "Keyword research dashboard" };
export const dynamic = "force-dynamic";

export default async function KeywordResearchPage({
  params,
}: PageProps<"/keywords/[researchId]">) {
  const { researchId } = await params;

  return (
    <main className={`app-canvas ${styles.dashboardPage}`}>
      <div className="shell">
        <div className={`run-title-row app-page-header ${styles.dashboardPageHeader}`}>
          <div>
            <span className="eyebrow">Keyword research</span>
            <h1>Keyword research dashboard</h1>
            <p>Review the researched keyword landscape and shortlist the phrases you want to run.</p>
          </div>
        </div>
        <ResearchDashboard researchId={researchId} />
      </div>
    </main>
  );
}
