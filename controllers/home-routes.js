const router = require('express').Router();
const { ensureAuthentication } = require('../config/passport');

// authenticate the user
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/api/goals/user');
        return;
    }

    await res.render('login');
    res.status(200).json('user authorized');
});

module.exports = router;