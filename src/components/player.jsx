import React, { Component } from "react";
import PropTypes from "prop-types";
import Stats from "../components/stats";

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

  componentWillReceiveProps(nextProps) {
    // Calling this.setState Here Won't Trigger Additional Render
    console.log("NEXT PROPS", nextProps);
    if (this.state.experience !== nextProps.playerData.experience) {
      this.setState({ experience: nextProps.playerData.experience });
    }

    if (this.state.stats !== nextProps.playerData.stats) {
      this.setState({ stats: nextProps.playerData.stats });
    }
  }
  componentDidMount() {}

  render() {
    const { stats, experience } = this.state;
    const miningPower = 1 + experience.miningSkill;
    // console.log("STATS", stats);
    // console.log("EXP", experience);
    const statsToPass = {
      miningPower: miningPower,
      miningPowerLevel: stats.miningPowerLevel,
      maximumMiningPowerLevel: 100,
      miningSkill: experience.miningSkill,
      miningSkillCurrentPercentage: experience.miningSkillCurrentPercentage,
      miningSkillExperience: experience.miningSkillExperience,
      nextMiningSkillExperience: experience.nextMiningSkillExperience,
      energyLevel: stats.energyLevel,
      energyPoints: stats.energyPoints,
      currentEnergyPoints: stats.currentEnergyPoints,
      maximumEnergyPoints: stats.maximumEnergyPoints
    };

    return (
      <div
        id="player"
        className="container"
        style={{ marginTop: this.props.height }}
      >
        <h1>
          Thinkershine{" "}
          <span style={{ fontSize: 24 }}>Lvl. {this.state.lvl}</span>
        </h1>

        <Stats {...statsToPass} />
      </div>
    );
  }
}

Player.propTypes = {
  miningEquipment: PropTypes.array
};

export default Player;
