"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play, Youtube } from "lucide-react";
import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";
import Badge from "./Badge";

const CHANNEL = "https://www.youtube.com/@WalkWithRAMA";
const EASE = [0.22, 1, 0.36, 1] as const;

const VIDEOS = [
  {
    id: "yv6vehOMXI4",
    title: "Deep Dive Dubai",
    tag: "The world's deepest dive pool",
    span: "md:col-span-2 md:row-span-2",
    thumb: "maxresdefault",
  },
  {
    id: "JltuXzl1pg0",
    title: "Sea-Doo Speedster",
    tag: "Water sports in Sri Lanka",
    span: "",
    thumb: "maxresdefault",
  },
  {
    id: "hwXLwZSUzjY",
    title: "A Yacht Marina for Sri Lanka?",
    tag: "Yacht life, episode 1",
    span: "",
    thumb: "sddefault",
  },
  {
    id: "c-hQAmyqfKg",
    title: "Ravana Cut, Swami Rock",
    tag: "Dive sites of Sri Lanka",
    span: "md:col-span-2",
    thumb: "sddefault",
  },
];

export default function Vlogs() {
  const reduced = useReducedMotion();

  const grid = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.14, delayChildren: 0.1 },
    },
  };

  const tile = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 56, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: EASE },
    },
  };

  const zoom = {
    hidden: reduced ? {} : { scale: 1.18 },
    show: {
      scale: 1,
      transition: { duration: 1.2, ease: EASE },
    },
  };

  return (
    <section id="vlogs" className="bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Badge>
            <ScrambleText text="Chapter 04 - Walk With RAMA" />
          </Badge>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Stories from the water
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
            Travel and water sports, filmed where the work happens, and a
            standing case that Sri Lanka&apos;s coasts belong on the
            world&apos;s water-sports map.
          </p>
        </Reveal>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="mt-14 grid auto-rows-[11rem] gap-4 md:grid-cols-3"
        >
          {VIDEOS.map((video) => (
            <motion.div key={video.id} variants={tile} className={video.span}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${video.title} on YouTube`}
                className="group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-foam/10 bg-abyss"
              >
                <motion.div variants={zoom} className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/${video.thumb}.jpg`}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </motion.div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/20 to-transparent"
                />
                <span className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-accent text-navy shadow-lg shadow-abyss/40 transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-4 fill-current" aria-hidden />
                </span>
                <div className="relative p-6">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-primary">
                    {video.tag}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold tracking-tight md:text-2xl">
                    {video.title}
                  </h3>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.2}>
          <a
            href={CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full bg-accent px-7 py-3 font-semibold text-navy transition-transform duration-200 hover:scale-105"
          >
            <Youtube className="size-5" aria-hidden />
            Visit the channel
          </a>
        </Reveal>
      </div>
    </section>
  );
}
