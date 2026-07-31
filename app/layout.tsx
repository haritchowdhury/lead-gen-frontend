import type { Metadata } from "next";

import { AppHeader } from "@/components/app-header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "StoreSignal — Shopify lead intelligence",
    template: "%s · StoreSignal",
  },
  description:
    "Discover, qualify, and export high-intent Shopify store leads.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}

