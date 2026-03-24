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

export default function ConnectorSection() {
  return (
    <section>
      {/* Divider */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <ScrollCanvas basePath="/con-vid" frameCount={116} scrollHeight="350vh">
        {(progress) => (
          <>
            {/* Connection intro (0–30%) */}
            <TextOverlay progress={progress} start={0} end={0.3} align="center">
              <div className="flex flex-col items-center gap-4 px-6">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-cyan)]">
                  Connectivity
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-white/90 sm:text-5xl lg:text-6xl">
                  Engineered connection.
                </h2>
                <p className="max-w-md text-sm text-white/40 sm:text-base">
                  Every signal path is optimized for zero-loss audio transmission.
                </p>
              </div>
            </TextOverlay>

            {/* Connector detail (30–70%) */}
            <TextOverlay progress={progress} start={0.3} end={0.7} align="left">
              <div className="max-w-md px-4 sm:px-0">
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
                  Built to last.
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] shrink-0" />
                    <p className="text-sm text-white/50">
                      Gold-plated 3.5mm jack ensures reliable, low-resistance contact.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-blue)] shrink-0" />
                    <p className="text-sm text-white/50">
                      Detachable cable with locking connector — replace, upgrade, or extend.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] shrink-0" />
                    <p className="text-sm text-white/50">
                      OFC copper wiring for full-spectrum signal integrity.
                    </p>
                  </div>
                </div>
              </div>
            </TextOverlay>

            {/* Connector outro (70–100%) */}
            <TextOverlay progress={progress} start={0.7} end={1} align="center">
              <div className="flex flex-col items-center gap-4 px-6">
                <h3 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
                  Zero compromise, every note.
                </h3>
                <p className="max-w-md text-sm text-white/40">
                  From source to driver — uninterrupted audio fidelity.
                </p>
              </div>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
