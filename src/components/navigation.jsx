import React from "react";
import { Link } from "react-router-dom";

const Navigation = props => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/mining">Mining</Link>
          <Link to="/market">Market</Link>
          <Link to="/bank">Bank</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
