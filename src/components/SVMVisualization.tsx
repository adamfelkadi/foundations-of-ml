"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  label: 1 | -1;
}

function findSVMBoundary(points: Point[]) {
  if (points.length < 2) return null;
  const pos = points.filter((p) => p.label === 1);
  const neg = points.filter((p) => p.label === -1);
  if (pos.length === 0 || neg.length === 0) return null;

  const posCentroid = {
    x: pos.reduce((s, p) => s + p.x, 0) / pos.length,
    y: pos.reduce((s, p) => s + p.y, 0) / pos.length,
  };
  const negCentroid = {
    x: neg.reduce((s, p) => s + p.x, 0) / neg.length,
    y: neg.reduce((s, p) => s + p.y, 0) / neg.length,
  };

  const midX = (posCentroid.x + negCentroid.x) / 2;
  const midY = (posCentroid.y + negCentroid.y) / 2;
  const dx = posCentroid.x - negCentroid.x;
  const dy = posCentroid.y - negCentroid.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return null;
  const nx = dx / len;
  const ny = dy / len;

  let minPosDist = Infinity;
  let minNegDist = Infinity;
  for (const p of pos) {
    const d = (p.x - midX) * nx + (p.y - midY) * ny;
    minPosDist = Math.min(minPosDist, d);
  }
  for (const p of neg) {
    const d = -((p.x - midX) * nx + (p.y - midY) * ny);
    minNegDist = Math.min(minNegDist, d);
  }
  const margin = Math.min(minPosDist, minNegDist);

  return { midX, midY, nx, ny, margin };
}

export default function SVMVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([
    { x: 80, y: 100, label: 1 },
    { x: 120, y: 80, label: 1 },
    { x: 100, y: 140, label: 1 },
    { x: 300, y: 120, label: -1 },
    { x: 320, y: 80, label: -1 },
    { x: 280, y: 160, label: -1 },
  ]);
  const [currentLabel, setCurrentLabel] = useState<1 | -1>(1);
  const [dragging, setDragging] = useState<number | null>(null);

  const W = 420;
  const H = 280;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#FAF7F2";
    ctx.fillRect(0, 0, W, H);

    const boundary = findSVMBoundary(points);
    if (boundary) {
      const { midX, midY, nx, ny, margin } = boundary;
      const perpX = -ny;
      const perpY = nx;

      ctx.strokeStyle = "#B45309";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(midX + perpX * 500, midY + perpY * 500);
      ctx.lineTo(midX - perpX * 500, midY - perpY * 500);
      ctx.stroke();

      if (margin > 0) {
        ctx.strokeStyle = "#D97706";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        ctx.beginPath();
        ctx.moveTo(
          midX + nx * margin + perpX * 500,
          midY + ny * margin + perpY * 500
        );
        ctx.lineTo(
          midX + nx * margin - perpX * 500,
          midY + ny * margin - perpY * 500
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(
          midX - nx * margin + perpX * 500,
          midY - ny * margin + perpY * 500
        );
        ctx.lineTo(
          midX - nx * margin - perpX * 500,
          midY - ny * margin - perpY * 500
        );
        ctx.stroke();

        ctx.setLineDash([]);

        ctx.fillStyle = "rgba(180, 83, 9, 0.05)";
        ctx.beginPath();
        ctx.moveTo(
          midX + nx * margin + perpX * 500,
          midY + ny * margin + perpY * 500
        );
        ctx.lineTo(
          midX + nx * margin - perpX * 500,
          midY + ny * margin - perpY * 500
        );
        ctx.lineTo(
          midX - nx * margin - perpX * 500,
          midY - ny * margin - perpY * 500
        );
        ctx.lineTo(
          midX - nx * margin + perpX * 500,
          midY - ny * margin + perpY * 500
        );
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#78716C";
        ctx.font = "11px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(
          `margin: ${(margin * 2).toFixed(0)}px`,
          midX,
          midY - 8
        );
      }
    }

    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 1 ? "#0F766E" : "#DC2626";
      ctx.fill();
      ctx.strokeStyle = "#FAF7F2";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [points]);

  useEffect(() => {
    draw();
  }, [draw]);

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hitIdx = points.findIndex(
      (p) => Math.hypot(p.x - x, p.y - y) < 12
    );
    if (hitIdx !== -1) {
      setDragging(hitIdx);
      return;
    }

    setPoints((prev) => [...prev, { x, y, label: currentLabel }]);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (dragging === null) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(W, e.clientX - rect.left));
    const y = Math.max(0, Math.min(H, e.clientY - rect.top));
    setPoints((prev) =>
      prev.map((p, i) => (i === dragging ? { ...p, x, y } : p))
    );
  }

  function handleMouseUp() {
    setDragging(null);
  }

  return (
    <div className="space-y-3">
      <h3 className="font-display text-xl font-medium text-[#1C1917]">
        Interactive: SVM Decision Boundary
      </h3>
      <p className="font-ui text-sm text-[#78716C]">
        Click to add points. Drag existing points to move them. Watch how the
        decision boundary and margin change.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentLabel(1)}
          className={`font-ui rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
            currentLabel === 1
              ? "bg-[#0F766E] text-white"
              : "border border-[#E7E5E4] bg-white text-[#78716C]"
          }`}
        >
          Teal class (+)
        </button>
        <button
          onClick={() => setCurrentLabel(-1)}
          className={`font-ui rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
            currentLabel === -1
              ? "bg-[#DC2626] text-white"
              : "border border-[#E7E5E4] bg-white text-[#78716C]"
          }`}
        >
          Red class (-)
        </button>
        <button
          onClick={() =>
            setPoints([
              { x: 80, y: 100, label: 1 },
              { x: 120, y: 80, label: 1 },
              { x: 100, y: 140, label: 1 },
              { x: 300, y: 120, label: -1 },
              { x: 320, y: 80, label: -1 },
              { x: 280, y: 160, label: -1 },
            ])
          }
          className="font-ui rounded-lg border border-[#E7E5E4] bg-white px-3 py-1.5 text-sm text-[#78716C] hover:text-[#1C1917] transition-colors"
        >
          Reset
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full max-w-[420px] rounded-xl border border-[#E7E5E4] cursor-crosshair"
      />
    </div>
  );
}
