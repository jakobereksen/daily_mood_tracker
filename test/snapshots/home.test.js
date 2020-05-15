const { app, request } = require('../commonJest');

it('renders home correctly', async (done) => {
	const data = await request(app).get('/');
	expect(data.text).toMatchSnapshot();
	done();
});
