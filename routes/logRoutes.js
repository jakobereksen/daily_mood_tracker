const router = require('express').Router();
const logController = require('../controllers/logController');

router.get('/:id/edit', logController.edit);
router.put('/:id/update', logController.update, logController.redirectView);
router.delete('/:id', logController.delete, logController.redirectView);
router.get('/:id', logController.show, logController.showView);

module.exports = router;