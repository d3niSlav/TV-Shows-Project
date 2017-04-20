angular.module('UsersService', []).factory('Users', ['$http', function($http) {
    return {
        get: function() {
            return $http.get('/api/users');
        },
        create: function(userData) {
            return $http.post('/register', userData);
        },
        logIn: function(userData) {
            return $http.post('/login', userData);
        }
    }
}]);