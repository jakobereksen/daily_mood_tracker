const router = require('express').Router();
const userRoutes = require('./userRoutes');
const subscriberRoutes = require('./subscriberRoutes');
const logRoutes = require('./logRoutes');
const errorRoutes = require('./errorRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/users', userRoutes);
// router.use('/subscribers', subscriberRoutes);
router.use('/logs', logRoutes);
router.use('/', homeRoutes);
router.use('/', errorRoutes);

module.exports = router;