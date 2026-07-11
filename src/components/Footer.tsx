"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Anchor, Youtube, Globe, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer id="contact" className="relative overflow-hidden bg-ice pb-12 pt-28 text-navy md:pt-36">
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <motion.div
            initial={reduced ? undefined : { rotate: -12, scale: 0.8, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent shadow-lg shadow-accent/30"
          >
            <Anchor className="size-7 text-navy" aria-hidden />
          </motion.div>

          <h2 className="mt-8 font-display text-4xl font-bold tracking-tight md:text-7xl">
            Drop anchor. Say hello.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy/70">
            For collaborations, water sports, yachting or the next story,
            the deck is always open.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://rameshsilva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-navy px-7 py-3 font-semibold text-ice transition-transform duration-200 hover:scale-105"
            >
              <Globe className="size-5" aria-hidden />
              rameshsilva.com
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <a
              href="https://www.youtube.com/@WalkWithRAMA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-navy transition-transform duration-200 hover:scale-105"
            >
              <Youtube className="size-5" aria-hidden />
              Walk With RAMA
            </a>
          </div>
        </Reveal>

        <p className="mt-20 border-t border-navy/10 pt-8 font-mono text-xs uppercase tracking-widest text-navy/50">
          © {new Date().getFullYear()} Ramesh Rushantha Silva · Narahenpita →
          the open ocean
        </p>
      </div>
    </footer>
  );
}
