import { FooterSpeechBubble } from "@/components/common/FooterSpeechBubble";
import { SlimPageHeader } from "@/components/common/SlimPageHeader";

const testimonials = [
  {
    quote:
      "Infinite Robots rebuilt our site so efficiently that we suspect they legally own a time machine. We’re fine with it—we just keep sending them work from the future.",
    name: "Morgan “The Scheduler” Reyes",
    role: "Director of Temporal Logistics, Clockwork Labs",
  },
  {
    quote:
      "We asked for a professional website. They delivered a digital spaceship with warp drive and cup holders. Our bounce rate is now somewhere in the stratosphere.",
    name: "Lena Park",
    role: "Chief Delight Officer, Cosmic Coffee",
  },
  {
    quote:
      "Their automations reminded me to water the office fern, email our clients, and stand up straight. My posture—and our sales pipeline—have never looked better.",
    name: "Casey “Fern Dad” Patel",
    role: "Head of Cozy Operations, Soft Launch Studio",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="bg-white text-zinc-900 transition-colors duration-300 dark:bg-brand-surface dark:text-zinc-100">
      <SlimPageHeader
        title="Testimonials"
        description={
          <>
            We&apos;re still collecting the official rave reviews. Until then,
            enjoy these transmissions from future fans who take their websites
            (and humor) very seriously.
          </>
        }
      />

      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-brand-strong/20 via-brand-surface/60 to-black/40 blur-3xl opacity-60 dark:opacity-80" />
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="group relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/80 p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.65)] dark:border-zinc-700/60 dark:bg-zinc-900/60 dark:shadow-[0_25px_70px_-40px_rgba(0,0,0,1)]"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-strong/10 blur-xl transition duration-300 group-hover:bg-brand-strong/20 dark:bg-brand-strong/20 dark:group-hover:bg-brand-strong/30" />
                <blockquote className="relative text-lg leading-relaxed text-zinc-700 dark:text-zinc-200">
                  “{testimonial.quote}”
                </blockquote>
                <div className="mt-6 flex flex-col">
                  <span className="text-base font-semibold text-zinc-900 dark:text-white">
                    {testimonial.name}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {testimonial.role}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-dashed border-brand-strong/50 bg-white/70 p-8 text-zinc-700 shadow-lg transition duration-300 hover:border-brand-strong dark:border-brand-accent/70 dark:bg-zinc-900/60 dark:text-zinc-200">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 transition-colors duration-300 dark:text-white">
                Join the Hall of Future Fans
              </h2>
              <p className="mt-4 text-base leading-relaxed">
                We&apos;re currently accepting testimonials that include:
              </p>
              <ul className="mt-4 space-y-3 text-base leading-relaxed">
                <li>• Bold claims about productivity gains over 400%</li>
                <li>
                  • Unexpected compliments about our carefully tuned robots
                </li>
                <li>• Stories involving dramatic before/after plot twists</li>
                <li>
                  • Dramatic pause followed by “...and that&apos;s when
                  everything started working”
                </li>
              </ul>
              <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
                Real stories are even better. Send yours to{" "}
                <a
                  href="mailto:hello@infiniterobots.com"
                  className="font-medium text-brand-strong underline-offset-4 transition hover:underline dark:text-brand-accent"
                >
                  hello@infiniterobots.com
                </a>{" "}
                and we&apos;ll trade you a celebratory gif.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-3xl border border-zinc-200/70 bg-white/80 p-8 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 dark:border-zinc-700/60 dark:bg-zinc-900/60 dark:shadow-[0_25px_70px_-40px_rgba(0,0,0,0.9)]">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-strong dark:text-brand-accent">
                  Coming Soon
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  Testimonial Broadcast Studio
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Picture a cinematic montage: satisfied clients, futuristic
                  lighting, possibly a slow-motion high-five. That&apos;s the
                  vibe we&apos;re building. Check back as we beam up the real
                  stories.
                </p>
              </div>
              <div className="rounded-2xl border border-dashed border-zinc-300/80 bg-zinc-100/60 p-5 text-sm text-zinc-500 transition duration-300 dark:border-zinc-600/80 dark:bg-zinc-800/60 dark:text-zinc-300">
                <p>Placeholder mission log:</p>
                <p className="mt-2 font-medium text-zinc-700 dark:text-zinc-100">
                  “Recording booth assembled. Confetti cannons calibrated.
                  Clients lining up just off screen.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSpeechBubble message="Ready to create your own success story?" />
    </main>
  );
}
