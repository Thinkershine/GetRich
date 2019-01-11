import React, { Component } from "react";
import Mine from "./mine";

class Mining extends Component {
  state = { isGoldMining: false, isSilverMining: false, isCopperMining: false };

  constructor(props) {
    super(props);
    this.state.isCopperMining = this.props.isCopperMining;
    this.state.isSilverMining = this.props.isSilverMining;
    this.state.isGoldMining = this.props.isGoldMining;
    this.state.miningPower = this.props.miningPower;
  }

  goMining = miningType => {
    switch (miningType) {
      case "gold":
        this.setState({ isGoldMining: true });
        break;
      case "silver":
        this.setState({ isSilverMining: true });
        break;
      case "copper":
        this.setState({ isCopperMining: true });
        break;
    }
  };
  stopMining = miningType => {
    switch (miningType) {
      case "gold":
        this.setState({ isGoldMining: false });
        break;
      case "silver":
        this.setState({ isSilverMining: false });
        break;
      case "copper":
        this.setState({ isCopperMining: false });
        break;
    }
  };

  render() {
    return (
      <div id="mining">
        <h2>Go Mining</h2>
        <div>
          <h3>Mining Navigation</h3>
          <button onClick={() => this.goMining("gold")} className="btn">
            Go GOLD Mining
          </button>
          <span>.</span>
          <button onClick={() => this.goMining("silver")} className="btn">
            Go SILVER Mining
          </button>
          <span>.</span>
          <button onClick={() => this.goMining("copper")} className="btn">
            Go COPPER Mining
          </button>
          <hr />
          <button onClick={() => this.stopMining("gold")} className="btn">
            STOP GOLD Mining
          </button>
          <span>.</span>
          <button onClick={() => this.stopMining("silver")} className="btn">
            STOP SILVER Mining
          </button>
          <span>.</span>
          <button onClick={() => this.stopMining("copper")} className="btn">
            STOP COPPER Mining
          </button>
        </div>
        <div>
          <h3>Mine</h3>
          {this.state.isSilverMining && (
            <Mine
              miningPower={this.state.miningPower}
              mineType="silver"
              goldMined={this.props.resources.getResourceAmount("silver")}
              //    onInterval={this.handleWorkers}
              onClick={this.props.handleMining}
              spendEnergy={this.props.spendEnergy}
              noEnergy={this.props.noEnergy}
              gainExperience={this.props.gainExperience}
            />
          )}

          {this.state.isGoldMining && (
            <Mine
              miningPower={this.state.miningPower}
              mineType="gold"
              goldMined={this.props.resources.getResourceAmount("gold")}
              // onInterval={this.handleWorkers}
              onClick={this.props.handleMining}
              spendEnergy={this.props.spendEnergy}
              noEnergy={this.props.noEnergy}
              gainExperience={this.props.gainExperience}
            />
          )}

          {this.state.isCopperMining && (
            <Mine
              miningPower={this.state.miningPower}
              mineType="copper"
              goldMined={this.props.resources.getResourceAmount("copper")}
              //   onInterval={this.handleWorkers}
              onClick={this.props.handleMining}
              spendEnergy={this.props.spendEnergy}
              noEnergy={this.props.noEnergy}
              gainExperience={this.props.gainExperience}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Mining;
