angular.module('AllShowsService', []).factory('AllShowsService', ['$http', function ($http) {
    const STAR_FULL = 'star';
    const STAR_HALF_FULL = 'star-half-o';
    const STAR_EMPTY = 'star-o';
    const STARS_COUNT = 10;
    const MAX_RATING = 10;

    function Criteria(name) {
        this.name = name;
        this.on = false;
    }

    return {
        getAllShowsBasicInformation: function () {
            return $http.get('/api/shows/catalog');
        },

        getShowsBasicInformationByIds: function (showsIds) {
            return $http.post('/api/shows/basic', { showsIds: showsIds });
        },

        getShowsProgressByIds: function (showsIds) {
            return $http.post('/api/shows/progress', { showsIds: showsIds });
        },

        getAllShowsForPeriodOfTime: function (startDate, endDate) {
            return $http.get('/api/shows/' + startDate + '/' + endDate);
        },

        getAllShowsByDate: function () {
            return $http.get('/api/shows/newest');
        },

        getTopShows: function () {
            return $http.get('/api/shows/top-ten-shows');
        },

        createCategoriesArray: function (shows) {
            var categories = new Set();

            for (var index = 0; index < shows.length; index++) {
                var currentShow = shows[index];
                var currentShowCategories = currentShow.genre.split(',');

                for (var catIndex = 0; catIndex < currentShowCategories.length; catIndex++) {
                    var category = currentShowCategories[catIndex];
                    categories.add(category.trim());
                }
            }

            return Array.from(categories);
        },

        createFilterCriteria: function (categories) {
            return categories.map(function (category) {
                return new Criteria(category);
            });
        },

        createStars: function (showRating) {
            var stars = new Array(STARS_COUNT);
            stars.fill(STAR_EMPTY);

            var fullStarsCount = 0;
            var maxFullRating = Math.floor(showRating);
            for (var starIndex = 0; starIndex < maxFullRating; starIndex++) {
                stars[starIndex] = STAR_FULL;
                fullStarsCount++;
            }

            if ((showRating * STARS_COUNT) % MAX_RATING >= MAX_RATING / 2) {
                stars[fullStarsCount] = STAR_HALF_FULL;
            }

            return stars;
        }
    }
}]);