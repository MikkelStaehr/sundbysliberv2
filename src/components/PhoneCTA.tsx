import { SITE } from "@/lib/site";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Variant = "hero" | "compact" | "block";

/**
 * Primær handling overalt: ring til Sundby Sliberi.
 * - hero: stor knap med lille label + stort nummer
 * - compact: lille header-knap med ikon + nummer
 * - block: fuld bredde (mobil-CTA)
 */
export function PhoneCTA({
  variant = "compact",
  label = "Bestil via telefon",
  className = "",
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <a
        href={SITE.phoneHref}
        className={`inline-flex items-center gap-[8px] bg-rust text-cream px-[13px] py-[8px] font-mono text-[13px] font-medium transition-colors hover:bg-rust-light ${className}`}
      >
        <PhoneIcon className="h-4 w-4" />
        <span>{SITE.phoneDisplay}</span>
      </a>
    );
  }

  if (variant === "block") {
    return (
      <a
        href={SITE.phoneHref}
        className={`flex w-full items-center justify-center gap-[13px] bg-rust px-[21px] py-[21px] text-cream transition-colors hover:bg-rust-light ${className}`}
      >
        <PhoneIcon className="h-7 w-7 shrink-0" />
        <span className="flex flex-col leading-tight">
          <span className="kicker text-cream-soft text-[10px]">{label}</span>
          <span className="font-display text-[34px] leading-none">{SITE.phoneDisplay}</span>
        </span>
      </a>
    );
  }

  // hero
  return (
    <a
      href={SITE.phoneHref}
      className={`group inline-flex items-center gap-[13px] bg-rust px-[21px] py-[13px] text-cream transition-colors hover:bg-rust-light ${className}`}
    >
      <PhoneIcon className="h-8 w-8 shrink-0" />
      <span className="flex flex-col text-left leading-tight">
        <span className="kicker text-cream-soft text-[10px]">{label}</span>
        <span className="font-display text-[34px] leading-none">{SITE.phoneDisplay}</span>
      </span>
    </a>
  );
}
