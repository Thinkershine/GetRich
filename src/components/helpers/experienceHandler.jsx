import {
  getLevels,
  getExperienceForLevel,
  getExperienceDifferenceForLvl
} from "./../../services/fakeExperienceService";

export default class ExperienceHandler {
  experienceTable = [];

  constructor() {
    this.experienceTable = getLevels();
    console.log("CONSTRUCTED", this.experienceTable);
  }

  // expAmount
  // miningSkillExperience
  // currentMiningSkillExperience
  // currentLevel

  handleExperienceGain(expAmount, experience) {
    console.log("INPUT EXP", experience);
    experience.miningSkillExperience =
      experience.miningSkillExperience + expAmount;
    experience.currentMiningSkillExperience =
      experience.currentMiningSkillExperience + expAmount;

    experience = this.calculateLevelUp(experience);
    console.log("RETURN EXP", experience);
    return experience;
  }

  calculateLevelUp(experience) {
    let nextMiningLevelExperience = getExperienceForLevel(
      experience.miningSkill + 1
    );
    console.log("NEXT LVL EXP", nextMiningLevelExperience);
    if (experience.miningSkillExperience >= nextMiningLevelExperience) {
      experience.miningSkill += 1;
      experience.miningPower += 1;
      experience.currentMiningSkillExperience = 0;

      experience = this.calculateNextLevelExperience(experience);
    }

    // experience = this.calculateCurrentLevelExperiencePercentage(experience);

    return experience;
  }

  calculateNextLevelExperience(experience) {
    experience.nextMiningSkillExperience = getExperienceForLevel(
      experience.miningSkill + 1
    );

    return experience;
  }

  // calculateCurrentLevelExperiencePercentage(experience) {
  //   let currentPercentage =
  //     (experience.currentMiningSkillExperience /
  //       this.getExperienceDifferenceForLvl(experience.currentLevel)) *
  //     100;

  //   if (currentPercentage >= 100) {
  //     currentPercentage = 0;
  //   }

  //   experience.currentPercentage = currentPercentage;
  //   return experience;
  // }
}
