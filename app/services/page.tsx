import Link from "next/link";

import { FooterSpeechBubble } from "@/components/common/FooterSpeechBubble";
import { SlimPageHeader } from "@/components/common/SlimPageHeader";
import { ServicesNavigation } from "@/components/services/ServicesNavigation";

const services = [
  {
    id: "website-development",
    title: "Website Development",
    description: [
      "We design and build websites that clearly communicate who you are, what you do, and why customers should choose you.",
      "Fast load times, clean navigation, and a structure designed for conversion &mdash; not confusion.",
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
      "Mobile apps built for real everyday use &mdash; stable, intuitive, and maintainable over time.",
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
    id: "agentic-development",
    title: "Agentic Development",
    description: [
      "We create AI-powered digital helpers that plug into your existing tools (email, CRM, scheduling, operations platforms) and handle repetitive tasks end-to-end.",
      "They surface only what requires human attention &mdash; reducing noise and freeing up time.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Teams overwhelmed by recurring tasks",
          "Businesses scaling without adding headcount",
          "Founders drowning in follow-up or admin",
        ],
      },
      {
        heading: "Examples:",
        items: [
          "Inbox triage + classification + auto-reply",
          "Quote & proposal generation",
          "CRM data hygiene / syncing",
          "Task/lead routing",
        ],
      },
    ],
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description: [
      "Consistent, professional presence &mdash; handled for you.",
      "We create a repeatable content system tailored to your voice and customer base.",
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
      "We build and optimize ad campaigns focused on measurable business outcomes &mdash; not vanity metrics.",
      "Clear reporting. ROI-first decisions.",
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
      "We clarify your message so customers immediately understand your value.",
      "No jargon. No guessing. Clear storytelling frameworks your team can reuse.",
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
            We help businesses communicate clearly, operate efficiently, and
            grow consistently &mdash; through thoughtful design and dependable
            systems.
          </>
        }
      />

      <ServicesNavigation items={navItems} />

      <div className="border-zinc-100 dark:border-zinc-800">
        {services.map((service) => (
          <section
            key={service.id}
            id={service.id}
            className="border-zinc-100 py-16 transition-colors duration-300 scroll-mt-32 dark:border-zinc-800 md:py-20"
          >
            <div className="container mx-auto px-6">
              <div className="flex flex-col gap-8 md:gap-12">
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {service.title}
                  </h2>
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
                          <li key={item} className="flex gap-3 leading-relaxed">
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600"
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
        ))}
      </div>

      <section className="border-y border-zinc-100 py-20 dark:border-zinc-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            How We Work
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>
              Every business is different &mdash; so we scope work based on
              goals, complexity, and timeline.
            </p>
            <p>We offer:</p>
            <ul className="space-y-3 text-left text-base text-zinc-700 dark:text-zinc-300 md:text-lg">
              <li className="leading-relaxed">
                Fixed-scope project pricing (clear deliverables, clear cost)
              </li>
              <li className="leading-relaxed">
                Monthly support retainers for ongoing improvements
              </li>
              <li className="leading-relaxed">
                Long-term partnerships for growing businesses
              </li>
            </ul>
            <p>
              No surprises. No confusing contracts. Clear communication from
              start to finish.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
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
              className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      <FooterSpeechBubble message="Let’s scope the systems that will make the biggest impact." />
    </main>
  );
}
