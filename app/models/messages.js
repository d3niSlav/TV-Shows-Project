var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    date: { type: Date, default: Date.now },
    message: { type: String, require: true },
});

module.exports = mongoose.model('Messages', messageSchema);