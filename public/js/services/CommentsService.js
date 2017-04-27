angular.module('CommentsService', []).factory('Comments', ['$http', function($http) {
    return {
        getComments: function() {
            return $http.get('/api/comments');
        }
    }
}]);