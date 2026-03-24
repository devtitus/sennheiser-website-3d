export default function Footer() {
  const columns = {
    Product:  ["Overview", "Specifications", "Accessories", "Support"],
    Company:  ["About Sennheiser", "Careers", "Press", "Blog"],
    Legal:    ["Privacy Policy", "Terms of Use", "Cookies", "Warranty"],
  };

  return (
    <footer
      className="relative"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Top gradient divider */}
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
      />

      <div className="page-container pt-16 pb-10">
        {/* Main grid: brand + 3 link columns */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-bold tracking-[0.12em] uppercase text-white/75">
              Sennheiser
            </p>
            <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/25">
              Shaping the future of audio since 1945. Precision German
              engineering for musicians, creators, and audiophiles worldwide.
            </p>
            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {(["𝕏", "IG", "YT", "LI"] as const).map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02] text-[10px] font-bold text-white/30 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/70"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(columns).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <p className="mb-4 text-[10px] font-bold tracking-[0.22em] uppercase text-white/35">
                {category}
              </p>
              <ul className="space-y-[10px]">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/28 transition-colors duration-300 hover:text-white/65"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.04] pt-7 sm:flex-row">
          <p className="text-[11px] text-white/18">
            © {new Date().getFullYear()} Sennheiser electronic GmbH &amp; Co. KG. All rights reserved.
          </p>
          <p className="text-[11px] text-white/15">
            Made with ♪ in Wedemark, Germany
          </p>
        </div>
      </div>
    </footer>
  );
}
