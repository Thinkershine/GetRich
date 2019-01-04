import React, { Component } from "react";

class GoldMiner extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state.goldAmount = 0;
    this.state.basicMining = 5;
    this.state.basicMinerID = 0;
  }

  componentDidMount() {
    const basicMinerID = setInterval(this.discoverGold, 1000);
    this.setState({ basicMinerID });
  }

  componentWillUnmount() {
    clearInterval(this.state.basicMinerID);
  }

  discoverGold = () => {
    this.props.onInterval();
  };

  digGold = () => {
    this.props.onClick(this.state.basicMining);
  };

  render() {
    return (
      <div id="GoldMiner">
        <h3>You Mined : {this.state.goldAmount} GOLD</h3>
        <button onClick={() => this.digGold()}>DIG IT!</button>
      </div>
    );
  }
}

export default GoldMiner;
