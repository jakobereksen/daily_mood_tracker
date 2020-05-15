exports.showQuestionnaire = (req, res) => {
	res.render('questionnaire');
};

exports.showStatistics = (req, res) => {
	res.render('statistics');
};

exports.respondWithName = (req, res) => {
	const paramsName = req.params.myName;

	res.render('index', { name: paramsName });
};

exports.respondWithIndex = (req, res) => {
	res.render('index', { name: '' });
};
