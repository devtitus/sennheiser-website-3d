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
  // Fade in during first 20% of range, fade out during last 20%
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

  // Slide transform
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

export default function HeroSection() {
  return (
    <section id="overview">
      <ScrollCanvas basePath="/hero" frameCount={227} scrollHeight="500vh">
        {(progress) => (
          <>
            {/* Beat 1: Hero intro (0–12%) */}
            <TextOverlay progress={progress} start={0} end={0.12} align="center">
              <div className="flex flex-col items-center gap-4 px-6">
                <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl gradient-text">
                  Sennheiser HD 559
                </h1>
                <p className="max-w-md text-base font-light tracking-wide text-white/50 sm:text-lg">
                  Sound, unleashed.
                </p>
                <p className="max-w-lg text-sm text-white/30">
                  Open-back audiophile headphones, engineered for pure, natural sound.
                </p>
              </div>
            </TextOverlay>

            {/* Beat 2: Engineering reveal (12–35%) */}
            <TextOverlay progress={progress} start={0.12} end={0.35} align="left">
              <div className="max-w-md px-4 sm:px-0">
                <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-cyan)]">
                  Engineering
                </p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-white/90 sm:text-4xl lg:text-5xl">
                  Precision-engineered<br />for pure sound.
                </h2>
                <p className="mb-3 text-sm leading-relaxed text-white/50 sm:text-base">
                  Proprietary transducer technology delivers exceptional clarity,
                  depth, and spatial accuracy across the entire frequency spectrum.
                </p>
                <p className="text-sm leading-relaxed text-white/40">
                  Open-back acoustic design eliminates resonance, creating a natural
                  soundstage that places you inside the music.
                </p>
              </div>
            </TextOverlay>

            {/* Beat 3: Exploded view — component detail (35–60%) */}
            <TextOverlay progress={progress} start={0.35} end={0.6} align="right">
              <div className="max-w-md px-4 sm:px-0">
                <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-cyan)]">
                  Anatomy
                </p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-white/90 sm:text-4xl lg:text-5xl">
                  Every detail,<br />purpose-built.
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] shrink-0" />
                    <p className="text-sm text-white/50">
                      38mm angled transducers for detailed, immersive reproduction.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-blue)] shrink-0" />
                    <p className="text-sm text-white/50">
                      Velour ear cushions for hours of fatigue-free listening.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] shrink-0" />
                    <p className="text-sm text-white/50">
                      Lightweight headband with padded leatherette for balanced pressure.
                    </p>
                  </div>
                </div>
              </div>
            </TextOverlay>

            {/* Beat 4: Sound quality (60–85%) */}
            <TextOverlay progress={progress} start={0.6} end={0.85} align="left">
              <div className="max-w-md px-4 sm:px-0">
                <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-cyan)]">
                  Sound
                </p>
                <h2 id="sound" className="mb-4 text-3xl font-bold tracking-tight text-white/90 sm:text-4xl lg:text-5xl">
                  Audiophile sound,<br />everyday comfort.
                </h2>
                <p className="mb-3 text-sm leading-relaxed text-white/50 sm:text-base">
                  High-performance drivers unlock detail, depth, and texture in
                  every track — from delicate acoustic to driving bass.
                </p>
                <p className="text-sm leading-relaxed text-white/40">
                  The open-back design delivers a wide, speaker-like soundstage
                  that audiophiles demand, without the fatigue of isolation.
                </p>
              </div>
            </TextOverlay>

            {/* Beat 5: Reassembly CTA (85–100%) */}
            <TextOverlay progress={progress} start={0.85} end={1} align="center">
              <div className="flex flex-col items-center gap-5 px-6">
                <h2 className="text-4xl font-bold tracking-tight text-white/90 sm:text-5xl lg:text-6xl">
                  Hear everything.
                </h2>
                <p className="text-lg font-light text-white/50">
                  HD 559. Designed for immersion, crafted for comfort.
                </p>
                <a href="#discover" className="btn-primary pointer-events-auto mt-2">
                  Discover HD 559
                </a>
              </div>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
