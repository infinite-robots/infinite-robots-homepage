import { ArrowRight, Building2, Cpu, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FooterSpeechBubble } from "@/components/common/FooterSpeechBubble";
import { SlimPageHeader } from "@/components/common/SlimPageHeader";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected Infinite Robots work in semiconductors (molecular beam epitaxy) and real estate finance. Detailed case studies and references available on request.",
};

const ENGAGEMENTS = [
  {
    industry: "Semiconductors & Advanced Materials",
    icon: Cpu,
    client: "Molecular beam epitaxy (MBE) company",
    title: "AI for thin-film growth and process knowledge",
    summary:
      "MBE generates a mountain of data: growth-run logs, sensor readings, recipes, and hard-won process knowledge spread across people and files. We build AI systems that make that data searchable, analyzable, and useful to the engineers who depend on it.",
    focus: ["Data Engineering", "AI Integrations", "Agentic Development"],
  },
  {
    industry: "Real Estate & Fintech",
    icon: Building2,
    client: "Real estate finance company",
    title: "Agentic workflows for document-heavy deals",
    summary:
      "Real estate finance runs on paperwork, cross-checks, and follow-ups. We build agents that take on the repetitive, document-heavy steps and keep every decision traceable, with humans approving anything that touches money.",
    focus: ["Agentic Development", "Harness Engineering", "Human in the Loop"],
  },
];

export default function WorkPage() {
  return (
    <main className="bg-white text-zinc-900 transition-colors duration-300 dark:bg-brand-surface dark:text-zinc-100">
      <SlimPageHeader
        title="Our Work"
        description="A look at the problems we solve for our clients. Names are kept confidential."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto flex flex-col gap-10 px-6">
          <div className="flex max-w-3xl flex-col gap-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Selected Work
            </span>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Hard problems, well-engineered agents.
            </h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              From the lab to the closing table, we help teams in technical,
              document-heavy industries put AI to work.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {ENGAGEMENTS.map((engagement) => {
              const Icon = engagement.icon;
              return (
                <article
                  key={engagement.title}
                  className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand-strong dark:bg-brand-accent/15 dark:text-brand-accent">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      {engagement.industry}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {engagement.client}
                    </p>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {engagement.title}
                    </h3>
                    <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {engagement.summary}
                    </p>
                  </div>

                  <ul className="mt-auto flex flex-wrap gap-2">
                    {engagement.focus.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-white/10 dark:text-zinc-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-brand-surface px-8 py-12 text-white md:px-14 dark:bg-white/5">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand/20 via-transparent to-brand-accent/15" />
            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex max-w-2xl gap-4">
                <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/20 text-brand-accent">
                  <Lock aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Case studies available on request
                  </h2>
                  <p className="mt-2 text-lg leading-relaxed text-zinc-300">
                    Want the details? We&rsquo;re happy to walk through our
                    approach, architecture, and results on a call, and connect
                    you with references where our clients allow it.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-strong"
              >
                Request a Case Study
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSpeechBubble message="Every robot has a story. Ask us for ours." />
    </main>
  );
}
