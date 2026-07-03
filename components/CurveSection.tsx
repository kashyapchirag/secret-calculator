"use client";
import { useState } from "react";
import OpensSlider from "./ui/OpenSlider";

const CurveSection = () => {
  const [opensMade, setOpensMade] = useState(0);
  return (
    <div className="bg-[#131924] border border-[#222b39] font-mono p-5.5 w-[74%] h-80 rounded-[1.2rem] flex flex-col gap-0">
      <h1 className="w-full flex justify-between">
        <span className="text-[#12ddf4] mb-3 font-mono text-[13px] uppercase tracking-[0.2em]">
          Normal Pull
        </span>
        <span className="text-neutral-400 text-xs">
          Target:
          <span className="text-[#fabf22] font-medium"> Vegito</span>
        </span>
      </h1>

      <div className="mt-2 small-info-section flex justify-between w-full">
        <span className="text-neutral-400 mb-3 font-mono text-[14px]">
          Opens made so far
        </span>
      </div>

      <OpensSlider
        opensMade={opensMade}
        setOpensMade={setOpensMade}
        maxOpens={1000000}
      />
    </div>
  );
};

export default CurveSection;
