import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { AssemblyLine } from "@/components/scene/AssemblyLine";
import { Bokeh, Stars } from "@/components/scene/Bokeh";
import { RobotCrowd } from "@/components/scene/RobotCrowd";
import { SceneMotion } from "@/components/scene/SceneMotion";

const TOPICS = ["Agentic Development", "Harness Engineering", "AEO"];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-linear-to-b from-[#1c2540] via-[#222c47] to-[#26335a]"
    >
      <SceneMotion trackPointer className="absolute inset-0 -z-10">
        <Stars className="absolute inset-x-0 top-0 h-3/5" />
        <div className="absolute inset-x-0 bottom-0 h-[clamp(240px,29vw,440px)]">
          <RobotCrowd framed className="absolute inset-0 h-full w-full" />
          <Bokeh className="absolute inset-0" />
          <AssemblyLine className="absolute inset-0 h-full w-full" />
        </div>
      </SceneMotion>

      <div className="container mx-auto flex flex-col items-center gap-7 px-6 pt-14 pb-[clamp(190px,22vw,330px)] text-center md:pt-20">
        <ul className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-200/90">
          {TOPICS.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-sky-300/20 bg-white/5 px-3 py-1 backdrop-blur-sm"
            >
              {topic}
            </li>
          ))}
        </ul>

        <div className="flex max-w-4xl flex-col gap-5">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            AI power when you want&nbsp;it. <br /> Human expertise when you
            need&nbsp;it.
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-zinc-200 sm:text-xl">
            Expert engineers building production AI agents &mdash; with the
            harness, guardrails, and real support behind every system we ship.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/contact"
            className="w-full rounded-full bg-brand px-8 py-3 text-base font-semibold text-white shadow-lg shadow-black/40 transition-all duration-300 hover:bg-brand-strong hover:shadow-xl hover:shadow-black/50 sm:w-auto"
          >
            Free Consultation
          </Link>
          <Link
            href="/services"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10 sm:w-auto"
          >
            See What We Build
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
