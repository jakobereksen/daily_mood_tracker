const User = require('../models/user');
const passport = require('passport');
const { body, check } = require('express-validator');

const getUserParams = (body) => {
	return {
		name: body.name,
		email: body.email,
		password: body.password,
	};
};

module.exports = {
	indexView: (req, res) => {
		User.find({})
			.exec()
			.then((users) => {
				res.render('users/index', { users });
			});
	},

	new: (req, res) => {
		res.locals.user = new User();
		req.flash('success', 'You have been signed up!');
		res.render('users/new');
	},

	login: (req, res) => {
		res.render('users/login');
	},

	logout: (req, res, next) => {
		req.logout();
		req.flash('success', 'You have been logged out!');
		res.locals.redirect = '/';
		next();
	},

	showView: (req, res) => {
		res.render('users/show');
	},

	edit: (req, res, next) => {
		const userId = req.params.id;
		res.locals.userParams = {};
		User.findById(userId)
			.then((user) => {
				res.render('users/edit', {
					user: user,
				});
			})
			.catch((error) => {
				console.log(`Error fetching user by ID: ${error.message}`);
				next(error);
			});
	},

	update: (req, res, next) => {
		const userId = req.params.id;
		const userParams = getUserParams(req.body);

		User.updateOne({ _id: userId }, userParams)
			.then((user) => {
				res.locals.redirect = `/users/${userId}`;
				res.locals.user = user;
				next();
			})
			.catch((error) => {
				console.log('could not save user: ' + error.message);
				req.flash('error', `Error updating user by ID: ${error.message}`);
				res.locals.redirect = `/users/${userId}/edit`;
				next();
			});
	},

	delete: (req, res, next) => {
		const userId = req.params.id;
		User.findByIdAndRemove(userId)
			.then(() => {
				res.locals.redirect = '/users';
				next();
			})
			.catch((error) => {
				console.log(`Error deleting user by ID: ${error.message}`);
				next();
			});
	},

	create: (req, res, next) => {
		if (req.skip) next();
		let newUser = new User(getUserParams(req.body));
		User.register(newUser, req.body.password, (error, user) => {
			if (user) {
				req.flash('success', `${user.fullName}'s account created successfully!`);
				res.locals.redirect = '/users';
				next();
				req.flash('danger', `failed to create user account because: ${e.message}`);
				res.locals.redirect = '/users/new';
				next();
			}
		});
	},

	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath) res.redirect(redirectPath);
		else next();
	},

	validate: (req, res, next) => {
		req
			.sanitizeBody('email')
			.normalizeEmail({
				all_lowercase: true,
			})
			.trim();
		req.check('email', 'Email is invalid').isEmail();
		req.check('password', 'Password cannot be empty').notEmpty();
		req.getValidationResult().then((error) => {
			if (!error.isEmpty()) {
				let messages = error.array().map((e) => e.msg);
				req.skip = true;
				req.flash('error', messages.join(' and '));
				res.locals.redirect = '/users/new';
				next();
			} else {
				next();
			}
		});
	},

	authenticate: passport.authenticate('local', {
		failureRedirect: '/users/login',
		failureFlash: 'Failed to login.',
		successRedirect: '/',
		successFlash: 'Logged in!',
	}),
};
