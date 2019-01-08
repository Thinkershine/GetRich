import React, { Component } from "react";

class Market extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.todayGoldPrice = 45;
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
          Sell 5 GOLD
        </button>
        <button className="btn btn-primary">Sell ALL SILVER</button>
        <button className="btn btn-primary">Sell COPPER</button>
        <hr />
        <button className="btn btn-secondary">Buy GOLD</button>
        <button className="btn btn-secondary">Buy SILVER</button>
        <button className="btn btn-secondary">Buy COPPER</button>
      </div>
    );
  }
}

export default Market;
