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
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`glass-nav fixed top-0 left-0 right-0 z-50 ${scrolled ? "scrolled" : ""}`}
      style={{ height: "var(--nav-height)" }}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
        {/* Left — Brand */}
        <a
          href="#"
          className="text-sm font-semibold tracking-[0.08em] uppercase text-white/90 transition-opacity hover:opacity-70"
        >
          Sennheiser
        </a>

        {/* Center — Links (desktop) */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium tracking-wide text-white/60 transition-all duration-300 hover:text-white/90"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right — CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <a href="#discover" className="btn-gradient hidden sm:inline-flex">
            Explore HD 559
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[1.5px] w-5 bg-white/70 transition-all duration-300 ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-white/70 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-white/70 transition-all duration-300 ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-[var(--nav-height)] left-0 right-0 border-t border-white/5 bg-[rgba(5,5,5,0.95)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium text-white/60 transition-colors hover:text-white/90"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#discover"
              className="btn-gradient mt-2 text-center"
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
