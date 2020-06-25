import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Register = ({ onRegister }) => {
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onRegister({ email, password, firstName, lastName, confirmPassword });
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="First Name"
					value={firstName}
					onChange={(event) => {
						setFirstName(event.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Last Name"
					value={lastName}
					onChange={(event) => {
						setLastName(event.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="E-Mail"
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Password"
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(event) => {
						setConfirmPassword(event.target.value);
					}}
				/>
				<input type="submit" />
			</form>
			<Link to="/login">Click to Login</Link>
		</div>
	);
};
