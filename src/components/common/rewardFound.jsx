import React, { Component } from "react";

class RewardFound extends Component {
  state = {
    rewardPosition: {
      top: 500 + Math.random() * 100,
      left: 250 + Math.random() * 200
    }
  };

  constructor(props) {
    super(props);
    //  this.addColorClass(this.props.rewardType + "-mine");
    console.log("CONSTRUCTOR");
    this.state.classNames = ["rewardStyle"];
    const classes = this.state.classNames;
    classes.push(this.props.rewardType + "-mine");

    const classNamesWithColor = classes.join(" ");
    console.log("CLASSES", classes);

    this.state.classNamesForRendering = classNamesWithColor;
    console.log("CLASSES with name color", classNamesWithColor);
  }

  componentWillMount() {
    console.log("WILL MOUNT");
  }

  componentDidMount() {
    console.log("DID MOUNT");
    setTimeout(this.hideReward, 200);
  }

  hideReward = () => {
    const classes = this.state.classNames;
    classes.push("hideReward");
    const joinedClasses = classes.join(" ");

    console.log("NEW CLASSES", joinedClasses);
    this.setState({
      classNames: joinedClasses
    });

    setTimeout(this.props.rewardRendered, 100);
  };

  componentWillUnmount() {}

  // Generate Random Position

  render() {
    console.log("RENDER");
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
