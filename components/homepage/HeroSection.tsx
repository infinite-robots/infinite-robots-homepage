export function HeroSection() {
  return (
    <section
      id="hero"
      className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 py-24 text-center md:py-32"
    >
      <div className="flex max-w-3xl flex-col gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          We build better websites that perform.
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 sm:text-xl">
          Your website should help your business look professional, communicate
          clearly, and convert customers &mdash; on every device.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="#contact"
          className="rounded-full bg-[#1F3A93] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#172b6d]"
        >
          Book a Consultation
        </a>
        <a
          href="#services"
          className="rounded-full border border-zinc-300 px-8 py-3 text-base font-semibold text-zinc-800 transition-colors hover:border-zinc-400 hover:text-zinc-950"
        >
          View Our Work
        </a>
      </div>
    </section>
  );
}
