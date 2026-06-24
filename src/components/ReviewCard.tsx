import { Star } from "lucide-react";
import type { Review } from "@/data/reviews";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-[2px] text-accent" aria-label={`${value} ud af 5 stjerner`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-[16px] w-[16px]"
          strokeWidth={1.4}
          fill={i < value ? "currentColor" : "none"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-card border border-line bg-surface p-[28px]">
      <Stars value={review.stjerner} />
      <blockquote className="mt-[16px] flex-1 text-base leading-relaxed text-ink">
        “{review.citat}”
      </blockquote>
      <figcaption className="mt-[20px] text-xs text-muted">
        {review.navn} · {review.dato}
      </figcaption>
    </figure>
  );
}
