"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type { StartRunResponse } from "@/lib/api-types";
import { parseStartRunResponse } from "@/lib/api-validation";
import { ApiRequestError, apiRequest, errorMessage } from "@/lib/client-api";

export function RunContinuation() {
  const router = useRouter();
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  const claim = useCallback(async () => {
    setError(null);
    try {
      const run = await apiRequest<StartRunResponse>("/api/run-intents/claim", {
        method: "POST",
      }, parseStartRunResponse);
      router.replace(`/runs/${encodeURIComponent(run.runId)}`);
    } catch (claimError) {
      if (
        claimError instanceof ApiRequestError &&
        claimError.code === "RUN_INTENT_NOT_FOUND"
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
    <main className="auth-page">
      <section className="auth-card continuation-card">
        <span className="continuation-spinner" aria-hidden="true" />
        <span className="eyebrow">Preparing your run</span>
        <h1>{error ? "We could not continue yet" : "Starting your saved search…"}</h1>
        <p>
          {error ?? "Your account is ready. We are attaching the pending search and creating its run page."}
        </p>
        {error && (
          <div className="continuation-actions">
            <button className="button button-primary" onClick={retryClaim}>Try again</button>
            <Link className="button button-secondary" href="/runs">My runs</Link>
          </div>
        )}
      </section>
    </main>
  );
}
