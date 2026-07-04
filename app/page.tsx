"use client";
import CurveSection from "@/components/CurveSection";
import InputSection from "@/components/InputSection";
import OddsResult from "@/components/OddsResult";
import { secrets } from "@/data/secrets";
import { useState } from "react";

export default function Home() {
  const [selectedSecret, setSelectedSecret] = useState<string>("Broly");
  const [playerLuck, setPlayerLuck] = useState<string>("3.1");
  const [secretChance, setSecretChance] = useState<string>("0");

  const calculateOdds = (
    selectedSecret: string,
    playerLuck: number,
    secretChance: number,
  ) => {
    let result;
    let totalLuck = playerLuck + secrets[selectedSecret.toLowerCase()].starLuck;

    if (totalLuck < 14) {
      result =
        100 /
        (secrets[selectedSecret.toLowerCase()].baseChance *
          1.03797036 *
          (1 + secretChance / 100) *
          (1 + totalLuck * 0.1));
    } else if (totalLuck >= 14) {
      result =
        100 /
        (secrets[selectedSecret.toLowerCase()].baseChance *
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
    <div className="bg-[#0a0e19] min-h-screen min-w-screen flex flex-col gap-5 py-7 items-center">
      <InputSection
        selectedSecret={selectedSecret}
        setSelectedSecret={setSelectedSecret}
        playerLuck={playerLuck}
        setPlayerLuck={setPlayerLuck}
        secretChance={secretChance}
        setSecretChance={setSecretChance}
        result={result}
      />
      <OddsResult
        selectedSecret={selectedSecret}
        playerLuck={playerLuck}
        result={result}
      />
      <CurveSection result={result} />
    </div>
  );
}
