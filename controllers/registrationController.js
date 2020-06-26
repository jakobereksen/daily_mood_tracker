const passport = require('passport');
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
	// showView: (req, res) => {
	// 	const userId = req.params.id;
	// 	User.findById(userId)
	// 		.exec()
	// 		.then((user) => {
	// 			res.render('users/show', { user });
	// 		});

	// },

	/* 	edit: (req, res, next) => {
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
	}, */

	/* 	update: (req, res, next) => {
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
	}, */

	/* 	delete: (req, res, next) => {
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
	}, */

	create: (req, res, next) => {
		if (req.skip) next();
		const newUser = new User(getUserParams(req.body));
		User.register(newUser, req.body.password, (error, user) => {
			if (user) {
				res.json({
					status: httpStatus.CREATED,
					data: {
						user,
						JWT: 'SOME_TOKEN',
					},
				});
			}
		});
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
