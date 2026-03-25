"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Sound", href: "#sound" },
  { label: "Microphone", href: "#microphone" },
  { label: "Specs", href: "#specs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`glass-nav fixed top-0 left-0 right-0 z-50 ${scrolled ? "scrolled" : ""}`}
      style={{ height: "var(--nav-height)" }}
    >
      <div className="nav-inner">
        {/* Brand */}
        <a href="#" className="shrink-0 text-[14px] font-medium tracking-[0.02em] text-[#f5f5f7] transition-opacity hover:opacity-70">
          Sennheiser
        </a>

        {/* Center nav (desktop) */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-normal text-[#a1a1a6] transition-colors duration-200 hover:text-[#f5f5f7]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-3">
          <a href="#discover" className="btn-nav invisible lg:visible">
            Explore
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-[5px] p-1 md:hidden"
            aria-label="Menu"
          >
            <span className={`block h-[1px] w-[18px] bg-[#f5f5f7] transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-[1px] w-[18px] bg-[#f5f5f7] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[1px] w-[18px] bg-[#f5f5f7] transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="absolute left-0 right-0 border-t md:hidden"
          style={{ top: "var(--nav-height)", borderColor: "var(--border-subtle)", background: "rgba(0,0,0,0.94)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col px-5 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-[15px] font-normal text-[#a1a1a6] transition-colors hover:text-[#f5f5f7] border-b"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#discover"
              className="btn-nav mt-4 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Explore HD 559
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
