import { formatCurrency } from "../utils/stringFormats.js";

export default class MyResources {
  copperAmount;
  copperProduction;
  silverAmount;
  silverProduction;
  goldAmount;
  goldProduction;
  dollarAmount;
  dollarProduction;

  constructor(messenger) {
    this.copperAmount = 0;
    this.copperProduction = 0;
    this.silverAmount = 0;
    this.silverProduction = 0;
    this.goldAmount = 0;
    this.goldProduction = 0;
    this.dollarAmount = 100;
    this.dollarProduction = 0;
    this.messenger = messenger;
  }

  addResource = (amount, mineType) => {
    switch (mineType) {
      case "gold":
        this.goldAmount += amount;
        break;
      case "silver":
        this.silverAmount += amount;
        break;
      case "copper":
        this.copperAmount += amount;
        break;
      case "dollar":
        this.dollarAmount += amount;
        break;
      default:
        break;
    }
  };

  getResourceAmount = mineType => {
    switch (mineType) {
      case "gold":
        return this.goldAmount;
      case "silver":
        return this.silverAmount;
      case "copper":
        return this.copperAmount;
      case "dollar":
        return this.dollarAmount;
      default:
        break;
    }
  };

  spendResourceAmount = (resourceType, itemPurchased) => {
    switch (resourceType) {
      case "gold":
        this.goldAmount -= itemPurchased.value;
        break;
      case "silver":
        this.silverAmount -= itemPurchased.value;
        break;
      case "copper":
        this.copperAmount -= itemPurchased.value;
        break;
      case "dollar":
        this.dollarAmount -= itemPurchased.value;
        break;
      default:
        break;
    }

    this.messenger({
      title: "Purchase",
      message:
        "Congratulations! You've Bougt " +
        itemPurchased.name.toUpperCase() +
        " for $" +
        itemPurchased.value,
      badge: "success",
      buttonMessage: "YES!",
      buttonOnClick: this.messenger
    });
  };

  sellResource(resourceType, amount, todayMarketPrice) {
    switch (resourceType) {
      case "gold":
        if (this.goldAmount >= amount) {
          this.goldAmount -= amount;
          this.addResource(amount * todayMarketPrice, "dollar");
          this.messenger(
            this.sellSuccessMessage(amount, resourceType, todayMarketPrice)
          );
        } else {
          this.messenger(this.sellFailureMessage(amount, resourceType));
        }
        break;
      case "silver":
        if (this.silverAmount >= amount) {
          this.silverAmount -= amount;
          this.addResource(amount * todayMarketPrice, "dollar");
          this.messenger(
            this.sellSuccessMessage(amount, resourceType, todayMarketPrice)
          );
        } else {
          this.messenger(this.sellFailureMessage(amount, resourceType));
        }
        break;
      case "copper":
        if (this.copperAmount >= amount) {
          this.copperAmount -= amount;
          this.addResource(amount * todayMarketPrice, "dollar");
          this.messenger(
            this.sellSuccessMessage(amount, resourceType, todayMarketPrice)
          );
        } else {
          this.messenger(this.sellFailureMessage(amount, resourceType));
        }
        break;
      case "dollar":
        // Hmm ? Selling Dollars ?
        // Dollars Should be for Spending Only ...
        this.dollarAmount -= amount;
        break;
      default:
        break;
    }
  }

  sellSuccessMessage = (amount, resourceType, todayMarketPrice) => {
    return {
      title: "Market Sell",
      message:
        amount +
        " " +
        resourceType.toUpperCase() +
        " sold for " +
        "Current Gold Price of $" +
        todayMarketPrice +
        " Total: $" +
        formatCurrency(amount * todayMarketPrice),
      badge: "success",
      buttonMessage: "Ok",
      buttonOnClick: this.messenger
    };
  };

  sellFailureMessage = (amount, resourceType) => {
    return {
      title: "Market Sell",
      message:
        "You Don't Have Enough " +
        resourceType.toUpperCase() +
        " for sale... Tried to sell: " +
        amount +
        " of " +
        resourceType.toUpperCase(),
      badge: "warning",
      buttonMessage: "ok...",
      buttonOnClick: this.messenger
    };
  };

  workerStartWorking = (worker, mineType) => {
    switch (mineType) {
      case "gold":
        this.goldProduction = this.goldProduction + worker.miningPower;
        break;
      case "silver":
        this.silverProduction = this.silverProduction + worker.miningPower;
        break;
      case "copper":
        this.copperProduction = this.copperProduction + worker.miningPower;
        break;
      default:
        break;
    }
  };

  workersWork() {
    this.addResource(this.goldProduction, "gold");
    this.addResource(this.silverProduction, "silver");
    this.addResource(this.copperProduction, "copper");
  }

  updateResourceProductionOnLevelUp(worker) {
    if (worker.isWorking) {
      switch (worker.currentlyMining) {
        case "gold":
          let baseGoldProduction =
            this.goldProduction - (worker.miningPower - 1);
          this.goldProduction = baseGoldProduction + worker.miningPower;
          break;
        case "silver":
          let baseSilverProduction =
            this.silverProduction - (worker.miningPower - 1);
          this.silverProduction = baseSilverProduction + worker.miningPower;
          break;
        case "copper":
          let baseCopperProduction =
            this.copperProduction - (worker.miningPower - 1);
          this.copperProduction = baseCopperProduction + worker.miningPower;
          break;
        default:
          break;
      }
    }
  }

  updateResourceProductionOnResting(worker) {
    switch (worker.currentlyMining) {
      case "gold":
        let baseGoldProduction = this.goldProduction - worker.miningPower;
        this.goldProduction = baseGoldProduction;
        break;
      case "silver":
        let baseSilverProduction = this.silverProduction - worker.miningPower;
        this.silverProduction = baseSilverProduction;
        break;
      case "copper":
        let baseCopperProduction = this.copperProduction - worker.miningPower;
        this.copperProduction = baseCopperProduction;
        break;
      default:
        break;
    }
  }

  updateResourceProductionOnGetBackToWork(worker) {
    switch (worker.currentlyMining) {
      case "gold":
        let baseGoldProduction = this.goldProduction + worker.miningPower;
        this.goldProduction = baseGoldProduction;
        break;
      case "silver":
        let baseSilverProduction = this.silverProduction + worker.miningPower;
        this.silverProduction = baseSilverProduction;
        break;
      case "copper":
        let baseCopperProduction = this.copperProduction + worker.miningPower;
        this.copperProduction = baseCopperProduction;
        break;
      default:
        break;
    }
  }
}
