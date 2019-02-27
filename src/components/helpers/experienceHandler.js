import {
  getLevels,
  getExperienceForLevel,
  getExperienceDifferenceForLvl
} from "../../services/fakeExperienceService";

import {
  getRealLevels,
  getRealExperienceForLevel
} from "../../services/experienceService";

export default class ExperienceHandler {
  experienceTable = [];
  isPlayingOnLine = false;

  constructor() {
    // if playing Single Player On-Line
    if (this.isPlayingOnLine) {
      this.experienceTable = getRealLevels();
    } else {
      this.experienceTable = getLevels();
    }

    console.log("Experience Table: ", this.experienceTable);
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
    if (
      experience.miningSkillExperience >= experience.nextMiningSkillExperience
    ) {
      experience.miningSkill += 1;
      experience.miningPower += 1;
      experience.currentMiningSkillExperience = 0;

      experience = this.calculateNextLevelExperience(experience);
    }

    experience = this.calculateCurrentLevelExperiencePercentage(experience);

    return experience;
  }

  calculateNextLevelExperience(experience) {
    if (this.isPlayingOnLine) {
      experience.nextMiningSkillExperience = getRealExperienceForLevel(
        experience.miningSkill + 1
      );
    } else {
      experience.nextMiningSkillExperience = getExperienceForLevel(
        experience.miningSkill + 1
      );
    }

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
