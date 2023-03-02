const router = require('express').Router();
const { ensureAuthentication } = require('../config/passport');

// authenticate the user
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/api/goals/user');
        return;
    }

    res.render('login');
});

module.exports = router;