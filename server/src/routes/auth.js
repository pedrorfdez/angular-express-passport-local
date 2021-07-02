const express = require('express');
const router = express.Router();

const pool = require('../database');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../authentication');

router.get('/', (req, res) => {
    res.redirect('/signin');
})

router.get('/signin', isNotLoggedIn, (req, res) => {
    const form = '<h1>Login Page</h1><form method="POST" action="/signin">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});

router.post('/signin', passport.authenticate('local-signin', {successRedirect: '/profile', failureRedirect: '/signin'}));

router.get('/signup', isNotLoggedIn, (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="/signup">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br>Enter Country:<br><input type="text" name="country">\
                    <br>Enter City:<br><input type="text" name="city">\
                    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});

router.post('/signup', async (req, res, next) => {
    await pool.query('INSERT INTO users SET ?', [req.body], function (err, result, fields) {
        if (err) throw err;
        res.redirect('/signin');
    })
});

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.status(200).send(`Hi ${req.user.username}.\n You are from ${req.user.city}, ${req.user.country}`);
});

router.get('/logout', isLoggedIn,(req, res, next) => {
    req.logout();
    res.redirect('/signin');
});

module.exports = router;