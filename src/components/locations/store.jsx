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
              key={item._id}
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.handlePurchase(item)}
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
