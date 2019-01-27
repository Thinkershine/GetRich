import React from "react";

const ResourceIcon = props => {
  let classNames = "";

  switch (props.iconType) {
    case "copper":
      classNames += "copper";
      break;
    case "silver":
      classNames += "silver";
      break;
    case "gold":
      classNames += "gold";
      break;
    default:
      break;
  }

  classNames += "-mine resources-badge";

  return (
    <span className={classNames}>
      <i className="fa fa-circle" aria-hidden="true" />
    </span>
  );
};

export default ResourceIcon;
