"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  /**
   * Either pass a preset ("cyan" | "yellow") or any raw CSS color
   * (hex, rgb, var(--your-token)) for full control.
   */
  color?: "cyan" | "yellow" | (string & {});
};

const COLOR_PRESETS: Record<
  "cyan" | "yellow",
  { track: string; glow: string }
> = {
  cyan: {
    track: "#20dfff",
    glow: "0 0 8px rgba(32,223,255,0.7)",
  },
  yellow: {
    track: "#fabf22",
    glow: "0 0 8px rgba(250,191,34,0.7)",
  },
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  color = "cyan",
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

  // if it's one of our presets, use the tuned track color + glow.
  // otherwise treat whatever string was passed as a raw CSS color.
  const preset = COLOR_PRESETS[color as "cyan" | "yellow"];
  const trackColor = preset ? preset.track : color;
  const glow = preset ? preset.glow : `0 0 8px ${trackColor}`;

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
          className="absolute h-full rounded-full"
          style={{
            backgroundColor: trackColor,
            boxShadow: glow,
          }}
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
            bg-[#0c121d]
            transition-transform
            duration-150
            hover:scale-110
            focus-visible:outline-none
            focus-visible:ring-4
          "
          style={{
            borderColor: trackColor,
            boxShadow: `0 0 10px ${
              preset
                ? trackColor.replace("#", "").length === 6
                  ? `rgba(${hexToRgb(trackColor)},0.9)`
                  : trackColor
                : trackColor
            }`,
          }}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
}

export { Slider };
