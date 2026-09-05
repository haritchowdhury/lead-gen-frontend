"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth/client";

export function HeaderAuth({ signedIn }: { signedIn: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  if (!signedIn) {
    return <Link className="header-link header-link-primary" href="/sign-in">Sign in</Link>;
  }

  async function signOut() {
    setPending(true);
    try {
      await authClient.signOut();
      router.replace("/");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <nav className="header-auth" aria-label="Account">
      <Link className="header-link" href="/leads">My leads</Link>
      <Link className="header-link" href="/runs">My runs</Link>
      <button className="header-link" type="button" disabled={pending} onClick={signOut}>
        {pending ? "Signing out…" : "Sign out"}
      </button>
    </nav>
  );
}
