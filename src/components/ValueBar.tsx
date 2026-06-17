const ITEMS = [
  "Ingen onlinebetaling",
  "Betaling først efter aftale",
  "Aflever selv eller få afhentet",
];

export function ValueBar() {
  return (
    <section className="bg-ink-soft">
      <div className="mx-auto flex w-full max-w-[1144px] flex-col items-center gap-[8px] px-[21px] py-[21px] text-center font-mono text-[13px] uppercase tracking-[0.14em] text-cream-soft sm:flex-row sm:justify-center sm:gap-[21px] md:px-[34px]">
        {ITEMS.map((item, i) => (
          <span key={item} className="flex items-center gap-[21px]">
            {i > 0 && <span className="hidden text-gold sm:inline" aria-hidden="true">◆</span>}
            <span>{item}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
