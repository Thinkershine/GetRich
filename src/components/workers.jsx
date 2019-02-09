import React, { Component } from "react";
import { getWorkers } from "../services/fakeWorkerService";
import ProgressBar from "./common/progressBar";

class Workers extends Component {
  state = {};

  renderWorkers(forHire) {
    const orderButtonStyle = { float: "left", clear: "both", margin: 5 };
    const workers = forHire ? getWorkers() : this.props.playerWorkers;

    const toRender = workers.map(worker => (
      <div key={worker._id} className="worker-data col-sm">
        <h4>{worker.name}</h4>

        {forHire == true ? (
          <React.Fragment>
            <span className="worker-stat">Mining Skill :</span>
            <span className="worker-stat-value">{worker.miningSkill}</span>
          </React.Fragment>
        ) : (
          <ProgressBar
            title="Mining Skill"
            levelToDisplay={worker.miningSkill}
            percentageOfCompletion={worker.miningSkillCurrentPercentage}
            currentValue={worker.miningSkillExperience}
            maxValue={worker.nextMiningSkillExperience}
            badge={"warning"}
            bgColor={"dark"}
            size={"small"}
            animated={true}
          />
        )}
        <br />
        <span className="worker-stat">Mining Power :</span>
        <span className="worker-stat-value">{worker.miningPower}</span>
        <br />
        <span className="worker-stat">Energy Level :</span>
        <span className="worker-stat-value">{worker.energyLevel}</span>
        <br />
        <span className="worker-stat">Energy Consumption :</span>
        <span className="worker-stat-value">{worker.energyConsumption}</span>
        <br />
        <span className="worker-stat">Energy Regeneration :</span>
        <span className="worker-stat-value">{worker.energyRegeneration}</span>
        <br />
        <span className="worker-stat">Energy Points :</span>
        <span className="worker-stat-value">{worker.energyPoints}</span>
        <br />
        <span className="worker-stat">Hourly Cost :</span>
        <span className="worker-stat-value">${worker.hourlyCost}/h</span>
        <br />
        <span className="worker-stat">Current Equipment :</span>
        <span className="worker-stat-value">
          {worker.currentEquipment != null ? "Super EQ" : "NONE"}
        </span>
        <br />

        {forHire == true ? (
          <button
            onClick={() => this.props.hireWorker(worker)}
            className="btn btn-success"
            style={orderButtonStyle}
          >
            $ Hire {worker.name} $
          </button>
        ) : (
          <div>
            <button
              onClick={() => this.props.work(worker, "gold")}
              className="btn btn-success col"
              style={orderButtonStyle}
            >
              Mine Gold
            </button>
            <button
              onClick={() => this.props.work(worker, "silver")}
              className="btn btn-success col"
              style={orderButtonStyle}
            >
              Mine Silver
            </button>
            <button
              onClick={() => this.props.work(worker, "copper")}
              className="btn btn-success col"
              style={orderButtonStyle}
            >
              Mine Copper
            </button>
          </div>
        )}
      </div>
    ));

    return toRender;
  }

  render() {
    const forHire = true;

    return (
      <div id="workers" className="container">
        <h2>Workers Den</h2>
        <p>Do You Need More Workerss?</p>
        <h3>Hire Workers</h3>
        <div className="row">{this.renderWorkers(forHire)}</div>
        {this.props.playerWorkers.length != 0 ? (
          <h3>Your Workers</h3>
        ) : (
          <h3>You Don't Hire any Workers.</h3>
        )}
        <div className="row">{this.renderWorkers()}</div>
      </div>
    );
  }
}

export default Workers;
