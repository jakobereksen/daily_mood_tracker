import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Overview } from './pages/overview';

// /api/:token/...

Modal.setAppElement('#app');

const TEST_LOGS = [
	{
		_id: 123,
		referenceDate: new Date(new Date().setDate(new Date().getDate() - 1)),
		factorOfWellbeing: 4,
		annotation: 'mir gings gut',
	},
	{
		_id: 12,
		referenceDate: new Date(new Date().setDate(new Date().getDate() - 1)),
		factorOfWellbeing: 5,
		annotation: 'mir gings gut',
	},
	{
		_id: 1,
		referenceDate: new Date(new Date().setDate(new Date().getDate() - 1)),
		factorOfWellbeing: 2,
		annotation: 'mir gings gut',
	},
];

const App = () => {
	const [users, setUsers] = useState([]);
	const [token, setToken] = useState('');
	const [logs, setLogs] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		fetchLogs();
	}, []);

	const fetchLogs = () => {
		const logs = TEST_LOGS;
		setLogs(logs);

		const hasNoLogForToday =
			logs.filter((log) => {
				const first = log.referenceDate;
				const second = new Date();

				return (
					first.getFullYear() === second.getFullYear() &&
					first.getMonth() === second.getMonth() &&
					first.getDate() === second.getDate()
				);
			}).length === 0;

		if (hasNoLogForToday) {
			console.log('has no survey for today');
			// TODO: display survey here
		}
	};

	const onLogin = ({ email, password }) => {
		console.log({ email, password });

		const newToken = 'irgendeintoken';
		setToken(newToken);
		setLoggedIn(true);
	};

	const onRegister = ({ email, password, firstName, lastName, confirmPassword }) => {
		console.log({ email, password, firstName, lastName, confirmPassword });

		const newToken = 'irgendeintoken';
		setToken(newToken);
		setLoggedIn(true);
	};

	return (
		<div id="app">
			<Router>
				<Switch>
					{loggedIn ? (
						<React.Fragment>
							<Route path="/">
								<Overview logs={logs} />
							</Route>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Route path="/login">
								<Login onLogin={onLogin} />
							</Route>
							<Route path="/register">
								<Register onRegister={onRegister} />
							</Route>
						</React.Fragment>
					)}
				</Switch>
				<Modal isOpen>
					<h1>test</h1>
				</Modal>
			</Router>
		</div>
	);
};

export default App;
