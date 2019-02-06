class Worker {
  name = "";
  miningSkill = 0;
  miningPower = 1;
  energyLevel = 1;
  energyPoints = 100;
  energyConsumption = 1;
  energyRegeneration = 1;
  hourlyCost = 5;
  currentEquipment = null;
  isWorking = false;

  constructor(name) {
    this.name = name;
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

  addGoldWorker = name => {
    this.goldWorkers.push(new Worker(name));
    this.workersAmountChanged = true;
    console.log("WORKERS", this.goldWorkers);
  };

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
    this.workers.push(worker);
  };

  getPlayerWorkers = () => {
    return this.workers;
  };
}
