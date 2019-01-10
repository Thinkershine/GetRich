import React, { Component } from "react";

class ProgressBar extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  badgeClassNames(badge) {
    let classNames =
      "progress-bar progress-bar-striped progress-bar-animated bg-" + badge;

    return classNames;
  }

  render() {
    const {
      title,
      levelToDisplay,
      percentageOfCompletion,
      currentValue,
      maxValue,
      badge,
      bgColor
    } = this.props;

    return (
      <React.Fragment>
        <p>
          {title}: {levelToDisplay}
        </p>
        <div className={"progress w-100 bg-" + bgColor} style={{ height: 20 }}>
          <div
            className={this.badgeClassNames(badge)}
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
