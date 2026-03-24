"use client";

import ScrollCanvas from "./ScrollCanvas";

function TextOverlay({
  progress,
  start,
  end,
  align = "center",
  children,
}: {
  progress: number;
  start: number;
  end: number;
  align?: "center" | "left" | "right";
  children: React.ReactNode;
}) {
  const range = end - start;
  const fadeIn = start + range * 0.15;
  const fadeOut = end - range * 0.15;

  let opacity = 0;
  if (progress >= start && progress <= end) {
    if (progress < fadeIn) {
      opacity = (progress - start) / (fadeIn - start);
    } else if (progress > fadeOut) {
      opacity = (end - progress) / (end - fadeOut);
    } else {
      opacity = 1;
    }
  }

  const clampedOpacity = Math.max(0, Math.min(1, opacity));
  const translateY = clampedOpacity < 1 && progress < fadeIn ? (1 - clampedOpacity) * 24 : 0;

  if (clampedOpacity <= 0) return null;

  return (
    <div
      className={`overlay-text ${align}`}
      style={{ opacity: clampedOpacity, transform: `translateY(${translateY}px)` }}
    >
      <div className="overlay-inner">{children}</div>
    </div>
  );
}

export default function FullProductSection() {
  return (
    <section id="discover">
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
      <ScrollCanvas basePath="/full-prod" frameCount={121} scrollHeight="350vh">
        {(progress) => (
          <>
            {/* Product beauty shot (0–40%) */}
            <TextOverlay progress={progress} start={0} end={0.4} align="center">
              <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--accent-cyan)]">
                The Complete Experience
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl xl:text-5xl">
                HD 559 with microphone.
              </h2>
              <p className="mt-4 text-sm text-white/45 sm:text-base">
                Audiophile headphones and broadcast mic, unified in one premium package.
              </p>
            </TextOverlay>

            {/* Final CTA (50–100%) */}
            <TextOverlay progress={progress} start={0.5} end={1} align="center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl gradient-text">
                Hear everything.<br />Feel nothing else.
              </h2>
              <p className="mt-4 text-base font-light text-white/50 sm:text-lg">
                Sennheiser HD 559. Designed for immersion, crafted for comfort.
              </p>
              <div className="pointer-events-auto mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
                <a href="#specs" className="btn-primary w-full sm:w-auto text-center">
                  Discover HD 559
                </a>
                <a
                  href="#specs"
                  className="text-sm font-medium text-white/45 transition-colors hover:text-white/80"
                >
                  See full specs →
                </a>
              </div>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
