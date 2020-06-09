// Mongoose
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const morgan = require('morgan');

// Body Parser necessery for Subscription Form
const bodyParser = require('body-parser');

// Express Integration
const layouts = require('express-ejs-layouts');
const express = require('express');

const methodOverride = require('method-override');

const router = require('./routes/index');

// Controller
// const errorController = require('./controllers/errorController');
// const homeController = require('./controllers/homeController');
// const registrationController = require('./controllers/registrationController');
// const userController = require('./controllers/userController');
// const logController = require('./controllers/logController');

// connect to database defined in MONGODB_URI
if (process.env.NODE_ENV === 'test')
	mongoose.connect('mongodb://localhost:27017/test_db', {
		useNewUrlParser: true,
		useFindAndModify: false,
	});
else
	mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dmt_user_registration', {
		useNewUrlParser: true,
		useFindAndModify: false,
	});

const db = mongoose.connection;

db.once('open', () => {
	console.log('Successfully connected to MongoDB using Mongoose!');
});

const app = express();

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(layouts);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(layouts);

// Views
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
	console.log(`Server running at http://localhost:
		${app.get('port')}`);
});

// Routing
app.use('/', router);

// json response api
// Login

// router.get('/users', userController.getAllUsers);

// router.get('/user/:id', userController.getUser);
// router.delete('/user/:id', userController.deleteUser);
// router.post('/user/:id', userController.editUser);
//
// router.put('/user/:id/logs', logController.saveLogForUserId);
// router.get('/user/:id/logs', logController.getAllLogsFromUser);
//
// router.get('/:myName', homeController.respondWithName);

app.use(
	express.urlencoded({
		extended: false,
	})
);

// Express.js
app.use(express.json());
app.use(morgan(':method :url :status * :response-timems'));

module.exports = app;
