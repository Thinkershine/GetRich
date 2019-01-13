import React from "react";
import ResourceIcon from "./common/resourceIcon";

const Resources = props => {
  return (
    <div id="resources">
      <h2>Resources</h2>
      <table className="table">
        <tbody>
          <tr>
            <td scope="col">
              Copper
              <ResourceIcon iconType="copper" />
              {props.resources.getResourceAmount("copper")}
              <span className="resources-production">
                {" "}
                + {props.resources.copperProduction}
              </span>
            </td>
            <td scope="col">
              Silver
              <ResourceIcon iconType="silver" />
              {props.resources.getResourceAmount("silver")}
              <span className="resources-production">
                {" "}
                + {props.resources.silverProduction}
              </span>
            </td>
            <td scope="col">
              Gold
              <ResourceIcon iconType="gold" />
              {props.resources.getResourceAmount("gold")}
              <span className="resources-production">
                {" "}
                + {props.resources.goldProduction}
              </span>
            </td>
            <td scope="col">
              ${props.resources.getResourceAmount("dollar")}
              <span className="resources-production">
                {" "}
                + {props.resources.dollarProduction}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Resources;
