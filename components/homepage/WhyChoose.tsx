import Image from "next/image";

const POINTS = [
  "Websites built for real business goals, not just looks.",
  "Scalable systems that won't need to be rebuilt later.",
  "Clear, straightforward communication at every step.",
  "Long-term support — we don't disappear after launch.",
];

export function WhyChoose() {
  return (
    <section id="why-us" className="py-24 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] md:items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Why Businesses Choose Infinite Robots
              </p>
              <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                Credibility built on long-term partnerships.
              </h2>
            </div>

            <ul className="flex flex-col gap-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {POINTS.map((point) => (
                <li key={point} className="relative pl-6">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full justify-center">
            <Image
              src="/robo.png"
              alt="Illustration of Infinite Robots partnership"
              width={840}
              height={960}
              className="h-auto w-full max-w-[420px] rounded-3xl"
              sizes="(min-width: 768px) 420px, 100vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
