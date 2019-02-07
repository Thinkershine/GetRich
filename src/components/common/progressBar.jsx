import React, { Component } from "react";

class ProgressBar extends Component {
  state = {};

  badgeClassNames(badge) {
    let classNames =
      "progress-bar progress-bar-striped progress-bar-animated bg-" + badge;

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
        break;
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
      size
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
