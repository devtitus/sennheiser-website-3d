"use client";

import ScrollCanvas from "./ScrollCanvas";

function TextOverlay({
  progress, start, end, align = "center", children,
}: {
  progress: number; start: number; end: number; align?: "center" | "left" | "right"; children: React.ReactNode;
}) {
  const range = end - start;
  const fadeIn = start + range * 0.15;
  const fadeOut = end - range * 0.15;
  let opacity = 0;
  if (progress >= start && progress <= end) {
    if (progress < fadeIn) opacity = (progress - start) / (fadeIn - start);
    else if (progress > fadeOut) opacity = (end - progress) / (end - fadeOut);
    else opacity = 1;
  }
  const o = Math.max(0, Math.min(1, opacity));
  const ty = o < 1 && progress < fadeIn ? (1 - o) * 20 : 0;
  if (o <= 0) return null;
  return (
    <div className={`overlay-text ${align}`} style={{ opacity: o, transform: `translateY(${ty}px)` }}>
      <div className="overlay-inner">{children}</div>
    </div>
  );
}

export default function ConnectorSection() {
  return (
    <section>
      <ScrollCanvas basePath="/con-vid" frameCount={116} scrollHeight="350vh">
        {(progress) => (
          <>
            <TextOverlay progress={progress} start={0} end={0.3} align="center">
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#86868b]">
                Connectivity
              </p>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
                Engineered connection.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.58] text-[#a1a1a6]">
                Every signal path is optimized for zero-loss audio transmission.
              </p>
            </TextOverlay>

            <TextOverlay progress={progress} start={0.3} end={0.7} align="left">
              <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
                Built to last.
              </h3>
              <div className="mt-5 space-y-4">
                {[
                  "Gold-plated 3.5mm jack ensures reliable, low-resistance contact.",
                  "Detachable cable with locking connector — replace, upgrade, or extend.",
                  "OFC copper wiring for full-spectrum signal integrity.",
                ].map((copy) => (
                  <div key={copy} className="flex items-start gap-3">
                    <div className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#48484a]" />
                    <p className="text-[15px] leading-[1.47] text-[#a1a1a6]">{copy}</p>
                  </div>
                ))}
              </div>
            </TextOverlay>

            <TextOverlay progress={progress} start={0.7} end={1} align="center">
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.02em] gradient-text-subtle">
                Zero compromise, every note.
              </h3>
              <p className="mt-3 text-[15px] text-[#6e6e73]">
                From source to driver — uninterrupted audio fidelity.
              </p>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
