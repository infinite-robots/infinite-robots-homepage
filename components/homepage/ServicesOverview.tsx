import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SERVICES } from "@/lib/site-content";

export function ServicesOverview() {
  return (
    <section id="services" className="py-24 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-12">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              What We Do
            </p>
            <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              We help businesses put AI to work, the right way.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  href={`/services#${service.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-white/15 dark:hover:bg-white/8"
                >
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent text-white transition-colors">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {service.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong dark:text-brand-accent">
                    Learn more
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-brand-accent opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
