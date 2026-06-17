import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink-footer text-cream-soft">
      <div className="mx-auto w-full max-w-[1144px] px-[21px] py-[55px] md:px-[34px] md:py-[89px]">
        <div className="grid gap-[34px] md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-[13px]">
              <Image src={SITE.logo} alt="" width={44} height={44} className="h-[44px] w-[44px]" />
              <span className="font-display text-[21px] text-cream">{SITE.name}</span>
            </div>
            <p className="mt-[21px] max-w-[34ch] text-[15px] leading-relaxed text-text-muted-dark">
              Professionel slibning af knive og værktøj for private og professionelle køkkener på
              Lolland-Falster. Slebet i hånden.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <p className="kicker text-gold">Kontakt</p>
            <ul className="mt-[21px] flex flex-col gap-[13px] text-[15px]">
              <li>
                <a href={SITE.phoneHref} className="text-cream transition-colors hover:text-gold">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-cream transition-colors hover:text-gold">
                  {SITE.email}
                </a>
              </li>
              <li className="text-text-muted-dark">
                {SITE.address.street}
                <br />
                {SITE.address.postalCode} {SITE.address.city}
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="kicker text-gold">Sider</p>
            <ul className="mt-[21px] flex flex-col gap-[13px] text-[15px]">
              <li>
                <Link href="/bestil" className="text-cream transition-colors hover:text-gold">
                  Bestil slibning
                </Link>
              </li>
              <li>
                <Link href="/erhverv" className="text-cream transition-colors hover:text-gold">
                  Erhverv
                </Link>
              </li>
              <li>
                <Link
                  href="/knivslibning-nykoebing-falster"
                  className="text-cream transition-colors hover:text-gold"
                >
                  Knivslibning i Nykøbing F.
                </Link>
              </li>
              <li>
                <Link href="/privatliv" className="text-text-muted-dark transition-colors hover:text-gold">
                  Privatliv &amp; cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[55px] flex flex-col gap-[8px] border-t border-white/10 pt-[21px] font-mono text-[13px] text-text-muted-dark md:flex-row md:items-center md:justify-between">
          <span>
            © 2026 {SITE.name} · CVR {SITE.cvr}
          </span>
          <span className="text-gold">Lavet på Falster ◆ Slebet i hånden</span>
        </div>
      </div>
    </footer>
  );
}
