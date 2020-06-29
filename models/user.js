const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { logSchema } = require('./log');
const { subscriptionSchema } = require('./subscription');

const userSchema = mongoose.Schema(
	{
		name: {
			first: {
				type: String,
				trim: true,
			},
			last: {
				type: String,
				trim: true,
			},
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
		},
		password: { type: String },
		logs: [logSchema],
		// subscriptions: [subscriptionSchema],
	},
	{ timestamps: true }
);

// For password hashing and storage
userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
});

userSchema.virtual('fullName').get(function () {
	return `${this.name.first} ${this.name.last}`;
});

userSchema.methods.getInfo = function () {
	return `name: ${this.name}, email: ${this.email}`;
};

// userSchema.methods.getEmail = function () {
// 	return this.email;
// };

module.exports = mongoose.model('user', userSchema);
