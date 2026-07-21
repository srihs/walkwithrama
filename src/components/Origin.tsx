"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Trophy, BookOpen, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import ScrambleText from "./ScrambleText";
import Badge from "./Badge";

const FACTS = [
  {
    icon: Trophy,
    title: "Isipathana College",
    body: "Ramesh completed his education at Isipathana College, where he built a strong foundation in leadership, sports and the arts. He represented the college in Under-13, Under-15 and Under-16 cricket, as well as Under-13, Under-15, Under-17 and First XV rugby. His passion for music led him to the Oriental Band, he served as Vice President of the Sinhala Literary Society in 2002, and contributed to the media and computer societies before completing his Advanced Levels that year.",
  },
  {
    icon: BookOpen,
    title: "First hustle, age 16",
    body: "At just 16, he began his working life as a door-to-door book seller, building confidence, resilience and valuable people skills. After completing his Advanced Level studies in 2002, he worked at a refrigerator manufacturing company in Ratmalana, then as a potter at Tangerine Beach Hotel in Kalutara. These early experiences shaped a work ethic that laid the foundation for everything that followed.",
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
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-6xl">
              Colombo 05, <br />Sri Lanka <br /> 30 March 1983
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-mist">
              <p>
                The eldest child of the family, Ramesh grew up with a strong
                sense of responsibility, discipline and curiosity. His
                childhood was shaped by two powerful influences: from his
                father&apos;s side came a deep love for music and dance, while
                his mother&apos;s side inspired a lifelong passion for sport.
              </p>
              <p>
                His early years were spent on the rugby fields and cricket
                pitches of school, where teamwork, resilience and
                determination became second nature. Beyond the classroom, he
                embraced music as a percussionist, discovering the rhythm and
                creativity that would stay with him throughout life.
              </p>
              <p>
                These experiences laid the foundation for a life driven by
                adventure, discipline and an unwavering determination to keep
                moving forward.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <TiltCard max={5} className="relative mx-auto w-full max-w-sm md:max-w-none">
              <Image
                src="/portrait.jpg"
                width={373}
                height={373}
                alt="Portrait of Ramesh"
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

        <div className="mt-16 grid gap-6 md:grid-cols-2">
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
