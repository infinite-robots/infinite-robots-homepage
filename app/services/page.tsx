import { Compass, Handshake, Milestone, SlidersHorizontal } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FooterSpeechBubble } from "@/components/common/FooterSpeechBubble";
import { SlimPageHeader } from "@/components/common/SlimPageHeader";
import { IndustriesOverview } from "@/components/homepage/IndustriesOverview";
import { ServicesNavigation } from "@/components/services/ServicesNavigation";
import { SERVICES as services, SKILLSETS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Agentic AI development, harness engineering, AI integrations and MCP, AI-native engineering, custom AI software, and AEO for fintech, real estate, semiconductors, and more.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": services.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `https://infinite-robots.com/services#${service.id}`,
    provider: { "@type": "Organization", name: "Infinite Robots" },
  })),
};

export default function ServicesPage() {
  const navItems = services.map((service) => ({
    id: service.id,
    label: service.title,
  }));

  return (
    <main className="bg-white text-zinc-900 dark:bg-brand-surface dark:text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SlimPageHeader
        title="Services"
        description={
          <>
            Agents, harnesses, and integrations that bring AI into your business
            the right way, with real engineers behind them.
          </>
        }
      />

      <ServicesNavigation items={navItems} />

      <div>
        {services.map((service, index) => {
          const isFirst = index === 0;
          const isEven = index % 2 === 0;

          return (
            <section
              key={service.id}
              id={service.id}
              className={`scroll-mt-32 py-16 transition-colors duration-300 md:py-20 ${
                isEven
                  ? "bg-white dark:bg-brand-surface"
                  : "bg-zinc-50/70 dark:bg-white/2"
              }`}
            >
              <div className="container mx-auto px-6">
                <div
                  className={`flex flex-col gap-8 md:gap-12 ${
                    isFirst
                      ? "rounded-2xl border border-brand/20 bg-brand/3 p-8 dark:border-brand-accent/15 dark:bg-brand-accent/3 md:p-12"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        {service.title}
                      </h2>
                      {isFirst && (
                        <span className="rounded-full bg-brand/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand dark:bg-brand-accent/10 dark:text-brand-accent">
                          Specialty
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {service.description.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-12 md:grid-cols-2">
                    {service.lists.map((list) => (
                      <div key={list.heading} className="flex flex-col gap-4">
                        <span className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                          {list.heading}
                        </span>
                        <ul className="space-y-3 text-base text-zinc-700 dark:text-zinc-300">
                          {list.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 leading-relaxed"
                            >
                              <span
                                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                                  isFirst
                                    ? "bg-brand dark:bg-brand-accent"
                                    : "bg-zinc-300 dark:bg-zinc-600"
                                }`}
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section id="skillsets" className="scroll-mt-32 py-20">
        <div className="container mx-auto flex flex-col gap-10 px-6">
          <div className="flex max-w-3xl flex-col gap-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              AI Skillsets
            </span>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              The specialties behind every engagement.
            </h2>
          </div>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLSETS.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.title} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-strong dark:bg-brand-accent/15 dark:text-brand-accent">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{skill.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {skill.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <IndustriesOverview />

      <section className="relative overflow-hidden bg-brand-surface py-24 dark:bg-white/3">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand/10 via-transparent to-brand-accent/10 dark:from-brand/5 dark:to-brand-accent/5" />
        <div className="container relative mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              How We Work
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white dark:text-zinc-100 md:text-4xl">
              Every engagement is scoped around your goals.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-300">
              No surprises. No confusing contracts. Clear communication from
              start to finish.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Compass,
                title: "AI Readiness Sprint",
                description:
                  "A short, focused engagement to map your highest-value AI opportunities, assess your data, and leave you with a prioritized roadmap.",
              },
              {
                icon: Milestone,
                title: "Fixed-Scope Projects",
                description:
                  "Clear deliverables, clear cost. We define the work together, build to spec, and deliver on schedule.",
              },
              {
                icon: SlidersHorizontal,
                title: "Monthly Retainers",
                description:
                  "Ongoing support and improvements. Ideal for teams that need a reliable engineering partner month to month.",
              },
              {
                icon: Handshake,
                title: "Long-Term Partnerships",
                description:
                  "Embedded engineering for growing businesses. We scale with you and stay invested in the outcome.",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent/20 text-brand-accent transition-colors group-hover:bg-brand-accent/30">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-400 group-hover:text-zinc-300">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="container relative mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to build?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-xl">
            Let&apos;s talk about what you&apos;re working on and explore the
            best path forward.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-strong hover:shadow-xl hover:shadow-brand/30"
            >
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <FooterSpeechBubble message="Let’s scope the agent that will make the biggest impact." />
    </main>
  );
}
