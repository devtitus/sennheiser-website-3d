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
  const translateX =
    align === "left" ? (progress < fadeIn ? -(1 - clampedOpacity) * 24 : 0)
    : align === "right" ? (progress < fadeIn ? (1 - clampedOpacity) * 24 : 0)
    : 0;

  if (clampedOpacity <= 0) return null;

  return (
    <div
      className={`overlay-text ${align}`}
      style={{ opacity: clampedOpacity, transform: `translate(${translateX}px, ${translateY}px)` }}
    >
      <div className="overlay-inner">{children}</div>
    </div>
  );
}

export default function MicSection() {
  return (
    <section id="microphone">
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
      <ScrollCanvas basePath="/mic" frameCount={169} scrollHeight="400vh">
        {(progress) => (
          <>
            {/* Mic intro (0–25%) */}
            <TextOverlay progress={progress} start={0} end={0.25} align="center">
              <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--accent-cyan)]">
                Microphone
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl xl:text-5xl">
                Broadcast-quality voice.
              </h2>
              <p className="mt-4 text-sm text-white/45 sm:text-base">
                A detachable boom microphone that captures your voice with studio clarity.
              </p>
            </TextOverlay>

            {/* Mic exploded detail (25–60%) */}
            <TextOverlay progress={progress} start={0.25} end={0.6} align="right">
              <h3 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
                Engineered for clarity.
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  { color: "var(--accent-cyan)", copy: "Studio-grade condenser capsule with wide frequency response." },
                  { color: "var(--accent-blue)", copy: "Noise-rejecting windscreen minimizes background interference." },
                  { color: "var(--accent-cyan)", copy: "Flexible boom arm positions precisely where you need it." },
                ].map(({ color, copy }) => (
                  <div key={copy} className="flex items-start gap-3">
                    <div className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                    <p className="text-sm text-white/50">{copy}</p>
                  </div>
                ))}
              </div>
            </TextOverlay>

            {/* Mic reassembly (60–100%) */}
            <TextOverlay progress={progress} start={0.6} end={1} align="left">
              <h3 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
                Detach when you don&apos;t need it.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
                The boom microphone connects via a secure locking mechanism.
                Remove it for pure listening, attach it for calls and gaming — seamlessly.
              </p>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
