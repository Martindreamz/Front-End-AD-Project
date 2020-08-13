import React, { Component } from "react";
import ReactDom from "react-dom";
import './Header.css';
import { domain } from '../../Configurations/Config';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "Daryl",
            logState: "Login"
        }
    }

    homeButtonAction = () => {
        window.location.href = domain
    }

    render() {
        return (
            <nav className="header">
                <HomeIcon onClick={this.homeButtonAction} />
                <div className="userHeader">
                    <div className="userHeaderName">
                        <AccountBoxIcon />
                        <p>{this.state.name}</p>
                    </div>
                    <div className="userHeaderState">
                        <ExitToAppIcon />
                        <p>{this.state.logState}</p>
                    </div>
                </div>
            </nav>
        )
    }
} 

export default Header;