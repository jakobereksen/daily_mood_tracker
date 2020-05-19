// Mongoose

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const morgan = require('morgan');

// Body Parser necessery for Subscription Form
const bodyParser = require('body-parser');

// Express Integration
const layouts = require('express-ejs-layouts');
const express = require('express');

// Controller
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const registrationController = require('./controllers/registrationControllerOld');
const userController = require('./controllers/userController');
const logController = require('./controllers/logController');

const app = express();

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
app.get('/', homeController.respondWithIndex);

app.get('/statistics', homeController.showStatistics);
app.get('/questionnaire', homeController.showQuestionnaire);

app.get('/registrants', registrationController.getAllRegistrants);
app.get('/registration', registrationController.getRegisterPage);
app.post('/register', registrationController.saveRegistrant);

// json response api
app.get('/users', userController.getAllUsers);

app.get('/user/:id', userController.getUser);
app.delete('/user/:id', userController.deleteUser);
app.post('/user/:id', userController.editUser);

app.put('/user/:id/logs', logController.saveLogForUserId);
app.get('/user/:id/logs', logController.getAllLogsFromUser);

app.get('/:myName', homeController.respondWithName);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.use(
	express.urlencoded({
		extended: false,
	})
);

// Express.js
app.use(express.json());
app.use(morgan(':method :url :status * :response-timems'));

module.exports = app;
