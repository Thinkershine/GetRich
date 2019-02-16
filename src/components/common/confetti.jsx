import React, { Component } from "react";

class Confetti extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      maximumParticles: this.props.particlesAmount,
      particleTypes: this.props.particleTypes, // ["circle", "circle", "triangle", "triangle", "line"],
      particleColors: [
        [238, 96, 169],
        [68, 213, 217],
        [245, 187, 152],
        [144, 148, 188],
        [235, 234, 77]
      ],
      angles: [[4, 0, 4, 4], [2, 2, 0, 4], [0, 4, 2, 2], [0, 4, 4, 4]],
      particles: [],
      confettiCanvas: this.refs.canvas,
      animate: this.props.animate !== undefined ? this.props.animate : true,
      drawn: false,
      particleSize:
        this.props.particleSize !== undefined ? this.props.particleSize : 5
    };

    this.state.img = "";
    this.state.dataURL = "";
    this.state.imageURL =
      "https://supernaturalna.pl/wp-content/uploads/2019/01/jak_schudnac_gdy_wszystko_zawodzi-1280x640.jpg";
  }

  componentDidMount() {
    this.setState({ confettiCanvas: this.refs.canvas }, () =>
      this.setState({ context: this.state.confettiCanvas.getContext("2d") })
    );

    this.setState({
      drawParticlesInterval: setInterval(this.drawParticles, 23)
    });

    // const img = this.refs.image;
    // Draw Canvas to PNG for Storing in a DB
    // const dataURL = confettiCanvas.toDataURL();
    // console.log("PNG", dataURL);

    // img.onload = () => {
    //   context.drawImage(img, 0, 0);
    //   context.font = "40px Courier";
    //   context.fillText(this.props.text, 210, 85);
    // };
  }

  componentWillUnmount() {
    console.log("Unmount");
    clearInterval(this.state.drawParticlesInterval);
  }

  drawParticles = () => {
    if (!this.state.animate && this.state.drawn) {
      return;
    }
    console.log("DRAW PARTICLES");

    const confettiCanvas = this.refs.canvas;
    const context = confettiCanvas.getContext("2d");

    const {
      maximumParticles,
      angles,
      particleColors,
      particleTypes,
      particles
    } = this.state;

    const localParticles = [...particles];
    if (localParticles.length !== maximumParticles) {
      for (let i = 0; i < maximumParticles; i += 1) {
        localParticles.push({
          xCord: Math.random() * window.innerWidth, //x-coordinate
          yCord: Math.random() * window.innerHeight, //y-coordinate
          radius: Math.random() * this.state.particleSize + 1, //radius
          density: Math.random() * maximumParticles, //density
          lineAngle: Math.floor(Math.random() * 65 + -30), // line angle
          triangleRotation: angles[Math.floor(Math.random() * angles.length)], // triangle rotation
          color:
            particleColors[Math.floor(Math.random() * particleColors.length)], // color
          shape: particleTypes[Math.floor(Math.random() * particleTypes.length)] //shape
        });
      }
    }

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < maximumParticles; i += 1) {
      var particle = localParticles[i];
      var op = particle.radius <= 3 ? 0.4 : 0.8;

      if (particle.shape === "circle") {
        context.fillStyle = "rgba(" + particle.color + ", " + op + ")";
        context.beginPath();
        context.moveTo(particle.xCord, particle.yCord);
        context.arc(
          particle.xCord,
          particle.yCord,
          particle.radius,
          0,
          Math.PI * 2,
          true
        );
        context.fill();
      } else if (particle.shape === "triangle") {
        context.fillStyle = "rgba(" + particle.color + ", " + op + ")";
        context.beginPath();
        context.moveTo(particle.xCord, particle.yCord);
        context.lineTo(
          particle.xCord + particle.radius * particle.triangleRotation[0],
          particle.yCord + particle.radius * particle.triangleRotation[1]
        );
        context.lineTo(
          particle.xCord + particle.radius * particle.triangleRotation[2],
          particle.yCord + particle.radius * particle.triangleRotation[3]
        );
        context.closePath();
        context.fill();
      } else if (particle.shape === "line") {
        context.strokeStyle = "rgba(" + particle.color + "," + op + ")";
        context.beginPath();
        context.moveTo(particle.xCord, particle.yCord);
        context.lineTo(
          particle.xCord + particle.lineAngle,
          particle.yCord + particle.radius * 5
        );
        context.lineWidth = 2;
        context.stroke();
      } else if (particle.shape === "dollar") {
        context.font = "32px Times";
        context.fillStyle =
          "rgba(" + 218 + "," + 165 + "," + 32 + "," + 1 + ")";
        context.fillText("$", particle.xCord, particle.yCord);
      }
    }

    context.font = "72px Courier";
    context.fillStyle = "rgba(" + 0 + "," + 0 + "," + 0 + "," + 1 + ")";
    context.fillText(
      this.props.text,
      window.innerWidth / 3,
      window.innerHeight / 1.3
    );

    this.setState({ particles: localParticles, drawn: true }, () =>
      this.updateParticles()
    );
  };

  updateParticles = () => {
    if (this.state.animate === false) {
      return;
    }

    const { maximumParticles, particles } = this.state;

    const localParticles = particles;

    for (let i = 0; i < maximumParticles; i += 1) {
      let particle = localParticles[i];
      particle.yCord += Math.cos(particle.density) + 1 + particle.radius / 2;
      particle.xCord += Math.sin(0) * 2;

      if (
        particle.xCord > window.innerWidth + 5 ||
        particle.xCord < -5 ||
        particle.yCord > window.innerHeight
      ) {
        localParticles[i] = {
          xCord: Math.random() * window.innerWidth,
          yCord: -10,
          radius: particle.radius,
          density: particle.density,
          lineAngle: particle.lineAngle,
          triangleRotation: particle.triangleRotation,
          color: particle.color,
          shape: particle.shape
        };
      }
    }
  };

  render() {
    return (
      <div>
        <canvas
          ref="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          id="confetti"
          className="confetti"
        />
        {/* <img ref="image" src={this.state.imageURL} className="hidden" />  */}
      </div>
    );
  }
}

export default Confetti;
