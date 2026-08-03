"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth/client";

type AuthMode = "sign-up" | "sign-in";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isSignUp = mode === "sign-up";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if ((isSignUp && name.length < 2) || !email || password.length < 8) {
      setError(
        isSignUp && name.length < 2
          ? "Enter your name."
          : password.length < 8
            ? "Password must be at least 8 characters."
            : "Enter a valid email address.",
      );
      return;
    }

    setPending(true);
    try {
      const result = isSignUp
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });
      if (result.error) {
        setError(result.error.message || "Authentication could not be completed.");
        return;
      }
      router.replace("/runs/continue");
      router.refresh();
    } catch {
      setError("Authentication is temporarily unavailable. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="app-canvas auth-page">
      <section className="auth-card ds-card ds-card--floating" aria-labelledby="auth-title">
        <header className="auth-card-header">
          <span className="eyebrow">StoreSignal account</span>
          <h1 id="auth-title">{isSignUp ? "Save your search" : "Welcome back"}</h1>
          <p>
            {isSignUp
              ? "Create an account to start the search you just prepared and keep every run in one place."
              : "Sign in to continue your pending search or return to your previous runs."}
          </p>
        </header>
        <form onSubmit={submit} aria-busy={pending}>
          {isSignUp && (
            <label className="ds-field-group">
              <span className="ds-field-label">Name</span>
              <input className="ds-field" name="name" autoComplete="name" required minLength={2} />
            </label>
          )}
          <label className="ds-field-group">
            <span className="ds-field-label">Email</span>
            <input className="ds-field" name="email" type="email" autoComplete="email" required />
          </label>
          <label className="ds-field-group">
            <span className="ds-field-label">Password</span>
            <input
              className="ds-field"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              minLength={8}
            />
          </label>
          {error && <p className="form-error ds-notice ds-notice--danger" role="alert">{error}</p>}
          <button className="ds-button ds-button--primary auth-submit" disabled={pending} aria-busy={pending}>
            {pending
              ? isSignUp ? "Creating account…" : "Signing in…"
              : isSignUp ? "Create account" : "Sign in"}
          </button>
        </form>
        <footer className="auth-card-footer">
          <p className="auth-switch">
          {isSignUp ? "Already have an account?" : "New to StoreSignal?"}{" "}
          <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
            {isSignUp ? "Sign in" : "Create an account"}
          </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}
