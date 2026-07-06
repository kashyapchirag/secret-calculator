export const secrets = {
  broly: {
    name: "Broly",
    star: "Namek",
    starLuck: 1,
    baseChance: 0.00009433962,
    baseOdds: 1060000,
  },
  vegito: {
    name: "Vegito",
    star: "Corps",
    starLuck: 0.5,
    baseChance: 0.00008333333,
    baseOdds: 1200000,
  },
  minato: {
    name: "Minato",
    star: "Ninja",
    starLuck: 0.2,
    baseChance: 0.00006666666,
    baseOdds: 1500000,
  },
  mihawk: {
    name: "Mihawk",
    star: "Sky",
    starLuck: 0,
    baseChance: 0.00005624296,
    baseOdds: 1778000,
  },
  "naruto beast": {
    name: "Naruto Beast",
    star: "Rain",
    starLuck: -0.15,
    baseChance: 0.00004761904,
    baseOdds: 2100000,
  },
  aizen: {
    name: "Aizen",
    star: "Soul",
    starLuck: -0.25,
    baseChance: 0.00004166666,
    baseOdds: 2400000,
  },
  yoruichi: {
    name: "Yoruichi",
    star: "Summer Event",
    starLuck: 0,
    baseChance: 0.00006060606,
    baseOdds: 1650000,
  },
} as const;

export type SecretKey = keyof typeof secrets;
