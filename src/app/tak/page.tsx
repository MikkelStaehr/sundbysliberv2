import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tak for din bestilling – Sundby Sliberi",
  description: "Tak for din bestilling hos Sundby Sliberi. Vi ringer dig op og aftaler pris og dag.",
};

export default function TakSide() {
  return (
    <main className="mx-auto w-full max-w-[760px] px-[20px] py-[64px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:py-[96px]">
      <div className="rounded-[16px] border border-line bg-surface p-[32px] md:p-[48px]">
        <h1 className="font-display text-[44px] text-ink md:text-[56px]">Tak for din bestilling</h1>
        <p className="mt-[16px] text-[16px] leading-relaxed text-ink">
          Tak — jeg ringer dig op hurtigst muligt for at aftale pris og leveringsdag. Du betaler
          først, når aftalen er på plads.
        </p>
        <p className="mt-[12px] text-[15px] leading-relaxed text-muted">
          Har du spørgsmål i mellemtiden, er du velkommen til at ringe på{" "}
          <a href={SITE.phoneHref} className="text-accent hover:underline">
            {SITE.phoneDisplay}
          </a>{" "}
          eller skrive til{" "}
          <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
            {SITE.email}
          </a>
          .
        </p>
        <div className="mt-[28px] flex flex-wrap gap-[12px]">
          <Link
            href="/"
            className="rounded-full bg-accent px-[20px] py-[11px] text-[14px] font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Til forsiden
          </Link>
          <Link
            href="/bestil"
            className="rounded-full border border-line px-[20px] py-[11px] text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Ny bestilling
          </Link>
        </div>
      </div>
    </main>
  );
}
