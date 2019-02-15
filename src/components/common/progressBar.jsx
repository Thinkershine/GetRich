import React, { Component } from "react";

class ProgressBar extends Component {
  state = {};

  badgeClassNames(badge, animated) {
    let classNames = "progress-bar bg-" + badge;

    if (animated) {
      classNames += " progress-bar-striped progress-bar-animated";
    }

    return classNames;
  }

  setSize(size) {
    switch (size) {
      case "small":
        return 10;
      case "medium":
        return 20;
      case "large":
        return 30;
      case "extra-large":
        return 50;
      default:
        return 20;
    }
  }

  render() {
    const {
      title,
      levelToDisplay,
      percentageOfCompletion,
      currentValue,
      maxValue,
      badge,
      bgColor,
      size,
      animated
    } = this.props;

    const trueSize = this.setSize(size);

    return (
      <React.Fragment>
        <p>
          {title}: {levelToDisplay}
        </p>
        <div
          className={"progress w-100 bg-" + bgColor}
          style={{ height: trueSize }}
        >
          <div
            className={this.badgeClassNames(badge, animated)}
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
