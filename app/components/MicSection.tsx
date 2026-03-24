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
  const tx = align === "left" ? (progress < fadeIn ? -(1 - o) * 20 : 0) : align === "right" ? (progress < fadeIn ? (1 - o) * 20 : 0) : 0;
  if (o <= 0) return null;
  return (
    <div className={`overlay-text ${align}`} style={{ opacity: o, transform: `translate(${tx}px, ${ty}px)` }}>
      <div className="overlay-inner">{children}</div>
    </div>
  );
}

export default function MicSection() {
  return (
    <section id="microphone">
      <ScrollCanvas basePath="/mic" frameCount={169} scrollHeight="400vh">
        {(progress) => (
          <>
            <TextOverlay progress={progress} start={0} end={0.25} align="center">
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#86868b]">
                Microphone
              </p>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
                Broadcast-quality voice.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.58] text-[#a1a1a6]">
                A detachable boom microphone that captures your voice with studio clarity.
              </p>
            </TextOverlay>

            <TextOverlay progress={progress} start={0.25} end={0.6} align="right">
              <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
                Engineered for clarity.
              </h3>
              <div className="mt-5 space-y-2">
                {[
                  "Studio-grade condenser capsule with wide frequency response.",
                  "Noise-rejecting windscreen minimizes background interference.",
                  "Flexible boom arm positions precisely where you need it.",
                ].map((copy) => (
                  <div key={copy} className="flex items-start gap-3">
                    <div className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#48484a]" />
                    <p className="text-[15px] leading-[1.47] text-[#a1a1a6]">{copy}</p>
                  </div>
                ))}
              </div>
            </TextOverlay>

            <TextOverlay progress={progress} start={0.6} end={1} align="left">
              <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
                Detach when you don&apos;t need it.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.58] text-[#a1a1a6]">
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
