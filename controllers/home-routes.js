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

// logout the user
router.get('/logout', (req, res) => {
    req.logout();
    // req.session.destroy();
    res.redirect('/');
});
module.exports = router;