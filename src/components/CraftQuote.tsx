// Rediger citatet herunder — skriv din egen tekst.
const QUOTE = "[DIT CITAT HER]";

const FACTS = [
  { value: "2024", label: "Sliber i Sundby" },
  { value: "100%", label: "Slebet i hånden" },
];

export function CraftQuote() {
  return (
    <section className="bg-ink px-[21px] py-[55px] md:px-[34px] md:py-[89px]">
      <div className="mx-auto w-full max-w-[1144px]">
        <blockquote className="max-w-[20ch] font-display text-[34px] leading-snug text-cream md:max-w-[24ch] md:text-[55px]">
          {QUOTE}
        </blockquote>

        <div className="mt-[55px] grid gap-[21px] sm:grid-cols-2 sm:gap-[89px]">
          {FACTS.map((fact) => (
            <div key={fact.label} className="border-t border-white/10 pt-[21px]">
              <span className="font-display text-[34px] text-gold">{fact.value}</span>
              <p className="mt-[8px] font-mono text-[13px] uppercase tracking-[0.14em] text-text-muted-dark">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
