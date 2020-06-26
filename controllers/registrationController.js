const httpStatus = require('http-status-codes');
const jsonWebToken = require('jsonwebtoken');
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

const JWT_ENCODING_PASSPHRASE = 'SOME_RAND0M_STRING_LALALA';

const generateTokenForId = (id) => {
	const signedToken = jsonWebToken.sign(
		{
			data: id,
			exp: new Date().setDate(new Date().getDate() + 1),
		},
		JWT_ENCODING_PASSPHRASE
	);
	return signedToken;
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
				const signedToken = generateTokenForId(user._id);
				res.json({
					status: httpStatus.CREATED,
					data: {
						user,
						JWT: signedToken,
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

	login: (req, res, next) => {
		const { email, password } = req.body.data;

		User.findOne({ email })
			.exec()
			.then((user) => {
				console.log(user);
				if (user.password === password) {
					const signedToken = generateTokenForId(user._id);
					res.json({
						status: httpStatus.OK,
						data: {
							user,
							JWT: signedToken,
						},
					});
				} else {
					res.json({
						status: httpStatus.UNAUTHORIZED,
					});
				}
			});
	},

	/* 	apiAuthenticate: (req, res, next) => {
		passport.authenticate('local', (errors, user) => {
			if (user) {
				const signedToken = jsonWebToken.sign(
					{
						data: user._id,
						exp: new Date().setDate(new Date().getDate() + 1),
					},
					JWT_ENCODING_PASSPHRASE
				);
				res.json({
					success: true,
					token: signedToken,
				});
			} else
				res.json({
					success: false,
					message: 'Could not authenticate user.',
				});
		})(req, res, next);
	}, */

	verifyJWT: (req, res, next) => {
		const { token } = req.headers;

		try {
			const decoded = jsonWebToken.verify(token, JWT_ENCODING_PASSPHRASE);
			next();
		} catch (err) {
			res.status(httpStatus.FORBIDDEN).json({
				error: true,
				message: 'No User account found.',
			});
		}
	},
};
