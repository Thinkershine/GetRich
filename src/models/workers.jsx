class Worker {
  name = "";
  strength = 0;

  constructor(name, strength = 5) {
    this.name = name;
    this.strength = strength;
  }
}

export default class MyWorkers {
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
}
