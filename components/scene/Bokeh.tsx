import type { CSSProperties } from "react";

import { createRandom } from "./timing";

const COLORS = ["#48c0f0", "#90d8f0", "#30a8d8", "#48d8ff"];

function generate(seed: number, count: number) {
  const rand = createRandom(seed);
  return Array.from({ length: count }, () => {
    const size = rand.range(3, 10);
    return {
      left: `${rand.range(0, 100).toFixed(2)}%`,
      bottom: `${rand.range(5, 55).toFixed(2)}%`,
      width: `${size.toFixed(1)}px`,
      height: `${size.toFixed(1)}px`,
      background: rand.pick(COLORS),
      filter: size > 7 ? "blur(1.5px)" : undefined,
      animationDuration: `${rand.range(8, 16).toFixed(2)}s`,
      animationDelay: `${(-rand.range(0, 16)).toFixed(2)}s`,
      "--ir-o": rand.range(0.25, 0.6).toFixed(2),
      "--ir-dx": `${rand.range(-24, 24).toFixed(0)}px`,
      "--ir-dy": `${(-rand.range(90, 200)).toFixed(0)}px`,
    } as CSSProperties;
  });
}

function generateStars(seed: number, count: number) {
  const rand = createRandom(seed);
  return Array.from({ length: count }, () => {
    const size = rand.range(1.5, 3);
    return {
      left: `${rand.range(0, 100).toFixed(2)}%`,
      top: `${rand.range(2, 70).toFixed(2)}%`,
      width: `${size.toFixed(1)}px`,
      height: `${size.toFixed(1)}px`,
      background: rand.chance(0.2) ? "#f28b74" : "#90d8f0",
      animationDuration: `${rand.range(3, 7).toFixed(2)}s`,
      animationDelay: `${(-rand.range(0, 7)).toFixed(2)}s`,
    } as CSSProperties;
  });
}

const particles = generate(5, 26);
const stars = generateStars(17, 34);

/** Rising glow particles, rendered as composited HTML rather than SVG. */
export function Bokeh({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      {particles.map((style, index) => (
        <span key={index} className="ir-bokeh" style={style} />
      ))}
    </div>
  );
}

/** Faint twinkling points for the sky above the robots. */
export function Stars({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      {stars.map((style, index) => (
        <span key={index} className="ir-twinkle" style={style} />
      ))}
    </div>
  );
}
