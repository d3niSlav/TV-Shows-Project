var path = require('path');
var Show = require('./models/show');
var User = require('./models/user');
var Profile = require('./models/profile');
var Comments = require('./models/comments');

module.exports = function(app, passport) {

    // server routes ===========================================================

    /* SHOW Get all shows, Get newest shows, Get top 10 shows, Get single show */
    app.get('/api/shows', function(req, res) {
        Show.
        find().
        sort('title').
        exec(function(err, shows) {
            if (err) {
                res.send(err);
            }

            res.json(shows);
        });
    });

    app.get('/api/shows/newest', function(req, res) {
        Show.
        find().
        sort('-releasedDate').
        exec(function(err, shows) {
            if (err) {
                res.send(err);
            }

            res.json(shows);
        });
    });

    app.get('/api/shows/top-ten-shows', function(req, res) {
        Show.
        find().
        sort('-imdbRating').
        limit(10).
        select('title imdbRating plot logo poster released').
        exec(function(err, shows) {
            if (err) {
                res.send(err);
            }

            res.json(shows);
        });
    });

    app.get('/api/show/:id', function(req, res) {
        Show.findOne({ "_id": req.params.id },
            function(err, show) {
                if (err) {
                    res.send(err);
                }

                res.json(show);
            }
        );
    });

    /* USER Get all users */

    app.get('/api/users', function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });

    /* USER PROFILES Get all profiles, Get profile by user ID, */

    app.get('/api/profiles', function(req, res) {
        Profile.find(function(err, profiles) {
            if (err) {
                res.send(err);
            }

            res.json(profiles);
        });
    });

    app.get('/api/profile/:id', function(req, res) {
        Profile.findOne({ 'userId': req.params.id }, function(err, profile) {
            if (err) {
                res.send(err);
            }

            res.json(profile);
        });
    });

    /* SHOW Favorites / Watchlist */

    app.put('/api/profile/addToFavorites', function(req, res) {
        Profile.update({ userId: req.body.userId }, { $push: { favorites: req.body.showId } },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json({ message: 'Show successfully added!' });
            });
    });

    app.put('/api/profile/removeFromFavorites', function(req, res) {
        Profile.update({ userId: req.body.userId }, { $pull: { favorites: req.body.showId } },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json({ message: 'Show successfully removed!' });
            });
    });

    app.put('/api/profile/addToWatchlist', function(req, res) {
        Profile.update({ userId: req.body.userId }, { $push: { watchList: req.body.showId } },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json({ message: 'Show successfully added!' });
            });
    });

    app.put('/api/profile/removeFromWatchlist', function(req, res) {
        Profile.update({ userId: req.body.userId }, { $pull: { watchList: req.body.showId } },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json({ message: 'Show successfully removed!' });
            });
    });

    /* USER Login, Get logged user, Logout and Registration */

    app.post('/login', validateDataLogin, function(req, res, next) {
        passport.authenticate('local.login', function(err, user, info) {
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


    app.get('/api/logged', function(req, res) {
        var user = {
            userId: ""
        }

        if (req.session.cookie.originalMaxAge !== null) {
            user.userId = req.session.passport.user;
        }

        res.json(JSON.stringify(user));
    });

    app.get('/logout', function(req, res) {
        req.logout();
        req.session.destroy(function(err) {
            res.status(200).json({ message: 'Logout succes!' });
        });
    });

    app.post('/register', validateDataRegistration, function(req, res, next) {
        passport.authenticate('local.signup', function(err, user, info) {
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
    }, function(req, res, next) {

        var userProfile = new Profile();
        userProfile.userId = res.locals.user._id;
        userProfile.email = res.locals.user.email;
        userProfile.name = res.locals.user.username;

        userProfile.save(function(err) {
            return next(err);
        });

        return res.status(201).json({ message: 'User successfully created.' });
    });

    /* COMMENTS Get all comments */
    app.get('/api/comments', function(req, res) {
        Comments.find(function(err, comments) {
            if (err) {
                res.send(err);
            }
            res.json(comments);
        });
    });

    app.get('/api/comment/:id', function(req, res) {
        Comments.findById(req.params.id, function(err, comment) {
            if (err) {
                res.send(err);
            }

            res.json(comment);
        });
    });

    app.get('/api/comments/:showId', function(req, res) {
        Comments
            .find({ "showId": req.params.showId })
            .sort('-date')
            .exec(function(err, comments) {
                if (err) {
                    res.send(err);
                }

                res.json(comments);
            });
    });

    app.post('/api/comments', function(req, res) {

        var newComment = new Comments();
        newComment.userId = req.body.userId;
        newComment.showId = req.body.showId;
        newComment.text = req.body.text;

        newComment.save(function(err) {
            if (err) {
                res.send(err);
            }

            return res.status(200).json(newComment);
        });
    });

    app.put('/api/comments/addLike', function(req, res) {
        Comments.findByIdAndUpdate(req.body.commentId, { $push: { likes: req.body.userId } },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json('likeAdded');
            });
    });

    app.put('/api/comments/removeLike', function(req, res) {
        Comments.findByIdAndUpdate(req.body.commentId, { $pull: { likes: req.body.userId } },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json('likeRemoved');
            });
    });

    // frontend routes =========================================================
    app.get('*', function(req, res) {
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

        errors.forEach(function(error) {
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

        errors.forEach(function(error) {
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