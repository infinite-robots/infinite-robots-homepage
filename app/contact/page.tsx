import { SlimPageHeader } from "@/components/common/SlimPageHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="bg-white text-zinc-900 transition-colors duration-300 dark:bg-brand-dark dark:text-zinc-100">
      <SlimPageHeader
        title="Contact"
        description="We'd love to learn what you're working on and explore how we can help."
      />

      <section className="border-b border-zinc-100 dark:border-zinc-800">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            We respond to all inquiries within one business day.
          </p>

          <ContactForm />

          <div className="mt-10 mx-auto max-w-3xl space-y-3 text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>
              Or just send us an email directly at{" "}
              <a
                href="mailto:hello@infinite-robots.com"
                className="font-medium text-brand transition-colors hover:text-brand-strong"
              >
                hello@infinite-robots.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            We look forward to working with you.
          </p>
        </div>
      </section>
    </main>
  );
}
