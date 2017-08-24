angular.module('CommentsController', []).controller('CommentsController', ['$scope', 'CommentsService', 'Profiles', function($scope, CommentsService, Profiles) {
    CommentsService.getComments().then(function(res) {
        var comments = res.data;

        function assignUserToComment(index, userId) {
            Profiles.getUserProfile(userId).then(function(res) {
                $scope.allComments[index].user = res.data;
            });
        }

        for (var index = 0; index < comments.length; index++) {
            comments[index].date = new Date(comments[index].date).toUTCString().slice(4, 22);
            assignUserToComment(index, comments[index].userId);
        }

        $scope.allComments = comments;
    });
}]);