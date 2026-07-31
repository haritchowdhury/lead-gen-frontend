import Link from "next/link";

import { StoreIcon } from "@/components/icons";

export function AppHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="StoreSignal home">
          <span className="brand-mark">
            <StoreIcon />
          </span>
          <span>StoreSignal</span>
        </Link>
        <div className="header-meta">
          <span className="signal-dot" />
          Shopify lead intelligence
        </div>
      </div>
    </header>
  );
}

