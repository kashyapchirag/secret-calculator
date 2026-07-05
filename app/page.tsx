"use client";
import CurveSection from "@/components/CurveSection";
import InputSection from "@/components/InputSection";
import OddsResult from "@/components/OddsResult";
import { SecretKey, secrets } from "@/data/secrets";
import { useState } from "react";

export default function Home() {
  const [selectedSecret, setSelectedSecret] = useState<SecretKey>("broly");
  const [playerLuck, setPlayerLuck] = useState<string>("3.1");
  const [secretChance, setSecretChance] = useState<string>("0");

  const calculateOdds = (
    selectedSecret: SecretKey,
    playerLuck: number,
    secretChance: number,
  ) => {
    let result;
    const totalLuck = playerLuck + secrets[selectedSecret].starLuck;

    if (totalLuck < 14) {
      result =
        100 /
        (secrets[selectedSecret].baseChance *
          1.03797036 *
          (1 + secretChance / 100) *
          (1 + totalLuck * 0.1));
    } else {
      result =
        100 /
        (secrets[selectedSecret].baseChance *
          1.03797036 *
          (1 + secretChance / 100) *
          (1.7 + totalLuck * 0.05));
    }
    return result;
  };

  const result = calculateOdds(
    selectedSecret,
    Number(playerLuck),
    Number(secretChance),
  );

  return (
    <div className="bg-[#0a0e19] min-h-screen w-full flex flex-col gap-5 py-7 px-4 sm:px-6 items-center">
      <div className="w-full max-w-4xl flex flex-col gap-5">
        <InputSection
          selectedSecret={selectedSecret}
          setSelectedSecret={setSelectedSecret}
          playerLuck={playerLuck}
          setPlayerLuck={setPlayerLuck}
          secretChance={secretChance}
          setSecretChance={setSecretChance}
        />
        <OddsResult
          selectedSecret={selectedSecret}
          playerLuck={playerLuck}
          result={result}
        />
        <CurveSection result={result} targetName={selectedSecret} />
        <span className="text-center font-mono text-xs text-[#8b8ba7]">
          Built with <span className="text-red-400">❤️</span> by{" "}
          <span className="text-[#12ddf4] font-semibold">Isaaagi109</span> (
          <a
            href="https://github.com/kashyapchirag"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffb634] hover:text-[#ffd36a] transition-colors"
          >
            @kashyapchirag
          </a>
          )
        </span>
      </div>
    </div>
  );
}
