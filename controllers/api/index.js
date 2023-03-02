const router = require('express').Router();

const goalsRoute = require('./../goalRoutes');
const commentsRoute = require('./../commentRoutes');

router.use('/goals', goalsRoute);
router.use('/comments', commentsRoute)

module.exports = router;
