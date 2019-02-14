import React, { Component } from "react";

class Store extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      currentItemID: 0
    };
  }

  prevItem = () => {
    let currentItemID = this.state.currentItemID - 1;
    if (currentItemID < 0) {
      currentItemID = this.props.itemsForSale.length - 1;
    }
    console.log("CURRENT ITEM ID ", currentItemID);
    this.setState({
      currentItemID
    });
  };

  nextItem = () => {
    let currentItemID = this.state.currentItemID + 1;
    if (currentItemID > this.props.itemsForSale.length - 1) {
      currentItemID = 0;
    }
    console.log("CURRENT ITEM ID ", currentItemID);
    this.setState({
      currentItemID
    });
  };

  render() {
    const items = this.props.itemsForSale;
    const currentItem = this.state.currentItemID;
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
          <div id="current-item" style={{ width: 350, margin: "0 auto" }}>
            <h4>{items[currentItem].name.toUpperCase()}</h4>
            <p>Type: {items[currentItem].mineType.toUpperCase()}</p>
            <p>Power: {items[currentItem].miningPower}</p>
            <p>Energy Cost: {items[currentItem].energyConsumption}</p>
            <p>Value: ${items[currentItem].value}</p>
            <button
              className="btn btn-success"
              onClick={() => this.props.handlePurchase(items[currentItem])}
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
