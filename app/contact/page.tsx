import type { Metadata } from "next";

import { FooterSpeechBubble } from "@/components/common/FooterSpeechBubble";
import { SlimPageHeader } from "@/components/common/SlimPageHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Infinite Robots. Schedule a free consultation to discuss your project — AI integration, custom software, or anything in between.",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-zinc-900 transition-colors duration-300 dark:bg-brand-surface dark:text-zinc-100">
      <SlimPageHeader
        title="Contact"
        description="We'd love to learn what you're working on and explore how we can help."
      />

      <section>
        <div className="container mx-auto px-6 py-12 md:py-16">
          <ContactForm />

          <div className="mt-10 mx-auto max-w-3xl space-y-3 text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              We respond to all inquiries within one business day.
            </p>
          </div>
        </div>
      </section>

      <FooterSpeechBubble message="We look forward to working with you." />
    </main>
  );
}
