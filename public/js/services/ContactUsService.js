angular.module('ContactUsService', []).factory('ContactUs', ['$http', function($http) {
    return {
        sendMessage: function(data) {
            return $http.post('/api/messages', data);
        }
    }
}]);