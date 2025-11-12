const ITEMS = [
  "Built for Performance",
  "Designed for Growth",
  "Clear Communication",
  "Reliable Support",
];

export function ValueStripe() {
  return (
    <section className="border-y border-zinc-100 bg-zinc-50 transition-colors duration-300 dark:border-white/10 dark:bg-white/5">
      <div className="container mx-auto px-0 sm:px-6">
        <div className="mx-auto grid max-w-none grid-cols-1 divide-y divide-zinc-100 text-center text-sm font-medium uppercase tracking-[0.3em] text-zinc-600 transition-colors duration-300 dark:divide-white/10 dark:text-zinc-300 lg:max-w-5xl lg:grid-cols-4 lg:divide-y-0">
          {ITEMS.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center px-4 py-3 text-center sm:px-3"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
