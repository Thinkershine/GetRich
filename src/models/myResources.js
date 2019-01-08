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
    console.log("RESOURCE Type", resourceType);
    console.log("Today Market Price", todayMarketPrice);
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

  constructor(messenger) {
    this.copperAmount = 1000;
    this.copperProduction = 1000;
    this.silverAmount = 1000;
    this.silverProduction = 1000;
    this.goldAmount = 1000;
    this.goldProduction = 1000;
    this.dollarAmount = 100;
    this.dollarProduction = 0;
    this.messenger = messenger;
  }
}
