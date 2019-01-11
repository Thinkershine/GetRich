import React, { Component } from "react";
import Mine from "./mine";
import Message from "../common/message";

class Mining extends Component {
  state = {
    isGoldMining: false,
    isSilverMining: false,
    isCopperMining: false,
    copperMiningRequirements: { miningSkill: 1, miningPower: 1 },
    silverMiningRequirements: { miningSkill: 5, miningPower: 5 },
    goldMiningRequirements: { miningSkill: 10, miningPower: 10 },

    message: {
      title: "You Aren't Skilled Enough!",
      message: "You don't Have Enough Skills to Mine GOLD!",
      badge: "danger",
      buttonMessage: "ok..",
      buttonOnClick: this.hideMessage
    },
    displayMessage: false
  };

  constructor(props) {
    super(props);

    this.state.miningPower = this.props.miningPower;
    this.state.miningSkill = this.props.miningSkill;
  }

  goMining = miningType => {
    const {
      miningPower,
      miningSkill,
      copperMiningRequirements,
      silverMiningRequirements,
      goldMiningRequirements
    } = this.state;

    switch (miningType) {
      case "gold":
        if (
          miningPower >= goldMiningRequirements.miningPower &&
          miningSkill >= goldMiningRequirements.miningSkill
        ) {
          this.setState({ isGoldMining: true });
        } else {
          this.displayMessage({
            title: "You Aren't Skilled Enough!",
            message: "You don't Have Enough Skills to Mine GOLD!",
            badge: "danger",
            buttonMessage: "ok..",
            buttonOnClick: this.hideMessage
          });
        }
        break;
      case "silver":
        if (
          miningPower >= silverMiningRequirements.miningPower &&
          miningSkill >= silverMiningRequirements.miningSkill
        ) {
          this.setState({ isSilverMining: true });
        } else {
          this.displayMessage({
            title: "You Aren't Skilled Enough!",
            message: "You don't Have Enough Skills to Mine SILVER!",
            badge: "danger",
            buttonMessage: "ok..",
            buttonOnClick: this.hideMessage
          });
        }

        break;
      case "copper":
        if (
          miningPower >= copperMiningRequirements.miningPower &&
          miningSkill >= copperMiningRequirements.miningSkill
        ) {
          this.setState({ isCopperMining: true });
        } else {
          this.displayMessage({
            title: "You Aren't Skilled Enough!",
            message: "You don't Have Enough Skills to Mine COPPER!",
            badge: "danger",
            buttonMessage: "ok..",
            buttonOnClick: this.hideMessage
          });
        }
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

  displayMessage = message => {
    this.setState({ message, displayMessage: true });
  };
  hideMessage = () => {
    this.setState({ displayMessage: false });
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

        <div className="messenger">
          {this.state.displayMessage && (
            <Message
              messageTitle={this.state.message.title}
              message={this.state.message.message}
              badge={this.state.message.badge}
              buttonMessage={this.state.message.buttonMessage}
              buttonOnClick={this.state.message.buttonOnClick}
              isHidden={this.state.message.isHidden}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Mining;
