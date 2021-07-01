const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mySqlSession = require('express-mysql-session');

const { database } = require('./keys.js');

require('./passport')

// Initialization
const app = express()

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(morgan('dev'));
app.use(cors());
app.use(flash());
app.use(session({
    secret: 'topsecret',
    resave: false,
    saveUninitialized: false,
    store: mySqlSession(database)
}));

app.use(passport.initialize());
app.use(passport.session());

// Global
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

// Routes
app.use(require('./routes/auth.js'));

// Server

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port', process.env.PORT || 3000);
})