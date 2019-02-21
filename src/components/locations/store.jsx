import React, { Component } from "react";
import Potion from "../common/potion";
import { getPotions } from "../../services/fakeItemService";

class Store extends Component {
  state = {};

  constructor(props) {
    super(props);

    const premium = true;

    this.state = {
      currentItem: 0,
      currentPotion: 0,
      currentPremiumPotion: 0,
      potions: getPotions(),
      premiumPotions: getPotions(premium)
    };
  }

  renderItem(itemName) {
    switch (itemName) {
      case "rusty pickaxe":
        return "/graphics/rusty-pickaxe.png";
      case "steel pickaxe":
        return "/graphics/steel-pickaxe.png";
      case "hardened pickaxe":
        return "/graphics/hardened-pickaxe.png";
      case "silver pickaxe":
        return "/graphics/mythril-pickaxe.png";
      case "golden pickaxe":
        return "/graphics/golden-pickaxe.png";
      default:
        break;
    }
  }

  prevItem = () => {
    let currentItem = this.state.currentItem - 1;
    if (currentItem < 0) {
      currentItem = this.props.itemsForSale.length - 1;
    }

    this.setState({
      currentItem
    });
  };

  nextItem = () => {
    let currentItem = this.state.currentItem + 1;
    if (currentItem > this.props.itemsForSale.length - 1) {
      currentItem = 0;
    }

    this.setState({
      currentItem
    });
  };

  prevPotion = () => {
    let currentPotion = this.state.currentPotion - 1;
    if (currentPotion < 0) {
      currentPotion = this.state.potions.length - 1;
    }

    this.setState({ currentPotion });
  };

  nextPotion = () => {
    let currentPotion = this.state.currentPotion + 1;
    if (currentPotion > this.state.potions.length - 1) {
      currentPotion = 0;
    }
    this.setState({ currentPotion });
  };

  prevPremiumPotion = () => {
    let currentPremiumPotion = this.state.currentPremiumPotion - 1;
    if (currentPremiumPotion < 0) {
      currentPremiumPotion = this.state.premiumPotions.length - 1;
    }

    this.setState({ currentPremiumPotion });
  };

  nextPremiumPotion = () => {
    let currentPremiumPotion = this.state.currentPremiumPotion + 1;
    if (currentPremiumPotion > this.state.premiumPotions.length - 1) {
      currentPremiumPotion = 0;
    }
    this.setState({ currentPremiumPotion });
  };

  render() {
    const items = this.props.itemsForSale;
    const {
      potions,
      currentPotion,
      premiumPotions,
      currentPremiumPotion,
      currentItem
    } = this.state;

    return (
      <div id="store">
        <h2>Welcome to Our Store!</h2>
        <p>Here You can get any item you may ever need as gold miner...</p>

        <div className="row">
          <div id="item-carousel" className="col">
            <button className="btn btn-primary" onClick={this.prevItem}>
              PREV
            </button>
            -
            <button className="btn btn-primary" onClick={this.nextItem}>
              NEXT
            </button>
            <h3>Mining Items</h3>
            <div id="current-item" style={{ width: 275, margin: "0 auto" }}>
              <h4>{items[currentItem].name.toUpperCase()}</h4>
              <img
                src={this.renderItem(items[currentItem].name)}
                alt={items[currentItem].name}
                width="50"
                height="50"
              />
              <p>Type: {items[currentItem].mineType.toUpperCase()}</p>
              <p>Power: {items[currentItem].miningPower}</p>
              <p>Energy Cost: {items[currentItem].energyConsumption}</p>
              <p>Value: ${items[currentItem].value}</p>
              <button
                className="btn btn-success"
                onClick={() =>
                  this.props.handleItemPurchase(items[currentItem])
                }
              >
                BUY
              </button>
            </div>
          </div>
          <div id="item-carousel" className="col">
            <button className="btn btn-primary" onClick={this.prevPotion}>
              PREV
            </button>
            -
            <button className="btn btn-primary" onClick={this.nextPotion}>
              NEXT
            </button>
            <h3>Energy Potions</h3>
            <div id="current-item" style={{ width: 275, margin: "0 auto" }}>
              <h4>{potions[currentPotion].name}</h4>
              <Potion
                potionType={potions[currentPotion].type}
                potionSize={potions[currentPotion].size}
                amount={potions[currentPotion].amount}
                description={potions[currentPotion].description}
              />
              <p>Strength: {potions[currentPotion].strength}</p>
              <p>Cost: ${potions[currentPotion].value}</p>
              <button
                className="btn btn-success"
                onClick={() =>
                  this.props.handlePotionPurchase(potions[currentPotion])
                }
              >
                BUY
              </button>
            </div>
          </div>

          <div id="item-carousel" className="col">
            <button
              className="btn btn-primary"
              onClick={this.prevPremiumPotion}
            >
              PREV
            </button>
            -
            <button
              className="btn btn-primary"
              onClick={this.nextPremiumPotion}
            >
              NEXT
            </button>
            <h3>Premium Potions</h3>
            <div id="current-item" style={{ width: 275, margin: "0 auto" }}>
              <h4>{premiumPotions[currentPremiumPotion].name}</h4>
              <Potion
                potionType={premiumPotions[currentPremiumPotion].type}
                potionSize={premiumPotions[currentPremiumPotion].size}
                amount={premiumPotions[currentPremiumPotion].amount}
                description={premiumPotions[currentPremiumPotion].description}
              />
              <p>Strength: {premiumPotions[currentPremiumPotion].strength}</p>
              <p>Cost: ${premiumPotions[currentPremiumPotion].value}</p>
              <button
                className="btn btn-success"
                onClick={() =>
                  this.props.handlePotionPurchase(
                    premiumPotions[currentPremiumPotion]
                  )
                }
              >
                BUY
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Store;
