var path = require('path');
var Show = require('./models/show');
var User = require('./models/user');
var Profile = require('./models/profile');
var Comment = require('./models/comment');
var Message = require('./models/message');
var validate = require('./validations');

module.exports = function(app, passport) {
    // server api routes ===========================================================
    app.get('/api/shows', function(req, res) {
        Show
            .find()
            .sort('title')
            .exec(function(err, shows) {
                if (err) {
                    res.send(err);
                }

                res.json(shows);
            });
    });

    app.get('/api/shows/catalog', function(req, res) {
        Show
            .find()
            .sort('title')
            .select('title poster released releasedDate year genre plot imdbRating')
            .exec(function(err, shows) {
                if (err) {
                    res.send(err);
                }

                res.json(shows);
            });
    });

    app.post('/api/shows/basic', function(req, res) {
        Show
            .find({ '_id': { $in: req.body.showsIds } })
            .sort('title')
            .select('title poster plot')
            .exec(function(err, shows) {
                if (err) {
                    res.send(err);
                }

                res.json(shows);
            });
    });

    app.get('/api/shows/newest', function(req, res) {
        Show
            .find()
            .sort('-releasedDate')
            .select('title poster released plot imdbRating')
            .exec(function(err, shows) {
                if (err) {
                    res.send(err);
                }

                res.json(shows);
            });
    });

    app.get('/api/shows/:startDate/:endDate', function(req, res) {
        Show.aggregate([
            { $unwind: '$seasons' },
            { $unwind: '$seasons.episodes' },
            {
                $match: {
                    'seasons.episodes.episodeDate': {
                        $gte: req.params.startDate,
                        $lte: req.params.endDate
                    }
                }
            },
            {
                $project: {
                    'title': 1,
                    'logo': 1,
                    'season': '$seasons.number',
                    'episode': '$seasons.episodes.number',
                    'date': '$seasons.episodes.episodeDate'
                }
            }
        ], function(err, shows) {
            if (err) {
                res.send(err);
            }

            res.json(shows);
        });
    });

    app.get('/api/shows/top-ten-shows', function(req, res) {
        Show
            .find()
            .sort('-imdbRating')
            .limit(10)
            .select('title poster plot imdbRating logo released')
            .exec(function(err, shows) {
                if (err) {
                    res.send(err);
                }

                res.json(shows);
            });
    });

    app.get('/api/show/:id', function(req, res) {
        Show.findOne({ '_id': req.params.id },
            function(err, show) {
                if (err) {
                    res.send(err);
                }

                res.json(show);
            }
        );
    });

    app.get('/api/users', function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });

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
        Profile.update({ userId: req.body.userId }, {
                $push: {
                    watchList: {
                        showId: req.body.showId,
                        currentSeason: 1,
                        currentEpisode: 1
                    }
                }
            },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json({ message: 'Show successfully added!' });
            });
    });

    app.put('/api/profile/removeFromWatchlist', function(req, res) {
        Profile.update({ userId: req.body.userId }, { $pull: { watchList: { showId: req.body.showId } } },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json({ message: 'Show successfully removed!' });
            });
    });

    app.put('/api/profile/updateShowProgress', function(req, res) {
        Profile.update({ userId: req.body.userId, watchList: { $elemMatch: { showId: req.body.showId } } }, { $set: { 'watchList.$.currentSeason': req.body.newSeason, 'watchList.$.currentEpisode': req.body.newEpisode } },
            function(err, show) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json({ message: 'Show successfully removed!' });
            });
    });

    app.put('/api/profile/change/name', validate.validateName, function(req, res) {
        Profile.update({ userId: req.body.userId }, { $set: { name: req.body.name } },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json({ name: req.body.name, message: 'Name successfully updated.' });
            });
    });

    app.put('/api/profile/change/email', validate.validateEmail,
        function(req, res, next) {
            User.findByIdAndUpdate(req.body.userId, { $set: { email: req.body.email } },
                function(err) {
                    if (err) {
                        res.send(err);
                    }
                    return next();
                });
        },
        function(req, res) {
            Profile.update({ userId: req.body.userId }, { $set: { email: req.body.email } },
                function(err) {
                    if (err) {
                        res.send(err);
                    }

                    res.status(200).json({ email: req.body.email, message: 'Email successfully updated.' });
                });
        });

    app.put('/api/profile/change/password', validate.validatePasswordChange,
        function(req, res, next) {
            User.findById(req.body.userId, function(err, user) {
                if (err) {
                    return done(err);
                }

                var messages = {
                    oldPassword: [],
                    newPassword: []
                };

                if (user.isPasswordCorrect(req.body.newPassword) && user.isPasswordCorrect(req.body.oldPassword)) {
                    return res.status(200).json({ message: 'Password successfully updated.' });
                }

                if (!user.isPasswordCorrect(req.body.oldPassword)) {
                    messages.oldPassword.push('Invalid password!');
                    return res.status(409).json({ error: messages });
                }

                res.locals.newEncryptedPassword = user.encryptPassword(req.body.newPassword);
                return next();
            });
        },
        function(req, res) {
            User.findByIdAndUpdate(req.body.userId, { $set: { password: res.locals.newEncryptedPassword } },
                function(err) {
                    if (err) {
                        res.send(err);
                    }

                    res.status(200).json({ message: 'Password successfully updated.' });
                });
        }
    );

    app.post('/login', validate.validateDataLogin, function(req, res, next) {
        passport.authenticate('local.login', function(err, user, info) {
            if (err) {
                return next(err)
            }

            var messages = {
                email: '',
                password: ''
            };

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
            userId: ''
        };

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

    app.post('/register', validate.validateDataRegistration, function(req, res, next) {
        passport.authenticate('local.signup', function(err, user) {
            if (err) {
                return next(err)
            }

            if (!user) {
                var messages = {
                    email: ['This e-mail is already registered!'],
                    password: [],
                    confirmPassword: []
                };

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

        return res.status(200).json({ message: 'User successfully created.' });
    });

    app.get('/api/comments', function(req, res) {
        Comment.find(function(err, comments) {
            if (err) {
                res.send(err);
            }

            res.json(comments);
        });
    });

    app.get('/api/comment/:id', function(req, res) {
        Comment.findById(req.params.id, function(err, comment) {
            if (err) {
                res.send(err);
            }

            res.json(comment);
        });
    });

    app.get('/api/comments/:showId', function(req, res) {
        Comment
            .find({ 'showId': req.params.showId })
            .sort('-date')
            .exec(function(err, comments) {
                if (err) {
                    res.send(err);
                }

                res.json(comments);
            });
    });

    app.post('/api/comments', function(req, res) {

        var newComment = new Comment();
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
        Comment.findByIdAndUpdate(req.body.commentId, { $push: { likes: req.body.userId } },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json('likeAdded');
            });
    });

    app.put('/api/comments/removeLike', function(req, res) {
        Comment.findByIdAndUpdate(req.body.commentId, { $pull: { likes: req.body.userId } },
            function(err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json('likeRemoved');
            });
    });

    app.post('/api/messages', function(req, res) {

        var newMessage = new Message();
        newMessage.name = req.body.name;
        newMessage.email = req.body.email;
        newMessage.message = req.body.message;

        newMessage.save(function(err) {
            if (err) {
                res.send(err);
            }

            return res.status(200).json(newMessage);
        });
    });

    // frontend routes =========================================================
    app.get('*', function(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public/views/') });
    });
};