"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Music2, Disc3, Mic2 } from "lucide-react";
import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";
import Badge from "./Badge";

const TIMELINE = [
  {
    year: "1999",
    title: "The Kreators form",
    body: "Co-founds the band as percussionist in Sri Lanka's first ethnic fusion rock band.",
    icon: Music2,
  },
  {
    year: "2000",
    title: "“Sri Lankan Mix”",
    body: "The breakout song that put the band on the map.",
    icon: Disc3,
  },
  {
    year: "2002",
    title: "Animal Farm & TNL Onstage",
    body: "Backing band for the stage play Animal Farm; finalists at TNL Onstage.",
    icon: Mic2,
  },
  {
    year: "2010",
    title: "Kreators Reborn",
    body: "The band reforms in 2009 and releases the comeback album a year later.",
    icon: Disc3,
  },
];

export default function Music() {
  const reduced = useReducedMotion();

  return (
    <section
      id="music"
      className="grain relative overflow-hidden bg-abyss py-28 md:py-40"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <Badge>
            <ScrambleText text="Chapter 02 - The Kreators" />
          </Badge>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Before the sea, the stage
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <blockquote className="mt-10 max-w-3xl border-l-2 border-accent pl-6 text-2xl font-light italic leading-snug text-foam/90 md:text-3xl">
            The first ethnic fusion rock band in Sri Lanka. Drums first,
            everything else after.
          </blockquote>
        </Reveal>

        <div className="relative mt-20">
          <motion.div
            aria-hidden
            className="absolute left-[7px] top-0 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reduced ? 0 : 1.2, ease: "easeOut" }}
          />

          <ol className="space-y-14">
            {TIMELINE.map((item, i) => (
              <li key={item.year} className="relative">
                <Reveal delay={i * 0.08}>
                  <div
                    className={`flex flex-col gap-3 pl-10 md:w-1/2 md:pl-0 ${
                      i % 2 === 0
                        ? "md:pr-14 md:text-right"
                        : "md:ml-auto md:pl-14"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-1 size-4 rounded-full border-2 border-accent bg-abyss md:left-1/2 md:-translate-x-1/2"
                    />
                    <span className="font-mono text-sm tracking-widest text-accent">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="leading-relaxed text-mist">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* waveform morphing into a wave, bridging to the sea chapter */}
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        className="mt-24 block w-full text-ocean"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,48 L60,24 L120,64 L180,16 L240,56 L300,32 L360,60 L420,20 L480,52 C600,80 720,16 840,40 C960,64 1080,24 1200,44 C1320,64 1380,40 1440,48 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  );
}
