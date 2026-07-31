import Link from "next/link";

import { StoreIcon } from "@/components/icons";
import { HeaderAuth } from "@/components/header-auth";
import { sessionUserId } from "@/lib/auth/server";

export async function AppHeader() {
  let signedIn = false;
  try {
    signedIn = Boolean(await sessionUserId());
  } catch {
    signedIn = false;
  }
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="StoreSignal home">
          <span className="brand-mark">
            <StoreIcon />
          </span>
          <span>StoreSignal</span>
        </Link>
        <div className="header-actions">
          <div className="header-meta">
            <span className="signal-dot" />
            Shopify lead intelligence
          </div>
          <HeaderAuth signedIn={signedIn} />
        </div>
      </div>
    </header>
  );
}
