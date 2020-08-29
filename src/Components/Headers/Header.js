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
        identity: JSON.parse(sessionStorage.getItem("mySession"))
    };
  }

  homeButtonAction = () => {
    window.location.href = domain;
  };


    //Logout event handling
    logoutAction = () => {
        sessionStorage.clear()
        window.location.href = domain
    }

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
        <div className="navbar-links">
          <ul>
            <li onClick={this.homeButtonAction}>
                        <AccountBoxIcon style={iconStyle} />
                        <a href="#">{this.state.identity != null ? this.state.identity.name : null}</a>
            </li>
            <li onClick={this.logoutAction}>
                        <ExitToAppIcon style={iconStyle} />
                        <a href="#" >{this.state.identity != null ? "Logout" : "Login"}</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
