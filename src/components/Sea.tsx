"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ship, Compass, Anchor, Sailboat } from "lucide-react";
import ScrambleText from "./ScrambleText";
import Badge from "./Badge";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    years: "2005 - 2007",
    title: "M/V Parana & M/V Talca",
    role: "Deckhand (OS / AB), merchant marine",
    body: "A rock-solid maritime foundation on a 150m reefer and a 144m container ship: large-scale anchoring, heavy commercial crane operations, mooring and structural steel maintenance on demanding routes between Brazil, the Philippines and the Gulf.",
    icon: Ship,
    image: "/sea/parana.jpg",
  },
  {
    years: "2007 - 2023",
    title: "M/Y Amevi / Aalto / Batallo",
    role: "Deckhand → Deck Instructor",
    body: "Fifteen years aboard the 80m Oceanco, joined straight from build and became its longest-standing crew member. Trained incoming crew, worked 10-year refits at MB92 Barcelona, La Ciotat, Malta and Singapore, and ran VVIP watersports at the Monaco Grand Prix and Cannes Film Festival.",
    icon: Compass,
    image: "/sea/amevi.jpg",
  },
  {
    years: "2023 - 2024",
    title: "M/Y My Brother Brancusi",
    role: "Bosun (promoted during probation)",
    body: "A transatlantic crossing and Caribbean season on the 67m expedition yacht. Promoted from deckhand to bosun by the owner and captain, overseeing deck operations, crane workflows and anchoring through intensive owner trips across Colombia and the Caribbean.",
    icon: Anchor,
    image: "/sea/brancusi.jpg",
  },
  {
    years: "2024 - Present",
    title: "97m Lürssen",
    role: "Lead Deckhand (promoted from Senior Deckhand)",
    body: "Two Med seasons and two yard periods between Sète and La Ciotat: main guest tender driver around France, Monaco, Italy and Greece, majority of the paint work in the yard, and relief bosun. Added RYA PWC Instructor, Helideck Assistant and professional spray painting qualifications.",
    icon: Sailboat,
    image: null,
  },
];

export default function Sea() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const scrollWidth = track.scrollWidth - window.innerWidth;
          gsap.to(track, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${scrollWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sea" ref={sectionRef} className="relative overflow-hidden bg-ocean">
      <div className="pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <Badge>
            <ScrambleText text="Chapter 03 - Life at Sea" />
          </Badge>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Two decades on deck
          </h2>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-14 flex flex-col gap-6 px-6 pb-28 md:h-[74vh] md:flex-row md:flex-nowrap md:items-center md:gap-10 md:pb-32 md:pl-[max(1.5rem,calc((100vw-72rem)/2))] md:pr-[36vw]"
      >
        {CHAPTERS.map((chapter, i) => (
          <article
            key={chapter.title}
            className="group relative flex min-h-[26rem] w-full shrink-0 flex-col justify-end overflow-hidden rounded-2xl border border-foam/10 bg-surface p-8 transition-colors duration-300 hover:border-accent/60 md:h-[30rem] md:w-[32rem]"
          >
            {chapter.image && (
              <>
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 32rem"
                  className="object-cover opacity-70 transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-abyss/95 via-abyss/50 to-abyss/20"
                />
              </>
            )}
            <span
              aria-hidden
              className="text-outline absolute right-4 top-2 font-display text-8xl font-bold leading-none opacity-60"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="absolute left-8 top-8 inline-flex size-12 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover:scale-105">
              <chapter.icon className="size-6 text-navy" aria-hidden />
            </span>
            <div className="relative">
              <p className="font-mono text-sm tracking-[0.3em] text-primary">
                {chapter.years}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {chapter.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-primary/90">
                {chapter.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                {chapter.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
