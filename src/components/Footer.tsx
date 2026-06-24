import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel text-ink">
      <div className="mx-auto w-full max-w-none px-[20px] py-[48px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:py-[72px]">
        <p className="font-display text-[44px] leading-none text-ink md:text-[72px]">
          Få dem skarpe igen.
        </p>

        <div className="mt-[40px] grid gap-[32px] border-t border-line pt-[32px] md:grid-cols-3">
          <div className="flex flex-col gap-[16px] sm:flex-row sm:items-start">
            <div>
              <p className="kicker text-muted">Sundby Sliberi</p>
              <p className="mt-[12px] text-[15px] leading-relaxed text-ink">
                {SITE.address.street}
                <br />
                {SITE.address.postalCode} {SITE.address.city}
              </p>
              <p className="mt-[10px] text-[13px] text-muted">CVR {SITE.cvr}</p>
            </div>

            {/* Kort — fuld bredde på mobil, kompakt ved siden af på desktop.
                Ingen API-nøgle, lazy-loadet. */}
            <a
              href="https://maps.app.goo.gl/oVe1hXYYYvapZYEHA"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-[160px] w-full shrink-0 overflow-hidden rounded-input border border-line transition-opacity hover:opacity-90 sm:h-[120px] sm:w-[150px]"
            >
              <iframe
                title={`${SITE.name} på kort – ${SITE.address.street}`}
                src="https://www.google.com/maps?q=Hamborgskovvej+11,+4800+Nyk%C3%B8bing+Falster&z=14&output=embed"
                className="pointer-events-none block h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
          </div>

          <div>
            <p className="kicker text-muted">Kontakt</p>
            <ul className="mt-[12px] flex flex-col gap-[6px] text-[15px]">
              <li>
                <a href={SITE.phoneHref} className="text-ink transition-colors hover:text-accent">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-ink transition-colors hover:text-accent">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="kicker text-muted">Sider</p>
            <ul className="mt-[12px] flex flex-col gap-[6px] text-[15px]">
              <li>
                <Link href="/bestil" className="text-ink transition-colors hover:text-accent">
                  Webshop
                </Link>
              </li>
              <li>
                <Link href="/priser" className="text-ink transition-colors hover:text-accent">
                  Prisblad
                </Link>
              </li>
              <li>
                <Link href="/erhverv" className="text-ink transition-colors hover:text-accent">
                  Erhverv
                </Link>
              </li>
              <li>
                <Link
                  href="/knivslibning-nykoebing-falster"
                  className="text-ink transition-colors hover:text-accent"
                >
                  Om Sundby Sliberi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[40px] flex flex-col gap-[8px] border-t border-line pt-[24px] text-[13px] text-muted md:flex-row md:items-center md:justify-between">
          <span>© 2026 {SITE.name}</span>
          <Link href="/privatliv" className="transition-colors hover:text-accent">
            Privatliv &amp; cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
