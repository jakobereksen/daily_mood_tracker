// Mongoose
const mongoose = require('mongoose');

const webpush = require('web-push');

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

process.env.PUBLIC_VAPID_KEY = 'BFzlWHM4-WrQkczhEYt09VhlQuGFQoImKwVywRq6mOLhnug6zMGlIvPPTjiMCIzBX88KOPgb1ymVO5vusTllyRc';
process.env.PRIVATE_VAPID_KEY = 'Y7RHNRPkDwu4Bow4j0ZNYfhF595C72BKqNN5wC5To-s';

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
const errorController = require('./controllers/errorController');
const registrationController = require('./controllers/registrationController');
const userController = require('./controllers/userController');
const logController = require('./controllers/logController');

// process.env.DOMAIN = userController.getEmail();

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

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(layouts);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(layouts);

// Views
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
	console.log(`Server running at http://localhost:
		${app.get('port')}`);
});

// Routing
app.use('/', router);

app.post('/subscribe', (req, res) => {
	const {subscription} = req.body;
	const {userId} = req.body;
	console.dir(subscription);
	//TODO: Store subscription keys and userId in DB
	webpush.setVapidDetails(
		'mailto:lele.gebharle@web.de',
		// process.env.DOMAIN,
		process.env.PUBLIC_VAPID_KEY,
		process.env.PRIVATE_VAPID_KEY
	);
	res.sendStatus(200);
	const payload = JSON.stringify({
		// title: `Willkommen zurück ${userController.getName()}!`,
		title: 'Willkommen zurück!',
		body: 'Heute schon deinen Mood evaluiert?'
	});
	webpush.sendNotification(subscription, payload);
});

// json response api
// Login

router.post('/register', registrationController.validate, registrationController.create);
router.post('/login', registrationController.login);

/* router.get('/user/:id', userController.getUser);
router.delete('/user/:id', userController.deleteUser);
router.post('/user/:id', userController.editUser); */

router.put('/user/:id/logs', registrationController.verifyJWT, logController.saveLogForUserId);
router.get('/user/:id/logs', registrationController.verifyJWT, logController.getAllLogsFromUser);

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
