import React, { Component } from "react";

class Message extends Component {
  state = {};

  getClassNamesFor = classNamesFor => {
    let classNames = "";

    switch (classNamesFor) {
      case "title":
        classNames += "message-title badge";
        break;
      case "button":
        classNames += "btn btn";
        break;
      default:
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
      default:
        break;
    }

    return classNames;
  };

  hide() {}

  render() {
    return (
      <div id="message" className="message container">
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
