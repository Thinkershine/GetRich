import React, { Component } from "react";

class Store extends Component {
  state = {};

  render() {
    return (
      <div>
        <h2>Welcome to Our Store!</h2>
        <p>Here You can get any item you may ever need as gold miner...</p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Mine Type</th>
              <th scope="col">Power</th>
              <th scope="col">Energy Consumption</th>
              <th scope="col">Value</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.itemsForSale.map(item => (
              <tr scope="row" key={item._id}>
                <td>{item.name.toUpperCase()} </td>
                <td>{item.mineType}</td>
                <td>{item.miningPower}</td>
                <td>{item.energyConsumption}</td>
                <td>${item.value}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.props.handlePurchase(item)}
                  >
                    BUY
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="list-group">
          {this.props.itemsForSale.map(item => (
            <li
              key={item._id}
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.handlePurchase(item)}
            >
              {item.name.toUpperCase()} ${item.value} MINE :{" "}
              <em>{item.mineType}</em>; ENERGY COST:{item.energyConsumption};
              POW : {item.miningPower}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Store;
