import React, { Component } from "react";
import Potion from "./common/potion";

class Backpack extends Component {
  state = { potions: [] };

  constructor(props) {
    super(props);

    this.state.potions = this.props.potions;
  }

  usePotion = potion => {
    this.props.usePotion(potion);
  };

  renderPotions() {
    const potionsToRender = this.state.potions.map(potion => {
      if (potion !== undefined) {
        return (
          <div id={potion.id} className="backpack-slot">
            <Potion
              potionType={potion.type}
              potionSize={potion.size}
              amount={potion.amount}
              onClick={() => this.usePotion(potion)}
            />
            <br />
          </div>
        );
      }
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
