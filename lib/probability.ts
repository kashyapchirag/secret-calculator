export function cumulativeProb(chanceFraction: number, opens: number) {
  return 1 - Math.pow(1 - chanceFraction, opens);
}

export function opensForMilestone(chanceFraction: number, target: number) {
  return Math.log(1 - target) / Math.log(1 - chanceFraction);
}

export function formatCompact(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return Math.round(n).toLocaleString("en-US");
}
