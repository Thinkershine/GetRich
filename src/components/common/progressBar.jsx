import React, { Component } from "react";

class ProgressBar extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    const {
      levelToDisplay,
      percentageOfCompletion,
      currentValue,
      maxValue
    } = this.props;
    return (
      <React.Fragment>
        <p>Mining Skill: {levelToDisplay}</p>
        <div className="progress w-100" style={{ height: 20 }}>
          <div
            className="progress-bar bg-success progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: percentageOfCompletion + "%" }}
            aria-valuenow={currentValue}
            aria-valuemin="0"
            aria-valuemax={maxValue}
          >
            <span style={{ textAlign: "center" }}>
              {currentValue} / {maxValue}
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProgressBar;
