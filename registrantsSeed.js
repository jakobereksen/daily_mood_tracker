const mongoose = require('mongoose');
const Registrant = require('./models/registration');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe_db', {
	useNewUrlParser: true,
});

Registrant.remove({})
	.then(() => {
		return Registrant.create({
			name: 'Lioba Waldburg',
			email: 'lioba@waldburg.de',
			password: 12345,
		});
	})
	.then((Registrant) => console.log(Registrant.name))
	.then(() => {
		return Registrant.create({
			name: 'Jakob Erek Sen',
			email: 'jakoberek@sen.de',
			password: 12345,
		});
	})
	.then((Registrant) => console.log(Registrant.name))
	.then(() => {
		return Registrant.create({
			name: 'Leander Gebhardt',
			email: 'leander@gebhardt.de',
			password: 12345,
		});
	})
	.then((Registrant) => console.log(Registrant.name))
	.then(() => {
		return Registrant.create({
			name: 'Anh Vu Nguyen',
			email: 'anhvu@nguyen.de',
			password: 12345,
		});
	})
	.then((Registrant) => console.log(Registrant.name))
	.catch((error) => console.log(error.message))
	.then(() => {
		console.log('DONE');
		mongoose.connection.close();
	});
