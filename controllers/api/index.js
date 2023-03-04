const router = require('express').Router();

const goalsRoute = require('./goalRoutes');
const commentsRoute = require('./commentRoutes');
const usersRoute = require('./userRoutes');

router.use('/goals', goalsRoute);
router.use('/comments', commentsRoute);
router.use('/user', usersRoute);

module.exports = router;
