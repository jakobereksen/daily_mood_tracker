const router = require('express').Router();
const registrationController = require('../controllers/registrationController');

router.get('/', registrationController.index, registrationController.indexView);
router.get('/new', registrationController.new);
router.post(
	'/create',
	registrationController.validate,
	registrationController.create,
	registrationController.redirectView
);
router.get('/login', registrationController.login);
router.post('/login', registrationController.authenticate);
router.get('/logout', registrationController.logout, registrationController.redirectView);
router.get('/:id/edit', registrationController.edit);
router.put('/:id/update', registrationController.update, registrationController.redirectView);
router.get('/:id', registrationController.show, registrationController.showView);
router.delete('/:id/delete', registrationController.delete, registrationController.redirectView);

module.exports = router;