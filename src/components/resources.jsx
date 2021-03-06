import React from "react";
import ResourceIcon from "./common/resourceIcon";
import { formatCurrency } from "../utils/stringFormats.js";

const Resources = props => {
  return (
    <div id="resources">
      <h3>Resources</h3>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col">
              Copper
              <ResourceIcon iconType="copper" />
              {props.resources.getResourceAmount("copper")}
              <span className="resources-production">
                {" "}
                {props.resources.copperProduction !== 0 &&
                  "+ " + props.resources.copperProduction}
              </span>
            </th>
            <th scope="col">
              Silver
              <ResourceIcon iconType="silver" />
              {props.resources.getResourceAmount("silver")}
              <span className="resources-production">
                {" "}
                {props.resources.silverProduction !== 0 &&
                  "+ " + props.resources.silverProduction}
              </span>
            </th>
            <th scope="col">
              Gold
              <ResourceIcon iconType="gold" />
              {props.resources.getResourceAmount("gold")}
              <span className="resources-production">
                {" "}
                {props.resources.goldProduction !== 0 &&
                  "+ " + props.resources.goldProduction}
              </span>
            </th>
            <th scope="col">
              ${formatCurrency(props.resources.getResourceAmount("dollar"))}
              <span className="resources-production">
                {" "}
                {props.resources.dollarProduction !== 0 &&
                  "+ " + props.resources.dollarProduction}
              </span>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Resources;
