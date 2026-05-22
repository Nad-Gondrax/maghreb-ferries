type FAQItem = {
  question: string;
  answer: string;
};

export function FAQ({ items, withSchema = true }: { items: FAQItem[]; withSchema?: boolean }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">FAQ</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">Questions frequentes</h2>
        </div>
        <div className="divide-y divide-ink/10 rounded-lg border border-ink/10 bg-white/80">
          {items.map((item) => (
            <details key={item.question} className="group p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink">
                {item.question}
                <span className="float-right text-petrol transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
