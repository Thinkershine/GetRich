import MyResources from "../models/myResources.js";
import ExperienceHandler from "../components/helpers/experienceHandler";

export default class PlayerData {
  lvl = 1;
  experience = {
    miningSkill: 0,
    miningSkillExperience: 0,
    miningPowerLevel: 1,
    lvlExperienceDifference: 15,
    miningSkillCurrentPercentage: 0,
    currentMiningSkillExperience: 0,
    nextMiningSkillExperience: 15
  };
  equipment = {
    currentEquipmentIndex: 0,
    isEquipped: false,
    equipmentBackpack: [
      {
        name: "none",
        mineType: "none",
        miningPower: 0,
        value: 0,
        energyConsumption: 0
      }
    ],
    equipmentCapacity: 5
  };
  items = [];
  potions = [];
  workers = [];
  achievements = [];
  seasonsCompleted = [];
  stats = {
    miningPowerLevel: 1,
    energyLevel: 1,
    energyPoints: 100,
    currentEnergyPoints: 100,
    maximumEnergyPoints: 100
  };
  profile = {};
  rank = {};
  settings = {};
  isPremium = true;
  isPlayingOnLine = false;

  constructor(messenger) {
    this.resources = new MyResources(messenger);
    this.experienceHandler = new ExperienceHandler();
    // this.energyHandler = new EnergyHandler();
  }

  handleExperienceGain = expAmount => {
    let experience = {
      miningSkill: this.experience.miningSkill,
      miningSkillExperience: this.experience.miningSkillExperience,
      miningSkillCurrentPercentage: this.experience
        .miningSkillCurrentPercentage,
      currentMiningSkillExperience: this.experience
        .currentMiningSkillExperience,
      nextMiningSkillExperience: this.experience.nextMiningSkillExperience,
      miningPower: this.miningPowerLevel
    };

    experience = this.experienceHandler.handleExperienceGain(
      expAmount,
      experience
    );

    let leveledUP = false;

    if (this.experience.miningSkill !== experience.miningSkill) {
      leveledUP = true;
    }

    this.experience = experience;

    return leveledUP;
  };

  spendEnergy = energySpent => {
    console.log("ENERGY SPENT", energySpent);
    //this.energyHandler.spendEnergy(energySpent);
  };
}
