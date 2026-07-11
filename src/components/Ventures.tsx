"use client";

import { Recycle, School, Megaphone, Waves } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import ScrambleText from "./ScrambleText";
import Badge from "./Badge";

const VENTURES = [
  {
    icon: Recycle,
    year: "2022",
    title: "Universal Green Solutions",
    body: "Co-founded with entrepreneur Roshan Yaheya to develop waste-conversion machinery for a cleaner Sri Lanka.",
  },
  {
    icon: School,
    year: "Ongoing",
    title: "Isipathana Online Information Center",
    body: "CEO of the alma mater's online information hub, keeping the school community connected worldwide.",
  },
  {
    icon: Megaphone,
    year: "Advocacy",
    title: "Henry Pedris Ground",
    body: "A public voice for Isipathana College's custodianship of the ground for school rugby.",
  },
  {
    icon: Waves,
    year: "Advocacy",
    title: "Water Sports Tourism",
    body: "Championing water sports development as a growth engine for Sri Lankan tourism.",
  },
];

export default function Ventures() {
  return (
    <section id="ventures" className="bg-ocean py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Badge>
            <ScrambleText text="Chapter 05 - Back to Shore" />
          </Badge>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Ventures & advocacy
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {VENTURES.map((venture, i) => (
            <Reveal key={venture.title} delay={i * 0.1} className="h-full">
              <TiltCard className="group flex h-full gap-6 rounded-2xl border border-foam/10 bg-foam/[0.02] p-8 transition-colors duration-300 hover:border-accent/60">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover:-translate-y-1">
                  <venture.icon className="size-6 text-navy" aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-mist">
                    {venture.year}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold">{venture.title}</h3>
                  <p className="mt-3 leading-relaxed text-mist">{venture.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
