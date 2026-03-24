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
  const translateY = opacity < 1 && progress < fadeIn ? (1 - clampedOpacity) * 24 : 0;
  const translateX =
    align === "left"
      ? progress < fadeIn ? -(1 - clampedOpacity) * 24 : 0
      : align === "right"
      ? progress < fadeIn ? (1 - clampedOpacity) * 24 : 0
      : 0;

  if (clampedOpacity <= 0) return null;

  return (
    <div
      className={`overlay-text ${align}`}
      style={{ opacity: clampedOpacity, transform: `translate(${translateX}px, ${translateY}px)` }}
    >
      <div className="overlay-inner">
        {children}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="overview">
      <ScrollCanvas basePath="/hero" frameCount={227} scrollHeight="500vh">
        {(progress) => (
          <>
            {/* Beat 1: Hero intro (0–12%) */}
            <TextOverlay progress={progress} start={0} end={0.12} align="center">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl gradient-text">
                Sennheiser HD&nbsp;559
              </h1>
              <p className="mt-4 text-base font-light tracking-wide text-white/55 sm:text-lg">
                Sound, unleashed.
              </p>
              <p className="mt-2 text-sm text-white/30">
                Open-back audiophile headphones, engineered for pure, natural sound.
              </p>
            </TextOverlay>

            {/* Beat 2: Engineering reveal (12–35%) */}
            <TextOverlay progress={progress} start={0.12} end={0.35} align="left">
              <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--accent-cyan)]">
                Engineering
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl xl:text-5xl">
                Precision-engineered<br />for pure sound.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
                Proprietary transducer technology delivers exceptional clarity,
                depth, and spatial accuracy across the entire frequency spectrum.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/35">
                Open-back acoustic design eliminates resonance, creating a natural
                soundstage that places you inside the music.
              </p>
            </TextOverlay>

            {/* Beat 3: Exploded — component detail (35–60%) */}
            <TextOverlay progress={progress} start={0.35} end={0.6} align="right">
              <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--accent-cyan)]">
                Anatomy
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl xl:text-5xl">
                Every detail,<br />purpose-built.
              </h2>
              <div className="mt-4 space-y-3">
                {[
                  { color: "var(--accent-cyan)", copy: "38mm angled transducers for detailed, immersive reproduction." },
                  { color: "var(--accent-blue)", copy: "Velour ear cushions for hours of fatigue-free listening." },
                  { color: "var(--accent-cyan)", copy: "Lightweight headband with padded leatherette for balanced pressure." },
                ].map(({ color, copy }) => (
                  <div key={copy} className="flex items-start gap-3">
                    <div className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                    <p className="text-sm text-white/50">{copy}</p>
                  </div>
                ))}
              </div>
            </TextOverlay>

            {/* Beat 4: Sound quality (60–85%) */}
            <TextOverlay progress={progress} start={0.6} end={0.85} align="left">
              <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--accent-cyan)]">
                Sound
              </p>
              <h2 id="sound" className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl xl:text-5xl">
                Audiophile sound,<br />everyday comfort.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
                High-performance drivers unlock detail, depth, and texture in
                every track — from delicate acoustic to driving bass.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/35">
                The open-back design delivers a wide, speaker-like soundstage
                that audiophiles demand, without the fatigue of isolation.
              </p>
            </TextOverlay>

            {/* Beat 5: Reassembly CTA (85–100%) */}
            <TextOverlay progress={progress} start={0.85} end={1} align="center">
              <h2 className="text-4xl font-bold tracking-tight text-white/90 sm:text-5xl xl:text-6xl">
                Hear everything.
              </h2>
              <p className="mt-3 text-base font-light text-white/50 sm:text-lg">
                HD 559. Designed for immersion, crafted for comfort.
              </p>
              <a href="#discover" className="btn-primary pointer-events-auto mt-6">
                Discover HD 559
              </a>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
