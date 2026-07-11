"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const STATS = [
  { value: 25, suffix: "+", label: "Years at sea & on stage" },
  { value: 3, suffix: "", label: "Superyachts served" },
  { value: 1, suffix: "", label: "Album released" },
  { value: 2, suffix: "", label: "Ventures co-founded" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="font-display text-5xl font-semibold tabular-nums tracking-tight text-foam md:text-6xl">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="border-y border-foam/10 bg-abyss py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <CountUp value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-mist">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
