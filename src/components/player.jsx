import React, { Component } from "react";
import PropTypes from "prop-types";
import MyResources from "../models/myResources.js";

class Player extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      lvl: 1,
      experience: {},
      equipment: [],
      items: [],
      potions: [],
      resources: new MyResources(this.props.messenger),
      workers: [],
      achievements: [],
      seasonsCompleted: [],
      stats: {},
      profile: {},
      rank: {},
      settings: {},
      isPremium: true,
      isPlayingOnLine: false
    };
  }

  componentDidMount() {
    console.log("Game Tick");
  }

  render() {
    return (
      <div id="player">
        <h1>Thinkershine</h1>
      </div>
    );
  }
}

Player.propTypes = {
  miningEquipment: PropTypes.array
};

export default Player;
