import { FLOOR_Y, VIEW_H, VIEW_W, createRandom, r1 } from "./timing";

type Palette = { body: string; head: string; detail: string; face: string };

type LayerConfig = {
  seed: number;
  palettes: readonly Palette[];
  eyeColors: readonly string[];
  height: [number, number];
  width: [number, number];
  gap: [number, number];
  blinkChance: number;
  detailChance: number;
  exclude?: [number, number];
};

const FAR: LayerConfig = {
  seed: 11,
  palettes: [
    { body: "#26345a", head: "#2b3b66", detail: "#233052", face: "#1f2a48" },
    { body: "#2a3a63", head: "#30436f", detail: "#26345a", face: "#1f2a48" },
    { body: "#243157", head: "#2d3e6a", detail: "#212d4e", face: "#1f2a48" },
  ],
  eyeColors: ["#3a5690", "#35508a"],
  height: [170, 290],
  width: [34, 70],
  gap: [-10, 10],
  blinkChance: 0,
  detailChance: 0.2,
};

const MID: LayerConfig = {
  seed: 29,
  palettes: [
    { body: "#2e5a94", head: "#3a78b8", detail: "#274c7d", face: "#172039" },
    { body: "#346aa8", head: "#4a8fd0", detail: "#2b5a90", face: "#172039" },
    { body: "#1d2644", head: "#26304f", detail: "#2c3658", face: "#121729" },
    { body: "#2a4d85", head: "#30609e", detail: "#223f6d", face: "#172039" },
  ],
  eyeColors: ["#7fd3f5", "#48d8ff", "#7fd3f5", "#f28b74", "#e8f7ff"],
  height: [180, 280],
  width: [44, 84],
  gap: [0, 26],
  blinkChance: 0.6,
  detailChance: 0.6,
};

const NEAR: LayerConfig = {
  seed: 47,
  palettes: [
    { body: "#2a7fb0", head: "#3a9fd6", detail: "#1f6d99", face: "#16203a" },
    { body: "#2a8fbd", head: "#5fb4dc", detail: "#2177a6", face: "#16203a" },
    { body: "#1a1f35", head: "#232a45", detail: "#2e3756", face: "#0f1322" },
    { body: "#3279b4", head: "#2ea3d2", detail: "#28649a", face: "#16203a" },
  ],
  eyeColors: ["#48d8ff", "#90f0ff", "#f28b74", "#48d8ff"],
  height: [190, 250],
  width: [60, 104],
  gap: [16, 44],
  blinkChance: 0.8,
  detailChance: 0.8,
};

const HEADS = ["box", "round", "dome", "capsule", "tv"] as const;
const EYES = ["dots", "visor", "mono", "screen"] as const;

type Bot = {
  x: number;
  w: number;
  h: number;
  palette: Palette;
  eye: string;
  head: (typeof HEADS)[number];
  eyes: (typeof EYES)[number];
  antenna: boolean;
  arms: boolean;
  chest: "none" | "panel" | "dial" | "lights";
  blink?: { delay: string; duration: string };
  pulseDelay: string;
};

function generateLayer(config: LayerConfig): Bot[] {
  const rand = createRandom(config.seed);
  const bots: Bot[] = [];
  let x = -40;

  while (x < VIEW_W + 40) {
    const w = rand.range(...config.width);
    const h = rand.range(...config.height);
    const center = x + w / 2;
    const excluded =
      config.exclude &&
      center > config.exclude[0] &&
      center < config.exclude[1];

    if (!excluded) {
      bots.push({
        x: center,
        w,
        h,
        palette: rand.pick(config.palettes),
        eye: rand.pick(config.eyeColors),
        head: rand.pick(HEADS),
        eyes: rand.pick(EYES),
        antenna: rand.chance(0.45),
        arms: rand.chance(0.4),
        chest: rand.chance(config.detailChance)
          ? rand.pick(["panel", "dial", "lights"] as const)
          : "none",
        blink: rand.chance(config.blinkChance)
          ? {
              delay: `${(-rand.range(0, 9)).toFixed(2)}s`,
              duration: `${rand.range(5, 10).toFixed(2)}s`,
            }
          : undefined,
        pulseDelay: `${(-rand.range(0, 3)).toFixed(2)}s`,
      });
    }

    x += w + rand.range(...config.gap);
  }

  return bots;
}

function CrowdBot({ bot }: { bot: Bot }) {
  const { x, w, h, palette } = bot;
  const legH = h * 0.12;
  const bodyH = h * 0.46;
  const neckH = h * 0.04;
  const headH = h * 0.3;
  const headW = Math.min(w * 0.86, headH * 1.5);
  const bodyTop = FLOOR_Y - legH - bodyH;
  const headTop = bodyTop - neckH - headH;
  const headMid = headTop + headH / 2;
  const left = x - headW / 2;

  let head;
  switch (bot.head) {
    case "round":
      head = (
        <circle
          cx={r1(x)}
          cy={r1(headMid)}
          r={r1(Math.min(headW, headH) / 2 + 4)}
          fill={palette.head}
        />
      );
      break;
    case "dome": {
      const radius = headW / 2;
      const shoulder = Math.max(headTop + radius, headMid);
      head = (
        <path
          d={`M${r1(left)} ${r1(headTop + headH)}V${r1(shoulder)}A${r1(radius)} ${r1(radius)} 0 0 1 ${r1(left + headW)} ${r1(shoulder)}V${r1(headTop + headH)}Z`}
          fill={palette.head}
        />
      );
      break;
    }
    case "capsule":
      head = (
        <rect
          x={r1(left + headW * 0.1)}
          y={r1(headTop)}
          width={r1(headW * 0.8)}
          height={r1(headH)}
          rx={r1(headW * 0.4)}
          fill={palette.head}
        />
      );
      break;
    default:
      head = (
        <rect
          x={r1(left)}
          y={r1(headTop)}
          width={r1(headW)}
          height={r1(headH)}
          rx={r1(bot.head === "tv" ? 4 : Math.min(10, headW * 0.18))}
          fill={palette.head}
        />
      );
  }

  const eyeR = Math.max(2.2, headW * 0.085);
  let eyes;
  switch (bot.eyes) {
    case "visor":
      eyes = (
        <rect
          x={r1(x - headW * 0.32)}
          y={r1(headMid - eyeR)}
          width={r1(headW * 0.64)}
          height={r1(eyeR * 2)}
          rx={r1(eyeR)}
          fill={bot.eye}
        />
      );
      break;
    case "mono":
      eyes = (
        <circle cx={r1(x)} cy={r1(headMid)} r={r1(eyeR * 1.6)} fill={bot.eye} />
      );
      break;
    case "screen":
      eyes = (
        <>
          <circle
            cx={r1(x - headW * 0.18)}
            cy={r1(headMid)}
            r={r1(eyeR * 0.8)}
            fill={bot.eye}
          />
          <circle
            cx={r1(x + headW * 0.18)}
            cy={r1(headMid)}
            r={r1(eyeR * 0.8)}
            fill={bot.eye}
          />
        </>
      );
      break;
    default:
      eyes = (
        <>
          <circle
            cx={r1(x - headW * 0.22)}
            cy={r1(headMid)}
            r={r1(eyeR)}
            fill={bot.eye}
          />
          <circle
            cx={r1(x + headW * 0.22)}
            cy={r1(headMid)}
            r={r1(eyeR)}
            fill={bot.eye}
          />
        </>
      );
  }

  const screen =
    bot.eyes === "screen" || bot.head === "tv" ? (
      <rect
        x={r1(x - headW * 0.36)}
        y={r1(headTop + headH * 0.2)}
        width={r1(headW * 0.72)}
        height={r1(headH * 0.6)}
        rx={r1(Math.min(8, headW * 0.12))}
        fill={palette.face}
      />
    ) : null;

  const antennaTop = headTop - h * 0.1;

  return (
    <g>
      <rect
        x={r1(x - w * 0.3)}
        y={r1(FLOOR_Y - legH)}
        width={r1(w * 0.18)}
        height={r1(legH)}
        fill={palette.detail}
      />
      <rect
        x={r1(x + w * 0.12)}
        y={r1(FLOOR_Y - legH)}
        width={r1(w * 0.18)}
        height={r1(legH)}
        fill={palette.detail}
      />
      {bot.arms && (
        <>
          <rect
            x={r1(x - w / 2 - w * 0.12)}
            y={r1(bodyTop + bodyH * 0.08)}
            width={r1(w * 0.14)}
            height={r1(bodyH * 0.7)}
            rx={r1(w * 0.07)}
            fill={palette.detail}
          />
          <rect
            x={r1(x + w / 2 - w * 0.02)}
            y={r1(bodyTop + bodyH * 0.08)}
            width={r1(w * 0.14)}
            height={r1(bodyH * 0.7)}
            rx={r1(w * 0.07)}
            fill={palette.detail}
          />
        </>
      )}
      <rect
        x={r1(x - w / 2)}
        y={r1(bodyTop)}
        width={r1(w)}
        height={r1(bodyH)}
        rx={r1(Math.min(12, w * 0.16))}
        fill={palette.body}
      />
      {bot.chest === "panel" && (
        <rect
          x={r1(x - w * 0.26)}
          y={r1(bodyTop + bodyH * 0.18)}
          width={r1(w * 0.52)}
          height={r1(bodyH * 0.26)}
          rx={3}
          fill={palette.detail}
        />
      )}
      {bot.chest === "dial" && (
        <circle
          cx={r1(x)}
          cy={r1(bodyTop + bodyH * 0.32)}
          r={r1(w * 0.14)}
          fill={palette.detail}
        />
      )}
      {bot.chest === "lights" && (
        <g fill={bot.eye} opacity={0.7}>
          {[-1, 0, 1].map((offset) => (
            <rect
              key={offset}
              x={r1(x + offset * w * 0.18 - w * 0.05)}
              y={r1(bodyTop + bodyH * 0.22)}
              width={r1(w * 0.1)}
              height={r1(w * 0.1)}
              rx={1}
            />
          ))}
        </g>
      )}
      <rect
        x={r1(x - w * 0.12)}
        y={r1(bodyTop - neckH - 1)}
        width={r1(w * 0.24)}
        height={r1(neckH + 2)}
        fill={palette.detail}
      />
      {bot.antenna && (
        <>
          <line
            x1={r1(x)}
            y1={r1(headTop)}
            x2={r1(x)}
            y2={r1(antennaTop)}
            stroke={palette.detail}
            strokeWidth={3}
          />
          <circle
            cx={r1(x)}
            cy={r1(antennaTop)}
            r={r1(Math.max(2.5, w * 0.05))}
            fill={bot.eye}
            className={bot.blink ? "ir-pulse" : undefined}
            style={bot.blink ? { animationDelay: bot.pulseDelay } : undefined}
          />
        </>
      )}
      {head}
      {screen}
      {bot.blink ? (
        <g
          className="ir-blink"
          style={{
            animationDelay: bot.blink.delay,
            animationDuration: bot.blink.duration,
          }}
        >
          {eyes}
        </g>
      ) : (
        eyes
      )}
    </g>
  );
}

const farBots = generateLayer(FAR);
const midBots = generateLayer(MID);
const nearBotsAll = generateLayer(NEAR);
const nearBotsFramed = generateLayer({ ...NEAR, exclude: [650, 1720] });

type RobotCrowdProps = {
  /** Leave room in the middle of the near row for the assembly line. */
  framed?: boolean;
  align?: "bottom" | "center";
  className?: string;
};

/**
 * Layered crowd of flat vector robots in the Infinite Robots palette.
 * Decorative only; hidden from assistive technology.
 */
export function RobotCrowd({
  framed = false,
  align = "bottom",
  className,
}: RobotCrowdProps) {
  const nearBots = framed ? nearBotsFramed : nearBotsAll;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio={
        align === "bottom" ? "xMidYMax slice" : "xMidYMid slice"
      }
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="ir-crowd-glow" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor="#30a8d8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#30a8d8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={VIEW_W} height={VIEW_H} fill="url(#ir-crowd-glow)" />
      <g>
        {farBots.map((bot, index) => (
          <CrowdBot key={index} bot={bot} />
        ))}
      </g>
      <g>
        {midBots.map((bot, index) => (
          <CrowdBot key={index} bot={bot} />
        ))}
      </g>
      <g>
        {nearBots.map((bot, index) => (
          <CrowdBot key={index} bot={bot} />
        ))}
      </g>
      <rect
        y={FLOOR_Y}
        width={VIEW_W}
        height={VIEW_H - FLOOR_Y}
        fill="#10152a"
      />
    </svg>
  );
}
