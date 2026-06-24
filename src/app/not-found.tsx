import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-none items-center justify-center px-[20px] py-[64px]">
      <section className="max-w-[42ch] text-center">
        <p className="kicker text-accent">404</p>
        <h1 className="mt-[12px] font-display text-3xl text-ink md:text-5xl">Siden blev ikke fundet</h1>
        <p className="mt-[16px] text-sm leading-relaxed text-muted">
          Den side, du leder efter, findes ikke. Måske er den flyttet, eller også er der sket en
          tastefejl i adressen.
        </p>
        <Link
          href="/"
          className="mt-[28px] inline-flex rounded-full bg-accent px-[24px] py-[13px] text-sm font-medium text-white transition-colors hover:bg-accent-dark"
        >
          Gå til forsiden
        </Link>
      </section>
    </main>
  );
}
