const router = require('express').Router();

const commentRoutes = require('./commentRoutes');
const goalRoutes = require('./goalRoutes');

router.use('/comments', commentRoutes);
router.use('/goals', goalRoutes);

module.exports = router;