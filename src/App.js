import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { getItems } from "./services/fakeItemService.js";
import MyWorkers from "./models/workers";
import MyResources from "./models/myResources.js";
import Store from "./components/locations/store";
import Mining from "./components/locations/mining";
import Navigation from "./components/navigation";
import Resources from "./components/resources";
import Equipment from "./components/equipment";
import Workers from "./components/workers";
import Message from "./components/common/message";

class App extends Component {
  state = {
    isEquipped: false,
    itemsForSale: getItems(),
    currentEquipment: 0,
    miningEquipment: [],
    resources: new MyResources(this.handleButtonMessage.bind(this)),
    workers: new MyWorkers(),

    message: {
      title: "Welcome!",
      message: "Hello :)",
      badge: "success", // primary secondary warning danger success info
      buttonMessage: "Hi!",
      buttonOnClick: this.handleButtonMessage.bind(this)
    },
    displayMessage: false
  };

  handleButtonMessage(messageForButton) {
    this.setState({
      message: messageForButton,
      displayMessage: !this.state.displayMessage
    });
  }

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
  displayMessage = message => {
    console.log("Messasge s", message);
    const showMessage = this.state.showMessage;

    this.setState({ message, displayMessage: true });
  };

  handlePurchase = item => {
    if (item.value > this.state.resources.dollarAmount) {
      this.displayMessage({
        title: "You are POOR!",
        message: "You can't even afford your most basic tools.",
        badge: "danger",
        buttonMessage: "ok..",
        buttonOnClick: this.handleButtonMessage.bind(this)
      });
      return;
    }

    this.state.resources.spendResourceAmount("dollar", item);
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

          <Route
            path="/equipment"
            render={props => (
              <Equipment
                isEquipped={this.state.isEquipped}
                currentEquipment={this.state.currentEquipment}
                miningEquipment={this.state.miningEquipment}
                {...props}
              />
            )}
          />

          <Route path="/workers" render={props => <Workers />} />
        </main>

        <div id="tools">
          {this.state.displayMessage && (
            <Message
              messageTitle={this.state.message.title}
              message={this.state.message.message}
              badge={this.state.message.badge}
              buttonMessage={this.state.message.buttonMessage}
              buttonOnClick={this.state.message.buttonOnClick}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
