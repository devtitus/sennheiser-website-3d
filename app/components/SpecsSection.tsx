export default function SpecsSection() {
  const specsLeft = [
    {
      icon: "🎧",
      label: "Transducer Type",
      value: "Dynamic, open-back",
      detail: "Proprietary Sennheiser transducer",
    },
    {
      icon: "📊",
      label: "Frequency Response",
      value: "14 – 26,000 Hz",
      detail: "Extended range for audiophile clarity",
    },
    {
      icon: "⚡",
      label: "Impedance",
      value: "50 Ω",
      detail: "Optimized for all audio sources",
    },
    {
      icon: "🔊",
      label: "Sound Pressure Level",
      value: "108 dB",
      detail: "1 kHz / 1 Vrms",
    },
  ];

  const specsRight = [
    {
      icon: "🔬",
      label: "Driver Size",
      value: "38 mm",
      detail: "Angled transducers for spatial accuracy",
    },
    {
      icon: "🔌",
      label: "Cable Length",
      value: "3 m, detachable",
      detail: "With locking connector",
    },
    {
      icon: "🎵",
      label: "Connector",
      value: "3.5 mm jack",
      detail: "6.3 mm adapter included",
    },
    {
      icon: "⚖️",
      label: "Weight",
      value: "~275 g",
      detail: "Without cable, all-day comfort",
    },
  ];

  return (
    <section
      id="specs"
      className="relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 80, 255, 0.08) 0%, rgba(0, 214, 255, 0.03) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36 lg:px-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-[var(--accent-cyan)]">
            Technical Specifications
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white/90 sm:text-5xl lg:text-6xl">
            The details.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/35 sm:text-base">
            Precision-engineered from transducer to connector.
          </p>
        </div>

        {/* Two-column spec layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left column */}
          <div className="space-y-4">
            {specsLeft.map((spec, i) => (
              <div
                key={spec.label}
                className="group relative flex items-start gap-5 rounded-2xl border border-white/[0.04] bg-white/[0.015] p-6 transition-all duration-500 hover:border-white/[0.08] hover:bg-white/[0.03]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-lg transition-colors duration-500 group-hover:bg-[rgba(0,80,255,0.08)]">
                  {spec.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/25 mb-1">
                    {spec.label}
                  </p>
                  <p className="text-xl font-semibold tracking-tight text-white/90">
                    {spec.value}
                  </p>
                  <p className="mt-1 text-xs text-white/30">{spec.detail}</p>
                </div>

                {/* Hover accent line */}
                <div className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-[var(--accent-blue)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {specsRight.map((spec, i) => (
              <div
                key={spec.label}
                className="group relative flex items-start gap-5 rounded-2xl border border-white/[0.04] bg-white/[0.015] p-6 transition-all duration-500 hover:border-white/[0.08] hover:bg-white/[0.03]"
                style={{ animationDelay: `${(i + 4) * 80}ms` }}
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-lg transition-colors duration-500 group-hover:bg-[rgba(0,214,255,0.08)]">
                  {spec.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/25 mb-1">
                    {spec.label}
                  </p>
                  <p className="text-xl font-semibold tracking-tight text-white/90">
                    {spec.value}
                  </p>
                  <p className="mt-1 text-xs text-white/30">{spec.detail}</p>
                </div>

                {/* Hover accent line */}
                <div className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-[var(--accent-cyan)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA block */}
        <div className="mt-20 flex flex-col items-center gap-8">
          {/* Divider with gradient */}
          <div
            className="w-full max-w-sm h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,214,255,0.2), transparent)",
            }}
          />

          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-white/85 sm:text-3xl">
              Ready to experience it?
            </h3>
            <p className="mt-2 text-sm text-white/35">
              The HD 559 is available now.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <a href="#" className="btn-primary">
              Buy HD 559
            </a>
            <a
              href="#"
              className="group flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
            >
              Compare models
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
