/**
 * Shared geometry and timing for the animated robot scenes.
 *
 * Every moving part of the assembly line is driven by CSS keyframes. Items
 * travel at a constant belt speed and arrive at each station once per
 * `PERIOD`, so each station's animation only has to be phase-shifted (via a
 * negative `animation-delay`) to line up with the item passing beneath it.
 */

export const VIEW_W = 2400;
export const VIEW_H = 480;

export const BELT_TOP = 398;
export const ITEM_SIZE = 40;
export const ITEM_TOP = BELT_TOP - ITEM_SIZE;
export const BELT_END = 1650;
export const FLOOR_Y = 472;

/** Belt speed in viewBox units per second. */
export const SPEED = 60;
/** Distance between consecutive items on the belt. */
export const SPACING = 210;
/** Seconds between items arriving at any given station. */
export const PERIOD = SPACING / SPEED;

/** Centered on the viewBox so narrow (mobile) crops still show the pipeline. */
export const STATION_X = {
  load: 820,
  scan: 1010,
  build: 1200,
  stamp: 1390,
  handoff: 1580,
} as const;

/** Seconds after being loaded that an item reaches `x`. */
export const arrivalTime = (x: number) => (x - STATION_X.load) / SPEED;

const LIFT_SECONDS = 0.3;
const FLY_SECONDS = 1.4;
const LIFT = { dx: 22, dy: -40 };
const EXIT = { x: 2560, y: -210 };
const ENTRY = { x: 2560, y: -250 };
const LIFT_EASE = "cubic-bezier(0.2, 0, 0.4, 1)";
const FLY_EASE = "cubic-bezier(0.55, 0, 0.9, 0.5)";

const T_HANDOFF = arrivalTime(STATION_X.handoff);
const T_GONE = T_HANDOFF + LIFT_SECONDS + FLY_SECONDS;

/** Full lifecycle of one item; must be a whole number of periods. */
export const ITEM_CYCLE = Math.ceil(T_GONE / PERIOD) * PERIOD;
export const ITEM_COUNT = Math.round(ITEM_CYCLE / PERIOD);

const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * Negative animation delay that makes a `PERIOD`-long animation reach
 * `fraction` of its cycle exactly when an item reaches the event, where
 * `eventTime` is measured in seconds since the item was loaded.
 */
export function phaseDelay(eventTime: number, fraction = 0.5) {
  const offset = mod(fraction * PERIOD - eventTime, PERIOD);
  return `${(-offset).toFixed(3)}s`;
}

/** Delay for item `index` so the items are evenly spaced along the belt. */
export const itemDelay = (index: number) => `${(-index * PERIOD).toFixed(3)}s`;

const pct = (seconds: number, cycle: number) =>
  `${((seconds / cycle) * 100).toFixed(3)}%`;

const translate = (x: number, y: number) =>
  `transform: translate(${x}px, ${y}px);`;

/**
 * Keyframes that depend on the station layout. Everything else lives in
 * globals.css with period-relative percentages.
 */
export function buildSceneKeyframes() {
  const c = ITEM_CYCLE;
  const hx = STATION_X.handoff;
  const lifted = translate(hx + LIFT.dx, LIFT.dy);
  const exited = translate(EXIT.x, EXIT.y);

  const itemMove = `@keyframes ir-item-move {
  0% { ${translate(STATION_X.load, 0)} animation-timing-function: linear; }
  ${pct(T_HANDOFF, c)} { ${translate(hx, 0)} animation-timing-function: ${LIFT_EASE}; }
  ${pct(T_HANDOFF + LIFT_SECONDS, c)} { ${lifted} animation-timing-function: ${FLY_EASE}; }
  ${pct(T_GONE, c)}, 100% { ${exited} }
}`;

  const reveal = (name: string, at: number, visibleAfter: boolean) => {
    const before = visibleAfter ? 0 : 1;
    const after = visibleAfter ? 1 : 0;
    const edge = (at / c) * 100;
    return `@keyframes ${name} {
  0%, ${(edge - 0.2).toFixed(3)}% { opacity: ${before}; }
  ${edge.toFixed(3)}%, 100% { opacity: ${after}; }
}`;
  };

  const p = PERIOD;
  const drone = `@keyframes ir-drone {
  0% { ${translate(hx, 0)} animation-timing-function: ${LIFT_EASE}; }
  ${pct(LIFT_SECONDS, p)} { ${lifted} animation-timing-function: ${FLY_EASE}; }
  ${pct(LIFT_SECONDS + FLY_SECONDS, p)} { ${exited} }
  ${pct(LIFT_SECONDS + FLY_SECONDS + 0.2, p)} { ${translate(ENTRY.x, ENTRY.y)} animation-timing-function: cubic-bezier(0.1, 0.5, 0.4, 1); }
  93% { ${translate(hx - SPEED * 0.25, -22)} animation-timing-function: linear; }
  100% { ${translate(hx, 0)} }
}`;

  return [
    itemMove,
    reveal("ir-item-raw", arrivalTime(STATION_X.build), false),
    reveal("ir-item-scanned", arrivalTime(STATION_X.scan), true),
    reveal("ir-item-built", arrivalTime(STATION_X.build), true),
    reveal("ir-item-done", arrivalTime(STATION_X.stamp), true),
    drone,
  ].join("\n");
}

/** Small deterministic PRNG so generated scenes render identically everywhere. */
export function createRandom(seed: number) {
  let state = seed >>> 0;
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    range: (min: number, max: number) => min + next() * (max - min),
    pick: <T>(items: readonly T[]): T =>
      items[Math.floor(next() * items.length)],
    chance: (probability: number) => next() < probability,
  };
}

/** Rounds to one decimal to keep generated SVG markup compact. */
export const r1 = (n: number) => Math.round(n * 10) / 10;
