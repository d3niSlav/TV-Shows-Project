var mongoose = require('mongoose');

var tvShowSchema = mongoose.Schema({
    title: { type: String },
    year: { type: String },
    released: { type: String },
    status: {type: String, default: 'unknown'},
    runtime: { type: String },
    genre: { type: String },
    actors: {
        type: Array,
        name: { type: String },
        character: { type: String },
        actorImage: { type: String }
    },
    plot: { type: String },
    language: { type: String },
    country: { type: String },
    awards: { type: String },
    poster: { type: String },
    logo: { type: String },
    imdbRating: { type: String },
    imdbID: { type: String },
    trailer: { type:String },
    releasedDate: { type: Date },
    totalSeasons: { type: Number },
    seasons : {
        type: Array,
        number: { type: Number },
        releaseYear: { type: String },
        description: { type: String },
        poster: { type: String },
        episodes: {
            type: Array,
            episodeDate: { type: Date },
            number: { type: Number },
            title: { type: String },
            plot: { type: String },
            screenshot: { type: String },
            released: { type: String },
            runtime:{ type: String },
            imdbRating: { type: String },
            imdbID: { type: String }
        }
    }
});

module.exports = mongoose.model('Show', tvShowSchema);