import React, { Component } from "react";
import ProgressBar from "./common/progressBar";

const Stats = props => {
  return (
    <div id="stats">
      <h3>Stats</h3>
      <div className="row">
        <div className="col">
          <ProgressBar
            title="Mining Power"
            levelToDisplay={props.miningPower}
            percentageOfCompletion={props.miningPowerLevel}
            currentValue={props.miningPower}
            maxValue={100}
            badge={"warning"}
            bgColor={"dark"}
          />
        </div>
        <div className="col">
          <ProgressBar
            title={"Mining Skill"}
            levelToDisplay={props.miningSkill}
            percentageOfCompletion={props.miningSkillCurrentPercentage}
            currentValue={props.miningSkillExperience}
            maxValue={props.nextMiningLevelExperience}
            badge={"success"}
            bgColor={"dark"}
          />
        </div>
        <div className="col">
          <ProgressBar
            title={"Energy"}
            levelToDisplay={props.energyLevel}
            percentageOfCompletion={props.energyPoints}
            currentValue={props.currentEnergyPoints}
            maxValue={props.maximumEnergyPoints}
            badge={"primary"}
            bgColor={"dark"}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;