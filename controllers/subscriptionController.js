const subscription = require('../models/subscription');

exports.deleteSubscription = (req, res) => {
	const { id } = req.params;
	subscription
		.findByIdAndDelete(id)
		.exec()
		.then(res.json({ message: 'success' }))
		.catch(() => res.error());
};

exports.getSubscription = (req, res) => {
	const { id } = req.params;

	subscription
		.findById(id)
		.exec()
		.then((foundSub) => res.json({ user: foundSub.toObject() }));
};

exports.editSubscription = (req, res) => {
	const { id } = req.params;
	const updateProperties = req.body;

	subscription.findOneAndUpdate({ _id: id }, updateProperties);
};