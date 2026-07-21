"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play, Youtube, ListVideo } from "lucide-react";
import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";
import Badge from "./Badge";

const CHANNEL = "https://www.youtube.com/@WalkWithRAMA";
const EASE = [0.22, 1, 0.36, 1] as const;

const PLAYLISTS = [
  {
    id: "PLHZkOIX1I3m6D2VhKAkA2PiWQKgRaaV4k",
    title: "Travel Around The World",
    thumb: "xp8ZLPp5h5g",
  },
  {
    id: "PLHZkOIX1I3m7MUF4ov_bAq0sM6ynYVPJz",
    title: "New Gadgets & Water Sports",
    thumb: "dCtsMbQNHb4",
  },
  {
    id: "PLHZkOIX1I3m4TcyI5AuEaWWkBlGta0snf",
    title: "About Ramesh Rushantha Silva",
    thumb: "MDVXUl81Ncw",
  },
  {
    id: "PLHZkOIX1I3m4YYwcSuiJNx-Au2xr1crU1",
    title: "Beautiful Lanka",
    thumb: "Ae-i6Wybo-w",
  },
  {
    id: "PLHZkOIX1I3m4CR7IMboJfXcBEGprwpvTX",
    title: "Specials for Sri Lankans",
    thumb: "LdeqXMY8P5U",
  },
];

const VIDEOS = [
  {
    id: "xp8ZLPp5h5g",
    title: "13,000 Feet Sky Dive",
    tag: "Dubai from above",
    span: "md:col-span-2 md:row-span-2",
    thumb: "maxresdefault",
  },
  {
    id: "yv6vehOMXI4",
    title: "Deep Dive Dubai",
    tag: "The world's deepest dive pool",
    span: "",
    thumb: "maxresdefault",
  },
  {
    id: "6iIIQzg5SP4",
    title: "Colosseum, Rome",
    tag: "Walking ancient streets",
    span: "",
    thumb: "maxresdefault",
  },
  {
    id: "cJw1nwV-qcY",
    title: "The Pyramids of Giza",
    tag: "Egypt, part 1",
    span: "md:col-span-2",
    thumb: "maxresdefault",
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
          <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-mist">
            <p>
              Since leaving Sri Lanka in 2005, the journey has spanned the
              world, with professional training in modern water sports and
              adventure activities.
            </p>
            <p>
              Filmed where the action happens, these stories capture
              unforgettable experiences on the water while showcasing the
              innovation, excitement and beauty of modern water sports. They
              also demonstrate why Sri Lanka&apos;s spectacular coastline
              deserves recognition as one of the world&apos;s premier water
              sports destinations.
            </p>
            <p>
              Created to inspire, educate and encourage more Sri Lankans to
              discover the endless opportunities the ocean has to offer.
            </p>
          </div>
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

        <Reveal delay={0.1}>
          <h3 className="mt-16 font-display text-2xl font-bold tracking-tight">
            Playlists
          </h3>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PLAYLISTS.map((playlist, i) => (
            <Reveal key={playlist.id} delay={i * 0.06}>
              <a
                href={`https://youtube.com/playlist?list=${playlist.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-foam/10 bg-abyss transition-colors duration-300 hover:border-accent/60"
              >
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${playlist.thumb}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-md bg-abyss/85 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-foam">
                    <ListVideo className="size-3 text-accent" aria-hidden />
                    Playlist
                  </span>
                </div>
                <p className="p-3 text-sm font-semibold leading-snug">
                  {playlist.title}
                </p>
              </a>
            </Reveal>
          ))}
        </div>

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
