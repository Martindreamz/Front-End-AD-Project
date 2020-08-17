import React, { Component } from 'react';
import './Login.css';
import { Container, CssBaseline, Button, TextField, Typography } from '@material-ui/core';
import Header from '../Components/Headers/Header';
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

		this.loginAction = this.loginAction.bind(this)
	}

	loginAction() {
		//actions
		console.log("hi")
	}


	render() {
		return (

			<React.Fragment>
				<Header />

				<Container component="main" maxWidth="xs">
					<CssBaseline />
					
					<Typography component="h1" variant="h5" style={styles.title}>Logic University</Typography>
					<form style={styles.form} noValidate onClick={this.loginAction}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autofocus />
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="password"
							label="Password"
							type="password"
							name="password"
							autoComplete="current-password" />
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							style={styles.submit} > Log In</Button>
					</form>
				</Container>
			</React.Fragment>
		)
	}
}

export default Login;