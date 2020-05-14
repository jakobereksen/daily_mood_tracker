"use strict";

const chai = require("chai"),
	{expect} = chai,
	registerController = require("../controllers/registrationController"),
	chaiHTTP = require("chai-http"),
	app = require("../main");

chai.use(chaiHTTP);

describe("registrationController", () => {
	describe("/registration GET", () => {
		it("it should GET all the registrations", done => {
			chai
				.request(app)
				.get("/registration")
				.end((errors, res) => {
					expect(res).to.have.status(200);
					expect(errors).to.be.equal(null);
					done();
				});
		});
	});

	describe("getRegistrantParams", () => {
		it("should convert request body to contain the name attributes of the registration object", () => {
			var body = {
				name: "Leander Gebhardt",
				email: "leander@gebhardt.de",
				password: 12345
			};
			expect(registerController.getRegistrantsParams(body)).to.deep.include({
				name: "Leander Gebhardt"
			});
		});

		it("should return an empty object with empty request body input", () => {
			var emptyBody = {};
			expect(registerController.getRegistrantsParams(emptyBody)).to.deep.include({});
		});
	});
});
