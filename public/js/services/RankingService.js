angular.module('RankingService', []).factory('Ranking', ['$http', function($http) {
    return {
        getTopShows: function() {
            return $http.get('/api/shows/top-ten-shows');
        }
    }
}]);