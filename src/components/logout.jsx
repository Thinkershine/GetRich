import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    // Remove User Token
    localStorage.removeItem("token");
    // Refresh APP
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
