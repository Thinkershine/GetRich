export const items = [
  {
    _id: "5b21ca3eeb7f6fbccd47181802",
    name: "rusty pickaxe",
    miningPower: 1,
    value: 50,
    energyConsumption: 10
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181804",
    name: "steel pickaxe",
    miningPower: 3,
    value: 250,
    energyConsumption: 9
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181806",
    name: "hardened pickaxe",
    miningPower: 5,
    value: 900,
    energyConsumption: 7
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181808",
    name: "silver pickaxe",
    miningPower: 8,
    value: 1600,
    energyConsumption: 5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181810",
    name: "golden pickaxe",
    miningPower: 10,
    value: 2000,
    energyConsumption: 3
  }
];

export function getItems() {
  return items.filter(item => item);
}
