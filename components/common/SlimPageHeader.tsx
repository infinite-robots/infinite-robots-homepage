import { ReactNode } from "react";

import { Bokeh } from "@/components/scene/Bokeh";
import { RobotCrowd } from "@/components/scene/RobotCrowd";
import { SceneMotion } from "@/components/scene/SceneMotion";

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
    <section className="relative isolate flex min-h-[200px] flex-col items-center justify-center overflow-hidden bg-[#222c47] py-16 text-center md:py-20">
      <SceneMotion className="absolute inset-0 -z-10">
        <RobotCrowd align="center" className="absolute inset-0 h-full w-full" />
        <Bokeh className="absolute inset-0" />
      </SceneMotion>

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(14,19,27,0.6) 0%, transparent 100%)",
        }}
      />

      <div className="container mx-auto flex flex-col items-center gap-4 px-6">
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
