const STEPS = [
  {
    n: "01",
    title: "Ring eller skriv",
    body: "Fortæl hvad du har, og hvornår du skal bruge det.",
  },
  {
    n: "02",
    title: "Vi aftaler nærmere",
    body: "Pris og leveringsdag aftales, før du betaler noget.",
  },
  {
    n: "03",
    title: "Skarpt til tiden",
    body: "Du får dine ting tilbage til den dag, vi har aftalt.",
  },
];

export function ServiceSteps() {
  return (
    <section className="bg-paper px-[21px] py-[55px] md:px-[34px] md:py-[89px]">
      <div className="mx-auto w-full max-w-[1144px]">
        <p className="kicker text-rust">Sådan foregår det</p>
        <h2 className="mt-[13px] font-display text-[34px] leading-tight text-ink md:text-[55px]">
          Tre skridt fra sløv til skarp
        </h2>

        <ol className="mt-[55px] grid gap-[34px] md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="border-t border-paper-frame pt-[21px]">
              <span className="font-display text-[55px] leading-none text-gold">{step.n}</span>
              <h3 className="mt-[21px] font-display text-[21px] text-ink">{step.title}</h3>
              <p className="mt-[13px] text-[16px] leading-relaxed text-text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
