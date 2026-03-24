export default function SpecsSection() {
  const specs = [
    { icon: "◎", label: "Transducer Type",      value: "Dynamic, open-back",           detail: "Proprietary Sennheiser transducer" },
    { icon: "〜", label: "Frequency Response",   value: "14 – 26,000 Hz",               detail: "Extended range for audiophile clarity" },
    { icon: "⚡", label: "Impedance",             value: "50 Ω",                         detail: "Optimized for all audio sources" },
    { icon: "▲", label: "Sound Pressure Level",  value: "108 dB",                       detail: "1 kHz / 1 Vrms" },
    { icon: "●", label: "Driver Size",            value: "38 mm",                        detail: "Angled transducers for spatial accuracy" },
    { icon: "⌁", label: "Cable Length",           value: "3 m, detachable",              detail: "Locking connector" },
    { icon: "○", label: "Connector",              value: "3.5 mm jack",                  detail: "6.3 mm adapter included" },
    { icon: "◇", label: "Weight",                 value: "~275 g",                       detail: "Without cable, all-day comfort" },
  ];

  return (
    <section
      id="specs"
      className="relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Ambient radial glow — centred top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,80,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="page-container relative py-28 sm:py-36">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--accent-cyan)]">
            Technical Specifications
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white/90 sm:text-5xl">
            The details.
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-white/30 sm:text-base">
            Precision-engineered from transducer to connector.
          </p>
        </div>

        {/* Specs grid — 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.015] p-5 transition-all duration-500 hover:border-white/[0.1] hover:bg-white/[0.03]"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-base leading-none text-white/50 transition-all duration-500 group-hover:border-[rgba(0,214,255,0.2)] group-hover:text-[var(--accent-cyan)]">
                {spec.icon}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/25 mb-1">
                  {spec.label}
                </p>
                <p className="text-lg font-semibold tracking-tight text-white/90 leading-tight">
                  {spec.value}
                </p>
                <p className="mt-1 text-xs text-white/28">{spec.detail}</p>
              </div>

              {/* Left accent bar on hover */}
              <div
                className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: i % 2 === 0 ? "var(--accent-blue)" : "var(--accent-cyan)" }}
              />
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-20 flex flex-col items-center gap-6 text-center">
          <div
            className="h-px w-48"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,214,255,0.25), transparent)" }}
          />
          <h3 className="text-2xl font-bold tracking-tight text-white/85 sm:text-3xl">
            Ready to experience it?
          </h3>
          <p className="text-sm text-white/35">The HD 559 is available now.</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <a href="#" className="btn-primary">Buy HD 559</a>
            <a
              href="#"
              className="group flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
            >
              Compare models
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
