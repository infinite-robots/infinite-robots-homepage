import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="py-24 transition-colors duration-300 md:py-32"
    >
      <div className="container mx-auto flex flex-col items-center gap-8 px-6 text-center">
        <div className="flex max-w-3xl flex-col gap-6">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            We build better websites that perform.
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Your website should help your business look professional,
            communicate clearly, and convert customers &mdash; on every device.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-brand px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-strong"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
