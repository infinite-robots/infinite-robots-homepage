import Image from "next/image";

const POINTS = [
  "Websites built for real business goals, not just looks.",
  "Scalable systems that won't need to be rebuilt later.",
  "Clear, straightforward communication at every step.",
  "Long-term support — we don't disappear after launch.",
];

export function WhyChoose() {
  return (
    <section id="why-us" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] md:items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Why Businesses Choose Infinite Robots
              </p>
              <h2 className="text-3xl font-semibold text-zinc-900">
                Credibility built on long-term partnerships.
              </h2>
            </div>

            <ul className="flex flex-col gap-6 text-lg leading-relaxed text-zinc-600">
              {POINTS.map((point) => (
                <li key={point} className="relative pl-6">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-zinc-300" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-80 w-full overflow-hidden rounded-3xl md:h-full">
            <Image
              src="/robot1.jpg"
              alt="Illustration of Infinite Robots partnership"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 420px, 100vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
