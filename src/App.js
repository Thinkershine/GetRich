import React, { Component } from "react";
import "./App.css";
import GoldMiner from "./components/goldMiner";

class App extends Component {
  state = {
    copperAmount: 0,
    copperProduction: 0,
    silverAmount: 0,
    silverProduction: 0,
    goldAmount: 0,
    goldProduction: 0,
    dollarAmount: 100,
    dollarProduction: 0,
    miningEquipment: { name: "pickaxe", miningPower: 5, value: 20 }
  };

  handleWorkers = () => {
    this.setState({ goldAmount: this.state.goldAmount + 1 });
  };

  handleMining = dugAmount => {
    this.setState({ goldAmount: this.state.goldAmount + dugAmount });
  };

  render() {
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
                </tr>
              </tbody>
            </table>

            <h3>Current Equipment</h3>
            <p>Name: {this.state.miningEquipment.name}</p>
            <p>Power: {this.state.miningEquipment.miningPower}</p>
            <p>Value: {this.state.miningEquipment.value}</p>

            <h4>Change Equipment</h4>
            <ul className="list-group">
              <li className="list-group-item">
                {this.state.miningEquipment.name.toUpperCase()}
              </li>
            </ul>
          </div>

          <GoldMiner
            onInterval={this.handleWorkers}
            onClick={this.handleMining}
          />
        </main>
      </div>
    );
  }
}

export default App;
