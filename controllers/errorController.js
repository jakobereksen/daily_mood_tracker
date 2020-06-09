const httpStatus = require('http-status-codes');

exports.logErrors = (error, req, res, next) => {
	console.error(error.stack);
	next(error);
};

exports.pageNotFoundError = (req, res) => {
	const errorCode = httpStatus.NOT_FOUND;
	res.status(errorCode);
	res.render('The page does not exist!');
};

exports.internalServerError = (error, req, res, next) => {
	const errorCode = httpStatus.INTERNAL_SERVER_ERROR;
	console.log(`ERROR occurred: ${error.stack}`);
	res.status(errorCode);
	res.send(`${errorCode} | Sorry, our application is taking a nap!`);
};
