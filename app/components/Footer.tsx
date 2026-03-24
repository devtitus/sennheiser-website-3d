export default function Footer() {
  const footerLinks = {
    Product: ["HD 559 Overview", "Specifications", "Accessories", "Support"],
    Company: ["About Sennheiser", "Careers", "Press", "Blog"],
    Legal: ["Privacy Policy", "Terms of Use", "Cookie Settings", "Warranty"],
  };

  return (
    <footer className="relative" style={{ background: "var(--bg-primary)" }}>
      {/* Top divider */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 lg:px-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="text-base font-semibold tracking-[0.1em] uppercase text-white/80">
              Sennheiser
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/25">
              Shaping the future of audio since 1945. Precision German engineering
              for musicians, creators, and audiophiles worldwide.
            </p>

            {/* Social icons row */}
            <div className="mt-6 flex items-center gap-4">
              {["X", "IG", "YT", "LI"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-[10px] font-bold text-white/30 transition-all duration-300 hover:border-white/15 hover:text-white/60 hover:bg-white/[0.05]"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/25 transition-colors duration-300 hover:text-white/60"
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
        <div className="mt-14 border-t border-white/[0.04] pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-[11px] text-white/15">
              © {new Date().getFullYear()} Sennheiser electronic GmbH & Co. KG.
              All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-white/10">Made with</span>
              <span className="text-[11px] text-white/20">♪</span>
              <span className="text-[11px] text-white/10">in Wedemark, Germany</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
