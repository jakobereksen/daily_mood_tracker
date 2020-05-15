process.env.NODE_ENV = "test";
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../main");

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

afterAll(async () => {
	await db.close();
});

beforeEach(function (done) {

	//jest.useFakeTimers();
	// console.log('global beforeEach')
	Promise.resolve()
		.then(() => {
			// console.log('all courses deleted')
			done();
		})
		.catch(error => {
			// console.log('error caught: ' + error.message)
			done(error.message);
		});
});

module.exports = {
	app,
	request
};
