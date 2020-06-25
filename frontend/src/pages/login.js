import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = ({ onLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onLogin({ email, password });
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
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

				<input type="submit" />
			</form>

			<Link to="/register">Click to Register</Link>
		</div>
	);
};
