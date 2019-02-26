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
  equipment = [];
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

    console.log("EXPERIENCE ATFTER HANDLER", experience);
    this.experience = experience;

    // Trigger Gratulations & Confetti at APP.js
    // if (this.state.miningSkill !== experience.miningSkill) {
    //   this.gratulations();
    // }

    //If Leveled Up Return LEVELED UP!
  };

  spendEnergy = energyAmount => {
    console.log("ENERGY SPENT", energyAmount);
  };
}
