const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const pool = require('./database');
const { signIn } = require('./querys/signin')

passport.use('local-signin', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    signIn(username, password, function(err, userFound) {
        if (err) {return done(err);}
        if (!userFound) {return done(null, false)}
        return done(null, userFound);
    });
}));

// Serialize/Deserialize
passport.serializeUser((user, done) => {
    console.log('SERIALIZING...');
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    await pool.query('SELECT * FROM users WHERE username = ?', [username], function(err, user, fields) {
        if (err) {done(err, user)};
        console.log('DESERIALIZING...');
        done(null, user[0]);
    });
})