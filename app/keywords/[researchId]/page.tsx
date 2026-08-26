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
        <ResearchDashboard researchId={researchId} />
      </div>
    </main>
  );
}
