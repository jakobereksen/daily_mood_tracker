const router = require('express').Router();
const logsController = require('../controllers/logController');
const usersController = require('../controllers/userController');

// TODO
// router.get('/logs/:id/star', logsController.star, logsController.respondJSON);
router.post('/login', usersController.apiAuthenticate);

router.get(
	'/logs',
	logsController.index,
	logsController.respondJSON
);
router.use(logsController.errorJSON);

module.exports = router;