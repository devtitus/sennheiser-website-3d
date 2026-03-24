"use client";

import { ReactNode } from "react";
import { useScrollSequence } from "../hooks/useScrollSequence";

interface ScrollCanvasProps {
  basePath: string;
  frameCount: number;
  scrollHeight: string; // e.g. "500vh"
  children?: (progress: number) => ReactNode;
}

export default function ScrollCanvas({
  basePath,
  frameCount,
  scrollHeight,
  children,
}: ScrollCanvasProps) {
  const { containerRef, canvasRef, progress, imagesLoaded, loadProgress } =
    useScrollSequence({
      basePath,
      frameCount,
    });

  return (
    <div
      ref={containerRef}
      className="scroll-section"
      style={{ height: scrollHeight }}
    >
      <div className="sticky-canvas-wrapper">
        {/* Loading state */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]">
            <div className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-white/30">
              Loading experience
            </div>
            <div className="loading-bar">
              <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  width: `${loadProgress * 100}%`,
                  background:
                    "linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))",
                  transition: "width 0.3s ease-out",
                }}
              />
            </div>
            <div className="mt-3 text-xs text-white/20">
              {Math.round(loadProgress * 100)}%
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{
            opacity: imagesLoaded ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
        />

        {/* Text overlay children */}
        {imagesLoaded && children && children(progress)}
      </div>
    </div>
  );
}
