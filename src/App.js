import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import { getItems } from "./services/fakeItemService.js";
import {
  getLevels,
  getExperienceForLevel
} from "./services/fakeExperienceService.js";
import MyWorkers from "./models/workers";
import MyResources from "./models/myResources.js";
import DropdownNavigation from "./components/dropdownNavigation";
import Stats from "./components/stats";
import Home from "./components/locations/home";
import Store from "./components/locations/store";
import Mining from "./components/locations/mining";
import Market from "./components/locations/market";
import Bank from "./components/locations/bank";
import Resources from "./components/resources";
import Equipment from "./components/equipment";
import Workers from "./components/workers";
import Message from "./components/common/message";
import NotFound from "./components/common/notFound";
import ExperienceHandler from "./components/helpers/experienceHandler";

class App extends Component {
  state = {
    navigationHeight: 0,
    isEquipped: false,
    itemsForSale: getItems(),
    currentEquipment: {},
    miningEquipment: [],
    miningRequirements: {
      copperMining: { miningSkill: 0, miningPower: 1 },
      silverMining: { miningSkill: 5, miningPower: 5 },
      goldMining: { miningSkill: 10, miningPower: 10 }
    },
    resources: new MyResources(this.handleButtonMessage.bind(this)),
    workers: new MyWorkers(
      this.handleButtonMessage.bind(this),
      this.workerLeveledUp.bind(this),
      this.workerIsResting.bind(this),
      this.workerIsWorking.bind(this)
    ),

    experienceHandler: new ExperienceHandler(),
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
    handleMessenger: this.handleButtonMessage.bind(this),
    energyGainingIntervalID: null,
    minersWorkingIntervalID: null,
    workersWorkTimer: 1000,
    goMining: null
  };

  componentDidMount() {
    this.state.workers.injectMiningRequirements(this.state.miningRequirements);

    const { workers } = this.state;

    this.energyGainingIntervalID = setInterval(
      this.gainEnergy,
      this.state.energyGainTimer
    );

    this.minersWorkingIntervalID = setInterval(
      this.workersDoWork,
      this.state.workersWorkTimer
    );

    this.setMainContentMarginTop();

    this.setState({
      energyGainingIntervalID: this.energyGainingIntervalID,
      minersWorkingIntervalID: this.minersWorkingIntervalID,
      goldWorkers: workers.getGoldWorkersCount(),
      goldProduction: workers.getGoldWorkersTotalStrength(),
      nextMiningLevelExperience: getExperienceForLevel(
        this.state.miningSkill + 1
      )
    });
  }

  setMainContentMarginTop() {
    let navigationHeight = document.getElementById("top-bar").clientHeight;
    console.log("NAV HEIGHT", navigationHeight);
    this.setState({
      navigationHeight: navigationHeight + 15
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.energyGainingIntervalID);
    clearInterval(this.state.minersWorkingIntervalID);
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

  handleExperienceGain = expAmount => {
    let experience = {
      miningSkill: this.state.miningSkill,
      miningSkillExperience: this.state.miningSkillExperience,
      miningSkillCurrentPercentage: this.state.miningSkillCurrentPercentage,
      currentMiningSkillExperience: this.state.currentMiningSkillExperience,
      nextMiningSkillExperience: this.state.nextMiningLevelExperience,
      miningPower: this.state.miningPowerLevel
    };

    experience = this.state.experienceHandler.handleExperienceGain(
      expAmount,
      experience
    );

    if (this.state.miningSkill !== experience.miningSkill) {
      this.gratulations();
    }

    this.setState({
      miningSkillExperience: experience.miningSkillExperience,
      currentMiningSkillExperience: experience.currentMiningSkillExperience,
      miningSkill: experience.miningSkill,
      miningPowerLevel: experience.miningPower,
      nextMiningLevelExperience: experience.nextMiningSkillExperience,
      miningSkillCurrentPercentage: experience.miningSkillCurrentPercentage
    });
  };

  gratulations() {
    console.log("GRATULATIONS");
  }

  handleButtonMessage(messageForButton) {
    this.setState({
      message: messageForButton,
      displayMessage: !this.state.displayMessage
    });
  }

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

  makeWorkerWork = (worker, mineType) => {
    // todo Check if Miner is Able to Mine This ...
    // block buttons if he's not able to mine ??

    let startedWorking = this.state.workers.makeWorkerWork(worker, mineType);

    if (startedWorking) {
      // UPDATE resource production
      this.state.resources.workerStartWorking(worker, mineType);
    }
  };

  workerLeveledUp(worker) {
    this.state.resources.updateResourceProductionOnLevelUp(worker, true);
  }

  workerIsResting(worker) {
    this.state.resources.updateResourceProductionOnResting(worker);
  }

  workerIsWorking(worker) {
    this.state.resources.updateResourceProductionOnGetBackToWork(worker);
  }

  workersDoWork = () => {
    this.state.resources.workersWork();

    this.state.workers.giveExperienceToWorkingWorkers();
    this.state.workers.handleWorkerEnergy();

    // fire or hire workers if no resources
  };

  hireNewWorker = worker => {
    if (!this.canAffordWorker(worker)) return;

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

  goMining = mineType => {
    console.log("APP js Go Mining", mineType);
    this.setState({ goMining: mineType });
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
        <header id="top-bar">
          <DropdownNavigation goMining={this.goMining} />
        </header>
        <main
          id="main"
          className="container"
          style={{ marginTop: this.state.navigationHeight }}
        >
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
                  goMining={this.state.goMining}
                  stopMining={this.stopMining}
                  miningPower={miningPower}
                  miningSkill={this.state.miningSkill}
                  resources={this.state.resources}
                  handleMining={this.handleMining}
                  spendEnergy={this.spendEnergy}
                  noEnergy={this.state.noEnergy}
                  gainExperience={this.handleExperienceGain}
                  messenger={this.state.handleMessenger}
                  miningRequirements={this.state.miningRequirements}
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
                  work={this.makeWorkerWork}
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
