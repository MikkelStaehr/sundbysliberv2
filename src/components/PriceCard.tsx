export type PriceLine = {
  label: string;
  price: string; // fx "50 kr" eller "efter tilstand" — fri tekst, ingen logik
};

export function PriceCard({ title, lines }: { title: string; lines: PriceLine[] }) {
  return (
    <div className="flex h-full flex-col border border-paper-frame bg-paper p-[34px]">
      <h3 className="font-display text-[21px] text-ink">{title}</h3>
      <dl className="mt-[21px] flex flex-col">
        {lines.map((line, i) => (
          <div
            key={line.label}
            className={`flex items-baseline justify-between gap-[13px] py-[13px] ${
              i > 0 ? "border-t border-paper-frame" : ""
            }`}
          >
            <dt className="text-[16px] text-ink">{line.label}</dt>
            <dd className="shrink-0 font-mono text-[16px] text-rust">{line.price}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
