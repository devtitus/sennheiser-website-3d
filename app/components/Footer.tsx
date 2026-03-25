export default function Footer() {
  const columns = {
    Product: ["Overview", "Specifications", "Accessories", "Support"],
    Company: ["About Sennheiser", "Careers", "Press"],
    Legal: ["Privacy Policy", "Terms of Use", "Warranty"],
  };

  return (
    <footer style={{ background: "var(--bg-primary)" }}>
      {/* Divider */}
      <div
        className="mx-auto h-px"
        style={{ maxWidth: "980px", background: "var(--border-subtle)" }}
      />

      <div className="page-container pt-12 pb-8">
        {/* Grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-[clamp(14px,1.1vw,16px)] font-medium text-white/90 uppercase">Sennheiser</p>
            <p className="mt-2 max-w-[240px] text-[clamp(12px,0.9vw,14px)] leading-[1.5] text-white/50">
              Shaping the future of audio since 1945.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(columns).map(([category, links]) => (
            <div key={category}>
              <p className="text-[clamp(11px,0.8vw,13px)] font-medium tracking-[0.04em] uppercase text-white/50 mb-3">
                {category}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[clamp(12px,0.9vw,14px)] text-white/55 transition-colors duration-200 hover:text-white/80"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-2 border-t pt-6 text-[clamp(11px,0.8vw,13px)] text-white/30 sm:flex-row"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p>© {new Date().getFullYear()} Sennheiser electronic GmbH &amp; Co. KG</p>
          <p>Made in Wedemark, Germany</p>
        </div>
      </div>
    </footer>
  );
}
