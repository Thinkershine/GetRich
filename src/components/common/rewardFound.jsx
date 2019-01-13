import React, { Component } from "react";

class RewardFound extends Component {
  state = {
    rewardPosition: {
      top: 10 + Math.random() * 550,
      left: 10 + Math.random() * 75 + "%"
    }
  };

  constructor(props) {
    super(props);

    this.state.classNames = ["rewardStyle"];
    const classes = this.state.classNames;
    classes.push(this.props.rewardType + "-mine");

    const bigReward = 10;
    const hugeReward = 20;
    const enormousReward = 50;

    if (this.props.rewardAmount > enormousReward) {
      classes.push("enormousReward");
    } else if (this.props.rewardAmount > hugeReward) {
      classes.push("hugeReward");
    } else if (this.props.rewardAmount > bigReward) {
      classes.push("bigReward");
    }

    const classNamesWithColor = classes.join(" ");

    this.state.classNamesForRendering = classNamesWithColor;
  }

  componentWillMount() {}

  componentDidMount() {
    setTimeout(this.hideReward, 200);
  }

  hideReward = () => {
    const classes = this.state.classNames;
    classes.push("hideReward");
    const joinedClasses = classes.join(" ");

    this.setState({
      classNames: joinedClasses
    });

    setTimeout(this.props.rewardRendered, 100);
  };

  componentWillUnmount() {}

  // Generate Random Position

  render() {
    return (
      <p
        style={this.state.rewardPosition}
        className={this.state.classNamesForRendering}
      >
        {this.props.rewardAmount} {this.props.rewardType.toUpperCase()}!
      </p>
    );
  }
}

export default RewardFound;
