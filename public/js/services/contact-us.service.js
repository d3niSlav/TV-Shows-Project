angular.module('ContactUsService', []).factory('ContactUsService', ['$http', function($http) {
    return {
        sendMessage: function(data) {
            return $http.post('/api/messages', data);
        }
    }
}]);