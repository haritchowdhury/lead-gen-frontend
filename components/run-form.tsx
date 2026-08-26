"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowRightIcon, PlusIcon } from "@/components/icons";
import {
  ApiRequestError,
  createKeywordResearch,
  errorMessage,
} from "@/lib/client-api";
import {
  parseKeywordSeedText,
  validateSeedsInput,
} from "@/lib/keyword-intelligence-validation";

const SUGGESTIONS = [
  "Clothing",
  "Eyewear",
  "Home decor",
  "Pet supplies",
  "Skincare",
  "Jewelry",
  "Fitness",
  "Baby products",
  "Kitchenware",
];

export function RunForm() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const seeds = useMemo(() => parseKeywordSeedText(input), [input]);
  const validation = useMemo(() => validateSeedsInput({ seeds }), [seeds]);

  function addSuggestion(suggestion: string) {
    const [normalizedSuggestion] = parseKeywordSeedText(suggestion);
    if (!normalizedSuggestion) return;
    if (
      seeds.some(
        (seed) =>
          seed.toLocaleLowerCase("en-US") ===
          normalizedSuggestion.toLocaleLowerCase("en-US"),
      )
    ) {
      setError(null);
      return;
    }
    if (seeds.length >= 5) {
      setError("You can add up to five seed phrases.");
      return;
    }
    setInput([...seeds, normalizedSuggestion].join("\n"));
    setError(null);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!validation.ok) {
      setError(validation.error);
      return;
    }

    setIsSubmitting(true);
    try {
      const view = await createKeywordResearch(validation.seeds);
      router.push(`/keywords/${encodeURIComponent(view.id)}`);
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
          "The research request timed out, so its outcome is unknown. Wait a moment before trying again.",
        );
      } else {
        setError(errorMessage(requestError));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form id="start-discovery" className="run-form-card run-start-form ds-card" onSubmit={submit} aria-busy={isSubmitting}>
      <div className="form-heading-row">
        <div>
          <span className="eyebrow">Start a new search</span>
          <h2>What kind of stores do you want to meet?</h2>
        </div>
        <span className="step-badge">01</span>
      </div>

      <label className="field-label" htmlFor="shop-types">
        Describe your ideal stores
        <span>One seed phrase per line</span>
      </label>
      <div className="textarea-wrap ds-field">
        <textarea
          id="shop-types"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setError(null);
          }}
          placeholder={"e.g. Sustainable clothing\nIndependent eyewear\nOrganic baby food"}
          rows={6}
          maxLength={2004}
          aria-describedby="category-help category-error"
        />
        <span className="category-count">
          {seeds.length} seed {seeds.length === 1 ? "phrase" : "phrases"}
        </span>
      </div>
      <p className="field-help" id="category-help">
        The more focused you are, the stronger your results will be.
      </p>

      <div className="suggestions" aria-label="Suggested categories">
        <span>Need inspiration?</span>
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

      {error && (
        <p className="form-error" id="category-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-footer">
        <p>
          Review keyword opportunities before store discovery begins.
        </p>
        <button
          className="button button-primary ds-button ds-button--primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Building your research…" : "Explore my keywords"}
          {!isSubmitting && <ArrowRightIcon />}
        </button>
      </div>
    </form>
  );
}
