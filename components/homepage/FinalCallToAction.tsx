export function FinalCallToAction() {
  return (
    <section id="contact" className="py-24 transition-colors duration-300">
      <div className="container mx-auto flex flex-col items-center gap-8 px-6 text-center">
        <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Let&rsquo;s build the digital systems that support your growth.
        </h2>
        <a
          href="/contact"
          className="rounded-full bg-brand px-10 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          Schedule a Consultation
        </a>
      </div>
    </section>
  );
}
