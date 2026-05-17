import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Estate", href: "#estate" },
  { label: "Wealth", href: "#wealth" },
  { label: "Investment", href: "#invest" },
  { label: "Services", href: "#services" },
  { label: "Project", href: "#project" },
  { label: "Contact", href: "#contact" },
];

export function LuxeNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-6 ${scrolled ? "" : ""}`}>
        <div
          className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-700 ${
            scrolled ? "glass-strong gold-shadow" : "glass"
          }`}
        >
          <a href="#top" className="flex items-center gap-2">
            <span className="text-gold text-2xl font-serif italic tracking-tight">Trust</span>
            <span className="text-foreground text-2xl font-serif tracking-tight">On</span>
          </a>
          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-luxe text-muted-foreground hover:text-gold transition-colors duration-500"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full gold-border px-5 py-2 text-xs uppercase tracking-luxe text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-500"
          >
            Enquire
          </a>
        </div>
      </div>
    </motion.header>
  );
}
