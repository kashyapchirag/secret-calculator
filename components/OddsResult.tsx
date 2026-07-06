import { SecretKey, secrets } from "@/data/secrets";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type OddsResultProps = {
  selectedSecret: SecretKey;
  playerLuck: string;
  result: number;
};

const OddsResult = ({
  selectedSecret,
  playerLuck,
  result,
}: OddsResultProps) => {
  const totalLuck = Number(playerLuck) + secrets[selectedSecret].starLuck;

  return (
    <div className="bg-[#131924] border border-[#222b39] font-mono w-full min-h-fit rounded-[1.2rem] flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-10 p-5.5">
      {/* left: gauge + odds */}
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
        {/* gauge */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#12ddf4]/40"></div>
          <div className="absolute inset-1 rounded-full border border-[#12ddf4]/20"></div>

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 210deg, #12ddf4 0deg, transparent 240deg)",
              WebkitMask: "radial-gradient(circle, transparent 55%, black 57%)",
              mask: "radial-gradient(circle, transparent 55%, black 57%)",
              filter: "drop-shadow(0 0 12px #12ddf4)",
              opacity: 0.7,
            }}
          ></div>

          <div className="absolute inset-1.5 rounded-full bg-[#0c1119] border border-[#212632] flex flex-col items-center justify-center">
            <span className="text-white text-5xl sm:text-6xl leading-none">
              ✦
            </span>
            <span className="mb-3 text-[#12ddf4] text-xs font-semibold">
              {secrets[selectedSecret].starLuck >= 0 ? (
                <>+{secrets[selectedSecret].starLuck}</>
              ) : (
                <>{secrets[selectedSecret].starLuck}</>
              )}
            </span>
          </div>
        </div>

        {/* odds text */}
        <div className="flex flex-col gap-2 items-center sm:items-start">
          <span className="text-[#8b8ba7] text-[11px] font-semibold uppercase tracking-[0.25em]">
            Your Odds
          </span>
          <h2 className="text-[#12ddf4] text-4xl sm:text-6xl md:text-[3.5rem] font-bold tracking-tight [text-shadow:0_0_24px_rgba(18,221,244,0.35)]">
            1 IN {Number(result.toFixed(0)).toLocaleString()}
          </h2>
          <p className="text-[#8b8ba7] text-sm">
            {((1 / Number(result.toFixed(0))) * 100).toFixed(7)}% chance per
            hatch <span className="text-neutral-300">✦</span>{" "}
            <span className="text-[#ffb634] font-semibold">
              {selectedSecret.toUpperCase()}
            </span>
          </p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
            <span className="flex items-center gap-3.5 bg-[#050911] border border-[#212632] rounded-full px-3 py-1.5 text-xs text-[#8b8ba7]">
              🍀 Total Luck: {Number(totalLuck.toFixed(3))}
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

                <TooltipContent className="bg-[#050911] border border-[#222b39] font-mono flex flex-col justify-center items-start p-2">
                  <div className="w-full flex justify-between items-center gap-3 text-[10px]">
                    Player Luck<span className="text-[#fabf22] text-sm">+</span>
                    Star Luck
                  </div>
                </TooltipContent>
              </Tooltip>
            </span>
            <span className="flex items-center gap-1.5 bg-[#050911] border border-[#212632] rounded-full px-3 py-1.5 text-xs text-[#8b8ba7]">
              {totalLuck >= 14 ? (
                <>
                  Formula: High Luck (<span className="font-sans"> ≥ </span> 14)
                </>
              ) : (
                <>
                  Formula: Low Luck (<span className="font-sans"> &lt; </span>{" "}
                  14)
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* right: shiny odds card */}
      <div className="w-full sm:w-40 lg:w-64 shrink-0 bg-[#050911] border border-[#212632] rounded-[1rem] p-4 flex flex-col gap-2">
        <span className="flex items-center gap-1.5 text-[#fabf22] text-sm font-semibold">
          ✨ Shiny Odds
        </span>
        <h3 className="text-white text-xl font-bold">
          1 IN {Number((result * 50).toFixed(0)).toLocaleString()}
        </h3>
        <span className="text-[#8b8ba7] text-xs">
          <span className="text-[#fabf22]">
            {((1 / Number((result * 50).toFixed(0))) * 100).toFixed(7)}%
          </span>{" "}
          chance per hatch
        </span>
      </div>
    </div>
  );
};

export default OddsResult;
