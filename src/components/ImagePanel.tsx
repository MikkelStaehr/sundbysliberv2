import Image, { type StaticImageData } from "next/image";

/*
  Foto-panel til bento-heroen. Uden `src` vises en ren stålgrå flade med en
  diskret kniv-silhuet — designet så et rigtigt foto bare kan droppes ind:
  giv `src` (fx "/images/hero-slibning.jpg") senere, så overtager fotoet fladen.
*/
/*
  Film-grain uden ekstra billedfil.

  Vi bygger en lille SVG, der GENERERER støj med feTurbulence-filteret, og
  bruger den som CSS-baggrund (data-URI). Det er altså ikke en fil der hentes —
  browseren tegner støjen selv. Læsbar udgave af SVG'en:

    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>   // gør støjen gråtonet
      </filter>
      <rect width="100%" height="100%" filter="url(#n)"/>
    </svg>

  encodeURIComponent gør den klar til en data-URI (ingen ulæselig håndkodning).
*/
const GRAIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
const GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

export function ImagePanel({
  src,
  alt = "",
  className = "",
  rounded = "rounded-[24px]",
  children,
  priority,
  grain = false,
}: {
  src?: string | StaticImageData;
  alt?: string;
  className?: string;
  rounded?: string;
  children?: React.ReactNode;
  priority?: boolean;
  grain?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-panel-2 ${rounded} ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <svg viewBox="0 0 160 160" className="h-2/5 w-auto opacity-70">
            <path
              d="M20 120c30-8 52-26 78-58 9-11 19-22 38-30l8 9c-12 16-24 30-44 50C72 112 50 124 26 130l-6-10Z"
              fill="var(--color-placeholder)"
            />
            <rect x="112" y="20" width="30" height="12" rx="3" transform="rotate(40 112 20)" fill="var(--color-placeholder)" />
          </svg>
        </div>
      )}
      {src && grain && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-soft-light"
          style={{ backgroundImage: GRAIN_URL, backgroundSize: "160px 160px" }}
        />
      )}
      {children}
    </div>
  );
}
