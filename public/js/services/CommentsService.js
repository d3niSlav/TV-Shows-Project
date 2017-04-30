angular.module('CommentsService', []).factory('Comments', ['$http', function($http) {
    return {
        getComments: function(showId) {
            return $http.get('/api/comments/' + showId);
        },

        addComment: function(userId, showId, text) {
            var data = JSON.stringify({ "userId": userId, "showId": showId, "text": text });
            return $http.post('/api/comments', data);
        },

        addLikeAction: function(userId, commentId) {
            var data = JSON.stringify({ "userId": userId, "commentId": commentId });
            return $http.put('/api/comments/addLike', data);
        },

        removeLikeAction: function(userId, commentId) {
            var data = JSON.stringify({ "userId": userId, "commentId": commentId });
            return $http.put('/api/comments/removeLike', data);
        }
    }
}]);