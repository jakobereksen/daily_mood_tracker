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
	const [token, setToken] = useState('');
	const [user, setUser] = useState(null);
	const [logs, setLogs] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const [showSurvey, setShowSurvey] = useState(false);

	useEffect(() => {
		if (loggedIn && user) {
			fetchLogsForId(user._id).then((newLogs) => {
				setLogs(newLogs);
				setupNotifications();
			});
		}
	}, []);

	useEffect(() => {
		if (loggedIn && user) {
			fetchLogsForId(user._id).then((newLogs) => {
				setLogs(newLogs);
				setupNotifications();
			});
		}
	}, [loggedIn]);

	useEffect(() => {
		console.log('logs changed');
		if (loggedIn && getShouldShowSurvey(logs)) {
			setShowSurvey(true);
		} else {
			setShowSurvey(false);
		}
	}, [logs]);

	const fetchLogsForId = async (id) => {
		const logsResponse = await fetch(`/user/${id}/logs`);
		const logsParsed = await logsResponse.json();

		return logsParsed.data.logs;
	};

	const getShouldShowSurvey = (logs) => {
		const hasNoLogForToday =
			logs.filter((log) => {
				console.log(log);
				const first = new Date(log.referenceDate);
				const second = new Date();
				console.log({ first, second });

				return (
					first.getFullYear() === second.getFullYear() &&
					first.getMonth() === second.getMonth() &&
					first.getDate() === second.getDate()
				);
			}).length === 0;

		if (hasNoLogForToday) {
			return true;
		} else {
			return false;
		}
	};

	const onLogEntry = async ({ factorOfWellbeing, annotation }) => {
		await fetch(`/user/${user._id}/logs`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: { factorOfWellbeing, annotation } }),
		});
		const newLogs = await fetchLogsForId(user._id);
		setLogs(newLogs);
	};

	const onLogin = async ({ email, password }) => {
		const newToken = 'irgendeintoken';
		setToken(newToken);
		setLoggedIn(true);
	};

	const onRegister = async ({ email, password, firstName, lastName, confirmPassword }) => {
		const res = await fetch(`/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: {
					first: firstName,
					last: lastName,
				},
				email,
				password,
			}),
		});

		const resParsed = await res.json();

		setToken(resParsed.data.JWT);
		setUser(resParsed.data.user);
		setLoggedIn(true);
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
