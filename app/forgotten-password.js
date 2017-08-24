var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var async = require('async');
var crypto = require('crypto');
var mailCredentials = require('../config/mail-authentication');
var User = require('./models/user');
var validate = require('./validations');


const RESET_TOKEN_MAX_AGE = 60 * 60 * 1000;

module.exports = function (app, port) {
    app.post('/forgot', function (req, res, next) {
        async.waterfall([
            function (callback) {
                crypto.randomBytes(20, function (err, buf) {
                    var resetToken = buf.toString('hex');
                    callback(err, resetToken);
                });
            },

            function (resetToken, callback) {
                User.findOne({'email': req.body.email}, function (err, user) {
                    if (!user) {
                        return res.status(400).json({error: 'Invalid e-mail address!'});
                    }

                    user.passwordResetToken = resetToken;
                    user.passwordResetExpires = Date.now() + RESET_TOKEN_MAX_AGE;

                    user.save(function (err) {
                        callback(err, resetToken, user);
                    });
                });
            },

            function (resetToken, user, callback) {
                var smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: mailCredentials.auth.user,
                        pass: mailCredentials.auth.pass
                    }
                });

                var mailOptions = {
                    to: user.email,
                    from: 'TV-Shows for U' + '<' + mailCredentials.auth.user + '>',
                    subject: 'TV-Show Password Reset Token',
                    text: 'You have requested a password reset. Here is yout reset token.\n\n' +
                    'Click the link to complete the process.\n' +
                    'http://' + req.hostname + ':' + port + '/reset-password/' + resetToken + '\n\n'
                };

                smtpTransport.sendMail(mailOptions, function (err) {
                    return callback(err, user);
                });
            }
        ], function (err) {
            if (err) {
                return next(err);
            }

            res.status(200).json({message: 'Link was sent to your email!'});
        });
    });

    app.post('/reset/:token', validate.validatePasswordReset, function (req, res) {
        async.waterfall([
            function (callback) {
                User.findOne({
                        passwordResetToken: req.params.token,
                        passwordResetExpires: {$gt: Date.now()}
                    },

                    function (err, user) {
                        if (!user) {
                            return res.status(401).json({error: {password: ['Password reset token expired or invalid!']}});
                        }

                        user.password = user.encryptPassword(req.body.password);
                        user.passwordResetToken = undefined;
                        user.passwordResetExpires = undefined;

                        user.save(function (err) {
                            callback(err, user);
                        })
                    }
                );
            },

            function (user, callback) {
                var smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: mailCredentials.auth.user,
                        pass: mailCredentials.auth.pass
                    }
                });

                var mailOptions = {
                    to: user.email,
                    from: 'TV-Shows for U' + '<' + mailCredentials.auth.user + '>',
                    subject: 'TV-Shows Password Change',
                    text: 'The password for ' + user.email + ' has been updated successfully.'
                };

                smtpTransport.sendMail(mailOptions, function (err) {
                    callback(err, user);
                    return res.status(200).json({message: 'Password changed successfully!'});
                });
            }
        ]);
    });
};