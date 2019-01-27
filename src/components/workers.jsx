import React, { Component } from "react";

class Workers extends Component {
  state = {};
  render() {
    return (
      <div id="workers">
        <h2>Workers Den</h2>
        <p>Do You Need More Workers?</p>
        <button onClick={this.buyNewWorker} className="btn btn-primary">
          Hire 1 Worker
        </button>{" "}
      </div>
    );
  }
}

export default Workers;
