import React, { Component } from "react";

class Market extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.todayGoldPrice = 10;
    this.state.todaySilverPrice = 5;
    this.state.todayCopperPrice = 2;
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
        <hr />
        {/* <button className="btn btn-secondary">Buy GOLD</button>
        <button className="btn btn-secondary">Buy SILVER</button>
        <button className="btn btn-secondary">Buy COPPER</button> */}
      </div>
    );
  }
}

export default Market;
