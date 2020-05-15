const user = require('../models/user');
const log = require('../models/log');

exports.getAllLogsFromUser = (req, res) => {
	user
		.find({ email: req.body.email })
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

exports.saveLogForUser = (req, res) => {
	const { email, factorOfWellbeing, annotation } = req.body;

	const newLog = new log({
		referenceDate: Date.now(),
		factorOfWellbeing,
		annotation,
	});

	user.find({ email }).then((users) => {
		const foundUser = users[0];
		foundUser.logs.push(newLog);
		foundUser.save();
	});
};
