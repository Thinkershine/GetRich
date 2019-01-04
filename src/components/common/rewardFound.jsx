import React, { Component } from "react";

class RewardFound extends Component {
  state = {
    rewardPosition: {
      top: 500 + Math.random() * 100,
      left: 250 + Math.random() * 200
    },
    classNames: ["rewardStyle"]
  };

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

  render() {
    return (
      <p style={this.state.rewardPosition} className={this.state.classNames}>
        {this.props.rewardAmount} GOLD!
      </p>
    );
  }
}

export default RewardFound;
