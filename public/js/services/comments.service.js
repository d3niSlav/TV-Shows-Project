angular.module('CommentsService', []).factory('CommentsService', ['$http', function($http) {
    return {
        getComments: function(showId) {
            return $http.get('/api/comments/' + showId);
        },

        addComment: function(userId, showId, text) {
            return $http.post('/api/comments', { userId: userId, showId: showId, text: text });
        },

        addLikeAction: function(userId, commentId) {
            return $http.put('/api/comments/addLike', { userId: userId, commentId: commentId });
        },

        removeLikeAction: function(userId, commentId) {
            return $http.put('/api/comments/removeLike', { userId: userId, commentId: commentId });
        }
    }
}]);