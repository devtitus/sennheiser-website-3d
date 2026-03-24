"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollSequenceOptions {
  basePath: string;
  frameCount: number;
  padLength?: number;
}

export function useScrollSequence({
  basePath,
  frameCount,
  padLength = 3,
}: UseScrollSequenceOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(frameCount);

    const onLoad = () => {
      loadedCount++;
      setLoadProgress(loadedCount / frameCount);
      if (loadedCount === frameCount) {
        imagesRef.current = images;
        setImagesLoaded(true);
        // Draw first frame
        drawFrame(0);
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(padLength, "0");
      img.src = `${basePath}/ezgif-frame-${frameNum}.jpg`;
      img.onload = onLoad;
      img.onerror = onLoad; // Count errors to avoid hanging
      images[i] = img;
    }

    return () => {
      imagesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePath, frameCount, padLength]);

  // Draw a specific frame to canvas
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || !images.length) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const img = images[frameIndex];
      if (!img || !img.complete || !img.naturalWidth) return;

      // Set canvas size to match viewport
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (
        canvas.width !== rect.width * dpr ||
        canvas.height !== rect.height * dpr
      ) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      // Clear and draw, cover-fit the image
      ctx.clearRect(0, 0, rect.width, rect.height);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = rect.width / rect.height;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgRatio > canvasRatio) {
        // Image is wider — fit by height
        drawH = rect.height;
        drawW = drawH * imgRatio;
        drawX = (rect.width - drawW) / 2;
        drawY = 0;
      } else {
        // Image is taller — fit by width
        drawW = rect.width;
        drawH = drawW / imgRatio;
        drawX = 0;
        drawY = (rect.height - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    []
  );

  // Scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollHeight = container.scrollHeight - window.innerHeight;
        const scrolled = -rect.top;
        const rawProgress = Math.max(0, Math.min(1, scrolled / scrollHeight));

        setProgress(rawProgress);

        const frameIndex = Math.min(
          frameCount - 1,
          Math.max(0, Math.floor(rawProgress * (frameCount - 1)))
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [frameCount, drawFrame]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return {
    containerRef,
    canvasRef,
    progress,
    imagesLoaded,
    loadProgress,
  };
}
