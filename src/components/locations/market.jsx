import React, { Component } from "react";
import ResourcesForm from "../resourcesForm";

class Market extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.todayGoldPrice = 10;
    this.state.todaySilverPrice = 5;
    this.state.todayCopperPrice = 2;

    this.state = {
      sellGoldAmount: 0,
      sellCopperAmount: 0,
      sellSilverAmount: 0,
      todayPrices: {
        goldPrice: 10,
        silverPrice: 5,
        copperPrice: 2
      }
    };

    this.handleGoldChange = this.handleGoldChange.bind(this);
  }

  handleSubmit(event) {
    console.log("GOLD", this.state.sellGoldAmount);
    event.preventDefault();
  }

  handleGoldChange(event) {
    console.log("CHANGE");
    let sellGoldAmount = this.state.sellGoldAmount;
    sellGoldAmount = event.target.value;
    this.setState({
      sellGoldAmount: sellGoldAmount
    });
    event.preventDefault();
  }

  sellResource = (resource, amount) => {
    console.log("SELL RESOURCE", resource);
    console.log("Amount", amount);
    switch (resource) {
      case "gold":
        this.props.sellResource(
          "gold",
          amount,
          this.state.todayPrices.goldPrice
        );
        break;
      case "silver":
        this.props.sellResource(
          "silver",
          amount,
          this.state.todayPrices.silverPrice
        );
        break;
      case "copper":
        this.props.sellResource(
          "copper",
          amount,
          this.state.todayPrices.copperPrice
        );
        break;
    }
  };

  render() {
    // console.log("SELL RESOURCE PASSED FNC", this.props.sellResource);
    return (
      <div id="market">
        <h3>Here You Can Buy and Sell Goods.</h3>

        <ResourcesForm
          sellResource={this.sellResource}
          todayPrices={this.state.todayPrices}
          availableResources={this.props.availableResources}
        />
        <hr />
      </div>
    );
  }
}

export default Market;
