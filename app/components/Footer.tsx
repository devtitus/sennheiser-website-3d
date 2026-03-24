export default function Footer() {
  const columns = {
    Product: ["Overview", "Specifications", "Accessories", "Support"],
    Company: ["About Sennheiser", "Careers", "Press"],
    Legal:   ["Privacy Policy", "Terms of Use", "Warranty"],
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
            <p className="text-[13px] font-medium text-[#f5f5f7]">Sennheiser</p>
            <p className="mt-2 max-w-[240px] text-[12px] leading-[1.5] text-[#6e6e73]">
              Shaping the future of audio since 1945.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(columns).map(([category, links]) => (
            <div key={category}>
              <p className="text-[11px] font-medium tracking-[0.04em] uppercase text-[#86868b] mb-3">
                {category}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[12px] text-[#6e6e73] transition-colors duration-200 hover:text-[#a1a1a6]"
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
          className="mt-10 flex flex-col items-center justify-between gap-2 border-t pt-6 text-[11px] text-[#48484a] sm:flex-row"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p>© {new Date().getFullYear()} Sennheiser electronic GmbH &amp; Co. KG</p>
          <p>Made in Wedemark, Germany</p>
        </div>
      </div>
    </footer>
  );
}
