const httpStatus = require('http-status-codes');
const User = require('../models/user');
const { LogEntry } = require('../models/log');

const getLogEntryParams = (body) => {
	console.log(body);
	return {
		factorOfWellbeing: body.factorOfWellbeing,
		annotation: body.annotation,
	};
};

exports.new = (req, res, next) => {
	const userId = req.params.id;
	res.locals.userId = userId;
	User.findById(userId).then((user) => {
		res.locals.user = user;
		res.render('logs/new');
		next();
	});
};

exports.create = (req, res, next) => {
	const userId = req.params.id;
	const { factorOfWellbeing, annotation } = getLogEntryParams(req.body);
	const logEntry = new LogEntry({ referenceDate: new Date(), factorOfWellbeing, annotation });
	User.findById(userId)
		.then((user) => {
			user.logs.push(logEntry);
			return user.save();
		})
		.then((user) => {
			res.status(httpStatus.CREATED);
			req.flash('success', 'Log Entry created successfully!');
			res.locals.redirect = `/users/${userId}`;
			res.locals.user = user;
			next();
		})
		.catch((error) => {
			req.flash('warning', `Error adding log to user: ${error.message}`);
			next(error);
		});
};

exports.getLogs = (req, res) => {
	const { id } = req.params;
	LogEntry
		.findById(id)
		.exec()
		.then((foundLogs) => res.json({ user: foundLogs.toObject() }));
};

exports.getAllLogs = (req, res) => {
	LogEntry
		.find({})
		.exec()
		.then((registrants) => {
			res.json({ registrants });
		});
};

exports.edit = (req, res, next) => {
	const logId = req.params.id;
	LogEntry.findById(logId)
		.exec()
		.then((log) => {
			res.locals.logEntry = log.id(logId);
			res.render('logs/edit');
		})
		.catch((error) => {
			console.log(`Error fetching user by ID: ${error.message}`);
			req.flash('warning', `Error fetching user by ID: ${error.message}`);
			next(error);
		});
};

exports.update = (req, res, next) => {
	const logId = req.params.id;
	const params = getInfo(req.body);

	LogEntry.findById(logId)
		.exec()
		.then((log) => {
			const logEntry = log.id(logId);
			logEntry.set(params);
			return log.save();
		})
		.then((log) => {
			res.locals.redirect = `/logs/${logId}`;
			res.locals.log = log;
			req.flash('success', 'Log Entry updated successfully!');
			next();
		})
		.catch((error) => {
			req.flash('warning', `Error updating user by ID: ${error.message}`);
			next(error);
		});
};

exports.delete = (req, res, next) => {
	const logId = req.params.id;
	LogEntry.findById(userId)
		.exec()
		.then((log) => {
			log.id(logId).remove();
			log.save();
			req.flash('success', 'Log Entry deleted successfully!');
			res.locals.redirect = `/logs/${logId}`;
			next();
		})
		.catch((error) => {
			console.log(`Error removing logEntry by ID: ${error.message}`);
			req.flash('warning', `Error removing logEntry by ID: ${error.message}`);
			next();
		});
};

exports.redirectView = (req, res, next) => {
	const redirectPath = res.locals.redirect;
	if (redirectPath !== undefined) res.redirect(303, redirectPath);
	else next();
};

exports.index = (req, res, next) => {
	const userId = req.params.id;
	User.findById(userId)
		.exec()
		.then((user) => {
			res.render('logs/index', { user });
		});
};