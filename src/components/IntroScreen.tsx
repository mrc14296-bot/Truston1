import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    // Phase 1: logo appears at 0ms
    // Phase 2: tagline appears at 900ms
    // Phase 3: exit wipe at 2400ms
    // Phase 4: unmount at 3200ms
    const t1 = setTimeout(() => setPhase("text"), 900);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(() => setVisible(false), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[var(--ink)] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated background lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-white/[0.04]"
                style={{ left: `${(i + 1) * (100 / 7)}%` }}
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.2, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>

          {/* Wipe exit overlay */}
          <motion.div
            className="absolute inset-0 bg-white origin-left z-10"
            initial={{ scaleX: 0 }}
            animate={phase === "exit" ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Logo + content */}
          <div className="relative z-[5] flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <img
                src="/logo.png"
                alt="TrustOn"
                className="h-24 w-24 object-contain brightness-110"
              />
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 60px 20px rgba(45,107,196,0.25)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-bold text-5xl md:text-7xl tracking-[0.25em] uppercase text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                TRUST<span className="text-[var(--bronze)]">ON</span>
              </h1>
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">Premium Estate · Lucknow</span>
            </motion.div>

            {/* Tagline */}
            <AnimatePresence>
              {phase !== "logo" && (
                <motion.p
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-xl md:text-2xl text-white/50 text-center"
                >
                  Own the Ground. Build the Legacy.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Animated line loader */}
            <motion.div
              className="w-32 h-px bg-white/10 relative overflow-hidden mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--bronze)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
