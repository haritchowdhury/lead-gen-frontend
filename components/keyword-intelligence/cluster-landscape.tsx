"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

import type { ClusterLaneCounts, ClusterRow, KeywordLane } from "@/lib/keyword-intelligence-types";
import { fmtCpc, fmtNum, fmtPct, laneLabel } from "@/lib/keyword-intelligence-view-model";

import styles from "./keyword-dashboard.module.css";
import { SectionIntro } from "@/components/section-intro";

const CLUSTER_COLORS = [
  "#6366f1",
  "#f59e0b",
  "#22c55e",
  "#ef4444",
  "#06b6d4",
  "#a855f7",
  "#ec4899",
  "#84cc16",
  "#f97316",
  "#14b8a6",
  "#3b82f6",
  "#8b5cf6",
];

type ClusterLandscapeProps = {
  clusters: ClusterRow[];
  selectedClusterId: string | null;
  onSelect: (clusterId: string | null) => void;
};

type SceneNode = {
  x: number;
  y: number;
  radius: number;
  clusterId: string;
  cluster: ClusterRow;
};

type DragState = {
  active: boolean;
  moved: boolean;
  startX: number;
  startAngle: number;
  pinchDistance?: number;
  pinchZoom: number;
};

function isNum(value: unknown): value is number {
  return typeof value === "number" && isFinite(value);
}

function escapeHTML(value: unknown): string {
  return String(value).replace(/[&<>'"]/g, (ch) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch] as string;
  });
}

function truncate(value: unknown, n: number): string {
  const s = String(value == null ? "" : value);
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function hexToRgb(h: string): number[] {
  let m = String(h).replace("#", "");
  if (m.length === 3) m = m.split("").map((c) => c + c).join("");
  const parsed = parseInt(m, 16);
  return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255];
}

function rgba(h: string, a: number): string {
  let c: number[];
  if (String(h).indexOf("rgb(") === 0) {
    c = String(h).slice(4, -1).split(",").map((x) => parseInt(x, 10));
  } else {
    c = hexToRgb(h);
  }
  return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
}

function cssVar(root: HTMLElement, name: string): string {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

function palette(root: HTMLElement) {
  return {
    text: cssVar(root, "--c-text") || "#0f172a",
    muted: cssVar(root, "--c-muted") || "#64748b",
    grid: cssVar(root, "--c-grid") || "#e2e8f0",
    primary: cssVar(root, "--c-primary") || "#6366f1",
    green: cssVar(root, "--c-green") || "#16a34a",
    red: cssVar(root, "--c-red") || "#dc2626",
    amber: cssVar(root, "--c-amber") || "#d97706",
    gray: cssVar(root, "--c-muted") || "#64748b",
  };
}

export function ClusterLandscape({ clusters, selectedClusterId, onSelect }: ClusterLandscapeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const pillTooltipRef = useRef<HTMLDivElement | null>(null);
  const legendRef = useRef<HTMLDivElement | null>(null);
  const zoomOutRef = useRef<HTMLButtonElement | null>(null);
  const zoomInRef = useRef<HTMLButtonElement | null>(null);
  const resetRef = useRef<HTMLButtonElement | null>(null);

  const azimuthRef = useRef(-0.45);
  const zoomRef = useRef(1);
  const dragRef = useRef<DragState>({ active: false, moved: false, startX: 0, startAngle: 0, pinchZoom: 1 });
  const pointersRef = useRef<Record<number, { x: number; y: number }>>({});
  const nodesRef = useRef<SceneNode[]>([]);
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  const rows = useMemo(() => clusters.slice().sort((a, b) => b.combinedVolume - a.combinedVolume), [clusters]);
  const totalKeywordPoints = useMemo(() => clusters.reduce((sum, c) => sum + c.keywords.length, 0), [clusters]);
  const landscapeVolume = rows.reduce((sum, c) => sum + c.combinedVolume, 0);
  const selected = clusters.find((c) => c.clusterId === selectedClusterId) ?? null;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    if (!canvas || !scene) return;
    const rect = scene.getBoundingClientRect();
    const width = Math.max(520, Math.round(rect.width));
    const height = Math.max(360, Math.round(rect.height));
    if (width <= 0 || height <= 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const colors = palette(scene);

    const cameraZoom = 1;
    const cameraFocus = { x: width * 0.5, y: height * 0.5 };
    ctx.save();
    ctx.translate(cameraFocus.x, cameraFocus.y);
    ctx.scale(cameraZoom, cameraZoom);
    ctx.translate(-cameraFocus.x, -cameraFocus.y);
    const azimuth = azimuthRef.current;
    const viewZoom = zoomRef.current;
    const cosA = Math.cos(azimuth);
    const sinA = Math.sin(azimuth);
    const planeWidth = width * 0.68 * viewZoom;
    const planeDepth = height * 0.31 * viewZoom;
    const vertical = height * 0.46 * viewZoom;
    const groundCenter = { x: width * 0.5, y: height * 0.67 };
    const viewDepth = (x: number, depth: number) => {
      const wx = x - 0.5;
      const wd = depth - 0.5;
      return -sinA * wx + cosA * wd;
    };
    const project = (x: number, depth: number, z: number) => {
      const wx = x - 0.5;
      const wd = depth - 0.5;
      const horizontal = cosA * wx + sinA * wd;
      const receding = viewDepth(x, depth);
      return { x: groundCenter.x + planeWidth * horizontal, y: groundCenter.y + planeDepth * receding - vertical * z };
    };

    const maxVolume =
      Math.max.apply(
        null,
        rows.map((c) => (isNum(c.combinedVolume) ? c.combinedVolume : 0)),
      ) || 1;
    const colorByCluster: Record<string, string> = {};
    rows.forEach((c, i) => {
      colorByCluster[c.clusterId] = CLUSTER_COLORS[i % CLUSTER_COLORS.length];
    });
    const nodes: SceneNode[] = [];

    const p00 = project(0, 0, 0);
    const p10 = project(1, 0, 0);
    const p11 = project(1, 1, 0);
    const p01 = project(0, 1, 0);
    const planeFill = ctx.createLinearGradient(p00.x, p00.y, p01.x, p01.y);
    planeFill.addColorStop(0, rgba(colors.primary, 0.035));
    planeFill.addColorStop(1, rgba(colors.primary, 0.11));
    ctx.fillStyle = planeFill;
    ctx.beginPath();
    ctx.moveTo(p00.x, p00.y);
    ctx.lineTo(p10.x, p10.y);
    ctx.lineTo(p11.x, p11.y);
    ctx.lineTo(p01.x, p01.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = rgba(colors.primary, 0.3);
    ctx.lineWidth = 0.8;
    ctx.stroke();
    for (let gx = 0; gx <= 4; gx++) {
      const x0 = project(gx / 4, 0, 0);
      const x1 = project(gx / 4, 1, 0);
      ctx.strokeStyle = rgba(colors.primary, gx === 0 || gx === 4 ? 0.28 : 0.14);
      ctx.lineWidth = gx === 0 || gx === 4 ? 0.8 : 0.55;
      ctx.beginPath();
      ctx.moveTo(x0.x, x0.y);
      ctx.lineTo(x1.x, x1.y);
      ctx.stroke();
    }
    for (let gd = 0; gd <= 4; gd++) {
      const d0 = project(0, gd / 4, 0);
      const d1 = project(1, gd / 4, 0);
      ctx.strokeStyle = rgba(colors.primary, gd === 0 || gd === 4 ? 0.28 : 0.14);
      ctx.lineWidth = gd === 0 || gd === 4 ? 0.8 : 0.55;
      ctx.beginPath();
      ctx.moveTo(d0.x, d0.y);
      ctx.lineTo(d1.x, d1.y);
      ctx.stroke();
    }

    const plotted = rows
      .map((c) => {
        const nx = Math.max(0, Math.min(1, (isNum(c.opportunityScore) ? c.opportunityScore : 0) / 100));
        const nd = Math.max(0, Math.min(1, isNum(c.trendScore) ? c.trendScore : 0));
        const volume = isNum(c.combinedVolume) ? c.combinedVolume : 0;
        const volumeNorm = volume > 0 ? Math.log(volume + 1) / Math.log(maxVolume + 1) : 0;
        const nz = volumeNorm * 0.86;
        const top = project(nx, nd, nz);
        const ground = project(nx, nd, 0);
        return {
          cluster: c,
          top,
          ground,
          depth: nd,
          viewDepth: viewDepth(nx, nd),
          volume,
          volumeNorm,
          radius: (3 + volumeNorm * 6) * 1,
          color: colorByCluster[c.clusterId] || colors.muted,
        };
      })
      .sort((a, b) => a.viewDepth - b.viewDepth);

    plotted.forEach((point) => {
      ctx.strokeStyle = rgba(point.color, selectedClusterId && selectedClusterId !== point.cluster.clusterId ? 0.04 : 0.2);
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(point.ground.x, point.ground.y);
      ctx.lineTo(point.top.x, point.top.y);
      ctx.stroke();
      ctx.fillStyle = rgba(point.color, 0.1);
      ctx.beginPath();
      ctx.ellipse(point.ground.x, point.ground.y, point.radius * 0.9, Math.max(1.2, point.radius * 0.22), 0, 0, Math.PI * 2);
      ctx.fill();
    });

    plotted.forEach((point) => {
      const top = point.top;
      const radius = point.radius;
      const color = point.color;
      const glow = ctx.createRadialGradient(top.x - radius * 0.3, top.y - radius * 0.35, 2, top.x, top.y, radius);
      glow.addColorStop(0, "#ffffff");
      glow.addColorStop(0.18, color);
      glow.addColorStop(1, rgba(color, 0.42));
      ctx.globalAlpha = selectedClusterId && selectedClusterId !== point.cluster.clusterId ? 0.22 : 0.92;
      ctx.fillStyle = glow;
      ctx.strokeStyle = point.cluster.recommendedForStoreDiscovery ? colors.green : rgba(color, 0.85);
      ctx.lineWidth = point.cluster.recommendedForStoreDiscovery ? 2 : 1;
      ctx.beginPath();
      ctx.arc(top.x, top.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;
      nodes.push({ x: top.x, y: top.y, radius: Math.max(8, radius + 3), clusterId: point.cluster.clusterId, cluster: point.cluster });
    });
    ctx.restore();

    const axisOrigin = { x: width - 142, y: height - 34 };
    ctx.lineWidth = 1.25;
    const axisVector = (from: { x: number; y: number }, to: { x: number; y: number }, length: number): [number, number] => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const magnitude = Math.sqrt(dx * dx + dy * dy) || 1;
      return [dx / magnitude * length, dy / magnitude * length];
    };
    const axisBaseWorld = project(0, 0, 0);
    const xAxis = axisVector(axisBaseWorld, project(1, 0, 0), 90);
    const dAxis = axisVector(axisBaseWorld, project(0, 1, 0), 62);
    (
      [
        [xAxis[0], xAxis[1], "Opportunity", colors.primary],
        [dAxis[0], dAxis[1], "Trend", colors.amber],
        [0, -62, "Volume", colors.green],
      ] as [number, number, string, string][]
    ).forEach((axis) => {
      const ex = axisOrigin.x + axis[0];
      const ey = axisOrigin.y + axis[1];
      ctx.strokeStyle = rgba(axis[3], 0.78);
      ctx.fillStyle = axis[3];
      ctx.beginPath();
      ctx.moveTo(axisOrigin.x, axisOrigin.y);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      const angle = Math.atan2(axis[1], axis[0]);
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 6 * Math.cos(angle - 0.45), ey - 6 * Math.sin(angle - 0.45));
      ctx.lineTo(ex - 6 * Math.cos(angle + 0.45), ey - 6 * Math.sin(angle + 0.45));
      ctx.closePath();
      ctx.fill();
      ctx.font = "10px system-ui, sans-serif";
      ctx.fillStyle = colors.muted;
      ctx.fillText(axis[2], ex + (axis[0] ? 4 : -18), ey + (axis[1] ? -5 : 13));
    });

    nodesRef.current = nodes;
  }, [rows, selectedClusterId]);

  const drawRef = useRef<() => void>(() => {});
  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  const hasClusters = clusters.length > 0;

  useEffect(() => {
    if (!hasClusters) return;
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    const tooltip = tooltipRef.current;
    const zoomOut = zoomOutRef.current;
    const zoomIn = zoomInRef.current;
    const reset = resetRef.current;
    if (!canvas || !scene || !tooltip) return;

    drawRef.current();

    const pointerValues = () => Object.keys(pointersRef.current).map((id) => pointersRef.current[Number(id)]);
    const pointerDistance = (pts: { x: number; y: number }[]) => {
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      return Math.sqrt(dx * dx + dy * dy);
    };
    const hit = (clientX: number, clientY: number) => {
      const bounds = canvas.getBoundingClientRect();
      const displayX = clientX - bounds.left;
      const displayY = clientY - bounds.top;
      return nodesRef.current
        .slice()
        .reverse()
        .find((n) => {
          const dx = displayX - n.x;
          const dy = displayY - n.y;
          return dx * dx + dy * dy <= n.radius * n.radius;
        });
    };

    const onPointerDown = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId);
      pointersRef.current[event.pointerId] = { x: event.clientX, y: event.clientY };
      const pts = pointerValues();
      dragRef.current.active = true;
      dragRef.current.moved = false;
      if (pts.length >= 2) {
        dragRef.current.pinchDistance = pointerDistance(pts);
        dragRef.current.pinchZoom = zoomRef.current;
      } else {
        dragRef.current.startX = event.clientX;
        dragRef.current.startAngle = azimuthRef.current;
      }
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointersRef.current[event.pointerId]) return;
      pointersRef.current[event.pointerId] = { x: event.clientX, y: event.clientY };
      const pts = pointerValues();
      if (pts.length >= 2) {
        const distance = pointerDistance(pts);
        if (Math.abs(distance - (dragRef.current.pinchDistance || 0)) > 2) dragRef.current.moved = true;
        zoomRef.current = Math.max(0.55, Math.min(1.8, dragRef.current.pinchZoom * distance / Math.max(1, dragRef.current.pinchDistance || 1)));
      } else {
        const dx = event.clientX - dragRef.current.startX;
        if (Math.abs(dx) > 2) dragRef.current.moved = true;
        const width = Math.max(520, Math.round(scene.getBoundingClientRect().width));
        azimuthRef.current = dragRef.current.startAngle + dx / Math.max(320, width) * Math.PI * 2;
      }
      tooltip.classList.add(styles.hidden);
      drawRef.current();
    };

    const releasePointer = (event: PointerEvent) => {
      delete pointersRef.current[event.pointerId];
      const pts = pointerValues();
      if (!pts.length) {
        dragRef.current.active = false;
        canvas.style.cursor = "grab";
      } else if (pts.length === 1) {
        dragRef.current.startX = pts[0].x;
        dragRef.current.startAngle = azimuthRef.current;
        delete dragRef.current.pinchDistance;
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      releasePointer(event);
      if (dragRef.current.moved) {
        dragRef.current.moved = false;
        return;
      }
      const node = hit(event.clientX, event.clientY);
      if (node) onSelectRef.current(node.clusterId);
      else onSelectRef.current(null);
    };

    const onPointerCancel = (event: PointerEvent) => {
      releasePointer(event);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomRef.current = Math.max(0.55, Math.min(1.8, zoomRef.current * Math.exp(-event.deltaY * 0.0012)));
      drawRef.current();
    };

    const onDblClick = () => {
      azimuthRef.current = -0.45;
      zoomRef.current = 1;
      drawRef.current();
    };

    const onMouseMove = (event: MouseEvent) => {
      if (dragRef.current.active) {
        tooltip.classList.add(styles.hidden);
        return;
      }
      const node = hit(event.clientX, event.clientY);
      canvas.style.cursor = node ? "pointer" : "grab";
      tooltip.classList.toggle(styles.hidden, !node);
      if (!node) return;
      const rect = scene.getBoundingClientRect();
      const width = Math.max(520, Math.round(rect.width));
      const height = Math.max(360, Math.round(rect.height));
      const c = node.cluster;
      tooltip.innerHTML =
        "<strong>" +
        escapeHTML(c.cluster) +
        "</strong>Cluster: " +
        escapeHTML(c.cluster) +
        "<br>" +
        c.keywords.length +
        " keywords · " +
        fmtNum(c.combinedVolume) +
        " search volume<br>Opportunity " +
        Math.round(c.opportunityScore || 0) +
        " · Trend " +
        fmtPct(c.trendScore) +
        " · CPC " +
        fmtCpc(c.avgCpc) +
        "<br>" +
        (c.recommendedForStoreDiscovery ? "Recommended" : "Not recommended");
      tooltip.style.left = Math.min(width - 240, Math.max(8, event.offsetX + 14)) + "px";
      tooltip.style.top = Math.min(height - 90, Math.max(8, event.offsetY + 14)) + "px";
    };

    const onMouseLeave = () => {
      tooltip.classList.add(styles.hidden);
    };

    const onZoomOut = () => {
      zoomRef.current = Math.max(0.55, zoomRef.current / 1.2);
      drawRef.current();
    };
    const onZoomIn = () => {
      zoomRef.current = Math.min(1.8, zoomRef.current * 1.2);
      drawRef.current();
    };
    const onReset = () => {
      azimuthRef.current = -0.45;
      zoomRef.current = 1;
      drawRef.current();
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("dblclick", onDblClick);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    zoomOut?.addEventListener("click", onZoomOut);
    zoomIn?.addEventListener("click", onZoomIn);
    reset?.addEventListener("click", onReset);

    const resizeObserver = new ResizeObserver(() => {
      drawRef.current();
    });
    resizeObserver.observe(scene);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("dblclick", onDblClick);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      zoomOut?.removeEventListener("click", onZoomOut);
      zoomIn?.removeEventListener("click", onZoomIn);
      reset?.removeEventListener("click", onReset);
      resizeObserver.disconnect();
    };
  }, [hasClusters]);

  const showPillTooltip = (button: HTMLElement) => {
    const tip = pillTooltipRef.current;
    const detail = button.getAttribute("data-cluster-detail");
    if (!tip || !detail) return;
    tip.textContent = detail;
    tip.classList.remove(styles.hidden);
    const rect = button.getBoundingClientRect();
    const width = tip.offsetWidth;
    const height = tip.offsetHeight;
    const left = Math.max(12, Math.min(window.innerWidth - width - 12, rect.left + rect.width / 2 - width / 2));
    let top = rect.top - height - 10;
    if (top < 12) top = Math.min(window.innerHeight - height - 12, rect.bottom + 10);
    tip.style.left = left + "px";
    tip.style.top = Math.max(12, top) + "px";
  };

  const hidePillTooltip = () => {
    const tip = pillTooltipRef.current;
    if (tip) tip.classList.add(styles.hidden);
  };

  const selectedDetail = selected
    ? (() => {
        const laneCopy = Object.keys(selected.laneCounts || {})
          .map((k) => laneLabel(k as KeywordLane) + " " + (selected.laneCounts[k as keyof ClusterLaneCounts] ?? 0))
          .join(" · ");
        const tokenCounts: Record<string, number> = {};
        selected.keywords.forEach((kw) => {
          const seen: Record<string, boolean> = {};
          (String(kw || "").toLowerCase().match(/[a-z0-9]+/g) || []).forEach((t) => {
            if (["a", "an", "the", "for", "and", "of", "with", "to", "in", "on"].indexOf(t) === -1 && !seen[t]) {
              tokenCounts[t] = (tokenCounts[t] || 0) + 1;
              seen[t] = true;
            }
          });
        });
        const threshold = Math.max(1, Math.ceil(selected.keywords.length / 2));
        const shared = Object.keys(tokenCounts)
          .filter((t) => tokenCounts[t] >= threshold)
          .sort((a, b) => tokenCounts[b] - tokenCounts[a]);
        return {
          shared,
          laneCopy,
          overlapNote:
            selected.combinedVolume > selected.adjustedClusterVolume
              ? " · " + fmtNum(selected.combinedVolume - selected.adjustedClusterVolume) + " possible overlap"
              : "",
        };
      })()
    : null;

  return (
    <section
      className={`${styles.clusterSection} ${styles.clusterHero}`}
      data-surface="surface:cluster-landscape"
      aria-label="Cluster landscape"
    >
      <div className={styles.sectionHead}>
        <SectionIntro
          eyebrow="Clusters"
          title="Related phrases, grouped so you can choose a lane."
          copy="Select a cluster to inspect its volume, CPC, and mix."
        />
        <div className={styles.tableMeta}>
          {rows.length} cluster{rows.length === 1 ? "" : "s"} · {totalKeywordPoints} keyword points
        </div>
      </div>

      {rows.length === 0 ? (
        <div className={styles.seedEmpty}>No clusters match the current filters.</div>
      ) : (
        <div className={styles.clusterSceneLayout}>
          <div className={styles.clusterScene} ref={sceneRef}>
            <canvas ref={canvasRef} data-surface="landscape:cluster-scene" aria-label="Three-dimensional cluster landscape" />
            <div className={styles.clusterViewControls} aria-label="3D view controls">
              <button ref={zoomOutRef} type="button" title="Zoom out">
                −
              </button>
              <button ref={zoomInRef} type="button" title="Zoom in">
                +
              </button>
              <button ref={resetRef} type="button" title="Reset rotation and zoom">
                Reset
              </button>
            </div>
            <div className={styles.clusterAxisKey}>
              <span>Drag · Rotate 360°</span>
              <span>Double-click · Reset view</span>
              <span>X · Opportunity 0–100</span>
              <span>Depth · Trend 0–1</span>
              <span>Height + size · Log search volume</span>
            </div>
            <div ref={tooltipRef} className={`${styles.clusterSceneTooltip} ${styles.hidden}`} role="tooltip"></div>
          </div>

          <div className={styles.clusterListHead}>
            <strong>Clusters</strong>
            <span>Hover or focus a cluster for full details · click to inspect its keywords</span>
          </div>

          <div className={styles.clusterSceneLegend} ref={legendRef} onScroll={hidePillTooltip}>
            {rows.map((c, index) => {
              const share = landscapeVolume ? (c.combinedVolume / landscapeVolume * 100).toFixed(1) : "0";
              const clusterDetail =
                c.cluster +
                "\n" +
                c.keywords.length +
                " keywords · " +
                fmtNum(c.combinedVolume) +
                " search volume · " +
                share +
                "% market share\n" +
                "Opportunity " +
                Math.round(c.opportunityScore || 0) +
                " · Trend " +
                fmtPct(c.trendScore) +
                " · CPC " +
                fmtCpc(c.avgCpc) +
                " · Commercial intent " +
                fmtPct(c.commercialIntent) +
                "\n" +
                (c.recommendedForStoreDiscovery ? "Recommended for this market" : "Not currently recommended");
              return (
                <button
                  key={c.clusterId}
                  type="button"
                  className={`${styles.clusterLegendItem} ${c.clusterId === selectedClusterId ? styles.selected : ""}`}
                  data-cluster-detail={clusterDetail}
                  aria-label={clusterDetail.replace(/\n/g, ". ")}
                  aria-describedby="cluster-pill-tooltip"
                  onMouseEnter={(event) => showPillTooltip(event.currentTarget)}
                  onMouseLeave={hidePillTooltip}
                  onFocus={(event) => showPillTooltip(event.currentTarget)}
                  onBlur={hidePillTooltip}
                  onClick={() => {
                    hidePillTooltip();
                    onSelect(c.clusterId);
                  }}
                >
                  <span className={styles.clusterLegendHead}>
                    <span
                      className={styles.clusterDot}
                      style={{ background: CLUSTER_COLORS[index % CLUSTER_COLORS.length] }}
                    />
                    <span>
                      #{index + 1} {truncate(c.cluster, 28)}
                    </span>
                  </span>
                  <span className={styles.clusterLegendStats}>
                    <span>{fmtNum(c.combinedVolume)} cumulative volume</span>
                    <span>{share}% share</span>
                    <span>Opp. {Math.round(c.opportunityScore || 0)}</span>
                    <span>Trend {fmtPct(c.trendScore)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selected && selectedDetail && (
        <div className={styles.clusterInspector}>
          <div>
            Selected cluster: <strong>{selected.cluster}</strong>
          </div>
          <div className={styles.panelNote}>
            Common words: {(selectedDetail.shared.join(", ") || "none across at least half the members") +
              " · " +
              selected.keywords.length +
              " distinct keywords · " +
              fmtNum(selected.combinedVolume) +
              " cumulative volume" +
              selectedDetail.overlapNote +
              (selectedDetail.laneCopy ? " · " + selectedDetail.laneCopy : "")}
          </div>
          <div className={styles.clusterKeywords}>
            {selected.keywords.map((kw) => (
              <span key={kw} className={styles.chip}>
                {kw}
              </span>
            ))}
          </div>
          {selected.variantGroups.length > 0 && (
            <>
              <div className={styles.panelNote}>
                {selected.variantGroups.length} variant groups · canonical phrase followed by its wording variants
              </div>
              <div className={styles.overlapVariants}>
                {selected.variantGroups.map((group, i) => (
                  <div key={group.variantGroupId} className={styles.overlapVariant}>
                    <span className={styles.variantIndex}>{i + 1}</span>
                    <span className={styles.variantKeyword}>
                      {group.canonical}
                      {group.variants.length > 1
                        ? " → " + group.variants.filter((v) => v !== group.canonical).join(", ")
                        : ""}
                    </span>
                    <span className={styles.variantVolume}>{fmtNum(group.volume)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div ref={pillTooltipRef} id="cluster-pill-tooltip" className={`${styles.clusterPillTooltip} ${styles.hidden}`} role="tooltip"></div>
    </section>
  );
}
