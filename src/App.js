import React, { Component } from "react";
import "./App.css";
import GoldMine from "./components/locations/goldMine";
import Mine from "./components/locations/mine";
import Store from "./components/locations/store";
import Workers from "./models/workers";
import { getItems } from "./services/fakeItemService.js";

class App extends Component {
  state = {
    copperAmount: 0,
    copperProduction: 0,
    silverAmount: 0,
    silverProduction: 0,
    goldAmount: 0,
    dollarAmount: 100,
    dollarProduction: 0,
    isEquipped: false,
    itemsForSale: getItems(),
    currentEquipment: 0,
    miningEquipment: [],
    workers: new Workers(),

    isGoldMining: false,
    isSilverMining: false,
    isCopperMining: false
  };

  componentDidMount() {
    const { workers } = this.state;

    this.setState({
      goldWorkers: workers.getGoldWorkersCount(),
      goldProduction: workers.getGoldWorkersTotalStrength()
    });

    console.log("App Mounted");
  }

  componentDidUpdate() {
    const { workers } = this.state;
    console.log("UPDATED");
    console.log("WORKERS CHANGED", workers.workersAmountChanged);
    if (workers.workersAmountChanged) {
      workers.workersAmountChanged = false;

      this.setState({
        goldWorkers: workers.getGoldWorkersCount(),
        goldProduction: workers.getGoldWorkersTotalStrength()
      });
    }
  }

  handleWorkers = () => {
    // suboptimal to check everysecond how many workers are there ??
    // isn't this better to hold the value somewhere and update it ?
    // when necessary? Event Handling//
    // >> You've Got New Worker!

    this.setState({
      goldAmount: this.state.goldAmount + this.state.goldProduction
    });
  };

  handleMining = (dugAmount, mineType) => {
    switch (mineType) {
      case "gold":
        this.setState({ goldAmount: this.state.goldAmount + dugAmount });
        break;
      case "silver":
        this.setState({ silverAmount: this.state.silverAmount + dugAmount });
        break;
      case "copper":
        this.setState({ copperAmount: this.state.copperAmount + dugAmount });
        break;
    }
  };

  handlePurchase = item => {
    const itemsOwned = this.state.miningEquipment;
    itemsOwned.push(item);
    const indexOfNewItem = itemsOwned.indexOf(item);
    console.log("Index of NEW ITEM", indexOfNewItem);

    this.setState({
      miningEquipment: itemsOwned,
      isEquipped: true,
      currentEquipment: indexOfNewItem
    });
    console.log(
      "EQ POW",
      this.state.miningEquipment[indexOfNewItem].miningPower
    );
    console.log("Items Owned", itemsOwned);
  };

  buyNewWorker = () => {
    console.log("NEW WORKER");
    this.state.workers.addGoldWorker("Majka");
  };

  filterUniqueItemsForDisplay = () => {
    const { miningEquipment: equipment } = this.state;

    const unique = Array.from(new Set(equipment));

    const uniqueItems = unique.map(item => {
      return (
        <li key={item._id} className="list-group-item">
          {item.name.toUpperCase()}
        </li>
      );
    });

    return uniqueItems;
  };

  goMining = miningType => {
    switch (miningType) {
      case "gold":
        this.setState({ isGoldMining: true });
        break;
      case "silver":
        this.setState({ isSilverMining: true });
        break;
      case "copper":
        this.setState({ isCopperMining: true });
        break;
    }
  };
  stopMining = miningType => {
    switch (miningType) {
      case "gold":
        this.setState({ isGoldMining: false });
        break;
      case "silver":
        this.setState({ isSilverMining: false });
        break;
      case "copper":
        this.setState({ isCopperMining: false });
        break;
    }
  };

  render() {
    const { currentEquipment } = this.state;
    const miningPower = this.state.isEquipped
      ? this.state.miningEquipment[currentEquipment].miningPower
      : 1;
    console.log("MINING POWER", miningPower);

    return (
      <div className="App">
        <header>
          <h1>Time to Get RICH ! $.$</h1>
        </header>

        <main className="container">
          <div id="resources">
            <table>
              <tbody>
                <tr>
                  <th>Resource</th>
                  <td>Copper</td>
                  <td>Silver</td>
                  <td>Gold</td>
                  <td>$</td>
                  <td />
                </tr>
                <tr>
                  <th>Amount</th>
                  <td>{this.state.copperAmount}</td>
                  <td>{this.state.silverAmount}</td>
                  <td>{this.state.goldAmount}</td>
                  <td>{this.state.dollarAmount}</td>
                </tr>
                <tr>
                  <th>Production</th>
                  <td>{this.state.copperProduction}</td>
                  <td>{this.state.silverProduction}</td>
                  <td>{this.state.goldProduction}</td>
                  <td>{this.state.dollarProduction}</td>
                  <td>/second</td>
                </tr>
              </tbody>
            </table>

            <Store
              itemsForSale={this.state.itemsForSale}
              handlePurchase={this.handlePurchase}
            />

            {this.state.isEquipped && (
              <div id="equipment">
                <h3>Current Equipment</h3>
                <p>Name: {this.state.miningEquipment[currentEquipment].name}</p>
                <p>Power: {miningPower}</p>
                <p>
                  Value: ${this.state.miningEquipment[currentEquipment].value}
                </p>
                <p>
                  Energy Consumption:{" "}
                  {
                    this.state.miningEquipment[currentEquipment]
                      .energyConsumption
                  }
                </p>
              </div>
            )}

            <h4>Change Equipment</h4>
            <ul className="list-group">{this.filterUniqueItemsForDisplay()}</ul>
          </div>

          <h2>Go Mining</h2>
          <button onClick={() => this.goMining("gold")} className="btn">
            Go GOLD Mining
          </button>
          <span>.</span>
          <button onClick={() => this.goMining("silver")} className="btn">
            Go SILVER Mining
          </button>
          <span>.</span>
          <button onClick={() => this.goMining("copper")} className="btn">
            Go COPPER Mining
          </button>
          <hr />
          <button onClick={() => this.stopMining("gold")} className="btn">
            STOP GOLD Mining
          </button>
          <span>.</span>
          <button onClick={() => this.stopMining("silver")} className="btn">
            STOP SILVER Mining
          </button>
          <span>.</span>
          <button onClick={() => this.stopMining("copper")} className="btn">
            STOP COPPER Mining
          </button>

          {this.state.isSilverMining && (
            <Mine
              miningPower={miningPower}
              mineType="silver"
              goldMined={this.state.goldAmount}
              //    onInterval={this.handleWorkers}
              onClick={this.handleMining}
            />
          )}

          {this.state.isGoldMining && (
            <Mine
              miningPower={miningPower}
              mineType="gold"
              goldMined={this.state.goldAmount}
              // onInterval={this.handleWorkers}
              onClick={this.handleMining}
            />
          )}

          {this.state.isCopperMining && (
            <Mine
              miningPower={miningPower}
              mineType="copper"
              goldMined={this.state.goldAmount}
              //   onInterval={this.handleWorkers}
              onClick={this.handleMining}
            />
          )}

          <h2>Workers Den</h2>
          <p>Do You Need More Workers?</p>
          <button onClick={this.buyNewWorker} className="btn btn-primary">
            Buy 1 Worker
          </button>
        </main>
      </div>
    );
  }
}

export default App;
