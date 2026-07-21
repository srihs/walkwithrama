"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#origin", label: "Origin" },
  { href: "#music", label: "Music" },
  { href: "#sea", label: "Life at Sea" },
  { href: "#vlogs", label: "Vlogs" },
  { href: "#training", label: "Training" },
  { href: "#gallery", label: "Gallery" },
  { href: "#ventures", label: "Ventures" },
];

const GLYPHS = "!<>-_\\/[]{}=+*^?#";

function ScrambleLink({ href, label, onClick, className }: {
  href: string;
  label: string;
  onClick?: () => void;
  className: string;
}) {
  const [text, setText] = useState(label);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function scramble() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (timer.current) clearInterval(timer.current);
    let frame = 0;
    const total = label.length * 2;
    timer.current = setInterval(() => {
      frame++;
      const progress = frame / total;
      setText(
        label
          .split("")
          .map((char, i) =>
            char === " " || i < progress * label.length
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
      if (frame >= total && timer.current) {
        setText(label);
        clearInterval(timer.current);
      }
    }, 28);
  }

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={scramble}
      aria-label={label}
      className={className}
    >
      <span aria-hidden>{text}</span>
    </a>
  );
}

function Clock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Colombo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hidden font-mono text-[11px] tracking-widest text-navy/60 lg:inline">
      COLOMBO {time}
    </span>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden
      />
      <div className="mx-auto max-w-6xl rounded-3xl bg-ice/95 shadow-lg shadow-abyss/20 backdrop-blur-md md:rounded-full">
        <nav className="flex items-center justify-between gap-6 px-6 py-3">
          <a
            href="#top"
            className="whitespace-nowrap font-script text-2xl leading-none text-navy md:text-[1.7rem]"
          >
            Ramesh Rushantha Silva
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <ScrambleLink
                  href={link.href}
                  label={link.label}
                  className="whitespace-nowrap text-sm font-medium text-navy/70 transition-colors duration-200 hover:text-navy focus-visible:text-navy"
                />
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 md:flex">
            <Clock />
            <a
              href="#contact"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-navy transition-transform duration-200 hover:scale-105"
            >
              Contact
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 cursor-pointer items-center justify-center text-navy md:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>

        {open && (
          <ul className="flex flex-col gap-1 border-t border-navy/10 px-6 pb-6 pt-2 md:hidden">
            {LINKS.map((link) => (
              <li key={link.href}>
                <ScrambleLink
                  href={link.href}
                  label={link.label}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-navy/70 transition-colors hover:text-navy"
                />
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-navy"
              >
                Contact
              </a>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
