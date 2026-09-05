import Link from "next/link";

import { StoreIcon } from "@/components/icons";
import { HeaderAuth } from "@/components/header-auth";
import { sessionUserId } from "@/lib/auth/server";

function isNextDynamicBailout(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    error.digest === "DYNAMIC_SERVER_USAGE"
  );
}

export async function AppHeader() {
  let signedIn = false;
  try {
    signedIn = Boolean(await sessionUserId());
  } catch (error) {
    if (isNextDynamicBailout(error)) throw error;
    signedIn = false;
  }
  return (
    <header className="site-header" data-auth-state={signedIn ? "signed-in" : "signed-out"}>
      <Link className="brand" href="/" aria-label="StoreSignal home">
        <span className="brand-mark" aria-hidden="true">
          <StoreIcon />
        </span>
        <span>StoreSignal</span>
      </Link>
      <nav className="site-nav" aria-label="Product navigation">
        <Link href="/#how-it-works">How it works</Link>
        <Link href="/#intelligence">What you get</Link>
        <Link href="/#use-cases">Use cases</Link>
        <Link href="/#faq">FAQ</Link>
      </nav>
      <div className="header-actions">
        <HeaderAuth signedIn={signedIn} />
      </div>
    </header>
  );
}
