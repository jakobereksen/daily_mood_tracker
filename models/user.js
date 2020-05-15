const mongoose = require('mongoose');

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
		email: { type: String, required: true, lowercase: true, unique: true },
		password: {
			type: String,
			required: true,
		},
		logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'log' }],
	},
	{ timestamps: true }
);

userSchema.virtual('fullName').get(function () {
	return `${this.name.first} ${this.name.last}`;
});

userSchema.methods.getInfo = function () {
	return `name: ${this.name}, email: ${this.email}`;
};

module.exports = mongoose.model('user', userSchema);
