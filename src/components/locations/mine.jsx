import React, { Component } from "react";
import RewardFound from "../common/rewardFound";

class Mine extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.mineType = this.props.mineType;
    this.state.minedAmount = 0;
    this.state.basicMining = this.props.miningPower;
    this.state.minerTimerID = 0;

    this.state.renderReward = false;
  }

  componentDidMount() {
    //  const minerTimerID = setInterval(this.dig, 1000);
    //  this.setState({ minerTimerID });
  }

  componentWillUnmount() {
    //  clearInterval(this.state.minerTimerID);
  }

  dig = () => {
    //  this.props.onInterval();
  };

  handleDigClick = () => {
    console.log("NO ENERGY AT MINE", this.props.noEnergy);
    if (this.props.noEnergy) {
      this.props.spendEnergy(false);
      return;
    }

    this.setState({
      renderReward: true,
      minedAmount: this.state.minedAmount + this.state.basicMining
    });

    this.props.onClick(this.state.basicMining, this.props.mineType);
    this.props.gainExperience(100);
    this.props.spendEnergy(true);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ basicMining: nextProps.miningPower });
  }

  hideReward = () => {
    setTimeout(this.setState({ renderReward: false }), 100);
  };

  displayRewards = amountFound => {
    let rewardsToRender = [];

    // All Algoritms of Calculating Rewards Go Here
    // The Animations goTo rewardFound.jsx

    let rewards = [];

    if (amountFound > 5 && amountFound < 10) {
      let rewardsToSpread = amountFound;
      let calcFirstReward = Math.floor(Math.random() * 5) + 1;
      let firstReward = rewardsToSpread - calcFirstReward;
      rewardsToSpread -= firstReward;
      rewards[0] = firstReward;
      rewards[1] = rewardsToSpread;
    } else if (amountFound >= 10) {
      let rewardsToSpread = amountFound;

      let spreadInto = Math.ceil(amountFound / 10 + 1);

      let calculatedReward = 0;
      const lastRewardIndex = spreadInto - 1;

      for (let i = 0; i < spreadInto; i += 1) {
        if (i == lastRewardIndex) {
          rewards[i] = rewardsToSpread;
        } else {
          calculatedReward =
            Math.floor(Math.random() * (amountFound / spreadInto)) + 1;

          rewards[i] = calculatedReward;
          rewardsToSpread -= calculatedReward;
        }
      }
    } else {
      rewards[0] = amountFound;
    }

    for (let i = 0; i < rewards.length; i += 1) {
      rewardsToRender.push(
        <RewardFound
          key={i}
          rewardAmount={rewards[i]}
          rewardRendered={this.hideReward}
          rewardType={this.state.mineType}
        />
      );
    }

    return rewardsToRender;
  };

  render() {
    return (
      <div id={this.state.mineType ? this.state.mineType + "-mine" : "mine"}>
        <h3>
          You Mined : {this.state.minedAmount}{" "}
          {this.state.mineType.toUpperCase()}
        </h3>
        <button onClick={() => this.handleDigClick()}>
          Dig {this.state.mineType}!
        </button>

        <div>
          {this.state.renderReward
            ? this.displayRewards(this.state.basicMining)
            : null}
        </div>
      </div>
    );
  }
}

export default Mine;
