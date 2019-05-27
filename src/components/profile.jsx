import React, { Component } from "react";
import Player from "../components/player";

class Profile extends Component {
  stats = [];

  render() {
    return (
      <React.Fragment>
        <div id="profile">
          <Player
            playerData={this.props.playerData}
            height={this.props.navigationHeight}
            resources={this.props.resources}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
