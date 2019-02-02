export const items = [
  {
    _id: "5b21ca3eeb7f6fbccd47181802",
    name: "rusty pickaxe",
    mineType: "copper",
    miningPower: 1,
    value: 50,
    energyConsumption: 5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181804",
    name: "steel pickaxe",
    mineType: "silver",
    miningPower: 3,
    value: 250,
    energyConsumption: 4
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181806",
    name: "hardened pickaxe",
    mineType: "silver",
    miningPower: 5,
    value: 900,
    energyConsumption: 3
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181808",
    name: "silver pickaxe",
    mineType: "silver",
    miningPower: 8,
    value: 1600,
    energyConsumption: 2
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181810",
    name: "golden pickaxe",
    mineType: "gold",
    miningPower: 10,
    value: 2000,
    energyConsumption: 1
  }
];

export function getItems() {
  return items.filter(item => item);
}
