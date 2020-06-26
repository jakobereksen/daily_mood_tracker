const httpStatus = require('http-status-codes');
const User = require('../models/user');
const { LogEntry } = require('../models/log');

const getLogEntryParams = (body) => {
	return {
		factorOfWellbeing: body.data.factorOfWellbeing,
		annotation: body.data.annotation,
	};
};

module.exports = {
	saveLogForUserId: (req, res) => {
		const userId = req.params.id;
		const { factorOfWellbeing, annotation } = getLogEntryParams(req.body);
		const logEntry = new LogEntry({ referenceDate: new Date(), factorOfWellbeing, annotation });
		User.findById(userId)
			.then((user) => {
				user.logs.push(logEntry);
				return user.save();
			})
			.then(() => {
				res.json({ status: httpStatus.CREATED });
			});
	},

	getAllLogsFromUser: (req, res) => {
		const userId = req.params.id;
		User.findById(userId)
			.exec()
			.then((user) => {
				res.json({ status: httpStatus.OK, data: { logs: user.logs } });
			});
	},

	// edit: (req, res, next) => {
	// 	const logId = req.params.id;
	// 	LogEntry.findById(logId)
	// 		.exec()
	// 		.then((log) => {
	// 			res.locals.logEntry = log.id(logId);
	// 			res.render('logs/edit');
	// 		})
	// 		.catch((error) => {
	// 			console.log(`Error fetching user by ID: ${error.message}`);
	// 			req.flash('warning', `Error fetching user by ID: ${error.message}`);
	// 			next(error);
	// 		});
	// },

	// update: (req, res, next) => {
	// 	const logId = req.params.id;
	// 	const params = getInfo(req.body);
	//
	// 	LogEntry.findById(logId)
	// 		.exec()
	// 		.then((log) => {
	// 			const logEntry = log.id(logId);
	// 			logEntry.set(params);
	// 			return log.save();
	// 		})
	// 		.then((log) => {
	// 			res.locals.redirect = `/logs/${logId}`;
	// 			res.locals.log = log;
	// 			req.flash('success', 'Log Entry updated successfully!');
	// 			next();
	// 		})
	// 		.catch((error) => {
	// 			req.flash('warning', `Error updating user by ID: ${error.message}`);
	// 			next(error);
	// 		});
	// },

	// delete: (req, res, next) => {
	// 	const logId = req.params.id;
	// 	LogEntry.findById(userId)
	// 		.exec()
	// 		.then((log) => {
	// 			log.id(logId).remove();
	// 			log.save();
	// 			req.flash('success', 'Log Entry deleted successfully!');
	// 			res.locals.redirect = `/logs/${logId}`;
	// 			next();
	// 		})
	// 		.catch((error) => {
	// 			console.log(`Error removing logEntry by ID: ${error.message}`);
	// 			req.flash('warning', `Error removing logEntry by ID: ${error.message}`);
	// 			next();
	// 		});
	// },
};

exports.index = (req, res, next) => {
	const userId = req.params.id;
	User.findById(userId)
		.exec()
		.then((user) => {
			res.render('logs/index', { user });
		});
};
