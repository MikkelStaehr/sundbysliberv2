import { REVIEWS_WITH_TEXT, GOOGLE_REVIEW_URL, reviewStats } from "@/data/reviews";
import { SITE } from "@/lib/site";
import { ReviewsCarousel } from "./ReviewsCarousel";

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
    review: REVIEWS_WITH_TEXT.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.navn },
      reviewRating: { "@type": "Rating", ratingValue: r.stjerner, bestRating: 5, worstRating: 1 },
      reviewBody: r.citat,
    })),
  };

  return (
    <section className="bg-bg px-[20px] py-[48px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:py-[72px]">
      <div className="mx-auto w-full max-w-none">
        <p className="kicker text-accent">Anmeldelser</p>
        <h2 className="mt-[10px] font-display text-[36px] text-ink md:text-[52px]">Hvad kunderne siger</h2>

        <ReviewsCarousel reviews={REVIEWS_WITH_TEXT} />

        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[28px] inline-flex items-center gap-[8px] text-[14px] font-medium text-accent transition-colors hover:text-accent-dark"
        >
          Se alle anmeldelser på Google →
        </a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
    </section>
  );
}
