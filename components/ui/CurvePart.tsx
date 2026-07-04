import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

// generate the curve once per unit/stat change
function generateCurveData(
  chanceFraction: number,
  maxOpens: number,
  points = 100,
) {
  const data = [];
  for (let i = 0; i <= points; i++) {
    const opens = (maxOpens / points) * i;
    const probability = (1 - Math.pow(1 - chanceFraction, opens)) * 100;
    data.push({ opens, probability });
  }
  return data;
}

export function CurvePart({
  chanceFraction,
  maxOpens,
  opensMade,
}: {
  chanceFraction: number; // e.g. 0.00016747 / 100
  maxOpens: number; // your 99% milestone opens
  opensMade: number; // current slider value
}) {
  const curveData = useMemo(
    () => generateCurveData(chanceFraction, maxOpens),
    [chanceFraction, maxOpens],
  );

  // same formula, evaluated at the exact slider value
  const currentProbability =
    (1 - Math.pow(1 - chanceFraction, opensMade)) * 100;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={curveData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1c2534" />
        <XAxis
          dataKey="opens"
          stroke="#8b8ba7"
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
        />
        <YAxis
          stroke="#8b8ba7"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
        />

        <Area
          type="monotone"
          dataKey="probability"
          stroke="#20dfff"
          fill="#20dfff"
          fillOpacity={0.15}
        />

        {/* dashed guide lines to the current point */}
        <ReferenceLine x={opensMade} stroke="#20dfff" strokeDasharray="4 4" />
        <ReferenceLine
          y={currentProbability}
          stroke="#20dfff"
          strokeDasharray="4 4"
        />

        {/* the moving dot itself */}
        <ReferenceDot
          x={opensMade}
          y={currentProbability}
          r={5}
          fill="#0c121d"
          stroke="#20dfff"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
