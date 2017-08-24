var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Date, default: Date.now }
});

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);