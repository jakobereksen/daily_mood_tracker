const user = require('../models/user');

exports.deleteUser = (req, res) => {
	const { id } = req.params;
	user
		.findByIdAndDelete(id)
		.exec()
		.then(res.json({ message: 'success' }))
		.catch(() => res.error());
};

exports.getUser = (req, res) => {
	const { id } = req.params;

	user
		.findById(id)
		.exec()
		.then((foundUser) => res.json({ user: foundUser.toObject() }));
};

exports.editUser = (req, res) => {
	const { id } = req.params;
	const updateProperties = req.body;

	user.findOneAndUpdate({ _id: id }, updateProperties);
};

exports.getAllUsers = (req, res) => {
	user
		.find({})
		.exec()
		.then((registrants) => {
			res.json({ registrants });
		});
};
