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
        <li
          key={item._id}
          className="list-group-item"
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.setState({ currentEquipment: item });
          }}
        >
          {item.name.toUpperCase()}
        </li>
      );
    });

    return uniqueItems;
  };

  render() {
    const { currentEquipment } = this.state;

    return (
      <div id="equipment" className="container">
        {this.state.isEquipped ? (
          <div className="row">
            <div className="col">
              <h4>Change Equipment</h4>
              <ul className="list-group">
                {this.filterUniqueItemsForDisplay()}
              </ul>
            </div>
            <div className="col">
              <h2>Current Equipment</h2>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Power</th>
                    <th scope="col">Value</th>
                    <th scope="col">Energy Consumption</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{currentEquipment.name.toUpperCase()}</td>
                    <td>{currentEquipment.miningPower}</td>
                    <td>${currentEquipment.value}</td>
                    <td>{currentEquipment.energyConsumption}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h2>You Don't have Any Equipment, Yet...</h2>
        )}
      </div>
    );
  }
}

export default Equipment;
