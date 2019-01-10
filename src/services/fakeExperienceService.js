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
