const mongoose = require('mongoose');
const User = require('./user');

const subscriptionSchema = mongoose.Schema(
	{
		date: {
			type: Date
		}
	},
	{ timestamps: true }
);

subscriptionSchema.methods.getInfo = function () {
	return `date: ${this.date}`;
};

module.exports = mongoose.model('subscription', subscriptionSchema);