import ExperienceHandler from "./../components/helpers/experienceHandler";

class Worker {
  _id = "";
  name = "";
  miningSkill = 0;
  miningSkillExperience = 0;
  miningSkillCurrentPercentage = 0;
  currentMiningSkillExperience = 0;
  nextMiningSkillExperience = 0;
  miningPower = 0;
  energyLevel = 0;
  energyPoints = 0;
  maximumEnergyPoints = 0;
  energyPointsCurrentPercentage = 0;
  energyConsumption = 0;
  energyRegeneration = 0;
  hourlyCost = 0;
  currentEquipment = null;
  currentlyMining = "";
  isWorking = false;

  leveledUpHandler;

  constructor(worker, leveledUpHandler, restingHandler, workingHandler) {
    this._id = worker._id;
    this.name = worker.name;
    this.miningSkill = worker.miningSkill;
    this.miningSkillExperience = worker.miningSkillExperience;
    this.miningSkillCurrentPercentage = worker.miningSkillCurrentPercentage;
    this.currentMiningSkillExperience = worker.currentMiningSkillExperience;
    this.nextMiningSkillExperience = worker.nextMiningSkillExperience;
    this.miningPower = worker.miningPower;
    this.energyLevel = worker.energyLevel;
    this.energyPoints = worker.energyPoints;
    this.maximumEnergyPoints = worker.maximumEnergyPoints;
    this.energyPointsCurrentPercentage = this.calculateEnergyPointsCurrentPercentage();
    this.energyConsumption = worker.energyConsumption;
    this.energyRegeneration = worker.energyRegeneration;
    this.hourlyCost = worker.hourlyCost;
    this.currentEquipment = worker.currentEquipment;
    this.currentlyMining = worker.currentlyMining;
    this.isWorking = worker.isWorking;
    this.isResting = worker.isResting;

    this.leveledUpHandler = leveledUpHandler;
    this.restingHandler = restingHandler;
    this.workingHandler = workingHandler;

    this.gainExperience = this.gainExperience.bind(this);
    this.workerLeveledUp = this.workerLeveledUp.bind(this);
  }

  gainExperience(experienceAmount, experienceHandler) {
    if (this.isWorking) {
      let experience = {
        miningSkill: this.miningSkill,
        miningSkillExperience: this.miningSkillExperience,
        miningSkillCurrentPercentage: this.miningSkillCurrentPercentage,
        currentMiningSkillExperience: this.currentMiningSkillExperience,
        nextMiningSkillExperience: this.nextMiningSkillExperience,
        miningPower: this.miningPower
      };
      experience = experienceHandler.handleExperienceGain(
        experienceAmount,
        experience
      );
      // if Value didn't change -> Don't Update It
      this.miningSkillExperience = experience.miningSkillExperience;
      this.currentMiningSkillExperience =
        experience.currentMiningSkillExperience;

      if (this.miningSkill !== experience.miningSkill) {
        this.workerLeveledUp(this);
      }
      this.miningSkill = experience.miningSkill;
      // if mining power changed - > update Production...
      this.miningPower = experience.miningPower;
      this.nextMiningSkillExperience = experience.nextMiningSkillExperience;
      this.miningSkillCurrentPercentage =
        experience.miningSkillCurrentPercentage;
    }
  }

  workerLeveledUp(worker) {
    this.leveledUpHandler(worker);
  }

  handleWorkerEnergy(energyAmount) {
    if (this.isWorking) {
      this.handleWorking(energyAmount);
    }

    if (this.isResting) {
      this.handleResting();
    }

    this.energyPointsCurrentPercentage = this.calculateEnergyPointsCurrentPercentage();
  }

  handleWorking(energyAmount) {
    this.energyPoints -= energyAmount;
    if (this.energyPoints <= 0) {
      this.energyPoints = 0;
      this.isWorking = false;
      this.isResting = true;
      this.restingHandler(this);
    }
  }

  handleResting() {
    this.energyPoints += this.energyRegeneration;
    if (this.energyPoints >= this.maximumEnergyPoints) {
      this.energyPoints = this.maximumEnergyPoints;
      this.isResting = false;
      this.isWorking = true;
      this.workingHandler(this);
    }
  }

  calculateEnergyPointsCurrentPercentage = () => {
    let currentPercentage =
      (this.energyPoints / this.maximumEnergyPoints) * 100;

    if (currentPercentage >= 100) {
      currentPercentage = 0;
    }

    return currentPercentage;
  };
}

export default class MyWorkers {
  workers = [];
  copperWorkers = [];
  silverWorkers = [];
  goldWorkers = [];
  workersAmountChanged = false;
  miningRequirements = {};
  experienceHandler = {};
  leveledUpHandler;
  restingHandler;
  workingHandler;

  constructor(messenger, leveledUpHandler, restingHandler, workingHandler) {
    this.messenger = messenger;
    this.experienceHandler = new ExperienceHandler();
    this.leveledUpHandler = leveledUpHandler;
    this.restingHandler = restingHandler;
    this.workingHandler = workingHandler;
  }

  injectMiningRequirements(miningRequirements) {
    this.miningRequirements = miningRequirements;
  }

  getCopperWorkers() {
    return this.copperWorkers;
  }

  getSilverWorkers() {
    return this.silverWorkers;
  }

  getGoldWorkersCount = () => {
    return this.goldWorkers.length;
  };

  getGoldWorkersTotalStrength = () => {
    let totalStrength = 0;
    this.goldWorkers.forEach(worker => (totalStrength += worker.miningPower));

    return totalStrength;
  };

  makeWorkerWork = (worker, mineType) => {
    if (worker.isWorking) {
      this.messenger({
        title: worker.name + " is Already Working!",
        message: "He Can Work Only at One Mine at a TIME!",
        badge: "danger",
        buttonMessage: "OK",
        buttonOnClick: this.messenger
      });

      return false;
    }

    let workerCanWork = false;

    switch (mineType) {
      case "gold":
        workerCanWork = this.mineGold(worker);
        if (workerCanWork) {
          worker.isWorking = true;
          worker.isResting = false;
          worker.currentlyMining = "gold";
        }
        break;
      case "silver":
        workerCanWork = this.mineSilver(worker);
        if (workerCanWork) {
          worker.isWorking = true;
          worker.isResting = false;
          worker.currentlyMining = "silver";
        }
        break;
      case "copper":
        workerCanWork = this.mineCopper(worker);
        if (workerCanWork) {
          worker.isWorking = true;
          worker.isResting = false;
          worker.currentlyMining = "copper";
        }
        break;
      default:
        break;
    }

    if (workerCanWork) {
      this.workersAmountChanged = true;
      this.messenger({
        title: worker.name + " Started Mining " + mineType.toUpperCase(),
        message: "Make Sure You Pay Him On TIME!",
        badge: "success",
        buttonMessage: "OK",
        buttonOnClick: this.messenger
      });
    } else {
      this.messenger({
        title:
          worker.name +
          " Isn't Skilled Enough to Mine " +
          mineType.toUpperCase(),
        message: "First Train Him",
        badge: "danger",
        buttonMessage: "OK",
        buttonOnClick: this.messenger
      });
    }
    return workerCanWork;

    // todo can't mine two mines simultaneous
    // change mine if already mining
  };

  mineCopper = worker => {
    let workerCanWork = false;
    if (
      worker.miningPower >= this.miningRequirements.copperMining.miningPower &&
      worker.miningSkill >= this.miningRequirements.copperMining.miningSkill
    ) {
      this.copperWorkers.push(worker);
      console.log("NOW MINING COPPER", this.copperWorkers.length);
      workerCanWork = true;
    }

    return workerCanWork;
  };

  mineSilver = worker => {
    let workerCanWork = false;
    if (
      worker.miningPower >= this.miningRequirements.silverMining.miningPower &&
      worker.miningSkill >= this.miningRequirements.silverMining.miningSkill
    ) {
      this.silverWorkers.push(worker);
      console.log("NOW MINING SILVER", this.silverWorkers.length);
      workerCanWork = true;
    }
    return workerCanWork;
  };

  mineGold = worker => {
    let workerCanWork = false;
    if (
      worker.miningPower >= this.miningRequirements.goldMining.miningPower &&
      worker.miningSkill >= this.miningRequirements.goldMining.miningSkill
    ) {
      this.goldWorkers.push(worker);
      console.log("NOW MINING GOLD", this.goldWorkers.length);
      workerCanWork = true;
    }
    return workerCanWork;
  };

  hireWorker = worker => {
    this.workersAmountChanged = true;
    this.workers.push(
      new Worker(
        worker,
        this.leveledUpHandler,
        this.restingHandler,
        this.workingHandler
      )
    );
  };

  getPlayerWorkers = () => {
    return this.workers;
  };

  giveExperienceToWorkingWorkers() {
    if (this.copperWorkers.length != 0) {
      for (let i = 0; i <= this.copperWorkers.length - 1; i += 1) {
        this.copperWorkers[i].gainExperience(1, this.experienceHandler);
      }
    }

    if (this.silverWorkers.length != 0) {
      for (let i = 0; i <= this.silverWorkers.length - 1; i += 1) {
        this.silverWorkers[i].gainExperience(2, this.experienceHandler);
      }
    }

    if (this.goldWorkers.length != 0) {
      for (let i = 0; i <= this.goldWorkers.length - 1; i += 1) {
        this.goldWorkers[i].gainExperience(3, this.experienceHandler);
      }
    }
  }

  handleWorkerEnergy() {
    const energyDrain = 1;
    if (this.copperWorkers.length != 0) {
      for (let i = 0; i <= this.copperWorkers.length - 1; i += 1) {
        this.copperWorkers[i].handleWorkerEnergy(energyDrain);
      }
    }

    if (this.silverWorkers.length != 0) {
      for (let i = 0; i <= this.silverWorkers.length - 1; i += 1) {
        this.silverWorkers[i].handleWorkerEnergy(energyDrain);
      }
    }

    if (this.goldWorkers.length != 0) {
      for (let i = 0; i <= this.goldWorkers.length - 1; i += 1) {
        this.goldWorkers[i].handleWorkerEnergy(energyDrain);
      }
    }
  }
}
