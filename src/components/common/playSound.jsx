import React, { Component } from "react";
import Sound from "react-sound";

class Music extends Component {
  state = {};

  constructor(props) {
    super(props);

    console.log("MUSIC ENTRY");
    this.state = { play: true };
    this.url = "http://localhost:3000/gold.wav";
    //this.audio = new Audio(this.url);
    this.togglePlay = this.togglePlay.bind(this);

    // this.play = this.play.bind(this);
    // this.pause = this.pause.bind(this);
  }

  togglePlay() {
    this.setState({ play: !this.state.play });
    console.log(this.audio);
    //  this.state.play ? this.audio.play() : this.audio.pause();
  }

  render() {
    return (
      <div>
        <button onClick={this.togglePlay}>
          {this.state.play ? (
            <Sound
              url="http://localhost:3000/gold.wav"
              playStatus={Sound.status.PLAYING}
            />
          ) : (
            "Play"
          )}
        </button>
      </div>
    );
  }
}

export default Music;
