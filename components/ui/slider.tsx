"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root>;

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderProps) {
  const values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min],
    [value, defaultValue, min],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      min={min}
      max={max}
      value={value}
      defaultValue={defaultValue}
      className={cn(
        "relative flex w-full touch-none select-none items-center ",
        className,
      )}
      {...props}
    >
      {/* Background Track */}
      <SliderPrimitive.Track
        className="
          relative
          h-[14px]
          w-full
          grow
          overflow-hidden
          rounded-full
          border
          border-[#202c3e]
          bg-[#101826]
          
        "
      >
        {/* Filled Range */}
        <SliderPrimitive.Range
          className="
            absolute
            h-full
            rounded-full
            bg-[#20dfff]
            shadow-[0_0_14px_rgba(32,223,255,0.8)]
            
          "
        />
      </SliderPrimitive.Track>

      {/* Thumb */}
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="
            relative
            block
            h-9
            w-9
            rounded-full

            border-[3px]
            border-[#20dfff]

            bg-[#0c121d]

            shadow-[0_0_18px_rgba(32,223,255,.85)]

            transition-all
            duration-200

            hover:scale-105
            hover:shadow-[0_0_24px_rgba(32,223,255,1)]

            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-cyan-400/20

            before:absolute
            before:inset-[5px]
            before:rounded-full
            before:bg-[#162131]
            
          "
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
