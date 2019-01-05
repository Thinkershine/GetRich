import React, { Component } from "react";

class Store extends Component {
  state = {};

  render() {
    return (
      <div>
        <h2>Welcome to Our Store!</h2>
        <p>Here You can get any item you may ever need as gold miner...</p>
        <ul className="list-group">
          {this.props.itemsForSale.map(item => (
            <li
              onClick={() => this.props.handlePurchase(item)}
              className="list-group-item"
              key={item._id}
            >
              {item.name} : ${item.value}- mine : {item.mineType}; energy cost :
              {item.energyConsumption}; POW : {item.miningPower}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Store;
