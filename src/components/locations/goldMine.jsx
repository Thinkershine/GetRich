import React, { Component } from "react";
import RewardFound from "../common/rewardFound";

class GoldMine extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.goldMined = 0;
    this.state.basicMining = this.props.miningPower;
    this.state.basicMinerID = 0;

    this.state.renderReward = false;
  }

  componentDidMount() {
    const basicMinerID = setInterval(this.discoverGold, 1000);
    this.setState({ basicMinerID });
  }

  componentWillUnmount() {
    clearInterval(this.state.basicMinerID);
  }

  discoverGold = () => {
    this.props.onInterval();
  };

  digGold = () => {
    this.setState({
      renderReward: true,
      goldMined: this.state.goldMined + this.state.basicMining
    });
    this.props.onClick(this.state.basicMining);
  };

  hideReward = () => {
    setTimeout(this.setState({ renderReward: false }), 100);
  };

  displayRewards = goldFoundAmount => {
    let rewardsToRender = [];

    for (let i = 0; i < goldFoundAmount; i += 1) {
      rewardsToRender.push(
        <RewardFound
          key={i}
          rewardAmount={this.state.basicMining}
          rewardRendered={this.hideReward}
        />
      );
    }

    return rewardsToRender;
  };

  render() {
    return (
      <div id="gold-mine">
        <h3>You Mined : {this.state.goldMined} GOLD</h3>
        <button onClick={() => this.digGold()}>DIG IT!</button>

        <div>
          {this.state.renderReward
            ? this.displayRewards(this.state.basicMining)
            : null}
        </div>
        {/* <RewardFound rewardAmount={this.state.basicMining} /> */}
      </div>
    );
  }
}

export default GoldMine;
