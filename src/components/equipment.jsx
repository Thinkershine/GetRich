import React, { Component } from "react";

class Equipment extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state.isEquipped = this.props.isEquipped;
    this.state.miningEquipment = this.props.miningEquipment;
    this.state.currentEquipment = this.props.currentEquipment;
  }

  filterUniqueItemsForDisplay = () => {
    const { miningEquipment: equipment } = this.state;

    const unique = Array.from(new Set(equipment));

    const uniqueItems = unique.map(item => {
      return (
        <li key={item._id} className="list-group-item">
          {item.name.toUpperCase()}
        </li>
      );
    });

    return uniqueItems;
  };

  render() {
    const { miningEquipment, currentEquipment } = this.state;

    return (
      <div id="equipment">
        {this.state.isEquipped && (
          <div>
            <h3>Current Equipment</h3>
            <p>Name: {miningEquipment[currentEquipment].name}</p>
            <p>Power: {miningEquipment[currentEquipment].miningPower}</p>
            <p>Value: ${miningEquipment[currentEquipment].value}</p>
            <p>
              Energy Consumption:{" "}
              {miningEquipment[currentEquipment].energyConsumption}
            </p>
          </div>
        )}

        <h4>Change Equipment</h4>
        <ul className="list-group">{this.filterUniqueItemsForDisplay()}</ul>
      </div>
    );
  }
}

export default Equipment;
