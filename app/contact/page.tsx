import { FooterSpeechBubble } from "@/components/common/FooterSpeechBubble";
import { SlimPageHeader } from "@/components/common/SlimPageHeader";

export default function ContactPage() {
  return (
    <main className="bg-white text-zinc-900 transition-colors duration-300 dark:bg-brand-surface dark:text-zinc-100">
      <SlimPageHeader
        title="Contact"
        description="We'd love to learn what you're working on and explore how we can help."
      />

      <section>
        <div className="container mx-auto px-6 py-6 md:py-8">
          <form className="mt-10 mx-auto max-w-3xl space-y-8">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-base text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 dark:bg-white/10 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:ring-brand/50"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-base text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 dark:bg-white/10 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:ring-brand/50"
                placeholder="you@company.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="company"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-base text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 dark:bg-white/10 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:ring-brand/50"
                placeholder="Company name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="project-details"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                What are you looking to do?
              </label>
              <textarea
                id="project-details"
                name="projectDetails"
                rows={4}
                className="w-full resize-none rounded-xl bg-zinc-100 px-4 py-3 text-base text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 dark:bg-white/10 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:ring-brand/50"
                placeholder="Share a little about your goals or what you need help with."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="referral-source"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                How did you hear about us?{" "}
                <span className="font-normal text-zinc-500">(optional)</span>
              </label>
              <select
                id="referral-source"
                name="referralSource"
                className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-base text-zinc-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand/40 dark:bg-white/10 dark:text-zinc-100 dark:focus:ring-brand/50"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="referral">Referral</option>
                <option value="social">Social media</option>
                <option value="search">Search engine</option>
                <option value="event">Event or meetup</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-brand px-10 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-strong focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-brand-surface"
              >
                Send Message
              </button>
            </div>
          </form>

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
