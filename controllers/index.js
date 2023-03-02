const router = require('express').Router();

const commentRoutes = require('./commentRoutes');
const goalRoutes = require('./goalRoutes');

router.use('/dashboard/comments', commentRoutes);
router.use('/dashboard/goals', goalRoutes);

module.exports = router;