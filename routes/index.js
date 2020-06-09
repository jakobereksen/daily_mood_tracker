const express = require('express');
const expressValidator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const User = require('../models/user');

const router = express.Router();

const userRoutes = require('./userRoutes');
const logRoutes = require('./logRoutes');
const errorRoutes = require('./errorRoutes');
const homeRoutes = require('./homeRoutes');

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

router.use('/users', userRoutes);
// router.use('/subscribers', subscriberRoutes);
router.use('/logs', logRoutes);
router.use('/', homeRoutes);
router.use('/', errorRoutes);

module.exports = router;
