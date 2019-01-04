import React, { Component } from "react";
import RewardFound from "./common/rewardFound";

class GoldMiner extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.goldAmount = 0;
    this.state.basicMining = 5;
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
    this.setState({ renderReward: true });
    this.props.onClick(this.state.basicMining);
  };

  hideReward = () => {
    console.log("Hide Reward");
    setTimeout(this.setState({ renderReward: false }), 100);
    // this.setState({ renderReward: false });
  };

  render() {
    return (
      <div id="GoldMiner">
        <h3>You Mined : {this.state.goldAmount} GOLD</h3>
        <button onClick={() => this.digGold()}>DIG IT!</button>

        <div>
          {this.state.renderReward ? (
            <RewardFound
              rewardAmount={this.state.basicMining}
              rewardRendered={this.hideReward}
            />
          ) : null}
        </div>
        {/* <RewardFound rewardAmount={this.state.basicMining} /> */}
      </div>
    );
  }
}

export default GoldMiner;
