"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ship, Compass, Waves, Anchor, Sailboat } from "lucide-react";
import ScrambleText from "./ScrambleText";
import Badge from "./Badge";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    year: "2005",
    title: "Merchant Navy",
    body: "Leaves Sri Lanka as a deck rating on commercial vessels. The first long horizon.",
    icon: Ship,
  },
  {
    year: "2008",
    title: "MY Amevi",
    body: "Sixteen years aboard the private and charter yacht: deckhand to deck instructor across European waters.",
    icon: Compass,
  },
  {
    year: "2020",
    title: "Senior Deck Instructor",
    body: "Promoted to senior deck instructor, teaching water sports on some of the world's finest yachts.",
    icon: Waves,
  },
  {
    year: "2024",
    title: "MY Brother Brancusi",
    body: "Joins the expedition yacht and earns promotion to bosun during his probationary period.",
    icon: Anchor,
  },
  {
    year: "2025",
    title: "The 96-Metre",
    body: "Steps aboard a 96-metre private and charter yacht. The voyage continues.",
    icon: Sailboat,
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
        className="mt-14 flex flex-col gap-6 px-6 pb-28 md:h-[70vh] md:flex-row md:flex-nowrap md:items-center md:gap-10 md:pb-32 md:pl-[max(1.5rem,calc((100vw-72rem)/2))] md:pr-[40vw]"
      >
        {CHAPTERS.map((chapter, i) => (
          <article
            key={chapter.year}
            className="group relative flex min-h-80 w-full shrink-0 flex-col justify-end overflow-hidden rounded-2xl border border-foam/10 bg-surface p-8 transition-colors duration-300 hover:border-accent/60 md:h-[26rem] md:w-[26rem]"
          >
            <span
              aria-hidden
              className="text-outline absolute right-4 top-2 font-display text-8xl font-bold leading-none opacity-60"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="absolute left-8 top-8 inline-flex size-12 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover:scale-105">
              <chapter.icon className="size-6 text-navy" aria-hidden />
            </span>
            <p className="font-mono text-sm tracking-[0.3em] text-primary">
              {chapter.year}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
              {chapter.title}
            </h3>
            <p className="mt-3 leading-relaxed text-mist">{chapter.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
