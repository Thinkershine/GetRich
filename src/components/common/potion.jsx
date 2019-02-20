import React, { Component } from "react";

class Potion extends Component {
  state = {};

  renderPotion(potionType) {
    switch (potionType) {
      case "energy":
        return "/graphics/energy-potion.png";
      case "combo":
        return "/graphics/combo-potion.png";
      case "experience":
        return "/graphics/experience-potion.png";
      case "power":
        return "/graphics/power-potion.png";
      default:
        break;
    }
  }

  renderPotionSize(potionSize) {
    switch (potionSize) {
      case "small":
        return "S";
      case "medium":
        return "M";
      case "normal":
        return "";
      case "large":
        return "L";
      case "x-large":
        return "XL";
      default:
        break;
    }
  }

  renderAltText(potionType) {
    switch (potionType) {
      case "energy":
        return "Energy Potion";
      case "combo":
        return "Combo Potion";
      case "experience":
        return "Experience Potion";
      case "power":
        return "Power Potion";
      default:
        break;
    }
  }

  render() {
    return (
      <div
        className="potion"
        style={{ width: 55, height: 55 }}
        onClick={this.props.onClick}
      >
        <img
          src={this.renderPotion(this.props.potionType)}
          alt={this.renderAltText(this.props.potionType)}
          width="50"
          height="50"
        />
        <span className="potion-size">
          {this.renderPotionSize(this.props.potionSize)}
        </span>
        <span className="potion-amount">{this.props.amount}</span>
      </div>
    );
  }
}

export default Potion;
