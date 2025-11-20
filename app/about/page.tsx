import Link from "next/link";

import { FooterSpeechBubble } from "@/components/common/FooterSpeechBubble";
import { SlimPageHeader } from "@/components/common/SlimPageHeader";

export default function AboutPage() {
  return (
    <main className="bg-white text-zinc-900 dark:bg-brand-surface dark:text-zinc-100">
      <SlimPageHeader
        title="About Us"
        description="We design and build digital systems that help businesses run smoothly, look credible, and grow at a sustainable pace, without adding operational complexity."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-6">
              <span className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Philosophy
              </span>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Our Approach
              </h2>
              <div className="space-y-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                <p>Technology should reduce friction, not create it.</p>
                <p>
                  Our goal is to understand how your business actually works
                  day-to-day, then build tools and systems that support that
                  rhythm &mdash; reliably, quietly, and efficiently.
                </p>
                <p>
                  We believe people do their best work when they&rsquo;re not
                  overwhelmed by busywork, fragmented tools, or unclear systems.
                  Every business has tasks that need to happen consistently —
                  follow-ups, reminders, handoffs, record-keeping, service
                  delivery sequencing. These are the things that keep a business
                  running, but they don&rsquo;t need to be done manually.
                </p>
                <p>
                  &ldquo;Infinite Robots&rdquo; is our way of describing the
                  systems we build: digital processes that run quietly in the
                  background, supporting your team without demanding attention.
                  They don&rsquo;t replace the human parts of your work — they
                  create more space for them.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-zinc-100 pt-12 dark:border-zinc-800 md:border-l md:border-t-0 md:border-zinc-100 md:pl-12 md:pt-0 md:dark:border-zinc-800">
              <span className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                How We Work
              </span>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                What You Can Expect Working With Us
              </h2>
              <p>
                We work in steady, transparent cycles — sharing progress early
                and often so there are no surprises. Every project begins by
                understanding your priorities and the realities of how your
                business runs day-to-day. From there, we design and build
                systems that are straightforward to use, dependable over time,
                and flexible enough to evolve as your needs change. Our work
                doesn’t end at launch — we stay available to support, refine,
                and improve as your business grows.
              </p>
              <div className="space-y-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                <div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-100">
                    We focus on:
                  </p>
                  <ul className="mt-4 space-y-3 text-base text-zinc-700 dark:text-zinc-300 md:text-lg">
                    <li className="flex gap-3 leading-relaxed">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600"
                        aria-hidden="true"
                      />
                      <span>Straightforward workflows</span>
                    </li>
                    <li className="flex gap-3 leading-relaxed">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600"
                        aria-hidden="true"
                      />
                      <span>Clean, dependable design</span>
                    </li>
                    <li className="flex gap-3 leading-relaxed">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600"
                        aria-hidden="true"
                      />
                      <span>Systems that scale without breaking</span>
                    </li>
                    <li className="flex gap-3 leading-relaxed">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600"
                        aria-hidden="true"
                      />
                      <span>
                        Long-term partnerships over one-off deliveries
                      </span>
                    </li>
                  </ul>
                </div>
                <p>We&rsquo;re not chasing trends or buzzwords.</p>
                <p>We care about solving real problems in ways that last.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 py-16 dark:border-zinc-800 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              The Team
            </span>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              The Humans of Infinite Robots
            </h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              We&rsquo;re a small, focused team. We value thoughtful
              engineering, steady collaboration, and systems that feel good to
              use.
            </p>
            <div className="grid gap-16 md:grid-cols-2">
              <article className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
                  Photo
                </div>
                <h3 className="text-xl font-semibold tracking-tight">Andrew</h3>
                <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Founder / Product &amp; UI/UX
                </p>
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  Andrew is the founder and product lead, responsible for
                  setting the vision and ensuring everything we build is
                  thoughtful, polished, and effective. He brings over 10 years
                  of full-stack experience across startups and enterprise
                  systems. His strength is turning big ideas into software that
                  actually delivers.
                </p>
              </article>
              <article className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
                  Photo
                </div>
                <h3 className="text-xl font-semibold tracking-tight">Ralph</h3>
                <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Distributed Systems &amp; Backend Engineering
                </p>
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  Ralph is our resident systems wizard — the kind of engineer
                  who can summon scalable architecture from thin air and tame
                  even the most unruly distributed systems. He’s led teams,
                  built platforms, and guided products from vague idea to
                  production reality. Around here, we just say: if it’s
                  complicated, give it to Ralph.
                </p>
              </article>
              <article className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
                  Photo
                </div>
                <h3 className="text-xl font-semibold tracking-tight">Brad</h3>
                <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Brand &amp; Marketing Strategy
                </p>
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  Brad has been making websites since the dawn of time, back
                  when you could only Ask Jeeves for help. He has now helped
                  over a trillion businesses look and feel as beautiful on the
                  outside as they do on the inside with his full stack
                  engineering skills to pay the bills.
                </p>
              </article>
              <article className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
                  Photo
                </div>
                <h3 className="text-xl font-semibold tracking-tight">Will</h3>
                <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  All-around Badass and Jack of All Trades
                </p>
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  Bio coming soon...
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            We&rsquo;d like to learn how your business works &mdash; and where
            the bottlenecks or opportunities are.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-xl">
            If you&rsquo;d like support in improving your digital presence or
            operations:
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      <FooterSpeechBubble message="Let’s design the systems that keep your team moving." />
    </main>
  );
}
