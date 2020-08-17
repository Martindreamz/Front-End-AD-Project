import React, { Component } from "react";
import ReactDom from "react-dom";
import "./Header.css";
import { domain } from "../../Configurations/Config";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Daryl",
      logState: "Login",
    };
  }

  homeButtonAction = () => {
    window.location.href = domain;
  };

  toggleButtonAction = () => {
    document
      .getElementsByClassName("navbar-links")[0]
      .classList.toggle("active");
  };

  render() {
    return (
      <nav className="navbar">
        <div class="brand-title">
          <HomeIcon onClick={this.homeButtonAction} />
          Stationery Management System
        </div>
        <a href="#" class="toggle-button" onClick={this.toggleButtonAction}>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </a>
        <div class="navbar-links">
          <ul>
            <li>
              <a href="#">
                <AccountBoxIcon />
                {this.state.name}
              </a>
            </li>
            <li>
              <a href="#">
                <ExitToAppIcon />
                {this.state.logState}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
