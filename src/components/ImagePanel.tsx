import Image, { type StaticImageData } from "next/image";

/*
  Foto-panel til bento-heroen. Uden `src` vises en ren stålgrå flade med en
  diskret kniv-silhuet — designet så et rigtigt foto bare kan droppes ind:
  giv `src` (fx "/images/hero-slibning.jpg") senere, så overtager fotoet fladen.
*/
// Fin film-grain som SVG-støj (feTurbulence) — ingen ekstra asset.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='120'%20height='120'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.9'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'/%3E%3C/svg%3E\")";

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
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{ backgroundImage: GRAIN_URL, backgroundSize: "140px 140px" }}
        />
      )}
      {children}
    </div>
  );
}
