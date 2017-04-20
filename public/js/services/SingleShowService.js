angular.module('SingleShowService', []).factory('SingleShow', ['$http', function($http) {
    return {
        getShowData: function(showId) {
            return $http.get('/api/show/' + showId);
        }
    }
}]);