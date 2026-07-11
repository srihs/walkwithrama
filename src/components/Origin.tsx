"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { GraduationCap, Trophy, BookOpen, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import ScrambleText from "./ScrambleText";
import Badge from "./Badge";

const FACTS = [
  {
    icon: Trophy,
    title: "Isipathana College",
    body: "Under-13 through XV rugby, three age-group cricket teams. The green-and-white shaped everything that followed.",
  },
  {
    icon: BookOpen,
    title: "First hustle, age 16",
    body: "Door-to-door book seller, hotel potter at Tangerine Beach, factory floors. Work started early and never really stopped.",
  },
  {
    icon: GraduationCap,
    title: "CINEC",
    body: "A/Ls in 2002, then Colombo International Nautical and Engineering College, the first bearing set toward the sea.",
  },
];

export default function Origin() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);

  return (
    <section
      id="origin"
      ref={ref}
      className="relative overflow-hidden bg-surface py-28 md:py-40"
    >
      <motion.p
        aria-hidden
        style={{ y: bgY }}
        className="text-outline pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[clamp(6rem,22vw,18rem)] leading-none"
      >
        1983
      </motion.p>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <Reveal>
            <Badge>
              <ScrambleText text="Chapter 01 - Origin" />
            </Badge>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Narahenpita, 30 March 1983
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
              The eldest child of the family, raised on schoolyard rugby and
              cricket pitches. Before the ocean, there was a classroom, a
              scrum, and a sixteen-year-old selling books door to door.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <TiltCard max={5} className="relative mx-auto w-full max-w-sm md:max-w-none">
              <Image
                src="/portrait.jpg"
                width={1440}
                height={1440}
                alt="Black-and-white portrait of Ramesh on a beach"
                sizes="(max-width: 768px) 90vw, 40vw"
                className="w-full rounded-3xl border border-foam/10 object-cover"
              />
              <span className="absolute -bottom-4 left-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-navy shadow-lg shadow-abyss/40">
                <MapPin className="size-4" aria-hidden />
                Narahenpita, Sri Lanka
              </span>
            </TiltCard>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.title} delay={i * 0.12} className="h-full">
              <TiltCard className="group h-full rounded-2xl border border-foam/10 bg-foam/[0.02] p-8 transition-colors duration-300 hover:border-accent/60">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover:-translate-y-1">
                  <fact.icon className="size-6 text-navy" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{fact.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{fact.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
