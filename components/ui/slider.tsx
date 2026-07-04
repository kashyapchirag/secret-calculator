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
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      {...props}
    >
      {/* Background Track */}
      <SliderPrimitive.Track
        className="
          relative
          h-0.75
          w-full
          grow
          overflow-hidden
          rounded-full
          bg-[#1c2534]
        "
      >
        {/* Filled Range */}
        <SliderPrimitive.Range
          className="
            absolute
            h-full
            rounded-full
            bg-[#20dfff]
            shadow-[0_0_8px_rgba(32,223,255,0.7)]
          "
        />
      </SliderPrimitive.Track>

      {/* Thumb */}
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="
            block
            h-4
            w-4
            rounded-full

            border-2
            border-[#20dfff]

            bg-[#0c121d]

            shadow-[0_0_10px_rgba(32,223,255,0.9)]

            transition-transform
            duration-150

            hover:scale-110

            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-cyan-400/20
          "
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
