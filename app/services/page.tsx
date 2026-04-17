import {
  Handshake,
  Milestone,
  SlidersHorizontal,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FooterSpeechBubble } from "@/components/common/FooterSpeechBubble";
import { SlimPageHeader } from "@/components/common/SlimPageHeader";
import { ServicesNavigation } from "@/components/services/ServicesNavigation";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI agent development, custom software, web and app development, and marketing services. See how Infinite Robots can help your business.",
};

const services = [
  {
    id: "agentic-development",
    title: "Agentic Development",
    description: [
      "We build production AI agents that plug into the tools and platforms you already use — automating complex workflows, extracting insight from messy data, and giving your team clear, actionable results instead of more noise.",
      "Engineered for reliability from day one. The kind of work where getting it right matters as much as getting it done.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Teams adding AI capabilities to an existing product or internal system",
          "Workflows that involve repetitive analysis, review, or decision-making",
          "Businesses scaling operations without scaling headcount",
          "Founders looking for a senior engineering partner, not a chatbot vendor",
        ],
      },
      {
        heading: "Examples:",
        items: [
          "Automated reporting and summarization from scattered data sources",
          "Smart onboarding and funnel flows that adapt based on user input and business rules",
          "Inbox triage + classification + auto-reply",
          "Quote & proposal generation",
          "CRM data hygiene / syncing",
        ],
      },
    ],
  },
  {
    id: "website-development",
    title: "Website Development",
    description: [
      "We build websites that highlight what makes you the right choice and turn visitors into qualified leads and customers.",
      "Fast load times, intuitive navigation, and a structure built for conversion.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Businesses with an outdated or unclear website",
          "New companies establishing an online identity",
          'Anyone who wants a site that feels like the "grown-up" version of their business',
        ],
      },
      {
        heading: "What's Included:",
        items: [
          "Content structure & messaging guidance",
          "Modern, responsive UI design",
          "Development & deployment",
          "Basic SEO setup, analytics, and ongoing support options",
        ],
      },
    ],
  },
  {
    id: "app-development",
    title: "App Development",
    description: [
      "Mobile apps built for real everyday use - stable, intuitive, and maintainable over time.",
      "Native or cross-platform depending on needs and budget.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Service-based businesses offering customer-facing tools",
          "Internal company tools for teams in the field",
          "Products that need mobile-native workflows",
        ],
      },
      {
        heading: "What's Included:",
        items: [
          "UX & interface design",
          "System architecture",
          "iOS / Android build and testing",
          "Ongoing updates & support plans",
        ],
      },
    ],
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description: [
      "Consistent, professional presence - handled for you. We create a repeatable content system tailored to your voice and customer base.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Business owners who don't have time to post consistently",
          "Brands needing to stay visible year-round",
          "Local businesses wanting more inbound inquiries",
        ],
      },
      {
        heading: "What's Included:",
        items: [
          "Content planning & calendars",
          "Posting & scheduling",
          "Engagement monitoring",
          "Monthly performance insights",
        ],
      },
    ],
  },
  {
    id: "ads-management",
    title: "Ads Management",
    description: [
      "We build and optimize ad campaigns focused on measurable business outcomes, not vanity metrics. Clear reporting. ROI-first decisions.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Businesses ready to scale inquiries or sales",
          "Companies with strong offerings but low visibility",
          'Anyone tired of "boosting posts" and guessing',
        ],
      },
      {
        heading: "What's Included:",
        items: [
          "Campaign setup across Meta, Google, TikTok",
          "Targeting & creative direction",
          "Tracking & attribution setup",
          "Weekly performance review & tuning",
        ],
      },
    ],
  },
  {
    id: "brand-and-content-strategy",
    title: "Brand & Content Strategy",
    description: [
      "We clarify your message so customers immediately understand your value. No jargon. No guessing. Clear storytelling frameworks your team can reuse.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Rebrands",
          "Businesses who feel like they're explaining their value over and over",
          "Teams struggling to maintain consistency across channels",
        ],
      },
      {
        heading: "What's Included:",
        items: [
          "Brand voice guidelines",
          "Message clarity & positioning frameworks",
          "Content system your team can repeat",
          "Optional ongoing content support",
        ],
      },
    ],
  },
];

export default function ServicesPage() {
  const navItems = services.map((service) => ({
    id: service.id,
    label: service.title,
  }));

  return (
    <main className="bg-white text-zinc-900 dark:bg-brand-surface dark:text-zinc-100">
      <SlimPageHeader
        title="Services"
        description={
          <>
            Bring AI into your business the right way — with real engineers
            behind it.
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

          <div className="grid gap-6 md:grid-cols-3">
            {[
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

      <FooterSpeechBubble message="Let’s scope the automation that will make the biggest impact." />
    </main>
  );
}
