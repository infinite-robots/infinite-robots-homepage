import { ReactNode } from "react";

type FooterSpeechBubbleProps = {
  message: ReactNode;
  className?: string;
};

export function FooterSpeechBubble({
  message,
  className,
}: FooterSpeechBubbleProps) {
  const sectionClasses = ["relative", "z-20", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClasses}>
      <div className="container mx-auto flex justify-center px-6">
        <div className="relative -mt-6 translate-y-1/2">
          <div className="rounded-3xl border border-zinc-200 bg-gray-100 px-6 py-6 text-center dark:border-zinc-800 dark:bg-zinc-700">
            <p className="font-mono text-base font-semibold text-zinc-800 dark:text-zinc-100">
              {message}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -bottom-3 h-6 w-6 -translate-x-1/2 rotate-45 border-b border-r border-zinc-200 bg-gray-100 dark:border-zinc-800 dark:bg-zinc-700"
          />
        </div>
      </div>
    </section>
  );
}
