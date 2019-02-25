import React, { Component } from "react";
import PropTypes from "prop-types";

class Player extends Component {
  state = {};

  constructor(props) {
    super(props);

    const { playerData } = this.props;

    this.state = {
      lvl: playerData.lvl,
      experience: {
        miningSkill: playerData.experience.miningSkill,
        miningSkillExperience: playerData.experience.miningSkillExperience,
        miningPowerLevel: playerData.experience.miningPowerLevel,
        lvlExperienceDifference: playerData.experience.lvlExperienceDifference,
        miningSkillCurrentPercentage:
          playerData.experience.miningSkillCurrentPercentage,
        currentMiningSkillExperience:
          playerData.experience.currentMiningSkillExperience,
        nextMiningLevelExperience:
          playerData.experience.nextMiningLevelExperience
      },
      equipment: playerData.equipment,
      items: playerData.items,
      potions: playerData.potions,
      resources: playerData.resources,
      workers: playerData.workers,
      achievements: playerData.achievements,
      seasonsCompleted: playerData.seasonsCompleted,
      stats: playerData.stats,
      profile: playerData.profile,
      rank: playerData.rank,
      settings: playerData.settings,
      isPremium: playerData.isPremium,
      isPlayingOnLine: playerData.isPlayingOnLine,
      messenger: this.props.messenger
    };
  }

  componentDidMount() {
    console.log("Game Tick");
  }

  handleExperienceGain = expAmount => {
    let experience = {
      miningSkill: this.state.miningSkill,
      miningSkillExperience: this.state.miningSkillExperience,
      miningSkillCurrentPercentage: this.state.miningSkillCurrentPercentage,
      currentMiningSkillExperience: this.state.currentMiningSkillExperience,
      nextMiningSkillExperience: this.state.nextMiningLevelExperience,
      miningPower: this.state.miningPowerLevel
    };

    experience = this.state.experienceHandler.handleExperienceGain(
      expAmount,
      experience
    );

    // Trigger Gratulations & Confetti at APP.js
    // if (this.state.miningSkill !== experience.miningSkill) {
    //   this.gratulations();
    // }

    this.setState({
      miningSkillExperience: experience.miningSkillExperience,
      currentMiningSkillExperience: experience.currentMiningSkillExperience,
      miningSkill: experience.miningSkill,
      miningPowerLevel: experience.miningPower,
      nextMiningLevelExperience: experience.nextMiningSkillExperience,
      miningSkillCurrentPercentage: experience.miningSkillCurrentPercentage
    });
  };

  render() {
    return (
      <div id="player">
        <h1>Thinkershine</h1>
      </div>
    );
  }
}

Player.propTypes = {
  miningEquipment: PropTypes.array
};

export default Player;
