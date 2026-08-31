import type { Metadata } from "next";

import { AppHeader } from "@/components/app-header";

import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "StoreSignal — Shopify lead intelligence",
    template: "%s · StoreSignal",
  },
  description:
    "Find relevant Shopify stores, uncover ways to reach them, and build a prospect list backed by evidence.",
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
