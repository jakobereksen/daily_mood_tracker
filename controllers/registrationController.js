const Registrant = require('../models/user');

exports.getRegistrantsParams = (body) => ({
	name: body.name,
	email: body.email,
	password: body.password,
});

// TODO: here registration logic

exports.saveRegistrant = (req, res) => {
	const newRegistrant = new Registrant({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	newRegistrant
		.save()
		.then(() => {
			res.json({ message: 'success' });
		})
		.catch((error) => {
			res.send(error);
		});
};
