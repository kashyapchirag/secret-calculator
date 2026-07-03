"use client";

import { Slider } from "@/components/ui/slider";

const OpensSlider = ({
  opensMade,
  setOpensMade,
  maxOpens = 1000000,
}: {
  opensMade: number;
  setOpensMade: (value: number) => void;
  maxOpens?: number;
}) => {
  return (
    <div className="bg-[#131924] border border-[#222b39] font-mono p-6 rounded-[1.2rem] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[#12ddf4] font-semibold text-[11px] uppercase tracking-[0.25em]">
          Opens Made So Far
        </h3>
        <span className="bg-[#050911] border border-[#212632] rounded-full px-3 py-1 text-sm font-semibold text-white">
          {opensMade.toLocaleString()}
        </span>
      </div>

      <Slider
        value={[opensMade]}
        onValueChange={(vals) => setOpensMade(vals[0])}
        min={0}
        max={maxOpens}
        step={1}
      />

      <div className="flex justify-between text-[10px] text-[#8b8ba7] uppercase tracking-wider">
        <span>0</span>
        <span>{maxOpens.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default OpensSlider;
