import { REVIEWS, GOOGLE_REVIEW_URL, reviewStats } from "@/data/reviews";
import { SITE } from "@/lib/site";
import { ReviewCard } from "./ReviewCard";

export function ReviewsSection() {
  const { count, average } = reviewStats();

  // Review + AggregateRating JSON-LD, knyttet til samme LocalBusiness @id som i layout.
  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/`,
    name: SITE.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: average,
      reviewCount: count,
      bestRating: 5,
      worstRating: 1,
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.navn },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.stjerner,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.citat,
    })),
  };

  return (
    <section className="bg-paper px-[21px] py-[55px] md:px-[34px] md:py-[89px]">
      <div className="mx-auto w-full max-w-[1144px]">
        <p className="kicker text-rust">Anmeldelser</p>
        <h2 className="mt-[13px] font-display text-[34px] leading-tight text-ink md:text-[55px]">
          Hvad kunderne siger
        </h2>

        <div className="mt-[34px] grid gap-[21px] md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>

        <div className="mt-[34px]">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[8px] font-mono text-[13px] uppercase tracking-[0.12em] text-rust transition-colors hover:text-rust-light"
          >
            Se alle anmeldelser på Google →
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
    </section>
  );
}
