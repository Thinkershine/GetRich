import React from "react";

const Resources = props => {
  return (
    <div id="resources">
      <h2>Resources</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col">Resource</th>
            <td scope="col">Copper</td>
            <td scope="col">Silver</td>
            <td scope="col">Gold</td>
            <td scope="col">$</td>
          </tr>
          <tr>
            <th scope="row">Amount</th>
            <td>{props.resources.getResourceAmount("copper")}</td>
            <td>{props.resources.getResourceAmount("silver")}</td>
            <td>{props.resources.getResourceAmount("gold")}</td>
            <td>{props.resources.getResourceAmount("dollar")}</td>
          </tr>
          <tr>
            <th scope="row">Production</th>
            <td>{props.resources.copperProduction}</td>
            <td>{props.resources.silverProduction}</td>
            <td>{props.resources.goldProduction}</td>
            <td>{props.resources.dollarProduction}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Resources;
