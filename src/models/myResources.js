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
}
