import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";

const services = [
  { label: "Plot Selling", to: "/plot-selling" },
  { label: "Architecture & Design", to: "/architecture-design" },
  { label: "Construction & Build", to: "/construction-build" },
  { label: "Investment Consulting", to: "/investment-consulting" },
] as const;

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-us" },
  { label: "Project", to: "/project" },
  { label: "Partner", to: "/channel-partner" },
  { label: "Contact", to: "/contact" },
] as const;

export function LuxeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
  }, [loc.pathname]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-700 ${
            scrolled ? "glass-light card-shadow" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="TrustOn Logo" className="h-10 w-auto object-contain brightness-110" />
            <div className="flex flex-col -gap-1">
              <span className="text-bronze text-xl font-display leading-none tracking-[0.2em] uppercase">TrustOn</span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-ink/60 font-medium">Premium Estate</span>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/" className="text-[11px] uppercase tracking-luxe text-foreground/70 hover:text-bronze transition-colors duration-500 underline-bronze" activeProps={{ className: "text-bronze" }}>Home</Link>
            <Link to="/about-us" className="text-[11px] uppercase tracking-luxe text-foreground/70 hover:text-bronze transition-colors duration-500 underline-bronze" activeProps={{ className: "text-bronze" }}>About</Link>
            <Link to="/project" className="text-[11px] uppercase tracking-luxe text-foreground/70 hover:text-bronze transition-colors duration-500 underline-bronze" activeProps={{ className: "text-bronze" }}>Project</Link>

            <div
              className="relative"
              onMouseEnter={() => setSvcOpen(true)}
              onMouseLeave={() => setSvcOpen(false)}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-[11px] uppercase tracking-luxe text-foreground/70 hover:text-bronze transition-colors duration-500 underline-bronze"
                activeProps={{ className: "text-bronze" }}
              >
                Services <span className="text-[8px] opacity-60">▾</span>
              </Link>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 ${
                  svcOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="min-w-[260px] rounded-2xl glass-light card-shadow p-3">
                  <Link
                    to="/services"
                    className="block px-4 py-2.5 text-[11px] uppercase tracking-luxe text-bronze border-b border-border/60 mb-1"
                  >
                    All Services →
                  </Link>
                  {services.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="block px-4 py-2.5 text-xs font-serif text-foreground/80 hover:text-bronze hover:bg-sand/60 rounded-md transition-colors"
                      activeProps={{ className: "text-bronze" }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {links.slice(3).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[11px] uppercase tracking-luxe text-foreground/70 hover:text-bronze transition-colors duration-500 underline-bronze"
                activeProps={{ className: "text-bronze" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-2.5 text-[10px] uppercase tracking-[0.2em] hover:bg-bronze transition-all duration-700 shadow-lg shadow-ink/10"
          >
            Enquire Now
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5"
          >
            <span className={`block w-6 h-px bg-ink transition-transform ${open ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-6 h-px bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-ink transition-transform ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[88px] mx-6 rounded-2xl glass-light overflow-hidden transition-all duration-500 ${
          open ? "max-h-[85vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-6 gap-1">
          <Link to="/" className="py-3 px-2 text-sm uppercase tracking-luxe text-foreground/80 hover:text-bronze border-b border-border" activeProps={{ className: "text-bronze" }}>Home</Link>
          <Link to="/about-us" className="py-3 px-2 text-sm uppercase tracking-luxe text-foreground/80 hover:text-bronze border-b border-border" activeProps={{ className: "text-bronze" }}>About</Link>
          <Link to="/project" className="py-3 px-2 text-sm uppercase tracking-luxe text-foreground/80 hover:text-bronze border-b border-border" activeProps={{ className: "text-bronze" }}>Project</Link>

          <Link to="/services" className="pt-4 pb-2 px-2 text-[11px] uppercase tracking-luxe text-bronze" activeProps={{ className: "text-bronze" }}>Services</Link>
          {services.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="py-2.5 pl-5 pr-2 text-sm font-serif text-foreground/75 hover:text-bronze border-b border-border/60"
              activeProps={{ className: "text-bronze" }}
            >
              — {s.label}
            </Link>
          ))}

          {links.slice(3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3 px-2 mt-1 text-sm uppercase tracking-luxe text-foreground/80 hover:text-bronze border-b border-border last:border-0"
              activeProps={{ className: "text-bronze" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-4 inline-flex justify-center rounded-full bg-bronze text-cream px-6 py-3 text-xs uppercase tracking-luxe"
          >
            Enquire Now
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
