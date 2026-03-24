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
    if (progress < fadeIn) opacity = (progress - start) / (fadeIn - start);
    else if (progress > fadeOut) opacity = (end - progress) / (end - fadeOut);
    else opacity = 1;
  }

  const o = Math.max(0, Math.min(1, opacity));
  const ty = o < 1 && progress < fadeIn ? (1 - o) * 20 : 0;
  const tx =
    align === "left" ? (progress < fadeIn ? -(1 - o) * 20 : 0)
    : align === "right" ? (progress < fadeIn ? (1 - o) * 20 : 0)
    : 0;

  if (o <= 0) return null;

  return (
    <div className={`overlay-text ${align}`} style={{ opacity: o, transform: `translate(${tx}px, ${ty}px)` }}>
      <div className="overlay-inner">{children}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="overview">
      <ScrollCanvas basePath="/hero" frameCount={227} scrollHeight="500vh">
        {(progress) => (
          <>
            {/* Beat 1 — Hero title (0–12%) */}
            <TextOverlay progress={progress} start={0} end={0.12} align="center">
              <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-[#f5f5f7]">
                Sennheiser HD&nbsp;559
              </h1>
              <p className="mt-3 text-[clamp(1rem,2vw,1.375rem)] font-normal text-[#a1a1a6]">
                Sound, unleashed.
              </p>
            </TextOverlay>

            {/* Beat 2 — Engineering (12–35%) */}
            <TextOverlay progress={progress} start={0.12} end={0.35} align="left">
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#86868b]">
                Engineering
              </p>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
                Precision-engineered<br />for pure sound.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.58] text-[#a1a1a6]">
                Proprietary transducer technology delivers exceptional clarity,
                depth, and spatial accuracy across the full frequency spectrum.
              </p>
              <p className="mt-3 text-[15px] leading-[1.58] text-[#6e6e73]">
                Open-back acoustic design eliminates resonance, creating a natural
                soundstage that places you inside the music.
              </p>
            </TextOverlay>

            {/* Beat 3 — Anatomy (35–60%) */}
            <TextOverlay progress={progress} start={0.35} end={0.6} align="right">
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#86868b]">
                Anatomy
              </p>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
                Every detail,<br />purpose-built.
              </h2>
              <div className="mt-5 space-y-4">
                {[
                  "38mm angled transducers for detailed, immersive reproduction.",
                  "Velour ear cushions for hours of fatigue-free listening.",
                  "Lightweight headband with padded leatherette for balanced pressure.",
                ].map((copy) => (
                  <div key={copy} className="flex items-start gap-3">
                    <div className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#48484a]" />
                    <p className="text-[15px] leading-[1.47] text-[#a1a1a6]">{copy}</p>
                  </div>
                ))}
              </div>
            </TextOverlay>

            {/* Beat 4 — Sound (60–85%) */}
            <TextOverlay progress={progress} start={0.6} end={0.85} align="left">
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#86868b]">
                Sound
              </p>
              <h2 id="sound" className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
                Audiophile sound,<br />everyday comfort.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.58] text-[#a1a1a6]">
                High-performance drivers unlock detail, depth, and texture in
                every track — from delicate acoustic to driving bass.
              </p>
              <p className="mt-3 text-[15px] leading-[1.58] text-[#6e6e73]">
                The open-back design delivers a wide, speaker-like soundstage
                that audiophiles demand, without the fatigue of isolation.
              </p>
            </TextOverlay>

            {/* Beat 5 — CTA (85–100%) */}
            <TextOverlay progress={progress} start={0.85} end={1} align="center">
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] gradient-text">
                Hear everything.
              </h2>
              <p className="mt-3 text-[clamp(0.94rem,1.5vw,1.19rem)] font-normal text-[#86868b]">
                Designed for immersion. Crafted for comfort.
              </p>
              <a href="#discover" className="btn-primary pointer-events-auto mt-8">
                Discover HD 559
              </a>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
