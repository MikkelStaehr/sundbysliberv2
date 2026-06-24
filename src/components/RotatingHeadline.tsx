"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/*
  Roterende hero-overskrift. Cykler gennem tre buzz-linjer (køkken · have ·
  værktøj) med en blød crossfade. Linjerne er nemme at rette herunder.

  - Beholderen animerer sin højde til den AKTIVE linjes højde, så brødteksten
    nedenunder glider blødt op/ned når linjerne skifter længde (ingen overlap,
    intet dødt mellemrum). Højden måles med ResizeObserver, så den også følger
    med ved font-load og breakpoint-skift (skriftstørrelsen ændrer sig).
  - prefers-reduced-motion: ingen rotation, viser bare den første.
  - Den synlige linje er ikke aria-hidden, så skærmlæsere får én ren overskrift.
*/

const PHRASES = [
  "Slut med at save i tomaten", // køkken
  "Stopper din spade også, når den rammer en regnorm?", // have
  "En sløv økse er bare en tung hammer", // værktøj
];

// useLayoutEffect på klienten (måler før paint), useEffect på server (undgår warning).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function RotatingHeadline() {
  const [active, setActive] = useState(0);
  const [height, setHeight] = useState<number>();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  // Rotation
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((p) => (p + 1) % PHRASES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Hold beholderens højde lig med den aktive linjes højde.
  useIsoLayoutEffect(() => {
    const el = refs.current[active];
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  return (
    <span
      className="relative block min-h-[1.1em] transition-[height] duration-300 ease-out"
      style={{ height }}
    >
      {PHRASES.map((phrase, i) => (
        <span
          key={phrase}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-hidden={i !== active}
          className={`absolute inset-x-0 top-0 transition-opacity duration-200 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {phrase}
        </span>
      ))}
    </span>
  );
}
