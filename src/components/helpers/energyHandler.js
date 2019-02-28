export default class EnergyHandler {
  // What should the Interface be ?
  energyLevel = 1;
  energyPoints = 100;
  currentEnergyPoints = 100;
  maximumEnergyPoints = 100;

  // yet to go
  currentRequiredEnergy = 0;
  noEnergy = false;

  energyDrain = 1;
  energyGain = 1;
  energyGainTimer = 5000;

  constructor() {
    // Again... How to Make it Singleton?
  }
}
