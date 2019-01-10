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
    this.setState({
      renderReward: true,
      minedAmount: this.state.minedAmount + this.state.basicMining
    });

    this.props.onClick(this.state.basicMining, this.props.mineType);

    // Calculate Experience ??
    this.props.gainExperience(1);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ basicMining: nextProps.miningPower });
  }

  hideReward = () => {
    setTimeout(this.setState({ renderReward: false }), 100);
  };

  displayRewards = amountFound => {
    let rewardsToRender = [];

    for (let i = 0; i < amountFound; i += 1) {
      rewardsToRender.push(
        <RewardFound
          key={i}
          rewardAmount={this.state.basicMining}
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
          {this.state.renderReward ? (
            this.displayRewards(this.state.basicMining)
          ) : null}
        </div>
      </div>
    );
  }
}

export default Mine;
