import Image from "next/image";
import { ReactNode } from "react";

interface SlimPageHeaderProps {
  title: string;
  description?: ReactNode;
}

const textStyle: React.CSSProperties = {
  textShadow:
    "0 1px 4px rgba(0,0,0,0.7), 0 0 12px rgba(0,0,0,0.5), 0 0 24px rgba(0,0,0,0.3)",
};

export function SlimPageHeader({ title, description }: SlimPageHeaderProps) {
  return (
    <section className="relative flex min-h-[180px] flex-col items-center justify-center overflow-hidden bg-brand-surface py-16 text-center md:py-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/thinheader.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={75}
        />
      </div>

      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,0.45) 0%, transparent 100%)",
        }}
      />

      <div className="container relative z-10 mx-auto flex flex-col items-center gap-4 px-6">
        <div className="flex flex-col items-center gap-3">
          <h1
            className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl"
            style={textStyle}
          >
            {title}
          </h1>
          <p
            className="max-w-3xl text-lg leading-relaxed text-zinc-200 md:text-xl"
            style={textStyle}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
