import React, { Component } from "react";

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
      sellSilverAmount: 0
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

  sellMore(ofResource, event) {
    switch (ofResource) {
      case "gold":
        let sellGoldAmount = this.state.sellGoldAmount;
        sellGoldAmount += 1;
        this.setState({ sellGoldAmount: sellGoldAmount });
        break;
      default:
        break;
    }
    event.preventDefault();
  }

  sellLess(ofResource, event) {
    switch (ofResource) {
      case "gold":
        let sellGoldAmount = this.state.sellGoldAmount;
        sellGoldAmount -= 1;
        this.setState({ sellGoldAmount: sellGoldAmount });
        break;
      default:
        break;
    }
    event.preventDefault();
  }

  render() {
    console.log("SELL RESOURCE PASSED FNC", this.props.sellResource);
    return (
      <div id="market">
        <h3>Here You Can Buy and Sell Goods and Offer Jobs to Workers.</h3>
        <button
          className="btn btn-primary"
          onClick={() =>
            this.props.sellResource("gold", 500, this.state.todayGoldPrice)
          }
        >
          Sell 500 GOLD <i>for</i> ${this.state.todayGoldPrice} / Gold Nugget
        </button>

        <button
          className="btn btn-primary"
          onClick={() =>
            this.props.sellResource("silver", 500, this.state.todaySilverPrice)
          }
        >
          Sell 500 SILVER <i>for</i> ${this.state.todaySilverPrice} / Silver
          Nugget
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            this.props.sellResource("copper", 500, this.state.todayCopperPrice)
          }
        >
          Sell 500 COPPER <i>for</i> ${this.state.todayCopperPrice} / Copper
          Nugget
        </button>
        <form onSubmit={this.handleSubmit}>
          <label>
            Gold
            <input type="text" value={this.state.sellGoldAmount} disabled />
          </label>

          <button
            className="btn btn-primary"
            onClick={() => this.sellLess("gold")}
          >
            -
          </button>
          <button
            className="btn btn-primary"
            onClick={() => this.sellMore("gold")}
          >
            +
          </button>
          <button className="btn btn-primary" type="submit" value="Sell">
            SELL
          </button>
        </form>
        <hr />
      </div>
    );
  }
}

export default Market;
