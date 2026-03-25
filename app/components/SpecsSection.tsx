export default function SpecsSection() {
  const specs = [
    { label: "Transducer", value: "Dynamic, open-back", detail: "Proprietary Sennheiser" },
    { label: "Frequency Response", value: "14 – 26,000 Hz", detail: "Extended audiophile range" },
    { label: "Impedance", value: "50 Ω", detail: "All-source optimized" },
    { label: "Sound Pressure", value: "108 dB", detail: "1 kHz / 1 Vrms" },
    { label: "Driver Size", value: "38 mm", detail: "Angled transducers" },
    { label: "Cable", value: "3 m detachable", detail: "Locking connector" },
    { label: "Connector", value: "3.5 mm", detail: "6.3 mm adapter included" },
    { label: "Weight", value: "~275 g", detail: "Without cable" },
  ];

  return (
    <section id="specs" style={{ background: "var(--bg-secondary)" }}>
      <div className="page-container py-24 sm:py-32 lg:py-40">

        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-[clamp(11px,1vw,14px)] font-medium tracking-[0.08em] uppercase text-[#86868b]">
            Technical Specifications
          </p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.025em] text-[#f5f5f7]">
            The details.
          </h2>
        </div>

        {/* Specs grid */}
        <div className="mx-auto max-w-full grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex flex-col justify-between p-6 sm:p-7 lg:p-8 transition-colors duration-300 hover:bg-[#1d1d1f] rounded-2xl border border-white/10"
              style={{ background: "var(--bg-elevated)" }}
            >
              <p className="text-[clamp(10px,0.8vw,12px)] font-medium tracking-[0.06em] uppercase text-[#6e6e73]">
                {spec.label}
              </p>
              <div className="mt-6">
                <p className="text-[clamp(20px,1.6vw,26px)] font-semibold tracking-[-0.02em] leading-tight text-[#f5f5f7]">
                  {spec.value}
                </p>
                <p className="mt-1 text-[clamp(13px,1vw,15px)] text-[#6e6e73]">
                  {spec.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 sm:mt-24 flex flex-col items-center gap-10 text-center">
          <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
            Ready to experience it?
          </h3>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
            <a href="#" className="btn-primary">Buy HD 559</a>
            <a href="#" className="link-arrow">Compare models</a>
          </div>
        </div>
      </div>
    </section>
  );
}
