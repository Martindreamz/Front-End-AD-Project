import React, { Component } from "react";
import ReactDom from "react-dom";
import './Header.css';
import { domain } from '../../Configurations/Config';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AppBar from "@material-ui/core/AppBar";

const styles = {
    title: {
        marginLeft: 20,
        flex: 1
    }
}
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
            <React.Fragment>
                <AppBar position="fixed">
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
                    {/* <Tabs variant="fullWidth" aria-lable="navs tabs example">
                        <LinkTab label="Home"></LinkTab>
                        <LinkTab label="Login"></LinkTab>
                        <LinkTab label="Department"></LinkTab>
                    </Tabs> */}
                </AppBar>
            </React.Fragment>
        )
    }
}

export default Header;