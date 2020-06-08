const router = require('express').Router();
const logController = require('../controllers/logController');

router.get('/:id/edit', logController.edit);
router.get('/user/:id/logs',logController.index);
router.put('/logs/:id', logController.update, logController.redirectView);
router.delete('/logs/:id', logController.delete, logController.redirectView);
router.put('/user/:id/logs', logController.create, logController.redirectView);

module.exports = router;