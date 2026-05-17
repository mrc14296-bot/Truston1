import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-estate.jpg";
import projectImg from "@/assets/project-prime.jpg";
import interiorImg from "@/assets/luxury-interior.jpg";
import lucknowImg from "@/assets/lucknow-aerial.jpg";
import { LuxeNav } from "@/components/LuxeNav";
import { Reveal } from "@/components/Reveal";
import { PlotTracker } from "@/components/PlotTracker";
import { WealthCalculator } from "@/components/WealthCalculator";
import { Testimonials } from "@/components/Testimonials";
import { CursorGlow } from "@/components/CursorGlow";
import { useLenis } from "@/lib/smooth-scroll";

export const Route = createFileRoute("/")({ component: Index });

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 1.2, delay: i * 0.15, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

function Index() {
  useLenis();
  return (
    <div id="top" className="bg-background text-foreground relative overflow-x-hidden">
      <CursorGlow />
      <LuxeNav />
      <Hero />
      <Marquee />
      <PlotTracker />
      <Highlights />
      <WealthCalculator />
      <AboutPrime />
      <InvestLucknow />
      <Services />
      <Project />
      <WhyTrust />
      <Testimonials />
      <ChannelPartner />
      <Contact />
      <Footer />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[720px] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Aerial view of Prime Estate luxury township at twilight"
          className="w-full h-full object-cover ken-burns"
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-16 max-w-7xl mx-auto"
      >
        <motion.p
          initial="hidden" animate="show" custom={0} variants={fadeUp}
          className="text-gold text-xs uppercase tracking-luxe mb-8"
        >
          🏡 Welcome to TrustOn
        </motion.p>
        <motion.h1
          initial="hidden" animate="show" custom={1} variants={fadeUp}
          className="font-display text-[15vw] md:text-[8vw] leading-[0.95] tracking-tight"
        >
          Own the <em className="gradient-gold-text not-italic">Ground.</em>
          <br />
          Build the <span className="font-serif italic">Legacy.</span>
        </motion.h1>
        <motion.div
          initial="hidden" animate="show" custom={2} variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="#estate"
            className="group inline-flex items-center gap-3 rounded-full bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:gold-shadow transition-all duration-500"
          >
            Explore Prime Estate
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
          <a href="#wealth" className="text-xs uppercase tracking-luxe text-muted-foreground hover:text-gold transition">
            Calculate Returns
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">Scroll</span>
        <span className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}

function Marquee() {
  const words = ["Cinematic Living", "Editorial Architecture", "Premium Plots", "Jila Panchayat Approved", "Legacy Investments"];
  return (
    <div className="border-y border-border py-8 overflow-hidden bg-charcoal/40">
      <div className="flex whitespace-nowrap marquee gap-16">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex gap-16 shrink-0">
            {words.map((w, i) => (
              <span key={`${k}-${i}`} className="font-serif text-3xl italic text-muted-foreground">
                {w} <span className="text-gold mx-8">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Highlights() {
  const cards = [
    { title: "Premium Living", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/modern-interior-design-interior-600x800.jpg" },
    { title: "Green Development", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg" },
    { title: "Modern Amenities", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hotel-lobby-interior-600x800.jpg" },
    { title: "Property Guidance", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/businessman-explaining-concept-details-600x800.jpg" },
    { title: "Reasonable Pricing", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/close-up-hand-holding-cash-600x800.jpg" },
  ];
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden group hover-lift">
              <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-serif text-xl text-foreground group-hover:text-gold transition-colors duration-500">
                  {c.title}
                </p>
                <span className="block w-8 h-px bg-gold mt-3 transition-all duration-500 group-hover:w-16" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AboutPrime() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden luxe-shadow">
            <img src={interiorImg} alt="Luxury interior" loading="lazy" className="w-full h-full object-cover ken-burns" />
            <div className="absolute inset-0 gold-border rounded-2xl" />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="text-gold text-xs uppercase tracking-luxe mb-4">
              Own the Ground. Build Your Legacy.
            </p>
            <h2 className="font-display text-5xl md:text-6xl leading-tight mb-8">
              Prime Estate — where <em className="gradient-gold-text not-italic">imagination</em> takes shape.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Prime Estate is a trusted name in real estate development, built on a foundation
              of transparency, quality, and long-term vision. We don't just sell land — we craft
              opportunities. Our flagship project, Prime Estate, is a Jila Panchayat approved
              township that combines legal security, prime location, and future-ready infrastructure.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="glass rounded-xl p-6">
                <p className="text-gold text-xs uppercase tracking-luxe mb-2">Our Mission</p>
                <p className="font-serif text-lg">
                  Make premium, legally secure land ownership accessible to every aspiring homeowner and investor.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <p className="text-gold text-xs uppercase tracking-luxe mb-2">Our Vision</p>
                <p className="font-serif text-lg">
                  Build not just properties, but thriving communities where families live, businesses grow, and life flourishes.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <a href="#contact" className="rounded-full gold-border px-7 py-3 text-xs uppercase tracking-luxe text-gold hover:bg-gold hover:text-primary-foreground transition-all">
                Read More
              </a>
              <div>
                <p className="text-xs uppercase tracking-luxe text-muted-foreground">Call Anytime</p>
                <p className="font-serif text-2xl text-gold">+91 96160-61166</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InvestLucknow() {
  const items = [
    { t: "Lucknow Metro", d: "Extended metro lines are boosting surrounding land values across key residential zones." },
    { t: "Purvanchal Expressway", d: "Direct connectivity to UP's fastest-growing economic and industrial corridor." },
    { t: "25% Land Appreciation", d: "Premium zones in Lucknow have seen up to 25% appreciation in the last 3 years." },
    { t: "Airport Expansion", d: "The new international terminal is driving demand for premium residential properties nearby." },
  ];
  return (
    <section id="invest" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img src={lucknowImg} alt="" className="w-full h-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="text-gold text-xs uppercase tracking-luxe text-center mb-4">
            NRI / Investment
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-6">
            Why Invest in <em className="gradient-gold-text not-italic">Lucknow?</em>
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-20">
            Lucknow is one of India's fastest-growing real estate markets — driven by world-class
            infrastructure, government-backed smart city initiatives, and rapidly rising land
            values. An ideal destination for NRI buyers and long-term investors looking for high
            returns with low risk.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.1}>
              <div className="glass rounded-xl p-8 h-full hover-lift">
                <span className="font-display text-5xl gradient-gold-text">0{i + 1}</span>
                <h3 className="font-serif text-2xl mt-6 mb-3">{it.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { title: "Plot Selling", sub: "Premium Plots. Zero Compromise.", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-1024x768.jpg" },
    { title: "Architecture & Design", sub: "Your Vision, Brought to Life on Paper First", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg" },
    { title: "Construction & Build", sub: "We Don't Just Build Buildings. We Build Promises", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-scaled.jpg" },
    { title: "Investment Consulting", sub: "Buy Smart. Invest Smarter.", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-waxman-f9qZuKoZYoY-unsplash-1-scaled.jpg" },
  ];
  return (
    <section id="services" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-gold text-xs uppercase tracking-luxe text-center mb-4">
            Our Services
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-20">
            Everything you need, <em className="gradient-gold-text not-italic">under one roof.</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <article className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer hover-lift">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <p className="text-xs uppercase tracking-luxe text-gold mb-3">
                    0{i + 1} — Service
                  </p>
                  <h3 className="font-display text-4xl mb-2">{s.title}</h3>
                  <p className="text-muted-foreground font-serif italic">{s.sub}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-luxe text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700">
                    Discover →
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-20 text-center">
            <p className="text-xs uppercase tracking-luxe text-gold mb-3">Hurry</p>
            <p className="font-serif italic text-2xl text-muted-foreground">
              Don't be late — the time is running fast. Choose the luxury.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Project() {
  return (
    <section id="project" className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-gold text-xs uppercase tracking-luxe text-center mb-4">Project</p>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-3 leading-tight">
            Where imagination takes shape in <em className="gradient-gold-text not-italic">luxury.</em>
          </h2>
          <p className="text-center text-muted-foreground font-serif italic text-lg mb-16">
            Crafted for those who expect nothing less than exceptional living.
          </p>
        </Reveal>

        <Reveal>
          <div className="relative rounded-2xl overflow-hidden luxe-shadow group">
            <div className="relative aspect-[21/9]">
              <img src={projectImg} alt="Prime Estate" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16 max-w-2xl">
              <p className="text-xs uppercase tracking-luxe text-gold mb-3">Residential</p>
              <h3 className="font-display text-5xl md:text-6xl mb-6">Prime Estate</h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                A flagship Jila Panchayat approved township in Lucknow — combining legal security,
                prime location, and future-ready infrastructure.
              </p>
              <a href="#contact" className="inline-flex w-fit rounded-full bg-gold text-primary-foreground px-7 py-3 text-xs uppercase tracking-luxe hover:gold-shadow transition-all">
                View Project
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyTrust() {
  const items = [
    { t: "Legal Security", d: "Every plot backed by Jila Panchayat approval & clear title deeds." },
    { t: "Transparent Dealings", d: "No hidden charges. What we quote is what you pay." },
    { t: "Design Expertise", d: "In-house architects who understand your vision, not just blueprints." },
    { t: "Prime Location", d: "Strategic positioning with road access & utility connections." },
    { t: "Quality Construction", d: "Grade-A materials, skilled workforce, no shortcuts." },
    { t: "After-Sale Support", d: "We stay with you long after the deal is signed." },
  ];
  return (
    <section className="py-32 px-6 bg-charcoal/30">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-gold text-xs uppercase tracking-luxe text-center mb-4">
            Why Choose Us
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-20">
            Why buyers trust <em className="gradient-gold-text not-italic">Prime Estate.</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.07}>
              <div className="glass rounded-xl p-8 h-full hover-lift">
                <span className="text-gold font-serif text-3xl">0{i + 1}</span>
                <h3 className="font-serif text-2xl mt-4 mb-3">{it.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-20 text-center max-w-3xl mx-auto">
            <h3 className="font-display text-3xl md:text-4xl mb-5">
              Built for those who expect <em className="gradient-gold-text not-italic">value</em> from every square foot.
            </h3>
            <p className="text-muted-foreground mb-8">
              We develop thoughtfully designed residential and commercial spaces that combine
              location advantage, modern architecture, and long-term value.
            </p>
            <a href="#project" className="rounded-full gold-border px-7 py-3 text-xs uppercase tracking-luxe text-gold hover:bg-gold hover:text-primary-foreground transition-all">
              Explore Projects
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChannelPartner() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="text-gold text-xs uppercase tracking-luxe mb-4">
            Channel Partner Program
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-tight mb-6">
            Earn more by partnering with <em className="gradient-gold-text not-italic">TrustOn</em> today.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Are you a real estate agent or broker? Join TrustOn's Channel Partner Program and
            start earning premium commissions on every deal — with full marketing support,
            RERA-compliant projects, and a team that's always in your corner.
          </p>
          <a href="#contact" className="inline-flex rounded-full bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:gold-shadow transition-all">
            Register Now
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden luxe-shadow">
            <img
              src="https://truston.advrtisinguru.com/wp-content/uploads/2026/01/ser3.jpg"
              alt="Channel Partner Program"
              loading="lazy"
              className="w-full h-full object-cover ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden bg-charcoal/40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-gold text-xs uppercase tracking-luxe text-center mb-4">
            Send Message
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-20 leading-tight">
            For any query, <em className="gradient-gold-text not-italic">get in touch.</em>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Reveal>
            <div className="glass rounded-xl p-8">
              <p className="text-xs uppercase tracking-luxe text-muted-foreground mb-2">Call Us</p>
              <p className="font-serif text-2xl text-gold">+91 96160-61166</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-xl p-8">
              <p className="text-xs uppercase tracking-luxe text-muted-foreground mb-2">Email Us</p>
              <p className="font-serif text-xl text-gold break-all">trustondevelopers01@gmail.com</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="glass rounded-xl p-8">
              <p className="text-xs uppercase tracking-luxe text-muted-foreground mb-2">Visit</p>
              <p className="font-serif text-xl text-foreground">Lucknow, Uttar Pradesh</p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <form className="glass-strong rounded-2xl p-10 grid md:grid-cols-2 gap-6">
            <Field label="First Name" />
            <Field label="Last Name" />
            <Field label="Mobile Number" type="tel" />
            <Field label="Email" type="email" />
            <div className="md:col-span-2">
              <Field label="Your Message" textarea />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-gold text-primary-foreground px-10 py-4 text-xs uppercase tracking-luxe hover:gold-shadow transition-all"
              >
                Submit Form
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, type = "text", textarea }: { label: string; type?: string; textarea?: boolean }) {
  const cls = "w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground placeholder:text-muted-foreground transition-colors";
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea rows={4} className={cls} placeholder="..." />
      ) : (
        <input type={type} className={cls} placeholder="..." />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-10 items-start">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gold text-3xl font-serif italic">Trust</span>
            <span className="text-foreground text-3xl font-serif">On</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Own the Ground. Build the Legacy. Premium plotted developments in Lucknow.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-luxe text-gold mb-4">Navigate</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#estate" className="hover:text-gold transition">Prime Estate</a></li>
            <li><a href="#services" className="hover:text-gold transition">Services</a></li>
            <li><a href="#project" className="hover:text-gold transition">Project</a></li>
            <li><a href="#contact" className="hover:text-gold transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-luxe text-gold mb-4">Contact</p>
          <p className="text-sm text-muted-foreground">+91 96160-61166</p>
          <p className="text-sm text-muted-foreground">trustondevelopers01@gmail.com</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-border flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} TrustOn Developers. All rights reserved.</span>
        <span className="tracking-luxe uppercase">Crafted with luxury in mind</span>
      </div>
    </footer>
  );
}
