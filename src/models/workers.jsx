import React, { Component } from "react";

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

  constructor() {
    // this.addGoldWorker("Pat");
    // this.addGoldWorker("Sebastian");
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
    this.goldWorkers.forEach(worker => (totalStrength += worker.strength));

    return totalStrength;
  };
}
