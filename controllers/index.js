const router = require('express').Router();

//const commentRoutes = require('./commentRoutes');
//const goalRoutes = require('./goalRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

//router.use('/dashboard/comments', commentRoutes);
//router.use('/dashboard/goals', goalRoutes);

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;