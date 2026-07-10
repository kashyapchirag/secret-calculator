"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { SecretKey, secrets } from "@/data/secrets";
import { ChevronDown, ChevronUp } from "lucide-react";

type propType = {
  selectedSecret: SecretKey;
  setSelectedSecret: React.Dispatch<React.SetStateAction<SecretKey>>;
  playerLuck: string;
  setPlayerLuck: React.Dispatch<React.SetStateAction<string>>;
  secretChance: string;
  setSecretChance: React.Dispatch<React.SetStateAction<string>>;
};

const InputSection = ({
  selectedSecret,
  setSelectedSecret,
  playerLuck,
  setPlayerLuck,
  secretChance,
  setSecretChance,
}: propType) => {
  return (
    <div className="bg-[#131924] border border-[#222b39] font-mono p-5.5 w-full min-h-fit rounded-[1.2rem] flex flex-col gap-5">
      <div className="top-row flex flex-col sm:flex-row gap-5 w-full">
        {/* Player Luck */}
        <div className="bg-[#050911] w-full sm:w-1/3 h-17 rounded-[0.9rem] border border-[#212632] p-3 flex gap-3">
          <div className="box h-full text-2xl w-11 shrink-0 border border-[#222b39] bg-[#131924] rounded-[0.6rem] flex justify-center items-center">
            🍀
          </div>
          <div className="flex-1 h-full overflow-hidden min-w-0">
            <h3 className="text-[#12ddf4] font-semibold font-mono text-[10px] uppercase tracking-[0.2em]">
              PLAYER LUCK
            </h3>
            <div className="flex items-center justify-between mt-0.5">
              <input
                value={playerLuck}
                onChange={(e) => setPlayerLuck(e.target.value)}
                type="number"
                className="w-3/4 min-w-0 font-mono text-xl font-semibold outline-none text-white placeholder:text-neutral-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
                placeholder="Enter"
              />
              <div className="flex flex-col leading-none shrink-0">
                <button
                  onClick={() =>
                    setPlayerLuck((v) =>
                      String(((Number(v) || 0) + 0.1).toFixed(1)),
                    )
                  }
                  type="button"
                  className="text-[#8b8ba7] hover:text-[#12ddf4] transition-colors"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={() =>
                    setPlayerLuck((v) =>
                      String(((Number(v) || 0) - 0.1).toFixed(1)),
                    )
                  }
                  type="button"
                  className="text-[#8b8ba7] hover:text-[#12ddf4] transition-colors -mt-1"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secret Chance % */}
        <div className="bg-[#050911] w-full sm:w-1/3 h-17 rounded-[0.9rem] border border-[#212632] p-3 flex gap-3">
          <div className="box text-xl h-full w-11 shrink-0 border border-[#222b39] bg-[#131924] rounded-[0.6rem] flex justify-center items-center">
            <span className="shimmer-text font-bold">???</span>
          </div>
          <div className="flex-1 h-full min-w-0">
            <h3 className="flex items-center gap-1 text-[#12ddf4] font-semibold font-mono text-[10px] uppercase tracking-[0.2em]">
              SECRET CHANCE %
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[9px] font-semibold text-white transition hover:bg-white/20"
                  >
                    ?
                  </button>
                </TooltipTrigger>

                <TooltipContent className="bg-[#050911] border border-[#222b39] font-mono flex flex-col justify-center items-start p-2">
                  <div className="w-full flex justify-between items-center gap-3">
                    <span className="text-[#8b8ba7] font-semibold">
                      No Secret Hunter GP
                    </span>
                    <span className="text-[#fabf22] [text-shadow:0_0_20px_currentColor] font-extrabold">
                      0%
                    </span>
                  </div>
                  <div className="w-full flex justify-between gap-3">
                    <span className="text-[#8b8ba7] font-semibold">
                      With Secret Hunter GP
                    </span>
                    <span className="text-[#fabf22] [text-shadow:0_0_20px_currentColor] font-extrabold">
                      +50%
                    </span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </h3>
            <div className="flex items-center justify-between mt-0.5">
              <input
                value={secretChance}
                onChange={(e) => setSecretChance(e.target.value)}
                type="number"
                className="w-3/4 min-w-0 bg-transparent font-mono text-xl font-semibold outline-none text-white placeholder:text-neutral-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
                placeholder="Enter"
              />
              <div className="flex flex-col leading-none shrink-0">
                <button
                  onClick={() =>
                    setSecretChance((v) =>
                      String(((Number(v) || 0) + 1).toFixed(0)),
                    )
                  }
                  type="button"
                  className="text-[#8b8ba7] hover:text-[#12ddf4] transition-colors"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={() =>
                    setSecretChance((v) =>
                      String(((Number(v) || 0) - 1).toFixed(0)),
                    )
                  }
                  type="button"
                  className="text-[#8b8ba7] hover:text-[#12ddf4] transition-colors -mt-1"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Star (auto) */}
        <div className="bg-[#050911] w-full sm:w-1/3 h-17 rounded-[0.9rem] border border-[#212632] p-3 flex gap-3">
          <div className="box text-5xl pb-2 text-white h-full w-11 shrink-0 border border-[#222b39] bg-[#131924] rounded-[0.6rem] flex justify-center items-center">
            ✦
          </div>
          <div className="flex-1 h-full flex flex-col justify-center min-w-0">
            <h3 className="text-[#12ddf4] font-semibold font-mono text-[10px] uppercase tracking-[0.2em] truncate">
              STAR (AUTO:
              <span className="shimmer-text font-bold"> {selectedSecret})</span>
            </h3>
            <p className="mt-1 text-[1rem] leading-none font-semibold font-mono text-[#ffb634] [text-shadow:0_0_10px_rgba(255,182,52,0.2)] truncate">
              {secrets[selectedSecret].star} ({secrets[selectedSecret].starLuck}
              )
            </p>
          </div>
        </div>
      </div>

      <div className="bottom-row">
        <h2 className="text-[#12ddf4] mb-3 font-mono text-[13px] uppercase tracking-[0.2em]">
          TARGET UNIT
        </h2>

        <div className="box grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-2">
          {Object.entries(secrets).map(([key, secret]) => {
            const secretKey = key as SecretKey;
            return (
              <button
                key={secretKey}
                onClick={() => setSelectedSecret(secretKey)}
                className={`group relative flex h-18 flex-col justify-center overflow-hidden rounded-[1rem] px-3 text-left transition-all duration-300 ${
                  selectedSecret === secretKey
                    ? "border border-[#7C3AED] bg-[#151022] shadow-[inset_0_0_16px_rgba(124,58,237,0.12)] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[radial-gradient(circle_at_50%_120%,rgba(124,58,237,0.12),transparent_70%)] before:content-['']"
                    : "border border-[#212632] bg-[#050911] hover:-translate-y-0.5 hover:border-[#12ddf4]/70 hover:bg-[#0a101b]"
                }`}
              >
                <h3
                  className={`relative z-10 text-[1.05rem] font-semibold transition-all duration-300 ${
                    selectedSecret === secretKey
                      ? "text-[#C4B5FD] [text-shadow:0_0_8px_currentColor]"
                      : "text-white group-hover:text-[#12ddf4] group-hover:[text-shadow:0_0_3px_currentColor]"
                  }`}
                >
                  {secret.name}
                </h3>
                <p
                  className={`relative z-10 mt-1 text-[0.62rem] transition-colors tracking-tighter ${
                    selectedSecret === secretKey
                      ? "text-[#B7A7E8]"
                      : "text-[#8b8ba7]"
                  }`}
                >
                  Base: 1 in {secret.baseOdds.toLocaleString()}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InputSection;
