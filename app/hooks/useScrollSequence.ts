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

  // Draw a specific frame to canvas
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || !images.length) return;

      // Find nearest loaded frame if exact one isn't ready
      let bestIndex = frameIndex;
      if (!images[bestIndex] || !images[bestIndex].complete || !images[bestIndex].naturalWidth) {
        let found = false;
        // Check surrounding frames (expand search outward)
        for (let offset = 1; offset < frameCount; offset++) {
          if (frameIndex - offset >= 0) {
            const i = frameIndex - offset;
            if (images[i] && images[i].complete && images[i].naturalWidth) {
              bestIndex = i;
              found = true;
              break;
            }
          }
          if (frameIndex + offset < frameCount) {
            const i = frameIndex + offset;
            if (images[i] && images[i].complete && images[i].naturalWidth) {
              bestIndex = i;
              found = true;
              break;
            }
          }
        }
      }

      const img = images[bestIndex];
      if (!img || !img.complete || !img.naturalWidth) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

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
    [frameCount]
  );

  // Preload all images using progressive/batched strategy
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = images;

    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (images[index]) return resolve(images[index]);
        const img = new Image();
        const frameNum = String(index + 1).padStart(padLength, "0");
        img.src = `${basePath}/ezgif-frame-${frameNum}.jpg`;
        img.onload = () => {
          images[index] = img;
          resolve(img);
        };
        img.onerror = () => {
          images[index] = img; // store to avoid retrying endlessly
          resolve(img);
        };
      });
    };

    const loadImagesInBatches = async () => {
      // 1. Load frame 0 immediately for instant First Paint
      await loadImage(0);
      if (isCancelled) return;
      
      setImagesLoaded(true);
      loadedCount++;
      setLoadProgress(loadedCount / frameCount);
      drawFrame(0);

      // 2. Load "skeleton" (every 10th frame) for fast scrub
      const skeletonIndices: number[] = [];
      for (let i = 0; i < frameCount; i += 10) {
        if (!images[i]) skeletonIndices.push(i);
      }
      
      const loadAndTrack = async (index: number) => {
        if (images[index]) return;
        await loadImage(index);
        loadedCount++;
        if (!isCancelled) {
          setLoadProgress(loadedCount / frameCount);
          // Redraw if the user's current frame is near to visually sharpen
          if (Math.abs(currentFrameRef.current - index) <= 10) {
             drawFrame(currentFrameRef.current);
          }
        }
      };

      await Promise.all(skeletonIndices.map(loadAndTrack));
      if (isCancelled) return;

      // 3. Background-fill remaining frames sequentially in batches of 5
      const remaining: number[] = [];
      for (let i = 0; i < frameCount; i++) {
        if (!images[i]) remaining.push(i);
      }
      
      for (let i = 0; i < remaining.length; i += 5) {
        if (isCancelled) return;
        const batch = remaining.slice(i, i + 5);
        await Promise.all(batch.map(loadAndTrack));
        if (!isCancelled) drawFrame(currentFrameRef.current);
      }
    };

    loadImagesInBatches();

    return () => {
      isCancelled = true;
    };
  }, [basePath, frameCount, padLength, drawFrame]);

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
