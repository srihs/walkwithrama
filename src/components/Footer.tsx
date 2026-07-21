"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Anchor, Youtube, Globe, ArrowUpRight, Facebook, Linkedin } from "lucide-react";
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
              href="https://en.wikipedia.org/wiki/Ramesh_Rushantha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-navy px-7 py-3 font-semibold text-ice transition-[transform,background-color,color] duration-200 hover:scale-105 hover:bg-accent hover:text-navy"
            >
              <Globe className="size-5" aria-hidden />
              Wikipedia
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <a
              href="https://www.youtube.com/@WalkWithRAMA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-navy px-7 py-3 font-semibold text-ice transition-[transform,background-color,color] duration-200 hover:scale-105 hover:bg-accent hover:text-navy"
            >
              <Youtube className="size-5" aria-hidden />
              Walk With RAMA
            </a>
            <a
              href="https://www.facebook.com/rameshrushanthasilva"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-navy px-7 py-3 font-semibold text-ice transition-[transform,background-color,color] duration-200 hover:scale-105 hover:bg-accent hover:text-navy"
            >
              <Facebook className="size-5" aria-hidden />
              Fan Page
            </a>
            <a
              href="https://www.facebook.com/ramesh.r.silva"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-navy px-7 py-3 font-semibold text-ice transition-[transform,background-color,color] duration-200 hover:scale-105 hover:bg-accent hover:text-navy"
            >
              <Facebook className="size-5" aria-hidden />
              Profile
            </a>
            <a
              href="https://www.linkedin.com/in/ramesh-rushantha-silva-32a811220/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-navy px-7 py-3 font-semibold text-ice transition-[transform,background-color,color] duration-200 hover:scale-105 hover:bg-accent hover:text-navy"
            >
              <Linkedin className="size-5" aria-hidden />
              LinkedIn
            </a>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-navy/10 pt-8 sm:flex-row">
          <p className="font-mono text-xs uppercase tracking-widest text-navy/50">
            © {new Date().getFullYear()} Ramesh Rushantha Silva · Colombo 05
            → the open ocean
          </p>
          <p className="text-xs text-navy/50">
            Site by{" "}
            <a
              href="https://www.axtelia.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-navy/70 transition-colors hover:text-navy"
            >
              Axtelia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
