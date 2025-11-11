const SERVICES = [
  {
    title: "Website Development",
    description:
      "Professional websites that load fast, look great, and clearly explain what you do. Designed to convert visitors into customers.",
  },
  {
    title: "App Development",
    description:
      "Mobile apps built for real-world usage with clean design and long-term maintainability. For iOS, Android, or cross-platform.",
  },
  {
    title: "Social Media Management",
    description:
      "Stay active and present online &mdash; without doing everything yourself. We handle content planning, posting, and reporting.",
  },
  {
    title: "Ads Management",
    description:
      "Targeted ad campaigns across Google, Facebook/Instagram, and TikTok that focus on measurable leads and sales.",
  },
  {
    title: "Operations Tools & Workflow Improvements",
    description:
      "We identify the parts of your business that take too much time &mdash; and build tools that automate and simplify those workflows.",
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

          <div className="flex flex-col gap-16">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="grid gap-y-3 text-left md:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] md:gap-x-12 md:gap-y-0 md:items-baseline"
              >
                <h3 className="text-lg font-semibold text-zinc-900">
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed text-zinc-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
