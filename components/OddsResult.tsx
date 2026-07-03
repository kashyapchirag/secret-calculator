import { secrets } from "@/data/secrets";

const OddsResult = ({ selectedSecret, playerLuck, result }) => {
  const totalLuck =
    Number(playerLuck) + secrets[selectedSecret.toLowerCase()].starLuck;

  console.log(
    playerLuck,
    secrets[selectedSecret.toLowerCase()].starLuck,
    totalLuck,
  );

  return (
    <div className="bg-[#131924] border border-[#222b39] font-mono w-[74%] h-55 rounded-[1.2rem] flex items-center justify-between gap-10 p-5.5 ">
      {/* left: gauge + odds */}
      <div className="flex items-center gap-8">
        {/* gauge */}
        <div className="relative w-32 h-32 shrink-0 rounded-full flex items-center justify-center">
          {/* faint outer ring outlines */}
          <div className="absolute inset-0 rounded-full border-2 border-[#12ddf4]/40"></div>
          <div className="absolute inset-1 rounded-full border border-[#12ddf4]/20"></div>

          {/* glowing arc, masked into a thin ring */}
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

          {/* center content */}
          <div className="absolute inset-1.5 rounded-full bg-[#0c1119] border border-[#212632] flex flex-col items-center justify-center">
            <span className="text-white text-6xl leading-none">✦</span>
            <span className="mb-3 text-[#12ddf4] text-xs font-semibold">
              {secrets[selectedSecret.toLowerCase()].starLuck >= 0 ? (
                <>+{secrets[selectedSecret.toLowerCase()].starLuck}</>
              ) : (
                <>{secrets[selectedSecret.toLowerCase()].starLuck}</>
              )}
            </span>
          </div>
        </div>
        {/* odds text */}
        <div className="flex flex-col gap-2">
          <span className="text-[#8b8ba7] text-[11px] font-semibold uppercase tracking-[0.25em]">
            Your Odds
          </span>
          <h2 className="text-[#12ddf4] text-6xl font-bold tracking-tight [text-shadow:0_0_24px_rgba(18,221,244,0.35)]">
            1 IN {Number(result.toFixed(0)).toLocaleString()}
          </h2>
          <p className="text-[#8b8ba7] text-sm">
            {((1 / Number(result.toFixed(0))) * 100).toFixed(7)} % chance per
            hatch <span className="text-neutral-300">✦</span>{" "}
            <span className="text-[#ffb634] font-semibold">
              {selectedSecret.toUpperCase()}
            </span>
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-1.5 bg-[#050911] border border-[#212632] rounded-full px-3 py-1.5 text-xs text-[#8b8ba7]">
              🍀 Total Luck: {totalLuck}
            </span>
            <span className="flex items-center gap-1.5 bg-[#050911] border border-[#212632] rounded-full px-3 py-1.5 text-xs text-[#8b8ba7] ">
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
      <div className="w-64 shrink-0 bg-[#050911] border border-[#212632] rounded-[1rem] p-4 flex flex-col gap-2">
        <span className="flex items-center gap-1.5 text-[#fabf22] text-sm font-semibold">
          ✨ Shiny Odds
        </span>
        <h3 className="text-white text-xl font-bold">
          1 IN {Number((result * 50).toFixed(0)).toLocaleString()}
        </h3>
        <span className="text-[#8b8ba7] text-xs">
          <span className="text-[#fabf22]">
            {((1 / Number((result * 50).toFixed(0))) * 100).toFixed(7)} %
          </span>{" "}
          chance per hatch
        </span>
      </div>
    </div>
  );
};

export default OddsResult;
