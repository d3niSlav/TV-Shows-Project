angular.module('SingleShowService', []).factory('SingleShow', ['$http', function($http) {
    return {
        getShowData: function(showId) {
            return $http.get('/api/show/' + showId);
        },
        addShowToFavorites: function(showId) {
            return $http.post('/api/show/' + showId + '/addToFav');
        },
        addShowToWatchlist: function(showId) {
            return $http.post('/api/show/' + showId + '/addToFav');
        }
    }
}]);