const router = require('express').Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.respondWithIndex);
router.get('/statistics', homeController.showStatistics);
router.get('/questionnaire', homeController.showQuestionnaire);
router.get('/', homeController.respondWithIndex);

module.exports = router;