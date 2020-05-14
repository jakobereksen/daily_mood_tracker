"use strict";

process.env.NODE_ENV = "test";

const Registrant = require("../models/registration"),
	{ expect } = require("chai");
require("../main");

beforeEach(done => {
	Registrant.remove({}).then(() => {
		done();
	});
});

describe("SAVE registrant", () => {
	it("it should save one registrant", done => {
		let testRegistrant = new Registrant({
			name: "Anh Vu Nguyen",
			email: "anhvu@nguyen.de",
			password: 12345
		});

		testRegistrant.save().then(() => {
			Registrant.find({}).then(result => {
				expect(result.length).to.eq(1);
				expect(result[0]).to.have.property("_id");
				done();
			});
		});
	});
});