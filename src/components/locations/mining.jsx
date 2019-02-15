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
    this.state.copperMiningRequirements = this.props.miningRequirements.copperMining;
    this.state.silverMiningRequirements = this.props.miningRequirements.silverMining;
    this.state.goldMiningRequirements = this.props.miningRequirements.goldMining;
    this.state.goMining = this.props.goMining;
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.goMining !== nextProps.goMining) {
      console.log("WILL CHECK MINING");
      this.stopMining();
      this.checkMining(nextProps.goMining);
      this.setState({ goMining: nextProps.goMining });
    }

    this.setState({
      miningPower: nextProps.miningPower
    });
  }

  checkMining = miningType => {
    console.log("CHECK MINING", miningType);
    switch (miningType) {
      case "gold":
        this.goMining("gold");
        this.props.history.push("/mining/gold");
        break;
      case "silver":
        this.goMining("silver");
        this.props.history.push("/mining/silver");
        break;
      case "copper":
        this.goMining("copper");
        this.props.history.push("/mining/copper");
        break;
      default:
        break;
    }
  };

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
          this.setState({
            isGoldMining: true,
            isSilverMining: false,
            isCopperMining: false,
            isMining: true
          });
        } else {
          this.props.messenger({
            title: "You Aren't Skilled Enough!",
            message: "You don't Have Enough Skills to Mine GOLD!",
            badge: "danger",
            buttonMessage: "ok..",
            buttonOnClick: this.props.messenger
          });
          this.stopMining();
        }
        break;
      case "silver":
        if (
          miningPower >= silverMiningRequirements.miningPower &&
          miningSkill >= silverMiningRequirements.miningSkill
        ) {
          this.setState({
            isSilverMining: true,
            isGoldMining: false,
            isCopperMining: false,
            isMining: true
          });
        } else {
          this.props.messenger({
            title: "You Aren't Skilled Enough!",
            message: "You don't Have Enough Skills to Mine SILVER!",
            badge: "danger",
            buttonMessage: "ok..",
            buttonOnClick: this.props.messenger
          });
          this.stopMining();
        }

        break;
      case "copper":
        if (
          miningPower >= copperMiningRequirements.miningPower &&
          miningSkill >= copperMiningRequirements.miningSkill
        ) {
          this.setState({
            isCopperMining: true,
            isSilverMining: false,
            isGoldMining: false,
            isMining: true
          });
        } else {
          this.props.messenger({
            title: "You Aren't Skilled Enough!",
            message: "You don't Have Enough Skills to Mine COPPER!",
            badge: "danger",
            buttonMessage: "ok..",
            buttonOnClick: this.props.messenger
          });
          this.stopMining();
        }
        break;
      default:
        break;
    }
  };
  stopMining = () => {
    this.setState({
      isGoldMining: false,
      isSilverMining: false,
      isCopperMining: false,
      isMining: false
    });
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
              this.props.history.push("/mining/gold");
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
              this.props.history.push("/mining/silver");
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
              this.props.history.push("/mining/copper");
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
                  location={props.location}
                  isMining={this.state.isSilverMining}
                  miningPower={this.state.miningPower}
                  mineType="silver"
                  goldMined={this.props.resources.getResourceAmount("silver")}
                  onClick={this.props.handleMining}
                  spendEnergy={this.props.spendEnergy}
                  noEnergy={this.props.noEnergy}
                  gainExperience={this.props.gainExperience}
                  experience={2}
                  goMining={this.checkMining}
                  {...props}
                />
              )}
            />
            <Route
              path="/mining/gold"
              exact
              render={props => (
                <Mine
                  location={props.location}
                  isMining={this.state.isGoldMining}
                  miningPower={this.state.miningPower}
                  mineType="gold"
                  goldMined={this.props.resources.getResourceAmount("gold")}
                  onClick={this.props.handleMining}
                  spendEnergy={this.props.spendEnergy}
                  noEnergy={this.props.noEnergy}
                  gainExperience={this.props.gainExperience}
                  experience={3}
                  goMining={this.checkMining}
                  {...props}
                />
              )}
            />
            <Route
              path="/mining/copper"
              exact
              render={props => (
                <Mine
                  location={props.location}
                  isMining={this.state.isCopperMining}
                  miningPower={this.state.miningPower}
                  mineType="copper"
                  goldMined={this.props.resources.getResourceAmount("copper")}
                  onClick={this.props.handleMining}
                  spendEnergy={this.props.spendEnergy}
                  noEnergy={this.props.noEnergy}
                  gainExperience={this.props.gainExperience}
                  experience={1}
                  goMining={this.checkMining}
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
