import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-[1200px] items-center justify-center px-[20px] py-[64px]">
      <section className="max-w-[42ch] text-center">
        <p className="kicker text-clay">404</p>
        <h1 className="mt-[12px] font-display text-[44px] text-ink md:text-[56px]">Siden blev ikke fundet</h1>
        <p className="mt-[16px] text-[15px] leading-relaxed text-muted">
          Den side, du leder efter, findes ikke. Måske er den flyttet, eller også er der sket en
          tastefejl i adressen.
        </p>
        <Link
          href="/"
          className="mt-[28px] inline-flex rounded-full bg-clay px-[24px] py-[13px] text-[14px] font-medium text-white transition-colors hover:bg-[#946449]"
        >
          Gå til forsiden
        </Link>
      </section>
    </main>
  );
}
