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

export default function FullProductSection() {
  return (
    <section id="discover">
      <ScrollCanvas basePath="/full-prod" frameCount={121} scrollHeight="350vh">
        {(progress) => (
          <>
            <TextOverlay progress={progress} start={0} end={0.4} align="center">
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#86868b]">
                The Complete Experience
              </p>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
                HD 559 with microphone.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.58] text-[#a1a1a6]">
                Audiophile headphones and broadcast mic, unified in one premium package.
              </p>
            </TextOverlay>

            <TextOverlay progress={progress} start={0.5} end={1} align="center">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.1] gradient-text">
                Hear everything.<br />Feel nothing else.
              </h2>
              <p className="mt-4 text-[clamp(0.94rem,1.5vw,1.19rem)] font-normal text-[#86868b]">
                Sennheiser HD 559. Designed for immersion, crafted for comfort.
              </p>
              <div className="pointer-events-auto mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
                <a href="#specs" className="btn-primary w-full sm:w-auto text-center">
                  Buy HD 559
                </a>
                <a href="#specs" className="link-arrow">
                  See full specs
                </a>
              </div>
            </TextOverlay>
          </>
        )}
      </ScrollCanvas>
    </section>
  );
}
