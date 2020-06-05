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
const expressValidator = require('express-validator');

// Adding Passport AND Flash Messaging
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const User = require('./models/user');

router.use(cookieParser('dailymoodtracker'));
router.use(
	expressSession({
		secret: 'dailymoodtracker',
		cookie: {
			maxAge: 4000000,
		},
		resave: false,
		saveUninitialized: false,
	})
);

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(flash());
router.use(expressValidator());

router.use((req, res, next) => {
	res.locals.flashMessages = req.flash();
	res.locals.loggedIn = req.isAuthenticated();
	res.locals.currentUser = req.user;
	next();
});

// Controller
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const registrationController = require('./controllers/registrationController');
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

app.use(methodOverride('_method'));
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
router.get('/', homeController.respondWithIndex);

router.get('/statistics', homeController.showStatistics);
router.get('/questionnaire', homeController.showQuestionnaire);

router.get('/users/login', registrationController.login);
router.post('/users/login', registrationController.authenticate);

router.get('/users/logout', registrationController.logout, registrationController.redirectView);
router.get('/users', registrationController.index, registrationController.indexView);

router.get('/users/new', registrationController.new);
router.post(
	'/users',
	registrationController.validate,
	registrationController.create,
	registrationController.redirectView
);

router.get('/users/:id', registrationController.show, registrationController.showView);
router.get('/users/:id/edit', registrationController.edit);
router.put('/users/:id', registrationController.update, registrationController.redirectView);
router.delete('/users/:id', registrationController.delete, registrationController.redirectView);

router.get('/', homeController.respondWithIndex);

// json response api
// Login

// router.get('/users', userController.getAllUsers);

router.get('/user/:id', userController.getUser);
router.delete('/user/:id', userController.deleteUser);
router.post('/user/:id', userController.editUser);

router.put('/user/:id/logs', logController.saveLogForUserId);
router.get('/user/:id/logs', logController.getAllLogsFromUser);

router.get('/:myName', homeController.respondWithName);

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
