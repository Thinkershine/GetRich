import React from "react";

const Resources = props => {
  console.log("GOLD", props.resources.goldAmount);
  return (
    <div id="resources">
      <table>
        <tbody>
          <tr>
            <th>Resource</th>
            <td>Copper</td>
            <td>Silver</td>
            <td>Gold</td>
            <td>$</td>
            <td />
          </tr>
          <tr>
            <th>Amount</th>
            <td>{props.resources.getResourceAmount("copper")}</td>
            <td>{props.resources.getResourceAmount("silver")}</td>
            <td>{props.resources.getResourceAmount("gold")}</td>
            <td>{props.resources.getResourceAmount("dollar")}</td>
          </tr>
          <tr>
            <th>Production</th>
            <td>{props.resources.copperProduction}</td>
            <td>{props.resources.silverProduction}</td>
            <td>{props.resources.goldProduction}</td>
            <td>{props.resources.dollarProduction}</td>
            <td>/second</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Resources;
