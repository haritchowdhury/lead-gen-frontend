"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ApiRequestError,
  createKeywordResearch,
  errorMessage,
} from "@/lib/client-api";
import {
  parseKeywordSeedText,
  validateSeedsInput,
} from "@/lib/keyword-intelligence-validation";
import type { ResearchView } from "@/lib/keyword-intelligence-types";

import styles from "./keyword-dashboard.module.css";

const MAX_SEEDS = 5;
const MAX_SEED_LENGTH = 100;

export function ResearchForm({
  onCreated,
}: {
  onCreated?: (view: ResearchView) => void;
}) {
  const router = useRouter();
  const [seeds, setSeeds] = useState<string[]>([]);
  const [manualInput, setManualInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [authRequired, setAuthRequired] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validation = validateSeedsInput({ seeds });
  const canSubmit = validation.ok;

  function addManualSeeds() {
    const lines = parseKeywordSeedText(manualInput);
    if (!lines.length) return;
    for (const line of lines) {
      if ([...line].length > MAX_SEED_LENGTH) {
        setError("Each seed phrase must be 1-100 characters after normalization.");
        return;
      }
    }
    const next = [...seeds];
    for (const line of lines) {
      const exists = next.some(
        (seed) => seed.toLocaleLowerCase("en-US") === line.toLocaleLowerCase("en-US"),
      );
      if (exists) continue;
      if (next.length >= MAX_SEEDS) {
        setError("You can add up to five seed phrases.");
        return;
      }
      next.push(line);
    }
    if (next.length === seeds.length) {
      setError("That phrase is already selected.");
      return;
    }
    setSeeds(next);
    setManualInput("");
    setError(null);
  }

  function removeSeed(seed: string) {
    setSeeds(seeds.filter((item) => item !== seed));
    setError(null);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const input = validateSeedsInput({ seeds });
    if (!input.ok) {
      setError(input.error);
      return;
    }
    setError(null);
    setAuthRequired(false);
    setIsSubmitting(true);
    try {
      const view = await createKeywordResearch(input.seeds);
      if (onCreated) {
        onCreated(view);
      } else {
        router.push(`/keywords/${view.id}`);
      }
    } catch (requestError) {
      if (requestError instanceof ApiRequestError && requestError.status === 401) {
        setAuthRequired(true);
      } else {
        setError(errorMessage(requestError));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="seed-phrase-form"
      data-surface="surface:research-form"
      className={styles.seedCard}
      onSubmit={submit}
      aria-busy={isSubmitting}
    >
      <div className={styles.seedCardHead}>
        <div>
          <div className={styles.dialogEyebrow}>Build your research set</div>
          <h2>Which seed phrases and keywords do you want to explore?</h2>
        </div>
        <span className={styles.seedStep}>01</span>
      </div>

      <div className={styles.seedFieldLabel}>
        <span>Your selected phrases</span>
        <small>Add, update, or remove</small>
      </div>

      <div id="seed-chip-field" className={styles.seedChipField} aria-live="polite">
        {seeds.length === 0 ? (
          <div className={styles.seedEmpty}>
            Select a suggested keyword below or add a phrase manually.
          </div>
        ) : (
          seeds.map((seed) => (
            <span className={styles.researchChip} key={seed}>
              {seed}
              <button
                type="button"
                className={styles.chipDelete}
                title={`Remove ${seed}`}
                aria-label={`Remove ${seed}`}
                onClick={() => removeSeed(seed)}
              >
                ×
              </button>
            </span>
          ))
        )}
      </div>

      <div className={styles.manualKeywordRow}>
        <input
          className={styles.manualKeywordInput}
          type="text"
          autoComplete="off"
          value={manualInput}
          onChange={(event) => {
            setManualInput(event.target.value);
            setError(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addManualSeeds();
            }
          }}
          placeholder="Add a seed phrase…"
          aria-label="Seed phrase"
          aria-describedby="seed-market-note"
        />
        <button className={styles.btn} type="button" onClick={addManualSeeds}>
          ＋ Add
        </button>
      </div>

      {authRequired && (
        <div className={styles.banner} role="alert">
          <span>You need to sign in to start keyword research.</span>
          <Link className={styles.btn} href="/sign-in">
            Sign in
          </Link>
        </div>
      )}

      {!authRequired && error && (
        <div className={styles.banner} role="alert">
          <span>{error}</span>
        </div>
      )}

      <div className={styles.seedFormMeta}>
        <span id="seed-market-note">
          Suggestions selected below appear here automatically.
        </span>
        <strong id="seed-chip-count">{seeds.length}/5 seeds</strong>
      </div>

      <div className={styles.seedFormFooter}>
        <p>Add up to five seed phrases to start a new research run.</p>
        <button
          className={`${styles.btn} ${styles.primary}`}
          type="submit"
          disabled={isSubmitting || !canSubmit}
        >
          {isSubmitting ? "Building your research…" : "Review my keywords →"}
        </button>
      </div>
    </form>
  );
}
