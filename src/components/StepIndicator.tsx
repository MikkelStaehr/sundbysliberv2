import Link from "next/link";
import { Check } from "lucide-react";

type Step = { n: number; label: string; href?: string };

const STEPS: Step[] = [
  { n: 1, label: "Vælg ydelser", href: "/bestil" },
  { n: 2, label: "Dine oplysninger", href: "/aflevering" },
  { n: 3, label: "Bekræftelse" },
];

// Trin-indikator til bestillingsflowet. Færdige trin får et hak (og kan klikkes
// tilbage), det aktive er fremhævet, kommende er dæmpede.
export function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-[10px] gap-y-[8px]">
      {STEPS.map((s, i) => {
        const done = s.n < step;
        const active = s.n === step;
        const inner = (
          <span className="inline-flex items-center gap-[8px]">
            <span
              aria-hidden="true"
              className={`inline-flex h-[20px] w-[20px] items-center justify-center rounded-full text-[11px] font-semibold ${
                done
                  ? "bg-accent text-white"
                  : active
                    ? "border-2 border-accent text-accent"
                    : "border border-line text-muted"
              }`}
            >
              {done ? <Check className="h-[12px] w-[12px]" strokeWidth={3} /> : s.n}
            </span>
            <span className={`kicker text-[12px] ${active ? "text-accent" : done ? "text-ink" : "text-muted"}`}>
              {s.label}
            </span>
          </span>
        );
        return (
          <li key={s.n} className="inline-flex items-center gap-[10px]">
            {i > 0 && <span aria-hidden="true" className="h-[1px] w-[20px] bg-line" />}
            {done && s.href ? (
              <Link href={s.href} className="transition-opacity hover:opacity-70">
                {inner}
              </Link>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ol>
  );
}
