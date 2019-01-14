import React, { Component } from "react";
import Mine from "./mine";
import Message from "../common/message";
import { Switch, Route, Link } from "react-router-dom";

class Mining extends Component {
  state = {
    isGoldMining: false,
    isSilverMining: false,
    isCopperMining: false,
    copperMiningRequirements: { miningSkill: 0, miningPower: 1 },
    silverMiningRequirements: { miningSkill: 5, miningPower: 5 },
    goldMiningRequirements: { miningSkill: 10, miningPower: 10 },

    isMining: false,
    message: {}
  };

  constructor(props) {
    super(props);

    this.state.miningPower = this.props.miningPower;
    this.state.miningSkill = this.props.miningSkill;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ miningPower: nextProps.miningPower });
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
          this.setState({ isGoldMining: true, isMining: true });
        } else {
          this.props.messenger({
            title: "You Aren't Skilled Enough!",
            message: "You don't Have Enough Skills to Mine GOLD!",
            badge: "danger",
            buttonMessage: "ok..",
            buttonOnClick: this.props.messenger
          });
        }
        break;
      case "silver":
        if (
          miningPower >= silverMiningRequirements.miningPower &&
          miningSkill >= silverMiningRequirements.miningSkill
        ) {
          this.setState({ isSilverMining: true, isMining: true });
        } else {
          this.props.messenger({
            title: "You Aren't Skilled Enough!",
            message: "You don't Have Enough Skills to Mine SILVER!",
            badge: "danger",
            buttonMessage: "ok..",
            buttonOnClick: this.props.messenger
          });
        }

        break;
      case "copper":
        if (
          miningPower >= copperMiningRequirements.miningPower &&
          miningSkill >= copperMiningRequirements.miningSkill
        ) {
          this.setState({ isCopperMining: true, isMining: true });
        } else {
          this.props.messenger({
            title: "You Aren't Skilled Enough!",
            message: "You don't Have Enough Skills to Mine COPPER!",
            badge: "danger",
            buttonMessage: "ok..",
            buttonOnClick: this.props.messenger
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

  render() {
    return (
      <div id="mining">
        <h2>Go Mining</h2>
        <div>
          <h3>Mining Navigation</h3>
          <Link
            className="btn btn-secondary"
            to="/mining/gold"
            onClick={() => {
              this.goMining("gold");
            }}
          >
            Mine Gold
          </Link>
          <span>.</span>
          <Link
            className="btn btn-secondary"
            to="/mining/silver"
            onClick={() => {
              this.goMining("silver");
            }}
          >
            Mine Silver
          </Link>
          <span>.</span>
          <Link
            className="btn btn-secondary"
            to="/mining/copper"
            onClick={() => {
              this.goMining("copper");
            }}
          >
            Mine Copper
          </Link>
          <hr />
          <span>.</span>

          {this.state.isMining && (
            <button
              onClick={() => {
                this.setState({ isMining: false });
                this.props.history.push("/mining");
              }}
              className="btn btn-secondary"
            >
              STOP Mining
            </button>
          )}

          <span>.</span>
        </div>
        <div>
          <Switch>
            <Route
              path="/mining/silver"
              exact
              render={props => (
                <Mine
                  miningPower={this.state.miningPower}
                  mineType="silver"
                  goldMined={this.props.resources.getResourceAmount("silver")}
                  //    onInterval={this.handleWorkers}
                  onClick={this.props.handleMining}
                  spendEnergy={this.props.spendEnergy}
                  noEnergy={this.props.noEnergy}
                  gainExperience={this.props.gainExperience}
                  {...props}
                />
              )}
            />
            <Route
              path="/mining/gold"
              exact
              render={props => (
                <Mine
                  miningPower={this.state.miningPower}
                  mineType="gold"
                  goldMined={this.props.resources.getResourceAmount("gold")}
                  // onInterval={this.handleWorkers}
                  onClick={this.props.handleMining}
                  spendEnergy={this.props.spendEnergy}
                  noEnergy={this.props.noEnergy}
                  gainExperience={this.props.gainExperience}
                  {...props}
                />
              )}
            />
            <Route
              path="/mining/copper"
              exact
              render={props => (
                <Mine
                  isMining={this.state.isCopperMining}
                  miningPower={this.state.miningPower}
                  mineType="copper"
                  goldMined={this.props.resources.getResourceAmount("copper")}
                  //   onInterval={this.handleWorkers}
                  onClick={this.props.handleMining}
                  spendEnergy={this.props.spendEnergy}
                  noEnergy={this.props.noEnergy}
                  gainExperience={this.props.gainExperience}
                  {...props}
                />
              )}
            />
          </Switch>
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
