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
          <div>
            <p className="kicker text-muted">Sundby Sliberi</p>
            <p className="mt-[12px] text-[15px] leading-relaxed text-ink">
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
            </p>
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
                  Slibning
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
                  Om
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[40px] flex flex-col gap-[8px] border-t border-line pt-[24px] text-[13px] text-muted md:flex-row md:items-center md:justify-between">
          <span>
            © 2026 {SITE.name} · CVR {SITE.cvr}
          </span>
          <Link href="/privatliv" className="transition-colors hover:text-accent">
            Privatliv &amp; cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
