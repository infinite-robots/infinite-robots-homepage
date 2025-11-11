import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Globe,
  Megaphone,
  PenTool,
  Share2,
  Smartphone,
} from "lucide-react";

const SERVICES: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Website Development",
    description:
      "Professional websites that load fast, look great, and clearly explain what you do. Designed to convert visitors into customers.",
    icon: Globe,
  },
  {
    title: "App Development",
    description:
      "Mobile apps built for real-world usage with clean design and long-term maintainability. For iOS, Android, or cross-platform.",
    icon: Smartphone,
  },
  {
    title: "Agentic Development",
    description:
      "We craft proactive, AI-powered helpers that plug into your existing tools, handle repetitive tasks end-to-end, and flag only what needs your attention.",
    icon: Bot,
  },
  {
    title: "Social Media Management",
    description:
      "Stay active and present online, without doing everything yourself. We handle content planning, posting, and reporting.",
    icon: Share2,
  },
  {
    title: "Ads Management",
    description:
      "Targeted ad campaigns across Google, Facebook/Instagram, and TikTok that focus on measurable leads and sales.",
    icon: Megaphone,
  },
  {
    title: "Brand & Content Strategy",
    description:
      "Clarify your message and voice with a content playbook, visual direction, and repeatable storytelling frameworks your team can run with.",
    icon: PenTool,
  },
];

export function ServicesOverview() {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-zinc-900">What We Do</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg"
                >
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent text-white transition-colors">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-semibold text-zinc-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-zinc-600">
                    {service.description}
                  </p>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-brand-accent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
