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
    this.goldWorkers.forEach(worker => (totalStrength += worker.strength));

    return totalStrength;
  };

  hireWorker = worker => {
    this.workers.push(worker);
  };

  getPlayerWorkers = () => {
    return this.workers;
  };
}
