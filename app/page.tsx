import { LandingHeroCopy, LandingProcess } from "@/components/landing-sections";
import { RunForm } from "@/components/run-form";

export default function Home() {
  return (
    <main className="landing-page">
      <section className="hero landing-hero">
        <div className="shell hero-grid">
          <LandingHeroCopy />
          <RunForm />
        </div>
      </section>
      <LandingProcess />
    </main>
  );
}
