import type { Review } from "@/data/reviews";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-[2px]" aria-label={`${value} ud af 5 stjerner`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-[16px] w-[16px]"
          fill={i < value ? "var(--color-accent)" : "none"}
          stroke="var(--color-accent)"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-[16px] border border-line bg-surface p-[28px]">
      <Stars value={review.stjerner} />
      <blockquote className="mt-[16px] flex-1 text-[16px] leading-relaxed text-ink">
        “{review.citat}”
      </blockquote>
      <figcaption className="mt-[20px] text-[13px] text-muted">
        {review.navn} · {review.dato}
      </figcaption>
    </figure>
  );
}
