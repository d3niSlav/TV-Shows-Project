var path = require('path');
var Show = require('./models/show');
var User = require('./models/user');
var Profile = require('./models/profile');
var Comments = require('./models/comments');

module.exports = function (app, passport) {

    // server routes ===========================================================
    app.get('/api/shows', function (req, res) {
        Show.
            find().
            sort('title').
            exec(function (err, shows) {
                if (err) {
                    res.send(err);
                }

                res.json(shows);
            });
    });

    app.get('/api/shows/newest', function (req, res) {
        Show.
            find().
            sort('-releasedDate').
            exec(function (err, shows) {
                if (err) {
                    res.send(err);
                }

                res.json(shows);
            });
    });

    app.get('/api/shows/top-ten-shows', function (req, res) {
        Show.
            find().
            sort('-imdbRating').
            limit(10).
            select('title imdbRating plot logo poster released').
            exec(function (err, shows) {
                if (err) {
                    res.send(err);
                }

                res.json(shows);
            });
    });

    app.get('/api/show/:id', function (req, res) {
        Show.findOne({ "_id": req.params.id },
            function (err, show) {
                if (err) {
                    res.send(err);
                }

                res.json(show);
            }
        );
    });

    app.get('/api/users', function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });

    app.get('/api/profiles', function (req, res) {
        Profile.find(function (err, profiles) {
            if (err) {
                res.send(err);
            }

            res.json(profiles);
        });
    });

    app.get('/api/profile/:id', function (req, res) {
        Profile.findOne({ 'userId': req.params.id }, function (err, profile) {
            if (err) {
                res.send(err);
            }

            res.json(profile);
        });
    });

    app.post('/register', validateDataRegistration, function (req, res, next) {
        passport.authenticate('local.signup', function (err, user, info) {
            if (err) {
                return next(err)
            }

            if (!user) {
                var messages = {
                    email: ['This e-mail is already registered!'],
                    password: [],
                    confirmPassword: []
                }
                return res.status(409).json({ error: messages });
            }
            res.locals.user = user;
            return next();
        })(req, res, next);
    }, function (req, res, next) {

        var userProfile = new Profile();
        userProfile.userId = res.locals.user._id;
        userProfile.name = res.locals.user.username;

        userProfile.save(function (err) {
            return next(err);
        });

        return res.status(201).json({ message: 'User successfully created.' });
    });

    app.post('/login', validateDataLogin, function (req, res, next) {
        passport.authenticate('local.login', function (err, user, info) {
            if (err) {
                return next(err)
            }

            var messages = {
                email: "",
                password: ""
            }

            if (!user) {
                messages.email = 'User with this e-mail is not registered!';
                return res.status(409).json({ error: messages });
            }

            if (info) {
                messages.password = info;
                return res.status(409).json({ error: messages });
            }

            return res.status(200).json({ userId: user._id });
        })(req, res, next);
    });

    app.get('/api/comments', function (req, res) {
        Comments.find(function (err, comments) {
            if (err) {
                res.send(err);
            }
            res.json(comments);
        });
    });

    app.get('/api/logged', function (req, res) {
        var user = {
            userId: ""
        }

        if (req.session.cookie.originalMaxAge !== null) {
            user.userId = req.session.passport.user;
        }

        res.json(JSON.stringify(user));
    });

    app.get('/logout', function (req, res) {
        req.logout();
        req.session.destroy(function (err) {
            res.status(200).json({ message: 'Logout succes!' });
        });
    });

    // frontend routes =========================================================
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public/views/') });
    });
};

function validateDataRegistration(req, res, next) {
    req.checkBody('email', 'E-mail address is required!').notEmpty();
    req.checkBody('email', 'Invalid e-mail!').isEmail();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('password', 'Password must be atleast 6 characters long!').isLength({ min: 6 });
    req.checkBody('confirmPassword', 'Confirm your password!').notEmpty();
    req.checkBody('confirmPassword', 'Passwords do not match!').matches(req.body.password);

    errors = req.validationErrors();


    if (errors) {
        var messages = {
            email: [],
            password: [],
            confirmPassword: []
        }

        errors.forEach(function (error) {
            switch (error.param) {
                case 'email':
                    messages.email.push(error.msg);
                    break;
                case 'password':
                    messages.password.push(error.msg);
                    break;
                case 'confirmPassword':
                    messages.confirmPassword.push(error.msg);
                    break;
            }
        });

        return res.status(400).json({ error: messages });
    } else {
        return next();
    }
}

function validateDataLogin(req, res, next) {
    req.checkBody('email', 'E-mail address is required!').notEmpty();
    req.checkBody('password', 'Password is required!').notEmpty();

    errors = req.validationErrors();

    if (errors) {
        var messages = {
            email: "",
            password: ""
        }

        errors.forEach(function (error) {
            switch (error.param) {
                case 'email':
                    messages.email = error.msg;
                    break;
                case 'password':
                    messages.password = error.msg;
                    break;
            }
        });

        return res.status(400).json({ error: messages });
    } else {
        return next();
    }
}