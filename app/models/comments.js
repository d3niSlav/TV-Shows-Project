var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    userId: { type: String, require: true },
    date: { type: Date, default: Date.now },
    text: { type: String, require: true },
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Comment', commentSchema);