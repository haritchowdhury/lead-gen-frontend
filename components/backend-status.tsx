"use client";

import { useEffect, useState } from "react";

type Health = "checking" | "online" | "offline";

export function BackendStatus() {
  const [health, setHealth] = useState<Health>("checking");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/health", { cache: "no-store", signal: controller.signal })
      .then((response) => setHealth(response.ok ? "online" : "offline"))
      .catch((error: unknown) => {
        if ((error as { name?: string }).name !== "AbortError") setHealth("offline");
      });
    return () => controller.abort();
  }, []);

  return (
    <span className={`health-chip health-${health}`}>
      <span className="health-dot" />
      {health === "checking"
        ? "Checking lead service"
        : health === "online"
          ? "Lead service online"
          : "Lead service unavailable"}
    </span>
  );
}

