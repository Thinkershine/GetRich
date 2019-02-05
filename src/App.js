import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import { getItems } from "./services/fakeItemService.js";
import {
  getLevels,
  getExperienceForLevel,
  getExperienceDifferenceForLvl
} from "./services/fakeExperienceService.js";
import MyWorkers from "./models/workers";
import MyResources from "./models/myResources.js";
import Stats from "./components/stats";
import Home from "./components/locations/home";
import Store from "./components/locations/store";
import Mining from "./components/locations/mining";
import Market from "./components/locations/market";
import Bank from "./components/locations/bank";
import Navigation from "./components/navigation";
import Resources from "./components/resources";
import Equipment from "./components/equipment";
import Workers from "./components/workers";
import Message from "./components/common/message";

import NotFound from "./components/common/notFound";

class App extends Component {
  state = {
    isEquipped: false,
    itemsForSale: getItems(),
    currentEquipment: {},
    miningEquipment: [],
    resources: new MyResources(this.handleButtonMessage.bind(this)),
    workers: new MyWorkers(),

    experienceForLevels: getLevels(),
    miningSkill: 0,
    miningSkillExperience: 0,
    miningPowerLevel: 1,

    lvlExperienceDifference: 15,
    miningSkillCurrentPercentage: 0,
    currentMiningSkillExperience: 0,
    nextMiningLevelExperience: 0,

    energyLevel: 1,
    energyPoints: 100,
    currentEnergyPoints: 100,
    maximumEnergyPoints: 100,
    currentRequiredEnergy: 0,
    noEnergy: false,

    energyDrain: 1,
    energyGain: 1,
    energyGainTimer: 1000,

    message: {
      title: "Welcome!",
      message: "Hello :)",
      badge: "success", // primary secondary warning danger success info
      buttonMessage: "Hi!",
      buttonOnClick: this.handleButtonMessage.bind(this)
    },
    displayMessage: false,
    handleMessenger: this.handleButtonMessage.bind(this)
  };

  handleExperienceGain = expAmount => {
    let miningSkillExp = this.state.miningSkillExperience;
    miningSkillExp += expAmount;

    let currentMiningSkillExp = this.state.currentMiningSkillExperience;
    currentMiningSkillExp += expAmount;

    this.setState(
      {
        miningSkillExperience: miningSkillExp,
        currentMiningSkillExperience: currentMiningSkillExp
      },
      this.handleGainedExperience
    );
  };

  handleGainedExperience() {
    this.calculateLevelUp();
    this.calculateCurrentLevelExperiencePercentage();
  }

  calculateCurrentLevelExperiencePercentage() {
    let currentPercentage =
      (this.state.currentMiningSkillExperience /
        this.state.lvlExperienceDifference) *
      100;
    //console.log("CURRENT PERCENTAGE", currentPercentage);

    if (currentPercentage >= 100) {
      currentPercentage = 0;
    }

    this.setState({ miningSkillCurrentPercentage: currentPercentage });
  }

  calculateLevelUp() {
    if (
      this.state.miningSkillExperience >= this.state.nextMiningLevelExperience
    ) {
      this.setState(
        {
          miningSkill: this.state.miningSkill + 1,
          miningPowerLevel: this.state.miningPowerLevel + 1,
          currentMiningSkillExperience: 0
        },
        this.calculateNextLevelExperience
      );
      //console.log("LEVEL UP");

      // BOOM GRATS YOU'VE LEVELED UP !!
    }
  }

  calculateNextLevelExperience() {
    let nextlevelExperience = getExperienceForLevel(this.state.miningSkill + 1);

    this.setState(
      {
        nextMiningLevelExperience: nextlevelExperience
      },
      this.calculateExperienceDifference
    );
  }

  calculateExperienceDifference() {
    let lvlExperienceDifference = getExperienceDifferenceForLvl(
      this.state.miningSkill
    );
    //console.log("LV EXP DIF", lvlExperienceDifference);

    this.setState({ lvlExperienceDifference }, this.gratulations);
  }

  gratulations() {
    console.log("GRATULATIONS");
  }

  handleButtonMessage(messageForButton) {
    this.setState({
      message: messageForButton,
      displayMessage: !this.state.displayMessage
    });
  }

  componentDidMount() {
    const { workers } = this.state;

    this.energyGainingIntervalID = setInterval(
      this.gainEnergy,
      this.state.energyGainTimer
    );

    this.setState({
      energyGainingIntervalID: this.energyGainingIntervalID,
      goldWorkers: workers.getGoldWorkersCount(),
      goldProduction: workers.getGoldWorkersTotalStrength(),
      nextMiningLevelExperience: getExperienceForLevel(
        this.state.miningSkill + 1
      )
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.energyGainingIntervalID);
  }

  componentDidUpdate() {
    const { workers } = this.state;
    if (workers.workersAmountChanged) {
      workers.workersAmountChanged = false;

      this.setState({
        goldWorkers: workers.getGoldWorkersCount(),
        goldProduction: workers.getGoldWorkersTotalStrength()
      });
    }
  }

  handleWorkers = () => {
    // suboptimal to check everysecond how many workers are there ??
    // isn't this better to hold the value somewhere and update it ?
    // when necessary? Event Handling//
    // >> You've Got New Worker!

    this.setState({
      goldAmount:
        this.state.resource.goldAmount + this.state.resource.goldProduction
    });
  };

  handleMining = (dugAmount, mineType) => {
    this.state.resources.addResource(dugAmount, mineType);
  };

  displayMessage = message => {
    this.setState({ message, displayMessage: true });
  };

  handleSellResource = (resourceType, amount, todayMarketPrice) => {
    this.state.resources.sellResource(resourceType, amount, todayMarketPrice);
  };

  handlePurchase = item => {
    if (item.value > this.state.resources.dollarAmount) {
      this.displayMessage({
        title: "You are POOR!",
        message: "You can't even afford your most basic tools.",
        badge: "danger",
        buttonMessage: "ok..",
        buttonOnClick: this.handleButtonMessage.bind(this),
        isHidden: true
      });
      return;
    }

    this.state.resources.spendResourceAmount("dollar", item);
    const itemsOwned = this.state.miningEquipment;
    itemsOwned.push(item);

    this.setState({
      miningEquipment: itemsOwned,
      isEquipped: true,
      currentEquipment: item
    });
  };

  hireNewWorker = worker => {
    console.log("NEW WORKER HIRED", worker);
    if (!this.canAffordWorker(worker)) return;

    // todo
    // if you run out of money the worker will be fired
    // if you already hired this worker you can't hire him again
    // if you hire more than MAX_WORKERS then you can't hire new worker
    // WHAT ABOUT TELLING WORKERS "YOU ARE FIRED!"
    this.state.workers.hireWorker(worker);
  };

  canAffordWorker(worker) {
    if (this.state.resources.getResourceAmount("dollar") < worker.hourlyCost) {
      this.displayMessage({
        title: "You are POOR!",
        message: "You can't even hire " + worker.name + "!",
        badge: "danger",
        buttonMessage: "ok..",
        buttonOnClick: this.handleButtonMessage.bind(this),
        isHidden: true
      });

      return false;
    } else {
      this.displayMessage({
        title: "GREAT! ",
        message: "You hired " + worker.name + "!",
        badge: "success",
        buttonMessage: "YES!",
        buttonOnClick: this.handleButtonMessage.bind(this),
        isHidden: true
      });
      return true;
    }
  }

  spendEnergy = energySpent => {
    const {
      isEquipped,
      currentEquipment,
      energyDrain,
      energyPoints
    } = this.state;

    if (energySpent) {
      let energyToSubstract = isEquipped
        ? currentEquipment.energyConsumption + energyDrain
        : energyDrain;

      let newEnergyPoints = energyPoints;
      if (energyPoints - energyToSubstract <= 0) {
        newEnergyPoints = 0;
      } else {
        newEnergyPoints -= energyToSubstract;
      }

      this.setState(
        {
          energyPoints: newEnergyPoints,
          currentEnergyPoints: newEnergyPoints
        },
        this.controlEnergy
      );
    } else {
      this.displayMessage({
        title: "You are TIRED!",
        message: "You don't Have Enough Energy.",
        badge: "warning",
        buttonMessage: "ok..",
        buttonOnClick: this.handleButtonMessage.bind(this)
      });
    }
  };

  controlEnergy() {
    // Disable Using Energy
    let requiredEnergy = 0;
    if (this.state.isEquipped) {
      requiredEnergy = this.state.currentEquipment.energyConsumption;
    }

    requiredEnergy += this.state.energyDrain;

    if (this.state.energyPoints < requiredEnergy) {
      this.setState({ noEnergy: true });
    }

    this.setState({ currentRequiredEnergy: requiredEnergy });
  }

  gainEnergy = () => {
    let noEnergy = this.state.energyPoints < this.state.currentRequiredEnergy;

    let currentEnergy = this.state.energyPoints;
    if (currentEnergy + 1 > this.state.maximumEnergyPoints) {
      currentEnergy = this.state.maximumEnergyPoints;
    } else {
      currentEnergy += this.state.energyGain;
    }

    this.setState({
      noEnergy: noEnergy,
      energyPoints: currentEnergy,
      currentEnergyPoints: currentEnergy
    });
  };

  render() {
    const { currentEquipment } = this.state;
    const miningPower = this.state.isEquipped
      ? 1 + currentEquipment.miningPower + this.state.miningSkill
      : 1 + this.state.miningSkill;

    const stats = {
      miningPower: miningPower,
      miningPowerLevel: this.state.miningPowerLevel,
      maximumMiningPowerLevel: 100,
      miningSkill: this.state.miningSkill,
      miningSkillCurrentPercentage: this.state.miningSkillCurrentPercentage,
      miningSkillExperience: this.state.miningSkillExperience,
      nextMiningLevelExperience: this.state.nextMiningLevelExperience,
      energyLevel: this.state.energyLevel,
      energyPoints: this.state.energyPoints,
      currentEnergyPoints: this.state.currentEnergyPoints,
      maximumEnergyPoints: this.state.maximumEnergyPoints
    };

    const currentResources = {
      currentGoldAmount: this.state.resources.getResourceAmount("gold"),
      currentSilverAmount: this.state.resources.getResourceAmount("silver"),
      currentCopperAmount: this.state.resources.getResourceAmount("copper")
    };

    return (
      <div className="App">
        <main className="container">
          <header>
            <h1>Time to Get RICH</h1>
            <Navigation />
          </header>
          <Resources resources={this.state.resources} />
          <Stats {...stats} />
          <Switch>
            <Route
              path="/store"
              render={props => (
                <Store
                  itemsForSale={this.state.itemsForSale}
                  handlePurchase={this.handlePurchase}
                  {...props}
                />
              )}
            />
            <Route
              path="/mining"
              render={props => (
                <Mining
                  goMining={this.goMining}
                  stopMining={this.stopMining}
                  miningPower={miningPower}
                  miningSkill={this.state.miningSkill}
                  resources={this.state.resources}
                  handleMining={this.handleMining}
                  spendEnergy={this.spendEnergy}
                  noEnergy={this.state.noEnergy}
                  gainExperience={this.handleExperienceGain}
                  messenger={this.state.handleMessenger}
                  {...props}
                />
              )}
            />
            <Route
              path="/equipment"
              render={props => (
                <Equipment
                  isEquipped={this.state.isEquipped}
                  currentEquipment={this.state.currentEquipment}
                  miningEquipment={this.state.miningEquipment}
                  {...props}
                />
              )}
            />
            <Route
              path="/workers"
              render={props => (
                <Workers
                  playerWorkers={this.state.workers.getPlayerWorkers()}
                  hireWorker={this.hireNewWorker}
                  {...props}
                />
              )}
            />
            <Route
              path="/market"
              render={props => (
                <Market
                  sellResource={this.handleSellResource}
                  availableResources={currentResources}
                  {...props}
                />
              )}
            />
            <Route path="/bank" component={Bank} />

            <Route path="/" exact component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>

        <div id="tools">
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

export default App;
