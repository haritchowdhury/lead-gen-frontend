"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { SectionIntro } from "@/components/section-intro";
import type { SearchContinuationResponse } from "@/lib/api-types";
import { parseSearchContinuationResponse } from "@/lib/api-validation";
import { ApiRequestError, apiRequest, errorMessage } from "@/lib/client-api";

export function RunContinuation() {
  const router = useRouter();
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  const claim = useCallback(async () => {
    setError(null);
    try {
      const continuation = await apiRequest<SearchContinuationResponse>("/api/run-intents/claim", {
        method: "POST",
      }, parseSearchContinuationResponse);
      if (continuation.kind === "keyword_research") {
        router.replace(`/keywords/${encodeURIComponent(continuation.research.id)}`);
      } else {
        router.replace(`/runs/${encodeURIComponent(continuation.run.runId)}`);
      }
    } catch (claimError) {
      if (
        claimError instanceof ApiRequestError &&
        ["RUN_INTENT_NOT_FOUND", "KEYWORD_RESEARCH_INTENT_NOT_FOUND"].includes(
          claimError.code,
        )
      ) {
        router.replace("/");
        return;
      }
      setError(errorMessage(claimError));
    }
  }, [router]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void claim();
  }, [claim, retry]);

  function retryClaim() {
    started.current = false;
    setRetry((value) => value + 1);
  }

  return (
    <main className="app-canvas auth-page">
      <section className="auth-card continuation-card ds-card" aria-live="polite">
        <span className="continuation-spinner" aria-hidden="true" />
        <SectionIntro
          eyebrow="Preparing run"
          title="Your search is being prepared."
          copy="Continue when the next step is ready."
        />
        {error && (
          <div className="continuation-actions">
            <button className="ds-button ds-button--primary" onClick={retryClaim}>Try again</button>
            <Link className="ds-button ds-button--secondary" href="/runs">My runs</Link>
          </div>
        )}
      </section>
    </main>
  );
}
