angular.module('AllShowsService', []).factory('AllShows', ['$http', function($http) {
    return {
        getAllShows: function() {
            return $http.get('/api/shows');
        }
    }
}]);