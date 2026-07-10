"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  cumulativeProb,
  opensForMilestone,
  formatCompact,
} from "@/lib/probability";
import { cn } from "@/lib/utils";
import ShinyText from "./lightswind/shiny-text";

type Accent = "primary" | "secondary";

const ACCENT = {
  primary: {
    text: "text-accent-primary",
    color: "var(--accent-primary)",
    glow: "0 0 32px var(--accent-primary)",
    border: "border-accent-primary",
    borderIdle: "border-border-secondary hover:border-accent-primary/60",
    ring: "shadow-[0_0_0_1px_var(--accent-primary)]",
  },
  secondary: {
    text: "text-accent-secondary",
    color: "var(--accent-secondary)",
    glow: "0 0 32px var(--accent-secondary)",
    border: "border-accent-secondary",
    borderIdle: "border-border-secondary hover:border-accent-secondary/60",
    ring: "shadow-[0_0_0_1px_var(--accent-secondary)]",
  },
} as const;

const milestones = [0.25, 0.5, 0.75, 0.99] as const;

const ProbabilityCurve = ({
  title,
  targetLabel,
  chanceFraction,
  accent = "primary",
  tooltip,
}: {
  title: string;
  targetLabel?: string;
  chanceFraction: number;
  accent?: Accent;
  tooltip?: React.ReactNode;
}) => {
  const c = ACCENT[accent];
  const gradientId = useId();

  const maxOpens = useMemo(() => {
    if (!Number.isFinite(chanceFraction) || chanceFraction <= 0)
      return 1_000_000;
    return Math.max(1000, Math.ceil(opensForMilestone(chanceFraction, 0.99)));
  }, [chanceFraction]);

  const [opensMade, setOpensMade] = useState(0);

  useEffect(() => {
    setOpensMade((prev) => Math.min(prev, maxOpens));
  }, [maxOpens]);

  const currentProb = cumulativeProb(chanceFraction, opensMade);

  const [chartRef, containerWidth] = useContainerWidth<HTMLDivElement>();
  const W = containerWidth || 900; // real pixel width, not a fixed unit box
  const H = Math.max(220, W * 0.42); // height scales with width but has a floor
  const padL = 44;
  const padR = 17;
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

  function useContainerWidth<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
      if (!ref.current) return;
      const el = ref.current;
      const ro = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width);
      });
      ro.observe(el);
      setWidth(el.getBoundingClientRect().width);
      return () => ro.disconnect();
    }, []);

    return [ref, width] as const;
  }

  return (
    <div
      className={cn(
        "bg-bg-card font-mono w-full min-h-80 rounded-[1.2rem] flex flex-col gap-0",
        title === "Shiny Pull" || "border border-border-primary p-5.5",
      )}
    >
      {title === "Shiny Pull" || (
        // <h1 className="w-full flex flex-col sm:flex-row sm:justify-between gap-1">
        //   <span
        //     className={`${c.text} mb-3 font-mono text-[13px] uppercase tracking-[0.2em]`}
        //   >
        //     {title}
        //   </span>
        //   {targetLabel && (
        //     <span className="text-text-secondary text-xs">
        //       Target:{" "}
        //       <span className={`${c.text} font-medium`}>{targetLabel}</span>
        //     </span>
        //   )}
        // </h1>
        <div className="flex gap-2 justify-between items-center">
          <div className="left flex gap-2 items-center">
            <span className="w-1 h-4 rounded-full bg-accent-primary-hover" />
            <div className="text-accent-primary-hover flex justify-center items-center gap-2 font-bold text-[15px]">
              {title}
            </div>
          </div>
          <div className="left flex gap-2 items-center">
            {/* <div className="text-accent-primary-hover shimmer font-extrabold text-[15px]">
              {targetLabel?.toLocaleUpperCase()}
            </div> */}
            <ShinyText
              shineColor="#12ddf4"
              baseColor="#04bcd0"
              speed={4}
              size="xs"
              weight="extrabold"
              shineWidth={35}
              className="text-[15px]"
            >
              {" "}
              {targetLabel?.toLocaleUpperCase()}
            </ShinyText>

            <span className="w-1 h-4 rounded-full bg-accent-primary-hover" />
          </div>
        </div>
      )}

      {/* slider block */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between w-full gap-1">
        <span className="text-text-secondary font-mono text-[14px] flex gap-2 items-center">
          Opens made so far
          {tooltip && (
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
              <TooltipContent className="bg-bg-surface border border-border-primary w-60 font-mono text-[9px] p-2">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          )}
        </span>
        <span className="text-text-primary font-mono text-2xl font-bold">
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
          color={title === "Shiny Pull" ? "yellow" : "cyan"}
        />
        <div className="mt-3 flex justify-between font-mono text-[12px] text-text-secondary">
          <span>0</span>
          <span>{formatCompact(maxOpens)}</span>
        </div>
      </div>

      {/* big percentage readout */}
      <div className="mt-4 flex flex-col items-center">
        <div
          className={`font-mono text-5xl sm:text-7xl font-bold tracking-tight ${c.text}`}
          style={{ textShadow: c.glow }}
        >
          {(currentProb * 100).toFixed(1)}%
        </div>
        <div className="mt-1 text-sm text-text-secondary text-center">
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
                "rounded-xl border bg-bg-surface px-2 py-3 sm:px-4 text-center transition-all " +
                (active ? `${c.border} ${c.ring}` : c.borderIdle)
              }
            >
              <div
                className={`font-mono text-base sm:text-lg font-bold ${c.text}`}
              >
                {(pct * 100).toFixed(0)}%
              </div>
              <div className="mt-0.5 font-mono text-[10px] sm:text-xs text-text-secondary">
                {formatCompact(need)} opens
              </div>
            </button>
          );
        })}
      </div>

      {/* curve */}
      <div
        ref={chartRef}
        className="mt-6 overflow-hidden rounded-xl border border-border-secondary bg-bg-panel p-3"
      >
        {containerWidth > 0 && (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={c.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={c.color} stopOpacity="0" />
              </linearGradient>
            </defs>

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

            <path d={areaD} fill={`url(#${gradientId})`} />
            <path
              d={pathD}
              fill="none"
              stroke={c.color}
              strokeWidth={2}
              style={{ filter: `drop-shadow(0 0 6px ${c.color})` }}
            />

            <line
              x1={dotX}
              x2={dotX}
              y1={dotY}
              y2={padT + innerH}
              stroke={c.color}
              strokeWidth={1}
              strokeDasharray="3 4"
              opacity={0.5}
            />
            <line
              x1={padL}
              x2={dotX}
              y1={dotY}
              y2={dotY}
              stroke={c.color}
              strokeWidth={1}
              strokeDasharray="3 4"
              opacity={0.5}
            />

            <circle cx={dotX} cy={dotY} r={7} fill={c.color} opacity={0.25} />
            <circle
              cx={dotX}
              cy={dotY}
              r={4.5}
              fill="var(--bg-panel)"
              stroke={c.color}
              strokeWidth={2}
              style={{ filter: `drop-shadow(0 0 8px ${c.color})` }}
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ProbabilityCurve;
