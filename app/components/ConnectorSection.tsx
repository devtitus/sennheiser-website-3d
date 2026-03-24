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

export default function ConnectorSection() {
  return (
    <section>
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
      <ScrollCanvas basePath="/con-vid" frameCount={116} scrollHeight="350vh">
        {(progress) => (
          <>
            {/* Connection intro (0–30%) */}
            <TextOverlay progress={progress} start={0} end={0.3} align="center">
              <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--accent-cyan)]">
                Connectivity
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl xl:text-5xl">
                Engineered connection.
              </h2>
              <p className="mt-4 text-sm text-white/45 sm:text-base">
                Every signal path is optimized for zero-loss audio transmission.
              </p>
            </TextOverlay>

            {/* Connector detail (30–70%) */}
            <TextOverlay progress={progress} start={0.3} end={0.7} align="left">
              <h3 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
                Built to last.
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  { color: "var(--accent-cyan)", copy: "Gold-plated 3.5mm jack ensures reliable, low-resistance contact." },
                  { color: "var(--accent-blue)", copy: "Detachable cable with locking connector — replace, upgrade, or extend." },
                  { color: "var(--accent-cyan)", copy: "OFC copper wiring for full-spectrum signal integrity." },
                ].map(({ color, copy }) => (
                  <div key={copy} className="flex items-start gap-3">
                    <div className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                    <p className="text-sm text-white/50">{copy}</p>
                  </div>
                ))}
              </div>
            </TextOverlay>

            {/* Connector outro (70–100%) */}
            <TextOverlay progress={progress} start={0.7} end={1} align="center">
              <h3 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl xl:text-4xl">
                Zero compromise, every note.
              </h3>
              <p className="mt-4 text-sm text-white/40">
                From source to driver — uninterrupted audio fidelity.
              </p>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
