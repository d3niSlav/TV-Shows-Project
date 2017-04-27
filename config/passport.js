var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({ 'email': email }, function (err, user, info) {
        if (err) {
            return done(err);
        }

        if (user) {
            return done(null, false);
        }

        var newUser = new User();
        newUser.username = (req.body.email).substr(0, (req.body.email).indexOf('@'));
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save(function (err) {
            return done(null, newUser);
        });
    });
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({ 'email': email }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        if (!user.validPassword(password)) {
            return done(null, user, 'Wrong password!');
        }


        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }

            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;

            return done(null, user);
        });
    });
}));