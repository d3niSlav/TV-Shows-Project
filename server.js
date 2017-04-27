// modules =================================================
var express = require('express');
var validator = require('express-validator');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');
var app = express();


// configuration ===========================================
var db = require('./config/db');
require('./config/passport');

var port = process.env.PORT || 8080;
mongoose.Promise = global.Promise;
mongoose.connect(db.url);

//app.use(express.favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());
app.use(session({
    secret: 'TvShowsRullz',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());

// routes ==================================================
require('./app/routes')(app, passport);

// start app ===============================================
app.listen(port);

console.log("App is listening on port: " + port);

module.exports = app;