import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MyWorkers from "./models/workers";
import MyResources from "./models/myResources.js";
import DropdownNavigation from "./components/dropdownNavigation";
import Stats from "./components/stats";
import Main from "./components/locations/main";
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
import Confetti from "./components/common/confetti";
import Backpack from "./components/backpack";
import Player from "./components/player";
import PlayerData from "./models/playerData";
import Profile from "./components/profile";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/protectedRoute";
import auth from "./services/userService";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";

import * as experienceService from "./services/experienceService";

class App extends Component {
  state = {
    playerData: new PlayerData(this.handleButtonMessage.bind(this)),
    navigationHeight: 0,
    isEquipped: false,
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

    // This Will Be Moved to Player Component
    miningPowerLevel: 1,

    energyLevel: 1,
    energyPoints: 100,
    currentEnergyPoints: 100,
    maximumEnergyPoints: 100,
    // yet to go
    currentRequiredEnergy: 0,
    noEnergy: false,

    energyDrain: 1,
    energyGain: 1,
    energyGainTimer: 5000,

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
    resourceUpdatingIntervalID: null,
    workersWorkTimer: 1000,
    goMining: null,
    showConfetti: false,
    confettiTimeoutInSeconds: 10000,
    gameLoopClockTickTimeMiliseconds: 1000,

    potions: [],
    backpackSize: 5
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

    this.resourceUpdatingIntervalID = setInterval(
      this.handleResources,
      this.state.gameLoopClockTickTimeMiliseconds
    );

    this.setMainContentMarginTop();

    const currentUser = auth.getCurrentUser();
    this.setState({
      currentUser
    });

    if (currentUser !== null) {
      toast("Logged In");
    }

    // get Exp
    const expForNextLevel = experienceService.getRealExperienceForLevel(2);
    console.log("REAL EXPERIENCE FROM API", expForNextLevel);

    this.setState({
      energyGainingIntervalID: this.energyGainingIntervalID,
      minersWorkingIntervalID: this.minersWorkingIntervalID,
      resourceUpdatingIntervalID: this.resourceUpdatingIntervalID,
      goldWorkers: workers.getGoldWorkersCount(),
      goldProduction: workers.getGoldWorkersTotalStrength()
    });
  }

  ComponentWillUpdate() {}

  handleResources = () => {
    this.state.resources.gameLoopUpdate();
  };

  setMainContentMarginTop() {
    let navigationHeight = document.getElementById("top-bar").clientHeight;

    this.setState({
      navigationHeight: navigationHeight + 15
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.energyGainingIntervalID);
    clearInterval(this.state.minersWorkingIntervalID);
    clearInterval(this.state.resourceUpdatingIntervalID);
  }

  componentDidUpdate() {
    let navigationHeight = document.getElementById("top-bar").clientHeight + 15;
    if (navigationHeight !== this.state.navigationHeight) {
      this.setState({ navigationHeight: navigationHeight });
    }

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
    let leveledUP = this.state.playerData.handleExperienceGain(expAmount);

    if (leveledUP) {
      this.gratulations();
    }
  };

  gratulations() {
    setTimeout(this.stopConfetti, this.state.confettiTimeoutInSeconds);
    this.state.resources.addLevelUpReward(this.state.miningSkill + 1);
    this.setState({ showConfetti: true });
  }

  stopConfetti = () => {
    this.setState({ showConfetti: false });
  };

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

  handleItemPurchase = item => {
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

  handlePotionPurchase = potion => {
    console.log("POTION PURCHASED", potion);
    if (potion.value > this.state.resources.dollarAmount) {
      this.displayMessage({
        title: "You Don't Have Enough Money",
        message: "You can't afford " + potion.name,
        badge: "danger",
        buttonMessage: "ok..",
        buttonOnClick: this.handleButtonMessage.bind(this),
        isHidden: true
      });
      return;
    }

    console.log("BACKPACK FILLED", this.state.potions.length);
    if (this.state.potions.length >= this.state.backpackSize) {
      this.displayMessage({
        title: "You Can't Carry More Potions",
        message: "Use some of your own or throw them out!",
        badge: "danger",
        buttonMessage: "ok..",
        buttonOnClick: this.handleButtonMessage.bind(this),
        isHidden: true
      });
      return;
    }

    this.state.resources.spendResourceAmount("dollar", potion);
    this.addPotion(potion);
  };

  addPotion = potion => {
    // check if you can carry more potions ...
    console.log("ADDED POTION", potion);
    // loop through all potions
    let amountIncremented = false;
    const potions = this.state.potions;

    for (let i = 0; i <= potions.length; i += 1) {
      // check their names
      if (potions[i] !== undefined) {
        console.log("NAME", potions[i].id);
        console.log("NEW Potion NAME", potion.id);
        if (potions[i].id === potion.id) {
          // if already exists... add + to amount
          potions[i].amount += 1;
          amountIncremented = true;
          this.setState(potions);
        }
      }
    }

    if (amountIncremented) {
      return;
    }

    potions.push(JSON.parse(JSON.stringify(potion)));
    this.setState(potions);

    console.log("POTIONS", this.state.potions);
  };

  usePotion = potion => {
    console.log("POTION USED", potion);
    // remove potion
    const potions = this.state.potions;
    for (let i = 0; i <= potions.length; i += 1) {
      if (potions[i] !== undefined) {
        if (potions[i].id === potion.id) {
          potions[i].amount -= 1;
          if (potions[i].amount <= 0) {
            potions.splice(i, 1);
          }
        }
      }
    }
    // apply potion
    switch (potion.type) {
      case "energy":
        let currentEnergyPoints =
          this.state.currentEnergyPoints + potion.strength;
        if (currentEnergyPoints >= this.state.maximumEnergyPoints) {
          currentEnergyPoints = this.state.maximumEnergyPoints;
        }

        this.setState({
          energyPoints: currentEnergyPoints,
          currentEnergyPoints: currentEnergyPoints
        });
        break;
      default:
        break;
    }
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
    this.state.playerData.spendEnergy(energySpent);
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

  changedMining = mineType => {
    console.log("Changed Mining to", mineType);
    this.setState({ goMining: mineType });
  };

  render() {
    const { currentEquipment } = this.state;
    const miningPower = this.state.isEquipped
      ? 1 +
        currentEquipment.miningPower +
        this.state.playerData.experience.miningSkill
      : 1 + this.state.playerData.experience.miningSkill;

    const stats = {
      miningPower: miningPower,
      miningPowerLevel: this.state.miningPowerLevel,
      maximumMiningPowerLevel: 100,
      miningSkill: this.state.playerData.experience.miningSkill,
      miningSkillCurrentPercentage: this.state.playerData.experience
        .miningSkillCurrentPercentage,
      miningSkillExperience: this.state.playerData.experience
        .miningSkillExperience,
      nextMiningSkillExperience: this.state.playerData.experience
        .nextMiningSkillExperience,
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
      <React.Fragment>
        <div className="App">
          <ToastContainer />
          <header id="top-bar">
            <DropdownNavigation
              goMining={this.goMining}
              currentUser={this.state.currentUser}
            />
          </header>
          <main
            className="container"
            style={{ marginTop: this.state.navigationHeight }}
          >
            <Switch>
              <ProtectedRoute
                path="/store"
                render={props => (
                  <Store
                    handleItemPurchase={this.handleItemPurchase}
                    handlePotionPurchase={this.handlePotionPurchase}
                    {...props}
                  />
                )}
              />
              <ProtectedRoute
                path="/mining"
                render={props => (
                  <Mining
                    goMining={this.state.goMining}
                    changedMining={this.changedMining}
                    stopMining={this.stopMining}
                    miningPower={miningPower}
                    miningSkill={stats.miningSkill}
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
              <ProtectedRoute
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
              <ProtectedRoute
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
              <ProtectedRoute
                path="/market"
                render={props => (
                  <Market
                    sellResource={this.handleSellResource}
                    availableResources={currentResources}
                    {...props}
                  />
                )}
              />
              <ProtectedRoute path="/bank" component={Bank} />

              <ProtectedRoute
                path="/profile"
                render={props => (
                  <Profile
                    playerData={this.state.playerData}
                    navigationHeight={this.state.navigationHeight}
                    resources={this.state.resources}
                  />
                )}
              />

              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <ProtectedRoute path="/home" component={Home} />

              <Route path="/" exact component={Main} />
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

          <div id="widgets">
            {this.state.potions.length !== 0 && (
              <Backpack
                potions={this.state.potions}
                usePotion={this.usePotion}
              />
            )}
          </div>

          {this.state.showConfetti && (
            <div id="congratulations">
              <div id="congratulations-header">
                <h1>CONGRATULATIONS</h1>
                <h2>You've Leveled UP!</h2>
                <h3>
                  <i>"Riches come to me Everyday!"</i>
                  <br />
                  <i style={{ color: "green" }}>
                    Reward $<b>{stats.miningSkill * 10}</b>
                  </i>
                  <br />
                  <i style={{ color: "green" }}>Mining Power + 1</i>
                </h3>
                <h3>$.$</h3>
              </div>
              <Confetti
                text={""}
                particlesAmount={stats.miningSkill}
                particleTypes={["dollar"]}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
