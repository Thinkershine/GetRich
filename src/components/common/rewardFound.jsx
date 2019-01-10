import React, { Component } from "react";

class RewardFound extends Component {
  state = {
    rewardPosition: {
      top: 500 + Math.random() * 250,
      left: 10 + Math.random() * 75 + "%"
    }
  };

  constructor(props) {
    super(props);
    //  this.addColorClass(this.props.rewardType + "-mine");
    this.state.classNames = ["rewardStyle"];
    const classes = this.state.classNames;
    classes.push(this.props.rewardType + "-mine");

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
