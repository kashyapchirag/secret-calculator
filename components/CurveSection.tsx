"use client";
import { useEffect, useMemo, useState } from "react";
import { Slider } from "./ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function cumulativeProb(chanceFraction: number, opens: number) {
  return 1 - Math.pow(1 - chanceFraction, opens);
}

function opensForMilestone(chanceFraction: number, target: number) {
  return Math.log(1 - target) / Math.log(1 - chanceFraction);
}

function formatCompact(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return Math.round(n).toLocaleString("en-US");
}

const CurveSection = ({
  result,
  targetName = "Vegito",
}: {
  result: number;
  targetName?: string;
}) => {
  const chanceFraction = 1 / result;

  const maxOpens = useMemo(() => {
    if (!Number.isFinite(chanceFraction) || chanceFraction <= 0)
      return 1_000_000;
    return Math.max(1000, Math.ceil(opensForMilestone(chanceFraction, 0.99)));
  }, [chanceFraction]);

  const [opensMade, setOpensMade] = useState(0);

  // keep slider in range if the target/luck changes and shrinks maxOpens
  useEffect(() => {
    setOpensMade((prev) => Math.min(prev, maxOpens));
  }, [maxOpens]);

  const currentProb = cumulativeProb(chanceFraction, opensMade);

  // --- SVG curve geometry ---
  const W = 900;
  const H = 260;
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const STEPS = 80;

  const points = useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    for (let i = 0; i <= STEPS; i++) {
      const n = (i / STEPS) * maxOpens;
      const p = cumulativeProb(chanceFraction, n);
      arr.push({
        x: padL + (i / STEPS) * innerW,
        y: padT + (1 - p) * innerH,
      });
    }
    return arr;
  }, [chanceFraction, maxOpens, innerW, innerH]);

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");
  const areaD = `${pathD} L${(padL + innerW).toFixed(2)},${(
    padT + innerH
  ).toFixed(2)} L${padL.toFixed(2)},${(padT + innerH).toFixed(2)} Z`;

  const dotX = padL + (opensMade / maxOpens) * innerW;
  const dotY = padT + (1 - currentProb) * innerH;

  const milestones = [0.25, 0.5, 0.75, 0.99] as const;

  return (
    <div className="bg-[#131924] border border-[#222b39] font-mono p-5.5 w-[74%] min-h-80 rounded-[1.2rem] flex flex-col gap-0">
      <h1 className="w-full flex justify-between">
        <span className="text-[#12ddf4] mb-3 font-mono text-[13px] uppercase tracking-[0.2em]">
          Normal Pull
        </span>
        <span className="text-[#8b8ba7] text-xs">
          Target:{" "}
          <span className="text-[#fabf22] font-medium">{targetName}</span>
        </span>
      </h1>

      {/* slider block */}
      <div className="mt-2 flex items-baseline justify-between w-full">
        <span className="text-[#8b8ba7] font-mono text-[14px] flex gap-2 items-center">
          Opens made so far
          <span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[9px] font-semibold text-white transition hover:bg-white/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={28}
                    height={28}
                    color={"currentColor"}
                    fill={"none"}
                    className="text-[#ffb634] hover:text-[#fba91b] transition:all"
                  >
                    <path
                      d="M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </TooltipTrigger>

              <TooltipContent className="bg-[#050911] border border-[#222b39] w-60 font-mono text-[9px] p-2">
                Drag the slider to simulate opens. Each open is independent,
                probability approaches but never reaches 100%.
              </TooltipContent>
            </Tooltip>
          </span>
        </span>
        <span className="text-white font-mono text-2xl font-bold">
          {opensMade.toLocaleString("en-US")}
        </span>
      </div>

      <div className="mt-3">
        <Slider
          value={[opensMade]}
          onValueChange={(vals) => setOpensMade(vals[0])}
          min={0}
          max={maxOpens}
          step={Math.max(1, Math.floor(maxOpens / 1000))}
        />
        <div className="mt-3 flex justify-between font-mono text-[12px] text-[#8b8ba7]">
          <span>0</span>
          <span>{formatCompact(maxOpens)}</span>
        </div>
      </div>

      {/* big percentage readout */}
      <div className="mt-4 flex flex-col items-center">
        <div
          className="font-mono text-7xl font-bold tracking-tight text-[#12ddf4]"
          style={{ textShadow: "0 0 32px rgba(18,221,244,0.4)" }}
        >
          {(currentProb * 100).toFixed(1)}%
        </div>
        <div className="mt-1 text-sm text-[#8b8ba7]">
          chance of pulling in {opensMade.toLocaleString("en-US")} opens
        </div>
      </div>

      {/* milestone chips */}
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {milestones.map((pct) => {
          const need = opensForMilestone(chanceFraction, pct);
          const active = Math.abs(opensMade - need) < maxOpens * 0.02;
          return (
            <button
              key={pct}
              type="button"
              onClick={() =>
                setOpensMade(Math.min(maxOpens, Math.max(0, Math.round(need))))
              }
              className={
                "rounded-xl border bg-[#050911] px-4 py-3 text-center transition-all " +
                (active
                  ? "border-[#12ddf4] shadow-[0_0_0_1px_#12ddf4]"
                  : "border-[#212632] hover:border-[#12ddf4]/60")
              }
            >
              <div className="font-mono text-lg font-bold text-[#12ddf4]">
                {(pct * 100).toFixed(0)}%
              </div>
              <div className="mt-0.5 font-mono text-xs text-[#8b8ba7]">
                {formatCompact(need)} opens
              </div>
            </button>
          );
        })}
      </div>

      {/* curve */}
      <div className="mt-6 overflow-hidden rounded-xl border border-[#212632] bg-[#0c1119] p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pullArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#12ddf4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#12ddf4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y grid + labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((g) => {
            const y = padT + (1 - g) * innerH;
            return (
              <g key={g}>
                <line
                  x1={padL}
                  x2={W - padR}
                  y1={y}
                  y2={y}
                  stroke="#1c2534"
                  strokeWidth={1}
                  strokeDasharray="2 4"
                />
                <text
                  x={padL - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#8b8ba7"
                  style={{ fontFamily: "monospace", fontSize: 10 }}
                >
                  {(g * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}

          {/* X labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((g) => {
            const x = padL + g * innerW;
            return (
              <text
                key={g}
                x={x}
                y={H - 8}
                textAnchor="middle"
                fill="#8b8ba7"
                style={{ fontFamily: "monospace", fontSize: 10 }}
              >
                {formatCompact(g * maxOpens)}
              </text>
            );
          })}

          {/* area + curve */}
          <path d={areaD} fill="url(#pullArea)" />
          <path
            d={pathD}
            fill="none"
            stroke="#12ddf4"
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 0 6px #12ddf4)" }}
          />

          {/* dashed guides */}
          <line
            x1={dotX}
            x2={dotX}
            y1={dotY}
            y2={padT + innerH}
            stroke="#12ddf4"
            strokeWidth={1}
            strokeDasharray="3 4"
            opacity={0.5}
          />
          <line
            x1={padL}
            x2={dotX}
            y1={dotY}
            y2={dotY}
            stroke="#12ddf4"
            strokeWidth={1}
            strokeDasharray="3 4"
            opacity={0.5}
          />

          {/* dot */}
          <circle cx={dotX} cy={dotY} r={7} fill="#12ddf4" opacity={0.25} />
          <circle
            cx={dotX}
            cy={dotY}
            r={4.5}
            fill="#0c1119"
            stroke="#12ddf4"
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 0 8px #12ddf4)" }}
          />
        </svg>
      </div>
    </div>
  );
};

export default CurveSection;
