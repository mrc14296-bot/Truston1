import { Reveal } from "./Reveal";
import plotImg from "@/assets/plot-tracker.jpg";

export function PlotTracker() {
  const total = 150, sold = 45, booked = 20, available = 85;
  const pct = Math.round(((sold + booked) / total) * 100);

  return (
    <section id="estate" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img src={plotImg} alt="" className="w-full h-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="text-gold text-xs uppercase tracking-luxe text-center mb-4">
            Prime Estate
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-3">
            Plot <em className="gradient-gold-text not-italic">Tracker</em>
          </h2>
          <p className="text-center text-muted-foreground mb-16">
            Real-time availability status updated for Phase 1 & 2
          </p>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-5 mb-12">
          {[
            { label: "Total Plots", value: total, sub: "Full Inventory" },
            { label: "Sold", value: sold, sub: "30% Complete" },
            { label: "Booked", value: booked, sub: "Processing" },
            { label: "Available", value: available, sub: "Ready to Book" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass rounded-xl p-8 hover-lift">
                <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{s.label}</p>
                <p className="font-display text-6xl gradient-gold-text my-3">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass-strong rounded-2xl p-10">
            <div className="flex flex-wrap items-baseline justify-between mb-4">
              <p className="text-xs uppercase tracking-luxe text-muted-foreground">Overall Status</p>
              <p className="font-serif text-3xl text-gold">{pct}% Reserved</p>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden mb-6 relative">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: "var(--gradient-gold)" }}
              />
              <div className="absolute inset-0 shimmer rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <Legend color="oklch(0.78 0.09 78)" label={`Sold (${sold})`} />
              <Legend color="oklch(0.86 0.06 82)" label={`Booked (${booked})`} />
              <Legend color="oklch(0.4 0.005 60)" label={`Available (${available})`} />
            </div>
            <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-serif text-xl text-gold">Fast-selling inventory!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  43% of Phase 1 is already reserved. Contact sales team now.
                </p>
              </div>
              <a href="#contact" className="rounded-full bg-gold text-primary-foreground px-7 py-3 text-xs uppercase tracking-luxe hover:gold-shadow transition-all">
                Contact Sales
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className="inline-block w-3 h-3 rounded-full" style={{ background: color }} />
      {label}
    </div>
  );
}
