"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ChevronDown, Waves } from "lucide-react";
import Badge from "./Badge";
import ScrambleText from "./ScrambleText";

const NAME = "Ramesh Rushantha Silva";
const ROLES = [
  "Merchant Mariner  - Super Yacht Industry",
  "Travel Vlogger",
  "Jetskii Instructor",
  "Percussionist",
];
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [role, setRole] = useState(0);
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -120]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduced) videoRef.current?.pause();
  }, [reduced]);

  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-end overflow-hidden bg-abyss pb-24 pt-28 md:pb-28"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src="/hero.mp4?v=3"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      {/* legibility scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/30 to-abyss/80"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-abyss/70 via-transparent to-transparent"
      />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <div className="max-w-3xl">
          <Badge>
            <ScrambleText text="Welcome aboard - Walk With RAMA" />
          </Badge>

          <h1
            aria-label={NAME}
            className="mt-8 font-display text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            {NAME.split(" ").map((word, w, words) => {
              const offset = words
                .slice(0, w)
                .reduce((n, p) => n + p.length, 0);
              return (
                <span key={word} aria-hidden>
                  <span className="inline-block whitespace-nowrap">
                    {word.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={
                          reduced ? { opacity: 0 } : { opacity: 0, y: 60 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.7,
                          delay: 0.3 + (offset + i) * 0.04,
                          ease: EASE,
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  {w < words.length - 1 && " "}
                </span>
              );
            })}
          </h1>

          <div className="mt-3 h-8" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={role}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-lg text-primary md:text-xl"
              >
                {ROLES[role]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-4 max-w-xl text-balance leading-relaxed text-mist"
          >
            From Colombo 05 to the open ocean: twenty five years of stage
            lights, ship decks and stories worth telling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <a
              href="#origin"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ice px-7 py-3 font-semibold text-navy transition-transform duration-200 hover:scale-105"
            >
              Explore the Journey
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#vlogs"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-foam/40 px-7 py-3 font-semibold text-foam backdrop-blur-sm transition-colors duration-200 hover:border-foam"
            >
              Watch the Vlogs
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* floating glass stat card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.7, ease: EASE }}
        className="absolute bottom-24 right-10 z-10 hidden rounded-3xl bg-ice p-6 shadow-xl shadow-abyss/30 lg:block"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-accent">
            <Waves className="size-6 text-navy" aria-hidden />
          </span>
          <div>
            <p className="font-display text-2xl font-bold leading-none text-navy">
              20+ years
            </p>
            <p className="mt-1 text-sm text-navy/60">at sea and on stage</p>
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#origin"
        aria-label="Scroll to story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 flex size-11 -translate-x-1/2 items-center justify-center text-mist transition-colors hover:text-foam"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="size-6" />
        </motion.span>
      </motion.a>
    </section>
  );
}
