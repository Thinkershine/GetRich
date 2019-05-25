import React, { Component } from "react";
import { Link } from "react-router-dom";

class DropdownNavigation extends Component {
  state = {
    isMiningDropdownOpen: false,
    isNavbarOpen: false
  };

  toggleOpenMining = e => {
    // e.preventDefault();
    this.setState({ isMiningDropdownOpen: !this.state.isMiningDropdownOpen });
  };
  toggleNavbar = () => {
    this.setState({ isNavbarOpen: !this.state.isNavbarOpen });
  };
  hideNavbar = () => {
    this.setState({ isNavbarOpen: false });
  };
  hideNavbarAndMining = mineType => {
    this.props.goMining(mineType);
    this.setState({ isNavbarOpen: false, isMiningDropdownOpen: false });
  };

  render() {
    const miningMenuClass = `dropdown-menu${
      this.state.isMiningDropdownOpen ? " show" : ""
    }`;
    const collapsibleMenuClass = `collapse navbar-collapse${
      this.state.isNavbarOpen ? " show" : ""
    }`;
    return (
      <div id="navigation">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link
            className="navbar-brand nav-item btn"
            to="/"
            onClick={this.hideNavbar}
          >
            Time to Get RICH
          </Link>
          <button
            className="navbar-toggler"
            onClick={this.toggleNavbar}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={collapsibleMenuClass} id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/" onClick={this.hideNavbar}>
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={"nav-link"}
                  to="/equipment"
                  onClick={this.hideNavbar}
                >
                  Equipment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/workers"
                  onClick={this.hideNavbar}
                >
                  Workers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/achievements"
                  onClick={this.hideNavbar}
                >
                  Achievements
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/store"
                  onClick={this.hideNavbar}
                >
                  Store
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  onClick={this.toggleOpenMining}
                  to="/mining"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Mining
                </Link>

                <div
                  className={miningMenuClass}
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    className="dropdown-item"
                    onClick={() => this.hideNavbarAndMining("gold")}
                  >
                    Gold
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => this.hideNavbarAndMining("silver")}
                  >
                    Silver
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => this.hideNavbarAndMining("copper")}
                  >
                    Copper
                  </button>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/market"
                  onClick={this.hideNavbar}
                >
                  Market
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bank" onClick={this.hideNavbar}>
                  Bank
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/register"
                  onClick={this.hideNavbar}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default DropdownNavigation;
