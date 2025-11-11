const STEPS = [
  {
    title: "Understand Your Business",
    description: "We learn how you operate and what growth means for you.",
  },
  {
    title: "Architect the Solution",
    description:
      "We design the structure, user experience, and systems around your goals.",
  },
  {
    title: "Build & Validate",
    description:
      "We develop clean, maintainable, well-tested software and workflows.",
  },
  {
    title: "Launch & Support",
    description: "We deploy, monitor, and provide ongoing improvements.",
  },
];

export function ProcessOverview() {
  return (
    <section id="process" className="py-24 transition-colors duration-300">
      <div className="container mx-auto flex flex-col gap-10 px-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            How We Work
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            A process built for clarity and momentum.
          </h2>
        </div>

        <div className="grid gap-8 border border-zinc-200 transition-colors duration-300 md:grid-cols-4 md:gap-0 md:divide-x md:divide-zinc-200 md:rounded-2xl dark:border-zinc-800 dark:md:divide-zinc-800">
          {STEPS.map((step, index) => (
            <div key={step.title} className="flex flex-col gap-4 px-6 py-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                {index + 1 < 10 ? `${index + 1}` : index + 1}
                <span className="mx-2 text-zinc-300 dark:text-zinc-600">
                  &mdash;
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
