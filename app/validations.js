const NAME_MAX_LENGTH = 16;
const NAME_MIN_LENGTH = 6;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_REGEX = /^(?=.*[A-Za-z\d])[A-Za-z\d]*$/;

module.exports = {
    validatePasswordReset: function (req, res, next) {
        req.checkBody('password', 'Password is required!').notEmpty();
        req.checkBody('password', 'Password must be at least 6 characters!').isLength({min: PASSWORD_MIN_LENGTH});
        req.checkBody('password', 'Use letters and numbers only!').matches(PASSWORD_REGEX, 'i');
        req.checkBody('confirmPassword', 'Passwords does not match!').matches(req.body.password);

        var errors = req.validationErrors();

        if (errors) {
            var messages = {
                password: [],
                confirmPassword: []
            };

            errors.forEach(function (error) {
                messages[error.param].push(error.msg);
            });

            return res.status(400).json({error: messages});
        } else {
            return next();
        }
    },

    validatePasswordChange: function (req, res, next) {
        req.checkBody('oldPassword', 'Password is required!').notEmpty();
        req.checkBody('newPassword', 'Password is required!').notEmpty();
        req.checkBody('passwordConfirm', 'Passwords does not match!').matches(req.body.newPassword);
        req.checkBody('newPassword', 'Password must be at least 6 characters!').isLength({min: PASSWORD_MIN_LENGTH});
        req.checkBody('newPassword', 'Use letters and numbers only!').matches(PASSWORD_REGEX, 'i');

        var errors = req.validationErrors();

        if (errors) {
            var messages = {
                oldPassword: [],
                newPassword: [],
                passwordConfirm: []
            };

            errors.forEach(function (error) {
                messages[error.param].push(error.msg);
            });

            return res.status(400).json({error: messages});
        } else {
            return next();
        }
    },

    validateName: function (req, res, next) {
        req.checkBody('name', 'Your name is required!').notEmpty();
        req.checkBody('name', 'Must be at least 6 letters!').isLength({min: NAME_MIN_LENGTH});
        req.checkBody('name', 'Cannot be more than 16 letters!').isLength({max: NAME_MAX_LENGTH});

        var errors = req.validationErrors();

        if (errors) {
            var messages = {
                name: []
            };

            errors.forEach(function (error) {
                messages.name.push(error.msg);
            });

            return res.status(400).json({error: messages});
        } else {
            return next();
        }
    },

    validateEmail: function (req, res, next) {
        req.checkBody('email', 'E-mail address is required!').notEmpty();
        req.checkBody('email', 'Invalid e-mail!').isEmail();

        var errors = req.validationErrors();

        if (errors) {
            var messages = {
                email: []
            };

            errors.forEach(function (error) {
                messages.email.push(error.msg);
            });

            return res.status(400).json({error: messages});
        } else {
            return next();
        }
    },

    validateDataRegistration: function (req, res, next) {
        req.checkBody('email', 'E-mail address is required!').notEmpty();
        req.checkBody('email', 'Invalid e-mail!').isEmail();
        req.checkBody('password', 'Password is required!').notEmpty();
        req.checkBody('password', 'Password must be atleast 6 characters long!').isLength({min: PASSWORD_MIN_LENGTH});
        req.checkBody('password', 'Use letters and numbers only!').matches(PASSWORD_REGEX, 'i');
        req.checkBody('confirmPassword', 'Confirm your password!').notEmpty();
        req.checkBody('confirmPassword', 'Passwords do not match!').matches(req.body.password);

        var errors = req.validationErrors();

        if (errors) {
            var messages = {
                email: [],
                password: [],
                confirmPassword: []
            };

            errors.forEach(function (error) {
                messages[error.param].push(error.msg);
            });

            return res.status(400).json({error: messages});
        } else {
            return next();
        }
    },

    validateDataLogin: function (req, res, next) {
        req.checkBody('email', 'E-mail address is required!').notEmpty();
        req.checkBody('password', 'Password is required!').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            var messages = {
                email: '',
                password: ''
            };

            errors.forEach(function (error) {
                messages[error.param].push(error.msg);
            });

            return res.status(400).json({error: messages});
        } else {
            return next();
        }
    }
};