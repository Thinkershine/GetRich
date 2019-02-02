export const items = [
  {
    _id: "5b21ca3eeb7f6fbccd47181802",
    name: "rusty pickaxe",
    mineType: "copper",
    miningPower: 1,
    value: 50,
    energyConsumption: 1
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181804",
    name: "steel pickaxe",
    mineType: "silver",
    miningPower: 2,
    value: 250,
    energyConsumption: 1
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181806",
    name: "hardened pickaxe",
    mineType: "silver",
    miningPower: 3,
    value: 900,
    energyConsumption: 1
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181808",
    name: "silver pickaxe",
    mineType: "silver",
    miningPower: 4,
    value: 1600,
    energyConsumption: 1
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181810",
    name: "golden pickaxe",
    mineType: "gold",
    miningPower: 5,
    value: 2000,
    energyConsumption: 1
  }
];

export function getItems() {
  return items.filter(item => item);
}
