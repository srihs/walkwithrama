"use client";

import Image from "next/image";
import { ShieldCheck, Waves, GraduationCap, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";
import Badge from "./Badge";
import TiltCard from "./TiltCard";

const POINTS = [
  { icon: ShieldCheck, text: "RYA qualified professional tuition" },
  { icon: Waves, text: "Safe, confident riders" },
  { icon: GraduationCap, text: "Learn skills for life" },
];

export default function Training() {
  return (
    <section id="training" className="bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <TiltCard max={5}>
              <Image
                src="/training.jpg"
                width={1402}
                height={1122}
                alt="Ramesh in RYA instructor gear on a jet ski"
                sizes="(max-width: 768px) 90vw, 45vw"
                className="w-full rounded-2xl border border-foam/10 object-cover"
              />
            </TiltCard>
          </Reveal>

          <Reveal delay={0.15}>
            <Badge>
              <ScrambleText text="Chapter 05 - RYA Instructor" />
            </Badge>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Ride with confidence
            </h2>
            <p className="mt-6 leading-relaxed text-mist">
              Learn to ride with confidence through professional RYA Personal
              Watercraft (Jet Ski) training. Courses are designed for both
              beginners and experienced riders, with a strong focus on safety,
              practical skills and responsible operation. Gain the knowledge
              and confidence to enjoy every ride safely on the water.
            </p>

            <ul className="mt-8 space-y-4">
              {POINTS.map((point) => (
                <li key={point.text} className="flex items-center gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent">
                    <point.icon className="size-5 text-navy" aria-hidden />
                  </span>
                  <span className="font-semibold">{point.text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-navy transition-transform duration-200 hover:scale-105"
            >
              Book your training today
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
