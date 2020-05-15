const user = require('../models/user');
const log = require('../models/log');

exports.getAllLogsFromUser = (req, res) => {
	const { id } = req.params;

	user
		.findById(id)
		.exec()
		.then((users) => {
			const foundUser = users[0];
			const { logs } = foundUser.toObject();
			res.json({ logs });
		})
		.catch((error) => {
			console.log(error.message);
			return [];
		});
};

exports.saveLogForUserId = (req, res) => {
	const { factorOfWellbeing, annotation } = req.body;
	const { id } = req.params;

	const newLog = new log({
		referenceDate: Date.now(),
		factorOfWellbeing,
		annotation,
	});

	user
		.findById(id)
		.exec()
		.then((users) => {
			const foundUser = users[0];
			foundUser.logs.push(newLog);
			foundUser.save();
		});
};
