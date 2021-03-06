export const workers = [
  {
    _id: "5b21ca3eeb7f6fbccd47181802",
    name: "Rob",
    miningSkill: 0,
    miningSkillExperience: 0,
    miningSkillCurrentPercentage: 0,
    currentMiningSkillExperience: 0,
    nextMiningSkillExperience: 15,
    miningPower: 1,
    energyLevel: 1,
    energyConsumption: 1,
    energyRegeneration: 1,
    energyPoints: 100,
    maximumEnergyPoints: 100,
    hourlyCost: 5,
    currentEquipment: null,
    currentlyMining: ""
  },
  {
    _id: "b7f6fbccd471818025b21ca3ee",
    name: "Matt",
    miningSkill: 1,
    miningSkillExperience: 0,
    miningSkillCurrentPercentage: 0,
    currentMiningSkillExperience: 0,
    nextMiningSkillExperience: 34,
    miningPower: 1,
    energyLevel: 2,
    energyConsumption: 1,
    energyRegeneration: 1,
    energyPoints: 120,
    maximumEnergyPoints: 120,
    hourlyCost: 6,
    currentEquipment: null,
    currentlyMining: ""
  },
  {
    _id: "d471818025b21ca3eeb7f6fbcc",
    name: "Brad",
    miningSkill: 0,
    miningSkillExperience: 0,
    miningSkillCurrentPercentage: 0,
    currentMiningSkillExperience: 0,
    nextMiningSkillExperience: 15,
    miningPower: 1,
    energyLevel: 3,
    energyConsumption: 1,
    energyRegeneration: 2,
    energyPoints: 150,
    maximumEnergyPoints: 150,
    hourlyCost: 10,
    currentEquipment: null,
    currentlyMining: ""
  }
];

export function getWorkers() {
  return workers;
}
