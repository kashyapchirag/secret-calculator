"use client";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Switch } from "./ui/switch";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SecretKey, secrets } from "@/data/secrets";
import ProbabilityCurve from "./ProbabilityCurve";
import ShinyText from "./lightswind/shiny-text";

const CurveSection = ({
  result,
  targetName = "broly",
}: {
  result: number;
  targetName?: SecretKey;
}) => {
  const chanceFraction = 1 / result;

  const [shinyActive, setShinyActive] = useState<boolean>(false);
  const [shinyChance, setShinyChance] = useState<string>("5");

  const shinyPct = Number(shinyChance) || 0;
  const shinyProb = shinyPct / 100;

  // shiny is just a normal pull gated by an extra independent roll —
  // same math, smaller fraction. No separate probability functions needed.
  const shinySecretChance = chanceFraction * shinyProb;
  const shinyChanceFraction = shinySecretChance; // what ProbabilityCurve needs
  const shinySecretOdds = shinyProb > 0 ? 1 / shinyChanceFraction : Infinity;
  const harderMultiplier = shinyPct > 0 ? 100 / shinyPct : Infinity;

  return (
    <div className="flex flex-col gap-6 font-mono">
      <ProbabilityCurve
        title="Normal Pull"
        targetLabel={secrets[targetName].name}
        chanceFraction={chanceFraction}
        accent="primary"
        tooltip="Drag the slider to simulate opens. Each open is independent, probability approaches but never reaches 100%."
      />

      {/* divider + shiny toggle */}
      <div className="bg-bg-card border border-border-primary rounded-[1.2rem] p-5.5">
        <div className="flex items-center gap-5 flex-wrap">
          <Switch
            checked={shinyActive}
            onClick={() => setShinyActive((prev) => !prev)}
            className="data-[state=checked]:bg-accent-secondary data-[state=unchecked]:bg-border-primary"
          />
          <span className="text-[13px] font-sans tracking-tight text-text-secondary">
            Show shiny pull graph
          </span>

          {shinyActive && (
            <div className="flex items-center gap-3">
              <span className="text-accent-secondary text-[13px] font-sans">
                Shiny Chance %
              </span>
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
                <TooltipContent className="bg-bg-surface border border-border-primary font-mono flex flex-col justify-center items-start p-2">
                  <div className="w-full flex justify-between items-center gap-3">
                    <span className="text-text-secondary font-semibold">
                      No Shiny Hunter GP
                    </span>
                    <span className="text-accent-secondary [text-shadow:0_0_20px_currentColor] font-extrabold">
                      +2%
                    </span>
                  </div>
                  <div className="w-full flex justify-between gap-3">
                    <span className="text-text-secondary font-semibold">
                      With Shiny Hunter GP
                    </span>
                    <span className="text-accent-secondary [text-shadow:0_0_20px_currentColor] font-extrabold">
                      +5%
                    </span>
                  </div>
                </TooltipContent>
              </Tooltip>

              <div className="ml-3 flex items-center justify-between mt-0.5 border border-accent-secondary rounded-xl px-2 py-0.5">
                <input
                  value={shinyChance}
                  onChange={(e) => setShinyChance(e.target.value)}
                  type="number"
                  className="w-22 text-accent-secondary text-sm min-w-0 font-mono font-semibold outline-none  placeholder:text-neutral-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
                  placeholder="Enter"
                />
                <div className="flex flex-col leading-none shrink-0">
                  <button
                    onClick={() =>
                      setShinyChance((v) =>
                        String(((Number(v) || 0) + 0.1).toFixed(1)),
                      )
                    }
                    type="button"
                    className="text-accent-secondary hover:text-accent-secondary-hover transition-colors"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() =>
                      setShinyChance((v) =>
                        String(((Number(v) || 0) - 0.1).toFixed(1)),
                      )
                    }
                    type="button"
                    className="text-accent-secondary hover:text-accent-secondary-hover transition-colors -mt-1"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {shinyActive && (
          <div className="mt-4 font-sans flex flex-col gap-2">
            <div className="flex gap-2 justify-between items-center">
              <div className="left flex gap-2 items-center">
                <span className="w-1 h-4 rounded-full bg-accent-secondary" />
                <div className="text-accent-secondary flex justify-center items-center gap-2 font-bold text-[15px]">
                  Shiny pull <span className="text-xl shimmer">✨</span>
                </div>
              </div>
              <div className="left flex gap-2 items-center">
                {/* <div className="text-accent-secondary shimmer font-extrabold text-[15px]">
                  {secrets[targetName].name.toLocaleUpperCase()}
                </div> */}
                <ShinyText
                  shineColor="#fabf22"
                  baseColor="#ffb634"
                  speed={4}
                  size="xs"
                  weight="extrabold"
                  shineWidth={35}
                  className="text-[15px]"
                >
                  {" "}
                  {secrets[targetName].name.toLocaleUpperCase()}
                </ShinyText>
                <span className="w-1 h-4 rounded-full bg-accent-secondary" />
              </div>
            </div>

            <div className="cards grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative overflow-hidden rounded-xl border border-border-primary bg-bg-surface pl-4 pr-4 py-4">
                <div className="absolute left-0 h-full top-0 w-0.75 rounded-full bg-accent-secondary" />
                <div className="w-full flex flex-col items-start">
                  <span className="text-text-secondary text-xs">
                    Shiny avg opens (1 in {formatOdds(shinySecretOdds)})
                  </span>
                  <div className="mt-1 font-mono text-2xl font-bold text-accent-secondary">
                    {Number.isFinite(shinySecretOdds)
                      ? Math.round(shinySecretOdds).toLocaleString("en-US")
                      : "—"}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-border-primary bg-bg-surface pl-4 pr-4 py-4">
                <div className="absolute left-0 h-full top-0 w-0.75 rounded-full bg-accent-secondary" />
                <div className="w-full flex flex-col items-start">
                  <span className="text-text-secondary text-xs">
                    Shiny pull chance
                  </span>
                  <div className="mt-1 font-mono text-2xl font-bold text-accent-secondary">
                    {(shinySecretChance * 100).toFixed(9)}
                    <span>%</span>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-border-primary bg-bg-surface pl-4 pr-4 py-4">
                <div className="absolute left-0 h-full top-0 w-0.75 rounded-full bg-danger" />
                <div className="w-full flex flex-col items-start">
                  <span className="text-text-secondary text-xs">
                    Times harder than normal
                  </span>
                  <div className="mt-1 font-mono text-2xl font-bold text-danger">
                    {Number.isFinite(harderMultiplier)
                      ? Math.round(harderMultiplier * 100) / 100
                      : "—"}
                    <span>x</span>
                  </div>
                </div>
              </div>
            </div>

            <ProbabilityCurve
              title="Shiny Pull"
              targetLabel={secrets[targetName].name}
              chanceFraction={shinyChanceFraction}
              accent="secondary"
              tooltip="Shiny is an independent roll on top of a secret pull, same curve math, a smaller chance."
            />
          </div>
        )}
      </div>
    </div>
  );
};

function formatOdds(n: number) {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString("en-US");
}

export default CurveSection;
