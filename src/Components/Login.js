import React, { Component } from 'react';
import './Login.css';
import { Container, CssBaseline, Button, TextField, Typography } from '@material-ui/core';
//import Header from '../Components/Headers/Header';
import axios from 'axios';
import { domain } from '../Configurations/Config';
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
					email: result
                }
            }
		})
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
		axios.post('https://localhost:5001/api/login/post', this.state.identity)
			.then(response => {
				console.log(response)
				if (response.data === "invalid") {
					//actions here
					this.setState({ displayError: true })
				}
				else {
					let obj = { id: response.data.id, name: response.data.name, role: response.data.role }
					sessionStorage.setItem("mySession", JSON.stringify(obj));
					window.location.href = domain
                }
			})
	}



	render() {
		return (

			<React.Fragment>
				{/*<Header />*/}
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