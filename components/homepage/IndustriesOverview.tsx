import { INDUSTRIES } from "@/lib/site-content";

export function IndustriesOverview() {
  return (
    <section
      id="industries"
      className="scroll-mt-32 border-y border-zinc-100 bg-zinc-50/70 py-24 transition-colors duration-300 dark:border-white/10 dark:bg-white/2"
    >
      <div className="container mx-auto flex flex-col gap-12 px-6">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Industries
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            Built for industries where getting it right matters.
          </h2>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Regulated data, dense documents, and complex technical processes are
            where generic AI tools fall short, and where a well-engineered agent
            pays for itself.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <article
                key={industry.title}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-7 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-strong dark:bg-brand-accent/15 dark:text-brand-accent">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {industry.title}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {industry.summary}
                </p>
                <ul className="mt-auto space-y-2 border-t border-zinc-100 pt-4 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                  {industry.examples.map((example) => (
                    <li key={example} className="flex gap-2.5 leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent"
                      />
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
