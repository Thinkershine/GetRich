import React, { Component } from "react";
import Potion from "./common/potion";

class Backpack extends Component {
  state = { potions: [] };

  constructor(props) {
    super(props);

    this.state.potions = this.props.potions;
  }

  renderPotions() {
    const potionsToRender = this.state.potions.map(potion => {
      return (
        <div id={potion.id} className="backpack-slot">
          <Potion
            potionType={potion.type}
            potionSize={potion.size}
            amount={potion.amount}
          />
          <br />
        </div>
      );
    });

    return potionsToRender;
  }

  render() {
    return (
      <div id="backpack">
        <div id="backpack-slots">{this.renderPotions()}</div>
      </div>
    );
  }
}

export default Backpack;
