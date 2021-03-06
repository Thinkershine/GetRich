import React from "react";
import ProgressBar from "./common/progressBar";

const Stats = props => {
  console.log("PROPS AT STATS", props);
  return (
    <div id="stats">
      <h3>Stats</h3>
      <div className="row">
        <div className="col">
          <ProgressBar
            title="Power"
            levelToDisplay={props.miningPower}
            percentageOfCompletion={props.miningPowerLevel}
            currentValue={props.miningPower}
            maxValue={100}
            badge={"warning"}
            bgColor={"dark"}
            size={"medium"}
            animated={true}
          />
        </div>
        <div className="col">
          <ProgressBar
            title={"Skill"}
            levelToDisplay={props.miningSkill}
            percentageOfCompletion={props.miningSkillCurrentPercentage}
            currentValue={props.miningSkillExperience}
            maxValue={props.nextMiningSkillExperience}
            badge={"success"}
            bgColor={"dark"}
            size={"medium"}
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
            size={"medium"}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
