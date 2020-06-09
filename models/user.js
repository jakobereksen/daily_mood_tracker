const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const randToken = require('rand-token');
const  {logSchema}  = require('./log');

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
		apiToken: {
		  type: String
		},
		logs:[logSchema],
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

userSchema.pre('save', function(next) {
	if(!this.apiToken) this.apiToken = randToken.generate(16);
	next();
});
module.exports = mongoose.model('user', userSchema);
