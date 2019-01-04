import React, { Component } from "react";
import "./App.css";
import GoldMine from "./components/goldMine";
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
    workers: new Workers()
  };

  componentDidMount() {
    const { workers } = this.state;
    console.log("ITEMSFORSALE", this.state.itemsForSale);
    this.setState({
      goldWorkers: workers.getGoldWorkersCount(),
      goldProduction: workers.getGoldWorkersTotalStrength()
    });

    console.log("App Mounted");
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
      goldAmount: this.state.goldAmount + this.state.goldProduction
    });
  };

  handleMining = dugAmount => {
    //raise event when new workers comes aboard

    this.setState({ goldAmount: this.state.goldAmount + dugAmount });
  };

  buyNewWorker = () => {
    this.state.workers.addGoldWorker("Majka");
  };

  render() {
    const { currentEquipment } = this.state;

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

            {this.state.isEquipped &&
              (() => {
                return (
                  <div id="equipment">
                    <h3>Current Equipment</h3>
                    <p>
                      Name: {this.state.miningEquipment[currentEquipment].name}
                    </p>
                    <p>
                      Power:{" "}
                      {this.state.miningEquipment[currentEquipment].miningPower}
                    </p>
                    <p>
                      Value:{" "}
                      {this.state.miningEquipment[currentEquipment].value}
                    </p>
                    <p>
                      Energy Consumption:{" "}
                      {
                        this.state.miningEquipment[currentEquipment]
                          .energyConsumption
                      }
                    </p>
                  </div>
                );
              })}

            <h4>Change Equipment</h4>
            <ul className="list-group">
              <li className="list-group-item">
                {this.state.isEquipped &&
                  (() => {
                    return this.state.miningEquipment[
                      currentEquipment
                    ].name.toUpperCase();
                  })}
              </li>
            </ul>
          </div>

          <GoldMine
            miningPower={
              this.state.isEquipped
                ? this.state.miningEquipment[currentEquipment].miningPower
                : 1
            }
            goldMined={this.state.goldAmount}
            onInterval={this.handleWorkers}
            onClick={this.handleMining}
          />

          <h3>STORE</h3>
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
