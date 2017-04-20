angular.module('CommentsService', []).factory('Comments', ['$http', function($http) {
    return {
        getUserProfile: function() {
            return $http.get('/api/profile');
        }
    }
}]);