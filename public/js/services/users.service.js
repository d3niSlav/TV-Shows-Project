angular.module('UsersService', []).factory('UsersService', ['$http', function ($http) {
    return {
        createNewUser: function (userData) {
            return $http.post('/register', userData);
        },

        logIn: function (userData) {
            return $http.post('/login', userData);
        },

        sendResetPasswordTokenRequest: function (userData) {
            return $http.post('/forgot', userData);
        },

        setNewPassword: function (userData, resetToken) {
            return $http.post('/reset/' + resetToken, userData);
        }
    }
}]);