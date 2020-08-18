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
    const iconStyle = {
      width: 35,
      height: 35,
      marginTop: 5,
      marginLeft: 15,
      marginRight: 15,
    };

    return (
      <nav className="navbar">
        <div className="brand-title">
          <HomeIcon onClick={this.homeButtonAction} style={iconStyle} />
          <p>Stationery Management System</p>
        </div>
        <a href="#" className="toggle-button" onClick={this.toggleButtonAction}>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </a>
        <div className="navbar-links">
          <ul>
            <li>
              <AccountBoxIcon style={iconStyle} />
              <a href="#">{this.state.name}</a>
            </li>
            <li>
              <ExitToAppIcon style={iconStyle} />
              <a href="#">{this.state.logState}</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
