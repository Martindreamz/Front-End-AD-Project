import React, { Component } from 'react';
import './Login.css';

class Login extends React.Component {
	constructor() {
		super()

		this.loginAction = this.loginAction.bind(this)
	}

	loginAction() {
		//actions
		console.log("hi")
    } 

	render() {
		return (
			<div className="login">
				<form onClick={this.loginAction} >
					<div className="loginUsername">
						<input type="text" placeholder="Username" required />
					</div>
					<div className="loginPassword">
						<input type="text" placeholder="Password" required />
					</div>
					<div >
						<button className="loginButton" type="submit">LOGIN</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Login;