const passport = require('passport');
const jsonWebToken = require('jsonwebtoken');
const httpStatus = require('http-status-codes');
const User = require('../models/user');

const getUserParams = (body) => {
	return {
		name: {
			first: body.first,
			last: body.last,
		},
		email: body.email,
		password: body.password,
	};
};

module.exports = {
	index: (req, res, next) => {
		User.find()
			.sort({ 'name.last': 'asc' })
			.then((users) => {
				res.locals.users = users;
				next();
			})
			.catch((error) => {
				console.log(`Error fetching users: ${error.message}`);
				next(error);
			});
	},
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

	show: (req, res, next) => {
		const userId = req.params.id;
		User.findById(userId)
			.then((user) => {
				res.locals.user = user;

				next();
			})
			.catch((error) => {
				console.log(`Error fetching user by ID: ${error.message}`);
				next(error);
			});
	},

	showView: (req, res) => {
		const { user } = res.locals;

		res.render('users/show', { user });
	},

	// showView: (req, res) => {
	// 	const userId = req.params.id;
	// 	User.findById(userId)
	// 		.exec()
	// 		.then((user) => {
	// 			res.render('users/show', { user });
	// 		});

	// },

	edit: (req, res, next) => {
		const userId = req.params.id;
		res.locals.userParams = {};
		User.findById(userId)
			.then((user) => {
				res.render('users/edit', {
					user,
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
				console.log(`could not save user: ${  error.message}`);
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
		const newUser = new User(getUserParams(req.body));
		User.register(newUser, req.body.password, (error, user) => {
			if (user) {
				req.flash('success', `${user.fullName}'s account created successfully!`);
				res.locals.redirect = '/users';
				next();
				req.flash('danger', `failed to create user account because: ${error.message}`);
				res.locals.redirect = '/users/new';
				next();
			}
		});
	},

	redirectView: (req, res, next) => {
		const redirectPath = res.locals.redirect;
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
				const messages = error.array().map((e) => e.msg);
				req.skip = true;
				req.flash('error', messages.join(' and '));
				res.locals.redirect = '/users/new';
				next();
			} else {
				next();
			}
		});
	},
	apiAuthenticate: (req, res, next) => {
		passport.authenticate('local', (errors, user) => {
			if (user) {
				const signedToken = jsonWebToken.sign(
					{
						data: user._id,
						exp: new Date().setDate(new Date().getDate() + 1)
					},
					'secret_encoding_passphrase'
				);
				res.json({
					success: true,
					token: signedToken
				});
			} else
				res.json({
					success: false,
					message: 'Could not authenticate user.'
				});
		})(req, res, next);
	},
	verifyJWT: (req, res, next) => {
		const {token} = req.headers;
		if (token) {
			jsonWebToken.verify(token, 'secret_encoding_passphrase', (errors, payload) => {
				if (payload) {
					User.findById(payload.data).then(user => {
						if (user) {
							next();
						} else {
							res.status(httpStatus.FORBIDDEN).json({
								error: true,
								message: 'No User account found.'
							});
						}
					});
				} else {
					res.status(httpStatus.UNAUTHORIZED).json({
						error: true,
						message: 'Cannot verify API token.'
					});
					next();
				}
			});
		} else {
			res.status(httpStatus.UNAUTHORIZED).json({
				error: true,
				message: 'Provide Token'
			});
		}
	}
	// authenticate: passport.authenticate('local', {
	// 	failureRedirect: '/users/login',
	// 	failureFlash: 'Failed to login.',
	// 	successRedirect: '/',
	// 	successFlash: 'Logged in!',
	// }),
};
