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
    this.workersAmountChanged = true;

    switch (mineType) {
      case "gold":
        this.mineGold(worker);
        break;
      case "silver":
        this.mineSilver(worker);
        break;
      case "copper":
        this.mineCopper(worker);
        break;
      default:
        break;
    }

    // todo can't mine two mines simultaneous
    // change mine if already mining
    // WATCHOUT ERROR!
    // Same worker can be multiplied 1000 times oO!
  };

  mineCopper = worker => {
    this.copperWorkers.push(worker);
    console.log("NOW MINING COPPER", this.copperWorkers.length);
  };

  mineSilver = worker => {
    this.silverWorkers.push(worker);
    console.log("NOW MINING SILVER", this.silverWorkers.length);
  };

  mineGold = worker => {
    this.goldWorkers.push(worker);
    console.log("NOW MINING GOLD", this.goldWorkers.length);
  };

  hireWorker = worker => {
    this.workersAmountChanged = true;
    this.workers.push(worker);
  };

  getPlayerWorkers = () => {
    return this.workers;
  };
}
