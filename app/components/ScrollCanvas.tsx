"use client";

import { ReactNode } from "react";
import { useScrollSequence } from "../hooks/useScrollSequence";

interface ScrollCanvasProps {
  basePath: string;
  frameCount: number;
  scrollHeight: string;
  children?: (progress: number) => ReactNode;
}

export default function ScrollCanvas({
  basePath,
  frameCount,
  scrollHeight,
  children,
}: ScrollCanvasProps) {
  const { containerRef, canvasRef, progress, imagesLoaded, loadProgress } =
    useScrollSequence({ basePath, frameCount });

  return (
    <div
      ref={containerRef}
      className="scroll-section"
      style={{ height: scrollHeight }}
    >
      <div className="sticky-canvas-wrapper">
        {/* Loading state */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
            <div className="mb-4 text-[clamp(11px,1vw,14px)] font-medium tracking-[0.08em] uppercase text-white/50">
              Loading experience
            </div>
            <div className="loading-bar">
              <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  width: `${loadProgress * 100}%`,
                  background: "linear-gradient(90deg, #48484a, #a1a1a6)",
                  transition: "width 0.3s ease-out",
                }}
              />
            </div>
            <div className="mt-3 text-[clamp(11px,1vw,14px)] text-white/50">
              {Math.round(loadProgress * 100)}%
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-label="Interactive 3D product showcase"
          style={{
            opacity: imagesLoaded ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
        />

        {/* Vignette — always on top of canvas, below text */}
        {imagesLoaded && <div className="canvas-vignette" />}

        {/* Text overlay children */}
        {imagesLoaded && children && children(progress)}
      </div>
    </div>
  );
}
