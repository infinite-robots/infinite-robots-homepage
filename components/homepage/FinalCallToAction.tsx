export function FinalCallToAction() {
  return (
    <section id="contact" className="py-24 transition-colors duration-300">
      <div className="container mx-auto flex flex-col items-center gap-8 px-6 text-center">
        <div className="flex max-w-3xl flex-col gap-4">
          <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Let&rsquo;s find the first agent worth building.
          </h2>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            We&rsquo;ll map where AI fits your business, and where it
            doesn&rsquo;t. No pitch deck required.
          </p>
        </div>
        <a
          href="/contact"
          className="rounded-full bg-brand px-10 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          Free Consultation
        </a>
      </div>
    </section>
  );
}
