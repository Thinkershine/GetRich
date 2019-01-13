export const levels = [
  {
    _id: 0,
    requiredExp: 0
  },
  {
    _id: 1,
    requiredExp: 15
  },
  {
    _id: 2,
    requiredExp: 34
  },
  {
    _id: 3,
    requiredExp: 57
  },
  {
    _id: 4,
    requiredExp: 92
  },
  {
    _id: 5,
    requiredExp: 135
  },
  {
    _id: 6,
    requiredExp: 372
  },
  {
    _id: 7,
    requiredExp: 560
  },
  {
    _id: 8,
    requiredExp: 840
  },
  {
    _id: 9,
    requiredExp: 1240
  },
  {
    _id: 10,
    requiredExp: 1716
  },
  // From Here Data is Fake
  {
    _id: 11,
    requiredExp: 1916
  },
  {
    _id: 12,
    requiredExp: 2106
  },
  {
    _id: 13,
    requiredExp: 2216
  },
  {
    _id: 14,
    requiredExp: 2316
  },
  {
    _id: 15,
    requiredExp: 2416
  },
  {
    _id: 16,
    requiredExp: 2516
  },
  {
    _id: 17,
    requiredExp: 2616
  },
  {
    _id: 18,
    requiredExp: 2716
  },
  {
    _id: 19,
    requiredExp: 2816
  },
  {
    _id: 20,
    requiredExp: 2916
  },
  {
    _id: 21,
    requiredExp: 3016
  },
  {
    _id: 22,
    requiredExp: 3116
  },
  {
    _id: 23,
    requiredExp: 3216
  },
  {
    _id: 24,
    requiredExp: 3316
  },
  {
    _id: 25,
    requiredExp: 3416
  },
  {
    _id: 26,
    requiredExp: 3616
  },
  {
    _id: 27,
    requiredExp: 3716
  },
  {
    _id: 28,
    requiredExp: 4016
  },
  {
    _id: 29,
    requiredExp: 4216
  },
  {
    _id: 30,
    requiredExp: 4416
  },
  {
    _id: 31,
    requiredExp: 4616
  },
  {
    _id: 32,
    requiredExp: 4816
  },
  {
    _id: 33,
    requiredExp: 5016
  },
  {
    _id: 34,
    requiredExp: 5116
  },
  {
    _id: 35,
    requiredExp: 5316
  },
  {
    _id: 36,
    requiredExp: 5516
  },
  {
    _id: 37,
    requiredExp: 5816
  },
  {
    _id: 38,
    requiredExp: 6016
  },
  {
    _id: 39,
    requiredExp: 6216
  },
  {
    _id: 40,
    requiredExp: 6416
  },
  {
    _id: 41,
    requiredExp: 6616
  },
  {
    _id: 42,
    requiredExp: 6816
  },
  {
    _id: 43,
    requiredExp: 7016
  },
  {
    _id: 44,
    requiredExp: 7216
  },
  {
    _id: 45,
    requiredExp: 7416
  },
  {
    _id: 46,
    requiredExp: 7616
  },
  {
    _id: 47,
    requiredExp: 7816
  },
  {
    _id: 48,
    requiredExp: 8016
  },
  {
    _id: 49,
    requiredExp: 8216
  },
  {
    _id: 50,
    requiredExp: 8416
  },
  {
    _id: 51,
    requiredExp: 8616
  },
  {
    _id: 52,
    requiredExp: 8816
  },
  {
    _id: 53,
    requiredExp: 9016
  },
  {
    _id: 54,
    requiredExp: 9216
  },
  {
    _id: 55,
    requiredExp: 9416
  },
  {
    _id: 56,
    requiredExp: 9616
  }
];

export function getLevels() {
  return levels.filter(level => level);
}

export function getExperienceForLevel(forLevel) {
  return levels[forLevel].requiredExp;
}

export function getExperienceDifferenceForLvl(forLevel) {
  return getExperienceForLevel(forLevel + 1) - getExperienceForLevel(forLevel);
}
