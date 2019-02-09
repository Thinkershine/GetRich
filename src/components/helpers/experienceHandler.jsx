import {
  getLevels,
  getExperienceForLevel,
  getExperienceDifferenceForLvl
} from "./../../services/fakeExperienceService";

export default class ExperienceHandler {
  experienceTable = [];

  constructor() {
    this.experienceTable = getLevels();
  }

  handleExperienceGain(expAmount, experience) {
    experience.miningSkillExperience =
      experience.miningSkillExperience + expAmount;
    experience.currentMiningSkillExperience =
      experience.currentMiningSkillExperience + expAmount;

    experience = this.calculateLevelUp(experience);
    return experience;
  }

  calculateLevelUp(experience) {
    let nextMiningLevelExperience = getExperienceForLevel(
      experience.miningSkill + 1
    );

    if (experience.miningSkillExperience >= nextMiningLevelExperience) {
      experience.miningSkill += 1;
      experience.miningPower += 1;
      experience.currentMiningSkillExperience = 0;

      experience = this.calculateNextLevelExperience(experience);
    }

    experience = this.calculateCurrentLevelExperiencePercentage(experience);

    return experience;
  }

  calculateNextLevelExperience(experience) {
    experience.nextMiningSkillExperience = getExperienceForLevel(
      experience.miningSkill + 1
    );

    return experience;
  }

  calculateCurrentLevelExperiencePercentage(experience) {
    let currentPercentage =
      (experience.currentMiningSkillExperience /
        getExperienceDifferenceForLvl(experience.miningSkill)) *
      100;

    if (currentPercentage >= 100) {
      currentPercentage = 0;
    }

    experience.miningSkillCurrentPercentage = currentPercentage;
    return experience;
  }
}
