import type { CSSProperties } from "react";

import {
  BELT_END,
  BELT_TOP,
  FLOOR_Y,
  ITEM_COUNT,
  ITEM_CYCLE,
  ITEM_SIZE,
  ITEM_TOP,
  PERIOD,
  SPEED,
  STATION_X,
  VIEW_H,
  VIEW_W,
  arrivalTime,
  buildSceneKeyframes,
  itemDelay,
  phaseDelay,
} from "./timing";

const C = {
  coral: "#f28b74",
  cyan: "#48d8ff",
  ice: "#90f0ff",
  pale: "#90d8f0",
  face: "#16203a",
  ink: "#1a2238",
  steel: "#6c7a9c",
};

const keyframes = buildSceneKeyframes();

const station = (eventTime: number, fraction = 0.5): CSSProperties => ({
  animationDelay: phaseDelay(eventTime, fraction),
});

const itemTiming = (index: number): CSSProperties => ({
  animationDelay: itemDelay(index),
  animationDuration: `${ITEM_CYCLE}s`,
});

/** Eyes that follow the pointer via the --look-x / --look-y custom properties. */
function LookingEyes({
  cx,
  cy,
  spread,
  r,
  color,
}: {
  cx: number;
  cy: number;
  spread: number;
  r: number;
  color: string;
}) {
  return (
    <g className="ir-blink" style={{ animationDuration: "6.5s" }}>
      <g className="ir-look">
        {[-spread, spread].map((dx) => (
          <g key={dx}>
            <circle cx={cx + dx} cy={cy} r={r} fill={color} />
            <circle
              cx={cx + dx + r * 0.35}
              cy={cy - r * 0.35}
              r={r * 0.3}
              fill="#fff"
              opacity={0.85}
            />
          </g>
        ))}
      </g>
    </g>
  );
}

function Crate() {
  const h = ITEM_SIZE / 2;
  return (
    <g>
      <rect
        x={-h}
        y={ITEM_TOP}
        width={ITEM_SIZE}
        height={ITEM_SIZE}
        rx={4}
        fill="#56689a"
        stroke="#3d4b75"
        strokeWidth={2}
      />
      <rect
        x={-h + 1}
        y={ITEM_TOP + 1}
        width={ITEM_SIZE - 2}
        height={7}
        fill="#6a7db0"
      />
      <rect
        x={-4}
        y={ITEM_TOP + 1}
        width={8}
        height={ITEM_SIZE - 2}
        fill="#7b8fc2"
        opacity={0.55}
      />
    </g>
  );
}

function Item({ index }: { index: number }) {
  const timing = itemTiming(index);
  const h = ITEM_SIZE / 2;
  const mid = ITEM_TOP + h;

  return (
    <g className="ir-item" style={timing}>
      <g className="ir-item-raw" style={timing}>
        <Crate />
      </g>
      <g className="ir-item-scanned" style={timing}>
        <path
          d={`M${-h + 5} ${ITEM_TOP + 14}h12M${-h + 5} ${ITEM_TOP + 21}h20M${-h + 5} ${ITEM_TOP + 28}h9`}
          stroke={C.ice}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <path
          d={`M${-h - 3} ${ITEM_TOP + 6}v-9h9M${h + 3} ${ITEM_TOP + 6}v-9h-9M${-h - 3} ${BELT_TOP - 6}v9h9M${h + 3} ${BELT_TOP - 6}v9h-9`}
          stroke={C.cyan}
          strokeWidth={2}
          fill="none"
          transform="translate(0 -1)"
        />
      </g>
      <g className="ir-item-built" style={timing}>
        <rect
          x={-h - 8}
          y={ITEM_TOP - 8}
          width={ITEM_SIZE + 16}
          height={ITEM_SIZE + 8}
          rx={12}
          fill={C.cyan}
          opacity={0.22}
        />
        <rect
          x={-h}
          y={ITEM_TOP}
          width={ITEM_SIZE}
          height={ITEM_SIZE}
          rx={6}
          fill="#30c0f0"
        />
        <rect
          x={-h}
          y={ITEM_TOP}
          width={ITEM_SIZE}
          height={8}
          rx={4}
          fill={C.ice}
          opacity={0.75}
        />
        <path
          d={`M0 ${mid + 2}C-4 ${mid - 4} -12 ${mid - 4} -12 ${mid + 2}S-4 ${mid + 8} 0 ${mid + 2}S12 ${mid - 4} 12 ${mid + 2}S4 ${mid + 8} 0 ${mid + 2}Z`}
          fill="none"
          stroke="#fff"
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </g>
      <g className="ir-item-done" style={timing}>
        <circle
          cx={h - 2}
          cy={ITEM_TOP + 2}
          r={9}
          fill={C.coral}
          stroke={C.ink}
          strokeWidth={2}
        />
        <path
          d={`M${h - 6} ${ITEM_TOP + 2}l3 3.2l5.5 -6.4`}
          fill="none"
          stroke="#fff"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

/** Pops up from behind the belt and sets a fresh crate down on it. */
function Loader() {
  const x = STATION_X.load;
  const style = station(0);

  return {
    back: (
      <g className="ir-station ir-loader" style={style}>
        <rect
          x={x - 54}
          y={284}
          width={108}
          height={140}
          rx={16}
          fill="#3090c0"
        />
        <rect x={x - 54} y={318} width={108} height={10} fill="#2a7fb0" />
        <rect x={x - 10} y={274} width={20} height={14} fill="#1f6d99" />
        <path
          d={`M${x + 8} 212v-14l12 -10`}
          stroke="#1f6d99"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
        <circle
          cx={x + 21}
          cy={186}
          r={5}
          fill={C.coral}
          className="ir-pulse"
        />
        <rect
          x={x - 44}
          y={210}
          width={88}
          height={66}
          rx={14}
          fill="#48c0f0"
        />
        <rect x={x - 50} y={230} width={8} height={24} rx={3} fill="#30a8d8" />
        <rect x={x + 42} y={230} width={8} height={24} rx={3} fill="#30a8d8" />
        <rect x={x - 32} y={224} width={64} height={36} rx={8} fill={C.face} />
        <g
          className="ir-blink"
          style={{ animationDuration: "5.5s", animationDelay: "-2s" }}
        >
          <g className="ir-look">
            <rect
              x={x - 20}
              y={236}
              width={14}
              height={9}
              rx={3}
              fill={C.cyan}
            />
            <rect
              x={x + 6}
              y={236}
              width={14}
              height={9}
              rx={3}
              fill={C.cyan}
            />
          </g>
        </g>
      </g>
    ),
    front: (
      <g clipPath="url(#ir-above-belt)">
        <g className="ir-station ir-loader" style={style}>
          <g className="ir-station ir-loader-crate" style={style}>
            <g transform={`translate(${x} -26)`}>
              <Crate />
            </g>
          </g>
          <path
            d={`M${x - 58} 298q-12 34 30 54M${x + 58} 298q12 34 -30 54`}
            stroke="#2a7fb0"
            strokeWidth={14}
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={x - 26} cy={352} r={9} fill="#48c0f0" />
          <circle cx={x + 26} cy={352} r={9} fill="#48c0f0" />
        </g>
      </g>
    ),
  };
}

/** Holds a scanner over the belt and reads each crate as it passes. */
function Scanner() {
  const x = STATION_X.scan;
  const event = arrivalTime(x);
  const style = station(event);

  return {
    back: (
      <g>
        <rect
          x={x - 46}
          y={268}
          width={92}
          height={150}
          rx={14}
          fill="#3078a8"
        />
        <circle cx={x} cy={296} r={12} fill="#274c7d" />
        <path
          d={`M${x} 296l7 -6`}
          stroke={C.cyan}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <rect x={x - 12} y={252} width={24} height={20} fill="#274c7d" />
        <line
          x1={x - 20}
          y1={188}
          x2={x - 24}
          y2={168}
          stroke="#274c7d"
          strokeWidth={4}
        />
        <line
          x1={x + 20}
          y1={188}
          x2={x + 24}
          y2={168}
          stroke="#274c7d"
          strokeWidth={4}
        />
        <circle
          cx={x - 24}
          cy={166}
          r={4.5}
          fill={C.cyan}
          className="ir-pulse"
        />
        <circle
          cx={x + 24}
          cy={166}
          r={4.5}
          fill={C.cyan}
          className="ir-pulse"
          style={{ animationDelay: "-1.2s" }}
        />
        <rect
          x={x - 40}
          y={184}
          width={80}
          height={72}
          rx={32}
          fill="#3a8fd0"
        />
        <circle cx={x - 42} cy={220} r={8} fill="#2c6fa6" />
        <circle cx={x + 42} cy={220} r={8} fill="#2c6fa6" />
        <rect x={x - 30} y={206} width={60} height={24} rx={12} fill={C.face} />
        <g clipPath="url(#ir-scanner-visor)">
          <g className="ir-visor">
            <rect
              x={x - 9}
              y={211}
              width={18}
              height={14}
              rx={7}
              fill={C.cyan}
            />
          </g>
        </g>
      </g>
    ),
    front: (
      <g>
        <path
          d={`M${x - 50} 284q-10 32 20 42M${x + 50} 284q10 32 -20 42`}
          stroke="#2c6fa6"
          strokeWidth={13}
          strokeLinecap="round"
          fill="none"
        />
        <g className="ir-station ir-scan-beam" style={style}>
          <path
            d={`M${x - 14} 332H${x + 14}L${x + 34} ${BELT_TOP}H${x - 34}Z`}
            fill="url(#ir-beam)"
          />
        </g>
        <g clipPath="url(#ir-beam-clip)">
          <g className="ir-station ir-scanline" style={style}>
            <rect x={x - 40} y={334} width={80} height={3} fill={C.ice} />
          </g>
        </g>
        <rect x={x - 24} y={316} width={48} height={17} rx={5} fill={C.ink} />
        <rect x={x - 15} y={329} width={30} height={3} rx={1.5} fill={C.cyan} />
        <circle cx={x + 16} cy={322} r={2.5} fill={C.coral} />
        <circle cx={x - 30} cy={326} r={8} fill="#3a8fd0" />
        <circle cx={x + 30} cy={326} r={8} fill="#3a8fd0" />
      </g>
    ),
  };
}

/** The big one: presses each scanned crate into a finished cube. */
function Builder() {
  const x = STATION_X.build;
  const event = arrivalTime(x);
  const style = station(event);
  const sparkAngles = [-168, -140, -112, -68, -40, -12];

  return {
    back: (
      <g className="ir-station ir-build-body" style={style}>
        <rect
          x={x - 62}
          y={262}
          width={124}
          height={160}
          rx={18}
          fill="#30a8d8"
        />
        <rect x={x - 34} y={290} width={68} height={40} rx={8} fill={C.ink} />
        {[
          [-24, C.cyan, "0s"],
          [-5, C.coral, "-0.8s"],
          [14, C.cyan, "-1.6s"],
        ].map(([dx, fill, delay]) => (
          <rect
            key={dx as number}
            x={x + (dx as number)}
            y={304}
            width={10}
            height={10}
            rx={2}
            fill={fill as string}
            className="ir-pulse"
            style={{ animationDelay: delay as string }}
          />
        ))}
        <rect x={x - 12} y={246} width={24} height={20} fill="#2385b5" />
        <line
          x1={x}
          y1={170}
          x2={x}
          y2={148}
          stroke="#6cc3e6"
          strokeWidth={4}
        />
        <circle
          cx={x}
          cy={144}
          r={6}
          fill={C.coral}
          className="ir-pulse"
          style={{ animationDelay: "-0.6s" }}
        />
        <rect x={x - 60} y={194} width={12} height={32} rx={4} fill="#6cc3e6" />
        <rect x={x + 48} y={194} width={12} height={32} rx={4} fill="#6cc3e6" />
        <rect
          x={x - 52}
          y={168}
          width={104}
          height={84}
          rx={16}
          fill={C.pale}
        />
        <rect
          x={x - 52}
          y={168}
          width={104}
          height={12}
          rx={6}
          fill="#b8e8f8"
        />
        <rect x={x - 38} y={184} width={76} height={50} rx={10} fill={C.face} />
        <LookingEyes cx={x} cy={205} spread={15} r={7.5} color={C.cyan} />
        <rect
          x={x - 10}
          y={221}
          width={20}
          height={3.5}
          rx={1.75}
          fill={C.cyan}
          opacity={0.7}
        />
        <circle cx={x - 66} cy={282} r={16} fill="#2385b5" />
        <circle cx={x + 66} cy={282} r={16} fill="#2385b5" />
      </g>
    ),
    front: (
      <g>
        <g className="ir-station ir-build-body" style={style}>
          <g className="ir-station ir-piston" style={style}>
            <rect x={x - 6} y={318} width={12} height={20} fill={C.steel} />
            <rect
              x={x - 26}
              y={332}
              width={52}
              height={8}
              rx={3}
              fill={C.coral}
            />
            <path
              d={`M${x - 18} 332l-5 8M${x - 6} 332l-5 8M${x + 6} 332l-5 8M${x + 18} 332l-5 8`}
              stroke={C.ink}
              strokeWidth={3}
              opacity={0.35}
            />
          </g>
          <rect x={x - 34} y={316} width={68} height={18} rx={5} fill={C.ink} />
          <rect
            x={x - 26}
            y={322}
            width={20}
            height={4}
            rx={2}
            fill={C.cyan}
            opacity={0.8}
          />
          <path
            d={`M${x - 66} 284q-10 38 26 42M${x + 66} 284q10 38 -26 42`}
            stroke="#2385b5"
            strokeWidth={15}
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={x - 36} cy={325} r={10} fill={C.pale} />
          <circle cx={x + 36} cy={325} r={10} fill={C.pale} />
        </g>
        <g className="ir-station ir-sparks" style={style}>
          <circle cx={x} cy={ITEM_TOP} r={16} fill={C.ice} opacity={0.5} />
          {sparkAngles.map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            return (
              <line
                key={deg}
                x1={x + cos * 10}
                y1={ITEM_TOP + sin * 8}
                x2={x + cos * 26}
                y2={ITEM_TOP + sin * 20}
                stroke={i % 2 ? "#ffd9c7" : C.coral}
                strokeWidth={3}
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </g>
    ),
  };
}

/** Quality check: stamps each finished cube and is visibly pleased about it. */
function Stamper() {
  const x = STATION_X.stamp;
  const event = arrivalTime(x);
  const style = station(event);

  return {
    back: (
      <g className="ir-station ir-qa-body" style={style}>
        <rect
          x={x - 50}
          y={266}
          width={100}
          height={160}
          rx={16}
          fill="#1c2138"
          stroke="#2b3456"
          strokeWidth={3}
        />
        <circle cx={x} cy={300} r={9} fill={C.coral} className="ir-pulse" />
        <rect x={x - 26} y={318} width={52} height={6} rx={3} fill="#2b3456" />
        <rect x={x - 12} y={250} width={24} height={20} fill="#2b3456" />
        <path
          d={`M${x - 46} 254V222A46 46 0 0 1 ${x + 46} 222V254Z`}
          fill="#48c0f0"
        />
        <path
          d={`M${x - 30} 206a34 34 0 0 1 22 -20`}
          stroke="#fff"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          opacity={0.35}
        />
        <rect x={x - 6} y={170} width={12} height={10} rx={3} fill="#30a8d8" />
        <rect x={x - 34} y={210} width={68} height={34} rx={12} fill={C.face} />
        <g className="ir-station ir-qa-eyes" style={style}>
          <g
            className="ir-blink"
            style={{ animationDuration: "7s", animationDelay: "-3s" }}
          >
            <g className="ir-look">
              <circle cx={x - 14} cy={227} r={6} fill={C.coral} />
              <circle cx={x + 14} cy={227} r={6} fill={C.coral} />
            </g>
          </g>
        </g>
        <g className="ir-station ir-qa-happy" style={style}>
          <path
            d={`M${x - 21} 230q7 -10 14 0M${x + 7} 230q7 -10 14 0`}
            stroke={C.coral}
            strokeWidth={3.5}
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <circle cx={x - 56} cy={284} r={13} fill="#2b3456" />
        <circle cx={x + 56} cy={284} r={13} fill="#2b3456" />
      </g>
    ),
    front: (
      <g className="ir-station ir-qa-body" style={style}>
        <path
          d={`M${x - 56} 284q-12 36 -2 56`}
          stroke="#2b3456"
          strokeWidth={13}
          strokeLinecap="round"
          fill="none"
        />
        <circle cx={x - 58} cy={342} r={8} fill="#48c0f0" />
        <g className="ir-station ir-qa-stamp" style={style}>
          <rect
            x={x - 20}
            y={324}
            width={40}
            height={12}
            rx={3}
            fill={C.coral}
          />
        </g>
        <rect x={x - 17} y={312} width={34} height={16} rx={4} fill="#3078a8" />
        <rect x={x - 4} y={300} width={8} height={14} fill="#3078a8" />
        <path
          d={`M${x + 56} 284q6 26 -46 18`}
          stroke="#2b3456"
          strokeWidth={13}
          strokeLinecap="round"
          fill="none"
        />
        <circle cx={x} cy={300} r={10} fill="#48c0f0" />
      </g>
    ),
  };
}

function Drone() {
  const bodyY = ITEM_TOP - 30;
  return (
    <g
      className="ir-drone"
      style={{ animationDelay: phaseDelay(arrivalTime(STATION_X.handoff), 0) }}
    >
      <path
        d={`M-12 ${bodyY + 18}l-10 8v16M12 ${bodyY + 18}l10 8v16`}
        stroke={C.steel}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1={-32}
        y1={bodyY + 2}
        x2={32}
        y2={bodyY + 2}
        stroke={C.ink}
        strokeWidth={4}
      />
      <rect x={-34} y={bodyY - 6} width={6} height={8} fill={C.ink} />
      <rect x={28} y={bodyY - 6} width={6} height={8} fill={C.ink} />
      <ellipse
        cx={-31}
        cy={bodyY - 7}
        rx={17}
        ry={3}
        fill={C.pale}
        opacity={0.7}
        className="ir-rotor"
      />
      <ellipse
        cx={31}
        cy={bodyY - 7}
        rx={17}
        ry={3}
        fill={C.pale}
        opacity={0.7}
        className="ir-rotor"
        style={{ animationDelay: "-0.05s" }}
      />
      <rect
        x={-22}
        y={bodyY - 4}
        width={44}
        height={22}
        rx={11}
        fill="#1c2138"
        stroke="#2b3456"
        strokeWidth={2}
      />
      <rect
        x={-12}
        y={bodyY + 3}
        width={24}
        height={7}
        rx={3.5}
        fill={C.cyan}
      />
      <circle cx={0} cy={bodyY - 6} r={3} fill={C.coral} className="ir-pulse" />
    </g>
  );
}

function Conveyor() {
  const chaseLights = [];
  for (let x = STATION_X.load; x <= STATION_X.handoff + 1; x += 30) {
    chaseLights.push(
      <circle
        key={x}
        cx={x}
        cy={441}
        r={3}
        fill={C.cyan}
        className="ir-station ir-chase"
        style={station(arrivalTime(x))}
      />,
    );
  }

  const labels = [
    [STATION_X.load, "01 INTAKE"],
    [STATION_X.scan, "02 CONTEXT"],
    [STATION_X.build, "03 ACTION"],
    [STATION_X.stamp, "04 VERIFY"],
    [STATION_X.handoff, "05 DELIVER"],
  ] as const;

  return (
    <g>
      <rect
        x={0}
        y={BELT_TOP + 10}
        width={BELT_END}
        height={FLOOR_Y - BELT_TOP - 10}
        fill="#161c31"
      />
      {Array.from({ length: Math.ceil(BELT_END / 120) }, (_, i) => (
        <line
          key={i}
          x1={i * 120 + 25}
          y1={BELT_TOP + 12}
          x2={i * 120 + 25}
          y2={FLOOR_Y}
          stroke="#1f2742"
          strokeWidth={2}
        />
      ))}
      <rect
        x={0}
        y={BELT_TOP + 10}
        width={BELT_END}
        height={3}
        fill="#0f1426"
      />
      <rect
        x={0}
        y={BELT_TOP - 2}
        width={BELT_END}
        height={12}
        rx={2}
        fill="#2a3656"
      />
      <rect
        x={0}
        y={BELT_TOP - 2}
        width={BELT_END}
        height={2.5}
        fill="#4a5c8c"
      />
      <line
        x1={0}
        y1={BELT_TOP + 4.5}
        x2={BELT_END - 8}
        y2={BELT_TOP + 4.5}
        stroke="#3d4d78"
        strokeWidth={4}
        strokeDasharray="12 18"
        className="ir-belt"
        style={{ animationDuration: `${(30 / SPEED).toFixed(3)}s` }}
      />
      <circle
        cx={BELT_END - 6}
        cy={BELT_TOP + 4}
        r={9}
        fill={C.ink}
        stroke="#3d4d78"
        strokeWidth={2}
      />
      {chaseLights}
      {[160, 310, 460, 610].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={441}
          r={3}
          fill={i % 2 ? C.coral : C.cyan}
          className="ir-pulse"
          style={{ animationDelay: `${-i * 0.7}s` }}
        />
      ))}
      {labels.map(([x, label]) => (
        <g key={label}>
          <rect
            x={x - 46}
            y={452}
            width={92}
            height={15}
            rx={3}
            fill="#1f2742"
          />
          <text
            x={x}
            y={463}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize={10.5}
            fontWeight={700}
            letterSpacing={1.5}
            fill="#7f93c2"
          >
            {label}
          </text>
        </g>
      ))}
      <rect
        x={0}
        y={FLOOR_Y}
        width={VIEW_W}
        height={VIEW_H - FLOOR_Y}
        fill="#10152a"
      />
    </g>
  );
}

/**
 * Foreground assembly line: crates are loaded, scanned, built, verified, and
 * flown away by drone. Timing is derived from `./timing`.
 */
export function AssemblyLine({ className }: { className?: string }) {
  const loader = Loader();
  const scanner = Scanner();
  const builder = Builder();
  const stamper = Stamper();
  const scanX = STATION_X.scan;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ "--ir-period": `${PERIOD}s` } as CSSProperties}
    >
      <style>{keyframes}</style>
      <defs>
        <clipPath id="ir-above-belt">
          <rect x={0} y={0} width={VIEW_W} height={BELT_TOP - 1} />
        </clipPath>
        <clipPath id="ir-scanner-visor">
          <rect x={scanX - 30} y={206} width={60} height={24} rx={12} />
        </clipPath>
        <clipPath id="ir-beam-clip">
          <path
            d={`M${scanX - 14} 332H${scanX + 14}L${scanX + 34} ${BELT_TOP}H${scanX - 34}Z`}
          />
        </clipPath>
        <linearGradient id="ir-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.cyan} stopOpacity="0.9" />
          <stop offset="100%" stopColor={C.cyan} stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <g transform={`translate(${STATION_X.load - 134} 0)`}>
        <rect x={0} y={318} width={40} height={40} rx={4} fill="#465784" />
        <rect x={44} y={358} width={40} height={40} rx={4} fill="#4d5f8f" />
        <rect x={0} y={358} width={40} height={40} rx={4} fill="#465784" />
      </g>

      {loader.back}
      {scanner.back}
      {builder.back}
      {stamper.back}

      <Conveyor />

      {Array.from({ length: ITEM_COUNT }, (_, i) => (
        <Item key={i} index={i} />
      ))}

      {loader.front}
      {scanner.front}
      {builder.front}
      {stamper.front}
      <Drone />
    </svg>
  );
}
