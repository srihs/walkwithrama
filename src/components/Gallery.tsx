"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";
import Badge from "./Badge";

const PHOTOS = [
  {
    src: "/gallery/malta-blue-lagoon.jpg",
    w: 1600,
    h: 900,
    alt: "Ramesh sitting on a cliff edge above the turquoise Blue Lagoon",
    place: "Blue Lagoon, Malta",
  },
  {
    src: "/gallery/sunset-shore.jpg",
    w: 639,
    h: 960,
    alt: "Silhouette of Ramesh on a rocky shore at sunset",
    place: "Golden hour",
  },
  {
    src: "/gallery/ski-slopes.jpg",
    w: 1280,
    h: 960,
    alt: "Ramesh posing with skis on a snowy slope",
    place: "The slopes",
  },
  {
    src: "/gallery/sea-cave.jpg",
    w: 1381,
    h: 640,
    alt: "Green light glowing through an underwater sea cave",
    place: "Below the surface",
  },
  {
    src: "/gallery/palma-mallorca.jpg",
    w: 1600,
    h: 1200,
    alt: "Ramesh sitting by the water in front of Palma Cathedral",
    place: "Palma de Mallorca",
  },
  {
    src: "/gallery/paddleboard.jpg",
    w: 720,
    h: 540,
    alt: "Stand-up paddleboarding silhouetted against the sun",
    place: "Open water",
  },
  {
    src: "/gallery/colosseum-rome.jpg",
    w: 1600,
    h: 1067,
    alt: "Ramesh standing in front of the Colosseum",
    place: "Rome, Italy",
  },
  {
    src: "/gallery/rome-overlook.jpg",
    w: 1600,
    h: 1067,
    alt: "Ramesh at a street overlook near the Colosseum",
    place: "Rome, Italy",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-ocean py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Badge>
            <ScrambleText text="Gallery - The Logbook" />
          </Badge>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Moments from the voyage
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
            Cliff edges in Malta, ski slopes, sea caves and Roman streets.
            A life logged one port at a time.
          </p>
        </Reveal>

        <div className="mt-14 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 3) * 0.08}>
              <figure className="group relative overflow-hidden rounded-2xl border border-foam/10">
                <Image
                  src={photo.src}
                  width={photo.w}
                  height={photo.h}
                  alt={photo.alt}
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="w-full transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-abyss/90 to-transparent p-4 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <MapPin className="size-3.5 text-accent" aria-hidden />
                  <span className="text-xs font-medium text-foam">
                    {photo.place}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
