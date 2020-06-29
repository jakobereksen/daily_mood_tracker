const passport = require('passport');
const jsonWebToken = require('jsonwebtoken');
const httpStatus = require('http-status-codes');
const user = require('../models/user');

exports.deleteUser = (req, res) => {
	const { id } = req.params;
	user
		.findByIdAndDelete(id)
		.exec()
		.then(res.json({ message: 'success' }))
		.catch(() => res.error());
};

exports.getUser = (req, res) => {
	const { id } = req.params;

	user
		.findById(id)
		.exec()
		.then((foundUser) => res.json({ user: foundUser.toObject() }));
};

exports.getEmail = (req, res) => {
	const { id } = req.params;

	user
		.findById(id)
		.exec()
		.then((foundUser) => res(foundUser.email));
	// .then((foundUser) => res({ userProperty: foundUser.email}));
};
//
// exports.getName = (req, res) => {
// 	const { id } = req.params;
//
// 	user
// 		.findById(id)
// 		.then((foundUser) => res({ userProperty: foundUser.name}));
// };

exports.editUser = (req, res) => {
	const { id } = req.params;
	const updateProperties = req.body;

	user.findOneAndUpdate({ _id: id }, updateProperties);
};

exports.getAllUsers = (req, res) => {
	user
		.find({})
		.exec()
		.then((registrants) => {
			res.json({ registrants });
		});
};

exports.validate = (req, res, next) => {
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
};

exports.apiAuthenticate = (req, res, next) => {
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
};

exports.verifyJWT = (req, res, next) => {
	const {token} = req.headers;
	if (token) {
		jsonWebToken.verify(token, 'secret_encoding_passphrase', (errors, payload) => {
			if (payload) {
				user.findById(payload.data).then(user_ => {
					if (user_) {
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
};

exports.authenticate = passport.authenticate('local', {
	failureRedirect: '/users/login',
	failureFlash: 'Failed to login.',
	successRedirect: '/',
	successFlash: 'Logged in!',
});