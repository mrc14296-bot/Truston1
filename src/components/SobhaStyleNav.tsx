import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";

const leftLinks = [
  { label: "ABOUT", to: "/about-us" },
  { label: "COMMUNITIES", to: "/project" },
  { label: "PROPERTIES", to: "/services" },
] as const;

const rightLinks = [
  { label: "MEDIA CENTER", to: "/about-us" },
  { label: "CAREERS", to: "/about-us" },
  { label: "CONTACT US", to: "/contact" },
] as const;

export function SobhaStyleNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = !scrolled && !open;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-[70px]" : "h-[100px]"
          }`}
        >
          {/* Left Nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {leftLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[12px] font-semibold tracking-[0.15em] transition-colors duration-300 relative group ${
                  isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-gray-800 hover:text-[var(--bronze)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logo - Centered */}
          <div className="flex justify-center shrink-0 px-4">
            <Link to="/" className="flex flex-col items-center">
              <img
                src="/logo.png"
                alt="Logo"
                className={`w-auto object-contain transition-all duration-500 ${
                  scrolled ? "h-10" : "h-14 brightness-110"
                }`}
              />
            </Link>
          </div>

          {/* Right Nav */}
          <div className="hidden lg:flex items-center justify-end gap-8 flex-1">
            <nav className="flex items-center gap-8">
              {rightLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-[12px] font-semibold tracking-[0.15em] transition-colors duration-300 relative group ${
                    isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-gray-800 hover:text-[var(--bronze)]"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            
            {/* Icons */}
            <div className={`flex items-center gap-5 ${isTransparent ? "text-white" : "text-gray-800"}`}>
              <button className="hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <div className="flex items-center gap-2 border border-white/20 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest">
                <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[8px]">🇬🇧</span>
                EN
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9"
          >
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                open ? "rotate-45 translate-y-[7px]" : ""
              } ${isTransparent && !open ? "bg-white" : "bg-gray-800"}`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                open ? "opacity-0" : ""
              } ${isTransparent && !open ? "bg-white" : "bg-gray-800"}`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              } ${isTransparent && !open ? "bg-white" : "bg-gray-800"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-400 ${
          open
            ? "max-h-[85vh] opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {[...leftLinks, ...rightLinks].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-4 text-[13px] font-bold tracking-widest text-gray-800 hover:text-[var(--bronze)] border-b border-gray-50 transition-colors"
              activeProps={{ className: "text-[var(--bronze)]" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
