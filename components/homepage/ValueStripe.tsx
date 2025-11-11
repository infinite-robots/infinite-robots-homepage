const ITEMS = [
  "Built for Performance",
  "Designed for Growth",
  "Clear Communication",
  "Reliable Support",
];

export function ValueStripe() {
  return (
    <section className="border-y border-zinc-100 bg-zinc-50">
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-zinc-200 text-center text-sm font-medium uppercase tracking-[0.3em] text-zinc-600 sm:grid-cols-4 sm:divide-y-0">
        {ITEMS.map((item) => (
          <div
            key={item}
            className="flex items-center justify-center px-4 py-3 text-center sm:px-3"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
