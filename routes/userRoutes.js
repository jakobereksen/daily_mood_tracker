const router = require('express').Router();
const userController = require('../controllers/userController');
const logController = require('../controllers/logController');

router.get('/', userController.index, userController.indexView);
router.get('/new', userController.new);
router.post(
	'/',
	userController.validate,
	userController.create,
	userController.redirectView
);
router.get('/login', userController.login);
router.post('/login', userController.authenticate);
router.get('/logout', userController.logout, userController.redirectView);
router.get('/:id/edit', userController.edit);
router.put('/:id/update', userController.update, userController.redirectView);
router.get('/:id/logs',logController.index);
router.get('/:id/logs/new',logController.new);
router.post(
	'/:id/logs/new'
	,logController.create
	,logController.redirectView);
router.get('/:id', userController.show, userController.showView);
router.delete('/:id/delete', userController.delete, userController.redirectView);

module.exports = router;