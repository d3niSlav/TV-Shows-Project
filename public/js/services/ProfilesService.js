angular.module('ProfilesService', []).factory('Profiles', ['$http', function($http) {
    return {
        getUserProfile: function(userId) {
            return $http.get('/api/profile/' + userId);
        }
    }
}]);