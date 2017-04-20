var mongoose = require('mongoose');

module.exports = mongoose.model('Show', {
    title: { type: String },
    year: { type: String },
    released: { type: String },
    runtime: { type: String },
    genre: { type: String },
    actors: { type: Array },
    plot: { type: String },
    language: { type: String },
    country: { type: String },
    awards: { type: String },
    poster: { type: String },
    imdbRating: { type: String },
    imdbID: { type: String },
    totalSeasons: { type: String }
});