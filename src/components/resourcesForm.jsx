import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class ResourcesForm extends Form {
  state = {
    data: { goldAmount: 0, silverAmount: 0, copperAmount: 0 },
    errors: "",
    yourGoldAmount: 1000,
    yourSilverAmount: 1000,
    yourCopperAmount: 1000
  };

  schema = {
    goldAmount: Joi.number()
      .integer()
      .min(0)
      .max(this.state.yourGoldAmount)
      .label("Sell min : 1 max : " + this.state.yourGoldAmount),
    silverAmount: Joi.number()
      .integer()
      .min(0)
      .max(this.state.yourSilverAmount)
      .label("Sell min : 1 max : " + this.state.yourSilverAmount),
    copperAmount: Joi.number()
      .integer()
      .min(0)
      .max(this.state.yourCopperAmount)
      .label("Sell min : 1 max : " + this.state.yourCopperAmount)
  };

  doSubmit = () => {
    const { data } = this.state;
    const message = {
      soldGold: data.goldAmount,
      soldSilver: data.silverAmount,
      soldCopper: data.copperAmount
    };

    if (data.goldAmount > 0) {
      this.props.sellResource("gold", data.goldAmount);
    }

    if (data.silverAmount > 0) {
      this.props.sellResource("silver", data.silverAmount);
    }

    if (data.copperAmount > 0) {
      this.props.sellResource("copper", data.copperAmount);
    }

    console.log("SOLD", message);
  };

  addResource(resource, amount) {
    console.log("RES", resource);
    console.log("Amo", amount);
    const { data } = this.state;

    switch (resource) {
      case "gold":
        data.goldAmount = data.goldAmount + amount;
        break;
      case "silver":
        data.silverAmount = data.silverAmount + amount;
        break;
      case "copper":
        data.copperAmount = data.copperAmount + amount;
        break;
      default:
        break;
    }

    this.setState({ data });
  }

  render() {
    console.log("PROPS", this.props);
    return (
      <div id="resources-form" className="container">
        <form onSubmit={this.handleSubmit}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Today Price</th>
                <th scope="col">Resource</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>${this.props.todayPrices.goldPrice}</th>
                <td>Gold</td>
                <td>{this.renderInput("goldAmount", "", "number")}</td>
                <td>
                  <i
                    className="btn btn-primary"
                    onClick={() => this.addResource("gold", 100)}
                  >
                    + 100
                  </i>
                </td>
              </tr>
              <tr>
                <th scope="row">${this.props.todayPrices.silverPrice}</th>
                <td>Silver</td>
                <td>{this.renderInput("silverAmount", "", "number")}</td>
                <td>
                  <i
                    className="btn btn-primary"
                    onClick={() => this.addResource("silver", 100)}
                  >
                    + 100
                  </i>
                </td>
              </tr>
              <tr>
                <th scope="row">${this.props.todayPrices.copperPrice}</th>
                <td>Copper</td>
                <td>{this.renderInput("copperAmount", "", "number")}</td>
                <td>
                  <i
                    className="btn btn-primary"
                    onClick={() => this.addResource("copper", 100)}
                  >
                    + 100
                  </i>
                </td>
              </tr>
            </tbody>
          </table>

          {this.renderButton("SELL")}
        </form>
      </div>
    );
  }
}

export default ResourcesForm;
