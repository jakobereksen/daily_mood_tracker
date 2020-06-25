import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Overview } from './pages/overview';
import { LogEntry } from './pages/logEntry';
import { setupNotifications } from './notifications';

// /api/:token/...

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
	const [showSurvey, setShowSurvey] = useState(false);

	useEffect(() => {
		if (loggedIn) {
			fetchData();
		}
	}, []);

	const fetchData = () => {
		fetchLogs();
		setupNotifications();
	};

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
			setShowSurvey(true);
		}
	};

	const onLogEntry = ({ factorOfWellbeing, annotation }) => {
		console.log({ factorOfWellbeing, annotation });
		setShowSurvey(false);
	};

	const onLogin = ({ email, password }) => {
		console.log({ email, password });

		const newToken = 'irgendeintoken';
		setToken(newToken);
		setLoggedIn(true);
		fetchData();
	};

	const onRegister = ({ email, password, firstName, lastName, confirmPassword }) => {
		console.log({ email, password, firstName, lastName, confirmPassword });

		const newToken = 'irgendeintoken';
		setToken(newToken);
		setLoggedIn(true);
		fetchData();
	};

	return (
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

			{showSurvey ? (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0,0,0,0.2)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							padding: 20,
							maxWidth: 500,
							width: '100%',
							backgroundColor: 'white',
							borderRadius: 6,
						}}
					>
						<LogEntry onLogEntry={onLogEntry} />
					</div>
				</div>
			) : undefined}
		</Router>
	);
};

export default App;
