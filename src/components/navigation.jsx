import React from "react";
import { Link } from "react-router-dom";

const Navigation = props => {
  const classNamesForLinks = "nav-item btn btn-primary";
  return (
    <nav id="navigation">
      <ul className="nav nav-pills card-header-pills">
        <li className="nav-item">
          <Link className={classNamesForLinks} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className={classNamesForLinks} to="/equipment">
            Equipment
          </Link>
        </li>
        <li className="nav-item">
          <Link className={classNamesForLinks} to="/workers">
            Workers
          </Link>
        </li>
        <li className="nav-item">
          <Link className={classNamesForLinks} to="/achievements">
            Achievements
          </Link>
        </li>
        <li className="nav-item">
          <Link className={classNamesForLinks} to="/store">
            Store
          </Link>
        </li>
        <li className="nav-item">
          <Link className={classNamesForLinks} to="/mining">
            Mining
          </Link>
        </li>
        <li className="nav-item">
          <Link className={classNamesForLinks} to="/market">
            Market
          </Link>
        </li>
        <li className="nav-item">
          <Link className={classNamesForLinks} to="/bank">
            Bank
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
