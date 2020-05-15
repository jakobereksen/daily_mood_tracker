const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
	referenceDate: { type: Date, required: true },
	factorOfWellbeing: { type: Number /* number from one to ten */, required: true },
	annotation: { type: Date },
});

logSchema.methods.getInfo = function () {
	return `referenceDate: ${this.referenceDate}, factorOfWellBeing ${this.factorOfWellbeing}${
		this.annotation ? ` , annotation: ${this.annotation}` : ''
	}`;
};

module.exports = mongoose.model('log', logSchema);
