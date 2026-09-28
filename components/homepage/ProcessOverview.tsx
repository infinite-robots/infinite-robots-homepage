const STEPS = [
  {
    title: "Discover & Map",
    description:
      "We learn how your business runs and pinpoint where agents and automation will have the biggest measurable impact, and where they won't.",
  },
  {
    title: "Prototype & Evaluate",
    description:
      "We build a working prototype fast, then prove it against your real data with evals before you commit to a full build.",
  },
  {
    title: "Harden & Ship",
    description:
      "We add the harness: permissions, guardrails, human approvals, and monitoring. Then we deploy into your environment.",
  },
  {
    title: "Operate & Improve",
    description:
      "We monitor, tune, and upgrade models as the landscape shifts, so your AI keeps getting better instead of drifting.",
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
            From first idea to agents in production.
          </h2>
        </div>

        <div className="grid gap-8 border border-zinc-200 transition-colors duration-300 md:grid-cols-4 md:gap-0 md:divide-x md:divide-zinc-200 md:rounded-2xl dark:border-zinc-800 dark:md:divide-zinc-800">
          {STEPS.map((step, index) => (
            <div key={step.title} className="flex flex-col gap-4 px-6 py-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                {index + 1}
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
