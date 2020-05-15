const { app, request } = require("../commonJest");

it("renders home correctly", async (done) => {

	const data = await request(app).get("/");

	expect(data.text).toMatchSnapshot();
	done();
/* 	request(app).get("/").then((response) => {
		expect(response.text).toMatchSnapshot();
		done();	
	}); */
});
