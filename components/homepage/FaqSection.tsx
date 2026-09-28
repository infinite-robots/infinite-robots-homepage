import { ChevronDown } from "lucide-react";

import { FAQS } from "@/lib/site-content";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function FaqSection() {
  return (
    <section id="faq" className="py-24 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            Straight answers about AI.
          </h2>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            No buzzwords, no hype. If your question isn&rsquo;t here, ask our
            robot in the chat, or a human on a free consultation.
          </p>
        </div>

        <div className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-semibold text-zinc-900 dark:text-zinc-100 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
