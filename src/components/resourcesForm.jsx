import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import ResourceIcon from "./common/resourceIcon";

class ResourcesForm extends Form {
  state = {
    data: { goldAmount: 0, silverAmount: 0, copperAmount: 0 },
    errors: "",
    yourGoldAmount: this.props.availableResources.currentGoldAmount,
    yourSilverAmount: this.props.availableResources.currentSilverAmount,
    yourCopperAmount: this.props.availableResources.currentCopperAmount
  };

  schema = {
    goldAmount: Joi.number()
      .integer()
      .min(0)
      .max(this.state.yourGoldAmount)
      .label("You Only Have : " + this.state.yourGoldAmount + " Gold"),
    silverAmount: Joi.number()
      .integer()
      .min(0)
      .max(this.state.yourSilverAmount)
      .label("You Only Have : " + this.state.yourSilverAmount + " Silver"),
    copperAmount: Joi.number()
      .integer()
      .min(0)
      .max(this.state.yourCopperAmount)
      .label("You Only Have : " + this.state.yourCopperAmount + " Copper")
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
    const { data } = this.state;

    switch (resource) {
      case "gold":
        let newGoldAmount = parseInt(data.goldAmount) + amount;
        if (newGoldAmount > this.state.yourGoldAmount) {
          newGoldAmount = this.state.yourGoldAmount;
        }

        data.goldAmount = newGoldAmount;
        break;
      case "silver":
        let newSilverAmount = parseInt(data.silverAmount) + amount;
        if (newSilverAmount > this.state.yourSilverAmount) {
          newSilverAmount = this.state.yourSilverAmount;
        }

        data.silverAmount = newSilverAmount;
        break;
      case "copper":
        let newCopperAmount = parseInt(data.copperAmount) + amount;
        if (newCopperAmount > this.state.yourCopperAmount) {
          newCopperAmount = this.state.yourCopperAmount;
        }

        data.copperAmount = newCopperAmount;
        break;
      default:
        break;
    }

    this.setState({ data });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.availableResources.currentGoldAmount !==
        this.props.availableResources.currentGoldAmount ||
      nextProps.availableResources.currentSilverAmount !==
        this.props.availableResources.currentSilverAmount ||
      nextProps.availableResources.currentCopperAmount !==
        this.props.availableResources.currentCopperAmount
    ) {
      this.setState({
        yourGoldAmount: nextProps.availableResources.currentGoldAmount,
        yourSilverAmount: nextProps.availableResources.currentSilverAmount,
        yourCopperAmount: nextProps.availableResources.currentCopperAmount
      });

      this.schema = {
        goldAmount: Joi.number()
          .integer()
          .min(0)
          .max(nextProps.availableResources.currentGoldAmount)
          .label(
            "You Only Have : " +
              nextProps.availableResources.currentGoldAmount +
              " Gold"
          ),
        silverAmount: Joi.number()
          .integer()
          .min(0)
          .max(nextProps.availableResources.currentSilverAmount)
          .label(
            "You Only Have : " +
              nextProps.availableResources.currentSilverAmount +
              " Silver"
          ),
        copperAmount: Joi.number()
          .integer()
          .min(0)
          .max(nextProps.availableResources.currentCopperAmount)
          .label(
            "You Only Have : " +
              nextProps.availableResources.currentCopperAmount +
              " Copper"
          )
      };
    }
  }

  render() {
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
                <td>
                  <b>Gold</b> <ResourceIcon iconType="gold" />
                </td>
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
                <td>
                  <b>Silver</b> <ResourceIcon iconType="silver" />
                </td>
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
                <td>
                  <b>Copper</b> <ResourceIcon iconType="copper" />
                </td>
                <td style={{ width: 150 }}>
                  {this.renderInput("copperAmount", "", "number")}
                </td>
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
