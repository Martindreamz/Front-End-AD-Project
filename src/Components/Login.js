import React, { Component } from 'react';
import './Login.css';
import { Container, CssBaseline, Button, TextField, Typography } from '@material-ui/core';
import Header from '../Components/Headers/Header';
import axios from 'axios';
import userprofile from '../UserProfile';
//import classes from '*.module.scss';

const styles = {
	form: {
		width: '100%',
		marginTop: 30,
	},
	submit: {
		margin: (3, 0, 2),
	},
	title: {
		marginTop: 80,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 50
	}
};

class Login extends React.Component {
	constructor() {
		super()

		this.state = {
			identity: {
				username: "",
				password: ""
			},
			displayError: false
        }

		this.loginAction = this.loginAction.bind(this)
	}

	usernameInput = (event) => {
		const result = event.target.value
		this.setState(prevState => {
			const record = prevState.identity
			return {
				identity: {
					...record,
					username: result
                }
            }
		})
		console.log(this.state.identity)
	}
	passwordInput = (event) => {
		const result = event.target.value
		this.setState(prevState => {
			const record = prevState.identity
			return {
				identity: {
					...record,
					password: result
				}
			}
		})
	}

	loginAction(event) {
		//actions
		axios.post(/*api here*/"", this.state.identity)
			.then(response => {
				if (response === "invalid") {
					//actions here
					this.setState({ displayError: true })
				}
				else {
					userprofile.setSession(response.id, response.name, response.role)
					//redirect
                }
            })
	}



	render() {
		return (

			<React.Fragment>
				<Header />
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					
					<Typography component="h1" variant="h5" style={styles.title}>Logic University</Typography>
					<div style={styles.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autofocus
							onChange={this.usernameInput} />
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="password"
							label="Password"
							type="password"
							name="password"
							autoComplete="current-password"
							onChange={this.passwordInput} />
						{this.state.displayError ? <p>Invalid username or password</p> : null}
						<Button
							fullWidth
							variant="contained"
							color="primary"
							style={styles.submit}
							onClick={this.loginAction}> Log In</Button>
					</div>
				</Container>
			</React.Fragment>
		)
	}
}

export default Login;