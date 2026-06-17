import type { Review } from "@/data/reviews";
import { ReviewCard } from "./ReviewCard";

/*
  Uendelig auto-karrusel (marquee). Sporet rummer to identiske sæt kort og
  animeres med translateX(-50%) i en uendelig løkke — det andet sæt glider ind
  præcis hvor det første forsvinder, så der ikke er noget "spring".

  - Ca. 3 kort synlige ad gangen på desktop (2 på tablet, 1 på mobil).
  - Pause på hover, så man kan nå at læse.
  - Bløde fade-kanter via mask.
  - prefers-reduced-motion: animationen stopper, og sporet bliver manuelt
    scrollbart i stedet (tilgængelighed).
  - Hvert kort har højre-margin (ikke flex-gap), så de to sæt er nøjagtigt lige
    brede og løkken forbliver sømløs.
*/

const ITEM_CLASS =
  "mr-[28px] w-[80vw] shrink-0 sm:w-[44vw] lg:w-[30vw] xl:w-[28vw]";

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  return (
    <div className="relative mt-[32px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] motion-reduce:overflow-x-auto">
      <ul className="flex w-max animate-[review-marquee_36s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {reviews.map((review, i) => (
          <li key={`a-${i}`} className={ITEM_CLASS}>
            <ReviewCard review={review} />
          </li>
        ))}
        {/* Identisk kopi til den sømløse løkke — skjult for skærmlæsere */}
        {reviews.map((review, i) => (
          <li key={`b-${i}`} aria-hidden="true" className={ITEM_CLASS}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
}
