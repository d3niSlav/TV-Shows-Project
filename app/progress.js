var Show = require('./models/show');

module.exports = function (app, mongoose) {
    app.post('/api/shows/progress', function (req, res) {
        var showIds = req.body.showsIds;

        var parsedShowIds = [];
        for (var index = 0; index < showIds.length; index++) {
            parsedShowIds.push(new mongoose.Types.ObjectId(showIds[index]));
        }

        Show
            .find({'_id': {$in: parsedShowIds}})
            .select({
                title: 1,
                logo: 1,
                status: 1,
                seasons: {$slice: -1},
                'seasons.number': 1,
                'seasons.episodes': {$slice: -1},
                'seasons.episodes.number': 1
            })
            .exec(function (err, shows) {
                var result = [];
                for (var index = 0; index < shows.length; index++) {
                    result.push({
                        _id: shows[index]._id,
                        title: shows[index].title,
                        logo: shows[index].logo,
                        status: shows[index].status,
                        latestSeason: shows[index].seasons[0].number,
                        latestEpisode: shows[index].seasons[0].episodes[0].number
                    });
                }

                if (err) {
                    res.send(err);
                }
                res.json(result);
            });
    });

    app.get('/api/shows/options/:showId', function (req, res) {
        Show.aggregate([
            {$match: {'_id': mongoose.Types.ObjectId(req.params.showId)}},
            {$unwind: '$seasons'},
            {
                $group: {
                    _id: {
                        id: '$_id',
                        title: '$title',
                        logo: '$logo'
                    },
                    seasons: {
                        $push: {
                            'number': '$seasons.number',
                            'numberOfEpisodes': {$size: '$seasons.episodes'}
                        }
                    }
                }
            }
        ], function (err, shows) {
            if (err) {
                res.send(err);
            }

            res.json(shows);
        });
    });
};