import React from "react";
import { Link } from "react-router-dom";

const Navigation = props => {
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/equipment">
            Equipment
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/workers">
            Workers
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/achievements">
            Achievements
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/store">
            Store
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/mining">
            Mining
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/market">
            Market
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/bank">
            Bank
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
