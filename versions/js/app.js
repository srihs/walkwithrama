/* Walk With RAMA — specimen version interactions (vanilla JS, no libraries) */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- reveal on enter: .line spans + .split blocks ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.25 }
  );
  document.querySelectorAll(".line, .split").forEach((el) => io.observe(el));

  /* ---------- body background flips per section (red / black / cream) ---------- */
  const themed = document.querySelectorAll("[data-bg]");
  const themeIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) document.body.dataset.theme = e.target.dataset.bg;
      }
    },
    { rootMargin: "-40% 0px -40% 0px" }
  );
  themed.forEach((el) => themeIO.observe(el));

  /* ---------- stat counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const countIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        countIO.unobserve(e.target);
        const target = +e.target.dataset.count;
        if (reduced) { e.target.textContent = target; continue; }
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / 1300, 1);
          e.target.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => countIO.observe(el));

  if (reduced) return; // everything below is decorative motion

  /* ---------- scroll-linked motion: hero parallax + marquee drift ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  const track = document.querySelector(".track");
  let latestY = window.scrollY;
  let ticking = false;

  function onScroll() {
    latestY = window.scrollY;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  }

  function apply() {
    ticking = false;
    for (const el of parallaxEls) {
      el.style.transform = `translateY(${latestY * -el.dataset.parallax}px)`;
    }
    if (track) {
      const r = track.parentElement.getBoundingClientRect();
      const progress = 1 - (r.bottom + window.innerHeight) / (window.innerHeight * 2 + r.height);
      track.style.transform = `translateX(${progress * 30}%)`;
    }
  }
  addEventListener("scroll", onScroll, { passive: true });
  apply();

  /* ---------- continuous marquee base drift ---------- */
  if (track) {
    let base = 0;
    (function drift(prev) {
      requestAnimationFrame((now) => {
        const dt = prev ? now - prev : 16;
        base = (base - dt * 0.04) % (track.scrollWidth / 2);
        track.style.translate = `${base}px 0`;
        drift(now);
      });
    })();
  }

  /* ---------- magnetic buttons ---------- */
  document.querySelectorAll(".magnetic").forEach((el) => {
    const strength = 0.35;
    el.style.display = "inline-block";
    el.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.transition = "transform 0.1s";
    });
    el.addEventListener("pointerleave", () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = "translate(0, 0)";
    });
  });

  /* ---------- smooth inertial scrolling (lenis-style lerp) ---------- */
  // Native scroll stays authoritative; we only ease wheel input.
  let target = window.scrollY;
  let current = window.scrollY;
  let raf = null;
  const max = () => document.documentElement.scrollHeight - innerHeight;

  addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) return; // let pinch-zoom through
      e.preventDefault();
      target = Math.max(0, Math.min(max(), target + e.deltaY));
      if (!raf) loop();
    },
    { passive: false }
  );

  // keep in sync when scrolling by other means (keys, drag, anchors)
  addEventListener("scroll", () => {
    if (!raf) target = current = window.scrollY;
  }, { passive: true });

  function loop() {
    raf = requestAnimationFrame(() => {
      current += (target - current) * 0.09;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        raf = null;
      } else {
        loop();
      }
      window.scrollTo(0, current);
    });
  }
})();
