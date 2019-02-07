class Worker {
  _id = "";
  name = "";
  miningSkill = 0;
  miningSkillExperience = 0;
  miningSkillCurrentPercentage = 0;
  currentMiningSkillExperience = 0;
  miningPower = 0;
  energyLevel = 0;
  energyPoints = 0;
  energyConsumption = 0;
  energyRegeneration = 0;
  hourlyCost = 0;
  currentEquipment = null;
  isWorking = false;

  constructor(worker) {
    this._id = worker._id;
    this.name = worker.name;
    this.miningSkill = worker.miningSkill;
    this.miningSkillExperience = worker.miningSkillExperience;
    this.miningSkillCurrentPercentage = worker.miningSkillCurrentPercentage;
    this.miningPower = worker.miningPower;
    this.energyLevel = worker.energyLevel;
    this.energyPoints = worker.energyPoints;
    this.energyConsumption = worker.energyConsumption;
    this.energyRegeneration = worker.energyRegeneration;
    this.hourlyCost = worker.hourlyCost;
    this.currentEquipment = worker.currentEquipment;
    this.isWorking = worker.isWorking;

    this.gainExperience = this.gainExperience.bind(this);
  }

  gainExperience(experience) {
    this.miningSkillExperience = this.miningSkillExperience += experience;
    console.log("WORKER", this.name, "GAINED EXP", this.miningSkillExperience);
  }
}

export default class MyWorkers {
  workers = [];
  copperWorkers = [];
  silverWorkers = [];
  goldWorkers = [];
  workersAmountChanged = false;
  miningRequirements = {};

  constructor(messenger) {
    this.messenger = messenger;
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
        }
        break;
      case "silver":
        workerCanWork = this.mineSilver(worker);
        if (workerCanWork) {
          worker.isWorking = true;
        }
        break;
      case "copper":
        workerCanWork = this.mineCopper(worker);
        if (workerCanWork) {
          worker.isWorking = true;
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
    // WATCHOUT ERROR!
    // Same worker can be multiplied 1000 times oO!
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
    this.workers.push(new Worker(worker));
  };

  getPlayerWorkers = () => {
    return this.workers;
  };

  giveExperienceToWorkingWorkers() {
    console.log("GIVING EXP");
    if (this.copperWorkers.length != 0) {
      for (let i = 0; i <= this.copperWorkers.length - 1; i += 1) {
        this.copperWorkers[i].gainExperience(1);
      }
    }

    if (this.silverWorkers.length != 0) {
      for (let i = 0; i <= this.silverWorkers.length - 1; i += 1) {
        this.silverWorkers[i].gainExperience(2);
      }
    }

    if (this.goldWorkers.length != 0) {
      for (let i = 0; i <= this.goldWorkers.length - 1; i += 1) {
        this.goldWorkers[i].gainExperience(3);
      }
    }
  }
}
