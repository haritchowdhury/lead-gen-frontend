import type { Metadata } from "next";
import Link from "next/link";
import { LiveLeadsWorkspace } from "@/components/leads/live-leads-workspace";
import { SectionIntro } from "@/components/section-intro";

export const metadata: Metadata = { title: "My leads" };
export const dynamic = "force-dynamic";

export default function LeadsPage() {
  return <main className="app-canvas run-page run-page-completed"><div className="shell">
    <div className="run-title-row app-page-header"><SectionIntro eyebrow="Live lead workspace" title="Every shop you have already found, in one place." copy="One live record per store, with the evidence from every discovering run still attached." /><Link className="ds-button ds-button--secondary" href="/runs">View runs</Link></div>
    <LiveLeadsWorkspace />
  </div></main>;
}
