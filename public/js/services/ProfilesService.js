angular.module('ProfilesService', []).factory('Profiles', ['$http', function($http) {
    return {
        getUserProfile: function() {
            return $http.get('/api/profile');
        }
    }
}]);