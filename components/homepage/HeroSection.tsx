import Image from "next/image";
import Link from "next/link";

/**
 * Hero Section with Responsive Background Image
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-transparent py-24 transition-colors duration-300 md:pt-24 pb-56"
    >
      {/* Background Image - Full Width using next/image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/droidbg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={75}
        />
        {/* Dark overlay to slightly darken background for text readability */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center gap-8 px-6 text-center">
        <div className="flex max-w-4xl flex-col gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
            AI power when you want&nbsp;it. <br /> Human expertise when you
            need&nbsp;it.
          </h1>
          <p className="text-lg leading-relaxed text-zinc-100 sm:text-xl">
            Expert engineers and real support behind every system we build.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-brand px-8 py-3 text-base font-semibold text-white shadow-lg shadow-black/50 transition-all duration-300 hover:bg-brand-strong hover:shadow-xl hover:shadow-black/60"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
