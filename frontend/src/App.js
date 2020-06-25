import React, { Component, useState, useEffect } from 'react';
import './App.css';

const App = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch('/users')
			.then((res) => res.json())
			.then((users) => setUsers(users.registrants));
	}, []);

	return (
		<div className="App">
			<h1>Users</h1>
			{users.map((user) => (
				<div key={user.id}>{user.email}</div>
			))}
		</div>
	);
};

export default App;
