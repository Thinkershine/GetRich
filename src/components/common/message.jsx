import React, { Component } from "react";

class Message extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  getClassNamesFor = classNamesFor => {
    console.log("IS HIDDEN", this.props.isHidden);
    let classNames = this.props.isHidden === true ? "hideReward " : "";

    switch (classNamesFor) {
      case "title":
        classNames += "message-title badge";
        break;
      case "button":
        classNames += "btn btn";
        break;
    }

    switch (this.props.badge) {
      case "success":
        classNames += "-success";
        break;
      case "primary":
        classNames += "-primary";
        break;
      case "secondary":
        classNames += "-secondary";
        break;
      case "danger":
        classNames += "-danger";
        break;
      case "warning":
        classNames += "-warning";
        break;
      case "info":
        classNames += "-info";
        break;
      case "light":
        classNames += "-light";
        break;
      case "dark":
        classNames += "-dark";
        break;
    }

    return classNames;
  };

  hide() {}

  render() {
    return (
      <div id="message" className="message">
        <h5 className={this.getClassNamesFor("title")}>
          {this.props.messageTitle}
        </h5>
        <p className="message-body">{this.props.message}</p>
        {this.props.buttonMessage && (
          <button
            onClick={this.props.buttonOnClick}
            className={this.getClassNamesFor("button")}
          >
            {this.props.buttonMessage}
          </button>
        )}
      </div>
    );
  }
}

export default Message;
