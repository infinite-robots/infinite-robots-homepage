import { ReactNode } from "react";

interface SlimPageHeaderProps {
  title: string;
  description?: ReactNode;
}

export function SlimPageHeader({ title, description }: SlimPageHeaderProps) {
  return (
    <section className="flex min-h-[180px] flex-col items-center justify-center border-b border-zinc-100 py-16 text-center transition-colors duration-300 dark:border-zinc-800 md:py-20">
      <div className="container mx-auto flex flex-col items-center gap-4 px-6">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
