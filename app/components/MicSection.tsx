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
  const translateX =
    align === "left"
      ? progress < fadeIn
        ? -(1 - opacity) * 30
        : 0
      : align === "right"
        ? progress < fadeIn
          ? (1 - opacity) * 30
          : 0
        : 0;

  if (opacity <= 0) return null;

  return (
    <div
      className={`overlay-text ${align}`}
      style={{
        opacity: Math.max(0, Math.min(1, opacity)),
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default function MicSection() {
  return (
    <section id="microphone">
      {/* Divider */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <ScrollCanvas basePath="/mic" frameCount={169} scrollHeight="400vh">
        {(progress) => (
          <>
            {/* Mic intro (0–25%) */}
            <TextOverlay progress={progress} start={0} end={0.25} align="center">
              <div className="flex flex-col items-center gap-4 px-6">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-cyan)]">
                  Microphone
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-white/90 sm:text-5xl lg:text-6xl">
                  Broadcast-quality voice.
                </h2>
                <p className="max-w-md text-sm text-white/40 sm:text-base">
                  A detachable boom microphone that captures your voice with studio clarity.
                </p>
              </div>
            </TextOverlay>

            {/* Mic exploded detail (25–60%) */}
            <TextOverlay progress={progress} start={0.25} end={0.6} align="right">
              <div className="max-w-md px-4 sm:px-0">
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
                  Engineered for clarity.
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] shrink-0" />
                    <p className="text-sm text-white/50">
                      Studio-grade condenser capsule with wide frequency response.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-blue)] shrink-0" />
                    <p className="text-sm text-white/50">
                      Noise-rejecting windscreen minimizes background interference.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] shrink-0" />
                    <p className="text-sm text-white/50">
                      Flexible boom arm positions precisely where you need it.
                    </p>
                  </div>
                </div>
              </div>
            </TextOverlay>

            {/* Mic reassembly (60–100%) */}
            <TextOverlay progress={progress} start={0.6} end={1} align="left">
              <div className="max-w-md px-4 sm:px-0">
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
                  Detach when you don&apos;t need it.
                </h3>
                <p className="text-sm leading-relaxed text-white/50 sm:text-base">
                  The boom microphone connects via a secure locking mechanism.
                  Remove it for pure listening, attach it for calls and gaming —
                  seamlessly.
                </p>
              </div>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
