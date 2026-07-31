"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowRightIcon, PlusIcon } from "@/components/icons";
import type { StartRunResponse } from "@/lib/api-types";
import { ApiRequestError, apiRequest, errorMessage } from "@/lib/client-api";
import { parseCategories } from "@/lib/category-validation";

const SUGGESTIONS = ["Clothing", "Eyewear", "Home decor", "Pet supplies"];

export function RunForm() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parsed = useMemo(() => parseCategories(input), [input]);

  function addSuggestion(suggestion: string) {
    const existing = input.trim();
    setInput(existing ? `${existing}\n${suggestion}` : suggestion);
    setError(null);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!parsed.categories.length) {
      setError("Add at least one store category to start.");
      return;
    }
    if (parsed.errors.length) {
      setError(parsed.errors[0]);
      return;
    }

    setIsSubmitting(true);
    try {
      const run = await apiRequest<StartRunResponse>("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopTypes: parsed.categories }),
      });
      router.push(`/runs/${encodeURIComponent(run.runId)}`);
    } catch (requestError) {
      if (
        requestError instanceof ApiRequestError &&
        requestError.code === "AUTHENTICATION_REQUIRED" &&
        requestError.details &&
        typeof requestError.details === "object" &&
        "continueUrl" in requestError.details &&
        requestError.details.continueUrl === "/sign-up"
      ) {
        router.push("/sign-up");
        return;
      }
      if (
        requestError instanceof ApiRequestError &&
        requestError.code === "BACKEND_TIMEOUT"
      ) {
        setError(
          "The start request timed out, so its outcome is unknown. Wait a moment before trying again.",
        );
      } else {
        setError(errorMessage(requestError));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="run-form-card" onSubmit={submit}>
      <div className="form-heading-row">
        <div>
          <span className="eyebrow">New discovery run</span>
          <h2>What kind of stores are you looking for?</h2>
        </div>
        <span className="step-badge">01</span>
      </div>

      <label className="field-label" htmlFor="shop-types">
        Store categories
        <span>One category per line</span>
      </label>
      <div className="textarea-wrap">
        <textarea
          id="shop-types"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setError(null);
          }}
          placeholder={"e.g. Sustainable clothing\nIndependent eyewear\nOrganic baby food"}
          rows={6}
          maxLength={8_200}
          aria-describedby="category-help category-error"
        />
        <span className="category-count">
          {parsed.categories.length}{" "}
          {parsed.categories.length === 1 ? "category" : "categories"}
        </span>
      </div>
      <p className="field-help" id="category-help">
        Be specific. Product-focused categories usually produce stronger stores.
      </p>

      <div className="suggestions" aria-label="Suggested categories">
        <span>Try:</span>
        {SUGGESTIONS.map((suggestion) => (
          <button
            type="button"
            className="suggestion-chip"
            key={suggestion}
            onClick={() => addSuggestion(suggestion)}
          >
            <PlusIcon />
            {suggestion}
          </button>
        ))}
      </div>

      {(error || parsed.errors[0]) && (
        <p className="form-error" id="category-error" role="alert">
          {error ?? parsed.errors[0]}
        </p>
      )}

      <div className="form-footer">
        <p>
          Store research runs in the background. You can safely leave and return
          using the run link.
        </p>
        <button
          className="button button-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Starting run…" : "Find stores"}
          {!isSubmitting && <ArrowRightIcon />}
        </button>
      </div>
    </form>
  );
}
