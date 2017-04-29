angular.module('AllShowsService', []).factory('AllShows', ['$http', function($http) {
    return {
        getAllShows: function() {
            return $http.get('/api/shows');
        },

        getAllShowsByDate: function() {
            return $http.get('/api/shows/newest');
        },

        getCategories: function(shows) {
            var categories = new Set();

            for (var index = 0; index < shows.length; index++) {
                var currentShow = shows[index];
                currentShowCategories = currentShow.genre.split(',');

                for (var catIndex = 0; catIndex < currentShowCategories.length; catIndex++) {
                    var categorie = currentShowCategories[catIndex];
                    categories.add(categorie.trim());
                }
            }

            return Array.from(categories);
        },

        createFiterJSON: function(categories) {
            function Criteria(name) {
                this.name = name;
                this.on = false;
            };

            var result = [];
            categories.forEach(function(category) {
                result.push(new Criteria(category));
            });

            return JSON.stringify(result);
        }
    }
}]);