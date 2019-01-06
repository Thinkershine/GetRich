import React, { Component } from "react";
import "./App.css";
import Store from "./components/locations/store";
import Workers from "./models/workers";
import { getItems } from "./services/fakeItemService.js";
import Navigation from "./components/navigation";
import { Route } from "react-router-dom";
import MyResources from "./models/myResources.js";
import Resources from "./components/resources";
import Mining from "./components/locations/mining";

class App extends Component {
  state = {
    isEquipped: false,
    itemsForSale: getItems(),
    currentEquipment: 0,
    miningEquipment: [],
    resources: new MyResources(),
    workers: new Workers()
  };

  componentDidMount() {
    const { workers } = this.state;

    this.setState({
      goldWorkers: workers.getGoldWorkersCount(),
      goldProduction: workers.getGoldWorkersTotalStrength()
    });
  }

  componentDidUpdate() {
    const { workers } = this.state;
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
      goldAmount:
        this.state.resource.goldAmount + this.state.resource.goldProduction
    });
  };

  handleMining = (dugAmount, mineType) => {
    // const resource = this.state;
    //  console.log("RESOURCES RECEIVED", resource);
    //  console.log("GOLD", resource.goldAmount);
    this.state.resources.addResource(dugAmount, mineType);
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

  render() {
    const { currentEquipment } = this.state;
    const miningPower = this.state.isEquipped
      ? this.state.miningEquipment[currentEquipment].miningPower
      : 1;

    return (
      <div className="App">
        <header>
          <h1>Time to Get RICH ! $.$</h1>
          <Navigation />
        </header>

        <main className="container">
          <Resources resources={this.state.resources} />
          <Route
            path="/store"
            render={props => (
              <Store
                itemsForSale={this.state.itemsForSale}
                handlePurchase={this.handlePurchase}
                {...props}
              />
            )}
          />
          <Route
            path="/mining"
            render={props => (
              <Mining
                goMining={this.goMining}
                stopMining={this.stopMining}
                miningPower={miningPower}
                resources={this.state.resources}
                handleMining={this.handleMining}
                {...props}
              />
            )}
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
                {this.state.miningEquipment[currentEquipment].energyConsumption}
              </p>
            </div>
          )}

          <h4>Change Equipment</h4>
          <ul className="list-group">{this.filterUniqueItemsForDisplay()}</ul>

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
