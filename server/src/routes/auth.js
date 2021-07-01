const express = require('express');
const router = express.Router();

const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../authentication'); // CREO QUE NO ES NECESARIO, DEBERIA HACERLO YA ANGULAR

router.post('/signin', passport.authenticate('local-signin'), (req, res) => {
    console.log(`req.user: ${JSON.stringify(req.user)}`);
    console.log(`req.sessionID: ${JSON.stringify(req.sessionID)}`);
    console.log(`req.session: ${JSON.stringify(req.session)}`);
    res.status(200).json({
        message: `successfully logged in as ${req.user.username}`,
        user: req.user
    });
});

module.exports = router;