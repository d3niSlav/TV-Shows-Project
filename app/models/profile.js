var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    profileImg: { type: String, default: "/images/default-user.png" },
    dateCreated: { type: Date, default: Date.now },
    favorites: { type: Array, default: [] },
    watchList: { type: Array, default: [] }
});

module.exports = mongoose.model('Profile', profileSchema);