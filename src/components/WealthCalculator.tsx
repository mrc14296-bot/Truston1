import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function WealthCalculator() {
  const [investment, setInvestment] = useState(2500000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(10);

  const maturity = useMemo(
    () => investment * Math.pow(1 + rate / 100, years),
    [investment, years, rate]
  );
  const profit = maturity - investment;
  const totalReturn = (profit / investment) * 100;

  return (
    <section id="wealth" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal to-background" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-gold text-xs uppercase tracking-luxe text-center mb-4">
            Wealth Planner
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-3">
            Calculate Your <em className="gradient-gold-text not-italic">Returns</em>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
            Adjust the sliders to see your investment grow.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          <Reveal>
            <div className="glass rounded-2xl p-10 h-full space-y-10">
              <Slider
                label="Initial Investment"
                value={`₹${inr(investment)}`}
                min={500000}
                max={20000000}
                step={100000}
                v={investment}
                set={setInvestment}
              />
              <Slider
                label="Holding Period (Years)"
                value={`${years} Years`}
                min={1}
                max={25}
                step={1}
                v={years}
                set={setYears}
              />
              <Slider
                label="Expected Annual Growth"
                value={`${rate}% Per Year`}
                min={5}
                max={25}
                step={1}
                v={rate}
                set={setRate}
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative rounded-2xl glass-strong p-10 h-full gold-shadow overflow-hidden">
              <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gold/20 blur-3xl float-slow" />
              <p className="text-xs uppercase tracking-luxe text-muted-foreground">
                Estimated Maturity Value
              </p>
              <p className="font-display text-6xl md:text-7xl gradient-gold-text mt-3 mb-10">
                ₹{inr(maturity)}
              </p>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <Stat label="Total Investment" value={`₹${inr(investment)}`} />
                <Stat label="Net Profit" value={`+₹${inr(profit)}`} accent />
                <Stat label="Total Return" value={`+${totalReturn.toFixed(0)}%`} accent />
                <Stat label="Annualized Yield" value={`+${rate}%`} accent />
              </div>
              <div className="mt-10 pt-6 border-t border-border">
                <p className="text-foreground font-serif text-xl italic">
                  ₹{(investment / 100000).toFixed(0)}L invested → ₹{(maturity / 100000).toFixed(0)}L
                  in {years} years.
                </p>
                <p className="text-muted-foreground text-xs mt-2 leading-relaxed">
                  Lucknow's prime locations have seen up to 25% annual appreciation. This
                  calculator uses a conservative estimate for your safety.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label, value, min, max, step, v, set,
}: { label: string; value: string; min: number; max: number; step: number; v: number; set: (n: number) => void }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-xs uppercase tracking-luxe text-muted-foreground">{label}</span>
        <span className="font-serif text-2xl text-gold">{value}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={v}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full h-px appearance-none bg-border accent-[var(--gold)] cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold
          [&::-webkit-slider-thumb]:shadow-[0_0_20px_var(--gold)]"
      />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-1">{label}</p>
      <p className={`font-serif text-2xl ${accent ? "text-gold" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
