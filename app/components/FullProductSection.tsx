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

  const translateY = progress < fadeIn ? (1 - opacity) * 20 : 0;

  if (opacity <= 0) return null;

  return (
    <div
      className={`overlay-text ${align}`}
      style={{
        opacity: Math.max(0, Math.min(1, opacity)),
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default function FullProductSection() {
  return (
    <section id="discover">
      {/* Divider */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <ScrollCanvas basePath="/full-prod" frameCount={121} scrollHeight="350vh">
        {(progress) => (
          <>
            {/* Product beauty shot (0–40%) */}
            <TextOverlay progress={progress} start={0} end={0.4} align="center">
              <div className="flex flex-col items-center gap-4 px-6">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-cyan)]">
                  The Complete Experience
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-white/90 sm:text-5xl lg:text-6xl">
                  HD 559 with microphone.
                </h2>
                <p className="max-w-lg text-sm text-white/40 sm:text-base">
                  Audiophile headphones and broadcast mic, unified in one premium package.
                </p>
              </div>
            </TextOverlay>

            {/* Final CTA (40–100%) */}
            <TextOverlay progress={progress} start={0.5} end={1} align="center">
              <div className="flex flex-col items-center gap-6 px-6">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl gradient-text">
                  Hear everything.<br />
                  Feel nothing else.
                </h2>
                <p className="text-base font-light text-white/50 sm:text-lg">
                  Sennheiser HD 559. Designed for immersion, crafted for comfort.
                </p>
                <div className="flex flex-col items-center gap-3 pointer-events-auto sm:flex-row sm:gap-4">
                  <a href="#specs" className="btn-primary">
                    Discover HD 559
                  </a>
                  <a
                    href="#specs"
                    className="text-sm font-medium text-white/50 transition-colors hover:text-white/80"
                  >
                    See full specs →
                  </a>
                </div>
              </div>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
