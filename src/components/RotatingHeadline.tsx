"use client";

import { useEffect, useState } from "react";

/*
  Roterende hero-overskrift. Cykler gennem tre buzz-linjer (køkken · have ·
  værktøj) med en blød crossfade. Linjerne er nemme at rette herunder.

  - Fast højde (min-h i em → skalerer med skriftstørrelsen), så layoutet ikke
    hopper når linjerne skifter længde. Linjerne er bund-justeret.
  - prefers-reduced-motion: ingen rotation, viser bare den første.
  - Den synlige linje er ikke aria-hidden, så skærmlæsere får én ren overskrift.
*/

const PHRASES = [
  "Slut med at save i tomaten", // køkken
  "Stopper din spade også, når den rammer en regnorm?", // have
  "En sløv økse er bare en tung hammer", // værktøj
];

export function RotatingHeadline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((p) => (p + 1) % PHRASES.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative block min-h-[3.15em]">
      {PHRASES.map((phrase, i) => (
        <span
          key={phrase}
          aria-hidden={i !== active}
          className={`absolute inset-x-0 bottom-0 transition-opacity duration-700 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {phrase}
        </span>
      ))}
    </span>
  );
}
