import React, { Component } from "react";

class Store extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      currentItem: 0,
      currentPotion: 0,
      potions: [
        { name: "Small Energy Potion", value: 20, strength: 10 },
        { name: "Medium Energy Potion", value: 40, strength: 20 },
        { name: "Energy Potion", value: 50, strength: 25 },
        { name: "Large Energy Potion", value: 80, strength: 40 },
        { name: "X-Large Energy Potion", value: 100, strength: 50 }
      ]
    };
  }

  prevItem = () => {
    let currentItem = this.state.currentItem - 1;
    if (currentItem < 0) {
      currentItem = this.props.itemsForSale.length - 1;
    }
    console.log("CURRENT ITEM ", currentItem);
    this.setState({
      currentItem
    });
  };

  nextItem = () => {
    let currentItem = this.state.currentItem + 1;
    if (currentItem > this.props.itemsForSale.length - 1) {
      currentItem = 0;
    }
    console.log("CURRENT ITEM ", currentItem);
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

  render() {
    const items = this.props.itemsForSale;
    const { potions, currentPotion, currentItem } = this.state;

    return (
      <div id="store">
        <h2>Welcome to Our Store!</h2>
        <p>Here You can get any item you may ever need as gold miner...</p>
        <div id="item-carousel">
          <button className="btn btn-primary" onClick={this.prevItem}>
            PREV
          </button>
          -
          <button className="btn btn-primary" onClick={this.nextItem}>
            NEXT
          </button>
          <div id="current-item" style={{ width: 275, margin: "0 auto" }}>
            <h4>{items[currentItem].name.toUpperCase()}</h4>
            <p>Type: {items[currentItem].mineType.toUpperCase()}</p>
            <p>Power: {items[currentItem].miningPower}</p>
            <p>Energy Cost: {items[currentItem].energyConsumption}</p>
            <p>Value: ${items[currentItem].value}</p>
            <button
              className="btn btn-success"
              onClick={() => this.props.handleItemPurchase(items[currentItem])}
            >
              BUY
            </button>
          </div>
        </div>
        <div id="item-carousel">
          <button className="btn btn-primary" onClick={this.prevPotion}>
            PREV
          </button>
          -
          <button className="btn btn-primary" onClick={this.nextPotion}>
            NEXT
          </button>
          <div id="current-item" style={{ width: 275, margin: "0 auto" }}>
            <h4>{potions[currentPotion].name}</h4>
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
      </div>
    );
  }
}

export default Store;
